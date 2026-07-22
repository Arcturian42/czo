import Link from "next/link";
import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";

/**
 * Logo / wordmark. Glyphe minimal évoquant un nœud de circuit + nom de marque.
 * Le nom vient de siteConfig (placeholder tant que non renseigné).
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
        "group inline-flex items-center gap-2.5 rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-600 focus-visible:ring-offset-2",
        onDark ? "focus-visible:ring-offset-ink" : "focus-visible:ring-offset-paper",
        className,
      )}
    >
      <span
        className={cn(
          "grid size-9 place-items-center rounded-lg",
          onDark ? "bg-white/10" : "bg-primary-600",
        )}
        aria-hidden="true"
      >
        <svg viewBox="0 0 24 24" fill="none" className="size-5">
          <path
            d="M5 12h5m4 0h5M12 5v5m0 4v5"
            stroke="#fff"
            strokeWidth="1.6"
            strokeLinecap="round"
          />
          <circle cx="12" cy="12" r="2.6" fill="#fff" />
        </svg>
      </span>
      <span
        className={cn(
          "text-lg font-semibold tracking-tight",
          onDark ? "text-white" : "text-ink",
        )}
      >
        {siteConfig.brandName}
      </span>
    </Link>
  );
}
