"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cleanupScrollTriggers } from "@/lib/cleanup-scroll-triggers";

const CV_URL = "https://7b49630d-9430-45f4-9b53-012f49a3475c.usrfiles.com/ugd/7b4963_31089efd85ca486ab9b7737f052f0559.pdf";

export default function Header() {
  const pathname = usePathname();
  const darkHeader = pathname.startsWith("/projects/") || pathname.startsWith("/work/");
  const items = [
    { label: "Home", href: "/", active: pathname === "/" },
    { label: "Work", href: "/projects", active: pathname.startsWith("/projects") || pathname.startsWith("/work") },
    { label: "About", href: "/about", active: pathname.startsWith("/about") },
    { label: "Contact", href: "/contact", active: pathname.startsWith("/contact") },
  ];

  return (
    <header
      className={`reference-header absolute inset-x-0 top-0 z-50 text-[var(--graphite)]${darkHeader ? " is-dark-page" : ""}`}
      suppressHydrationWarning
    >
      <Link href="/" className="reference-logo" aria-label="Alsim Mamedov home">[ ISOGRAPH.ME ]</Link>
      <nav aria-label="Primary navigation" className="reference-nav">
        {items.map((item) => (
          <Link
            key={item.label}
            href={item.href}
            className={`nav-item${item.active ? " is-active" : ""}`}
            aria-current={item.active ? "page" : undefined}
            onClick={() => {
              if (!item.active) cleanupScrollTriggers();
            }}
          >
            <span className="nav-bracket" aria-hidden>[</span>
            <span>{item.label}</span>
            <span className="nav-bracket" aria-hidden>]</span>
          </Link>
        ))}
        <a className="cv-link" href={CV_URL} target="_blank" rel="noopener noreferrer">Download CV</a>
      </nav>
    </header>
  );
}
