# 廣運時光探險（0728 更新）

廣運 50 週年家庭日 · 五關手機互動挑戰＋現場蓋章。靜態網站，部署於 GitHub Pages。

## 專案用途

來賓於各關現場掃描專屬 QR，完成手機挑戰後向關主報告通關密語並於闖關護照蓋章。完成五關並集滿印章後，向各個關主出示護照確認通關領取禮券；領取後關主於護照兌換區打孔。

## 五個關卡

| 編號 | 名稱 | 地點 | 玩法摘要 |
|------|------|------|----------|
| 01 | 啟航輸送機 | 303運動休息室 | 輸送機水管接通（保留原玩法） |
| 02 | 液冷尋密碼 | 319運動休息室 | 三模組擦拭顯影＋運算符號組合＝2026 |
| 03 | 廣運歷史小測驗 | 廣運歷史牆 | AI 小幫手五題（Q1 為創立日期選擇題） |
| 04 | 廣運AI智慧一點通 | 三樓活動現場後門 | 六技術固定選項分類（3／2／1） |
| 05 | 廣運成功密碼 | 329運動休息室 | 3×3 主視覺拼圖；密語「展望百年願景」 |

## 正式／測試網址（目前 QR 預設測試站）

`time-adventure/config.js`：

```js
const SITE_BASE_URL = "https://zxcvaden-hub.github.io/legoworks";
```

正式站請改為：`https://zxcvaden-hub.github.io/kenmec`

| 用途 | 網址 |
|------|------|
| 活動說明 | `{SITE_BASE_URL}/time-adventure/` |
| QR 總覽（工作人員） | `{SITE_BASE_URL}/time-adventure/qr-codes.html` |
| 第 1 關 | `{SITE_BASE_URL}/time-adventure/stage-1/` |
| 第 2 關 | `{SITE_BASE_URL}/time-adventure/stage-2/` |
| 第 3 關 | `{SITE_BASE_URL}/time-adventure/stage-3/` |
| 第 4 關 | `{SITE_BASE_URL}/time-adventure/stage-4/` |
| 第 5 關 | `{SITE_BASE_URL}/time-adventure/stage-5/` |

舊網址 `level-1`～`level-5` 會自動導向對應 `stage-*`。

## 如何更換正式部署網址

1. 編輯 `time-adventure/config.js` 的 `SITE_BASE_URL`
2. 重新開啟 `qr-codes.html`／各關 `qr.html` 即可產生新 QR（無需 rebuild）

## 如何更換第五關活動主視覺

1. 覆蓋 `time-adventure/assets/kenmec-50-main-visual.png`（建議同時更新專案根目錄同名檔）
2. 重新整理第 5 關頁面即可

## 如何修改關卡文案／通關密語／題目

1. 編輯 `time-adventure/puzzles.json`（五關名稱、故事、地點、密語、第二／三／四關題目皆在此）
2. 執行：

```bash
py scripts/split-time-adventure.py
```

會同步 `station-template.html` 內嵌資料，並再生 `stage-*`／`level-*` 導向／`qr-codes.html`／活動說明頁。

## 本機預覽

於專案根目錄啟動靜態伺服器，例如：

```bash
py -m http.server 8080
```

開啟：

- http://127.0.0.1:8080/time-adventure/
- http://127.0.0.1:8080/time-adventure/stage-1/
- http://127.0.0.1:8080/time-adventure/qr-codes.html

（本機預覽時 QR 圖仍指向 `SITE_BASE_URL` 正式／測試網域，不會用 localhost。）

## 部署方式

1. `py scripts/split-time-adventure.py`
2. 客服知識庫若有改：`py` 注入或 `node inject-knowledge.js`（將 `data/knowledge.json` 寫入 `index.html`）
3. 上傳至 `zxcvaden-hub/legoworks`（測試）或 `zxcvaden-hub/kenmec`（正式）根目錄，**保留／更新** `time-adventure/` 整夾（含 `stage-*`、`assets/`、`config.js`）
4. 手機實機掃描 `qr-codes.html` 下載的 PNG 驗證

## 手機測試建議

- iPhone Safari／Android Chrome 各測一次五關直達網址
- 第二關：觸控擦拭、未達 60% 不可作答、最終 2000＋30－4
- 第五關：預覽倒數、拖曳／點選交換、提示一次、密語「展望百年願景」

## 維護檔案

| 檔案 | 用途 |
|------|------|
| `time-adventure/puzzles.json` | 文案與題目來源 |
| `time-adventure/station-template.html` | 遊戲邏輯模板 |
| `time-adventure/config.js` | 部署網域 |
| `scripts/split-time-adventure.py` | 產出各關頁 |
| `data/knowledge.json` | 客服 FAQ（真實路徑；注入後同步根目錄 `knowledge.json`） |
