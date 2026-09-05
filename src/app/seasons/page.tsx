import Link from "next/link";
import type { Metadata } from "next";
import { seasons, seasonDetail, managerName, fmtPts } from "@/lib/data";
import { PageHeading } from "@/components/ui";

export const metadata: Metadata = { title: "Seasons" };

export default function SeasonsPage() {
  return (
    <div>
      <PageHeading kicker="2009 – 2021" title="Seasons" />
      <div className="grid gap-3 sm:grid-cols-2">
        {[...seasons].reverse().map((s) => {
          const d = seasonDetail(s.year);
          const champ = d.playoffs?.champion;
          return (
            <Link
              key={s.year}
              href={`/seasons/${s.year}`}
              className="rounded-lg border border-border bg-paper-elevated p-4 transition-colors hover:border-turf"
            >
              <div className="flex items-baseline justify-between">
                <span className="display text-2xl text-ink">{s.year}</span>
                <span className="text-xs text-ink-muted">{s.team_count} teams</span>
              </div>
              <dl className="mt-2 space-y-1 text-sm">
                <Row label="Champion" value={managerName(champ)} accent />
                <Row label="Runner-up" value={managerName(d.playoffs?.runner_up)} />
                <Row label="Reg. season 1st" value={managerName(d.standings[0]?.manager)} />
                <Row
                  label="Most points"
                  value={`${managerName(
                    [...d.standings].sort((a, b) => b.points_for - a.points_for)[0]?.manager,
                  )} · ${fmtPts(
                    [...d.standings].sort((a, b) => b.points_for - a.points_for)[0]?.points_for,
                    0,
                  )}`}
                />
              </dl>
            </Link>
          );
        })}
      </div>
    </div>
  );
}

function Row({ label, value, accent }: { label: string; value: string; accent?: boolean }) {
  return (
    <div className="flex justify-between gap-3">
      <dt className="text-ink-muted">{label}</dt>
      <dd className={accent ? "font-medium text-gold" : "font-medium"}>{value}</dd>
    </div>
  );
}
