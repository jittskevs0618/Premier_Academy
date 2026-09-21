#!/usr/bin/env python3
"""Extract the Chinese translations from the archived /zh/ pages into JSON.

The live WordPress site serves /zh/ through TranslatePress, which keeps its
translations in the database — there are no Chinese pages to export. This
pulls the rendered content out of the archived HTML so the translation work
survives the WordPress shutdown and can seed a static Chinese tree.

    python3 scripts/extract-zh.py            # -> content/zh-content.json
"""

import glob
import html
import json
import os
import re

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
SRC = os.path.join(ROOT, "premier-assets", "html-zh")
OUT = os.path.join(ROOT, "content", "zh-content.json")

# Chrome that repeats on every page and is not page content.
CHROME = re.compile(
    r"^(首页|关于我们培名学院|校长的话|家长的评语|光荣榜|新闻/媒体|教职员工|教师团队|招聘|"
    r"照片墙|个人家教|我们的项目|成功故事|顶尖大学|转学|出国留学|寒暑假项目|作业辅导|"
    r"合作伙伴|联系我们|了解更多|关于升学辅导|快速链接|Quick Links|Contact Us|"
    r"Connect With us|Language|English|简体中文|Home|Privacy Policy|Terms|Conditions|"
    r"Payment Options|SAT / ACT|AP特许考场)$"
)

BLOCK = re.compile(r"<(h[1-6]|p|li|blockquote|figcaption)[^>]*>(.*?)</\1>", re.S | re.I)


def clean(fragment: str) -> str:
    text = re.sub(r"<[^>]+>", " ", fragment)
    text = html.unescape(text)
    return re.sub(r"\s+", " ", text).strip()


def has_cjk(text: str) -> bool:
    return bool(re.search(r"[一-鿿]", text))


def extract(path: str):
    raw = open(path, encoding="utf-8", errors="replace").read()
    raw = re.sub(r"<(script|style|noscript)[^>]*>.*?</\1>", " ", raw, flags=re.S | re.I)

    # Prefer the main content region; fall back to <body>.
    main = re.search(r'<main[^>]*>(.*?)</main>', raw, re.S | re.I)
    if not main:
        main = re.search(r'<(?:article|div)[^>]*class="[^"]*(?:page-content|entry-content|site-content)[^"]*"[^>]*>(.*)', raw, re.S | re.I)
    body = main.group(1) if main else (re.search(r"<body[^>]*>(.*)</body>", raw, re.S | re.I) or [None, raw])[1]

    blocks, seen = [], set()
    for tag, frag in BLOCK.findall(body):
        text = clean(frag)
        if not text or len(text) < 2:
            continue
        if CHROME.match(text) or not has_cjk(text):
            continue
        key = (tag.lower(), text)
        if key in seen:
            continue
        seen.add(key)
        blocks.append({"tag": tag.lower(), "text": text})

    title = re.search(r"<title[^>]*>(.*?)</title>", raw, re.S | re.I)
    return {
        "title": clean(title.group(1)).replace(" – Premier Academy", "") if title else "",
        "blocks": blocks,
    }


def main():
    files = sorted(glob.glob(os.path.join(SRC, "*.html")))
    if not files:
        print(f"No archived pages in {SRC}.")
        print("Run the /zh/ archive step in scripts/fetch-assets.sh first.")
        raise SystemExit(1)

    out, total = {}, 0
    for f in files:
        slug = os.path.basename(f)[:-5]
        if slug == "index":       # duplicate of home
            continue
        data = extract(f)
        out[slug] = data
        total += len(data["blocks"])
        print(f"  {len(data['blocks']):4} blocks  {slug}")

    os.makedirs(os.path.dirname(OUT), exist_ok=True)
    with open(OUT, "w", encoding="utf-8") as fh:
        json.dump(out, fh, ensure_ascii=False, indent=2)

    size = os.path.getsize(OUT) / 1024
    print(f"\n{total} translated blocks across {len(out)} pages -> {os.path.relpath(OUT, ROOT)} ({size:.0f} KB)")


if __name__ == "__main__":
    main()
