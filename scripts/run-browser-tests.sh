#!/usr/bin/env bash
#
# Serves the site and runs both browser harnesses in headless Chrome:
#   - scripts/fn-test.html       navigation, slider, forms, lightbox, accordion
#   - scripts/overflow-test.html horizontal overflow, every page x 7 widths
#
#   npm run test

set -uo pipefail
cd "$(dirname "$0")/.."

PORT="${PORT:-4399}"
CHROME="${CHROME:-/Applications/Google Chrome.app/Contents/MacOS/Google Chrome}"

if [ ! -x "$CHROME" ]; then
  echo "Chrome not found at: $CHROME"
  echo "Set CHROME=/path/to/chrome and re-run."
  exit 1
fi

python3 -m http.server "$PORT" >/dev/null 2>&1 &
SERVER=$!
trap 'kill $SERVER 2>/dev/null' EXIT
sleep 1

extract() {
  python3 -c "
import sys, re, html
s = sys.stdin.read()
m = re.search(r'<pre id=\"out\">(.*?)</pre>', s, re.S)
print(html.unescape(m.group(1)) if m else 'NO OUTPUT — harness did not finish')"
}

run() {
  "$CHROME" --headless --disable-gpu --window-size=1200,900 \
    --virtual-time-budget=90000 --dump-dom "http://127.0.0.1:${PORT}/scripts/$1" 2>/dev/null | extract
}

echo "=== Functional tests ==========================================="
FN=$(run fn-test.html)
echo "$FN" | grep -v '^PASS' | grep -v '^---' | sed '/^$/d'
echo "$FN" | grep -c '^PASS' | xargs -I{} echo "{} checks passed"

echo
echo "=== Responsive overflow ========================================"
run overflow-test.html | grep -vE '^ok ' | sed '/^$/d'

echo
if echo "$FN" | grep -q '^FAIL'; then
  echo "FAILURES present."
  exit 1
fi
echo "All browser tests green."
