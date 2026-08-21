"use client";

import Image from "next/image";
import { useCallback, useEffect, useState } from "react";

type SkillSlide = {
  number: string;
  title: React.ReactNode;
  text: string;
  image: string;
};

const slides: SkillSlide[] = [
  {
    number: "01",
    title: <>Creative Vision<br />&amp; Ideation</>,
    text: "The ability to generate fresh concepts, see opportunities, and transform abstract ideas into clear creative directions.",
    image: "/epertise/creative-vision.webp",
  },
  {
    number: "02",
    title: <>Strategic<br />Thinking</>,
    text: "I connect creativity with business goals, making sure every idea serves a measurable purpose and solves a real problem.",
    image: "/epertise/strategic.webp",
  },
  {
    number: "03",
    title: <>Team Leadership<br />&amp; Collaboration</>,
    text: "Experience leading designers, copywriters, and marketing teams while keeping workflows efficient and inspiring.",
    image: "/epertise/team-leadership.webp",
  },
  {
    number: "04",
    title: <>Brand Development<br />&amp; Art Direction</>,
    text: "Building visual systems, guiding brand identity, and ensuring consistency across all digital and print touchpoints.",
    image: "/epertise/brand-development_2.webp",
  },
  {
    number: "05",
    title: <>Ownership<br />&amp; Accountability</>,
    text: "I take responsibility for the full journey of a project - from briefing to execution, feedback cycles, and final delivery.",
    image: "/epertise/ownership.webp",
  },
  {
    number: "06",
    title: <>Creative Direction<br />In Practice</>,
    text: "I bring ideas, people, and production details together into one clear creative direction.",
    image: "/epertise/creative-direction.webp",
  },
  {
    number: "07",
    title: <>Systems That<br />Move Brands</>,
    text: "From first concept to final rollout, every touchpoint is designed to stay distinct and connected.",
    image: "/epertise/systems.webp",
  },
];

function ArrowIcon({ direction }: { direction: "left" | "right" }) {
  const path = direction === "left" ? "m10 3-5 5 5 5" : "m6 3 5 5-5 5";
  return <svg viewBox="0 0 16 16" aria-hidden><path d={path} /></svg>;
}

function SkillCard({ slide }: { slide: SkillSlide }) {
  return (
    <article className={`about-skills-slide about-skills-slide--${slide.number}`}>
      <Image key={slide.image} src={slide.image} alt="" fill sizes="(max-width: 760px) 88vw, 31vw" className="about-skills-slide-image" />
      <div className="about-skills-slide-content">
        <span className="about-skills-slide-number">{slide.number}</span>
        <h3>{slide.title}</h3>
        <p>{slide.text}</p>
      </div>
    </article>
  );
}

export default function AboutSkillsGrid() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection] = useState<"next" | "prev">("next");
  const [animationKey, setAnimationKey] = useState(0);
  const nextIndex = (activeIndex + 1) % slides.length;

  const move = useCallback((nextDirection: "next" | "prev") => {
    setDirection(nextDirection);
    setActiveIndex((current) => (
      nextDirection === "next"
        ? (current + 1) % slides.length
        : (current - 1 + slides.length) % slides.length
    ));
    setAnimationKey((current) => current + 1);
  }, []);

  useEffect(() => {
    const timer = window.setInterval(() => move("next"), 4000);

    return () => {
      window.clearInterval(timer);
    };
  }, [move]);

  return (
    <section className="about-skills-showcase" aria-labelledby="about-skills-heading">
      <div className="about-skills-intro">
        <p className="about-skills-eyebrow">Design, Strategy &amp; Creative Skills</p>
        <p className="about-skills-intro-text">A practice shaped by strategy, design systems, campaigns, and the people behind them.</p>
        <h2 id="about-skills-heading">Built through brands, teams,<br />and <strong>creative</strong> work.</h2>
      </div>

      <div className="about-skills-carousel" aria-live="polite">
        <div className={`about-skills-slides about-skills-slides--${direction}`}>
          <SkillCard key={`${slides[activeIndex].number}-${animationKey}`} slide={slides[activeIndex]} />
          <SkillCard key={`${slides[nextIndex].number}-${animationKey}`} slide={slides[nextIndex]} />
        </div>

        <div className="about-skills-nav">
          <span>{String(activeIndex + 1).padStart(2, "0")} / {String(slides.length).padStart(2, "0")}</span>
          <div>
            <button type="button" onClick={() => move("prev")} aria-label="Previous skill"><ArrowIcon direction="left" /></button>
            <span aria-hidden />
            <button type="button" onClick={() => move("next")} aria-label="Next skill"><ArrowIcon direction="right" /></button>
          </div>
        </div>
      </div>
    </section>
  );
}
