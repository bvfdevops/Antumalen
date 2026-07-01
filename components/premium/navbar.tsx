"use client";

import { AnimatePresence, motion } from "framer-motion";
import { List, ShoppingBag, X } from "@phosphor-icons/react";
import type { Route } from "next";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useStore } from "@/components/store-provider";
import { cn } from "@/lib/utils";

/** Castea a Route para que <Link> acepte rutas dinámicas. */
const r = (s: string) => s as Route;

/** Enlaces de la página: solo secciones de la tienda de mascotas. */
const NAV = [
  { href: "#inicio", label: "Inicio" },
  { href: "#categorias", label: "Categorías" },
  { href: "#productos", label: "Productos" },
  { href: "#nosotros", label: "Nosotros" },
  { href: "#contacto", label: "Contacto" },
];

export function Navbar() {
  const { count, setCartOpen } = useStore();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

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

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <div
        className={cn(
          "transition-all duration-300",
          scrolled
            ? "border-b border-[color:var(--pm-border)] bg-[color:var(--pm-bg)]/80 backdrop-blur-xl shadow-[0_4px_24px_rgba(0,0,0,0.06)]"
            : "bg-transparent",
        )}
      >
        <nav className="mx-auto flex h-[68px] w-full max-w-7xl items-center justify-between px-5 sm:px-8">
          {/* Logo */}
          <Link href={r("/")} className="flex items-center gap-2.5">
            <Image
              src="/logo/Antumalen_logo_nobg.png"
              alt="Antümalen"
              width={44}
              height={44}
              className="size-10 rounded-xl bg-[#0E5A6B] object-contain p-1 shadow-sm"
              priority
            />
            <span className="font-display text-lg font-bold tracking-tight text-[color:var(--pm-fg)]">
              Antümalen
            </span>
          </Link>

          {/* Links desktop */}
          <div className="hidden items-center gap-1 lg:flex">
            {NAV.map((l) => (
              <a
                key={l.label}
                href={l.href}
                className="rounded-full px-4 py-2 text-sm font-medium text-[color:var(--pm-fg)] transition-colors hover:bg-[color:var(--pm-surface-2)]"
              >
                {l.label}
              </a>
            ))}
          </div>

          {/* Acciones */}
          <div className="flex items-center gap-2.5">
            <button
              type="button"
              onClick={() => setCartOpen(true)}
              aria-label="Abrir mi consulta"
              className={cn(
                "relative grid size-11 place-items-center rounded-xl bg-[color:var(--pm-surface)] shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md",
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
              className="grid size-11 place-items-center rounded-xl bg-[color:var(--pm-surface)] shadow-sm lg:hidden"
            >
              <List className="size-5 text-[color:var(--pm-fg)]" />
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
                  className="grid size-10 place-items-center rounded-full bg-[color:var(--pm-surface)] shadow-sm"
                >
                  <X className="size-5 text-[color:var(--pm-fg)]" />
                </button>
              </div>
              <nav className="flex flex-col gap-1">
                {NAV.map((l) => (
                  <a
                    key={l.label}
                    href={l.href}
                    onClick={() => setOpen(false)}
                    className="rounded-2xl px-4 py-3.5 text-base font-medium text-[color:var(--pm-fg)] transition-colors hover:bg-[color:var(--pm-surface-2)]"
                  >
                    {l.label}
                  </a>
                ))}
              </nav>
            </motion.aside>
          </>
        ) : null}
      </AnimatePresence>
    </header>
  );
}
