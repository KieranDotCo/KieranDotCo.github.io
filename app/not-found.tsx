import Link from "next/link";
import { MetaKey } from "@/components/MetaKey";

export default function NotFound() {
  return (
    <div style={{ maxWidth: "var(--measure)", margin: "0 auto", padding: "6rem var(--gutter)" }}>
      <p className="eyebrow">404</p>
      <h1 style={{ fontSize: "clamp(2.5rem, 6vw, 4rem)", margin: "1rem 0" }}>
        Nothing here
      </h1>
      <p style={{ color: "var(--muted)", marginBottom: "2rem" }}>
        That page does not exist. Press <MetaKey keyName="K" /> to jump somewhere useful.
      </p>
      <Link href="/" style={{ color: "var(--accent)", fontFamily: "var(--font-mono)" }}>
        ← Back home
      </Link>
    </div>
  );
}
