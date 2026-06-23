"use client";

import { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const tools = ["Figma", "Photoshop", "Illustrator", "InDesign", "After Effects", "Premiere Pro", "DaVinci Resolve", "Blender", "ChatGPT", "Claude", "Cursor", "VS Code", "GitHub", "Vercel", "Next.js", "React", "GSAP"];

export default function ToolsGrid() {
  const sectionRef = useRef<HTMLElement>(null);
  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    gsap.registerPlugin(ScrollTrigger);
    const scope = gsap.context(() => {
      if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      gsap.fromTo(".about-tool", { autoAlpha: 0, y: 24 }, {
        autoAlpha: 1, y: 0, duration: 0.6, stagger: 0.045, ease: "power3.out",
        scrollTrigger: { trigger: section, start: "top 72%", once: true },
      });
    }, section);
    return () => scope.revert();
  }, []);

  return (
    <section ref={sectionRef} className="about-tools" aria-labelledby="about-tools-title">
      <header><p className="about-page-kicker">04 / Tools &amp; Technologies</p><h2 id="about-tools-title">Tools I <strong>Work With</strong></h2></header>
      <div className="about-tools-grid">
        {tools.map((tool, index) => <article className="about-tool" key={tool} tabIndex={0}><span>{String(index + 1).padStart(2, "0")}</span><strong aria-hidden>{tool.slice(0, 2)}</strong><p>{tool}</p></article>)}
      </div>
    </section>
  );
}
