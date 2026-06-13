import { motion } from 'motion/react';
import { ImageWithFallback } from '../figma/ImageWithFallback';

/**
 * Editorial hero composition — a real ghee jar photo floating
 * over a warm olive halo, with a rotating Aaharvedik seal stamp.
 */
export function HeroJar() {
  return (
    <div className="relative w-full max-w-[520px] aspect-[4/5] mx-auto select-none">
      {/* Warm radial wash — olive green tones */}
      <div className="absolute inset-0 rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(closest-side, oklch(0.65 0.10 130 / 0.30), transparent 70%)', filter: 'blur(40px)' }} />

      {/* Stamped seal — top right */}
      <motion.div
        initial={{ rotate: -10, opacity: 0, scale: 0.8 }}
        animate={{ rotate: -10, opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, delay: 0.4 }}
        className="absolute top-2 right-2 sm:top-6 sm:right-2 z-20 size-24 sm:size-32 rounded-full grid place-items-center anim-spin-slow"
        style={{ background: 'transparent' }}
      >
        <svg viewBox="0 0 200 200" className="absolute inset-0 w-full h-full">
          <defs>
            <path id="circlepath" d="M 100, 100 m -76, 0 a 76,76 0 1,1 152,0 a 76,76 0 1,1 -152,0"/>
          </defs>
          <text fill="var(--mishri-text)" fontFamily="Outfit, sans-serif" fontSize="10" letterSpacing="5" fontWeight="600">
            <textPath href="#circlepath">AAHARVEDIK · PURE · NATURAL · DAIRY · </textPath>
          </text>
        </svg>
      </motion.div>

      {/* Jar image with frame */}
      <motion.div
        initial={{ y: 30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
        className="absolute inset-0 z-10"
      >
        <motion.div
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
          className="relative w-full h-full"
        >
          <div className="absolute inset-x-[12%] inset-y-[6%] rounded-[40px] overflow-hidden shadow-[0_30px_60px_-20px_rgba(40,50,20,0.40)]">
            <ImageWithFallback
              src="https://images.unsplash.com/photo-1573812461383-e5f8b759d12e?w=1200&q=85"
              alt="Aaharvedik bilona desi ghee jar"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 pointer-events-none"
              style={{ background: 'linear-gradient(135deg, oklch(0.90 0.06 128 / 0.15), transparent 40%, transparent 60%, oklch(0.20 0.03 130 / 0.12))' }}/>
          </div>

          <div className="absolute left-1/2 -translate-x-1/2 bottom-[2%] w-[55%] h-3 rounded-full"
            style={{ background: 'radial-gradient(ellipse, oklch(0.20 0.03 130 / 0.30), transparent 70%)', filter: 'blur(10px)' }}/>
        </motion.div>
      </motion.div>
    </div>
  );
}
