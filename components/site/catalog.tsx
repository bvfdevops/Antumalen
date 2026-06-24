"use client";

import { AnimatePresence } from "framer-motion";
import { FilterChips } from "@/components/site/filter-chips";
import { ProductCard } from "@/components/site/product-card";
import { SectionHead } from "@/components/site/section-head";
import type { Categoria, Producto } from "@/lib/data";

export function Catalog({
  id,
  eyebrow,
  title,
  accent,
  description,
  items,
  categorias,
  filtro,
  onFiltro,
  layoutId,
  note,
}: {
  id: string;
  eyebrow: string;
  title: string;
  accent: string;
  description: string;
  items: Producto[];
  categorias: Categoria[];
  filtro: string;
  onFiltro: (id: string) => void;
  layoutId: string;
  note?: string;
}) {
  const lista = items.filter(
    (p) => filtro === "todos" || p.categoria === filtro,
  );

  return (
    <section id={id} className="bg-secondary/40 py-20 sm:py-24">
      <div className="container-page">
        <SectionHead eyebrow={eyebrow} title={title} accent={accent}>
          {description}
        </SectionHead>

        <FilterChips
          categorias={categorias}
          active={filtro}
          onChange={onFiltro}
          layoutId={layoutId}
        />

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {lista.map((p) => (
              <ProductCard key={p.id} producto={p} />
            ))}
          </AnimatePresence>
        </div>

        {lista.length === 0 && (
          <p className="py-12 text-center text-muted-foreground">
            No hay resultados en esta categoría.
          </p>
        )}

        {note ? (
          <p className="mt-10 text-center text-sm text-muted-foreground">
            {note}
          </p>
        ) : null}
      </div>
    </section>
  );
}
