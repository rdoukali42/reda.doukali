import Nav from '@/sections/Nav';
import Hero from '@/sections/Hero';
import About from '@/sections/About';
import Experience from '@/sections/Experience';
import Projects from '@/sections/Projects';
import Education from '@/sections/Education';
import Skills from '@/sections/Skills';
import SkillGameSection from '@/sections/SkillGameSection';
import Contact from '@/sections/Contact';
import Footer from '@/sections/Footer';
import { Crosshair } from '@/components/motion/Crosshair';
import { SectionDivider } from '@/components/motion/SectionDivider';

const Index = () => (
  <div className="min-h-screen bg-background text-foreground">
    <Nav />
    <Crosshair />
    <main>
      <Hero />
      <SectionDivider id="about" />
      <About />
      <SectionDivider id="experience" />
      <Experience />
      <SectionDivider id="projects" />
      <Projects />
      <SectionDivider id="education" />
      <Education />
      <SectionDivider id="skills" />
      <Skills />
      <SectionDivider id="game" />
      <SkillGameSection />
      <SectionDivider id="contact" />
      <Contact />
    </main>
    <Footer />
  </div>
);

export default Index;
