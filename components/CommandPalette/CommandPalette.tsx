"use client";

import * as Dialog from "@radix-ui/react-dialog";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import {
  buildCommands,
  filterCommands,
  type CommandContext,
  type PostLink,
} from "@/lib/commands";
import { useTheme } from "@/lib/useTheme";
import { MetaKey, useMetaKey, expandShortcut } from "../MetaKey";
import styles from "./CommandPalette.module.css";

type Props = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  posts: PostLink[];
};

export function CommandPalette({ open, onOpenChange, posts }: Props) {
  const router = useRouter();
  const { toggle, setTheme } = useTheme();
  const modifier = useMetaKey();
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState(0);
  const listRef = useRef<HTMLDivElement>(null);

  const all = useMemo(() => buildCommands(posts), [posts]);
  const results = useMemo(() => filterCommands(all, query), [all, query]);
  const active = results[Math.min(selected, results.length - 1)];

  const ctx = useMemo<CommandContext>(
    () => ({
      navigate: (href) => {
        router.push(href);
        onOpenChange(false);
      },
      jump: (id) => {
        const el = document.getElementById(id);
        if (el) {
          const top = el.getBoundingClientRect().top + window.scrollY - 72;
          const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
          window.scrollTo({ top, behavior: reduce ? "auto" : "smooth" });
        } else {
          router.push(`/#${id}`);
        }
        onOpenChange(false);
      },
      openExternal: (href) => {
        window.open(href, "_blank", "noopener,noreferrer");
        onOpenChange(false);
      },
      toggleTheme: () => {
        toggle();
        onOpenChange(false);
      },
      setSystemTheme: () => {
        setTheme("system");
        onOpenChange(false);
      },
    }),
    [onOpenChange, router, setTheme, toggle]
  );

  useEffect(() => {
    if (open) {
      setQuery("");
      setSelected(0);
    }
  }, [open]);

  const onInputKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (!results.length) return;
      if (e.key === "ArrowDown") {
        e.preventDefault();
        setSelected((s) => (s + 1) % results.length);
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setSelected((s) => (s - 1 + results.length) % results.length);
      } else if (e.key === "Enter") {
        e.preventDefault();
        active?.run(ctx);
      }
    },
    [active, ctx, results.length]
  );

  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay className={styles.overlay} />
        <Dialog.Content className={styles.content} aria-describedby={undefined}>
          <VisuallyHidden>
            <Dialog.Title>Command palette</Dialog.Title>
          </VisuallyHidden>

          <div className={styles.field}>
            <span className={styles.sigil} aria-hidden="true">⌘</span>
            {/* A combobox rather than a listbox-in-a-dialog: the input keeps
                focus and owns keyboard control of the active option. */}
            <input
              className={styles.input}
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                setSelected(0);
              }}
              onKeyDown={onInputKeyDown}
              placeholder="Jump to a section, project or action…"
              role="combobox"
              aria-expanded="true"
              aria-controls="palette-list"
              aria-activedescendant={active ? `cmd-${active.id}` : undefined}
              aria-autocomplete="list"
              autoFocus
            />
            <kbd className={styles.kbd}>esc</kbd>
          </div>

          <div className={styles.list} id="palette-list" role="listbox" ref={listRef} aria-label="Results">
            {results.map((c, i) => (
              <div
                key={c.id}
                id={`cmd-${c.id}`}
                role="option"
                aria-selected={i === selected}
                className={styles.option}
                data-selected={i === selected || undefined}
                onMouseEnter={() => setSelected(i)}
                onClick={() => c.run(ctx)}
              >
                <span className={styles.optionMain}>
                  <span className={styles.group}>{c.group}</span>
                  <span className={styles.label}>{c.label}</span>
                </span>
                {c.hint ? (
                  <span className={styles.hint}>{expandShortcut(c.hint, modifier)}</span>
                ) : null}
              </div>
            ))}
            {!results.length ? <p className={styles.empty}>No matches</p> : null}
          </div>

          <div className={styles.footer}>
            <span>↑↓ navigate</span>
            <span>↵ select</span>
            <span>
              <MetaKey keyName="J" /> theme
            </span>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
