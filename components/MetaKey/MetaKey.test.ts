import { describe, expect, it } from "vitest";
import { detectMetaKey, expandShortcut, formatShortcut } from "./detect";

describe("detectMetaKey", () => {
  it("prefers userAgentData over the deprecated platform", () => {
    // The signals disagree on purpose: an earlier version tested them all as one
    // string, so a single stale "mac" outvoted two signals saying Windows.
    expect(
      detectMetaKey({
        userAgentData: { platform: "Windows" },
        platform: "MacIntel",
        userAgent: "Macintosh",
      })
    ).toBe("Ctrl");
  });

  it("falls back to platform when userAgentData is absent", () => {
    expect(detectMetaKey({ platform: "Win32", userAgent: "Macintosh" })).toBe("Ctrl");
  });

  it("falls back to the user agent when neither platform signal exists", () => {
    expect(detectMetaKey({ userAgent: "Mozilla/5.0 (Macintosh; Intel Mac OS X)" })).toBe("⌘");
  });

  it.each([
    ["macOS", "⌘"],
    ["MacIntel", "⌘"],
    ["iPhone", "⌘"],
    ["iPad", "⌘"],
    ["Windows", "Ctrl"],
    ["Win32", "Ctrl"],
    ["Linux x86_64", "Ctrl"],
  ])("maps platform %s to %s", (platform, expected) => {
    expect(detectMetaKey({ platform })).toBe(expected);
  });

  it("treats iPadOS reporting Macintosh as Apple, which is correct for its keyboard", () => {
    expect(detectMetaKey({ platform: "MacIntel", userAgent: "Version/17.0 Safari" })).toBe("⌘");
  });

  it("defaults to Ctrl when nothing is known", () => {
    expect(detectMetaKey({})).toBe("Ctrl");
  });
});

describe("formatShortcut", () => {
  it("stacks the glyph on Apple", () => {
    expect(formatShortcut("⌘", "K")).toBe("⌘K");
  });

  it("uses a separator elsewhere, so it never reads CtrlK", () => {
    expect(formatShortcut("Ctrl", "K")).toBe("Ctrl+K");
  });
});

describe("expandShortcut", () => {
  it("expands a Mod token", () => {
    expect(expandShortcut("Mod+J", "⌘")).toBe("⌘J");
    expect(expandShortcut("Mod+J", "Ctrl")).toBe("Ctrl+J");
  });

  it("passes anything else straight through", () => {
    expect(expandShortcut("↵", "Ctrl")).toBe("↵");
    expect(expandShortcut("auto", "⌘")).toBe("auto");
  });
});
