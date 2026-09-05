# Fantasy League Almanac

The season-long fantasy football league (Yahoo, since 2009), turned into a
permanent record + per-season story book. See
[`fantasy-league-project-brief.md`](../Simple%20Picks/fantasy-league-project-brief.md)
in the Simple Picks repo for the full scoring system, historical reconciliation,
and data model (that doc will move here once this repo is the home of record).

## Status

- **Web app: v1 up.** Next.js 16 static site over `data/seed/`. Run `npm run dev`
  (port 3000). Pages: home / all-time Legends race, `/seasons` + `/seasons/[year]`,
  `/managers` + `/managers/[id]`, `/legends`. Every route is prerendered — no
  database, deploy-ready for Vercel (connect the repo, framework auto-detects).
- **2009–2021 history: reconciled and seeded.** See `data/seed/` — the corrected,
  name-normalized league history, generated from the Google Sheet export.
- **2022–2025: blocked on Yahoo API approval.** Yahoo now gates Fantasy Sports API
  access behind a manual application (see below) rather than a checkbox on the
  normal app registration. Submitted; awaiting review (up to ~2 weeks).

## Running the app

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # static export check — all routes prerender
```

## Seed data (2009–2021)

`data/seed/*.json` is generated from an `.xlsx` export of the league's Google
Sheet — see `data/seed/README.md` for the schema of each file. To regenerate:

```bash
pip install openpyxl   # one-time
curl -sL -o league-export.xlsx \
  "https://docs.google.com/spreadsheets/d/1SGatoxS0HlpQf-VbVzTwc8dg6eHMeHtndZmbhDwA_5Y/export?format=xlsx"
python3 scripts/build-seed.py league-export.xlsx
```

## Yahoo API setup (for 2022+ seasons)

Yahoo requires a manual approval for Fantasy Sports API access — registering an
app at developer.yahoo.com is not enough on its own.

1. Register an app at <https://developer.yahoo.com/apps/> — Confidential Client,
   redirect URI `https://localhost:3000/api/auth/yahoo/callback`.
2. Apply for Fantasy Sports data access at
   <https://sports.yahoo.com/developer/access/>, referencing that app's Client ID.
   Read-only, personal/single-league use. **This step is required** — without
   approval, API calls fail with `additional_authorization_required` no matter
   how the app is configured.
3. Once approved: `cp .env.local.example .env.local` and fill in
   `YAHOO_CLIENT_ID` / `YAHOO_CLIENT_SECRET`.
4. `node scripts/yahoo-auth.mjs` — prints an authorization URL. Open it, approve,
   copy the `code` param from the redirect URL (the page won't load — fine).
5. `node scripts/yahoo-auth.mjs --code <code>` — saves `.yahoo-tokens.json`
   (gitignored; holds the long-lived refresh token).
6. `node scripts/yahoo-discover.mjs` — lists every NFL league this account has
   been in, all seasons, with league keys. Confirms what Yahoo still has for
   2009-2025.

No Node dependencies — plain Node ≥ 20. Seed-data generation needs Python 3 +
`openpyxl`.
