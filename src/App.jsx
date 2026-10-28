import React from 'react';
import SpaceshipCursor from './components/SpaceshipCursor';
import Navbar from './components/Navbar';
import SpaceAtmosphere from './components/SpaceAtmosphere';
import Hero from './components/Hero';
import About from './components/About';
import SelectedWork from './components/SelectedWork';
import EngineeringDiscipline from './components/EngineeringDiscipline';
import TechStack from './components/TechStack';
import Education from './components/Education';
import Contact from './components/Contact';
import Footer from './components/Footer';

export default function App() {
  return (
    <div className="portfolio-app">
      {/* Cinematic spaceship cursor — desktop only, pointer-events:none */}
      <SpaceshipCursor />
      {/* Navigation */}
      <Navbar />

      {/* Sparse Outer Space Atmosphere — below hero only */}
      <SpaceAtmosphere />

      {/* Main Content Narrative */}
      <main id="main-content">
        <Hero />
        <About />
        <SelectedWork />
        <EngineeringDiscipline />
        <TechStack />
        <Education />
        <Contact />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
