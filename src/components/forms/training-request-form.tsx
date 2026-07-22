"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  trainingRequestSchema,
  type TrainingRequestInput,
  TRAINING_PROFILES,
} from "@/schemas/forms";
import { submitTrainingRequest } from "@/app/actions/training";
import { TextField, TextareaField, SelectField, CheckboxField, Honeypot } from "./fields";
import { SubmitButton, FormAlert, SuccessPanel } from "./form-ui";

const profileOptions = [
  { value: "debutant", label: "Je débute" },
  { value: "reconversion", label: "Je veux me reconvertir" },
  { value: "reparateur", label: "Je suis déjà réparateur" },
  { value: "entreprise", label: "Je représente une entreprise" },
];
const levelOptions = [
  { value: "debutant", label: "Débutant" },
  { value: "intermediaire", label: "Intermédiaire" },
  { value: "avance", label: "Avancé" },
];
const formatOptions = [
  { value: "indifferent", label: "Indifférent" },
  { value: "presentiel", label: "Présentiel" },
  { value: "distanciel", label: "Distanciel" },
  { value: "hybride", label: "Hybride" },
];

export function TrainingRequestForm({
  defaultProfile,
}: {
  defaultProfile?: (typeof TRAINING_PROFILES)[number];
}) {
  const [serverError, setServerError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<TrainingRequestInput>({
    resolver: zodResolver(trainingRequestSchema),
    defaultValues: { profile: defaultProfile, format: "indifferent", consent: false },
  });

  const onSubmit = async (values: TrainingRequestInput) => {
    setServerError(null);
    const result = await submitTrainingRequest(values);
    if (result.ok) setSuccess(result.message);
    else setServerError(result.error);
  };

  if (success) {
    return <SuccessPanel title="Demande envoyée" message={success} />;
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="relative space-y-5">
      <Honeypot register={register("website")} />

      <div className="grid gap-5 sm:grid-cols-2">
        <SelectField label="Votre profil" required placeholder="Choisir…" options={profileOptions} error={errors.profile?.message} {...register("profile")} />
        <SelectField label="Niveau actuel" required placeholder="Choisir…" options={levelOptions} error={errors.currentLevel?.message} {...register("currentLevel")} />
      </div>

      <TextareaField
        label="Vos objectifs"
        required
        rows={3}
        hint="Ce que vous souhaitez apprendre ou atteindre."
        error={errors.objectives?.message}
        {...register("objectives")}
      />

      <div className="grid gap-5 sm:grid-cols-2">
        <TextField label="Type d'appareil visé (facultatif)" hint="Smartphone, Mac, console…" error={errors.deviceType?.message} {...register("deviceType")} />
        <TextField label="Compétences recherchées (facultatif)" error={errors.skills?.message} {...register("skills")} />
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <TextField label="Disponibilité (facultatif)" hint="Ex. soirs, week-ends, semaine…" error={errors.availability?.message} {...register("availability")} />
        <SelectField label="Format préféré" options={formatOptions} error={errors.format?.message} {...register("format")} />
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <TextField label="Ville (facultatif)" autoComplete="address-level2" error={errors.city?.message} {...register("city")} />
        <TextField label="Téléphone" type="tel" required autoComplete="tel" error={errors.phone?.message} {...register("phone")} />
      </div>

      <TextField label="Email" type="email" required autoComplete="email" error={errors.email?.message} {...register("email")} />
      <TextareaField label="Message (facultatif)" rows={3} error={errors.message?.message} {...register("message")} />

      <CheckboxField
        label="J'accepte d'être recontacté au sujet de ma demande de formation."
        error={errors.consent?.message}
        {...register("consent")}
      />

      {serverError ? <FormAlert message={serverError} /> : null}
      <SubmitButton pending={isSubmitting}>Envoyer ma demande</SubmitButton>
    </form>
  );
}
