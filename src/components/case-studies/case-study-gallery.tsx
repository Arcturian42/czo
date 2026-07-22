import type { CaseStudy } from "@/types";
import { ImagePlaceholder } from "@/components/ui/image-placeholder";
import { Badge } from "@/components/ui/badge";

const PHASE_LABELS: Record<string, string> = {
  avant: "Avant",
  pendant: "Pendant",
  après: "Après",
};

/** Galerie avant / pendant / après d'une réalisation (ratio uniforme). */
export function CaseStudyGallery({ study }: { study: CaseStudy }) {
  return (
    <ul className="grid gap-3 sm:grid-cols-3">
      {study.images.map((image, index) => (
        <li key={index} className="space-y-2">
          {image.src ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={image.src}
              alt={image.alt}
              className="aspect-[4/3] w-full rounded-2xl border border-line object-cover"
            />
          ) : (
            <ImagePlaceholder ratio="aspect-[4/3]" label={image.alt} />
          )}
          {image.phase ? (
            <Badge tone="neutral">{PHASE_LABELS[image.phase] ?? image.phase}</Badge>
          ) : null}
        </li>
      ))}
    </ul>
  );
}
