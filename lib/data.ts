/* ============================================================
   Datos de Antümalen — tienda de mascotas
   No se muestran precios: el cliente arma una lista y consulta
   disponibilidad por WhatsApp.
   ============================================================ */

export const WHATSAPP_NUMERO = "56987199748"; // +56 9 8719 9748

export type Mode = "tienda";

export type Producto = {
  id: string;
  nombre: string;
  categoria: string;
  /** Ya no se muestra en la web; los precios se consultan por WhatsApp. */
  precio?: number;
  rating?: number;
  desc: string;
  /** Imagen de referencia (Unsplash). Reemplazable por foto real del cliente. */
  imagen?: string;
};

/** Helper de imagen de referencia. */
const img = (id: string) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=600&q=80`;

/* ---------------- Tienda ---------------- */

export const PRODUCTOS: Producto[] = [
  { id: "proplan-adult-15kg", nombre: "Pro Plan Adultos 15 kg", categoria: "perros", precio: 64990, rating: 4.9, desc: "Alimento completo para perros adultos, todas las razas.", imagen: img("1589924691995-400dc9ecc119") },
  { id: "proplan-puppy-15kg", nombre: "Pro Plan Cachorros 15 kg", categoria: "perros", precio: 67990, rating: 4.8, desc: "Nutrición para el crecimiento de cachorros.", imagen: img("1601758228041-f3b2795255f1") },
  { id: "cama-perro-m", nombre: "Cama acolchada talla M", categoria: "perros", precio: 19990, rating: 4.6, desc: "Cama suave y lavable para perros medianos.", imagen: img("1591946614720-90a587da4a36") },
  { id: "juguete-mordedor", nombre: "Juguete mordedor de goma", categoria: "perros", precio: 5990, rating: 4.5, desc: "Juguete resistente para horas de juego.", imagen: img("1576201836106-db1758fd1c97") },
  { id: "proplan-gato-3kg", nombre: "Pro Plan Gato Adulto 3 kg", categoria: "gatos", precio: 24990, rating: 4.9, desc: "Alimento balanceado para gatos adultos.", imagen: img("1514888286974-6c03e2ca1dba") },
  { id: "arena-gato-10l", nombre: "Arena sanitaria 10 L", categoria: "gatos", precio: 8990, rating: 4.7, desc: "Arena aglomerante con control de olores.", imagen: img("1573865526739-10659fec78a5") },
  { id: "rascador-torre", nombre: "Rascador torre con juguete", categoria: "gatos", precio: 29990, rating: 4.6, desc: "Rascador alto con plataformas y juguete.", imagen: img("1545249390-6bdfa286032f") },
  { id: "alimento-aves-1kg", nombre: "Mezcla de semillas aves 1 kg", categoria: "aves", precio: 4990, rating: 4.5, desc: "Mezcla nutritiva para canarios y periquitos.", imagen: img("1452570053594-1b985d6ea890") },
  { id: "jaula-mediana", nombre: "Jaula mediana para aves", categoria: "aves", precio: 27990, rating: 4.4, desc: "Jaula con comederos y palos incluidos.", imagen: img("1604848698030-c434ba08ece1") },
  { id: "alimento-peces-100g", nombre: "Alimento en escamas peces 100 g", categoria: "peces", precio: 3990, rating: 4.6, desc: "Escamas para peces tropicales de agua dulce.", imagen: img("1535591273668-578e31182c4f") },
  { id: "pecera-20l", nombre: "Pecera 20 L con tapa", categoria: "peces", precio: 34990, rating: 4.7, desc: "Pecera de vidrio con tapa y espacio para filtro.", imagen: img("1522069169874-c58ec4b76be5") },
  { id: "alimento-conejo-1kg", nombre: "Alimento para conejos 1 kg", categoria: "roedores", precio: 5490, rating: 4.6, desc: "Pellet balanceado para conejos y cuyes.", imagen: img("1452857297128-d9c29adba80b") },
  { id: "viruta-jaula-2kg", nombre: "Viruta para jaula 2 kg", categoria: "roedores", precio: 4290, rating: 4.5, desc: "Sustrato absorbente para roedores pequeños.", imagen: img("1591871937573-74dbba515c4c") },
  { id: "bebedero-roedor", nombre: "Bebedero de botella 250 ml", categoria: "roedores", precio: 3990, rating: 4.4, desc: "Bebedero antigoteo para jaulas.", imagen: img("1425082661705-1834bfd09dca") },

  /* ---- Catálogo ampliado (para probar el layout con muchos ítems) ---- */
  { id: "collar-ajustable-perro", nombre: "Collar ajustable con hebilla", categoria: "perros", precio: 6990, rating: 4.6, desc: "Collar de nylon resistente, tallas S a L.", imagen: img("1576201836106-db1758fd1c97") },
  { id: "correa-retractil-5m", nombre: "Correa retráctil 5 m", categoria: "perros", precio: 12990, rating: 4.7, desc: "Correa extensible con freno y bloqueo.", imagen: img("1591946614720-90a587da4a36") },
  { id: "shampoo-perro-avena", nombre: "Shampoo de avena 500 ml", categoria: "perros", precio: 7490, rating: 4.5, desc: "Limpia y calma la piel sensible.", imagen: img("1589924691995-400dc9ecc119") },
  { id: "hueso-nylon", nombre: "Hueso de nylon resistente", categoria: "perros", precio: 6490, rating: 4.4, desc: "Juguete masticable de larga duración.", imagen: img("1576201836106-db1758fd1c97") },
  { id: "plato-doble-acero", nombre: "Comedero doble de acero", categoria: "perros", precio: 9990, rating: 4.7, desc: "Dos tazones inoxidables con base antideslizante.", imagen: img("1591946614720-90a587da4a36") },
  { id: "snack-dental-perro", nombre: "Snacks dentales x7", categoria: "perros", precio: 4990, rating: 4.8, desc: "Ayudan a reducir el sarro y refrescan el aliento.", imagen: img("1589924691995-400dc9ecc119") },
  { id: "pechera-antitiron", nombre: "Pechera antitirón talla M", categoria: "perros", precio: 14990, rating: 4.6, desc: "Arnés acolchado con anilla frontal.", imagen: img("1601758228041-f3b2795255f1") },
  { id: "alimento-senior-perro-3kg", nombre: "Alimento Senior 3 kg", categoria: "perros", precio: 18990, rating: 4.7, desc: "Nutrición para perros mayores de 7 años.", imagen: img("1589924691995-400dc9ecc119") },

  { id: "rascador-alfombra", nombre: "Rascador de alfombra plano", categoria: "gatos", precio: 8990, rating: 4.5, desc: "Superficie de sisal para afilar las uñas.", imagen: img("1545249390-6bdfa286032f") },
  { id: "juguete-raton-catnip", nombre: "Set 3 ratones con catnip", categoria: "gatos", precio: 3990, rating: 4.6, desc: "Juguetes livianos con hierba gatera.", imagen: img("1514888286974-6c03e2ca1dba") },
  { id: "comedero-antivuelco-gato", nombre: "Comedero antivuelco", categoria: "gatos", precio: 5990, rating: 4.5, desc: "Base ancha que evita derrames.", imagen: img("1573865526739-10659fec78a5") },
  { id: "shampoo-seco-gato", nombre: "Shampoo seco para gatos", categoria: "gatos", precio: 6490, rating: 4.4, desc: "Baño en seco sin agua, aroma neutro.", imagen: img("1514888286974-6c03e2ca1dba") },
  { id: "snack-gato-salmon", nombre: "Snacks de salmón 60 g", categoria: "gatos", precio: 3490, rating: 4.8, desc: "Premios blandos ricos en omega 3.", imagen: img("1573865526739-10659fec78a5") },
  { id: "tunel-plegable-gato", nombre: "Túnel plegable para gato", categoria: "gatos", precio: 11990, rating: 4.6, desc: "Túnel de juego con abertura central.", imagen: img("1545249390-6bdfa286032f") },
  { id: "transportadora-gato", nombre: "Transportadora rígida", categoria: "gatos", precio: 22990, rating: 4.7, desc: "Con puerta de seguridad y buena ventilación.", imagen: img("1514888286974-6c03e2ca1dba") },

  { id: "bebedero-aves", nombre: "Bebedero de jaula para aves", categoria: "aves", precio: 2990, rating: 4.4, desc: "Bebedero plástico de fácil montaje.", imagen: img("1452570053594-1b985d6ea890") },
  { id: "columpio-madera-aves", nombre: "Columpio de madera", categoria: "aves", precio: 3490, rating: 4.5, desc: "Juguete natural para canarios y periquitos.", imagen: img("1604848698030-c434ba08ece1") },
  { id: "vitaminas-aves", nombre: "Vitaminas en gotas 30 ml", categoria: "aves", precio: 4990, rating: 4.6, desc: "Complemento para el plumaje y la energía.", imagen: img("1452570053594-1b985d6ea890") },
  { id: "nido-canarios", nombre: "Nido de fibra para canarios", categoria: "aves", precio: 3990, rating: 4.4, desc: "Nido de temporada de cría con soporte.", imagen: img("1604848698030-c434ba08ece1") },

  { id: "filtro-mochila-pecera", nombre: "Filtro mochila 200 L/h", categoria: "peces", precio: 15990, rating: 4.7, desc: "Filtración de cascada para peceras chicas.", imagen: img("1522069169874-c58ec4b76be5") },
  { id: "termometro-acuario", nombre: "Termómetro adhesivo", categoria: "peces", precio: 2490, rating: 4.3, desc: "Medición externa de temperatura.", imagen: img("1535591273668-578e31182c4f") },
  { id: "red-pesca-peces", nombre: "Red para peces 10 cm", categoria: "peces", precio: 1990, rating: 4.4, desc: "Malla fina de mango largo.", imagen: img("1522069169874-c58ec4b76be5") },
  { id: "planta-artificial-acuario", nombre: "Planta artificial 20 cm", categoria: "peces", precio: 3490, rating: 4.5, desc: "Decoración segura y realista para el acuario.", imagen: img("1535591273668-578e31182c4f") },

  { id: "rueda-ejercicio-hamster", nombre: "Rueda silenciosa 18 cm", categoria: "roedores", precio: 6990, rating: 4.6, desc: "Rueda de ejercicio sin ruido para hámsters.", imagen: img("1591871937573-74dbba515c4c") },
  { id: "casa-madera-roedor", nombre: "Casa de madera para roedor", categoria: "roedores", precio: 8490, rating: 4.5, desc: "Refugio natural que también roen.", imagen: img("1452857297128-d9c29adba80b") },
  { id: "heno-timothy-1kg", nombre: "Heno Timothy 1 kg", categoria: "roedores", precio: 5990, rating: 4.8, desc: "Fibra esencial para conejos y cuyes.", imagen: img("1452857297128-d9c29adba80b") },

  { id: "lampara-uvb-reptil", nombre: "Lámpara UVB para reptil", categoria: "reptiles", precio: 16990, rating: 4.6, desc: "Aporta radiación para el metabolismo del calcio.", imagen: img("1425082661705-1834bfd09dca") },
  { id: "sustrato-coco-reptil", nombre: "Sustrato de coco 5 L", categoria: "reptiles", precio: 6490, rating: 4.5, desc: "Fibra que retiene humedad para terrarios.", imagen: img("1591871937573-74dbba515c4c") },

  { id: "toallitas-humedas-mascota", nombre: "Toallitas húmedas x80", categoria: "higiene", precio: 4490, rating: 4.6, desc: "Limpieza rápida de patas y pelaje.", imagen: img("1576201836106-db1758fd1c97") },
  { id: "cepillo-quita-pelo", nombre: "Cepillo quita pelo", categoria: "accesorios", precio: 7990, rating: 4.7, desc: "Reduce la muda y desenreda el pelaje.", imagen: img("1601758228041-f3b2795255f1") },
];

export const ITEMS_BY_ID: Record<string, Producto> = Object.fromEntries(
  PRODUCTOS.map((p) => [p.id, p]),
);

export function buildWhatsappLink(text: string) {
  return `https://wa.me/${WHATSAPP_NUMERO}?text=${encodeURIComponent(text)}`;
}
