# 進度快照｜2026-07-29 下午（客服＋時光探險存檔點）

> 本檔為目前最新存檔。用 Cursor 開啟：`chatbot2` 或 `廣運50週年-chatbot.code-workspace`。  
> **先讀導覽：** [`LEADME.md`](./LEADME.md)  
> 接續請說：接續 `PROGRESS_SNAPSHOT.md` 的 **2026-07-29 下午**存檔點。

## 兩條線怎麼分

| 線 | 主要路徑 | 線上目標 | 目前 commit |
|----|----------|----------|-------------|
| **時光探險** | `time-adventure/` | 測試站 `legoworks` | **`a892304`** |
| **正式版客服** | 根目錄 `index.html`、`data/knowledge.json` | 正式站 `kenmec` | **`f0f4c7e`** |

兩條線可並存；**上傳客服時勿覆蓋**目標 repo 既有 `time-adventure/`。  
本機 `chatbot2` **不是** git repo；上傳用 `_kenmec-upload/`、`_legoworks-upload/`。

### 快取版本（現場請帶 `?v=`）
- 時光探險資源：`ASSET_VERSION = **20260729d**`（`time-adventure/config.js`）
- 建議驗證：
  - https://zxcvaden-hub.github.io/legoworks/time-adventure/?v=20260729d
  - https://zxcvaden-hub.github.io/legoworks/time-adventure/stage-2/?v=20260729d
  - https://zxcvaden-hub.github.io/kenmec/?v=20260729d

### 桌面最新包（OneDrive\Desktop）
- `廣運時光探險_20260729-3.zip`（含關主密語速查卡）
- `廣運50週年智能客服_20260729-3.zip`
- `廣運時光探險_關主密語速查卡.txt`

---

## 2026-07-29 已完成（重點）

### 正式客服（kenmec `f0f4c7e`）
- 知識庫 **0728**｜FAQ **39**｜快捷 **6**
- 曾因內嵌 `KNOWLEDGE` 換行損壞整頁（快捷消失）；已修復＋加健康檢查
- 維護流程：`data/knowledge.json` → inject → `py scripts/verify-chatbot-health.py` **PASS** → 上傳
- LINE／內建瀏覽器提示改用 Safari／Chrome
- 頭像圖 `?v=20260729c`（客服側；與時光探險 d 版可並存）

### 時光探險（legoworks `a892304`）
- 靜態資源全面 `?v=20260729d`（cache busting）
- LINE／內建瀏覽器外開提示（說明頁＋各關）
- BGM：`preload="none"`，僅手動開聲音才載入 mp3
- 第 2 關故事文案：「四十多年」→「**50年**」
- 第 4 關 UX：點系統再點設備；底部狀態；減摩擦（先前已上）
- 題目資料：`game-data.js`（**不**再 `fetch(puzzles.json)`）
- 禮券：紙本護照蓋章／打洞；完成五關找**任一關關主**領 **100 元禮券**

### 營運備援（非程式，已備）
- 紙本闖關護照＋打洞防重複領取
- 關主緊急紙本題通道
- 關主密語速查卡（桌面 txt／ZIP 內）

### 活動機制基準（討論用，勿與 FAQ 文案混淆）
- **線上｜時光探險**：5 關全完成 → 100 元禮券
- **線下｜廣運50闖關**：5 關任完成 **3** 關 → 闖關紀念品（非禮券）

---

## 本機真相來源

| 檔案 | 用途 |
|------|------|
| `time-adventure/puzzles.json` | **編輯用**文案／題目／密語 |
| `time-adventure/game-data.js` | **執行時**（split 產生，勿手改） |
| `time-adventure/config.js` | `SITE_BASE_URL`、`ASSET_VERSION` |
| `time-adventure/station-template.html` | 遊戲模板 |
| `scripts/split-time-adventure.py` | 重建五關＋game-data＋說明頁 |
| `data/knowledge.json` | FAQ 真相來源 |
| `inject-knowledge.js` / `scripts/inject-knowledge.py` | 灌入 `index.html` |
| `scripts/verify-chatbot-health.py` | 上線前必 PASS |
| `_legoworks-upload/` | → `zxcvaden-hub/legoworks` |
| `_kenmec-upload/` | → `zxcvaden-hub/kenmec` |

### 五關密語（關主速查）
1. 第一台輸送機  
2. AI液冷啟動成功  
3. 立足台灣，布局全球  
4. 智慧整合成功  
5. 展望百年願景  

---

## 近期 commits（由新到舊）

### legoworks
`a892304`（50年文案＋v=d）→ `d13451d`（cache／LINE／BGM）→ `1c3dfc1`（健康檢查同步）…

### kenmec
`f0f4c7e`（LINE 提示＋頭像 v）→ `b62c416`（健康檢查）→ `a82e34e`（100 元禮券）→ `d36a2d0`（KNOWLEDGE 修復）…

---

## 尚未做／活動前可選

- 正式站時光探險 `SITE_BASE_URL` 尚未切 kenmec；正式 QR 尚未最終交付
- 活動前真機抽測：iPhone Safari、Android Chrome、LINE 內開各一輪
- FAQ／ai-handoff 舊敘述（如保溫瓶當場領）以 **`data/knowledge.json` 0728** 為準，勿信舊 handoff 條目
- 不必為其他 AI 建議做 SPA／PWA 大翻修

---

## 接續口令

> 接續 `PROGRESS_SNAPSHOT.md` 的 **2026-07-29 下午**存檔點。  
> 時光探險：`time-adventure/puzzles.json` → split → legoworks（目前 `a892304`，`ASSET_VERSION=20260729d`）。  
> 正式客服：`data/knowledge.json` → inject → verify PASS → kenmec（目前 `f0f4c7e`）。
