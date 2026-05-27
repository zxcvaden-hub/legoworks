const fs = require('fs');
const path = require('path');

const ROOT = __dirname;
const knowledge = JSON.parse(
  fs.readFileSync(path.join(ROOT, 'data', 'knowledge.json'), 'utf8')
);
const css = fs.readFileSync(path.join(ROOT, 'public', 'css', 'style.css'), 'utf8');

const html = `<!DOCTYPE html>
<html lang="zh-Hant">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0, viewport-fit=cover" />
  <meta name="theme-color" content="#c41e3a" />
  <title>廣運50週年慶｜活動客服（離線版）</title>
  <style>${css}</style>
</head>
<body>
  <div class="page">
    <header class="hero">
      <div class="hero-badge">50th · 離線版</div>
      <h1>廣運50週年慶</h1>
      <p class="hero-sub" id="event-subtitle">活動小幫手 · 無需網路伺服器</p>
    </header>
    <main class="chat-card">
      <div class="chat-header">
        <div class="avatar">AI</div>
        <div><strong>活動小幫手</strong><br><span class="status"><span class="dot"></span> 離線問答</span></div>
      </div>
      <div id="messages" class="messages"></div>
      <div id="quick-replies" class="quick-replies"></div>
      <form id="chat-form" class="chat-form">
        <input id="user-input" type="text" enterkeyhint="send" placeholder="輸入問題…" maxlength="500" />
        <button type="submit" id="send-btn">送出</button>
      </form>
    </main>
    <footer class="footer"><p>有問題請洽廣運福利委員會或現場服務台</p></footer>
  </div>
  <script>
const KNOWLEDGE = ${JSON.stringify(knowledge)};

const QUICK_MAP = {
  '活動流程 Rundown': 'Rundown',
  '如何報到': '如何報到',
  '參加禮與闖關禮': '參加禮',
  '親子手作體驗': '親子手作',
  '飲水與設施': '飲水',
  '舞台表演時段': '舞台表演',
  '餐飲安排': '餐飲',
  '摸彩與閉幕': '摸彩',
  '聯絡福利委員會': '福利委員會',
  '轉人工客服': '福利委員會',
};

function normalize(t) {
  return t.toLowerCase().replace(/[\\s\\u3000]+/g, '').replace(/[？?！!。．，,、；;：:「」『』【】（）()]/g, '');
}

function tokenize(t) {
  const tokens = new Set();
  const cjk = t.toLowerCase().match(/[\\u4e00-\\u9fff]{2,}/g) || [];
  cjk.forEach((w) => { tokens.add(w); for (let i = 0; i < w.length - 1; i++) tokens.add(w.slice(i, i + 2)); });
  (t.toLowerCase().match(/[a-z0-9]+/gi) || []).forEach((w) => tokens.add(w));
  return tokens;
}

function scoreFaq(msg, faq) {
  const norm = normalize(msg);
  let score = 0;
  (faq.keywords || []).forEach((kw) => { const n = normalize(kw); if (n && norm.includes(n)) score += 3; });
  const qn = normalize(faq.question);
  if (qn && norm.includes(qn)) score += 5;
  const mt = tokenize(msg);
  const ft = tokenize([faq.question, ...(faq.keywords || [])].join(' '));
  mt.forEach((t) => { if (ft.has(t)) score += 1; });
  return score;
}

function findFaq(msg) {
  let best = null, bestScore = 0;
  KNOWLEDGE.faqs.forEach((faq) => {
    const s = scoreFaq(msg, faq);
    if (s > bestScore) { bestScore = s; best = faq; }
  });
  if (bestScore >= 4) return { faq: best, confident: true };
  if (bestScore >= 2) return { faq: best, confident: false };
  return { faq: null, confident: false };
}

function chat(msg) {
  const text = QUICK_MAP[msg.trim()] || msg.trim();
  const { faq, confident } = findFaq(text);
  if (confident && faq) return faq.answer;
  if (faq) return faq.answer;
  return KNOWLEDGE.fallback;
}

const messagesEl = document.getElementById('messages');
const quickEl = document.getElementById('quick-replies');
const form = document.getElementById('chat-form');
const input = document.getElementById('user-input');

function md(t) {
  return t.replace(/\\*\\*(.+?)\\*\\*/g, '<strong>$1</strong>').replace(/\\n/g, '<br>');
}

function append(text, role) {
  const d = document.createElement('div');
  d.className = 'msg ' + role;
  if (role === 'bot') d.innerHTML = md(text); else d.textContent = text;
  messagesEl.appendChild(d);
  messagesEl.scrollTop = messagesEl.scrollHeight;
}

function sendMessage(text) {
  const t = text.trim();
  if (!t) return;
  append(t, 'user');
  input.value = '';
  setTimeout(() => append(chat(t), 'bot'), 120);
}

(KNOWLEDGE.quickReplies || []).forEach((label) => {
  const b = document.createElement('button');
  b.type = 'button';
  b.textContent = label;
  b.onclick = () => sendMessage(label);
  quickEl.appendChild(b);
});

form.onsubmit = (e) => { e.preventDefault(); sendMessage(input.value); };

document.getElementById('event-subtitle').textContent =
  (KNOWLEDGE.event && KNOWLEDGE.event.name ? KNOWLEDGE.event.name + ' · ' : '') + '離線智能客服';

append('您好！我是廣運50週年慶活動小幫手（離線版），可查活動流程、報到、餐飲、闖關等。無法解答時請洽 **廣運福利委員會** 或服務台。', 'bot');
  </script>
</body>
</html>`;

const out = path.join(ROOT, 'standalone.html');
fs.writeFileSync(out, html, 'utf8');
console.log('已產生：' + out);
