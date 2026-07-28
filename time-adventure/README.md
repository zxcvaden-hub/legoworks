# 廣運時光探險（0728 更新）

廣運 50 週年家庭日 · 五關手機互動挑戰＋現場蓋章。靜態網站，部署於 GitHub Pages。

## 目前測試站

目前測試站：
`https://zxcvaden-hub.github.io/legoworks/time-adventure/`

目前 QR Code 均為 LEGOWORKS 測試版本。

## 五個關卡

| 編號 | 名稱 | 地點 | 玩法摘要 |
|------|------|------|----------|
| 01 | 啟航輸送機 | 303運動休息室 | 輸送機水管接通（保留原玩法） |
| 02 | 液冷尋密碼 | 319運動休息室 | 三模組擦拭顯影＋運算符號組合＝2026 |
| 03 | 廣運歷史小測驗 | 廣運歷史牆 | AI 小幫手五題（Q1 為創立日期選擇題） |
| 04 | 廣運AI智慧一點通 | 三樓活動現場後門 | 六技術固定選項分類（3／2／1） |
| 05 | 廣運成功密碼 | 329運動休息室 | 3×3 主視覺拼圖；密語「展望百年願景」 |

## 網址設定

`time-adventure/config.js`：

```js
const SITE_BASE_URL = "https://zxcvaden-hub.github.io/legoworks";
const GAME_BASE_PATH = "/time-adventure";
```

五個測試關卡網址：
- `{SITE_BASE_URL}{GAME_BASE_PATH}/stage-1/`
- `{SITE_BASE_URL}{GAME_BASE_PATH}/stage-2/`
- `{SITE_BASE_URL}{GAME_BASE_PATH}/stage-3/`
- `{SITE_BASE_URL}{GAME_BASE_PATH}/stage-4/`
- `{SITE_BASE_URL}{GAME_BASE_PATH}/stage-5/`

目前正式使用的關卡資料夾：
- `stage-1`
- `stage-2`
- `stage-3`
- `stage-4`
- `stage-5`

目前不保留任何舊版關卡資料夾與相容路徑。

## 正式站切換流程

目前測試站：
`https://zxcvaden-hub.github.io/legoworks`

未來正式站：
`https://zxcvaden-hub.github.io/kenmec`

切換步驟：
1. 將完整專案複製到 `kenmec` 儲存庫。
2. 修改唯一的 `SITE_BASE_URL` 設定。
3. 確認 `GAME_BASE_PATH` 是否仍為 `/time-adventure`。
4. 重新部署 GitHub Pages。
5. 開啟五個 `stage-*` 網址逐一測試。
6. 重新產生並下載五張正式 QR Code。
7. 不可沿用 LEGOWORKS 測試 QR Code 交付客戶。

## 如何修改關卡文案／通關密語／題目

1. 編輯 `time-adventure/puzzles.json`（五關名稱、故事、地點、密語、第二／三／四關題目皆在此）
2. 執行：

```bash
py scripts/split-time-adventure.py
```

會同步 `station-template.html` 內嵌資料，並再生 `stage-*`／`qr-codes.html`／活動說明頁。

## 本機預覽

於專案根目錄啟動靜態伺服器，例如：

```bash
py -m http.server 8080
```

開啟：
- http://127.0.0.1:8080/time-adventure/
- http://127.0.0.1:8080/time-adventure/stage-1/
- http://127.0.0.1:8080/time-adventure/qr-codes.html

（本機預覽時 QR 圖仍指向 `SITE_BASE_URL`，不會用 localhost。）

## 維護檔案

| 檔案 | 用途 |
|------|------|
| `time-adventure/puzzles.json` | 文案與題目來源 |
| `time-adventure/station-template.html` | 遊戲邏輯模板 |
| `time-adventure/config.js` | 唯一網址設定 |
| `scripts/split-time-adventure.py` | 產出各關頁 |
| `data/knowledge.json` | 客服 FAQ（真實路徑；注入後同步根目錄 `knowledge.json`） |
