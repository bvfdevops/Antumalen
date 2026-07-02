"use client";

/* ============================================================
   Antümalen — Landing V4 "Almacén" (index)
   Rediseño total: NO comparte lenguaje visual con /v1, /v2 ni
   /v3. Identidad "almacén de barrio editorial" con los colores
   reales de la marca (azul petróleo + amarillo dorado):

   - Papel cálido con trama de puntos, bordes de 2px, sombras
     duras desplazadas (nada de píldoras ni sombras difusas).
   - Fraunces (display) + Montserrat (UI) + Caveat (anotaciones
     manuscritas) en vez de Playfair/Poppins.
   - Navbar y footer propios (chrome.tsx), tarjeta de producto
     propia (sin ProductCard), categorías como índice numerado
     de filas, pasos como talón de boleta, testimonios en
     slider, FAQ en acordeón y ficha de horarios/ubicación.
   - Comparte solo la mecánica: store/carrito, cursor de huella
     y botón flotante de WhatsApp (heredan la paleta V4 vía los
     tokens --pm-* remapeados en globals.css).
   ============================================================ */

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  Bird,
  CaretDown,
  Cat,
  Check,
  Clock,
  Dog,
  Drop,
  Fish,
  MapPin,
  Minus,
  PawPrint,
  Plus,
  Quotes,
  Rabbit,
  ShoppingBag,
  WhatsappLogo,
} from "@phosphor-icons/react";
import { useEffect, useMemo, useState } from "react";
import { useStore } from "@/components/store-provider";
import { buildWhatsappLink, PRODUCTOS, type Producto } from "@/lib/data";
import { cn } from "@/lib/utils";
import { PetCursor } from "@/components/premium/cursor";
import { PremiumCart } from "@/components/premium/cart";
import { PremiumWhatsappFloat } from "@/components/premium/whatsapp-float";
import { Counter, Reveal } from "@/components/premium/primitives";
import { FooterV4, NavbarV4 } from "./chrome";

const waLink = buildWhatsappLink;

const CATEGORIAS = [
  { key: "perros", nombre: "Perros", icon: Dog },
  { key: "gatos", nombre: "Gatos", icon: Cat },
  { key: "aves", nombre: "Aves", icon: Bird },
  { key: "roedores", nombre: "Roedores", icon: Rabbit },
  { key: "peces", nombre: "Peces", icon: Fish },
  { key: "reptiles", nombre: "Reptiles", icon: PawPrint },
  { key: "higiene", nombre: "Higiene", icon: Drop },
  { key: "accesorios", nombre: "Accesorios", icon: ShoppingBag },
];

const PASOS = [
  {
    t: "Arma tu lista",
    d: "Recorre el catálogo y agrega lo que necesites. Es una lista de consulta: sin precios ni pagos en la web.",
  },
  {
    t: "Envíala por WhatsApp",
    d: "Un toque y tu lista completa nos llega al tiro, con tu nombre y observaciones si quieres.",
  },
  {
    t: "Recíbela en tu casa",
    d: "Te confirmamos disponibilidad y precios del día, y coordinamos el despacho en San Clemente y alrededores.",
  },
];

const STATS = [
  { to: 2200, suffix: "+", label: "clientes felices" },
  { to: 500, suffix: "+", label: "productos" },
  { to: 8000, suffix: "+", label: "pedidos entregados" },
  { to: 99, suffix: "%", label: "valoraciones positivas" },
];

const TESTIMONIOS = [
  { n: "Camila R.", c: "Pedí el alimento de mi perro y llegó el mismo día. Atención súper amable, de verdad se nota que quieren a los animales." },
  { n: "Matías P.", c: "Precios justos y la arena que me recomendaron es excelente. Volví a comprar y seguiré volviendo." },
  { n: "Valentina S.", c: "Encontré todo para mi pajarito en un solo lugar y el proceso por WhatsApp es rapidísimo." },
  { n: "Jorge M.", c: "Me asesoraron para cambiar a mi perro senior de alimento. Se nota que saben lo que venden." },
  { n: "Fernanda L.", c: "El heno para mi conejo siempre llega fresco. Pedir por WhatsApp es comodísimo." },
];

const FAQS = [
  {
    q: "¿Por qué no aparecen los precios en la web?",
    a: "Porque los precios de alimentos y accesorios cambian seguido. En vez de mostrarte un valor desactualizado, nos envías tu lista y te confirmamos el precio del día por WhatsApp, sin compromiso.",
  },
  {
    q: "¿Hasta dónde llegan los despachos?",
    a: "Despachamos en San Clemente y alrededores. Si estás un poco más lejos, escríbenos igual: muchas veces podemos coordinar una entrega.",
  },
  {
    q: "¿Cómo se paga?",
    a: "Como te acomode: en efectivo o por transferencia al momento de recibir tu pedido. No pagas nada por adelantado en la web.",
  },
  {
    q: "¿Pueden ayudarme a elegir un alimento?",
    a: "¡Claro! Cuéntanos la especie, edad y tamaño de tu mascota y te recomendamos opciones según tu presupuesto. Es lo que más nos gusta hacer.",
  },
  {
    q: "¿Tienen tienda física?",
    a: "Somos un emprendimiento familiar de San Clemente y trabajamos principalmente con pedidos por WhatsApp y despacho a domicilio.",
  },
];

const VISIBLES_INICIAL = 8;

/* Imágenes de referencia (Unsplash) — reemplazables por fotos reales. */
const U = (id: string, w = 800) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}&q=80`;
const HERO_A = U("1548199973-03cce0bbc87b", 900);
const HERO_B = U("1592194996308-7b43878e84a6", 500);
const ABOUT_IMG = U("1583337130417-3346a1be7dee", 800);

/* ------------------------------------------------------------
   Piezas propias de la V4
   ------------------------------------------------------------ */

/** Sello circular giratorio del hero (SVG + textPath). */
function SpinBadge() {
  return (
    <div className="absolute -bottom-7 -left-7 z-10 grid size-28 place-items-center rounded-full border-2 border-[color:var(--v4-ink)] bg-[color:var(--v4-gold)] shadow-[4px_4px_0_var(--v4-ink)] sm:size-32">
      <svg viewBox="0 0 100 100" className="v4-spin absolute inset-0 size-full" aria-hidden>
        <defs>
          <path
            id="v4-circle"
            d="M50,50 m-36,0 a36,36 0 1,1 72,0 a36,36 0 1,1 -72,0"
          />
        </defs>
        <text className="fill-[color:var(--v4-ink)] font-poppins text-[8.5px] font-bold uppercase" style={{ letterSpacing: "1.6px" }}>
          <textPath href="#v4-circle">
            Pedidos por WhatsApp · Despacho a domicilio ·
          </textPath>
        </text>
      </svg>
      <PawPrint className="size-8 text-[color:var(--v4-ink)]" weight="fill" />
    </div>
  );
}

/** Tarjeta de producto V4: borde duro, tag de categoría, botón cuadrado. */
function ProductTile({ producto }: { producto: Producto }) {
  const { add, inc } = useStore();
  const [qty, setQty] = useState(1);
  const [done, setDone] = useState(false);

  function handleAdd() {
    add(producto.id);
    for (let i = 1; i < qty; i++) inc(producto.id);
    setQty(1);
    setDone(true);
    setTimeout(() => setDone(false), 1400);
  }

  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-xl border-2 border-[color:var(--v4-ink)] bg-[color:var(--v4-surface)] transition-all duration-200 hover:-translate-x-1 hover:-translate-y-1 hover:shadow-[6px_6px_0_var(--v4-ink)]">
      <div className="relative overflow-hidden border-b-2 border-[color:var(--v4-ink)]">
        <span className="absolute left-2.5 top-2.5 z-10 rounded-md border-2 border-[color:var(--v4-ink)] bg-[color:var(--v4-paper)] px-2 py-0.5 font-poppins text-[0.62rem] font-bold uppercase tracking-[0.12em] text-[color:var(--v4-ink)]">
          {producto.categoria}
        </span>
        <div className="pm-ph" style={{ aspectRatio: "4 / 3" }}>
          {producto.imagen ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={producto.imagen}
              alt={producto.nombre}
              loading="lazy"
              decoding="async"
              className="absolute inset-0 z-[5] size-full object-cover transition-transform duration-300 group-hover:scale-[1.04]"
              onError={(e) => { e.currentTarget.style.display = "none"; }}
            />
          ) : null}
        </div>
      </div>

      <div className="flex flex-1 flex-col p-3.5 sm:p-4">
        <h3 className="font-display text-base font-bold leading-snug text-[color:var(--v4-ink)]">
          {producto.nombre}
        </h3>
        <p className="mt-1 line-clamp-2 flex-1 text-xs text-[color:var(--pm-muted)] sm:text-sm">
          {producto.desc}
        </p>

        <div className="mt-3.5 flex items-stretch gap-2">
          <div className="flex items-center rounded-md border-2 border-[color:var(--v4-ink)]">
            <button
              type="button"
              onClick={() => setQty((q) => Math.max(1, q - 1))}
              aria-label="Restar"
              className="grid size-8 place-items-center text-[color:var(--v4-ink)] transition-colors hover:bg-[color:var(--v4-gold)]/40"
            >
              <Minus className="size-3.5" weight="bold" />
            </button>
            <span className="min-w-6 text-center font-poppins text-sm font-bold text-[color:var(--v4-ink)]">
              {qty}
            </span>
            <button
              type="button"
              onClick={() => setQty((q) => q + 1)}
              aria-label="Sumar"
              className="grid size-8 place-items-center text-[color:var(--v4-ink)] transition-colors hover:bg-[color:var(--v4-gold)]/40"
            >
              <Plus className="size-3.5" weight="bold" />
            </button>
          </div>
          <button
            type="button"
            onClick={handleAdd}
            className={cn(
              "flex flex-1 items-center justify-center gap-1.5 rounded-md border-2 border-[color:var(--v4-ink)] font-poppins text-xs font-bold uppercase tracking-[0.08em] transition-colors sm:text-sm",
              done
                ? "bg-[#25D366] text-white"
                : "bg-[color:var(--v4-gold)] text-[color:var(--v4-ink)] hover:bg-[color:var(--v4-ink)] hover:text-[color:var(--v4-paper)]",
            )}
          >
            {done ? (
              <>
                <Check className="size-4" weight="bold" /> Listo
              </>
            ) : (
              <>
                <Plus className="size-4" weight="bold" /> Agregar
              </>
            )}
          </button>
        </div>
      </div>
    </article>
  );
}

/* ------------------------------------------------------------
   Vista principal
   ------------------------------------------------------------ */

export function PetsAlmacenView() {
  const { setMode, setCartOpen } = useStore();
  const reduced = useReducedMotion();
  useEffect(() => {
    setMode("tienda");
  }, [setMode]);

  /* ---- Catálogo ---- */
  const [cat, setCat] = useState("todos");
  const [verTodos, setVerTodos] = useState(false);

  const conteos = useMemo(() => {
    const map: Record<string, number> = { todos: PRODUCTOS.length };
    for (const p of PRODUCTOS) map[p.categoria] = (map[p.categoria] ?? 0) + 1;
    return map;
  }, []);

  const categoriasConStock = useMemo(
    () => CATEGORIAS.filter((c) => (conteos[c.key] ?? 0) > 0),
    [conteos],
  );

  const filtrados = useMemo(
    () => PRODUCTOS.filter((p) => cat === "todos" || p.categoria === cat),
    [cat],
  );
  const productos = verTodos ? filtrados : filtrados.slice(0, VISIBLES_INICIAL);

  /* ---- Slider de testimonios ---- */
  const [idx, setIdx] = useState(0);
  const [dir, setDir] = useState(1);
  const move = (d: number) => {
    setDir(d);
    setIdx((i) => (i + d + TESTIMONIOS.length) % TESTIMONIOS.length);
  };

  /* ---- FAQ ---- */
  const [faqOpen, setFaqOpen] = useState<number | null>(0);

  return (
    <div className="premium v4" data-view="mascotas">
      <PetCursor />
      <NavbarV4 />
      <PremiumCart />
      <PremiumWhatsappFloat />

      <main className="bg-[color:var(--v4-paper)]">
        {/* ---------- 1 · HERO ---------- */}
        <section
          id="inicio"
          className="v4-dots border-b-2 border-[color:var(--v4-ink)] px-5 pb-16 pt-32 sm:px-8 sm:pt-40 lg:pb-20"
        >
          <div className="mx-auto grid w-full max-w-7xl items-center gap-14 lg:grid-cols-[1.1fr_0.9fr]">
            <div>
              <Reveal kind="in">
                <span className="inline-block rounded-md border-2 border-[color:var(--v4-ink)] bg-[color:var(--v4-gold)] px-3 py-1 font-poppins text-[0.68rem] font-bold uppercase tracking-[0.16em] text-[color:var(--v4-ink)] shadow-[3px_3px_0_var(--v4-ink)]">
                  Tienda de mascotas · San Clemente
                </span>
                <h1 className="font-display mt-7 text-[2.6rem] font-black leading-[0.98] text-[color:var(--v4-ink)] sm:text-6xl lg:text-7xl">
                  Comida, juguetes y{" "}
                  <em className="relative whitespace-nowrap not-italic">
                    <span className="relative z-10 italic text-[color:var(--v4-petrol)]">
                      harto cariño
                    </span>
                    <span
                      className="absolute inset-x-0 bottom-[0.08em] -z-0 h-[0.32em] bg-[color:var(--v4-gold)]"
                      aria-hidden
                    />
                  </em>{" "}
                  para tu mascota
                </h1>
                <p className="mt-6 max-w-md text-base text-[color:var(--pm-muted)] sm:text-lg">
                  Armas tu lista en la web, la envías por WhatsApp y nosotros te
                  confirmamos precios del día y despachamos a tu casa. Así de
                  simple.
                </p>

                <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                  <a
                    href="#productos"
                    className="group inline-flex items-center justify-center gap-2 rounded-md border-2 border-[color:var(--v4-ink)] bg-[color:var(--v4-ink)] px-7 py-4 font-poppins text-sm font-bold uppercase tracking-[0.1em] text-[color:var(--v4-paper)] transition-all hover:-translate-y-0.5 hover:shadow-[5px_5px_0_var(--v4-gold-deep)]"
                  >
                    Ver catálogo
                    <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" weight="bold" />
                  </a>
                  <a
                    href={waLink("¡Hola Antümalen! Quiero hacer una consulta.")}
                    className="inline-flex items-center justify-center gap-2 rounded-md border-2 border-[color:var(--v4-ink)] bg-[color:var(--v4-surface)] px-7 py-4 font-poppins text-sm font-bold uppercase tracking-[0.1em] text-[color:var(--v4-ink)] transition-all hover:-translate-y-0.5 hover:shadow-[5px_5px_0_var(--v4-ink)]"
                  >
                    <WhatsappLogo className="size-5 text-[#1da851]" weight="fill" />
                    WhatsApp
                  </a>
                </div>

                <p className="font-hand mt-8 rotate-[-1.5deg] text-2xl text-[color:var(--v4-petrol)]">
                  Sin precios en la web → te los confirmamos al tiro, siempre al día ✓
                </p>
              </Reveal>
            </div>

            {/* Composición de fotos enmarcadas */}
            <Reveal kind="scale" delay={0.1}>
              <div className="relative mx-auto max-w-md lg:max-w-none">
                <div className="relative overflow-hidden rounded-xl border-2 border-[color:var(--v4-ink)] shadow-[8px_8px_0_var(--v4-ink)]">
                  <div className="pm-ph" style={{ aspectRatio: "4 / 4.6" }}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={HERO_A}
                      alt="Perro corriendo feliz"
                      className="absolute inset-0 z-[5] size-full object-cover"
                      onError={(e) => { e.currentTarget.style.display = "none"; }}
                    />
                  </div>
                </div>
                <div className="absolute -right-4 top-10 w-32 rotate-3 overflow-hidden rounded-lg border-2 border-[color:var(--v4-ink)] bg-[color:var(--v4-surface)] shadow-[5px_5px_0_var(--v4-ink)] sm:-right-8 sm:w-40">
                  <div className="pm-ph" style={{ aspectRatio: "4 / 5" }}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={HERO_B}
                      alt="Gato curioso"
                      loading="lazy"
                      decoding="async"
                      className="absolute inset-0 z-[5] size-full object-cover"
                      onError={(e) => { e.currentTarget.style.display = "none"; }}
                    />
                  </div>
                </div>
                <SpinBadge />
              </div>
            </Reveal>
          </div>

          {/* Cinta de datos */}
          <div className="mx-auto mt-16 w-full max-w-7xl">
            <Reveal>
              <div className="grid grid-cols-2 overflow-hidden rounded-xl border-2 border-[color:var(--v4-ink)] bg-[color:var(--v4-surface)] lg:grid-cols-4">
                {STATS.map((s, i) => (
                  <div
                    key={s.label}
                    className={cn(
                      "flex flex-col items-center gap-0.5 px-4 py-5 text-center",
                      i % 2 === 1 && "border-l-2 border-[color:var(--v4-ink)]",
                      i >= 2 && "border-t-2 border-[color:var(--v4-ink)] lg:border-t-0 lg:border-l-2",
                    )}
                  >
                    <span className="font-display text-3xl font-black text-[color:var(--v4-petrol)] sm:text-4xl">
                      <Counter to={s.to} suffix={s.suffix} />
                    </span>
                    <span className="font-poppins text-[0.68rem] font-bold uppercase tracking-[0.14em] text-[color:var(--pm-muted)]">
                      {s.label}
                    </span>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </section>

        {/* ---------- 2 · CATEGORÍAS (índice numerado) ---------- */}
        <section id="categorias" className="border-b-2 border-[color:var(--v4-ink)] px-5 py-20 sm:px-8">
          <div className="mx-auto w-full max-w-7xl">
            <Reveal>
              <div className="flex flex-wrap items-end justify-between gap-4">
                <h2 className="font-display text-4xl font-black text-[color:var(--v4-ink)] sm:text-5xl">
                  El índice
                </h2>
                <p className="font-hand text-2xl text-[color:var(--v4-petrol)]">
                  elige por tipo de mascota ↓
                </p>
              </div>
            </Reveal>

            <div className="mt-10 border-t-2 border-[color:var(--v4-ink)]">
              {categoriasConStock.map((c, i) => (
                <Reveal key={c.key} kind="in" delay={i * 0.03}>
                  <a
                    href="#productos"
                    onClick={() => {
                      setCat(c.key);
                      setVerTodos(false);
                    }}
                    className="group flex items-center gap-4 border-b-2 border-[color:var(--v4-ink)] py-5 transition-colors hover:bg-[color:var(--v4-ink)] sm:gap-8 sm:px-4"
                  >
                    <span className="font-poppins w-8 text-sm font-bold text-[color:var(--v4-gold-deep)] group-hover:text-[color:var(--v4-gold)]">
                      0{i + 1}
                    </span>
                    <c.icon
                      className="size-7 flex-none text-[color:var(--v4-petrol)] group-hover:text-[color:var(--v4-gold)] sm:size-9"
                      weight="bold"
                    />
                    <span className="font-display flex-1 text-2xl font-bold text-[color:var(--v4-ink)] group-hover:text-[color:var(--v4-paper)] sm:text-4xl">
                      {c.nombre}
                    </span>
                    <span className="font-poppins hidden text-xs font-bold uppercase tracking-[0.14em] text-[color:var(--pm-muted)] group-hover:text-[color:var(--v4-paper)]/70 sm:block">
                      {conteos[c.key]} productos
                    </span>
                    <ArrowUpRight
                      className="size-6 text-[color:var(--v4-ink)] transition-transform group-hover:rotate-45 group-hover:text-[color:var(--v4-gold)]"
                      weight="bold"
                    />
                  </a>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ---------- 3 · CATÁLOGO ---------- */}
        <section id="productos" className="border-b-2 border-[color:var(--v4-ink)] px-5 py-20 sm:px-8">
          <div className="mx-auto w-full max-w-7xl">
            <Reveal>
              <div className="flex flex-wrap items-end justify-between gap-4">
                <div>
                  <span className="font-poppins text-xs font-bold uppercase tracking-[0.18em] text-[color:var(--v4-gold-deep)]">
                    Catálogo
                  </span>
                  <h2 className="font-display mt-2 text-4xl font-black text-[color:var(--v4-ink)] sm:text-5xl">
                    La despensa
                  </h2>
                </div>
                <button
                  type="button"
                  onClick={() => setCartOpen(true)}
                  className="inline-flex items-center gap-2 rounded-md border-2 border-[color:var(--v4-ink)] bg-[color:var(--v4-surface)] px-5 py-3 font-poppins text-xs font-bold uppercase tracking-[0.1em] text-[color:var(--v4-ink)] transition-all hover:-translate-y-0.5 hover:shadow-[4px_4px_0_var(--v4-ink)]"
                >
                  <ShoppingBag className="size-4" weight="bold" /> Mi lista
                </button>
              </div>
            </Reveal>

            {/* Selector de categoría (tabs cuadradas) */}
            <div className="mt-8 flex flex-wrap gap-2">
              {[{ key: "todos", nombre: "Todo", icon: PawPrint }, ...categoriasConStock].map((f) => (
                <button
                  key={f.key}
                  type="button"
                  onClick={() => {
                    setCat(f.key);
                    setVerTodos(false);
                  }}
                  aria-pressed={cat === f.key}
                  className={cn(
                    "inline-flex items-center gap-1.5 rounded-md border-2 border-[color:var(--v4-ink)] px-3.5 py-2 font-poppins text-xs font-bold uppercase tracking-[0.08em] transition-all",
                    cat === f.key
                      ? "bg-[color:var(--v4-ink)] text-[color:var(--v4-paper)] shadow-[3px_3px_0_var(--v4-gold-deep)]"
                      : "bg-[color:var(--v4-surface)] text-[color:var(--v4-ink)] hover:-translate-y-0.5",
                  )}
                >
                  <f.icon className="size-4" weight="bold" />
                  {f.nombre}
                  <span className={cn("text-[0.65rem]", cat === f.key ? "text-[color:var(--v4-gold)]" : "text-[color:var(--pm-muted)]")}>
                    {conteos[f.key] ?? 0}
                  </span>
                </button>
              ))}
            </div>

            <motion.div layout className="mt-8 grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-4">
              <AnimatePresence mode="popLayout">
                {productos.map((p) => (
                  <motion.div
                    key={p.id}
                    layout={!reduced}
                    initial={{ opacity: 0, y: 14 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 14 }}
                    transition={{ duration: 0.25 }}
                    className="h-full"
                  >
                    <ProductTile producto={p} />
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>

            {filtrados.length > VISIBLES_INICIAL ? (
              <div className="mt-10 text-center">
                <button
                  type="button"
                  onClick={() => setVerTodos((v) => !v)}
                  className="inline-flex items-center gap-2 rounded-md border-2 border-[color:var(--v4-ink)] bg-[color:var(--v4-gold)] px-7 py-3.5 font-poppins text-sm font-bold uppercase tracking-[0.1em] text-[color:var(--v4-ink)] transition-all hover:-translate-y-0.5 hover:shadow-[5px_5px_0_var(--v4-ink)]"
                >
                  {verTodos ? "Mostrar menos" : `Ver todo (${filtrados.length})`}
                  <CaretDown className={cn("size-4 transition-transform", verTodos && "rotate-180")} weight="bold" />
                </button>
              </div>
            ) : null}
          </div>
        </section>

        {/* ---------- 4 · CÓMO PEDIR (talón de boleta, banda petróleo) ---------- */}
        <section id="como-pedir" className="border-b-2 border-[color:var(--v4-ink)] bg-[color:var(--v4-ink)] px-5 py-20 text-[color:var(--v4-paper)] sm:px-8">
          <div className="mx-auto w-full max-w-7xl">
            <Reveal>
              <div className="flex flex-wrap items-end justify-between gap-4">
                <h2 className="font-display text-4xl font-black sm:text-5xl">
                  Cómo pedir
                </h2>
                <p className="font-hand text-2xl text-[color:var(--v4-gold)]">
                  más fácil que enseñarle a sentarse
                </p>
              </div>
            </Reveal>

            <div className="mt-12 grid gap-y-10 md:grid-cols-3 md:gap-y-0">
              {PASOS.map((p, i) => (
                <Reveal key={p.t} delay={i * 0.08} className="relative md:px-8 first:md:pl-0 last:md:pr-0">
                  {i > 0 ? (
                    <span
                      className="absolute -top-5 left-0 right-0 border-t-2 border-dashed border-[color:var(--v4-paper)]/30 md:inset-y-0 md:left-0 md:right-auto md:border-l-2 md:border-t-0"
                      aria-hidden
                    />
                  ) : null}
                  <span className="font-display text-6xl font-black text-[color:var(--v4-gold)] sm:text-7xl">
                    {i + 1}
                  </span>
                  <h3 className="font-display mt-3 text-2xl font-bold">{p.t}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-[color:var(--v4-paper)]/75">
                    {p.d}
                  </p>
                </Reveal>
              ))}
            </div>

            <Reveal delay={0.2} className="mt-12">
              <a
                href={waLink("¡Hola Antümalen! Quiero hacer un pedido.")}
                className="inline-flex items-center gap-2 rounded-md border-2 border-[color:var(--v4-gold)] bg-[color:var(--v4-gold)] px-7 py-4 font-poppins text-sm font-bold uppercase tracking-[0.1em] text-[color:var(--v4-ink)] transition-all hover:-translate-y-0.5 hover:shadow-[5px_5px_0_rgba(240,180,41,0.35)]"
              >
                <WhatsappLogo className="size-5" weight="fill" /> Partir mi pedido
              </a>
            </Reveal>
          </div>
        </section>

        {/* ---------- 5 · TESTIMONIOS (slider de cita única) ---------- */}
        <section className="v4-dots border-b-2 border-[color:var(--v4-ink)] px-5 py-20 sm:px-8">
          <div className="mx-auto w-full max-w-4xl text-center">
            <Reveal>
              <Quotes className="mx-auto size-12 text-[color:var(--v4-gold-deep)]" weight="fill" />
            </Reveal>
            <div className="relative mt-6 min-h-44 sm:min-h-36">
              <AnimatePresence mode="wait" initial={false}>
                <motion.figure
                  key={idx}
                  initial={reduced ? { opacity: 0 } : { opacity: 0, x: 44 * dir }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={reduced ? { opacity: 0 } : { opacity: 0, x: -44 * dir }}
                  transition={{ duration: 0.3 }}
                >
                  <blockquote className="font-display text-2xl font-bold leading-snug text-[color:var(--v4-ink)] sm:text-3xl">
                    “{TESTIMONIOS[idx].c}”
                  </blockquote>
                  <figcaption className="font-hand mt-5 text-2xl text-[color:var(--v4-petrol)]">
                    — {TESTIMONIOS[idx].n}, cliente Antümalen
                  </figcaption>
                </motion.figure>
              </AnimatePresence>
            </div>

            <div className="mt-8 flex items-center justify-center gap-4">
              <button
                type="button"
                onClick={() => move(-1)}
                aria-label="Testimonio anterior"
                className="grid size-11 place-items-center rounded-md border-2 border-[color:var(--v4-ink)] bg-[color:var(--v4-surface)] text-[color:var(--v4-ink)] transition-all hover:-translate-y-0.5 hover:shadow-[3px_3px_0_var(--v4-ink)]"
              >
                <ArrowLeft className="size-5" weight="bold" />
              </button>
              <div className="flex gap-2">
                {TESTIMONIOS.map((_, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => {
                      setDir(i > idx ? 1 : -1);
                      setIdx(i);
                    }}
                    aria-label={`Ir al testimonio ${i + 1}`}
                    className={cn(
                      "size-2.5 rounded-sm border-2 border-[color:var(--v4-ink)] transition-colors",
                      i === idx ? "bg-[color:var(--v4-gold)]" : "bg-transparent",
                    )}
                  />
                ))}
              </div>
              <button
                type="button"
                onClick={() => move(1)}
                aria-label="Testimonio siguiente"
                className="grid size-11 place-items-center rounded-md border-2 border-[color:var(--v4-ink)] bg-[color:var(--v4-surface)] text-[color:var(--v4-ink)] transition-all hover:-translate-y-0.5 hover:shadow-[3px_3px_0_var(--v4-ink)]"
              >
                <ArrowRight className="size-5" weight="bold" />
              </button>
            </div>
          </div>
        </section>

        {/* ---------- 6 · NOSOTROS + FICHA ---------- */}
        <section id="nosotros" className="border-b-2 border-[color:var(--v4-ink)] px-5 py-20 sm:px-8">
          <div className="mx-auto grid w-full max-w-7xl items-center gap-12 lg:grid-cols-2">
            <Reveal>
              <span className="font-poppins text-xs font-bold uppercase tracking-[0.18em] text-[color:var(--v4-gold-deep)]">
                Nosotros
              </span>
              <h2 className="font-display mt-3 text-4xl font-black leading-[1.05] text-[color:var(--v4-ink)] sm:text-5xl">
                Un almacén de barrio, pero para mascotas
              </h2>
              <p className="mt-5 max-w-md text-[color:var(--pm-muted)]">
                Antümalen significa “niña del sol” en mapudungun. Somos un
                emprendimiento familiar de San Clemente y atendemos como se
                atiende en el barrio: conociendo a cada mascota por su nombre y
                recomendando solo lo que usaríamos con las nuestras.
              </p>

              <div className="mt-8 grid gap-4 sm:grid-cols-2">
                <div className="rounded-xl border-2 border-[color:var(--v4-ink)] bg-[color:var(--v4-surface)] p-5">
                  <MapPin className="size-6 text-[color:var(--v4-petrol)]" weight="bold" />
                  <h3 className="font-display mt-2 text-lg font-bold text-[color:var(--v4-ink)]">
                    Dónde
                  </h3>
                  <p className="mt-1 text-sm text-[color:var(--pm-muted)]">
                    San Clemente, Región del Maule. Despacho a domicilio en la
                    comuna y alrededores.
                  </p>
                </div>
                <div className="rounded-xl border-2 border-[color:var(--v4-ink)] bg-[color:var(--v4-surface)] p-5">
                  <Clock className="size-6 text-[color:var(--v4-petrol)]" weight="bold" />
                  <h3 className="font-display mt-2 text-lg font-bold text-[color:var(--v4-ink)]">
                    Cuándo
                  </h3>
                  <p className="mt-1 text-sm text-[color:var(--pm-muted)]">
                    Lunes a sábado, 10:00 a 20:00 hrs. Respondemos WhatsApp
                    durante todo el día.
                  </p>
                </div>
              </div>
            </Reveal>

            <Reveal kind="scale" delay={0.1}>
              <div className="relative mx-auto max-w-md lg:max-w-none">
                <div className="overflow-hidden rounded-xl border-2 border-[color:var(--v4-ink)] shadow-[8px_8px_0_var(--v4-gold)]">
                  <div className="pm-ph" style={{ aspectRatio: "4 / 3" }}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={ABOUT_IMG}
                      alt="Perro con lentes, con actitud"
                      loading="lazy"
                      decoding="async"
                      className="absolute inset-0 z-[5] size-full object-cover"
                      onError={(e) => { e.currentTarget.style.display = "none"; }}
                    />
                  </div>
                </div>
                <p className="font-hand absolute -bottom-6 right-4 rotate-[-2deg] text-2xl text-[color:var(--v4-petrol)]">
                  ← el jefe de calidad
                </p>
              </div>
            </Reveal>
          </div>
        </section>

        {/* ---------- 7 · PREGUNTAS FRECUENTES ---------- */}
        <section id="preguntas" className="border-b-2 border-[color:var(--v4-ink)] px-5 py-20 sm:px-8">
          <div className="mx-auto grid w-full max-w-7xl gap-10 lg:grid-cols-[0.8fr_1.2fr]">
            <Reveal className="lg:sticky lg:top-32 lg:h-fit">
              <span className="font-poppins text-xs font-bold uppercase tracking-[0.18em] text-[color:var(--v4-gold-deep)]">
                Preguntas frecuentes
              </span>
              <h2 className="font-display mt-3 text-4xl font-black text-[color:var(--v4-ink)] sm:text-5xl">
                Lo que siempre nos preguntan
              </h2>
              <p className="mt-4 max-w-sm text-[color:var(--pm-muted)]">
                ¿Tienes otra duda? Escríbenos por WhatsApp y te respondemos al
                tiro.
              </p>
            </Reveal>

            <div className="flex flex-col gap-3">
              {FAQS.map((f, i) => {
                const abierto = faqOpen === i;
                return (
                  <Reveal key={f.q} kind="in" delay={i * 0.04}>
                    <div
                      className={cn(
                        "overflow-hidden rounded-xl border-2 border-[color:var(--v4-ink)] transition-shadow",
                        abierto
                          ? "bg-[color:var(--v4-surface)] shadow-[5px_5px_0_var(--v4-gold)]"
                          : "bg-[color:var(--v4-surface)]",
                      )}
                    >
                      <button
                        type="button"
                        onClick={() => setFaqOpen(abierto ? null : i)}
                        aria-expanded={abierto}
                        className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left"
                      >
                        <span className="font-display text-lg font-bold text-[color:var(--v4-ink)]">
                          {f.q}
                        </span>
                        <span
                          className={cn(
                            "grid size-8 flex-none place-items-center rounded-md border-2 border-[color:var(--v4-ink)] transition-all",
                            abierto
                              ? "rotate-180 bg-[color:var(--v4-gold)]"
                              : "bg-[color:var(--v4-paper)]",
                          )}
                        >
                          <CaretDown className="size-4 text-[color:var(--v4-ink)]" weight="bold" />
                        </span>
                      </button>
                      <AnimatePresence initial={false}>
                        {abierto ? (
                          <motion.div
                            initial={reduced ? { opacity: 0 } : { height: 0, opacity: 0 }}
                            animate={reduced ? { opacity: 1 } : { height: "auto", opacity: 1 }}
                            exit={reduced ? { opacity: 0 } : { height: 0, opacity: 0 }}
                            transition={{ duration: 0.28 }}
                          >
                            <p className="border-t-2 border-dashed border-[color:var(--v4-line)] px-5 py-4 text-sm leading-relaxed text-[color:var(--pm-muted)]">
                              {f.a}
                            </p>
                          </motion.div>
                        ) : null}
                      </AnimatePresence>
                    </div>
                  </Reveal>
                );
              })}
            </div>
          </div>
        </section>

        {/* ---------- 8 · CTA FINAL (banda dorada) ---------- */}
        <section className="v4-dots-dark bg-[color:var(--v4-gold)] px-5 py-20 text-center sm:px-8 sm:py-24">
          <div className="mx-auto w-full max-w-3xl">
            <Reveal>
              <p className="font-hand text-3xl text-[color:var(--v4-ink)]/80">
                ¿tu mascota ya eligió?
              </p>
              <h2 className="font-display mt-2 text-4xl font-black leading-[1.02] text-[color:var(--v4-ink)] sm:text-6xl">
                Mándanos tu lista y listo
              </h2>
              <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
                <button
                  type="button"
                  onClick={() => setCartOpen(true)}
                  className="inline-flex items-center justify-center gap-2 rounded-md border-2 border-[color:var(--v4-ink)] bg-[color:var(--v4-paper)] px-8 py-4 font-poppins text-sm font-bold uppercase tracking-[0.1em] text-[color:var(--v4-ink)] transition-all hover:-translate-y-0.5 hover:shadow-[5px_5px_0_var(--v4-ink)]"
                >
                  <ShoppingBag className="size-5" weight="bold" /> Ver mi lista
                </button>
                <a
                  href={waLink("¡Hola Antümalen! Necesito ayuda para elegir.")}
                  className="inline-flex items-center justify-center gap-2 rounded-md border-2 border-[color:var(--v4-ink)] bg-[color:var(--v4-ink)] px-8 py-4 font-poppins text-sm font-bold uppercase tracking-[0.1em] text-[color:var(--v4-paper)] transition-all hover:-translate-y-0.5 hover:shadow-[5px_5px_0_var(--v4-paper)]"
                >
                  <WhatsappLogo className="size-5 text-[#25D366]" weight="fill" />
                  Hablar por WhatsApp
                </a>
              </div>
            </Reveal>
          </div>
        </section>
      </main>

      <FooterV4 />
    </div>
  );
}
