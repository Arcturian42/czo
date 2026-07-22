"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { contactSchema, type ContactInput } from "@/schemas/forms";
import { submitContact } from "@/app/actions/contact";
import { TextField, TextareaField, SelectField, CheckboxField, Honeypot } from "./fields";
import { SubmitButton, FormAlert, SuccessPanel } from "./form-ui";

const subjectOptions = [
  { value: "reparation", label: "Une réparation" },
  { value: "formation", label: "Une formation" },
  { value: "professionnel", label: "Un sujet professionnel / réseau" },
  { value: "autre", label: "Autre" },
];

export function ContactForm() {
  const [serverError, setServerError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ContactInput>({
    resolver: zodResolver(contactSchema),
    defaultValues: { subject: "autre", consent: false },
  });

  const onSubmit = async (values: ContactInput) => {
    setServerError(null);
    const result = await submitContact(values);
    if (result.ok) setSuccess(result.message);
    else setServerError(result.error);
  };

  if (success) {
    return <SuccessPanel title="Message envoyé" message={success} />;
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="relative space-y-5">
      <Honeypot register={register("website")} />

      <div className="grid gap-5 sm:grid-cols-2">
        <TextField label="Nom" required autoComplete="name" error={errors.name?.message} {...register("name")} />
        <TextField label="Email" type="email" required autoComplete="email" error={errors.email?.message} {...register("email")} />
      </div>
      <div className="grid gap-5 sm:grid-cols-2">
        <TextField label="Téléphone (facultatif)" type="tel" autoComplete="tel" error={errors.phone?.message} {...register("phone")} />
        <SelectField label="Sujet" options={subjectOptions} error={errors.subject?.message} {...register("subject")} />
      </div>
      <TextareaField
        label="Votre message"
        required
        rows={5}
        error={errors.message?.message}
        {...register("message")}
      />

      <CheckboxField
        label="J'accepte d'être recontacté au sujet de ma demande."
        error={errors.consent?.message}
        {...register("consent")}
      />

      {serverError ? <FormAlert message={serverError} /> : null}

      <SubmitButton pending={isSubmitting}>Envoyer le message</SubmitButton>
    </form>
  );
}
