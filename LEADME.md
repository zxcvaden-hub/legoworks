# LEADME｜廣運50週年專案導讀（給 AI／接手者）

> 本檔＝「先讀我」。與 `PROGRESS_SNAPSHOT.md`（**2026-07-29 下午**）同步。  
> 使用者口頭說的「LEADME／RELEAD ME」即指更新本檔與相關 README。

## 30 秒現況

| 線 | 線上 | Commit | 快取 |
|----|------|--------|------|
| 正式客服 | https://zxcvaden-hub.github.io/kenmec/ | kenmec `f0f4c7e` | `?v=20260729d` |
| 時光探險 | https://zxcvaden-hub.github.io/legoworks/time-adventure/ | legoworks `a892304` | `ASSET_VERSION=20260729d` |

本機工作區 `chatbot2` **不是** git repo。上傳用：

- `_kenmec-upload/` → `zxcvaden-hub/kenmec`
- `_legoworks-upload/` → `zxcvaden-hub/legoworks`

## 必讀順序

1. **`LEADME.md`（本檔）**
2. **`PROGRESS_SNAPSHOT.md`**
3. `CURSOR_HANDOFF.md`／`DEBUG_HISTORY.md` §11–12
4. 客服：`data/knowledge.json`｜時光探險：`time-adventure/README.md`、`puzzles.json`

## 維護口訣

**客服 FAQ**

```
改 data/knowledge.json
→ node inject-knowledge.js  或  py scripts/inject-knowledge.py
→ py scripts/verify-chatbot-health.py   # 必須 PASS
→ 複製到 _kenmec-upload → commit／push
```

禁止手貼 `index.html` 的 `const KNOWLEDGE`；禁止執行 `build-pages.js`。

**時光探險**

```
改 time-adventure/puzzles.json（或 station-template）
→ 提高 config.js 的 ASSET_VERSION
→ py scripts/split-time-adventure.py
→ robocopy 到 _legoworks-upload/time-adventure
→ commit／push
```

上傳客服時**不要刪除或覆蓋**目標 repo 的 `time-adventure/`。

## 活動機制（勿混淆）

- **時光探險（線上）**：5 關全完成 → **100 元禮券**（護照蓋章／打洞）
- **廣運50闖關（實體）**：5 關任完成 **3** 關 → 闖關紀念品

## 桌面最新包

- `廣運時光探險_20260729-3.zip`
- `廣運50週年智能客服_20260729-3.zip`
- `廣運時光探險_關主密語速查卡.txt`

## 接續口令

> 接續 `PROGRESS_SNAPSHOT.md` 的 **2026-07-29 下午**存檔點；先讀 `LEADME.md`。
