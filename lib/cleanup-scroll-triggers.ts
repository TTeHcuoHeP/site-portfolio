"use client";

import { ScrollTrigger } from "gsap/ScrollTrigger";

export function cleanupScrollTriggers() {
  ScrollTrigger.getAll().forEach((trigger) => trigger.kill(true));
}
