"use client";

import { useState } from "react";
import { Catalog } from "@/components/site/catalog";
import { Categories } from "@/components/site/categories";
import { Features } from "@/components/site/features";
import { Hero } from "@/components/site/hero";
import { Testimonials } from "@/components/site/testimonials";
import { CATEGORIAS, PRODUCTOS } from "@/lib/data";

export function Home() {
  const [filtroTienda, setFiltroTienda] = useState("todos");

  function pickCategoria(id: string) {
    setFiltroTienda(id);
    document.getElementById("productos")?.scrollIntoView({ behavior: "smooth" });
  }

  return (
    <main>
      <Hero />
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
      <Features />
      <Testimonials />
    </main>
  );
}
