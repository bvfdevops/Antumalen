"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Check, Palette, Type, X } from "lucide-react";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

/* ============================================================
   ThemeLab — panel de previsualización (izquierda, bajo el header)
   Cambia EN VIVO la paleta completa (fondo, texto, secundario,
   acento, placeholders) y las fuentes, escribiendo variables CSS
   sobre el contenedor .premium. Solo afecta la opción /premium.
   ============================================================ */

type Palette = {
  id: string;
  name: string;
  bg: string;
  surface: string;
  text: string;
  muted: string;
  accent: string;
  accentDark: string;
  heading: string;
  phA: string;
  phB: string;
  phFg: string;
};

const PALETTES: Palette[] = [
  { id: "salvia", name: "Salvia", bg: "#f3f7f2", surface: "#ffffff", text: "#243024", muted: "#6f7a6f", accent: "#7bae7f", accentDark: "#4f7d54", heading: "#2f4a33", phA: "#e6eee6", phB: "#d3e0d4", phFg: "#9fb3a1" },
  { id: "dorado", name: "Dorado", bg: "#f6f1e8", surface: "#ffffff", text: "#1c1814", muted: "#6b7280", accent: "#c9a86a", accentDark: "#8c6d35", heading: "#2a2118", phA: "#ece6da", phB: "#ddd4c4", phFg: "#b3a48f" },
  { id: "terracota", name: "Terracota", bg: "#fbf5f0", surface: "#ffffff", text: "#3a2820", muted: "#8a7163", accent: "#c2703d", accentDark: "#9c5527", heading: "#3a2820", phA: "#efe4db", phB: "#e0cdbf", phFg: "#bda692" },
  { id: "oceano", name: "Océano", bg: "#eef5f6", surface: "#ffffff", text: "#13282c", muted: "#5b7176", accent: "#2a9d8f", accentDark: "#1d7065", heading: "#13282c", phA: "#e0ebec", phB: "#ccdcde", phFg: "#9bb3b6" },
  { id: "lavanda", name: "Lavanda", bg: "#f5f3fb", surface: "#ffffff", text: "#272238", muted: "#6c6782", accent: "#8b7bd8", accentDark: "#5b4ca6", heading: "#272238", phA: "#e9e6f3", phB: "#d8d3e8", phFg: "#a9a3c0" },
  { id: "coral", name: "Coral", bg: "#fdf3f1", surface: "#ffffff", text: "#3a2422", muted: "#8a6f6b", accent: "#e76f51", accentDark: "#c14d31", heading: "#3a2422", phA: "#f3e3df", phB: "#e8cdc6", phFg: "#c4a59d" },
];

type FontSet = {
  id: string;
  name: string;
  sample: string;
  display: string;
  ui: string;
  body: string;
};

const FONTS: FontSet[] = [
  { id: "elegante", name: "Elegante", sample: "Playfair · Inter", display: "var(--font-playfair)", ui: "var(--font-poppins)", body: "var(--font-inter)" },
  { id: "moderno", name: "Moderno", sample: "Poppins · Inter", display: "var(--font-poppins)", ui: "var(--font-poppins)", body: "var(--font-inter)" },
  { id: "editorial", name: "Editorial", sample: "Fraunces · Nunito", display: "var(--font-fraunces)", ui: "var(--font-nunito)", body: "var(--font-nunito)" },
  { id: "geometrico", name: "Geométrico", sample: "Montserrat", display: "var(--font-montserrat)", ui: "var(--font-montserrat)", body: "var(--font-inter)" },
  { id: "serif-suave", name: "Serif suave", sample: "Lora · Poppins", display: "var(--font-lora)", ui: "var(--font-poppins)", body: "var(--font-inter)" },
];

const PALETTE_KEY = "pm_palette";
const FONT_KEY = "pm_fonts";

const COLOR_PROPS = [
  "--pm-bg", "--pm-surface", "--pm-fg", "--pm-muted", "--pm-accent",
  "--pm-accent-dark", "--pm-ph-a", "--pm-ph-b", "--pm-ph-fg",
  "--pm-cream", "--pm-ivory", "--pm-sage", "--pm-sage-dark",
  "--pm-gold", "--pm-gold-dark", "--pm-brown",
];
const FONT_PROPS = ["--pm-font-display", "--pm-font-ui", "--pm-font-body"];

function root() {
  return document.querySelector<HTMLElement>(".premium");
}

function applyPalette(p: Palette | null) {
  const el = root();
  if (!el) return;
  if (!p) {
    COLOR_PROPS.forEach((k) => el.style.removeProperty(k));
    return;
  }
  const set = (k: string, v: string) => el.style.setProperty(k, v);
  set("--pm-bg", p.bg);
  set("--pm-surface", p.surface);
  set("--pm-fg", p.text);
  set("--pm-muted", p.muted);
  set("--pm-accent", p.accent);
  set("--pm-accent-dark", p.accentDark);
  set("--pm-ph-a", p.phA);
  set("--pm-ph-b", p.phB);
  set("--pm-ph-fg", p.phFg);
  // Alias de tokens específicos de cada vista para reskin completo
  set("--pm-cream", p.bg);
  set("--pm-ivory", p.bg);
  set("--pm-sage", p.accent);
  set("--pm-sage-dark", p.accentDark);
  set("--pm-gold", p.accent);
  set("--pm-gold-dark", p.accentDark);
  set("--pm-brown", p.heading);
}

function applyFont(f: FontSet | null) {
  const el = root();
  if (!el) return;
  if (!f) {
    FONT_PROPS.forEach((k) => el.style.removeProperty(k));
    return;
  }
  el.style.setProperty("--pm-font-display", `${f.display}, Georgia, serif`);
  el.style.setProperty("--pm-font-ui", `${f.ui}, ui-sans-serif, sans-serif`);
  el.style.setProperty("--pm-font-body", `${f.body}, ui-sans-serif, system-ui, sans-serif`);
}

export function ThemeLab() {
  const [open, setOpen] = useState(false);
  const [palette, setPalette] = useState<string>("default");
  const [font, setFont] = useState<string>("default");

  // Restaurar selección guardada al montar (también tras cambiar de vista).
  useEffect(() => {
    const sp = localStorage.getItem(PALETTE_KEY) ?? "default";
    const sf = localStorage.getItem(FONT_KEY) ?? "default";
    setPalette(sp);
    setFont(sf);
    applyPalette(PALETTES.find((p) => p.id === sp) ?? null);
    applyFont(FONTS.find((f) => f.id === sf) ?? null);
  }, []);

  function choosePalette(id: string) {
    setPalette(id);
    localStorage.setItem(PALETTE_KEY, id);
    applyPalette(PALETTES.find((p) => p.id === id) ?? null);
  }
  function chooseFont(id: string) {
    setFont(id);
    localStorage.setItem(FONT_KEY, id);
    applyFont(FONTS.find((f) => f.id === id) ?? null);
  }

  return (
    <div className="fixed left-3 top-20 z-[55] sm:left-4 sm:top-24">
      {/* Lanzador */}
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-label="Personalizar tema"
        className="flex items-center gap-2 rounded-2xl bg-white/90 px-3.5 py-2.5 text-sm font-semibold text-[color:var(--pm-fg)] shadow-lg ring-1 ring-black/10 backdrop-blur transition-transform hover:-translate-y-0.5"
      >
        <Palette className="size-4 text-[color:var(--pm-accent-dark)]" />
        Tema
      </button>

      <AnimatePresence>
        {open ? (
          <motion.div
            initial={{ opacity: 0, x: -12, scale: 0.98 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: -12, scale: 0.98 }}
            transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="mt-3 max-h-[72vh] w-64 overflow-y-auto rounded-2xl bg-white/95 p-4 shadow-2xl ring-1 ring-black/10 backdrop-blur"
          >
            <div className="mb-3 flex items-center justify-between">
              <span className="font-poppins text-sm font-bold text-[color:var(--pm-fg)]">
                Personalizar
              </span>
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label="Cerrar"
                className="grid size-7 place-items-center rounded-full bg-black/5 hover:bg-black/10"
              >
                <X className="size-4 text-[color:var(--pm-fg)]" />
              </button>
            </div>

            {/* Paletas */}
            <div className="mb-2 flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-[color:var(--pm-muted)]">
              <Palette className="size-3.5" /> Paleta de colores
            </div>
            <div className="grid grid-cols-2 gap-2">
              <PaletteChip
                active={palette === "default"}
                onClick={() => choosePalette("default")}
                label="De la vista"
                colors={["#f6f1e8", "#c9a86a", "#1c1814"]}
              />
              {PALETTES.map((p) => (
                <PaletteChip
                  key={p.id}
                  active={palette === p.id}
                  onClick={() => choosePalette(p.id)}
                  label={p.name}
                  colors={[p.bg, p.accent, p.text]}
                />
              ))}
            </div>

            {/* Fuentes */}
            <div className="mb-2 mt-5 flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-[color:var(--pm-muted)]">
              <Type className="size-3.5" /> Tipografía
            </div>
            <div className="flex flex-col gap-1.5">
              <FontRow
                active={font === "default"}
                onClick={() => chooseFont("default")}
                name="De la vista"
                sample="Playfair · Inter"
              />
              {FONTS.map((f) => (
                <FontRow
                  key={f.id}
                  active={font === f.id}
                  onClick={() => chooseFont(f.id)}
                  name={f.name}
                  sample={f.sample}
                />
              ))}
            </div>

            <p className="mt-4 text-[0.7rem] leading-snug text-[color:var(--pm-muted)]">
              Panel de demo: prueba combinaciones de color y fuente. La selección
              se guarda en este navegador.
            </p>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}

function PaletteChip({
  active,
  onClick,
  label,
  colors,
}: {
  active: boolean;
  onClick: () => void;
  label: string;
  colors: [string, string, string];
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "relative flex flex-col gap-1.5 rounded-xl border p-2 text-left transition-all hover:-translate-y-0.5",
        active ? "border-[color:var(--pm-accent-dark)] ring-2 ring-[color:var(--pm-accent-dark)]/30" : "border-black/10",
      )}
    >
      <div className="flex gap-1">
        {colors.map((c, i) => (
          <span
            key={i}
            className="size-5 rounded-md ring-1 ring-black/10"
            style={{ background: c }}
          />
        ))}
      </div>
      <span className="text-xs font-medium text-[color:var(--pm-fg)]">{label}</span>
      {active ? (
        <Check className="absolute right-1.5 top-1.5 size-3.5 text-[color:var(--pm-accent-dark)]" />
      ) : null}
    </button>
  );
}

function FontRow({
  active,
  onClick,
  name,
  sample,
}: {
  active: boolean;
  onClick: () => void;
  name: string;
  sample: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "flex items-center justify-between rounded-xl border px-3 py-2 text-left transition-colors",
        active ? "border-[color:var(--pm-accent-dark)] bg-[color:var(--pm-accent)]/10" : "border-black/10 hover:bg-black/5",
      )}
    >
      <span>
        <span className="block text-sm font-semibold text-[color:var(--pm-fg)]">{name}</span>
        <span className="block text-[0.7rem] text-[color:var(--pm-muted)]">{sample}</span>
      </span>
      {active ? <Check className="size-4 text-[color:var(--pm-accent-dark)]" /> : null}
    </button>
  );
}
