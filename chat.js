const messagesEl = document.getElementById('messages');
const quickRepliesEl = document.getElementById('quick-replies');
const form = document.getElementById('chat-form');
const input = document.getElementById('user-input');
const sendBtn = document.getElementById('send-btn');

function renderMarkdown(text) {
  return text
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    .replace(/\n/g, '<br>');
}

function appendMessage(text, role) {
  const div = document.createElement('div');
  div.className = `msg ${role}`;
  if (role === 'bot') {
    div.innerHTML = renderMarkdown(text);
  } else {
    div.textContent = text;
  }
  messagesEl.appendChild(div);
  messagesEl.scrollTop = messagesEl.scrollHeight;
  return div;
}

function setLoading(on) {
  sendBtn.disabled = on;
  input.disabled = on;
}

async function sendMessage(text) {
  const trimmed = text.trim();
  if (!trimmed) return;

  appendMessage(trimmed, 'user');
  input.value = '';
  setLoading(true);

  const typing = appendMessage('正在為您查詢…', 'bot typing');

  try {
    const res = await fetch('/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message: trimmed }),
    });

    typing.remove();

    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      appendMessage(err.error || '連線失敗，請稍後再試', 'bot');
      return;
    }

    const data = await res.json();
    appendMessage(data.reply, 'bot');
  } catch {
    typing.remove();
    appendMessage('網路異常，請確認連線後再試，或洽廣運福利委員會／現場服務台', 'bot');
  } finally {
    setLoading(false);
    input.focus();
  }
}

function bindQuickReplies(items) {
  quickRepliesEl.innerHTML = '';
  items.forEach((label) => {
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.textContent = label;
    btn.addEventListener('click', () => sendMessage(label));
    quickRepliesEl.appendChild(btn);
  });
}

form.addEventListener('submit', (e) => {
  e.preventDefault();
  sendMessage(input.value);
});

async function init() {
  try {
    const res = await fetch('/api/config');
    const config = await res.json();
    if (config.eventName) {
      document.getElementById('event-subtitle').textContent =
        `${config.eventName} · 智能客服`;
    }
    bindQuickReplies(config.quickReplies || []);
  } catch {
    bindQuickReplies([
      '活動流程 Rundown',
      '如何報到',
      '舞台表演時段',
      '摸彩與閉幕',
    ]);
  }

  appendMessage(
    '您好！我是廣運50週年慶活動小幫手，可協助查詢活動流程、報到、餐飲、闖關、舞台節目等常見問題。若有其他問題，請洽 **廣運福利委員會** 或現場服務台。請直接輸入問題，或點選下方快捷按鈕。',
    'bot'
  );
}

init();
