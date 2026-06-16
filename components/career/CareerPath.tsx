"use client";

import { useCallback, useLayoutEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { careerPath } from "@/data/career-path";
import CareerItem from "./CareerItem";

export default function CareerPath() {
  const wheelRef = useRef<HTMLDivElement>(null);
  const reducedMotionRef = useRef(false);
  const [activeIndex, setActiveIndex] = useState(1);

  const moveTo = useCallback((nextIndex: number) => {
    setActiveIndex(Math.max(0, Math.min(careerPath.length - 1, nextIndex)));
  }, []);
  const moveUp = useCallback(() => moveTo(activeIndex - 1), [activeIndex, moveTo]);
  const moveDown = useCallback(() => moveTo(activeIndex + 1), [activeIndex, moveTo]);

  useLayoutEffect(() => {
    const wheel = wheelRef.current;
    reducedMotionRef.current = matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!wheel || reducedMotionRef.current) return;
    const reveals = wheel.querySelectorAll<HTMLElement>(".career-wheel-item.is-active [data-career-reveal]");
    gsap.fromTo(
      reveals,
      { autoAlpha: 0, y: 24, filter: "blur(8px)" },
      { autoAlpha: 1, y: 0, filter: "blur(0px)", duration: 0.82, stagger: 0.09, ease: "power3.out" },
    );
  }, [activeIndex]);

  return (
    <section
      className="career-path"
      aria-label="Career path"
    >
      <h2 className="career-path-title">Career Path</h2>

      <nav className="career-path-controls" aria-label="Career path navigation">
        <button className="career-path-control" type="button" onClick={moveUp} disabled={activeIndex === 0} aria-label="Previous career step">
          <svg viewBox="0 0 16 16" aria-hidden><path d="m3 10 5-5 5 5" /></svg>
        </button>
        <span className="career-path-control-line" aria-hidden />
        <button className="career-path-control" type="button" onClick={moveDown} disabled={activeIndex === careerPath.length - 1} aria-label="Next career step">
          <svg viewBox="0 0 16 16" aria-hidden><path d="m3 6 5 5 5-5" /></svg>
        </button>
      </nav>

      <div ref={wheelRef} className="career-wheel" aria-live="polite">
        <svg className="career-wheel-arc" viewBox="0 0 1000 1000" preserveAspectRatio="none" aria-hidden>
          <circle cx="1050" cy="500" r="730" />
        </svg>
        {careerPath.map((item, index) => (
          <CareerItem key={item.id} item={item} offset={index - activeIndex} />
        ))}
      </div>
    </section>
  );
}
