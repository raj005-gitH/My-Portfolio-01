import { useEffect, useRef } from 'react';

/**
 * SpaceshipCursor
 *
 * A premium cinematic cursor for desktop fine-pointer devices.
 * - SVG spaceship (20x28 px) positioned via refs and CSS transform
 * - Canvas particle trail rendered via requestAnimationFrame
 * - Zero React state updates during mouse movement
 * - Respects prefers-reduced-motion
 * - Auto-disabled on touch / coarse-pointer devices
 * - pointer-events: none throughout — clicks go straight to the page
 */
export default function SpaceshipCursor() {
  const shipRef = useRef(null);
  const canvasRef = useRef(null);
  const rafRef = useRef(null);
  const stateRef = useRef({
    x: -200, y: -200,   // smoothed position
    tx: -200, ty: -200, // mouse target
    px: -200, py: -200, // previous for velocity
    angle: 0,
    visible: false,
    isHover: false,
    particles: [],
    lastSpawnX: -200,
    lastSpawnY: -200,
  });

  useEffect(() => {
    // Guard: touch / coarse-pointer devices
    const isCoarse =
      typeof window !== 'undefined' &&
      window.matchMedia('(pointer: coarse)').matches;
    if (isCoarse) return;

    // Guard: reduced motion
    const prefersReduced =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const ship = shipRef.current;
    const canvas = canvasRef.current;
    if (!ship || !canvas) return;

    // Hide native cursor
    document.documentElement.style.cursor = 'none';

    // Canvas sizing
    const dpr = window.devicePixelRatio || 1;
    let W = window.innerWidth;
    let H = window.innerHeight;

    const resizeCanvas = () => {
      W = window.innerWidth;
      H = window.innerHeight;
      canvas.width = W * dpr;
      canvas.height = H * dpr;
      canvas.style.width = W + 'px';
      canvas.style.height = H + 'px';
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const ctx = canvas.getContext('2d');
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas, { passive: true });

    // Particle system
    const MAX_PARTICLES = 28;

    function spawnParticle(x, y) {
      const s = stateRef.current;
      if (s.particles.length >= MAX_PARTICLES) s.particles.shift();
      const isAmber = Math.random() > 0.6;
      s.particles.push({
        x: x + (Math.random() - 0.5) * 3,
        y: y + (Math.random() - 0.5) * 3,
        vx: (Math.random() - 0.5) * 0.35,
        vy: (Math.random() - 0.5) * 0.35,
        life: 1,
        decay: Math.random() * 0.048 + 0.028,
        radius: Math.random() * 1.6 + 0.5,
        isAmber,
      });
    }

    const LERP = 0.18;

    function tick() {
      const s = stateRef.current;
      rafRef.current = requestAnimationFrame(tick);

      // Smooth position
      s.x += (s.tx - s.x) * LERP;
      s.y += (s.ty - s.y) * LERP;

      // Tilt toward movement direction
      if (!prefersReduced) {
        const vx = s.x - s.px;
        const vy = s.y - s.py;
        if (Math.hypot(vx, vy) > 0.3) {
          const target = Math.atan2(vy, vx) * (180 / Math.PI) + 90;
          let delta = target - s.angle;
          if (delta > 180) delta -= 360;
          if (delta < -180) delta += 360;
          s.angle += delta * 0.1;
        }
      }
      s.px = s.x;
      s.py = s.y;

      // Move SVG ship
      const scale = s.isHover ? 1.18 : 1;
      ship.style.transform = `translate(${s.x}px, ${s.y}px) rotate(${s.angle}deg) scale(${scale})`;
      ship.style.opacity = s.visible ? '1' : '0';

      // Spawn trail particles
      if (!prefersReduced && s.visible) {
        const dx = s.x - s.lastSpawnX;
        const dy = s.y - s.lastSpawnY;
        const dist = Math.hypot(dx, dy);
        if (dist > 7) {
          const n = dist > 0 ? 1 / dist : 0;
          spawnParticle(s.x - dx * n * 12, s.y - dy * n * 12);
          s.lastSpawnX = s.x;
          s.lastSpawnY = s.y;
        }
      }

      // Draw canvas trail
      ctx.clearRect(0, 0, W, H);
      const parts = s.particles;
      for (let i = parts.length - 1; i >= 0; i--) {
        const p = parts[i];
        p.x += p.vx;
        p.y += p.vy;
        p.life -= p.decay;
        p.radius *= 0.972;

        if (p.life <= 0 || p.radius < 0.12) {
          parts.splice(i, 1);
          continue;
        }

        const alpha = p.life * (p.isAmber ? 0.52 : 0.36);
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = p.isAmber
          ? `rgba(229,176,103,${alpha.toFixed(3)})`
          : `rgba(200,208,225,${alpha.toFixed(3)})`;
        ctx.fill();
      }
    }

    rafRef.current = requestAnimationFrame(tick);

    // Mouse events
    const onMove = (e) => {
      const s = stateRef.current;
      s.tx = e.clientX;
      s.ty = e.clientY;
      if (!s.visible) {
        s.x = e.clientX; s.y = e.clientY;
        s.px = e.clientX; s.py = e.clientY;
        s.visible = true;
      }
    };
    const onLeave = () => { stateRef.current.visible = false; };
    const onEnter = () => { stateRef.current.visible = true; };
    const onOver = (e) => {
      stateRef.current.isHover =
        e.target.closest('a,button,[role="button"],input,textarea,select,label') !== null;
    };
    const onVisibility = () => {
      if (document.hidden) {
        if (rafRef.current) { cancelAnimationFrame(rafRef.current); rafRef.current = null; }
      } else {
        if (!rafRef.current) rafRef.current = requestAnimationFrame(tick);
      }
    };

    document.addEventListener('mousemove', onMove, { passive: true });
    document.addEventListener('mouseleave', onLeave);
    document.addEventListener('mouseenter', onEnter);
    document.addEventListener('mouseover', onOver, { passive: true });
    document.addEventListener('visibilitychange', onVisibility);

    return () => {
      document.documentElement.style.cursor = '';
      document.removeEventListener('mousemove', onMove);
      document.removeEventListener('mouseleave', onLeave);
      document.removeEventListener('mouseenter', onEnter);
      document.removeEventListener('mouseover', onOver);
      document.removeEventListener('visibilitychange', onVisibility);
      window.removeEventListener('resize', resizeCanvas);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <>
      {/* Canvas — trail particles layer, below ship */}
      <canvas
        ref={canvasRef}
        aria-hidden="true"
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          pointerEvents: 'none',
          zIndex: 9998,
        }}
      />

      {/*
        SVG Ship — fixed at (0,0); positioned via CSS transform.
        Hotspot: the nose tip sits at the actual cursor point.
        marginLeft: -10 (half width), marginTop: -3 (near nose tip)
      */}
      <div
        ref={shipRef}
        aria-hidden="true"
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: 20,
          height: 28,
          marginLeft: -10,
          marginTop: -3,
          pointerEvents: 'none',
          zIndex: 9999,
          willChange: 'transform, opacity',
          transition: 'opacity 0.12s ease',
        }}
      >
        <svg
          viewBox="0 0 20 28"
          width="20"
          height="28"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          overflow="visible"
        >
          {/* Main hull — clean teardrop body */}
          <path
            d="M10 1 C10 1,17 10,17 17 C17 22,13.5 26,10 26 C6.5 26,3 22,3 17 C3 10,10 1,10 1Z"
            fill="#ced3de"
            fillOpacity="0.9"
          />
          {/* Cockpit — amber accent */}
          <ellipse cx="10" cy="11" rx="2.8" ry="3.4" fill="#e5b067" fillOpacity="0.8" />
          {/* Cockpit highlight */}
          <ellipse cx="9.2" cy="9.8" rx="1.0" ry="1.4" fill="#ffffff" fillOpacity="0.35" />
          {/* Left wing */}
          <path d="M3 17 L0 21.5 L4.5 19.5Z" fill="#a8b0c0" fillOpacity="0.85" />
          {/* Right wing */}
          <path d="M17 17 L20 21.5 L15.5 19.5Z" fill="#a8b0c0" fillOpacity="0.85" />
          {/* Engine nozzle */}
          <ellipse cx="10" cy="25.2" rx="2.2" ry="0.9" fill="#7a8292" fillOpacity="0.7" />
          {/* Engine glow — dim amber */}
          <ellipse cx="10" cy="26.6" rx="1.6" ry="0.75" fill="#e5b067" fillOpacity="0.22" />
          {/* Hull centre line */}
          <line x1="10" y1="14" x2="10" y2="23.5"
            stroke="#8891a4" strokeWidth="0.55" strokeOpacity="0.4" />
        </svg>
      </div>
    </>
  );
}
