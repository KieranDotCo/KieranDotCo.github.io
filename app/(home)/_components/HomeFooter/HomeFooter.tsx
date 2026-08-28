import { profile } from "@/data/cv";
import { MetaKey } from "@/components/MetaKey";
import styles from "./HomeFooter.module.css";

export function HomeFooter() {
  return (
    <footer className={styles.footer}>
      <span>Kieran Whiteman — {profile.location}</span>
      <span>
        Press <MetaKey keyName="K" /> anywhere
      </span>
    </footer>
  );
}
