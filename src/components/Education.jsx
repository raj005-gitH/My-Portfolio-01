import React from 'react';
import { EDUCATION_DATA } from '../data/portfolioData';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { GraduationCap, Calendar, Award, BookCheck, ShieldCheck } from 'lucide-react';

export default function Education() {
  const [headerRef, headerRevealed] = useScrollReveal({ threshold: 0.15 });
  const [timelineRef, timelineRevealed] = useScrollReveal({ threshold: 0.12 });

  return (
    <section className="section education-section" id="education">
      {/* Chapter Ambient Lighting */}
      <div className="section-ambient-glow ambient-education" aria-hidden="true" />
      <div className={`section-top-divider ${headerRevealed ? 'divider-drawn' : ''}`} aria-hidden="true" />

      <div className="container">
        {/* Section Header */}
        <div ref={headerRef} className={`section-header scroll-reveal ${headerRevealed ? 'revealed' : ''}`}>
          <div className="section-tag">
            <span className="tag-number">// 05</span>
            <span className="tag-title">ACADEMIC JOURNEY</span>
          </div>
          <h2 className="section-title">
            Education &amp; <span className="text-highlight">grounding.</span>
          </h2>
          <p className="section-subtitle">
            Formal computer science training combined with deliberate self-directed engineering.
            Verified credentials with zero fabricated history.
          </p>
        </div>

        {/* Education Timeline & Credentials Showcase */}
        <div
          ref={timelineRef}
          className={`education-timeline-card scroll-reveal ${timelineRevealed ? 'revealed' : ''}`}
        >
          <div className="timeline-left-rail">
            <div className="edu-icon-bubble">
              <GraduationCap size={24} />
            </div>
            <div className={`rail-line ${timelineRevealed ? 'line-drawn' : ''}`} />
          </div>

          <div className="timeline-content-pane">
            <div className="edu-top-meta">
              <span className="edu-period">
                <Calendar size={14} />
                <span>{EDUCATION_DATA.duration}</span>
              </span>
              <span className="edu-status-pill">{EDUCATION_DATA.status}</span>
            </div>

            <h3 className="edu-degree">{EDUCATION_DATA.degree}</h3>
            <h4 className="edu-institution">{EDUCATION_DATA.institution}</h4>

            {/* Verified CGPA Card */}
            <div className="edu-cgpa-box">
              <div className="cgpa-left">
                <div className="cgpa-badge">
                  <Award size={18} />
                  <span>CUMULATIVE GPA</span>
                </div>
                <div className="cgpa-val">{EDUCATION_DATA.cgpa}</div>
              </div>
              <div className="cgpa-right">
                <p className="cgpa-note">{EDUCATION_DATA.cgpaNote}</p>
                <div className="cgpa-verified">
                  <ShieldCheck size={14} />
                  <span>Verified academic record</span>
                </div>
              </div>
            </div>

            {/* Academic Highlights */}
            <div className="edu-highlights-area">
              <h5 className="highlights-title">Core Academic Focus &amp; Milestones:</h5>
              <ul className="highlights-list">
                {EDUCATION_DATA.highlights.map((h, idx) => (
                  <li key={idx} className="highlight-item">
                    <BookCheck size={16} className="h-icon" />
                    <span>{h}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
