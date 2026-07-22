"use client";

import { useCallback, useEffect, useId, useMemo, useRef, useState } from "react";
import { Upload, Trash2, ImageIcon } from "lucide-react";
import {
  UPLOAD_ACCEPTED_TYPES,
  UPLOAD_ACCEPTED_EXT,
  UPLOAD_MAX_FILES,
  UPLOAD_MAX_SIZE_BYTES,
  UPLOAD_MAX_SIZE_MB,
} from "@/schemas/forms";
import { cn } from "@/lib/utils";

/** Uploader d'images accessible : validation, aperçu, suppression. */
export function FileUploader({
  files,
  onChange,
}: {
  files: File[];
  onChange: (files: File[]) => void;
}) {
  const inputId = useId();
  const inputRef = useRef<HTMLInputElement>(null);
  const [error, setError] = useState<string | null>(null);
  const [dragging, setDragging] = useState(false);

  // URLs d'aperçu dérivées des fichiers, révoquées à chaque changement
  // pour éviter les fuites mémoire.
  const previews = useMemo(() => files.map((f) => URL.createObjectURL(f)), [files]);
  useEffect(() => {
    return () => previews.forEach((u) => URL.revokeObjectURL(u));
  }, [previews]);

  const addFiles = useCallback(
    (incoming: FileList | File[]) => {
      setError(null);
      const list = Array.from(incoming);
      const accepted: File[] = [...files];

      for (const file of list) {
        if (accepted.length >= UPLOAD_MAX_FILES) {
          setError(`Maximum ${UPLOAD_MAX_FILES} photos.`);
          break;
        }
        if (!UPLOAD_ACCEPTED_TYPES.includes(file.type as (typeof UPLOAD_ACCEPTED_TYPES)[number])) {
          setError("Formats acceptés : JPEG, PNG, WebP.");
          continue;
        }
        if (file.size > UPLOAD_MAX_SIZE_BYTES) {
          setError(`Chaque photo doit peser moins de ${UPLOAD_MAX_SIZE_MB} Mo.`);
          continue;
        }
        // Évite les doublons évidents (nom + taille).
        if (accepted.some((f) => f.name === file.name && f.size === file.size)) continue;
        accepted.push(file);
      }
      onChange(accepted);
    },
    [files, onChange],
  );

  const remove = (index: number) => {
    onChange(files.filter((_, i) => i !== index));
  };

  return (
    <div>
      <div
        onDragOver={(e) => {
          e.preventDefault();
          setDragging(true);
        }}
        onDragLeave={() => setDragging(false)}
        onDrop={(e) => {
          e.preventDefault();
          setDragging(false);
          if (e.dataTransfer.files?.length) addFiles(e.dataTransfer.files);
        }}
        className={cn(
          "rounded-2xl border-2 border-dashed p-6 text-center transition-colors",
          dragging ? "border-primary-400 bg-primary-50" : "border-line-strong bg-surface",
        )}
      >
        <input
          ref={inputRef}
          id={inputId}
          type="file"
          accept={UPLOAD_ACCEPTED_EXT}
          multiple
          className="sr-only"
          onChange={(e) => {
            if (e.target.files?.length) addFiles(e.target.files);
            e.target.value = "";
          }}
        />
        <Upload className="mx-auto size-7 text-primary-600" aria-hidden="true" />
        <p className="mt-3 text-sm text-ink">
          Glissez vos photos ici, ou{" "}
          <label
            htmlFor={inputId}
            className="cursor-pointer font-medium text-primary-700 underline underline-offset-2 hover:text-primary-800"
          >
            parcourez vos fichiers
          </label>
          .
        </p>
        <p className="mt-1 text-xs text-muted">
          JPEG, PNG ou WebP · {UPLOAD_MAX_SIZE_MB} Mo max · {UPLOAD_MAX_FILES} photos max
        </p>
      </div>

      {error ? (
        <p role="alert" className="mt-2 text-sm text-red-600">
          {error}
        </p>
      ) : null}

      {files.length > 0 ? (
        <ul className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3">
          {files.map((file, index) => (
            <li
              key={`${file.name}-${index}`}
              className="group relative overflow-hidden rounded-xl border border-line bg-paper"
            >
              <div className="flex aspect-square items-center justify-center bg-surface">
                {previews[index] ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={previews[index]}
                    alt={`Aperçu : ${file.name}`}
                    className="size-full object-cover"
                  />
                ) : (
                  <ImageIcon className="size-6 text-faint" aria-hidden="true" />
                )}
              </div>
              <button
                type="button"
                onClick={() => remove(index)}
                aria-label={`Supprimer ${file.name}`}
                className="absolute right-1.5 top-1.5 grid size-8 place-items-center rounded-lg bg-ink/80 text-white opacity-90 transition hover:bg-ink"
              >
                <Trash2 className="size-4" aria-hidden="true" />
              </button>
              <p className="truncate px-2 py-1.5 text-[0.7rem] text-muted">{file.name}</p>
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
}
