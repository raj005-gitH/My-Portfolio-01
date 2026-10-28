import React, { useEffect, useState } from 'react';
import { PERSONAL_INFO } from '../data/portfolioData';
import InteractivePortrait from './InteractivePortrait';
import { ArrowDown, ArrowUpRight } from 'lucide-react';

export default function Hero() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // Immediate activation for fluid GPU-accelerated entrance
    setMounted(true);
  }, []);

  return (
    <section className={`hero-section ${mounted ? 'hero-mounted' : ''}`} id="hero">
      <div className="container hero-container">
        {/* Left Column: Identity & Positioning */}
        <div className="hero-content">
          {/* 1. Status Eyebrow Badge */}
          <div className="hero-eyebrow hero-seq-1">
            <span className="eyebrow-indicator" />
            <span className="eyebrow-text">ENGINEERING × PRODUCT ARCHITECTURE</span>
          </div>

          {/* 2. Headline Group with Staggered Typography Reveal */}
          <div className="hero-title-group">
            <p className="hero-intro-label hero-seq-2">Hello, I'm Jayraj</p>
            <h1 className="hero-headline hero-seq-3">
              <span className="headline-line">I build software</span>{' '}
              <span className="headline-line">
                around <span className="text-highlight">real problems.</span>
              </span>
            </h1>
          </div>

          {/* 3. Supporting Copy */}
          <p className="hero-description hero-seq-4">
            {PERSONAL_INFO.subheadline}
          </p>

          {/* 4. Action CTAs */}
          <div className="hero-cta-group hero-seq-5">
            <a href="#work" className="btn btn-primary btn-lg">
              <span>Explore Selected Work</span>
              <ArrowDown size={16} className="btn-icon" />
            </a>

            <a
              href={PERSONAL_INFO.links.resume}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-outline btn-lg"
              aria-label="View Resume in Google Drive"
            >
              <span>View Resume</span>
              <ArrowUpRight size={16} className="btn-icon" />
            </a>

            <a href="#contact" className="btn btn-ghost btn-lg">
              <span>Get in Touch</span>
            </a>
          </div>

          {/* 5. Verified Engineering Signals Bar */}
          <div className="hero-signals-bar hero-seq-6">
            <div className="signal-item">
              <span className="signal-val">300+</span>
              <span className="signal-label">DSA problems on LeetCode</span>
            </div>
            <div className="signal-divider" />
            <div className="signal-item">
              <span className="signal-val">MERN</span>
              <span className="signal-label">Full-Stack Architecture</span>
            </div>
            <div className="signal-divider" />
            <div className="signal-item">
              <span className="signal-val">2027 CSE</span>
              <span className="signal-label">AKTU B.Tech Final-Year</span>
            </div>
          </div>
        </div>

        {/* Right Column: Signature Interactive Portrait Stage */}
        <div className="hero-portrait-col hero-seq-portrait">
          <InteractivePortrait />
        </div>
      </div>

      {/* 6. Subtle Scroll Cue */}
      <div className="hero-scroll-cue hero-seq-7">
        <a href="#about" aria-label="Scroll down to About section">
          <span className="cue-mouse">
            <span className="cue-wheel" />
          </span>
          <span className="cue-text">SCROLL TO DISCOVER</span>
        </a>
      </div>
    </section>
  );
}
