/**
 * One-time Yahoo OAuth2 helper for the Fantasy Sports API.
 *
 *   node scripts/yahoo-auth.mjs              -> prints the authorization URL to open
 *   node scripts/yahoo-auth.mjs --code XXXX  -> exchanges the code for tokens
 *   node scripts/yahoo-auth.mjs --refresh    -> refreshes the access token
 *
 * Tokens are written to .yahoo-tokens.json (gitignored). The refresh_token is
 * long-lived; the access_token expires in ~1 hour and is re-minted with --refresh
 * (or automatically by the other scripts).
 */
import { writeFileSync, readFileSync, existsSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const TOKENS_PATH = join(ROOT, ".yahoo-tokens.json");

// --- config -----------------------------------------------------------------
try {
  process.loadEnvFile(join(ROOT, ".env.local"));
} catch {
  console.error("Missing .env.local — copy .env.local.example to .env.local and fill it in.");
  process.exit(1);
}

const CLIENT_ID = process.env.YAHOO_CLIENT_ID;
const CLIENT_SECRET = process.env.YAHOO_CLIENT_SECRET;
const REDIRECT_URI = process.env.YAHOO_REDIRECT_URI;

if (!CLIENT_ID || !CLIENT_SECRET || !REDIRECT_URI) {
  console.error("YAHOO_CLIENT_ID, YAHOO_CLIENT_SECRET and YAHOO_REDIRECT_URI must all be set in .env.local");
  process.exit(1);
}

const AUTH_URL = "https://api.login.yahoo.com/oauth2/request_auth";
const TOKEN_URL = "https://api.login.yahoo.com/oauth2/get_token";

// --- helpers --------------------------------------------------------------
const basicAuth = "Basic " + Buffer.from(`${CLIENT_ID}:${CLIENT_SECRET}`).toString("base64");

async function tokenRequest(params) {
  const res = await fetch(TOKEN_URL, {
    method: "POST",
    headers: {
      Authorization: basicAuth,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams(params).toString(),
  });
  const text = await res.text();
  if (!res.ok) {
    console.error(`Token request failed (${res.status}):\n${text}`);
    process.exit(1);
  }
  return JSON.parse(text);
}

function saveTokens(tok) {
  const record = {
    access_token: tok.access_token,
    refresh_token: tok.refresh_token,
    token_type: tok.token_type,
    expires_at: new Date(Date.now() + tok.expires_in * 1000).toISOString(),
    xoauth_yahoo_guid: tok.xoauth_yahoo_guid ?? null,
    obtained_at: new Date().toISOString(),
  };
  writeFileSync(TOKENS_PATH, JSON.stringify(record, null, 2) + "\n");
  return record;
}

// --- modes -----------------------------------------------------------------
const args = process.argv.slice(2);
const codeIdx = args.indexOf("--code");

if (args.includes("--refresh")) {
  if (!existsSync(TOKENS_PATH)) {
    console.error("No .yahoo-tokens.json yet — run the --code step first.");
    process.exit(1);
  }
  const { refresh_token } = JSON.parse(readFileSync(TOKENS_PATH, "utf8"));
  const tok = await tokenRequest({
    grant_type: "refresh_token",
    redirect_uri: REDIRECT_URI,
    refresh_token,
  });
  const rec = saveTokens({ ...tok, refresh_token: tok.refresh_token ?? refresh_token });
  console.log(`Access token refreshed. Expires ${rec.expires_at}.`);
} else if (codeIdx !== -1) {
  const code = args[codeIdx + 1];
  if (!code) {
    console.error("Usage: node scripts/yahoo-auth.mjs --code <code-from-redirect-url>");
    process.exit(1);
  }
  const tok = await tokenRequest({
    grant_type: "authorization_code",
    redirect_uri: REDIRECT_URI,
    code,
  });
  const rec = saveTokens(tok);
  console.log(`Saved .yahoo-tokens.json`);
  console.log(`  Yahoo GUID:   ${rec.xoauth_yahoo_guid}`);
  console.log(`  Access token expires: ${rec.expires_at}`);
  console.log(`  Refresh token stored (long-lived).`);
  console.log(`\nNext: npm run yahoo:discover`);
} else {
  const url =
    `${AUTH_URL}?` +
    new URLSearchParams({
      client_id: CLIENT_ID,
      redirect_uri: REDIRECT_URI,
      response_type: "code",
      language: "en-us",
    }).toString();
  console.log("1. Open this URL in your browser (signed in as the Yahoo account in the league):\n");
  console.log("   " + url + "\n");
  console.log("2. Approve access. Your browser will redirect to a URL like:\n");
  console.log("   " + REDIRECT_URI + "?code=ABCD1234&...\n");
  console.log("   The page itself will fail to load (nothing is running there) — that's fine.");
  console.log("   Copy the value of the `code` parameter from the address bar.\n");
  console.log("3. Run:  node scripts/yahoo-auth.mjs --code <that-code>");
}
