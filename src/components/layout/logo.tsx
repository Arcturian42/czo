import Link from "next/link";
import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";

/**
 * Wordmark Kinto — serif éditorial suivi d'un losange d'or.
 *
 * Le losange est le « point » de Kinto : le fil d'or du kintsugi (金継ぎ)
 * condensé en un signe — la jointure précieuse, réduite à sa plus simple
 * expression. Le nom vient de `siteConfig` (placeholder tant que non renseigné).
 */
export function Logo({
  className,
  onDark = false,
}: {
  className?: string;
  onDark?: boolean;
}) {
  return (
    <Link
      href="/"
      aria-label={`${siteConfig.brandName} — accueil`}
      className={cn(
        "group inline-flex items-baseline gap-1.5 rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-600 focus-visible:ring-offset-2",
        onDark
          ? "focus-visible:ring-offset-ink"
          : "focus-visible:ring-offset-paper",
        className,
      )}
    >
      <span
        className={cn(
          "font-serif text-[1.6rem] font-medium leading-none tracking-[-0.01em]",
          onDark ? "text-white" : "text-ink",
        )}
      >
        {siteConfig.brandName}
      </span>
      {/* Le losange d'or : le point final de la marque, la jointure d'or. */}
      <span
        aria-hidden="true"
        className="size-2 rotate-45 rounded-[1.5px] bg-[image:var(--seam-gold)] shadow-[0_0_9px_-1px_rgba(219,138,82,0.75)] transition-transform duration-500 ease-out group-hover:rotate-[225deg]"
      />
    </Link>
  );
}
