import Link from "next/link";

export default function NotFound() {
  return <section className="grid min-h-screen place-content-center bg-[var(--graphite)] px-5 text-center text-white"><p className="text-[clamp(140px,30vw,420px)] font-bold leading-[.75] tracking-[-.1em]">404</p><h1 className="mt-12 text-xl uppercase">This page disappeared into graphite.</h1><Link href="/" className="mx-auto mt-8 border border-white/25 px-6 py-3 text-xs uppercase tracking-widest">Back to home</Link></section>;
}
