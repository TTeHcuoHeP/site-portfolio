import Image from "next/image";
import Link from "next/link";
import type { Project } from "@/data/projects";

export default function ProjectCard({ project, index }: { project: Project; index: number }) {
  return (
    <Link href={`/projects/${project.slug}`} className="work-index-card">
      <span className="work-index-number">{String(index + 1).padStart(2, "0")}</span>
      <div className="work-index-title">
        <h2>{project.title}</h2>
        <p>{project.subtitle}</p>
      </div>
      <div className="work-index-meta">
        <span>{project.client}</span>
        <span>{project.year}</span>
      </div>
      <div className="work-index-preview">
        <Image src={project.cover} alt="" fill className="work-index-preview-image" sizes="32vw" />
      </div>
    </Link>
  );
}
