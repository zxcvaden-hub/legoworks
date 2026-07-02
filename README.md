# 廣運 50 週年慶 · 智能客服＋時光探險

廣運 50 週年家庭日活動的 **靜態網站**，部署於 GitHub Pages，無需後端伺服器，可同時供大量來賓使用。

## 正式網址

| 用途 | 網址 |
|------|------|
| 智能客服 | https://zxcvaden-hub.github.io/kenmec/ |
| QR 掃碼頁 | https://zxcvaden-hub.github.io/kenmec/qr.html |
| 時光探險（五關解謎） | https://zxcvaden-hub.github.io/kenmec/time-adventure/ |

測試版（樂高）：https://zxcvaden-hub.github.io/legoworks/

## 功能簡介

### 智能客服（`index.html`）

- 依關鍵字自動回答活動 FAQ（報到、交通、餐飲、闖關、摸彩等）
- 快捷按鈕：**交通方式**、活動流程、親子手作、飲水設施、摸彩閉幕、**🕰️ 時光探險**、聯絡福利委員會
- 點 **交通方式** → 顯示捷運／公車／停車場卡片與一鍵導航
- 點 **🕰️ 時光探險** → 直接進入闖關頁面
- 純靜態運作，不呼叫 OpenAI、不需資料庫

### 時光探險（`time-adventure/`）

五關實境解謎互動遊戲，進度儲存在使用者手機瀏覽器（localStorage）。

1. 啟航輸送機（5×5 管道拼圖）
2. 液冷尋密碼
3. 智慧人對話（歷史牆五題問答）
4. 孿生記憶牆（翻牌配對）
5. 百年願景鎖（終極密碼 **2026**）

五關全數完成可至 **三樓服務台** 兌換 **100 元禮券**。

## 上傳至 GitHub 的檔案清單

請上傳至 repo **根目錄**（`zxcvaden-hub/kenmec`）：

```
kenmec/
├── README.md
├── index.html
├── knowledge.json
├── qr.html
├── qrcode.min.js
├── messageImage_1779701547098.jpg
└── time-adventure/
    ├── index.html
    ├── puzzles.json
    └── adventure.js
```

### 上傳步驟

1. 開啟 GitHub repo：`zxcvaden-hub/kenmec`
2. **Add file** → **Upload files**
3. 拖入上表所有檔案（含 `time-adventure/` 資料夾）
4. Commit，例如：`deploy 廣運50週年客服與時光探險`
5. **Settings** → **Pages** → Branch 選 `main`、資料夾選 `/ (root)` → Save
6. 等待 1～3 分鐘後用正式網址測試

### 若 repo 內仍有舊檔，請刪除

- `time-adventure/print.html`（已停用）
- `time-adventure/staff.html`（已停用）

### 勿上傳至 GitHub Pages

- `server.js`、`.env`（本機開發用）
- `public/` 資料夾
- `data/`、`build-pages.js`、`faq-admin.html` 等開發工具

## 上傳後測試清單

- [ ] 客服首頁可開啟
- [ ] 點 **交通方式** → 出現停車場卡片與導航按鈕
- [ ] 點 **🕰️ 時光探險** → 跳轉至 `time-adventure/`
- [ ] 時光探險五關可正常遊玩
- [ ] 第五關輸入 `2026` 可通關
- [ ] `qr.html` 可掃碼進入客服

## 維護方式（開發專案）

本機完整專案維護流程：

1. 編輯 FAQ：`data/knowledge.json`
2. 同步至 `index.html` 內嵌知識庫（或執行 `node build-pages.js`）
3. 編輯闖關：`time-adventure/index.html`、`time-adventure/puzzles.json`
4. 上傳變更檔案至 GitHub

## 活動重點（2026/8/15）

- 地點：國立臺灣大學綜合體育館
- 報到：09:30–10:00，**三樓報到處（即救護站）**
- 五十週年紀念禮：**保溫瓶**，報到掃 QR **當場**領取
- 來賓餐盒：三樓報到處外走廊，11:30 起
- 餐車：一樓，11:30 起
- 現場問題：廣運福利委員會、三樓服務台

## 授權與用途

本專案為廣運 50 週年慶活動內部使用。活動相關文案請以主辦單位公告為準。
