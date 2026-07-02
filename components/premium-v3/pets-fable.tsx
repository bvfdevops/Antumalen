"use client";

/* ============================================================
   Antümalen — Landing V3 "Fable" (index)
   Reutiliza el MISMO ecosistema premium (Navbar, ThemeLab,
   PetCursor, Cart, WhatsApp, Footer, ProductCard) pero lleva
   las herramientas ya instaladas un paso más allá:

   - Motion ligado al scroll (useScroll/useTransform/useSpring):
     barra de progreso, parallax en hero y "nosotros", línea de
     progreso en "Cómo funciona".
   - Reveal del titular palabra por palabra.
   - Botón magnético (CTA WhatsApp) y tilt 3D en la imagen del
     hero — solo puntero fino, off con reduced-motion.
   - Catálogo filtrable con animaciones de layout
     (AnimatePresence popLayout) y "mostrar más" para no pintar
     46 tarjetas de golpe en móvil.
   - Lottie de mascota visible en la página (no solo en el
     carrito vacío).
   - Marquee de testimonios y chips de categorías (CSS, pausa
     al hover, off con reduced-motion).

   Estructura: hero → marquee categorías → catálogo filtrable →
   cómo funciona (sticky + línea de progreso) → stats (banda
   oscura) → testimonios (marquee) → nosotros → cta final.
   ============================================================ */

import {
  AnimatePresence,
  motion,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
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
import { useEffect, useMemo, useRef, useState } from "react";
import { useStore } from "@/components/store-provider";
import { buildWhatsappLink, PRODUCTOS } from "@/lib/data";
import { cn } from "@/lib/utils";
import { Navbar } from "@/components/premium/navbar";
import { PremiumCart } from "@/components/premium/cart";
import { PremiumFooter } from "@/components/premium/footer";
import { PetCursor } from "@/components/premium/cursor";
import { LottiePet } from "@/components/premium/lottie-pet";
import { ThemeLab } from "@/components/premium/theme-lab";
import { PremiumWhatsappFloat } from "@/components/premium/whatsapp-float";
import { ProductCard } from "@/components/premium/product-card";
import {
  Counter,
  Placeholder,
  Reveal,
  SectionHead,
  Stars,
} from "@/components/premium/primitives";

const waLink = buildWhatsappLink;

const EASE = [0.22, 1, 0.36, 1] as const;

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
    icon: ListChecks,
    t: "Arma tu lista",
    d: "Recorre el catálogo y agrega todo lo que te interese. Sin precios: es una lista de consulta, no un cobro.",
  },
  {
    icon: ChatCircleDots,
    t: "Envíala por WhatsApp",
    d: "Con un toque nos llega tu lista completa. Puedes sumar tu nombre, dirección y observaciones.",
  },
  {
    icon: Check,
    t: "Te confirmamos y despachamos",
    d: "Respondemos con disponibilidad y precios actualizados, y coordinamos el despacho a tu casa.",
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
  { n: "Camila R.", c: "Pedí el alimento de mi perro y llegó el mismo día. Atención súper amable.", r: 5 },
  { n: "Matías P.", c: "Precios justos y la arena que me recomendaron es excelente. Volví a comprar.", r: 5 },
  { n: "Valentina S.", c: "Encontré todo para mi pajarito en un solo lugar. Proceso rapidísimo.", r: 5 },
  { n: "Jorge M.", c: "Me asesoraron para cambiar a mi perro senior de alimento. Se nota que saben.", r: 5 },
  { n: "Fernanda L.", c: "El heno para mi conejo siempre llega fresco. Pedir por WhatsApp es comodísimo.", r: 5 },
];

const BADGES: Record<number, string> = { 0: "Popular", 3: "Nuevo", 6: "Oferta" };
const VISIBLES_INICIAL = 8;

/* Imágenes de referencia (Unsplash) — reemplazables por fotos reales. */
const U = (id: string, w = 800) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}&q=80`;
const HERO_IMG = U("1517849845537-4d257902454a", 900);
const ABOUT_IMG = U("1450778869180-41d0601e046e", 900);
const AVATARS = [
  U("1561037404-61cd46aa615b", 120),
  U("1574158622682-e40e69881006", 120),
  U("1438761681033-6461ffad8d80", 120),
];

/* ------------------------------------------------------------
   Utilidades de interacción (Motion). Todas se apagan con
   prefers-reduced-motion y las de puntero solo corren con
   puntero fino (desktop).
   ------------------------------------------------------------ */

function useFinePointer() {
  const [fine, setFine] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(pointer: fine)");
    const update = () => setFine(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);
  return fine;
}

/** Barra de progreso de lectura, teñida con el acento del ThemeLab. */
function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 140, damping: 26, mass: 0.3 });
  const reduced = useReducedMotion();
  if (reduced) return null;
  return (
    <motion.div
      aria-hidden
      style={{ scaleX }}
      className="fixed inset-x-0 top-0 z-[70] h-[3px] origin-left bg-[color:var(--pm-accent-dark)]"
    />
  );
}

/** Envuelve un bloque y lo desplaza suavemente con el scroll (parallax). */
function Parallax({
  children,
  className,
  from = 36,
  to = -36,
}: {
  children: React.ReactNode;
  className?: string;
  from?: number;
  to?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [from, to]);
  return (
    <motion.div ref={ref} style={reduced ? undefined : { y }} className={className}>
      {children}
    </motion.div>
  );
}

/** Botón/elemento magnético: se acerca al puntero con inercia. */
function Magnetic({
  children,
  className,
  strength = 0.25,
}: {
  children: React.ReactNode;
  className?: string;
  strength?: number;
}) {
  const reduced = useReducedMotion();
  const fine = useFinePointer();
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 260, damping: 20, mass: 0.5 });
  const sy = useSpring(y, { stiffness: 260, damping: 20, mass: 0.5 });
  const active = fine && !reduced;

  return (
    <motion.div
      className={cn("inline-flex", className)}
      style={active ? { x: sx, y: sy } : undefined}
      onPointerMove={(e) => {
        if (!active) return;
        const r = e.currentTarget.getBoundingClientRect();
        x.set((e.clientX - (r.left + r.width / 2)) * strength);
        y.set((e.clientY - (r.top + r.height / 2)) * strength);
      }}
      onPointerLeave={() => {
        x.set(0);
        y.set(0);
      }}
    >
      {children}
    </motion.div>
  );
}

/** Tilt 3D sutil que sigue al puntero (solo desktop). */
function Tilt({
  children,
  className,
  max = 7,
}: {
  children: React.ReactNode;
  className?: string;
  max?: number;
}) {
  const reduced = useReducedMotion();
  const fine = useFinePointer();
  const rx = useMotionValue(0);
  const ry = useMotionValue(0);
  const srx = useSpring(rx, { stiffness: 180, damping: 18 });
  const sry = useSpring(ry, { stiffness: 180, damping: 18 });
  const active = fine && !reduced;

  return (
    <motion.div
      className={className}
      style={
        active
          ? { rotateX: srx, rotateY: sry, transformPerspective: 900 }
          : undefined
      }
      onPointerMove={(e) => {
        if (!active) return;
        const r = e.currentTarget.getBoundingClientRect();
        ry.set(((e.clientX - r.left) / r.width - 0.5) * max * 2);
        rx.set(-((e.clientY - r.top) / r.height - 0.5) * max * 2);
      }}
      onPointerLeave={() => {
        rx.set(0);
        ry.set(0);
      }}
    >
      {children}
    </motion.div>
  );
}

/** Titular que aparece palabra por palabra. */
function WordReveal({
  segments,
  className,
}: {
  segments: { text: string; className?: string }[];
  className?: string;
}) {
  const reduced = useReducedMotion();
  const words = segments.flatMap((s) =>
    s.text.split(" ").map((w) => ({ w, className: s.className })),
  );
  return (
    <motion.h1
      className={className}
      initial={reduced ? false : "hidden"}
      animate="show"
      variants={{ show: { transition: { staggerChildren: 0.055 } } }}
    >
      {words.map((item, i) => (
        <span key={i} className="inline-block overflow-hidden pb-[0.12em] -mb-[0.12em] align-bottom">
          <motion.span
            className={cn("inline-block", item.className)}
            variants={{
              hidden: { y: "105%", opacity: 0 },
              show: { y: 0, opacity: 1, transition: { duration: 0.6, ease: EASE } },
            }}
          >
            {item.w}
          </motion.span>
          {i < words.length - 1 ? " " : null}
        </span>
      ))}
    </motion.h1>
  );
}

/* ------------------------------------------------------------
   Vista principal
   ------------------------------------------------------------ */

export function PetsFableView() {
  const { setMode, setCartOpen } = useStore();
  useEffect(() => {
    setMode("tienda");
  }, [setMode]);

  /* ---- Parallax del hero ---- */
  const heroRef = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress: heroProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const heroImgY = useTransform(heroProgress, [0, 1], [0, 70]);
  const heroTextY = useTransform(heroProgress, [0, 1], [0, -40]);

  /* ---- Línea de progreso de "Cómo funciona" ---- */
  const pasosRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress: pasosProgress } = useScroll({
    target: pasosRef,
    offset: ["start 0.75", "end 0.55"],
  });
  const lineScale = useSpring(pasosProgress, { stiffness: 120, damping: 24 });

  /* ---- Filtro del catálogo ---- */
  const [cat, setCat] = useState("todos");
  const [verTodos, setVerTodos] = useState(false);

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

  const filtrados = useMemo(
    () => PRODUCTOS.filter((p) => p.categoria === cat || cat === "todos"),
    [cat],
  );
  const productos = verTodos ? filtrados : filtrados.slice(0, VISIBLES_INICIAL);

  return (
    <div className="premium" data-view="mascotas">
      <PetCursor />
      <ScrollProgress />
      <Navbar />
      <ThemeLab />
      <PremiumCart />
      <PremiumWhatsappFloat />

      <main>
        {/* ---------- 1 · HERO (parallax + reveal por palabra) ---------- */}
        <section
          ref={heroRef}
          id="inicio"
          className="relative overflow-hidden bg-[color:var(--pm-cream)] px-5 pb-20 pt-28 sm:px-8 sm:pt-32 lg:pb-28 lg:pt-36"
        >
          <div className="pm-mesh" aria-hidden />
          <div className="relative z-10 mx-auto grid w-full max-w-7xl items-center gap-12 lg:grid-cols-[1.05fr_0.95fr]">
            <motion.div style={reduced ? undefined : { y: heroTextY }}>
              <Reveal kind="in">
                <span className="inline-flex items-center gap-2 rounded-full bg-[color:var(--pm-surface)] px-4 py-1.5 font-poppins text-xs font-semibold uppercase tracking-[0.18em] text-[color:var(--pm-accent-dark)] shadow-sm">
                  <PawPrint className="size-3.5" weight="fill" />
                  San Clemente · Región del Maule
                </span>
              </Reveal>

              <WordReveal
                className="font-display mt-6 text-4xl font-extrabold leading-[1.05] text-[color:var(--pm-brown)] sm:text-5xl lg:text-6xl xl:text-7xl"
                segments={[
                  { text: "El bienestar de" },
                  { text: "tu mejor amigo,", className: "text-[color:var(--pm-accent-dark)]" },
                  { text: "en un solo lugar" },
                ]}
              />

              <Reveal kind="in" delay={0.45}>
                <p className="mt-6 max-w-lg text-base text-[color:var(--pm-muted)] sm:text-lg">
                  Alimento, accesorios y cuidado para perros, gatos, aves y más.
                  Arma tu lista, envíala por WhatsApp y recíbela en tu casa —
                  los precios los conversamos ahí, siempre actualizados.
                </p>

                <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
                  <Magnetic>
                    <a
                      href={waLink("¡Hola Antümalen! Quiero hacer una consulta.")}
                      className="inline-flex items-center justify-center gap-2 rounded-full bg-[#25D366] px-7 py-4 font-poppins font-semibold text-white shadow-lg shadow-[#25D366]/30 transition-transform hover:-translate-y-0.5"
                    >
                      Consultar por WhatsApp
                    </a>
                  </Magnetic>
                  <a
                    href="#productos"
                    className="group inline-flex items-center justify-center gap-2 rounded-full bg-[color:var(--pm-fg)] px-7 py-4 font-poppins font-semibold text-[color:var(--pm-surface)] transition-transform hover:-translate-y-0.5"
                  >
                    Ver catálogo
                    <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" weight="bold" />
                  </a>
                </div>

                {/* Prueba social compacta */}
                <div className="mt-9 flex items-center gap-4">
                  <div className="flex -space-x-3">
                    {AVATARS.map((src, i) => (
                      <div
                        key={src}
                        className="pm-ph size-10 overflow-hidden rounded-full ring-2 ring-[color:var(--pm-cream)]"
                      >
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={src}
                          alt={`Cliente ${i + 1}`}
                          loading="lazy"
                          decoding="async"
                          className="size-full object-cover"
                          onError={(e) => { e.currentTarget.style.display = "none"; }}
                        />
                      </div>
                    ))}
                  </div>
                  <div>
                    <Stars value={5} />
                    <p className="mt-0.5 text-sm text-[color:var(--pm-muted)]">
                      <b className="text-[color:var(--pm-fg)]">+2.200</b> familias confían en nosotros
                    </p>
                  </div>
                </div>
              </Reveal>
            </motion.div>

            {/* Imagen con tilt + tarjetas flotantes */}
            <Reveal kind="scale" delay={0.15}>
              <motion.div style={reduced ? undefined : { y: heroImgY }} className="relative">
                <Tilt>
                  <Placeholder
                    ratio="4 / 5"
                    icon={PawPrint}
                    label="Foto principal"
                    src={HERO_IMG}
                    alt="Perro mirando a cámara"
                    className="shadow-[0_30px_70px_rgba(92,75,59,0.18)]"
                  />
                </Tilt>

                <div className="v3-float absolute -left-4 top-8 flex items-center gap-3 rounded-2xl bg-[color:var(--pm-surface)] px-4 py-3 shadow-[0_16px_40px_rgba(92,75,59,0.16)] sm:-left-8">
                  <div className="grid size-10 place-items-center rounded-xl bg-[color:var(--pm-accent)]/15 text-[color:var(--pm-accent-dark)]">
                    <Truck className="size-5" weight="duotone" />
                  </div>
                  <div>
                    <b className="font-poppins block text-sm text-[color:var(--pm-brown)]">Despacho a domicilio</b>
                    <span className="text-xs text-[color:var(--pm-muted)]">San Clemente y alrededores</span>
                  </div>
                </div>

                <div className="v3-float v3-float--late absolute -right-3 bottom-10 flex items-center gap-3 rounded-2xl bg-[color:var(--pm-surface)] px-4 py-3 shadow-[0_16px_40px_rgba(92,75,59,0.16)] sm:-right-6">
                  <div className="grid size-10 place-items-center rounded-xl bg-[color:var(--pm-accent)]/15 text-[color:var(--pm-accent-dark)]">
                    <ShieldCheck className="size-5" weight="duotone" />
                  </div>
                  <div>
                    <b className="font-poppins block text-sm text-[color:var(--pm-brown)]">Marcas originales</b>
                    <span className="text-xs text-[color:var(--pm-muted)]">Stock siempre fresco</span>
                  </div>
                </div>
              </motion.div>
            </Reveal>
          </div>
        </section>

        {/* ---------- 2 · CATEGORÍAS (marquee) ---------- */}
        <section id="categorias" className="border-y border-[color:var(--pm-border)] bg-[color:var(--pm-surface)] py-5">
          <div className="overflow-hidden">
            <div className="v3-marquee items-center gap-10 px-5">
              {[...CATEGORIAS, ...CATEGORIAS].map((c, i) => (
                <a
                  key={`${c.nombre}-${i}`}
                  href="#productos"
                  className="group flex shrink-0 items-center gap-2.5 text-[color:var(--pm-muted)] transition-colors hover:text-[color:var(--pm-accent-dark)]"
                >
                  <c.icon className="size-5 text-[color:var(--pm-accent-dark)]" weight="duotone" />
                  <span className="font-poppins whitespace-nowrap text-sm font-semibold uppercase tracking-[0.14em]">
                    {c.nombre}
                  </span>
                  <PawPrint className="ml-6 size-3 text-[color:var(--pm-border)]" weight="fill" aria-hidden />
                </a>
              ))}
            </div>
          </div>
        </section>

        {/* ---------- 3 · CATÁLOGO (filtro con layout animado) ---------- */}
        <section id="productos" className="bg-[#f2efe9] px-5 py-20 sm:px-8">
          <div className="mx-auto w-full max-w-7xl">
            <SectionHead
              eyebrow="El catálogo"
              title="Lo que tu compañero necesita"
              subtitle="Filtra por tipo de mascota, agrega a tu lista y consulta disponibilidad por WhatsApp."
            />

            {/* Chips de filtro */}
            <div className="mb-10 flex flex-wrap justify-center gap-2">
              {filtros.map((f) => (
                <button
                  key={f.key}
                  type="button"
                  onClick={() => {
                    setCat(f.key);
                    setVerTodos(false);
                  }}
                  aria-pressed={cat === f.key}
                  className={cn(
                    "relative inline-flex items-center gap-1.5 rounded-full border px-4 py-2 font-poppins text-sm font-semibold transition-colors",
                    cat === f.key
                      ? "border-transparent text-[color:var(--pm-surface)]"
                      : "border-[color:var(--pm-border)] bg-[color:var(--pm-surface)] text-[color:var(--pm-brown)] hover:border-[color:var(--pm-accent)]",
                  )}
                >
                  {cat === f.key ? (
                    <motion.span
                      layoutId="v3-chip"
                      className="absolute inset-0 rounded-full bg-[color:var(--pm-fg)]"
                      transition={{ type: "spring", stiffness: 400, damping: 32 }}
                    />
                  ) : null}
                  <f.icon className="relative z-10 size-4" weight="duotone" />
                  <span className="relative z-10">{f.label}</span>
                </button>
              ))}
            </div>

            {/* Grid con animación de layout al filtrar */}
            <motion.div layout className="grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-4">
              <AnimatePresence mode="popLayout">
                {productos.map((p, i) => (
                  <motion.div
                    key={p.id}
                    layout
                    initial={{ opacity: 0, scale: 0.92 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.92 }}
                    transition={{ duration: 0.3, ease: EASE }}
                    className="h-full"
                  >
                    <ProductCard
                      producto={p}
                      badge={cat === "todos" ? BADGES[i] : undefined}
                      phLabel="Producto"
                      icon={PawPrint}
                      image={p.imagen}
                    />
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>

            {filtrados.length > VISIBLES_INICIAL ? (
              <div className="mt-10 text-center">
                <button
                  type="button"
                  onClick={() => setVerTodos((v) => !v)}
                  className="inline-flex items-center gap-2 rounded-full border border-[color:var(--pm-border)] bg-[color:var(--pm-surface)] px-7 py-3.5 font-poppins font-semibold text-[color:var(--pm-brown)] transition-all hover:-translate-y-0.5 hover:border-[color:var(--pm-accent)]"
                >
                  {verTodos
                    ? "Mostrar menos"
                    : `Ver los ${filtrados.length} productos`}
                  <ArrowRight
                    className={cn("size-4 transition-transform", verTodos && "-rotate-90")}
                    weight="bold"
                  />
                </button>
              </div>
            ) : null}
          </div>
        </section>

        {/* ---------- 4 · CÓMO FUNCIONA (sticky + línea de progreso) ---------- */}
        <section className="px-5 py-24 sm:px-8">
          <div className="mx-auto grid w-full max-w-7xl gap-12 lg:grid-cols-[0.9fr_1.1fr]">
            <div className="lg:sticky lg:top-28 lg:h-fit">
              <Reveal>
                <span className="font-poppins text-xs font-semibold uppercase tracking-[0.18em] text-[color:var(--pm-accent-dark)]">
                  Comprar es fácil
                </span>
                <h2 className="font-display mt-3 text-3xl font-bold leading-[1.1] text-[color:var(--pm-fg)] sm:text-4xl md:text-5xl">
                  Tu pedido en tres pasos
                </h2>
                <p className="mt-4 max-w-md text-[color:var(--pm-muted)]">
                  No mostramos precios en la web: así te damos siempre el valor
                  más actualizado y coordinamos todo por WhatsApp, sin vueltas.
                </p>
                <LottiePet className="mt-6 w-40 sm:w-48" />
                <button
                  type="button"
                  onClick={() => setCartOpen(true)}
                  className="mt-4 inline-flex items-center gap-2 rounded-full bg-[color:var(--pm-fg)] px-6 py-3.5 font-poppins font-semibold text-[color:var(--pm-surface)] transition-transform hover:-translate-y-0.5"
                >
                  <ShoppingBag className="size-4" weight="bold" /> Ver mi consulta
                </button>
              </Reveal>
            </div>

            <div ref={pasosRef} className="relative pl-10 sm:pl-14">
              {/* Riel + línea que se llena con el scroll */}
              <div className="absolute bottom-8 left-[15px] top-2 w-px bg-[color:var(--pm-border)] sm:left-[19px]" aria-hidden />
              <motion.div
                aria-hidden
                style={reduced ? undefined : { scaleY: lineScale }}
                className={cn(
                  "absolute bottom-8 left-[15px] top-2 w-px origin-top bg-[color:var(--pm-accent-dark)] sm:left-[19px]",
                  reduced && "scale-y-100",
                )}
              />
              <div className="flex flex-col gap-10">
                {PASOS.map((p, i) => (
                  <Reveal key={p.t} delay={i * 0.05}>
                    <div className="relative">
                      <span className="absolute -left-10 top-1 grid size-8 place-items-center rounded-full bg-[color:var(--pm-accent)]/15 font-poppins text-sm font-bold text-[color:var(--pm-accent-dark)] ring-4 ring-[color:var(--pm-bg)] sm:-left-14 sm:size-10">
                        {i + 1}
                      </span>
                      <div className="rounded-3xl border border-[color:var(--pm-border)] bg-[color:var(--pm-surface)] p-7 transition-transform hover:-translate-y-1">
                        <div className="grid size-12 place-items-center rounded-2xl bg-[color:var(--pm-accent)]/15 text-[color:var(--pm-accent-dark)]">
                          <p.icon className="size-6" weight="duotone" />
                        </div>
                        <h3 className="font-poppins mt-4 text-lg font-semibold text-[color:var(--pm-brown)]">
                          {p.t}
                        </h3>
                        <p className="mt-2 text-sm text-[color:var(--pm-muted)]">{p.d}</p>
                      </div>
                    </div>
                  </Reveal>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ---------- 5 · STATS + BENEFICIOS (banda oscura) ---------- */}
        <section className="px-5 pb-24 sm:px-8">
          <Reveal
            kind="scale"
            className="relative mx-auto w-full max-w-7xl overflow-hidden rounded-[2rem] bg-[color:var(--pm-fg)] px-8 py-14 text-[color:var(--pm-surface)] sm:px-12"
          >
            <div className="pm-mesh opacity-25" aria-hidden />
            <div className="relative z-10">
              <div className="grid grid-cols-2 gap-8 lg:grid-cols-4">
                {STATS.map((s) => (
                  <div key={s.label} className="text-center">
                    <div className="font-display text-4xl font-extrabold text-[color:var(--pm-accent)] sm:text-5xl">
                      <Counter to={s.to} suffix={s.suffix} />
                    </div>
                    <p className="mt-2 text-sm text-[color:var(--pm-surface)]/70">{s.label}</p>
                  </div>
                ))}
              </div>
              <div className="mt-12 grid gap-x-8 gap-y-6 border-t border-white/10 pt-10 sm:grid-cols-2 lg:grid-cols-4">
                {BENEFICIOS.map((b) => (
                  <div key={b.t} className="flex items-start gap-3">
                    <b.icon className="mt-0.5 size-6 flex-none text-[color:var(--pm-accent)]" weight="duotone" />
                    <div>
                      <b className="font-poppins block text-sm">{b.t}</b>
                      <span className="text-sm text-[color:var(--pm-surface)]/65">{b.d}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        </section>

        {/* ---------- 6 · TESTIMONIOS (marquee) ---------- */}
        <section className="pb-24">
          <div className="mx-auto mb-10 w-full max-w-7xl px-5 sm:px-8">
            <SectionHead
              eyebrow="Familias felices"
              title="Lo que dicen nuestros clientes"
            />
          </div>
          <div className="overflow-hidden">
            <div className="v3-marquee v3-marquee--slow gap-5 px-5">
              {[...TESTIMONIOS, ...TESTIMONIOS].map((t, i) => (
                <figure
                  key={`${t.n}-${i}`}
                  className="flex w-[300px] shrink-0 flex-col rounded-3xl bg-[color:var(--pm-surface)] p-6 shadow-[0_4px_18px_rgba(92,75,59,0.06)] sm:w-[360px] sm:p-7"
                >
                  <Stars value={t.r} />
                  <blockquote className="mt-4 flex-1 text-sm text-[color:var(--pm-fg)] sm:text-base">
                    “{t.c}”
                  </blockquote>
                  <figcaption className="mt-5 flex items-center gap-3">
                    <div className="pm-ph size-11 overflow-hidden rounded-full">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={AVATARS[i % AVATARS.length]}
                        alt={t.n}
                        loading="lazy"
                        decoding="async"
                        className="size-full object-cover"
                        onError={(e) => { e.currentTarget.style.display = "none"; }}
                      />
                    </div>
                    <div>
                      <b className="font-poppins text-sm text-[color:var(--pm-brown)]">{t.n}</b>
                      <p className="text-xs text-[color:var(--pm-muted)]">Cliente Antümalen</p>
                    </div>
                  </figcaption>
                </figure>
              ))}
            </div>
          </div>
        </section>

        {/* ---------- 7 · NOSOTROS (parallax en la imagen) ---------- */}
        <section id="nosotros" className="px-5 pb-24 sm:px-8">
          <div className="mx-auto grid w-full max-w-7xl items-center gap-10 lg:grid-cols-2">
            <Parallax from={28} to={-28}>
              <Placeholder
                ratio="4 / 3"
                icon={Heart}
                label="Imagen editorial"
                src={ABOUT_IMG}
                alt="Persona paseando a su perro"
                className="shadow-[0_24px_60px_rgba(92,75,59,0.16)]"
              />
            </Parallax>
            <Reveal>
              <span className="font-poppins text-xs font-semibold uppercase tracking-[0.18em] text-[color:var(--pm-accent-dark)]">
                Antümalen
              </span>
              <h2 className="font-display mt-3 text-3xl font-bold leading-tight text-[color:var(--pm-fg)] sm:text-4xl">
                Un emprendimiento familiar de San Clemente
              </h2>
              <p className="mt-4 max-w-md text-[color:var(--pm-muted)]">
                Cuidamos a tu mascota como parte de la familia: alimento,
                accesorios y asesoría cercana, con la confianza de quienes aman
                a los animales.
              </p>
              <ul className="mt-6 flex flex-col gap-3">
                {["Productos de calidad", "Atención personalizada", "Compra segura"].map((b) => (
                  <li key={b} className="flex items-center gap-2.5 text-sm text-[color:var(--pm-fg)]">
                    <span className="grid size-6 flex-none place-items-center rounded-full bg-[color:var(--pm-accent)]/15 text-[color:var(--pm-accent-dark)]">
                      <Sparkle className="size-3.5" weight="fill" />
                    </span>
                    {b}
                  </li>
                ))}
              </ul>
              <a
                href={waLink("¡Hola Antümalen! Quiero más información.")}
                className="mt-7 inline-flex items-center gap-2 rounded-full bg-[color:var(--pm-fg)] px-6 py-3.5 font-poppins font-semibold text-[color:var(--pm-surface)] transition-transform hover:-translate-y-0.5"
              >
                Conversemos
              </a>
            </Reveal>
          </div>
        </section>

        {/* ---------- 8 · CTA FINAL ---------- */}
        <section className="px-5 pb-24 sm:px-8">
          <Reveal
            kind="scale"
            className="relative mx-auto w-full max-w-7xl overflow-hidden rounded-[2rem] bg-[color:var(--pm-accent)] px-8 py-16 text-center text-[color:var(--pm-on-accent)] sm:py-20"
          >
            <PawPrint
              className="pointer-events-none absolute -left-8 -top-8 size-44 rotate-[-18deg] text-white/10"
              weight="fill"
              aria-hidden
            />
            <PawPrint
              className="pointer-events-none absolute -bottom-10 -right-6 size-52 rotate-[14deg] text-white/10"
              weight="fill"
              aria-hidden
            />
            <div className="relative z-10">
              <h2 className="font-display text-3xl font-bold sm:text-4xl">
                ¿Listo para consentir a tu compañero?
              </h2>
              <p className="mx-auto mt-4 max-w-xl text-[color:var(--pm-on-accent)]/90">
                Arma tu lista o escríbenos directo. Te asesoramos al instante
                para que tenga todo lo que necesita.
              </p>
              <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
                <button
                  type="button"
                  onClick={() => setCartOpen(true)}
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-[color:var(--pm-surface)] px-8 py-4 font-poppins font-semibold text-[color:var(--pm-fg)] transition-transform hover:-translate-y-0.5"
                >
                  Ver mi consulta
                </button>
                <Magnetic>
                  <a
                    href={waLink("¡Hola Antümalen! Necesito ayuda para elegir.")}
                    className="inline-flex items-center justify-center gap-2 rounded-full bg-[#1da851] px-8 py-4 font-poppins font-semibold text-white shadow-lg shadow-black/10 transition-transform hover:-translate-y-0.5"
                  >
                    Hablar por WhatsApp
                  </a>
                </Magnetic>
              </div>
            </div>
          </Reveal>
        </section>
      </main>

      <PremiumFooter />
    </div>
  );
}
