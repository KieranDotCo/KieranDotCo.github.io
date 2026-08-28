"use client";

import { useEffect, useState } from "react";

export type MetaKeyLabel = "⌘" | "Ctrl";

/**
 * Server and the first client render must agree, so everything starts on the
 * Apple label and corrects after mount. ⌘ is the better default: the shortcut
 * hints are decorative, and Apple is where the symbol is meaningless if wrong.
 */
const DEFAULT: MetaKeyLabel = "⌘";

/** navigator.userAgentData is unavailable in Safari, so keep the old signals. */
type UADataNavigator = Navigator & { userAgentData?: { platform?: string } };

const APPLE = /mac|iphone|ipad|ipod/i;

function detect(): MetaKeyLabel {
  if (typeof navigator === "undefined") return DEFAULT;
  const nav = navigator as UADataNavigator;

  // Strict precedence, not a concatenation of every signal: userAgentData is
  // authoritative where it exists, then the deprecated platform, and the UA
  // string only as a last resort. Testing them all together means one stale
  // signal saying "mac" outvotes two that say otherwise.
  // iPadOS reports "Macintosh", which is the answer we want anyway — an
  // attached keyboard there really does have a ⌘ key.
  const platform = nav.userAgentData?.platform || nav.platform;
  if (platform) return APPLE.test(platform) ? "⌘" : "Ctrl";
  return APPLE.test(nav.userAgent || "") ? "⌘" : "Ctrl";
}

export function useMetaKey(): MetaKeyLabel {
  const [label, setLabel] = useState<MetaKeyLabel>(DEFAULT);
  useEffect(() => setLabel(detect()), []);
  return label;
}

/**
 * Joins the modifier to a key the way each platform writes it: macOS stacks
 * the glyphs ("⌘K"), Windows and Linux use a separator ("Ctrl+K").
 */
export function formatShortcut(modifier: MetaKeyLabel, keyName: string): string {
  return modifier === "⌘" ? `${modifier}${keyName}` : `${modifier}+${keyName}`;
}

/**
 * Expands a platform-neutral "Mod+J" token stored in data. Anything without a
 * leading Mod is passed straight through.
 */
export function expandShortcut(token: string, modifier: MetaKeyLabel): string {
  if (!token.startsWith("Mod+")) return token;
  return formatShortcut(modifier, token.slice("Mod+".length));
}

type MetaKeyProps = {
  keyName?: string;
};

export function MetaKey({ keyName }: MetaKeyProps) {
  const modifier = useMetaKey();
  return <>{keyName ? formatShortcut(modifier, keyName) : modifier}</>;
}
