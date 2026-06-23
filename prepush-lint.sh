#!/usr/bin/env bash
# Pre-push consistency lint for the public ganesh-os repo.
# Run from the repo root before pushing:  bash prepush-lint.sh
#
# Two editors touch this repo, and the same drift keeps coming back: em dashes
# (the house style bans them), a stale agent count, dead links to the removed
# docs/canonical folder, and unbalanced HTML tags in the hand-authored docs.
# This catches all four and exits non-zero so it can gate a push. If a local
# private/privacy-lint.sh exists it is run too (kept out of the public repo).
set -uo pipefail
fail=0
scan(){ grep -rInE "$1" . --include='*.md' --include='*.html' --include='*.prompt.md' 2>/dev/null | grep -v '/.git/' | grep -v '/private/'; }

echo "1) em dashes (use ' - ' instead)"
hits=$(scan '—|&mdash;|&#8212;' || true)
if [ -n "$hits" ]; then echo "$hits"; echo "   FAIL: em dash(es) above"; fail=1; else echo "   ok"; fi

echo "2) stale agent count (canonical is 30+)"
hits=$(scan '\b~?27\b' | grep -iE 'coordinated|autonomous|of them run|agents ?[x×]' || true)
if [ -n "$hits" ]; then echo "$hits"; echo "   FAIL: stale '27' agent count"; fail=1; else echo "   ok"; fi

echo "3) dead refs to removed/private docs"
hits=$(scan 'docs/canonical|banned-words|house-style' || true)
if [ -n "$hits" ]; then echo "$hits"; echo "   FAIL: reference to a removed/private doc"; fail=1; else echo "   ok"; fi

echo "4) HTML tag balance (tr/li/article/ul/td/h2)"
htmlbad=0
while IFS= read -r f; do
  out=$(python3 - "$f" <<'PY'
import sys,re
f=sys.argv[1];s=open(f,encoding="utf-8").read();bad=[]
for t in ('tr','li','article','ul','td','h2'):
    o=len(re.findall(r'<%s[ >]'%t,s));c=len(re.findall(r'</%s>'%t,s))
    if o!=c: bad.append(f"{t} {o}/{c}")
print(f"   FAIL {f}: "+", ".join(bad)) if bad else None
PY
)
  if [ -n "$out" ]; then echo "$out"; htmlbad=1; fi
done < <(find . -name '*.html' -not -path './.git/*' -not -path './private/*')
if [ "$htmlbad" -eq 0 ]; then echo "   ok"; else fail=1; fi

if [ -f private/privacy-lint.sh ]; then echo "5) private-token scan (local)"; bash private/privacy-lint.sh || fail=1; fi

echo
if [ "$fail" -eq 0 ]; then echo "PASS - clean to push."; else echo "LINT FAILED - fix the above before pushing."; fi
exit "$fail"
