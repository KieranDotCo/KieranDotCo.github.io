import type { ReactNode } from "react";
import styles from "./Section.module.css";

type SectionProps = {
  id: string;
  title: string;
  aside?: ReactNode;
  children: ReactNode;
};

export function Section({ id, title, aside, children }: SectionProps) {
  return (
    <section className={styles.section} id={id}>
      <header className={styles.head}>
        <h2 className={styles.title}>{title}</h2>
        {aside}
      </header>
      {children}
    </section>
  );
}
