import { motion } from 'motion/react';
import { SectionLabel } from '../components/ui-bits/SectionLabel';
import { Leaf, Droplets, Sun } from 'lucide-react';
import { Link } from 'react-router';
import { ArrowRight } from 'lucide-react';

const pillars = [
  {
    icon: Leaf,
    num: '01',
    title: 'Pure Sourcing',
    desc: 'Only A2 milk from native desi cows. Free-grazing, naturally fed. No milk powder, no artificial supplements. Ever.',
  },
  {
    icon: Droplets,
    num: '02',
    title: 'Traditional Process',
    desc: 'Bilona-churned ghee, matka-set dahi, slow-reduced kulfi. We follow the methods that have been perfected over generations.',
  },
  {
    icon: Sun,
    num: '03',
    title: 'Natural Promise',
    desc: 'Zero additives, zero preservatives, zero artificial anything. What reaches you is exactly what comes from nature.',
  },
];

export function Story() {
  return (
    <>
      {/* ─── Hero ─── */}
      <section className="relative pt-24 lg:pt-40 pb-12 lg:pb-20 overflow-hidden">
        <div
          className="absolute right-0 top-20 size-[400px] lg:size-[500px] rounded-full opacity-[0.05] jali-bg anim-spin-slow pointer-events-none"
          aria-hidden="true"
        />
        <div className="max-w-[1000px] mx-auto px-5 lg:px-10 text-center">
          <SectionLabel>About Aaharvedik</SectionLabel>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.85 }}
            className="font-display mt-5 text-balance leading-[0.98]"
            style={{ fontSize: 'clamp(36px, 7vw, 90px)' }}
          >
            Purity is not <br />
            <span className="italic" style={{ color: 'var(--mishri-gold)' }}>
              a choice.
            </span>
            <br />
            It's a promise.
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.85, delay: 0.1 }}
            className="mt-5 font-hindi text-[17px] sm:text-[20px]"
            style={{ color: 'var(--mishri-gold)' }}
          >
            शुद्धता से कोई समझौता नहीं।
          </motion.p>
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.85, delay: 0.2 }}
            className="mt-5 max-w-xl mx-auto text-[15px] sm:text-[17px] leading-[1.85]"
            style={{ color: 'var(--mishri-text-muted)' }}
          >
            Aaharvedik was born from a simple belief: dairy should be pure, natural,
            and made with respect for tradition. We bring you products crafted the way
            they were meant to be — no shortcuts, no additives, just honest food.
          </motion.p>
        </div>
      </section>

      {/* ─── Pull quote ─── */}
      <section
        className="py-14 lg:py-20 relative"
        style={{ background: 'var(--mishri-surface-deep)', color: 'var(--mishri-text-inverse)' }}
        aria-label="Philosophy"
      >
        <div className="max-w-3xl mx-auto px-5 lg:px-10 text-center">
          <span
            className="text-[72px] sm:text-[90px] font-display leading-none block select-none"
            style={{ color: 'var(--mishri-gold)' }}
            aria-hidden="true"
          >
            "
          </span>
          <blockquote className="font-display italic text-[20px] sm:text-[26px] lg:text-[34px] leading-snug -mt-6 text-balance">
            We don't compete with industrial dairy. We honour the craft our
            grandmothers perfected.
          </blockquote>
          <p className="mt-6 text-[11px] tracking-[0.26em] uppercase opacity-60">
            — The Aaharvedik philosophy
          </p>
        </div>
      </section>

      {/* ─── Three pillars ─── */}
      <section
        className="py-16 lg:py-24"
        style={{ background: 'var(--mishri-surface-offset)' }}
        aria-label="Our pillars"
      >
        <div className="max-w-[1280px] mx-auto px-5 lg:px-10">
          <div className="text-center max-w-xl mx-auto mb-10 lg:mb-14">
            <SectionLabel>What we stand for</SectionLabel>
            <h2
              className="font-display mt-4 text-balance"
              style={{ fontSize: 'clamp(26px, 3.5vw, 44px)' }}
            >
              Three pillars.{' '}
              <span className="italic" style={{ color: 'var(--mishri-gold)' }}>
                No exceptions.
              </span>
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-5 lg:gap-8">
            {pillars.map(({ icon: Icon, num, title, desc }) => (
              <motion.article
                key={num}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.55 }}
                className="p-7 lg:p-10 rounded-[24px] relative overflow-hidden group hover:-translate-y-1 transition-transform"
                style={{ background: 'var(--mishri-surface)', boxShadow: 'var(--shadow-md)' }}
              >
                <div
                  className="size-12 rounded-2xl grid place-items-center mb-5"
                  style={{ background: 'var(--mishri-gold)', color: 'var(--mishri-text-inverse)' }}
                  aria-hidden="true"
                >
                  <Icon className="size-5" strokeWidth={1.8} />
                </div>
                <div
                  className="font-display text-[56px] leading-none absolute top-6 right-6 select-none pointer-events-none"
                  style={{ color: 'var(--mishri-gold)', opacity: 0.10 }}
                  aria-hidden="true"
                >
                  {num}
                </div>
                <h3 className="font-display italic text-[22px] sm:text-[24px] mt-1">{title}</h3>
                <p
                  className="mt-3 text-[13.5px] leading-relaxed"
                  style={{ color: 'var(--mishri-text-muted)' }}
                >
                  {desc}
                </p>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Vision ─── */}
      <section className="py-16 lg:py-24" aria-label="Our vision">
        <div className="max-w-[800px] mx-auto px-5 lg:px-10 text-center">
          <SectionLabel>Our Vision</SectionLabel>
          <h2
            className="font-display mt-4 text-balance"
            style={{ fontSize: 'clamp(24px, 3.5vw, 42px)' }}
          >
            Bringing back the{' '}
            <span className="italic" style={{ color: 'var(--mishri-gold)' }}>
              forgotten purity
            </span>
          </h2>
          <p
            className="mt-6 text-[15px] sm:text-[16px] leading-[1.85] max-w-xl mx-auto"
            style={{ color: 'var(--mishri-text-muted)' }}
          >
            In a world of processed food and industrial shortcuts, Aaharvedik stands
            for something different. We believe that food should nourish, not just
            fill. That tradition is not old-fashioned — it's timeless. And that every
            family deserves dairy they can trust completely.
          </p>
          <div
            className="mt-10 h-px w-14 mx-auto"
            style={{ background: 'var(--mishri-gold)' }}
            aria-hidden="true"
          />
          <blockquote
            className="mt-8 font-display italic text-[20px] sm:text-[22px] leading-snug"
            style={{ color: 'var(--mishri-gold)' }}
          >
            "जहाँ दूध शुद्ध होता है, वहाँ स्वास्थ्य भी शुद्ध होता है"
          </blockquote>
          <p className="mt-2 text-[11px] tracking-[0.2em] uppercase opacity-60">
            Ancient Indian dairy wisdom
          </p>

          <Link
            to="/products"
            className="mt-10 inline-flex items-center gap-2 px-8 h-12 rounded-full text-[13px] tracking-[0.1em] uppercase font-semibold transition-all hover:gap-3 hover:opacity-90 active:scale-[0.97]"
            style={{ background: 'var(--mishri-gold)', color: 'var(--mishri-text-inverse)' }}
          >
            Explore Our Range <ArrowRight className="size-4" />
          </Link>
        </div>
      </section>
    </>
  );
}
