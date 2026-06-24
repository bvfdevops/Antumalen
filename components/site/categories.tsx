"use client";

import { ArrowUpRight } from "lucide-react";
import { Reveal } from "@/components/site/reveal";
import { SectionHead } from "@/components/site/section-head";
import { CATEGORIAS, PRODUCTOS } from "@/lib/data";

export function Categories({
  onPick,
}: {
  onPick: (id: string) => void;
}) {
  const cats = CATEGORIAS.filter((c) => c.id !== "todos");

  return (
    <section id="categorias" className="container-page py-20 sm:py-24">
      <SectionHead eyebrow="Categorías" title="Para cada" accent="tipo de mascota">
        Explora nuestros productos según tu compañero favorito.
      </SectionHead>

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
        {cats.map((c, i) => {
          const Icon = c.icon;
          const n = PRODUCTOS.filter((p) => p.categoria === c.id).length;
          return (
            <Reveal key={c.id} delay={i * 0.05}>
              <button
                onClick={() => onPick(c.id)}
                className="group flex w-full flex-col items-center gap-3 rounded-2xl border border-border bg-card p-6 text-center shadow-sm transition-all hover:-translate-y-1 hover:shadow-lg"
              >
                <span className="grid size-14 place-items-center rounded-2xl bg-brand-soft text-[var(--brand)] transition-transform group-hover:scale-110">
                  <Icon className="size-7" />
                </span>
                <span className="font-display text-base font-semibold">
                  {c.nombre}
                </span>
                <span className="flex items-center gap-1 text-xs text-muted-foreground">
                  {n} producto{n === 1 ? "" : "s"}
                  <ArrowUpRight className="size-3 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </span>
              </button>
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}
