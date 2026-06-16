import Image from "next/image";
import Link from "next/link";
import type { Project } from "@/data/projects";

export default function ProjectCard({ project, index }: { project: Project; index: number }) {
  return (
    <Link href={`/projects/${project.slug}`} className="group block border-t border-black/20 py-6">
      <div className="grid items-center gap-5 md:grid-cols-[80px_1fr_1fr_100px]">
        <span className="text-sm text-[var(--muted)]">0{index + 1}</span>
        <h2 className="text-4xl uppercase leading-none transition-transform duration-300 group-hover:translate-x-2 md:text-6xl">{project.title}</h2>
        <div className="relative hidden aspect-[16/7] overflow-hidden bg-[var(--graphite)] md:block">
          {project.cover ? <Image src={project.cover} alt="" fill className="object-cover object-top grayscale transition-transform duration-500 group-hover:scale-105" sizes="40vw" /> : <div className="placeholder-art h-full" />}
        </div>
        <span className="justify-self-end text-xs uppercase tracking-widest">{project.year}</span>
      </div>
    </Link>
  );
}
