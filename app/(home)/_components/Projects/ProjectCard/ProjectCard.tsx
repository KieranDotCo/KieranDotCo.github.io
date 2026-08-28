import type { Project } from "@/data/projects";
import styles from "./ProjectCard.module.css";

export function ProjectCard({ project }: { project: Project }) {
  return (
    <article className={styles.card}>
      <span className={styles.head}>
        {/* Stretched via .name::after, so the whole card opens the project. */}
        <a href={project.href} className={styles.name}>
          {project.name}
        </a>
        <span className={styles.tag}>{project.tag}</span>
      </span>

      <span className={styles.blurb}>{project.blurb}</span>

      {project.repo ? (
        <a
          href={project.repo}
          className={styles.repo}
          aria-label={`${project.name} source on GitHub`}
        >
          {project.repo.replace("https://", "")}
        </a>
      ) : null}
    </article>
  );
}
