import { cn } from "@/lib/utils";

/**
 * Motif décoratif inspiré des circuits électroniques.
 * Purement décoratif (aria-hidden), très léger, sans animation permanente.
 */
export function CircuitMotif({ className }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      focusable="false"
      viewBox="0 0 400 400"
      fill="none"
      className={cn("pointer-events-none select-none", className)}
    >
      <g stroke="currentColor" strokeWidth="1.25" opacity="0.9">
        <path d="M20 60h120v80h90" />
        <path d="M20 200h60v120h140" />
        <path d="M380 40v120h-90v100" />
        <path d="M300 380V260h-70" />
        <path d="M140 60V20" />
        <path d="M230 140h150" />
        <path d="M220 320h160" />
      </g>
      <g fill="currentColor">
        <circle cx="140" cy="140" r="4.5" />
        <circle cx="230" cy="140" r="4.5" />
        <circle cx="80" cy="200" r="4.5" />
        <circle cx="220" cy="320" r="4.5" />
        <circle cx="290" cy="160" r="4.5" />
        <circle cx="300" cy="260" r="4.5" />
      </g>
    </svg>
  );
}
