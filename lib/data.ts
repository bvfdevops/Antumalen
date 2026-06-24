import {
  Bird,
  Bone,
  CupSoda,
  Drumstick,
  Fish,
  Flame,
  LayoutGrid,
  type LucideIcon,
  Pizza,
  Rabbit,
  Sandwich,
  UtensilsCrossed,
} from "lucide-react";

/* ============================================================
   Datos de Antümalen — tienda de mascotas + restaurante
   El carrito no procesa pagos: arma un pedido por WhatsApp.
   ============================================================ */

export const WHATSAPP_NUMERO = "56987199748"; // +56 9 8719 9748

export type Mode = "tienda" | "restaurante";

export type Producto = {
  id: string;
  nombre: string;
  categoria: string;
  precio: number;
  rating?: number;
  desc: string;
};

export type Categoria = {
  id: string;
  nombre: string;
  icon: LucideIcon;
};

/* ---------------- Tienda ---------------- */

export const PRODUCTOS: Producto[] = [
  { id: "proplan-adult-15kg", nombre: "Pro Plan Adultos 15 kg", categoria: "perros", precio: 64990, rating: 4.9, desc: "Alimento completo para perros adultos, todas las razas." },
  { id: "proplan-puppy-15kg", nombre: "Pro Plan Cachorros 15 kg", categoria: "perros", precio: 67990, rating: 4.8, desc: "Nutrición para el crecimiento de cachorros." },
  { id: "cama-perro-m", nombre: "Cama acolchada talla M", categoria: "perros", precio: 19990, rating: 4.6, desc: "Cama suave y lavable para perros medianos." },
  { id: "juguete-mordedor", nombre: "Juguete mordedor de goma", categoria: "perros", precio: 5990, rating: 4.5, desc: "Juguete resistente para horas de juego." },
  { id: "proplan-gato-3kg", nombre: "Pro Plan Gato Adulto 3 kg", categoria: "gatos", precio: 24990, rating: 4.9, desc: "Alimento balanceado para gatos adultos." },
  { id: "arena-gato-10l", nombre: "Arena sanitaria 10 L", categoria: "gatos", precio: 8990, rating: 4.7, desc: "Arena aglomerante con control de olores." },
  { id: "rascador-torre", nombre: "Rascador torre con juguete", categoria: "gatos", precio: 29990, rating: 4.6, desc: "Rascador alto con plataformas y juguete." },
  { id: "alimento-aves-1kg", nombre: "Mezcla de semillas aves 1 kg", categoria: "aves", precio: 4990, rating: 4.5, desc: "Mezcla nutritiva para canarios y periquitos." },
  { id: "jaula-mediana", nombre: "Jaula mediana para aves", categoria: "aves", precio: 27990, rating: 4.4, desc: "Jaula con comederos y palos incluidos." },
  { id: "alimento-peces-100g", nombre: "Alimento en escamas peces 100 g", categoria: "peces", precio: 3990, rating: 4.6, desc: "Escamas para peces tropicales de agua dulce." },
  { id: "pecera-20l", nombre: "Pecera 20 L con tapa", categoria: "peces", precio: 34990, rating: 4.7, desc: "Pecera de vidrio con tapa y espacio para filtro." },
  { id: "alimento-conejo-1kg", nombre: "Alimento para conejos 1 kg", categoria: "roedores", precio: 5490, rating: 4.6, desc: "Pellet balanceado para conejos y cuyes." },
  { id: "viruta-jaula-2kg", nombre: "Viruta para jaula 2 kg", categoria: "roedores", precio: 4290, rating: 4.5, desc: "Sustrato absorbente para roedores pequeños." },
  { id: "bebedero-roedor", nombre: "Bebedero de botella 250 ml", categoria: "roedores", precio: 3990, rating: 4.4, desc: "Bebedero antigoteo para jaulas." },
];

export const CATEGORIAS: Categoria[] = [
  { id: "todos", nombre: "Todos", icon: LayoutGrid },
  { id: "perros", nombre: "Perros", icon: Bone },
  { id: "gatos", nombre: "Gatos", icon: Fish },
  { id: "aves", nombre: "Aves", icon: Bird },
  { id: "peces", nombre: "Peces", icon: Fish },
  { id: "roedores", nombre: "Roedores", icon: Rabbit },
];

/* ---------------- Restaurante ---------------- */

export const MENU: Producto[] = [
  { id: "completo-italiano", nombre: "Completo Italiano", categoria: "completos", precio: 2890, desc: "Vienesa, tomate, palta y mayo." },
  { id: "completo-dinamico", nombre: "Completo Dinámico", categoria: "completos", precio: 2990, desc: "Chucrut, tomate y mayonesa." },
  { id: "completo-antumalen", nombre: "Completo Antümalen", categoria: "completos", precio: 3490, desc: "El especial de la casa, bien servido." },
  { id: "churrasco-italiano", nombre: "Churrasco Italiano", categoria: "sandwiches", precio: 4990, desc: "Carne, tomate, palta y mayo en pan amasado." },
  { id: "barros-luco", nombre: "Barros Luco", categoria: "sandwiches", precio: 4790, desc: "Carne y queso fundido." },
  { id: "chacarero", nombre: "Chacarero", categoria: "sandwiches", precio: 5290, desc: "Carne, porotos verdes, tomate y ají." },
  { id: "ave-mayo", nombre: "Ave Mayo", categoria: "sandwiches", precio: 4590, desc: "Pollo desmenuzado con mayonesa casera." },
  { id: "pizza-napolitana", nombre: "Pizza Napolitana (mediana)", categoria: "pizzas", precio: 7990, desc: "Queso, tomate, jamón y orégano." },
  { id: "pizza-pepperoni", nombre: "Pizza Pepperoni", categoria: "pizzas", precio: 8490, desc: "Doble queso y pepperoni." },
  { id: "pizza-antumalen", nombre: "Pizza Antümalen", categoria: "pizzas", precio: 9990, desc: "La especial de la casa, ingredientes surtidos." },
  { id: "fajitas-pollo", nombre: "Fajitas de Pollo", categoria: "fajitas", precio: 6990, desc: "Pollo, pimentón y cebolla con tortillas." },
  { id: "fajitas-mixtas", nombre: "Fajitas Mixtas", categoria: "fajitas", precio: 7490, desc: "Carne y pollo con guarniciones." },
  { id: "menu-dia", nombre: "Menú del Día", categoria: "menus", precio: 4500, desc: "Almuerzo casero: entrada, fondo y bebida." },
  { id: "menu-ejecutivo", nombre: "Menú Ejecutivo", categoria: "menus", precio: 5500, desc: "Plato de fondo abundante, postre y bebida." },
  { id: "bebida-lata", nombre: "Bebida en lata", categoria: "bebidas", precio: 1490, desc: "Línea Coca-Cola, 350 cc." },
  { id: "jugo-natural", nombre: "Jugo Natural", categoria: "bebidas", precio: 2290, desc: "De temporada, recién hecho." },
];

export const MENU_CATEGORIAS: Categoria[] = [
  { id: "todos", nombre: "Todos", icon: UtensilsCrossed },
  { id: "completos", nombre: "Completos", icon: Drumstick },
  { id: "sandwiches", nombre: "Sándwiches", icon: Sandwich },
  { id: "pizzas", nombre: "Pizzas", icon: Pizza },
  { id: "fajitas", nombre: "Fajitas", icon: Flame },
  { id: "menus", nombre: "Menús", icon: UtensilsCrossed },
  { id: "bebidas", nombre: "Bebidas", icon: CupSoda },
];

export const ITEMS_BY_ID: Record<string, Producto> = Object.fromEntries(
  [...PRODUCTOS, ...MENU].map((p) => [p.id, p]),
);

export function buildWhatsappLink(text: string) {
  return `https://wa.me/${WHATSAPP_NUMERO}?text=${encodeURIComponent(text)}`;
}
