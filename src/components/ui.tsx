import Link from "next/link";
import type { ReactNode } from "react";
import type { PlayoffFinish } from "@/lib/data";

export function PageHeading({ title, kicker, sub }: { title: string; kicker?: string; sub?: ReactNode }) {
  return (
    <div className="mb-6">
      {kicker && (
        <div className="display text-xs uppercase tracking-widest text-ink-muted">{kicker}</div>
      )}
      <h1 className="display text-3xl text-ink sm:text-4xl">{title}</h1>
      {sub && <p className="mt-2 max-w-2xl text-sm text-ink-muted">{sub}</p>}
    </div>
  );
}

export function Card({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <div className={`rounded-lg border border-border bg-paper-elevated p-4 ${className}`}>
      {children}
    </div>
  );
}

export function SectionTitle({ children }: { children: ReactNode }) {
  return <h2 className="display mb-3 text-lg text-ink">{children}</h2>;
}

const FINISH_STYLE: Record<string, string> = {
  champion: "bg-champ/20 text-champ border-champ/40",
  runner_up: "border-border text-ink-muted",
  third: "border-border text-ink-muted",
};
const FINISH_LABEL: Record<string, string> = {
  champion: "Champion",
  runner_up: "Runner-up",
  third: "3rd",
};

export function FinishBadge({ finish }: { finish: PlayoffFinish }) {
  if (!finish) return null;
  return (
    <span
      className={`inline-block rounded border px-1.5 py-0.5 text-[11px] font-medium ${FINISH_STYLE[finish]}`}
    >
      {FINISH_LABEL[finish]}
    </span>
  );
}

export function ManagerLink({ id, name }: { id: string | null; name: string }) {
  if (!id) return <span>{name}</span>;
  return (
    <Link href={`/managers/${id}`} className="hover:text-accent">
      {name}
    </Link>
  );
}
