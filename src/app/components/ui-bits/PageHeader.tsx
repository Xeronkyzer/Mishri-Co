import { motion } from 'motion/react';
import { SectionLabel } from './SectionLabel';

export function PageHeader({ eyebrow, title, italicWord, subtitle, hindi }: { eyebrow: string; title: React.ReactNode; italicWord?: string; subtitle?: string; hindi?: string }) {
  return (
    <div className="max-w-[1480px] mx-auto px-5 lg:px-10 pt-20 pb-6 sm:pt-28 sm:pb-8 lg:pt-40 lg:pb-14">
      <SectionLabel>{eyebrow}</SectionLabel>
      <motion.h1
        initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}
        className="font-display mt-4 text-balance"
        style={{ fontSize: 'var(--text-2xl)', lineHeight: 1.02, letterSpacing: '-0.02em' }}>
        {title}
        {italicWord && <span className="italic" style={{ color: 'var(--mishri-gold)' }}> {italicWord}</span>}
      </motion.h1>
      {hindi && <p className="mt-4 font-hindi text-[18px]" style={{ color: 'var(--mishri-gold)' }}>{hindi}</p>}
      {subtitle && <p className="mt-5 max-w-xl text-[16px] leading-relaxed" style={{ color: 'var(--mishri-text-muted)' }}>{subtitle}</p>}
    </div>
  );
}
