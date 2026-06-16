import Link from "next/link";
export default function FeaturedProject() {
  return <section className="bg-[var(--graphite)] py-24 text-white"><div className="shell grid gap-12 md:grid-cols-2"><div><p className="eyebrow text-white/50">Featured project / 01</p><h2 className="title mt-5">Product<br />Landing</h2><p className="copy mt-10 !text-white/50">A dark, focused product story designed around hierarchy, restraint, and pace.</p><Link href="/projects/product-landing" className="mt-8 inline-block bg-[var(--accent)] px-5 py-3 text-[10px] uppercase tracking-widest text-black">View project</Link></div><div className="placeholder-art min-h-[360px] border border-white/10" /></div></section>;
}
