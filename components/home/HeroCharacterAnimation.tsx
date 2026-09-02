"use client";

import { useEffect, useRef } from "react";

type Direction = "left" | "upper-left" | "up" | "upper-right" | "right" | "lower-right" | "down" | "lower-left";

const BASE_PATH = "/character-head";
const CENTER_FRAME = `${BASE_PATH}/center.webp`;
const AROUND_FRAME_COUNT = 96;
const FRAME_COUNTS: Record<Direction, number> = {
  left: 15,
  "upper-left": 16,
  up: 12,
  "upper-right": 16,
  right: 15,
  "lower-right": 20,
  down: 17,
  "lower-left": 13,
};

const DIRECTION_ORDER: Direction[] = ["right", "lower-right", "down", "lower-left", "left", "upper-left", "up", "upper-right"];

function getFrameSource(direction: Direction | null, frame: number) {
  if (!direction || frame === 0) return CENTER_FRAME;
  return `${BASE_PATH}/${direction}/${String(frame).padStart(2, "0")}.webp`;
}

function getAroundFrameSource(position: number) {
  const frame = ((Math.round(position) % AROUND_FRAME_COUNT) + AROUND_FRAME_COUNT) % AROUND_FRAME_COUNT;
  return `${BASE_PATH}/around-smooth/${String(frame + 1).padStart(3, "0")}.webp`;
}

function getClosestLoopPosition(position: number, reference: number) {
  return position + (Math.round((reference - position) / AROUND_FRAME_COUNT) * AROUND_FRAME_COUNT);
}

function getDirection(x: number, y: number): Direction {
  const angle = Math.atan2(y, x);
  const sector = Math.round(angle / (Math.PI / 4));
  return DIRECTION_ORDER[(sector + DIRECTION_ORDER.length) % DIRECTION_ORDER.length];
}

export default function HeroCharacterAnimation() {
  const layerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const layer = layerRef.current;
    const image = imageRef.current;
    const hero = layer?.closest<HTMLElement>(".hero");
    if (!layer || !image || !hero) return;

    const supportsPointer = window.matchMedia("(pointer: fine)").matches;
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!supportsPointer || reduceMotion) return;

    const sources = [
      CENTER_FRAME,
      ...DIRECTION_ORDER.flatMap((direction) => (
        Array.from({ length: FRAME_COUNTS[direction] }, (_, index) => getFrameSource(direction, index + 1))
      )),
      ...Array.from({ length: AROUND_FRAME_COUNT }, (_, index) => getAroundFrameSource(index)),
    ];
    const preloaded = sources.map((source) => {
      const frame = new Image();
      frame.src = source;
      return frame;
    });

    const target = { x: 0, y: 0 };
    const current = { x: 0, y: 0 };
    let displayedDirection: Direction | null = null;
    let displayedProgress = 0;
    let previousPointerAngle: number | null = null;
    let circularTravel = 0;
    let isCircularGesture = false;
    let targetAroundPosition = 0;
    let displayedAroundPosition = 0;
    let lastSource = CENTER_FRAME;
    let frameId = 0;

    const setFrameSource = (source: string) => {
      if (source === lastSource) return;
      image.src = source;
      lastSource = source;
    };

    const updateTarget = (event: PointerEvent) => {
      const bounds = hero.getBoundingClientRect();
      const isInsideHero = event.clientX >= bounds.left
        && event.clientX <= bounds.right
        && event.clientY >= bounds.top
        && event.clientY <= bounds.bottom;

      if (!isInsideHero) {
        target.x = 0;
        target.y = 0;
        previousPointerAngle = null;
        circularTravel = 0;
        isCircularGesture = false;
        return;
      }

      target.x = Math.max(-1, Math.min(1, ((event.clientX - bounds.left) / bounds.width) * 2 - 1));
      target.y = Math.max(-1, Math.min(1, ((event.clientY - bounds.top) / bounds.height) * 2 - 1));

      const radius = Math.hypot(target.x, target.y);
      if (radius < 0.2) {
        previousPointerAngle = null;
        circularTravel = 0;
        isCircularGesture = false;
        return;
      }

      const pointerAngle = Math.atan2(target.y, target.x);
      // around.mp4 starts with the head looking right and then turns upward,
      // which is counter-clockwise in the browser coordinate system.
      const targetPosition = (-pointerAngle / (Math.PI * 2)) * AROUND_FRAME_COUNT;
      targetAroundPosition = getClosestLoopPosition(targetPosition, targetAroundPosition);

      if (previousPointerAngle !== null) {
        const angleDelta = Math.atan2(
          Math.sin(pointerAngle - previousPointerAngle),
          Math.cos(pointerAngle - previousPointerAngle),
        );

        circularTravel = Math.min(Math.PI, circularTravel + Math.abs(angleDelta));
        if (circularTravel > 0.12) isCircularGesture = true;
      }
      previousPointerAngle = pointerAngle;
    };

    const renderFrame = () => {
      current.x += (target.x - current.x) * 0.11;
      current.y += (target.y - current.y) * 0.11;

      if (isCircularGesture) {
        displayedAroundPosition += (targetAroundPosition - displayedAroundPosition) * 0.075;
        const source = getAroundFrameSource(displayedAroundPosition);
        setFrameSource(source);

        frameId = requestAnimationFrame(renderFrame);
        return;
      }

      const desiredProgress = Math.min(1, Math.hypot(current.x, current.y));
      const desiredDirection = desiredProgress > 0.045 ? getDirection(current.x, current.y) : null;

      if (!desiredDirection) {
        displayedProgress += (0 - displayedProgress) * 0.18;
      } else if (!displayedDirection || displayedDirection === desiredDirection) {
        displayedDirection = desiredDirection;
        displayedProgress += (desiredProgress - displayedProgress) * 0.18;
      } else {
        displayedProgress += (0 - displayedProgress) * 0.2;
        if (displayedProgress < 0.025) {
          displayedProgress = 0;
          displayedDirection = desiredDirection;
        }
      }

      if (displayedProgress < 0.012) {
        displayedProgress = 0;
        if (!desiredDirection) displayedDirection = null;
      }

      const count = displayedDirection ? FRAME_COUNTS[displayedDirection] : 0;
      const frame = Math.min(count, Math.max(0, Math.round(displayedProgress * count)));
      const source = getFrameSource(displayedDirection, frame);
      setFrameSource(source);

      frameId = requestAnimationFrame(renderFrame);
    };

    // The header overlaps Hero but is outside its DOM subtree, so listen at the
    // window level to keep the animation responsive beneath the navigation.
    window.addEventListener("pointermove", updateTarget, { passive: true });
    frameId = requestAnimationFrame(renderFrame);

    return () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener("pointermove", updateTarget);
      preloaded.length = 0;
    };
  }, []);

  return (
    <div
      ref={layerRef}
      className="hero-character-animation"
      aria-hidden
      style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        ref={imageRef}
        src={CENTER_FRAME}
        alt=""
        style={{ position: "absolute", inset: 0, display: "block", width: "100%", height: "100%", objectFit: "cover", objectPosition: "center" }}
      />
    </div>
  );
}
