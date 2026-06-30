import type { Metadata, Viewport } from "next";
import {
  Caveat,
  Fraunces,
  Inter,
  Lora,
  Montserrat,
  Nunito_Sans,
  Playfair_Display,
  Poppins,
} from "next/font/google";
import { Toaster } from "sonner";
import { StoreProvider } from "@/components/store-provider";
import { ThemeProvider } from "@/components/theme-provider";
import "./globals.css";

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  display: "swap",
});

const nunito = Nunito_Sans({
  subsets: ["latin"],
  variable: "--font-nunito",
  display: "swap",
});

const caveat = Caveat({
  subsets: ["latin"],
  variable: "--font-caveat",
  display: "swap",
});

// Fuentes solo para el panel de demo (no se precargan para no penalizar el rendimiento).
const playfair = Playfair_Display({ subsets: ["latin"], variable: "--font-playfair", display: "swap", preload: false });
const poppins = Poppins({ subsets: ["latin"], weight: ["500", "600", "700"], variable: "--font-poppins", display: "swap", preload: false });
const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap", preload: false });
const montserrat = Montserrat({ subsets: ["latin"], variable: "--font-montserrat", display: "swap", preload: false });
const lora = Lora({ subsets: ["latin"], variable: "--font-lora", display: "swap", preload: false });

export const metadata: Metadata = {
  title: "Antümalen — Tienda de mascotas | San Clemente",
  description:
    "Antümalen en San Clemente, Maule: tienda de mascotas con alimentos y accesorios para perros, gatos, aves y más. Pide por WhatsApp con despacho a domicilio.",
  icons: { icon: "/logo/Antumalen_logo.png" },
};

export const viewport: Viewport = {
  themeColor: "#0E5A6B",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="es-CL"
      data-mode="tienda"
      suppressHydrationWarning
      className={`${fraunces.variable} ${nunito.variable} ${caveat.variable} ${playfair.variable} ${poppins.variable} ${inter.variable} ${montserrat.variable} ${lora.variable}`}
    >
      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          <StoreProvider>
            {children}
            <Toaster position="bottom-center" richColors />
          </StoreProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
