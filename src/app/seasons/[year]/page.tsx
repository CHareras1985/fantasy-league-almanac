import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import {
  YEARS,
  seasonDetail,
  seasonSuperlatives,
  raceProgression,
  managerName,
  fmtPts,
  type GameSide,
} from "@/lib/data";
import { SEASON_RECAPS } from "@/lib/recaps";
import { RecapPicker } from "@/components/RecapPicker";
import { PageHeading, Card, SectionTitle, FinishBadge, ManagerLink } from "@/components/ui";

export function generateStaticParams() {
  return YEARS.map((year) => ({ year: String(year) }));
}

export async function generateMetadata({
  params,
}: PageProps<"/seasons/[year]">): Promise<Metadata> {
  const { year } = await params;
  return { title: `${year} Season` };
}

export default async function SeasonPage({ params }: PageProps<"/seasons/[year]">) {
  const { year } = await params;
  const y = Number(year);
  if (!YEARS.includes(y)) notFound();

  const d = seasonDetail(y);
  const sup = seasonSuperlatives(y);
  const idx = YEARS.indexOf(y);
  const prev = YEARS[idx - 1];
  const next = YEARS[idx + 1];
  const recap = SEASON_RECAPS[y];

  // all-time race standing through this season
  const prog = raceProgression();
  const raceRows = prog.series
    .map((s) => ({
      manager: s.manager,
      total: s.cumulative[idx],
      thisSeason: s.cumulative[idx] - (idx > 0 ? s.cumulative[idx - 1] : 0),
    }))
    .filter((r) => r.total > 0)
    .sort((a, b) => b.total - a.total)
    .slice(0, 5);

  return (
    <div className="space-y-10">
      <div className="flex items-center justify-between text-sm">
        <Link href="/seasons" className="text-ink-muted hover:text-ink">
          ← All seasons
        </Link>
        <div className="flex gap-3">
          {prev && (
            <Link href={`/seasons/${prev}`} className="text-ink-muted hover:text-ink">
              ← {prev}
            </Link>
          )}
          {next && (
            <Link href={`/seasons/${next}`} className="text-ink-muted hover:text-ink">
              {next} →
            </Link>
          )}
        </div>
      </div>

      <PageHeading
        kicker={`${d.season.team_count} teams · ${d.season.regular_weeks}-game regular season`}
        title={`${y} Season`}
      />

      {/* Champion banner */}
      <section className="rounded-xl border border-champ/40 bg-gradient-to-br from-champ/15 to-transparent p-6">
        <div className="display text-xs uppercase tracking-widest text-champ">Champion</div>
        <div className="display mt-1 text-4xl text-ink">
          {d.playoffs?.champion ? (
            <ManagerLink id={d.playoffs.champion} name={managerName(d.playoffs.champion)} />
          ) : (
            "—"
          )}
        </div>
        <div className="mt-1 text-sm text-ink-muted">
          def. {managerName(d.playoffs?.runner_up)} in the final
          {d.playoffs?.third && <> · {managerName(d.playoffs.third)} took third</>}
        </div>
        {recap && <RecapPicker recaps={recap} />}
      </section>

      {/* Superlatives */}
      <section className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {sup.topScorer && (
          <Stat
            label={sup.leagueRecordPF ? "Most points — league record" : "Most points"}
            value={managerName(sup.topScorer.manager)}
            sub={`${fmtPts(sup.topScorer.points, 0)} pts`}
            accent={sup.leagueRecordPF}
          />
        )}
        {sup.streak && (
          <Stat
            label="Longest win streak"
            value={sup.streak.managers.map((m) => managerName(m)).join(" & ")}
            sub={`${sup.streak.length} straight`}
          />
        )}
        {sup.blowout && (
          <Stat
            label={`Biggest ${sup.blowout.game.toLowerCase()} margin`}
            value={`${managerName(sup.blowout.winner)} +${sup.blowout.margin}`}
            sub={`${fmtPts(sup.blowout.winnerPts, 0)}–${fmtPts(sup.blowout.loserPts, 0)}`}
          />
        )}
        {sup.nailbiter && sup.nailbiter !== sup.blowout && (
          <Stat
            label={`Closest ${sup.nailbiter.game.toLowerCase()} game`}
            value={`${managerName(sup.nailbiter.winner)} +${sup.nailbiter.margin}`}
            sub={`${fmtPts(sup.nailbiter.winnerPts, 0)}–${fmtPts(sup.nailbiter.loserPts, 0)}`}
          />
        )}
      </section>

      {/* Standings + awards */}
      <section>
        <SectionTitle>Regular season & award points</SectionTitle>
        <Card className="!p-0">
          <div className="table-wrap">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border text-left text-xs uppercase tracking-wide text-ink-muted">
                  <th className="px-3 py-2 font-medium">#</th>
                  <th className="px-3 py-2 font-medium">Manager</th>
                  <th className="px-3 py-2 text-right font-medium">W</th>
                  <th className="px-3 py-2 text-right font-medium">L</th>
                  <th className="px-3 py-2 text-right font-medium">PF</th>
                  <th className="px-3 py-2 text-right font-medium">Award pts</th>
                  <th className="px-3 py-2 font-medium">Playoffs</th>
                </tr>
              </thead>
              <tbody>
                {d.standings.map((s) => {
                  const a = d.awardsByManager.get(s.manager);
                  return (
                    <tr key={s.manager} className="border-b border-border/60 last:border-0">
                      <td className="px-3 py-2 tabular-nums text-ink-muted">{s.reg_rank}</td>
                      <td className="px-3 py-2 font-medium">
                        <ManagerLink id={s.manager} name={managerName(s.manager)} />
                      </td>
                      <td className="px-3 py-2 text-right tabular-nums">{s.wins}</td>
                      <td className="px-3 py-2 text-right tabular-nums">{s.losses}</td>
                      <td className="px-3 py-2 text-right tabular-nums">{fmtPts(s.points_for)}</td>
                      <td className="px-3 py-2 text-right tabular-nums font-medium">
                        {a?.points ?? 0}
                      </td>
                      <td className="px-3 py-2">
                        <FinishBadge finish={a?.detail.playoff_finish ?? null} />
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </Card>
      </section>

      {/* Season awards + all-star */}
      <section className="grid gap-4 sm:grid-cols-2">
        <Card>
          <SectionTitle>Key awards</SectionTitle>
          <ul className="space-y-2 text-sm">
            <AwardLine
              label="Most PTS scored"
              manager={
                d.standings.find((s) => d.awardsByManager.get(s.manager)?.detail.most_points)?.manager
              }
              detail={fmtPts(Math.max(...d.standings.map((s) => s.points_for)), 0)}
            />
            <AwardLine
              label="M.V.P. pick"
              manager={d.mvpPick?.manager}
              detail={
                d.mvpPick?.player
                  ? `${d.mvpPick.player} · ${fmtPts(d.mvpPick.player_points, 0)} pts${
                      d.mvpPick.draft_round ? ` · Rd ${d.mvpPick.draft_round}` : ""
                    }`
                  : undefined
              }
            />
            <AwardLine
              label="Best transaction"
              manager={
                d.standings.find(
                  (s) => d.awardsByManager.get(s.manager)?.detail.best_transaction,
                )?.manager
              }
              detail={(() => {
                const w = d.standings.find(
                  (s) => d.awardsByManager.get(s.manager)?.detail.best_transaction,
                )?.manager;
                const tx = d.transactions.find((t) => t.manager === w);
                return tx?.player ? `${tx.player} · ${fmtPts(tx.player_points, 0)} pts` : undefined;
              })()}
            />
            <AwardLine
              label="Longest win streak"
              manager={
                d.standings.find(
                  (s) => d.awardsByManager.get(s.manager)?.detail.longest_streak,
                )?.manager
              }
              detail={sup.streak ? `${sup.streak.length} straight` : undefined}
            />
          </ul>
        </Card>

        <Card>
          <SectionTitle>All-Star roster</SectionTitle>
          <table className="w-full text-sm">
            <tbody>
              {d.allStar.map((slot, i) => (
                <tr key={i} className="border-b border-border/60 last:border-0">
                  <td className="py-1.5 pr-2 text-xs uppercase tracking-wide text-ink-muted">
                    {slot.position}
                  </td>
                  <td className="py-1.5 pr-2 font-medium">{slot.player}</td>
                  <td className="py-1.5 pr-2 text-right tabular-nums text-ink-muted">
                    {fmtPts(slot.player_points, 0)}
                  </td>
                  <td className="py-1.5 text-right text-xs text-ink-muted">
                    {slot.manager ? (
                      <ManagerLink id={slot.manager} name={managerName(slot.manager)} />
                    ) : (
                      "—"
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </Card>
      </section>

      {/* Playoff game detail */}
      <section className="grid gap-3 sm:grid-cols-2">
        <GameCard title="Championship game" sides={d.playoffs?.championship_game} />
        <GameCard title="Third-place game" sides={d.playoffs?.third_place_game} />
      </section>

      {/* Draft & transactions */}
      <section className="grid gap-4 sm:grid-cols-2">
        <Card>
          <SectionTitle>Best draft pick — by manager</SectionTitle>
          <PickTable
            rows={d.bestPicks.map((p) => ({
              manager: p.manager,
              player: p.player,
              points: p.player_points,
            }))}
          />
        </Card>
        <Card>
          <SectionTitle>Best transaction — by manager</SectionTitle>
          <PickTable
            rows={d.transactions.map((t) => ({
              manager: t.manager,
              player: t.player,
              points: t.player_points,
            }))}
          />
        </Card>
        {d.worstPicks.length > 0 && (
          <Card className="sm:col-span-2">
            <SectionTitle>Worst / “Plexi” pick — by manager</SectionTitle>
            <PickTable
              rows={d.worstPicks.map((p) => ({
                manager: p.manager,
                player: p.player,
                points: p.player_points,
              }))}
            />
          </Card>
        )}
      </section>

      {/* All-time race after this season */}
      <section>
        <SectionTitle>Legends race after {y}</SectionTitle>
        <Card className="!p-0">
          <div className="table-wrap">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border text-left text-xs uppercase tracking-wide text-ink-muted">
                  <th className="px-3 py-2 font-medium">#</th>
                  <th className="px-3 py-2 font-medium">Manager</th>
                  <th className="px-3 py-2 text-right font-medium">Total</th>
                  <th className="px-3 py-2 text-right font-medium">This season</th>
                </tr>
              </thead>
              <tbody>
                {raceRows.map((r, i) => (
                  <tr key={r.manager.id} className="border-b border-border/60 last:border-0">
                    <td className="px-3 py-2 tabular-nums text-ink-muted">{i + 1}</td>
                    <td className="px-3 py-2 font-medium">
                      <ManagerLink id={r.manager.id} name={r.manager.name} />
                    </td>
                    <td className="px-3 py-2 text-right tabular-nums font-medium">{r.total}</td>
                    <td className="px-3 py-2 text-right tabular-nums text-ink-muted">
                      {r.thisSeason > 0 ? `+${r.thisSeason}` : "—"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
        <p className="mt-2 text-xs text-ink-muted">
          <Link href="/legends" className="hover:text-accent">
            Full all-time race →
          </Link>
        </p>
      </section>
    </div>
  );
}

function Stat({
  label,
  value,
  sub,
  accent,
}: {
  label: string;
  value: string;
  sub?: string;
  accent?: boolean;
}) {
  return (
    <div
      className={`rounded-lg border p-3 ${
        accent ? "border-accent/40 bg-accent/10" : "border-border bg-paper-elevated"
      }`}
    >
      <div className="text-[11px] uppercase tracking-wide text-ink-muted">{label}</div>
      <div className={`display mt-1 text-lg ${accent ? "text-accent" : "text-ink"}`}>{value}</div>
      {sub && <div className="text-xs text-ink-muted">{sub}</div>}
    </div>
  );
}

function GameCard({ title, sides }: { title: string; sides: GameSide[] | null | undefined }) {
  if (!sides) return null;
  const winner = [...sides].sort((a, b) => (b.points ?? 0) - (a.points ?? 0))[0];
  return (
    <Card>
      <div className="mb-2 text-xs uppercase tracking-wide text-ink-muted">{title}</div>
      <ul className="space-y-1 text-sm">
        {sides.map((s, i) => (
          <li key={i} className="flex justify-between">
            <span className={s === winner ? "font-medium" : "text-ink-muted"}>
              {s.manager ? managerName(s.manager) : "Random (median)"}
            </span>
            <span className={`tabular-nums ${s === winner ? "font-medium" : "text-ink-muted"}`}>
              {fmtPts(s.points)}
            </span>
          </li>
        ))}
      </ul>
    </Card>
  );
}

function AwardLine({
  label,
  manager,
  detail,
}: {
  label: string;
  manager: string | null | undefined;
  detail?: string;
}) {
  return (
    <li className="flex flex-wrap items-baseline justify-between gap-x-3">
      <span className="text-ink-muted">{label}</span>
      <span className="font-medium">
        {manager ? <ManagerLink id={manager} name={managerName(manager)} /> : "—"}
        {detail && <span className="ml-1 font-normal text-ink-muted">— {detail}</span>}
      </span>
    </li>
  );
}

function PickTable({
  rows,
}: {
  rows: { manager: string; player: string | null; points: number | null }[];
}) {
  return (
    <table className="w-full text-sm">
      <tbody>
        {rows.map((r, i) => (
          <tr key={i} className="border-b border-border/60 last:border-0">
            <td className="py-1.5 pr-2 text-ink-muted">
              <ManagerLink id={r.manager} name={managerName(r.manager)} />
            </td>
            <td className="py-1.5 pr-2 font-medium">{r.player ?? "—"}</td>
            <td className="py-1.5 text-right tabular-nums text-ink-muted">
              {fmtPts(r.points, 0)}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
