import type { Metadata } from "next";
import { siteConfig } from "@/config/site";

/** Base URL du site (surchargée par NEXT_PUBLIC_SITE_URL en production). */
export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL || siteConfig.url
).replace(/\/$/, "");

/** Construit une URL absolue à partir d'un chemin relatif. */
export function absoluteUrl(path = "/"): string {
  return `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`;
}

type BuildMetadataArgs = {
  title?: string;
  description: string;
  path?: string;
  keywords?: string[];
  noindex?: boolean;
};

/**
 * Fabrique une configuration Metadata cohérente (title, canonical, OG, Twitter).
 * Le title est complété par le nom de marque via le template défini dans le layout.
 * L'image Open Graph est injectée automatiquement par le fichier
 * `app/opengraph-image.tsx` (convention Next.js).
 */
export function buildMetadata({
  title,
  description,
  path = "/",
  keywords,
  noindex,
}: BuildMetadataArgs): Metadata {
  const canonical = absoluteUrl(path);
  return {
    title,
    description,
    keywords,
    alternates: { canonical },
    robots: noindex ? { index: false, follow: false } : undefined,
    openGraph: {
      type: "website",
      locale: "fr_FR",
      url: canonical,
      siteName: siteConfig.brandName,
      title: title ?? siteConfig.brandName,
      description,
    },
    twitter: {
      card: "summary_large_image",
      title: title ?? siteConfig.brandName,
      description,
    },
  };
}
