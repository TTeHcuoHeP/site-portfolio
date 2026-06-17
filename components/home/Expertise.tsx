"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";

const services = [
  {
    id: "creative",
    title: "Creative Direction",
    copy: "Turning ideas into clear concepts, systems, and experiences that people remember.",
    icon: "/images/icons/Creative Direction.png",
  },
  {
    id: "digital",
    title: "Digital Campaigns",
    copy: "Building campaigns that connect strategy, creativity, and measurable results.",
    icon: "/images/icons/Digital Campaigns.png",
  },
  {
    id: "visual",
    title: "Visual Systems",
    copy: "Creating scalable visual languages that keep brands consistent across every touchpoint.",
    icon: "/images/icons/Visual Systems.png",
  },
  {
    id: "speaking",
    title: "Public Speaking",
    copy: "Sharing ideas, insights, and experience through presentations, workshops, and industry events.",
    icon: "/images/icons/Public Speaking.png",
  },
];

export default function Expertise() {
  const sectionRef = useRef<HTMLElement>(null);
  const arrowRef = useRef<HTMLImageElement>(null);
  const [activeService, setActiveService] = useState<string | null>(null);
  const [missingIcons, setMissingIcons] = useState<string[]>([]);

  useEffect(() => {
    const section = sectionRef.current;
    const arrow = arrowRef.current;
    if (!section || !arrow) return;

    const precisePointer = matchMedia("(hover: hover) and (pointer: fine)").matches;
    const reducedMotion = matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!precisePointer || reducedMotion) return;

    const rotateTo = gsap.quickTo(arrow, "rotation", {
      duration: 0.45,
      ease: "power3.out",
    });

    const handlePointerMove = (event: PointerEvent) => {
      const bounds = arrow.getBoundingClientRect();
      const centerX = bounds.left + bounds.width / 2;
      const centerY = bounds.top + bounds.height / 2;
      const angle = Math.atan2(event.clientY - centerY, event.clientX - centerX) * (180 / Math.PI);
      rotateTo(angle - 150);
    };

    const resetArrow = () => rotateTo(0);

    section.addEventListener("pointermove", handlePointerMove, { passive: true });
    section.addEventListener("pointerleave", resetArrow);

    return () => {
      section.removeEventListener("pointermove", handlePointerMove);
      section.removeEventListener("pointerleave", resetArrow);
      gsap.killTweensOf(arrow);
    };
  }, []);

  return (
    <section ref={sectionRef} className="expertise-section" aria-labelledby="expertise-heading">
      <h2 id="expertise-heading" className="expertise-headline">
        <span><strong>Creative</strong> Expertise</span>
        <span>Across <strong>Strategy,</strong></span>
        <span>Advertising <strong>And Design.</strong></span>
      </h2>

      <Image
        ref={arrowRef}
        src="/images/icons/orange-arrow.svg"
        alt=""
        width={246}
        height={248}
        className="expertise-arrow"
        aria-hidden
      />

      <div className="expertise-timeline" aria-hidden />

      {services.map((service) => {
        const active = activeService === service.id;
        const missing = missingIcons.includes(service.id);

        return (
          <article
            key={service.id}
            className={`expertise-service expertise-service-${service.id}${active ? " is-active" : ""}`}
            onMouseEnter={() => setActiveService(service.id)}
            onMouseLeave={() => setActiveService(null)}
            onFocus={() => setActiveService(service.id)}
            onBlur={() => setActiveService(null)}
            tabIndex={0}
          >
            <span className="expertise-corner" aria-hidden />
            <div className="expertise-service-copy">
              <h3>{service.title}</h3>
              <p>{service.copy}</p>
            </div>
            <span className="expertise-node" aria-hidden>
              {!missing && (
                <Image
                  src={service.icon}
                  alt=""
                  width={52}
                  height={52}
                  className="expertise-node-icon"
                  onError={() => setMissingIcons((current) => [...current, service.id])}
                />
              )}
            </span>
          </article>
        );
      })}
    </section>
  );
}
