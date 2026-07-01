"use client";

import { motion, useMotionValue, useSpring } from "framer-motion";
import { useEffect, useState } from "react";

/**
 * Cursor personalizado de marca: un punto preciso pegado al puntero y un
 * anillo que lo persigue con inercia. El anillo crece sobre elementos
 * interactivos y se encoge al hacer click.
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
  const ringX = useSpring(x, { damping: 28, stiffness: 350, mass: 0.5 });
  const ringY = useSpring(y, { damping: 28, stiffness: 350, mass: 0.5 });

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
    <>
      {/* Punto preciso (sin inercia) */}
      <motion.div
        aria-hidden
        style={{ x, y }}
        className="pointer-events-none fixed left-0 top-0 z-[100]"
      >
        <div className="-ml-1 -mt-1 size-2 rounded-full bg-[color:var(--pm-accent-dark)]" />
      </motion.div>

      {/* Anillo que persigue con inercia */}
      <motion.div
        aria-hidden
        style={{ x: ringX, y: ringY }}
        className="pointer-events-none fixed left-0 top-0 z-[100]"
      >
        <motion.div
          className="-ml-[17px] -mt-[17px] size-[34px] rounded-full border-2 border-[color:var(--pm-accent)]"
          animate={{ scale: (hover ? 1.6 : 1) * (down ? 0.82 : 1), opacity: hover ? 0.9 : 0.5 }}
          transition={{ type: "spring", damping: 20, stiffness: 300 }}
        />
      </motion.div>
    </>
  );
}
