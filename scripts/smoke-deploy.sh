#!/usr/bin/env bash
#
# Post-deploy smoke test: checks a live deployment serves every page and that
# the legacy WordPress URLs actually land on their new paths.
#
#   ./scripts/smoke-deploy.sh https://premier-academy-flame.vercel.app
#   npm run smoke -- https://premier-academy.com
#
# Redirect config is easy to get subtly wrong (trailing-slash normalisation can
# stop a rule matching at all), and that only shows up against a real host.

set -uo pipefail
cd "$(dirname "$0")/.."

BASE="${1:-https://premier-academy-flame.vercel.app}"
BASE="${BASE%/}"
fail=0
checked=0

check() {                       # check <url-path> <expected-final-path>
  local path="$1" want="$2"
  local final code
  final=$(curl -sSL -o /dev/null --max-time 25 -w '%{url_effective}' "$BASE$path" 2>/dev/null)
  code=$(curl -sSL -o /dev/null --max-time 25 -w '%{http_code}' "$BASE$path" 2>/dev/null)
  checked=$((checked + 1))
  if [ "$code" != "200" ] || [ "${final#"$BASE"}" != "$want" ]; then
    printf '  FAIL  %-36s -> %s [%s]  expected %s\n' "$path" "${final#"$BASE"}" "$code" "$want"
    fail=$((fail + 1))
  fi
}

echo "Smoke-testing $BASE"
echo
echo "== pages =="
for p in / /about/ /about/message-from-director.html /about/testimonials.html \
         /about/honor-roll.html /about/news-press.html /about/gallery.html \
         /about/faculty/teachers.html /about/faculty/job-opportunities.html \
         /private-tutoring/ /college-counseling/ \
         /college-counseling/success-stories.html /college-counseling/top-colleges.html \
         /college-counseling/transfer.html /services/sat-act.html \
         /services/advance-placement-ap.html /services/study-abroad.html \
         /services/summer-winter-programs.html /services/homework-assistance.html \
         /services/payment-options.html /partners/ /contact/ \
         /privacy-policy.html /terms-conditions.html; do
  check "$p" "$p"
done

echo "== legacy WordPress URLs =="
# source-path:expected-destination, from build/redirects.js
while IFS=: read -r from to; do
  [ -z "$from" ] && continue
  check "$from" "$to"
done <<'PAIRS'
/home/:/
/about-us/:/about/
/message-from-director/:/about/message-from-director.html
/testimonials/:/about/testimonials.html
/honor-roll/:/about/honor-roll.html
/news-press/:/about/news-press.html
/gallery-2/:/about/gallery.html
/faculty/:/about/faculty/teachers.html
/teachers/:/about/faculty/teachers.html
/job-opportunities/:/about/faculty/job-opportunities.html
/our-programs/:/college-counseling/
/success-stories-testimonials/:/college-counseling/success-stories.html
/top-colleges/:/college-counseling/top-colleges.html
/transfer-services/:/college-counseling/transfer.html
/sat-act/:/services/sat-act.html
/contact-us/advance-placement-ap/:/services/advance-placement-ap.html
/study-abroad-usa/:/services/study-abroad.html
/summer-winter-programs/:/services/summer-winter-programs.html
/homework-assistance/:/services/homework-assistance.html
/payment-options/:/services/payment-options.html
/our-partners/:/partners/
/contact-us/:/contact/
/privacy-policy/:/privacy-policy.html
/terms-conditions/:/terms-conditions.html
PAIRS

echo "== assets =="
for a in /css/styles.css /js/main.js /assets/images/logo.png \
         /assets/images/hero/hero-1.jpg /assets/images/partners/college-board.png \
         /sitemap.xml /robots.txt; do
  check "$a" "$a"
done

echo "== 404 handling =="
code=$(curl -sS -o /dev/null --max-time 25 -w '%{http_code}' "$BASE/this-page-does-not-exist")
checked=$((checked + 1))
if [ "$code" != "404" ]; then
  echo "  FAIL  unknown URL returned $code, expected 404"
  fail=$((fail + 1))
fi

echo
if [ "$fail" -eq 0 ]; then
  echo "All $checked checks passed."
else
  echo "$fail of $checked checks FAILED."
  exit 1
fi
