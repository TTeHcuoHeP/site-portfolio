import type { CSSProperties } from "react";
import type { CareerPathItem } from "@/data/career-path";

export default function CareerItem({
  item,
  offset,
}: {
  item: CareerPathItem;
  offset: number;
}) {
  const active = offset === 0;
  const angle = offset * 25;
  const radians = angle * (Math.PI / 180);
  const x = 82.8 + (1 - Math.cos(radians)) * 17;
  const y = 50 + Math.sin(radians) * 80;
  const visible = Math.abs(offset) <= 3;
  const style = {
    "--career-x": `${x}%`,
    "--career-y": `${y}%`,
    "--career-opacity": visible ? (active ? 1 : Math.max(0.22, 0.72 - Math.abs(offset) * 0.14)) : 0,
    "--career-scale": active ? 1 : Math.max(0.58, 0.82 - Math.abs(offset) * 0.07),
  } as CSSProperties;

  return (
    <article
      className={`career-wheel-item${active ? " is-active" : ""}`}
      style={style}
      aria-current={active ? "step" : undefined}
    >
      <span className="career-wheel-point" aria-hidden />

      <div className="career-wheel-copy">
        <div className="career-wheel-short">
          <p>{item.shortVersion.company}</p>
          <h3>{item.shortVersion.position}</h3>
          <strong>{item.shortVersion.meta}</strong>
        </div>

        <div className="career-wheel-full">
          <div className="career-item-heading">
            <p data-career-reveal>{item.company}</p>
            <h3 data-career-reveal>{item.position}</h3>
            <strong data-career-reveal>{item.location} | {item.dates}</strong>
          </div>
          <div className="career-item-description">
            {item.fullDescription.map((paragraph) => <p data-career-reveal key={paragraph}>{paragraph}</p>)}
          </div>
        </div>
      </div>

      <span className="career-wheel-number" aria-hidden>{item.id}</span>
    </article>
  );
}
