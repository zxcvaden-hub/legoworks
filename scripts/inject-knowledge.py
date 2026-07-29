# -*- coding: utf-8 -*-
"""Inject data/knowledge.json into index.html (Python fallback when node is unavailable).

Usage:
  py scripts/inject-knowledge.py

Mirrors inject-knowledge.js safety checks.
"""
from __future__ import annotations

import json
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
KNOWLEDGE_PATH = ROOT / "data" / "knowledge.json"
INDEX_PATH = ROOT / "index.html"
ROOT_KNOWLEDGE = ROOT / "knowledge.json"


def find_bounds(html: str) -> tuple[int, int]:
    start_mark = "const KNOWLEDGE = "
    start = html.find(start_mark)
    if start < 0:
        raise SystemExit("index.html 找不到 const KNOWLEDGE = ")
    json_start = start + len(start_mark)
    for mark in (";\nconst QUICK_MAP", ";\r\nconst QUICK_MAP", ";const QUICK_MAP"):
        idx = html.find(mark, json_start)
        if idx >= 0:
            return json_start, idx
    raise SystemExit("index.html 找不到 KNOWLEDGE 結束標記（;…const QUICK_MAP）")


def extract_json(html: str) -> str:
    a, b = find_bounds(html)
    return html[a:b].strip()


def assert_safe(parsed: dict, source: dict) -> None:
    if json.dumps(parsed, ensure_ascii=False, sort_keys=True) != json.dumps(
        source, ensure_ascii=False, sort_keys=True
    ):
        # Prefer semantic equality via round-trip
        if parsed != source:
            raise SystemExit("內嵌 KNOWLEDGE 與 data/knowledge.json 內容不一致")
    faqs = parsed.get("faqs")
    quick = parsed.get("quickReplies")
    if not isinstance(faqs, list) or not faqs:
        raise SystemExit("KNOWLEDGE.faqs 異常")
    if not isinstance(quick, list) or not quick:
        raise SystemExit("KNOWLEDGE.quickReplies 異常（快捷鈕會消失）")


def main() -> None:
    knowledge = json.loads(KNOWLEDGE_PATH.read_text(encoding="utf-8"))
    html = INDEX_PATH.read_text(encoding="utf-8")
    a, b = find_bounds(html)
    embedded = json.dumps(knowledge, ensure_ascii=False, indent=2)
    assert_safe(json.loads(embedded), knowledge)
    next_html = html[:a] + embedded + html[b:]
    check = json.loads(extract_json(next_html))
    assert_safe(check, knowledge)
    if "const QUICK_MAP" not in next_html:
        raise SystemExit("寫入後遺失 QUICK_MAP")
    if "bindQuickReplies" not in next_html:
        raise SystemExit("寫入後遺失 bindQuickReplies")
    INDEX_PATH.write_text(next_html, encoding="utf-8")
    ROOT_KNOWLEDGE.write_text(
        json.dumps(knowledge, ensure_ascii=False, indent=2) + "\n", encoding="utf-8"
    )
    print(
        f"已同步 KNOWLEDGE → index.html、knowledge.json"
        f"（FAQ {len(knowledge['faqs'])} 則，快捷 {len(knowledge['quickReplies'])} 鈕；已通過 JSON 自檢）"
    )


if __name__ == "__main__":
    try:
        main()
    except Exception as exc:  # noqa: BLE001
        print("inject FAILED:", exc, file=sys.stderr)
        raise
