import type { Metadata } from "next";
import { RestaurantView } from "@/components/premium/restaurant";

export const metadata: Metadata = {
  title: "Antümalen Restaurante — Comida casera | San Clemente",
  description:
    "Completos, pizzas artesanales, sándwiches y menús del día. Pide por WhatsApp con despacho o para llevar.",
};

export default function PremiumRestaurantePage() {
  return <RestaurantView />;
}
