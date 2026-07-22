import Link from "next/link";
import { Container } from "@/components/ui/section";
import { ButtonLink } from "@/components/ui/button";
import { mainNav } from "@/config/nav";

export default function NotFound() {
  return (
    <Container className="flex min-h-[60vh] flex-col items-center justify-center py-20 text-center">
      <p className="eyebrow">Erreur 404</p>
      <h1 className="mt-4 text-4xl font-semibold tracking-tight text-ink sm:text-5xl">
        Cette page est introuvable
      </h1>
      <p className="mx-auto mt-4 max-w-md text-lg text-muted">
        Le lien est peut-être erroné ou la page a été déplacée. Reprenons depuis un
        point connu.
      </p>
      <div className="mt-8 flex flex-col gap-3 sm:flex-row">
        <ButtonLink href="/" size="lg">
          Retour à l'accueil
        </ButtonLink>
        <ButtonLink href="/diagnostic" variant="outline" size="lg">
          Faire diagnostiquer un appareil
        </ButtonLink>
      </div>
      <nav aria-label="Pages principales" className="mt-10">
        <ul className="flex flex-wrap justify-center gap-x-5 gap-y-2 text-sm">
          {mainNav.map((item) => (
            <li key={item.href}>
              <Link href={item.href} className="text-muted hover:text-primary-700">
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </Container>
  );
}
