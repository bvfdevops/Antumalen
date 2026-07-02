"use client";

/* ============================================================
   V4 "Almacén" — navbar y footer propios.
   Nada de blur ni píldoras: barra sólida con borde inferior
   grueso, links numerados en mayúsculas y botones cuadrados.
   ============================================================ */

import { AnimatePresence, motion } from "framer-motion";
import { List, PawPrint, ShoppingBag, WhatsappLogo, X } from "@phosphor-icons/react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useStore } from "@/components/store-provider";
import { buildWhatsappLink, WHATSAPP_NUMERO } from "@/lib/data";

export const NAV_V4 = [
  { href: "#inicio", label: "Inicio" },
  { href: "#categorias", label: "Categorías" },
  { href: "#productos", label: "Catálogo" },
  { href: "#como-pedir", label: "Cómo pedir" },
  { href: "#preguntas", label: "Preguntas" },
  { href: "#contacto", label: "Contacto" },
];

const WA_DISPLAY = `+${WHATSAPP_NUMERO.slice(0, 2)} ${WHATSAPP_NUMERO.slice(2, 3)} ${WHATSAPP_NUMERO.slice(3, 7)} ${WHATSAPP_NUMERO.slice(7)}`;

export function NavbarV4() {
  const { count, setCartOpen } = useStore();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      {/* Microstrip informativo */}
      <div className="hidden bg-[color:var(--v4-ink)] px-5 py-1.5 text-[color:var(--v4-paper)] sm:block">
        <div className="mx-auto flex w-full max-w-7xl items-center justify-between font-poppins text-[0.7rem] font-semibold uppercase tracking-[0.14em]">
          <span>San Clemente · Región del Maule</span>
          <a
            href={buildWhatsappLink("¡Hola Antümalen!")}
            className="flex items-center gap-1.5 transition-colors hover:text-[color:var(--v4-gold)]"
          >
            <WhatsappLogo className="size-3.5" weight="bold" />
            {WA_DISPLAY}
          </a>
        </div>
      </div>

      {/* Barra principal */}
      <div className="border-b-2 border-[color:var(--v4-ink)] bg-[color:var(--v4-paper)]">
        <nav className="mx-auto flex h-16 w-full max-w-7xl items-center justify-between px-5 sm:px-8">
          <Link href="/" className="flex items-center gap-2.5">
            <Image
              src="/logo/Antumalen_logo_nobg.png"
              alt="Antümalen"
              width={40}
              height={40}
              className="size-9 rounded-md border-2 border-[color:var(--v4-ink)] bg-[#0E5A6B] object-contain p-0.5"
              priority
            />
            <span className="font-display text-xl font-black tracking-tight text-[color:var(--v4-ink)]">
              Antümalen
            </span>
          </Link>

          <div className="hidden items-center gap-5 lg:flex">
            {NAV_V4.map((l, i) => (
              <a
                key={l.label}
                href={l.href}
                className="group font-poppins text-[0.72rem] font-bold uppercase tracking-[0.14em] text-[color:var(--v4-ink)]"
              >
                <span className="mr-1 text-[color:var(--v4-petrol)]/50 transition-colors group-hover:text-[color:var(--v4-gold-deep)]">
                  0{i + 1}
                </span>
                <span className="underline-offset-4 group-hover:underline">{l.label}</span>
              </a>
            ))}
          </div>

          <div className="flex items-center gap-2.5">
            <button
              type="button"
              onClick={() => setCartOpen(true)}
              aria-label="Abrir mi consulta"
              className="relative grid size-10 place-items-center rounded-md border-2 border-[color:var(--v4-ink)] bg-[color:var(--v4-surface)] transition-transform hover:-translate-y-0.5 hover:shadow-[3px_3px_0_var(--v4-ink)]"
            >
              <ShoppingBag className="size-5 text-[color:var(--v4-ink)]" weight="bold" />
              <AnimatePresence>
                {count > 0 ? (
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    exit={{ scale: 0 }}
                    className="absolute -right-2 -top-2 grid min-w-[20px] place-items-center rounded-md border-2 border-[color:var(--v4-ink)] bg-[color:var(--v4-gold)] px-1 font-poppins text-[0.68rem] font-bold text-[color:var(--v4-ink)]"
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
              className="grid size-10 place-items-center rounded-md border-2 border-[color:var(--v4-ink)] bg-[color:var(--v4-surface)] lg:hidden"
            >
              <List className="size-5 text-[color:var(--v4-ink)]" weight="bold" />
            </button>
          </div>
        </nav>
      </div>

      {/* Menú móvil: panel completo estilo índice */}
      <AnimatePresence>
        {open ? (
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.22 }}
            className="fixed inset-0 z-50 flex flex-col bg-[color:var(--v4-paper)] lg:hidden"
          >
            <div className="flex h-16 items-center justify-between border-b-2 border-[color:var(--v4-ink)] px-5">
              <span className="font-display text-xl font-black text-[color:var(--v4-ink)]">
                Antümalen
              </span>
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label="Cerrar menú"
                className="grid size-10 place-items-center rounded-md border-2 border-[color:var(--v4-ink)] bg-[color:var(--v4-surface)]"
              >
                <X className="size-5 text-[color:var(--v4-ink)]" weight="bold" />
              </button>
            </div>
            <nav className="flex flex-1 flex-col justify-center px-6">
              {NAV_V4.map((l, i) => (
                <a
                  key={l.label}
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="group flex items-baseline gap-4 border-b border-[color:var(--v4-line)] py-4"
                >
                  <span className="font-poppins text-xs font-bold text-[color:var(--v4-gold-deep)]">
                    0{i + 1}
                  </span>
                  <span className="font-display text-3xl font-bold text-[color:var(--v4-ink)] transition-transform group-active:translate-x-1">
                    {l.label}
                  </span>
                </a>
              ))}
            </nav>
            <div className="border-t-2 border-[color:var(--v4-ink)] px-6 py-5">
              <a
                href={buildWhatsappLink("¡Hola Antümalen!")}
                className="flex items-center justify-center gap-2 rounded-md border-2 border-[color:var(--v4-ink)] bg-[#25D366] py-3.5 font-poppins text-sm font-bold uppercase tracking-[0.1em] text-white"
              >
                <WhatsappLogo className="size-5" weight="fill" /> Escríbenos
              </a>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </header>
  );
}

export function FooterV4() {
  return (
    <footer id="contacto" className="bg-[color:var(--v4-ink)] text-[color:var(--v4-paper)]">
      <div className="mx-auto w-full max-w-7xl px-5 py-14 sm:px-8">
        <div className="grid gap-10 md:grid-cols-[1.2fr_1fr_1fr]">
          <div>
            <div className="flex items-center gap-3">
              <PawPrint className="size-8 text-[color:var(--v4-gold)]" weight="fill" />
              <span className="font-display text-3xl font-black">Antümalen</span>
            </div>
            <p className="font-hand mt-3 text-2xl text-[color:var(--v4-gold)]">
              “niña del sol” en mapudungun
            </p>
            <p className="mt-3 max-w-sm text-sm text-[color:var(--v4-paper)]/70">
              Almacén de mascotas familiar en San Clemente. Armas tu lista en la
              web, la envías por WhatsApp y la recibes en tu casa.
            </p>
          </div>

          <div>
            <h3 className="font-poppins text-xs font-bold uppercase tracking-[0.18em] text-[color:var(--v4-gold)]">
              Navegación
            </h3>
            <ul className="mt-4 flex flex-col gap-2.5">
              {NAV_V4.slice(0, 5).map((l) => (
                <li key={l.label}>
                  <a
                    href={l.href}
                    className="text-sm text-[color:var(--v4-paper)]/80 underline-offset-4 hover:text-[color:var(--v4-gold)] hover:underline"
                  >
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-poppins text-xs font-bold uppercase tracking-[0.18em] text-[color:var(--v4-gold)]">
              Contacto
            </h3>
            <ul className="mt-4 flex flex-col gap-2.5 text-sm text-[color:var(--v4-paper)]/80">
              <li>
                <a
                  href={buildWhatsappLink("¡Hola Antümalen!")}
                  className="flex items-center gap-2 underline-offset-4 hover:text-[color:var(--v4-gold)] hover:underline"
                >
                  <WhatsappLogo className="size-4" weight="bold" /> {WA_DISPLAY}
                </a>
              </li>
              <li>San Clemente, Región del Maule</li>
              <li>Lun a Sáb · 10:00 a 20:00 hrs</li>
            </ul>
            <p className="mt-4 text-xs text-[color:var(--v4-paper)]/50">
              No publicamos precios: te los confirmamos por WhatsApp, siempre
              actualizados.
            </p>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-3 border-t border-white/15 pt-6 sm:flex-row">
          <p className="text-xs text-[color:var(--v4-paper)]/50">
            © {new Date().getFullYear()} Antümalen — Tienda de mascotas
          </p>
          <p className="font-poppins text-[0.68rem] font-semibold uppercase tracking-[0.16em] text-[color:var(--v4-paper)]/50">
            Hecho con cariño en San Clemente
          </p>
        </div>
      </div>
    </footer>
  );
}
