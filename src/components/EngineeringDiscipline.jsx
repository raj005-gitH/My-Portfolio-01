import React, { useState } from 'react';
import { ENGINEERING_METRICS } from '../data/portfolioData';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { Terminal, Cpu, Database, Network, Binary, ArrowUpRight, Layers } from 'lucide-react';

const subjectIcons = {
  'Data Structures & Algorithms': Binary,
  'Object-Oriented Programming (OOP)': Layers,
  'Database Management Systems (DBMS)': Database,
  'Operating Systems & Networking': Network,
  'System Design Principles': Cpu
};

export default function EngineeringDiscipline() {
  const [activeSubject, setActiveSubject] = useState(0);
  const [headerRef, headerRevealed] = useScrollReveal({ threshold: 0.15 });
  const [leetcodeRef, leetcodeRevealed] = useScrollReveal({ threshold: 0.12 });
  const [csGridRef, csGridRevealed] = useScrollReveal({ threshold: 0.1 });

  return (
    <section className="section engineering-section" id="engineering">
      {/* Chapter Ambient Atmospheric Glow */}
      <div className="section-ambient-glow ambient-engineering" aria-hidden="true" />
      <div className={`section-top-divider ${headerRevealed ? 'divider-drawn' : ''}`} aria-hidden="true" />

      <div className="container">
        {/* Section Header */}
        <div ref={headerRef} className={`section-header scroll-reveal ${headerRevealed ? 'revealed' : ''}`}>
          <div className="section-tag">
            <span className="tag-number">// 03</span>
            <span className="tag-title">ENGINEERING FOUNDATIONS</span>
          </div>
          <h2 className="section-title">
            Algorithmic rigor &amp; <span className="text-highlight">CS discipline.</span>
          </h2>
          <p className="section-subtitle">
            Strong systems aren't built on surface-level tutorials. They demand a deep grasp of
            asymptotic time/space complexity, data structure invariants, and OS concurrency.
          </p>
        </div>

        {/* LeetCode & Problem Solving Hero Box */}
        <div
          ref={leetcodeRef}
          className={`leetcode-featured-card scroll-reveal ${leetcodeRevealed ? 'revealed' : ''}`}
        >
          <div className="leetcode-card-grid">
            <div className="leetcode-metric-col">
              <div className="stat-pill">
                <span className="stat-dot" />
                <span>VERIFIED METRIC</span>
              </div>
              <div className="stat-number-box">
                <span className="stat-huge">{ENGINEERING_METRICS.leetcodeCount}</span>
                <span className="stat-unit">Problems Solved</span>
              </div>
              <p className="stat-platform">LeetCode Algorithmic Training</p>
              <a
                href={ENGINEERING_METRICS.leetcodeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-outline btn-sm"
              >
                <span>View LeetCode Profile</span>
                <ArrowUpRight size={14} />
              </a>
            </div>

            <div className="leetcode-content-col">
              <h3 className="lc-title">{ENGINEERING_METRICS.leetcodeHeadline}</h3>
              <p className="lc-note">{ENGINEERING_METRICS.leetcodeNote}</p>

              <div className="lc-breakdown-grid">
                <div className="lc-topic-card">
                  <span className="topic-name">Arrays, Maps &amp; Strings</span>
                  <span className="topic-focus">Two Pointers, Hash Invariants, Sliding Window</span>
                </div>
                <div className="lc-topic-card">
                  <span className="topic-name">Trees, Graphs &amp; Heaps</span>
                  <span className="topic-focus">BFS/DFS, Topological Sort, Priority Queues</span>
                </div>
                <div className="lc-topic-card">
                  <span className="topic-name">Dynamic Programming &amp; Greedy</span>
                  <span className="topic-focus">State Transitions, Memoization, Substructure</span>
                </div>
                <div className="lc-topic-card">
                  <span className="topic-name">Asymptotic Optimization</span>
                  <span className="topic-focus">Strict bounds on Time O(N) &amp; Space O(1)</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Core CS Fundamentals Grid */}
        <div className="core-cs-header">
          <h3 className="cs-heading">Core Computer Science Preparation</h3>
          <p className="cs-subheading">
            How academic foundations translate directly into production software architecture.
          </p>
        </div>

        <div ref={csGridRef} className="cs-subjects-grid">
          {ENGINEERING_METRICS.coreSubjects.map((sub, idx) => {
            const Icon = subjectIcons[sub.name] || Terminal;
            const isSelected = activeSubject === idx;

            return (
              <div
                key={sub.name}
                className={`cs-subject-card scroll-reveal-stagger ${csGridRevealed ? 'revealed' : ''} ${
                  isSelected ? 'highlighted' : ''
                }`}
                style={{ '--stagger-delay': `${idx * 0.08}s` }}
                onClick={() => setActiveSubject(idx)}
                tabIndex={0}
                role="button"
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    setActiveSubject(idx);
                  }
                }}
              >
                <div className="cs-card-top">
                  <div className="cs-icon-wrapper">
                    <Icon size={20} />
                  </div>
                  <span className="cs-index">MODULE_0{idx + 1}</span>
                </div>

                <h4 className="cs-subject-title">{sub.name}</h4>
                <div className="cs-topics-block">
                  <span className="cs-meta-label">TOPICS COVERED:</span>
                  <p className="cs-topics-text">{sub.topics}</p>
                </div>

                <div className="cs-app-block">
                  <span className="cs-meta-label">PRACTICAL APPLICATION:</span>
                  <p className="cs-app-text">{sub.application}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
