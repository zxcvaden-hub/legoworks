# 廣運時光探險

廣運 50 週年家庭日 · 五關手機互動挑戰＋現場蓋章。靜態網站，部署於 GitHub Pages。

**進度存檔：** 詳見專案根目錄 `PROGRESS_SNAPSHOT.md`（**2026-07-29 下午**）。  
**目前測試站（LEGOWORKS）最新：** `a892304`｜`ASSET_VERSION=20260806a`

正式對外請待切換 `SITE_BASE_URL` 至 kenmec 後再下載正式 QR。

## 線上測試入口（LEGOWORKS）

| 頁面 | 路徑 |
|------|------|
| 活動說明 | `/time-adventure/` |
| 第 1～5 關 | `/time-adventure/stage-1/` … `/stage-5/` |
| QR 總覽（工作人員） | `/time-adventure/qr-codes.html` |

完整網址由 `config.js` 的 `SITE_BASE_URL` 組合。  
避快取請加：`?v=20260806a`

- 活動說明：https://zxcvaden-hub.github.io/legoworks/time-adventure/?v=20260806a  
- 第 2 關：https://zxcvaden-hub.github.io/legoworks/time-adventure/stage-2/?v=20260806a  

## 網址／限時／快取版本（唯一設定）

所有公開網址、共用限時、資源版本號**只**在：

`time-adventure/config.js`

```js
const SITE_BASE_URL = "...";           // 唯一要改的站點根網址
const GAME_BASE_PATH = "/time-adventure";
const GAME_DURATION_SECONDS = 180;     // 五關共用限時
const ASSET_VERSION = "20260806a";     // 改程式後請提高，避舊快取
```

- `STAGE_URLS`、`QR_OVERVIEW_URL` 由此自動組合  
- HTML 引用的 JS／CSS 請帶 `?v=`（與 `ASSET_VERSION` 同步；改完跑 split）  
- **不要**在其他 HTML／JS 再寫死完整 GitHub Pages 網址（活動客服連結除外）  
- 本機預覽時 QR 仍指向 `SITE_BASE_URL`（不會變成 localhost）

### 正式站切換（legoworks → kenmec）

1. 將完整 `time-adventure/` 複製到正式 repo  
2. **只改** `SITE_BASE_URL` 為 kenmec 站點根網址  
3. 確認 `GAME_BASE_PATH` 仍為 `/time-adventure`  
4. 提高 `ASSET_VERSION` → 跑 split → 重新部署  
5. 開啟 `qr-codes.html` **重新下載**五張正式 QR  
6. 不可沿用 LEGOWORKS 測試 QR 交付客戶

## 關卡路徑

僅使用 `stage-1` … `stage-5`（**不保留** `level-*`）。

| 編號 | 名稱 | 地點 | 玩法摘要 | 通關密語 |
|------|------|------|----------|----------|
| 01 | 啟航輸送機 | 303運動休息室 | 輸送機水管接通 | 第一台輸送機 |
| 02 | 液冷尋密碼 | 319運動休息室 | 刮開覆蓋層找算式（約一半即可作答）＝2026 | AI液冷啟動成功 |
| 03 | 廣運歷史小測驗 | 廣運歷史牆 | 五題四選一，全部答對 | 立足台灣，布局全球 |
| 04 | 廣運AI智慧一點通 | 三樓活動後門玄關 | 先點系統、再點設備 | 智慧整合成功 |
| 05 | 廣運成功密碼 | 329運動休息室 | 3×3 主視覺拼圖 | 展望百年願景 |

玩法文案與密語以 `puzzles.json` 為準。  
第 2 關故事已定稿為「廣運將**50年**累積的……」（勿寫四十多年）。

### 第 3 關題目（目前版本）

「廣運歷史小測驗」為五題三選一，題目涵蓋：

1. 廣運集團公司創立的起點日期
2. 盛新材料科技投入的碳化矽（SiC）材料技術
3. 廣運創立初期的自動運輸設備技術
4. 永暘光學隱形眼鏡的透氧性
5. 太極能源發展的太陽能

正確選項與玩家端資料均以 `puzzles.json` 為唯一來源；更新後必須執行 split 重建。

## 玩家流程（五關統一）

```
掃描該關 QR
→ 遊戲規則畫面（不計時）
→ 按下【開始挑戰】
→ 3、2、1、GO
→ 開始遊戲＋倒數 180 秒
```

補充：

- 五關**不限順序**；各關獨立 QR，互不相連  
- 通關後向關主報告密語，於**闖關護照**蓋章  
- 五關集滿印章 → 找**任一關關主**領 **100 元禮券**（打洞核銷；每人限 1 次）  
- 手機進度僅供查閱；兌獎以紙本護照為準  
- 頂部「← 活動客服」→ `https://zxcvaden-hub.github.io/kenmec/`

## 現場穩定（2026-07-29 已上線）

| 項目 | 說明 |
|------|------|
| Cache busting | JS／CSS／圖加 `?v=20260806a` |
| LINE 提示 | 偵測 LINE／微信等內建瀏覽器 → 建議 Safari／Chrome 開啟 |
| BGM 懶載 | `preload="none"`；預設關；**手動開聲音才載入** mp3 |
| 題目資料 | 內嵌於 `game-data.js`（**不** `fetch(puzzles.json)`） |
| 關主速查卡 | 桌面／ZIP 內 `關主密語速查卡.txt`（紙本備援） |

## 聲音設定

| 項目 | 說明 |
|------|------|
| 背景音樂 | `audio/bgm.mp3`；預設關，需手動開（才下載） |
| 操作音效 | Web Audio；預設開；開始挑戰時解鎖 AudioContext |

## 如何修改文案／題目／密語

1. 編輯 `time-adventure/puzzles.json`  
2. 若改了模板或資源，同步提高 `config.js` 的 `ASSET_VERSION`  
3. 執行：

```bash
py scripts/split-time-adventure.py
```

4. 同步至 `_legoworks-upload/time-adventure/` → commit／push  

會產生 `game-data.js`、`stage-*`、`qr-codes.html`、活動說明頁。  
**勿手改** `game-data.js`。  
**勿用 PowerShell 無 UTF-8 直接改 stage HTML**（會弄壞中文）。

## 本機預覽

```bash
py -m http.server 8080
```

- http://127.0.0.1:8080/time-adventure/  
- http://127.0.0.1:8080/time-adventure/stage-1/  

## 維護檔案

| 檔案 | 用途 |
|------|------|
| `config.js` | 網址／限時／`ASSET_VERSION` |
| `game-data.js` | **執行時**遊戲資料（split 產生） |
| `game-common.js` | 計時／音效／321GO／成就 |
| `puzzles.json` | **編輯用**來源 |
| `station-template.html` | 遊戲模板 |
| `scripts/split-time-adventure.py` | 重建五關 |

## 最近線上更新（LEGOWORKS）

- `a892304`：第 2 關「五十／40多年」→「**50年**」；`ASSET_VERSION=20260806a`  
- `d13451d`：cache bust、LINE 外開提示、BGM 懶載  
- 第 4 關 UX：先點系統再點設備；狀態列置底  
- 過關引導「尋找下一關掃 QR」；禮券 100 元＋護照打洞文案  
