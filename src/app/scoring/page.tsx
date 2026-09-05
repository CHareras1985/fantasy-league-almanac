import Link from "next/link";
import type { Metadata } from "next";
import { awardRules } from "@/lib/data";
import { PageHeading, Card, SectionTitle } from "@/components/ui";

export const metadata: Metadata = { title: "Scoring" };

const HOW: Record<string, string> = {
  playoff_champion: "Won the playoff bracket.",
  playoff_runner_up: "Lost the championship game.",
  playoff_third: "Won the third-place game.",
  reg_season_1st: "Best regular-season standing.",
  reg_season_2nd: "Second-best regular-season standing.",
  reg_season_3rd: "Third-best regular-season standing.",
  winning_season: "Finished with more wins than losses.",
  most_points: "Most total points scored in the regular season.",
  mvp_pick: "Drafted the league’s highest-scoring drafted player (see below).",
  best_transaction: "Acquired the league’s highest-scoring added player (see below).",
  longest_streak: "Longest run of consecutive wins in the regular season.",
};

export default function ScoringPage() {
  const rules = [...awardRules].sort((a, b) => b.points - a.points);

  return (
    <div className="space-y-10">
      <PageHeading
        kicker="How the Almanac scores"
        title="Scoring"
        sub="Every season, managers earn award points in eleven categories. These points — not wins — are what the all-time Legends race is built on."
      />

      <section>
        <SectionTitle>Award categories</SectionTitle>
        <Card className="!p-0">
          <div className="table-wrap">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border text-left text-xs uppercase tracking-wide text-ink-muted">
                  <th className="px-4 py-2 font-medium">Category</th>
                  <th className="px-4 py-2 text-right font-medium">Points</th>
                  <th className="px-4 py-2 font-medium">How it&rsquo;s decided</th>
                </tr>
              </thead>
              <tbody>
                {rules.map((r) => (
                  <tr key={r.key} className="border-b border-border/60 last:border-0">
                    <td className="px-4 py-2 font-medium whitespace-nowrap">{r.label}</td>
                    <td className="px-4 py-2 text-right tabular-nums font-medium">{r.points}</td>
                    <td className="px-4 py-2 text-ink-muted">{HOW[r.key]}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      </section>

      <section>
        <SectionTitle>Rules &amp; tie-breaks</SectionTitle>
        <Card>
          <ul className="space-y-3 text-sm leading-relaxed">
            <li>
              <span className="font-medium">Regular-season rank</span> is by wins, then total points
              scored as the tiebreak.
            </li>
            <li>
              <span className="font-medium">Winning Season</span> means strictly more wins than
              losses — in a 13-game year, 7–6 counts, 6–7 does not.
            </li>
            <li>
              <span className="font-medium">A tie for the Longest Win Streak</span> awards the full 3
              points to <em>every</em> manager who shares it.
            </li>
            <li>
              <span className="font-medium">Fewest points</span> is tracked each season but carries no
              penalty.
            </li>
            <li>
              <span className="font-medium">Most PTS Scored</span> is a regular-season total; the
              playoffs don&rsquo;t count toward it.
            </li>
          </ul>
        </Card>
      </section>

      <section>
        <SectionTitle>Player-based awards</SectionTitle>
        <Card className="space-y-4 text-sm leading-relaxed">
          <p>
            Every player-based honor is decided purely by a player&rsquo;s{" "}
            <span className="font-medium">full-season fantasy points</span> in the league&rsquo;s
            scoring — no judgement calls.
          </p>
          <div>
            <div className="font-medium">Best Draft Pick (per manager)</div>
            <p className="text-ink-muted">
              The highest-scoring player that manager drafted that year.
            </p>
          </div>
          <div>
            <div className="font-medium">Best Transaction (per manager)</div>
            <p className="text-ink-muted">
              The highest-scoring player that manager acquired by trade or waiver that year —
              credited with the player&rsquo;s full-season total, however many weeks they were
              rostered.
            </p>
          </div>
          <div>
            <div className="font-medium">M.V.P. Pick — the award (+2)</div>
            <p className="text-ink-muted">
              Goes to the manager whose Best Draft Pick scored the most, league-wide. It&rsquo;s a{" "}
              <em>draft</em> award: a player picked up mid-season isn&rsquo;t eligible — he counts
              toward Best Transaction instead. (2018: Patrick Mahomes outscored everyone at 424, but
              he was a waiver add, so the MVP went to Saquon Barkley, drafted by Dean.)
            </p>
          </div>
          <div>
            <div className="font-medium">Best Transaction — the award (+2)</div>
            <p className="text-ink-muted">
              Goes to the manager whose Best Transaction player scored the most, league-wide.
            </p>
          </div>
          <div>
            <div className="font-medium">All-Star Roster</div>
            <p className="text-ink-muted">
              The single highest-scoring player at each roster slot that season, credited to whichever
              manager rostered him longest. A recorded honor — worth no award points. The slot set
              changed over the years: a K and a W/R/T flex through 2017, a second TE added from 2018,
              the K dropped from 2019.
            </p>
          </div>
          <div>
            <div className="font-medium">Worst / &ldquo;Plexi&rdquo; Pick</div>
            <p className="text-ink-muted">
              A disappointing early-round draft pick, tracked 2009–2017 only (named for Plaxico
              Burress). Dropped after 2017 — it survives only as historical trivia and carries no
              points.
            </p>
          </div>
        </Card>
      </section>

      <section>
        <SectionTitle>A worked example</SectionTitle>
        <Card>
          <p className="text-sm leading-relaxed">
            In{" "}
            <Link href="/seasons/2021" className="text-turf hover:underline">
              2021
            </Link>
            , Costa earned <span className="font-medium">11 award points</span>: Winning Season (1) +
            Playoff Champion (5) + M.V.P. Pick (2, Cooper Kupp) + Longest Win Streak (3).
          </p>
        </Card>
      </section>

      <section>
        <SectionTitle>The all-time race</SectionTitle>
        <Card>
          <p className="text-sm leading-relaxed">
            Award points accumulate across every season into the{" "}
            <Link href="/legends" className="text-turf hover:underline">
              Legends race
            </Link>
            . Every manager who has ever earned points is in it — alumni included.
          </p>
        </Card>
      </section>
    </div>
  );
}
