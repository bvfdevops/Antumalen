# Antümalen — Tienda de mascotas

Sitio web de Antümalen (San Clemente, Región del Maule): tienda de mascotas con
catálogo de productos por categoría. **No se muestran precios**: el cliente arma
una lista con los productos que le interesan y envía una **consulta de
disponibilidad por WhatsApp**; los precios se conversan ahí directamente.

## Stack

- **Next.js 16** (App Router · Turbopack) + **React 19** + **TypeScript 5**
- **Tailwind CSS 4** (`@tailwindcss/postcss`) + **tw-animate-css**
- **framer-motion** (animaciones), **sonner** (toasts), **lucide-react** (íconos)
- **next-themes** (modo claro/oscuro)
- Fuentes vía `next/font/google`

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
  layout.tsx        # fuentes + theme/store providers
  page.tsx          # entrada: renderiza la tienda (PetsView)
  loading.tsx       # loader temático de huellas
  globals.css       # tokens de diseño (Tailwind 4)
components/
  store-provider.tsx  # estado global: lista de consulta (localStorage)
  theme-provider.tsx  # next-themes
  premium/            # navbar, hero/secciones (pets.tsx), product-card,
                      # cart (consulta), footer, whatsapp-float, theme-lab,
                      # pet-loader, primitives
lib/
  data.ts           # catálogo de productos y categorías + helpers de WhatsApp
  utils.ts          # cn()
public/logo/        # logos de la marca
```

## Editar el catálogo

Productos y categorías viven en [`lib/data.ts`](lib/data.ts). El número de
WhatsApp es `WHATSAPP_NUMERO` en ese mismo archivo. El campo `precio` es opcional
y ya no se muestra en la web.
