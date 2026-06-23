import type { Metadata } from "next";
import AboutHero from "@/components/about/AboutHero";
import ExperienceStats from "@/components/about/ExperienceStats";
import SkillsMosaic from "@/components/about/SkillsMosaic";
import ToolsGrid from "@/components/about/ToolsGrid";
import ApproachSection from "@/components/about/ApproachSection";
import Footer from "@/components/footer/Footer";
import "@/styles/about.css";

export const metadata: Metadata = {
  title: "About | Alsim Mamedov",
  description: "Creative Director, Brand Strategist, and Design Leader with international experience across brands, products, and business systems.",
};

export default function AboutPage() {
  return <div className="about-page"><AboutHero /><ExperienceStats /><SkillsMosaic /><ToolsGrid /><ApproachSection /><Footer /></div>;
}
