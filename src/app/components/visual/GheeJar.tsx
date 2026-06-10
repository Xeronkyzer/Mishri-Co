import { motion, useMotionValue, useSpring, useTransform } from 'motion/react';
import { useEffect, useRef } from 'react';

/**
 * CSS-3D Ghee jar built from layered radial gradients + SVG.
 * Tilts toward the cursor for parallax depth.
 */
export function GheeJar({ size = 360, interactive = true, float = true }: { size?: number; interactive?: boolean; float?: boolean }) {
  const ref = useRef<HTMLDivElement>(null);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rx = useSpring(useTransform(my, [-1, 1], [10, -10]), { stiffness: 120, damping: 18 });
  const ry = useSpring(useTransform(mx, [-1, 1], [-14, 14]), { stiffness: 120, damping: 18 });

  useEffect(() => {
    if (!interactive) return;
    const onMove = (e: MouseEvent) => {
      const w = window.innerWidth, h = window.innerHeight;
      mx.set((e.clientX / w - 0.5) * 2);
      my.set((e.clientY / h - 0.5) * 2);
    };
    window.addEventListener('mousemove', onMove);
    return () => window.removeEventListener('mousemove', onMove);
  }, [interactive, mx, my]);

  return (
    <div ref={ref} style={{ width: size, height: size, perspective: 1400 }} className="relative">
      {/* Halo */}
      <div className="absolute inset-0 rounded-full anim-spin-slow pointer-events-none"
        style={{ background: 'conic-gradient(from 0deg, transparent, var(--mishri-gold-glow), transparent 40%, var(--mishri-gold-glow), transparent 70%)', filter: 'blur(24px)', opacity: 0.5 }} />

      {/* Floor shadow */}
      <div className="absolute left-1/2 -translate-x-1/2 bottom-[6%] rounded-full"
        style={{ width: size * 0.55, height: size * 0.07, background: 'radial-gradient(ellipse, oklch(0.18 0.025 40 / 0.45), transparent 70%)', filter: 'blur(8px)' }}/>

      <motion.div
        className={`relative w-full h-full ${float ? 'anim-float' : ''}`}
        style={{ rotateX: rx, rotateY: ry, transformStyle: 'preserve-3d' }}
      >
        <svg viewBox="0 0 200 240" className="w-full h-full drop-shadow-[0_20px_30px_rgba(60,30,10,0.25)]">
          <defs>
            <radialGradient id="glass" cx="0.35" cy="0.35" r="0.9">
              <stop offset="0%" stopColor="#FFF6D2" stopOpacity="0.95"/>
              <stop offset="40%" stopColor="#F2C766" stopOpacity="0.95"/>
              <stop offset="80%" stopColor="#C8860A" stopOpacity="0.95"/>
              <stop offset="100%" stopColor="#6B4612" stopOpacity="1"/>
            </radialGradient>
            <linearGradient id="lid" x1="0" x2="0" y1="0" y2="1">
              <stop offset="0%" stopColor="#F4D67E"/>
              <stop offset="50%" stopColor="#C8860A"/>
              <stop offset="100%" stopColor="#7A4F0A"/>
            </linearGradient>
            <linearGradient id="reflex" x1="0" x2="1" y1="0" y2="0">
              <stop offset="0%" stopColor="white" stopOpacity="0"/>
              <stop offset="50%" stopColor="white" stopOpacity="0.55"/>
              <stop offset="100%" stopColor="white" stopOpacity="0"/>
            </linearGradient>
            <radialGradient id="inside" cx="0.5" cy="0.3" r="0.8">
              <stop offset="0%" stopColor="#FFE89A"/>
              <stop offset="100%" stopColor="#A56A0A"/>
            </radialGradient>
          </defs>

          {/* Jar body */}
          <path d="M40 90 Q40 70 60 65 L140 65 Q160 70 160 90 L158 200 Q158 220 138 224 L62 224 Q42 220 42 200 Z" fill="url(#glass)" stroke="#7A4F0A" strokeWidth="1.2" opacity="0.95"/>
          {/* Inside content */}
          <path d="M52 95 Q52 80 65 78 L135 78 Q148 80 148 95 L146 198 Q146 212 132 215 L68 215 Q54 212 54 198 Z" fill="url(#inside)" opacity="0.8"/>
          {/* Highlight strip */}
          <path d="M55 92 Q55 80 70 78 L82 78 L78 215 L62 213 Q52 210 52 200 Z" fill="url(#reflex)" opacity="0.55"/>
          {/* Soft right shadow */}
          <path d="M150 90 L154 200 Q154 218 138 222 L130 222 L132 86 Z" fill="black" opacity="0.18"/>

          {/* Label band */}
          <rect x="50" y="135" width="100" height="46" rx="3" fill="#FAF6EE" stroke="#C8860A" strokeWidth="0.6"/>
          <text x="100" y="153" textAnchor="middle" fontFamily="Cormorant Garamond, Georgia, serif" fontStyle="italic" fontSize="11" fill="#3B2A1A">Mishri &amp; Co.</text>
          <line x1="68" y1="158" x2="132" y2="158" stroke="#C8860A" strokeWidth="0.5"/>
          <text x="100" y="170" textAnchor="middle" fontFamily="Satoshi, sans-serif" fontWeight="700" fontSize="6" letterSpacing="1.8" fill="#C8860A">BILONA DESI GHEE</text>
          <text x="100" y="178" textAnchor="middle" fontFamily="Satoshi, sans-serif" fontSize="4" letterSpacing="1" fill="#7A7060">500 ML · A2 GIR COW</text>

          {/* Lid */}
          <ellipse cx="100" cy="60" rx="62" ry="8" fill="url(#lid)" stroke="#5B3B0A" strokeWidth="0.8"/>
          <rect x="38" y="36" width="124" height="28" rx="4" fill="url(#lid)" stroke="#5B3B0A" strokeWidth="0.8"/>
          <ellipse cx="100" cy="36" rx="62" ry="6" fill="#F4D67E"/>
          {/* Lid grooves */}
          {[42, 50, 58].map(y => <line key={y} x1="42" x2="158" y1={y} y2={y} stroke="#7A4F0A" strokeWidth="0.4" opacity="0.5"/>)}
          {/* Lid highlight */}
          <path d="M48 38 L60 38 L58 62 L48 62 Z" fill="white" opacity="0.35"/>

          {/* Brand seal */}
          <circle cx="100" cy="50" r="9" fill="#FAF6EE" stroke="#C8860A" strokeWidth="0.6"/>
          <text x="100" y="53" textAnchor="middle" fontFamily="Cormorant Garamond, serif" fontSize="9" fill="#C8860A" fontWeight="600">M</text>
        </svg>
      </motion.div>

      {/* Gold particles */}
      <Particles count={28} size={size} />
    </div>
  );
}

function Particles({ count, size }: { count: number; size: number }) {
  return (
    <div className="absolute inset-0 pointer-events-none">
      {Array.from({ length: count }).map((_, i) => {
        const a = (i / count) * Math.PI * 2 + (i % 3);
        const r = size * (0.45 + (i % 5) * 0.04);
        const x = Math.cos(a) * r + size / 2;
        const y = Math.sin(a) * r + size / 2;
        const s = 2 + (i % 4);
        const d = 6 + (i % 8);
        return (
          <span key={i}
            className="absolute rounded-full anim-drift"
            style={{
              left: x, top: y, width: s, height: s,
              background: 'var(--mishri-gold)',
              boxShadow: '0 0 6px var(--mishri-gold)',
              opacity: 0.45 + (i % 3) * 0.15,
              animationDelay: `${(i % 7) * 0.7}s`,
              animationDuration: `${d}s`,
            }}/>
        );
      })}
    </div>
  );
}
