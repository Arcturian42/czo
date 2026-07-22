"use client";

import { useEffect } from "react";
import { Container } from "@/components/ui/section";
import { Button, ButtonLink } from "@/components/ui/button";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <Container className="flex min-h-[60vh] flex-col items-center justify-center py-20 text-center">
      <p className="eyebrow">Erreur</p>
      <h1 className="mt-4 text-4xl font-semibold tracking-tight text-ink sm:text-5xl">
        Une erreur est survenue
      </h1>
      <p className="mx-auto mt-4 max-w-md text-lg text-muted">
        Quelque chose n'a pas fonctionné de notre côté. Vous pouvez réessayer ou
        revenir à l'accueil.
      </p>
      <div className="mt-8 flex flex-col gap-3 sm:flex-row">
        <Button size="lg" onClick={reset}>
          Réessayer
        </Button>
        <ButtonLink href="/" variant="outline" size="lg">
          Retour à l'accueil
        </ButtonLink>
      </div>
    </Container>
  );
}
