"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";

const CV_URL = "https://7b49630d-9430-45f4-9b53-012f49a3475c.usrfiles.com/ugd/7b4963_31089efd85ca486ab9b7737f052f0559.pdf";

export default function Footer() {
  const footerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const footer = footerRef.current;
    if (!footer) return;

    gsap.registerPlugin(ScrollTrigger);
    const scope = gsap.context(() => {
      const reducedMotion = matchMedia("(prefers-reduced-motion: reduce)").matches;
      const revealItems = gsap.utils.toArray<HTMLElement>("[data-footer-reveal]");

      if (reducedMotion) {
        gsap.set(revealItems, { autoAlpha: 1, y: 0, filter: "blur(0px)" });
        return;
      }

      gsap.fromTo(
        revealItems,
        { autoAlpha: 0, y: 40, filter: "blur(8px)" },
        {
          autoAlpha: 1,
          y: 0,
          filter: "blur(0px)",
          duration: 0.85,
          stagger: 0.12,
          ease: "power3.out",
          scrollTrigger: {
            trigger: footer,
            start: "top 72%",
            once: true,
          },
        },
      );
    }, footer);

    return () => scope.revert();
  }, []);

  return (
    <footer ref={footerRef} id="contact" className="portfolio-footer">
      <span className="footer-outline" aria-hidden />

      <div className="footer-topline">
        <span>Creative Direction / Art Direction</span>
        <span>Available For Selected Collaborations</span>
      </div>

      <div className="footer-main">
        <div className="footer-statement">
          <p data-footer-reveal>Start A Conversation</p>
          <h2 data-footer-reveal>
            Let&apos;s create something
            <span>meaningful together</span>
          </h2>
          <div className="footer-support" data-footer-reveal>
            <p>Whether you need creative direction, branding, digital design, or support for an existing project - feel free to reach out.</p>
            <p>I&apos;m always open to new collaborations, ideas, and conversations.</p>
          </div>
        </div>

        <aside className="footer-contact" data-footer-reveal>
          <h3>Contact information:</h3>

          <div className="footer-contact-links">
            <a href="mailto:alsim-m@mail.ru">
              <span>Email</span>
              alsim-m@mail.ru
            </a>
            <a href="tel:085210033982">
              <span>Phone</span>
              085210033982
            </a>
          </div>

          <a className="footer-cv-link" href={CV_URL} target="_blank" rel="noopener noreferrer">
            <span>Download CV</span>
            <i aria-hidden>↗</i>
          </a>

          <nav className="footer-socials" aria-label="Social links">
            <a href="#" aria-label="Instagram">Instagram</a>
            <a href="#" aria-label="LinkedIn">LinkedIn</a>
            <a href="#" aria-label="Telegram">Telegram</a>
          </nav>
        </aside>
      </div>

      <div className="footer-bottom">
        <span>© 2015 - 2026 Mamedov Alsim</span>
        <Link href="/">Back To Top ↑</Link>
      </div>
    </footer>
  );
}
