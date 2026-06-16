"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const FRAME_COUNT = 227;
const FRAME_DIRECTORY = "/frames/hero-sequence";
const SCROLL_DISTANCE = 550;
const FRAME_EASING = 0.12;
const SCRUB_SMOOTHING = 0.9;

const getFrameSource = (frame: number) =>
  `${FRAME_DIRECTORY}/frame (${frame}).webp`;

export default function ScrollSequence() {
  const sectionRef = useRef<HTMLElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const canvas = canvasRef.current;
    if (!section || !canvas) return;

    const context = canvas.getContext("2d");
    if (!context) return;

    gsap.registerPlugin(ScrollTrigger);

    let disposed = false;
    let animationFrameRequest = 0;
    let currentFrame = 0;
    let targetFrame = 0;
    let lastRenderedFrame = -1;
    const frames: Array<HTMLImageElement | null> = Array(FRAME_COUNT).fill(null);
    const playhead = { frame: 0 };

    const resizeCanvas = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const width = canvas.clientWidth;
      const height = canvas.clientHeight;

      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      context.setTransform(dpr, 0, 0, dpr, 0, 0);
      lastRenderedFrame = -1;
      renderFrame(Math.round(currentFrame));
    };

    const findAvailableFrame = (frameIndex: number) => {
      if (frames[frameIndex]) return frames[frameIndex];

      for (let offset = 1; offset < FRAME_COUNT; offset += 1) {
        const before = frames[frameIndex - offset];
        const after = frames[frameIndex + offset];
        if (before) return before;
        if (after) return after;
      }

      return null;
    };

    const renderFrame = (frameIndex: number) => {
      const image = findAvailableFrame(frameIndex);
      if (!image) return;

      const canvasWidth = canvas.clientWidth;
      const canvasHeight = canvas.clientHeight;
      const scale = Math.max(canvasWidth / image.naturalWidth, canvasHeight / image.naturalHeight);
      const width = image.naturalWidth * scale;
      const height = image.naturalHeight * scale;
      const x = (canvasWidth - width) / 2;
      const y = (canvasHeight - height) / 2;

      context.clearRect(0, 0, canvasWidth, canvasHeight);
      context.drawImage(image, x, y, width, height);
      lastRenderedFrame = frameIndex;
    };

    const renderLoop = () => {
      currentFrame += (targetFrame - currentFrame) * FRAME_EASING;

      if (Math.abs(targetFrame - currentFrame) < 0.001) {
        currentFrame = targetFrame;
      }

      const frameIndex = Math.max(0, Math.min(FRAME_COUNT - 1, Math.round(currentFrame)));
      if (frameIndex !== lastRenderedFrame) {
        renderFrame(frameIndex);
      }

      animationFrameRequest = requestAnimationFrame(renderLoop);
    };

    const preloadFrames = () =>
      Promise.all(
        Array.from({ length: FRAME_COUNT }, (_, index) => {
          return new Promise<void>((resolve) => {
            const image = new Image();
            image.decoding = "async";
            image.onload = () => {
              frames[index] = image;
              resolve();
            };
            image.onerror = () => resolve();
            image.src = getFrameSource(index + 1);
          });
        }),
      );

    const setupSequence = async () => {
      await preloadFrames();
      if (disposed) return;

      resizeCanvas();
      renderFrame(0);
      animationFrameRequest = requestAnimationFrame(renderLoop);

      gsap.to(playhead, {
        frame: FRAME_COUNT - 1,
        ease: "none",
        onUpdate: () => {
          targetFrame = playhead.frame;
        },
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: `+=${SCROLL_DISTANCE}%`,
          pin: true,
          scrub: SCRUB_SMOOTHING,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      ScrollTrigger.refresh();
    };

    setupSequence();
    window.addEventListener("resize", resizeCanvas);

    return () => {
      disposed = true;
      cancelAnimationFrame(animationFrameRequest);
      window.removeEventListener("resize", resizeCanvas);
      gsap.killTweensOf(playhead);
      ScrollTrigger.getAll()
        .filter((trigger) => trigger.trigger === section)
        .forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <section ref={sectionRef} className="relative h-screen overflow-hidden bg-[#EDEDED]" aria-label="Scroll-controlled visual sequence">
      <canvas ref={canvasRef} className="block h-full w-full" />
    </section>
  );
}
