# 0728 智能客服｜雙站上傳說明

知識庫版本：**0728**｜FAQ：**39** 則

本說明同時涵蓋：

1. **正式版** → `zxcvaden-hub/kenmec`
2. **測試版** → `zxcvaden-hub/legoworks`

請依目標站別上傳，**不要把正式／測試網址搞反**。

---

## 一、站別對照（先看這張表）

| | 正式版 | 測試版 |
|--|--------|--------|
| Repo | `zxcvaden-hub/kenmec` | `zxcvaden-hub/legoworks` |
| 客服 | https://zxcvaden-hub.github.io/kenmec/ | https://zxcvaden-hub.github.io/legoworks/ |
| QR | https://zxcvaden-hub.github.io/kenmec/qr.html | https://zxcvaden-hub.github.io/legoworks/qr.html |
| 說明檔 | [`README-正式版-kenmec.md`](./README-正式版-kenmec.md) | [`README-測試版-legoworks.md`](./README-測試版-legoworks.md) |
| 對外使用 | ✅ 正式對外 | ❌ 僅內部測試 |

總覽：[`README.md`](./README.md)

---

## 二、必傳客服檔案（兩站相同）

從本機專案複製到**目標 repo 根目錄**（覆蓋同名檔）：

```
├── index.html
├── knowledge.json
├── qr.html
├── qrcode.min.js
├── messageImage_1779701547098.jpg
├── README.md
├── README-正式版-kenmec.md
├── README-測試版-legoworks.md
└── README-上傳說明.md
```

### 重要提醒

- **不要刪除或覆蓋既有 `time-adventure/` 資料夾**（legoworks 測試站尤其重要）。
- 客服內容兩邊可同步；**對外連結請用 kenmec**。

---

## 三、上傳正式版（kenmec）

1. 開啟本機 `kenmec` repo
2. 複製上述客服／README 檔到根目錄
3. 確認未誤刪其他正式檔
4. Commit 建議：`deploy 0728 正式客服（與測試站同步）`
5. Push 後無痕測試：
   - https://zxcvaden-hub.github.io/kenmec/?v=0728
   - https://zxcvaden-hub.github.io/kenmec/qr.html?v=0728

---

## 四、上傳測試版（legoworks）

1. 開啟本機 `legoworks` repo
2. 複製上述客服／README 檔到根目錄
3. **確認 `time-adventure/` 仍在**
4. Commit 建議：`deploy 0728 測試客服（與正式站同步）`
5. Push 後無痕測試：
   - https://zxcvaden-hub.github.io/legoworks/?v=0728
   - https://zxcvaden-hub.github.io/legoworks/qr.html?v=0728
   - https://zxcvaden-hub.github.io/legoworks/time-adventure/

---

## 五、上傳後檢查清單（兩站共用）

- [ ] 副標不出現「大量使用版」
- [ ] 快捷 6 鈕：交通方式、活動流程 Rundown、如何報到、餐飲安排、參加禮與闖關禮、聯絡福利委員會
- [ ] 「活動幾點報到」→ 09:00／09:30／10:00 三分段
- [ ] 「要帶員工證嗎」→ 正常報到只需 QR
- [ ] 「要打上下班卡嗎」→ 不需公司打卡，仍須活動 QR 報到及簽退
- [ ] 「9 點前排隊」→ 現場確認後可視為準時（不限遊覽車）
- [ ] 「有清真餐嗎」→ 無豬肉餐 ≠ 清真認證
- [ ] 找不到答案 → 固定導向福利委員會／三樓服務台
- [ ] 測試站：`time-adventure/` 仍可開啟
