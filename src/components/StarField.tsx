import React, { useEffect, useRef } from 'react';

/**
 * Lightweight canvas star field with subtle parallax drift.
 * Stars twinkle and slowly drift. Occasional shooting star.
 */
export default function StarField() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let raf: number;
    interface Star {
      x: number;
      y: number;
      r: number;
      a: number;
      s: number;
      p: number;
      vy: number;
      color: string;
    }
    interface ShootingStar {
      x: number;
      y: number;
      vx: number;
      vy: number;
      life: number;
      maxLife: number;
    }

    let stars: Star[] = [];
    let shootingStars: ShootingStar[] = [];
    let w = 0;
    let h = 0;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = canvas.width = window.innerWidth * dpr;
      h = canvas.height = window.innerHeight * dpr;
      canvas.style.width = window.innerWidth + 'px';
      canvas.style.height = window.innerHeight + 'px';
      
      const count = Math.floor((window.innerWidth * window.innerHeight) / 6000);
      stars = Array.from({ length: count }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        r: Math.random() * 1.2 * dpr + 0.3,
        a: Math.random() * 0.8 + 0.2,
        s: Math.random() * 0.5 + 0.1, // twinkle speed
        p: Math.random() * Math.PI * 2,
        vy: (Math.random() * 0.02 + 0.005) * dpr,
        color: Math.random() > 0.90 ? '#e4e4e7' : '#a1a1aa'
      }));
    };

    const spawnShooting = () => {
      if (Math.random() < 0.003 && shootingStars.length < 2) {
        const dpr = Math.min(window.devicePixelRatio || 1, 2);
        shootingStars.push({
          x: Math.random() * w * 0.6,
          y: Math.random() * h * 0.3,
          vx: (4 + Math.random() * 3) * dpr,
          vy: (1.5 + Math.random() * 1) * dpr,
          life: 60,
          maxLife: 60
        });
      }
    };

    let t = 0;
    const tick = () => {
      t += 0.016;
      ctx.fillStyle = '#050505';
      ctx.fillRect(0, 0, w, h);

      // Render stars
      for (const s of stars) {
        const alpha = s.a * (0.6 + 0.4 * Math.sin(t * s.s * 2 + s.p));
        ctx.globalAlpha = alpha;
        ctx.fillStyle = s.color;
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fill();
        s.y -= s.vy;
        if (s.y < -5) s.y = h + 5;
      }
      ctx.globalAlpha = 1;

      // Shooting stars
      spawnShooting();
      shootingStars = shootingStars.filter((ss) => {
        ss.x += ss.vx;
        ss.y += ss.vy;
        ss.life -= 1;
        
        const grad = ctx.createLinearGradient(ss.x, ss.y, ss.x - ss.vx * 8, ss.y - ss.vy * 8);
        grad.addColorStop(0, `rgba(255, 255, 255, ${ss.life / ss.maxLife})`);
        grad.addColorStop(1, 'rgba(255, 255, 255, 0)');
        
        ctx.strokeStyle = grad;
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.moveTo(ss.x, ss.y);
        ctx.lineTo(ss.x - ss.vx * 8, ss.y - ss.vy * 8);
        ctx.stroke();
        
        return ss.life > 0 && ss.x < w + 50;
      });

      raf = requestAnimationFrame(tick);
    };

    resize();
    window.addEventListener('resize', resize);
    tick();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      data-testid="star-field-canvas"
      className="fixed inset-0 w-full h-full pointer-events-none"
      style={{ zIndex: 0 }}
    />
  );
}
