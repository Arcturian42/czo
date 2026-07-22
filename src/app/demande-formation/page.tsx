import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import { PageHeader } from "@/components/layout/page-header";
import { Container } from "@/components/ui/section";
import { TrainingRequestForm } from "@/components/forms/training-request-form";
import { CERTIFICATION_NOTE } from "@/content/trainings";
import { TRAINING_PROFILES } from "@/schemas/forms";

export const metadata: Metadata = buildMetadata({
  title: "Demande de formation",
  description:
    "Dites-nous d'où vous partez et ce que vous visez : nous vous orientons vers le parcours de formation à la réparation le plus adapté.",
  path: "/demande-formation",
});

type Profile = (typeof TRAINING_PROFILES)[number];
const VALID_PROFILES = TRAINING_PROFILES as readonly string[];

export default async function TrainingRequestPage({
  searchParams,
}: {
  searchParams: Promise<{ profil?: string }>;
}) {
  const { profil } = await searchParams;
  const defaultProfile =
    profil && VALID_PROFILES.includes(profil) ? (profil as Profile) : undefined;

  return (
    <>
      <PageHeader
        eyebrow="Se former"
        title="Demande de formation"
        intro="Quelques informations pour préparer un échange utile. Nous revenons vers vous avec une orientation claire."
        breadcrumbs={[
          { label: "Se former", href: "/se-former" },
          { label: "Demande de formation", href: "/demande-formation" },
        ]}
      />

      <Container size="narrow" className="py-14 md:py-20">
        <div className="rounded-2xl border border-line bg-paper p-6 shadow-card md:p-8">
          <TrainingRequestForm defaultProfile={defaultProfile} />
        </div>
        <p className="mt-6 text-center text-sm text-muted">{CERTIFICATION_NOTE}</p>
      </Container>
    </>
  );
}
