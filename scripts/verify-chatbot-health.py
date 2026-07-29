# -*- coding: utf-8 -*-
"""Pre-publish health check for chatbot + time-adventure embeds.

Usage:
  py scripts/verify-chatbot-health.py

Exit code 0 = OK, 1 = problems found.
"""
from __future__ import annotations

import json
import re
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
ADVENTURE = ROOT / "time-adventure"
errors: list[str] = []
warnings: list[str] = []


def fail(msg: str) -> None:
    errors.append(msg)


def warn(msg: str) -> None:
    warnings.append(msg)


def extract_knowledge(html: str) -> str:
    start = html.find("const KNOWLEDGE = ")
    if start < 0:
        raise ValueError("missing const KNOWLEDGE")
    json_start = start + len("const KNOWLEDGE = ")
    for mark in (";\nconst QUICK_MAP", ";\r\nconst QUICK_MAP", ";const QUICK_MAP"):
        idx = html.find(mark, json_start)
        if idx >= 0:
            return html[json_start:idx].strip()
    raise ValueError("missing QUICK_MAP end mark")


def has_raw_newline_in_json_strings(raw: str) -> bool:
    i = 0
    in_str = False
    while i < len(raw):
        ch = raw[i]
        if not in_str:
            if ch == '"':
                in_str = True
            i += 1
            continue
        if ch == "\\":
            i += 2
            continue
        if ch == '"':
            in_str = False
            i += 1
            continue
        if ch in "\r\n":
            return True
        i += 1
    return False


def check_faq_index(path: Path, label: str) -> dict | None:
    if not path.exists():
        fail(f"{label}: missing {path}")
        return None
    html = path.read_text(encoding="utf-8")
    try:
        raw = extract_knowledge(html)
    except ValueError as e:
        fail(f"{label}: {e}")
        return None
    if has_raw_newline_in_json_strings(raw):
        fail(f"{label}: KNOWLEDGE 字串內含真實換行（會導致整頁 JS 崩潰、快捷／輸入失效）")
    try:
        data = json.loads(raw)
    except json.JSONDecodeError as e:
        fail(f"{label}: KNOWLEDGE JSON.parse 失敗 → {e}")
        return None
    if "const QUICK_MAP" not in html:
        fail(f"{label}: 缺少 QUICK_MAP")
    if "bindQuickReplies" not in html:
        fail(f"{label}: 缺少 bindQuickReplies")
    if "id=\"send\"" not in html and "id='send'" not in html:
        # send button may use different id; soft check
        if "sendMessage" not in html:
            warn(f"{label}: 未偵測到 sendMessage")
    faqs = data.get("faqs") or []
    quick = data.get("quickReplies") or []
    if len(faqs) < 1:
        fail(f"{label}: faqs 空的")
    if len(quick) < 1:
        fail(f"{label}: quickReplies 空的（快捷鈕會消失）")
    return data


def check_game_data() -> None:
    puzzles_path = ADVENTURE / "puzzles.json"
    gd_path = ADVENTURE / "game-data.js"
    if not puzzles_path.exists():
        fail("time-adventure/puzzles.json missing")
        return
    if not gd_path.exists():
        fail("time-adventure/game-data.js missing")
        return
    puzzles = json.loads(puzzles_path.read_text(encoding="utf-8"))
    text = gd_path.read_text(encoding="utf-8")
    m = re.search(r"window\.GAME_DATA\s*=\s*(\{[\s\S]*\})\s*;\s*$", text)
    if not m:
        fail("game-data.js: 找不到 window.GAME_DATA = {...};")
        return
    raw = m.group(1)
    if has_raw_newline_in_json_strings(raw):
        fail("game-data.js: GAME_DATA 字串內含真實換行")
    try:
        data = json.loads(raw)
    except json.JSONDecodeError as e:
        fail(f"game-data.js JSON.parse 失敗 → {e}")
        return
    if data != puzzles:
        fail("game-data.js 與 puzzles.json 內容不一致（請跑 py scripts/split-time-adventure.py）")
    levels = data.get("levels") or []
    if len(levels) != 5:
        fail(f"時光探險 levels 應為 5，目前 {len(levels)}")


def main() -> int:
    src = json.loads((ROOT / "data" / "knowledge.json").read_text(encoding="utf-8"))
    root_k = json.loads((ROOT / "knowledge.json").read_text(encoding="utf-8"))
    if src != root_k:
        fail("data/knowledge.json 與 root knowledge.json 不一致")

    embedded = check_faq_index(ROOT / "index.html", "root index.html")
    if embedded is not None and embedded != src:
        fail("root index.html 內嵌 KNOWLEDGE ≠ data/knowledge.json")

    # upload clones if present
    ken = ROOT / "_kenmec-upload" / "index.html"
    if ken.exists():
        kdata = check_faq_index(ken, "kenmec-upload index.html")
        if kdata is not None and kdata != src:
            fail("kenmec-upload 內嵌 KNOWLEDGE ≠ data/knowledge.json")

    lego = ROOT / "_legoworks-upload" / "index.html"
    if lego.exists():
        check_faq_index(lego, "legoworks-upload index.html")

    check_game_data()

    # Warn about suspicious backup copies that historically broke deploys
    for p in ROOT.rglob("index-*.html"):
        if any(x in str(p) for x in ("node_modules", "release", "時光探險上傳")):
            continue
        warn(f"發現備份 HTML（勿當正式檔上傳）: {p.relative_to(ROOT)}")

    print("=== chatbot / time-adventure health check ===")
    if warnings:
        print("WARNINGS:")
        for w in warnings:
            print(" -", w)
    if errors:
        print("ERRORS:")
        for e in errors:
            print(" -", e)
        print("RESULT: FAIL")
        return 1
    print(
        f"OK: FAQ {len(src.get('faqs', []))} / quick {len(src.get('quickReplies', []))} / "
        f"version {src.get('_meta', {}).get('knowledgeVersion')}"
    )
    print("RESULT: PASS")
    return 0


if __name__ == "__main__":
    sys.exit(main())
