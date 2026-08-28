import type { Metadata } from "next";
import { Space_Grotesk, IBM_Plex_Mono } from "next/font/google";
import { SiteHeader } from "@/components/SiteHeader";
import { getPosts } from "@/lib/posts";
import { ThemeScript } from "@/components/ThemeScript";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  display: "swap",
});

const plexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-plex-mono",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://kieran.co"),
  title: { default: "Kieran Whiteman", template: "%s — Kieran Whiteman" },
  description:
    "Software engineer with experience across multiple disciplines, from full stack to purely front-end. Staff Software Engineer at Typeset.",
  openGraph: {
    type: "website",
    url: "https://kieran.co",
    siteName: "kieran.co",
    title: "Kieran Whiteman",
    description: "Staff Software Engineer at Typeset. Front-end engineering, search UIs and side projects.",
  },
  twitter: { card: "summary_large_image" },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  // Only what the palette needs — this crosses into the client bundle.
  const postLinks = getPosts().map(({ slug, title, excerpt }) => ({
    slug,
    title,
    excerpt,
  }));

  return (
    // data-theme is set to the stored preference by ThemeScript before paint;
    // "system" is the honest default and works with JS disabled.
    // The font variables live here, not on <body>: custom properties resolve
    // where they are declared, so :root's --font-sans can only see
    // --font-space-grotesk if both are set on the same element.
    <html
      lang="en-GB"
      data-theme="system"
      className={`${spaceGrotesk.variable} ${plexMono.variable}`}
      suppressHydrationWarning
    >
      <head>
        <ThemeScript />
      </head>
      <body>
        <a className="skipLink" href="#main">Skip to content</a>
        <SiteHeader posts={postLinks} />
        <main id="main">{children}</main>
      </body>
    </html>
  );
}
