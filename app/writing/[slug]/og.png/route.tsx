import { ImageResponse } from "next/og";
import { getPost, getPosts } from "@/lib/posts";

// A route handler rather than the opengraph-image convention: that convention
// exports an extensionless file, which static hosts serve as
// application/octet-stream. A path ending in .png gets the right content type.
export const dynamic = "force-static";

const SIZE = { width: 1200, height: 630 };

export function generateStaticParams() {
  return getPosts().map((post) => ({ slug: post.slug }));
}

/**
 * Satori supports a subset of CSS, so this stays flat: no oklch, no custom
 * properties, no gradients. Colours mirror tools/og-card.tsx so a post card and
 * the site card read as the same family.
 */
export async function GET(
  _request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;
  const post = getPost(slug);

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

        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          <div
            style={{
              fontSize: 24,
              letterSpacing: 4,
              color: "#0b8a90",
              textTransform: "uppercase",
            }}
          >
            Writing
          </div>
          <div
            style={{ fontSize: 68, lineHeight: 1.1, fontWeight: 700, letterSpacing: -2 }}
          >
            {post?.title ?? "kieran.co"}
          </div>
        </div>

        <div style={{ fontSize: 24, color: "#4b5158" }}>
          {post?.reading ?? "Notes on front-end engineering"}
        </div>
      </div>
    ),
    SIZE
  );
}
