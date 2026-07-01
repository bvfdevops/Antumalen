"use client";

/* ============================================================
   Antümalen — Landing V2 (ruta /v2)
   Reutiliza los MISMOS componentes premium que la principal
   (Navbar, ThemeLab, PetCursor, primitivas animadas, ProductCard,
   Cart, WhatsApp, Footer) para un acabado igual de profesional,
   pero con un ORDEN y COMPOSICIÓN de secciones completamente
   distintos:

     Principal:  hero → categorías → productos → beneficios →
                 nosotros → stats → testimonios → cta
     V2 (aquí):  hero centrado → cómo funciona → productos
                 (cabecera lateral fija) → stats → categorías
                 (marquee) → beneficios (fila) → testimonios
                 (asimétrico) → nosotros (imagen a la izq.) → cta

   Misma finalidad: arma tu lista y consúltala por WhatsApp.
   ============================================================ */

import {
  ArrowRight,
  Bird,
  Cat,
  ChatCircleDots,
  Check,
  Dog,
  Drop,
  Fish,
  Headset,
  Heart,
  ListChecks,
  PawPrint,
  Rabbit,
  ShieldCheck,
  ShoppingBag,
  Sparkle,
  Truck,
} from "@phosphor-icons/react";
import { useEffect, useMemo, useState } from "react";
import { useStore } from "@/components/store-provider";
import { PRODUCTOS } from "@/lib/data";
import { cn } from "@/lib/utils";
import { Navbar } from "@/components/premium/navbar";
import { PremiumCart } from "@/components/premium/cart";
import { PremiumFooter } from "@/components/premium/footer";
import { PetCursor } from "@/components/premium/cursor";
import { ThemeLab } from "@/components/premium/theme-lab";
import { PremiumWhatsappFloat } from "@/components/premium/whatsapp-float";
import { ProductCard } from "@/components/premium/product-card";
import {
  Counter,
  Placeholder,
  Reveal,
  SectionHead,
  Stagger,
  StaggerItem,
  Stars,
} from "@/components/premium/primitives";

const WA = "56950306560";
const waLink = (t: string) => `https://wa.me/${WA}?text=${encodeURIComponent(t)}`;

const CATEGORIAS = [
  { nombre: "Perros", icon: Dog },
  { nombre: "Gatos", icon: Cat },
  { nombre: "Aves", icon: Bird },
  { nombre: "Roedores", icon: Rabbit },
  { nombre: "Peces", icon: Fish },
  { nombre: "Reptiles", icon: PawPrint },
  { nombre: "Higiene", icon: Drop },
  { nombre: "Accesorios", icon: ShoppingBag },
];

const PASOS = [
  {
    n: "01",
    icon: ListChecks,
    t: "Arma tu lista",
    d: "Recorre el catálogo y agrega todo lo que te interese. Sin precios: es una lista de consulta.",
  },
  {
    n: "02",
    icon: ChatCircleDots,
    t: "Envíala por WhatsApp",
    d: "Con un toque nos llega tu lista completa. Puedes sumar tu nombre y observaciones.",
  },
  {
    n: "03",
    icon: Check,
    t: "Te confirmamos",
    d: "Respondemos con disponibilidad, precios actualizados y coordinamos el despacho.",
  },
];

const STATS = [
  { to: 2200, suffix: "+", label: "Clientes felices" },
  { to: 500, suffix: "+", label: "Productos" },
  { to: 8000, suffix: "+", label: "Pedidos completados" },
  { to: 99, suffix: "%", label: "Valoraciones positivas" },
];

const BENEFICIOS = [
  { icon: Truck, t: "Despacho a domicilio", d: "San Clemente y alrededores." },
  { icon: ShieldCheck, t: "Marcas originales", d: "Stock fresco y confiable." },
  { icon: Heart, t: "Compra sin vueltas", d: "Pagas al recibir o por transferencia." },
  { icon: Headset, t: "Asesoría cercana", d: "Te ayudamos a elegir mejor." },
];

const TESTIMONIOS = [
  { n: "Camila R.", c: "Pedí el alimento de mi perro y llegó el mismo día. La atención fue súper amable y me ayudaron a elegir la mejor opción para su edad.", r: 5 },
  { n: "Matías P.", c: "Precios justos y la arena que me recomendaron es excelente. Volví a comprar.", r: 5 },
  { n: "Valentina S.", c: "Encontré todo para mi pajarito en un solo lugar. Rapidísimo.", r: 5 },
];

const BADGES: Record<number, string> = { 0: "Popular", 3: "Nuevo", 6: "Oferta" };

/* Imágenes de referencia (Unsplash) — reemplazables por fotos reales. */
const U = (id: string, w = 800) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}&q=80`;
const HERO_A = U("1583511655857-d19b40a7a54e", 700);
const HERO_B = U("1514888286974-6c03e2ca1dba", 500);
const HERO_C = U("1425082661705-1834bfd09dca", 500);
const ABOUT_IMG = U("1601758228041-f3b2795255f1", 800);

export function PetsViewAlt() {
  const { setMode, setCartOpen } = useStore();
  useEffect(() => {
    setMode("tienda");
  }, [setMode]);

  /* ---- Filtro del catálogo por categoría ---- */
  const [cat, setCat] = useState("todos");

  const filtros = useMemo(() => {
    const base = [{ key: "todos", label: "Todos", icon: PawPrint }];
    for (const c of CATEGORIAS) {
      const key = c.nombre.toLowerCase();
      if (PRODUCTOS.some((p) => p.categoria === key)) {
        base.push({ key, label: c.nombre, icon: c.icon });
      }
    }
    return base;
  }, []);

  const conteos = useMemo(() => {
    const map: Record<string, number> = { todos: PRODUCTOS.length };
    for (const p of PRODUCTOS) map[p.categoria] = (map[p.categoria] ?? 0) + 1;
    return map;
  }, []);

  const productos = useMemo(
    () => PRODUCTOS.filter((p) => cat === "todos" || p.categoria === cat),
    [cat],
  );

  return (
    <div className="premium" data-view="mascotas">
      <PetCursor />
      <Navbar />
      <ThemeLab />
      <PremiumCart />
      <PremiumWhatsappFloat />

      <main>
        {/* ---------- 1 · HERO (centrado + filmstrip) ---------- */}
        <section
          id="inicio"
          className="relative overflow-hidden bg-[color:var(--pm-cream)] px-5 pb-16 pt-28 sm:px-8 sm:pt-32 lg:pb-20"
        >
          <div className="pm-mesh" aria-hidden />
          <div className="relative z-10 mx-auto w-full max-w-4xl text-center">
            <Reveal>
              <span className="inline-flex items-center gap-2 rounded-full bg-[color:var(--pm-surface)] px-4 py-1.5 font-poppins text-xs font-semibold uppercase tracking-[0.18em] text-[color:var(--pm-sage-dark)] shadow-sm">
                <PawPrint className="size-3.5" weight="fill" />
                San Clemente · Región del Maule
              </span>
              <h1 className="font-display mt-6 text-4xl font-extrabold leading-[1.04] text-[color:var(--pm-brown)] sm:text-6xl lg:text-7xl">
                Todo para el bienestar de{" "}
                <span className="text-[color:var(--pm-sage-dark)]">
                  tu mejor amigo
                </span>
              </h1>
              <p className="mx-auto mt-6 max-w-xl text-base text-[color:var(--pm-muted)] sm:text-lg">
                Alimento, accesorios y cuidado para perros, gatos, aves y más.
                Arma tu lista y consúltanos disponibilidad por WhatsApp — los
                precios los conversamos ahí.
              </p>
              <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
                <a
                  href="#productos"
                  className="group inline-flex items-center justify-center gap-2 rounded-full bg-[color:var(--pm-fg)] px-7 py-4 font-poppins font-semibold text-[color:var(--pm-surface)] transition-transform hover:-translate-y-0.5"
                >
                  Ver catálogo
                  <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" weight="bold" />
                </a>
                <a
                  href={waLink("¡Hola Antümalen! Quiero hacer una consulta.")}
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-[#25D366] px-7 py-4 font-poppins font-semibold text-white shadow-lg shadow-[#25D366]/30 transition-transform hover:-translate-y-0.5"
                >
                  Consultar por WhatsApp
                </a>
              </div>
            </Reveal>
          </div>

          {/* Filmstrip de imágenes */}
          <div className="relative z-10 mx-auto mt-14 grid w-full max-w-5xl grid-cols-2 gap-4 sm:grid-cols-4">
            <Reveal kind="scale" className="sm:col-span-2">
              <Placeholder
                ratio="16 / 10"
                icon={Dog}
                label="Perros felices"
                src={HERO_A}
                alt="Perro feliz"
                className="shadow-[0_24px_60px_rgba(92,75,59,0.16)]"
              />
            </Reveal>
            <Reveal kind="scale" delay={0.08}>
              <Placeholder ratio="4 / 5" icon={Cat} label="Gatos" src={HERO_B} alt="Gato" />
            </Reveal>
            <Reveal kind="scale" delay={0.16}>
              <Placeholder ratio="4 / 5" icon={Rabbit} label="Roedores" src={HERO_C} alt="Roedor" />
            </Reveal>
          </div>
        </section>

        {/* ---------- 2 · CÓMO FUNCIONA ---------- */}
        <section className="px-5 py-20 sm:px-8">
          <div className="mx-auto w-full max-w-7xl">
            <SectionHead
              align="left"
              eyebrow="Comprar es fácil"
              title="Cómo funciona"
              subtitle="No mostramos precios en la web: así te damos el valor más actualizado y coordinamos todo por WhatsApp, sin vueltas."
            />
            <Stagger className="grid gap-5 md:grid-cols-3">
              {PASOS.map((p) => (
                <StaggerItem key={p.n}>
                  <div className="relative h-full rounded-3xl border border-[color:var(--pm-border)] bg-[color:var(--pm-surface)] p-7 transition-transform hover:-translate-y-1">
                    <span className="font-display text-5xl font-extrabold text-[color:var(--pm-sage)]/30">
                      {p.n}
                    </span>
                    <div className="mt-3 grid size-12 place-items-center rounded-2xl bg-[color:var(--pm-sage)]/15 text-[color:var(--pm-sage-dark)]">
                      <p.icon className="size-6" weight="duotone" />
                    </div>
                    <h3 className="font-poppins mt-4 text-lg font-semibold text-[color:var(--pm-brown)]">
                      {p.t}
                    </h3>
                    <p className="mt-2 text-sm text-[color:var(--pm-muted)]">{p.d}</p>
                  </div>
                </StaggerItem>
              ))}
            </Stagger>
          </div>
        </section>

        {/* ---------- 3 · PRODUCTOS (cabecera lateral fija) ---------- */}
        <section id="productos" className="bg-[#f2efe9] px-5 py-20 sm:px-8">
          <div className="mx-auto grid w-full max-w-7xl gap-10 lg:grid-cols-[320px_1fr]">
            <div className="lg:sticky lg:top-24 lg:h-fit">
              <span className="font-poppins text-xs font-semibold uppercase tracking-[0.18em] text-[color:var(--pm-accent-dark)]">
                El catálogo
              </span>
              <h2 className="font-display mt-3 text-3xl font-bold leading-[1.1] text-[color:var(--pm-fg)] sm:text-4xl md:text-5xl">
                Lo más buscado
              </h2>
              <p className="mt-4 text-base text-[color:var(--pm-muted)]">
                Filtra por tipo de mascota, agrega lo que necesites y arma tu
                consulta por WhatsApp.
              </p>

              {/* Chips de categoría */}
              <div className="mt-6 flex flex-wrap gap-2">
                {filtros.map((f) => (
                  <button
                    key={f.key}
                    type="button"
                    onClick={() => setCat(f.key)}
                    aria-pressed={cat === f.key}
                    className={cn(
                      "inline-flex items-center gap-1.5 rounded-full border px-3.5 py-2 font-poppins text-sm font-semibold transition-all",
                      cat === f.key
                        ? "border-transparent bg-[color:var(--pm-fg)] text-[color:var(--pm-surface)]"
                        : "border-[color:var(--pm-border)] bg-[color:var(--pm-surface)] text-[color:var(--pm-brown)] hover:-translate-y-0.5 hover:border-[color:var(--pm-sage)]",
                    )}
                  >
                    <f.icon className="size-4" weight="duotone" />
                    {f.label}
                    <span className="opacity-60">{conteos[f.key] ?? 0}</span>
                  </button>
                ))}
              </div>

              <button
                type="button"
                onClick={() => setCartOpen(true)}
                className="mt-6 inline-flex items-center gap-2 rounded-full bg-[color:var(--pm-fg)] px-6 py-3.5 font-poppins font-semibold text-[color:var(--pm-surface)] transition-transform hover:-translate-y-0.5"
              >
                <ShoppingBag className="size-4" weight="bold" /> Ver mi consulta
              </button>
            </div>

            <div>
              <p className="mb-5 font-poppins text-sm text-[color:var(--pm-muted)]">
                Mostrando{" "}
                <b className="text-[color:var(--pm-fg)]">{productos.length}</b>{" "}
                {productos.length === 1 ? "producto" : "productos"}
              </p>

              <Stagger
                key={cat}
                gap={0.03}
                amount={0.02}
                className="grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-3"
              >
                {productos.map((p, i) => (
                  <StaggerItem key={p.id} className="h-full">
                    <ProductCard
                      producto={p}
                      badge={cat === "todos" ? BADGES[i] : undefined}
                      phLabel="Producto"
                      icon={PawPrint}
                      image={p.imagen}
                    />
                  </StaggerItem>
                ))}
              </Stagger>
            </div>
          </div>
        </section>

        {/* ---------- 4 · ESTADÍSTICAS (banda oscura) ---------- */}
        <section className="px-5 py-20 sm:px-8">
          <Reveal
            kind="scale"
            className="mx-auto w-full max-w-7xl overflow-hidden rounded-[2rem] bg-[color:var(--pm-fg)] px-8 py-14 text-[color:var(--pm-surface)]"
          >
            <div className="grid grid-cols-2 gap-8 lg:grid-cols-4">
              {STATS.map((s) => (
                <div key={s.label} className="text-center">
                  <div className="font-display text-4xl font-extrabold text-[color:var(--pm-accent)] sm:text-5xl">
                    <Counter to={s.to} suffix={s.suffix} />
                  </div>
                  <p className="mt-2 text-sm text-[color:var(--pm-surface)]/70">
                    {s.label}
                  </p>
                </div>
              ))}
            </div>
          </Reveal>
        </section>

        {/* ---------- 5 · CATEGORÍAS (marquee horizontal) ---------- */}
        <section id="categorias" className="pb-20">
          <div className="mx-auto mb-10 w-full max-w-7xl px-5 sm:px-8">
            <SectionHead
              align="left"
              eyebrow="Explora por mascota"
              title="Categorías"
            />
          </div>
          <div className="overflow-hidden py-2">
            <div className="v2-marquee gap-4">
              {[...CATEGORIAS, ...CATEGORIAS].map((c, i) => (
                <a
                  key={`${c.nombre}-${i}`}
                  href="#productos"
                  className="flex shrink-0 items-center gap-3 rounded-full border border-[color:var(--pm-border)] bg-[color:var(--pm-surface)] px-6 py-4 shadow-[0_6px_20px_rgba(92,75,59,0.06)] transition-colors hover:bg-[color:var(--pm-sage)] hover:text-[color:var(--pm-on-accent)]"
                >
                  <c.icon className="size-6 text-[color:var(--pm-sage-dark)]" weight="duotone" />
                  <span className="font-poppins whitespace-nowrap text-base font-semibold text-[color:var(--pm-brown)]">
                    {c.nombre}
                  </span>
                </a>
              ))}
            </div>
          </div>
        </section>

        {/* ---------- 6 · BENEFICIOS (fila con divisores) ---------- */}
        <section className="px-5 pb-20 sm:px-8">
          <Stagger className="mx-auto grid w-full max-w-7xl gap-y-8 rounded-[2rem] border border-[color:var(--pm-border)] bg-[color:var(--pm-surface)] p-8 sm:grid-cols-2 lg:grid-cols-4 lg:divide-x lg:divide-[color:var(--pm-border)]">
            {BENEFICIOS.map((b) => (
              <StaggerItem key={b.t} className="lg:px-6">
                <div className="grid size-12 place-items-center rounded-2xl bg-[color:var(--pm-sage)]/15 text-[color:var(--pm-sage-dark)]">
                  <b.icon className="size-6" weight="duotone" />
                </div>
                <h3 className="font-poppins mt-4 text-base font-semibold text-[color:var(--pm-brown)]">
                  {b.t}
                </h3>
                <p className="mt-1 text-sm text-[color:var(--pm-muted)]">{b.d}</p>
              </StaggerItem>
            ))}
          </Stagger>
        </section>

        {/* ---------- 7 · TESTIMONIOS (asimétrico) ---------- */}
        <section className="px-5 pb-20 sm:px-8">
          <div className="mx-auto w-full max-w-7xl">
            <SectionHead
              align="left"
              eyebrow="Familias felices"
              title="Lo que dicen nuestros clientes"
            />
            <div className="grid gap-6 lg:grid-cols-5">
              <Reveal className="lg:col-span-3">
                <div className="flex h-full flex-col justify-between rounded-3xl bg-[color:var(--pm-sage)] p-8 text-[color:var(--pm-on-accent)] sm:p-10">
                  <div>
                    <Stars value={TESTIMONIOS[0].r} />
                    <p className="font-display mt-5 text-2xl font-medium leading-snug sm:text-3xl">
                      “{TESTIMONIOS[0].c}”
                    </p>
                  </div>
                  <div className="mt-8">
                    <b className="font-poppins block text-lg">{TESTIMONIOS[0].n}</b>
                    <span className="text-sm text-[color:var(--pm-on-accent)]/80">
                      Cliente Antümalen
                    </span>
                  </div>
                </div>
              </Reveal>
              <div className="grid gap-6 lg:col-span-2">
                {TESTIMONIOS.slice(1).map((t) => (
                  <Reveal key={t.n} kind="up">
                    <div className="flex h-full flex-col justify-between rounded-3xl bg-[color:var(--pm-surface)] p-7 shadow-[0_4px_18px_rgba(92,75,59,0.06)]">
                      <div>
                        <Stars value={t.r} />
                        <p className="mt-4 text-[color:var(--pm-fg)]">“{t.c}”</p>
                      </div>
                      <div className="mt-5">
                        <b className="font-poppins text-sm text-[color:var(--pm-brown)]">
                          {t.n}
                        </b>
                        <p className="text-xs text-[color:var(--pm-muted)]">
                          Cliente Antümalen
                        </p>
                      </div>
                    </div>
                  </Reveal>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ---------- 8 · NOSOTROS (imagen a la izquierda) ---------- */}
        <section id="nosotros" className="px-5 pb-20 sm:px-8">
          <div className="mx-auto grid w-full max-w-7xl items-center gap-10 lg:grid-cols-2">
            <Reveal kind="scale">
              <Placeholder
                ratio="4 / 3"
                icon={Heart}
                label="Imagen editorial"
                src={ABOUT_IMG}
                alt="Mascota feliz"
                className="shadow-[0_24px_60px_rgba(92,75,59,0.16)]"
              />
            </Reveal>
            <Reveal>
              <span className="font-poppins text-xs font-semibold uppercase tracking-[0.18em] text-[color:var(--pm-accent-dark)]">
                Antümalen
              </span>
              <h2 className="font-display mt-3 text-3xl font-bold leading-tight text-[color:var(--pm-fg)] sm:text-4xl">
                Un emprendimiento familiar de San Clemente
              </h2>
              <p className="mt-4 max-w-md text-[color:var(--pm-muted)]">
                Cuidamos a tu mascota como parte de la familia: alimento,
                accesorios y asesoría cercana, con la confianza de quienes aman a
                los animales.
              </p>
              <div className="mt-6 flex flex-wrap gap-x-6 gap-y-3">
                {["Productos de calidad", "Atención personalizada", "Compra segura"].map(
                  (b) => (
                    <div
                      key={b}
                      className="flex items-center gap-2 text-sm text-[color:var(--pm-muted)]"
                    >
                      <Sparkle className="size-4 text-[color:var(--pm-sage-dark)]" weight="fill" />
                      {b}
                    </div>
                  ),
                )}
              </div>
              <a
                href={waLink("¡Hola Antümalen! Quiero más información.")}
                className="mt-7 inline-flex items-center gap-2 rounded-full bg-[color:var(--pm-fg)] px-6 py-3.5 font-poppins font-semibold text-[color:var(--pm-surface)] transition-transform hover:-translate-y-0.5"
              >
                Conversemos
              </a>
            </Reveal>
          </div>
        </section>

        {/* ---------- 9 · CTA final ---------- */}
        <section className="px-5 pb-24 sm:px-8">
          <Reveal
            kind="scale"
            className="mx-auto w-full max-w-7xl overflow-hidden rounded-[2rem] bg-[color:var(--pm-brown)] px-8 py-16 text-center text-[color:var(--pm-on-accent)] sm:py-20"
          >
            <h2 className="font-display text-3xl font-bold sm:text-4xl">
              ¿Listo para consentir a tu compañero?
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-[color:var(--pm-on-accent)]/85">
              Arma tu lista o escríbenos directo. Te asesoramos al instante para
              que tenga todo lo que necesita.
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <button
                type="button"
                onClick={() => setCartOpen(true)}
                className="inline-flex items-center justify-center gap-2 rounded-full bg-[color:var(--pm-surface)] px-8 py-4 font-poppins font-semibold text-[color:var(--pm-fg)] transition-transform hover:-translate-y-0.5"
              >
                Ver mi consulta
              </button>
              <a
                href={waLink("¡Hola Antümalen! Necesito ayuda para elegir.")}
                className="inline-flex items-center justify-center gap-2 rounded-full bg-[#25D366] px-8 py-4 font-poppins font-semibold text-white transition-transform hover:-translate-y-0.5"
              >
                Hablar por WhatsApp
              </a>
            </div>
          </Reveal>
        </section>
      </main>

      <PremiumFooter />
    </div>
  );
}
