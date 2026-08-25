"use client";

import Image from "next/image";
import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { careerTrack, type CareerTrackItem } from "@/data/career-track";

type DetailKind = "achievements" | "responsibilities";

function CareerArrow({ direction }: { direction: "left" | "right" }) {
  const path = direction === "left" ? "m10 3-5 5 5 5" : "m6 3 5 5-5 5";
  return <svg viewBox="0 0 16 16" aria-hidden><path d={path} /></svg>;
}

function LocationIcon() {
  return <svg viewBox="0 0 16 16" aria-hidden><path d="M8 14s4-3.7 4-7A4 4 0 1 0 4 7c0 3.3 4 7 4 7Z" /><circle cx="8" cy="7" r="1.35" /></svg>;
}

function CareerDetails({ item, kind, open, onToggle }: {
  item: CareerTrackItem;
  kind: DetailKind;
  open: boolean;
  onToggle: () => void;
}) {
  const title = kind === "achievements" ? "Key achievements" : "Key responsibilities";
  const entries = item[kind];
  const visibleEntries = open ? entries : entries.slice(0, 2);

  return (
    <section className="career-track-details">
      <h4>{title}</h4>
      <ul>{visibleEntries.map((entry) => <li key={entry}>{entry}</li>)}</ul>
      {entries.length > 2 && (
        <button className="career-track-expand" type="button" aria-expanded={open} onClick={onToggle}>
          {open ? "Show less" : `Show all ${title.toLowerCase()}`} <span aria-hidden>{open ? "−" : "+"}</span>
        </button>
      )}
    </section>
  );
}

export default function CareerTrack() {
  const viewportRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLDivElement>(null);
  const activeIndexRef = useRef(0);
  const pendingIndexRef = useRef<number | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [openDetail, setOpenDetail] = useState<string | null>(null);

  const goToIndex = useCallback((index: number) => {
    const nextIndex = Math.max(0, Math.min(index, careerTrack.length - 1));
    const viewport = viewportRef.current;
    const canvas = canvasRef.current;
    if (!viewport || !canvas) return;

    gsap.killTweensOf(canvas);
    activeIndexRef.current = nextIndex;
    pendingIndexRef.current = nextIndex;
    setActiveIndex(nextIndex);
  }, []);

  useLayoutEffect(() => {
    const nextIndex = pendingIndexRef.current;
    const viewport = viewportRef.current;
    const canvas = canvasRef.current;
    if (nextIndex === null || !viewport || !canvas) return;

    pendingIndexRef.current = null;
    const entry = canvas.children.item(nextIndex) as HTMLElement | null;
    if (!entry) return;
    const viewportStyles = window.getComputedStyle(viewport);
    const viewportLeft = viewport.getBoundingClientRect().left + Number.parseFloat(viewportStyles.paddingLeft);
    const currentOffset = Number(gsap.getProperty(canvas, "x")) || 0;
    const visibleOffset = entry.getBoundingClientRect().left - viewportLeft;
    const maxOffset = Math.max(0, canvas.scrollWidth - viewport.clientWidth);
    const targetOffset = Math.max(-maxOffset, Math.min(0, currentOffset - visibleOffset));

    gsap.to(canvas, {
      x: targetOffset,
      duration: 0.72,
      ease: "power3.inOut",
      overwrite: "auto",
    });
  }, [activeIndex]);

  useEffect(() => {
    const viewport = viewportRef.current;
    const canvas = canvasRef.current;
    if (!viewport || !canvas) return;

    const syncPosition = () => {
      const entry = canvas.children.item(activeIndexRef.current) as HTMLElement | null;
      const maxOffset = Math.max(0, canvas.scrollWidth - viewport.clientWidth);
      gsap.set(canvas, { x: -Math.min(entry?.offsetLeft ?? 0, maxOffset) });
    };
    const resizeObserver = new ResizeObserver(syncPosition);
    resizeObserver.observe(viewport);
    syncPosition();

    return () => {
      resizeObserver.disconnect();
    };
  }, []);

  const handleKeyDown = (event: React.KeyboardEvent<HTMLElement>) => {
    if (event.key === "ArrowRight") {
      event.preventDefault();
      goToIndex(activeIndexRef.current + 1);
    }
    if (event.key === "ArrowLeft") {
      event.preventDefault();
      goToIndex(activeIndexRef.current - 1);
    }
  };

  return (
    <section className="career-track" id="career-track" tabIndex={0} onKeyDown={handleKeyDown} aria-label="Career track">
      <div className="career-track-intro">
        <div>
          <p className="career-track-kicker">My career track</p>
          <h2>Experience. Projects. Impact.</h2>
          <p className="career-track-summary">Over 15 years of delivering creative solutions, building brands, launching projects and leading teams across international markets.</p>
        </div>
        <div className="career-track-controls" aria-label="Career navigation">
          <button className="career-track-control" type="button" aria-label="Previous career stage" onClick={() => goToIndex(activeIndexRef.current === 0 ? careerTrack.length - 1 : activeIndexRef.current - 1)}><CareerArrow direction="left" /></button>
          <span className="career-track-controls-line" aria-hidden />
          <button className="career-track-control" type="button" aria-label="Next career stage" onClick={() => goToIndex(activeIndexRef.current === careerTrack.length - 1 ? 0 : activeIndexRef.current + 1)}><CareerArrow direction="right" /></button>
        </div>
      </div>

      <div className="career-track-viewport" ref={viewportRef}>
        <div className="career-track-canvas" ref={canvasRef}>
          {careerTrack.map((item, index) => {
            const achievementKey = `${item.id}-achievements`;
            const responsibilityKey = `${item.id}-responsibilities`;
            const isActive = activeIndex === index;
            return (
              <article className={`career-track-entry ${isActive ? "is-active" : ""}`} key={item.id} aria-current={isActive ? "step" : undefined}>
                <div className="career-track-card">
                  <div className="career-track-card-meta"><time>{item.years}</time><span className="career-track-location"><LocationIcon />{item.location}</span></div>
                  <h3>{item.role}</h3>
                  <p className="career-track-company">{item.company}</p>
                  <div className="career-track-card-body">
                    <CareerDetails item={item} kind="achievements" open={openDetail === achievementKey} onToggle={() => setOpenDetail(openDetail === achievementKey ? null : achievementKey)} />
                    <CareerDetails item={item} kind="responsibilities" open={openDetail === responsibilityKey} onToggle={() => setOpenDetail(openDetail === responsibilityKey ? null : responsibilityKey)} />
                  </div>
                </div>
                <div className={`career-track-visual ${item.image ? "has-image" : "is-placeholder"}`}>
                  {item.image ? <Image src={item.image} alt={item.imageAlt ?? item.company} fill sizes="(max-width: 760px) 75vw, 32vw" /> : <span>{item.company.split(" ").map((word) => word[0]).join("")}</span>}
                </div>
              </article>
            );
          })}
        </div>
      </div>

      <nav className="career-track-timeline" aria-label="Career chronology">
        {careerTrack.map((item, index) => (
          <button key={item.id} className={activeIndex === index ? "is-active" : ""} type="button" onClick={() => goToIndex(index)} aria-label={`Go to ${item.company}, ${item.years}`}>
            <span className="career-track-point" />
            <strong>{item.startYear}</strong>
            <small>{index === 0 ? "Start" : item.company}</small>
          </button>
        ))}
      </nav>
    </section>
  );
}
