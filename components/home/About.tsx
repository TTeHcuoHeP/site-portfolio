"use client";

import Image from "next/image";
import AboutSkillsGrid from "./AboutSkillsGrid";
import { externalLinkProps, socialLinks } from "@/lib/social-links";

const skillLabels = [
  "Strategy",
  "Brand",
  "Design",
  "AI",
  "Brand Identity",
  "Web",
  "Motion & Video",
  "Art Direction",
];

const marqueeSkills = [...skillLabels, ...skillLabels];

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

export default function About() {
  return (
    <section id="about" className="about-section">
      <div className="about-surface about-intro">
        <div className="about-intro-copy">
          <p className="about-intro-kicker">About Me</p>
          <span className="about-intro-rule" aria-hidden />

          <p className="about-intro-greeting">Hello, I&apos;m</p>
          <h2 className="about-intro-name">Alsim<br />Mamedov</h2>
          <span className="about-intro-rule" aria-hidden />

          <p className="about-intro-summary">
            I turn complex business challenges into clear strategies, distinctive brands and creative systems built to perform.
          </p>

          <a className="about-contact-cta" href="#contact">
            <span>Let&apos;s work together</span>
            <span aria-hidden>↗</span>
          </a>
        </div>

        <div className="about-portrait-panel">
          <Image
            src="/images/about/me_gray.jpg"
            alt="Portrait of Alsim Mamedov"
            fill
            priority={false}
            sizes="(max-width: 1000px) 100vw, 38vw"
            className="about-portrait-image"
          />

          <nav className="about-socials" aria-label="Social links">
            <a href={socialLinks.linkedin} aria-label="LinkedIn" {...externalLinkProps}><LinkedInIcon /></a>
            <a href={socialLinks.instagram} aria-label="Instagram" {...externalLinkProps}><InstagramIcon /></a>
            <a href={socialLinks.telegram} aria-label="Telegram" {...externalLinkProps}><TelegramIcon /></a>
            <a href={socialLinks.behance} aria-label="Behance" {...externalLinkProps}><BehanceIcon /></a>
          </nav>

          <p className="about-availability"><span aria-hidden />Available for selected projects</p>
        </div>

        <div className="about-role-copy">
          <p className="about-intro-kicker">Creative Leadership</p>
          <span className="about-intro-rule" aria-hidden />
          <h3>Creative &amp;<br />Advertising<br />Director</h3>

          <dl className="about-experience-list">
            <div><dt>15+</dt><dd>Years of experience</dd></div>
            <div><dt>100+</dt><dd>Projects delivered</dd></div>
            <div><dt>7</dt><dd>Countries</dd></div>
          </dl>

          <div className="about-skills-ticker" aria-label="Areas of expertise">
            <div className="about-skills-ticker-track">
              {marqueeSkills.map((skill, index) => (
                <span key={`${skill}-${index}`}>{skill}<b aria-hidden>•</b></span>
              ))}
            </div>
          </div>
        </div>
      </div>

      <AboutSkillsGrid />
    </section>
  );
}
