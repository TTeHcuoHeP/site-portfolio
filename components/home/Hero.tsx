"use client";

import { PointerEvent as ReactPointerEvent, useRef } from "react";
import { gsap } from "gsap";
import { externalLinkProps, socialLinks } from "@/lib/social-links";
import HeroCharacterAnimation from "@/components/home/HeroCharacterAnimation";

function SocialRail() {
  return (
    <aside className="social-rail" aria-hidden="true">
      <span className="portfolio-rule" aria-hidden />
      <span className="portfolio-label">Portfolio</span>
    </aside>
  );
}

function BadgeSocialLinks() {
  return (
    <div className="hero-badge-socials" aria-label="Social links" onPointerDown={(event) => event.stopPropagation()}>
      <a href={socialLinks.linkedin} aria-label="LinkedIn" className="hero-badge-social hero-badge-linkedin" {...externalLinkProps}>in</a>
      <a href={socialLinks.instagram} aria-label="Instagram" className="hero-badge-social hero-badge-instagram" {...externalLinkProps}>
        <svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3" y="3" width="18" height="18" rx="5" /><circle cx="12" cy="12" r="4" /><circle cx="17.5" cy="6.5" r="1" /></svg>
      </a>
      <a href={socialLinks.telegram} aria-label="Telegram" className="hero-badge-social hero-badge-telegram" {...externalLinkProps}>
        <svg viewBox="0 0 24 24" aria-hidden="true"><path d="m20.6 4.2-3.1 15.1c-.2 1.1-.8 1.4-1.6.9l-4.4-3.2-2.1 2c-.2.2-.4.4-.8.4l.3-4.5 8.2-7.4c.4-.3-.1-.5-.5-.2L6.5 13.7l-4.3-1.4c-.9-.3-1-1 .2-1.5L19.2 4c.8-.3 1.6.2 1.4.2Z" /></svg>
      </a>
      <a href={socialLinks.behance} aria-label="Behance" className="hero-badge-social hero-badge-behance" {...externalLinkProps}>Bē</a>
      <a href={socialLinks.youtube} aria-label="YouTube" className="hero-badge-social hero-badge-youtube" {...externalLinkProps}>
        <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M21.6 7.2a2.9 2.9 0 0 0-2-2C17.8 4.7 12 4.7 12 4.7s-5.8 0-7.6.5a2.9 2.9 0 0 0-2 2A30 30 0 0 0 2 12a30 30 0 0 0 .4 4.8 2.9 2.9 0 0 0 2 2c1.8.5 7.6.5 7.6.5s5.8 0 7.6-.5a2.9 2.9 0 0 0 2-2A30 30 0 0 0 22 12a30 30 0 0 0-.4-4.8ZM9.8 15.2V8.8l5.5 3.2-5.5 3.2Z" /></svg>
      </a>
    </div>
  );
}

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

  const handlePointerDown = (event: ReactPointerEvent<HTMLElement>) => {
    const card = cardRef.current;
    const hero = card?.closest<HTMLElement>(".hero");
    if (!card || !hero || !matchMedia("(min-width: 768px) and (pointer: fine)").matches) return;

    const cardBounds = card.getBoundingClientRect();
    const heroBounds = hero.getBoundingClientRect();
    const initialLeft = cardBounds.left - heroBounds.left;
    const initialTop = cardBounds.top - heroBounds.top;
    // The centered resting state uses translateY(-50%). Once dragging starts,
    // switch to absolute coordinates so that transform cannot shift it upward.
    gsap.set(card, { left: initialLeft, top: initialTop, right: "auto", transform: "none" });
    dragRef.current = {
      startPointerX: event.clientX,
      startPointerY: event.clientY,
      startLeft: initialLeft,
      startTop: initialTop,
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
    });
  };

  return (
    <aside
      ref={cardRef}
      className="hero-profile-card"
      aria-label="Alsim Mamedov profile summary"
      style={{ top: "50%", right: "2.8vw", transform: "translateY(-50%)" }}
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

      <BadgeSocialLinks />

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

      <div className="hero-video-layer" aria-hidden>
        <HeroCharacterAnimation />
      </div>

      <h1 className="reference-headline hero-board-headline">
        <span>Creative</span>
        <span>Direction</span>
        <span>For Brands</span>
      </h1>
      <p className="hero-board-caption">
        I believe good design should say something, not just look good.<br />
        It should have an idea, a purpose, and a reason to be remembered.
      </p>

      <HeroProfileCard />
    </section>
  );
}
