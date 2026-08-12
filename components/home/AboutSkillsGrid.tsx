"use client";

import Image from "next/image";
import { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

type Skill = {
  number: string;
  title: React.ReactNode;
  text: string;
  tone: "skills-card-light" | "skills-card-dark";
  arrow?: boolean;
};

const skills: Skill[] = [
  {
    number: "01.",
    title: <>Creative Vision<br />&amp; Ideation</>,
    text: "The ability to generate fresh concepts, see opportunities, and transform abstract ideas into clear creative directions.",
    tone: "skills-card-light",
  },
  {
    number: "02.",
    title: <>Strategic<br />Thinking</>,
    text: "I connect creativity with business goals, making sure every idea serves a measurable purpose and solves a real problem.",
    tone: "skills-card-dark",
    arrow: true,
  },
  {
    number: "03.",
    title: <>Team<br />Leadership &amp;<br />Collaboration</>,
    text: "Experience leading designers, copywriters, and marketing teams while keeping workflows efficient and inspiring.",
    tone: "skills-card-dark",
  },
  {
    number: "04.",
    title: <>Brand<br />Development &amp;<br />Art Direction</>,
    text: "Building visual systems, guiding brand identity, and ensuring consistency across all digital and print touchpoints.",
    tone: "skills-card-dark",
  },
  {
    number: "05.",
    title: <>Ownership &amp;<br />Accountability</>,
    text: "I take responsibility for the full journey of a project - from briefing to execution, feedback cycles, and final delivery.",
    tone: "skills-card-light",
  },
];

function SkillCard({ skill }: { skill: Skill }) {
  return (
    <article className={`about-skill-card ${skill.tone}`} tabIndex={0}>
      <span className="about-skill-number">{skill.number}</span>
      <h3>{skill.title}</h3>
      <div className="about-skill-description">
        <p>{skill.text}</p>
      </div>
      {skill.arrow && (
        <Image src="/images/icons/orange-arrow.svg" alt="" width={72} height={72} className="about-skill-arrow" aria-hidden />
      )}
    </article>
  );
}

function ImageCard({ src, alt }: { src: string; alt: string }) {
  return (
    <figure className="about-skill-image" tabIndex={0}>
      <Image src={src} alt={alt} fill sizes="(max-width: 700px) 82vw, 20vw" className="object-cover grayscale" />
    </figure>
  );
}

export default function AboutSkillsGrid() {
  const stageRef = useRef<HTMLElement>(null);
  const viewportRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const stage = stageRef.current;
    const viewport = viewportRef.current;
    const track = trackRef.current;
    if (!stage || !viewport || !track) return;

    gsap.registerPlugin(ScrollTrigger);

    const scope = gsap.context(() => {
      const reducedMotion = matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (reducedMotion || window.innerWidth < 768) return;

      const getTravelDistance = () => Math.max(0, track.scrollWidth - viewport.clientWidth);
      gsap.set(track, { x: 0 });

      const animation = gsap.to(track, {
        x: () => -getTravelDistance(),
        ease: "none",
        paused: true,
      });

      const horizontalTrigger = ScrollTrigger.create({
        trigger: stage,
        animation,
        start: "top top",
        end: () => `+=${Math.max(getTravelDistance() * 1.1, viewport.clientWidth)}`,
        pin: true,
        pinSpacing: true,
        scrub: 0.65,
        anticipatePin: 1,
        refreshPriority: -1,
        invalidateOnRefresh: true,
      });

      const refreshAfterSequence = () => {
        horizontalTrigger.refresh();
        ScrollTrigger.refresh();
      };

      window.addEventListener("scroll-sequence-ready", refreshAfterSequence);
      ScrollTrigger.refresh();

      return () => window.removeEventListener("scroll-sequence-ready", refreshAfterSequence);
    }, stage);

    return () => scope.revert();
  }, []);

  return (
    <section ref={stageRef} className="about-skills-stage" aria-label="Creative competencies">
      <div ref={viewportRef} className="about-skills-viewport">
        <div ref={trackRef} className="about-skills-grid">
          <SkillCard skill={skills[0]} />
          <SkillCard skill={skills[1]} />
          <ImageCard src="/images/about/at-the-table.jpg" alt="Alsim seated at a table" />
          <SkillCard skill={skills[2]} />
          <SkillCard skill={skills[3]} />
          <ImageCard src="/images/about/on-chair.jpg" alt="Alsim seated on a chair" />
          <SkillCard skill={skills[4]} />
        </div>
      </div>
    </section>
  );
}
