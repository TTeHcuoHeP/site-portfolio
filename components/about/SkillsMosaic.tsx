"use client";

import Image from "next/image";
import { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const skills = [
  ["01", "Creative Vision & Ideation", "The ability to generate fresh concepts, identify opportunities, and transform abstract ideas into clear creative directions."],
  ["02", "Strategic Thinking", "Connecting creativity with business goals to ensure every idea delivers measurable value and solves real problems."],
  ["03", "Team Leadership & Collaboration", "Experience leading designers, marketers, copywriters, developers, and cross-functional teams while maintaining efficient workflows and strong creative standards."],
  ["04", "Brand Development & Art Direction", "Building visual systems, guiding brand identity, and ensuring consistency across digital, print, and physical environments."],
  ["05", "Ownership & Accountability", "Taking responsibility for the full journey of a project - from briefing and planning through execution and final delivery."],
  ["06", "Public Speaking & Presentation", "Representing companies at conferences, summits, exhibitions, investor meetings, and government presentations across multiple countries."],
];

function SkillCard({ skill, tone, className = "" }: { skill: string[]; tone: "dark" | "light"; className?: string }) {
  return <article className={`about-mosaic-card is-${tone} ${className}`} data-skill-reveal><span>{skill[0]}</span><h3>{skill[1]}</h3><p>{skill[2]}</p></article>;
}

function PhotoCard({ src, alt, className }: { src: string; alt: string; className: string }) {
  return <figure className={`about-mosaic-photo ${className}`} data-skill-reveal><Image src={src} alt={alt} fill sizes="(max-width: 700px) 100vw, 45vw" className="about-mosaic-image" /></figure>;
}

export default function SkillsMosaic() {
  const sectionRef = useRef<HTMLElement>(null);
  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    gsap.registerPlugin(ScrollTrigger);
    const scope = gsap.context(() => {
      const items = gsap.utils.toArray<HTMLElement>("[data-skill-reveal]");
      if (matchMedia("(prefers-reduced-motion: reduce)").matches) {
        gsap.set(items, { autoAlpha: 1, y: 0, scale: 1 });
        return;
      }
      gsap.fromTo(items, { autoAlpha: 0, y: 46, scale: 0.97 }, {
        autoAlpha: 1, y: 0, scale: 1, duration: 0.78, stagger: 0.09, ease: "power3.out",
        scrollTrigger: { trigger: section, start: "top 72%", once: true },
      });
    }, section);
    return () => scope.revert();
  }, []);

  return (
    <section ref={sectionRef} className="about-skills-mosaic" aria-labelledby="skills-mosaic-title">
      <header className="about-mosaic-heading"><p className="about-page-kicker">03 / Skills Mosaic</p><h2 id="skills-mosaic-title">How ideas become<br /><strong>working systems.</strong></h2></header>
      <div className="about-mosaic-grid">
        <SkillCard skill={skills[0]} tone="light" className="mosaic-skill-01" />
        <PhotoCard src="/images/about/at-the-table.jpg" alt="Alsim Mamedov at a working table" className="mosaic-photo-table" />
        <SkillCard skill={skills[1]} tone="dark" className="mosaic-skill-02" />
        <SkillCard skill={skills[2]} tone="dark" className="mosaic-skill-03" />
        <PhotoCard src="/images/about/on-chair.jpg" alt="Alsim Mamedov seated in a studio" className="mosaic-photo-chair" />
        <SkillCard skill={skills[3]} tone="light" className="mosaic-skill-04" />
        <SkillCard skill={skills[4]} tone="dark" className="mosaic-skill-05" />
        <PhotoCard src="/images/alsim-portrait.jpg" alt="Portrait of Alsim Mamedov" className="mosaic-photo-speaking" />
        <SkillCard skill={skills[5]} tone="light" className="mosaic-skill-06" />
      </div>
    </section>
  );
}
