#!/usr/bin/env bash
# One-shot publish of ganesh-os to github.com/gkmr/ganesh-os.
# Run from the repo root:  cd ~/Documents/Claude/portfolio/ganesh-os && bash push.sh
# Uses GitHub CLI (gh) if installed — creates the repo, pushes, sets description + topics + homepage, enables Pages.
# Falls back to plain git (you create the repo + authenticate). Hardened: sets a local git identity, always commits, forces main.
set -uo pipefail

REPO="gkmr/ganesh-os"
DESC="A governance layer for autonomous AI agents, proven on a life: 27 scheduled agents made auditable, self-healing, and human-gated by single-writer field ownership. Architecture and patterns, no personal data."
PAGES="https://gkmr.github.io/ganesh-os/"

git init -b main >/dev/null 2>&1 || git init >/dev/null 2>&1 || true

# Ensure a git identity exists (local to this repo only) so the commit can't silently fail.
git config user.email >/dev/null 2>&1 || git config user.email "gkmr@umich.edu"
git config user.name  >/dev/null 2>&1 || git config user.name  "Ganesh Kumar"

git add -A
git commit -m "Ganesh OS: single-writer architecture for a personal multi-agent system" >/dev/null 2>&1 \
  && echo "• committed" || echo "• nothing new to commit (already committed — fine)"
git branch -M main 2>/dev/null || true

if command -v gh >/dev/null 2>&1 && gh auth status >/dev/null 2>&1; then
  echo "• gh detected — creating + configuring the repo"
  if ! gh repo view "$REPO" >/dev/null 2>&1; then
    gh repo create "$REPO" --public --source=. --remote=origin --description "$DESC" --push
  else
    git remote get-url origin >/dev/null 2>&1 || git remote add origin "https://github.com/$REPO.git"
    git push -u origin main
  fi
  gh repo edit "$REPO" --description "$DESC" --homepage "$PAGES" \
    --add-topic ai-agents --add-topic multi-agent-systems --add-topic ai-governance \
    --add-topic agent-safety --add-topic evals --add-topic human-in-the-loop \
    --add-topic auditable-ai --add-topic systems-design --add-topic personal-productivity || true
  gh api -X POST "repos/$REPO/pages" -f "source[branch]=main" -f "source[path]=/" >/dev/null 2>&1 \
    || gh api -X PUT "repos/$REPO/pages" -f "source[branch]=main" -f "source[path]=/" >/dev/null 2>&1 || true
  echo "✅ Pushed + configured. Live shortly at $PAGES"
else
  echo ""
  echo "• gh (GitHub CLI) is not installed/signed in. The commit + main branch are now READY locally."
  echo "  EASIEST PATH (does everything automatically):"
  echo "      brew install gh && gh auth login   # GitHub.com → HTTPS → login with a browser"
  echo "      bash push.sh                        # re-run; it will create the repo, push, and enable Pages"
  echo ""
  echo "  OR, without gh:"
  echo "  1) Create an empty PUBLIC repo at https://github.com/new named 'ganesh-os' (no README/license/gitignore)."
  echo "  2) Authenticate the push with a Personal Access Token (github.com/settings/tokens, 'repo' scope) —"
  echo "     git will ask for a username (gkmr) and password; paste the TOKEN as the password (not your GitHub password)."
  git remote add origin "https://github.com/$REPO.git" 2>/dev/null || true
  echo "  3) Then run:  git push -u origin main"
  echo "  4) Enable Pages: repo Settings → Pages → Source: Deploy from a branch → main / root."
  echo "     Then add the topics + homepage ($PAGES) in the repo's About (see PUBLISH.md)."
fi
