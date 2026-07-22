import type { Metadata } from "next";
import { MapPin, Phone, Mail, Clock } from "lucide-react";
import { buildMetadata } from "@/lib/seo";
import { siteConfig, telHref, isPlaceholder } from "@/config/site";
import { PageHeader } from "@/components/layout/page-header";
import { Section, Container } from "@/components/ui/section";
import { ContactForm } from "@/components/forms/contact-form";
import { PendingPill } from "@/components/ui/pending-note";

export const metadata: Metadata = buildMetadata({
  title: "Contact",
  description: `Contactez notre atelier de réparation et de formation en électronique à ${siteConfig.city}. Une question, un devis, une formation : nous vous répondons rapidement.`,
  path: "/contact",
});

export default function ContactPage() {
  const tel = telHref();

  const infos = [
    {
      icon: MapPin,
      label: "Adresse",
      value: isPlaceholder(siteConfig.address) ? null : `${siteConfig.address}, ${siteConfig.city}`,
      placeholder: "[ADRESSE], [VILLE]",
      href: siteConfig.social.googleMaps || undefined,
    },
    {
      icon: Phone,
      label: "Téléphone",
      value: isPlaceholder(siteConfig.phone) ? null : siteConfig.phone,
      placeholder: "[TÉLÉPHONE]",
      href: tel || undefined,
    },
    {
      icon: Mail,
      label: "Email",
      value: isPlaceholder(siteConfig.email) ? null : siteConfig.email,
      placeholder: "[EMAIL]",
      href: isPlaceholder(siteConfig.email) ? undefined : `mailto:${siteConfig.email}`,
    },
  ];

  return (
    <>
      <PageHeader
        eyebrow="Contact"
        title="Parlons de votre besoin"
        intro="Une panne, un projet de formation, une question sur le futur réseau : écrivez-nous, nous vous répondrons rapidement."
        breadcrumbs={[{ label: "Contact", href: "/contact" }]}
      />

      <Section>
        <Container>
          <div className="grid gap-12 lg:grid-cols-[1fr_1.4fr] lg:gap-16">
            <div>
              <h2 className="text-lg font-semibold text-ink">Nos coordonnées</h2>
              <ul className="mt-6 space-y-5">
                {infos.map(({ icon: Icon, label, value, placeholder, href }) => (
                  <li key={label} className="flex items-start gap-3.5">
                    <span className="grid size-10 shrink-0 place-items-center rounded-lg bg-primary-50 text-primary-700">
                      <Icon className="size-5" aria-hidden="true" />
                    </span>
                    <div>
                      <p className="text-sm font-medium text-ink">{label}</p>
                      {value ? (
                        href ? (
                          <a href={href} className="text-muted hover:text-primary-700">
                            {value}
                          </a>
                        ) : (
                          <p className="text-muted">{value}</p>
                        )
                      ) : (
                        <p className="flex items-center gap-2 text-muted">
                          {placeholder} <PendingPill />
                        </p>
                      )}
                    </div>
                  </li>
                ))}
                <li className="flex items-start gap-3.5">
                  <span className="grid size-10 shrink-0 place-items-center rounded-lg bg-primary-50 text-primary-700">
                    <Clock className="size-5" aria-hidden="true" />
                  </span>
                  <div>
                    <p className="text-sm font-medium text-ink">Horaires</p>
                    <ul className="text-muted">
                      {siteConfig.openingHours.map((h) => (
                        <li key={h.days}>
                          {h.days} : {h.hours}
                        </li>
                      ))}
                    </ul>
                  </div>
                </li>
              </ul>
            </div>

            <div className="rounded-2xl border border-line bg-paper p-6 shadow-card md:p-8">
              <h2 className="text-lg font-semibold text-ink">Écrivez-nous</h2>
              <div className="mt-6">
                <ContactForm />
              </div>
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}
