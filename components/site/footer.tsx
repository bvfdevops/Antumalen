"use client";

import { Clock, MapPin } from "lucide-react";
import Image from "next/image";
import {
  FacebookIcon,
  InstagramIcon,
  WhatsappIcon,
} from "@/components/site/icons";
import { buildWhatsappLink } from "@/lib/data";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer id="contacto" className="border-t border-border bg-secondary/40">
      <div className="container-page grid gap-10 py-14 lg:grid-cols-[1.4fr_1fr_1.3fr_1.3fr]">
        <div>
          <div className="flex items-center gap-2.5">
            <span className="grid size-9 place-items-center rounded-xl bg-[var(--brand)] p-1">
              <Image
                src="/logo/Antumalen_logo_nobg.png"
                alt="Antümalen"
                width={36}
                height={36}
                className="size-full object-contain"
              />
            </span>
            <span className="font-display text-lg font-semibold">Antümalen</span>
          </div>
          <p className="mt-4 max-w-xs text-sm text-muted-foreground">
            Tienda de mascotas en San Clemente, Región del Maule. Alimentos,
            accesorios y cariño para tu mejor amigo.
          </p>
          <div className="mt-5 flex gap-2">
            <a
              href="https://www.instagram.com/antumalenpets/"
              aria-label="Instagram"
              className="grid size-10 place-items-center rounded-full border border-border bg-card text-muted-foreground transition-colors hover:text-[var(--brand)]"
            >
              <InstagramIcon className="size-5" />
            </a>
            <a
              href="https://web.facebook.com/people/Ant%C3%BCmalen-Pets/100069050627029/"
              aria-label="Facebook"
              className="grid size-10 place-items-center rounded-full border border-border bg-card text-muted-foreground transition-colors hover:text-[var(--brand)]"
            >
              <FacebookIcon className="size-5" />
            </a>
          </div>
        </div>

        <nav className="flex flex-col gap-2.5 text-sm">
          <h4 className="font-display text-base font-semibold">Enlaces</h4>
          <a
            href="#inicio"
            className="text-muted-foreground transition-colors hover:text-foreground"
          >
            Inicio
          </a>
          <a
            href="#productos"
            className="text-muted-foreground transition-colors hover:text-foreground"
          >
            Productos
          </a>
          <a
            href="#beneficios"
            className="text-muted-foreground transition-colors hover:text-foreground"
          >
            Beneficios
          </a>
          <a
            href="/estudio.html"
            className="text-muted-foreground transition-colors hover:text-foreground"
          >
            ← Volver al estudio
          </a>
        </nav>

        <div className="flex flex-col gap-3 text-sm">
          <h4 className="font-display text-base font-semibold">Contacto</h4>
          <a
            href={buildWhatsappLink("Hola Antümalen, tengo una consulta.")}
            className="flex items-center gap-3 rounded-xl border border-border bg-card p-3 transition-colors hover:border-whatsapp/50"
          >
            <span className="grid size-9 place-items-center rounded-full bg-whatsapp text-white">
              <WhatsappIcon className="size-4" />
            </span>
            <span className="leading-tight">
              <strong className="block">+56 9 8719 9748</strong>
              <span className="text-muted-foreground">Escríbenos por WhatsApp</span>
            </span>
          </a>
          <span className="flex items-start gap-2 text-muted-foreground">
            <Clock className="mt-0.5 size-4 shrink-0" />
            Lun–Sáb 10:00–20:00
          </span>
          <span className="flex items-start gap-2 text-muted-foreground">
            <MapPin className="mt-0.5 size-4 shrink-0" />
            Ruta 115 #837, San Clemente
          </span>
        </div>

        <div className="overflow-hidden rounded-2xl border border-border">
          <iframe
            title="Ubicación de Antümalen"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="h-full min-h-48 w-full"
            src="https://www.google.com/maps?q=Ruta%20115%20837,%20San%20Clemente,%20Maule,%20Chile&output=embed"
          />
        </div>
      </div>

      <div className="border-t border-border">
        <div className="container-page flex flex-col items-center justify-between gap-2 py-5 text-xs text-muted-foreground sm:flex-row">
          <span>© {year} Antümalen. Todos los derechos reservados.</span>
          <span>Tienda de mascotas · San Clemente</span>
        </div>
      </div>
    </footer>
  );
}
