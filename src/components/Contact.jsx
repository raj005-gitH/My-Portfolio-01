import React, { useState } from 'react';
import { PERSONAL_INFO } from '../data/portfolioData';
import { GithubIcon, LinkedinIcon } from './Icons';
import { useScrollReveal } from '../hooks/useScrollReveal';
import {
  Copy,
  Check,
  ArrowUpRight,
  Send,
  Loader2,
  Code2,
  FileText,
  Globe
} from 'lucide-react';

export default function Contact() {
  const [copied, setCopied] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState({ state: 'idle', msg: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [headerRef, headerRevealed] = useScrollReveal({ threshold: 0.15 });
  const [gridRef, gridRevealed] = useScrollReveal({ threshold: 0.12 });

  const handleCopyEmail = () => {
    const email = PERSONAL_INFO.email;
    if (typeof window !== 'undefined' && typeof window.gtag === 'function') {
      window.gtag('event', 'copy_email', {
        event_category: 'Engagement',
        event_label: email
      });
    }
    if (navigator?.clipboard?.writeText) {
      navigator.clipboard.writeText(email)
        .then(() => {
          setCopied(true);
          setTimeout(() => setCopied(false), 2500);
        })
        .catch(() => {
          fallbackCopy(email);
        });
    } else {
      fallbackCopy(email);
    }
  };

  const fallbackCopy = (text) => {
    try {
      const el = document.createElement('textarea');
      el.value = text;
      el.setAttribute('readonly', '');
      el.style.position = 'absolute';
      el.style.left = '-9999px';
      document.body.appendChild(el);
      el.select();
      document.execCommand('copy');
      document.body.removeChild(el);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      setStatus({ state: 'error', msg: 'Please provide all fields before sending.' });
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setStatus({ state: 'error', msg: 'Please enter a valid email address.' });
      return;
    }

    const accessKey =
      import.meta.env.VITE_WEB3FORMS_ACCESS_KEY ||
      PERSONAL_INFO.web3FormsAccessKey;

    // Graceful fallback to mailto if access key is not yet configured
    if (!accessKey || accessKey.trim() === '' || accessKey === 'YOUR_ACCESS_KEY_HERE') {
      const subject = encodeURIComponent(`Portfolio Inquiry from ${formData.name}`);
      const body = encodeURIComponent(
        `Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`
      );
      window.location.href = `mailto:${PERSONAL_INFO.email}?subject=${subject}&body=${body}`;

      if (typeof window !== 'undefined' && typeof window.gtag === 'function') {
        window.gtag('event', 'generate_lead', {
          event_category: 'Contact',
          event_label: 'Mailto Fallback'
        });
      }

      setStatus({
        state: 'success',
        msg: 'Opened your email client as fallback. (Add your Web3Forms access key in .env for direct background delivery).'
      });
      setFormData({ name: '', email: '', message: '' });
      return;
    }

    setIsSubmitting(true);
    setStatus({ state: 'loading', msg: 'Sending message directly to inbox...' });

    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json'
        },
        body: JSON.stringify({
          access_key: accessKey.trim(),
          name: formData.name,
          email: formData.email,
          message: formData.message,
          subject: `Portfolio Inquiry from ${formData.name}`,
          from_name: formData.name,
          replyto: formData.email
        })
      });

      const data = await response.json();

      if (data.success) {
        if (typeof window !== 'undefined' && typeof window.gtag === 'function') {
          window.gtag('event', 'generate_lead', {
            event_category: 'Contact',
            event_label: 'Web3Forms Direct'
          });
        }
        setStatus({
          state: 'success',
          msg: 'Thank you! Your message was delivered straight to my inbox. I will get back to you shortly.'
        });
        setFormData({ name: '', email: '', message: '' });
      } else {
        setStatus({
          state: 'error',
          msg: data.message || 'Submission failed. Please try again or use direct email.'
        });
      }
    } catch {
      setStatus({
        state: 'error',
        msg: 'Network error. Could not send message. Please copy email directly.'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const verifiedLinks = [
    { label: 'GitHub', href: PERSONAL_INFO.links.github, icon: GithubIcon, sub: '@raj005-gitH' },
    { label: 'LinkedIn', href: PERSONAL_INFO.links.linkedin, icon: LinkedinIcon, sub: 'jayrajsinght' },
    { label: 'LeetCode', href: PERSONAL_INFO.links.leetcode, icon: Code2, sub: '300+ Problems Solved' },
    { label: 'Resume', href: PERSONAL_INFO.links.resume, icon: FileText, sub: 'Google Drive Document' },
    { label: 'Existing Site', href: PERSONAL_INFO.links.legacyPortfolio, icon: Globe, sub: 'jayrajsingh.in (Ref)' }
  ];

  return (
    <section className="section contact-section" id="contact">
      {/* Chapter Ambient Atmospheric Warm Aura */}
      <div className="section-ambient-glow ambient-contact" aria-hidden="true" />
      <div className={`section-top-divider ${headerRevealed ? 'divider-drawn' : ''}`} aria-hidden="true" />

      <div className="container">
        {/* Section Header */}
        <div ref={headerRef} className={`section-header scroll-reveal ${headerRevealed ? 'revealed' : ''}`}>
          <div className="section-tag">
            <span className="tag-number">// 06</span>
            <span className="tag-title">START A CONVERSATION</span>
          </div>
          <h2 className="section-title">
            Let's build something <span className="text-highlight">meaningful.</span>
          </h2>
          <p className="section-subtitle">
            Whether you are recruiting for high-impact software engineering roles, building an early-stage
            product, or exploring technical collaboration—I would love to connect.
          </p>
        </div>

        <div ref={gridRef} className="contact-grid">
          {/* Left Column: Direct Outreach & Social Links */}
          <div className={`contact-info-col scroll-reveal ${gridRevealed ? 'revealed' : ''}`}>
            <div className="contact-card">
              <span className="contact-card-label">DIRECT INBOX</span>
              <h3 className="contact-headline">Drop a line directly</h3>
              <p className="contact-card-desc">
                Fastest way to get in touch. I typically respond within 24 hours.
              </p>

              {/* Copy Email Interactive Pill */}
              <div className="email-copy-box">
                <span className="email-text">{PERSONAL_INFO.email}</span>
                <button
                  type="button"
                  className={`copy-btn ${copied ? 'copied' : ''}`}
                  onClick={handleCopyEmail}
                  aria-label="Copy email address to clipboard"
                >
                  {copied ? (
                    <>
                      <Check size={14} />
                      <span>Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy size={14} />
                      <span>Copy</span>
                    </>
                  )}
                </button>
              </div>

              <div className="contact-divider" />

              {/* Verified Links Grid */}
              <span className="contact-card-label">VERIFIED PROFILES</span>
              <div className="verified-links-list">
                {verifiedLinks.map((link) => {
                  const Icon = link.icon;
                  return (
                    <a
                      key={link.label}
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="verified-link-item"
                    >
                      <div className="vl-left">
                        <div className="vl-icon-box">
                          <Icon size={16} />
                        </div>
                        <div className="vl-text-box">
                          <span className="vl-label">{link.label}</span>
                          <span className="vl-sub">{link.sub}</span>
                        </div>
                      </div>
                      <ArrowUpRight size={15} className="vl-arrow" />
                    </a>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Inquiry Form */}
          <div className={`contact-form-col scroll-reveal ${gridRevealed ? 'revealed delay-1' : ''}`}>
            <div className="contact-card">
              <span className="contact-card-label">SEND A MESSAGE</span>
              <h3 className="contact-headline">How can we work together?</h3>
              <p className="contact-card-desc">
                Fill in the details below to send a message directly to my inbox.
              </p>

              <form onSubmit={handleSubmit} className="inquiry-form" noValidate>
                <div className="form-group">
                  <label htmlFor="name" className="form-label">
                    Your Name / Organization
                  </label>
                  <input
                    id="name"
                    type="text"
                    className="form-input"
                    placeholder="e.g. Alex Chen (Founding Engineer / Recruiter)"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    disabled={isSubmitting}
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="email" className="form-label">
                    Your Email
                  </label>
                  <input
                    id="email"
                    type="email"
                    className="form-input"
                    placeholder="e.g. alex@company.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    disabled={isSubmitting}
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="message" className="form-label">
                    Project / Role Details
                  </label>
                  <textarea
                    id="message"
                    rows={4}
                    className="form-input form-textarea"
                    placeholder="Tell me about the role, project, or problem you want to solve..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    disabled={isSubmitting}
                    required
                  />
                </div>

                {status.msg && (
                  <div className={`form-status-alert ${status.state}`}>
                    {status.state === 'loading' && <Loader2 size={14} className="icon-spin" />}
                    <span>{status.msg}</span>
                  </div>
                )}

                <button type="submit" className="btn btn-primary btn-full" disabled={isSubmitting}>
                  {isSubmitting ? (
                    <>
                      <Loader2 size={15} className="icon-spin" />
                      <span>Sending Message...</span>
                    </>
                  ) : (
                    <>
                      <span>Send Message</span>
                      <Send size={15} />
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
