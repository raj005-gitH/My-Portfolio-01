import React, { useEffect } from 'react';
import { GithubIcon } from './Icons';
import { X, ExternalLink, CheckCircle, AlertTriangle, Layers, Terminal } from 'lucide-react';

export default function CaseStudyModal({ project, onClose }) {
  // Prevent background scrolling when modal is open and handle ESC key
  useEffect(() => {
    if (!project) return;
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [project, onClose]);

  if (!project) return null;

  return (
    <div
      className="modal-backdrop"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="case-study-title"
    >
      <div
        className="modal-container"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="modal-header">
          <div className="modal-header-meta">
            <span className="modal-badge">{project.statusBadge}</span>
            <span className="modal-category">{project.category}</span>
          </div>
          <button
            type="button"
            className="modal-close-btn"
            onClick={onClose}
            aria-label="Close Case Study"
          >
            <X size={20} />
          </button>
        </div>

        {/* Modal Body */}
        <div className="modal-body">
          <div className="modal-title-area">
            <h2 id="case-study-title" className="modal-project-title">
              {project.title}
            </h2>
            <p className="modal-project-tagline">{project.tagline}</p>
          </div>

          {/* Quick Metrics & Links */}
          <div className="modal-quick-grid">
            <div className="modal-metrics">
              {project.metrics.map((m, idx) => (
                <div key={idx} className="modal-metric-card">
                  <span className="m-label">{m.label}</span>
                  <span className="m-val">{m.value}</span>
                </div>
              ))}
            </div>

            <div className="modal-links-bar">
              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-primary"
                >
                  <span>Visit Live Platform</span>
                  <ExternalLink size={16} />
                </a>
              )}
              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-outline"
                >
                  <span>Source Code</span>
                  <GithubIcon size={16} />
                </a>
              )}
            </div>
          </div>

          <div className="modal-divider" />

          {/* Section: Problem & Context */}
          <div className="modal-section">
            <h3 className="modal-section-heading">
              <span className="heading-num">01.</span> The Problem &amp; Opportunity
            </h3>
            <p className="modal-text">{project.summary}</p>
          </div>

          {/* Section: Architectural Contributions */}
          <div className="modal-section">
            <h3 className="modal-section-heading">
              <span className="heading-num">02.</span> My Contributions &amp; Technical Decisions
            </h3>
            <ul className="modal-features-list">
              {project.highlightFeatures.map((feat, idx) => (
                <li key={idx} className="modal-feature-item">
                  <CheckCircle size={18} className="feature-icon" />
                  <span>{feat}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Section: Tech Stack */}
          <div className="modal-section">
            <h3 className="modal-section-heading">
              <span className="heading-num">03.</span> Technologies Employed
            </h3>
            <div className="modal-tags-list">
              {project.techStack.map((tech) => (
                <span key={tech} className="tech-badge">
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* Section: Engineering Challenges & Learnings */}
          <div className="modal-section challenge-box">
            <div className="challenge-header">
              <AlertTriangle size={18} className="challenge-icon" />
              <h4 className="challenge-title">Engineering Friction &amp; Retrospective</h4>
            </div>
            <p className="challenge-text">{project.challengeAndLearnings}</p>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="modal-footer">
          <span className="modal-footer-note">
            Verified implementation documented for Jayraj Singh's engineering portfolio.
          </span>
          <button type="button" className="btn btn-outline btn-sm" onClick={onClose}>
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
