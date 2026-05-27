# 雲端部署指南（手機 4G / Wi‑Fi 皆可使用）

部署後會取得固定 **https 網址**（例如 `https://guangyun-50-chatbot.onrender.com`），  
手機**不必**與電腦同一 Wi‑Fi，掃 QR Code 即可開啟智能客服。

本專案建議使用 **[Render](https://render.com)**（免費方案即可）。

---

## 步驟一：上傳程式到 GitHub

1. 至 [GitHub](https://github.com) 建立新 repository（例如 `guangyun-50-chatbot`）
2. 只上傳 **`chatbot` 資料夾內的所有檔案** 到 repo 根目錄（不要多包一層資料夾）

在終端機執行（路徑請改成您的）：

```bash
cd "/Users/shuaiyau/Desktop/廣運/50週年/chatbot"
git init
git add .
git commit -m "廣運50週年智能客服"
git branch -M main
git remote add origin https://github.com/您的帳號/guangyun-50-chatbot.git
git push -u origin main
```

> 若整個「50週年」資料夾都要放進同一 repo，Render 的 **Root Directory** 請填 `chatbot`。

---

## 步驟二：在 Render 建立網站

1. 登入 [Render Dashboard](https://dashboard.render.com/)
2. 點 **New +** → **Web Service**
3. 連結剛才的 GitHub repo
4. 設定如下：

| 項目 | 值 |
|------|-----|
| **Name** | `guangyun-50-chatbot`（自訂） |
| **Region** | Singapore（離台灣較近） |
| **Branch** | `main` |
| **Root Directory** | 留空（若 repo 只有 chatbot 內容）或填 `chatbot` |
| **Runtime** | Node |
| **Build Command** | 留空或 `echo ok` |
| **Start Command** | `node server.js` |
| **Instance Type** | Free |

5. 點 **Create Web Service**，等待部署（約 3–5 分鐘）
6. 完成後會顯示網址，例如：  
   **`https://guangyun-50-chatbot.onrender.com`**

---

## 步驟三：產生 QR Code 給現場使用

1. 電腦瀏覽器開啟：  
   `https://您的網址.onrender.com/qr.html`
2. 掃描畫面上的 QR Code（此時為 **https 公開網址**，任何手機網路皆可）
3. 將 QR 印在海報、工作證、EDM 或 Line 群組

**智能客服首頁：** `https://您的網址.onrender.com/`

---

## 步驟四（選填）：啟用 AI 回答

在 Render → 您的服務 → **Environment** 新增：

| Key | Value |
|-----|--------|
| `OPENAI_API_KEY` | 您的 OpenAI API 金鑰 |
| `OPENAI_MODEL` | `gpt-4o-mini`（可省略） |

儲存後會自動重新部署。

---

## 注意事項

- **免費方案**：約 15 分鐘無人使用會休眠，**第一次開啟可能需等 30–60 秒**，之後即正常。
- 活動當天可提前用手機開啟一次網址「喚醒」服務。
- 更新 FAQ：修改 `data/knowledge.json` 後 `git push`，Render 會自動重新部署。
- 若有公司網域，可在 Render 設定 **Custom Domain**（例如 `event.guangyun.com`）。

---

## 疑難排解

| 狀況 | 解法 |
|------|------|
| 部署失敗 | 確認 Start Command 為 `node server.js`，Node 版本 ≥ 18 |
| 開啟很慢 | 免費方案冷啟動，可升級付費或活動前先喚醒 |
| 想改知識庫 | 編輯 `knowledge.json` 後 push 至 GitHub |

---

## 其他雲端（進階）

同一套程式亦可部署至 Railway、Fly.io 等，需設定環境變數 `PUBLIC_URL` 為您的 https 網址。
