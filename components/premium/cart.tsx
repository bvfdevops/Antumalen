"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Minus, Plus, ShoppingBag, Trash2, X } from "lucide-react";
import { useEffect, useState } from "react";
import { useStore } from "@/components/store-provider";
import { CLP } from "@/lib/utils";

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
  const { lines, total, count, inc, dec, remove, clear, cartOpen, setCartOpen, mode } =
    useStore();
  const isMobile = useIsMobile();
  const [nombre, setNombre] = useState("");
  const [direccion, setDireccion] = useState("");
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
      `Hola 👋\n\nQuiero realizar el siguiente pedido:\n\n${items}\n\n` +
      `Total: ${CLP(total)}\n\n` +
      `Nombre: ${nombre}\n` +
      `Dirección: ${direccion}\n` +
      `Observaciones: ${obs}\n\n` +
      `Muchas gracias.`;
    window.open(
      `https://wa.me/${WA_TEST}?text=${encodeURIComponent(msg)}`,
      "_blank",
    );
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
            aria-label="Carrito"
          >
            {isMobile ? (
              <div className="mx-auto mt-3 h-1.5 w-12 rounded-full bg-black/15" />
            ) : null}

            <div className="flex items-center justify-between px-6 pb-4 pt-5">
              <div>
                <h3 className="font-display text-xl font-bold text-[color:var(--pm-fg)]">
                  Tu pedido
                </h3>
                <p className="text-xs text-[color:var(--pm-muted)]">
                  {mode === "restaurante" ? "Antümalen Restaurante" : "Antümalen Mascotas"}
                </p>
              </div>
              <button
                type="button"
                onClick={() => setCartOpen(false)}
                aria-label="Cerrar"
                className="grid size-10 place-items-center rounded-full bg-white shadow-sm transition-transform hover:rotate-90"
              >
                <X className="size-5 text-[color:var(--pm-fg)]" />
              </button>
            </div>

            <div className="flex-1 space-y-3 overflow-y-auto px-6">
              {lines.length === 0 ? (
                <div className="flex flex-col items-center justify-center gap-3 py-16 text-center text-[color:var(--pm-muted)]">
                  <ShoppingBag className="size-14 opacity-30" strokeWidth={1.2} />
                  <p className="text-sm">
                    Tu carrito está vacío.
                    <br />
                    ¡Agrega algo que te guste!
                  </p>
                </div>
              ) : (
                lines.map((l) => (
                  <div
                    key={l.id}
                    className="flex gap-3 rounded-2xl bg-white p-3 shadow-sm"
                  >
                    <div className="pm-ph size-16 flex-none rounded-xl" />
                    <div className="min-w-0 flex-1">
                      <h4 className="truncate font-poppins text-sm font-semibold text-[color:var(--pm-fg)]">
                        {l.nombre}
                      </h4>
                      <span className="font-poppins text-sm font-bold text-[color:var(--pm-accent-dark)]">
                        {CLP(l.precio)}
                      </span>
                      <div className="mt-1.5 flex items-center justify-between">
                        <div className="flex items-center gap-1 rounded-full bg-black/5 p-1">
                          <button
                            type="button"
                            onClick={() => dec(l.id)}
                            aria-label="Restar"
                            className="grid size-6 place-items-center rounded-full text-[color:var(--pm-fg)] hover:bg-white"
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
                            className="grid size-6 place-items-center rounded-full text-[color:var(--pm-fg)] hover:bg-white"
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
                          <Trash2 className="size-4" />
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
                    placeholder="Tu nombre"
                    className="w-full rounded-xl border border-black/10 bg-white px-4 py-2.5 text-sm outline-none focus:border-[color:var(--pm-accent)]"
                  />
                  <input
                    value={direccion}
                    onChange={(e) => setDireccion(e.target.value)}
                    placeholder="Dirección (o retiro en local)"
                    className="w-full rounded-xl border border-black/10 bg-white px-4 py-2.5 text-sm outline-none focus:border-[color:var(--pm-accent)]"
                  />
                  <textarea
                    value={obs}
                    onChange={(e) => setObs(e.target.value)}
                    placeholder="Observaciones (opcional)"
                    rows={2}
                    className="w-full resize-none rounded-xl border border-black/10 bg-white px-4 py-2.5 text-sm outline-none focus:border-[color:var(--pm-accent)]"
                  />
                  <button
                    type="button"
                    onClick={clear}
                    className="text-xs font-medium text-[color:var(--pm-muted)] underline-offset-2 hover:underline"
                  >
                    Vaciar carrito
                  </button>
                </div>
              ) : null}
            </div>

            <div className="border-t border-black/5 bg-white p-6 pb-[max(1.5rem,env(safe-area-inset-bottom))]">
              <div className="mb-1 flex items-center justify-between text-sm text-[color:var(--pm-muted)]">
                <span>Subtotal ({count})</span>
                <span>{CLP(total)}</span>
              </div>
              <div className="mb-4 flex items-baseline justify-between">
                <span className="text-sm text-[color:var(--pm-muted)]">Total</span>
                <b className="font-display text-2xl font-bold text-[color:var(--pm-fg)]">
                  {CLP(total)}
                </b>
              </div>
              <button
                type="button"
                onClick={checkout}
                disabled={!lines.length}
                className="flex w-full items-center justify-center gap-2 rounded-full bg-[#25D366] py-3.5 font-poppins font-semibold text-white shadow-lg shadow-[#25D366]/30 transition-all enabled:hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-50"
              >
                <WaIcon />
                Finalizar pedido por WhatsApp
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
