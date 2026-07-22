import {
  Stethoscope,
  Layers,
  FileText,
  Activity,
  ShieldCheck,
  Recycle,
} from "lucide-react";
import { Container } from "@/components/ui/section";

const items = [
  { icon: Stethoscope, label: "Diagnostic avant intervention" },
  { icon: Layers, label: "Pièces clairement identifiées" },
  { icon: Recycle, label: "Réparer plutôt que jeter" },
  { icon: FileText, label: "Devis expliqué" },
  { icon: Activity, label: "Suivi après réparation" },
  { icon: ShieldCheck, label: "Garantie écrite selon l'intervention" },
];

/** Barre de confiance — repères factuels, sans chiffres ni certifications inventés. */
export function TrustBar() {
  return (
    <section className="border-y border-line bg-surface" aria-label="Nos repères">
      <Container className="py-5">
        <ul className="grid grid-cols-2 gap-x-6 gap-y-4 sm:grid-cols-3 lg:grid-cols-6">
          {items.map(({ icon: Icon, label }) => (
            <li key={label} className="flex items-center gap-2.5 text-sm text-ink">
              <Icon className="size-5 shrink-0 text-primary-600" aria-hidden="true" />
              <span className="font-medium">{label}</span>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
