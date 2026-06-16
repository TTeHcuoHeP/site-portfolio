"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "@/lib/gsap";

const words = ["Creative Direction", "Visual Systems", "Brand Identity", "Digital Campaigns", "Design Thinking"];

export default function Preloader() {
  const root = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);
  const [word, setWord] = useState(0);

  useEffect(() => {
    if (sessionStorage.getItem("alsim-intro-seen")) {
      root.current?.remove();
      return;
    }
    const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
    const duration = reduced ? .25 : 7;
    const counter = { value: 0 };
    const interval = window.setInterval(() => setWord((current) => (current + 1) % words.length), duration * 180);
    const tween = gsap.to(counter, { value: 100, duration, ease: "power1.inOut", onUpdate: () => setProgress(Math.round(counter.value)) });
    const exit = gsap.to(root.current, {
      autoAlpha: 0, duration: reduced ? .1 : .7, delay: duration, ease: "power2.inOut",
      onComplete: () => { sessionStorage.setItem("alsim-intro-seen", "true"); root.current?.remove(); },
    });
    return () => { clearInterval(interval); tween.kill(); exit.kill(); };
  }, []);

  return (
    <div ref={root} className="fixed inset-0 z-[100] grid bg-[var(--graphite)] p-5 text-[var(--paper)]">
      <div className="m-auto text-center">
        <p className="mb-5 text-[10px] uppercase tracking-[.35em] text-[var(--muted)]">{words[word]}</p>
        <p className="animate-pulse text-[clamp(70px,18vw,240px)] font-bold leading-none tracking-[-.1em]">ALSIM</p>
      </div>
      <div className="self-end">
        <div className="mb-2 flex justify-between text-xs"><span>Loading</span><span>{progress}%</span></div>
        <div className="h-px bg-white/20"><span className="block h-full bg-white" style={{ width: `${progress}%` }} /></div>
      </div>
    </div>
  );
}
