import Link from "next/link";

type Impact = {
  label: string;
  value: string;
  icon: "person" | "briefcase" | "globe" | "flag";
};

const impacts: Impact[] = [
  { label: "Years of Experience", value: "15+", icon: "person" },
  { label: "Completed Projects", value: "500+", icon: "briefcase" },
  { label: "Industries", value: "10+", icon: "globe" },
  { label: "International Markets", value: "5+", icon: "flag" },
];

function ImpactIcon({ icon }: Pick<Impact, "icon">) {
  const common = { fill: "none", stroke: "currentColor", strokeWidth: 1.8, strokeLinecap: "round" as const, strokeLinejoin: "round" as const };

  if (icon === "person") {
    return <svg viewBox="0 0 48 48" aria-hidden="true"><circle cx="24" cy="15" r="7" {...common} /><path d="M12 40v-5c0-6.1 5.4-11 12-11s12 4.9 12 11v5" {...common} /></svg>;
  }

  if (icon === "briefcase") {
    return <svg viewBox="0 0 48 48" aria-hidden="true"><rect x="8" y="15" width="32" height="25" rx="3" {...common} /><path d="M18 15v-4c0-1.7 1.3-3 3-3h6c1.7 0 3 1.3 3 3v4M8 25h32M20 25v4h8v-4" {...common} /></svg>;
  }

  if (icon === "globe") {
    return <svg viewBox="0 0 48 48" aria-hidden="true"><circle cx="24" cy="24" r="16" {...common} /><path d="M8 24h32M24 8c5.2 4.3 8 9.6 8 16s-2.8 11.7-8 16c-5.2-4.3-8-9.6-8-16s2.8-11.7 8-16Z" {...common} /></svg>;
  }

  return <svg viewBox="0 0 48 48" aria-hidden="true"><path d="M10 40V10c8-3 14 3 22 0v20c-8 3-14-3-22 0" {...common} /></svg>;
}

export default function ServicesImpact() {
  return (
    <section className="services-impact" aria-labelledby="services-impact-heading">
      <div className="services-impact-summary" aria-label="Creative process">
        <svg viewBox="0 0 32 32" aria-hidden="true">
          <path d="M16 2.5 19.4 12.6 29.5 16l-10.1 3.4L16 29.5l-3.4-10.1L2.5 16l10.1-3.4L16 2.5Z" />
        </svg>
        <span className="services-impact-summary-lead">Design solutions that drive brands forward</span>
        <i aria-hidden="true" />
        {['Strategy', 'Design', 'Execution', 'Results'].map((step, index) => (
          <span className="services-impact-summary-step" key={step}>
            {index > 0 && <b aria-hidden="true" />} {step}
          </span>
        ))}
      </div>

      <div className="services-impact-content">
        <div className="services-impact-copy">
          <h2 id="services-impact-heading">Experience across<br />brands, markets<br />&amp; industries</h2>
          <Link href="#contact" className="services-impact-cta">
            Let&apos;s work together <span aria-hidden="true">-&gt;</span>
          </Link>
        </div>

        <div className="services-impact-grid">
          {impacts.map((impact) => (
            <article className="services-impact-card" key={impact.label}>
              <ImpactIcon icon={impact.icon} />
              <span className="services-impact-divider" aria-hidden="true" />
              <div>
                <p>{impact.label}</p>
                <strong>{impact.value}</strong>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
