"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Minus, Plus, ShoppingBag, Trash2 } from "lucide-react";
import { useStore } from "@/components/store-provider";
import { WhatsappIcon } from "@/components/site/icons";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import { buildWhatsappLink } from "@/lib/data";
import { CLP } from "@/lib/utils";

export function CartDrawer() {
  const { cartOpen, setCartOpen, lines, total, inc, dec, remove, clear } =
    useStore();

  const waText =
    lines.length === 0
      ? "Hola Antümalen, quiero hacer un pedido en la tienda."
      : [
          "¡Hola Antümalen! 🐾 Quiero pedir de la tienda:",
          "",
          ...lines.map(
            (i) => `• ${i.cantidad}x ${i.nombre} — ${CLP(i.precio * i.cantidad)}`,
          ),
          "",
          `Total aprox: ${CLP(total)}`,
          "",
          "¿Me confirman disponibilidad y entrega? 🙂",
        ].join("\n");

  return (
    <Sheet open={cartOpen} onOpenChange={setCartOpen}>
      <SheetContent title="Tu pedido" description="Tienda Antümalen">
        <div className="flex-1 overflow-y-auto px-6 py-4">
          {lines.length === 0 ? (
            <div className="flex h-full flex-col items-center justify-center gap-3 py-16 text-center">
              <span className="grid size-16 place-items-center rounded-full bg-secondary text-muted-foreground">
                <ShoppingBag className="size-7" />
              </span>
              <p className="font-medium">Tu carrito está vacío.</p>
              <p className="text-sm text-muted-foreground">
                Agrega productos del catálogo.
              </p>
            </div>
          ) : (
            <ul className="flex flex-col gap-3">
              <AnimatePresence initial={false}>
                {lines.map((i) => (
                  <motion.li
                    key={i.id}
                    layout
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="flex gap-3 rounded-xl border border-border bg-background p-3"
                  >
                    <span className="grid size-12 shrink-0 place-items-center rounded-lg bg-brand-soft font-display text-lg font-semibold text-[var(--brand)]">
                      {i.nombre.charAt(0)}
                    </span>
                    <div className="flex flex-1 flex-col gap-1.5">
                      <div className="flex items-start justify-between gap-2">
                        <h4 className="text-sm font-semibold leading-tight">
                          {i.nombre}
                        </h4>
                        <button
                          onClick={() => remove(i.id)}
                          aria-label="Quitar"
                          className="text-muted-foreground transition-colors hover:text-destructive"
                        >
                          <Trash2 className="size-4" />
                        </button>
                      </div>
                      <span className="text-xs text-muted-foreground">
                        {CLP(i.precio)} c/u
                      </span>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-1 rounded-full border border-border">
                          <button
                            onClick={() => dec(i.id)}
                            aria-label="Quitar uno"
                            className="grid size-7 place-items-center rounded-full text-muted-foreground transition-colors hover:bg-secondary"
                          >
                            <Minus className="size-3.5" />
                          </button>
                          <span className="w-6 text-center text-sm font-semibold">
                            {i.cantidad}
                          </span>
                          <button
                            onClick={() => inc(i.id)}
                            aria-label="Agregar uno"
                            className="grid size-7 place-items-center rounded-full text-muted-foreground transition-colors hover:bg-secondary"
                          >
                            <Plus className="size-3.5" />
                          </button>
                        </div>
                        <span className="text-sm font-semibold">
                          {CLP(i.precio * i.cantidad)}
                        </span>
                      </div>
                    </div>
                  </motion.li>
                ))}
              </AnimatePresence>
            </ul>
          )}
        </div>

        <div className="border-t border-border bg-card px-6 py-5">
          {lines.length > 0 && (
            <button
              onClick={clear}
              className="mb-3 text-xs text-muted-foreground underline-offset-2 hover:underline"
            >
              Vaciar carrito
            </button>
          )}
          <div className="mb-4 flex items-center justify-between">
            <span className="text-muted-foreground">Total</span>
            <strong className="font-display text-2xl font-semibold">
              {CLP(total)}
            </strong>
          </div>
          <Button variant="whatsapp" size="lg" className="w-full" asChild>
            <a href={buildWhatsappLink(waText)}>
              <WhatsappIcon className="size-4" />
              Enviar pedido por WhatsApp
            </a>
          </Button>
          <p className="mt-3 text-center text-xs text-muted-foreground">
            El pedido se envía como mensaje de WhatsApp. Coordinamos pago y
            entrega por ahí.
          </p>
        </div>
      </SheetContent>
    </Sheet>
  );
}
