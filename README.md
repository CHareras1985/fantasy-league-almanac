# Fantasy League Almanac

The season-long fantasy football league (Yahoo, since 2009), turned into a
permanent record + per-season story book. See
[`fantasy-league-project-brief.md`](../Simple%20Picks/fantasy-league-project-brief.md)
in the Simple Picks repo for the full scoring system, historical reconciliation,
and data model (that doc will move here once this repo is the home of record).

## Status

Bootstrapping the Yahoo Fantasy Sports API connection.

## Yahoo API setup

1. Register an app at <https://developer.yahoo.com/apps/> — Confidential Client,
   redirect URI `https://localhost:3000/api/auth/yahoo/callback`. (Yahoo no longer
   shows a "Fantasy Sports" permission checkbox; Fantasy read access is granted at
   sign-in.)
2. `cp .env.local.example .env.local` and fill in `YAHOO_CLIENT_ID` /
   `YAHOO_CLIENT_SECRET`.
3. `node scripts/yahoo-auth.mjs` — prints an authorization URL. Open it, approve,
   copy the `code` param from the redirect URL (the page won't load — fine).
4. `node scripts/yahoo-auth.mjs --code <code>` — saves `.yahoo-tokens.json`
   (gitignored; holds the long-lived refresh token).
5. `node scripts/yahoo-discover.mjs` — lists every NFL league this account has
   been in, all seasons, with league keys. Confirms what Yahoo still has for
   2009-2025.

No dependencies — plain Node ≥ 20.
