import Image from "next/image";
import type { Project } from "@/data/projects";

export default function ProjectHero({ project }: { project: Project }) {
  return (
    <header className="project-detail-hero">
      <div className="project-detail-hero-bg">
        <Image src={`/projects/${project.slug}/card_gradient.webp`} alt="" fill priority sizes="100vw" />
      </div>
      <div className="shell project-detail-hero-inner">
        <div className="project-detail-kicker">
          <span>{project.category}</span>
          <span>{project.year}</span>
        </div>
        <div className="project-detail-title-row">
          <div>
            <h1>{project.title}</h1>
            <p>{project.subtitle}</p>
          </div>
          <dl className="project-detail-facts">
            <div><dt>Client</dt><dd>{project.client}</dd></div>
            <div><dt>Role</dt><dd>{project.roleDescription}</dd></div>
            <div><dt>Location</dt><dd>{project.location}</dd></div>
          </dl>
        </div>
        <div className="project-detail-hero-image">
          <Image src={project.heroImage} alt={`${project.title} hero image`} fill priority sizes="100vw" />
        </div>
      </div>
    </header>
  );
}
