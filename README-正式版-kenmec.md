# 廣運50週年慶智能客服｜正式版（kenmec）

> **這是正式版說明。**  
> 正式對外請只用本站。測試預覽請改看測試版：[`README-測試版-legoworks.md`](./README-測試版-legoworks.md)

## 基本資訊

| 項目 | 內容 |
|------|------|
| 專案名稱 | 廣運50週年慶智能客服正式版 |
| GitHub repo | `zxcvaden-hub/kenmec` |
| 智能客服 | https://zxcvaden-hub.github.io/kenmec/ |
| QR Code | https://zxcvaden-hub.github.io/kenmec/qr.html |
| 客服／知識庫版本 | **0728** 正式版 |
| FAQ 數量 | **39** 則 |

## 與測試版的差異（註解）

- **正式版 repo／網址：** `kenmec` → 活動正式使用
- **測試版 repo／網址：** `legoworks` → 僅內部驗證，**不要**把測試版 QR／連結當正式對外發放
- 兩邊客服內容可同步更新；對外公告、DM、海報請一律使用 **kenmec** 網址
- 上傳客服時：**不要刪除或覆蓋** kenmec 既有的其他活動檔案（若之後有 `time-adventure/` 等）

## 功能

- FAQ 關鍵字回答（報到、交通、餐飲、闖關、摸彩等）
- 正式快捷：交通方式、活動流程 Rundown、如何報到、餐飲安排、參加禮與闖關禮、聯絡福利委員會
- 「交通方式」顯示捷運／公車／停車場卡片與一鍵導航
- 純靜態，不呼叫 OpenAI、不需後端

## 必傳檔案（上傳至 kenmec 根目錄）

```
├── index.html
├── knowledge.json
├── qr.html
├── qrcode.min.js
└── messageImage_1779701547098.jpg
```

## 上傳後檢查（建議無痕）

- https://zxcvaden-hub.github.io/kenmec/?v=0728
- https://zxcvaden-hub.github.io/kenmec/qr.html?v=0728
- 副標不出現「大量使用版」
- 快捷 6 鈕正確
- 報到時間三分段、員工證／打卡／清真／fallback 文案符合 0728 規則

## 活動重點（2026/8/15）

- 地點：國立臺灣大學綜合體育館
- 報到：出勤／榮譽假 **09:00 前** QR；**09:30** 開放入場；**10:00 前** 就座
- 報到處：三樓（即救護站）
- 保溫瓶：現場不發放，符合資格者活動結束後回廠發放

詳細雙站上傳流程見：[`README-上傳說明.md`](./README-上傳說明.md)
