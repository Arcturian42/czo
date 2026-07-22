"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, Phone, ArrowRight } from "lucide-react";
import { mainNav, primaryCta, secondaryCta } from "@/config/nav";
import { siteConfig, telHref, isPlaceholder } from "@/config/site";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

/** Menu mobile plein écran, accessible au clavier et fermé au changement de route. */
export function MobileNavigation() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const tel = telHref();
  const close = () => setOpen(false);

  // Verrouiller le scroll + fermer à Échap quand le menu est ouvert.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <div className="lg:hidden">
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label="Ouvrir le menu"
        aria-expanded={open}
        aria-controls="mobile-menu"
        className="grid size-11 place-items-center rounded-lg text-ink hover:bg-surface"
      >
        <Menu className="size-6" aria-hidden="true" />
      </button>

      {open && (
        <div
          id="mobile-menu"
          role="dialog"
          aria-modal="true"
          aria-label="Menu principal"
          className="fixed inset-0 z-[70] flex flex-col bg-paper animate-fade-in"
        >
          <div className="flex h-16 items-center justify-between border-b border-line px-5">
            <span className="text-lg font-semibold text-ink">{siteConfig.brandName}</span>
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label="Fermer le menu"
              className="grid size-11 place-items-center rounded-lg text-ink hover:bg-surface"
            >
              <X className="size-6" aria-hidden="true" />
            </button>
          </div>

          <nav className="flex-1 overflow-y-auto px-5 py-6" aria-label="Navigation principale">
            <ul className="space-y-1">
              {mainNav.map((item) => {
                const active = pathname === item.href;
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      onClick={close}
                      className={cn(
                        "flex items-center justify-between rounded-xl px-4 py-3.5 text-lg font-medium",
                        active ? "bg-primary-50 text-primary-800" : "text-ink hover:bg-surface",
                      )}
                    >
                      {item.label}
                      <ArrowRight className="size-4 text-faint" aria-hidden="true" />
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className="space-y-3 border-t border-line px-5 py-5">
            <Link href={primaryCta.href} onClick={close} className={buttonVariants({ size: "lg", className: "w-full" })}>
              {primaryCta.label}
            </Link>
            <Link
              href={secondaryCta.href}
              onClick={close}
              className={buttonVariants({ variant: "outline", size: "lg", className: "w-full" })}
            >
              {secondaryCta.label}
            </Link>
            {!isPlaceholder(siteConfig.phone) && tel && (
              <a
                href={tel}
                onClick={close}
                className={buttonVariants({ variant: "ghost", size: "md", className: "w-full" })}
              >
                <Phone className="size-4" aria-hidden="true" />
                {siteConfig.phone}
              </a>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
