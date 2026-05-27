const http = require('http');
const fs = require('fs');
const path = require('path');
const os = require('os');
const { URL } = require('url');

const PORT = Number(process.env.PORT) || 3780;
const HOST = process.env.HOST || '0.0.0.0';
const PUBLIC_BASE = getPublicBaseUrl();
const IS_CLOUD = Boolean(PUBLIC_BASE);
const ROOT = __dirname;

function getPublicBaseUrl() {
  const raw =
    process.env.PUBLIC_URL ||
    process.env.RENDER_EXTERNAL_URL ||
    (process.env.RAILWAY_PUBLIC_DOMAIN
      ? `https://${process.env.RAILWAY_PUBLIC_DOMAIN}`
      : '') ||
    (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : '');
  if (!raw) return null;
  let u = raw.trim().replace(/\/+$/, '');
  if (!/^https?:\/\//i.test(u)) u = `https://${u}`;
  return `${u}/`;
}
/** GitHub 網頁上傳常把檔案放在 repo 根目錄，此對照表相容兩種結構 */
const FLAT_ASSET_MAP = {
  'index.html': 'index.html',
  'css/style.css': 'style.css',
  'js/chat.js': 'chat.js',
  'js/qrcode.min.js': 'qrcode.min.js',
  'qr.html': 'qr.html',
  'ping.html': 'ping.html',
  'manifest.json': 'manifest.json',
  'messageImage_1779701547098.jpg': 'messageImage_1779701547098.jpg',
  'icons/icon-192.svg': 'icon-192.svg',
};

function resolveKnowledgePath() {
  const structured = path.join(ROOT, 'data', 'knowledge.json');
  const flat = path.join(ROOT, 'knowledge.json');
  if (fs.existsSync(structured)) return structured;
  if (fs.existsSync(flat)) return flat;
  return structured;
}

function resolveAssetPath(rel) {
  const inPublic = path.join(ROOT, 'public', rel);
  if (fs.existsSync(inPublic)) {
    return { file: inPublic, base: path.join(ROOT, 'public') };
  }
  const flatName = FLAT_ASSET_MAP[rel];
  if (flatName) {
    const flatPath = path.join(ROOT, flatName);
    if (fs.existsSync(flatPath)) {
      return { file: flatPath, base: ROOT };
    }
  }
  return { file: inPublic, base: path.join(ROOT, 'public') };
}

loadEnv(path.join(ROOT, '.env'));

function loadEnv(filePath) {
  if (!fs.existsSync(filePath)) return;
  for (const line of fs.readFileSync(filePath, 'utf8').split('\n')) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#')) continue;
    const i = trimmed.indexOf('=');
    if (i === -1) continue;
    const key = trimmed.slice(0, i).trim();
    let val = trimmed.slice(i + 1).trim();
    if (
      (val.startsWith('"') && val.endsWith('"')) ||
      (val.startsWith("'") && val.endsWith("'"))
    ) {
      val = val.slice(1, -1);
    }
    if (!(key in process.env)) process.env[key] = val;
  }
}

const MIME = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.ico': 'image/x-icon',
};

function loadKnowledge() {
  const knowledgePath = resolveKnowledgePath();
  if (!fs.existsSync(knowledgePath)) {
    throw new Error(`找不到 knowledge.json（已檢查 data/ 與根目錄）`);
  }
  return JSON.parse(fs.readFileSync(knowledgePath, 'utf8'));
}

function normalize(text) {
  return text
    .toLowerCase()
    .replace(/[\s\u3000]+/g, '')
    .replace(/[？?！!。．，,、；;：:「」『』【】（）()]/g, '');
}

function tokenize(text) {
  const normalized = text.toLowerCase();
  const tokens = new Set();
  const cjk = normalized.match(/[\u4e00-\u9fff]{2,}/g) || [];
  cjk.forEach((w) => {
    tokens.add(w);
    for (let i = 0; i < w.length - 1; i++) tokens.add(w.slice(i, i + 2));
  });
  (normalized.match(/[a-z0-9]+/gi) || []).forEach((w) => tokens.add(w));
  return tokens;
}

function scoreFaq(message, faq) {
  const normMsg = normalize(message);
  let score = 0;
  for (const kw of faq.keywords || []) {
    const nk = normalize(kw);
    if (nk && normMsg.includes(nk)) score += 3;
  }
  const qNorm = normalize(faq.question);
  if (qNorm && normMsg.includes(qNorm)) score += 5;
  const msgTokens = tokenize(message);
  const faqTokens = tokenize(
    [faq.question, ...(faq.keywords || [])].join(' ')
  );
  for (const t of msgTokens) {
    if (faqTokens.has(t)) score += 1;
  }
  return score;
}

function findBestFaq(message, knowledge) {
  let best = null;
  let bestScore = 0;
  for (const faq of knowledge.faqs) {
    const s = scoreFaq(message, faq);
    if (s > bestScore) {
      bestScore = s;
      best = faq;
    }
  }
  if (bestScore >= 2) {
    return { faq: best, score: bestScore, confident: bestScore >= 4 };
  }
  return { faq: null, score: bestScore, confident: false };
}

function formatAmenitiesForAI(amenities) {
  if (!amenities) return '';
  return Object.values(amenities).join('\n');
}

function formatRundownForAI(rundown) {
  if (!rundown) return '';
  const lines = [rundown.summary || ''];
  const section = (items) =>
    (items || []).map((i) => `${i.time} ${i.title}`).join('\n');
  lines.push('【開幕】\n' + section(rundown.opening));
  if (rundown.freeTime) {
    lines.push(
      `【${rundown.freeTime.time} ${rundown.freeTime.title}】\n` +
        (rundown.freeTime.activities || []).map((a) => `・${a}`).join('\n')
    );
  }
  lines.push('【舞台】\n' + section(rundown.stageShows));
  lines.push('【閉幕】\n' + section(rundown.closing));
  return lines.filter(Boolean).join('\n\n');
}

function resolveQuickReply(text) {
  const map = {
    '活動流程 Rundown': 'Rundown',
    如何報到: '如何報到',
    '參加禮與闖關禮': '參加禮',
    親子手作體驗: '親子手作',
    '飲水與設施': '飲水',
    舞台表演時段: '舞台表演',
    餐飲安排: '餐飲',
    摸彩與閉幕: '摸彩',
    聯絡福利委員會: '福利委員會',
    轉人工客服: '福利委員會',
  };
  return map[text] || text;
}

async function askOpenAI(message, knowledge) {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) return null;

  const context = knowledge.faqs
    .map((f) => `Q: ${f.question}\nA: ${f.answer.replace(/\*\*/g, '')}`)
    .join('\n\n');

  const system = `你是「廣運機械工程股份有限公司」50週年慶活動的智能客服助理。
只能根據以下已知資訊回答，不可捏造日期、地點、優惠或聯絡方式。
若資料不足，請建議來賓洽詢「廣運福利委員會」或前往現場服務台。
回答使用繁體中文，簡潔友善，可使用 Markdown 條列。

【活動概要】
名稱：${knowledge.event.name}
地點：${knowledge.event.venue}（${knowledge.event.venueAddress}）
進場：${knowledge.event.dates.setup}
活動日：${knowledge.event.dates.eventDay}

【問題洽詢】
${knowledge.contacts?.helpMessage || '請洽廣運福利委員會'}

【現場服務與禮品】
${formatAmenitiesForAI(knowledge.amenities)}

【活動流程 Rundown】
${formatRundownForAI(knowledge.rundown)}

【常見問答】
${context}`;

  const res = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: process.env.OPENAI_MODEL || 'gpt-4o-mini',
      temperature: 0.3,
      max_tokens: 600,
      messages: [
        { role: 'system', content: system },
        { role: 'user', content: message },
      ],
    }),
  });

  if (!res.ok) {
    console.error('OpenAI error:', res.status, await res.text());
    return null;
  }

  const data = await res.json();
  return data.choices?.[0]?.message?.content?.trim() || null;
}

async function handleChat(body) {
  const knowledge = loadKnowledge();
  const message = body?.message;
  if (!message || typeof message !== 'string' || !message.trim()) {
    return { status: 400, data: { error: '請輸入問題' } };
  }

  const userMessage = resolveQuickReply(message.trim());
  const { faq, score, confident } = findBestFaq(userMessage, knowledge);

  if (confident && faq) {
    return {
      status: 200,
      data: {
        reply: faq.answer,
        source: 'faq',
        faqId: faq.id,
        category: faq.category,
        score,
      },
    };
  }

  const aiReply = await askOpenAI(userMessage, knowledge);
  if (aiReply) {
    return {
      status: 200,
      data: { reply: aiReply, source: 'ai', faqId: faq?.id || null, score },
    };
  }

  if (faq && score >= 2) {
    return {
      status: 200,
      data: {
        reply: faq.answer,
        source: 'faq-weak',
        faqId: faq.id,
        category: faq.category,
        score,
      },
    };
  }

  return {
    status: 200,
    data: { reply: knowledge.fallback, source: 'fallback', score },
  };
}

function readBody(req) {
  return new Promise((resolve, reject) => {
    const chunks = [];
    req.on('data', (c) => {
      chunks.push(c);
      if (Buffer.concat(chunks).length > 64 * 1024) {
        reject(new Error('body too large'));
        req.destroy();
      }
    });
    req.on('end', () => resolve(Buffer.concat(chunks).toString('utf8')));
    req.on('error', reject);
  });
}

function sendJson(res, status, data) {
  const body = JSON.stringify(data);
  res.writeHead(status, {
    'Content-Type': 'application/json; charset=utf-8',
    'Content-Length': Buffer.byteLength(body),
  });
  res.end(body);
}

function serveStatic(filePath, res) {
  const { file, base } = resolveAssetPath(filePath);
  const resolved = path.resolve(file);
  const baseResolved = path.resolve(base);
  if (
    !resolved.startsWith(baseResolved + path.sep) &&
    resolved !== baseResolved
  ) {
    res.writeHead(403);
    res.end();
    return;
  }
  if (!fs.existsSync(resolved) || fs.statSync(resolved).isDirectory()) {
    res.writeHead(404);
    res.end();
    return;
  }
  const ext = path.extname(resolved);
  const type = MIME[ext] || 'application/octet-stream';
  const data = fs.readFileSync(resolved);
  res.writeHead(200, { 'Content-Type': type });
  res.end(data);
}

const server = http.createServer(async (req, res) => {
  const url = new URL(req.url, `http://${req.headers.host || 'localhost'}`);
  const pathname = decodeURIComponent(url.pathname);

  try {
    if (req.method === 'GET' && pathname === '/api/health') {
      return sendJson(res, 200, {
        ok: true,
        ai: Boolean(process.env.OPENAI_API_KEY),
      });
    }

    if (req.method === 'GET' && pathname === '/api/config') {
      const knowledge = loadKnowledge();
      return sendJson(res, 200, {
        eventName: knowledge.event.name,
        quickReplies: knowledge.quickReplies,
        aiEnabled: Boolean(process.env.OPENAI_API_KEY),
      });
    }

    if (req.method === 'GET' && pathname === '/api/ping') {
      return sendJson(res, 200, {
        ok: true,
        message: '手機已成功連線至活動客服伺服器',
        time: new Date().toISOString(),
      });
    }

    if (req.method === 'GET' && pathname === '/api/network-urls') {
      const access = getMobileAccessUrls();
      const publicUrl = PUBLIC_BASE || access.recommended;
      return sendJson(res, 200, {
        port: PORT,
        isCloud: IS_CLOUD,
        local: `http://localhost:${PORT}/`,
        recommended: publicUrl,
        publicUrl: PUBLIC_BASE,
        mobile: IS_CLOUD ? [PUBLIC_BASE] : access.ipUrls,
        bonjour: IS_CLOUD ? null : access.bonjour,
        options: IS_CLOUD
          ? [{ type: 'public', url: PUBLIC_BASE, label: '雲端公開網址' }]
          : access.all,
        useLocalhostOnly: IS_CLOUD ? false : access.useLocalhostOnly,
        qrPage: IS_CLOUD
          ? `${PUBLIC_BASE}qr.html`
          : `http://localhost:${PORT}/qr.html`,
        pingTest: publicUrl ? `${publicUrl}ping.html` : null,
      });
    }

    if (req.method === 'POST' && pathname === '/api/chat') {
      const raw = await readBody(req);
      const body = raw ? JSON.parse(raw) : {};
      const result = await handleChat(body);
      return sendJson(res, result.status, result.data);
    }

    if (req.method === 'GET') {
      if (pathname === '/' || pathname === '') {
        return serveStatic('index.html', res);
      }
      const rel = pathname.replace(/^\//, '');
      const { file } = resolveAssetPath(rel);
      if (fs.existsSync(file) && !fs.statSync(file).isDirectory()) {
        return serveStatic(rel, res);
      }
      return serveStatic('index.html', res);
    }

    res.writeHead(405);
    res.end();
  } catch (err) {
    console.error(err);
    sendJson(res, 500, { error: '系統忙碌中，請稍後再試或洽服務台' });
  }
});

function getMobileAccessUrls() {
  if (PUBLIC_BASE) {
    return {
      recommended: PUBLIC_BASE,
      bonjour: null,
      ipUrls: [PUBLIC_BASE],
      all: [{ type: 'public', url: PUBLIC_BASE, label: '雲端網址' }],
      useLocalhostOnly: false,
      hostname: 'cloud',
    };
  }

  const port = PORT;
  const hostname = os.hostname().replace(/\.local$/i, '');
  const bonjourUrl = `http://${hostname}.local:${port}/`;

  const candidates = [];
  for (const [name, addrs] of Object.entries(os.networkInterfaces())) {
    if (!addrs || /lo|utun|awdl|llw|bridge\d*$/i.test(name)) continue;
    for (const addr of addrs) {
      if (addr.family !== 'IPv4' || addr.internal) continue;
      const ip = addr.address;
      if (ip.startsWith('169.254.')) continue;

      let priority = 50;
      if (ip.startsWith('192.168.')) priority = 10;
      else if (ip.startsWith('10.')) priority = 15;
      else if (ip.startsWith('172.')) {
        const n = parseInt(ip.split('.')[1], 10);
        priority = n >= 16 && n <= 31 ? 20 : 85;
      }
      if (/^en\d$/i.test(name) || /wi-?fi|wlan/i.test(name)) priority -= 8;
      if (/vmware|virtual|vethernet|hyper|docker|tun|vpn/i.test(name)) {
        priority += 50;
      }

      candidates.push({
        ip,
        name,
        priority,
        url: `http://${ip}:${port}/`,
      });
    }
  }

  candidates.sort((a, b) => a.priority - b.priority);

  const ipUrls = [];
  const seen = new Set();
  for (const c of candidates) {
    if (seen.has(c.url)) continue;
    seen.add(c.url);
    ipUrls.push({
      type: 'ip',
      url: c.url,
      label: `${c.ip}`,
      iface: c.name,
    });
  }

  const all = [...ipUrls];
  if (hostname && hostname !== 'localhost') {
    all.push({ type: 'bonjour', url: bonjourUrl, label: `${hostname}.local` });
  }

  const recommended = ipUrls[0]?.url || bonjourUrl;
  const useLocalhostOnly = ipUrls.length === 0;

  return {
    recommended,
    bonjour: bonjourUrl,
    ipUrls: ipUrls.map((u) => u.url),
    all,
    useLocalhostOnly,
    hostname,
  };
}

function getLanAddresses() {
  return getMobileAccessUrls().ipUrls.map((u) => u.replace(/^http:\/\//, '').replace(/\/$/, '').split(':')[0]);
}

function printStartupUrls() {
  const access = getMobileAccessUrls();
  console.log('\n廣運50週年智能客服已啟動\n');

  if (IS_CLOUD) {
    console.log('  ★ 雲端模式（手機可用 4G/Wi‑Fi 開啟）');
    console.log(`  公開網址：${PUBLIC_BASE}`);
    console.log(`  QR 碼頁：${PUBLIC_BASE}qr.html`);
    console.log('\n  將上方網址做成 QR Code 即可供活動使用');
  } else {
    console.log(`  電腦瀏覽器：http://localhost:${PORT}`);
    console.log(`  QR 碼頁：http://localhost:${PORT}/qr.html`);
  }

  if (!IS_CLOUD && access.useLocalhostOnly) {
    console.log('\n  ⚠ 未取得 Wi‑Fi IP，手機 QR 可能無法使用！');
    console.log('    請確認電腦已連 Wi‑Fi，或改用手機熱點讓電腦連線。');
  } else {
    console.log('\n  ★ 手機請用以下網址（需同一 Wi‑Fi，關閉行動數據試試）：');
    console.log(`    → ${access.recommended}`);
    if (access.bonjour) console.log(`    → ${access.bonjour}（備用）`);
    for (const u of access.ipUrls.slice(1)) {
      console.log(`    → ${u}`);
    }
    console.log('\n  若手機仍無法開啟：');
    console.log('    1. Mac「系統設定→網路→防火牆」允許 node 連入');
    console.log('    2. 關閉 VPN；Wi‑Fi 勿開「用戶隔離/AP Isolation」');
    console.log('    3. 改用手機熱點，電腦連熱點後重新啟動本服務');
    console.log('    4. 或依 DEPLOY.md 部署至雲端（手機任意網路可用）');
  }
  console.log(
    `\n  AI：${
      process.env.OPENAI_API_KEY ? '已啟用' : '未設定（僅 FAQ 模式）'
    }\n`
  );
}

server.listen(PORT, HOST, printStartupUrls);
