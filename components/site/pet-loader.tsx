import { cn } from "@/lib/utils";

function PawIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
      className={cn("size-6", className)}
    >
      {/* Almohadilla central */}
      <path d="M12 13.2c2.3 0 4.4 1.7 4.4 3.8 0 1.6-1.3 2.6-3 2.6-.6 0-1-.2-1.4-.2s-.8.2-1.4.2c-1.7 0-3-1-3-2.6 0-2.1 2.1-3.8 4.4-3.8Z" />
      {/* Dedos */}
      <ellipse cx="7.4" cy="11" rx="1.5" ry="2" />
      <ellipse cx="16.6" cy="11" rx="1.5" ry="2" />
      <ellipse cx="9.9" cy="8.2" rx="1.4" ry="1.9" />
      <ellipse cx="14.1" cy="8.2" rx="1.4" ry="1.9" />
    </svg>
  );
}

/**
 * Loader con temática de mascotas: huellas que aparecen en secuencia
 * como si un animalito caminara, con los colores de marca.
 */
export function PetLoader({ label = "Cargando…" }: { label?: string }) {
  return (
    <div
      role="status"
      aria-live="polite"
      className="flex min-h-[60vh] flex-col items-center justify-center gap-5 px-6 text-center"
    >
      <div className="paw-loader text-brand">
        <PawIcon className="paw size-5 text-brand/60" />
        <PawIcon className="paw size-6 text-brand/80" />
        <PawIcon className="paw size-7 text-brand" />
        <PawIcon className="paw size-6 text-brand/80" />
        <PawIcon className="paw size-5 text-brand/60" />
      </div>
      <p className="font-display text-lg text-muted-foreground">{label}</p>
      <span className="sr-only">Cargando contenido</span>
    </div>
  );
}
