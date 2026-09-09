# Ganesh OS

The scheduled-lane fleet that runs GK's day: 37 cloud Claude sessions on cron, one Google Apps Script relay that alone talks to Telegram, Google Drive as the shared state, and a Mac lane for iMessage.

Start with `docs/fleet-map.html` (open it in a browser): the path of one message, the one enforced layer, and what stays manual. `docs/reference-poster-spotify-agent-architecture.jpg` is the design reference the map is modelled on.

## Layout

- `docs/` architecture map, fleet common law, design reference
- `relay/` the Apps Script (`Code.gs` = current v7.9.5; older versions kept for rollback), manifest, deploy steps
- `lanes/` one markdown file per scheduled lane: id, cron, model, connectors, full prompt (exported from the scheduler, the prompt text is the source of truth)
- `ops/` operator step sheets, handovers, audits, changelogs

## Secrets

Nothing secret is in this repo. The bot token, relay secret, Coda token and TickTick token live only as Script Properties in the Apps Script project (`BOT_TOKEN`, `RELAY_SECRET`, `CODA_TOKEN`, `TICKTICK_TOKEN`) and in `Claude-Fleet-State/telegram-relay-config.json` on Drive. `relay/Code.gs` has `BOT_INLINE` blanked on purpose; the deployed copy in the editor keeps its own value.

## Updating

Prompts change through the scheduler (the operator session pushes them); re-export to `lanes/` with the operator's bundle. Relay changes are pasted into the editor and published as a new version of the existing deployment (`relay/DEPLOY.md`).
