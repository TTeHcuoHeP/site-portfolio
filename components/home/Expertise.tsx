"use client";

import Image from "next/image";
import { useState } from "react";

const services = [
  {
    id: "creative",
    title: "Creative Direction",
    copy: "You can get a workspace of the highest quality at an affordable price and still enjoy the facilities that are only here.",
    icon: "/images/icons/Creative Direction.png",
  },
  {
    id: "digital",
    title: "Digital Campaigns",
    copy: "We provide many unique work space choices so that you can choose the workspace to your liking.",
    icon: "/images/icons/Digital Campaigns.png",
  },
  {
    id: "visual",
    title: "Visual Systems",
    copy: "You can get a workspace of the highest quality at an affordable price and still enjoy the facilities that are only here.",
    icon: "/images/icons/Visual Systems.png",
  },
  {
    id: "speaking",
    title: "Public Speaking",
    copy: "We provide many unique work space choices so that you can choose the workspace to your liking.",
    icon: "/images/icons/Public Speaking.png",
  },
];

export default function Expertise() {
  const [activeService, setActiveService] = useState<string | null>(null);
  const [missingIcons, setMissingIcons] = useState<string[]>([]);

  return (
    <section className="expertise-section" aria-labelledby="expertise-heading">
      <h2 id="expertise-heading" className="expertise-headline">
        <span><strong>Creative</strong> Expertise</span>
        <span>Across <strong>Strategy,</strong></span>
        <span>Advertising <strong>And Design.</strong></span>
      </h2>

      <Image
        src="/images/icons/orange-arrow.svg"
        alt=""
        width={246}
        height={248}
        className="expertise-arrow"
        aria-hidden
      />

      <div className="expertise-timeline" aria-hidden />

      {services.map((service) => {
        const active = activeService === service.id;
        const missing = missingIcons.includes(service.id);

        return (
          <article
            key={service.id}
            className={`expertise-service expertise-service-${service.id}${active ? " is-active" : ""}`}
            onMouseEnter={() => setActiveService(service.id)}
            onMouseLeave={() => setActiveService(null)}
            onFocus={() => setActiveService(service.id)}
            onBlur={() => setActiveService(null)}
            tabIndex={0}
          >
            <span className="expertise-corner" aria-hidden />
            <div className="expertise-service-copy">
              <h3>{service.title}</h3>
              <p>{service.copy}</p>
            </div>
            <span className="expertise-node" aria-hidden>
              {!missing && (
                <Image
                  src={service.icon}
                  alt=""
                  width={52}
                  height={52}
                  className="expertise-node-icon"
                  onError={() => setMissingIcons((current) => [...current, service.id])}
                />
              )}
            </span>
          </article>
        );
      })}
    </section>
  );
}
