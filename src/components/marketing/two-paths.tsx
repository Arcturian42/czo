import { Wrench, GraduationCap, ArrowRight } from "lucide-react";
import { Section, Container } from "@/components/ui/section";
import { Reveal } from "@/components/ui/reveal";
import { ButtonLink } from "@/components/ui/button";

const paths = [
  {
    icon: Wrench,
    eyebrow: "Parcours 1",
    title: "Faire réparer",
    text: "Confiez votre appareil à un réparateur qui explique la panne, les options et les risques avant toute intervention.",
    cta: { label: "Décrire mon appareil", href: "/diagnostic" },
    tone: "primary" as const,
  },
  {
    icon: GraduationCap,
    eyebrow: "Parcours 2",
    title: "Apprendre à réparer",
    text: "Apprenez une méthode complète : diagnostic, choix des pièces, gestes techniques, contrôle qualité et relation client.",
    cta: { label: "Trouver ma formation", href: "/se-former" },
    tone: "ink" as const,
  },
];

/** Les deux parcours immédiatement visibles : réparer / apprendre. */
export function TwoPaths() {
  return (
    <Section>
      <Container>
        <div className="grid gap-5 md:grid-cols-2">
          {paths.map((path, index) => {
            const Icon = path.icon;
            const onDark = path.tone === "ink";
            return (
              <Reveal key={path.title} delay={index * 80}>
                <article
                  className={`group relative flex h-full flex-col overflow-hidden rounded-3xl p-8 md:p-10 ${
                    onDark
                      ? "bg-ink text-white"
                      : "border border-primary-100 bg-primary-50/50 text-ink"
                  }`}
                >
                  <span
                    className={`grid size-12 place-items-center rounded-2xl ${
                      onDark ? "bg-white/10 text-white" : "bg-primary-600 text-white"
                    }`}
                  >
                    <Icon className="size-6" aria-hidden="true" />
                  </span>
                  <p
                    className={`mt-6 font-mono text-xs uppercase tracking-widest ${
                      onDark ? "text-primary-300" : "text-primary-700"
                    }`}
                  >
                    {path.eyebrow}
                  </p>
                  <h3 className="mt-2 text-2xl font-semibold md:text-3xl">{path.title}</h3>
                  <p
                    className={`mt-3 max-w-md leading-relaxed ${
                      onDark ? "text-white/70" : "text-muted"
                    }`}
                  >
                    {path.text}
                  </p>
                  <div className="mt-8 pt-2">
                    <ButtonLink
                      href={path.cta.href}
                      variant={onDark ? "primary" : "primary"}
                      size="md"
                    >
                      {path.cta.label}
                      <ArrowRight className="size-4" aria-hidden="true" />
                    </ButtonLink>
                  </div>
                </article>
              </Reveal>
            );
          })}
        </div>
      </Container>
    </Section>
  );
}
