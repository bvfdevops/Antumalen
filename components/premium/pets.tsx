"use client";

import {
  Bird,
  Cat,
  Dog,
  Droplets,
  Fish,
  Headset,
  Heart,
  PawPrint,
  Rabbit,
  ShieldCheck,
  ShoppingBag,
  Sparkles,
  Truck,
} from "lucide-react";
import { useEffect } from "react";
import { useStore } from "@/components/store-provider";
import { PRODUCTOS } from "@/lib/data";
import { PremiumFooter } from "./footer";
import { Navbar } from "./navbar";
import { PremiumCart } from "./cart";
import {
  Counter,
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

const CATEGORIAS = [
  { nombre: "Perros", icon: Dog },
  { nombre: "Gatos", icon: Cat },
  { nombre: "Aves", icon: Bird },
  { nombre: "Roedores", icon: Rabbit },
  { nombre: "Peces", icon: Fish },
  { nombre: "Reptiles", icon: PawPrint },
  { nombre: "Higiene", icon: Droplets },
  { nombre: "Accesorios", icon: ShoppingBag },
];

const BENEFICIOS = [
  { icon: Truck, t: "Envíos rápidos", d: "Despacho a domicilio en San Clemente y alrededores." },
  { icon: ShieldCheck, t: "Productos originales", d: "Solo marcas reconocidas y stock fresco." },
  { icon: Heart, t: "Compra segura", d: "Paga al recibir o por transferencia, sin vueltas." },
  { icon: Headset, t: "Atención personalizada", d: "Te asesoramos por WhatsApp para elegir mejor." },
];

const STATS = [
  { to: 2200, suffix: "+", label: "Clientes felices" },
  { to: 500, suffix: "+", label: "Productos" },
  { to: 8000, suffix: "+", label: "Pedidos completados" },
  { to: 99, suffix: "%", label: "Valoraciones positivas" },
];

const TESTIMONIOS = [
  { n: "Camila R.", c: "Pedí el alimento de mi perro y llegó el mismo día. Atención súper amable.", r: 5 },
  { n: "Matías P.", c: "Precios justos y la arena que me recomendaron es excelente. Volví a comprar.", r: 5 },
  { n: "Valentina S.", c: "Encontré todo para mi pajarito en un solo lugar. Proceso rapidísimo.", r: 5 },
];

const BADGES: Record<number, string> = { 0: "Popular", 2: "Nuevo", 4: "Oferta" };
const featured = PRODUCTOS.slice(0, 8);

export function PetsView() {
  const { setMode, setCartOpen } = useStore();
  useEffect(() => {
    setMode("tienda");
  }, [setMode]);

  return (
    <div className="premium" data-view="mascotas">
      <Navbar view="mascotas" />
      <ThemeLab />
      <PremiumCart />
      <PremiumWhatsappFloat view="mascotas" />

      <main>
        {/* ---------- HERO ---------- */}
        <section
          id="inicio"
          className="relative overflow-hidden bg-[color:var(--pm-cream)] px-5 pb-16 pt-28 sm:px-8 sm:pt-32 lg:pb-24 lg:pt-36"
        >
          <div
            className="pointer-events-none absolute -right-32 -top-24 size-[520px] rounded-full opacity-50 blur-3xl"
            style={{
              background:
                "radial-gradient(circle, rgba(123,174,127,0.4), transparent 65%)",
            }}
          />
          <div className="mx-auto grid w-full max-w-7xl items-center gap-12 lg:grid-cols-2">
            <Reveal>
              <span className="font-poppins text-xs font-semibold uppercase tracking-[0.18em] text-[color:var(--pm-sage-dark)]">
                San Clemente · Región del Maule
              </span>
              <h1 className="font-display mt-4 text-4xl font-extrabold leading-[1.05] text-[color:var(--pm-brown)] sm:text-5xl lg:text-6xl">
                Todo para el bienestar de{" "}
                <span className="text-[color:var(--pm-sage-dark)]">
                  tu mejor amigo
                </span>
              </h1>
              <p className="mt-5 max-w-lg text-base text-[color:var(--pm-muted)] sm:text-lg">
                Alimentos premium, accesorios y cuidado pensado con amor para
                perros, gatos, aves y más. Pide en pocos pasos y recíbelo en
                casa.
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <a
                  href={waLink("¡Hola Antümalen! 🐾 Quiero comprar.")}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-[#25D366] px-7 py-4 font-poppins font-semibold text-white shadow-lg shadow-[#25D366]/30 transition-transform hover:-translate-y-0.5"
                >
                  Comprar por WhatsApp
                </a>
                <a
                  href="#productos"
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-[color:var(--pm-fg)] px-7 py-4 font-poppins font-semibold text-[color:var(--pm-surface)] transition-transform hover:-translate-y-0.5"
                >
                  Ver productos
                </a>
              </div>
              <div className="mt-9 grid grid-cols-2 gap-x-6 gap-y-3 sm:grid-cols-4">
                {["Productos de calidad", "Envíos rápidos", "Atención personalizada", "Compra segura"].map(
                  (b) => (
                    <div
                      key={b}
                      className="flex items-center gap-2 text-sm text-[color:var(--pm-muted)]"
                    >
                      <Sparkles className="size-4 flex-none text-[color:var(--pm-sage-dark)]" />
                      {b}
                    </div>
                  ),
                )}
              </div>
            </Reveal>

            <Reveal kind="scale" delay={0.1}>
              <Placeholder
                ratio="4 / 5"
                icon={PawPrint}
                label="Foto principal"
                className="shadow-[0_30px_70px_rgba(92,75,59,0.18)]"
              />
            </Reveal>
          </div>
        </section>

        {/* ---------- CATEGORÍAS ---------- */}
        <section id="categorias" className="px-5 py-20 sm:px-8">
          <div className="mx-auto w-full max-w-7xl">
            <SectionHead
              eyebrow="Explora por mascota"
              title="Categorías"
              subtitle="Encuentra rápido lo que tu compañero necesita."
            />
            <Stagger className="grid grid-cols-2 gap-5 sm:grid-cols-4 lg:grid-cols-8">
              {CATEGORIAS.map((c) => (
                <StaggerItem key={c.nombre}>
                  <a
                    href="#productos"
                    className="group flex flex-col items-center gap-3"
                  >
                    <div className="grid size-20 place-items-center rounded-full bg-[color:var(--pm-surface)] shadow-[0_8px_24px_rgba(92,75,59,0.08)] transition-all duration-300 group-hover:-translate-y-1.5 group-hover:scale-105 group-hover:shadow-[0_16px_36px_rgba(92,75,59,0.16)] sm:size-24">
                      <c.icon className="size-8 text-[color:var(--pm-sage-dark)]" strokeWidth={1.6} />
                    </div>
                    <span className="font-poppins text-sm font-medium text-[color:var(--pm-brown)]">
                      {c.nombre}
                    </span>
                  </a>
                </StaggerItem>
              ))}
            </Stagger>
          </div>
        </section>

        {/* ---------- PRODUCTOS DESTACADOS ---------- */}
        <section id="productos" className="bg-[#f2efe9] px-5 py-20 sm:px-8">
          <div className="mx-auto w-full max-w-7xl">
            <SectionHead
              eyebrow="Lo más pedido"
              title="Productos destacados"
              subtitle="Agrega al carrito y finaliza tu pedido por WhatsApp."
            />
            <Stagger className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {featured.map((p, i) => (
                <StaggerItem key={p.id} className="h-full">
                  <ProductCard producto={p} badge={BADGES[i]} phLabel="Producto" icon={PawPrint} />
                </StaggerItem>
              ))}
            </Stagger>
          </div>
        </section>

        {/* ---------- BENEFICIOS ---------- */}
        <section className="px-5 py-20 sm:px-8">
          <div className="mx-auto w-full max-w-7xl">
            <Stagger className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {BENEFICIOS.map((b) => (
                <StaggerItem key={b.t}>
                  <div className="flex h-full items-start gap-4 rounded-3xl bg-[color:var(--pm-surface)] p-6 shadow-[0_4px_18px_rgba(92,75,59,0.06)] transition-transform hover:-translate-y-1">
                    <div className="grid size-12 flex-none place-items-center rounded-2xl bg-[color:var(--pm-sage)]/15 text-[color:var(--pm-sage-dark)]">
                      <b.icon className="size-6" strokeWidth={1.7} />
                    </div>
                    <div>
                      <h3 className="font-poppins text-base font-semibold text-[color:var(--pm-brown)]">
                        {b.t}
                      </h3>
                      <p className="mt-1 text-sm text-[color:var(--pm-muted)]">{b.d}</p>
                    </div>
                  </div>
                </StaggerItem>
              ))}
            </Stagger>
          </div>
        </section>

        {/* ---------- PROMOCIONAL / NOSOTROS ---------- */}
        <section id="nosotros" className="px-5 py-20 sm:px-8">
          <div className="mx-auto grid w-full max-w-7xl items-center gap-10 overflow-hidden rounded-[2rem] bg-[color:var(--pm-fg)] p-8 text-[color:var(--pm-surface)] sm:p-12 lg:grid-cols-2">
            <Reveal>
              <span className="font-poppins text-xs font-semibold uppercase tracking-[0.18em] text-[color:var(--pm-surface)]/70">
                Antümalen
              </span>
              <h2 className="font-display mt-3 text-3xl font-bold leading-tight sm:text-4xl">
                Todo lo que necesitan en un solo lugar
              </h2>
              <p className="mt-4 max-w-md text-[color:var(--pm-surface)]/75">
                Somos un emprendimiento familiar de San Clemente. Cuidamos a tu
                mascota como parte de la familia: alimento, accesorios y
                asesoría cercana, con la confianza de quienes aman a los
                animales.
              </p>
              <a
                href={waLink("¡Hola Antümalen! 🐾 Quiero más información.")}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 inline-flex items-center gap-2 rounded-full bg-[color:var(--pm-surface)] px-6 py-3 font-poppins font-semibold text-[color:var(--pm-fg)] transition-transform hover:-translate-y-0.5"
              >
                Conversemos
              </a>
            </Reveal>
            <Reveal kind="scale" delay={0.1}>
              <Placeholder
                ratio="4 / 3"
                icon={Heart}
                label="Imagen editorial"
                className="bg-white/10"
              />
            </Reveal>
          </div>
        </section>

        {/* ---------- ESTADÍSTICAS ---------- */}
        <section className="px-5 pb-4 sm:px-8">
          <div className="mx-auto grid w-full max-w-7xl grid-cols-2 gap-6 lg:grid-cols-4">
            {STATS.map((s) => (
              <Reveal key={s.label} kind="scale" className="text-center">
                <div className="font-display text-4xl font-extrabold text-[color:var(--pm-sage-dark)] sm:text-5xl">
                  <Counter to={s.to} suffix={s.suffix} />
                </div>
                <p className="mt-2 text-sm text-[color:var(--pm-muted)]">{s.label}</p>
              </Reveal>
            ))}
          </div>
        </section>

        {/* ---------- TESTIMONIOS ---------- */}
        <section className="px-5 py-20 sm:px-8">
          <div className="mx-auto w-full max-w-7xl">
            <SectionHead eyebrow="Familias felices" title="Lo que dicen nuestros clientes" />
            <Stagger className="grid grid-cols-1 gap-6 md:grid-cols-3">
              {TESTIMONIOS.map((t) => (
                <StaggerItem key={t.n}>
                  <div className="flex h-full flex-col rounded-3xl bg-[color:var(--pm-surface)] p-7 shadow-[0_4px_18px_rgba(92,75,59,0.06)]">
                    <Stars value={t.r} />
                    <p className="mt-4 flex-1 text-[color:var(--pm-fg)]">“{t.c}”</p>
                    <div className="mt-5 flex items-center gap-3">
                      <div className="pm-ph size-12 rounded-full" />
                      <div>
                        <b className="font-poppins text-sm text-[color:var(--pm-brown)]">{t.n}</b>
                        <p className="text-xs text-[color:var(--pm-muted)]">Cliente Antümalen</p>
                      </div>
                    </div>
                  </div>
                </StaggerItem>
              ))}
            </Stagger>
          </div>
        </section>

        {/* ---------- CTA ---------- */}
        <section className="px-5 pb-24 sm:px-8">
          <Reveal
            kind="scale"
            className="mx-auto w-full max-w-7xl overflow-hidden rounded-[2rem] bg-[color:var(--pm-sage)] px-8 py-16 text-center text-[color:var(--pm-on-accent)] sm:py-20"
          >
            <h2 className="font-display text-3xl font-bold sm:text-4xl">
              ¿Necesitas ayuda para elegir el producto ideal?
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-[color:var(--pm-on-accent)]/90">
              Escríbenos y te asesoramos al instante para que tu mejor amigo
              tenga todo lo que necesita.
            </p>
            <button
              type="button"
              onClick={() => setCartOpen(true)}
              className="mt-8 inline-flex items-center justify-center gap-2 rounded-full bg-[color:var(--pm-surface)] px-8 py-4 font-poppins font-semibold text-[color:var(--pm-fg)] transition-transform hover:-translate-y-0.5"
            >
              Ver mi pedido
            </button>
            <a
              href={waLink("¡Hola Antümalen! 🐾 Necesito ayuda para elegir.")}
              target="_blank"
              rel="noopener noreferrer"
              className="ml-3 mt-8 inline-flex items-center justify-center gap-2 rounded-full bg-[#1da851] px-8 py-4 font-poppins font-semibold text-white transition-transform hover:-translate-y-0.5"
            >
              Hablar por WhatsApp
            </a>
          </Reveal>
        </section>
      </main>

      <PremiumFooter view="mascotas" />
    </div>
  );
}
