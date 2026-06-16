import { notFound } from "next/navigation";
import ProjectContent from "@/components/projects/ProjectContent";
import ProjectHero from "@/components/projects/ProjectHero";
import { getProject, projects } from "@/data/projects";

export function generateStaticParams() {
  return projects.map(({ slug }) => ({ slug }));
}

export default async function ProjectPage({ params }: PageProps<"/projects/[slug]">) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();
  return <><ProjectHero project={project} /><ProjectContent project={project} /></>;
}
