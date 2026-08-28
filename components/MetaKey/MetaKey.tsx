"use client";

import { useEffect, useState } from "react";
import {
  DEFAULT,
  detectMetaKey,
  formatShortcut,
  type MetaKeyLabel,
  type PlatformSignals,
} from "./detect";

export function useMetaKey(): MetaKeyLabel {
  const [label, setLabel] = useState<MetaKeyLabel>(DEFAULT);
  useEffect(() => {
    if (typeof navigator !== "undefined") {
      setLabel(detectMetaKey(navigator as PlatformSignals));
    }
  }, []);
  return label;
}

type MetaKeyProps = {
  /** Renders the full combo, e.g. "⌘K" / "Ctrl+K". Omit for the modifier alone. */
  keyName?: string;
};

export function MetaKey({ keyName }: MetaKeyProps) {
  const modifier = useMetaKey();
  return <>{keyName ? formatShortcut(modifier, keyName) : modifier}</>;
}
