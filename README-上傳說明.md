# 廣運上線版 · GitHub Pages 上傳包

此資料夾內**所有檔案**請上傳到新 GitHub 儲存庫的**根目錄**（不要放進子資料夾）。

## 必傳檔案（5 個）

| 檔案 | 用途 |
|------|------|
| index.html | **智能客服主頁**（含樣式、FAQ、快捷按鈕、交通卡片） |
| messageImage_1779701547098.jpg | 客服頭像圖（與 index.html 同層） |
| qr.html | QR Code 頁（掃碼進客服） |
| qrcode.min.js | QR 頁所需程式 |
| knowledge.json | 知識庫備份（選填但建議一併上傳，方便日後對照） |

## 上傳步驟

1. 開啟你的 GitHub 新 repo 頁面  
2. **Add file** → **Upload files**  
3. 將本資料夾內 **5 個檔案** 全部拖入（含 jpg）  
4. Commit message 例：`deploy guangyun chatbot`  
5. 到 repo **Settings** → **Pages** → Source 選 **Deploy from branch** → 分支 **main**（或 master）→ 資料夾 **/ (root)** → Save  
6. 等 1～3 分鐘，網址通常為：  
   `https://你的帳號.github.io/你的repo名稱/`

## 上傳後測試

- 客服首頁：`https://你的帳號.github.io/repo名稱/?v=1`  
- QR 頁：`https://你的帳號.github.io/repo名稱/qr.html`  
- 點快捷 **「交通方式」** → 應出現三欄交通卡片  
- 點 **「廣運50週年紀念品與闖關禮」** → 應寫入場報到 QR 領取  

## 勿上傳這些（會搞錯版面）

- `public/index.html`（舊版，樣式會壞）  
- 整個 `public/` 資料夾  
- `server.js`、`.env`（本機用，上線不需要）

## 重新打包

在 chatbot2 專案執行：`node pack-guangyun-deploy.js`

產生時間：2026/5/28 下午2:14:50
