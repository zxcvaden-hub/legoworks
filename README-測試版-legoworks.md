# 廣運50週年慶智能客服｜測試版（legoworks）

> **這是測試版說明。**  
> 本站僅供內部預覽與驗證。  
> **正式對外請改用正式版：** [`README-正式版-kenmec.md`](./README-正式版-kenmec.md)  
> **先讀導覽：** [`LEADME.md`](./LEADME.md)｜進度：[`PROGRESS_SNAPSHOT.md`](./PROGRESS_SNAPSHOT.md)（2026-07-29 下午）

## 基本資訊

| 項目 | 內容 |
|------|------|
| 專案名稱 | 廣運50週年慶智能客服測試版 |
| GitHub repo | `zxcvaden-hub/legoworks`（目前 `a892304`＋docs） |
| 智能客服 | https://zxcvaden-hub.github.io/legoworks/?v=20260729d |
| QR Code | https://zxcvaden-hub.github.io/legoworks/qr.html |
| 時光探險（測試） | https://zxcvaden-hub.github.io/legoworks/time-adventure/?v=20260729d |
| 客服／知識庫版本 | **0728**（與正式版內容同步） |
| FAQ 數量 | **39** 則 |
| 時光探險版本 | **20260729d**（cache bust／LINE 提示／BGM 懶載／50年文案） |

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
| 第 3 關｜廣運歷史小測驗 | `/time-adventure/stage-3/` |
| 第 4 關｜廣運AI智慧一點通 | `/time-adventure/stage-4/` |
| 第 5 關｜廣運成功密碼 | `/time-adventure/stage-5/` |
| QR 總覽 | `/time-adventure/qr-codes.html` |

現場避快取：網址後加 `?v=20260729d`。

## 客服維護

1. 改 `data/knowledge.json`  
2. inject → `py scripts/verify-chatbot-health.py` PASS  
3. 上傳本站根目錄客服檔（勿覆蓋 `time-adventure/`）
