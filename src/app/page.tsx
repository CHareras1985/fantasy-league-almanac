import Link from "next/link";
import {
  awardRace,
  seasons,
  seasonDetail,
  managerName,
  LATEST_YEAR,
  fmtPts,
} from "@/lib/data";
import { PageHeading, Card, SectionTitle, ManagerLink } from "@/components/ui";

export default function HomePage() {
  const race = awardRace();
  const latest = seasonDetail(LATEST_YEAR);
  const top = race[0];

  return (
    <div className="space-y-10">
      <PageHeading
        kicker={`${seasons.length} seasons · since ${seasons[0].year}`}
        title="Fantasy League Almanac"
        sub="The permanent record of the league — every season's standings, playoffs, and awards, plus the all-time race for the Legends title. Seasons 2009–2021 are in; 2022 onward land once Yahoo API access clears."
      />

      <section className="grid gap-4 sm:grid-cols-3">
        <Card>
          <div className="text-xs uppercase tracking-wide text-ink-muted">All-time leader</div>
          <div className="display mt-1 text-2xl text-turf">{top.manager.name}</div>
          <div className="text-sm text-ink-muted">{top.points} award points</div>
        </Card>
        <Card>
          <div className="text-xs uppercase tracking-wide text-ink-muted">
            {LATEST_YEAR} champion
          </div>
          <div className="display mt-1 text-2xl text-ink">
            {managerName(latest.playoffs?.champion)}
          </div>
          <div className="text-sm text-ink-muted">
            def. {managerName(latest.playoffs?.runner_up)} in the final
          </div>
        </Card>
        <Card>
          <div className="text-xs uppercase tracking-wide text-ink-muted">Most titles</div>
          <MostTitles />
        </Card>
      </section>

      <section>
        <SectionTitle>All-time Legends race</SectionTitle>
        <Card className="!p-0">
          <div className="table-wrap">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border text-left text-xs uppercase tracking-wide text-ink-muted">
                  <th className="px-4 py-2 font-medium">#</th>
                  <th className="px-4 py-2 font-medium">Manager</th>
                  <th className="px-4 py-2 text-right font-medium">Award pts</th>
                  <th className="px-4 py-2 text-right font-medium">Titles</th>
                  <th className="px-4 py-2 text-right font-medium">Seasons</th>
                  <th className="px-4 py-2 font-medium"></th>
                </tr>
              </thead>
              <tbody>
                {race.map((row, i) => (
                  <tr key={row.manager.id} className="border-b border-border/60 last:border-0">
                    <td className="px-4 py-2 tabular-nums text-ink-muted">{i + 1}</td>
                    <td className="px-4 py-2 font-medium">
                      <ManagerLink id={row.manager.id} name={row.manager.name} />
                    </td>
                    <td className="px-4 py-2 text-right tabular-nums">{row.points}</td>
                    <td className="px-4 py-2 text-right tabular-nums">{row.titles || "—"}</td>
                    <td className="px-4 py-2 text-right tabular-nums text-ink-muted">
                      {row.seasons}
                    </td>
                    <td className="px-4 py-2 text-right">
                      {!row.manager.active && (
                        <span className="text-[11px] uppercase tracking-wide text-ink-muted">
                          alumni
                        </span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      </section>

      <section>
        <SectionTitle>Seasons</SectionTitle>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {[...seasons].reverse().map((s) => {
            const d = seasonDetail(s.year);
            return (
              <Link
                key={s.year}
                href={`/seasons/${s.year}`}
                className="rounded-lg border border-border bg-paper-elevated p-4 transition-colors hover:border-turf"
              >
                <div className="display text-xl text-ink">{s.year}</div>
                <div className="mt-1 text-sm">
                  <span className="text-gold">🏆 {managerName(d.playoffs?.champion)}</span>
                </div>
                <div className="text-xs text-ink-muted">
                  Reg. season: {managerName(d.standings[0]?.manager)} ·{" "}
                  {fmtPts(d.standings[0]?.points_for, 0)} pts
                </div>
              </Link>
            );
          })}
        </div>
      </section>
    </div>
  );
}

function MostTitles() {
  const race = awardRace();
  const max = Math.max(...race.map((r) => r.titles));
  const leaders = race.filter((r) => r.titles === max);
  return (
    <>
      <div className="display mt-1 text-2xl text-ink">
        {leaders.map((l) => l.manager.name).join(", ")}
      </div>
      <div className="text-sm text-ink-muted">{max} championships</div>
    </>
  );
}
