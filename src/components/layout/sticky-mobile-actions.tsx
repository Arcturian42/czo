import Link from "next/link";
import { Phone, Stethoscope } from "lucide-react";
import { siteConfig, telHref, isPlaceholder } from "@/config/site";

/**
 * Barre d'actions fixe et discrète sur mobile : Appeler + Diagnostic.
 * Masquée à partir du breakpoint lg (les CTA sont visibles dans l'en-tête).
 */
export function StickyMobileActions() {
  const tel = telHref();
  const hasPhone = !isPlaceholder(siteConfig.phone) && Boolean(tel);

  return (
    <div className="fixed inset-x-0 bottom-0 z-40 lg:hidden">
      <div className="mx-auto max-w-md px-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] pt-2">
        <div className="grid grid-cols-2 gap-2 rounded-2xl border border-line bg-paper/95 p-2 shadow-elevated backdrop-blur">
          <a
            href={hasPhone ? tel : "/contact"}
            className="flex h-12 items-center justify-center gap-2 rounded-xl border border-line-strong text-sm font-medium text-ink"
          >
            <Phone className="size-4" aria-hidden="true" />
            Appeler
          </a>
          <Link
            href="/diagnostic"
            className="flex h-12 items-center justify-center gap-2 rounded-xl bg-primary-600 text-sm font-medium text-white"
          >
            <Stethoscope className="size-4" aria-hidden="true" />
            Diagnostic
          </Link>
        </div>
      </div>
    </div>
  );
}
