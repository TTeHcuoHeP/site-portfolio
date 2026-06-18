"use client";

import Image from "next/image";
import { PointerEvent as ReactPointerEvent, useEffect, useRef } from "react";
import { gsap } from "gsap";
import { externalLinkProps, socialLinks } from "@/lib/social-links";
import HeroSketchLayers from "./HeroSketchLayers";

function SocialRail() {
  return (
    <aside className="social-rail" aria-label="Social links">
      <a href={socialLinks.linkedin} aria-label="LinkedIn" className="social-link social-linkedin" {...externalLinkProps}>in</a>
      <a href={socialLinks.instagram} aria-label="Instagram" className="social-link social-instagram" {...externalLinkProps} />
      <a href={socialLinks.telegram} aria-label="Telegram" className="social-link social-telegram" {...externalLinkProps} />
      <span className="portfolio-rule" aria-hidden />
      <span className="portfolio-label">Portfolio</span>
    </aside>
  );
}

const PROFILE_POSITION_KEY = "hero-profile-card-position";

function HeroProfileCard() {
  const cardRef = useRef<HTMLElement>(null);
  const dragRef = useRef({
    startPointerX: 0,
    startPointerY: 0,
    startLeft: 0,
    startTop: 0,
    lastPointerX: 0,
    lastPointerY: 0,
    velocityX: 0,
    velocityY: 0,
  });

  useEffect(() => {
    const card = cardRef.current;
    const hero = card?.closest<HTMLElement>(".hero");
    if (!card || !hero) return;

    const desktop = matchMedia("(min-width: 768px) and (pointer: fine)");
    const clampPosition = (left: number, top: number) => ({
      left: gsap.utils.clamp(0, Math.max(0, hero.clientWidth - card.offsetWidth), left),
      top: gsap.utils.clamp(0, Math.max(0, hero.clientHeight - card.offsetHeight), top),
    });

    const restorePosition = () => {
      if (!desktop.matches) {
        gsap.set(card, { clearProps: "left,top,right" });
        return;
      }

      const current = card.getBoundingClientRect();
      const heroBounds = hero.getBoundingClientRect();
      const fallback = { left: current.left - heroBounds.left, top: current.top - heroBounds.top };
      let parsed = fallback;
      try {
        const savedPosition = localStorage.getItem(PROFILE_POSITION_KEY);
        if (savedPosition) parsed = JSON.parse(savedPosition) as { left: number; top: number };
      } catch {
        localStorage.removeItem(PROFILE_POSITION_KEY);
      }
      const position = clampPosition(parsed.left, parsed.top);
      gsap.set(card, { left: position.left, top: position.top, right: "auto" });
    };

    const handleResize = () => restorePosition();
    restorePosition();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handlePointerDown = (event: ReactPointerEvent<HTMLElement>) => {
    const card = cardRef.current;
    const hero = card?.closest<HTMLElement>(".hero");
    if (!card || !hero || !matchMedia("(min-width: 768px) and (pointer: fine)").matches) return;

    const cardBounds = card.getBoundingClientRect();
    const heroBounds = hero.getBoundingClientRect();
    dragRef.current = {
      startPointerX: event.clientX,
      startPointerY: event.clientY,
      startLeft: cardBounds.left - heroBounds.left,
      startTop: cardBounds.top - heroBounds.top,
      lastPointerX: event.clientX,
      lastPointerY: event.clientY,
      velocityX: 0,
      velocityY: 0,
    };
    gsap.killTweensOf(card);
    card.classList.add("is-dragging");
    event.currentTarget.setPointerCapture(event.pointerId);
  };

  const handlePointerMove = (event: ReactPointerEvent<HTMLElement>) => {
    const card = cardRef.current;
    const hero = card?.closest<HTMLElement>(".hero");
    if (!card || !hero || !card.hasPointerCapture(event.pointerId)) return;

    const drag = dragRef.current;
    drag.velocityX = event.clientX - drag.lastPointerX;
    drag.velocityY = event.clientY - drag.lastPointerY;
    drag.lastPointerX = event.clientX;
    drag.lastPointerY = event.clientY;
    const left = gsap.utils.clamp(0, Math.max(0, hero.clientWidth - card.offsetWidth), drag.startLeft + event.clientX - drag.startPointerX);
    const top = gsap.utils.clamp(0, Math.max(0, hero.clientHeight - card.offsetHeight), drag.startTop + event.clientY - drag.startPointerY);

    gsap.to(card, { left, top, right: "auto", duration: 0.16, ease: "power2.out", overwrite: true });
  };

  const handlePointerUp = (event: ReactPointerEvent<HTMLElement>) => {
    const card = cardRef.current;
    const hero = card?.closest<HTMLElement>(".hero");
    if (!card || !hero || !card.hasPointerCapture(event.pointerId)) return;

    card.releasePointerCapture(event.pointerId);
    card.classList.remove("is-dragging");
    const currentLeft = Number.parseFloat(card.style.left) || card.offsetLeft;
    const currentTop = Number.parseFloat(card.style.top) || card.offsetTop;
    const left = gsap.utils.clamp(0, Math.max(0, hero.clientWidth - card.offsetWidth), currentLeft + dragRef.current.velocityX * 5);
    const top = gsap.utils.clamp(0, Math.max(0, hero.clientHeight - card.offsetHeight), currentTop + dragRef.current.velocityY * 5);

    gsap.to(card, {
      left,
      top,
      duration: 0.72,
      ease: "elastic.out(1, 0.55)",
      overwrite: true,
      onComplete: () => localStorage.setItem(PROFILE_POSITION_KEY, JSON.stringify({ left, top })),
    });
  };

  return (
    <aside
      ref={cardRef}
      className="hero-profile-card"
      aria-label="Alsim Mamedov profile summary"
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerCancel={handlePointerUp}
    >
      <span className="hero-badge-drag-surface" aria-hidden />

      <div className="hero-badge-top">
        <span className="hero-badge-hole" aria-hidden />
        <span className="hero-badge-code">Exhibitor<br />A-01</span>
        <span className="hero-badge-grip" aria-hidden>Drag me ···</span>
      </div>

      <div className="hero-badge-identity">
        <h2>Alsim<br />Mamedov</h2>
        <p>Creative & Advertising Director,<br />Brand Strategy &<br />Design Leadership</p>
      </div>

      <div className="hero-badge-stats">
        <div><strong>15+</strong><span>Years</span></div>
        <div><strong>100+</strong><span>Projects</span></div>
        <div><strong>7</strong><span>Countries</span></div>
      </div>

      <div className="hero-badge-footer">
        <p>Available for freelance<br />and full-time opportunities</p>
        <span className="hero-badge-barcode" aria-hidden />
      </div>
    </aside>
  );
}

export default function Hero() {
  return (
    <section className="hero reference-hero">
      <SocialRail />

      <HeroSketchLayers />

      <h1 className="reference-headline hero-board-headline">
        <span>I turn business</span>
        <span>problems into</span>
        <span className="creative-systems-wrap" tabIndex={0}>
          <strong>creative systems</strong>
          <Image
            src="/hero/notes/creative-circle.svg"
            alt=""
            fill
            sizes="48vw"
            className="creative-systems-circle"
            draggable={false}
            unoptimized
          />
        </span>
      </h1>

      <HeroProfileCard />
    </section>
  );
}
