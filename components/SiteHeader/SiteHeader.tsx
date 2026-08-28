"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { CommandPalette } from "../CommandPalette";
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

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [active, setActive] = useState<string>("about");
  const headerRef = useRef<HTMLElement>(null);
  const burgerRef = useRef<HTMLButtonElement>(null);

  // Highlight the section in view. IntersectionObserver keeps this off the
  // scroll thread; rootMargin accounts for the sticky header height.
  useEffect(() => {
    const targets = sections
      .map((s) => document.getElementById(s.id))
      .filter((el): el is HTMLElement => Boolean(el));
    if (!targets.length) return;

    const io = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActive(visible.target.id);
      },
      { rootMargin: "-72px 0px -55% 0px", threshold: [0.1, 0.5, 1] }
    );
    targets.forEach((t) => io.observe(t));
    return () => io.disconnect();
  }, []);

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
              aria-current={active === s.id ? "true" : undefined}
            >
              {s.label}
            </Link>
          ))}

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
              aria-current={active === s.id ? "true" : undefined}
              onClick={() => setMenuOpen(false)}
            >
              {s.label}
            </Link>
          ))}
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

      <CommandPalette open={open} onOpenChange={setOpen} />
    </header>
  );
}
