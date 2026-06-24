import type { Metadata } from "next";
import { Inter, Lora, Montserrat, Playfair_Display, Poppins } from "next/font/google";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-poppins",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
  display: "swap",
});

const lora = Lora({
  subsets: ["latin"],
  variable: "--font-lora",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Antümalen — Mascotas y Restaurante | San Clemente",
  description:
    "Ecosistema Antümalen: tienda de mascotas premium y restaurante de comida casera en San Clemente, Maule. Pide por WhatsApp.",
};

export default function PremiumLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div
      className={`${playfair.variable} ${poppins.variable} ${inter.variable} ${montserrat.variable} ${lora.variable}`}
    >
      {children}
    </div>
  );
}
