"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Minus, Plus, Trash, X } from "@phosphor-icons/react";
import { useEffect, useState } from "react";
import { useStore } from "@/components/store-provider";
import { LottiePet } from "./lottie-pet";

// Número de prueba (mientras el cliente confirma). El definitivo vive en lib/data.ts.
const WA_TEST = "56950306560";

function useIsMobile() {
  const [mobile, setMobile] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(max-width: 639px)");
    const update = () => setMobile(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);
  return mobile;
}

export function PremiumCart() {
  const { lines, inc, dec, remove, clear, cartOpen, setCartOpen } = useStore();
  const isMobile = useIsMobile();
  const [nombre, setNombre] = useState("");
  const [obs, setObs] = useState("");

  useEffect(() => {
    document.body.style.overflow = cartOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [cartOpen]);

  function checkout() {
    if (!lines.length) return;
    const items = lines
      .map((l) => `• ${l.nombre} x${l.cantidad}`)
      .join("\n");
    const msg =
      `Hola\n\nQuiero consultar la disponibilidad de estos productos:\n\n${items}\n\n` +
      (nombre ? `Nombre: ${nombre}\n` : "") +
      (obs ? `Observaciones: ${obs}\n` : "") +
      `\n¿Los tienen disponibles? Muchas gracias.`;
    window.location.href = `https://wa.me/${WA_TEST}?text=${encodeURIComponent(msg)}`;
  }

  const panelMotion = isMobile
    ? {
        initial: { y: "100%" },
        animate: { y: 0 },
        exit: { y: "100%" },
      }
    : {
        initial: { x: "100%" },
        animate: { x: 0 },
        exit: { x: "100%" },
      };

  const panelClass = isMobile
    ? "fixed inset-x-0 bottom-0 z-[70] flex max-h-[88vh] flex-col rounded-t-3xl bg-[color:var(--pm-bg)]"
    : "fixed right-0 top-0 z-[70] flex h-full w-full max-w-[420px] flex-col bg-[color:var(--pm-bg)] shadow-[-20px_0_60px_rgba(0,0,0,0.18)]";

  return (
    <AnimatePresence>
      {cartOpen ? (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setCartOpen(false)}
            className="fixed inset-0 z-[65] bg-black/45 backdrop-blur-sm"
          />
          <motion.aside
            {...panelMotion}
            transition={{ type: "spring", damping: 32, stiffness: 320 }}
            className={panelClass}
            aria-label="Mi consulta"
          >
            {isMobile ? (
              <div className="mx-auto mt-3 h-1.5 w-12 rounded-full bg-black/15" />
            ) : null}

            <div className="flex items-center justify-between px-6 pb-4 pt-5">
              <div>
                <h3 className="font-display text-xl font-bold text-[color:var(--pm-fg)]">
                  Tu consulta
                </h3>
                <p className="text-xs text-[color:var(--pm-muted)]">
                  Antümalen Mascotas
                </p>
              </div>
              <button
                type="button"
                onClick={() => setCartOpen(false)}
                aria-label="Cerrar"
                className="grid size-10 place-items-center rounded-full bg-[color:var(--pm-surface)] shadow-sm transition-transform hover:rotate-90"
              >
                <X className="size-5 text-[color:var(--pm-fg)]" />
              </button>
            </div>

            <div className="flex-1 space-y-3 overflow-y-auto px-6">
              {lines.length === 0 ? (
                <div className="flex flex-col items-center justify-center gap-2 py-12 text-center text-[color:var(--pm-muted)]">
                  <LottiePet className="size-40" />
                  <p className="text-sm">
                    Tu consulta está vacía.
                    <br />
                    ¡Agrega los productos que te interesan!
                  </p>
                </div>
              ) : (
                lines.map((l) => (
                  <div
                    key={l.id}
                    className="flex gap-3 rounded-2xl bg-[color:var(--pm-surface)] p-3 shadow-sm"
                  >
                    <div className="pm-ph size-16 flex-none rounded-xl" />
                    <div className="min-w-0 flex-1">
                      <h4 className="truncate font-poppins text-sm font-semibold text-[color:var(--pm-fg)]">
                        {l.nombre}
                      </h4>
                      <div className="mt-1.5 flex items-center justify-between">
                        <div className="flex items-center gap-1 rounded-full bg-[color:var(--pm-surface-2)] p-1">
                          <button
                            type="button"
                            onClick={() => dec(l.id)}
                            aria-label="Restar"
                            className="grid size-6 place-items-center rounded-full text-[color:var(--pm-fg)] hover:bg-[color:var(--pm-surface)]"
                          >
                            <Minus className="size-3.5" />
                          </button>
                          <span className="min-w-5 text-center text-sm font-semibold">
                            {l.cantidad}
                          </span>
                          <button
                            type="button"
                            onClick={() => inc(l.id)}
                            aria-label="Sumar"
                            className="grid size-6 place-items-center rounded-full text-[color:var(--pm-fg)] hover:bg-[color:var(--pm-surface)]"
                          >
                            <Plus className="size-3.5" />
                          </button>
                        </div>
                        <button
                          type="button"
                          onClick={() => remove(l.id)}
                          aria-label="Eliminar"
                          className="text-[color:var(--pm-muted)] transition-colors hover:text-red-500"
                        >
                          <Trash className="size-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              )}

              {lines.length > 0 ? (
                <div className="space-y-2.5 pt-2">
                  <input
                    value={nombre}
                    onChange={(e) => setNombre(e.target.value)}
                    placeholder="Tu nombre (opcional)"
                    className="w-full rounded-xl border border-[color:var(--pm-border)] bg-[color:var(--pm-surface)] px-4 py-2.5 text-sm outline-none focus:border-[color:var(--pm-accent)]"
                  />
                  <textarea
                    value={obs}
                    onChange={(e) => setObs(e.target.value)}
                    placeholder="¿Algo más que quieras consultar? (opcional)"
                    rows={2}
                    className="w-full resize-none rounded-xl border border-[color:var(--pm-border)] bg-[color:var(--pm-surface)] px-4 py-2.5 text-sm outline-none focus:border-[color:var(--pm-accent)]"
                  />
                  <button
                    type="button"
                    onClick={clear}
                    className="text-xs font-medium text-[color:var(--pm-muted)] underline-offset-2 hover:underline"
                  >
                    Vaciar consulta
                  </button>
                </div>
              ) : null}
            </div>

            <div className="border-t border-[color:var(--pm-border)] bg-[color:var(--pm-surface)] p-6 pb-[max(1.5rem,env(safe-area-inset-bottom))]">
              <p className="mb-4 text-center text-xs text-[color:var(--pm-muted)]">
                Te respondemos por WhatsApp con disponibilidad y precios
                actualizados.
              </p>
              <button
                type="button"
                onClick={checkout}
                disabled={!lines.length}
                className="flex w-full items-center justify-center gap-2 rounded-full bg-[#25D366] py-3.5 font-poppins font-semibold text-white shadow-lg shadow-[#25D366]/30 transition-all enabled:hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-50"
              >
                <WaIcon />
                Consultar disponibilidad
              </button>
            </div>
          </motion.aside>
        </>
      ) : null}
    </AnimatePresence>
  );
}

function WaIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="size-5" aria-hidden>
      <path d="M.057 24l1.687-6.163a11.867 11.867 0 0 1-1.587-5.946C.16 5.335 5.495 0 12.05 0a11.82 11.82 0 0 1 8.413 3.488 11.82 11.82 0 0 1 3.48 8.414c-.003 6.557-5.338 11.892-11.893 11.892a11.9 11.9 0 0 1-5.688-1.448L.057 24zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884a9.86 9.86 0 0 0 1.51 5.26l-.999 3.648 3.978-1.607z" />
    </svg>
  );
}
