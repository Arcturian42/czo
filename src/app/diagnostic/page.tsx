import type { Metadata } from "next";
import { ShieldCheck, MessagesSquare, Layers, Activity } from "lucide-react";
import { buildMetadata } from "@/lib/seo";
import { siteConfig } from "@/config/site";
import { PageHeader } from "@/components/layout/page-header";
import { Container } from "@/components/ui/section";
import { DiagnosticForm } from "@/components/forms/diagnostic-form";
import { DEVICE_TYPES } from "@/schemas/forms";

export const metadata: Metadata = buildMetadata({
  title: "Faire diagnostiquer mon appareil",
  description: `Décrivez votre appareil et la panne en quelques étapes. Nous préparons un premier avis clair — sans aucune intervention sans votre accord. Réparation à ${siteConfig.city}.`,
  path: "/diagnostic",
});

type DeviceType = (typeof DEVICE_TYPES)[number];

// Associe un slug de catégorie (ou un type direct) à un type d'appareil.
const DEVICE_ALIASES: Record<string, DeviceType> = {
  "smartphones-tablettes": "autre-smartphone",
  "mac-ordinateurs": "macbook",
  consoles: "console",
  "electronique-audiovisuel": "audiovisuel",
};

function resolveDevice(value?: string): DeviceType | undefined {
  if (!value) return undefined;
  if (DEVICE_TYPES.includes(value as DeviceType)) return value as DeviceType;
  return DEVICE_ALIASES[value];
}

const reassurance = [
  { icon: MessagesSquare, text: "Un diagnostic expliqué, pas un jargon." },
  { icon: Layers, text: "Des pièces clairement identifiées." },
  { icon: ShieldCheck, text: "Aucune intervention sans votre accord." },
  { icon: Activity, text: "Un suivi après réparation." },
];

export default async function DiagnosticPage({
  searchParams,
}: {
  searchParams: Promise<{ appareil?: string }>;
}) {
  const { appareil } = await searchParams;
  const initialDevice = resolveDevice(appareil);

  return (
    <>
      <PageHeader
        eyebrow="Faire réparer"
        title="Décrivez votre appareil"
        intro="Quelques étapes simples pour nous permettre de préparer un premier avis. C'est sans engagement."
        breadcrumbs={[{ label: "Diagnostic", href: "/diagnostic" }]}
      />

      <Container className="py-14 md:py-20">
        <div className="grid gap-10 lg:grid-cols-[1fr_2fr] lg:gap-14">
          <aside className="lg:sticky lg:top-28 lg:self-start">
            <h2 className="text-lg font-semibold text-ink">Ce que vous pouvez attendre</h2>
            <ul className="mt-5 space-y-4">
              {reassurance.map(({ icon: Icon, text }) => (
                <li key={text} className="flex items-start gap-3">
                  <span className="grid size-9 shrink-0 place-items-center rounded-lg bg-primary-50 text-primary-700">
                    <Icon className="size-5" aria-hidden="true" />
                  </span>
                  <span className="text-sm leading-relaxed text-muted">{text}</span>
                </li>
              ))}
            </ul>
            <p className="mt-6 rounded-xl border border-line bg-surface p-4 text-sm text-muted">
              Vos informations sont utilisées uniquement pour traiter votre demande.
              Consultez notre{" "}
              <a href="/politique-confidentialite" className="font-medium text-primary-700 underline underline-offset-2">
                politique de confidentialité
              </a>
              .
            </p>
          </aside>

          <div className="rounded-2xl border border-line bg-paper p-6 shadow-card md:p-8">
            <DiagnosticForm initialDevice={initialDevice} />
          </div>
        </div>
      </Container>
    </>
  );
}
