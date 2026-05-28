# GitHub Pages 發布包 · 20260528

此資料夾內檔案請**全部**上傳至 GitHub 儲存庫**根目錄**（覆蓋舊檔）。

## 內含檔案

| 檔案 | 用途 |
|------|------|
| index.html | 前台智能客服（內嵌樣式 + FAQ，**正式版**） |
| knowledge.json | 知識庫 JSON（與 data/knowledge.json 同步） |
| qr.html | QR Code 導向頁 |
| qrcode.min.js | QR 產生函式庫 |
| messageImage_1779701547098.jpg | 客服頭像／主視覺 |
| MANIFEST.json | 版本清單與 MD5 校驗 |

## 上傳步驟

1. 開啟 https://github.com/zxcvaden-hub/legoworks
2. Add file → Upload files
3. 拖入本資料夾**所有檔案**（含圖片）
4. Commit message：`release 20260528 - chatbot pages`
5. 等 1–3 分鐘後開啟測試網址

## 測試網址

- 客服：https://zxcvaden-hub.github.io/legoworks/?v=20260528
- QR：https://zxcvaden-hub.github.io/legoworks/qr.html

## 本版摘要

- 活動：廣運50週年慶活動
- 活動日：2026年8月15日（六）活動日 07:00–22:00
- FAQ 則數：18
- 關鍵字總數：635
- 產生時間：2026-05-28T05:43:29.092Z

## 注意

- 勿上傳 `public/index.html`（舊版介面，CSS 路徑錯誤）
- 本機完整專案與知識庫維護仍用工作目錄的 `data/knowledge.json` + `node build-pages.js`

