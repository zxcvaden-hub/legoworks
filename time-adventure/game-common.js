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

  function initAudio() {
    try {
      const Ctx = global.AudioContext || global.webkitAudioContext;
      if (!Ctx) return null;
      if (!audioCtx) audioCtx = new Ctx();
      if (audioCtx.state === "suspended") {
        audioCtx.resume().catch(() => {});
      }
      return audioCtx;
    } catch (err) {
      console.warn("AudioContext init failed", err);
      return null;
    }
  }

  function setSoundEnabled(on) {
    soundEnabled = !!on;
    try {
      localStorage.setItem(GAME_CONFIG.soundPrefKey, soundEnabled ? "on" : "off");
    } catch (_) {
      /* ignore */
    }
  }

  function isSoundEnabled() {
    return soundEnabled;
  }

  function tone(freq, dur, type, gainValue, when) {
    if (!soundEnabled) return;
    const ctx = initAudio();
    if (!ctx) return;
    try {
      const t0 = (when == null ? ctx.currentTime : when);
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = type || "sine";
      osc.frequency.value = freq;
      gain.gain.setValueAtTime(0.0001, t0);
      gain.gain.exponentialRampToValueAtTime(gainValue || 0.08, t0 + 0.01);
      gain.gain.exponentialRampToValueAtTime(0.0001, t0 + dur);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(t0);
      osc.stop(t0 + dur + 0.02);
    } catch (err) {
      console.warn("tone failed", err);
    }
  }

  function playStartSound() {
    tone(523.25, 0.08, "triangle", 0.07);
    tone(784.99, 0.1, "triangle", 0.06, (audioCtx && audioCtx.currentTime + 0.08) || undefined);
  }

  function playCorrectSound() {
    tone(523.25, 0.07, "sine", 0.07);
    tone(659.25, 0.08, "sine", 0.07, (audioCtx && audioCtx.currentTime + 0.07) || undefined);
    tone(783.99, 0.12, "sine", 0.06, (audioCtx && audioCtx.currentTime + 0.14) || undefined);
  }

  function playWrongSound() {
    tone(220, 0.14, "sawtooth", 0.045);
  }

  function playCountdownSound() {
    tone(880, 0.05, "square", 0.035);
  }

  function playSuccessSound() {
    tone(523.25, 0.09, "triangle", 0.07);
    tone(659.25, 0.09, "triangle", 0.07, (audioCtx && audioCtx.currentTime + 0.09) || undefined);
    tone(783.99, 0.09, "triangle", 0.07, (audioCtx && audioCtx.currentTime + 0.18) || undefined);
    tone(1046.5, 0.18, "triangle", 0.06, (audioCtx && audioCtx.currentTime + 0.28) || undefined);
  }

  function playFactoryBootSound() {
    tone(110, 0.2, "sawtooth", 0.04);
    tone(220, 0.2, "sawtooth", 0.04, (audioCtx && audioCtx.currentTime + 0.18) || undefined);
    tone(440, 0.25, "triangle", 0.05, (audioCtx && audioCtx.currentTime + 0.36) || undefined);
    tone(880, 0.3, "sine", 0.05, (audioCtx && audioCtx.currentTime + 0.55) || undefined);
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
    setSoundEnabled,
    isSoundEnabled,
    playStartSound,
    playCorrectSound,
    playWrongSound,
    playCountdownSound,
    playSuccessSound,
    playFactoryBootSound,
    startReadyCountdown,
    progressBars,
    shuffle
  };
})(typeof window !== "undefined" ? window : globalThis);
