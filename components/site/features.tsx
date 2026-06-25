"use client";

import {
  HeartHandshake,
  type LucideIcon,
  ShieldCheck,
  Truck,
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

export function Features() {
  return (
    <section id="beneficios" className="container-page py-20 sm:py-24">
      <SectionHead
        eyebrow="Por qué elegirnos"
        title="Beneficios que"
        accent="te encantarán"
      />
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {BENEFICIOS.map((f, i) => {
          const Icon = f.icon;
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
