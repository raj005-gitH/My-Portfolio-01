import React, { useState, useEffect } from 'react';
import { PERSONAL_INFO } from '../data/portfolioData';
import { useScrollProgress } from '../hooks/useScrollReveal';
import { Menu, X, ArrowUpRight } from 'lucide-react';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { label: 'About', href: '#about', id: 'about', step: '01' },
    { label: 'Work', href: '#work', id: 'work', step: '02' },
    { label: 'Engineering', href: '#engineering', id: 'engineering', step: '03' },
    { label: 'Toolkit', href: '#toolkit', id: 'toolkit', step: '04' },
    { label: 'Education', href: '#education', id: 'education', step: '05' },
    { label: 'Contact', href: '#contact', id: 'contact', step: '06' }
  ];

  const sectionIds = navLinks.map((l) => l.id);
  const { activeSection } = useScrollProgress(sectionIds);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLinkClick = () => {
    setMobileMenuOpen(false);
  };

  return (
    <header className={`site-header site-header-enter ${scrolled ? 'scrolled' : ''}`}>
      <div className="container nav-container">
        {/* Brand Identity */}
        <a href="#" className="brand-logo" aria-label="Jayraj Singh Home">
          <div className="brand-mark">
            <span className="brand-initials">JS</span>
          </div>
          <div className="brand-text">
            <span className="brand-name">Jayraj Singh</span>
            <span className="brand-role">builder / cse '27</span>
          </div>
        </a>

        {/* Desktop Navigation */}
        <nav className="desktop-nav" aria-label="Main Navigation">
          <ul className="nav-list">
            {navLinks.map((link) => {
              const isActive = activeSection === link.id;
              return (
                <li key={link.label} className="nav-item">
                  <a
                    href={link.href}
                    className={`nav-link ${isActive ? 'active' : ''}`}
                  >
                    <span className="nav-link-dot" />
                    <span>{link.label}</span>
                  </a>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Action Button */}
        <div className="nav-actions">
          <a
            href={PERSONAL_INFO.links.resume}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-outline btn-sm"
            aria-label="View Resume (opens in new tab)"
          >
            <span>Resume</span>
            <ArrowUpRight size={14} className="btn-icon" />
          </a>
          <a href="#contact" className="btn btn-primary btn-sm desktop-only">
            <span>Let's Talk</span>
          </a>

          {/* Mobile Menu Trigger */}
          <button
            type="button"
            className="mobile-menu-btn"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-expanded={mobileMenuOpen}
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="mobile-drawer" role="dialog" aria-modal="true">
          <nav className="mobile-nav">
            <ul className="mobile-nav-list">
              {navLinks.map((link, idx) => {
                const isActive = activeSection === link.id;
                return (
                  <li key={link.label} className="mobile-nav-item">
                    <a
                      href={link.href}
                      className={`mobile-nav-link ${isActive ? 'active' : ''}`}
                      onClick={handleLinkClick}
                    >
                      <span className="mobile-nav-num">0{idx + 1}.</span>
                      <span>{link.label}</span>
                    </a>
                  </li>
                );
              })}
              <li className="mobile-nav-cta">
                <a
                  href={PERSONAL_INFO.links.resume}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-outline"
                  onClick={handleLinkClick}
                >
                  <span>View Resume</span>
                  <ArrowUpRight size={15} />
                </a>
                <a
                  href="#contact"
                  className="btn btn-primary"
                  onClick={handleLinkClick}
                >
                  <span>Get in Touch</span>
                </a>
              </li>
            </ul>
          </nav>
        </div>
      )}
    </header>
  );
}
