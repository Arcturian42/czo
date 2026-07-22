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
          background: "#17151b",
          backgroundImage:
            "radial-gradient(1000px 500px at 78% -8%, rgba(219,138,82,0.16), transparent 60%)",
          padding: "72px",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <div
            style={{
              color: "#f5f2ec",
              fontSize: 38,
              fontWeight: 600,
              letterSpacing: 1,
            }}
          >
            {siteConfig.brandName}
          </div>
          {/* Le losange d'or — la jointure kintsugi. */}
          <div
            style={{
              width: 16,
              height: 16,
              transform: "rotate(45deg)",
              borderRadius: 3,
              background: "linear-gradient(135deg, #db8a52, #f2ba8b, #c26a34)",
            }}
          />
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          {/* Le fil d'or, au-dessus de l'accroche. */}
          <div
            style={{
              width: 120,
              height: 3,
              marginBottom: 30,
              borderRadius: 999,
              background: "linear-gradient(90deg, #c26a34, #f2ba8b, #c26a34)",
            }}
          />
          <div
            style={{
              color: "#f8f6f1",
              fontSize: 62,
              fontWeight: 700,
              lineHeight: 1.08,
              maxWidth: 940,
            }}
          >
            Réparer. Transmettre. Élever les standards.
          </div>
          <div style={{ color: "#b6ad9f", fontSize: 30, marginTop: 28 }}>
            {siteConfig.tagline}
          </div>
        </div>

        <div style={{ display: "flex", gap: 16 }}>
          {["Diagnostic expliqué", "Pièces identifiées", "Accord avant intervention"].map(
            (chip) => (
              <div
                key={chip}
                style={{
                  color: "#e7ddd0",
                  fontSize: 22,
                  border: "1px solid rgba(219,138,82,0.32)",
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
