import styles from "./ChipList.module.css";

export type ChipTone = "accent" | "muted";

export type Chip = {
  label: string;
  tone?: ChipTone;
};

type ChipListProps = {
  items: ReadonlyArray<string | Chip>;
  tone?: ChipTone;
};

export function ChipList({ items, tone = "muted" }: ChipListProps) {
  return (
    <ul className={styles.chips}>
      {items.map((item) => {
        const chip: Chip = typeof item === "string" ? { label: item } : item;
        const chipTone = chip.tone ?? tone;
        return (
          <li
            key={chip.label}
            className={chipTone === "accent" ? styles.chipAccent : styles.chip}
          >
            {chip.label}
          </li>
        );
      })}
    </ul>
  );
}
