import { ImageResponse } from "next/og";
import { profile } from "@/data/cv";

// A route handler rather than the opengraph-image convention: that convention
// exports an extensionless file, which static hosts serve as
// application/octet-stream. A path ending in .png gets the right content type,
// and generating it means there is no committed PNG to regenerate by hand.
export const dynamic = "force-static";

const SIZE = { width: 1200, height: 630 };

/**
 * Site-wide card. Satori supports a subset of CSS, so this stays flat: no oklch,
 * no custom properties, no gradients.
 */
export async function GET() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#eef0f2",
          color: "#1d2126",
          padding: 72,
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 14,
            fontSize: 26,
            fontWeight: 700,
          }}
        >
          <div style={{ width: 18, height: 18, borderRadius: 5, background: "#0b8a90" }} />
          kieran.co
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
          <div
            style={{
              fontSize: 26,
              letterSpacing: 4,
              color: "#0b8a90",
              textTransform: "uppercase",
            }}
          >
            {`${profile.role} — ${profile.company}`}
          </div>
          <div
            style={{ fontSize: 104, lineHeight: 1, fontWeight: 700, letterSpacing: -4 }}
          >
            {profile.name}
          </div>
        </div>

        <div style={{ fontSize: 24, color: "#4b5158" }}>
          Front-end engineering, search interfaces and side projects.
        </div>
      </div>
    ),
    SIZE
  );
}
