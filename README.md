# Antümalen — Tienda de mascotas + Restaurante

Sitio web de Antümalen (San Clemente, Región del Maule), con dos modos en una
misma página —**tienda de mascotas** y **restaurante**— intercambiables desde el
header. El carrito no procesa pagos: arma un pedido y lo envía por **WhatsApp**.

## Stack

- **Next.js 16** (App Router · Turbopack) + **React 19** + **TypeScript 5**
- **Tailwind CSS 4** (`@tailwindcss/postcss`) + **tw-animate-css**
- **shadcn** (estilo de componentes) sobre **@base-ui/react** (primitivos accesibles)
- **framer-motion** (animaciones), **sonner** (toasts), **lucide-react** (íconos)
- **next-themes** (modo claro/oscuro)
- Fuentes vía `next/font/google`: **Fraunces** (títulos), **Nunito Sans** (cuerpo),
  **Caveat** (acento)

## Desarrollo

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # build de producción
npm start        # sirve el build
```

## Estructura

```
app/
  layout.tsx        # fuentes, theme + store providers, header/footer/cart
  page.tsx          # entrada
  globals.css       # tokens de diseño (Tailwind 4) + acento por modo
components/
  store-provider.tsx  # estado global: modo + carrito por modo (localStorage)
  theme-provider.tsx  # next-themes
  ui/                 # button, badge, sheet (base-ui)
  site/               # header, hero, catalog, categories, features,
                      # testimonials, footer, cart-drawer, whatsapp-float
lib/
  data.ts           # catálogo de productos, menú y categorías
  utils.ts          # cn() y formato CLP
public/logo/        # logos de la marca
legacy/             # versión estática anterior (HTML/CSS/JS), solo referencia
```

## Editar el catálogo

Productos, menú y categorías viven en [`lib/data.ts`](lib/data.ts). El número de
WhatsApp es `WHATSAPP_NUMERO` en ese mismo archivo.
