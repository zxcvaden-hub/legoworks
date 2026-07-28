# 廣運50週年慶智能客服｜測試版（legoworks）

> **這是測試版說明。**  
> 本站僅供內部預覽與驗證。  
> **正式對外請改用正式版：** [`README-正式版-kenmec.md`](./README-正式版-kenmec.md)

## 基本資訊

| 項目 | 內容 |
|------|------|
| 專案名稱 | 廣運50週年慶智能客服測試版 |
| GitHub repo | `zxcvaden-hub/legoworks` |
| 智能客服 | https://zxcvaden-hub.github.io/legoworks/ |
| QR Code | https://zxcvaden-hub.github.io/legoworks/qr.html |
| 時光探險（測試） | https://zxcvaden-hub.github.io/legoworks/time-adventure/ |
| 客服／知識庫版本 | **0728**（與正式版內容同步） |
| FAQ 數量 | **39** 則 |

## 與正式版的差異（註解）

- **測試版：** `legoworks` — 給工作人員／廠商內部試問、試掃 QR
- **正式版：** `kenmec` — 活動正式對外唯一建議網址
- 測試版可與正式版同步同一套客服檔案，方便先驗再上正式站
- **請勿**把本測試站網址印成正式海報／對來賓發放
- 上傳客服時：**不要刪除或覆蓋既有 `time-adventure/` 資料夾**

## 功能（與正式版相同）

- FAQ 關鍵字回答
- 正式快捷 6 鈕
- 交通卡片與導航
- 純靜態運作

## 必傳檔案（上傳至 legoworks 根目錄）

```
├── index.html
├── knowledge.json
├── qr.html
├── qrcode.min.js
└── messageImage_1779701547098.jpg
```

> 另外請保留既有：`time-adventure/`（不要覆蓋刪除）

## 上傳後檢查（建議無痕）

- https://zxcvaden-hub.github.io/legoworks/?v=0728
- https://zxcvaden-hub.github.io/legoworks/qr.html?v=0728
- https://zxcvaden-hub.github.io/legoworks/time-adventure/（確認闖關仍在）
- 快捷、報到三分段、員工證／打卡／清真／fallback 與正式版一致

詳細雙站上傳流程見：[`README-上傳說明.md`](./README-上傳說明.md)
