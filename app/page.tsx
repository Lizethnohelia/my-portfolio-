import HeroSection from "./components/HeroSection";
import ProjectsGrid from "./components/ProjectsGrid";
import AboutMe from "./components/AboutMe";
import Experience from "./components/Experience";
import Footer from "./components/Footer";

export default function Home() {
  return (
    <main>
      <HeroSection />
      <ProjectsGrid />
      <AboutMe />
      <Experience />
      <Footer />
    </main>
  );
}
