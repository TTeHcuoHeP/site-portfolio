"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Header() {
  const pathname = usePathname();
  const items = [
    { label: "Home", href: "/", active: pathname === "/" },
    { label: "Work", href: "/projects", active: pathname.startsWith("/projects") || pathname.startsWith("/work") },
    { label: "About", href: "/about", active: pathname.startsWith("/about") },
    { label: "Contact", href: "/contact", active: pathname.startsWith("/contact") },
  ];

  return (
    <header className="reference-header absolute inset-x-0 top-0 z-50 text-[var(--graphite)]">
      <Link href="/" className="reference-logo" aria-label="Alsim Mamedov home">AM</Link>
      <nav aria-label="Primary navigation" className="reference-nav">
        {items.map((item) => (
          <Link
            key={item.label}
            href={item.href}
            className={`nav-item${item.active ? " is-active" : ""}`}
            aria-current={item.active ? "page" : undefined}
          >
            <span className="nav-bracket" aria-hidden>[</span>
            <span>{item.label}</span>
            <span className="nav-bracket" aria-hidden>]</span>
          </Link>
        ))}
        <a className="cv-link" href="/cv/alsim-mamedov-cv.pdf" download>Download CV</a>
      </nav>
    </header>
  );
}
