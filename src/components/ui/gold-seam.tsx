import { cn } from "@/lib/utils";

/**
 * Le « fil d'or » — la jointure kintsugi de la marque.
 *
 * Un filet de cuivre qui s'estompe à ses extrémités : il transforme une
 * simple séparation en réparation visible et précieuse. C'est le motif
 * identitaire de Kinto (金継ぎ) — le métal (l'appareil) réuni par l'or (le geste).
 *
 * Purement décoratif : toujours `aria-hidden`.
 */
export function GoldSeam({
  className,
  glow = false,
  bold = false,
  orientation = "horizontal",
  length = "full",
}: {
  className?: string;
  /** Halo cuivré léger. */
  glow?: boolean;
  /** Filet plus marqué (2px) au lieu du cheveu (1px). */
  bold?: boolean;
  orientation?: "horizontal" | "vertical";
  /** Longueur du filet : pleine ou courte (accent signature). */
  length?: "full" | "short";
}) {
  const horizontal = orientation === "horizontal";
  return (
    <span
      aria-hidden="true"
      className={cn(
        "block",
        horizontal ? "gold-seam" : "gold-seam-v",
        glow && "gold-seam-glow",
        horizontal
          ? length === "short"
            ? "w-14"
            : "w-full"
          : length === "short"
            ? "h-14"
            : "h-full",
        bold && (horizontal ? "h-0.5" : "w-0.5"),
        className,
      )}
    />
  );
}
