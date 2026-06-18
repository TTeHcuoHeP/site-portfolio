import type { Metadata } from "next";
import { Oswald } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import Header from "@/components/layout/Header";
import HeroCursor from "@/components/home/HeroCursor";
import SitePreloader from "@/components/preloader/SitePreloader";
import "./globals.css";
import "@/styles/preloader.css";
import "@/styles/projects-scroll-slider.css";
import "@/styles/career-path.css";
import "@/styles/brands-section.css";
import "@/styles/footer.css";
import "@/styles/projects-pages.css";

const oswald = Oswald({
  subsets: ["latin"],
  variable: "--font-oswald",
});

export const metadata: Metadata = {
  title: "Alsim — Creative Direction",
  description: "Creative direction, visual systems, and brand identity.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={oswald.variable}>
      <body>
        <SitePreloader />
        <HeroCursor />
        <Header />
        <main>{children}</main>
        <Analytics />
      </body>
    </html>
  );
}
