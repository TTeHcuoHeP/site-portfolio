"use client";

import { useEffect, useRef } from "react";

const BUTTON_SELECTOR = "a, button, [role='button'], .nav-item, .cv-link, .social-link";
const TEXT_SELECTOR = "h1, h2, h3, p, span, .hero-title, .hero-profile-card";
const DRAG_SELECTOR = ".hero-profile-card";
const CURSOR_FOLLOW_SPEED = 0.1;

export default function HeroCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const cursor = cursorRef.current;
    const precisePointer = matchMedia("(hover: hover) and (pointer: fine)").matches;

    if (!cursor || !precisePointer) return;

    const reducedMotion = matchMedia("(prefers-reduced-motion: reduce)").matches;
    const notes = Array.from(document.querySelectorAll<HTMLElement>(".hero-note"));
    let frameId = 0;
    let currentX = -80;
    let currentY = -80;
    let targetX = -80;
    let targetY = -80;

    const render = () => {
      currentX = reducedMotion ? targetX : currentX + (targetX - currentX) * CURSOR_FOLLOW_SPEED;
      currentY = reducedMotion ? targetY : currentY + (targetY - currentY) * CURSOR_FOLLOW_SPEED;
      cursor.style.transform = `translate3d(${currentX}px, ${currentY}px, 0)`;
      frameId = requestAnimationFrame(render);
    };

    const updateState = (event: PointerEvent) => {
      targetX = event.clientX;
      targetY = event.clientY;
      if (!cursor.classList.contains("is-visible")) {
        currentX = event.clientX;
        currentY = event.clientY;
        cursor.classList.add("is-visible");
      }

      const target = document.elementFromPoint(event.clientX, event.clientY);
      const overDragTarget = Array.from(document.querySelectorAll<HTMLElement>(DRAG_SELECTOR)).some((dragTarget) => {
        const bounds = dragTarget.getBoundingClientRect();
        return (
          event.clientX >= bounds.left
          && event.clientX <= bounds.right
          && event.clientY >= bounds.top
          && event.clientY <= bounds.bottom
        );
      });
      const overButton = Boolean(target?.closest(BUTTON_SELECTOR));
      const overNote = notes.some((note) => {
        const bounds = note.getBoundingClientRect();
        return (
          event.clientX >= bounds.left
          && event.clientX <= bounds.right
          && event.clientY >= bounds.top
          && event.clientY <= bounds.bottom
        );
      });
      const overText = !overDragTarget && (overNote || Boolean(target?.closest(TEXT_SELECTOR)));

      cursor.classList.toggle("cursor--drag", overDragTarget);
      cursor.classList.toggle("cursor--button", !overDragTarget && overButton);
      cursor.classList.toggle("cursor--text", !overDragTarget && !overButton && overText);
    };

    const hide = () => cursor.classList.remove("is-visible", "cursor--text", "cursor--button", "cursor--drag");

    document.addEventListener("pointermove", updateState, { passive: true });
    document.documentElement.addEventListener("mouseleave", hide);
    window.addEventListener("blur", hide);
    frameId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(frameId);
      document.removeEventListener("pointermove", updateState);
      document.documentElement.removeEventListener("mouseleave", hide);
      window.removeEventListener("blur", hide);
    };
  }, []);

  return (
    <div ref={cursorRef} className="hero-custom-cursor" aria-hidden>
      <span className="hero-custom-cursor-shape hero-custom-cursor-lens" />
    </div>
  );
}
