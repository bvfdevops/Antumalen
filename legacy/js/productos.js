/* ============================================================
   CATÁLOGO DE PRODUCTOS — Antümalen Pets
   ------------------------------------------------------------
   Cada producto:
     id        : identificador único (texto, sin espacios)
     nombre    : nombre visible
     categoria : "perros" | "gatos" | "aves" | "peces" | "roedores"
     precio    : número en pesos chilenos (CLP), sin puntos
     rating    : calificación 0–5 (ej. 4.5)
     img       : ruta a la foto (en imagenes/productos/). "" = sin foto
     desc      : descripción corta
   ============================================================ */

const PRODUCTOS = [
  { id:"proplan-adult-15kg", nombre:"Pro Plan Adultos 15 kg", categoria:"perros", precio:64990, rating:4.9, img:"", desc:"Alimento completo para perros adultos, todas las razas." },
  { id:"proplan-puppy-15kg", nombre:"Pro Plan Cachorros 15 kg", categoria:"perros", precio:67990, rating:4.8, img:"", desc:"Nutrición para el crecimiento de cachorros." },
  { id:"cama-perro-m", nombre:"Cama acolchada talla M", categoria:"perros", precio:19990, rating:4.6, img:"", desc:"Cama suave y lavable para perros medianos." },
  { id:"juguete-mordedor", nombre:"Juguete mordedor de goma", categoria:"perros", precio:5990, rating:4.5, img:"", desc:"Juguete resistente para horas de juego." },
  { id:"proplan-gato-3kg", nombre:"Pro Plan Gato Adulto 3 kg", categoria:"gatos", precio:24990, rating:4.9, img:"", desc:"Alimento balanceado para gatos adultos." },
  { id:"arena-gato-10l", nombre:"Arena sanitaria 10 L", categoria:"gatos", precio:8990, rating:4.7, img:"", desc:"Arena aglomerante con control de olores." },
  { id:"rascador-torre", nombre:"Rascador torre con juguete", categoria:"gatos", precio:29990, rating:4.6, img:"", desc:"Rascador alto con plataformas y juguete." },
  { id:"alimento-aves-1kg", nombre:"Mezcla de semillas aves 1 kg", categoria:"aves", precio:4990, rating:4.5, img:"", desc:"Mezcla nutritiva para canarios y periquitos." },
  { id:"jaula-mediana", nombre:"Jaula mediana para aves", categoria:"aves", precio:27990, rating:4.4, img:"", desc:"Jaula con comederos y palos incluidos." },
  { id:"alimento-peces-100g", nombre:"Alimento en escamas peces 100 g", categoria:"peces", precio:3990, rating:4.6, img:"", desc:"Escamas para peces tropicales de agua dulce." },
  { id:"pecera-20l", nombre:"Pecera 20 L con tapa", categoria:"peces", precio:34990, rating:4.7, img:"", desc:"Pecera de vidrio con tapa y espacio para filtro." },
  { id:"alimento-conejo-1kg", nombre:"Alimento para conejos 1 kg", categoria:"roedores", precio:5490, rating:4.6, img:"", desc:"Pellet balanceado para conejos y cuyes." },
  { id:"viruta-jaula-2kg", nombre:"Viruta para jaula 2 kg", categoria:"roedores", precio:4290, rating:4.5, img:"", desc:"Sustrato absorbente para roedores pequeños." },
  { id:"bebedero-roedor", nombre:"Bebedero de botella 250 ml", categoria:"roedores", precio:3990, rating:4.4, img:"", desc:"Bebedero antigoteo para jaulas." }
];

/* ===== MENÚ DEL RESTAURANTE (platos de EJEMPLO, basados en reseñas.
   Reemplazar por la carta real con precios cuando el cliente la entregue) ===== */
const MENU = [
  { id:"completo-italiano", nombre:"Completo Italiano", categoria:"completos", precio:2890, img:"", desc:"Vienesa, tomate, palta y mayo." },
  { id:"completo-dinamico", nombre:"Completo Dinámico", categoria:"completos", precio:2990, img:"", desc:"Chucrut, tomate y mayonesa." },
  { id:"completo-antumalen", nombre:"Completo Antümalen", categoria:"completos", precio:3490, img:"", desc:"El especial de la casa, bien servido." },
  { id:"churrasco-italiano", nombre:"Churrasco Italiano", categoria:"sandwiches", precio:4990, img:"", desc:"Carne, tomate, palta y mayo en pan amasado." },
  { id:"barros-luco", nombre:"Barros Luco", categoria:"sandwiches", precio:4790, img:"", desc:"Carne y queso fundido." },
  { id:"chacarero", nombre:"Chacarero", categoria:"sandwiches", precio:5290, img:"", desc:"Carne, porotos verdes, tomate y ají." },
  { id:"ave-mayo", nombre:"Ave Mayo", categoria:"sandwiches", precio:4590, img:"", desc:"Pollo desmenuzado con mayonesa casera." },
  { id:"pizza-napolitana", nombre:"Pizza Napolitana (mediana)", categoria:"pizzas", precio:7990, img:"", desc:"Queso, tomate, jamón y orégano." },
  { id:"pizza-pepperoni", nombre:"Pizza Pepperoni", categoria:"pizzas", precio:8490, img:"", desc:"Doble queso y pepperoni." },
  { id:"pizza-antumalen", nombre:"Pizza Antümalen", categoria:"pizzas", precio:9990, img:"", desc:"La especial de la casa, ingredientes surtidos." },
  { id:"fajitas-pollo", nombre:"Fajitas de Pollo", categoria:"fajitas", precio:6990, img:"", desc:"Pollo, pimentón y cebolla con tortillas." },
  { id:"fajitas-mixtas", nombre:"Fajitas Mixtas", categoria:"fajitas", precio:7490, img:"", desc:"Carne y pollo con guarniciones." },
  { id:"menu-dia", nombre:"Menú del Día", categoria:"menus", precio:4500, img:"", desc:"Almuerzo casero: entrada, fondo y bebida." },
  { id:"menu-ejecutivo", nombre:"Menú Ejecutivo", categoria:"menus", precio:5500, img:"", desc:"Plato de fondo abundante, postre y bebida." },
  { id:"bebida-lata", nombre:"Bebida en lata", categoria:"bebidas", precio:1490, img:"", desc:"Línea Coca-Cola, 350 cc." },
  { id:"jugo-natural", nombre:"Jugo Natural", categoria:"bebidas", precio:2290, img:"", desc:"De temporada, recién hecho." }
];

const MENU_CATEGORIAS = [
  { id:"todos",      nombre:"Todos",      icono:`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M6 3v8a2 2 0 002 2M6 3v4M9 3v4M9 3v8M18 3c-1.4 0-2.3 2-2.3 4.7 0 1.8 1 2.8 2.3 2.8"/><path d="M8 13v8M18 10.5V21"/></svg>` },
  { id:"completos",  nombre:"Completos",  icono:`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="8" width="18" height="8" rx="4"/><path d="M6 12c2-1 4 1 6 0s4-1 6 0"/></svg>` },
  { id:"sandwiches", nombre:"Sándwiches", icono:`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M3 8l9-4 9 4-9 4z"/><path d="M3 12l9 4 9-4M3 16l9 4 9-4"/></svg>` },
  { id:"pizzas",     nombre:"Pizzas",     icono:`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3l9 5c-1 7-6 12-9 13C9 20 4 15 3 8z"/><circle cx="10" cy="9" r=".8" fill="currentColor"/><circle cx="13" cy="12" r=".8" fill="currentColor"/></svg>` },
  { id:"fajitas",    nombre:"Fajitas",    icono:`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M5 19L15 5c2-1 4 1 3 3L8 21z"/><path d="M7 16l1.5 .4M10 11l1.5 .4M13 7l1.5 .4"/></svg>` },
  { id:"menus",      nombre:"Menús",      icono:`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="8"/><circle cx="12" cy="12" r="3.4"/></svg>` },
  { id:"bebidas",    nombre:"Bebidas",    icono:`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M6 4h12l-1.4 15.2a2 2 0 01-2 1.8H9.4a2 2 0 01-2-1.8z"/><path d="M8.5 9h7"/></svg>` }
];

const CATEGORIAS = [
  { id:"todos",    nombre:"Todos",    icono:`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="7" height="7" rx="1.5"/><rect x="14" y="3" width="7" height="7" rx="1.5"/><rect x="3" y="14" width="7" height="7" rx="1.5"/><rect x="14" y="14" width="7" height="7" rx="1.5"/></svg>` },
  { id:"perros",   nombre:"Perros",   icono:`<svg viewBox="0 0 24 24" fill="currentColor"><ellipse cx="5.5" cy="12" rx="1.9" ry="2.5"/><ellipse cx="9.8" cy="8" rx="1.9" ry="2.5"/><ellipse cx="14.2" cy="8" rx="1.9" ry="2.5"/><ellipse cx="18.5" cy="12" rx="1.9" ry="2.5"/><path d="M12 12.5c2.8 0 5 2.2 5 4.6 0 1.9-1.8 2.9-5 2.9s-5-1-5-2.9c0-2.4 2.2-4.6 5-4.6z"/></svg>` },
  { id:"gatos",    nombre:"Gatos",    icono:`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M4 4l4 3.5M20 4l-4 3.5"/><path d="M5 9.5C6.5 7 9 6.5 12 6.5s5.5 .5 7 3c.6 1 .5 6-1.5 8.2C16 19.5 14 20 12 20s-4-.5-5.5-2.3C4.5 15.5 4.4 10.5 5 9.5z"/><path d="M9.5 12h.01M14.5 12h.01M12 14v1.2M10.5 15.6h3"/></svg>` },
  { id:"aves",     nombre:"Aves",     icono:`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M14 5.5a2.5 2.5 0 11-2.5 2.5"/><path d="M21 8c-2 0-3 1-3 1 0 5-3.5 9-8.5 9C5 18 3 15 3 13c2 1 3 0 3 0-2-1-2-3-2-4 0-2.5 2-4.5 4.5-4.5 2 0 3.3 1 4 2"/><path d="M8 18l-1 3M12 18l.5 3"/></svg>` },
  { id:"peces",    nombre:"Peces",    icono:`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M16 12c-2.5 3.5-6.5 4.5-10 3.5C4 15 3 13 3 12s1-3 3-3.5C9.5 7.5 13.5 8.5 16 12z"/><path d="M16 12c1-1.5 3-2.5 5-2.5-.5 1.5-.5 3.5 0 5-2 0-4-1-5-2.5z"/><circle cx="7" cy="11" r=".6" fill="currentColor"/></svg>` },
  { id:"roedores", nombre:"Roedores", icono:`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><circle cx="7.5" cy="7" r="2.5"/><circle cx="16.5" cy="7" r="2.5"/><path d="M5 14c0-3.3 3-5.5 7-5.5s7 2.2 7 5.5-3 5.5-7 5.5-7-2.2-7-5.5z"/><path d="M10.5 13h.01M13.5 13h.01M12 15v.8"/></svg>` }
];
