"use client";

import { useSyncExternalStore } from "react";
import { PERSONAS, DEFAULT_PERSONA, type Persona } from "@/lib/recaps";

const KEY = "almanac:recap-persona";
const listeners = new Set<() => void>();

function readPersona(): Persona {
  try {
    const v = localStorage.getItem(KEY);
    if (v && PERSONAS.some((p) => p.key === v)) return v as Persona;
  } catch {
    /* private mode / blocked storage */
  }
  return DEFAULT_PERSONA;
}

function subscribe(cb: () => void) {
  listeners.add(cb);
  const onStorage = (e: StorageEvent) => {
    if (e.key === KEY) cb();
  };
  window.addEventListener("storage", onStorage);
  return () => {
    listeners.delete(cb);
    window.removeEventListener("storage", onStorage);
  };
}

function writePersona(p: Persona) {
  try {
    localStorage.setItem(KEY, p);
  } catch {
    /* ignore */
  }
  listeners.forEach((l) => l());
}

export function RecapPicker({ recaps }: { recaps: Record<Persona, string> }) {
  const persona = useSyncExternalStore(subscribe, readPersona, () => DEFAULT_PERSONA);

  return (
    <div className="mt-4">
      <div className="mb-2 flex items-center gap-2">
        <label
          htmlFor="recap-persona"
          className="text-[11px] uppercase tracking-wide text-ink-muted"
        >
          Recap voice
        </label>
        <select
          id="recap-persona"
          value={persona}
          onChange={(e) => writePersona(e.target.value as Persona)}
          className="rounded border border-border bg-paper-elevated px-2 py-1 text-xs text-ink"
        >
          {PERSONAS.map((p) => (
            <option key={p.key} value={p.key}>
              {p.label}
            </option>
          ))}
        </select>
      </div>
      <p className="max-w-2xl text-sm leading-relaxed text-ink">{recaps[persona]}</p>
    </div>
  );
}
