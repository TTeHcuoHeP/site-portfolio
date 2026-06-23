"use client";

import Link from "next/link";
import { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function ApproachSection() {
  const rootRef = useRef<HTMLDivElement>(null);
  useLayoutEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    gsap.registerPlugin(ScrollTrigger);
    const scope = gsap.context(() => {
      if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      gsap.fromTo("[data-approach-reveal]", { autoAlpha: 0, y: 38, filter: "blur(8px)" }, {
        autoAlpha: 1, y: 0, filter: "blur(0px)", duration: 0.85, stagger: 0.1, ease: "power3.out",
        scrollTrigger: { trigger: ".about-approach", start: "top 70%", once: true },
      });
      gsap.fromTo("[data-career-preview-reveal]", { autoAlpha: 0, y: 32 }, {
        autoAlpha: 1, y: 0, duration: 0.8, stagger: 0.1, ease: "power3.out",
        scrollTrigger: { trigger: ".about-career-preview", start: "top 76%", once: true },
      });
    }, root);
    return () => scope.revert();
  }, []);

  return (
    <div ref={rootRef}>
      <section className="about-approach" aria-labelledby="approach-title">
        <p className="about-page-kicker" data-approach-reveal>05 / My Approach</p>
        <blockquote id="approach-title" data-approach-reveal>I don&apos;t follow trends.<span>I build what brands need next.</span></blockquote>
        <div className="about-approach-copy" data-approach-reveal>
          <p><strong>Great design is not decoration.</strong></p>
          <p>It is a system that connects business goals, user expectations, and communication into one coherent experience.</p>
          <p>Every project begins with understanding the problem before searching for the solution.</p>
        </div>
      </section>
      <section className="about-career-preview" aria-labelledby="career-preview-title">
        <div data-career-preview-reveal><p className="about-page-kicker">06 / Timeline Preview</p><h2 id="career-preview-title">Career <strong>Journey</strong></h2></div>
        <p data-career-preview-reveal>From junior designer to creative leadership and international business management - a career built across disciplines, teams, and markets.</p>
        <Link href="/#career-path" className="about-career-link" data-career-preview-reveal><span>View Full Career Path</span><i aria-hidden>↗</i></Link>
      </section>
    </div>
  );
}
