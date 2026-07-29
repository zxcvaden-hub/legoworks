/**
 * 將 data/knowledge.json 寫入 index.html 的 KNOWLEDGE 區塊
 * 用法：node inject-knowledge.js
 *
 * 安全規則：
 * - 必須用 JSON.stringify 產生合法 JSON（禁止手貼／PowerShell 展開 \n）
 * - 寫入後立刻自檢：可被 JSON.parse，且與來源知識庫一致
 * - 找不到標記或自檢失敗時中止，不寫入半成品
 */
const fs = require("fs");
const path = require("path");

const ROOT = __dirname;
const knowledgePath = path.join(ROOT, "data", "knowledge.json");
const indexPath = path.join(ROOT, "index.html");
const rootKnowledgePath = path.join(ROOT, "knowledge.json");

function findKnowledgeBounds(html) {
  const startMark = "const KNOWLEDGE = ";
  const start = html.indexOf(startMark);
  if (start < 0) throw new Error("index.html 找不到 const KNOWLEDGE = ");
  const jsonStart = start + startMark.length;
  const endMarks = [";\nconst QUICK_MAP", ";\r\nconst QUICK_MAP", ";const QUICK_MAP"];
  let jsonEnd = -1;
  let used = null;
  for (const mark of endMarks) {
    const idx = html.indexOf(mark, jsonStart);
    if (idx >= 0) {
      jsonEnd = idx;
      used = mark;
      break;
    }
  }
  if (jsonEnd < 0) throw new Error("index.html 找不到 KNOWLEDGE 結束標記（;…const QUICK_MAP）");
  return { startMark, jsonStart, jsonEnd, endMark: used };
}

function extractKnowledgeJson(html) {
  const { jsonStart, jsonEnd } = findKnowledgeBounds(html);
  return html.slice(jsonStart, jsonEnd).trim();
}

function assertSafeEmbed(parsed, source) {
  const a = JSON.stringify(parsed);
  const b = JSON.stringify(source);
  if (a !== b) throw new Error("內嵌 KNOWLEDGE 與 data/knowledge.json 內容不一致");
  if (!Array.isArray(parsed.faqs) || parsed.faqs.length < 1) {
    throw new Error("KNOWLEDGE.faqs 異常");
  }
  if (!Array.isArray(parsed.quickReplies) || parsed.quickReplies.length < 1) {
    throw new Error("KNOWLEDGE.quickReplies 異常（快捷鈕會消失）");
  }
  // Guard: raw control chars inside JSON text would break <script>
  const raw = JSON.stringify(parsed);
  if (/[\u0000-\u0008\u000B\u000C\u000E-\u001F]/.test(raw)) {
    throw new Error("序列化結果含非法控制字元");
  }
}

const knowledge = JSON.parse(fs.readFileSync(knowledgePath, "utf8"));
let html = fs.readFileSync(indexPath, "utf8");
const bounds = findKnowledgeBounds(html);

// Pretty-print keeps production readable and matches the repaired live format.
const embedded = JSON.stringify(knowledge, null, 2);
assertSafeEmbed(JSON.parse(embedded), knowledge);

const next =
  html.slice(0, bounds.jsonStart) +
  embedded +
  html.slice(bounds.jsonEnd);

// Self-check on the exact bytes we are about to write
const check = JSON.parse(extractKnowledgeJson(next));
assertSafeEmbed(check, knowledge);
if (!next.includes("const QUICK_MAP")) {
  throw new Error("寫入後遺失 QUICK_MAP（頁面快捷／輸入會整頁失效）");
}
if (!next.includes("bindQuickReplies")) {
  throw new Error("寫入後遺失 bindQuickReplies");
}

fs.writeFileSync(indexPath, next);
fs.writeFileSync(rootKnowledgePath, JSON.stringify(knowledge, null, 2) + "\n");

console.log(
  "已同步 KNOWLEDGE → index.html、knowledge.json（FAQ " +
    knowledge.faqs.length +
    " 則，快捷 " +
    knowledge.quickReplies.length +
    " 鈕；已通過 JSON 自檢）"
);
