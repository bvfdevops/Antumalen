import type { Metadata } from "next";
import { PetsView } from "@/components/premium/pets";

export const metadata: Metadata = {
  title: "Antümalen Mascotas — Tienda premium | San Clemente",
  description:
    "Alimentos, accesorios y todo para el bienestar de perros, gatos, aves y más. Pide por WhatsApp con despacho a domicilio.",
};

export default function PremiumMascotasPage() {
  return <PetsView />;
}
