import ProjectsGrid from "@/components/projects/ProjectsGrid";

export const metadata = { title: "Projects - Alsim" };

export default function ProjectsPage() {
  return (
    <section className="work-index-page">
      <div className="shell">
        <div className="work-index-hero">
          <p>Selected Work / 2023 - 2026</p>
          <h1>Work</h1>
          <div>Editorial projects across digital products, campaigns, brand systems, and interactive experiences.</div>
        </div>
        <ProjectsGrid />
      </div>
    </section>
  );
}
