// Source design for app/opengraph-image.png — NOT a route and not built.
//
// The card is committed as a static PNG because `output: "export"` renders a
// dynamic opengraph-image route to an *extensionless* file, which static hosts
// (GitHub Pages included) serve as application/octet-stream. A real .png URL
// gets the right content-type for social scrapers.
//
// To change the card: copy this file back to app/opengraph-image.tsx, run
// `yarn build`, copy out/opengraph-image over app/opengraph-image.png, then
// remove the route file again.

import { ImageResponse } from "next/og";

// Required by `output: "export"`, which refuses to build this route otherwise.
export const dynamic = "force-static";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "Kieran Whiteman — Staff Software Engineer at Typeset";

/**
 * Static OG card. Satori supports a subset of CSS, so this is deliberately
 * flat: no oklch, no custom properties, no gradients.
 */
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
          background: "#eef0f2",
          color: "#1d2126",
          padding: 72,
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 14, fontSize: 26, fontWeight: 700 }}>
          <div style={{ width: 18, height: 18, borderRadius: 5, background: "#0b8a90" }} />
          kieran.co
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
          <div style={{ fontSize: 26, letterSpacing: 4, color: "#0b8a90", textTransform: "uppercase" }}>
            Staff Software Engineer — Typeset
          </div>
          <div style={{ fontSize: 104, lineHeight: 1, fontWeight: 700, letterSpacing: -4 }}>
            Kieran Whiteman
          </div>
        </div>

        <div style={{ fontSize: 24, color: "#4b5158" }}>
          Front-end engineering, search interfaces and side projects.
        </div>
      </div>
    ),
    size
  );
}
