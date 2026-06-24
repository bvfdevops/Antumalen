"use client";

import { motion } from "framer-motion";
import type { Categoria } from "@/lib/data";
import { cn } from "@/lib/utils";

export function FilterChips({
  categorias,
  active,
  onChange,
  layoutId,
}: {
  categorias: Categoria[];
  active: string;
  onChange: (id: string) => void;
  layoutId: string;
}) {
  return (
    <div className="mb-10 flex flex-wrap justify-center gap-2.5">
      {categorias.map((c) => {
        const Icon = c.icon;
        const isActive = c.id === active;
        return (
          <button
            key={c.id}
            onClick={() => onChange(c.id)}
            className={cn(
              "relative inline-flex items-center gap-2 rounded-full border border-border px-4 py-2 text-sm font-semibold transition-colors",
              isActive
                ? "text-primary-foreground"
                : "bg-card/60 text-muted-foreground backdrop-blur hover:text-foreground",
            )}
          >
            {isActive && (
              <motion.span
                layoutId={layoutId}
                className="absolute inset-0 rounded-full bg-[var(--brand)]"
                transition={{ type: "spring", stiffness: 380, damping: 32 }}
              />
            )}
            <span className="relative flex items-center gap-2">
              <Icon className="size-4" />
              {c.nombre}
            </span>
          </button>
        );
      })}
    </div>
  );
}
