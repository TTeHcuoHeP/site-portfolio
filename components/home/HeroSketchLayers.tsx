"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

const NOTE_GROUPS = {
  back: ["quote", "trust", "strategy"],
  middle: ["ideas", "campaigns", "branding"],
  front: ["design", "ai"],
} as const;

type NoteName = (typeof NOTE_GROUPS)[keyof typeof NOTE_GROUPS][number];

function Note({ name }: { name: NoteName }) {
  return (
    <span className={`hero-note hero-note-${name}`} aria-hidden>
      <Image
        src={`/hero/notes/${name}.svg`}
        alt=""
        fill
        sizes="(max-width: 767px) 35vw, 18vw"
        className="hero-note-image"
        draggable={false}
        unoptimized
      />
    </span>
  );
}

export default function HeroSketchLayers() {
  const sceneRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const backRef = useRef<HTMLDivElement>(null);
  const middleRef = useRef<HTMLDivElement>(null);
  const frontRef = useRef<HTMLDivElement>(null);
  const [portraitMissing, setPortraitMissing] = useState(false);

  useEffect(() => {
    const scene = sceneRef.current;
    const hero = scene?.closest<HTMLElement>(".reference-hero");
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

    if (!scene || !hero || reducedMotion.matches) return;

    const layers = [
      { element: gridRef.current, max: 3 },
      { element: backRef.current, max: 8 },
      { element: middleRef.current, max: 18 },
      { element: frontRef.current, max: 30 },
    ];
    const noteLayers = [backRef.current, middleRef.current, frontRef.current].filter(
      (layer): layer is HTMLDivElement => Boolean(layer),
    );
    const notes = Array.from(scene.querySelectorAll<HTMLElement>(".hero-note"));
    const target = { x: 0, y: 0 };
    const current = { x: 0, y: 0 };
    let frameId = 0;
    let focusedLayer: HTMLDivElement | null = null;

    const setFocusedLayer = (nextLayer: HTMLDivElement | null) => {
      if (focusedLayer === nextLayer) return;
      focusedLayer = nextLayer;

      noteLayers.forEach((layer) => {
        layer.classList.toggle("is-focused", layer === nextLayer);
        layer.classList.toggle("is-unfocused", Boolean(nextLayer) && layer !== nextLayer);
      });
    };

    const render = () => {
      current.x += (target.x - current.x) * 0.075;
      current.y += (target.y - current.y) * 0.075;

      layers.forEach(({ element, max }) => {
        if (!element) return;
        element.style.transform = `translate3d(${current.x * max}px, ${current.y * max}px, 0)`;
      });

      frameId = window.requestAnimationFrame(render);
    };

    const handlePointerMove = (event: PointerEvent) => {
      const bounds = hero.getBoundingClientRect();
      target.x = ((event.clientX - bounds.left) / bounds.width - 0.5) * 2;
      target.y = ((event.clientY - bounds.top) / bounds.height - 0.5) * 2;

      const hoveredNote = notes.find((note) => {
        const noteBounds = note.getBoundingClientRect();
        return (
          event.clientX >= noteBounds.left
          && event.clientX <= noteBounds.right
          && event.clientY >= noteBounds.top
          && event.clientY <= noteBounds.bottom
        );
      });
      setFocusedLayer(hoveredNote?.closest<HTMLDivElement>(".hero-notes-layer") ?? null);
    };

    const resetPosition = () => {
      target.x = 0;
      target.y = 0;
      setFocusedLayer(null);
    };

    hero.addEventListener("pointermove", handlePointerMove, { passive: true });
    hero.addEventListener("pointerleave", resetPosition);
    frameId = window.requestAnimationFrame(render);

    return () => {
      hero.removeEventListener("pointermove", handlePointerMove);
      hero.removeEventListener("pointerleave", resetPosition);
      window.cancelAnimationFrame(frameId);
      setFocusedLayer(null);
      layers.forEach(({ element }) => element?.style.removeProperty("transform"));
    };
  }, []);

  return (
    <div ref={sceneRef} className="hero-sketch-scene" aria-hidden>
      <div ref={gridRef} className="hero-grid-layer hero-parallax-layer" />

      <div className="reference-portrait">
        {!portraitMissing && (
          <Image
            src="/hero/hero-person.png"
            alt=""
            fill
            priority
            sizes="(max-width: 767px) 112vw, 68vw"
            className="hero-portrait-image object-contain object-bottom"
            draggable={false}
            onError={() => setPortraitMissing(true)}
          />
        )}
      </div>

      <div ref={backRef} className="hero-notes-layer notes-back hero-notes-back hero-parallax-layer" data-depth="0.25">
        {NOTE_GROUPS.back.map((name) => <Note key={name} name={name} />)}
      </div>

      <div ref={middleRef} className="hero-notes-layer notes-middle hero-notes-middle hero-parallax-layer" data-depth="0.55">
        {NOTE_GROUPS.middle.map((name) => <Note key={name} name={name} />)}
      </div>

      <div ref={frontRef} className="hero-notes-layer notes-front hero-notes-front hero-parallax-layer" data-depth="0.9">
        {NOTE_GROUPS.front.map((name) => <Note key={name} name={name} />)}
      </div>
    </div>
  );
}
