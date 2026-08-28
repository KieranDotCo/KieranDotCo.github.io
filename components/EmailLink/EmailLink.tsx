"use client";

import { useCallback } from "react";

/**
 * The address is assembled at click time and never appears in the served HTML:
 * no `mailto:` href, no `@`, no domain beside a local part. Markup harvesters
 * find nothing to lift.
 *
 * This defeats bulk scraping of the HTML, not a determined scraper — the pieces
 * are still in the JS bundle for anything willing to execute or read it.
 */
const PARTS = ["kieran", "kieran", "co"];

type EmailLinkProps = {
  className?: string;
  iconClassName?: string;
};

export function EmailLink({ className, iconClassName }: EmailLinkProps) {
  const open = useCallback(() => {
    const [user, domain, tld] = PARTS;
    window.location.href = `mailto:${user}@${domain}.${tld}`;
  }, []);

  return (
    <button type="button" className={className} onClick={open}>
      <svg
        className={iconClassName}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
        focusable="false"
      >
        <rect x="2" y="4" width="20" height="16" rx="2" />
        <path d="m2 7 10 6 10-6" />
      </svg>
      Email
    </button>
  );
}
