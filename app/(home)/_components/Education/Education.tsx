import { education } from "@/data/cv";
import { ChipList } from "../ChipList";
import { Section } from "../Section";
import styles from "./Education.module.css";

export function Education() {
  return (
    <Section id="education" title="Education">
      <div className={styles.card}>
        <h3 className={styles.title}>{education.institution}</h3>
        <p className={styles.award}>{education.award}</p>
        <ChipList
          items={[
            { label: education.grade, tone: "accent" },
            { label: education.dates },
          ]}
        />
      </div>
    </Section>
  );
}
