const stats = [["15+", "Years experience"], ["20+", "Industries"], ["7+", "Countries"], ["300+", "Projects"], ["99+", "Ideas shipped"], ["100%", "Curiosity"]];
export default function Stats() {
  return <section className="pb-24"><div className="shell grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6">{stats.map(([value,label]) => <div key={label} className="grid aspect-square place-content-center rounded-full border border-black/35 text-center"><strong className="text-4xl">{value}</strong><span className="eyebrow mt-2 text-[var(--mid)]">{label}</span></div>)}</div></section>;
}
