"use client";

import { usePathname } from "next/navigation";
import { CartDrawer } from "@/components/site/cart-drawer";
import { Footer } from "@/components/site/footer";
import { Header } from "@/components/site/header";
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
    </>
  );
}
