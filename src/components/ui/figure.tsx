"use client";

import { useState } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { ImagePlaceholder } from "./image-placeholder";

/**
 * Image illustrative avec repli automatique.
 *
 * - Si `src` est fourni et se charge : image optimisée via next/image.
 * - Si `src` est vide OU si le chargement échoue : placeholder élégant.
 *
 * Le repli garantit qu'aucune image cassée n'apparaît jamais (CDN indisponible,
 * fichier manquant, etc.), tout en conservant un ratio fixe (pas de CLS).
 */
export function Figure({
  src,
  alt,
  ratio = "aspect-[4/3]",
  tone = "light",
  priority = false,
  sizes = "(min-width: 1024px) 40vw, 100vw",
  className,
}: {
  src?: string;
  alt: string;
  ratio?: string;
  tone?: "light" | "primary" | "ink";
  priority?: boolean;
  sizes?: string;
  className?: string;
}) {
  const [failed, setFailed] = useState(false);

  if (!src || failed) {
    return <ImagePlaceholder ratio={ratio} label={alt} tone={tone} className={className} />;
  }

  return (
    <div className={cn("relative overflow-hidden rounded-2xl border border-line", ratio, className)}>
      <Image
        src={src}
        alt={alt}
        fill
        priority={priority}
        sizes={sizes}
        className="object-cover"
        onError={() => setFailed(true)}
      />
    </div>
  );
}
