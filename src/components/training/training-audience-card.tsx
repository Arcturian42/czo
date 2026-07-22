import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { TrainingAudience } from "@/types";
import { Card } from "@/components/ui/card";

/** Carte d'un profil de formation. */
export function TrainingAudienceCard({ audience }: { audience: TrainingAudience }) {
  const Icon = audience.icon;
  return (
    <Card interactive className="flex h-full flex-col" id={audience.key}>
      <span className="grid size-11 place-items-center rounded-xl bg-accent-500/10 text-accent-600">
        <Icon className="size-5" aria-hidden="true" />
      </span>
      <h3 className="mt-5 text-xl font-semibold text-ink">{audience.title}</h3>
      <p className="mt-2 text-sm leading-relaxed text-muted">{audience.audience}</p>

      <dl className="mt-5 space-y-3 border-t border-line pt-5 text-sm">
        <div>
          <dt className="font-medium text-ink">Ce que vous apprenez</dt>
          <dd className="mt-0.5 text-muted">{audience.learn}</dd>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <dt className="font-medium text-ink">Niveau</dt>
            <dd className="mt-0.5 text-muted">{audience.level}</dd>
          </div>
          <div>
            <dt className="font-medium text-ink">Pratique</dt>
            <dd className="mt-0.5 text-muted">{audience.practice}</dd>
          </div>
        </div>
      </dl>

      <div className="mt-6 pt-1">
        <Link
          href={audience.cta.href}
          className="inline-flex items-center gap-1.5 text-sm font-medium text-primary-700 hover:text-primary-800"
        >
          {audience.cta.label}
          <ArrowRight className="size-4" aria-hidden="true" />
        </Link>
      </div>
    </Card>
  );
}
