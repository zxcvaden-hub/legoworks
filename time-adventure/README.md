# 廣運時光探險（0728 完整 UX）

廣運 50 週年家庭日 · 五關手機互動挑戰＋現場蓋章。靜態網站，部署於 GitHub Pages。

**目前測試站（LEGOWORKS）已更新至本版。**  
正式對外請待切換 `SITE_BASE_URL` 至 kenmec 後再下載正式 QR。

## 線上測試入口（LEGOWORKS）

| 頁面 | 路徑 |
|------|------|
| 活動說明 | `/time-adventure/` |
| 第 1～5 關 | `/time-adventure/stage-1/` … `/stage-5/` |
| QR 總覽（工作人員） | `/time-adventure/qr-codes.html` |

完整網址由 `config.js` 的 `SITE_BASE_URL` 組合，預設指向 legoworks 測試站。

測試站範例：https://zxcvaden-hub.github.io/legoworks/time-adventure/

## 網址／限時唯一設定

所有公開網址與共用限時**只**在：

`time-adventure/config.js`

```js
const SITE_BASE_URL = "...";           // 唯一要改的站點根網址
const GAME_BASE_PATH = "/time-adventure";
const GAME_DURATION_SECONDS = 180;     // 五關共用限時
```

- `STAGE_URLS`、`QR_OVERVIEW_URL` 由此自動組合  
- **不要**在其他 HTML／JS 再寫死完整 GitHub Pages 網址（活動客服連結除外）  
- 本機預覽時 QR 仍指向 `SITE_BASE_URL`（不會變成 localhost）

### 正式站切換（legoworks → kenmec）

1. 將完整 `time-adventure/` 複製到正式 repo  
2. **只改** `SITE_BASE_URL` 為 kenmec 站點根網址  
3. 確認 `GAME_BASE_PATH` 仍為 `/time-adventure`  
4. 重新部署 GitHub Pages  
5. 開啟 `qr-codes.html` **重新下載**五張正式 QR  
6. 不可沿用 LEGOWORKS 測試 QR 交付客戶

## 關卡路徑

僅使用：

- `stage-1` … `stage-5`

**不保留**任何 `level-*` 資料夾或相容路徑。

| 編號 | 名稱 | 地點 | 玩法摘要 |
|------|------|------|----------|
| 01 | 啟航輸送機 | 303運動休息室 | 輸送機水管接通 |
| 02 | 液冷尋密碼 | 319運動休息室 | 刮開覆蓋層找算式（公式露出約一半即可作答）＋運算組合＝2026 |
| 03 | 廣運歷史小測驗 | 廣運歷史牆 | 選出正確答案，全部答對完成（選項每次亂序） |
| 04 | 廣運AI智慧一點通 | 三樓活動後門玄關 | 六技術配置三大系統 |
| 05 | 廣運成功密碼 | 329運動休息室 | 3×3 主視覺拼圖 |

玩法文案（`howToPlay`）與密語以 `puzzles.json` 為準；第 3 關密語目前為「立足台灣，布局全球」。

## 玩家流程（五關統一）

```
掃描該關 QR
→ 遊戲規則畫面（不計時）
→ 按下【開始挑戰】
→ 3、2、1、GO（每下有逼聲；GO 另有提示音）
→ 開始遊戲＋倒數 180 秒
```

補充：

- 規則閱讀期間不計時  
- 計時採 `endTime = Date.now() + duration`（切換頁籤後時間仍正確）  
- 最後 10 秒每秒「逼—逼」提示音  
- 逾時：「時間到，本關挑戰失敗」→【重新挑戰】回到規則頁  
- 通關：停止計時 → 成就徽章 →（第五關另有品牌動畫）→ 通關密語＋**尋找下一關掃碼指引**（不再用返回連結當主引導）  
- 右上「時光探險」顯示**目前關卡**進度（第 X／5），非跨 QR 真實完成紀錄  
- 頂部「← 活動客服」連到正式 FAQ：`https://zxcvaden-hub.github.io/kenmec/`

## 聲音設定

左上「聲音設定」：

| 項目 | 說明 |
|------|------|
| 背景音樂 | `audio/bgm.mp3`；預設關，需手動開 |
| 操作音效 | Web Audio（答對／答錯／過關／3-2-1／倒數逼聲）；預設開 |

注意（尤其 iOS Safari）：

- 首次觸控或按【開始挑戰】會解鎖 AudioContext  
- 若聽不到音效，確認「操作音效：開」，並重新整理後再按開始挑戰

## 第 2 關擦拭注意

- 只計算**公式附近**擦開比例；露出約一半即可解鎖選項  
- 筆刷需不透明連續擦拭（已修「滑過去沒變化」問題）

## 如何修改文案／題目／密語

1. 編輯 `time-adventure/puzzles.json`  
2. 執行：

```bash
py scripts/split-time-adventure.py
```

會同步產生 `game-data.js`、`stage-*`、`qr-codes.html`、活動說明頁。  
**勿手改** `game-data.js`。

## 本機預覽

於專案根目錄：

```bash
py -m http.server 8080
```

- http://127.0.0.1:8080/time-adventure/  
- http://127.0.0.1:8080/time-adventure/stage-1/  
- http://127.0.0.1:8080/time-adventure/qr-codes.html  

## 維護檔案

| 檔案 | 用途 |
|------|------|
| `config.js` | 網址／限時唯一設定 |
| `game-data.js` | **執行時**唯一遊戲資料（`window.GAME_DATA`，由 build 產生） |
| `game-common.js` | 計時／音效／321GO／成就／防呆共用 |
| `puzzles.json` | **編輯用**來源；修改後必須跑 split |
| `station-template.html` | 遊戲邏輯模板 |
| `scripts/split-time-adventure.py` | 產出各關頁與 QR |
| `MANIFEST.json` | 本包版本與檔案清單 |

## 最近線上更新（LEGOWORKS）

- 過關畫面改為「尋找下一關掃 QR」指引  
- 3-2-1 / GO、最後 10 秒倒數逼聲  
- 第 2 關擦拭修復＋公式一半即可作答  
- 第 2／3 關玩法文案更新；第 3 關密語「立足台灣，布局全球」  
- 活動客服連到 kenmec 正式 FAQ  
