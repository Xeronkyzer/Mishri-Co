import { useState } from 'react';
import { motion } from 'motion/react';
import { toast } from 'sonner';
import { Link } from 'react-router';
import { ArrowRight } from 'lucide-react';
import { HeroIllustration } from '../components/visual/HeroIllustration';
import { GheeIcon, SarsoIcon, HoneyIcon, MakhanaIcon } from '../components/visual/ProductIcons';

const productList = [
  {
    name: 'A2 Bilona Ghee',
    desc: 'Cultured from pure A2 milk and hand-churned before dawn.',
    icon: <GheeIcon className="size-20 sm:size-24" />,
  },
  {
    name: 'Kachi Ghani Sarso',
    desc: 'Cold-pressed mustard oil, preserving pungent aroma and nutrients.',
    icon: <SarsoIcon className="size-20 sm:size-24" />,
  },
  {
    name: 'Forest Raw Honey',
    desc: 'Unfiltered nectar sourced straight from wild forest hives.',
    icon: <HoneyIcon className="size-20 sm:size-24" />,
  },
  {
    name: 'Fresh Makhana',
    desc: 'Crispy, hand-roasted lotus seeds packed with protein and antioxidants.',
    icon: <MakhanaIcon className="size-20 sm:size-24" />,
  },
];

const processSteps = [
  { num: '01', title: 'Ethical Grazing', body: 'Free-range native cows on natural pastures. Trusted farmers, no middlemen.' },
  { num: '02', title: 'Quality Testing', body: 'Every batch tested for purity, fat content, and antibiotic residue.' },
  { num: '03', title: 'Traditional Methods', body: 'Bilona-churned ghee, cold-pressed oils, and raw wild honey.' },
  { num: '04', title: 'Delivered Fresh', body: 'Freshly prepared batches shipped immediately to retain natural nutrients.' },
];

export function Home() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubscribe = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const trimmed = email.trim();
    if (!trimmed) return;

    setLoading(true);
    setTimeout(() => {
      toast.success("You're on the list!", {
        description: `We'll notify ${trimmed} when we launch.`,
      });
      setEmail('');
      setLoading(false);
    }, 900);
  };

  return (
    <div className="w-full">
      {/* ─── Hero ─── */}
      <section
        className="relative min-h-[88svh] flex items-center overflow-hidden pt-20 pb-12 lg:py-0"
        aria-label="Hero"
      >
        {/* Ambient gradient */}
        <div
          className="absolute inset-0 pointer-events-none"
          aria-hidden="true"
          style={{
            background:
              'radial-gradient(70% 60% at 75% 30%, oklch(0.90 0.04 128 / 0.30), transparent 70%), radial-gradient(50% 40% at 5% 95%, oklch(0.85 0.05 100 / 0.18), transparent 70%)',
          }}
        />

        <div className="max-w-[1480px] w-full mx-auto px-5 lg:px-10 grid lg:grid-cols-[1.1fr_1fr] items-center gap-8 lg:gap-14 relative z-10">
          {/* Text */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 mb-5"
            >
              <span
                className="h-px w-6"
                style={{ background: 'var(--mishri-gold)' }}
                aria-hidden="true"
              />
              <span
                className="text-[11px] tracking-[0.28em] uppercase font-semibold"
                style={{ color: 'var(--mishri-gold)' }}
              >
                Farm to Table
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.05 }}
              className="font-display font-medium text-balance leading-[1.04]"
              style={{ fontSize: 'clamp(40px, 5.5vw, 70px)', letterSpacing: '-0.02em' }}
            >
              Ancient goodness.<br />
              <span className="italic" style={{ color: 'var(--mishri-gold)' }}>
                Straight from the farm.
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.15 }}
              className="mt-5 max-w-lg text-[15px] sm:text-[17px] leading-[1.75] font-light"
              style={{ color: 'var(--mishri-text-muted)' }}
            >
              We bring the forgotten purity of village kitchens back to your
              table — raw, unhurried, and churned by the hands of tradition.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.25 }}
              className="mt-7 flex flex-col sm:flex-row gap-3"
            >
              <form
                onSubmit={handleSubscribe}
                className="flex flex-1 gap-2 max-w-md"
                aria-label="Early access sign-up"
              >
                <input
                  type="email"
                  placeholder="Enter your email"
                  required
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  disabled={loading}
                  autoComplete="email"
                  className="h-12 px-5 rounded-full border bg-white/50 backdrop-blur-sm focus:bg-white text-[15px] outline-none transition-all flex-1 min-w-0 focus:ring-2 focus:ring-[var(--mishri-gold)]/30"
                  style={{ borderColor: 'var(--mishri-border)', color: 'var(--mishri-text)' }}
                />
                <button
                  type="submit"
                  disabled={loading}
                  className="h-12 px-6 rounded-full font-semibold text-[13px] tracking-[0.06em] text-white transition-all hover:opacity-90 active:scale-[0.97] shrink-0 disabled:opacity-50"
                  style={{ background: 'var(--mishri-gold)' }}
                >
                  {loading ? 'Adding…' : 'Notify Me'}
                </button>
              </form>

              <Link
                to="/products"
                className="inline-flex items-center gap-2 h-12 px-6 rounded-full border text-[13px] font-medium tracking-[0.04em] transition-all hover:bg-[var(--mishri-surface-offset)] shrink-0"
                style={{ borderColor: 'var(--mishri-border)', color: 'var(--mishri-text)' }}
              >
                View Products <ArrowRight className="size-4" />
              </Link>
            </motion.div>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="mt-4 text-[12px] tracking-[0.04em]"
              style={{ color: 'var(--mishri-text-faint)' }}
            >
              जल्द आ रहे हैं — Launching soon. No spam, ever.
            </motion.p>
          </div>

          {/* Illustration */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="relative flex justify-center lg:justify-end"
          >
            <HeroIllustration />
          </motion.div>
        </div>
      </section>

      {/* ─── Products Showcase ─── */}
      <section
        className="relative py-16 lg:py-28"
        style={{ background: 'var(--mishri-surface-offset)' }}
        aria-label="Our Products"
      >
        <div className="absolute inset-0 jali-bg opacity-[0.03] pointer-events-none" aria-hidden="true" />

        <div className="max-w-[1480px] mx-auto px-5 lg:px-10 relative">
          <div className="text-center mb-12 lg:mb-16">
            <div className="inline-flex items-center gap-3 mb-4" style={{ color: 'var(--mishri-text-muted)' }}>
              <span className="h-px w-6 opacity-50" style={{ background: 'currentColor' }} aria-hidden="true" />
              <span className="text-[11px] tracking-[0.28em] uppercase font-medium">The Range</span>
              <span className="h-px w-6 opacity-50" style={{ background: 'currentColor' }} aria-hidden="true" />
            </div>
            <h2
              className="font-display text-balance leading-tight"
              style={{ fontSize: 'clamp(28px, 4vw, 48px)' }}
            >
              What We Bring{' '}
              <span className="italic" style={{ color: 'var(--mishri-gold)' }}>
                From Farm to You
              </span>
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
            {productList.map((p, i) => (
              <motion.article
                key={p.name}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.55, delay: i * 0.07 }}
                className="bg-white p-6 sm:p-8 rounded-[24px] border shadow-[0_4px_16px_rgba(28,36,16,0.03)] flex flex-col items-center text-center transition-all hover:shadow-[0_8px_30px_rgba(28,36,16,0.07)] hover:-translate-y-0.5 group"
                style={{ borderColor: 'var(--mishri-border)' }}
              >
                <div
                  className="mb-5 size-[100px] sm:size-[112px] flex items-center justify-center rounded-2xl transition-colors"
                  style={{ background: 'var(--mishri-surface-offset)' }}
                >
                  {p.icon}
                </div>
                <h3
                  className="font-display text-[20px] sm:text-[22px] font-medium mb-2"
                  style={{ color: 'var(--mishri-text)' }}
                >
                  {p.name}
                </h3>
                <p
                  className="text-[13px] sm:text-[14px] leading-relaxed font-light"
                  style={{ color: 'var(--mishri-text-muted)' }}
                >
                  {p.desc}
                </p>
              </motion.article>
            ))}
          </div>

          <div className="mt-10 text-center">
            <Link
              to="/products"
              className="inline-flex items-center gap-2 px-7 h-12 rounded-full text-[13px] font-medium tracking-[0.06em] transition-all hover:gap-3 hover:opacity-90 active:scale-[0.97]"
              style={{ background: 'var(--mishri-gold)', color: 'var(--mishri-text-inverse)' }}
            >
              Explore All Products <ArrowRight className="size-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* ─── Process ─── */}
      <section className="py-16 lg:py-28" aria-label="Our Process">
        <div className="max-w-[1480px] mx-auto px-5 lg:px-10">
          <div className="text-center mb-12 lg:mb-16">
            <div className="inline-flex items-center gap-3 mb-4" style={{ color: 'var(--mishri-text-muted)' }}>
              <span className="h-px w-6 opacity-50" style={{ background: 'currentColor' }} aria-hidden="true" />
              <span className="text-[11px] tracking-[0.28em] uppercase font-medium">Our Promise</span>
              <span className="h-px w-6 opacity-50" style={{ background: 'currentColor' }} aria-hidden="true" />
            </div>
            <h2
              className="font-display text-balance leading-tight"
              style={{ fontSize: 'clamp(26px, 3.5vw, 44px)' }}
            >
              Four steps.{' '}
              <span className="italic" style={{ color: 'var(--mishri-gold)' }}>
                Zero compromise.
              </span>
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
            {processSteps.map(({ num, title, body }, i) => (
              <motion.div
                key={num}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="p-6 rounded-[20px] relative overflow-hidden"
                style={{ background: 'var(--mishri-surface)' }}
              >
                <span
                  className="font-display text-[60px] leading-none absolute -top-2 -right-1 select-none pointer-events-none"
                  style={{ color: 'var(--mishri-gold)', opacity: 0.10 }}
                  aria-hidden="true"
                >
                  {num}
                </span>
                <div
                  className="text-[11px] tracking-[0.22em] uppercase font-semibold mb-3"
                  style={{ color: 'var(--mishri-gold)' }}
                >
                  Step {num}
                </div>
                <h3 className="font-display text-[20px] font-medium mb-2">{title}</h3>
                <p
                  className="text-[13px] leading-relaxed font-light"
                  style={{ color: 'var(--mishri-text-muted)' }}
                >
                  {body}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
