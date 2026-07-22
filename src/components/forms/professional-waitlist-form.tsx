"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { professionalSchema, type ProfessionalInput } from "@/schemas/forms";
import { submitProfessional } from "@/app/actions/professional";
import { TextField, TextareaField, SelectField, CheckboxField, Honeypot } from "./fields";
import { SubmitButton, FormAlert, SuccessPanel } from "./form-ui";

const activityOptions = [
  { value: "reparateur-independant", label: "Réparateur indépendant" },
  { value: "atelier", label: "Atelier" },
  { value: "formateur", label: "Formateur" },
  { value: "entreprise", label: "Entreprise" },
];
const interestOptions = [
  { value: "reseau", label: "Le futur réseau" },
  { value: "formation", label: "La formation" },
  { value: "methode", label: "La méthode" },
  { value: "partenariat", label: "Un partenariat" },
];

export function ProfessionalWaitlistForm() {
  const [serverError, setServerError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ProfessionalInput>({
    resolver: zodResolver(professionalSchema),
    defaultValues: { interest: "reseau", consent: false },
  });

  const onSubmit = async (values: ProfessionalInput) => {
    setServerError(null);
    const result = await submitProfessional(values);
    if (result.ok) setSuccess(result.message);
    else setServerError(result.error);
  };

  if (success) {
    return <SuccessPanel title="Inscription enregistrée" message={success} />;
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="relative space-y-5">
      <Honeypot register={register("website")} />

      <div className="grid gap-5 sm:grid-cols-2">
        <TextField label="Prénom" required autoComplete="given-name" error={errors.firstName?.message} {...register("firstName")} />
        <TextField label="Nom" required autoComplete="family-name" error={errors.lastName?.message} {...register("lastName")} />
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <TextField label="Entreprise (facultatif)" autoComplete="organization" error={errors.company?.message} {...register("company")} />
        <SelectField label="Type d'activité" required placeholder="Choisir…" options={activityOptions} error={errors.activityType?.message} {...register("activityType")} />
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <TextField label="Années d'expérience (facultatif)" error={errors.yearsOfExperience?.message} {...register("yearsOfExperience")} />
        <TextField label="Taille de l'équipe (facultatif)" error={errors.teamSize?.message} {...register("teamSize")} />
      </div>

      <TextField label="Spécialités (facultatif)" hint="Ex. microsoudure, consoles, Mac…" error={errors.specialties?.message} {...register("specialties")} />

      <div className="grid gap-5 sm:grid-cols-2">
        <TextField label="Ville (facultatif)" autoComplete="address-level2" error={errors.city?.message} {...register("city")} />
        <SelectField label="Intérêt principal" required options={interestOptions} error={errors.interest?.message} {...register("interest")} />
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <TextField label="Téléphone" type="tel" required autoComplete="tel" error={errors.phone?.message} {...register("phone")} />
        <TextField label="Email" type="email" required autoComplete="email" error={errors.email?.message} {...register("email")} />
      </div>

      <TextareaField label="Message (facultatif)" rows={3} error={errors.message?.message} {...register("message")} />

      <CheckboxField
        label="J'accepte d'être recontacté au sujet du futur réseau de professionnels."
        error={errors.consent?.message}
        {...register("consent")}
      />

      {serverError ? <FormAlert message={serverError} /> : null}
      <SubmitButton pending={isSubmitting}>Rejoindre la liste d'attente</SubmitButton>
    </form>
  );
}
