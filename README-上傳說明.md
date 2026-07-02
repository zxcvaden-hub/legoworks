# 時光探險上傳0702 · GitHub Pages 上傳包

打包時間：2026/7/2

## 上傳目標

- Repo：**zxcvaden-hub/kenmec**
- 客服首頁：https://zxcvaden-hub.github.io/kenmec/
- QR 頁：https://zxcvaden-hub.github.io/kenmec/qr.html
- 時光探險：https://zxcvaden-hub.github.io/kenmec/time-adventure/

## 必傳檔案

將本資料夾內**全部檔案與 time-adventure/ 子資料夾**上傳至 repo **根目錄**：

```
kenmec/
├── README.md
├── index.html
├── knowledge.json
├── qr.html
├── qrcode.min.js
├── messageImage_1779701547098.jpg   ← 若本包沒有，請從舊版 repo 保留或手動補上
└── time-adventure/
    ├── index.html
    ├── puzzles.json
    └── adventure.js
```

## 上傳步驟

1. 開啟 https://github.com/zxcvaden-hub/kenmec
2. **Add file** → **Upload files**
3. 拖入本資料夾所有檔案（含 `time-adventure/` 資料夾）
4. Commit：`deploy 廣運50週年客服與時光探險`
5. **Settings → Pages** → Branch **main**、資料夾 **/ (root)** → Save
6. 等 1～3 分鐘後測試正式網址

## 若 repo 內仍有舊檔，請刪除

- `time-adventure/print.html`
- `time-adventure/staff.html`

## 上傳後快速檢查

- [ ] 客服首頁可開、頭像有顯示
- [ ] 點「交通方式」→ 停車場卡片與導航
- [ ] 點「🕰️ 時光探險」→ 進入闖關頁
- [ ] 第二關擦除後數字會出現
- [ ] 第三關五題標題為【主題】格式
- [ ] 第五關輸入 `2026` 可通關
- [ ] `qr.html` 可掃碼進入

## 勿上傳

- `server.js`、`.env`、`public/`、`data/`、`build-pages.js` 等開發工具
