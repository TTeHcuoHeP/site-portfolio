"use client";

import Image from "next/image";
import { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const skills = [
  {
    number: "01.",
    title: <>Creative Vision<br />&amp; Ideation</>,
    text: "The ability to generate fresh concepts, see opportunities, and transform abstract ideas into clear creative directions.",
    area: "skills-card-01",
    tone: "skills-card-light",
    revealOrder: 1,
  },
  {
    number: "02.",
    title: <>Strategic<br />Thinking</>,
    text: "I connect creativity with business goals, making sure every idea serves a measurable purpose and solves a real problem.",
    area: "skills-card-02",
    tone: "skills-card-dark",
    revealOrder: 6,
    arrow: true,
  },
  {
    number: "03.",
    title: <>Team<br />Leadership &amp;<br />Collaboration</>,
    text: "Experience leading designers, copywriters, and marketing teams while keeping workflows efficient and inspiring.",
    area: "skills-card-03",
    tone: "skills-card-dark",
    revealOrder: 3,
  },
  {
    number: "04.",
    title: <>Brand<br />Development &amp;<br />Art Direction</>,
    text: "Building visual systems, guiding brand identity, and ensuring consistency across all digital and print touchpoints.",
    area: "skills-card-04",
    tone: "skills-card-dark",
    revealOrder: 4,
  },
  {
    number: "05.",
    title: <>Ownership &amp;<br />Accountability</>,
    text: "I take responsibility for the full journey of a project-from briefing to execution, feedback cycles, and final delivery.",
    area: "skills-card-05",
    tone: "skills-card-light",
    revealOrder: 7,
  },
];

function SkillCard({ skill }: { skill: (typeof skills)[number] }) {
  return (
    <div className={`skill-reveal-item ${skill.area}`} data-reveal-order={skill.revealOrder}>
      <article className={`about-skill-card skill-hover-card ${skill.tone}`} tabIndex={0}>
        <span className="about-skill-number">{skill.number}</span>
        <h3>{skill.title}</h3>
        <p>{skill.text}</p>
        {skill.arrow && (
          <Image src="/images/icons/orange-arrow.svg" alt="" width={72} height={72} className="about-skill-arrow" aria-hidden />
        )}
      </article>
    </div>
  );
}

function ImageCard({ area, order, src, alt, sizes }: { area: string; order: number; src: string; alt: string; sizes: string }) {
  return (
    <div className={`skill-reveal-item ${area}`} data-reveal-order={order}>
      <figure className="about-skill-image skill-hover-card" tabIndex={0}>
        <Image src={src} alt={alt} fill sizes={sizes} className="object-cover grayscale" />
      </figure>
    </div>
  );
}

export default function AboutSkillsGrid() {
  const stageRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const stage = stageRef.current;
    const grid = gridRef.current;
    if (!stage || !grid) return;

    gsap.registerPlugin(ScrollTrigger);
    const scope = gsap.context(() => {
      const items = gsap.utils
        .toArray<HTMLElement>(".skill-reveal-item")
        .sort((a, b) => Number(a.dataset.revealOrder) - Number(b.dataset.revealOrder));

      gsap.set(items, { autoAlpha: 0, y: 35, scale: 0.96 });

      const revealTimeline = gsap.timeline({
        scrollTrigger: {
          trigger: stage,
          start: "top 75%",
          end: "+=900",
          scrub: 0.55,
          invalidateOnRefresh: true,
          markers: false,
        },
      });

      items.forEach((item, index) => {
        revealTimeline.to(item, {
          autoAlpha: 1,
          y: 0,
          scale: 1,
          duration: 0.26,
          ease: "power3.out",
        }, index * 0.12);
      });

      revealTimeline
        .set(items, { autoAlpha: 1, y: 0, scale: 1 })
        .to({}, { duration: 0.15 });

      ScrollTrigger.refresh();
    }, stage);

    return () => scope.revert();
  }, []);

  return (
    <div ref={stageRef} className="about-skills-stage">
      <div ref={gridRef} className="about-skills-grid">
        <SkillCard skill={skills[0]} />
        <SkillCard skill={skills[1]} />
        <ImageCard area="skills-image-table" order={5} src="/images/about/at-the-table.jpg" alt="Alsim seated at a table" sizes="(max-width: 700px) 100vw, 25vw" />
        <SkillCard skill={skills[2]} />
        <SkillCard skill={skills[3]} />
        <ImageCard area="skills-image-chair" order={2} src="/images/about/on-chair.jpg" alt="Alsim seated on a chair" sizes="(max-width: 700px) 100vw, 50vw" />
        <SkillCard skill={skills[4]} />
      </div>
    </div>
  );
}
