// Codex write test
import Hero from "@/components/home/Hero";
import Expertise from "@/components/home/Expertise";
import ServicesSection from "@/components/home/ServicesSection";
import ServicesImpact from "@/components/home/ServicesImpact";
import SkillsMarquee from "@/components/home/SkillsMarquee";
import ScrollSequence from "@/components/home/ScrollSequence";
import About from "@/components/home/About";
import ProjectsPerspectiveSlider from "@/components/projects/ProjectsPerspectiveSlider";
import CareerTrack from "@/components/career/CareerTrack";
import BrandsSection from "@/components/brands/BrandsSection";
import Footer from "@/components/footer/Footer";

export default function Home() {
  return (
    <>
      <Hero />
      <Expertise />
      <ServicesSection />
      <ServicesImpact />
      <SkillsMarquee />
      <ScrollSequence />
      <About />
      <ProjectsPerspectiveSlider />
      <CareerTrack />
      <BrandsSection />
      <Footer />
    </>
  );
}
