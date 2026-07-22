import type { MetadataRoute } from "next";
import { absoluteUrl } from "@/lib/seo";

// Pages indexables (les pages légales sont en noindex → exclues).
const routes: { path: string; priority: number; changeFrequency: "monthly" | "weekly" }[] = [
  { path: "/", priority: 1, changeFrequency: "weekly" },
  { path: "/methode", priority: 0.9, changeFrequency: "monthly" },
  { path: "/reparer", priority: 0.9, changeFrequency: "monthly" },
  { path: "/se-former", priority: 0.9, changeFrequency: "monthly" },
  { path: "/realisations", priority: 0.7, changeFrequency: "monthly" },
  { path: "/a-propos", priority: 0.6, changeFrequency: "monthly" },
  { path: "/professionnels", priority: 0.7, changeFrequency: "monthly" },
  { path: "/diagnostic", priority: 0.8, changeFrequency: "monthly" },
  { path: "/demande-formation", priority: 0.7, changeFrequency: "monthly" },
  { path: "/faq", priority: 0.6, changeFrequency: "monthly" },
  { path: "/contact", priority: 0.6, changeFrequency: "monthly" },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  return routes.map((route) => ({
    url: absoluteUrl(route.path),
    lastModified,
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }));
}
