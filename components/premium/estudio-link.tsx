"use client";

import { LayoutGrid } from "lucide-react";

/** Botón flotante para volver al estudio (visible en toda la página). */
export function EstudioLink() {
  return (
    <a
      href="/estudio.html"
      className="fixed bottom-6 left-4 z-[60] inline-flex items-center gap-2 rounded-full bg-[color:var(--pm-fg)] px-4 py-2.5 text-sm font-semibold text-[color:var(--pm-surface)] shadow-xl ring-1 ring-black/10 transition-transform hover:-translate-y-0.5 sm:left-6"
    >
      <LayoutGrid className="size-4" />
      Estudio
    </a>
  );
}
