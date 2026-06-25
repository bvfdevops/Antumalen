"use client";

import { Clock, MapPin, Phone } from "lucide-react";
import type { Route } from "next";
import Image from "next/image";
import Link from "next/link";

const r = (s: string) => s as Route;

function IgIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="size-4" aria-hidden>
      <rect x="2" y="2" width="20" height="20" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}

function FbIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="size-4" aria-hidden>
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
  );
}

export function PremiumFooter({ view }: { view: "mascotas" | "restaurante" }) {
  const isResto = view === "restaurante";
  return (
    <footer
      id="contacto"
      className="bg-[#1a1714] px-5 pb-8 pt-16 text-white/80 sm:px-8"
    >
      <div className="mx-auto grid w-full max-w-7xl gap-10 md:grid-cols-[1.6fr_1fr_1.2fr]">
        <div>
          <div className="mb-4 flex items-center gap-3">
            <Image
              src={
                isResto
                  ? "/logo/Antumalen_restaurante_Logo.jpg"
                  : "/logo/Antumalen_logo.png"
              }
              alt="Antümalen"
              width={46}
              height={46}
              className="size-11 rounded-xl object-cover ring-1 ring-white/10"
            />
            <b className="font-display text-xl text-white">Antümalen</b>
          </div>
          <p className="max-w-sm text-sm text-white/60">
            Tienda de mascotas y restaurante de comida casera en San Clemente,
            Región del Maule. Todo en un mismo lugar, hecho con cariño.
          </p>
          <div className="mt-5 flex gap-3">
            <a
              href="https://www.instagram.com/antumalenpets/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="grid size-10 place-items-center rounded-xl bg-white/10 transition-all hover:-translate-y-0.5 hover:bg-[color:var(--pm-accent)]"
            >
              <IgIcon />
            </a>
            <a
              href="https://web.facebook.com/people/Antümalen-Pets/100069050627029/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
              className="grid size-10 place-items-center rounded-xl bg-white/10 transition-all hover:-translate-y-0.5 hover:bg-[color:var(--pm-accent)]"
            >
              <FbIcon />
            </a>
          </div>
        </div>

        <div>
          <h4 className="mb-4 font-poppins text-sm font-semibold text-white">
            Explora
          </h4>
          <ul className="space-y-2.5 text-sm text-white/60">
            <li>
              <Link href={r("/premium")} className="hover:text-[color:var(--pm-accent)]">
                Mascotas
              </Link>
            </li>
            <li>
              <Link
                href={r("/premium/restaurante")}
                className="hover:text-[color:var(--pm-accent)]"
              >
                Restaurante
              </Link>
            </li>
            <li>
              <Link href={r("/premium#nosotros")} className="hover:text-[color:var(--pm-accent)]">
                Nosotros
              </Link>
            </li>
            <li>
              <Link href={r("/inicio")} className="hover:text-[color:var(--pm-accent)]">
                Sitio actual
              </Link>
            </li>
            <li>
              <a href="/estudio.html" className="hover:text-[color:var(--pm-accent)]">
                ← Volver al estudio
              </a>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="mb-4 font-poppins text-sm font-semibold text-white">
            Visítanos
          </h4>
          <ul className="space-y-3 text-sm text-white/60">
            <li className="flex gap-2.5">
              <MapPin className="size-4 flex-none text-[color:var(--pm-accent)]" />
              Acceso por Ruta 115 #837 / Huamachuco #830, San Clemente
            </li>
            <li className="flex gap-2.5">
              <Clock className="size-4 flex-none text-[color:var(--pm-accent)]" />
              Lun a Sáb 9:30–20:30 · Dom 9:30–15:30
            </li>
            <li className="flex gap-2.5">
              <Phone className="size-4 flex-none text-[color:var(--pm-accent)]" />
              +56 9 5030 6560
            </li>
          </ul>
        </div>
      </div>

      <div className="mx-auto mt-12 w-full max-w-7xl border-t border-white/10 pt-6 text-center text-xs text-white/40">
        © {new Date().getFullYear()} Antümalen · San Clemente, Región del Maule.
      </div>
    </footer>
  );
}
