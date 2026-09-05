import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { managers, managerDetail, managerName, fmtPts, fmtPct } from "@/lib/data";
import { PageHeading, Card, SectionTitle, FinishBadge } from "@/components/ui";

export function generateStaticParams() {
  return managers.map((m) => ({ id: m.id }));
}

export async function generateMetadata({
  params,
}: PageProps<"/managers/[id]">): Promise<Metadata> {
  const { id } = await params;
  return { title: managerName(id) };
}

export default async function ManagerPage({ params }: PageProps<"/managers/[id]">) {
  const { id } = await params;
  if (!managers.some((m) => m.id === id)) notFound();
  const d = managerDetail(id);

  return (
    <div className="space-y-10">
      <Link href="/managers" className="text-sm text-ink-muted hover:text-ink">
        ← All managers
      </Link>

      <PageHeading
        kicker={`${d.manager.first_season}–${d.manager.last_season} · ${d.totals.seasons} seasons${
          d.manager.active ? "" : " · alumni"
        }`}
        title={d.manager.name}
        sub={
          d.manager.aliases.length
            ? `Also written: ${d.manager.aliases.join(", ")}`
            : undefined
        }
      />

      <section className="grid gap-3 sm:grid-cols-4">
        <Stat label="Award points" value={String(d.totals.award_points)} accent />
        <Stat label="Championships" value={String(d.totals.titles)} />
        <Stat label="Record" value={`${d.totals.wins}–${d.totals.losses}`} />
        <Stat label="Win %" value={fmtPct(d.totals.pct)} />
      </section>

      {(() => {
        const titleYears = d.rows
          .filter((r) => r.playoff_finish === "champion")
          .map((r) => r.year);
        const bestSeason = [...d.rows].sort((a, b) => b.award_points - a.award_points)[0];
        const sigPick = [...d.bestPicks].sort(
          (a, b) => (b.player_points ?? 0) - (a.player_points ?? 0),
        )[0];
        return (
          <Card>
            <SectionTitle>Career highlights</SectionTitle>
            <ul className="space-y-1.5 text-sm">
              <li className="flex flex-wrap justify-between gap-x-3">
                <span className="text-ink-muted">Championships</span>
                <span className="font-medium">
                  {titleYears.length ? titleYears.join(", ") : "None"}
                </span>
              </li>
              {bestSeason && bestSeason.award_points > 0 && (
                <li className="flex flex-wrap justify-between gap-x-3">
                  <span className="text-ink-muted">Best season</span>
                  <span className="font-medium">
                    {bestSeason.award_points} award pts ·{" "}
                    <Link href={`/seasons/${bestSeason.year}`} className="hover:text-turf">
                      {bestSeason.year}
                    </Link>
                  </span>
                </li>
              )}
              {sigPick?.player && (
                <li className="flex flex-wrap justify-between gap-x-3">
                  <span className="text-ink-muted">Signature draft pick</span>
                  <span className="font-medium">
                    {sigPick.player} · {fmtPts(sigPick.player_points, 0)} pts · {sigPick.season}
                  </span>
                </li>
              )}
            </ul>
          </Card>
        );
      })()}

      <section>
        <SectionTitle>Season by season</SectionTitle>
        <Card className="!p-0">
          <div className="table-wrap">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border text-left text-xs uppercase tracking-wide text-ink-muted">
                  <th className="px-3 py-2 font-medium">Year</th>
                  <th className="px-3 py-2 text-right font-medium">Rank</th>
                  <th className="px-3 py-2 text-right font-medium">W–L</th>
                  <th className="px-3 py-2 text-right font-medium">PF</th>
                  <th className="px-3 py-2 text-right font-medium">Award pts</th>
                  <th className="px-3 py-2 font-medium">Playoffs</th>
                </tr>
              </thead>
              <tbody>
                {d.rows.map((r) => (
                  <tr key={r.year} className="border-b border-border/60 last:border-0">
                    <td className="px-3 py-2 font-medium">
                      <Link href={`/seasons/${r.year}`} className="hover:text-turf">
                        {r.year}
                      </Link>
                    </td>
                    <td className="px-3 py-2 text-right tabular-nums text-ink-muted">
                      {r.reg_rank} / {r.team_count}
                    </td>
                    <td className="px-3 py-2 text-right tabular-nums">
                      {r.wins}–{r.losses}
                    </td>
                    <td className="px-3 py-2 text-right tabular-nums">{fmtPts(r.points_for)}</td>
                    <td className="px-3 py-2 text-right tabular-nums font-medium">
                      {r.award_points}
                    </td>
                    <td className="px-3 py-2">
                      <FinishBadge finish={r.playoff_finish} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      </section>

      <section className="grid gap-4 sm:grid-cols-2">
        <Card>
          <SectionTitle>Award points by category</SectionTitle>
          <table className="w-full text-sm">
            <tbody>
              {d.awardBreakdown.map((a) => (
                <tr key={a.label} className="border-b border-border/60 last:border-0">
                  <td className="py-1.5 pr-2">{a.label}</td>
                  <td className="py-1.5 pr-2 text-right tabular-nums text-ink-muted">×{a.count}</td>
                  <td className="py-1.5 text-right tabular-nums font-medium">{a.points}</td>
                </tr>
              ))}
              {d.awardBreakdown.length === 0 && (
                <tr>
                  <td className="py-2 text-ink-muted">No award points yet.</td>
                </tr>
              )}
            </tbody>
          </table>
        </Card>

        <Card>
          <SectionTitle>M.V.P. picks</SectionTitle>
          {d.mvpPicks.length ? (
            <ul className="space-y-1 text-sm">
              {d.mvpPicks.map((p) => (
                <li key={p.season} className="flex justify-between gap-3">
                  <span>
                    <Link href={`/seasons/${p.season}`} className="text-ink-muted hover:text-turf">
                      {p.season}
                    </Link>{" "}
                    <span className="font-medium">{p.player}</span>
                  </span>
                  <span className="tabular-nums text-ink-muted">
                    {fmtPts(p.player_points, 0)}
                  </span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-sm text-ink-muted">None.</p>
          )}
        </Card>
      </section>

      <section>
        <SectionTitle>Best draft pick, year by year</SectionTitle>
        <Card className="!p-0">
          <div className="table-wrap">
            <table className="w-full text-sm">
              <tbody>
                {d.bestPicks.map((p) => (
                  <tr key={p.season} className="border-b border-border/60 last:border-0">
                    <td className="px-3 py-1.5 text-ink-muted">
                      <Link href={`/seasons/${p.season}`} className="hover:text-turf">
                        {p.season}
                      </Link>
                    </td>
                    <td className="px-3 py-1.5 font-medium">{p.player ?? "—"}</td>
                    <td className="px-3 py-1.5 text-right tabular-nums text-ink-muted">
                      {fmtPts(p.player_points, 0)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      </section>
    </div>
  );
}

function Stat({ label, value, accent }: { label: string; value: string; accent?: boolean }) {
  return (
    <div className="rounded-lg border border-border bg-paper-elevated p-3">
      <div className="text-xs uppercase tracking-wide text-ink-muted">{label}</div>
      <div className={`display mt-1 text-2xl ${accent ? "text-turf" : "text-ink"}`}>{value}</div>
    </div>
  );
}
