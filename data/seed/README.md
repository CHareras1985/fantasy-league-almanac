# Seed data (2009–2021)

Generated from the league's Google Sheet
(`1SGatoxS0HlpQf-VbVzTwc8dg6eHMeHtndZmbhDwA_5Y`) by `scripts/build-seed.py`. This
is the reconciled, corrected, name-normalized history — see
`fantasy-league-project-brief.md` (Simple Picks repo) for the full write-up of
what was corrected and why. Seasons 2022–2025 are not here yet; they'll be
appended once Yahoo API access is approved.

All files are flat JSON arrays. `manager` fields are lowercase ids matching
`managers.json`'s `id` (e.g. `"fernando"`, `"marcil"`) — join against that file
for display names.

| File | One row per | Notes |
|---|---|---|
| `managers.json` | manager | `id`, `name`, `aliases`, `first_season`, `last_season`, `active`. `active` is provisional — will be re-derived once 2022–2025 are in. |
| `seasons.json` | season | `year`, `team_count`, `regular_weeks`, `notes` (flags the 2009–2010 phantom-opponent quirk). |
| `standings.json` | manager × season | `wins`, `losses`, `points_for`, `reg_rank` (wins desc, then points desc). |
| `playoff_results.json` | season | `champion`/`runner_up`/`third` (manager ids), plus `championship_game` and `third_place_game` as `[{manager, points}, {manager, points}]`. A `manager: null` entry is the phantom "Random" opponent (2009 only). |
| `award_rules.json` | award category | The `Categories` tab — `key`, `points`, `label`. Static reference. |
| `season_awards.json` | manager × season | `points` = total award points earned that season (the 4 reconciliation corrections are already applied), `source: "imported"`, `detail` = which categories contributed. |
| `draft_highlights.json` | manager × season × kind | `kind`: `"best"` (every manager, every season), `"worst"` (2009–2017 only — the "Plexi pick"), or `"mvp"` (the one manager who won the season MVP award, with `draft_round`/`draft_pick`). |
| `all_star_slots.json` | season × position | Highest scorer at each roster slot; slot set changes by era (K present through 2018, a 2nd TE from 2018 on — see brief). `manager` = who rostered him (sheet recorded end-of-season owner for these historical years; going forward this should be "rostered longest" per the confirmed rule). |
| `transactions.json` | manager × season | Each manager's best in-season acquisition — `player`, `player_points`. The season-level Best Transaction *award* winner is in `season_awards.json` / `detail.best_transaction`; cross-reference by season + manager. |

Regenerate with:

```bash
python3 scripts/build-seed.py path/to/league-export.xlsx
```
