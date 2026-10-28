import React, { useEffect, useState, useRef } from 'react';

// Sparse, clearly visible collection of 26 stars across the viewport (scaled to ~13 on mobile)
const STARS_DATA = [
  // Upper quadrant
  { id: 1, top: '9%', left: '8%', size: 2.2, color: 'rgba(235, 242, 255, 0.82)', twinkle: 'twinkle-slow', delay: '0s', dur: '5.2s' },
  { id: 2, top: '14%', left: '86%', size: 3.2, color: 'rgba(229, 176, 103, 0.92)', twinkle: 'twinkle-slow', delay: '1.2s', dur: '6.4s', glow: true }, // Amber accent with glow
  { id: 3, top: '18%', left: '22%', size: 2.0, color: 'rgba(205, 218, 235, 0.72)', twinkle: null },
  { id: 4, top: '22%', left: '72%', size: 2.5, color: 'rgba(240, 245, 255, 0.85)', twinkle: null },
  { id: 5, top: '27%', left: '94%', size: 2.0, color: 'rgba(210, 222, 240, 0.75)', twinkle: 'twinkle-slow', delay: '2.4s', dur: '6.8s' },
  { id: 6, top: '31%', left: '12%', size: 3.0, color: 'rgba(245, 248, 255, 0.88)', twinkle: null },

  // Mid quadrant
  { id: 7, top: '37%', left: '89%', size: 2.2, color: 'rgba(205, 218, 235, 0.72)', twinkle: null },
  { id: 8, top: '42%', left: '18%', size: 2.5, color: 'rgba(229, 176, 103, 0.88)', twinkle: 'twinkle-slow', delay: '0.8s', dur: '5.8s' }, // Amber accent
  { id: 9, top: '46%', left: '80%', size: 3.5, color: 'rgba(245, 248, 255, 0.95)', twinkle: 'twinkle-slow', delay: '2.8s', dur: '7.2s', glow: true }, // Crisp white accent
  { id: 10, top: '50%', left: '95%', size: 2.0, color: 'rgba(215, 225, 242, 0.75)', twinkle: null },
  { id: 11, top: '54%', left: '7%', size: 2.2, color: 'rgba(205, 218, 235, 0.7)', twinkle: null },
  { id: 12, top: '58%', left: '87%', size: 2.6, color: 'rgba(235, 242, 255, 0.82)', twinkle: null },

  // Lower-mid quadrant
  { id: 13, top: '63%', left: '14%', size: 2.0, color: 'rgba(210, 222, 240, 0.74)', twinkle: null },
  { id: 14, top: '67%', left: '76%', size: 2.8, color: 'rgba(229, 176, 103, 0.9)', twinkle: 'twinkle-slow', delay: '1.8s', dur: '6.6s', glow: true }, // Amber accent
  { id: 15, top: '71%', left: '92%', size: 2.2, color: 'rgba(240, 245, 255, 0.84)', twinkle: null },
  { id: 16, top: '74%', left: '6%', size: 2.4, color: 'rgba(205, 218, 235, 0.72)', twinkle: null },
  { id: 17, top: '78%', left: '83%', size: 3.0, color: 'rgba(245, 248, 255, 0.88)', twinkle: null },
  { id: 18, top: '81%', left: '20%', size: 2.0, color: 'rgba(210, 222, 240, 0.7)', twinkle: null },

  // Base quadrant
  { id: 19, top: '85%', left: '94%', size: 2.5, color: 'rgba(235, 242, 255, 0.82)', twinkle: 'twinkle-slow', delay: '3.2s', dur: '7.5s' },
  { id: 20, top: '88%', left: '10%', size: 2.2, color: 'rgba(229, 176, 103, 0.85)', twinkle: null }, // Amber accent
  { id: 21, top: '92%', left: '78%', size: 2.0, color: 'rgba(205, 218, 235, 0.72)', twinkle: null },
  { id: 22, top: '95%', left: '16%', size: 2.4, color: 'rgba(240, 245, 255, 0.85)', twinkle: null },
  { id: 23, top: '97%', left: '88%', size: 2.8, color: 'rgba(235, 242, 255, 0.8)', twinkle: null },
];

export default function SpaceAtmosphere() {
  const [isActive, setIsActive] = useState(false);
  const [parallax, setParallax] = useState({ x: 0, y: 0 });
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const layerRef = useRef(null);

  // 1. Detect Reduced Motion
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);

    const handleMediaChange = (e) => setPrefersReducedMotion(e.matches);
    mediaQuery.addEventListener('change', handleMediaChange);
    return () => mediaQuery.removeEventListener('change', handleMediaChange);
  }, []);

  // 2. IntersectionObserver on Hero to activate ONLY below Hero
  useEffect(() => {
    const heroEl = document.getElementById('hero');
    if (!heroEl) return;

    const checkHeroVisibility = () => {
      const rect = heroEl.getBoundingClientRect();
      // Hero bottom is near or above 40% of viewport -> user has scrolled down into lower sections
      const scrolledPast = rect.bottom < window.innerHeight * 0.4;
      setIsActive(scrolledPast);
    };

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        // When hero is substantially in view (> 15% visible), deactivate space effect
        if (entry.isIntersecting && entry.intersectionRatio > 0.15) {
          setIsActive(false);
        } else {
          checkHeroVisibility();
        }
      },
      {
        threshold: [0, 0.15, 0.5, 0.8, 1.0],
      }
    );

    observer.observe(heroEl);

    // Passive scroll check as fallback
    window.addEventListener('scroll', checkHeroVisibility, { passive: true });
    checkHeroVisibility();

    return () => {
      observer.disconnect();
      window.removeEventListener('scroll', checkHeroVisibility);
    };
  }, []);

  // 3. Subtle desktop pointer parallax (very restrained: max ±4px stars, ±7px asteroids)
  useEffect(() => {
    if (!isActive || prefersReducedMotion) return;

    if (window.matchMedia('(pointer: coarse)').matches) return;

    let rafId = null;
    let targetX = 0;
    let targetY = 0;
    let currentX = 0;
    let currentY = 0;

    const handlePointerMove = (e) => {
      const { innerWidth, innerHeight } = window;
      const normX = (e.clientX / innerWidth) * 2 - 1;
      const normY = (e.clientY / innerHeight) * 2 - 1;
      targetX = normX * 6;
      targetY = normY * 6;
    };

    const animateParallax = () => {
      currentX += (targetX - currentX) * 0.05;
      currentY += (targetY - currentY) * 0.05;
      setParallax({ x: currentX, y: currentY });
      rafId = requestAnimationFrame(animateParallax);
    };

    window.addEventListener('pointermove', handlePointerMove, { passive: true });
    rafId = requestAnimationFrame(animateParallax);

    return () => {
      window.removeEventListener('pointermove', handlePointerMove);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, [isActive, prefersReducedMotion]);

  return (
    <div
      ref={layerRef}
      className={`space-atmosphere-layer ${isActive ? 'is-active' : ''}`}
      aria-hidden="true"
    >
      {/* 1. Visible, Clear Stars Field */}
      <div
        className="stars-container"
        style={
          !prefersReducedMotion
            ? { transform: `translate3d(${parallax.x * 0.6}px, ${parallax.y * 0.6}px, 0)` }
            : undefined
        }
      >
        {STARS_DATA.map((star) => (
          <span
            key={star.id}
            className={`space-star ${star.twinkle || ''} ${star.glow ? 'star-glow' : ''}`}
            style={{
              top: star.top,
              left: star.left,
              width: `${star.size}px`,
              height: `${star.size}px`,
              backgroundColor: star.color,
              animationDelay: star.delay || '0s',
              animationDuration: star.dur || '6s',
            }}
          />
        ))}
      </div>

      {/* 2. Distinct, Understated Asteroids (3 across the experience in outer gutters) */}
      <div
        className="asteroids-container"
        style={
          !prefersReducedMotion
            ? { transform: `translate3d(${parallax.x * 1.2}px, ${parallax.y * 1.2}px, 0)` }
            : undefined
        }
      >
        {/* Asteroid 1: Upper right margin (~48px x 42px) */}
        <div className="space-asteroid asteroid-1" style={{ top: '20%', right: '3.5%' }}>
          <svg
            width="48"
            height="42"
            viewBox="0 0 48 42"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="asteroid-svg"
          >
            <defs>
              <linearGradient id="ast1-body" x1="15%" y1="0%" x2="85%" y2="100%">
                <stop offset="0%" stopColor="#32384a" />
                <stop offset="40%" stopColor="#1e2230" />
                <stop offset="100%" stopColor="#10121a" />
              </linearGradient>
              <linearGradient id="ast1-rim-amber" x1="0%" y1="0%" x2="50%" y2="50%">
                <stop offset="0%" stopColor="rgba(229, 176, 103, 0.65)" />
                <stop offset="100%" stopColor="transparent" />
              </linearGradient>
              <linearGradient id="ast1-facet" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="rgba(255, 255, 255, 0.08)" />
                <stop offset="100%" stopColor="transparent" />
              </linearGradient>
            </defs>
            <polygon points="12,2 30,3 44,14 46,28 34,39 16,38 4,26 2,12" fill="url(#ast1-body)" />
            <polygon points="12,2 24,16 4,26 2,12" fill="url(#ast1-facet)" />
            <polygon points="30,3 44,14 24,16" fill="rgba(0, 0, 0, 0.28)" />
            <polygon points="44,14 46,28 34,25 24,16" fill="rgba(0, 0, 0, 0.38)" />
            <polygon points="4,26 16,38 24,28 24,16" fill="rgba(255, 255, 255, 0.04)" />
            <polygon points="34,39 16,38 24,28 34,25" fill="rgba(0, 0, 0, 0.32)" />
            <polyline
              points="4,26 2,12 12,2 30,3"
              stroke="url(#ast1-rim-amber)"
              strokeWidth="1.6"
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="none"
            />
            <ellipse
              cx="28"
              cy="22"
              rx="3.5"
              ry="2.8"
              fill="rgba(12, 14, 20, 0.7)"
              stroke="rgba(255, 255, 255, 0.09)"
              strokeWidth="0.8"
            />
            <circle
              cx="16"
              cy="28"
              r="2"
              fill="rgba(10, 12, 18, 0.6)"
              stroke="rgba(255, 255, 255, 0.07)"
              strokeWidth="0.6"
            />
          </svg>
        </div>

        {/* Asteroid 2: Left margin gutter (~68px x 60px) - Primary rocky silhouette */}
        <div className="space-asteroid asteroid-2" style={{ top: '54%', left: '2.8%' }}>
          <svg
            width="68"
            height="60"
            viewBox="0 0 68 60"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="asteroid-svg"
          >
            <defs>
              <linearGradient id="ast2-body" x1="10%" y1="0%" x2="90%" y2="100%">
                <stop offset="0%" stopColor="#363e52" />
                <stop offset="35%" stopColor="#222838" />
                <stop offset="75%" stopColor="#141722" />
                <stop offset="100%" stopColor="#0b0d13" />
              </linearGradient>
              <linearGradient id="ast2-rim-amber" x1="0%" y1="0%" x2="45%" y2="45%">
                <stop offset="0%" stopColor="rgba(229, 176, 103, 0.75)" />
                <stop offset="60%" stopColor="rgba(229, 176, 103, 0.2)" />
                <stop offset="100%" stopColor="transparent" />
              </linearGradient>
              <linearGradient id="ast2-facet-top" x1="0%" y1="0%" x2="50%" y2="100%">
                <stop offset="0%" stopColor="rgba(255, 255, 255, 0.1)" />
                <stop offset="100%" stopColor="transparent" />
              </linearGradient>
            </defs>
            <polygon points="18,3 46,4 62,18 65,40 48,56 24,57 7,42 2,21" fill="url(#ast2-body)" />
            <polygon points="18,3 34,22 7,42 2,21" fill="url(#ast2-facet-top)" />
            <polygon points="46,4 62,18 34,22" fill="rgba(0, 0, 0, 0.22)" />
            <polygon points="62,18 65,40 42,36 34,22" fill="rgba(0, 0, 0, 0.42)" />
            <polygon points="65,40 48,56 36,44 42,36" fill="rgba(0, 0, 0, 0.52)" />
            <polygon points="7,42 24,57 36,44 34,22" fill="rgba(255, 255, 255, 0.05)" />
            <polyline
              points="7,42 2,21 18,3 46,4"
              stroke="url(#ast2-rim-amber)"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="none"
            />
            <ellipse
              cx="20"
              cy="30"
              rx="5.5"
              ry="4.2"
              fill="rgba(10, 12, 18, 0.75)"
              stroke="rgba(255, 255, 255, 0.12)"
              strokeWidth="1"
            />
            <ellipse
              cx="45"
              cy="24"
              rx="4"
              ry="3.2"
              fill="rgba(8, 10, 15, 0.7)"
              stroke="rgba(255, 255, 255, 0.08)"
              strokeWidth="0.8"
            />
            <circle
              cx="34"
              cy="46"
              r="3"
              fill="rgba(8, 10, 14, 0.65)"
              stroke="rgba(255, 255, 255, 0.07)"
              strokeWidth="0.7"
            />
          </svg>
        </div>

        {/* Asteroid 3: Lower right margin (~38px x 34px) - Depth companion */}
        <div className="space-asteroid asteroid-3" style={{ top: '80%', right: '4%' }}>
          <svg
            width="38"
            height="34"
            viewBox="0 0 38 34"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="asteroid-svg"
          >
            <defs>
              <linearGradient id="ast3-body" x1="0%" y1="15%" x2="100%" y2="85%">
                <stop offset="0%" stopColor="#303648" />
                <stop offset="45%" stopColor="#1c202d" />
                <stop offset="100%" stopColor="#0e1017" />
              </linearGradient>
              <linearGradient id="ast3-rim" x1="0%" y1="0%" x2="50%" y2="50%">
                <stop offset="0%" stopColor="rgba(210, 225, 245, 0.6)" />
                <stop offset="100%" stopColor="transparent" />
              </linearGradient>
            </defs>
            <polygon points="9,3 26,2 35,11 34,24 23,31 9,30 2,20 3,9" fill="url(#ast3-body)" />
            <polygon points="9,3 18,12 2,20 3,9" fill="rgba(255, 255, 255, 0.07)" />
            <polygon points="26,2 35,11 24,19 18,12" fill="rgba(0, 0, 0, 0.28)" />
            <polygon points="35,11 34,24 23,31 24,19" fill="rgba(0, 0, 0, 0.42)" />
            <polygon points="2,20 9,30 23,31 18,12" fill="rgba(255, 255, 255, 0.04)" />
            <polyline
              points="2,20 3,9 9,3 26,2"
              stroke="url(#ast3-rim)"
              strokeWidth="1.3"
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="none"
            />
            <circle
              cx="13"
              cy="22"
              r="2.4"
              fill="rgba(9, 11, 16, 0.7)"
              stroke="rgba(255, 255, 255, 0.08)"
              strokeWidth="0.6"
            />
          </svg>
        </div>
      </div>
    </div>
  );
}
