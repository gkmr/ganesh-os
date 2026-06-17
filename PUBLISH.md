# Publish steps (public repo: gkmr/ganesh-os)

## Fastest path (one command, if you have the GitHub CLI)
```bash
cd ~/Documents/Claude/portfolio/ganesh-os && bash push.sh
```
If `gh` is installed and signed in (`gh auth login` once), `push.sh` creates the public repo, pushes, sets the description + topics + homepage, and **enables Pages** automatically. Live at `https://gkmr.github.io/ganesh-os/` within a minute. If you don't have `gh`, the script prints the manual fallback and the steps below still apply.

---

GitHub's web uploader cannot preserve a nested folder tree (`.github/workflows/`, `evals/data/`, `agents/`, `docs/`), and a flattened upload would break CI. So the reliable path is a one-time `git push`. It takes about 20 seconds.

## 1. Create the empty repo
On github.com (signed in as **gkmr**, your personal account — not the work org): New repository → name `ganesh-os`, **Public**, do NOT add a README/license/gitignore (this repo already has them).

## 2. Push from your Mac
```bash
cd ~/Documents/Claude/portfolio/ganesh-os
bash push.sh        # or run the commands inside it
```

## 3. Turn on the live demo (GitHub Pages)
Settings → Pages → Source: Deploy from a branch → `main` / root → Save. In a minute, `index.html` and `demo.html` are live at `https://gkmr.github.io/ganesh-os/`. Add that URL to the repo's About.

## 4. Make it discoverable (this is what gets stars)
- About (gear icon, top right): paste the description from `PROFILE.md`; add the live Pages URL.
- Topics: `ai-agents` `multi-agent-systems` `personal-productivity` `systems-design` `automation` `human-in-the-loop` `scheduling` `product-design`.
- Settings → General → Social preview: upload `assets/hero.svg` rendered to PNG (or screenshot the index hero), so X/LinkedIn/Slack unfurl a real card.
- Settings → Code security: enable secret scanning (free on public repos).

## 5. The distribution that actually drives stars
The repo converts the click; a post drives it. Lead a short "Show HN" / X thread with the single-writer-fence idea and the `99 → 0` hook, link the live demo. The README's hero image and CI badge do the converting.
