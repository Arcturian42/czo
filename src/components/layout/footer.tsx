import Link from "next/link";
import { MapPin, Phone, Mail, Clock } from "lucide-react";
import { footerNav } from "@/config/nav";
import { siteConfig, telHref, isPlaceholder } from "@/config/site";
import { Logo } from "./logo";
import { GoldSeam } from "@/components/ui/gold-seam";
import { CircuitMotif } from "@/components/marketing/circuit-motif";

/** Pied de page : marque, contact, navigation, mentions légales. */
export function Footer() {
  const year = 2026; // millésime fixe (mis à jour au déploiement)
  const tel = telHref();

  return (
    <footer className="relative mt-auto overflow-hidden bg-ink text-white/70">
      {/* Signature de marque : chaque page se referme sur la jointure d'or. */}
      <GoldSeam glow className="absolute inset-x-0 top-0" />
      <CircuitMotif className="absolute -right-16 -top-10 hidden h-80 w-80 text-white/[0.05] md:block" />
      <div className="container-edge relative py-14 pb-28 md:py-16 lg:pb-16">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_2fr]">
          <div className="max-w-sm">
            <Logo onDark />
            <p className="mt-4 text-sm leading-relaxed text-white/60">
              {siteConfig.shortPitch}
            </p>
            <p className="mt-4 text-sm font-medium text-white/80">{siteConfig.tagline}</p>

            <ul className="mt-6 space-y-2.5 text-sm">
              <li className="flex items-start gap-2.5">
                <MapPin className="mt-0.5 size-4 shrink-0 text-primary-300" aria-hidden="true" />
                <span>
                  {isPlaceholder(siteConfig.address) ? "[ADRESSE]" : siteConfig.address}
                  {" · "}
                  {siteConfig.city}
                </span>
              </li>
              <li className="flex items-start gap-2.5">
                <Phone className="mt-0.5 size-4 shrink-0 text-primary-300" aria-hidden="true" />
                {isPlaceholder(siteConfig.phone) ? (
                  <span>[TÉLÉPHONE]</span>
                ) : (
                  <a href={tel} className="hover:text-white">
                    {siteConfig.phone}
                  </a>
                )}
              </li>
              <li className="flex items-start gap-2.5">
                <Mail className="mt-0.5 size-4 shrink-0 text-primary-300" aria-hidden="true" />
                {isPlaceholder(siteConfig.email) ? (
                  <span>[EMAIL]</span>
                ) : (
                  <a href={`mailto:${siteConfig.email}`} className="hover:text-white">
                    {siteConfig.email}
                  </a>
                )}
              </li>
              <li className="flex items-start gap-2.5">
                <Clock className="mt-0.5 size-4 shrink-0 text-primary-300" aria-hidden="true" />
                <span>
                  {siteConfig.openingHours
                    .map((h) => `${h.days} : ${h.hours}`)
                    .join(" · ")}
                </span>
              </li>
            </ul>
            <p className="mt-5 text-sm text-white/60">{siteConfig.coverageNote}</p>
          </div>

          <div className="grid grid-cols-2 gap-8 sm:grid-cols-4">
            {footerNav.map((col) => (
              <div key={col.title}>
                <h2 className="text-xs font-semibold uppercase tracking-wider text-white/50">
                  {col.title}
                </h2>
                <ul className="mt-4 space-y-2.5 text-sm">
                  {col.items.map((item) => (
                    <li key={item.href}>
                      <Link href={item.href} className="text-white/70 transition-colors hover:text-white">
                        {item.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-3 border-t border-white/10 pt-6 text-xs text-white/50 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} {isPlaceholder(siteConfig.legalName) ? siteConfig.brandName : siteConfig.legalName}. Tous droits réservés.
          </p>
          <p>Réparation et formation en électronique — {siteConfig.city}</p>
        </div>
      </div>
    </footer>
  );
}
