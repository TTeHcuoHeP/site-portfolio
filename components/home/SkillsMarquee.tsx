"use client";

import { useState } from "react";
import styles from "./SkillsMarquee.module.css";

type SkillIconName = "web" | "advertising" | "brand" | "direction" | "motion" | "ai" | "presentation";

type Skill = {
  title: string;
  description: string;
  icon: SkillIconName;
};

const skills: Record<SkillIconName, Skill> = {
  web: {
    title: "Web Design",
    description: "Simple, intuitive digital experiences built around real users.",
    icon: "web",
  },
  advertising: {
    title: "Advertising Design",
    description: "Campaign visuals designed to earn attention and inspire action.",
    icon: "advertising",
  },
  brand: {
    title: "Brand Identity",
    description: "Distinctive visual systems that stay consistent across every touchpoint.",
    icon: "brand",
  },
  direction: {
    title: "Art Direction",
    description: "One clear creative vision carried through every detail.",
    icon: "direction",
  },
  motion: {
    title: "Motion & Video",
    description: "Stories shaped through editing, rhythm and expressive movement.",
    icon: "motion",
  },
  ai: {
    title: "AI Creative Tools",
    description: "Smarter workflows for faster ideation, exploration and production.",
    icon: "ai",
  },
  presentation: {
    title: "Presentation Design",
    description: "Clear and persuasive presentations that simplify complex ideas.",
    icon: "presentation",
  },
};

const rows: Skill[][] = [
  [skills.web, skills.advertising, skills.brand, skills.direction],
  [skills.presentation, skills.ai, skills.motion, skills.web],
  [skills.brand, skills.direction, skills.motion, skills.ai],
];

function SkillIcon({ name }: { name: SkillIconName }) {
  const common = {
    fill: "none",
    stroke: "currentColor",
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    strokeWidth: 1.7,
  };

  return (
    <svg viewBox="0 0 32 32" aria-hidden="true">
      {name === "web" && <><rect {...common} x="5.5" y="6.5" width="21" height="19" rx="1.5" /><path {...common} d="M5.5 11.5h21M10 9h.01M13 9h.01M16 16h6M10 20h8" /></>}
      {name === "advertising" && <><path {...common} d="M6 17h5l10 5V10L11 15H6zM21 13.5c2 1 2 4 0 5M10 22l1.5 3" /><path {...common} d="M24.5 11.5c2.8 2.7 2.8 6.3 0 9" /></>}
      {name === "brand" && <><circle {...common} cx="16" cy="11.5" r="5.5" /><circle {...common} cx="11" cy="19" r="5.5" /><circle {...common} cx="21" cy="19" r="5.5" /></>}
      {name === "direction" && <><circle {...common} cx="16" cy="16" r="10" /><path {...common} d="m12 20 8-8M14 11h6v6" /></>}
      {name === "motion" && <><path {...common} d="m12 8 11 8-11 8z" /><path {...common} d="M7 11v10" /></>}
      {name === "ai" && <><path {...common} d="m16 5 2.1 6.9L25 14l-6.9 2.1L16 23l-2.1-6.9L7 14l6.9-2.1zM24 21l.9 3 .1.1L28 25l-3 .9-.1.1L24 29l-.9-3-.1-.1L20 25l3-.9z" /></>}
      {name === "presentation" && <><rect {...common} x="6" y="6.5" width="20" height="14" rx="1.5" /><path {...common} d="M16 20.5v5M11 26h10M10 11h12M12 14h8" /></>}
    </svg>
  );
}

function SkillCard({ skill, duplicate, onActiveChange }: { skill: Skill; duplicate?: boolean; onActiveChange: (active: boolean) => void }) {
  return (
    <article
      className={styles.card}
      tabIndex={duplicate ? -1 : 0}
      aria-hidden={duplicate || undefined}
      onMouseEnter={() => onActiveChange(true)}
      onMouseLeave={() => onActiveChange(false)}
      onFocus={() => onActiveChange(true)}
      onBlur={() => onActiveChange(false)}
    >
      <span className={styles.icon}><SkillIcon name={skill.icon} /></span>
      <span className={styles.cardCopy}>
        <strong>{skill.title}</strong>
        <small>{skill.description}</small>
      </span>
    </article>
  );
}

export default function SkillsMarquee() {
  const [isPaused, setIsPaused] = useState(false);

  return (
    <section className={`${styles.section}${isPaused ? ` ${styles.paused}` : ""}`} aria-label="Skills">
      <div className={styles.rows}>
        {rows.map((row, rowIndex) => (
          <div className={`${styles.row} ${styles[`row${rowIndex + 1}`]}`} key={rowIndex}>
            <div className={styles.track}>
              {row.map((skill) => <SkillCard key={`${rowIndex}-${skill.title}`} skill={skill} onActiveChange={setIsPaused} />)}
              <div className={styles.duplicate} aria-hidden="true">
                {row.map((skill) => <SkillCard key={`${rowIndex}-duplicate-${skill.title}`} skill={skill} duplicate onActiveChange={setIsPaused} />)}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
