"use client";

import { CheckCircle2, AlertCircle, Loader2 } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

/** Bouton de soumission avec état de chargement accessible. */
export function SubmitButton({
  pending,
  children,
  className,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement> & { pending?: boolean }) {
  return (
    <button
      type="submit"
      disabled={pending}
      aria-busy={pending}
      className={buttonVariants({ size: "lg", className: cn("w-full sm:w-auto", className) })}
      {...props}
    >
      {pending ? (
        <>
          <Loader2 className="size-4 animate-spin" aria-hidden="true" />
          Envoi en cours…
        </>
      ) : (
        children
      )}
    </button>
  );
}

/** Bandeau d'erreur (non technique) annoncé aux lecteurs d'écran. */
export function FormAlert({ message }: { message: string }) {
  return (
    <div
      role="alert"
      className="flex items-start gap-2.5 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-800"
    >
      <AlertCircle className="mt-0.5 size-4 shrink-0" aria-hidden="true" />
      <span>{message}</span>
    </div>
  );
}

/** Panneau de confirmation affiché après un envoi réussi. */
export function SuccessPanel({ title, message }: { title: string; message: string }) {
  return (
    <div
      role="status"
      className="rounded-2xl border border-primary-200 bg-primary-50/60 p-8 text-center"
    >
      <span className="mx-auto grid size-14 place-items-center rounded-full bg-primary-600 text-white">
        <CheckCircle2 className="size-7" aria-hidden="true" />
      </span>
      <h3 className="mt-5 text-xl font-semibold text-ink">{title}</h3>
      <p className="mx-auto mt-2 max-w-md text-muted">{message}</p>
    </div>
  );
}
