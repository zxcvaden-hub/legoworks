/* 廣運時光探險 · 共用遊戲系統（計時／音效／321GO／成就／防呆） */
(function (global) {
  "use strict";

  const GAME_CONFIG = {
    get durationSeconds() {
      return typeof GAME_DURATION_SECONDS === "number" ? GAME_DURATION_SECONDS : 180;
    },
    readySequence: ["3", "2", "1", "GO"],
    readyStepMs: 700,
    achievementHoldMs: 1000,
    soundPrefKey: "guangyun-ta-sfx-enabled"
  };

  const timers = {
    intervalId: null,
    timeoutIds: [],
    rafIds: [],
    endTime: 0,
    active: false,
    failed: false,
    cleared: false,
    lastShownSec: null,
    lastTickSoundSec: null,
    onTimeout: null,
    onTick: null
  };

  let audioCtx = null;
  let soundEnabled = true;
  let unlockPromise = null;

  try {
    const saved = localStorage.getItem(GAME_CONFIG.soundPrefKey);
    if (saved === "off") soundEnabled = false;
  } catch (_) {
    /* ignore */
  }

  function trackTimeout(id) {
    timers.timeoutIds.push(id);
    return id;
  }

  function trackRaf(id) {
    timers.rafIds.push(id);
    return id;
  }

  function clearTrackedTimeouts() {
    timers.timeoutIds.forEach((id) => clearTimeout(id));
    timers.timeoutIds = [];
    timers.rafIds.forEach((id) => cancelAnimationFrame(id));
    timers.rafIds = [];
  }

  function stopCountdown() {
    if (timers.intervalId) {
      clearInterval(timers.intervalId);
      timers.intervalId = null;
    }
    timers.active = false;
  }

  function cancelAllRuntime() {
    stopCountdown();
    clearTrackedTimeouts();
  }

  function remainingSeconds() {
    if (!timers.endTime) return GAME_CONFIG.durationSeconds;
    return Math.max(0, Math.ceil((timers.endTime - Date.now()) / 1000));
  }

  function formatTime(sec) {
    const s = Math.max(0, sec | 0);
    const mm = String(Math.floor(s / 60)).padStart(2, "0");
    const ss = String(s % 60).padStart(2, "0");
    return mm + ":" + ss;
  }

  function updateTimerDisplay(el) {
    if (!el) return;
    const sec = remainingSeconds();
    el.textContent = formatTime(sec);
    el.classList.toggle("warn", sec <= 30 && sec > 10);
    el.classList.toggle("danger", sec <= 10);
    el.classList.toggle("pulse", sec <= 10 && sec > 0);
    return sec;
  }

  function startCountdown(opts) {
    const options = opts || {};
    stopCountdown();
    timers.failed = false;
    timers.cleared = false;
    timers.onTimeout = options.onTimeout || null;
    timers.onTick = options.onTick || null;
    timers.endTime = Date.now() + GAME_CONFIG.durationSeconds * 1000;
    timers.active = true;
    timers.lastShownSec = null;
    timers.lastTickSoundSec = null;

    const tick = () => {
      if (!timers.active || timers.cleared || timers.failed) return;
      const sec = remainingSeconds();
      if (typeof timers.onTick === "function") timers.onTick(sec);
      if (sec <= 10 && sec > 0 && sec !== timers.lastTickSoundSec) {
        timers.lastTickSoundSec = sec;
        playCountdownSound();
      }
      if (sec <= 0) {
        timers.failed = true;
        stopCountdown();
        if (typeof timers.onTimeout === "function") timers.onTimeout();
      }
    };

    tick();
    timers.intervalId = setInterval(tick, 250);
  }

  function markCleared() {
    timers.cleared = true;
    stopCountdown();
  }

  function markFailed() {
    timers.failed = true;
    stopCountdown();
  }

  function canContinue() {
    return !timers.failed && !timers.cleared;
  }

  function ensureAudioContext() {
    try {
      const Ctx = global.AudioContext || global.webkitAudioContext;
      if (!Ctx) return null;
      if (!audioCtx) audioCtx = new Ctx();
      return audioCtx;
    } catch (err) {
      console.warn("AudioContext create failed", err);
      return null;
    }
  }

  /** 必須在使用者手勢中呼叫；解鎖後後續 setTimeout 音效才聽得到（尤其 iOS Safari） */
  function initAudio() {
    const ctx = ensureAudioContext();
    if (!ctx) return null;
    if (ctx.state === "suspended") {
      unlockAudio();
    }
    return ctx;
  }

  function unlockAudio() {
    const ctx = ensureAudioContext();
    if (!ctx) return Promise.resolve(null);
    if (ctx.state === "running") return Promise.resolve(ctx);
    if (unlockPromise) return unlockPromise;
    unlockPromise = ctx
      .resume()
      .then(() => {
        // iOS：播放極短靜音 buffer，完成真正解鎖
        try {
          const buffer = ctx.createBuffer(1, 1, ctx.sampleRate || 22050);
          const src = ctx.createBufferSource();
          src.buffer = buffer;
          src.connect(ctx.destination);
          src.start(0);
        } catch (_) {
          /* ignore */
        }
        return ctx;
      })
      .catch((err) => {
        console.warn("AudioContext resume failed", err);
        return ctx;
      })
      .finally(() => {
        unlockPromise = null;
      });
    return unlockPromise;
  }

  function setSoundEnabled(on) {
    soundEnabled = !!on;
    try {
      localStorage.setItem(GAME_CONFIG.soundPrefKey, soundEnabled ? "on" : "off");
    } catch (_) {
      /* ignore */
    }
    if (soundEnabled) unlockAudio();
  }

  function isSoundEnabled() {
    return soundEnabled;
  }

  function playToneAt(ctx, freq, dur, type, gainValue, when) {
    try {
      const t0 = when == null ? ctx.currentTime : when;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = type || "sine";
      osc.frequency.setValueAtTime(freq, t0);
      const peak = Math.max(0.0001, gainValue == null ? 0.12 : gainValue);
      gain.gain.setValueAtTime(0.0001, t0);
      gain.gain.exponentialRampToValueAtTime(peak, t0 + 0.012);
      gain.gain.exponentialRampToValueAtTime(0.0001, t0 + Math.max(0.03, dur));
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(t0);
      osc.stop(t0 + dur + 0.03);
    } catch (err) {
      console.warn("tone failed", err);
    }
  }

  function withAudio(run) {
    if (!soundEnabled) return;
    unlockAudio().then((ctx) => {
      if (!ctx || !soundEnabled) return;
      if (ctx.state === "suspended") {
        ctx.resume().then(() => run(ctx)).catch(() => {});
        return;
      }
      run(ctx);
    });
  }

  function tone(freq, dur, type, gainValue, whenOffset) {
    withAudio((ctx) => {
      const t0 = ctx.currentTime + (whenOffset || 0);
      playToneAt(ctx, freq, dur, type, gainValue, t0);
    });
  }

  function playStartSound() {
    withAudio((ctx) => {
      const t0 = ctx.currentTime;
      playToneAt(ctx, 523.25, 0.09, "triangle", 0.14, t0);
      playToneAt(ctx, 784.99, 0.12, "triangle", 0.12, t0 + 0.08);
    });
  }

  function playCorrectSound() {
    withAudio((ctx) => {
      const t0 = ctx.currentTime;
      playToneAt(ctx, 523.25, 0.08, "sine", 0.14, t0);
      playToneAt(ctx, 659.25, 0.09, "sine", 0.13, t0 + 0.07);
      playToneAt(ctx, 783.99, 0.14, "sine", 0.12, t0 + 0.14);
    });
  }

  function playWrongSound() {
    withAudio((ctx) => {
      playToneAt(ctx, 220, 0.16, "sawtooth", 0.09, ctx.currentTime);
    });
  }

  function playCountdownSound() {
    // 簡單逼逼聲：最後 10 秒每秒兩短音
    withAudio((ctx) => {
      const t0 = ctx.currentTime;
      playToneAt(ctx, 980, 0.07, "square", 0.13, t0);
      playToneAt(ctx, 980, 0.07, "square", 0.13, t0 + 0.11);
    });
  }

  function playSuccessSound() {
    withAudio((ctx) => {
      const t0 = ctx.currentTime;
      playToneAt(ctx, 523.25, 0.1, "triangle", 0.14, t0);
      playToneAt(ctx, 659.25, 0.1, "triangle", 0.13, t0 + 0.09);
      playToneAt(ctx, 783.99, 0.1, "triangle", 0.13, t0 + 0.18);
      playToneAt(ctx, 1046.5, 0.22, "triangle", 0.12, t0 + 0.28);
    });
  }

  function playFactoryBootSound() {
    withAudio((ctx) => {
      const t0 = ctx.currentTime;
      playToneAt(ctx, 110, 0.22, "sawtooth", 0.08, t0);
      playToneAt(ctx, 220, 0.22, "sawtooth", 0.08, t0 + 0.18);
      playToneAt(ctx, 440, 0.28, "triangle", 0.1, t0 + 0.36);
      playToneAt(ctx, 880, 0.32, "sine", 0.1, t0 + 0.55);
    });
  }

  function playReadyBeep(stepIndex, total) {
    // 3 → 2 → 1：短逼聲；GO：較高較長
    withAudio((ctx) => {
      const t0 = ctx.currentTime;
      const isGo = stepIndex >= total - 1;
      if (isGo) {
        playToneAt(ctx, 660, 0.08, "square", 0.12, t0);
        playToneAt(ctx, 880, 0.12, "square", 0.14, t0 + 0.09);
      } else {
        playToneAt(ctx, 740, 0.09, "square", 0.13, t0);
      }
    });
  }

  function startReadyCountdown(overlayEl, onDone) {
    if (!overlayEl) {
      if (typeof onDone === "function") onDone();
      return;
    }
    overlayEl.classList.add("show");
    overlayEl.setAttribute("aria-hidden", "false");
    const label = overlayEl.querySelector(".ready-count") || overlayEl;
    let i = 0;
    const seq = GAME_CONFIG.readySequence;

    function step() {
      if (i >= seq.length) {
        overlayEl.classList.remove("show");
        overlayEl.setAttribute("aria-hidden", "true");
        if (typeof onDone === "function") onDone();
        return;
      }
      label.textContent = seq[i];
      label.classList.remove("pop");
      void label.offsetWidth;
      label.classList.add("pop");
      playReadyBeep(i, seq.length);
      i += 1;
      trackTimeout(setTimeout(step, GAME_CONFIG.readyStepMs));
    }
    step();
  }

  function progressBars(levelId) {
    const filled = Math.max(0, Math.min(5, Number(levelId) || 0));
    return {
      filled,
      bars: "■".repeat(filled) + "□".repeat(5 - filled),
      pct: filled * 20,
      label: "目前關卡：第 " + filled + " / 5 關"
    };
  }

  function shuffle(arr) {
    const a = arr.slice();
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      const t = a[i];
      a[i] = a[j];
      a[j] = t;
    }
    return a;
  }

  global.GameCommon = {
    GAME_CONFIG,
    cancelAllRuntime,
    clearTrackedTimeouts,
    trackTimeout,
    trackRaf,
    stopCountdown,
    startCountdown,
    remainingSeconds,
    formatTime,
    updateTimerDisplay,
    markCleared,
    markFailed,
    canContinue,
    getTimerState: () => ({
      active: timers.active,
      failed: timers.failed,
      cleared: timers.cleared,
      endTime: timers.endTime
    }),
    initAudio,
    unlockAudio,
    setSoundEnabled,
    isSoundEnabled,
    playStartSound,
    playCorrectSound,
    playWrongSound,
    playCountdownSound,
    playSuccessSound,
    playFactoryBootSound,
    playReadyBeep,
    startReadyCountdown,
    progressBars,
    shuffle
  };
})(typeof window !== "undefined" ? window : globalThis);
