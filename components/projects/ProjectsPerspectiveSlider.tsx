"use client";

import Image from "next/image";
import Link from "next/link";
import type { CSSProperties } from "react";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { projects } from "@/data/projects";
import { cleanupScrollTriggers } from "@/lib/cleanup-scroll-triggers";

const AUTO_ADVANCE_MS = 5100;
const VISIBLE_CARDS = 4;
const CARD_TRANSITION_MS = 1200;
const CARD_HANDOFF_MS = 160;

const formatCounter = (value: number) => String(value).padStart(2, "0");

function getRelativeIndex(index: number, activeIndex: number, total: number) {
  return (index - activeIndex + total) % total;
}

export default function ProjectsPerspectiveSlider() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [leavingIndex, setLeavingIndex] = useState<number | null>(null);
  const [isLeavingActive, setIsLeavingActive] = useState(false);
  const [enteringIndex, setEnteringIndex] = useState<number | null>(null);
  const transitionTimeoutsRef = useRef<number[]>([]);
  const enteringFrameRef = useRef<number | null>(null);
  const isTransitioningRef = useRef(false);
  const activeProject = projects[activeIndex];
  const total = projects.length;

  const visibleProjects = useMemo(() => {
    const stack = projects
      .map((project, index) => ({
        project,
        index,
        depth: getRelativeIndex(index, activeIndex, total),
        isLeaving: index === leavingIndex,
        isLeavingActive: index === leavingIndex && isLeavingActive,
        isEntering: index === enteringIndex,
      }))
      .filter(({ depth, index }) => depth < VISIBLE_CARDS && index !== leavingIndex);

    if (leavingIndex !== null) {
      stack.push({
        project: projects[leavingIndex],
        index: leavingIndex,
        depth: VISIBLE_CARDS,
        isLeaving: true,
        isLeavingActive,
        isEntering: false,
      });
    }

    return stack;
  }, [activeIndex, enteringIndex, isLeavingActive, leavingIndex, total]);

  const moveTo = useCallback((nextIndex: number) => {
    if (isTransitioningRef.current || nextIndex === activeIndex) return;

    isTransitioningRef.current = true;
    setLeavingIndex(activeIndex);

    const handoffTimeout = window.setTimeout(() => {
      setActiveIndex(nextIndex);
      enteringFrameRef.current = window.requestAnimationFrame(() => {
        enteringFrameRef.current = window.requestAnimationFrame(() => {
          setIsLeavingActive(true);
          setEnteringIndex((nextIndex + VISIBLE_CARDS - 1) % total);
          enteringFrameRef.current = window.requestAnimationFrame(() => {
            enteringFrameRef.current = window.requestAnimationFrame(() => {
              setEnteringIndex(null);
              enteringFrameRef.current = null;
            });
          });
        });
      });
    }, CARD_HANDOFF_MS);

    const finishTimeout = window.setTimeout(() => {
      setLeavingIndex(null);
      setIsLeavingActive(false);
      isTransitioningRef.current = false;
    }, CARD_TRANSITION_MS);

    transitionTimeoutsRef.current = [handoffTimeout, finishTimeout];
  }, [activeIndex, total]);

  const goToNext = useCallback(() => moveTo((activeIndex + 1) % total), [activeIndex, moveTo, total]);
  const goToPrev = useCallback(() => moveTo((activeIndex - 1 + total) % total), [activeIndex, moveTo, total]);

  useEffect(() => {
    const reducedMotion = matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reducedMotion) return;

    const timer = window.setInterval(goToNext, AUTO_ADVANCE_MS);
    return () => window.clearInterval(timer);
  }, [goToNext]);

  useEffect(() => () => {
    transitionTimeoutsRef.current.forEach((timeout) => window.clearTimeout(timeout));
    if (enteringFrameRef.current !== null) window.cancelAnimationFrame(enteringFrameRef.current);
  }, []);

  return (
    <section className="projects-perspective-section" aria-label="Selected projects perspective slider">
      <div className="projects-perspective-shell">
        <div className="projects-perspective-copy">
          <div className="projects-perspective-counter" aria-label={`Project ${activeIndex + 1} of ${total}`}>
            <span>{formatCounter(activeIndex + 1)}</span>
            <i>/</i>
            <small>{formatCounter(total)}</small>

            <div className="projects-perspective-controls" aria-label="Project slider controls">
              <button type="button" onClick={goToPrev} aria-label="Previous project">
                <svg viewBox="0 0 16 16" aria-hidden><path d="m10 3-5 5 5 5" /></svg>
              </button>
              <span className="projects-perspective-controls-line" aria-hidden />
              <button type="button" onClick={goToNext} aria-label="Next project">
                <svg viewBox="0 0 16 16" aria-hidden><path d="m6 3 5 5-5 5" /></svg>
              </button>
            </div>
          </div>

          <div className="projects-perspective-copy-content" key={activeProject.slug}>
            <h2>{activeProject.title}</h2>

            <div className="projects-perspective-challenge">
              <h3>Challenge:</h3>
              <p>{activeProject.challenge}</p>
            </div>

            <div className="projects-perspective-role">
              <h3>Role:</h3>
              <p>{activeProject.role}</p>
            </div>

            <Link
              href={`/projects/${activeProject.slug}`}
              className="projects-perspective-button"
              onClick={cleanupScrollTriggers}
            >
              <span>View<br />Projects</span>
              <i aria-hidden />
            </Link>
          </div>

        </div>

        <ul className="projects-perspective-tags" aria-label="Project skills">
          {activeProject.tags.slice(0, 3).map((tag) => <li key={tag}>{tag}</li>)}
        </ul>

        <div className="projects-perspective-cards" aria-live="polite">
          {visibleProjects.map(({ project, index, depth, isLeaving, isLeavingActive, isEntering }) => (
            <article
              key={project.slug}
              className={`projects-perspective-card${isLeavingActive ? " is-leaving" : ""}${isEntering ? " is-entering" : ""}`}
              data-depth={isLeaving ? undefined : depth}
              style={{
                zIndex: isLeaving ? VISIBLE_CARDS + 1 : VISIBLE_CARDS - depth,
                "--card-depth": depth,
              } as CSSProperties}
              aria-hidden={depth !== 0 || isLeaving}
            >
              <Image
                src={project.cover}
                alt={`${project.title} project cover`}
                fill
                sizes="(max-width: 900px) 86vw, 56vw"
                className="projects-perspective-card-image"
                priority={index === 0}
              />
              <span className="projects-perspective-card-line" aria-hidden />
              <span className="projects-perspective-card-line" aria-hidden />
              <span className="projects-perspective-card-line" aria-hidden />
            </article>
          ))}
        </div>

      </div>
    </section>
  );
}
