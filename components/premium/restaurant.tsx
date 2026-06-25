"use client";

import {
  ChefHat,
  Flame,
  ImageIcon,
  type LucideIcon,
  Sparkles,
  UtensilsCrossed,
  Wine,
} from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { useStore } from "@/components/store-provider";
import { MENU, MENU_CATEGORIAS } from "@/lib/data";
import { cn } from "@/lib/utils";
import { PremiumCart } from "./cart";
import { PremiumFooter } from "./footer";
import { Navbar } from "./navbar";
import {
  Placeholder,
  Reveal,
  SectionHead,
  Stagger,
  StaggerItem,
  Stars,
} from "./primitives";
import { ProductCard } from "./product-card";
import { ThemeLab } from "./theme-lab";
import { PremiumWhatsappFloat } from "./whatsapp-float";

const WA = "56950306560";
const waLink = (t: string) => `https://wa.me/${WA}?text=${encodeURIComponent(t)}`;

const ICON_BY_CAT: Record<string, LucideIcon> = Object.fromEntries(
  MENU_CATEGORIAS.map((c) => [c.id, c.icon]),
);

const BADGES: Record<number, string> = {
  0: "Más vendido",
  1: "Favorito",
  3: "Recomendado",
};

/* Imágenes de referencia (Unsplash) — reemplazables por fotos reales. */
const U = (id: string, w = 600) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}&q=80`;
const HERO_IMG = U("1504674900247-0877df9cc836", 800);
const AMBIENTE_IMG = U("1517248135467-4c7edcad34c4", 800);
const MENU_IMG: Record<string, string> = {
  completos: U("1599599810769-bcde5a160d32"),
  sandwiches: U("1528735602780-2552fd46c7af"),
  pizzas: U("1513104890138-7c749659a591"),
  fajitas: U("1551504734-5ee1c4a1479b"),
  menus: U("1546069901-ba9599a7e63c"),
  bebidas: U("1437418747212-8d9709afab22"),
};
const AVATARS = [
  U("1507003211169-0a1dd7228f2d", 120),
  U("1494790108377-be9c29b29330", 120),
  U("1500648767791-00dcc994a43e", 120),
];

const ESPECIALIDADES = [
  { t: "Pizzas Artesanales", d: "Masa fresca, ingredientes generosos y horneado al momento.", tag: "Favorita de la casa", img: U("1513104890138-7c749659a591") },
  { t: "Completos & Sándwiches", d: "Completos enormes y churrascos jugosos, como deben ser.", tag: "Los más pedidos", img: U("1528735602780-2552fd46c7af") },
  { t: "Menú Casero del Día", d: "Comida de hogar, abundante y a precio accesible.", tag: "Todos los días", img: U("1546069901-ba9599a7e63c") },
];

const GALERIA = [
  { label: "Local", ratio: "4 / 5", img: U("1517248135467-4c7edcad34c4", 700) },
  { label: "Plato", ratio: "1 / 1", img: U("1504674900247-0877df9cc836") },
  { label: "Cocina", ratio: "4 / 3", img: U("1556910103-1c02745aae4d", 700) },
  { label: "Ingredientes", ratio: "1 / 1", img: U("1556909212-d5b604d0c90d") },
  { label: "Pizza", ratio: "4 / 5", img: U("1565299624946-b28f40a0ae38", 700) },
  { label: "Ambiente", ratio: "4 / 3", img: U("1552566626-52f8b828add9", 700) },
];

const TESTIMONIOS = [
  { n: "Cliente Antümalen", c: "Comida rica y casera, como hecha en casa. Los completos son enormes.", r: 5 },
  { n: "Cliente Antümalen", c: "Un lugar acogedor para ir en familia. La atención es muy amable.", r: 5 },
  { n: "Cliente Antümalen", c: "Las pizzas y fajitas son una delicia. Pedí por WhatsApp y llegó calientito.", r: 5 },
];

export function RestaurantView() {
  const { setMode, setCartOpen } = useStore();
  const [cat, setCat] = useState("todos");

  useEffect(() => {
    setMode("restaurante");
  }, [setMode]);

  const items = useMemo(
    () => (cat === "todos" ? MENU : MENU.filter((m) => m.categoria === cat)),
    [cat],
  );

  return (
    <div className="premium" data-view="restaurante">
      <Navbar view="restaurante" />
      <ThemeLab />
      <PremiumCart />
      <PremiumWhatsappFloat view="restaurante" />

      <main>
        {/* ---------- HERO ---------- */}
        <section
          id="inicio"
          className="relative flex min-h-[92svh] items-center overflow-hidden px-5 pt-24 sm:px-8"
        >
          <div
            className="absolute inset-0 -z-10"
            style={{
              background:
                "radial-gradient(120% 120% at 80% 10%, color-mix(in srgb, var(--pm-accent) 26%, transparent), transparent 45%), radial-gradient(100% 100% at 10% 90%, color-mix(in srgb, var(--pm-accent) 16%, transparent), transparent 50%), var(--pm-bg)",
            }}
          />
          <div
            className="absolute inset-0 -z-10"
            style={{
              backgroundImage:
                "radial-gradient(color-mix(in srgb, var(--pm-fg) 6%, transparent) 1px, transparent 1px)",
              backgroundSize: "22px 22px",
            }}
          />
          <div className="mx-auto grid w-full max-w-7xl items-center gap-12 py-16 lg:grid-cols-2">
            <Reveal>
              <span className="font-poppins text-xs font-semibold uppercase tracking-[0.18em] text-[color:var(--pm-accent-dark)]">
                San Clemente · Comida casera
              </span>
              <h1 className="font-display mt-4 text-4xl font-extrabold leading-[1.05] text-[color:var(--pm-fg)] sm:text-5xl lg:text-6xl">
                Sabores que <span className="italic text-[color:var(--pm-accent-dark)]">te hacen volver</span>
              </h1>
              <p className="mt-5 max-w-lg text-base text-[color:var(--pm-muted)] sm:text-lg">
                Completos, pizzas artesanales, sándwiches y menús del día
                preparados con cariño. Un ambiente familiar para disfrutar acá o
                pedir para llevar.
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <a
                  href="#menu"
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-[color:var(--pm-accent)] px-7 py-4 font-poppins font-semibold text-[color:var(--pm-on-accent)] transition-transform hover:-translate-y-0.5"
                >
                  Ver Menú
                </a>
                <a
                  href={waLink("¡Hola Antümalen! 🍽️ Quiero pedir.")}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-[#25D366] px-7 py-4 font-poppins font-semibold text-white shadow-lg shadow-[#25D366]/30 transition-transform hover:-translate-y-0.5"
                >
                  Pedir por WhatsApp
                </a>
              </div>
              <div className="mt-10 flex flex-wrap gap-8">
                {[
                  { b: "+500", s: "clientes felices" },
                  { b: "2 pisos", s: "ambiente familiar" },
                  { b: "Delivery", s: "y para llevar" },
                ].map((m) => (
                  <div key={m.s}>
                    <b className="font-display text-2xl font-bold text-[color:var(--pm-accent-dark)]">
                      {m.b}
                    </b>
                    <p className="text-sm text-[color:var(--pm-muted)]">{m.s}</p>
                  </div>
                ))}
              </div>
            </Reveal>

            <Reveal kind="scale" delay={0.1}>
              <Placeholder
                ratio="3 / 4"
                icon={ChefHat}
                label="Foto gastronómica"
                src={HERO_IMG}
                alt="Plato casero de Antümalen"
                className="shadow-[0_30px_70px_rgba(0,0,0,0.25)]"
              />
            </Reveal>
          </div>
        </section>

        {/* ---------- MENÚ ---------- */}
        <section id="menu" className="bg-[color:var(--pm-ivory)] px-5 py-20 sm:px-8">
          <div className="mx-auto w-full max-w-7xl">
            <SectionHead
              eyebrow="Nuestra carta"
              title="Descubre nuestros sabores"
              subtitle="Agrega tus platos al carrito y envía el pedido por WhatsApp."
            />
            <div className="mb-10 flex flex-wrap justify-center gap-2.5">
              {MENU_CATEGORIAS.map((c) => (
                <button
                  key={c.id}
                  type="button"
                  onClick={() => setCat(c.id)}
                  className={cn(
                    "inline-flex items-center gap-2 rounded-full px-4 py-2.5 font-poppins text-sm font-semibold transition-all",
                    cat === c.id
                      ? "bg-[color:var(--pm-fg)] text-[color:var(--pm-surface)]"
                      : "bg-[color:var(--pm-surface)] text-[color:var(--pm-fg)] shadow-sm hover:-translate-y-0.5",
                  )}
                >
                  <c.icon className="size-4" />
                  {c.nombre}
                </button>
              ))}
            </div>
            <Stagger
              key={cat}
              className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4"
            >
              {items.map((p, i) => (
                <StaggerItem key={p.id} className="h-full">
                  <ProductCard
                    producto={p}
                    badge={BADGES[i]}
                    icon={ICON_BY_CAT[p.categoria] ?? UtensilsCrossed}
                    phLabel={p.categoria}
                    image={MENU_IMG[p.categoria]}
                  />
                </StaggerItem>
              ))}
            </Stagger>
          </div>
        </section>

        {/* ---------- ESPECIALIDADES ---------- */}
        <section
          id="especialidades"
          className="bg-[color:var(--pm-carbon)] px-5 py-20 text-white sm:px-8"
        >
          <div className="mx-auto w-full max-w-7xl">
            <SectionHead
              eyebrow="Hechas con dedicación"
              title="Especialidades de la Casa"
              subtitle="Nuestros favoritos de siempre, preparados al momento."
              invert
            />
            <Stagger className="grid grid-cols-1 gap-6 md:grid-cols-3">
              {ESPECIALIDADES.map((e) => (
                <StaggerItem key={e.t}>
                  <div className="group h-full overflow-hidden rounded-3xl bg-white/[0.04] ring-1 ring-white/10 transition-transform hover:-translate-y-2">
                    <Placeholder
                      ratio="4 / 3"
                      icon={Flame}
                      label="Foto destacada"
                      src={e.img}
                      alt={e.t}
                      rounded="rounded-none"
                      className="bg-white/[0.06]"
                    />
                    <div className="p-7">
                      <h3 className="font-display text-2xl font-bold text-white">{e.t}</h3>
                      <p className="mt-2 text-white/65">{e.d}</p>
                      <span className="mt-4 inline-block font-poppins text-sm font-semibold text-[color:var(--pm-gold)]">
                        {e.tag} →
                      </span>
                    </div>
                  </div>
                </StaggerItem>
              ))}
            </Stagger>
          </div>
        </section>

        {/* ---------- GALERÍA (masonry) ---------- */}
        <section id="galeria" className="px-5 py-20 sm:px-8">
          <div className="mx-auto w-full max-w-7xl">
            <SectionHead
              eyebrow="Un vistazo"
              title="Galería gastronómica"
              subtitle="Pronto: fotografías reales de nuestros platos y del local."
            />
            <div className="columns-2 gap-4 md:columns-3 [&>*]:mb-4">
              {GALERIA.map((g, i) => (
                <Reveal key={g.label} kind="scale" delay={i * 0.05}>
                  <Placeholder ratio={g.ratio} icon={ImageIcon} label={g.label} src={g.img} alt={g.label} />
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ---------- AMBIENTE / NOSOTROS ---------- */}
        <section id="nosotros" className="px-5 pb-20 sm:px-8">
          <div className="mx-auto grid w-full max-w-7xl items-center gap-10 lg:grid-cols-2">
            <Reveal kind="scale">
              <Placeholder ratio="4 / 3" icon={Sparkles} label="Interior del local" src={AMBIENTE_IMG} alt="Interior del restaurante" />
            </Reveal>
            <Reveal>
              <span className="font-poppins text-xs font-semibold uppercase tracking-[0.18em] text-[color:var(--pm-accent-dark)]">
                Ambiente que enamora
              </span>
              <h2 className="font-display mt-3 text-3xl font-bold leading-tight text-[color:var(--pm-fg)] sm:text-4xl">
                Un espacio para disfrutar en familia
              </h2>
              <p className="mt-4 max-w-md text-[color:var(--pm-muted)]">
                Dos pisos, atención cordial y comida casera. Ven a pasar un
                momento agradable o pide para llevar: en Antümalen te recibimos
                como en casa.
              </p>
              <a
                href={waLink("¡Hola Antümalen! 🍽️ Quiero reservar / consultar.")}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 inline-flex items-center gap-2 rounded-full bg-[color:var(--pm-fg)] px-6 py-3 font-poppins font-semibold text-[color:var(--pm-surface)] transition-transform hover:-translate-y-0.5"
              >
                Escríbenos
              </a>
            </Reveal>
          </div>
        </section>

        {/* ---------- TESTIMONIOS ---------- */}
        <section className="bg-[color:var(--pm-ivory)] px-5 py-20 sm:px-8">
          <div className="mx-auto w-full max-w-7xl">
            <SectionHead eyebrow="Lo que dicen" title="Experiencias que nos inspiran" />
            <Stagger className="grid grid-cols-1 gap-6 md:grid-cols-3">
              {TESTIMONIOS.map((t, i) => (
                <StaggerItem key={i}>
                  <div className="flex h-full flex-col rounded-3xl bg-[color:var(--pm-surface)] p-7 shadow-[0_4px_18px_rgba(0,0,0,0.05)]">
                    <Stars value={t.r} />
                    <p className="mt-4 flex-1 text-[color:var(--pm-fg)]/80">“{t.c}”</p>
                    <div className="mt-5 flex items-center gap-3">
                      <div className="pm-ph size-12 overflow-hidden rounded-full">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={AVATARS[i % AVATARS.length]} alt={t.n} loading="lazy" decoding="async" className="size-full object-cover" onError={(e) => { e.currentTarget.style.display = "none"; }} />
                      </div>
                      <div>
                        <b className="font-poppins text-sm text-[color:var(--pm-fg)]">{t.n}</b>
                        <p className="text-xs text-[color:var(--pm-muted)]">San Clemente</p>
                      </div>
                    </div>
                  </div>
                </StaggerItem>
              ))}
            </Stagger>
          </div>
        </section>

        {/* ---------- CTA ---------- */}
        <section className="px-5 pb-24 pt-4 sm:px-8">
          <Reveal
            kind="scale"
            className="mx-auto w-full max-w-7xl overflow-hidden rounded-[2rem] bg-gradient-to-br from-white to-[color:var(--pm-gold)]/25 px-8 py-16 text-center shadow-[0_24px_70px_rgba(140,109,53,0.16)] ring-1 ring-[color:var(--pm-gold)]/40 sm:py-20"
          >
            <Wine className="mx-auto mb-4 size-10 text-[color:var(--pm-gold-dark)]" strokeWidth={1.4} />
            <h2 className="font-display text-3xl font-bold text-[color:var(--pm-carbon)] sm:text-4xl">
              ¿Listo para disfrutar?
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-[color:var(--pm-muted)]">
              Arma tu pedido y coordina por WhatsApp para retirar, comer en el
              local o recibir en casa.
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <button
                type="button"
                onClick={() => setCartOpen(true)}
                className="inline-flex items-center justify-center gap-2 rounded-full bg-[color:var(--pm-gold)] px-8 py-4 font-poppins font-semibold text-[#1b1b1b] transition-transform hover:-translate-y-0.5"
              >
                Ver mi pedido
              </button>
              <a
                href={waLink("¡Hola Antümalen! 🍽️ Quiero pedir.")}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-[#25D366] px-8 py-4 font-poppins font-semibold text-white transition-transform hover:-translate-y-0.5"
              >
                Pedir por WhatsApp
              </a>
            </div>
          </Reveal>
        </section>
      </main>

      <PremiumFooter view="restaurante" />
    </div>
  );
}
