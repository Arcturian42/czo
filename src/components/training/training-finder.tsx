"use client";

import { useRef, useState } from "react";
import { ArrowRight, Sparkles } from "lucide-react";
import type { TrainingAudience } from "@/types";
import { trainingAudiences } from "@/content/trainings";
import { TRAINING_PROFILES } from "@/schemas/forms";
import { track } from "@/lib/analytics";
import { buttonVariants, ButtonLink } from "@/components/ui/button";
import { RadioCardGroup } from "@/components/forms/fields";
import { TrainingRequestForm } from "@/components/forms/training-request-form";

type Profile = (typeof TRAINING_PROFILES)[number];

const SITUATIONS = [
  { value: "debutant", label: "Je débute (aucune expérience)" },
  { value: "reconversion", label: "Je change de métier" },
  { value: "reparateur", label: "Je répare déjà" },
  { value: "entreprise", label: "Je représente une entreprise" },
] as const;

const OBJECTIFS = [
  { value: "bases", label: "Comprendre et réparer mes appareils" },
  { value: "metier", label: "En faire une activité" },
  { value: "perfectionnement", label: "Me perfectionner (microsoudure, cas complexes)" },
  { value: "equipe", label: "Former une équipe" },
] as const;

/** Déduit le parcours le plus adapté à partir des deux réponses. */
function recommend(situation?: string, objectif?: string): Profile | undefined {
  if (!situation || !objectif) return undefined;
  if (situation === "entreprise" || objectif === "equipe") return "entreprise";
  if (situation === "reparateur" || objectif === "perfectionnement") return "reparateur";
  if (situation === "reconversion" || objectif === "metier") return "reconversion";
  return "debutant";
}

/**
 * Guide d'orientation : deux questions → parcours recommandé → demande
 * préremplie. Améliore le flow « apprendre à se former » (découverte → conversion).
 */
export function TrainingFinder() {
  const [situation, setSituation] = useState<string>();
  const [objectif, setObjectif] = useState<string>();
  const [chosen, setChosen] = useState<Profile>();
  const formRef = useRef<HTMLDivElement>(null);

  const recommended = recommend(situation, objectif);
  const reco: TrainingAudience | undefined = recommended
    ? trainingAudiences.find((a) => a.key === recommended)
    : undefined;

  const prefill = () => {
    if (!recommended) return;
    setChosen(recommended);
    track("training_finder_complete");
    formRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div>
      <div className="grid gap-6 md:grid-cols-2">
        <RadioCardGroup
          legend="Aujourd'hui, vous êtes…"
          options={SITUATIONS}
          inputProps={(value) => ({
            name: "situation",
            value,
            checked: situation === value,
            onChange: () => setSituation(value),
          })}
        />
        <RadioCardGroup
          legend="Votre objectif principal…"
          options={OBJECTIFS}
          inputProps={(value) => ({
            name: "objectif",
            value,
            checked: objectif === value,
            onChange: () => setObjectif(value),
          })}
        />
      </div>

      <div aria-live="polite" className="mt-8">
        {reco ? (
          <div className="rounded-2xl border border-primary-200 bg-primary-50/50 p-6 md:p-7">
            <p className="eyebrow flex items-center gap-2">
              <Sparkles className="size-4" aria-hidden="true" />
              Parcours recommandé
            </p>
            <h3 className="mt-2 text-xl font-semibold text-ink">{reco.title}</h3>
            <p className="mt-2 text-muted">{reco.audience}</p>
            <p className="mt-3 text-sm text-ink">
              <span className="font-medium">Vous apprendrez :</span> {reco.learn}
            </p>
            <div className="mt-5 flex flex-col gap-3 sm:flex-row">
              <button type="button" onClick={prefill} className={buttonVariants({ size: "md" })}>
                Préremplir ma demande
                <ArrowRight className="size-4" aria-hidden="true" />
              </button>
              <ButtonLink href={`/se-former#${reco.key}`} variant="outline" size="md">
                Voir ce parcours
              </ButtonLink>
            </div>
          </div>
        ) : (
          <p className="text-sm text-muted">
            Répondez aux deux questions pour voir le parcours le plus adapté.
          </p>
        )}
      </div>

      <div
        ref={formRef}
        className="mt-10 scroll-mt-28 rounded-2xl border border-line bg-paper p-6 shadow-card md:p-8"
      >
        <h3 className="text-lg font-semibold text-ink">Votre demande de formation</h3>
        <p className="mt-1 text-sm text-muted">
          {chosen
            ? "Profil prérempli d'après votre orientation — ajustez librement."
            : "Vous pouvez aussi remplir directement le formulaire ci-dessous."}
        </p>
        <div className="mt-6">
          {/* La clé force la ré-initialisation avec le profil recommandé. */}
          <TrainingRequestForm key={chosen ?? "none"} defaultProfile={chosen} />
        </div>
      </div>
    </div>
  );
}
