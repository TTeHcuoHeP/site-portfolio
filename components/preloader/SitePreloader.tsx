"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { usePathname } from "next/navigation";

const PHRASES = [
  "one element",
  "multiple forms",
  "chaos becomes structure",
  "ideas take form",
];

function typePhrase(element: HTMLElement, phrase: string, duration = 0.58) {
  const cursor = element.querySelector<HTMLElement>(".isograph-cursor");
  const text = element.querySelector<HTMLElement>(".isograph-line-text");
  const progress = { value: 0 };

  if (!text) return gsap.to(progress, { value: 1, duration: 0.001 });

  return gsap.to(progress, {
    value: phrase.length,
    duration,
    ease: "none",
    onStart: () => {
      gsap.set(element, { autoAlpha: 1 });
      if (cursor) cursor.style.opacity = "1";
    },
    onUpdate: () => {
      text.textContent = phrase.slice(0, Math.round(progress.value));
    },
    onComplete: () => {
      text.textContent = phrase;
      if (cursor) cursor.style.opacity = "0";
    },
  });
}

export default function SitePreloader() {
  const rootRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();
  const [active, setActive] = useState(true);

  useEffect(() => {
    if (pathname !== "/") return;
    const root = rootRef.current;
    if (!root) return;

    const reducedMotion = matchMedia("(prefers-reduced-motion: reduce)").matches;
    document.body.classList.add("is-preloading");

    const complete = () => {
      document.body.classList.remove("is-preloading");
      setActive(false);
    };

    const context = gsap.context(() => {
      const sphere = root.querySelector<HTMLElement>(".isograph-sphere");
      const lines = gsap.utils.toArray<HTMLElement>(".isograph-terminal-line", root);
      const rotationTween = gsap.to(sphere, {
        rotation: 360,
        duration: 16,
        repeat: -1,
        ease: "none",
        paused: true,
      });

      gsap.set(root, { autoAlpha: 1 });
      gsap.set([".isograph-sphere", ".isograph-word", ".isograph-terminal-line", ".isograph-wave-line"], { autoAlpha: 0 });
      gsap.set(".isograph-symbol-shell", { scale: 1 });

      if (reducedMotion) {
        gsap.set([".isograph-sphere", ".isograph-word", ".isograph-terminal-line"], { autoAlpha: 1 });
        lines.forEach((line, index) => {
          const text = line.querySelector<HTMLElement>(".isograph-line-text");
          if (text) text.textContent = PHRASES[index];
        });
        gsap.timeline({ onComplete: complete })
          .to(root, { autoAlpha: 0, duration: 0.3, delay: 0.75, ease: "power2.out" });
        return;
      }

      const timeline = gsap.timeline({
        defaults: { ease: "power2.out" },
        onComplete: complete,
      });

      timeline
        .fromTo(".isograph-sphere", { autoAlpha: 0, scale: 0.92, filter: "blur(8px)" }, { autoAlpha: 1, scale: 1, filter: "blur(0px)", duration: 0.75 }, 0.3)
        .call(() => rotationTween.play(), [], 0.3)
        .fromTo(".isograph-word", { autoAlpha: 0, y: 10 }, { autoAlpha: 1, y: 0, duration: 0.5 }, 0.8)
        .add(typePhrase(lines[0], PHRASES[0], 0.42), 1.1)
        .add(typePhrase(lines[1], PHRASES[1], 0.5), 1.8)
        .add(typePhrase(lines[2], PHRASES[2], 0.62), 2.6)
        .add(typePhrase(lines[3], PHRASES[3], 0.56), 3.6)
        .to({}, { duration: 1.9 }, 4.2)
        .to(lines, { autoAlpha: 0, y: -8, stagger: 0.12, duration: 0.42, ease: "power2.out" }, 6.1)
        .to(".isograph-word", { autoAlpha: 0, y: -6, duration: 0.38, ease: "power2.out" }, 6.5)
        .to(".isograph-sphere", { autoAlpha: 0, scale: 0.96, duration: 0.42, ease: "power2.out" }, 6.58)
        .call(() => rotationTween.pause(), [], 6.72)
        .to(root, {
          xPercent: 100,
          duration: 0.82,
          ease: "power3.inOut",
        }, 6.95);
    }, root);

    return () => {
      context.revert();
      document.body.classList.remove("is-preloading");
    };
  }, [pathname]);

  if (!active || pathname !== "/") return null;

  return (
    <div ref={rootRef} className="site-preloader isograph-preloader" role="status" aria-live="polite" aria-label="Loading portfolio">
      <div className="isograph-lockup">
        <div className="isograph-symbol-shell" aria-hidden>
          <Image
            src="/hero/cilce.svg"
            alt=""
            width={180}
            height={180}
            priority
            className="isograph-sphere"
          />
          <div className="isograph-wave-lines">
            {Array.from({ length: 7 }, (_, index) => <span key={index} className="isograph-wave-line" />)}
          </div>
        </div>

        <div className="isograph-word">isograph</div>

        <div className="isograph-terminal">
          {PHRASES.map((phrase) => (
            <div className="isograph-terminal-line" key={phrase}>
              <span className="isograph-line-text" />
              <span className="isograph-cursor" aria-hidden />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
