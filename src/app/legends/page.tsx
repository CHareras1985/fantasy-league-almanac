import type { Metadata } from "next";
import {
  awardRace,
  careerRecords,
  seasons,
  seasonDetail,
  managerName,
} from "@/lib/data";
import { PageHeading, Card, SectionTitle, ManagerLink } from "@/components/ui";

export const metadata: Metadata = { title: "All-Time" };

export default function LegendsPage() {
  const race = awardRace();
  const records = careerRecords();
  const byPct = [...records].sort((a, b) => b.pct - a.pct);

  const champs = [...seasons]
    .reverse()
    .map((s) => ({ year: s.year, detail: seasonDetail(s.year) }));

  return (
    <div className="space-y-10">
      <PageHeading
        kicker="Since 2009"
        title="All-Time"
        sub="The Legends race is cumulative award points. Everyone who has ever earned points is in it — alumni included."
      />

      <section>
        <SectionTitle>Legends race — award points</SectionTitle>
        <Card className="!p-0">
          <div className="table-wrap">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border text-left text-xs uppercase tracking-wide text-ink-muted">
                  <th className="px-3 py-2 font-medium">#</th>
                  <th className="px-3 py-2 font-medium">Manager</th>
                  <th className="px-3 py-2 text-right font-medium">Award pts</th>
                  <th className="px-3 py-2 text-right font-medium">Titles</th>
                  <th className="px-3 py-2 text-right font-medium">Seasons</th>
                </tr>
              </thead>
              <tbody>
                {race.map((r, i) => (
                  <tr key={r.manager.id} className="border-b border-border/60 last:border-0">
                    <td className="px-3 py-2 tabular-nums text-ink-muted">{i + 1}</td>
                    <td className="px-3 py-2 font-medium">
                      <ManagerLink id={r.manager.id} name={r.manager.name} />
                      {!r.manager.active && (
                        <span className="ml-2 text-[11px] uppercase tracking-wide text-ink-muted">
                          alumni
                        </span>
                      )}
                    </td>
                    <td className="px-3 py-2 text-right tabular-nums font-medium">{r.points}</td>
                    <td className="px-3 py-2 text-right tabular-nums">{r.titles || "—"}</td>
                    <td className="px-3 py-2 text-right tabular-nums text-ink-muted">
                      {r.seasons}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      </section>

      <section>
        <SectionTitle>Regular-season win %</SectionTitle>
        <Card className="!p-0">
          <div className="table-wrap">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border text-left text-xs uppercase tracking-wide text-ink-muted">
                  <th className="px-3 py-2 font-medium">Manager</th>
                  <th className="px-3 py-2 text-right font-medium">W</th>
                  <th className="px-3 py-2 text-right font-medium">L</th>
                  <th className="px-3 py-2 text-right font-medium">Win %</th>
                  <th className="px-3 py-2 text-right font-medium">Titles</th>
                </tr>
              </thead>
              <tbody>
                {byPct.map((r) => (
                  <tr key={r.manager.id} className="border-b border-border/60 last:border-0">
                    <td className="px-3 py-2 font-medium">
                      <ManagerLink id={r.manager.id} name={r.manager.name} />
                    </td>
                    <td className="px-3 py-2 text-right tabular-nums">{r.wins}</td>
                    <td className="px-3 py-2 text-right tabular-nums">{r.losses}</td>
                    <td className="px-3 py-2 text-right tabular-nums">
                      {r.pct.toFixed(3).replace(/^0/, "")}
                    </td>
                    <td className="px-3 py-2 text-right tabular-nums">{r.titles || "—"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      </section>

      <section>
        <SectionTitle>Champions by year</SectionTitle>
        <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
          {champs.map(({ year, detail }) => (
            <div
              key={year}
              className="flex items-baseline justify-between rounded border border-border bg-paper-elevated px-3 py-2 text-sm"
            >
              <span className="text-ink-muted">{year}</span>
              <span className="font-medium text-gold">
                {managerName(detail.playoffs?.champion)}
              </span>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
