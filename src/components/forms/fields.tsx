"use client";

import { forwardRef, useId } from "react";
import { cn } from "@/lib/utils";

/* ------------------------------------------------------------------ *
 * Éléments de formulaire accessibles (label lié, erreur annoncée).
 * ------------------------------------------------------------------ */

const controlBase =
  "w-full rounded-xl border bg-paper px-4 text-ink placeholder:text-faint shadow-sm transition-colors focus:outline-none focus:ring-2 focus:ring-primary-600 focus:border-primary-400 disabled:opacity-60";

type FieldWrapProps = {
  id: string;
  label: string;
  error?: string;
  hint?: string;
  required?: boolean;
  children: React.ReactNode;
};

function FieldWrap({ id, label, error, hint, required, children }: FieldWrapProps) {
  return (
    <div>
      <label htmlFor={id} className="mb-1.5 block text-sm font-medium text-ink">
        {label}
        {required ? <span className="ml-0.5 text-primary-600" aria-hidden="true">*</span> : null}
      </label>
      {children}
      {hint && !error ? <p className="mt-1.5 text-xs text-muted">{hint}</p> : null}
      {error ? (
        <p id={`${id}-error`} role="alert" className="mt-1.5 text-sm text-red-600">
          {error}
        </p>
      ) : null}
    </div>
  );
}

type TextFieldProps = React.InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  error?: string;
  hint?: string;
};

export const TextField = forwardRef<HTMLInputElement, TextFieldProps>(
  ({ label, error, hint, required, className, id: idProp, ...props }, ref) => {
    const autoId = useId();
    const id = idProp ?? autoId;
    return (
      <FieldWrap id={id} label={label} error={error} hint={hint} required={required}>
        <input
          ref={ref}
          id={id}
          aria-invalid={error ? true : undefined}
          aria-describedby={error ? `${id}-error` : undefined}
          className={cn(controlBase, "h-12", error && "border-red-400", className)}
          {...props}
        />
      </FieldWrap>
    );
  },
);
TextField.displayName = "TextField";

type TextareaFieldProps = React.TextareaHTMLAttributes<HTMLTextAreaElement> & {
  label: string;
  error?: string;
  hint?: string;
};

export const TextareaField = forwardRef<HTMLTextAreaElement, TextareaFieldProps>(
  ({ label, error, hint, required, className, id: idProp, rows = 4, ...props }, ref) => {
    const autoId = useId();
    const id = idProp ?? autoId;
    return (
      <FieldWrap id={id} label={label} error={error} hint={hint} required={required}>
        <textarea
          ref={ref}
          id={id}
          rows={rows}
          aria-invalid={error ? true : undefined}
          aria-describedby={error ? `${id}-error` : undefined}
          className={cn(controlBase, "py-3", error && "border-red-400", className)}
          {...props}
        />
      </FieldWrap>
    );
  },
);
TextareaField.displayName = "TextareaField";

type SelectFieldProps = React.SelectHTMLAttributes<HTMLSelectElement> & {
  label: string;
  error?: string;
  hint?: string;
  options: { value: string; label: string }[];
  placeholder?: string;
};

export const SelectField = forwardRef<HTMLSelectElement, SelectFieldProps>(
  ({ label, error, hint, required, options, placeholder, className, id: idProp, ...props }, ref) => {
    const autoId = useId();
    const id = idProp ?? autoId;
    return (
      <FieldWrap id={id} label={label} error={error} hint={hint} required={required}>
        <select
          ref={ref}
          id={id}
          aria-invalid={error ? true : undefined}
          aria-describedby={error ? `${id}-error` : undefined}
          className={cn(controlBase, "h-12", error && "border-red-400", className)}
          defaultValue=""
          {...props}
        >
          {placeholder ? (
            <option value="" disabled>
              {placeholder}
            </option>
          ) : null}
          {options.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      </FieldWrap>
    );
  },
);
SelectField.displayName = "SelectField";

type CheckboxFieldProps = React.InputHTMLAttributes<HTMLInputElement> & {
  label: React.ReactNode;
  error?: string;
};

export const CheckboxField = forwardRef<HTMLInputElement, CheckboxFieldProps>(
  ({ label, error, className, id: idProp, ...props }, ref) => {
    const autoId = useId();
    const id = idProp ?? autoId;
    return (
      <div>
        <div className="flex items-start gap-3">
          <input
            ref={ref}
            id={id}
            type="checkbox"
            aria-invalid={error ? true : undefined}
            aria-describedby={error ? `${id}-error` : undefined}
            className={cn(
              "mt-0.5 size-5 shrink-0 rounded border-line-strong text-primary-600 focus:ring-2 focus:ring-primary-600 focus:ring-offset-2",
              className,
            )}
            {...props}
          />
          <label htmlFor={id} className="text-sm leading-relaxed text-muted">
            {label}
          </label>
        </div>
        {error ? (
          <p id={`${id}-error`} role="alert" className="mt-1.5 text-sm text-red-600">
            {error}
          </p>
        ) : null}
      </div>
    );
  },
);
CheckboxField.displayName = "CheckboxField";

type RadioOption = { value: string; label: string };

/**
 * Groupe de « radio-cards » accessible (fieldset + legend), partagé par le
 * formulaire de diagnostic et le guide d'orientation formation.
 *
 * `inputProps(value)` fournit les props de chaque `<input>` : soit le retour de
 * `register("champ")` (React Hook Form, non contrôlé), soit `{ checked, onChange }`
 * (contrôlé). Le style de sélection repose sur `:checked`, valable dans les deux cas.
 */
export function RadioCardGroup({
  legend,
  options,
  inputProps,
  columns = 1,
  error,
  legendClassName = "mb-3 text-sm font-medium text-ink",
}: {
  legend: string;
  options: readonly RadioOption[];
  inputProps: (value: string) => React.ComponentProps<"input">;
  columns?: 1 | 2;
  error?: string;
  legendClassName?: string;
}) {
  const id = useId();
  return (
    <fieldset>
      <legend className={legendClassName}>{legend}</legend>
      <div className={cn("grid gap-2.5", columns === 2 && "sm:grid-cols-2")}>
        {options.map((o) => (
          <label
            key={o.value}
            className="flex cursor-pointer items-center gap-3 rounded-xl border border-line p-4 text-sm font-medium text-ink transition-colors hover:border-primary-300 has-[:checked]:border-primary-500 has-[:checked]:bg-primary-50 has-[:checked]:text-primary-800"
          >
            <input
              type="radio"
              className="size-4 text-primary-600"
              aria-describedby={error ? `${id}-error` : undefined}
              {...inputProps(o.value)}
            />
            {o.label}
          </label>
        ))}
      </div>
      {error ? (
        <p id={`${id}-error`} role="alert" className="mt-2 text-sm text-red-600">
          {error}
        </p>
      ) : null}
    </fieldset>
  );
}

/** Champ honeypot anti-spam : invisible pour l'humain, piégeant pour les bots. */
export function Honeypot({ register }: { register?: Record<string, unknown> }) {
  return (
    <div aria-hidden="true" className="absolute left-[-9999px] top-[-9999px] h-0 w-0 overflow-hidden">
      <label htmlFor="website">Ne pas remplir ce champ</label>
      <input
        id="website"
        type="text"
        tabIndex={-1}
        autoComplete="off"
        {...register}
      />
    </div>
  );
}
