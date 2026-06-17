"use client";

import { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { projects } from "@/data/projects";
import ProjectSlide from "./ProjectSlide";

const TRANSITION_DURATION = 0.6;
const HOLD_DURATION = 0.8;
const TEXT_REVEAL_DURATION = 0.35;
const PARALLAX_MEDIA = "(hover: hover) and (pointer: fine) and (min-width: 761px)";

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

    let timeline: gsap.core.Timeline | null = null;
    let cleanupParallax = () => {};

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

      const projectTimeline = gsap.timeline({
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
      timeline = projectTimeline;

      // Let the first project settle and remain readable before slide 2 enters.
      projectTimeline.to({}, { duration: HOLD_DURATION });
      let position = HOLD_DURATION;

      slides.slice(1).forEach((slide) => {
        const reveals = gsap.utils
          .toArray<HTMLElement>("[data-project-reveal]", slide)
          .sort((a, b) => Number(a.dataset.revealOrder) - Number(b.dataset.revealOrder));

        projectTimeline.to(slide, {
          yPercent: 0,
          duration: TRANSITION_DURATION,
          ease: "none",
        }, position);

        projectTimeline.to(reveals, {
          autoAlpha: 1,
          y: 0,
          filter: "blur(0px)",
          duration: TEXT_REVEAL_DURATION,
          stagger: 0.08,
          ease: "power2.out",
        }, position + TRANSITION_DURATION * 0.55);

        position += TRANSITION_DURATION + HOLD_DURATION;
        projectTimeline.to({}, { duration: HOLD_DURATION }, position - HOLD_DURATION);
      });

      const parallaxMedia = matchMedia(PARALLAX_MEDIA);
      const moveElement = (element: HTMLElement | null, x: number, y: number) => {
        if (!element) return;
        gsap.to(element, {
          x,
          y,
          duration: 0.58,
          ease: "power3.out",
          overwrite: "auto",
        });
      };

      const resetParallax = () => {
        slides.forEach((slide) => {
          moveElement(slide.querySelector<HTMLElement>(".projects-scroll-copy"), 0, 0);
          moveElement(slide.querySelector<HTMLElement>(".projects-scroll-image"), 0, 0);
        });
      };

      const handlePointerMove = (event: PointerEvent) => {
        if (!parallaxMedia.matches) return;
        const target = event.target as Element | null;
        const slide = target?.closest<HTMLElement>("[data-project-slide]");
        if (!slide || !section.contains(slide)) return;

        const bounds = slide.getBoundingClientRect();
        const x = ((event.clientX - bounds.left) / bounds.width - 0.5) * 2;
        const y = ((event.clientY - bounds.top) / bounds.height - 0.5) * 2;

        moveElement(slide.querySelector<HTMLElement>(".projects-scroll-copy"), x * 8, y * 6);
        moveElement(slide.querySelector<HTMLElement>(".projects-scroll-image"), x * 18, y * 14);
      };

      section.addEventListener("pointermove", handlePointerMove, { passive: true });
      section.addEventListener("pointerleave", resetParallax);
      requestAnimationFrame(() => ScrollTrigger.refresh());

      cleanupParallax = () => {
        section.removeEventListener("pointermove", handlePointerMove);
        section.removeEventListener("pointerleave", resetParallax);
        resetParallax();
      };
    }, section);

    return () => {
      cleanupParallax();
      timeline?.scrollTrigger?.kill(true);
      timeline?.kill();
      ScrollTrigger.getById("projects-scroll-stack")?.kill(true);
      scope.revert();
    };
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
