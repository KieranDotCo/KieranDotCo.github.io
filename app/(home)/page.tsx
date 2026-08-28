import { Hero } from "./_components/Hero";
import { Experience } from "./_components/Experience";
import { Projects } from "./_components/Projects";
import { Education } from "./_components/Education";
import { HomeFooter } from "./_components/HomeFooter";
import styles from "./page.module.css";

export default function Home() {
  return (
    <div className={styles.shell} id="top">
      <Hero />
      <Experience />
      <Projects />
      <Education />
      <HomeFooter />
    </div>
  );
}
