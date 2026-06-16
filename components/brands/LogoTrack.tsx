"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef } from "react";
import type { BrandLogo } from "@/data/logos";

const AUTO_LOOP_DURATION = 150000;
const RESUME_DELAY = 3000;

export default function LogoTrack({ logos }: { logos: BrandLogo[] }) {
  const viewportRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const offsetRef = useRef(0);
  const lastFrameRef = useRef(0);
  const resumeAtRef = useRef(0);
  const draggingRef = useRef(false);
  const pointerXRef = useRef(0);

  const pauseAuto = useCallback(() => {
    resumeAtRef.current = performance.now() + RESUME_DELAY;
  }, []);

  const moveTrack = useCallback((distance: number) => {
    const track = trackRef.current;
    if (!track) return;
    const loopWidth = track.scrollWidth / 2;
    if (!loopWidth) return;

    offsetRef.current = ((offsetRef.current + distance) % loopWidth + loopWidth) % loopWidth;
    track.style.transform = `translate3d(${-offsetRef.current}px, 0, 0)`;
  }, []);

  const moveByColumn = useCallback((direction: number) => {
    const firstColumn = trackRef.current?.querySelector<HTMLElement>(".brand-logo-column");
    moveTrack(direction * (firstColumn?.offsetWidth ?? 260));
    pauseAuto();
  }, [moveTrack, pauseAuto]);

  useEffect(() => {
    let animationFrame = 0;
    const reducedMotion = matchMedia("(prefers-reduced-motion: reduce)").matches;

    const animate = (time: number) => {
      const delta = Math.min(time - (lastFrameRef.current || time), 40);
      lastFrameRef.current = time;

      if (!reducedMotion && !draggingRef.current && time >= resumeAtRef.current) {
        const loopWidth = (trackRef.current?.scrollWidth ?? 0) / 2;
        moveTrack((loopWidth / AUTO_LOOP_DURATION) * delta);
      }

      animationFrame = requestAnimationFrame(animate);
    };

    animationFrame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrame);
  }, [moveTrack]);

  if (!logos.length) return null;
  const repeatedLogos = [...logos, ...logos];

  return (
    <div className="brands-track-shell">
      <div className="brands-track-controls" aria-label="Logo carousel navigation">
        <button type="button" onClick={() => moveByColumn(-1)} aria-label="Previous logos">
          <svg viewBox="0 0 16 16" aria-hidden><path d="m10 3-5 5 5 5" /></svg>
        </button>
        <span aria-hidden />
        <button type="button" onClick={() => moveByColumn(1)} aria-label="Next logos">
          <svg viewBox="0 0 16 16" aria-hidden><path d="m6 3 5 5-5 5" /></svg>
        </button>
      </div>

      <div
        ref={viewportRef}
        className="brands-track-viewport"
        onWheel={(event) => {
          const horizontalDistance = event.deltaX || (event.shiftKey ? event.deltaY : 0);
          if (Math.abs(horizontalDistance) < 1) return;
          event.preventDefault();
          moveTrack(horizontalDistance);
          pauseAuto();
        }}
        onPointerDown={(event) => {
          draggingRef.current = true;
          pointerXRef.current = event.clientX;
          event.currentTarget.setPointerCapture(event.pointerId);
          pauseAuto();
        }}
        onPointerMove={(event) => {
          if (!draggingRef.current) return;
          const distance = pointerXRef.current - event.clientX;
          pointerXRef.current = event.clientX;
          moveTrack(distance);
        }}
        onPointerUp={(event) => {
          draggingRef.current = false;
          event.currentTarget.releasePointerCapture(event.pointerId);
          pauseAuto();
        }}
        onPointerCancel={() => {
          draggingRef.current = false;
          pauseAuto();
        }}
      >
        <div ref={trackRef} className="brands-logo-track">
          {repeatedLogos.map((logo, index) => (
            <article className="brand-logo-column" key={`${logo.src}-${index}`} aria-hidden={index >= logos.length}>
              <span>{String((index % logos.length) + 1).padStart(2, "0")}</span>
              <div className="brand-logo-image">
                <Image src={logo.src} alt={index < logos.length ? logo.name : ""} fill sizes="220px" />
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}
