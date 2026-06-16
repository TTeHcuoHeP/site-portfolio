import Image from "next/image";
import Link from "next/link";
import type { CSSProperties } from "react";
import type { Project } from "@/data/projects";

const formatCounter = (value: number) => String(value).padStart(2, "0");

export default function ProjectSlide({
  project,
  index,
  total,
}: {
  project: Project;
  index: number;
  total: number;
}) {
  const slideStyle = {
    zIndex: index + 1,
    "--project-card-gradient": `url("/projects/${project.slug}/card_gradient.webp")`,
  } as CSSProperties;

  return (
    <article className="project-slide projects-scroll-slide" data-project-slide style={slideStyle}>
      <div className="projects-scroll-card-gradient" aria-hidden />

      <div className="projects-scroll-counter" data-project-reveal data-reveal-order="0">
        <span>{formatCounter(index + 1)}</span>
        <i>/</i>
        <small>{formatCounter(total)}</small>
      </div>

      <div className="projects-scroll-copy">
        <h2 data-project-reveal data-reveal-order="1">{project.title}</h2>

        <div className="projects-scroll-challenge">
          <h3 data-project-reveal data-reveal-order="3">Challenge:</h3>
          <p data-project-reveal data-reveal-order="4">{project.challenge}</p>
        </div>

        <div className="projects-scroll-role">
          <h3 data-project-reveal data-reveal-order="5">Role:</h3>
          <p data-project-reveal data-reveal-order="6">{project.role}</p>
        </div>

        <Link href={`/projects/${project.slug}`} className="projects-scroll-button" data-project-reveal data-reveal-order="7">
          <span>View<br />Project</span>
          <i aria-hidden />
        </Link>
      </div>

      <ul className="projects-scroll-tags" data-project-reveal data-reveal-order="2" aria-label="Project skills">
        {project.tags.map((tag) => <li key={tag}>{tag}</li>)}
      </ul>

      <div className="projects-scroll-image">
        <Image
          src={project.cover}
          alt={`${project.title} project presentation`}
          fill
          sizes="(max-width: 900px) 100vw, 58vw"
          className="projects-scroll-image-file"
          priority={index === 0}
        />
      </div>

      <div className="projects-scroll-indicator" data-project-reveal data-reveal-order="8">
        <span aria-hidden />
        <small>Scroll</small>
      </div>
    </article>
  );
}
