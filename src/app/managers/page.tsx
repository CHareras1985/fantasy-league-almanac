import type { Metadata } from "next";
import { careerRecords, fmtPts, fmtPct } from "@/lib/data";
import { PageHeading, Card, ManagerLink } from "@/components/ui";

export const metadata: Metadata = { title: "Managers" };

export default function ManagersPage() {
  const rows = [...careerRecords()].sort((a, b) => b.award_points - a.award_points);
  return (
    <div>
      <PageHeading
        kicker={`${rows.length} managers all-time`}
        title="Managers"
        sub="Career totals across every season. Alumni (Wally, Paul) stay in the all-time race."
      />
      <Card className="!p-0">
        <div className="table-wrap">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border text-left text-xs uppercase tracking-wide text-ink-muted">
                <th className="px-3 py-2 font-medium">Manager</th>
                <th className="px-3 py-2 text-right font-medium">Award pts</th>
                <th className="px-3 py-2 text-right font-medium">Titles</th>
                <th className="px-3 py-2 text-right font-medium">W</th>
                <th className="px-3 py-2 text-right font-medium">L</th>
                <th className="px-3 py-2 text-right font-medium">Win %</th>
                <th className="px-3 py-2 text-right font-medium">Total PF</th>
                <th className="px-3 py-2 text-right font-medium">Seasons</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((r) => (
                <tr key={r.manager.id} className="border-b border-border/60 last:border-0">
                  <td className="px-3 py-2 font-medium">
                    <ManagerLink id={r.manager.id} name={r.manager.name} />
                    {!r.manager.active && (
                      <span className="ml-2 text-[11px] uppercase tracking-wide text-ink-muted">
                        alumni
                      </span>
                    )}
                  </td>
                  <td className="px-3 py-2 text-right tabular-nums font-medium">{r.award_points}</td>
                  <td className="px-3 py-2 text-right tabular-nums">{r.titles || "—"}</td>
                  <td className="px-3 py-2 text-right tabular-nums">{r.wins}</td>
                  <td className="px-3 py-2 text-right tabular-nums">{r.losses}</td>
                  <td className="px-3 py-2 text-right tabular-nums">{fmtPct(r.pct)}</td>
                  <td className="px-3 py-2 text-right tabular-nums text-ink-muted">
                    {fmtPts(r.points_for, 0)}
                  </td>
                  <td className="px-3 py-2 text-right tabular-nums text-ink-muted">{r.seasons}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
