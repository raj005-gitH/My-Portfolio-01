import { useEffect, useRef, useState } from 'react';

/**
 * useScrollReveal Hook
 * 
 * High-performance, lightweight scroll-reveal observer.
 * - Uses IntersectionObserver to trigger once when element reaches viewport.
 * - Supports custom threshold and rootMargin.
 * - Respects prefers-reduced-motion (reveals immediately).
 * - Safe fallback if IntersectionObserver is unavailable.
 */
export function useScrollReveal(options = {}) {
  const {
    threshold = 0.12,
    rootMargin = '0px 0px -40px 0px',
    triggerOnce = true
  } = options;

  const ref = useRef(null);
  const [isRevealed, setIsRevealed] = useState(false);

  useEffect(() => {
    // Check reduced motion
    const prefersReducedMotion =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReducedMotion || typeof IntersectionObserver === 'undefined') {
      setIsRevealed(true);
      return;
    }

    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsRevealed(true);
          if (triggerOnce) {
            observer.unobserve(entry.target);
          }
        } else if (!triggerOnce) {
          setIsRevealed(false);
        }
      },
      { threshold, rootMargin }
    );

    observer.observe(node);

    return () => {
      if (node) observer.unobserve(node);
      observer.disconnect();
    };
  }, [threshold, rootMargin, triggerOnce]);

  return [ref, isRevealed];
}

/**
 * Custom hook to track active scroll section and section-aligned progress
 * 
 * Accurately aligns progress across the sections defined in the navbar:
 * - 0% at About
 * - 20% at Work
 * - 40% at Engineering
 * - 60% at Toolkit
 * - 80% at Education
 * - 100% at Contact
 */
export function useScrollProgress(navSectionIds = ['about', 'work', 'engineering', 'toolkit', 'education', 'contact']) {
  const [progress, setProgress] = useState(0);
  const [activeSection, setActiveSection] = useState('hero');
  const [activeSectionIndex, setActiveSectionIndex] = useState(-1);

  useEffect(() => {
    let ticking = false;

    const calculateSectionProgress = () => {
      const scrollY = window.scrollY;
      const headerOffset = 84; // Header height + comfortable breathing room

      const sectionElements = navSectionIds.map((id) => document.getElementById(id));
      const firstSection = sectionElements[0];

      // If user is in the Hero above the first navbar section
      if (firstSection) {
        const firstSectionTop = firstSection.offsetTop - headerOffset;
        if (scrollY < firstSectionTop) {
          setActiveSection('hero');
          setActiveSectionIndex(-1);
          setProgress(0);
          return;
        }
      }

      const totalIntervals = navSectionIds.length - 1; // 5 intervals for 6 sections
      const stepPercent = 100 / totalIntervals; // 20% per interval

      // Determine active section index
      let currentIndex = 0;
      for (let i = 0; i < sectionElements.length; i++) {
        const el = sectionElements[i];
        if (!el) continue;
        const top = el.offsetTop - headerOffset - 20;
        if (scrollY >= top) {
          currentIndex = i;
        }
      }

      setActiveSection(navSectionIds[currentIndex]);
      setActiveSectionIndex(currentIndex);

      // Interpolate progress smoothly between current section and next section
      if (currentIndex >= totalIntervals) {
        // Last section (Contact): smoothly transition to 100%
        const lastEl = sectionElements[totalIntervals];
        if (lastEl) {
          const lastTop = lastEl.offsetTop - headerOffset;
          const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
          const scrollDistance = Math.max(1, maxScroll - lastTop);
          const fraction = Math.max(0, Math.min(1, (scrollY - lastTop) / scrollDistance));
          const finalProgress = 100 - stepPercent + fraction * stepPercent;
          setProgress(Math.min(100, Math.max(0, finalProgress)));
        } else {
          setProgress(100);
        }
      } else {
        const currentEl = sectionElements[currentIndex];
        const nextEl = sectionElements[currentIndex + 1];

        if (currentEl && nextEl) {
          const currentTop = currentEl.offsetTop - headerOffset;
          const nextTop = nextEl.offsetTop - headerOffset;
          const sectionSpan = Math.max(1, nextTop - currentTop);
          const fraction = Math.max(0, Math.min(1, (scrollY - currentTop) / sectionSpan));

          const calculated = currentIndex * stepPercent + fraction * stepPercent;
          setProgress(Math.min(100, Math.max(0, calculated)));
        }
      }
    };

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          calculateSectionProgress();
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll, { passive: true });
    calculateSectionProgress();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, [navSectionIds]);

  return { progress, activeSection, activeSectionIndex };
}
