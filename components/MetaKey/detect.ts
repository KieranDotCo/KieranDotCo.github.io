export type MetaKeyLabel = "⌘" | "Ctrl";

/**
 * Server and the first client render must agree, so everything starts on the
 * Apple label and corrects after mount. ⌘ is the better default: the shortcut
 * hints are decorative, and Apple is where the symbol is meaningless if wrong.
 */
export const DEFAULT: MetaKeyLabel = "⌘";

const APPLE = /mac|iphone|ipad|ipod/i;

/** The signals a browser might offer, so the precedence can be unit tested. */
export type PlatformSignals = {
  userAgentData?: { platform?: string };
  platform?: string;
  userAgent?: string;
};

export function detectMetaKey(nav: PlatformSignals): MetaKeyLabel {
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

/**
 * Joins the modifier to a key the way each platform writes it: macOS stacks the
 * glyphs ("⌘K"), Windows and Linux use a separator ("Ctrl+K").
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
