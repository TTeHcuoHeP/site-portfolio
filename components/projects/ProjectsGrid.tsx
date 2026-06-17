import { projects } from "@/data/projects";
import ProjectCard from "./ProjectCard";

export default function ProjectsGrid() {
  return (
    <div className="work-index-list">
      {projects.map((project, index) => <ProjectCard key={project.slug} project={project} index={index} />)}
    </div>
  );
}
