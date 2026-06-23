"use client";

import { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const stats = [
  { value: 18, suffix: "+", label: "Years Experience" },
  { value: 100, suffix: "+", label: "Projects Delivered" },
  { value: 7, suffix: "+", label: "Countries" },
  { value: 50, suffix: "+", label: "Brands" },
];
const countries = ["Russia", "United Arab Emirates", "Indonesia", "Malaysia", "Turkey", "Qatar"];

export default function ExperienceStats() {
  const sectionRef = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    gsap.registerPlugin(ScrollTrigger);
    const scope = gsap.context(() => {
      const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
      const values = gsap.utils.toArray<HTMLElement>(".about-experience-value");
      if (reduced) {
        values.forEach((node, index) => { node.textContent = `${stats[index].value}${stats[index].suffix}`; });
        return;
      }
      const timeline = gsap.timeline({ scrollTrigger: { trigger: section, start: "top 68%", once: true } });
      timeline.fromTo("[data-experience-reveal]", { autoAlpha: 0, y: 36, filter: "blur(7px)" }, {
        autoAlpha: 1, y: 0, filter: "blur(0px)", duration: 0.8, stagger: 0.08, ease: "power3.out",
      });
      values.forEach((node, index) => {
        const counter = { value: 0 };
        timeline.to(counter, {
          value: stats[index].value, duration: 1.15, ease: "power2.out",
          onUpdate: () => { node.textContent = `${Math.round(counter.value)}${stats[index].suffix}`; },
        }, 0.25 + index * 0.12);
      });
    }, section);
    return () => scope.revert();
  }, []);

  return (
    <section ref={sectionRef} className="about-experience" aria-labelledby="international-experience-title">
      <div className="about-experience-heading" data-experience-reveal>
        <p className="about-page-kicker">02 / Global Experience</p>
        <h2 id="international-experience-title">International<br /><strong>Experience</strong></h2>
        <p>Experience working across multiple countries, industries, and cultures through exhibitions, infrastructure projects, digital platforms, and international business development.</p>
      </div>
      <ol className="about-country-list" aria-label="Countries of experience">
        {countries.map((country, index) => <li key={country} data-experience-reveal><span>{String(index + 1).padStart(2, "0")}</span>{country}</li>)}
      </ol>
      <div className="about-experience-stats">
        {stats.map((stat) => <article key={stat.label} data-experience-reveal><strong className="about-experience-value">0{stat.suffix}</strong><span>{stat.label}</span></article>)}
      </div>
    </section>
  );
}
