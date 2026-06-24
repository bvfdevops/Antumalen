"use client";

import { motion } from "framer-motion";
import { Check, Plus, Star } from "lucide-react";
import { useState } from "react";
import { useStore } from "@/components/store-provider";
import { Button } from "@/components/ui/button";
import type { Producto } from "@/lib/data";
import { CLP, cn } from "@/lib/utils";

export function ProductCard({ producto }: { producto: Producto }) {
  const { add } = useStore();
  const [added, setAdded] = useState(false);

  function handleAdd() {
    add(producto.id);
    setAdded(true);
    window.setTimeout(() => setAdded(false), 1000);
  }

  return (
    <motion.article
      layout
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.96 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className="group flex flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-sm transition-shadow hover:shadow-lg"
    >
      <div className="relative flex h-40 items-center justify-center overflow-hidden bg-brand-soft">
        <span className="absolute left-3 top-3 rounded-full bg-card/85 px-2.5 py-1 text-[11px] font-semibold capitalize text-muted-foreground backdrop-blur">
          {producto.categoria}
        </span>
        <span className="font-display text-5xl font-semibold text-[var(--brand)]/35 transition-transform duration-300 group-hover:scale-110">
          {producto.nombre.charAt(0)}
        </span>
      </div>

      <div className="flex flex-1 flex-col gap-2 p-5">
        <div className="flex items-start justify-between gap-3">
          <h3 className="font-display text-lg font-semibold leading-snug">
            {producto.nombre}
          </h3>
          {producto.rating ? (
            <span className="flex shrink-0 items-center gap-1 text-sm font-semibold text-accent-foreground">
              <Star className="size-3.5 fill-accent text-accent" />
              {producto.rating.toFixed(1)}
            </span>
          ) : null}
        </div>
        <p className="text-sm text-muted-foreground">{producto.desc}</p>
        <div className="mt-auto flex items-center justify-between pt-3">
          <span className="font-display text-xl font-semibold">
            {CLP(producto.precio)}
          </span>
          <Button
            size="sm"
            variant={added ? "accent" : "default"}
            onClick={handleAdd}
            className={cn("min-w-28")}
          >
            {added ? (
              <>
                <Check /> Agregado
              </>
            ) : (
              <>
                <Plus /> Agregar
              </>
            )}
          </Button>
        </div>
      </div>
    </motion.article>
  );
}
