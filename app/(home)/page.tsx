import { Hero } from "./_components/Hero";
import { Experience } from "./_components/Experience";
import { Projects } from "./_components/Projects";
import { Education } from "./_components/Education";
import type { Metadata } from "next";
import { HomeFooter } from "./_components/HomeFooter";
import styles from "./page.module.css";

// Title and description come from the root layout; this is only here so the
// page declares its canonical URL.
export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

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
