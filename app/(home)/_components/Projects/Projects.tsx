import { projects } from "@/data/projects";
import { Section } from "../Section";
import { ProjectCard } from "./ProjectCard";
import styles from "./Projects.module.css";

export function Projects() {
  return (
    <Section id="projects" title="Projects">
      <ul className={styles.stack}>
        {projects.map((project) => (
          <li key={project.name}>
            <ProjectCard project={project} />
          </li>
        ))}
      </ul>
    </Section>
  );
}
