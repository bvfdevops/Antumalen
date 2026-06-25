import type { Route } from "next";
import { redirect } from "next/navigation";

// La página principal es el "estudio" (muestra las 3 opciones).
// El sitio de la tienda de mascotas vive en /inicio.
export default function Page() {
  const target: string = "/estudio.html";
  redirect(target as Route);
}
