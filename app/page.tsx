import Hero from "@/components/home/Hero";
import Expertise from "@/components/home/Expertise";
import ScrollSequence from "@/components/home/ScrollSequence";
import About from "@/components/home/About";
import ProjectsScrollSlider from "@/components/projects/ProjectsScrollSlider";
import CareerPath from "@/components/career/CareerPath";
import BrandsSection from "@/components/brands/BrandsSection";
import Footer from "@/components/footer/Footer";

export default function Home() {
  return (
    <>
      <Hero />
      <Expertise />
      <ScrollSequence />
      <About />
      <ProjectsScrollSlider />
      <CareerPath />
      <BrandsSection />
      <Footer />
    </>
  );
}
