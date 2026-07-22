import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { absoluteUrl } from "@/lib/seo";

export type Crumb = { label: string; href: string };

/**
 * Fil d'Ariane accessible + données structurées BreadcrumbList.
 * Le premier élément « Accueil » est ajouté automatiquement.
 */
export function Breadcrumbs({ items }: { items: Crumb[] }) {
  const trail: Crumb[] = [{ label: "Accueil", href: "/" }, ...items];

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: trail.map((crumb, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: crumb.label,
      item: absoluteUrl(crumb.href),
    })),
  };

  return (
    <nav aria-label="Fil d'Ariane" className="text-sm">
      <script
        type="application/ld+json"
        // Données structurées : contenu contrôlé côté serveur.
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ol className="flex flex-wrap items-center gap-1.5 text-muted">
        {trail.map((crumb, index) => {
          const isLast = index === trail.length - 1;
          return (
            <li key={crumb.href} className="flex items-center gap-1.5">
              {isLast ? (
                <span aria-current="page" className="font-medium text-ink">
                  {crumb.label}
                </span>
              ) : (
                <Link
                  href={crumb.href}
                  className="rounded transition-colors hover:text-primary-700"
                >
                  {crumb.label}
                </Link>
              )}
              {!isLast && (
                <ChevronRight className="size-3.5 text-faint" aria-hidden="true" />
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
