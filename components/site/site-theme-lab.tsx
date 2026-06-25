"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Check, Type, X } from "lucide-react";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

/* ============================================================
   SiteThemeLab — panel de tipografía para el sitio (/inicio).
   (El selector de paleta se retiró: solo cambia las fuentes.)
   ============================================================ */

type FontSet = { id: string; name: string; sample: string; display?: string; body?: string };

const FONTS: FontSet[] = [
  { id: "default", name: "Original", sample: "Fraunces · Nunito" },
  { id: "elegante", name: "Elegante", sample: "Playfair · Inter", display: "var(--font-playfair)", body: "var(--font-inter)" },
  { id: "moderno", name: "Moderno", sample: "Poppins · Inter", display: "var(--font-poppins)", body: "var(--font-inter)" },
  { id: "geometrico", name: "Geométrico", sample: "Montserrat", display: "var(--font-montserrat)", body: "var(--font-inter)" },
  { id: "serif", name: "Serif suave", sample: "Lora · Nunito", display: "var(--font-lora)", body: "var(--font-nunito)" },
];

const FONT_KEY = "site_fonts";
const FONT_PROPS = ["--font-fraunces", "--font-nunito"];
// Limpia overrides de color que pudieran haber quedado de versiones anteriores.
const LEGACY_COLOR_PROPS = [
  "--background", "--foreground", "--card", "--card-foreground", "--popover",
  "--popover-foreground", "--primary", "--primary-foreground", "--secondary",
  "--secondary-foreground", "--muted", "--muted-foreground", "--accent",
  "--accent-foreground", "--border", "--input", "--ring", "--brand", "--brand-soft",
];

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
  const [font, setFont] = useState("default");

  useEffect(() => {
    // Quitar cualquier paleta guardada previamente.
    const s = document.documentElement.style;
    LEGACY_COLOR_PROPS.forEach((k) => s.removeProperty(k));
    try {
      localStorage.removeItem("site_palette");
    } catch {
      /* ignore */
    }
    const sf = localStorage.getItem(FONT_KEY) ?? "default";
    setFont(sf);
    applyFont(FONTS.find((f) => f.id === sf) ?? null);
  }, []);

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
        aria-label="Cambiar tipografía"
        className="flex items-center gap-2 rounded-2xl bg-white/90 px-3.5 py-2.5 text-sm font-semibold text-zinc-800 shadow-lg ring-1 ring-zinc-900/10 backdrop-blur transition-transform hover:-translate-y-0.5"
      >
        <Type className="size-4 text-zinc-600" />
        Fuente
      </button>

      <AnimatePresence>
        {open ? (
          <motion.div
            initial={{ opacity: 0, x: -12, scale: 0.98 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: -12, scale: 0.98 }}
            transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="mt-3 w-64 rounded-2xl bg-white/95 p-4 text-zinc-800 shadow-2xl ring-1 ring-zinc-900/10 backdrop-blur"
          >
            <div className="mb-3 flex items-center justify-between">
              <span className="text-sm font-bold text-zinc-900">Tipografía</span>
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label="Cerrar"
                className="grid size-7 place-items-center rounded-full bg-zinc-100 hover:bg-zinc-200"
              >
                <X className="size-4 text-zinc-700" />
              </button>
            </div>

            <div className="flex flex-col gap-1.5">
              {FONTS.map((f) => (
                <Row key={f.id} active={font === f.id} onClick={() => chooseFont(f.id)} name={f.name} sample={f.sample} />
              ))}
            </div>

            <p className="mt-4 text-[0.7rem] leading-snug text-zinc-500">
              Panel de demo: prueba las tipografías. Se guarda en este navegador.
            </p>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
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
