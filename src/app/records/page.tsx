import Link from "next/link";
import type { Metadata } from "next";
import { allTimeRecords } from "@/lib/data";
import { PageHeading, Card, SectionTitle } from "@/components/ui";

export const metadata: Metadata = { title: "Records" };

export default function RecordsPage() {
  const groups = allTimeRecords();
  return (
    <div className="space-y-8">
      <PageHeading
        kicker="2009 – 2021"
        title="Record Book"
        sub="League-wide bests across every season on file. Updates as new seasons land."
      />
      {groups.map((g) => (
        <section key={g.group}>
          <SectionTitle>{g.group}</SectionTitle>
          <div className="grid gap-3 sm:grid-cols-2">
            {g.entries.map((e) => (
              <Card key={e.label}>
                <div className="text-xs uppercase tracking-wide text-ink-muted">{e.label}</div>
                <div className="display mt-1 text-lg text-ink">
                  {e.href ? (
                    <Link href={e.href} className="hover:text-turf">
                      {e.holder}
                    </Link>
                  ) : (
                    e.holder
                  )}
                </div>
                <div className="mt-0.5 text-sm text-ink-muted">
                  {e.detail}
                  {e.year != null && <span className="ml-1">· {e.year}</span>}
                </div>
              </Card>
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}
