"use client";

import Image from "next/image";
import { useState } from "react";

type Service = {
  id: string;
  number: string;
  title: string;
  titleLines?: string[];
  description: string;
  image: string;
  tone: "dark" | "beige" | "lavender";
  metric?: string;
  metricLabel?: string;
  highlight?: string[];
  tags: string[];
};

const services: Service[] = [
  {
    id: "web-design",
    number: "01",
    title: "Web Design",
    description: "Interactive websites and digital experiences of any complexity.",
    image: "/services/web-design.webp",
    tone: "beige",
    metric: "35+",
    metricLabel: "completed projects",
    tags: ["UX/UI", "Landing Pages", "Corporate", "Interactive", "E-commerce"],
  },
  {
    id: "communication-design",
    number: "02",
    title: "Communication Design",
    titleLines: ["Communication", "Design"],
    description: "Visual communication for brands and products across all platforms.",
    image: "/services/communication-design.webp",
    tone: "beige",
    metric: "300+",
    metricLabel: "completed projects",
    tags: ["Campaigns", "Key Visuals", "Digital", "Print", "Social", "OOH"],
  },
  {
    id: "motion-video",
    number: "03",
    title: "Motion & Video",
    description: "Video and motion design that tell stories, engage and inspire.",
    image: "/services/motion-video.webp",
    tone: "beige",
    highlight: ["From concept", "to final cut"],
    tags: ["Editing", "Motion Design", "AI Video", "Reels", "Commercial", "Brand Films"],
  },
  {
    id: "art-direction",
    number: "04",
    title: "Art Direction",
    description: "Visual direction from concept and style to execution across all touchpoints.",
    image: "/services/art-direction.webp",
    tone: "dark",
    highlight: ["Concept -> Direction", "-> Execution"],
    tags: ["Creative Direction", "Visual Systems", "Campaigns", "Team Leadership"],
  },
  {
    id: "presentation-design",
    number: "05",
    title: "Presentation Design",
    titleLines: ["Presentation", "Design"],
    description: "Presentations that explain, persuade and sell ideas clearly and effectively.",
    image: "/services/presentation-design.webp",
    tone: "beige",
    metric: "140+",
    metricLabel: "completed projects",
    tags: ["Pitch Decks", "Corporate", "Sales", "Investor Decks", "Keynotes"],
  },
  {
    id: "packaging-design",
    number: "06",
    title: "Packaging Design",
    titleLines: ["Packaging", "Design"],
    description: "Packaging that protects, communicates and elevates the product.",
    image: "/services/packaging-design.webp",
    tone: "dark",
    metric: "230+",
    metricLabel: "completed projects",
    tags: ["Product Packaging", "Label Design", "Branding", "Print Production", "Mockups"],
  },
];

export default function ServicesSection() {
  const [activeId, setActiveId] = useState(services[0].id);

  return (
    <section className="services-section" aria-labelledby="services-heading">
      <header className="services-heading">
        <h2 id="services-heading">
          <span>Design that</span>
          <span>communicates</span>
          <span>and inspires</span>
        </h2>
        <p>
          <span className="services-heading-copy">Explore my key areas of expertise.</span>
          <span className="services-heading-arrow" aria-hidden="true">-&gt;</span>
          <small>Hover or click to learn more.</small>
        </p>
      </header>

      <div className="services-accordion" aria-label="Services">
        {services.map((service) => {
          const isActive = service.id === activeId;

          return (
            <button
              key={service.id}
              type="button"
              className={`services-card services-card--${service.tone} services-card--${service.id}${isActive ? " is-active" : ""}`}
              aria-pressed={isActive}
              onClick={() => setActiveId(service.id)}
              onMouseEnter={() => setActiveId(service.id)}
              onFocus={() => setActiveId(service.id)}
            >
              <span className="services-collapsed" aria-hidden={isActive}>
                <span className="services-collapsed-title">{service.title}</span>
                <span className="services-collapsed-number">{service.number}</span>
              </span>

              <span className="services-expanded">
                <Image
                  src={service.image}
                  alt=""
                  fill
                  sizes="(max-width: 767px) 100vw, 48vw"
                  className="services-image"
                />
                <span className="services-image-overlay" aria-hidden="true" />
                <span className="services-content">
                  <span className="services-number">{service.number}</span>
                  <span className="services-title">
                    {(service.titleLines ?? [service.title]).map((line) => <span key={line}>{line}</span>)}
                  </span>
                  <span className="services-description">{service.description}</span>
                  {service.metric ? (
                    <span className="services-metric">
                      <strong>{service.metric}</strong>
                      <small>{service.metricLabel}</small>
                    </span>
                  ) : (
                    <span className="services-highlight">
                      {service.highlight?.map((line) => <strong key={line}>{line}</strong>)}
                    </span>
                  )}
                  <span className="services-tags">
                    <span className="services-tags-row">
                      {service.tags.slice(0, 3).map((tag) => <span key={tag}>{tag}</span>)}
                    </span>
                    {service.tags.length > 3 && (
                      <span className="services-tags-row">
                        {service.tags.slice(3).map((tag) => <span key={tag}>{tag}</span>)}
                      </span>
                    )}
                  </span>
                  <span className="services-view">View projects -&gt;</span>
                </span>
              </span>
            </button>
          );
        })}
      </div>
    </section>
  );
}
