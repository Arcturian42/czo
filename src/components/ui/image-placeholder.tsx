import { ImageIcon } from "lucide-react";
import { CircuitMotif } from "@/components/marketing/circuit-motif";
import { cn } from "@/lib/utils";

/**
 * Placeholder élégant pour les visuels manquants (photos réelles à intégrer).
 * Conserve un ratio défini pour éviter tout décalage de mise en page (CLS).
 */
export function ImagePlaceholder({
  label,
  ratio = "aspect-[4/3]",
  tone = "light",
  className,
}: {
  label?: string;
  ratio?: string;
  tone?: "light" | "primary" | "ink";
  className?: string;
}) {
  return (
    <div
      role="img"
      aria-label={label ?? "Visuel à intégrer"}
      className={cn(
        "relative flex items-center justify-center overflow-hidden rounded-2xl border",
        ratio,
        tone === "light" && "border-line bg-surface text-primary-600",
        tone === "primary" && "border-primary-200 bg-primary-50 text-primary-500",
        tone === "ink" && "border-white/10 bg-ink text-white/30",
        className,
      )}
    >
      <CircuitMotif className="absolute inset-0 h-full w-full opacity-[0.12]" />
      <div className="relative flex flex-col items-center gap-2 px-6 text-center">
        <ImageIcon className="size-7 opacity-70" aria-hidden="true" />
        {label ? (
          <span
            className={cn(
              "max-w-[16rem] text-xs font-medium",
              tone === "ink" ? "text-white/45" : "text-muted",
            )}
          >
            {label}
          </span>
        ) : null}
      </div>
    </div>
  );
}
