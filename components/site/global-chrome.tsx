"use client";

import { LayoutGrid } from "lucide-react";
import { usePathname } from "next/navigation";
import { CartDrawer } from "@/components/site/cart-drawer";
import { Footer } from "@/components/site/footer";
import { Header } from "@/components/site/header";
import { SiteThemeLab } from "@/components/site/site-theme-lab";
import { WhatsappFloat } from "@/components/site/whatsapp-float";

/** La tercera opción (/premium) trae su propia navegación, carrito y
 *  footer, así que ocultamos la chrome global en esas rutas. */
function isPremium(pathname: string | null) {
  return !!pathname && pathname.startsWith("/premium");
}

export function GlobalHeader() {
  if (isPremium(usePathname())) return null;
  return <Header />;
}

export function GlobalChrome() {
  if (isPremium(usePathname())) return null;
  return (
    <>
      <Footer />
      <CartDrawer />
      <WhatsappFloat />
      <SiteThemeLab />
      <a
        href="/estudio.html"
        className="fixed bottom-6 left-4 z-40 inline-flex items-center gap-2 rounded-full bg-foreground px-4 py-2.5 text-sm font-semibold text-background shadow-xl ring-1 ring-black/10 transition-transform hover:-translate-y-0.5 sm:left-6"
      >
        <LayoutGrid className="size-4" />
        Estudio
      </a>
    </>
  );
}
