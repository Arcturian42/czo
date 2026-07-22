import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { CaseStudy } from "@/types";
import { Badge } from "@/components/ui/badge";
import { ImagePlaceholder } from "@/components/ui/image-placeholder";

/** Carte de réalisation (aperçu), reliée au détail sur /realisations. */
export function CaseStudyCard({ study }: { study: CaseStudy }) {
  const cover = study.images[0];
  return (
    <article className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-line bg-paper transition duration-300 hover:-translate-y-0.5 hover:shadow-card">
      {cover?.src ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={cover.src}
          alt={cover.alt}
          className="aspect-[16/10] w-full object-cover"
        />
      ) : (
        <ImagePlaceholder
          ratio="aspect-[16/10]"
          label={cover?.alt ?? "Photographie à intégrer"}
          className="rounded-none border-0 border-b border-line"
        />
      )}

      <div className="flex flex-1 flex-col p-6">
        <Badge tone="neutral" className="self-start">{study.device}</Badge>
        <h3 className="mt-3 text-lg font-semibold text-ink">
          <Link
            href={`/realisations#${study.slug}`}
            className="after:absolute after:inset-0 focus-visible:outline-none"
          >
            {study.title}
          </Link>
        </h3>
        <p className="mt-2 flex-1 leading-relaxed text-muted">{study.summary}</p>
        <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-primary-700">
          Lire l'étude de cas
          <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
        </span>
      </div>
    </article>
  );
}
