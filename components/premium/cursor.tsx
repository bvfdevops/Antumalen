"use client";

import { PawPrint } from "@phosphor-icons/react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { useEffect, useState } from "react";

/**
 * Cursor personalizado con temática de mascotas: una huella que sigue al
 * puntero con una inercia leve, se agranda y se rellena sobre elementos
 * interactivos y hace un "pisotón" al hacer click.
 *
 * Se activa solo en desktop con puntero fino (mouse/trackpad) y se apaga por
 * completo si el usuario pide reducir movimiento o está en touch — en esos
 * casos queda el cursor nativo del sistema.
 */
export function PetCursor() {
  const [enabled, setEnabled] = useState(false);
  const [hover, setHover] = useState(false);
  const [down, setDown] = useState(false);

  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  // Spring tenso: sigue de cerca al puntero (precisión) con un dejo de inercia.
  const pawX = useSpring(x, { damping: 30, stiffness: 700, mass: 0.4 });
  const pawY = useSpring(y, { damping: 30, stiffness: 700, mass: 0.4 });

  useEffect(() => {
    const fine = window.matchMedia("(pointer: fine)").matches;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!fine || reduced) return;

    setEnabled(true);
    document.documentElement.classList.add("has-custom-cursor");

    const move = (e: MouseEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
      const t = e.target as Element | null;
      setHover(Boolean(t?.closest?.("a, button, [role='button'], label, summary")));
    };
    const down_ = () => setDown(true);
    const up_ = () => setDown(false);

    window.addEventListener("mousemove", move);
    window.addEventListener("mousedown", down_);
    window.addEventListener("mouseup", up_);
    return () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mousedown", down_);
      window.removeEventListener("mouseup", up_);
      document.documentElement.classList.remove("has-custom-cursor");
    };
  }, [x, y]);

  if (!enabled) return null;

  return (
    <motion.div
      aria-hidden
      style={{ x: pawX, y: pawY }}
      className="pointer-events-none fixed left-0 top-0 z-[100]"
    >
      <motion.div
        className="-ml-3 -mt-3"
        animate={{
          scale: (hover ? 1.55 : 1) * (down ? 0.78 : 1),
          rotate: hover ? -8 : -18,
        }}
        transition={{ type: "spring", damping: 18, stiffness: 280 }}
      >
        <PawPrint
          className="size-6 drop-shadow-[0_1px_2px_rgba(0,0,0,0.25)]"
          style={{ color: hover ? "var(--pm-accent-dark)" : "var(--pm-accent)" }}
          weight={hover ? "fill" : "duotone"}
        />
      </motion.div>
    </motion.div>
  );
}
