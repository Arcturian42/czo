import { Check } from "lucide-react";
import type { RepairCategory } from "@/types";
import { Card } from "@/components/ui/card";
import { ButtonLink } from "@/components/ui/button";

/** Carte d'une famille de réparation, avec deux parcours : réparer / apprendre. */
export function RepairCategoryCard({ category }: { category: RepairCategory }) {
  const Icon = category.icon;
  return (
    <Card className="flex h-full flex-col">
      <div className="flex items-start gap-4">
        <span className="grid size-12 shrink-0 place-items-center rounded-xl bg-primary-50 text-primary-700">
          <Icon className="size-6" aria-hidden="true" />
        </span>
        <div>
          <h3 className="text-xl font-semibold text-ink">{category.title}</h3>
          <p className="mt-1 text-sm leading-relaxed text-muted">{category.intro}</p>
        </div>
      </div>

      <ul className="mt-6 grid grid-cols-1 gap-x-4 gap-y-2 sm:grid-cols-2">
        {category.services.map((service) => (
          <li key={service} className="flex items-center gap-2 text-sm text-ink">
            <Check className="size-4 shrink-0 text-primary-600" aria-hidden="true" />
            {service}
          </li>
        ))}
      </ul>

      <div className="mt-7 flex flex-col gap-2.5 border-t border-line pt-5 sm:flex-row">
        <ButtonLink
          href={`/diagnostic?appareil=${category.slug}`}
          size="sm"
          className="flex-1"
        >
          Faire réparer
        </ButtonLink>
        <ButtonLink
          href="/se-former"
          variant="outline"
          size="sm"
          className="flex-1"
        >
          Apprendre à réparer
        </ButtonLink>
      </div>
    </Card>
  );
}
