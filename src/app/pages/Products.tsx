import { useState } from 'react';
import { motion } from 'motion/react';
import { toast } from 'sonner';
import { ArrowRight, Check } from 'lucide-react';
import { GheeIcon, SarsoIcon, HoneyIcon, MakhanaIcon } from '../components/visual/ProductIcons';

type ProductEntry = {
  name: string;
  category: string;
  tag: string;
  desc: string;
  usps: string[];
  icon: React.ReactNode;
};

const productList: ProductEntry[] = [
  {
    name: 'A2 Bilona Ghee',
    category: 'Ghee Range',
    tag: 'BILONA CHURNED',
    desc: 'Our signature A2 Ghee is made using the traditional Bilona method. A2 milk from native cow breeds is cultured to curd, hand-churned in clay pots, and slow-boiled over charcoal to produce rich, granular, aromatic ghee.',
    usps: ['A2 Desi Cow Milk only', 'Traditional wood Bilona', 'Slow charcoal flame cooked', 'No artificial colors or preservatives'],
    icon: <GheeIcon className="size-24 sm:size-28" />,
  },
  {
    name: 'Kachi Ghani Sarso',
    category: 'Cold Pressed Oils',
    tag: 'COLD PRESSED',
    desc: 'Extracted slowly in wooden pressers (Kachi Ghani) at low temperatures to retain its natural pungent aroma, deep color, and essential fatty acids. Perfect for traditional cooking and pickling.',
    usps: ['100% pure mustard seed oil', 'Cold-pressed in wooden mills', 'Zero chemicals or mineral oil', 'Naturally high pungency'],
    icon: <SarsoIcon className="size-24 sm:size-28" />,
  },
  {
    name: 'Forest Raw Honey',
    category: 'Raw Honey Range',
    tag: '100% NATURAL',
    desc: 'Sourced directly from native honeycombs in deep deciduous forests. Wild, unfiltered, raw honey that tastes like the forest itself. Rich in natural pollens and antioxidants.',
    usps: ['Raw and unfiltered honey', 'Sourced from wild forest hives', 'Zero added sugars or syrup', 'Naturally high in pollen'],
    icon: <HoneyIcon className="size-24 sm:size-28" />,
  },
  {
    name: 'Fresh Makhana',
    category: 'Premium Superfoods',
    tag: 'HAND ROASTED',
    desc: 'Premium phool makhana (fox nuts) gently roasted to perfection. A light, wholesome, and crunchy snack that serves as an excellent source of calcium and protein. Perfect for anytime munching.',
    usps: ['100% natural lotus seeds', 'Roasted to perfection', 'Rich in calcium & protein', 'No artificial flavors'],
    icon: <MakhanaIcon className="size-24 sm:size-28" />,
  },
];

export function Products() {
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
    <div className="pt-20 lg:pt-28 pb-16 lg:pb-24">
      {/* ─── Page Header ─── */}
      <div className="max-w-[1480px] mx-auto px-5 lg:px-10 mb-12 lg:mb-16">
        <div className="max-w-2xl">
          <div className="inline-flex items-center gap-3 mb-5" style={{ color: 'var(--mishri-gold)' }}>
            <span className="h-px w-6" style={{ background: 'currentColor' }} aria-hidden="true" />
            <span className="text-[11px] tracking-[0.28em] uppercase font-semibold">The Range</span>
          </div>
          <h1
            className="font-display font-medium leading-[1.06] text-balance"
            style={{ fontSize: 'clamp(34px, 4.5vw, 58px)', letterSpacing: '-0.02em' }}
          >
            Everything we bring to you,{' '}
            <span className="italic" style={{ color: 'var(--mishri-gold)' }}>
              made the slow way.
            </span>
          </h1>
          <p
            className="mt-4 text-[15px] sm:text-[16px] leading-relaxed font-light max-w-lg"
            style={{ color: 'var(--mishri-text-muted)' }}
          >
            We only introduce what we can make with absolute purity. No shortcuts,
            no compromises, no artificial additives.
          </p>
        </div>
      </div>

      {/* ─── Catalog Grid ─── */}
      <section
        className="max-w-[1480px] mx-auto px-5 lg:px-10"
        aria-label="Product catalogue"
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 lg:gap-8">
          {productList.map((p, i) => (
            <motion.article
              key={p.name}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.55, delay: i * 0.08 }}
              className="bg-white rounded-[28px] border p-6 sm:p-8 lg:p-10 flex flex-col sm:flex-row gap-6 sm:gap-8 items-start shadow-[0_4px_20px_rgba(28,36,16,0.03)] hover:shadow-[0_8px_32px_rgba(28,36,16,0.07)] hover:-translate-y-0.5 transition-all"
              style={{ borderColor: 'var(--mishri-border)' }}
            >
              {/* Icon */}
              <div
                className="size-[100px] sm:size-[120px] rounded-2xl flex items-center justify-center shrink-0"
                style={{ background: 'var(--mishri-surface-offset)' }}
                aria-hidden="true"
              >
                {p.icon}
              </div>

              {/* Content */}
              <div className="flex-1 min-w-0">
                <div className="flex flex-wrap items-center gap-2 mb-1">
                  <span
                    className="text-[10px] tracking-[0.22em] uppercase font-semibold"
                    style={{ color: 'var(--mishri-gold)' }}
                  >
                    {p.category}
                  </span>
                  <span
                    className="text-[9px] tracking-[0.18em] uppercase px-2 py-0.5 rounded-full font-semibold"
                    style={{
                      background: 'var(--mishri-surface-offset)',
                      color: 'var(--mishri-text-muted)',
                    }}
                  >
                    {p.tag}
                  </span>
                </div>

                <h2
                  className="font-display text-[22px] sm:text-[26px] font-medium mt-1 mb-3"
                  style={{ color: 'var(--mishri-text)' }}
                >
                  {p.name}
                </h2>

                <p
                  className="text-[13px] sm:text-[14px] leading-relaxed font-light mb-5"
                  style={{ color: 'var(--mishri-text-muted)' }}
                >
                  {p.desc}
                </p>

                <div className="flex flex-wrap gap-2">
                  {p.usps.map(usp => (
                    <span
                      key={usp}
                      className="inline-flex items-center gap-1.5 text-[11px] px-3 py-1 rounded-full border"
                      style={{ borderColor: 'var(--mishri-border)', color: 'var(--mishri-text)' }}
                    >
                      <Check className="size-3 shrink-0" style={{ color: 'var(--mishri-gold)' }} />
                      {usp}
                    </span>
                  ))}
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </section>

      {/* ─── Notify CTA ─── */}
      <section
        className="max-w-[1480px] mx-auto px-5 lg:px-10 mt-16 lg:mt-24"
        aria-label="Get notified"
      >
        <div
          className="rounded-[28px] lg:rounded-[32px] p-7 sm:p-12 lg:p-16 text-center relative overflow-hidden"
          style={{ background: 'var(--mishri-surface-deep)', color: 'var(--mishri-text-inverse)' }}
        >
          <div className="absolute inset-0 jali-bg opacity-[0.03] pointer-events-none" aria-hidden="true" />

          <div className="relative z-10 max-w-lg mx-auto">
            <span
              className="text-[11px] tracking-[0.28em] uppercase block mb-3 font-semibold"
              style={{ color: 'var(--mishri-gold)' }}
            >
              Get Notified
            </span>
            <h2 className="font-display text-[28px] sm:text-[36px] lg:text-[42px] font-medium leading-tight mb-4">
              We are preparing to launch.
            </h2>
            <p className="text-[14px] sm:text-[15px] opacity-70 mb-8 font-light leading-relaxed">
              Enter your email to receive an invite and be among the first to
              experience pure Aaharvedik products when we start deliveries.
            </p>

            <form
              onSubmit={handleSubscribe}
              className="flex flex-col sm:flex-row gap-3 justify-center"
              aria-label="Notify me form"
            >
              <input
                type="email"
                placeholder="Enter your email"
                required
                value={email}
                onChange={e => setEmail(e.target.value)}
                disabled={loading}
                autoComplete="email"
                className="h-12 px-5 rounded-full border bg-white/10 focus:bg-white/20 text-[15px] outline-none transition-all flex-1 max-w-sm text-white placeholder-white/50 focus:ring-2 focus:ring-white/20"
                style={{ borderColor: 'rgba(255,255,255,0.18)' }}
              />
              <button
                type="submit"
                disabled={loading}
                className="h-12 px-7 rounded-full font-semibold text-[13px] tracking-[0.04em] transition-all hover:opacity-95 active:scale-[0.97] shrink-0 disabled:opacity-50 bg-white"
                style={{ color: 'var(--mishri-surface-deep)' }}
              >
                {loading ? 'Adding…' : 'Be First →'}
              </button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}
