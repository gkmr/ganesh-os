#!/usr/bin/env bash
set -euo pipefail
cd "$(dirname "$0")"
[ -x ./prepush-lint.sh ] && ./prepush-lint.sh
TOKEN=$(cat ~/Documents/Claude/logs/.github-token)
BRANCH=$(git rev-parse --abbrev-ref HEAD)
git push "https://x-access-token:${TOKEN}@github.com/gkmr/ganesh-os.git" "$BRANCH"
