import React, { useState } from 'react';
import { SKILLS_TOOLKIT } from '../data/portfolioData';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { Code, Layout, Server, Database, Wrench } from 'lucide-react';

const categoryIcons = {
  Languages: Code,
  'Frontend Architecture': Layout,
  'Backend & Systems': Server,
  'Databases & Cloud': Database,
  'Dev Tools & Workflow': Wrench
};

export default function TechStack() {
  const [activeTab, setActiveTab] = useState(0);
  const [headerRef, headerRevealed] = useScrollReveal({ threshold: 0.15 });
  const [boxRef, boxRevealed] = useScrollReveal({ threshold: 0.12 });
  const [matrixRef, matrixRevealed] = useScrollReveal({ threshold: 0.1 });

  return (
    <section className="section toolkit-section" id="toolkit">
      {/* Chapter Ambient Lighting */}
      <div className="section-ambient-glow ambient-toolkit" aria-hidden="true" />
      <div className={`section-top-divider ${headerRevealed ? 'divider-drawn' : ''}`} aria-hidden="true" />

      <div className="container">
        {/* Section Header */}
        <div ref={headerRef} className={`section-header scroll-reveal ${headerRevealed ? 'revealed' : ''}`}>
          <div className="section-tag">
            <span className="tag-number">// 04</span>
            <span className="tag-title">TECHNICAL TOOLKIT</span>
          </div>
          <h2 className="section-title">
            Technologies &amp; <span className="text-highlight">practical tools.</span>
          </h2>
          <p className="section-subtitle">
            Organized by functional domains and practical software development applications.
            No arbitrary percentages or superficial scores.
          </p>

          {/* Category Tabs */}
          <div className="toolkit-tabs-bar">
            {SKILLS_TOOLKIT.map((group, idx) => {
              const Icon = categoryIcons[group.category] || Code;
              const isActive = activeTab === idx;

              return (
                <button
                  key={group.category}
                  type="button"
                  className={`tab-btn ${isActive ? 'active' : ''}`}
                  onClick={() => setActiveTab(idx)}
                >
                  <Icon size={16} />
                  <span>{group.category}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Active Group Showcase */}
        <div ref={boxRef} className={`toolkit-showcase-box scroll-reveal ${boxRevealed ? 'revealed' : ''}`}>
          <div className="toolkit-group-header">
            <div className="group-title-col">
              <span className="group-meta">CATEGORY_0{activeTab + 1}</span>
              <h3 className="group-title">{SKILLS_TOOLKIT[activeTab].category}</h3>
            </div>
            <p className="group-desc">{SKILLS_TOOLKIT[activeTab].description}</p>
          </div>

          <div className="skills-grid">
            {SKILLS_TOOLKIT[activeTab].skills.map((skill, sIdx) => (
              <div
                key={skill.name}
                className="skill-card"
                style={{ animationDelay: `${sIdx * 0.05}s` }}
              >
                <div className="skill-card-top">
                  <h4 className="skill-name">{skill.name}</h4>
                  <span className={`skill-level-pill ${skill.level.toLowerCase()}`}>
                    {skill.level}
                  </span>
                </div>
                <p className="skill-context">{skill.context}</p>
              </div>
            ))}
          </div>
        </div>

        {/* All Categories Compact Matrix View */}
        <div ref={matrixRef} className={`all-categories-matrix scroll-reveal ${matrixRevealed ? 'revealed' : ''}`}>
          <div className="matrix-title-row">
            <span className="matrix-heading">COMPLETE STACK MATRIX AT A GLANCE</span>
          </div>
          <div className="matrix-columns">
            {SKILLS_TOOLKIT.map((group) => (
              <div key={group.category} className="matrix-col">
                <h4 className="matrix-col-title">{group.category}</h4>
                <ul className="matrix-list">
                  {group.skills.map((s) => (
                    <li key={s.name} className="matrix-item">
                      <span className="matrix-dot" />
                      <span className="matrix-name">{s.name}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
