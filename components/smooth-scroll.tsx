"use client";

import "lenis/dist/lenis.css";
import { ReactLenis } from "lenis/react";
import { useEffect, useState } from "react";

/**
 * Scroll suave con inercia (Lenis) para toda la app.
 *
 * - `anchors: true` hace que los links internos (#inicio, #productos, …) se
 *   deslicen con la misma inercia en vez del salto nativo.
 * - Si el usuario pide reducir movimiento, se omite Lenis por completo y se
 *   deja el scroll nativo del navegador (respetando `prefers-reduced-motion`).
 */
export function SmoothScroll({ children }: { children: React.ReactNode }) {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);
    const onChange = (e: MediaQueryListEvent) => setReduced(e.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  if (reduced) return <>{children}</>;

  return (
    <ReactLenis root options={{ anchors: { offset: -80 }, lerp: 0.1 }}>
      {children}
    </ReactLenis>
  );
}
