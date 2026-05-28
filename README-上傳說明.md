# ken 測試版 · GitHub Pages 上傳包（0528）

打包時間：2026/5/28 下午3:52:12

## 上傳網址（依你的 repo）

- 帳號：**zxcvaden-hub**
- 測試 repo 建議：**kenmec**（或你指定的 ken 測試 repo）
- 客服首頁：`https://zxcvaden-hub.github.io/kenmec/?v=0528`
- QR 頁：`https://zxcvaden-hub.github.io/kenmec/qr.html`

## 必傳檔案（根目錄，共 5 個）

| 檔案 | 說明 |
|------|------|
| index.html | 智能客服主頁（含 Intent、交通卡片、快捷按鈕） |
| messageImage_1779701547098.jpg | 客服頭像（與 index 同層） |
| qr.html | QR 掃碼頁 |
| qrcode.min.js | QR 頁所需 |
| knowledge.json | 知識庫備份（建議一併上傳） |

## 上傳步驟

1. 開啟 GitHub repo（例如 `zxcvaden-hub/kenmec`）
2. **Add file** → **Upload files**
3. 將本資料夾內 **全部檔案** 拖入根目錄（覆蓋舊檔）
4. Commit：`ken測試版本0528`
5. **Settings → Pages** → 分支 **main**、資料夾 **/ (root)** → Save
6. 等 1～3 分鐘後用無痕開啟測試網址

## 上傳後快速檢查

- [ ] 首頁可開、頭像有顯示
- [ ] 快捷按鈕含「交通方式」「廣運50週年紀念品與闖關禮」
- [ ] 點「交通方式」→ 三欄卡片 + Google Maps
- [ ] 問「紀念品」→ 入場報到 QR 領取（非散場後）

## 勿上傳

- `public/index.html`（舊版，樣式會壞）
- `server.js`、`.env`（本機用）
- 整個 `public/` 資料夾

## 重新打包

在 chatbot2 執行：`node pack-ken-deploy.js`
