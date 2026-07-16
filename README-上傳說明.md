# GitHub Pages 上傳包（0716）

打包時間：2026/07/16 14:27  
知識庫版本：**0716** · FAQ：**39 則**

## 上傳目標

| 用途 | Repo | 網址 |
|------|------|------|
| **測試版（請用）** | `zxcvaden-hub/legoworks` | https://zxcvaden-hub.github.io/legoworks/ |

客服 QR：`…/qr.html` · 時光探險：`…/time-adventure/` · 闖關 QR：`…/time-adventure/qr.html`

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

4. Commit：`deploy 廣運50週年客服 0716（39則FAQ）`
5. Push 後等 1～3 分鐘，用無痕視窗測試

## 0716 上傳後快速檢查

- [ ] 客服首頁可開、頭像有顯示（`?v=20260716`）
- [ ] 問「電梯」→ 有無障礙電梯說明
- [ ] 問「陶板屋」或「餐盒」→ 無份數／金額
- [ ] 問「點券」→ 三樓服務台 $50／點
- [ ] 問「保溫瓶」→ 活動結束後廠內發放、員工限定
- [ ] `qr.html` 掃碼 → 進入智能客服
- [ ] `time-adventure/qr.html` 掃碼 → 進入闖關頁

## 勿上傳

開發用檔案請留在本機 `chatbot2/`，不要進 repo。
