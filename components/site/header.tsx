"use client";

import { motion } from "framer-motion";
import { Moon, PawPrint, ShoppingBag, Sun, UtensilsCrossed } from "lucide-react";
import { useTheme } from "next-themes";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useStore } from "@/components/store-provider";
import type { Mode } from "@/lib/data";
import { cn } from "@/lib/utils";

const NAV: Record<Mode, { href: string; label: string }[]> = {
  tienda: [
    { href: "#categorias", label: "Categorías" },
    { href: "#productos", label: "Productos" },
    { href: "#beneficios", label: "Beneficios" },
    { href: "#contacto", label: "Contacto" },
  ],
  restaurante: [
    { href: "#menu", label: "Menú" },
    { href: "#info", label: "Información" },
    { href: "#contacto", label: "Contacto" },
  ],
};

export function Header() {
  const { mode, setMode, count, setCartOpen } = useStore();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "sticky top-0 z-40 transition-all duration-300",
        scrolled
          ? "border-b border-border bg-background/80 backdrop-blur-xl"
          : "bg-transparent",
      )}
    >
      <div className="container-page flex h-16 items-center justify-between gap-4">
        <Link href="/" className="flex items-center gap-2.5">
          <span className="grid size-9 place-items-center rounded-xl bg-[var(--brand)] text-primary-foreground shadow-sm">
            {mode === "tienda" ? (
              <PawPrint className="size-5" />
            ) : (
              <UtensilsCrossed className="size-5" />
            )}
          </span>
          <span className="font-display text-lg font-semibold leading-none">
            Antümalen{" "}
            <span className="text-[var(--brand)]">
              {mode === "tienda" ? "Pets" : "Resto"}
            </span>
          </span>
        </Link>

        <nav className="hidden items-center gap-1 md:flex">
          {NAV[mode].map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="rounded-full px-3.5 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <ModeSwitch mode={mode} onChange={setMode} />
          <ThemeToggle />
          <button
            onClick={() => setCartOpen(true)}
            aria-label="Abrir carrito"
            className="relative grid size-10 place-items-center rounded-full border border-border bg-card/60 text-foreground backdrop-blur transition-colors hover:bg-secondary"
          >
            <ShoppingBag className="size-5" />
            {count > 0 && (
              <span className="absolute -right-1 -top-1 grid size-5 place-items-center rounded-full bg-accent text-[11px] font-bold text-accent-foreground">
                {count}
              </span>
            )}
          </button>
        </div>
      </div>
    </header>
  );
}

function ModeSwitch({
  mode,
  onChange,
}: {
  mode: Mode;
  onChange: (m: Mode) => void;
}) {
  const options: { id: Mode; icon: typeof PawPrint; label: string }[] = [
    { id: "tienda", icon: PawPrint, label: "Tienda de mascotas" },
    { id: "restaurante", icon: UtensilsCrossed, label: "Restaurante" },
  ];
  return (
    <div className="flex items-center rounded-full border border-border bg-card/60 p-1 backdrop-blur">
      {options.map((o) => {
        const Icon = o.icon;
        const active = mode === o.id;
        return (
          <button
            key={o.id}
            onClick={() => onChange(o.id)}
            aria-label={o.label}
            title={o.label}
            className="relative grid size-8 place-items-center rounded-full"
          >
            {active && (
              <motion.span
                layoutId="mode-switch"
                className="absolute inset-0 rounded-full bg-[var(--brand)]"
                transition={{ type: "spring", stiffness: 380, damping: 30 }}
              />
            )}
            <Icon
              className={cn(
                "relative size-4",
                active ? "text-primary-foreground" : "text-muted-foreground",
              )}
            />
          </button>
        );
      })}
    </div>
  );
}

function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  return (
    <button
      onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
      aria-label="Cambiar tema"
      className="grid size-10 place-items-center rounded-full border border-border bg-card/60 text-foreground backdrop-blur transition-colors hover:bg-secondary"
    >
      {mounted && resolvedTheme === "dark" ? (
        <Sun className="size-5" />
      ) : (
        <Moon className="size-5" />
      )}
    </button>
  );
}
