import { Container } from "@/components/ui/section";
import { Breadcrumbs, type Crumb } from "@/components/ui/breadcrumbs";
import { CircuitMotif } from "@/components/marketing/circuit-motif";
import { cn } from "@/lib/utils";

/** En-tête de page secondaire : fil d'Ariane + sur-titre + H1 + intro. */
export function PageHeader({
  eyebrow,
  title,
  intro,
  breadcrumbs,
  className,
}: {
  eyebrow?: string;
  title: string;
  intro?: React.ReactNode;
  breadcrumbs: Crumb[];
  className?: string;
}) {
  return (
    <header className={cn("relative overflow-hidden border-b border-line bg-surface", className)}>
      <CircuitMotif className="absolute -right-16 -top-10 hidden h-72 w-72 text-primary-100 md:block" />
      <Container className="relative py-10 md:py-14">
        <Breadcrumbs items={breadcrumbs} />
        {eyebrow ? <p className="eyebrow mt-6">{eyebrow}</p> : null}
        <h1 className="mt-3 max-w-3xl text-4xl font-semibold tracking-tight text-ink sm:text-5xl">
          {title}
        </h1>
        {intro ? (
          <p className="mt-4 max-w-2xl text-lg leading-relaxed text-muted">{intro}</p>
        ) : null}
      </Container>
    </header>
  );
}
