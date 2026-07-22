"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { mainNav, primaryCta, secondaryCta } from "@/config/nav";
import { buttonVariants } from "@/components/ui/button";
import { Logo } from "./logo";
import { MobileNavigation } from "./mobile-navigation";
import { cn } from "@/lib/utils";

/** En-tête fixe : wordmark, navigation, CTA permanents, menu mobile. */
export function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 border-b transition-colors duration-300",
        scrolled
          ? "border-line bg-paper/85 backdrop-blur-md supports-[backdrop-filter]:bg-paper/70"
          : "border-transparent bg-paper",
      )}
    >
      <a
        href="#contenu"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-3 focus:z-[60] focus:rounded-lg focus:bg-ink focus:px-4 focus:py-2 focus:text-sm focus:text-white"
      >
        Aller au contenu
      </a>
      <div className="container-edge flex h-16 items-center justify-between gap-4 md:h-[4.5rem]">
        <Logo />

        <nav aria-label="Navigation principale" className="hidden lg:block">
          <ul className="flex items-center gap-1">
            {mainNav.map((item) => {
              const active =
                pathname === item.href ||
                (item.href !== "/" && pathname.startsWith(item.href));
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    aria-current={active ? "page" : undefined}
                    className={cn(
                      "rounded-full px-3.5 py-2 text-sm font-medium transition-colors",
                      active
                        ? "text-primary-800"
                        : "text-muted hover:text-ink",
                    )}
                  >
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <Link
            href={secondaryCta.href}
            className={buttonVariants({
              variant: "ghost",
              size: "sm",
              className: "hidden xl:inline-flex",
            })}
          >
            {secondaryCta.label}
          </Link>
          <Link
            href={primaryCta.href}
            className={buttonVariants({ size: "sm", className: "hidden sm:inline-flex" })}
          >
            {primaryCta.label}
          </Link>
          <MobileNavigation />
        </div>
      </div>
    </header>
  );
}
