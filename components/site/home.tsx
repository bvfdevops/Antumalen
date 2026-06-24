"use client";

import { useState } from "react";
import { useStore } from "@/components/store-provider";
import { Catalog } from "@/components/site/catalog";
import { Categories } from "@/components/site/categories";
import { Features } from "@/components/site/features";
import { Hero } from "@/components/site/hero";
import { Testimonials } from "@/components/site/testimonials";
import {
  CATEGORIAS,
  MENU,
  MENU_CATEGORIAS,
  PRODUCTOS,
} from "@/lib/data";

export function Home() {
  const { mode } = useStore();
  const [filtroTienda, setFiltroTienda] = useState("todos");
  const [filtroMenu, setFiltroMenu] = useState("todos");

  function pickCategoria(id: string) {
    setFiltroTienda(id);
    document.getElementById("productos")?.scrollIntoView({ behavior: "smooth" });
  }

  return (
    <main>
      <Hero />

      {mode === "tienda" ? (
        <>
          <Categories onPick={pickCategoria} />
          <Catalog
            id="productos"
            eyebrow="Productos"
            title="Nuestros"
            accent="destacados"
            description="Elige tus productos, agrégalos al carrito y envía tu pedido por WhatsApp."
            items={PRODUCTOS}
            categorias={CATEGORIAS}
            filtro={filtroTienda}
            onFiltro={setFiltroTienda}
            layoutId="filtro-tienda"
          />
          <Features variant="beneficios" />
          <Testimonials mode="tienda" />
        </>
      ) : (
        <>
          <Features variant="info" />
          <Catalog
            id="menu"
            eyebrow="Nuestro menú"
            title="Elige y"
            accent="pide por WhatsApp"
            description="Agrega tus platos al pedido y te confirmamos disponibilidad y entrega."
            items={MENU}
            categorias={MENU_CATEGORIAS}
            filtro={filtroMenu}
            onFiltro={setFiltroMenu}
            layoutId="filtro-menu"
            note="Precios y platos de referencia. La carta puede variar — consúltanos por WhatsApp. 🙂"
          />
          <Testimonials mode="restaurante" />
        </>
      )}
    </main>
  );
}
