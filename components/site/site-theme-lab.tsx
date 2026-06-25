"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Check, Palette, Type, X } from "lucide-react";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

/* ============================================================
   SiteThemeLab — panel de paleta + fuentes para el sitio actual (/).
   Reescribe los tokens semánticos (oklch -> hex) sobre <html>.
   El panel usa colores fijos para ser legible con cualquier tema.
   ============================================================ */

type Palette = {
  id: string;
  name: string;
  bg: string;
  surface: string;
  text: string;
  muted: string;
  accent: string;
  onAccent: string;
  border: string;
};

const PALETTES: Palette[] = [
  { id: "salvia", name: "Salvia", bg: "#f3f7f2", surface: "#ffffff", text: "#243024", muted: "#6f7a6f", accent: "#5f9163", onAccent: "#ffffff", border: "rgba(0,0,0,0.10)" },
  { id: "dorado", name: "Dorado", bg: "#f6f1e8", surface: "#ffffff", text: "#1c1814", muted: "#6b7280", accent: "#8c6d35", onAccent: "#ffffff", border: "rgba(0,0,0,0.10)" },
  { id: "petroleo", name: "Petróleo", bg: "#eef4f5", surface: "#ffffff", text: "#10282d", muted: "#5b7176", accent: "#0E5A6B", onAccent: "#ffffff", border: "rgba(0,0,0,0.10)" },
  { id: "terracota", name: "Terracota", bg: "#fbf5f0", surface: "#ffffff", text: "#3a2820", muted: "#8a7163", accent: "#9c5527", onAccent: "#ffffff", border: "rgba(0,0,0,0.10)" },
  { id: "lavanda", name: "Lavanda", bg: "#f5f3fb", surface: "#ffffff", text: "#272238", muted: "#6c6782", accent: "#5b4ca6", onAccent: "#ffffff", border: "rgba(0,0,0,0.10)" },
  { id: "coral", name: "Coral", bg: "#fdf3f1", surface: "#ffffff", text: "#3a2422", muted: "#8a6f6b", accent: "#c14d31", onAccent: "#ffffff", border: "rgba(0,0,0,0.10)" },
  { id: "carbon", name: "Carbón", bg: "#16161b", surface: "#20202a", text: "#f2f0ec", muted: "#a8a4ad", accent: "#d9a441", onAccent: "#1b1b1b", border: "rgba(255,255,255,0.12)" },
  { id: "medianoche", name: "Medianoche", bg: "#10141f", surface: "#1a2030", text: "#eef1f7", muted: "#9aa4ba", accent: "#5b9bd5", onAccent: "#0e1626", border: "rgba(255,255,255,0.12)" },
];

type FontSet = { id: string; name: string; sample: string; display?: string; body?: string };

const FONTS: FontSet[] = [
  { id: "default", name: "Original", sample: "Fraunces · Nunito" },
  { id: "elegante", name: "Elegante", sample: "Playfair · Inter", display: "var(--font-playfair)", body: "var(--font-inter)" },
  { id: "moderno", name: "Moderno", sample: "Poppins · Inter", display: "var(--font-poppins)", body: "var(--font-inter)" },
  { id: "geometrico", name: "Geométrico", sample: "Montserrat", display: "var(--font-montserrat)", body: "var(--font-inter)" },
  { id: "serif", name: "Serif suave", sample: "Lora · Nunito", display: "var(--font-lora)", body: "var(--font-nunito)" },
];

const PALETTE_KEY = "site_palette";
const FONT_KEY = "site_fonts";

const COLOR_PROPS = [
  "--background", "--foreground", "--card", "--card-foreground", "--popover",
  "--popover-foreground", "--primary", "--primary-foreground", "--secondary",
  "--secondary-foreground", "--muted", "--muted-foreground", "--accent",
  "--accent-foreground", "--border", "--input", "--ring", "--brand", "--brand-soft",
];
const FONT_PROPS = ["--font-fraunces", "--font-nunito"];

function applyPalette(p: Palette | null) {
  const s = document.documentElement.style;
  if (!p) {
    COLOR_PROPS.forEach((k) => s.removeProperty(k));
    return;
  }
  const set = (k: string, v: string) => s.setProperty(k, v);
  set("--background", p.bg);
  set("--foreground", p.text);
  set("--card", p.surface);
  set("--card-foreground", p.text);
  set("--popover", p.surface);
  set("--popover-foreground", p.text);
  set("--primary", p.accent);
  set("--primary-foreground", p.onAccent);
  set("--secondary", `color-mix(in srgb, ${p.text} 6%, ${p.bg})`);
  set("--secondary-foreground", p.text);
  set("--muted", `color-mix(in srgb, ${p.text} 5%, ${p.bg})`);
  set("--muted-foreground", p.muted);
  set("--accent", p.accent);
  set("--accent-foreground", p.onAccent);
  set("--border", p.border);
  set("--input", p.border);
  set("--ring", p.accent);
  set("--brand", p.accent);
  set("--brand-soft", `color-mix(in srgb, ${p.accent} 16%, ${p.bg})`);
}

function applyFont(f: FontSet | null) {
  const s = document.documentElement.style;
  if (!f || !f.display) {
    FONT_PROPS.forEach((k) => s.removeProperty(k));
    return;
  }
  s.setProperty("--font-fraunces", f.display);
  s.setProperty("--font-nunito", f.body ?? "var(--font-inter)");
}

export function SiteThemeLab() {
  const [open, setOpen] = useState(false);
  const [palette, setPalette] = useState("default");
  const [font, setFont] = useState("default");

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
    <div className="fixed left-3 top-20 z-40 sm:left-4">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-label="Personalizar tema"
        className="flex items-center gap-2 rounded-2xl bg-white/90 px-3.5 py-2.5 text-sm font-semibold text-zinc-800 shadow-lg ring-1 ring-zinc-900/10 backdrop-blur transition-transform hover:-translate-y-0.5"
      >
        <Palette className="size-4 text-zinc-600" />
        Tema
      </button>

      <AnimatePresence>
        {open ? (
          <motion.div
            initial={{ opacity: 0, x: -12, scale: 0.98 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: -12, scale: 0.98 }}
            transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="mt-3 max-h-[72vh] w-64 overflow-y-auto rounded-2xl bg-white/95 p-4 text-zinc-800 shadow-2xl ring-1 ring-zinc-900/10 backdrop-blur"
          >
            <div className="mb-3 flex items-center justify-between">
              <span className="text-sm font-bold text-zinc-900">Personalizar</span>
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label="Cerrar"
                className="grid size-7 place-items-center rounded-full bg-zinc-100 hover:bg-zinc-200"
              >
                <X className="size-4 text-zinc-700" />
              </button>
            </div>

            <div className="mb-2 flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-zinc-400">
              <Palette className="size-3.5" /> Paleta de colores
            </div>
            <div className="grid grid-cols-2 gap-2">
              <Chip active={palette === "default"} onClick={() => choosePalette("default")} label="De la marca" colors={["#0E5A6B", "#F5C518", "#0e2a30"]} />
              {PALETTES.map((p) => (
                <Chip key={p.id} active={palette === p.id} onClick={() => choosePalette(p.id)} label={p.name} colors={[p.bg, p.accent, p.text]} />
              ))}
            </div>

            <div className="mb-2 mt-5 flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-zinc-400">
              <Type className="size-3.5" /> Tipografía
            </div>
            <div className="flex flex-col gap-1.5">
              {FONTS.map((f) => (
                <Row key={f.id} active={font === f.id} onClick={() => chooseFont(f.id)} name={f.name} sample={f.sample} />
              ))}
            </div>

            <p className="mt-4 text-[0.7rem] leading-snug text-zinc-500">
              Panel de demo: prueba combinaciones. Se guarda en este navegador.
            </p>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}

function Chip({ active, onClick, label, colors }: { active: boolean; onClick: () => void; label: string; colors: [string, string, string] }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "relative flex flex-col gap-1.5 rounded-xl border p-2 text-left transition-all hover:-translate-y-0.5",
        active ? "border-zinc-900 ring-2 ring-zinc-900/20" : "border-zinc-200",
      )}
    >
      <div className="flex gap-1">
        {colors.map((c, i) => (
          <span key={i} className="size-5 rounded-md ring-1 ring-zinc-900/10" style={{ background: c }} />
        ))}
      </div>
      <span className="text-xs font-medium text-zinc-700">{label}</span>
      {active ? <Check className="absolute right-1.5 top-1.5 size-3.5 text-zinc-900" /> : null}
    </button>
  );
}

function Row({ active, onClick, name, sample }: { active: boolean; onClick: () => void; name: string; sample: string }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "flex items-center justify-between rounded-xl border px-3 py-2 text-left transition-colors",
        active ? "border-zinc-900 bg-zinc-100" : "border-zinc-200 hover:bg-zinc-50",
      )}
    >
      <span>
        <span className="block text-sm font-semibold text-zinc-800">{name}</span>
        <span className="block text-[0.7rem] text-zinc-500">{sample}</span>
      </span>
      {active ? <Check className="size-4 text-zinc-900" /> : null}
    </button>
  );
}
