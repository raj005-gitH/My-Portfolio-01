import React, { useState } from 'react';
import { CORE_VALUES } from '../data/portfolioData';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { Target, Cpu, CheckCircle2, Compass } from 'lucide-react';

const icons = [Target, Cpu, CheckCircle2, Compass];

export default function About() {
  const [activeValueIndex, setActiveValueIndex] = useState(0);
  const [sectionRef, isRevealed] = useState(false);
  const [headerRef, headerRevealed] = useScrollReveal({ threshold: 0.15 });
  const [cardsRef, cardsRevealed] = useScrollReveal({ threshold: 0.1 });
  const [balanceRef, balanceRevealed] = useScrollReveal({ threshold: 0.15 });

  return (
    <section className="section about-section" id="about">
      {/* Cinematic Chapter Atmospheric Ambient Backdrop */}
      <div className="section-ambient-glow ambient-about" aria-hidden="true" />

      {/* Progressive Line Divider */}
      <div className={`section-top-divider ${headerRevealed ? 'divider-drawn' : ''}`} aria-hidden="true" />

      <div className="container">
        {/* Section Header */}
        <div ref={headerRef} className={`section-header scroll-reveal ${headerRevealed ? 'revealed' : ''}`}>
          <div className="section-tag">
            <span className="tag-number">// 01</span>
            <span className="tag-title">HOW I THINK</span>
          </div>
          <h2 className="section-title">
            The philosophy behind the <span className="text-highlight">code.</span>
          </h2>
          <p className="section-subtitle">
            I care about more than just syntax and frameworks. I want to uncover why a product exists,
            build with unyielding engineering discipline, and ship work that creates genuine utility.
          </p>
        </div>

        {/* Editorial Statement */}
        <div className={`editorial-lead-box scroll-reveal ${headerRevealed ? 'revealed delay-1' : ''}`}>
          <div className="quote-mark">“</div>
          <p className="editorial-lead-text">
            Software engineering is my technical foundation—mastering products, customers, and business
            to build enduring solutions is the long-term journey.
          </p>
          <div className="editorial-author-tag">
            <span>— Jayraj Singh</span>
            <span className="author-role">Builder &amp; CS Student</span>
          </div>
        </div>

        {/* Interactive Value Matrix with Progressive Staggered Reveal */}
        <div ref={cardsRef} className="values-grid">
          {CORE_VALUES.map((val, idx) => {
            const Icon = icons[idx] || Target;
            const isActive = activeValueIndex === idx;

            return (
              <div
                key={val.number}
                className={`value-card scroll-reveal-stagger ${cardsRevealed ? 'revealed' : ''} ${isActive ? 'active' : ''}`}
                style={{ '--stagger-delay': `${idx * 0.12}s` }}
                onClick={() => setActiveValueIndex(idx)}
                onMouseEnter={() => setActiveValueIndex(idx)}
                tabIndex={0}
                role="button"
                aria-pressed={isActive}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    setActiveValueIndex(idx);
                  }
                }}
              >
                <div className="value-header">
                  <span className="value-number">{val.number}</span>
                  <div className="value-icon-box">
                    <Icon size={18} />
                  </div>
                </div>

                <div className="value-body">
                  <h3 className="value-title">{val.title}</h3>
                  <p className="value-tagline">{val.tagline}</p>
                  <p className="value-description">{val.description}</p>
                </div>

                <div className="value-footer">
                  <span className="value-indicator" />
                </div>
              </div>
            );
          })}
        </div>

        {/* Dual Strength Balance Callout */}
        <div ref={balanceRef} className={`dual-balance-card scroll-reveal ${balanceRevealed ? 'revealed' : ''}`}>
          <div className="balance-col">
            <div className="balance-label">THE COMMITMENT</div>
            <h4 className="balance-title">Focus &amp; Execution</h4>
            <p className="balance-text">
              Zero tolerance for half-solved problems. When I pick up an architecture—whether
              optimizing data schemas in MongoDB or diagnosing memory leaks—I dig into the fundamentals,
              finish the build, and measure the result.
            </p>
          </div>
          <div className="balance-divider" />
          <div className="balance-col">
            <div className="balance-label">THE DRIVER</div>
            <h4 className="balance-title">Curiosity &amp; Play</h4>
            <p className="balance-text">
              Engineering is fun when you experiment. I thrive on testing new build mechanisms,
              tearing down APIs, exploring algorithmic edge cases, and turning curious hypotheses into
              functional software prototypes.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
