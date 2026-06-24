"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Menu, ShoppingBag, UtensilsCrossed, X } from "lucide-react";
import type { Route } from "next";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { useStore } from "@/components/store-provider";
import { cn } from "@/lib/utils";

/** Castea a Route para que <Link> acepte anclas y rutas dinámicas. */
const r = (s: string) => s as Route;

const LINKS = [
  { href: "/premium#inicio", label: "Inicio" },
  { href: "/premium", label: "Mascotas" },
  { href: "/premium/restaurante", label: "Restaurante" },
  { href: "/premium#nosotros", label: "Nosotros" },
  { href: "/premium#contacto", label: "Contacto" },
];

export function Navbar({ view }: { view: "mascotas" | "restaurante" }) {
  const pathname = usePathname();
  const { count, setCartOpen } = useStore();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const isResto = view === "restaurante";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  // Texto claro sobre el hero (solo restaurante, en el tope, sin scroll).
  const lightOnTop = isResto && !scrolled;
  const textColor = lightOnTop ? "text-white" : "text-[color:var(--pm-fg)]";

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <div
        className={cn(
          "transition-all duration-300",
          scrolled
            ? "border-b border-black/5 bg-[color:var(--pm-bg)]/80 backdrop-blur-xl shadow-[0_4px_24px_rgba(0,0,0,0.06)]"
            : "bg-transparent",
        )}
      >
        <nav className="mx-auto flex h-[68px] w-full max-w-7xl items-center justify-between px-5 sm:px-8">
          {/* Logo */}
          <Link
            href={r(isResto ? "/premium/restaurante" : "/premium")}
            className="flex items-center gap-2.5"
          >
            <Image
              src={
                isResto
                  ? "/logo/Antumalen_restaurante_logo_nobg.png"
                  : "/logo/Antumalen_logo.png"
              }
              alt="Antümalen"
              width={44}
              height={44}
              className="size-10 rounded-xl object-cover"
              priority
            />
            <span
              className={cn(
                "font-display text-lg font-bold tracking-tight",
                textColor,
              )}
            >
              Antümalen
            </span>
          </Link>

          {/* Links desktop */}
          <div className="hidden items-center gap-1 lg:flex">
            {LINKS.map((l) => {
              const active =
                (l.label === "Mascotas" && pathname === "/premium") ||
                (l.label === "Restaurante" &&
                  pathname.startsWith("/premium/restaurante"));
              return (
                <Link
                  key={l.label}
                  href={r(l.href)}
                  className={cn(
                    "rounded-full px-4 py-2 text-sm font-medium transition-colors",
                    textColor,
                    active
                      ? "bg-[color:var(--pm-accent)]/15 text-[color:var(--pm-accent-dark)]"
                      : "hover:bg-black/5",
                    lightOnTop && !active && "hover:bg-white/10",
                  )}
                >
                  {l.label}
                </Link>
              );
            })}
          </div>

          {/* Acciones */}
          <div className="flex items-center gap-2.5">
            <Link
              href={r(isResto ? "/premium" : "/premium/restaurante")}
              className={cn(
                "hidden items-center gap-2 rounded-full px-4 py-2.5 text-sm font-semibold transition-all hover:-translate-y-0.5 sm:inline-flex",
                isResto
                  ? "bg-[color:var(--pm-accent)] text-[#1b1b1b]"
                  : "bg-[color:var(--pm-brown)] text-white",
              )}
            >
              <UtensilsCrossed className="size-4" />
              {isResto ? "Ver Mascotas" : "Ver Restaurante"}
            </Link>

            <button
              type="button"
              onClick={() => setCartOpen(true)}
              aria-label="Abrir carrito"
              className={cn(
                "relative grid size-11 place-items-center rounded-xl bg-white shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md",
              )}
            >
              <ShoppingBag className="size-5 text-[color:var(--pm-fg)]" />
              <AnimatePresence>
                {count > 0 ? (
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    exit={{ scale: 0 }}
                    className="absolute -right-1.5 -top-1.5 grid min-w-[20px] place-items-center rounded-full bg-[color:var(--pm-accent)] px-1.5 text-[0.7rem] font-bold text-[#1b1b1b] ring-2 ring-[color:var(--pm-bg)]"
                  >
                    {count}
                  </motion.span>
                ) : null}
              </AnimatePresence>
            </button>

            <button
              type="button"
              onClick={() => setOpen(true)}
              aria-label="Abrir menú"
              className="grid size-11 place-items-center rounded-xl bg-white shadow-sm lg:hidden"
            >
              <Menu className="size-5 text-[color:var(--pm-fg)]" />
            </button>
          </div>
        </nav>
      </div>

      {/* Menú móvil */}
      <AnimatePresence>
        {open ? (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setOpen(false)}
              className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm lg:hidden"
            />
            <motion.aside
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
              className="fixed right-0 top-0 z-50 flex h-full w-[82%] max-w-sm flex-col bg-[color:var(--pm-bg)] p-6 lg:hidden"
            >
              <div className="mb-8 flex items-center justify-between">
                <span className="font-display text-lg font-bold text-[color:var(--pm-fg)]">
                  Antümalen
                </span>
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  aria-label="Cerrar menú"
                  className="grid size-10 place-items-center rounded-full bg-white shadow-sm"
                >
                  <X className="size-5 text-[color:var(--pm-fg)]" />
                </button>
              </div>
              <nav className="flex flex-col gap-1">
                {LINKS.map((l) => (
                  <Link
                    key={l.label}
                    href={r(l.href)}
                    onClick={() => setOpen(false)}
                    className="rounded-2xl px-4 py-3.5 text-base font-medium text-[color:var(--pm-fg)] transition-colors hover:bg-black/5"
                  >
                    {l.label}
                  </Link>
                ))}
              </nav>
              <Link
                href={r(isResto ? "/premium" : "/premium/restaurante")}
                onClick={() => setOpen(false)}
                className="mt-auto inline-flex items-center justify-center gap-2 rounded-full bg-[color:var(--pm-accent)] px-5 py-3.5 font-semibold text-[#1b1b1b]"
              >
                <UtensilsCrossed className="size-4" />
                {isResto ? "Ver Mascotas" : "Ver Restaurante"}
              </Link>
            </motion.aside>
          </>
        ) : null}
      </AnimatePresence>
    </header>
  );
}
