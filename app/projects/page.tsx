import ProjectsGrid from "@/components/projects/ProjectsGrid";

export const metadata = { title: "Projects — Alsim" };

export default function ProjectsPage() {
  return <section className="pb-24 pt-36"><div className="shell"><p className="eyebrow">Selected work / 2023 — 2025</p><h1 className="display mt-5 mb-24">Projects</h1><ProjectsGrid /></div></section>;
}
