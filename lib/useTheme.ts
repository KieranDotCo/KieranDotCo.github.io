"use client";

import { useCallback, useSyncExternalStore } from "react";

export type ThemeMode = "light" | "dark" | "system";

const KEY = "kieran-theme";

type Snapshot = { mode: ThemeMode; resolved: "light" | "dark" };

/**
 * One store for the whole app. With per-hook useState, a change made through one
 * consumer (⌘J in the palette) updated the DOM but left every other consumer
 * (the header's ThemeToggle) showing stale state.
 */
let mode: ThemeMode = "system";
let systemDark = false;
let started = false;

// useSyncExternalStore compares snapshots by identity, so this object is only
// replaced when a value actually changes — returning a fresh one every read
// would re-render forever.
let snapshot: Snapshot = { mode: "system", resolved: "light" };

// ThemeScript has already set data-theme before paint, so nothing flashes while
// hydration catches up to this placeholder.
const serverSnapshot: Snapshot = { mode: "system", resolved: "light" };

const listeners = new Set<() => void>();

function publish() {
  const resolved = mode === "system" ? (systemDark ? "dark" : "light") : mode;
  if (snapshot.mode === mode && snapshot.resolved === resolved) return;
  snapshot = { mode, resolved };
  listeners.forEach((l) => l());
}

function start() {
  if (started || typeof window === "undefined") return;
  started = true;

  try {
    const stored = localStorage.getItem(KEY);
    if (stored === "light" || stored === "dark") mode = stored;
  } catch {
    /* private mode — in-memory state still holds for this session */
  }

  const mq = window.matchMedia("(prefers-color-scheme: dark)");
  systemDark = mq.matches;
  mq.addEventListener("change", () => {
    systemDark = mq.matches;
    publish();
  });

  window.addEventListener("storage", (e) => {
    if (e.key !== KEY) return;
    mode = e.newValue === "light" || e.newValue === "dark" ? e.newValue : "system";
    document.documentElement.dataset.theme = mode;
    publish();
  });

  publish();
}

function subscribe(listener: () => void) {
  start();
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}

function getSnapshot() {
  return snapshot;
}

function getServerSnapshot() {
  return serverSnapshot;
}

function setThemeMode(next: ThemeMode) {
  mode = next;
  document.documentElement.dataset.theme = next;
  try {
    if (next === "system") localStorage.removeItem(KEY);
    else localStorage.setItem(KEY, next);
  } catch {
    /* private mode — the in-memory state still holds for this session */
  }
  publish();
}

export function useTheme() {
  const { mode: currentMode, resolved } = useSyncExternalStore(
    subscribe,
    getSnapshot,
    getServerSnapshot
  );

  const setTheme = useCallback((next: ThemeMode) => setThemeMode(next), []);

  // Reads the store rather than a captured value, so it always flips from
  // whatever is on screen right now — including a change made elsewhere.
  const toggle = useCallback(
    () => setThemeMode(snapshot.resolved === "dark" ? "light" : "dark"),
    []
  );

  return { mode: currentMode, resolved, setTheme, toggle };
}
