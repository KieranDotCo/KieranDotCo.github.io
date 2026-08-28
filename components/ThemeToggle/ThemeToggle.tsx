"use client";

import * as ToggleGroup from "@radix-ui/react-toggle-group";
import { useTheme, type ThemeMode } from "@/lib/useTheme";
import styles from "./ThemeToggle.module.css";

const modes: { value: ThemeMode; label: string }[] = [
  { value: "light", label: "Light" },
  { value: "dark", label: "Dark" },
  { value: "system", label: "Auto" },
];

export function ThemeToggle() {
  const { mode, setTheme } = useTheme();

  return (
    <ToggleGroup.Root
      type="single"
      value={mode}
      aria-label="Colour theme"
      className={styles.root}
      // Radix returns "" when a pressed item is re-pressed; ignore that so the
      // control can never end up with no selection.
      onValueChange={(v) => v && setTheme(v as ThemeMode)}
    >
      {modes.map((m) => (
        <ToggleGroup.Item key={m.value} value={m.value} className={styles.item}>
          {m.label}
        </ToggleGroup.Item>
      ))}
    </ToggleGroup.Root>
  );
}
