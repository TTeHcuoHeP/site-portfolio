"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { usePathname } from "next/navigation";

export default function SitePreloader() {
  const rootRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();
  const [active, setActive] = useState(true);

  useEffect(() => {
    if (pathname !== "/") return;
    const root = rootRef.current;
    if (!root) return;

    const reducedMotion = matchMedia("(prefers-reduced-motion: reduce)").matches;
    document.body.classList.add("is-preloading");

    const complete = () => {
      document.body.classList.remove("is-preloading");
      setActive(false);
    };

    const context = gsap.context(() => {
      gsap.set(root, { autoAlpha: 1, clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)" });
      gsap.set(".preloader-scene", { autoAlpha: 0 });

      if (reducedMotion) {
        gsap.set(".preloader-scene-launch", { autoAlpha: 1 });
        gsap.timeline({ onComplete: complete })
          .to(".preloader-launch-ring", { scale: 1.15, opacity: 0.45, duration: 0.5, ease: "power2.out" })
          .to(root, {
            clipPath: "polygon(100% 0, 100% 0, 100% 100%, 100% 100%)",
            duration: reducedMotion ? 0.15 : 0.65,
            ease: "power3.inOut",
          }, 0.35);
        return;
      }

      const tl = gsap.timeline({ defaults: { ease: "power3.out" }, onComplete: complete });

      tl.set(".preloader-scene-boot", { autoAlpha: 1 })
        .fromTo(".preloader-system-title", { autoAlpha: 0, y: 18, letterSpacing: "0.42em" }, { autoAlpha: 1, y: 0, letterSpacing: "0.24em", duration: 0.55 }, 0.05)
        .fromTo(".preloader-initializing", { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.28 }, 0.48)
        .to(".preloader-system-cursor", { autoAlpha: 0, repeat: 3, yoyo: true, duration: 0.16 }, 0.56)
        .to(".preloader-scene-boot", { autoAlpha: 0, duration: 0.28 }, 1)

        .set(".preloader-scene-log", { autoAlpha: 1 }, 1.05)
        .fromTo(".preloader-log-line", { autoAlpha: 0, x: -18 }, { autoAlpha: 1, x: 0, stagger: 0.36, duration: 0.3 }, 1.18)
        .fromTo(".preloader-log-ok", { autoAlpha: 0, x: 8 }, { autoAlpha: 1, x: 0, stagger: 0.36, duration: 0.22, color: "#f6a400" }, 1.42)
        .to(".preloader-scene-log", { autoAlpha: 0, duration: 0.35 }, 3)

        .set(".preloader-scene-statement", { autoAlpha: 1 }, 3.05)
        .fromTo(".preloader-statement span", { autoAlpha: 0, yPercent: 72, filter: "blur(8px)" }, { autoAlpha: 1, yPercent: 0, filter: "blur(0px)", stagger: 0.11, duration: 0.55 }, 3.1)
        .fromTo(".preloader-statement-mark", { scaleX: 0 }, { scaleX: 1, duration: 0.5, ease: "power2.inOut" }, 3.76)
        .fromTo(".preloader-glitch", { autoAlpha: 0, x: -20 }, { autoAlpha: 0.55, x: 0, stagger: 0.08, duration: 0.12, repeat: 2, yoyo: true }, 3.95)
        .to(".preloader-scene-statement", { autoAlpha: 0, duration: 0.35 }, 5)

        .set(".preloader-scene-profile", { autoAlpha: 1 }, 5.05)
        .fromTo(".preloader-profile-badge", { autoAlpha: 0, y: 34, scale: 0.96 }, { autoAlpha: 1, y: 0, scale: 1, duration: 0.55 }, 5.1)
        .fromTo(".preloader-doodle", { autoAlpha: 0, y: 20, rotate: -2 }, { autoAlpha: 0.85, y: 0, rotate: 0, stagger: 0.18, duration: 0.45 }, 5.28)
        .fromTo(".preloader-profile-status", { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.25 }, 5.34)
        .to(".preloader-profile-badge", { y: -4, duration: 0.8, ease: "sine.inOut" }, 5.78)

        .set(".preloader-scene-launch", { autoAlpha: 1 }, 6.48)
        .to(".preloader-launch-ring", { scale: 1.08, opacity: 0.55, duration: 0.35, ease: "power2.out" }, 6.5)
        .to(root, {
          clipPath: "polygon(100% 0, 100% 0, 100% 100%, 100% 100%)",
          duration: 0.5,
          ease: "power3.inOut",
        }, 6.52);
    }, root);

    return () => {
      context.revert();
      document.body.classList.remove("is-preloading");
    };
  }, [pathname]);

  if (!active || pathname !== "/") return null;

  return (
    <div ref={rootRef} className="site-preloader" role="status" aria-live="polite" aria-label="Loading portfolio">
      <section className="preloader-scene preloader-scene-boot">
        <div className="preloader-timecode">0:00 - 1:00</div>
        <div className="preloader-system-title">AM / Creative System</div>
        <span className="preloader-system-cursor" aria-hidden />
        <div className="preloader-status preloader-initializing">Initializing...</div>
      </section>

      <section className="preloader-scene preloader-scene-log">
        <div className="preloader-timecode">1:00 - 3:00</div>
        <div className="preloader-log" aria-label="System log">
          {["loading ideas...", "building visual systems...", "checking campaigns...", "syncing strategy..."].map((line) => (
            <div className="preloader-log-row" key={line}>
              <span className="preloader-log-line">&gt; {line}</span>
              <span className="preloader-log-ok">OK</span>
            </div>
          ))}
        </div>
        <div className="preloader-status">System Log</div>
        <div className="preloader-version">v 1.0.0</div>
      </section>

      <section className="preloader-scene preloader-scene-statement">
        <div className="preloader-timecode">3:00 - 5:00</div>
        <h2 className="preloader-statement">
          <span>I turn business problems</span>
          <span>into creative systems</span>
        </h2>
        <i className="preloader-statement-mark" aria-hidden />
        <span className="preloader-glitch preloader-glitch-a" aria-hidden />
        <span className="preloader-glitch preloader-glitch-b" aria-hidden />
        <div className="preloader-status">System Online</div>
      </section>

      <section className="preloader-scene preloader-scene-profile">
        <div className="preloader-timecode">5:00 - 6:30</div>
        <div className="preloader-doodle preloader-doodle-left">
          <strong>Ideas</strong>
          <span>Research<br />Insight<br />Strategy<br />Concept</span>
        </div>
        <div className="preloader-profile-badge">
          <div className="preloader-profile-top">
            <span />
            <em>Drag me ···</em>
          </div>
          <p className="preloader-profile-status">Profile Ready</p>
          <h3>Alsim Mamedov</h3>
          <p>Creative Director</p>
          <i aria-hidden />
        </div>
        <div className="preloader-doodle preloader-doodle-right">
          <strong>Campaigns</strong>
          <span>TV / Digital<br />Social<br />POSM / Print<br />Web</span>
        </div>
        <div className="preloader-status">Preparing Profile...</div>
      </section>

      <section className="preloader-scene preloader-scene-launch">
        <div className="preloader-timecode">6:30 - 7:00</div>
        <div className="preloader-launch-ring">
          <span>Launching<br />Profile</span>
        </div>
      </section>
    </div>
  );
}
