/**
 * Lists every NFL fantasy league the authenticated Yahoo account has ever been in,
 * across all seasons. Use this to find the league keys for 2009-2025 (including the
 * "missing" 2022-2025 seasons) before planning the history back-fill.
 *
 *   node scripts/yahoo-discover.mjs
 *
 * Requires .yahoo-tokens.json (run scripts/yahoo-auth.mjs first). Auto-refreshes
 * an expired access token. Raw response is saved to data/raw/discover.json.
 */
import { readFileSync, writeFileSync, existsSync, mkdirSync } from "node:fs";
import { execFileSync } from "node:child_process";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const TOKENS_PATH = join(ROOT, ".yahoo-tokens.json");

try {
  process.loadEnvFile(join(ROOT, ".env.local"));
} catch {
  console.error("Missing .env.local");
  process.exit(1);
}

if (!existsSync(TOKENS_PATH)) {
  console.error("No .yahoo-tokens.json — run: node scripts/yahoo-auth.mjs  (then the --code step)");
  process.exit(1);
}

let tokens = JSON.parse(readFileSync(TOKENS_PATH, "utf8"));

function ensureFreshToken() {
  const expired = !tokens.expires_at || Date.parse(tokens.expires_at) < Date.now() + 60_000;
  if (!expired) return;
  console.error("Access token expired — refreshing...");
  execFileSync("node", [join(ROOT, "scripts/yahoo-auth.mjs"), "--refresh"], { stdio: "inherit" });
  tokens = JSON.parse(readFileSync(TOKENS_PATH, "utf8"));
}

async function yahoo(path) {
  ensureFreshToken();
  const url = `https://fantasysports.yahooapis.com/fantasy/v2/${path}${path.includes("?") ? "&" : "?"}format=json`;
  const res = await fetch(url, { headers: { Authorization: `Bearer ${tokens.access_token}` } });
  const text = await res.text();
  if (!res.ok) {
    console.error(`Yahoo API ${res.status} for ${path}:\n${text}`);
    process.exit(1);
  }
  return JSON.parse(text);
}

// Yahoo's JSON nests everything under numeric string keys and `count`. Walk the
// whole tree and collect every object that looks like a league.
function collectLeagues(node, out = []) {
  if (Array.isArray(node)) {
    for (const v of node) collectLeagues(v, out);
  } else if (node && typeof node === "object") {
    if (node.league_key && node.name) out.push(node);
    for (const k of Object.keys(node)) collectLeagues(node[k], out);
  }
  return out;
}

const raw = await yahoo("users;use_login=1/games;game_codes=nfl/leagues");

mkdirSync(join(ROOT, "data/raw"), { recursive: true });
writeFileSync(join(ROOT, "data/raw/discover.json"), JSON.stringify(raw, null, 2) + "\n");

const leagues = collectLeagues(raw);
// de-dupe by league_key
const seen = new Map();
for (const lg of leagues) if (!seen.has(lg.league_key)) seen.set(lg.league_key, lg);

const rows = [...seen.values()]
  .map((lg) => ({
    season: Number(lg.season),
    league_key: lg.league_key,
    league_id: lg.league_id,
    name: lg.name,
    teams: lg.num_teams,
    finished: lg.is_finished === 1 || lg.is_finished === "1",
    scoring: lg.scoring_type,
  }))
  .sort((a, b) => a.season - b.season);

if (rows.length === 0) {
  console.log("No NFL fantasy leagues found for this account. Either the seasons were");
  console.log("played on a different platform/account, or the token lacks Fantasy access.");
  process.exit(0);
}

console.log(`\nNFL fantasy leagues for this Yahoo account (${rows.length} seasons):\n`);
console.log("season  league_key        id      teams  done  name");
console.log("------  ----------------  ------  -----  ----  ----------------------------------");
for (const r of rows) {
  console.log(
    `${r.season}    ${r.league_key.padEnd(16)}  ${String(r.league_id).padEnd(6)}  ${String(r.teams ?? "?").padEnd(5)}  ${r.finished ? "yes " : "no  "}  ${r.name}`,
  );
}

const have = new Set(rows.map((r) => r.season));
const want = Array.from({ length: 2025 - 2009 + 1 }, (_, i) => 2009 + i);
const missing = want.filter((y) => !have.has(y));
console.log(`\nSeasons present: ${[...have].sort().join(", ")}`);
if (missing.length) console.log(`Seasons NOT on this account: ${missing.join(", ")}`);
console.log(`\nRaw response saved to data/raw/discover.json`);
