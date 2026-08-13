"use client";

import { MouseEvent, useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import Link from "next/link";
import { externalLinkProps, socialLinks } from "@/lib/social-links";

const CV_URL = "https://7b49630d-9430-45f4-9b53-012f49a3475c.usrfiles.com/ugd/7b4963_31089efd85ca486ab9b7737f052f0559.pdf";

function LinkedInIcon() {
  return <svg viewBox="0 0 24 24" aria-hidden><path d="M5.1 8.2H1.5V22h3.6V8.2ZM3.3 2A2.1 2.1 0 1 0 3.3 6.2 2.1 2.1 0 0 0 3.3 2ZM22.5 13.9c0-4.2-2.2-6.1-5.2-6.1-2.4 0-3.5 1.3-4.1 2.2V8.2H9.6V22h3.6v-6.8c0-1.8.3-3.5 2.6-3.5 2.2 0 2.2 2.1 2.2 3.6V22h3.6v-8.1Z" /></svg>;
}

function InstagramIcon() {
  return <svg viewBox="0 0 24 24" fill="none" aria-hidden><rect x="3" y="3" width="18" height="18" rx="5" /><circle cx="12" cy="12" r="4" /><circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" /></svg>;
}

function TelegramIcon() {
  return <svg viewBox="0 0 24 24" aria-hidden><path d="m21.4 3.6-3 16.1c-.2 1.1-.8 1.4-1.6.9l-5.2-3.8-2.5 2.4c-.3.3-.5.5-1 .5l.4-5.3 9.7-8.8c.4-.4-.1-.6-.7-.2l-12 7.5-5.1-1.6c-1.1-.3-1.1-1.1.2-1.6L20.3 2c.9-.3 1.7.2 1.1 1.6Z" /></svg>;
}

function BehanceIcon() {
  return <svg viewBox="0 0 24 24" aria-hidden><path d="M3 4.5h7.2c3.1 0 4.8 1.5 4.8 4 0 1.7-.8 2.9-2.3 3.5 2 .5 3 2 3 3.9 0 2.8-2.1 4.6-5.5 4.6H3V4.5Zm3.4 3v3h3.3c1.2 0 1.9-.5 1.9-1.5s-.7-1.5-1.9-1.5H6.4Zm0 5.9v3.8h3.8c1.4 0 2.1-.6 2.1-1.9 0-1.3-.8-1.9-2.1-1.9H6.4ZM17 7h5V5h-5v2Zm5 8.2h-6.2c.2 1.3 1 2 2.4 2 .9 0 1.6-.3 2-.9h2.9c-.6 2.7-2.6 4.4-5.1 4.4-3.3 0-5.6-2.4-5.6-5.8 0-3.4 2.3-5.9 5.6-5.9 3.6 0 5.7 2.8 5.7 6.2 0 .1 0 .3-.1.5Zm-6.2-2h3.6c-.2-1.1-.8-1.7-1.8-1.7-1 0-1.6.6-1.8 1.7Z" /></svg>;
}

export default function Footer() {
  const footerRef = useRef<HTMLElement>(null);

  const handleLogoClick = (event: MouseEvent<HTMLAnchorElement>) => {
    if (window.location.pathname !== "/") return;

    event.preventDefault();
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

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
        <Link href="/" className="footer-brand-logo" aria-label="Scroll to homepage hero" onClick={handleLogoClick}>
          <Image src="/hero/logo-light.svg" alt="Isograph" width={220} height={48} priority />
        </Link>
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
            <a href="mailto:isograph.me@gmail.com">
              <span>Email</span>
              isograph.me@gmail.com
            </a>
            <a href="https://t.me/whynotdesigner" target="_blank" rel="noopener noreferrer">
              <span>Telegram</span>
              @whynotdesigner
            </a>
          </div>

          <a className="footer-cv-link" href={CV_URL} target="_blank" rel="noopener noreferrer">
            <span>Download CV</span>
            <i aria-hidden>↗</i>
          </a>

          <nav className="footer-socials" aria-label="Social links">
            <a href={socialLinks.linkedin} aria-label="LinkedIn" {...externalLinkProps}><LinkedInIcon /></a>
            <a href={socialLinks.instagram} aria-label="Instagram" {...externalLinkProps}><InstagramIcon /></a>
            <a href={socialLinks.telegram} aria-label="Telegram" {...externalLinkProps}><TelegramIcon /></a>
            <a href={socialLinks.behance} aria-label="Behance" {...externalLinkProps}><BehanceIcon /></a>
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
