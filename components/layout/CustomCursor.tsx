"use client";

import { useEffect, useRef } from "react";

export default function CustomCursor() {
  const cursor = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const move = (event: PointerEvent) => {
      if (cursor.current) cursor.current.style.transform = `translate3d(${event.clientX}px,${event.clientY}px,0) rotate(-35deg)`;
    };
    window.addEventListener("pointermove", move);
    return () => window.removeEventListener("pointermove", move);
  }, []);
  return <div ref={cursor} aria-hidden className="pointer-events-none fixed left-[-3px] top-[-9px] z-[90] hidden h-5 w-1.5 rounded-sm bg-[var(--graphite)] shadow-[1px_1px_4px_#24242488] md:block" />;
}
