# GitHub Pages 上傳包

打包時間：2026/7/8 下午3:02:42

## 上傳目標（擇一）

| 用途 | Repo | 網址 |
|------|------|------|
| **測試版（現階段請用）** | `zxcvaden-hub/legoworks` | https://zxcvaden-hub.github.io/legoworks/ |
| 正式版（活動日前上線） | `zxcvaden-hub/kenmec` | https://zxcvaden-hub.github.io/kenmec/ |

客服 QR：`…/qr.html` · 闖關：`…/time-adventure/` · 闖關 QR：`…/time-adventure/qr.html`

> 測試期間請上傳至 **legoworks**，勿將 kenmec 作為對外測試網址。

## 必傳檔案（上傳至 repo 根目錄）

```
├── README.md
├── index.html
├── knowledge.json
├── qr.html                    ← 智能客服 QR
├── qrcode.min.js
├── messageImage_1779701547098.jpg
└── time-adventure/
    ├── index.html
    ├── puzzles.json
    ├── adventure.js
    ├── qr.html                ← 時光探險專用 QR
    └── audio/
        └── bgm.mp3
```

## 公開網址（測試版 legoworks — 現階段請用）

| 用途 | 網址 |
|------|------|
| 智能客服 | https://zxcvaden-hub.github.io/legoworks/ |
| 客服 QR | https://zxcvaden-hub.github.io/legoworks/qr.html |
| 時光探險 | https://zxcvaden-hub.github.io/legoworks/time-adventure/ |
| 闖關 QR | https://zxcvaden-hub.github.io/legoworks/time-adventure/qr.html |

## 正式版（kenmec — 活動上線前勿作測試對外）

| 用途 | 網址 |
|------|------|
| 智能客服 | https://zxcvaden-hub.github.io/kenmec/ |
| 客服 QR | https://zxcvaden-hub.github.io/kenmec/qr.html |
| 時光探險 | https://zxcvaden-hub.github.io/kenmec/time-adventure/ |
| 闖關 QR | https://zxcvaden-hub.github.io/kenmec/time-adventure/qr.html |

## 上傳步驟（GitHub Desktop 或網頁）

1. 開啟目標 repo：**測試請用 legoworks**（正式上線再用 kenmec）
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

4. Commit：`deploy 廣運50週年客服與時光探險`
5. Push 後等 1～3 分鐘，用無痕視窗測試

## 上傳後快速檢查

- [ ] 客服首頁可開、頭像有顯示
- [ ] 客服快捷按鈕**無**「時光探險」（已獨立 QR）
- [ ] `qr.html` 掃碼 → 進入智能客服
- [ ] `time-adventure/qr.html` 掃碼 → 進入闖關頁
- [ ] 時光探險五關**皆可任意點選**（不限順序）
- [ ] 通關後顯示密語，提示向關主在遊戲護照蓋章
- [ ] 第一關水管可通關 · 第二關通關密語 2010
- [ ] 第三關通關密語「榮耀半世紀，百年展願景」
- [ ] 第四關「數位孿生」· 第五關輸入 2026 可通關
- [ ] 背景音樂按鈕可開關
- [ ] 新增客服 FAQ（32 則）可正常回答

## 勿上傳

開發用檔案請留在本機 `chatbot2/`，不要進 repo。
