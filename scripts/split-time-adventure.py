"""Generate five independent time-adventure stage pages and QR pages."""

from __future__ import annotations

import json
import re
import shutil
from pathlib import Path


ROOT = Path(__file__).resolve().parents[1]
ADVENTURE = ROOT / "time-adventure"
ROOT_PAGE = ADVENTURE / "index.html"
TEMPLATE = ADVENTURE / "station-template.html"
PUZZLES = ADVENTURE / "puzzles.json"
ROOT_QR = ADVENTURE / "qr.html"
CONFIG_JS = ADVENTURE / "config.js"
QR_CODES = ADVENTURE / "qr-codes.html"
ASSETS_SRC_PNG = ROOT / "kenmec-50-main-visual.png"
ASSETS_SRC_JPG = ROOT / "kenmec-50-main-visual.jpg"
ASSETS_DIR = ADVENTURE / "assets"


def write_game_data(data: dict) -> None:
    payload = json.dumps(data, ensure_ascii=False, indent=2)
    out = ADVENTURE / "game-data.js"
    header = (
        "/* AUTO-GENERATED from puzzles.json - do not hand-edit.\n"
        " * Edit puzzles.json then run: py scripts/split-time-adventure.py\n"
        " */\n"
    )
    out.write_text(header + f"window.GAME_DATA = {payload};\n", encoding="utf-8")


def replace_inline_puzzles(html: str, data: dict) -> str:
    """Legacy no-op: stages load window.GAME_DATA from game-data.js."""
    if "const INLINE_PUZZLES" in html:
        raise SystemExit("template still contains INLINE_PUZZLES; remove it")
    return html



def station_page(template: str, level: dict, data: dict) -> str:
    level_id = level["id"]
    html = template
    html = html.replace('href="./font-icons.css?v=20260729c"', 'href="../font-icons.css?v=20260729c"')
    html = html.replace('src="./audio/bgm.mp3"', 'src="../audio/bgm.mp3"')
    html = html.replace('src="./config.js?v=20260729c"', 'src="../config.js?v=20260729c"')
    html = html.replace('src="./game-common.js?v=20260729c"', 'src="../game-common.js?v=20260729c"')
    html = html.replace('src="./game-data.js?v=20260729c"', 'src="../game-data.js?v=20260729c"')
    html = html.replace('src="./adventure.js?v=20260729c"', 'src="../adventure.js?v=20260729c"')
    # legacy unversioned paths (safety)
    html = html.replace('href="./font-icons.css"', 'href="../font-icons.css?v=20260729c"')
    html = html.replace('src="./config.js"', 'src="../config.js?v=20260729c"')
    html = html.replace('src="./game-common.js"', 'src="../game-common.js?v=20260729c"')
    html = html.replace('src="./game-data.js"', 'src="../game-data.js?v=20260729c"')
    html = html.replace('src="./adventure.js"', 'src="../adventure.js?v=20260729c"')
    html = html.replace('href="../index.html"', 'href="../../index.html"')
    html = html.replace(
        "</head>",
        """<style>
#stage-nav, #hub, #modal-cancel { display: none !important; }
</style>
</head>""",
        1,
    )
    html = html.replace(
        'const STORAGE_KEY = "guangyun-time-adventure-v2";',
        f'const STATION_LEVEL = {level_id};\n    const STORAGE_KEY = "guangyun-time-adventure-v2-stage-{level_id}";',
        1,
    )
    html = html.replace(
        "        renderLevelNav();\n        renderHub();",
        "        openLevelModal(STATION_LEVEL);\n        updateGlobalProgress(STATION_LEVEL);",
        1,
    )
    html = html.replace(
        '<button type="button" class="btn btn-ghost btn-sm" id="back-hub">← 說明</button>',
        '<button type="button" class="btn btn-ghost btn-sm" id="back-hub">← 本關說明</button>',
        1,
    )
    # Success UI is handled in station-template (station + hub modes)

    html = html.replace(
        "50年的啟程 · 五關獨立挑戰 · 完成後向各個關主確認通關領取禮券",
        f"第 {level_id} 關｜{level['title']}",
        1,
    )
    html = html.replace("KENMEC 50 · 時光探險", f"KENMEC 50 · 第 {level_id} 關", 1)
    title = f"廣運時光探險｜第{level_id}關 {level['title']}"
    html = re.sub(r"<title>.*?</title>", f"<title>{title}</title>", html, count=1)
    return html


def qr_page(level: dict) -> str:
    lid = level["id"]
    title = level["title"]
    location = level["location"]
    return f"""<!DOCTYPE html>
<html lang="zh-Hant">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0, viewport-fit=cover" />
<meta name="theme-color" content="#0A2540" />
<title>第{lid:02d}關 QR｜{title}</title>
<style>
body {{ margin:0; min-height:100dvh; display:grid; place-items:center; background:radial-gradient(ellipse at top,#003366 0%,#0a2540 58%); font-family:system-ui,"Noto Sans TC",sans-serif; padding:24px; color:#e8f4ff; }}
.card {{ background:rgba(255,255,255,.06); border:1px solid rgba(0,242,254,.28); border-radius:20px; padding:28px 24px; width:min(380px,100%); text-align:center; }}
h1 {{ font-size:1.2rem; margin:0 0 8px; color:#00f2fe; }}
.meta {{ color:#8eb4d4; font-size:.9rem; line-height:1.5; margin:0 0 12px; }}
.url {{ word-break:break-all; background:rgba(0,0,0,.22); color:#00f2fe; font-weight:700; border-radius:10px; padding:12px; margin-top:12px; font-size:.82rem; user-select:text; -webkit-user-select:text; }}
#qrcode {{ display:flex; justify-content:center; margin:18px 0; padding:12px; background:#fff; border-radius:14px; }}
a.btn {{ display:block; margin-top:12px; background:linear-gradient(135deg,#00d2c4,#00f2fe); color:#0a2540; text-decoration:none; border-radius:12px; padding:12px; font-weight:700; min-height:48px; }}
</style>
</head>
<body>
<div class="card">
  <h1>第 {lid:02d} 關｜{title}</h1>
  <p class="meta">闖關地點：{location}<br>掃描後直接進入本關挑戰</p>
  <div id="qrcode"></div>
  <div id="url" class="url"></div>
  <a class="btn" id="open" href="./">直接開啟本關</a>
  <a class="btn" href="../index.html" style="background:transparent;border:1px solid rgba(0,242,254,.35);color:#00f2fe">← 活動說明</a>
</div>
<script src="../config.js"></script>
<script src="../../qrcode.min.js"></script>
<script>
var key = "stage{lid}";
var url = (typeof STAGE_URLS === "object" && STAGE_URLS[key]) ? STAGE_URLS[key] : "";
if (!url) {{ console.warn("STAGE_URLS missing; check config.js"); }}
document.getElementById("url").textContent = url;
document.getElementById("open").href = "./";
new QRCode(document.getElementById("qrcode"), {{
  text: url,
  width: 220,
  height: 220,
  colorDark: "#0a2540",
  colorLight: "#ffffff",
  correctLevel: QRCode.CorrectLevel.M
}});
</script>
</body>
</html>
"""


def root_intro(data: dict) -> str:
    level_emoji = {
        1: "🚀",
        2: "❄️",
        3: "📖",
        4: "🏭",
        5: "🔑",
    }
    levels = data.get("levels", [])
    rows = "".join(
        (
            "<li>"
            f"<div class='stage-title'>{level_emoji.get(lv['id'], '⭐')} "
            f"<strong>第 {lv['id']:02d} 關｜{lv['title']}</strong></div>"
            f"<div class='stage-loc'>📍 {lv['location']}</div>"
            f"<div class='stage-head'>{lv.get('headline', '')}</div>"
            "</li>"
        )
        for lv in levels
    )
    story = data.get("storyArc", "")
    return f"""<!DOCTYPE html>
<html lang="zh-Hant">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0, viewport-fit=cover" />
<meta name="theme-color" content="#0A2540" />
<meta name="description" content="廣運時光探險：五關手機互動挑戰與現場蓋章" />
<title>廣運時光探險｜活動說明</title>
<style>
:root {{ --bg:#0a2540; --accent:#00f2fe; --text:#e8f4ff; --muted:#8eb4d4; }}
* {{ box-sizing:border-box; }}
body {{ margin:0; min-height:100dvh; display:grid; place-items:center; padding:24px; background:radial-gradient(ellipse at top,#003366 0%,var(--bg) 58%); color:var(--text); font-family:system-ui,"Noto Sans TC",sans-serif; }}
.card {{ width:min(620px,100%); padding:30px 24px; border:1px solid rgba(0,242,254,.3); border-radius:20px; background:rgba(255,255,255,.06); box-shadow:0 0 28px rgba(0,242,254,.12); }}
.badge {{ color:var(--accent); font-size:.78rem; letter-spacing:.12em; text-align:center; }}
h1 {{ margin:.5rem 0; text-align:center; }}
.lead {{ text-align:center; line-height:1.7; color:var(--muted); margin:0 0 18px; }}
.stage-list {{ list-style:none; margin:0 0 18px; padding:0; display:grid; gap:10px; }}
.stage-list li {{
  text-align:center; margin:0; padding:14px 12px; border-radius:14px;
  border:1px solid rgba(0,242,254,.22); background:rgba(255,255,255,.05); line-height:1.55;
}}
.stage-title {{ font-size:1.02rem; margin-bottom:4px; }}
.stage-loc {{ color:var(--accent); font-size:.92rem; margin-bottom:4px; }}
.stage-head {{ color:var(--muted); font-size:.88rem; }}
.note {{ padding:14px; border-radius:12px; background:rgba(0,242,254,.1); line-height:1.7; }}
.note-item {{ margin:0 0 12px; }}
.note-item:last-child {{ margin-bottom:0; }}
.note-label {{ color:var(--accent); font-weight:700; }}
.footer-links {{ text-align:center; margin:16px 0 0; }}
a {{ color:var(--accent); }}
.anniversary-visual {{ display:block; width:100%; max-width:100%; aspect-ratio:16/9; height:auto; object-fit:cover; object-position:center; border-radius:14px; margin:12px 0 16px; border:1px solid rgba(0,242,254,.35); background:#0078b4; }}
.inapp-tip {{
  display:none; margin:0 0 12px; padding:10px 12px; border-radius:12px;
  border:1px solid rgba(255,207,107,.45); background:rgba(255,207,107,.14);
  color:#ffe6a8; font-size:.9rem; line-height:1.55; text-align:center;
}}
.inapp-tip.show {{ display:block; }}
</style>
</head>
<body>
<main class="card">
  <div id="inapp-browser-tip" class="inapp-tip" role="status">
    💡 小提醒：若從 LINE／通訊軟體開啟，建議點右上角「…」選擇<strong>以 Safari／Chrome 開啟</strong>，體驗更順暢。
  </div>
  <div class="badge">KENMEC 50 · TIME ADVENTURE</div>
  <img class="anniversary-visual" src="./assets/kenmec-50-main-visual.png?v=20260729c" alt="廣運 50 週年主視覺" />
  <h1>🗺️ 廣運時光探險｜活動說明</h1>
  <p class="lead">{story}</p>
  <ol class="stage-list">{rows}</ol>
  <div class="note">
    <p class="note-item"><span class="note-label">📍 闖關方式</span><br>前往各關卡現場，掃描專屬 QR Code 即可開始挑戰。<br>完成挑戰後，向關主說出通關密語，即可於闖關護照蓋上通關章。</p>
    <p class="note-item"><span class="note-label">🎁 禮券兌換</span><br>集滿五關護照印章後，向各關關主出示護照確認通關，即可領取禮券。<br>完成兌換後，關主將於護照兌換區打孔，請妥善保管闖關護照。</p>
    <p class="note-item"><span class="note-label">ℹ️ 注意事項</span><br>本頁不提供五關入口，請至各關卡現場掃描 QR Code。<br>手機完成紀錄僅供查閱，兌獎以闖關護照蓋章為準。<br>⚠️ 每人限兌換乙次，闖關護照遺失恕不補發。</p>
  </div>
  <p class="footer-links"><a href="https://zxcvaden-hub.github.io/kenmec/?v=20260729c">← 返回活動客服</a> · <a href="./qr-codes.html?v=20260729c">工作人員 QR 總覽</a></p>
</main>
<script>
(function () {{
  try {{
    var ua = navigator.userAgent || "";
    if (/Line\\//i.test(ua) || /MicroMessenger/i.test(ua) || /FBAN|FBAV|Instagram/i.test(ua)) {{
      var tip = document.getElementById("inapp-browser-tip");
      if (tip) tip.classList.add("show");
    }}
  }} catch (e) {{}}
}})();
</script>
</body>
</html>
"""



def write_qr_codes(data: dict) -> None:
    levels_json = json.dumps(
        [
            {
                "id": lv["id"],
                "title": lv["title"],
                "location": lv["location"],
                "file": f"{lv['id']:02d}-{lv['title']}-QR.png",
            }
            for lv in data["levels"]
        ],
        ensure_ascii=False,
    )
    QR_CODES.write_text(
        f"""<!DOCTYPE html>
<html lang="zh-Hant">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0, viewport-fit=cover" />
<title>廣運時光探險｜QR Code 總覽</title>
<style>
body {{ margin:0; background:#0a2540; color:#e8f4ff; font-family:system-ui,"Noto Sans TC",sans-serif; padding:20px; }}
h1 {{ color:#00f2fe; }} .grid {{ display:grid; gap:18px; grid-template-columns:repeat(auto-fit,minmax(260px,1fr)); }}
.card {{ background:rgba(255,255,255,.06); border:1px solid rgba(0,242,254,.28); border-radius:16px; padding:16px; text-align:center; }}
.qr {{ background:#fff; border-radius:12px; padding:12px; display:inline-flex; }}
.url {{ word-break:break-all; font-size:.78rem; color:#00f2fe; margin:10px 0; user-select:text; -webkit-user-select:text; }}
button {{ min-height:48px; width:100%; border:0; border-radius:12px; font-weight:700; background:linear-gradient(135deg,#00d2c4,#00f2fe); color:#0a2540; }}
.meta {{ color:#8eb4d4; font-size:.9rem; line-height:1.5; }}
a {{ color:#00f2fe; }}
</style>
</head>
<body>
<h1>時光探險 QR Code 總覽</h1>
<p class="meta">工作人員列印用。關卡網址一律來自 <code>config.js</code> 的 <code>STAGE_URLS</code>（由 <code>SITE_BASE_URL</code> 組合）。</p>
<p><a href="./index.html">← 活動說明</a></p>
<div class="grid" id="grid"></div>
<script src="./config.js"></script>
<script src="../qrcode.min.js"></script>
<script>
const LEVELS = {levels_json};
const grid = document.getElementById("grid");
LEVELS.forEach((lv) => {{
  const key = "stage" + lv.id;
  const url = (typeof STAGE_URLS === "object" && STAGE_URLS[key]) ? STAGE_URLS[key] : "";
  if (!url) console.warn("STAGE_URLS missing for", key);
  const card = document.createElement("div");
  card.className = "card";
  card.innerHTML =
    "<h2>第 " + String(lv.id).padStart(2,"0") + " 關｜" + lv.title + "</h2>" +
    '<p class="meta">地點：' + lv.location + "</p>" +
    '<div class="qr" id="qr-' + lv.id + '"></div>' +
    '<div class="url">' + url + "</div>" +
    '<button type="button" data-id="' + lv.id + '" data-file="' + lv.file + '">下載 QR Code PNG</button>';
  grid.appendChild(card);
  const holder = document.getElementById("qr-" + lv.id);
  if (url) new QRCode(holder, {{ text: url, width: 220, height: 220, colorDark: "#000000", colorLight: "#ffffff", correctLevel: QRCode.CorrectLevel.H }});
}});
grid.addEventListener("click", (e) => {{
  const btn = e.target.closest("button[data-id]");
  if (!btn) return;
  const id = btn.getAttribute("data-id");
  const file = btn.getAttribute("data-file");
  const canvas = document.querySelector("#qr-" + id + " canvas");
  if (!canvas) return;
  const out = document.createElement("canvas");
  out.width = 1000; out.height = 1000;
  const ctx = out.getContext("2d");
  ctx.fillStyle = "#ffffff";
  ctx.fillRect(0, 0, 1000, 1000);
  const pad = 80;
  ctx.drawImage(canvas, pad, pad, 1000 - pad * 2, 1000 - pad * 2);
  const a = document.createElement("a");
  a.href = out.toDataURL("image/png");
  a.download = file;
  a.click();
}});
</script>
</body>
</html>
""",
        encoding="utf-8",
    )


def ensure_assets() -> None:
    ASSETS_DIR.mkdir(parents=True, exist_ok=True)
    if ASSETS_SRC_PNG.exists():
        shutil.copy2(ASSETS_SRC_PNG, ASSETS_DIR / "kenmec-50-main-visual.png")
    if ASSETS_SRC_JPG.exists():
        shutil.copy2(ASSETS_SRC_JPG, ASSETS_DIR / "kenmec-50-main-visual.jpg")


def main() -> None:
    if not TEMPLATE.exists():
        raise SystemExit("缺少 station-template.html")
    if not CONFIG_JS.exists():
        raise SystemExit("缺少 config.js")

    ensure_assets()
    data = json.loads(PUZZLES.read_text(encoding="utf-8"))
    write_game_data(data)
    template = TEMPLATE.read_text(encoding="utf-8")
    if "const INLINE_PUZZLES" in template:
        raise SystemExit("station-template still has INLINE_PUZZLES")
    if "game-data.js" not in template:
        raise SystemExit("station-template missing game-data.js script")
    ROOT_PAGE.write_text(root_intro(data), encoding="utf-8")
    write_qr_codes(data)

    for level in data["levels"]:
        stage_dir = ADVENTURE / f"stage-{level['id']}"
        stage_dir.mkdir(parents=True, exist_ok=True)
        (stage_dir / "index.html").write_text(station_page(template, level, data), encoding="utf-8")
        (stage_dir / "qr.html").write_text(qr_page(level), encoding="utf-8")

    print(f"Generated {len(data['levels'])} stage pages and QR pages.")
    print("Also wrote qr-codes.html and refreshed assets.")


if __name__ == "__main__":
    main()
