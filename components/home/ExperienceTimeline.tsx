import { experience } from "@/data/experience";
export default function ExperienceTimeline() {
  return <section className="section overflow-hidden"><div className="shell"><p className="eyebrow">Experience / Timeline placeholder</p><div className="mt-12 grid gap-4 md:grid-cols-3">{experience.map((item,i) => <article key={item.role} className={`border-t p-6 ${i === 1 ? "border-black bg-[var(--graphite)] text-white md:scale-105" : "border-black/25 text-[var(--muted)]"}`}><span className="text-5xl">0{experience.length - i}</span><h2 className="mt-10 text-3xl uppercase leading-none">{item.role}</h2><p className="mt-3 text-sm">{item.company} · {item.period}</p></article>)}</div></div></section>;
}
