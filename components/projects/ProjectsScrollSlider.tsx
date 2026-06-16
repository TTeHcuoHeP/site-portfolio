"use client";

import { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { projects } from "@/data/projects";
import ProjectSlide from "./ProjectSlide";

const TRANSITION_DURATION = 0.6;
const HOLD_DURATION = 0.8;
const TEXT_REVEAL_DURATION = 0.35;

export default function ProjectsScrollSlider() {
  const sectionRef = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    gsap.registerPlugin(ScrollTrigger);
    const slides = gsap.utils.toArray<HTMLElement>("[data-project-slide]", section);
    const reducedMotion = matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (reducedMotion) {
      gsap.set(slides, { clearProps: "all" });
      gsap.set("[data-project-reveal]", { autoAlpha: 1, y: 0, filter: "blur(0px)" });
      return;
    }

    const scope = gsap.context(() => {
      slides.forEach((slide, index) => {
        const reveals = gsap.utils
          .toArray<HTMLElement>("[data-project-reveal]", slide)
          .sort((a, b) => Number(a.dataset.revealOrder) - Number(b.dataset.revealOrder));

        gsap.set(slide, {
          position: "absolute",
          inset: 0,
          width: "100vw",
          height: "100vh",
          yPercent: index === 0 ? 0 : 100,
        });
        gsap.set(reveals, index === 0
          ? { autoAlpha: 1, y: 0, filter: "blur(0px)" }
          : { autoAlpha: 0, y: 30, filter: "blur(8px)" });
      });

      const timeline = gsap.timeline({
        scrollTrigger: {
          id: "projects-scroll-stack",
          trigger: section,
          start: "top top",
          end: () => `+=${window.innerHeight * slides.length * 1.6}`,
          pin: true,
          pinSpacing: true,
          scrub: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          refreshPriority: -10,
        },
      });

      // Let the first project settle and remain readable before slide 2 enters.
      timeline.to({}, { duration: HOLD_DURATION });
      let position = HOLD_DURATION;

      slides.slice(1).forEach((slide) => {
        const reveals = gsap.utils
          .toArray<HTMLElement>("[data-project-reveal]", slide)
          .sort((a, b) => Number(a.dataset.revealOrder) - Number(b.dataset.revealOrder));

        timeline.to(slide, {
          yPercent: 0,
          duration: TRANSITION_DURATION,
          ease: "none",
        }, position);

        timeline.to(reveals, {
          autoAlpha: 1,
          y: 0,
          filter: "blur(0px)",
          duration: TEXT_REVEAL_DURATION,
          stagger: 0.08,
          ease: "power2.out",
        }, position + TRANSITION_DURATION * 0.55);

        position += TRANSITION_DURATION + HOLD_DURATION;
        timeline.to({}, { duration: HOLD_DURATION }, position - HOLD_DURATION);
      });

      requestAnimationFrame(() => ScrollTrigger.refresh());
    }, section);

    return () => scope.revert();
  }, []);

  return (
    <section ref={sectionRef} className="projects-scroll-section projects-scroll-slider" aria-label="Selected projects">
      <div className="projects-sticky projects-scroll-stack">
        {projects.map((project, index) => (
          <ProjectSlide key={project.slug} project={project} index={index} total={projects.length} />
        ))}
      </div>
    </section>
  );
}
