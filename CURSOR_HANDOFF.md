# 廣運50週年智能客服交接說明

這包是「廣運50週年慶活動智能客服」完整專案，可用 Cursor 直接開啟並接續維護。

## 專案目標

- 讓活動來賓用手機查詢活動資訊，減少服務台重複回覆。
- 正式版採 **GitHub Pages 靜態頁**（kenmec）。

## 公開網址（2026-07-29 狀態）

| 用途 | 網址 |
|------|------|
| **正式版（對外）** | https://zxcvaden-hub.github.io/kenmec/ |
| 正式 QR | https://zxcvaden-hub.github.io/kenmec/qr.html |
| 測試版 | https://zxcvaden-hub.github.io/legoworks/ |
| 測試 QR | https://zxcvaden-hub.github.io/legoworks/qr.html |
| 時光探險（測試站） | https://zxcvaden-hub.github.io/legoworks/time-adventure/ |

現場避快取請加：`?v=20260729d`

正式 repo：`zxcvaden-hub/kenmec`（目前 `f0f4c7e`）  
測試 repo：`zxcvaden-hub/legoworks`（目前 `a892304`）

~~舊網址（已停用）~~：`https://vydyyau-lab.github.io/shuai/`

## 重要檔案

- **`LEADME.md`**：給 AI／接手者的導讀（先讀我）
- `PROGRESS_SNAPSHOT.md`：目前最新進度存檔（2026-07-29 下午）
- `index.html`：正式客服 UI（內嵌 KNOWLEDGE + 匿名提問紀錄）
- `knowledge.json` / `data/knowledge.json`：知識庫（須與內嵌同步）
- `qr.html` / `qrcode.min.js`：QR 頁
- `google-apps-script.gs`：提問紀錄後端參考碼（貼至 Google Apps Script）
- `0728正式廣運客服上線版本/`：正式交付打包（已與根目錄同步）
- `time-adventure/`：時光探險（另案；上傳客服時勿覆蓋目標 repo 既有資料夾）
- `inject-knowledge.js`：同步知識庫；**禁止執行** `build-pages.js`

## 活動重點（知識庫 0728）

- 活動日：2026/8/15（六）
- 報到：出勤／榮譽假 **09:00 前** QR；**09:30** 開放入場；**10:00 前** 就座
- 報到處＝救護站（三樓）
- 保溫瓶：現場不發；員工限定、全程參加；結束後回廠發放
- 廣運50闖關：5 關任完成 3 關；主題為關卡一～五正式名稱；**不限順序**
- 時光探險：五關完成找**任一關關主**領 **100 元禮券**（每人限 1 次）
- 快捷 6 鈕：交通方式、活動流程 Rundown、如何報到、餐飲安排、參加禮與闖關禮、聯絡福利委員會
- FAQ：**39** 則；`_meta.knowledgeVersion`：**0728**

## 匿名提問紀錄

- 前端 `LOG_API_URL` → Google Apps Script → Sheet「工作表1」
- 不蒐集姓名／員工編號／電話／Email／IP
- 修改 Script 後需重新部署；更新 `LOG_API_URL` 後需再上線 kenmec

## 如何修改 FAQ

1. 編輯 `data/knowledge.json`
2. 同步內嵌知識庫（二選一）：
   - `node inject-knowledge.js`
   - 或 `py scripts/inject-knowledge.py`（本機沒有 node 時）
3. **上線前必跑**：`py scripts/verify-chatbot-health.py`（確認 KNOWLEDGE 可解析、快捷存在、與 knowledge.json 一致）
4. 上傳至 **kenmec**（正式）及／或 **legoworks**（測試）
5. 測試加 `?v=日期` 避快取

> 禁止手貼／用 PowerShell 直接改 `index.html` 裡的 `const KNOWLEDGE`。  
> 若字串換行被展開成真實換行，整頁 JS 會掛掉（快捷消失、輸入無反應）。  
> 禁止執行已停用的 `build-pages.js`。

## 本機測試

```bash
py -m http.server 3780
# http://localhost:3780
```

或直接開啟根目錄 `index.html`。

## 進度檢查點（2026-07-29 下午儲存）

詳見 **`PROGRESS_SNAPSHOT.md`**（目前最新存檔）。

### 時光探險
- 本機：`time-adventure/`（`puzzles.json` → `py scripts/split-time-adventure.py`）
- 線上 LEGOWORKS：`a892304`；`ASSET_VERSION=20260729d`
- 已上：cache bust、LINE 外開提示、BGM 懶載、第 2 關「50年」文案、第 4 關點選 UX
- 桌面：`廣運時光探險_20260729-3.zip`＋關主密語速查卡

### 正式版客服
- 知識庫：`data/knowledge.json`（**0728**，FAQ **39**）
- 正式 kenmec：`f0f4c7e`（LINE 提示＋頭像 cache）
- 上線前必跑：`py scripts/verify-chatbot-health.py`
- 桌面：`廣運50週年智能客服_20260729-3.zip`
- 本機 `chatbot2` **不是** git repo；上傳用 `_kenmec-upload/`、`_legoworks-upload/`

### 切換方式（給下一位／下一則對話）
1. 說：接續 `PROGRESS_SNAPSHOT.md` 的 **2026-07-29 下午**存檔點
2. 正式客服：改 `data/knowledge.json` → inject → verify PASS → 上傳 kenmec（勿覆蓋 `time-adventure/`）
3. 時光探險：改 `puzzles.json` → split → 同步 `_legoworks-upload` → push；記得提高 `ASSET_VERSION`
