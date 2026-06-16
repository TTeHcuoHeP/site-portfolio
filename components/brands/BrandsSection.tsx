import LogoTrack from "./LogoTrack";
import { getLogos } from "@/data/logos";

function ParticleWave() {
  return (
    <svg className="brands-particle-wave" viewBox="0 0 1600 250" preserveAspectRatio="none" aria-hidden>
      <defs>
        <pattern id="brands-dot-pattern" width="13" height="13" patternUnits="userSpaceOnUse">
          <circle cx="2" cy="2" r="1.1" />
        </pattern>
        <clipPath id="brands-wave-shape">
          <path d="M0 115C180 40 310 205 485 130C665 52 770 185 935 122C1110 55 1280 190 1600 82V250H0Z" />
        </clipPath>
      </defs>
      <g clipPath="url(#brands-wave-shape)">
        <rect width="1600" height="250" fill="url(#brands-dot-pattern)" />
      </g>
    </svg>
  );
}

export default function BrandsSection() {
  const logos = getLogos();

  return (
    <section className="brands-section" aria-labelledby="brands-heading">
      <header className="brands-intro">
        <p>Trusted By Visioners</p>
        <h2 id="brands-heading">Brands I&apos;ve<br />Worked With</h2>
        <div>Collaboration with ambitious companies and global leaders to<br />create impact through creativity.</div>
      </header>

      <div className="brands-showcase">
        <ParticleWave />
        <LogoTrack logos={logos} />
      </div>

      <footer className="brands-statistics">
        <span className="brands-stat-icon" aria-hidden>↗</span>
        <div className="brands-stat-copy">
          <strong>Long Term Partnerships</strong>
          <p>Building lasting relationships based on trust,<br />creativity, and measurable results.</p>
        </div>
        <div className="brands-stat-number">50+</div>
        <div className="brands-stat-copy">
          <strong>Brands &amp; Organizations</strong>
          <p>Across industries, cultures,<br />and global markets.</p>
        </div>
      </footer>
    </section>
  );
}
