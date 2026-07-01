"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

// lottie-web toca `window`/`document`, así que cargamos el player solo en
// cliente (sin SSR) y bajo demanda.
const Lottie = dynamic(() => import("lottie-react"), { ssr: false });

/**
 * Animación Lottie de marca (por defecto, la mascota del carrito vacío).
 *
 * - El JSON se sirve desde /public y se baja con `fetch` recién cuando el
 *   componente se monta, así no engorda el bundle principal.
 * - Si el usuario pide reducir movimiento, se muestra el primer frame
 *   estático (sin autoplay ni loop).
 */
export function LottiePet({
  className,
  src = "/lottie/dog.json",
  loop = true,
}: {
  className?: string;
  src?: string;
  loop?: boolean;
}) {
  const [data, setData] = useState<object | null>(null);
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    setReduced(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
    let alive = true;
    fetch(src)
      .then((r) => r.json())
      .then((d) => {
        if (alive) setData(d);
      })
      .catch(() => {
        /* si falla la descarga, no rompemos la UI: queda el espacio vacío */
      });
    return () => {
      alive = false;
    };
  }, [src]);

  // Reservamos el espacio mientras carga para evitar saltos de layout.
  if (!data) return <div className={className} aria-hidden />;

  return (
    <Lottie
      animationData={data}
      loop={loop && !reduced}
      autoplay={!reduced}
      className={className}
      aria-hidden
    />
  );
}
