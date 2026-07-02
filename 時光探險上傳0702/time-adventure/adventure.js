(function () {
  const STORAGE_KEY = "guangyun-time-adventure-v1";

  function normalize(text) {
    return String(text || "")
      .trim()
      .toUpperCase()
      .replace(/[\s\u3000]+/g, "")
      .replace(/[，,、．。！？!?]/g, "");
  }

  function normalizeCn(text) {
    return String(text || "").trim().replace(/[\s\u3000]+/g, "");
  }

  function loadProgress() {
    try {
      return JSON.parse(localStorage.getItem(STORAGE_KEY) || "{}");
    } catch {
      return {};
    }
  }

  function saveProgress(data) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  }

  function getCharAt(block, lineIndex, charIndex) {
    const line = block.lines[lineIndex - 1] || "";
    return line.charAt(charIndex - 1) || "";
  }

  function buildHistoryAnswer(wall, coords) {
    return coords
      .map((item) => {
        const block = wall[item.block - 1];
        if (!block) return "";
        return getCharAt(block, item.line, item.char);
      })
      .join("");
  }

  function countOverlapWhite(gridA, gridB) {
    let count = 0;
    for (let r = 0; r < 5; r += 1) {
      for (let c = 0; c < 5; c += 1) {
        if (gridA[r][c] === "1" && gridB[r][c] === "1") count += 1;
      }
    }
    return count;
  }

  function decodeCipher(text, map) {
    return Array.from(text)
      .map((ch) => map[ch] || "")
      .join("");
  }

  window.TimeAdventure = {
    STORAGE_KEY,
    normalize,
    normalizeCn,
    loadProgress,
    saveProgress,
    buildHistoryAnswer,
    countOverlapWhite,
    decodeCipher,
    isLevelUnlocked(progress, levelId) {
      if (levelId === 1) return true;
      return Boolean(progress[levelId - 1]);
    },
    checkAnswer(level, userInput, data) {
      const expected = normalize(level.answer);
      const given = normalize(userInput);
      if (given === expected) return true;
      if (level.id === 1) {
        return normalizeCn(userInput) === normalizeCn(level.answer);
      }
      if (level.id === 5) {
        return normalize(userInput.replace(/\s+/g, " ")) === normalize(level.answer);
      }
      return false;
    },
    markComplete(levelId) {
      const progress = loadProgress();
      progress[levelId] = true;
      progress.completedAt = progress.completedAt || {};
      progress.completedAt[levelId] = new Date().toISOString();
      saveProgress(progress);
      return progress;
    },
    resetProgress() {
      localStorage.removeItem(STORAGE_KEY);
    },
    completedCount(progress) {
      return [1, 2, 3, 4, 5].filter((id) => progress[id]).length;
    },
    allComplete(progress) {
      return this.completedCount(progress) === 5;
    },
  };
})();
