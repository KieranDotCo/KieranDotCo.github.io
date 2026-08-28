"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { CommandPalette } from "../CommandPalette";
import type { PostLink } from "@/lib/commands";
import { MetaKey } from "../MetaKey";
import { ThemeToggle } from "../ThemeToggle";
import styles from "./SiteHeader.module.css";

const sections = [
  { id: "about", label: "About" },
  { id: "experience", label: "Experience" },
  { id: "projects", label: "Projects" },
  { id: "education", label: "Education" },
];

/** Matches the breakpoint where .link/.search reappear in the stylesheet. */
const WIDE = "(min-width: 901px)";

/** Sticky header height, so the decision line sits below it. */
const HEADER_OFFSET = 72;

export function SiteHeader({ posts }: { posts: PostLink[] }) {
  const [open, setOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [active, setActive] = useState<string>("about");
  const pathname = usePathname();
  const onHome = pathname === "/";
  const headerRef = useRef<HTMLElement>(null);
  const burgerRef = useRef<HTMLButtonElement>(null);

  // Highlight the section in view.
  //
  // This used to be an IntersectionObserver picking the highest
  // intersectionRatio, which is unsound when sections differ wildly in height:
  // Experience is ~2400px and can never exceed a ratio of about 0.17, while
  // Education is ~310px. Education also sits close enough to the bottom that
  // the page runs out of scroll before it could ever win, so it never
  // highlighted at all. A single decision line is height-independent.
  useEffect(() => {
    if (!onHome) return;

    const ids = sections.map((s) => s.id);
    let frame = 0;

    const pick = () => {
      frame = 0;
      const line = HEADER_OFFSET + window.innerHeight * 0.25;

      let current = "";
      for (const id of ids) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top <= line) current = id;
      }

      // The final section is usually too short to reach the line, so once the
      // page is scrolled to the end it takes precedence.
      const atBottom =
        window.scrollY + window.innerHeight >=
        document.documentElement.scrollHeight - 4;
      if (atBottom) {
        const last = ids.filter((id) => document.getElementById(id)).pop();
        if (last) current = last;
      }

      if (current) setActive(current);
    };

    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(pick);
    };

    pick();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, [onHome]);

  // Growing past the breakpoint reveals the full nav, so a menu left open
  // would linger as dead state (and reappear on the way back down).
  useEffect(() => {
    const mq = window.matchMedia(WIDE);
    const sync = () => mq.matches && setMenuOpen(false);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  useEffect(() => {
    if (!menuOpen) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key !== "Escape") return;
      setMenuOpen(false);
      burgerRef.current?.focus();
    };
    const onPointerDown = (e: PointerEvent) => {
      if (!headerRef.current?.contains(e.target as Node)) setMenuOpen(false);
    };

    document.addEventListener("keydown", onKeyDown);
    document.addEventListener("pointerdown", onPointerDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.removeEventListener("pointerdown", onPointerDown);
    };
  }, [menuOpen]);

  return (
    <header className={styles.header} ref={headerRef}>
      <div className={styles.bar}>
        <Link href="/#top" className={styles.brand}>
          <span className={styles.dot} aria-hidden="true" />
          kieran.co
        </Link>

        <nav className={styles.nav} aria-label="Sections">
          {sections.map((s) => (
            <Link
              key={s.id}
              href={`/#${s.id}`}
              className={styles.link}
              aria-current={onHome && active === s.id ? "true" : undefined}
            >
              {s.label}
            </Link>
          ))}

          <Link
            href="/writing"
            className={styles.link}
            aria-current={pathname.startsWith("/writing") ? "page" : undefined}
          >
            Writing
          </Link>

          <button type="button" className={styles.search} onClick={() => setOpen(true)}>
            <span>Search or jump…</span>
            <kbd className={styles.kbd}>
            <MetaKey keyName="K" />
          </kbd>
          </button>

          <ThemeToggle />

          <button
            ref={burgerRef}
            type="button"
            className={styles.burger}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            aria-controls="mobile-nav"
            onClick={() => setMenuOpen((v) => !v)}
          >
            <svg
              viewBox="0 0 24 24"
              width="18"
              height="18"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              aria-hidden="true"
              focusable="false"
            >
              {menuOpen ? (
                <>
                  <path d="M6 6l12 12" />
                  <path d="M18 6L6 18" />
                </>
              ) : (
                <>
                  <path d="M3 7h18" />
                  <path d="M3 12h18" />
                  <path d="M3 17h18" />
                </>
              )}
            </svg>
          </button>
        </nav>
      </div>

      {/* Always rendered so aria-controls always resolves; `hidden` and the
          breakpoint decide whether it is shown. */}
      <div id="mobile-nav" className={styles.menu} hidden={!menuOpen}>
        <nav className={styles.menuList} aria-label="Sections">
          {sections.map((s) => (
            <Link
              key={s.id}
              href={`/#${s.id}`}
              className={styles.menuLink}
              aria-current={onHome && active === s.id ? "true" : undefined}
              onClick={() => setMenuOpen(false)}
            >
              {s.label}
            </Link>
          ))}

          <Link
            href="/writing"
            className={styles.menuLink}
            aria-current={pathname.startsWith("/writing") ? "page" : undefined}
            onClick={() => setMenuOpen(false)}
          >
            Writing
          </Link>
        </nav>

        <button
          type="button"
          className={styles.menuSearch}
          onClick={() => {
            setMenuOpen(false);
            setOpen(true);
          }}
        >
          <span>Search or jump…</span>
          <kbd className={styles.kbd}>
            <MetaKey keyName="K" />
          </kbd>
        </button>
      </div>

      <CommandPalette open={open} onOpenChange={setOpen} posts={posts} />
    </header>
  );
}
