import { brands } from "@/data/brands";
export default function Brands() {
  return <section className="border-t border-black/20 py-24"><div className="shell"><p className="eyebrow">Selected clients</p><h2 className="title mt-3">Brands I&apos;ve worked with</h2><div className="mt-16 grid grid-cols-2 border-l border-t border-black/15 md:grid-cols-4">{brands.map(brand => <div key={brand} className="grid h-28 place-items-center border-b border-r border-black/15 text-xl font-bold uppercase tracking-wider">{brand}</div>)}</div></div></section>;
}
