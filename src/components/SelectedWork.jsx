import React, { useState } from 'react';
import { PROJECTS } from '../data/portfolioData';
import CaseStudyModal from './CaseStudyModal';
import { GithubIcon } from './Icons';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { ArrowUpRight, BookOpen, Sparkles } from 'lucide-react';

function ProjectItem({ project, idx, onSelect }) {
  const [cardRef, isRevealed] = useScrollReveal({ threshold: 0.12 });
  const isReversed = idx % 2 === 1;
  const isFirst = idx === 0;

  const previewImage =
    project.image ||
    (project.id === 'avoa'
      ? '/avoa.png'
      : project.id === 'hukoom'
      ? '/hukoom.png'
      : null);

  return (
    <article
      ref={cardRef}
      className={`project-editorial-card scroll-reveal ${isRevealed ? 'revealed' : ''} ${
        isReversed ? 'layout-reversed' : ''
      } ${isFirst ? 'project-flagship' : ''}`}
    >
      {/* Visual Preview Stage with Depth and Restrained Sheen */}
      <div className="project-visual-stage">
        {previewImage ? (
          <div className="preview-image-wrapper">
            <img
              src={previewImage}
              alt={`${project.title} Interface Preview`}
              className="project-preview-img"
              loading="lazy"
            />
            <div className="preview-gradient-scrim" />
            <div className="preview-status-tag">
              <span className="tag-dot" />
              <span>{project.statusBadge}</span>
            </div>
            {isFirst && (
              <div className="flagship-badge">
                <Sparkles size={11} />
                <span>FLAGSHIP ARCHITECTURE</span>
              </div>
            )}
          </div>
        ) : (
          <div className="preview-terminal-wrapper">
            <div className="terminal-header">
              <span className="t-dot red" />
              <span className="t-dot amber" />
              <span className="t-dot green" />
              <span className="t-title">{project.title.toLowerCase()}.sys</span>
            </div>
            <div className="terminal-body">
              <p className="t-line dim">// Systems Exploration</p>
              <p className="t-line">const engine = new StreamEngine();</p>
              <p className="t-line">engine.listen(&apos;order_book&apos;, (data) =&gt; &#123;</p>
              <p className="t-line indent">renderDepthChart(data);</p>
              <p className="t-line">&#125;);</p>
              <p className="t-line success">✔ Architecture verified: O(1) buffer updates</p>
            </div>
          </div>
        )}
      </div>

      {/* Content & Case Study Details */}
      <div className="project-content-stage">
        <div className="project-category-row">
          <span className="project-category-label">{project.category}</span>
          <span className="project-index">PROJ_0{idx + 1}</span>
        </div>

        <h3 className="project-title">{project.title}</h3>
        <p className="project-tagline">{project.tagline}</p>
        <p className="project-summary">{project.summary}</p>

        {/* Highlight Metrics */}
        <div className="project-metrics-grid">
          {project.metrics.map((m, mIdx) => (
            <div key={mIdx} className="p-metric-item">
              <span className="p-metric-label">{m.label}</span>
              <span className="p-metric-val">{m.value}</span>
            </div>
          ))}
        </div>

        {/* Tech Badges with Staggered Visual Feel */}
        <div className="project-tech-row">
          {project.techStack.slice(0, 5).map((tech) => (
            <span key={tech} className="tech-badge">
              {tech}
            </span>
          ))}
          {project.techStack.length > 5 && (
            <span className="tech-badge more">
              +{project.techStack.length - 5} more
            </span>
          )}
        </div>

        {/* Actions & Links */}
        <div className="project-actions-row">
          <button
            type="button"
            className="btn btn-primary btn-sm"
            onClick={() => onSelect(project)}
          >
            <BookOpen size={15} />
            <span>Case Study</span>
          </button>

          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-outline btn-sm"
            >
              <span>Live Site</span>
              <ArrowUpRight size={15} />
            </a>
          )}

          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-ghost btn-sm"
              aria-label={`View ${project.title} source code on GitHub`}
            >
              <GithubIcon size={15} />
              <span>Source</span>
            </a>
          )}
        </div>
      </div>
    </article>
  );
}

export default function SelectedWork() {
  const [selectedProject, setSelectedProject] = useState(null);
  const [filter, setFilter] = useState('all');
  const [headerRef, headerRevealed] = useScrollReveal({ threshold: 0.15 });

  const filteredProjects = PROJECTS.filter((p) => {
    if (filter === 'fullstack') return p.featured;
    if (filter === 'experimental') return !p.featured;
    return true;
  });

  return (
    <section className="section work-section" id="work">
      {/* Chapter Atmospheric Ambient Lighting */}
      <div className="section-ambient-glow ambient-work" aria-hidden="true" />
      <div className={`section-top-divider ${headerRevealed ? 'divider-drawn' : ''}`} aria-hidden="true" />

      <div className="container">
        {/* Section Header */}
        <div ref={headerRef} className={`section-header scroll-reveal ${headerRevealed ? 'revealed' : ''}`}>
          <div className="section-tag">
            <span className="tag-number">// 02</span>
            <span className="tag-title">SELECTED WORK</span>
          </div>
          <h2 className="section-title">
            Engineering proof, <span className="text-highlight">not promises.</span>
          </h2>
          <p className="section-subtitle">
            Every project represents actual code written, architectural trade-offs resolved,
            and user experiences brought to life. No fabricated metrics—only truthful engineering work.
          </p>

          {/* Filter Pills */}
          <div className="work-filter-bar">
            <button
              type="button"
              className={`filter-btn ${filter === 'all' ? 'active' : ''}`}
              onClick={() => setFilter('all')}
            >
              All Projects ({PROJECTS.length})
            </button>
            <button
              type="button"
              className={`filter-btn ${filter === 'fullstack' ? 'active' : ''}`}
              onClick={() => setFilter('fullstack')}
            >
              Full-Stack Platforms (Avoa &amp; Hukoom)
            </button>
            <button
              type="button"
              className={`filter-btn ${filter === 'experimental' ? 'active' : ''}`}
              onClick={() => setFilter('experimental')}
            >
              Systems &amp; Prototypes
            </button>
          </div>
        </div>

        {/* Projects Editorial Showcase */}
        <div className="projects-showcase">
          {filteredProjects.map((project, idx) => (
            <ProjectItem
              key={project.id}
              project={project}
              idx={idx}
              onSelect={setSelectedProject}
            />
          ))}
        </div>
      </div>

      {/* Case Study Modal */}
      {selectedProject && (
        <CaseStudyModal
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
        />
      )}
    </section>
  );
}
