import Image from "next/image";
import type { Project } from "@/data/projects";

export default function ProjectContent({ project }: { project: Project }) {
  return (
    <main className="project-detail-content">
      <section className="shell project-detail-overview">
        <div>
          <p className="project-detail-label">Overview</p>
          {project.overview.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
        </div>
        <aside>
          <p className="project-detail-label">Tools</p>
          <ul className="project-tool-list">
            {project.tools.map((tool) => <li key={tool}>{tool}</li>)}
          </ul>
        </aside>
      </section>

      <section className="shell project-detail-text-grid">
        <article>
          <p className="project-detail-label">Challenge</p>
          <p>{project.challenge}</p>
        </article>
        <article>
          <p className="project-detail-label">Role</p>
          <p>{project.roleDescription}</p>
        </article>
      </section>

      <section className="shell project-detail-gallery">
        {project.galleryImages.map((image, index) => (
          <figure className={index === 0 ? "is-wide" : ""} key={image}>
            <Image src={image} alt={`${project.title} gallery image ${index + 1}`} fill sizes={index === 0 ? "100vw" : "50vw"} />
          </figure>
        ))}
      </section>

      <section className="shell project-detail-credits">
        <p className="project-detail-label">Credits</p>
        <ul>
          {project.credits.map((credit) => <li key={credit}>{credit}</li>)}
        </ul>
      </section>
    </main>
  );
}
