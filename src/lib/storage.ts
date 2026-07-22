import "server-only";
import { createClient } from "@supabase/supabase-js";
import {
  UPLOAD_ACCEPTED_TYPES,
  UPLOAD_MAX_FILES,
  UPLOAD_MAX_SIZE_BYTES,
} from "@/schemas/forms";

/**
 * Couche de stockage pluggable (Supabase Storage), activée par variables d'env.
 * Sans configuration, l'upload est ignoré proprement (les métadonnées des
 * fichiers restent transmises à l'admin). Voir README pour l'activation.
 */
const url = process.env.SUPABASE_URL;
const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
const BUCKET = process.env.SUPABASE_UPLOAD_BUCKET || "diagnostic-uploads";

const supabase = url && serviceKey ? createClient(url, serviceKey) : null;

export type StoredFile = { name: string; size: number; type: string; url?: string };

export type UploadValidation = { ok: true; files: File[] } | { ok: false; error: string };

/** Valide un lot de fichiers (type, taille, nombre) côté serveur. */
export function validateUploads(files: File[]): UploadValidation {
  if (files.length > UPLOAD_MAX_FILES) {
    return { ok: false, error: `Maximum ${UPLOAD_MAX_FILES} photos.` };
  }
  for (const file of files) {
    if (!UPLOAD_ACCEPTED_TYPES.includes(file.type as (typeof UPLOAD_ACCEPTED_TYPES)[number])) {
      return { ok: false, error: "Format non autorisé (JPEG, PNG ou WebP)." };
    }
    if (file.size > UPLOAD_MAX_SIZE_BYTES) {
      return { ok: false, error: "Un fichier dépasse la taille maximale." };
    }
  }
  return { ok: true, files };
}

/** Stocke les fichiers si le stockage est configuré ; renvoie leurs métadonnées. */
export async function storeUploads(
  files: File[],
  prefix: string,
): Promise<StoredFile[]> {
  const stored: StoredFile[] = [];

  for (const file of files) {
    const meta: StoredFile = { name: file.name, size: file.size, type: file.type };

    if (supabase) {
      try {
        const safeName = file.name.replace(/[^a-zA-Z0-9._-]/g, "_");
        const path = `${prefix}/${safeName}`;
        const buffer = Buffer.from(await file.arrayBuffer());
        const { error } = await supabase.storage
          .from(BUCKET)
          .upload(path, buffer, { contentType: file.type, upsert: false });
        if (!error) {
          const { data } = supabase.storage.from(BUCKET).getPublicUrl(path);
          meta.url = data.publicUrl;
        } else {
          console.error("[storage:error]", error.message);
        }
      } catch (err) {
        console.error("[storage:exception]", err);
      }
    }

    stored.push(meta);
  }

  return stored;
}

export const isStorageConfigured = Boolean(supabase);
