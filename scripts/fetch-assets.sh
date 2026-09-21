#!/usr/bin/env bash
#
# Re-download the source images and page HTML from the live WordPress site.
#
#   ./scripts/fetch-assets.sh
#
# The assets in assets/ were already produced from this source. Re-run this only
# to pick up changes, or if you need the originals again; then run
#   python3 scripts/process-assets.py premier-assets/raw
# to regenerate the web-ready versions.
#
# Uses the WordPress REST API rather than a crawl: it returns the full media
# library, including files no page currently links to.

set -uo pipefail
cd "$(dirname "$0")/.."

SITE="https://premier-academy.com"
OUT="premier-assets"
UA="Mozilla/5.0"

mkdir -p "$OUT/raw" "$OUT/html"

echo "==> Media library index"
for page in 1 2 3 4 5; do
  curl -sS --max-time 60 -A "$UA" \
    "$SITE/wp-json/wp/v2/media?per_page=100&page=$page&_fields=source_url,mime_type" \
    -o "$OUT/media-$page.json"
  count=$(python3 -c "import json,sys;d=json.load(open('$OUT/media-$page.json'));print(len(d) if isinstance(d,list) else 0)")
  echo "    page $page: $count items"
  [ "$count" -lt 100 ] && break
done

echo "==> Downloading images"
python3 - "$OUT" <<'PY'
import glob, json, os, sys, urllib.request

out = sys.argv[1]
urls = []
for f in sorted(glob.glob(os.path.join(out, "media-*.json"))):
    data = json.load(open(f))
    if isinstance(data, list):
        urls += [m["source_url"] for m in data if m.get("mime_type", "").startswith("image/")]

ok = skipped = failed = 0
for u in sorted(set(urls)):
    name = u.split("/wp-content/uploads/")[-1].replace("/", "_")
    dest = os.path.join(out, "raw", name)
    if os.path.exists(dest):
        skipped += 1
        continue
    try:
        req = urllib.request.Request(u, headers={"User-Agent": "Mozilla/5.0"})
        with urllib.request.urlopen(req, timeout=60) as r, open(dest, "wb") as fh:
            fh.write(r.read())
        ok += 1
    except Exception as e:
        failed += 1
        print(f"    FAIL {name}: {e}")

print(f"    downloaded {ok}, already present {skipped}, failed {failed}")
PY

echo "==> Page HTML (for recovering embeds and copy)"
# Live slugs, verified against the WordPress menu.
for p in "" about-us message-from-director testimonials honor-roll news-press \
         gallery-2 teachers job-opportunities faculty private-tutoring \
         our-programs about-college-counseling success-stories-testimonials \
         top-colleges transfer-services sat-act contact-us/advance-placement-ap \
         study-abroad-usa summer-winter-programs homework-assistance \
         payment-options our-partners contact-us privacy-policy \
         terms-conditions esl-eld-toefl key-test-dates faq zh; do
  name=$(echo "${p:-home}" | tr '/' '_')
  curl -sS --max-time 40 -A "$UA" "$SITE/${p}" -o "$OUT/html/${name}.html" || true
done
echo "    saved $(ls -1 "$OUT/html" | wc -l | tr -d ' ') pages"

echo
echo "Done. Sources in ./$OUT"
echo "Next: python3 scripts/process-assets.py $OUT/raw && npm run build"
