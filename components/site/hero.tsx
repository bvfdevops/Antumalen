"use client";

import { motion } from "framer-motion";
import { ArrowRight, Sparkles, Truck } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { buildWhatsappLink } from "@/lib/data";
import { WhatsappIcon } from "@/components/site/icons";

const c = {
  badge: "Tienda de mascotas en San Clemente",
  title: "Todo lo que tu mascota",
  accent: "necesita",
  tail: "en un solo lugar",
  lead: "Alimentos, accesorios y mucho cariño para perros, gatos, aves, peces y roedores. Compra fácil y te lo llevamos hasta tu puerta.",
  primary: { href: "#productos", label: "Comprar ahora" },
  trust: [
    { icon: Sparkles, label: "+2.000 familias felices" },
    { icon: Truck, label: "Despacho a domicilio" },
  ],
} as const;

export function Hero() {
  return (
    <section
      id="inicio"
      className="relative overflow-hidden border-b border-border"
    >
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -left-24 top-0 size-96 rounded-full bg-[var(--brand)]/15 blur-3xl" />
        <div className="absolute -right-20 top-40 size-96 rounded-full bg-accent/20 blur-3xl" />
      </div>

      <div className="container-page flex flex-col items-center py-20 text-center sm:py-28">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="flex max-w-3xl flex-col items-center"
        >
          <Badge className="mb-6">
            <span className="relative flex size-2">
              <span className="absolute inline-flex size-full animate-ping rounded-full bg-[var(--brand)] opacity-60" />
              <span className="relative inline-flex size-2 rounded-full bg-[var(--brand)]" />
            </span>
            {c.badge}
          </Badge>

          <h1 className="text-balance font-display text-4xl font-semibold leading-[1.08] sm:text-6xl">
            {c.title} <span className="text-[var(--brand)] italic">{c.accent}</span>{" "}
            {c.tail}
          </h1>

          <p className="mt-6 max-w-xl text-pretty text-lg text-muted-foreground">
            {c.lead}
          </p>

          <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
            <Button size="lg" asChild>
              <a href={c.primary.href}>
                {c.primary.label}
                <ArrowRight />
              </a>
            </Button>
            <Button size="lg" variant="whatsapp" asChild>
              <a
                href={buildWhatsappLink(
                  "Hola Antümalen, quiero hacer un pedido en la tienda.",
                )}
                target="_blank"
                rel="noopener"
              >
                <WhatsappIcon className="size-4" />
                Pedir por WhatsApp
              </a>
            </Button>
          </div>

          <div className="mt-10 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-sm font-medium text-muted-foreground">
            {c.trust.map((t) => {
              const Icon = t.icon;
              return (
                <span key={t.label} className="flex items-center gap-2">
                  <Icon className="size-4 text-[var(--brand)]" />
                  {t.label}
                </span>
              );
            })}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
