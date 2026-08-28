import Image from "next/image";
import type { Role } from "@/data/cv";
import { ChipList } from "../../ChipList";
import styles from "./RoleCard.module.css";

export function RoleCard({ role }: { role: Role }) {
  return (
    <article className={styles.card}>
      <div className={role.logoInset ? `${styles.logo} ${styles.inset}` : styles.logo}>
        <Image src={role.logo} alt="" width={56} height={56} unoptimized />
      </div>

      <div className={styles.body}>
        <div className={styles.head}>
          <div>
            <h3 className={styles.title}>{role.title}</h3>
            <a href={role.companyUrl} className={styles.company}>{role.company}</a>
          </div>
          <span className={styles.dates}>{role.dates}</span>
        </div>

        <p className={styles.summary}>{role.summary}</p>

        {role.bullets.length > 0 ? (
          <ul className={styles.bullets}>
            {role.bullets.map((bullet) => (
              <li key={bullet}>
                <span aria-hidden="true">›</span>
                <span>{bullet}</span>
              </li>
            ))}
          </ul>
        ) : null}

        <ChipList items={role.stack} tone="accent" />
      </div>
    </article>
  );
}
