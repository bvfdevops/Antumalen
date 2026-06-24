"use client";

import {
  CreditCard,
  Clock,
  HeartHandshake,
  MapPin,
  type LucideIcon,
  ShieldCheck,
  Truck,
  UtensilsCrossed,
} from "lucide-react";
import { Reveal } from "@/components/site/reveal";
import { SectionHead } from "@/components/site/section-head";

type Feature = {
  icon: LucideIcon;
  title: string;
  desc: string;
};

const BENEFICIOS: Feature[] = [
  { icon: Truck, title: "Envío rápido", desc: "Despacho a domicilio en San Clemente y alrededores." },
  { icon: ShieldCheck, title: "Productos de calidad", desc: "Marcas reconocidas y de confianza para tu mascota." },
  { icon: HeartHandshake, title: "Atención personalizada", desc: "Te asesoramos por WhatsApp para elegir lo mejor." },
  { icon: ShieldCheck, title: "Garantía de satisfacción", desc: "Si algo no está bien, lo solucionamos contigo." },
];

const INFO: Feature[] = [
  { icon: Clock, title: "Horario", desc: "Lun a Sáb 9:30–20:30 · Dom 9:30–15:30." },
  { icon: Truck, title: "Servicio", desc: "Entrega a domicilio y visita rápida para comer en el local." },
  { icon: CreditCard, title: "Medios de pago", desc: "Efectivo, tarjetas de crédito y débito, y pagos con NFC." },
  { icon: MapPin, title: "Dónde estamos", desc: "Ruta 115 #837 / Huamachuco #830, San Clemente." },
];

const CONTENT = {
  beneficios: {
    id: "beneficios",
    eyebrow: "Por qué elegirnos",
    title: "Beneficios que",
    accent: "te encantarán",
    items: BENEFICIOS,
  },
  info: {
    id: "info",
    eyebrow: "Información",
    title: "Te atendemos",
    accent: "todos los días",
    items: INFO,
  },
} as const;

export function Features({ variant }: { variant: "beneficios" | "info" }) {
  const c = CONTENT[variant];
  return (
    <section id={c.id} className="container-page py-20 sm:py-24">
      <SectionHead eyebrow={c.eyebrow} title={c.title} accent={c.accent} />
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {c.items.map((f, i) => {
          const Icon = f.icon ?? UtensilsCrossed;
          return (
            <Reveal key={f.title} delay={i * 0.08}>
              <div className="h-full rounded-2xl border border-border bg-card p-6 shadow-sm transition-shadow hover:shadow-md">
                <span className="mb-4 grid size-12 place-items-center rounded-xl bg-brand-soft text-[var(--brand)]">
                  <Icon className="size-6" />
                </span>
                <h3 className="font-display text-lg font-semibold">{f.title}</h3>
                <p className="mt-1.5 text-sm text-muted-foreground">{f.desc}</p>
              </div>
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}
