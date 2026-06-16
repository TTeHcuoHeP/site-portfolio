import type { Project } from "@/data/projects";
export default function ProjectHero({ project }: { project: Project }) {
  return <header className="min-h-[75vh] bg-[var(--graphite)] pb-12 pt-32 text-white"><div className="shell flex min-h-[60vh] flex-col justify-between"><div className="flex justify-between text-xs uppercase tracking-widest text-white/50"><span>{project.category}</span><span>{project.year}</span></div><h1 className="display max-w-6xl">{project.title}</h1></div></header>;
}
