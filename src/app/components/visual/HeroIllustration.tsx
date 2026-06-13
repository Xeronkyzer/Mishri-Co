import { motion } from 'motion/react';

/**
 * High-fidelity minimal line-art illustration matching the Aaharvedik coming soon brand style:
 * - A dashed sun with overlapping honeycomb
 * - Wavy pasture hills
 * - Grazing cow and traditional milk churn pot
 * - Minimal plants with gold leaves
 */
export function HeroIllustration() {
  return (
    <div className="relative w-full max-w-[500px] aspect-[5/4] mx-auto select-none">
      {/* Soft warm radial background glow */}
      <div className="absolute inset-0 rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(closest-side, oklch(0.65 0.10 130 / 0.15), transparent 75%)', filter: 'blur(30px)' }} />

      <motion.svg
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
        viewBox="0 0 500 400"
        className="w-full h-full relative z-10"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Ticked Sun */}
        <circle cx="360" cy="150" r="54" stroke="oklch(0.75 0.12 90)" strokeWidth="1" />
        <circle cx="360" cy="150" r="66" stroke="oklch(0.75 0.12 90)" strokeWidth="1" strokeDasharray="1.5 10" />

        {/* Honeycomb overlap on the sun */}
        <g transform="translate(412, 105) scale(0.6)">
          {/* Hexagon 1 */}
          <polygon points="15,0 30,8.6 30,25.9 15,34.6 0,25.9 0,8.6" stroke="oklch(0.75 0.12 90)" strokeWidth="1.5" fill="oklch(0.975 0.008 88)" />
          {/* Hexagon 2 */}
          <polygon points="40,-14.4 55,-5.8 55,11.5 40,20.1 25,11.5 25,-5.8" stroke="oklch(0.75 0.12 90)" strokeWidth="1.5" fill="oklch(0.975 0.008 88)" transform="translate(-10, 20)"/>
          {/* Hexagon 3 */}
          <polygon points="15,-28.8 30,-20.2 30,-2.9 15,5.8 0,-2.9 0,-20.2" stroke="oklch(0.75 0.12 90)" strokeWidth="1.5" fill="oklch(0.975 0.008 88)" transform="translate(15, 12)"/>
        </g>

        {/* Hills / Landscape lines */}
        <path d="M 50 310 C 150 310, 220 230, 340 270 C 400 290, 450 320, 500 310" stroke="var(--mishri-text)" strokeWidth="1.2" strokeLinecap="round" />
        <path d="M 90 340 C 170 330, 240 285, 370 315 C 420 325, 460 335, 500 345" stroke="var(--mishri-text)" strokeWidth="1" strokeLinecap="round" />
        <path d="M 50 365 C 120 365, 180 325, 300 355 C 370 375, 440 365, 500 380" stroke="var(--mishri-text)" strokeWidth="0.8" strokeLinecap="round" />

        {/* Tree / plant on the left */}
        <g transform="translate(90, 280) scale(0.75)">
          <path d="M 10 40 Q 15 20, 10 0" stroke="var(--mishri-text)" strokeWidth="1.2" strokeLinecap="round" />
          <path d="M 10 0 C 0 -10, -5 -5, 10 0" fill="oklch(0.75 0.12 90)" stroke="var(--mishri-text)" strokeWidth="1" />
          <path d="M 10 0 C 20 -10, 25 -5, 10 0" fill="oklch(0.75 0.12 90)" stroke="var(--mishri-text)" strokeWidth="1" />
          <path d="M 12 15 C 22 10, 25 18, 12 15" fill="oklch(0.75 0.12 90)" stroke="var(--mishri-text)" strokeWidth="1" />
          <path d="M 8 25 C -2 20, -5 28, 8 25" fill="oklch(0.75 0.12 90)" stroke="var(--mishri-text)" strokeWidth="1" />
        </g>

        {/* Tree / plant on the right */}
        <g transform="translate(440, 275) scale(0.75)">
          <path d="M 10 40 Q 5 20, 10 0" stroke="var(--mishri-text)" strokeWidth="1.2" strokeLinecap="round" />
          <path d="M 10 0 C 0 -10, -5 -5, 10 0" fill="oklch(0.75 0.12 90)" stroke="var(--mishri-text)" strokeWidth="1" />
          <path d="M 10 0 C 20 -10, 25 -5, 10 0" fill="oklch(0.75 0.12 90)" stroke="var(--mishri-text)" strokeWidth="1" />
          <path d="M 9 18 C -1 13, -4 21, 9 18" fill="oklch(0.75 0.12 90)" stroke="var(--mishri-text)" strokeWidth="1" />
        </g>

        {/* Traditional milk churner/pot */}
        <g transform="translate(370, 222) scale(0.75)">
          {/* Pot body */}
          <path d="M 10 40 C 2 35, 0 25, 0 20 C 0 10, 10 8, 20 8 C 30 8, 40 10, 40 20 C 40 25, 38 35, 30 40 Z" stroke="var(--mishri-text)" strokeWidth="1.2" fill="var(--mishri-surface)" />
          {/* Pot neck */}
          <path d="M 12 8 L 28 8" stroke="var(--mishri-text)" strokeWidth="1.2" />
          {/* Pot lid & handles */}
          <path d="M 20 0 L 20 8" stroke="var(--mishri-text)" strokeWidth="1.2" />
          <path d="M 16 3 L 24 3" stroke="var(--mishri-text)" strokeWidth="1.2" />
          {/* Decorative lines */}
          <path d="M 3 20 Q 20 23, 37 20" stroke="var(--mishri-text)" strokeWidth="0.8" />
          <path d="M 4 25 Q 20 28, 36 25" stroke="var(--mishri-text)" strokeWidth="0.8" />
        </g>

        {/* Grazing Cow */}
        <g transform="translate(250, 218) scale(0.85)">
          <path d="M 40 25 C 40 15, 35 15, 15 15 C 5 15, 0 18, 0 25 C 0 35, 5 38, 15 38 C 35 38, 40 35, 40 25 Z" stroke="var(--mishri-text)" strokeWidth="1.2" fill="var(--mishri-surface)" />
          <path d="M 10 20 L -3 30 C -5 32, -8 30, -8 34 C -8 38, -4 38, -2 36 L 5 28 Z" stroke="var(--mishri-text)" strokeWidth="1.2" fill="var(--mishri-surface)" />
          <path d="M -3 30 Q -6 26, -5 28" stroke="var(--mishri-text)" strokeWidth="1.2" />
          <path d="M 8 38 L 8 50 M 12 38 L 12 50" stroke="var(--mishri-text)" strokeWidth="1.2" strokeLinecap="round" />
          <path d="M 28 38 L 28 50 M 32 38 L 32 50" stroke="var(--mishri-text)" strokeWidth="1.2" strokeLinecap="round" />
          <path d="M 40 20 Q 45 25, 43 35" stroke="var(--mishri-text)" strokeWidth="1.2" strokeLinecap="round" />
          <path d="M 14 18 Q 18 25, 22 20 Q 20 16, 14 18 Z" fill="var(--mishri-text)" opacity="0.15" />
          <path d="M 28 22 Q 33 28, 35 24 Q 32 18, 28 22 Z" fill="var(--mishri-text)" opacity="0.15" />
        </g>
      </motion.svg>
    </div>
  );
}
