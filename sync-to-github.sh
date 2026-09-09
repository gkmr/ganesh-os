#!/usr/bin/env bash
# One-shot: put this bundle into your ganesh-os git repo and push it.
# Usage: bash sync-to-github.sh            (uses defaults below)
#        REPO_DIR=~/code/ganesh-os bash sync-to-github.sh
set -euo pipefail
REPO_DIR="${REPO_DIR:-$HOME/Documents/Claude/ganesh-os}"      # where the repo lives (or will be created)
REMOTE="${REMOTE:-}"                                          # e.g. git@github.com:gkumar/ganesh-os.git ; leave empty to auto-create with gh
BUNDLE="$(cd "$(dirname "$0")" && pwd)"

echo "bundle: $BUNDLE"
echo "repo:   $REPO_DIR"
mkdir -p "$REPO_DIR"; cd "$REPO_DIR"

if [ ! -d .git ]; then
  git init -b main
  if [ -n "$REMOTE" ]; then git remote add origin "$REMOTE";
  elif command -v gh >/dev/null 2>&1; then gh repo create ganesh-os --private --source=. --remote=origin >/dev/null && echo "created private repo ganesh-os on GitHub";
  else echo "no remote: install gh (brew install gh; gh auth login) or rerun with REMOTE=git@github.com:<you>/ganesh-os.git"; fi
else
  git pull --rebase --autostash origin main 2>/dev/null || true
fi

# copy everything except this script; rsync keeps deletions out (nothing is removed from the repo)
rsync -a --exclude 'sync-to-github.sh' --exclude 'README.md' --exclude 'CHANGELOG.md' --exclude '.gitignore' "$BUNDLE"/ "$REPO_DIR"/

# safety: refuse to commit if a token or the relay secret slipped in
if grep -rEq "[0-9]{9,10}:AA[A-Za-z0-9_-]{30,}|\"secret\": *\"[0-9a-f]{40,}" --exclude-dir=.git . ; then
  echo "STOP: a bot token or relay secret is present in the tree. Not committing."; exit 1; fi

git add -A
if git diff --cached --quiet; then echo "nothing new to commit"; else
  git commit -m "fleet sync $(date -u +%Y-%m-%dT%H:%MZ)" >/dev/null
  echo "committed"; fi
git push -u origin main && echo "pushed: $(git remote get-url origin)"
