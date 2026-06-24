"use client";

import { animate, motion, useInView, type Variants } from "framer-motion";
import { ImageIcon, type LucideIcon, Star } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

const EASE = [0.22, 1, 0.36, 1] as const;

/* ---------- Placeholder premium (skeleton + shimmer) ---------- */
export function Placeholder({
  ratio = "4 / 3",
  icon: Icon = ImageIcon,
  label,
  className,
  rounded = "rounded-3xl",
}: {
  ratio?: string;
  icon?: LucideIcon;
  label?: string;
  className?: string;
  rounded?: string;
}) {
  return (
    <div
      className={cn("pm-ph", rounded, className)}
      style={{ aspectRatio: ratio }}
      aria-hidden
    >
      <div className="absolute inset-0 z-[1] flex flex-col items-center justify-center gap-2 px-4 text-center text-[color:var(--pm-ph-fg)]">
        <Icon className="size-8 opacity-70 sm:size-10" strokeWidth={1.5} />
        {label ? (
          <span className="font-poppins text-[0.7rem] font-semibold uppercase tracking-[0.12em] opacity-80">
            {label}
          </span>
        ) : null}
      </div>
    </div>
  );
}

/* ---------- Animaciones (Framer Motion) ---------- */
type RevealKind = "up" | "in" | "scale";
const VARIANTS: Record<RevealKind, Variants> = {
  up: { hidden: { opacity: 0, y: 28 }, show: { opacity: 1, y: 0 } },
  in: { hidden: { opacity: 0 }, show: { opacity: 1 } },
  scale: { hidden: { opacity: 0, scale: 0.94 }, show: { opacity: 1, scale: 1 } },
};

export function Reveal({
  children,
  className,
  kind = "up",
  delay = 0,
  amount = 0.2,
}: {
  children: React.ReactNode;
  className?: string;
  kind?: RevealKind;
  delay?: number;
  amount?: number;
}) {
  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount }}
      transition={{ duration: 0.55, delay, ease: EASE }}
      variants={VARIANTS[kind]}
    >
      {children}
    </motion.div>
  );
}

/** Contenedor con stagger: hijos directos deben ser <StaggerItem>. */
export function Stagger({
  children,
  className,
  gap = 0.08,
  amount = 0.2,
}: {
  children: React.ReactNode;
  className?: string;
  gap?: number;
  amount?: number;
}) {
  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount }}
      variants={{ show: { transition: { staggerChildren: gap } } }}
    >
      {children}
    </motion.div>
  );
}

export function StaggerItem({
  children,
  className,
  kind = "up",
}: {
  children: React.ReactNode;
  className?: string;
  kind?: RevealKind;
}) {
  return (
    <motion.div
      className={className}
      variants={VARIANTS[kind]}
      transition={{ duration: 0.5, ease: EASE }}
    >
      {children}
    </motion.div>
  );
}

/* ---------- Contador animado ---------- */
export function Counter({
  to,
  suffix = "",
  prefix = "",
  duration = 1.8,
}: {
  to: number;
  suffix?: string;
  prefix?: string;
  duration?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.5 });
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const controls = animate(0, to, {
      duration,
      ease: "easeOut",
      onUpdate: (v) => setValue(Math.round(v)),
    });
    return () => controls.stop();
  }, [inView, to, duration]);

  return (
    <span ref={ref}>
      {prefix}
      {value.toLocaleString("es-CL")}
      {suffix}
    </span>
  );
}

/* ---------- Encabezado de sección ---------- */
export function SectionHead({
  eyebrow,
  title,
  subtitle,
  align = "center",
  invert = false,
}: {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  align?: "center" | "left";
  invert?: boolean;
}) {
  return (
    <Reveal
      className={cn(
        "mb-12 max-w-2xl sm:mb-16",
        align === "center" ? "mx-auto text-center" : "text-left",
      )}
    >
      {eyebrow ? (
        <span className="font-poppins text-xs font-semibold uppercase tracking-[0.18em] text-[color:var(--pm-accent-dark)]">
          {eyebrow}
        </span>
      ) : null}
      <h2
        className={cn(
          "font-display mt-3 text-3xl font-bold leading-[1.1] sm:text-4xl md:text-5xl",
          invert ? "text-white" : "text-[color:var(--pm-fg)]",
        )}
      >
        {title}
      </h2>
      {subtitle ? (
        <p
          className={cn(
            "mt-4 text-base sm:text-lg",
            invert ? "text-white/70" : "text-[color:var(--pm-muted)]",
          )}
        >
          {subtitle}
        </p>
      ) : null}
    </Reveal>
  );
}

/* ---------- Estrellas ---------- */
export function Stars({ value = 5 }: { value?: number }) {
  return (
    <div className="flex gap-0.5 text-[color:var(--pm-accent)]">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          className="size-4"
          fill={i < value ? "currentColor" : "none"}
          strokeWidth={i < value ? 0 : 1.5}
        />
      ))}
    </div>
  );
}
