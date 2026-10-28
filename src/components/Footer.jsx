import React from 'react';
import { ArrowUp, Terminal, Heart } from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="site-footer">
      <div className="container footer-container">
        <div className="footer-top-row">
          <div className="footer-brand">
            <span className="footer-name">{PERSONAL_INFO.name}</span>
            <span className="footer-role">Computer Science Student &amp; Software Builder</span>
          </div>

          <div className="footer-status-pill">
            <span className="status-dot green" />
            <span>AKTU '27 • Available for SDE Roles &amp; Collaborations</span>
          </div>

          <button
            type="button"
            className="back-to-top-btn"
            onClick={scrollToTop}
            aria-label="Back to top of page"
          >
            <span>Top</span>
            <ArrowUp size={14} />
          </button>
        </div>

        <div className="footer-divider" />

        <div className="footer-bottom-row">
          <div className="footer-copy">
            <span>© {new Date().getFullYear()} Jayraj Singh. All engineering case studies verified.</span>
          </div>

          <div className="footer-tech-stack">
            <span>Crafted with React, Vite, Modern CSS &amp; Canvas Physics</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
