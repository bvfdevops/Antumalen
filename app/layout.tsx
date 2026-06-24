import type { Metadata, Viewport } from "next";
import { Caveat, Fraunces, Nunito_Sans } from "next/font/google";
import { Toaster } from "sonner";
import { StoreProvider } from "@/components/store-provider";
import { ThemeProvider } from "@/components/theme-provider";
import { Header } from "@/components/site/header";
import { Footer } from "@/components/site/footer";
import { CartDrawer } from "@/components/site/cart-drawer";
import { WhatsappFloat } from "@/components/site/whatsapp-float";
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

export const metadata: Metadata = {
  title: "Antümalen — Tienda de mascotas y Restaurante | San Clemente",
  description:
    "Antümalen en San Clemente, Maule: tienda de mascotas (alimentos y accesorios) y restaurante de comida casera. Pide por WhatsApp con despacho a domicilio.",
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
      className={`${fraunces.variable} ${nunito.variable} ${caveat.variable}`}
    >
      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          <StoreProvider>
            <Header />
            {children}
            <Footer />
            <CartDrawer />
            <WhatsappFloat />
            <Toaster position="bottom-center" richColors />
          </StoreProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
