# 廣運時光探險（0728 完整 UX 更新）

廣運 50 週年家庭日 · 五關手機互動挑戰＋現場蓋章。靜態網站，部署於 GitHub Pages。

## 網址唯一設定

所有正式／測試公開網址**只**在：

`time-adventure/config.js`

```js
const SITE_BASE_URL = "...";           // 唯一要改的站點根網址
const GAME_BASE_PATH = "/time-adventure";
const GAME_DURATION_SECONDS = 180;     // 五關共用限時
```

`STAGE_URLS` 與 `QR_OVERVIEW_URL` 由此自動組合。  
**不要**在其他 HTML／JS／README 再寫死完整 GitHub Pages 網址。

### 正式站切換

1. 複製整包到正式 repo  
2. **只改** `SITE_BASE_URL`（改為 kenmec 對應站點根網址）  
3. 確認 `GAME_BASE_PATH` 仍為 `/time-adventure`  
4. 重新部署 GitHub Pages  
5. 開啟 `qr-codes.html` 重新下載五張正式 QR（不可沿用測試站 QR）

## 關卡路徑

僅使用：

- `stage-1` … `stage-5`

不保留任何 `level-*` 資料夾或相容路徑。

| 編號 | 名稱 | 地點 | 玩法摘要 |
|------|------|------|----------|
| 01 | 啟航輸送機 | 303運動休息室 | 輸送機水管接通 |
| 02 | 液冷尋密碼 | 319運動休息室 | 三模組擦拭＋運算組合＝2026 |
| 03 | 廣運歷史快問快答 | 廣運歷史牆 | 五題四選一 |
| 04 | 修復智慧工廠 | 三樓活動現場後門 | 六技術配置三大系統 |
| 05 | 廣運成功密碼 | 329運動休息室 | 3×3 主視覺拼圖 |

## 共用流程

每關進入後：

遊戲規則 →【開始挑戰】→ 3、2、1、GO → 開始遊戲＋180 秒倒數

- 規則閱讀期間不計時、不初始化會影響結果的遊戲狀態  
- 計時採 `endTime = Date.now() + duration`（切換頁籤後時間仍正確）  
- 完成／逾時會停止計時並取消未完成 timeout

## 如何修改文案／題目／密語

1. 編輯 `time-adventure/puzzles.json`  
2. 執行：

```bash
py scripts/split-time-adventure.py
```

## 本機預覽

```bash
py -m http.server 8080
```

- http://127.0.0.1:8080/time-adventure/  
- http://127.0.0.1:8080/time-adventure/stage-1/  
- http://127.0.0.1:8080/time-adventure/qr-codes.html  

（本機預覽時 QR 仍指向 `SITE_BASE_URL`，不會改成 localhost。）

## 維護檔案

| 檔案 | 用途 |
|------|------|
| `config.js` | 網址／限時唯一設定 |
| `game-common.js` | 計時／音效／321GO／成就／防呆共用 |
| `puzzles.json` | 文案與題目來源 |
| `station-template.html` | 遊戲邏輯模板 |
| `scripts/split-time-adventure.py` | 產出各關頁與 QR |
