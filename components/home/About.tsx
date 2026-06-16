"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import AboutSkillsGrid from "./AboutSkillsGrid";

const statistics = [
  { value: 15, suffix: "+", label: "Years Of Experience" },
  { value: 20, suffix: "+", label: "Organized Exhibitions" },
  { value: 7, suffix: "+", label: "Countries" },
  { value: 300, suffix: "+", label: "Completed Projects" },
  { value: 99, suffix: "+", label: "Happy Clients" },
  { value: 100, suffix: "%", label: "Commitment" },
];

const ARC_LENGTH = 270;
const ARC_GAP = 44;
const ARC_FINAL_WIDTH = 3;

export default function About() {
  const sectionRef = useRef<HTMLElement>(null);
  const statsGridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const statsGrid = statsGridRef.current;
    if (!section || !statsGrid) return;

    gsap.registerPlugin(ScrollTrigger);

    const scope = gsap.context(() => {
      const reducedMotion = matchMedia("(prefers-reduced-motion: reduce)").matches;
      const arcs = gsap.utils.toArray<SVGCircleElement>(".about-stat-arc");
      const numbers = gsap.utils.toArray<HTMLElement>(".about-stat-value");

      gsap.set(arcs, {
        strokeDasharray: `${ARC_LENGTH} ${ARC_GAP}`,
        strokeDashoffset: ARC_LENGTH,
        strokeWidth: 2,
      });

      if (reducedMotion) {
        gsap.set(".about-image-wrap", { autoAlpha: 1, y: 0 });
        gsap.set(arcs, { strokeDashoffset: 0, strokeWidth: ARC_FINAL_WIDTH });
        numbers.forEach((number, index) => {
          number.textContent = `${statistics[index].value}${statistics[index].suffix}`;
        });
        return;
      }

      gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top bottom",
          end: "top 60%",
          scrub: 0.8,
        },
      })
        .fromTo(".about-surface", { y: 90 }, { y: 0, ease: "none" }, 0)
        .fromTo(".about-image-wrap", { autoAlpha: 0, y: 45 }, { autoAlpha: 1, y: 0, duration: 1, ease: "power2.out" }, 0.18);

      const statsTimeline = gsap.timeline({ paused: true });

      arcs.forEach((arc, index) => {
        statsTimeline.to(arc, {
          strokeDashoffset: 0,
          strokeWidth: ARC_FINAL_WIDTH,
          duration: 1.35,
          ease: "power2.inOut",
        }, index * 0.16);
      });

      numbers.forEach((number, index) => {
        const counter = { value: 0 };
        statsTimeline.to(counter, {
          value: statistics[index].value,
          duration: 0.95,
          ease: "power2.out",
          onUpdate: () => {
            number.textContent = `${Math.round(counter.value)}${statistics[index].suffix}`;
          },
        }, 0.32 + index * 0.16);
      });

      ScrollTrigger.create({
        trigger: statsGrid,
        start: "top 75%",
        once: true,
        onEnter: () => statsTimeline.play(),
      });
    }, section);

    return () => scope.revert();
  }, []);

  return (
    <section ref={sectionRef} id="about" className="about-section">
      <div className="about-surface">
        <div className="about-top">
          <div className="about-image-wrap">
            <Image
              src="/images/about/me-about.png"
              alt="Portrait of Alsim Mamedov"
              fill
              sizes="(max-width: 1000px) 100vw, 48vw"
              className="object-contain object-bottom-left"
            />
          </div>

          <div className="about-copy">
            <p className="about-kicker">About Me</p>
            <h2 className="about-headline">
              <span><strong>From</strong> Chaos To <strong>Clarity</strong></span>
              <span>From Idea <strong>To Identity</strong><i /></span>
            </h2>
            <div className="about-paragraphs">
              <p>I&apos;ve worked across advertising, packaging, branding, digital design, and large-scale creative production - leading teams, building brand identities, and delivering projects across the UAE, Turkey, Indonesia, and Russia.</p>
              <p><strong>My journey began as a junior designer and evolved into executive leadership as a company CEO. Along the way, I gained not only creative and business expertise, but also the adaptability, strategic thinking, and ambition to keep building what comes next.</strong></p>
            </div>
          </div>
        </div>

        <div className="about-bottom">
          <div className="about-skills-copy">
            <p className="about-kicker">Experience &amp; Skills</p>
            <h3><strong>What</strong><br />I Do <strong>Best</strong><i></i></h3>
            <p>I turn ideas into clear strategies, strong brands, and great results. Here is how I can help bring your vision to life.</p>
          </div>

          <div ref={statsGridRef} className="about-stats-grid">
            {statistics.map((stat) => (
              <article className="stat-circle" key={stat.label} tabIndex={0}>
                <svg viewBox="0 0 112 112" aria-hidden>
                  <circle className="about-stat-track" cx="56" cy="56" r="50" fill="none" stroke="#242424" strokeWidth="0.7" />
                  <circle className="about-stat-arc" cx="56" cy="56" r="50" fill="none" stroke="#242424" strokeWidth="2" strokeDasharray={`${ARC_LENGTH} ${ARC_GAP}`} strokeDashoffset={ARC_LENGTH} />
                </svg>
                <div className="about-stat-content">
                  <strong className="about-stat-value">0{stat.suffix}</strong>
                  <span>{stat.label}</span>
                </div>
              </article>
            ))}
          </div>
        </div>

        <AboutSkillsGrid />
      </div>
    </section>
  );
}
