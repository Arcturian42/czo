import { ImageResponse } from "next/og";
import { siteConfig } from "@/config/site";

export const alt = `${siteConfig.brandName} — Réparation et formation en électronique`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Image Open Graph générée dynamiquement (sobre, aux couleurs de la marque).
export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#0f1626",
          padding: "72px",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <div
            style={{
              width: 64,
              height: 64,
              borderRadius: 16,
              background: "#2a49d4",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <div
              style={{
                width: 22,
                height: 22,
                borderRadius: 999,
                border: "6px solid #fff",
              }}
            />
          </div>
          <div style={{ color: "#93b4ff", fontSize: 26, letterSpacing: 2 }}>
            {siteConfig.brandName}
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              color: "#fff",
              fontSize: 62,
              fontWeight: 700,
              lineHeight: 1.1,
              maxWidth: 900,
            }}
          >
            Réparer. Transmettre. Élever les standards.
          </div>
          <div style={{ color: "#aeb8c7", fontSize: 30, marginTop: 28 }}>
            {siteConfig.tagline}
          </div>
        </div>

        <div style={{ display: "flex", gap: 16 }}>
          {["Diagnostic expliqué", "Pièces identifiées", "Accord avant intervention"].map(
            (chip) => (
              <div
                key={chip}
                style={{
                  color: "#dbe6ff",
                  fontSize: 22,
                  border: "1px solid rgba(255,255,255,0.18)",
                  borderRadius: 999,
                  padding: "10px 22px",
                }}
              >
                {chip}
              </div>
            ),
          )}
        </div>
      </div>
    ),
    size,
  );
}
