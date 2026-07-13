# GitHub Pages 上傳包

打包時間：2026/07/13 14:49

## 上傳目標（擇一）

| 用途 | Repo | 網址 |
|------|------|------|
| **測試版** | `zxcvaden-hub/legoworks` | https://zxcvaden-hub.github.io/legoworks/ |
| **正式版** | `zxcvaden-hub/kenmec` | https://zxcvaden-hub.github.io/kenmec/ |

時光探險：`…/time-adventure/` · QR：`…/qr.html`

## 必傳檔案（上傳至 repo 根目錄）

```
├── README.md
├── index.html
├── knowledge.json
├── qr.html
├── qrcode.min.js
├── messageImage_1779701547098.jpg
├── MOBILE-RWD-REPORT.md
└── time-adventure/
    ├── index.html
    ├── puzzles.json
    ├── adventure.js
    └── audio/
        └── bgm.mp3
```

## 上傳步驟（GitHub Desktop 或網頁）

1. 開啟目標 repo（legoworks 或 kenmec）
2. 將本資料夾**所有檔案**複製到 repo 根目錄（覆蓋同名檔）
3. **刪除** repo 內下列舊檔（若仍存在）：

- `server.js`
- `render.yaml`
- `style.css`
- `update.sample`
- `shuai-main.zip`
- `使用說明-放棄雲端後怎麼用.txt`
- `啟動-手機可用.command`
- `活動FAQ-服務台列印版.md`
- `public/`
- `data/`
- `build-pages.js`
- `build-standalone.js`
- `pack-guangyun-deploy.js`
- `inject-knowledge.js`
- `merge-knowledge.js`
- `faq-admin.html`
- `time-adventure/print.html`
- `time-adventure/staff.html`
- `time-adventure/adventure.css`

4. Commit：`deploy 廣運50週年客服與時光探險（含手機 RWD 驗收）`
5. Push 後等 1～3 分鐘，用無痕視窗測試

## 上傳後快速檢查

- [ ] 客服首頁可開、頭像有顯示
- [ ] 點「🕰️ 時光探險」→ 五關可玩
- [ ] 第一關水管可通關、有光點動畫
- [ ] 第二關擦除後點「確認 2010 · 通關」
- [ ] 第三關歡迎語為【歷史小測驗】、通關密語「榮耀半世紀，百年展願景」
- [ ] 第四關通關密語「數位孿生」
- [ ] 第五關輸入正確終極密碼可通關
- [ ] 背景音樂按鈕可開關
- [ ] **手機實機**：鍵盤彈出時輸入框不被擋住

## 勿上傳

開發用檔案請留在本機 `chatbot2/`，不要進 repo。
