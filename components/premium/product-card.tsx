"use client";

import { Check, type Icon, Minus, Plus } from "@phosphor-icons/react";
import { useState } from "react";
import { useStore } from "@/components/store-provider";
import type { Producto } from "@/lib/data";
import { cn } from "@/lib/utils";
import { Placeholder } from "./primitives";

export function ProductCard({
  producto,
  icon,
  badge,
  phLabel,
  image,
}: {
  producto: Producto;
  icon?: Icon;
  badge?: string;
  phLabel?: string;
  image?: string;
}) {
  const { add, inc } = useStore();
  const [qty, setQty] = useState(1);
  const [done, setDone] = useState(false);

  function handleAdd() {
    add(producto.id);
    for (let i = 1; i < qty; i++) inc(producto.id);
    setQty(1);
    setDone(true);
    setTimeout(() => setDone(false), 1400);
  }

  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-3xl bg-[color:var(--pm-surface)] shadow-[0_4px_18px_rgba(0,0,0,0.05)] transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_28px_60px_rgba(0,0,0,0.14)]">
      <div className="relative overflow-hidden">
        {badge ? (
          <span className="absolute left-3 top-3 z-10 rounded-full bg-[color:var(--pm-accent)] px-3 py-1 font-poppins text-[0.7rem] font-semibold text-[#1b1b1b]">
            {badge}
          </span>
        ) : null}
        <Placeholder
          ratio="4 / 3"
          icon={icon}
          label={phLabel}
          src={image}
          alt={producto.nombre}
          rounded="rounded-none"
          className="transition-transform duration-500 group-hover:scale-[1.06]"
        />
      </div>

      <div className="flex flex-1 flex-col p-5">
        <h3 className="font-poppins text-base font-semibold leading-snug text-[color:var(--pm-fg)]">
          {producto.nombre}
        </h3>
        <p className="mt-1 line-clamp-2 flex-1 text-sm text-[color:var(--pm-muted)]">
          {producto.desc}
        </p>
        <div className="mt-4 flex items-center justify-between">
          <span className="font-poppins text-sm font-medium text-[color:var(--pm-muted)]">
            Cantidad
          </span>
          <div className="flex items-center gap-1 rounded-full bg-[color:var(--pm-surface-2)] p-1">
            <button
              type="button"
              onClick={() => setQty((q) => Math.max(1, q - 1))}
              aria-label="Restar"
              className="grid size-7 place-items-center rounded-full text-[color:var(--pm-fg)] transition-colors hover:bg-[color:var(--pm-surface)]"
            >
              <Minus className="size-3.5" />
            </button>
            <span className="min-w-5 text-center text-sm font-semibold">{qty}</span>
            <button
              type="button"
              onClick={() => setQty((q) => q + 1)}
              aria-label="Sumar"
              className="grid size-7 place-items-center rounded-full text-[color:var(--pm-fg)] transition-colors hover:bg-[color:var(--pm-surface)]"
            >
              <Plus className="size-3.5" />
            </button>
          </div>
        </div>
        <button
          type="button"
          onClick={handleAdd}
          className={cn(
            "mt-4 flex w-full items-center justify-center gap-2 rounded-full py-3 font-poppins text-sm font-semibold transition-all hover:-translate-y-0.5",
            done
              ? "bg-[#25D366] text-white"
              : "bg-[color:var(--pm-fg)] text-[color:var(--pm-surface)] hover:bg-[color:var(--pm-accent-dark)]",
          )}
        >
          {done ? (
            <>
              <Check className="size-4" /> Agregado
            </>
          ) : (
            <>
              <Plus className="size-4" /> Agregar
            </>
          )}
        </button>
      </div>
    </article>
  );
}
