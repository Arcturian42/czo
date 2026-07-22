"use client";

import { useMemo, useRef, useState } from "react";
import { ArrowRight, Sparkles } from "lucide-react";
import type { TrainingAudience } from "@/types";
import { trainingAudiences } from "@/content/trainings";
import { TRAINING_PROFILES } from "@/schemas/forms";
import { track } from "@/lib/analytics";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
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
  const [chosen, setChosen] = useState<Profile | undefined>(undefined);
  const formRef = useRef<HTMLDivElement>(null);

  const recommended = useMemo(() => recommend(situation, objectif), [situation, objectif]);
  const reco: TrainingAudience | undefined = recommended
    ? trainingAudiences.find((a) => a.key === recommended)
    : undefined;

  const prefill = () => {
    if (!recommended) return;
    setChosen(recommended);
    track("training_finder_complete");
    requestAnimationFrame(() =>
      formRef.current?.scrollIntoView({ behavior: "smooth", block: "start" }),
    );
  };

  return (
    <div>
      <div className="grid gap-6 md:grid-cols-2">
        <QuestionGroup
          legend="Aujourd'hui, vous êtes…"
          name="situation"
          options={SITUATIONS}
          value={situation}
          onChange={setSituation}
        />
        <QuestionGroup
          legend="Votre objectif principal…"
          name="objectif"
          options={OBJECTIFS}
          value={objectif}
          onChange={setObjectif}
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
              <a
                href={`/se-former#${reco.key}`}
                className={buttonVariants({ variant: "outline", size: "md" })}
              >
                Voir ce parcours
              </a>
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
        id="demande-form"
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

function QuestionGroup({
  legend,
  name,
  options,
  value,
  onChange,
}: {
  legend: string;
  name: string;
  options: readonly { value: string; label: string }[];
  value: string | undefined;
  onChange: (value: string) => void;
}) {
  return (
    <fieldset>
      <legend className="mb-3 text-sm font-medium text-ink">{legend}</legend>
      <div className="grid gap-2.5">
        {options.map((o) => (
          <label
            key={o.value}
            className={cn(
              "flex cursor-pointer items-center gap-3 rounded-xl border p-3.5 text-sm transition-colors",
              value === o.value
                ? "border-primary-500 bg-primary-50 text-primary-800"
                : "border-line text-ink hover:border-primary-300",
            )}
          >
            <input
              type="radio"
              name={name}
              value={o.value}
              checked={value === o.value}
              onChange={() => onChange(o.value)}
              className="size-4 text-primary-600"
            />
            {o.label}
          </label>
        ))}
      </div>
    </fieldset>
  );
}
