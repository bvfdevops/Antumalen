"use client";

import { Star } from "lucide-react";
import { Reveal } from "@/components/site/reveal";
import { SectionHead } from "@/components/site/section-head";

type Testi = { quote: string; author: string; role: string; initials: string };

const c = {
  eyebrow: "Testimonios",
  accent: "nuestros clientes",
  items: [
    { quote: "Excelente atención y los precios son muy buenos. Me llegó todo rapidísimo a la casa.", author: "Carolina R.", role: "Dueña de Rocco", initials: "CR" },
    { quote: "Siempre encuentro el alimento de mi gata. Muy amables al asesorarme por WhatsApp.", author: "Felipe M.", role: "Dueño de Luna", initials: "FM" },
    { quote: "Una tienda local que se nota que ama a los animales. ¡Totalmente recomendados!", author: "Daniela P.", role: "Dueña de Copito", initials: "DP" },
  ] as Testi[],
};

export function Testimonials() {
  return (
    <section id="testimonios" className="container-page py-20 sm:py-24">
      <SectionHead
        eyebrow={c.eyebrow}
        title="Lo que dicen"
        accent={c.accent}
      />
      <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
        {c.items.map((t, i) => (
          <Reveal key={t.author} delay={i * 0.08}>
            <figure className="flex h-full flex-col rounded-2xl border border-border bg-card p-6 shadow-sm">
              <div className="mb-3 flex gap-0.5 text-accent">
                {Array.from({ length: 5 }).map((_, k) => (
                  <Star key={k} className="size-4 fill-accent" />
                ))}
              </div>
              <blockquote className="flex-1 text-pretty text-sm leading-relaxed text-foreground/90">
                “{t.quote}”
              </blockquote>
              <figcaption className="mt-5 flex items-center gap-3">
                <span className="grid size-10 place-items-center rounded-full bg-brand-soft text-sm font-bold text-[var(--brand)]">
                  {t.initials}
                </span>
                <span className="text-sm leading-tight">
                  <strong className="block font-semibold">{t.author}</strong>
                  <span className="text-muted-foreground">{t.role}</span>
                </span>
              </figcaption>
            </figure>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
