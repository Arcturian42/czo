import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Formats modernes servis automatiquement par l'optimiseur next/image.
    formats: ["image/avif", "image/webp"],
    // Hôtes distants autorisés. Les visuels illustratifs sont pour l'instant
    // hébergés sur le CDN de génération ; à remplacer par des assets
    // auto-hébergés (public/images) avant la mise en production.
    remotePatterns: [
      { protocol: "https", hostname: "d8j0ntlcm91z4.cloudfront.net" },
    ],
  },
};

export default nextConfig;
