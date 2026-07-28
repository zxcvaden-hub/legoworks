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
| 時光探險版本 | **0728 UX**（stage-only、180 秒、規則＋321GO） |

## 與正式版的差異

- **測試版：** `legoworks` — 給工作人員／廠商內部試問、試掃 QR  
- **正式版：** `kenmec` — 活動正式對外唯一建議網址  
- **請勿**把本測試站網址印成正式海報／對來賓發放  
- 上傳客服時：**不要刪除或覆蓋既有 `time-adventure/` 資料夾**

## 時光探險（測試站現況）

詳細維護說明：[`time-adventure/README.md`](./time-adventure/README.md)

| 關卡 | 路徑 |
|------|------|
| 活動說明 | `/time-adventure/` |
| 第 1 關｜啟航輸送機 | `/time-adventure/stage-1/` |
| 第 2 關｜液冷尋密碼 | `/time-adventure/stage-2/` |
| 第 3 關｜廣運歷史快問快答 | `/time-adventure/stage-3/` |
| 第 4 關｜修復智慧工廠 | `/time-adventure/stage-4/` |
| 第 5 關｜廣運成功密碼 | `/time-adventure/stage-5/` |
| QR 總覽 | `/time-adventure/qr-codes.html` |

重點：

- 僅 `stage-1`～`stage-5`（已無 `level-*`）  
- 網址集中於 `time-adventure/config.js` → `SITE_BASE_URL`  
- 五關統一：規則 → 開始挑戰 → 3、2、1、GO → 180 秒  
- 測試 QR 不可交付客戶；正式站需改 `SITE_BASE_URL` 後重下 QR

## 客服功能（與正式版相同）

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

> 另外請保留／更新：`time-adventure/`（完整五關包）

## 上傳後檢查（建議無痕）

- https://zxcvaden-hub.github.io/legoworks/?v=0728  
- https://zxcvaden-hub.github.io/legoworks/qr.html?v=0728  
- https://zxcvaden-hub.github.io/legoworks/time-adventure/?v=0728b  
- https://zxcvaden-hub.github.io/legoworks/time-adventure/stage-1/?v=0728b  
- https://zxcvaden-hub.github.io/legoworks/time-adventure/qr-codes.html?v=0728b  

詳細雙站上傳流程見：[`README-上傳說明.md`](./README-上傳說明.md)
