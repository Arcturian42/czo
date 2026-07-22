import type { MetadataRoute } from "next";
import { siteConfig } from "@/config/site";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `${siteConfig.brandName} — Réparation & formation`,
    short_name: siteConfig.brandName,
    description: siteConfig.shortPitch,
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#17151b",
    lang: "fr",
    icons: [
      { src: "/icon.svg", sizes: "any", type: "image/svg+xml", purpose: "any" },
    ],
  };
}
