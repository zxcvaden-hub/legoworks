# 廣運50週年慶智能客服

靜態 FAQ 客服（GitHub Pages，無需後端）。知識庫版本：**0728**｜FAQ：**39** 則。

> **請先確認要開哪一個站：**  
> - **正式版**給活動對外／正式使用  
> - **測試版**給內部預覽與驗證，請勿當成正式對外網址

---

## 正式版 vs 測試版（請勿混淆）

| 項目 | 正式版 | 測試版 |
|------|--------|--------|
| 用途 | 活動正式對外 | 內部測試／預覽 |
| GitHub repo | [`zxcvaden-hub/kenmec`](https://github.com/zxcvaden-hub/kenmec) | [`zxcvaden-hub/legoworks`](https://github.com/zxcvaden-hub/legoworks) |
| 智能客服 | https://zxcvaden-hub.github.io/kenmec/ | https://zxcvaden-hub.github.io/legoworks/ |
| QR Code | https://zxcvaden-hub.github.io/kenmec/qr.html | https://zxcvaden-hub.github.io/legoworks/qr.html |
| 時光探險 | 依 kenmec 現場部署為準 | https://zxcvaden-hub.github.io/legoworks/time-adventure/（0728 UX／stage-only） |
| 專屬說明 | [`README-正式版-kenmec.md`](./README-正式版-kenmec.md) | [`README-測試版-legoworks.md`](./README-測試版-legoworks.md) |

上傳步驟見：[`README-上傳說明.md`](./README-上傳說明.md)

時光探險維護細節：[`time-adventure/README.md`](./time-adventure/README.md)（網址只改 `config.js` 的 `SITE_BASE_URL`）

---

## 客服重點（0728）

- 報到：出勤／榮譽假 **09:00 前** QR Code 報到；**09:30** 開放入場；**10:00 前** 就座
- 正常報到只需個人 QR；員工證僅供異常核對
- 活動當天不需公司上下班打卡；進場／離場仍須活動 QR 報到及簽退
- 快捷 6 鈕：交通方式、活動流程 Rundown、如何報到、餐飲安排、參加禮與闖關禮、聯絡福利委員會

## 必傳客服檔案

```
├── index.html
├── knowledge.json
├── qr.html
├── qrcode.min.js
└── messageImage_1779701547098.jpg
```

上傳時**不要刪除或覆蓋**目標 repo 既有的 `time-adventure/`（若存在）。

## 本機維護

1. 編輯 `data/knowledge.json`
2. 同步到 `index.html` 內嵌 KNOWLEDGE（`node inject-knowledge.js`）
3. 確認 `knowledge.json` 與 `index.html` 一致後，再分別上傳正式版／測試版
