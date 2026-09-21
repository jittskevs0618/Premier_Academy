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
unreachable=0

# Confirm the host is reachable before asserting anything. Without this a
# dropped connection reports every check as a failure, which reads like a
# broken deploy and invites a needless rollback.
preflight() {
  local i
  for i in 1 2 3 4 5; do
    if curl -sS -o /dev/null --max-time 15 "$BASE/" 2>/dev/null; then return 0; fi
    [ "$i" -lt 5 ] && sleep $((i * 4))
  done
  return 1
}

if ! preflight; then
  echo "Cannot reach $BASE after 5 attempts."
  echo "Check your connection and that the deployment exists. Nothing was asserted."
  exit 2
fi

# curl reports 000 for connection/DNS failure rather than an HTTP status, so a
# check that comes back 000 is retried before being believed.
check() {                       # check <url-path> <expected-final-path>
  local path="$1" want="$2"
  local final code i
  for i in 1 2 3; do
    final=$(curl -sSL -o /dev/null --max-time 25 -w '%{url_effective}' "$BASE$path" 2>/dev/null)
    code=$(curl -sSL -o /dev/null --max-time 25 -w '%{http_code}' "$BASE$path" 2>/dev/null)
    [ "$code" != "000" ] && break
    sleep $((i * 3))
  done
  checked=$((checked + 1))
  if [ "$code" = "000" ]; then
    printf '  UNREACHABLE  %-36s (network, not the site)\n' "$path"
    unreachable=$((unreachable + 1))
    return
  fi
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
# Follow redirects: with trailingSlash:true the host 308s to add the slash
# before serving the 404, so only the final status is meaningful.
code=$(curl -sSL -o /dev/null --max-time 25 -w '%{http_code}' "$BASE/this-page-does-not-exist")
checked=$((checked + 1))
if [ "$code" != "404" ]; then
  echo "  FAIL  unknown URL returned $code, expected 404"
  fail=$((fail + 1))
fi

# ...and that it is the styled 404, not the host's default.
checked=$((checked + 1))
if ! curl -sSL --max-time 25 "$BASE/this-page-does-not-exist" | grep -q 'notfound__code'; then
  echo "  FAIL  404 page is not the styled one from this site"
  fail=$((fail + 1))
fi

echo
if [ "$unreachable" -gt 0 ]; then
  echo "$unreachable of $checked checks could not reach the host — results are incomplete."
  echo "This indicates a network problem, not a failing deployment. Re-run when connected."
  exit 2
fi
if [ "$fail" -eq 0 ]; then
  echo "All $checked checks passed."
else
  echo "$fail of $checked checks FAILED."
  exit 1
fi
