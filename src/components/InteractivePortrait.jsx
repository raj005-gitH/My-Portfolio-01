import React, { useEffect, useRef, useState } from 'react';
import { PERSONAL_INFO } from '../data/portfolioData';
import { Sparkles, Eye, Zap, Crosshair } from 'lucide-react';

/**
 * InteractivePortrait Component
 *
 * Implements an intensely tactile, actively visible cinematic portrait experience:
 * - 3D Parallax tilt responding dynamically to cursor movement
 * - Dynamic cursor spotlight & warm amber specular sheen
 * - Interactive Canvas depth & particle field with active laser proximity beams
 * - Tactile click shockwave ripple & golden sparks explosion
 * - Live HUD coordinate telemetry tracking cursor in real-time
 * - Mode toggle on click with visible visual feedback
 */
export default function InteractivePortrait() {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);
  const [useFallback, setUseFallback] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isPressed, setIsPressed] = useState(false);
  const [clickCount, setClickCount] = useState(0);
  const [activeMode, setActiveMode] = useState('STANDARD');
  const [coords, setCoords] = useState({ x: 220, y: 275, normX: 0, normY: 0 });
  const [tiltStyle, setTiltStyle] = useState({
    transform: 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)'
  });
  const [spotlightPos, setSpotlightPos] = useState({ x: 50, y: 50 });

  // Physics & Animation references
  const pointerRef = useRef({
    x: 220,
    y: 275,
    targetX: 220,
    targetY: 275,
    active: false
  });

  const sparksRef = useRef([]);
  const shockwavesRef = useRef([]);

  const modes = [
    { id: 'STANDARD', label: 'NEURAL DEPTH', color: '#e5b067' },
    { id: 'ENHANCED', label: 'AMBER MATRIX', color: '#f59e0b' },
    { id: 'SPECTRUM', label: 'QUANTUM PULSE', color: '#38bdf8' }
  ];

  const currentModeInfo = modes.find((m) => m.id === activeMode) || modes[0];

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId;
    let width = (canvas.width = canvas.parentElement.clientWidth);
    let height = (canvas.height = canvas.parentElement.clientHeight);

    // Grid Particles
    const particles = [];
    const numCols = 16;
    const numRows = 20;
    const colSpacing = width / (numCols + 1);
    const rowSpacing = height / (numRows + 1);

    for (let c = 1; c <= numCols; c++) {
      for (let r = 1; r <= numRows; r++) {
        const originX = c * colSpacing + (Math.random() - 0.5) * 8;
        const originY = r * rowSpacing + (Math.random() - 0.5) * 8;

        particles.push({
          x: originX,
          y: originY,
          originX,
          originY,
          vx: 0,
          vy: 0,
          radius: Math.random() * 2 + 1.2,
          baseAlpha: Math.random() * 0.4 + 0.25,
          alpha: 0.3,
          isAmber: Math.random() > 0.4
        });
      }
    }

    const handleResize = () => {
      if (!canvas.parentElement) return;
      width = canvas.width = canvas.parentElement.clientWidth;
      height = canvas.height = canvas.parentElement.clientHeight;
    };
    window.addEventListener('resize', handleResize);

    let isVisible = true;
    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisible = entry.isIntersecting;
        if (isVisible && !animationFrameId) {
          render();
        }
      },
      { threshold: 0.05 }
    );

    if (canvas.parentElement) {
      observer.observe(canvas.parentElement);
    }

    // Animation Loop
    let time = 0;
    const render = () => {
      if (!isVisible) {
        animationFrameId = null;
        return;
      }

      time += 0.025;
      ctx.clearRect(0, 0, width, height);

      // Smooth pointer easing
      const p = pointerRef.current;
      p.x += (p.targetX - p.x) * 0.15;
      p.y += (p.targetY - p.y) * 0.15;

      // 1. Draw Shockwaves (From Clicks)
      const shockwaves = shockwavesRef.current;
      for (let i = shockwaves.length - 1; i >= 0; i--) {
        const sw = shockwaves[i];
        sw.radius += sw.speed;
        sw.alpha -= sw.decay;

        if (sw.alpha <= 0) {
          shockwaves.splice(i, 1);
          continue;
        }

        ctx.save();
        ctx.beginPath();
        ctx.arc(sw.x, sw.y, sw.radius, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(229, 176, 103, ${sw.alpha})`;
        ctx.lineWidth = sw.lineWidth;
        ctx.shadowColor = '#e5b067';
        ctx.shadowBlur = 15;
        ctx.stroke();

        // Secondary inner glowing ripple
        ctx.beginPath();
        ctx.arc(sw.x, sw.y, sw.radius * 0.7, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(255, 255, 255, ${sw.alpha * 0.6})`;
        ctx.lineWidth = 1;
        ctx.stroke();
        ctx.restore();
      }

      // 2. Draw Sparks (From Clicks)
      const sparks = sparksRef.current;
      for (let i = sparks.length - 1; i >= 0; i--) {
        const sp = sparks[i];
        sp.x += sp.vx;
        sp.y += sp.vy;
        sp.vy += 0.12; // gentle gravity
        sp.vx *= 0.96; // drag
        sp.alpha -= sp.decay;

        if (sp.alpha <= 0) {
          sparks.splice(i, 1);
          continue;
        }

        ctx.save();
        ctx.beginPath();
        ctx.arc(sp.x, sp.y, sp.size, 0, Math.PI * 2);
        ctx.fillStyle = sp.color ? sp.color.replace('ALPHA', sp.alpha.toFixed(2)) : `rgba(245, 158, 11, ${sp.alpha})`;
        ctx.shadowColor = '#f59e0b';
        ctx.shadowBlur = 8;
        ctx.fill();
        ctx.restore();
      }

      // 3. Draw Particles & Proximity Beams
      for (let i = 0; i < particles.length; i++) {
        const pt = particles[i];

        // Distance to pointer
        const dx = p.x - pt.x;
        const dy = p.y - pt.y;
        const dist = Math.hypot(dx, dy);
        const maxDist = 130;

        if (p.active && dist < maxDist) {
          // Actively react to cursor
          const force = (1 - dist / maxDist) * 22;
          const angle = Math.atan2(dy, dx);
          pt.vx -= Math.cos(angle) * force * 0.2;
          pt.vy -= Math.sin(angle) * force * 0.2;
          pt.alpha = Math.min(pt.baseAlpha + 0.6, 1);

          // DRAW VISIBLE LASER / PROXIMITY BEAM TO CURSOR
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(pt.x, pt.y);
          const beamAlpha = (1 - dist / maxDist) * 0.45;
          ctx.strokeStyle = pt.isAmber
            ? `rgba(229, 176, 103, ${beamAlpha})`
            : `rgba(255, 255, 255, ${beamAlpha * 0.7})`;
          ctx.lineWidth = 1;
          ctx.stroke();
        } else {
          // Ambient gentle floating
          const ambient = Math.sin(time + pt.originX * 0.03) * 2;
          const targetX = pt.originX;
          const targetY = pt.originY + ambient;

          // Spring physics
          const spring = 0.05;
          const friction = 0.82;
          pt.vx += (targetX - pt.x) * spring;
          pt.vy += (targetY - pt.y) * spring;
          pt.vx *= friction;
          pt.vy *= friction;
          pt.alpha += (pt.baseAlpha - pt.alpha) * 0.05;
        }

        pt.x += pt.vx;
        pt.y += pt.vy;

        // Render Particle Dot
        ctx.beginPath();
        ctx.arc(pt.x, pt.y, pt.radius, 0, Math.PI * 2);
        if (pt.isAmber) {
          ctx.fillStyle = `rgba(229, 176, 103, ${pt.alpha})`;
          ctx.shadowColor = 'rgba(229, 176, 103, 0.6)';
          ctx.shadowBlur = 6;
        } else {
          ctx.fillStyle = `rgba(255, 255, 255, ${pt.alpha * 0.9})`;
          ctx.shadowColor = 'transparent';
          ctx.shadowBlur = 0;
        }
        ctx.fill();
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      observer.disconnect();
      window.removeEventListener('resize', handleResize);
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  }, []);

  // Handle Pointer Movement (Hover & 3D Tilt)
  const handlePointerMove = (e) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    // Normalized coords (-1 to 1)
    const normX = ((x / rect.width) - 0.5) * 2;
    const normY = ((y / rect.height) - 0.5) * 2;

    pointerRef.current.targetX = x;
    pointerRef.current.targetY = y;
    pointerRef.current.active = true;

    setCoords({
      x: Math.round(x),
      y: Math.round(y),
      normX: normX.toFixed(2),
      normY: normY.toFixed(2)
    });

    setSpotlightPos({
      x: ((x / rect.width) * 100).toFixed(1),
      y: ((y / rect.height) * 100).toFixed(1)
    });

    // 3D Parallax Tilt calculation
    const maxTilt = 12; // degrees
    const rotateY = normX * maxTilt;
    const rotateX = -normY * maxTilt;

    setTiltStyle({
      transform: `perspective(900px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) scale3d(1.025, 1.025, 1.025)`
    });

    setIsHovered(true);
  };

  const handlePointerLeave = () => {
    pointerRef.current.targetX = 220;
    pointerRef.current.targetY = 275;
    pointerRef.current.active = false;
    setIsHovered(false);
    setIsPressed(false);

    // Reset 3D Tilt smoothly
    setTiltStyle({
      transform: 'perspective(900px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)'
    });
  };

  // Handle Active Clicking
  const handleClick = (e) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    setIsPressed(true);
    setTimeout(() => setIsPressed(false), 200);

    // 1. Spawn Shockwave Ripple
    shockwavesRef.current.push({
      x,
      y,
      radius: 5,
      speed: 7,
      lineWidth: 3.5,
      alpha: 0.95,
      decay: 0.025
    });

    // 2. Spawn Golden Sparks Burst
    const sparkColors = [
      'rgba(229, 176, 103, ALPHA)',
      'rgba(245, 158, 11, ALPHA)',
      'rgba(255, 255, 255, ALPHA)',
      'rgba(251, 191, 36, ALPHA)'
    ];

    for (let i = 0; i < 28; i++) {
      const angle = (Math.PI * 2 * i) / 28 + (Math.random() - 0.5) * 0.5;
      const speed = Math.random() * 7 + 3.5;
      sparksRef.current.push({
        x,
        y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        size: Math.random() * 2.5 + 1.2,
        alpha: 1,
        decay: Math.random() * 0.025 + 0.015,
        color: sparkColors[Math.floor(Math.random() * sparkColors.length)]
      });
    }

    // 3. Cycle Mode & Counter
    setClickCount((prev) => prev + 1);
    const nextModeIdx = (modes.findIndex((m) => m.id === activeMode) + 1) % modes.length;
    setActiveMode(modes[nextModeIdx].id);
  };

  const portraitSrc = useFallback
    ? '/portrait-placeholder.svg'
    : PERSONAL_INFO.portraitPath;

  return (
    <div
      ref={containerRef}
      className={`portrait-stage-container ${isHovered ? 'stage-hovered' : ''} ${isPressed ? 'stage-pressed' : ''}`}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      onClick={handleClick}
      aria-label="Interactive Portrait of Jayraj Singh — Click or Hover to interact"
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          handleClick({
            clientX: containerRef.current.getBoundingClientRect().left + 220,
            clientY: containerRef.current.getBoundingClientRect().top + 275
          });
        }
      }}
    >
      {/* 3D Tilted Card Stage */}
      <div
        className={`portrait-card-wrapper ${isHovered ? 'hovered' : ''} ${isPressed ? 'pressed' : ''}`}
        style={tiltStyle}
      >
        {/* Dynamic Spotlight Sheen following pointer */}
        <div
          className="portrait-dynamic-spotlight"
          style={{
            background: `radial-gradient(circle 240px at ${spotlightPos.x}% ${spotlightPos.y}%, rgba(229, 176, 103, ${isHovered ? '0.35' : '0.12'}) 0%, rgba(229, 176, 103, 0.05) 50%, transparent 80%)`
          }}
          aria-hidden="true"
        />

        {/* Ambient Warm Amber Rim Glow */}
        <div className="portrait-rim-light" aria-hidden="true" />

        {/* The Image Element */}
        <img
          src={portraitSrc}
          alt="Jayraj Singh — Software Builder"
          className="portrait-main-image"
          onError={() => {
            setUseFallback(true);
          }}
        />

        {/* Halftone & Subtle Scanline Texture Overlay */}
        <div className="portrait-halftone-overlay" aria-hidden="true" />

        {/* High-Precision Interactive Canvas Layer (Z-index above image) */}
        <canvas ref={canvasRef} className="portrait-canvas-overlay" aria-hidden="true" />

        {/* Active HUD Telemetry Overlay */}
        <div className="portrait-tech-hud">
          <div className="hud-top">
            <span className="hud-tag">
              <Crosshair size={12} className="hud-tag-icon" />
              <span>FIG. 01 — {currentModeInfo.label}</span>
            </span>
            <span className="hud-status">
              <span className={`hud-status-dot ${isHovered ? 'active-pulse' : ''}`} />
              <span>{isHovered ? 'TRACKING' : 'READY'}</span>
            </span>
          </div>

          {/* Central Flash on Click */}
          {isPressed && (
            <div className="hud-click-flash" aria-hidden="true">
              <span>SCAN PULSE #{clickCount}</span>
            </div>
          )}

          <div className="hud-bottom">
            <span className="hud-coord">
              LOC [{coords.x}, {coords.y}] • TILT [{coords.normX}, {coords.normY}]
            </span>
            <span className="hud-id">DEV.ID #JS-27</span>
          </div>
        </div>
      </div>

      {/* Floating Status Pill & Interactive Hint */}
      <div className="portrait-status-pill">
        <span className="status-ping" />
        <span className="status-text">
          {isHovered ? 'CLICK TO TRIGGER ENERGY BURST' : 'Building Scalable Systems & Products'}
        </span>
        {clickCount > 0 && (
          <span className="click-counter-badge">
            <Zap size={11} />
            <span>{clickCount}</span>
          </span>
        )}
      </div>
    </div>
  );
}
