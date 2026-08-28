import Image from "next/image";
import { profile } from "@/data/cv";
import { EmailLink } from "@/components/EmailLink";
import { LinkIcon } from "./LinkIcon";
import styles from "./Hero.module.css";

export function Hero() {
  return (
    <section className={styles.hero} id="about">
      <div className={styles.heroText}>
        <div className={styles.titleGroup}>
          <h1 className={styles.display}>
            Kieran
            <br />
            Whiteman
          </h1>
          <p className="eyebrow">
            {profile.role} —{" "}
            <a href={profile.companyUrl}>{profile.company}</a>
          </p>
        </div>
        <p className={styles.intro}>{profile.intro}</p>
        <ul className={styles.links}>
          {profile.links.map((l) => (
            <li key={l.label}>
              {l.email ? (
                <EmailLink className={styles.pill} iconClassName={styles.pillIcon} />
              ) : (
                <a href={l.href} className={l.primary ? styles.pillPrimary : styles.pill}>
                  {l.icon ? <LinkIcon name={l.icon} className={styles.pillIcon} /> : null}
                  {l.label}
                </a>
              )}
            </li>
          ))}
        </ul>
      </div>

      <div className={styles.portrait}>
        <Image
          src="/img/profile.jpg"
          alt="Kieran Whiteman"
          width={800}
          height={800}
          sizes="(max-width: 900px) 176px, 200px"
          priority
          className={styles.portraitImg}
        />
      </div>
    </section>
  );
}
