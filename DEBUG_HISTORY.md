# Debug 與決策紀錄

這份文件保留前期重要 debug 內容，方便接手者理解為什麼現在採用 GitHub Pages 靜態版。

## 1. 本機 Node 服務

最初建立的是 Node 服務：

```bash
node server.js
```

本機可開：

```text
http://localhost:3780
```

同 Wi-Fi 手機可嘗試：

```text
http://電腦IP:3780
```

但此方式受限於：

- 電腦需保持開機且不能睡眠
- 手機需與電腦同一 Wi-Fi
- 公司 Wi-Fi 可能禁止裝置互連
- Mac 防火牆或 VPN 可能阻擋

因此不適合正式活動大量使用。

## 2. QR Code 問題

曾使用 CDN 載入 QR library，發現 CDN 路徑 404，導致 QR Code 不顯示。

解法：

- 將 QR library 存成專案內本地檔案 `qrcode.min.js`
- `qr.html` 改用本地檔案，不依賴外部 CDN

## 3. 臨時公開網址問題

曾用 `localhost.run` 建立臨時公開網址，例如：

```text
https://728c2aa3549c6e.lhr.life/
```

測試可用，但後來 tunnel 中斷。此類網址問題：

- 不穩定，可能中斷
- 有些公司網路或手機瀏覽器會擋
- 電腦關機或網路斷線即失效
- 不適合活動大量使用

結論：放棄臨時 tunnel，改用 GitHub Pages。

## 4. Render / 雲端部署

曾準備 Render 部署：

- `render.yaml`
- `DEPLOY.md`
- `server.js`

但實際操作對非工程使用者較繁瑣，且免費方案有冷啟動。因此最後改採 GitHub Pages 靜態版。

## 5. GitHub Pages 最終方案

現在正式大量使用版本為：

```text
https://zxcvaden-hub.github.io/kenmec/
```

（測試：`https://zxcvaden-hub.github.io/legoworks/`）

舊網址 `https://vydyyau-lab.github.io/shuai/` 已停用。

優點：

- 大量使用較穩
- 不需要電腦開著
- 不需要 Node server
- 不需要 API key
- 只要上傳 `index.html` 即可更新

限制：

- 是 FAQ 關鍵字匹配，不是真正連線 LLM
- 改 `knowledge.json` 後需要執行 `node build-pages.js` 重建 `index.html`

## 6. 主視覺圖

客服頭像原本是紅色 `AI` 方塊，後改為主視覺：

```text
messageImage_1779701547098.jpg
```

GitHub Pages 版的 `index.html` 會引用此檔案，因此上傳時須確保圖片也在 repo 根目錄。

## 7. 近期關鍵字升級

已大量補充以下類別的問法：

- 交通：怎麼去、停車、接駁、捷運、公車、導航、Google map
- 流程：rundown、schedule、timeline、幾點開始／結束
- 禮品：參加禮、闖關禮、保溫杯、領取方式
- 親子：DIY、手作、限量 500 份、先到先得
- 設施：飲水機、廁所、救護站、醫療、休息
- 摸彩：抽獎、閉幕、需要在場嗎、領獎
- 福利委員會：人工客服、找工作人員、聯絡窗口

## 8. 交接建議

接手者若用 Cursor 開啟整個 `chatbot` 資料夾，請先閱讀：

1. `CURSOR_HANDOFF.md`
2. `.cursor/rules/project-context.mdc`
3. `data/knowledge.json`
4. `inject-knowledge.js`（勿執行已停用的 `build-pages.js`）

## 9. 進度儲存檢查點（2026-07-28）

- 知識庫版本 **0728**，FAQ **39**，快捷 **6**
- 正式站 kenmec 與測試站 legoworks 已同步客服內容（含匿名提問紀錄、五關主題更名、「不限順序」）
- 交付包：`0728正式廣運客服上線版本/` 已與根目錄同步
- 本機專案目錄非 git repo；遠端以 kenmec／legoworks 的 `main` 為準
- 當日暫停於此：使用者表示「目前先這樣」

## 10. 時光探險晚間存檔（2026-07-28）

- 詳見 `PROGRESS_SNAPSHOT.md`（晚間暫存點）；LEGOWORKS 最新 `dc33c59`
- 曾因 PowerShell 無 UTF-8 寫入 stage HTML → JS 字串損壞 → 整頁空白；改以 `py scripts/split-time-adventure.py` 重建
- 第 2 關擦拭曾「滑過無變化」：mask 畫完質地後 `fillStyle` 近透明；改不透明筆刷＋連續線擦拭
- iOS 音效需使用者手勢解鎖 AudioContext（`unlockAudio`）；3-2-1／最後 10 秒逼聲已接上
- 過關後引導改為「尋找下一關掃 QR」；活動客服連 kenmec
- 活動說明頁關卡置中＋📍／表情；下方三段文案已定稿（闖關方式／禮券兌換／注意事項）

## 11. 正式客服整頁失效（2026-07-28 晚間）

- **現象**：快捷鈕消失、輸入無反應。
- **根因**：`index.html` 內嵌 `const KNOWLEDGE` 字串換行被寫成真實換行 → `<script>` SyntaxError → `bindQuickReplies`／送出事件未執行。
- **觸發**：`7e2bee0`（20:36）；**修復**：`d36a2d0`（23:12）。
- **防範**：只用 `inject-knowledge.js` 或 `py scripts/inject-knowledge.py`；上線前跑 `py scripts/verify-chatbot-health.py`；禁止手貼 KNOWLEDGE。

## 12. 進度儲存檢查點（2026-07-29 下午）

- 詳見 `PROGRESS_SNAPSHOT.md`（目前最新）。
- **kenmec** `f0f4c7e`：LINE 外開提示、頭像 `?v=`。
- **legoworks** `a892304`：`ASSET_VERSION=20260729d`；cache bust、LINE 提示、BGM 懶載；第 2 關「四十多年」→「50年」。
- 桌面包：`廣運時光探險_20260729-3.zip`、`廣運50週年智能客服_20260729-3.zip`、關主密語速查卡。
- 其他 AI 建議採納結論：不做 SPA；做版本號／LINE 提示／紙本關主速查；`fetch(puzzles.json)` 已不適用。
- 當日暫停於此：使用者要求「現在進度請幫我儲存設立」。
