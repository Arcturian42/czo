"use client";

import { useState } from "react";
import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowLeft, ArrowRight, Loader2 } from "lucide-react";
import {
  diagnosticSchema,
  type DiagnosticInput,
  DEVICE_TYPES,
  DEVICE_LABELS,
  CAUSES,
  CAUSE_LABELS,
  NEXT_STEPS,
  NEXT_STEP_LABELS,
} from "@/schemas/forms";
import { submitDiagnostic } from "@/app/actions/diagnostic";
import { track } from "@/lib/analytics";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import { TextField, TextareaField, CheckboxField, Honeypot } from "./fields";
import { FileUploader } from "./file-uploader";
import { FormAlert, SuccessPanel } from "./form-ui";

type DeviceType = (typeof DEVICE_TYPES)[number];
type FieldName = keyof DiagnosticInput;

const STEPS = [
  "Appareil",
  "Problème",
  "Cause",
  "Détails",
  "Photos",
  "Suite",
  "Coordonnées",
] as const;

// Champs à valider avant de quitter chaque étape.
const STEP_FIELDS: FieldName[][] = [
  ["deviceType"],
  ["problem"],
  ["cause"],
  ["exactModel", "incidentDate", "description"],
  [],
  ["nextStep"],
  ["firstName", "lastName", "phone", "email", "consent"],
];

const PROBLEM_SUGGESTIONS: Record<string, string[]> = {
  mobile: ["Écran cassé", "Batterie", "Ne charge plus", "Caméra", "Haut-parleur / micro", "Dommage liquide", "Ne s'allume plus"],
  ordinateur: ["Écran", "Batterie", "Clavier", "Ne s'allume plus", "Lenteur", "Surchauffe / ventilateur", "Récupération de données"],
  console: ["Port HDMI", "Ne s'allume plus", "Surchauffe", "Lecteur", "Manette / joystick", "Stockage"],
  autre: ["Panne électronique", "Connecteur", "Alimentation", "Microsoudure"],
};

function suggestionsFor(device?: DeviceType): string[] {
  if (!device) return PROBLEM_SUGGESTIONS.autre;
  if (["iphone", "autre-smartphone", "tablette"].includes(device)) return PROBLEM_SUGGESTIONS.mobile;
  if (["macbook", "imac", "pc"].includes(device)) return PROBLEM_SUGGESTIONS.ordinateur;
  if (device === "console") return PROBLEM_SUGGESTIONS.console;
  return PROBLEM_SUGGESTIONS.autre;
}

export function DiagnosticForm({ initialDevice }: { initialDevice?: DeviceType }) {
  const [step, setStep] = useState(0);
  const [files, setFiles] = useState<File[]>([]);
  const [serverError, setServerError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [started, setStarted] = useState(false);

  const {
    register,
    handleSubmit,
    trigger,
    control,
    setValue,
    formState: { errors },
  } = useForm<DiagnosticInput>({
    resolver: zodResolver(diagnosticSchema),
    mode: "onTouched",
    defaultValues: {
      deviceType: initialDevice,
      deviceOn: false,
      importantData: false,
      consent: false,
    },
  });

  const device = useWatch({ control, name: "deviceType" });
  const problem = useWatch({ control, name: "problem" });

  const markStarted = () => {
    if (!started) {
      setStarted(true);
      track("diagnostic_start");
    }
  };

  const next = async () => {
    markStarted();
    const fields = STEP_FIELDS[step];
    const valid = fields.length === 0 ? true : await trigger(fields);
    if (!valid) return;
    const target = Math.min(step + 1, STEPS.length - 1);
    setStep(target);
    track("diagnostic_step", { step: target + 1 });
  };

  const back = () => setStep((s) => Math.max(0, s - 1));

  const onSubmit = async (values: DiagnosticInput) => {
    setServerError(null);
    setSubmitting(true);
    try {
      const fd = new FormData();
      fd.set("deviceType", values.deviceType);
      fd.set("problem", values.problem);
      fd.set("cause", values.cause);
      fd.set("deviceOn", String(values.deviceOn ?? false));
      fd.set("importantData", String(values.importantData ?? false));
      fd.set("exactModel", values.exactModel ?? "");
      fd.set("incidentDate", values.incidentDate ?? "");
      fd.set("description", values.description ?? "");
      fd.set("nextStep", values.nextStep);
      fd.set("firstName", values.firstName);
      fd.set("lastName", values.lastName);
      fd.set("phone", values.phone);
      fd.set("email", values.email);
      fd.set("consent", String(values.consent));
      fd.set("website", values.website ?? "");
      files.forEach((f) => fd.append("photos", f));

      const result = await submitDiagnostic(fd);
      if (result.ok) {
        track("diagnostic_submit");
        setSuccess(result.message);
      } else {
        setServerError(result.error);
      }
    } finally {
      setSubmitting(false);
    }
  };

  if (success) {
    return (
      <SuccessPanel
        title="Demande de diagnostic envoyée"
        message={success}
      />
    );
  }

  const isLast = step === STEPS.length - 1;
  const progress = Math.round(((step + 1) / STEPS.length) * 100);

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="relative">
      <Honeypot register={register("website")} />

      {/* Progression */}
      <div className="mb-8">
        <div className="flex items-center justify-between text-sm">
          <span className="font-medium text-ink">{STEPS[step]}</span>
          <span className="text-muted">
            Étape {step + 1} sur {STEPS.length}
          </span>
        </div>
        <div
          className="mt-2 h-1.5 overflow-hidden rounded-full bg-surface-strong"
          role="progressbar"
          aria-valuenow={progress}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-label="Progression du formulaire"
        >
          <div
            className="h-full rounded-full bg-primary-600 transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Étape 1 — Appareil */}
      {step === 0 && (
        <fieldset onChange={markStarted}>
          <legend className="mb-4 text-lg font-semibold text-ink">
            Quel appareil souhaitez-vous faire diagnostiquer ?
          </legend>
          <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-3">
            {DEVICE_TYPES.map((value) => (
              <label
                key={value}
                className={cn(
                  "flex cursor-pointer items-center justify-center rounded-xl border p-4 text-center text-sm font-medium transition-colors has-[:checked]:border-primary-500 has-[:checked]:bg-primary-50 has-[:checked]:text-primary-800",
                  "border-line hover:border-primary-300",
                )}
              >
                <input type="radio" value={value} className="sr-only" {...register("deviceType")} />
                {DEVICE_LABELS[value]}
              </label>
            ))}
          </div>
          {errors.deviceType ? (
            <p role="alert" className="mt-2 text-sm text-red-600">
              {errors.deviceType.message}
            </p>
          ) : null}
        </fieldset>
      )}

      {/* Étape 2 — Problème */}
      {step === 1 && (
        <div>
          <h2 className="mb-4 text-lg font-semibold text-ink">Quel problème rencontrez-vous ?</h2>
          <div className="mb-4 flex flex-wrap gap-2">
            {suggestionsFor(device).map((sugg) => (
              <button
                key={sugg}
                type="button"
                onClick={() => setValue("problem", sugg, { shouldValidate: true })}
                className={cn(
                  "rounded-full border px-3.5 py-1.5 text-sm transition-colors",
                  problem === sugg
                    ? "border-primary-500 bg-primary-50 text-primary-800"
                    : "border-line text-muted hover:border-primary-300 hover:text-ink",
                )}
              >
                {sugg}
              </button>
            ))}
          </div>
          <TextField
            label="Décrivez le problème"
            required
            placeholder="Ex. écran noir, ne charge plus…"
            error={errors.problem?.message}
            {...register("problem")}
          />
        </div>
      )}

      {/* Étape 3 — Cause */}
      {step === 2 && (
        <fieldset>
          <legend className="mb-4 text-lg font-semibold text-ink">Que s'est-il passé ?</legend>
          <div className="grid gap-2.5 sm:grid-cols-2">
            {CAUSES.map((value) => (
              <label
                key={value}
                className="flex cursor-pointer items-center gap-3 rounded-xl border border-line p-4 text-sm font-medium transition-colors hover:border-primary-300 has-[:checked]:border-primary-500 has-[:checked]:bg-primary-50 has-[:checked]:text-primary-800"
              >
                <input type="radio" value={value} className="size-4 text-primary-600" {...register("cause")} />
                {CAUSE_LABELS[value]}
              </label>
            ))}
          </div>
          {errors.cause ? (
            <p role="alert" className="mt-2 text-sm text-red-600">
              {errors.cause.message}
            </p>
          ) : null}
        </fieldset>
      )}

      {/* Étape 4 — Détails */}
      {step === 3 && (
        <div className="space-y-5">
          <h2 className="text-lg font-semibold text-ink">Informations complémentaires</h2>
          <div className="grid gap-5 sm:grid-cols-2">
            <TextField label="Modèle exact (facultatif)" placeholder="Ex. iPhone 14 Pro" error={errors.exactModel?.message} {...register("exactModel")} />
            <TextField label="Date approximative de l'incident (facultatif)" placeholder="Ex. la semaine dernière" error={errors.incidentDate?.message} {...register("incidentDate")} />
          </div>
          <div className="space-y-3">
            <CheckboxField label="L'appareil s'allume encore." {...register("deviceOn")} />
            <CheckboxField label="Il contient des données importantes." {...register("importantData")} />
          </div>
          <TextareaField label="Description libre (facultatif)" rows={4} placeholder="Tout détail utile au diagnostic." error={errors.description?.message} {...register("description")} />
        </div>
      )}

      {/* Étape 5 — Photos */}
      {step === 4 && (
        <div>
          <h2 className="mb-2 text-lg font-semibold text-ink">Ajoutez des photos (facultatif)</h2>
          <p className="mb-4 text-sm text-muted">
            Des photos de l'appareil et de la panne nous aident à préparer un premier avis.
          </p>
          <FileUploader files={files} onChange={setFiles} />
        </div>
      )}

      {/* Étape 6 — Suite */}
      {step === 5 && (
        <fieldset>
          <legend className="mb-4 text-lg font-semibold text-ink">Que souhaitez-vous ensuite ?</legend>
          <div className="grid gap-2.5">
            {NEXT_STEPS.map((value) => (
              <label
                key={value}
                className="flex cursor-pointer items-center gap-3 rounded-xl border border-line p-4 text-sm font-medium transition-colors hover:border-primary-300 has-[:checked]:border-primary-500 has-[:checked]:bg-primary-50 has-[:checked]:text-primary-800"
              >
                <input type="radio" value={value} className="size-4 text-primary-600" {...register("nextStep")} />
                {NEXT_STEP_LABELS[value]}
              </label>
            ))}
          </div>
          {errors.nextStep ? (
            <p role="alert" className="mt-2 text-sm text-red-600">
              {errors.nextStep.message}
            </p>
          ) : null}
        </fieldset>
      )}

      {/* Étape 7 — Coordonnées */}
      {step === 6 && (
        <div className="space-y-5">
          <h2 className="text-lg font-semibold text-ink">Vos coordonnées</h2>
          <div className="grid gap-5 sm:grid-cols-2">
            <TextField label="Prénom" required autoComplete="given-name" error={errors.firstName?.message} {...register("firstName")} />
            <TextField label="Nom" required autoComplete="family-name" error={errors.lastName?.message} {...register("lastName")} />
          </div>
          <div className="grid gap-5 sm:grid-cols-2">
            <TextField label="Téléphone" type="tel" required autoComplete="tel" error={errors.phone?.message} {...register("phone")} />
            <TextField label="Email" type="email" required autoComplete="email" error={errors.email?.message} {...register("email")} />
          </div>
          <CheckboxField
            label="J'accepte d'être recontacté au sujet de mon diagnostic et j'ai lu la politique de confidentialité."
            error={errors.consent?.message}
            {...register("consent")}
          />
        </div>
      )}

      {serverError ? (
        <div className="mt-6">
          <FormAlert message={serverError} />
        </div>
      ) : null}

      {/* Navigation */}
      <div className="mt-8 flex items-center justify-between gap-3">
        <button
          type="button"
          onClick={back}
          disabled={step === 0}
          className={buttonVariants({
            variant: "ghost",
            size: "md",
            className: step === 0 ? "invisible" : "",
          })}
        >
          <ArrowLeft className="size-4" aria-hidden="true" />
          Précédent
        </button>

        {isLast ? (
          <button
            type="submit"
            disabled={submitting}
            aria-busy={submitting}
            className={buttonVariants({ size: "lg" })}
          >
            {submitting ? (
              <>
                <Loader2 className="size-4 animate-spin" aria-hidden="true" />
                Envoi…
              </>
            ) : (
              "Envoyer ma demande"
            )}
          </button>
        ) : (
          <button type="button" onClick={next} className={buttonVariants({ size: "lg" })}>
            Continuer
            <ArrowRight className="size-4" aria-hidden="true" />
          </button>
        )}
      </div>
    </form>
  );
}
