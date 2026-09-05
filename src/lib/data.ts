import fs from "node:fs";
import path from "node:path";

// ---------------------------------------------------------------- types ----
export type PlayoffFinish = "champion" | "runner_up" | "third" | null;

export interface Manager {
  id: string;
  name: string;
  aliases: string[];
  first_season: number;
  last_season: number;
  active: boolean;
}

export interface Season {
  year: number;
  team_count: number;
  regular_weeks: number | null;
  notes: string | null;
}

export interface Standing {
  season: number;
  manager: string;
  wins: number;
  losses: number;
  points_for: number;
  reg_rank: number;
}

export interface GameSide {
  manager: string | null;
  points: number | null;
}

export interface PlayoffResult {
  season: number;
  champion: string | null;
  runner_up: string | null;
  third: string | null;
  championship_game: GameSide[] | null;
  third_place_game: GameSide[] | null;
}

export interface AwardRule {
  key: string;
  points: number;
  label: string;
}

export interface SeasonAwardDetail {
  reg_rank: number | null;
  winning_season: boolean;
  playoff_finish: PlayoffFinish;
  most_points: boolean;
  mvp_pick: boolean;
  best_transaction: boolean;
  longest_streak: boolean;
  streak_length: number | null;
}

export interface SeasonAward {
  season: number;
  manager: string;
  points: number;
  source: string;
  detail: SeasonAwardDetail;
}

export interface DraftHighlight {
  season: number;
  manager: string;
  kind: "best" | "worst" | "mvp";
  player: string | null;
  player_points: number | null;
  draft_round?: number | null;
  draft_pick?: number | null;
}

export interface AllStarSlot {
  season: number;
  position: string;
  player: string;
  player_points: number | null;
  manager: string | null;
}

export interface Transaction {
  season: number;
  manager: string;
  player: string | null;
  player_points: number | null;
}

// ---------------------------------------------------------------- load ----
const SEED = path.join(process.cwd(), "data", "seed");
const read = <T,>(file: string): T =>
  JSON.parse(fs.readFileSync(path.join(SEED, file), "utf8")) as T;

export const managers = read<Manager[]>("managers.json");
export const seasons = read<Season[]>("seasons.json").sort((a, b) => a.year - b.year);
export const standings = read<Standing[]>("standings.json");
export const playoffResults = read<PlayoffResult[]>("playoff_results.json");
export const awardRules = read<AwardRule[]>("award_rules.json");
export const seasonAwards = read<SeasonAward[]>("season_awards.json");
export const draftHighlights = read<DraftHighlight[]>("draft_highlights.json");
export const allStarSlots = read<AllStarSlot[]>("all_star_slots.json");
export const transactions = read<Transaction[]>("transactions.json");

const managerById = new Map(managers.map((m) => [m.id, m]));
export const getManager = (id: string | null | undefined): Manager | undefined =>
  id ? managerById.get(id) : undefined;
export const managerName = (id: string | null | undefined): string =>
  getManager(id)?.name ?? (id ?? "—");

export const YEARS = seasons.map((s) => s.year);
export const LATEST_YEAR = YEARS[YEARS.length - 1];

// ---------------------------------------------------- career aggregates ----
export interface AwardRaceRow {
  manager: Manager;
  points: number;
  seasons: number;
  titles: number;
}

export function awardRace(): AwardRaceRow[] {
  const pts = new Map<string, number>();
  const secount = new Map<string, number>();
  for (const a of seasonAwards) {
    pts.set(a.manager, (pts.get(a.manager) ?? 0) + a.points);
    secount.set(a.manager, (secount.get(a.manager) ?? 0) + 1);
  }
  const titles = titleCounts();
  return [...pts.entries()]
    .map(([id, points]) => ({
      manager: managerById.get(id)!,
      points,
      seasons: secount.get(id) ?? 0,
      titles: titles.get(id) ?? 0,
    }))
    .sort((a, b) => b.points - a.points || b.titles - a.titles || a.manager.name.localeCompare(b.manager.name));
}

export interface RecordRow {
  manager: Manager;
  wins: number;
  losses: number;
  pct: number;
  points_for: number;
  seasons: number;
  titles: number;
  award_points: number;
}

export function careerRecords(): RecordRow[] {
  const w = new Map<string, number>();
  const l = new Map<string, number>();
  const pf = new Map<string, number>();
  const sc = new Map<string, number>();
  for (const s of standings) {
    w.set(s.manager, (w.get(s.manager) ?? 0) + s.wins);
    l.set(s.manager, (l.get(s.manager) ?? 0) + s.losses);
    pf.set(s.manager, (pf.get(s.manager) ?? 0) + s.points_for);
    sc.set(s.manager, (sc.get(s.manager) ?? 0) + 1);
  }
  const titles = titleCounts();
  const ap = new Map<string, number>();
  for (const a of seasonAwards) ap.set(a.manager, (ap.get(a.manager) ?? 0) + a.points);
  return [...w.keys()]
    .map((id) => {
      const wins = w.get(id) ?? 0;
      const losses = l.get(id) ?? 0;
      return {
        manager: managerById.get(id)!,
        wins,
        losses,
        pct: wins + losses ? wins / (wins + losses) : 0,
        points_for: pf.get(id) ?? 0,
        seasons: sc.get(id) ?? 0,
        titles: titles.get(id) ?? 0,
        award_points: ap.get(id) ?? 0,
      };
    })
    .sort((a, b) => b.pct - a.pct);
}

export function titleCounts(): Map<string, number> {
  const t = new Map<string, number>();
  for (const p of playoffResults) {
    if (p.champion) t.set(p.champion, (t.get(p.champion) ?? 0) + 1);
  }
  return t;
}

// ---------------------------------------------------- season detail ----
export interface SeasonDetail {
  season: Season;
  standings: Standing[];
  playoffs: PlayoffResult | undefined;
  awardsByManager: Map<string, SeasonAward>;
  allStar: AllStarSlot[];
  bestPicks: DraftHighlight[];
  worstPicks: DraftHighlight[];
  mvpPick: DraftHighlight | undefined;
  transactions: Transaction[];
  totalAwardPoints: number;
}

export function seasonDetail(year: number): SeasonDetail {
  const season = seasons.find((s) => s.year === year)!;
  const st = standings
    .filter((s) => s.season === year)
    .sort((a, b) => a.reg_rank - b.reg_rank);
  const aw = seasonAwards.filter((a) => a.season === year);
  const dh = draftHighlights.filter((d) => d.season === year);
  return {
    season,
    standings: st,
    playoffs: playoffResults.find((p) => p.season === year),
    awardsByManager: new Map(aw.map((a) => [a.manager, a])),
    allStar: allStarSlots.filter((a) => a.season === year),
    bestPicks: dh
      .filter((d) => d.kind === "best")
      .sort((a, b) => (b.player_points ?? 0) - (a.player_points ?? 0)),
    worstPicks: dh
      .filter((d) => d.kind === "worst")
      .sort((a, b) => (a.player_points ?? 0) - (b.player_points ?? 0)),
    mvpPick: dh.find((d) => d.kind === "mvp"),
    transactions: transactions
      .filter((t) => t.season === year)
      .sort((a, b) => (b.player_points ?? 0) - (a.player_points ?? 0)),
    totalAwardPoints: aw.reduce((n, a) => n + a.points, 0),
  };
}

// ---------------------------------------------------- manager detail ----
export interface ManagerSeasonRow {
  year: number;
  wins: number;
  losses: number;
  points_for: number;
  reg_rank: number;
  team_count: number;
  playoff_finish: PlayoffFinish;
  award_points: number;
}

export interface ManagerDetail {
  manager: Manager;
  rows: ManagerSeasonRow[];
  totals: {
    wins: number;
    losses: number;
    pct: number;
    points_for: number;
    award_points: number;
    seasons: number;
    titles: number;
  };
  awardBreakdown: { label: string; count: number; points: number }[];
  bestPicks: DraftHighlight[];
  worstPicks: DraftHighlight[];
  mvpPicks: DraftHighlight[];
  allStars: AllStarSlot[];
  bestTransactions: Transaction[];
}

export function managerDetail(id: string): ManagerDetail {
  const manager = managerById.get(id)!;
  const st = standings.filter((s) => s.manager === id).sort((a, b) => a.season - b.season);
  const awMap = new Map(
    seasonAwards.filter((a) => a.manager === id).map((a) => [a.season, a]),
  );
  const rows: ManagerSeasonRow[] = st.map((s) => {
    const p = playoffResults.find((pr) => pr.season === s.season);
    const finish: PlayoffFinish =
      p?.champion === id ? "champion" : p?.runner_up === id ? "runner_up" : p?.third === id ? "third" : null;
    return {
      year: s.season,
      wins: s.wins,
      losses: s.losses,
      points_for: s.points_for,
      reg_rank: s.reg_rank,
      team_count: seasons.find((x) => x.year === s.season)?.team_count ?? 0,
      playoff_finish: finish,
      award_points: awMap.get(s.season)?.points ?? 0,
    };
  });

  const wins = rows.reduce((n, r) => n + r.wins, 0);
  const losses = rows.reduce((n, r) => n + r.losses, 0);

  // award breakdown across seasons
  const counts = new Map<string, { count: number; points: number }>();
  const bump = (label: string, points: number) => {
    const c = counts.get(label) ?? { count: 0, points: 0 };
    c.count += 1;
    c.points += points;
    counts.set(label, c);
  };
  for (const a of awMap.values()) {
    if (a.detail.reg_rank === 1) bump("Regular Season 1st", 4);
    else if (a.detail.reg_rank === 2) bump("Regular Season 2nd", 3);
    else if (a.detail.reg_rank === 3) bump("Regular Season 3rd", 2);
    if (a.detail.winning_season) bump("Winning Season", 1);
    if (a.detail.playoff_finish === "champion") bump("Playoff Champion", 5);
    if (a.detail.playoff_finish === "runner_up") bump("Playoff Runner-up", 4);
    if (a.detail.playoff_finish === "third") bump("Playoff 3rd Place", 3);
    if (a.detail.most_points) bump("Most PTS Scored", 3);
    if (a.detail.mvp_pick) bump("M.V.P. Pick", 2);
    if (a.detail.best_transaction) bump("Best Transaction", 2);
    if (a.detail.longest_streak) bump("Longest Win Streak", 3);
  }

  return {
    manager,
    rows,
    totals: {
      wins,
      losses,
      pct: wins + losses ? wins / (wins + losses) : 0,
      points_for: rows.reduce((n, r) => n + r.points_for, 0),
      award_points: rows.reduce((n, r) => n + r.award_points, 0),
      seasons: rows.length,
      titles: rows.filter((r) => r.playoff_finish === "champion").length,
    },
    awardBreakdown: [...counts.entries()]
      .map(([label, c]) => ({ label, count: c.count, points: c.points }))
      .sort((a, b) => b.points - a.points),
    bestPicks: draftHighlights
      .filter((d) => d.manager === id && d.kind === "best")
      .sort((a, b) => a.season - b.season),
    worstPicks: draftHighlights
      .filter((d) => d.manager === id && d.kind === "worst")
      .sort((a, b) => a.season - b.season),
    mvpPicks: draftHighlights
      .filter((d) => d.manager === id && d.kind === "mvp")
      .sort((a, b) => a.season - b.season),
    allStars: allStarSlots.filter((a) => a.manager === id).sort((a, b) => a.season - b.season),
    bestTransactions: transactions
      .filter((t) => t.manager === id)
      .sort((a, b) => a.season - b.season),
  };
}

// ---------------------------------------------------- race progression ----
export interface RaceProgression {
  years: number[];
  series: { manager: Manager; cumulative: number[] }[];
}

/** Cumulative award points per manager after each season, in order. */
export function raceProgression(): RaceProgression {
  const totalByMgr = new Map<string, number>();
  for (const a of seasonAwards) totalByMgr.set(a.manager, (totalByMgr.get(a.manager) ?? 0) + a.points);
  const ids = [...totalByMgr.entries()].sort((a, b) => b[1] - a[1]).map(([id]) => id);

  const running = new Map<string, number>(ids.map((id) => [id, 0]));
  const series = new Map<string, number[]>(ids.map((id) => [id, []]));
  for (const year of YEARS) {
    for (const a of seasonAwards.filter((x) => x.season === year)) {
      running.set(a.manager, (running.get(a.manager) ?? 0) + a.points);
    }
    for (const id of ids) series.get(id)!.push(running.get(id) ?? 0);
  }
  return {
    years: [...YEARS],
    series: ids.map((id) => ({ manager: managerById.get(id)!, cumulative: series.get(id)! })),
  };
}

// ---------------------------------------------------- season superlatives ----
export interface GameMargin {
  game: "Championship" | "Third-place";
  winner: string | null;
  loser: string | null;
  winnerPts: number | null;
  loserPts: number | null;
  margin: number;
}

export interface SeasonSuperlatives {
  topScorer: { manager: string; points: number } | null;
  lowScorer: { manager: string; points: number } | null;
  blowout: GameMargin | null;
  nailbiter: GameMargin | null;
  streak: { managers: string[]; length: number } | null;
  bestValue: { manager: string; player: string | null; points: number | null } | null;
  leagueRecordPF: boolean; // this season's top PF is the highest through this year
}

function gameMargin(
  label: "Championship" | "Third-place",
  sides: GameSide[] | null | undefined,
): GameMargin | null {
  if (!sides || sides.length !== 2) return null;
  const [a, b] = [...sides].sort((x, y) => (y.points ?? 0) - (x.points ?? 0));
  return {
    game: label,
    winner: a.manager,
    loser: b.manager,
    winnerPts: a.points,
    loserPts: b.points,
    margin: Math.round(((a.points ?? 0) - (b.points ?? 0)) * 10) / 10,
  };
}

export function seasonSuperlatives(year: number): SeasonSuperlatives {
  const st = standings.filter((s) => s.season === year);
  const byPf = [...st].sort((a, b) => b.points_for - a.points_for);
  const top = byPf[0];
  const low = byPf[byPf.length - 1];

  const p = playoffResults.find((x) => x.season === year);
  const games = [
    gameMargin("Championship", p?.championship_game),
    gameMargin("Third-place", p?.third_place_game),
  ].filter((g): g is GameMargin => g !== null && g.winner !== null && g.loser !== null);
  const blowout = games.length ? [...games].sort((a, b) => b.margin - a.margin)[0] : null;
  const nailbiter = games.length ? [...games].sort((a, b) => a.margin - b.margin)[0] : null;

  const streakRows = seasonAwards.filter((a) => a.season === year && a.detail.longest_streak);
  const streak = streakRows.length
    ? { managers: streakRows.map((r) => r.manager), length: streakRows[0].detail.streak_length ?? 0 }
    : null;

  const best = draftHighlights
    .filter((d) => d.season === year && d.kind === "best")
    .sort((a, b) => (b.player_points ?? 0) - (a.player_points ?? 0))[0];

  const priorMax = Math.max(
    0,
    ...standings.filter((s) => s.season < year).map((s) => s.points_for),
  );

  return {
    topScorer: top ? { manager: top.manager, points: top.points_for } : null,
    lowScorer: low ? { manager: low.manager, points: low.points_for } : null,
    blowout,
    nailbiter,
    streak,
    bestValue: best
      ? { manager: best.manager, player: best.player, points: best.player_points }
      : null,
    leagueRecordPF: !!top && top.points_for > priorMax && year !== YEARS[0],
  };
}

// ---------------------------------------------------- all-time records ----
export interface RecordEntry {
  label: string;
  holder: string; // display text (may be multiple names)
  detail: string;
  year?: number;
  href?: string;
}

export function allTimeRecords(): { group: string; entries: RecordEntry[] }[] {
  const st = [...standings];
  const hiPF = [...st].sort((a, b) => b.points_for - a.points_for)[0];
  const loPF = [...st].sort((a, b) => a.points_for - b.points_for)[0];
  const hiAward = [...seasonAwards].sort((a, b) => b.points - a.points)[0];

  const margins: (GameMargin & { year: number })[] = [];
  for (const p of playoffResults) {
    for (const g of [
      gameMargin("Championship", p.championship_game),
      gameMargin("Third-place", p.third_place_game),
    ]) {
      if (g && g.winner && g.loser) margins.push({ ...g, year: p.season });
    }
  }
  const biggestGame = [...margins].sort((a, b) => b.margin - a.margin)[0];
  const closestGame = [...margins].sort((a, b) => a.margin - b.margin)[0];

  const streaks = seasonAwards
    .filter((a) => a.detail.longest_streak && a.detail.streak_length != null)
    .sort((a, b) => (b.detail.streak_length ?? 0) - (a.detail.streak_length ?? 0));
  const maxStreak = streaks[0]?.detail.streak_length ?? 0;
  const streakHolders = streaks.filter((s) => s.detail.streak_length === maxStreak);

  const bestPickEver = draftHighlights
    .filter((d) => d.kind === "best")
    .sort((a, b) => (b.player_points ?? 0) - (a.player_points ?? 0))[0];
  const bustEver = draftHighlights
    .filter((d) => d.kind === "worst")
    .sort((a, b) => (a.player_points ?? 0) - (b.player_points ?? 0))[0];
  const txEver = transactions
    .filter((t) => t.player_points != null)
    .sort((a, b) => (b.player_points ?? 0) - (a.player_points ?? 0))[0];
  const allStarEver = [...allStarSlots]
    .filter((a) => a.player_points != null)
    .sort((a, b) => (b.player_points ?? 0) - (a.player_points ?? 0))[0];

  const race = awardRace();
  const titles = race.filter((r) => r.titles === Math.max(...race.map((x) => x.titles)));

  const regFirsts = new Map<string, number>();
  for (const a of seasonAwards) if (a.detail.reg_rank === 1) regFirsts.set(a.manager, (regFirsts.get(a.manager) ?? 0) + 1);
  const maxRegFirst = Math.max(...regFirsts.values());
  const regFirstHolders = [...regFirsts.entries()].filter(([, n]) => n === maxRegFirst);

  const mvpCounts = new Map<string, number>();
  for (const d of draftHighlights) if (d.kind === "mvp") mvpCounts.set(d.manager, (mvpCounts.get(d.manager) ?? 0) + 1);
  const maxMvp = Math.max(...mvpCounts.values());
  const mvpHolders = [...mvpCounts.entries()].filter(([, n]) => n === maxMvp);

  return [
    {
      group: "Scoring",
      entries: [
        {
          label: "Highest-scoring season",
          holder: managerName(hiPF.manager),
          detail: `${fmtPts(hiPF.points_for)} points`,
          year: hiPF.season,
          href: `/seasons/${hiPF.season}`,
        },
        {
          label: "Lowest-scoring season",
          holder: managerName(loPF.manager),
          detail: `${fmtPts(loPF.points_for)} points`,
          year: loPF.season,
          href: `/seasons/${loPF.season}`,
        },
        {
          label: "Highest-scoring All-Star",
          holder: allStarEver ? `${allStarEver.player} (${managerName(allStarEver.manager)})` : "—",
          detail: allStarEver ? `${fmtPts(allStarEver.player_points, 0)} pts · ${allStarEver.position}` : "",
          year: allStarEver?.season,
          href: allStarEver ? `/seasons/${allStarEver.season}` : undefined,
        },
      ],
    },
    {
      group: "Playoff games",
      entries: [
        {
          label: "Biggest final margin",
          holder: `${managerName(biggestGame.winner)} over ${managerName(biggestGame.loser)}`,
          detail: `${fmtPts(biggestGame.winnerPts)}–${fmtPts(biggestGame.loserPts)} · ${biggestGame.game} game · +${biggestGame.margin}`,
          year: biggestGame.year,
          href: `/seasons/${biggestGame.year}`,
        },
        {
          label: "Closest final",
          holder: `${managerName(closestGame.winner)} over ${managerName(closestGame.loser)}`,
          detail: `${fmtPts(closestGame.winnerPts)}–${fmtPts(closestGame.loserPts)} · ${closestGame.game} game · +${closestGame.margin}`,
          year: closestGame.year,
          href: `/seasons/${closestGame.year}`,
        },
      ],
    },
    {
      group: "Streaks & dominance",
      entries: [
        {
          label: "Longest win streak",
          holder: streakHolders.map((s) => `${managerName(s.manager)} (${s.season})`).join(", "),
          detail: `${maxStreak} straight`,
        },
        {
          label: "Most award points in a season",
          holder: managerName(hiAward.manager),
          detail: `${hiAward.points} points`,
          year: hiAward.season,
          href: `/seasons/${hiAward.season}`,
        },
        {
          label: "Most championships",
          holder: titles.map((t) => t.manager.name).join(", "),
          detail: `${titles[0].titles} titles`,
        },
        {
          label: "Most regular-season crowns",
          holder: regFirstHolders.map(([id]) => managerName(id)).join(", "),
          detail: `${maxRegFirst} times`,
        },
      ],
    },
    {
      group: "Draft & transactions",
      entries: [
        {
          label: "Best draft pick",
          holder: bestPickEver ? `${bestPickEver.player} (${managerName(bestPickEver.manager)})` : "—",
          detail: bestPickEver ? `${fmtPts(bestPickEver.player_points, 0)} pts` : "",
          year: bestPickEver?.season,
          href: bestPickEver ? `/seasons/${bestPickEver.season}` : undefined,
        },
        {
          label: "Biggest bust",
          holder: bustEver ? `${bustEver.player} (${managerName(bustEver.manager)})` : "—",
          detail: bustEver ? `${fmtPts(bustEver.player_points, 0)} pts · “Plexi” pick` : "",
          year: bustEver?.season,
          href: bustEver ? `/seasons/${bustEver.season}` : undefined,
        },
        {
          label: "Best transaction",
          holder: txEver ? `${txEver.player} (${managerName(txEver.manager)})` : "—",
          detail: txEver ? `${fmtPts(txEver.player_points, 0)} pts` : "",
          year: txEver?.season,
          href: txEver ? `/seasons/${txEver.season}` : undefined,
        },
        {
          label: "Most M.V.P. picks",
          holder: mvpHolders.map(([id]) => managerName(id)).join(", "),
          detail: `${maxMvp} times`,
        },
      ],
    },
  ];
}

// ---------------------------------------------------- formatting ----
export const fmtPts = (n: number | null | undefined, digits = 1): string =>
  n == null ? "—" : n.toLocaleString("en-US", { minimumFractionDigits: digits, maximumFractionDigits: digits });
export const fmtPct = (n: number): string => n.toFixed(3).replace(/^0/, "");
export const ordinal = (n: number): string => {
  const s = ["th", "st", "nd", "rd"];
  const v = n % 100;
  return n + (s[(v - 20) % 10] || s[v] || s[0]);
};
