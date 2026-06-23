"use client";

import Image from "next/image";
import { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function AboutHero() {
  const rootRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    gsap.registerPlugin(ScrollTrigger);
    const scope = gsap.context(() => {
      const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
      const items = gsap.utils.toArray<HTMLElement>("[data-about-hero-reveal]");

      if (reduced) {
        gsap.set(items, { autoAlpha: 1, y: 0, filter: "blur(0px)" });
        return;
      }

      gsap.fromTo(items, { autoAlpha: 0, y: 42, filter: "blur(8px)" }, {
        autoAlpha: 1, y: 0, filter: "blur(0px)", duration: 0.9, stagger: 0.1, ease: "power3.out",
      });

      gsap.fromTo(".about-page-portrait", { autoAlpha: 0, y: 55, scale: 0.97 }, {
        autoAlpha: 1, y: 0, scale: 1, duration: 1, ease: "power3.out",
        scrollTrigger: { trigger: ".about-page-story", start: "top 72%", once: true },
      });
    }, root);

    return () => scope.revert();
  }, []);

  return (
    <div ref={rootRef}>
      <section className="about-page-hero" aria-labelledby="about-page-title">
        <div className="about-page-index" data-about-hero-reveal><span>About</span><span>01 / 06</span></div>
        <h1 id="about-page-title" data-about-hero-reveal>Turning ideas into systems,<span>and systems into results.</span></h1>
        <p className="about-page-intro" data-about-hero-reveal>
          For more than 18 years, I have worked across branding, advertising, marketing, digital products, and business development - helping companies transform complex challenges into clear creative solutions.
        </p>
        <span className="about-page-scroll" aria-hidden data-about-hero-reveal>Scroll to discover</span>
      </section>

      <section className="about-page-story" aria-labelledby="who-i-am-title">
        <div className="about-page-portrait">
          <Image src="/images/about/me-about.png" alt="Portrait of Alsim Mamedov" fill sizes="(max-width: 900px) 100vw, 50vw" className="about-page-portrait-image" priority />
          <span aria-hidden></span>
        </div>
        <div className="about-page-story-copy">
          <p className="about-page-kicker">01 / Who I Am</p>
          <h2 id="who-i-am-title">Creative thinking.<br /><strong>Business clarity.</strong></h2>
          <div className="about-page-story-lead">I&apos;m Alsim Mamedov - Creative Director, Brand Strategist, and Design Leader.</div>
          <div className="about-page-story-columns">
            <p>Over the last 18+ years I have worked with agencies, international companies, startups, financial institutions, retail networks, industrial brands, and technology businesses.</p>
            <p>My career began in creative agencies and evolved through leadership positions in branding, advertising, digital communication, and business management.</p>
            <p>Today I combine creativity, strategy, and business thinking to help organizations build stronger brands, better products, and more effective communication systems.</p>
          </div>
        </div>
      </section>
    </div>
  );
}
