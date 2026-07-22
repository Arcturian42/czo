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
  width = "full",
}: {
  className?: string;
  /** Halo cuivré léger — pour les fonds sombres. */
  glow?: boolean;
  /** Largeur du filet : pleine ou courte (accent). */
  width?: "full" | "short";
}) {
  return (
    <span
      aria-hidden="true"
      className={cn(
        "gold-seam block",
        glow && "gold-seam-glow",
        width === "short" ? "w-12" : "w-full",
        className,
      )}
    />
  );
}
