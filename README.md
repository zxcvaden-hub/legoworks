# 廣運50週年慶 · 智能客服 AI

減少活動期間重複性人工回覆，提供 **24/7 即時問答**（報到、交通、餐飲、闖關、親子區等）。

## 功能

- **FAQ 知識庫**：依關鍵字與語意重疊自動匹配答案（無需 API 即可運作）
- **快捷問題按鈕**：一鍵詢問常見主題
- **可選 AI 增強**：設定 `OPENAI_API_KEY` 後，可回答知識庫未列舉但仍在活動範圍內的問題
- **易於維護**：編輯 `data/knowledge.json` 即可更新時間、地點、FAQ

## 快速啟動

需 **Node.js 18+**（內建 `fetch`，無需 npm install）

```bash
cd chatbot
node server.js
```

瀏覽器開啟：**http://localhost:3780**

### 手機使用（同一 Wi‑Fi）

1. 在電腦執行 `node server.js`（或雙擊 **`啟動-手機可用.command`**）
2. 終端機會顯示手機網址，例如：`http://192.168.1.23:3780`
3. 手機瀏覽器開啟該網址，或電腦開啟 **http://localhost:3780/qr.html** 掃描 QR Code
4. iPhone 可點「分享 → 加入主畫面」，像 App 一樣開啟

> 電腦需保持開機且服務運行中。

### 手機掃碼後無法開啟？

常見原因與解法：

1. **QR 指向 localhost**（最常見）→ 重新啟動 `node server.js`，用 `qr.html` 頁顯示的 **192.168.x.x** 網址
2. **手機用了 4G/5G** → 關閉行動數據，只用與電腦相同的 Wi‑Fi
3. **Mac 防火牆阻擋** → 系統設定 → 網路 → 防火牆 → 允許 `node` 連入
4. **公司 Wi‑Fi 用戶隔離** → 改用手機開熱點，讓電腦連手機熱點後再啟動服務
5. **VPN** → 電腦與手機都先關閉 VPN

手機可先開啟 `http://電腦IP:3780/ping.html` 測試連線，成功後再進入首頁。

### 雲端部署（推薦：手機任意網路可用）

請依照 **[DEPLOY.md](./DEPLOY.md)** 部署至 Render，取得 `https://xxx.onrender.com` 固定網址後，  
開啟 `/qr.html` 產生 QR Code 供活動使用。

## 啟用 AI（選填）

```bash
cp .env.example .env
# 編輯 .env，填入 OPENAI_API_KEY
npm start
```

未設定 API Key 時，系統僅使用 FAQ 模式，適合內網或離線演示。

## 自訂知識庫

編輯 `data/knowledge.json`：

| 區塊 | 說明 |
|------|------|
| `event` | 活動名稱、地點、日期 |
| `contacts` | 廣運福利委員會、服務台、緊急聯絡 |
| `faqs` | 問答列表，每筆含 `keywords` 與 `answer` |
| `quickReplies` | 畫面下方快捷按鈕文字 |

修改後 **重新啟動** 服務即可生效。

## 部署建議

- **活動官網／報到頁**：以 iframe 嵌入或反向代理至 `/`
- **內網**：僅 FAQ 模式，不需外連 OpenAI
- **現場 QR Code**：連結至客服頁，減少服務台排隊

## 資料來源說明

初始 FAQ 依專案內報價單與提案整理（台大綜合體育館、2026/8/14–8/15 等）。正式上線前請由主辦單位核對日期、交通、窗口電話後更新 `knowledge.json`。
