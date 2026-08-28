import { roles } from "@/data/cv";
import { Section } from "../Section";
import { RoleCard } from "./RoleCard";
import styles from "./Experience.module.css";

export function Experience() {
  return (
    <Section
      id="experience"
      title="Experience"
      aside={<span className={styles.meta}>2012 → present</span>}
    >
      <div className={styles.stack}>
        {roles.map((role) => (
          <RoleCard key={role.company} role={role} />
        ))}
      </div>
    </Section>
  );
}
