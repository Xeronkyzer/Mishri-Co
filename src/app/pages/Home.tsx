import { Link } from 'react-router';
import { motion } from 'motion/react';
import { ArrowRight, Star, ChevronRight, Quote } from 'lucide-react';
import { HeroJar } from '../components/visual/HeroJar';
import { SectionLabel } from '../components/ui-bits/SectionLabel';
import { products, testimonials, processSteps } from '../data/products';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';
import { useEffect, useState } from 'react';

export function Home() {
  return (
    <>
      <Hero />
      <ProductsShowcase />
      <Heritage />
      <Process />
      <Testimonials />
      <Retailers />
    </>
  );
}

/* ── Hero ──────────────────────────────────────────── */
function Hero() {
  return (
    <section className="relative min-h-[92vh] lg:min-h-[100vh] flex items-center overflow-hidden pt-20 lg:pt-24 pb-16 lg:pb-0">
      {/* Background gradient wash */}
      <div className="absolute inset-0 pointer-events-none" style={{
        background: 'radial-gradient(80% 60% at 75% 35%, oklch(0.93 0.06 78 / 0.6), transparent 70%), radial-gradient(60% 40% at 0% 100%, oklch(0.88 0.08 60 / 0.45), transparent 70%)'
      }} />
      <div className="absolute -top-20 -right-20 size-[600px] rounded-full opacity-[0.08] jali-bg anim-spin-slow" />

      <div className="max-w-[1480px] w-full mx-auto px-5 lg:px-10 grid lg:grid-cols-[1.05fr_1fr] items-center gap-8 lg:gap-10 relative z-10">
        <div>
          <SectionLabel>Founded 2026 · Hajipur, Bihar</SectionLabel>
          <motion.h1
            initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9 }}
            className="font-display mt-5 text-balance"
            style={{ fontSize: 'var(--text-3xl)', lineHeight: 0.96, letterSpacing: '-0.03em' }}>
            Pure dairy. <br/>
            The way nature <br/>
            <span className="italic" style={{ color: 'var(--mishri-gold)' }}>intended.</span>
          </motion.h1>
          <p className="mt-6 font-hindi text-[20px]" style={{ color: 'var(--mishri-gold)' }}>
            प्रकृति की शुद्धता, हर बूँद में
          </p>
          <p className="mt-5 max-w-md text-[17px] leading-relaxed font-light" style={{ color: 'var(--mishri-text-muted)' }}>
            No shortcuts. No additives. Just honest dairy from free-grazing Sahiwal and Bachaur cows along the Gandak — hand-churned, clay-set and delivered the way our nani would approve.
          </p>

          <div className="mt-9 flex flex-wrap items-center gap-3">
            <Link to="/products" className="group inline-flex items-center gap-2 px-7 h-12 rounded-full font-medium text-[13px] tracking-[0.12em] uppercase transition-all hover:gap-3"
              style={{ background: 'var(--mishri-gold)', color: 'var(--mishri-text-inverse)' }}>
              Explore Products <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5"/>
            </Link>
            <Link to="/story" className="inline-flex items-center gap-2 px-6 h-12 rounded-full border text-[13px] tracking-[0.12em] uppercase transition-colors hover:bg-[var(--mishri-surface)]"
              style={{ borderColor: 'var(--mishri-text)', color: 'var(--mishri-text)' }}>
              Our Story
            </Link>
          </div>

          <div className="mt-10 lg:mt-12 grid grid-cols-3 max-w-md gap-2 sm:gap-3">
            <Stat n="18" label="Farmer partners"/>
            <Stat n="Day 0" label="To your kitchen" border/>
            <Stat n="< 4°C" label="Cold chain" border/>
          </div>
        </div>

        <div className="relative flex justify-center lg:justify-end">
          <HeroJar />
        </div>
      </div>

    </section>
  );
}

function Stat({ n, label, border }: { n: string; label: string; border?: boolean }) {
  return (
    <div className={border ? 'pl-3 sm:pl-4 border-l' : ''} style={border ? { borderColor: 'var(--mishri-border)' } : undefined}>
      <div className="font-display text-xl sm:text-[28px] leading-none" style={{ color: 'var(--mishri-gold)' }}>{n}</div>
      <div className="mt-1 text-[10px] sm:text-[11px] tracking-[0.14em] sm:tracking-[0.16em] uppercase opacity-60">{label}</div>
    </div>
  );
}

/* ── Products Showcase ──────────────────────────────────── */
function ProductsShowcase() {
  const items = products.slice(0, 3);

  return (
    <section className="relative py-16 lg:py-32 overflow-hidden" style={{ background: 'var(--mishri-surface-offset)' }}>
      <div className="absolute inset-0 jali-bg opacity-[0.05] pointer-events-none"/>
      <div className="max-w-[1480px] mx-auto px-5 lg:px-10 relative">
        <div className="text-center max-w-2xl mx-auto">
          <SectionLabel>The Range</SectionLabel>
          <h2 className="font-display italic mt-4 text-balance" style={{ fontSize: 'var(--text-2xl)', lineHeight: 1.1 }}>
            Three products. <span className="not-italic" style={{ color: 'var(--mishri-gold)' }}>One obsession.</span>
          </h2>
          <p className="mt-4 text-[15px] lg:text-[16px] max-w-lg mx-auto" style={{ color: 'var(--mishri-text-muted)' }}>
            We make only what we can make right. Everything below is sourced, set, and shipped by the same fifteen people.
          </p>
        </div>

        <div className="mt-12 lg:mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6">
          {items.map((p, i) => (
            <motion.div
              key={p.id}
              initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className={`relative flex flex-col group rounded-[28px] overflow-hidden ${i === 1 ? 'lg:scale-[1.04] lg:z-10' : ''}`}
              style={{ background: 'var(--mishri-surface)', boxShadow: i === 1 ? 'var(--shadow-lg)' : 'var(--shadow-md)' }}
            >
              <div className="relative aspect-[4/5] w-full shrink-0 overflow-hidden">
                <ImageWithFallback src={p.image} alt={p.name} className="w-full h-full object-cover transition-transform duration-[1.2s] group-hover:scale-105"/>
                <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(30,21,16,0.85) 0%, rgba(30,21,16,0.15) 45%, transparent 70%)' }}/>
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 rounded-full text-[10px] tracking-[0.2em] uppercase font-medium backdrop-blur-md"
                    style={{ background: 'oklch(0.97 0.012 85 / 0.7)', color: 'var(--mishri-text)' }}>
                    {p.categoryLabel}
                  </span>
                </div>
                <div className="absolute inset-x-0 bottom-0 p-4 sm:p-5 lg:p-6">
                  <div className="font-display italic text-[22px] sm:text-[26px] lg:text-[30px] leading-tight" style={{ color: 'var(--mishri-text-inverse)' }}>{p.name}</div>
                  <p className="mt-1 text-[13px]" style={{ color: 'oklch(0.92 0.04 70)' }}>"{p.tagline}"</p>
                </div>
              </div>
              <div className="p-5 lg:p-6 flex items-center justify-between">
                <div>
                  <div className="text-[11px] tracking-[0.18em] uppercase" style={{ color: 'var(--mishri-text-muted)' }}>From</div>
                  <div className="font-body font-bold text-[20px] leading-none mt-1">₹{p.variants[0].price}</div>
                </div>
                <Link to="/products" className="inline-flex items-center gap-1.5 text-[12px] tracking-[0.18em] uppercase font-medium group/cta"
                  style={{ color: 'var(--mishri-gold)' }}>
                  View Range
                  <ChevronRight className="size-3.5 transition-transform group-hover/cta:translate-x-0.5"/>
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── Heritage dark strip ───────────────────────────── */
function Heritage() {
  return (
    <section className="relative" style={{ background: 'var(--mishri-surface-deep)', color: 'var(--mishri-text-inverse)' }}>
      <div className="grid lg:grid-cols-[1.4fr_1fr] min-h-[620px]">
        <div className="relative min-h-[420px] lg:min-h-[620px]">
          <ImageWithFallback
            src="https://images.unsplash.com/photo-1702480249957-d28c32b06678?w=1600&q=85"
            alt="A brass ladle dripping fresh ghee" className="absolute inset-0 w-full h-full object-cover"/>
          <div className="absolute inset-0" style={{ background: 'linear-gradient(90deg, transparent 30%, oklch(0.18 0.025 40 / 0.95))' }}/>
        </div>
        <div className="px-6 sm:px-8 lg:px-14 py-12 sm:py-14 lg:py-20 flex flex-col justify-center">
          <SectionLabel color="var(--mishri-gold)">Our Story</SectionLabel>
          <h2 className="font-display mt-4 text-balance" style={{ fontSize: 'var(--text-2xl)', lineHeight: 1.1 }}>
            A young dairy with <span className="italic" style={{ color: 'var(--mishri-gold)' }}>old roots.</span>
          </h2>
          <div className="mt-6 space-y-4 text-[15.5px] leading-[1.85]" style={{ color: 'oklch(0.78 0.014 70)' }}>
            <p>Earlier this year, our founder Aryan Kumar left a product job in Bengaluru and came home to Hajipur, the town where the Gandak meets the Ganga. He had one stubborn idea: bring back real dahi.</p>
            <p>Mishri partners with eighteen small farmers across Vaishali district, all keeping native Bachaur and Sahiwal cows. Every drop of milk reaches our facility within four hours, below 4°C.</p>
            <p>We follow the bilona ghee method the way our nanis did, before centrifuges. We hand-set our dahi in clay matkas. We refuse to make anything we wouldn't feed our own family.</p>
          </div>
          <div className="mt-8 h-px w-12" style={{ background: 'var(--mishri-gold)' }}/>
          <blockquote className="mt-6 font-display italic text-[22px] leading-snug" style={{ color: 'var(--mishri-gold)' }}>
            "जहाँ दूध शुद्ध होता है, वहाँ स्वास्थ्य भी शुद्ध होता है"
          </blockquote>
          <p className="mt-2 text-[12px] tracking-[0.18em] uppercase opacity-60">Ancient Indian dairy wisdom</p>

          <Link to="/story" className="mt-9 inline-flex items-center gap-2 text-[12px] tracking-[0.2em] uppercase" style={{ color: 'var(--mishri-gold)' }}>
            Read the full story <ArrowRight className="size-3.5"/>
          </Link>
        </div>
      </div>
    </section>
  );
}

/* ── Process: horizontal scroll on desktop ───────────────── */
function Process() {
  const [active, setActive] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setActive(a => (a + 1) % processSteps.length), 3200);
    return () => clearInterval(id);
  }, []);

  return (
    <section className="py-16 lg:py-32">
      <div className="max-w-[1480px] mx-auto px-5 lg:px-10">
        <div className="flex flex-col lg:flex-row items-start lg:items-end justify-between gap-6 mb-10 lg:mb-14">
          <div>
            <SectionLabel>How it's made</SectionLabel>
            <h2 className="font-display mt-4 text-balance max-w-xl" style={{ fontSize: 'var(--text-2xl)', lineHeight: 1.05 }}>
              Five steps. <span className="italic" style={{ color: 'var(--mishri-gold)' }}>Zero shortcuts.</span>
            </h2>
          </div>
          <p className="max-w-md text-[15.5px] leading-relaxed" style={{ color: 'var(--mishri-text-muted)' }}>
            A 500ml jar of our ghee takes twelve litres of milk, four hours of bilona churning, and seven pairs of hands in Hajipur.
          </p>
        </div>

        {/* Big active step display */}
        <div className="relative grid lg:grid-cols-[1fr_1.4fr] gap-6 lg:gap-20 items-center">
          <div className="relative overflow-hidden">
            <motion.div
              key={active}
              initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
              className="font-display select-none"
              style={{ fontSize: 'clamp(120px, 22vw, 320px)', lineHeight: 0.8, color: 'var(--mishri-gold)', letterSpacing: '-0.04em', WebkitTextStroke: '1px var(--mishri-gold)', WebkitTextFillColor: 'transparent' }}
            >
              {processSteps[active].num}
            </motion.div>
          </div>
          <div>
            <motion.div key={active + 'b'} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
              <h3 className="font-display text-[32px] sm:text-[40px] lg:text-[56px] leading-tight">{processSteps[active].title}</h3>
              <p className="mt-4 text-[16px] lg:text-[17px] leading-relaxed max-w-lg" style={{ color: 'var(--mishri-text-muted)' }}>
                {processSteps[active].body}
              </p>
            </motion.div>
          </div>
        </div>

        {/* Step strip */}
        <div className="mt-20 grid grid-cols-2 md:grid-cols-5 gap-px" style={{ background: 'var(--mishri-border)' }}>
          {processSteps.map((s, i) => (
            <button key={s.num} onClick={() => setActive(i)}
              className="text-left p-5 transition-colors"
              style={{ background: active === i ? 'var(--mishri-surface-offset)' : 'var(--mishri-bg)' }}>
              <div className="flex items-center justify-between">
                <span className="font-display text-[20px]" style={{ color: active === i ? 'var(--mishri-gold)' : 'var(--mishri-text-faint)' }}>{s.num}</span>
                {active === i && <span className="size-1.5 rounded-full" style={{ background: 'var(--mishri-gold)' }}/>}
              </div>
              <div className="mt-3 text-[14px] font-medium">{s.title}</div>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── Testimonials ───────────────────────────────── */
function Testimonials() {
  return (
    <section className="py-16 lg:py-28 relative overflow-hidden" style={{ background: 'var(--mishri-surface-2)' }}>
      <div className="absolute -left-20 top-10 text-[400px] font-display leading-none select-none opacity-[0.05]">"</div>
      <div className="max-w-[1480px] mx-auto px-5 lg:px-10 relative">
        <div className="flex items-end justify-between mb-14 flex-wrap gap-4">
          <div>
            <SectionLabel>Kept on returning</SectionLabel>
            <h2 className="font-display mt-4" style={{ fontSize: 'var(--text-2xl)' }}>
              <span className="italic">1,200+</span> early customers across Bihar.
            </h2>
          </div>
          <div className="flex items-center gap-1.5">
            {Array.from({ length: 5 }).map((_, i) => <Star key={i} className="size-4 fill-current" style={{ color: 'var(--mishri-gold)' }}/>)}
            <span className="ml-2 text-[13px]" style={{ color: 'var(--mishri-text-muted)' }}>4.9 avg · 312 early reviews</span>
          </div>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-5">
          {testimonials.slice(0, 3).map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.6, delay: i * 0.12 }}
              className="p-7 rounded-[20px] relative" style={{ background: 'var(--mishri-surface)', boxShadow: 'var(--shadow-md)' }}>
              <Quote className="size-6 absolute top-5 right-5 opacity-20" style={{ color: 'var(--mishri-gold)' }}/>
              <div className="flex items-center gap-1 mb-4">
                {Array.from({ length: 5 }).map((_, i) => <Star key={i} className="size-3.5 fill-current" style={{ color: 'var(--mishri-gold)' }}/>)}
              </div>
              <p className="font-display italic text-[18px] leading-snug" style={{ color: 'var(--mishri-text)' }}>"{t.quote}"</p>
              <div className="mt-6 flex items-center gap-3">
                <div className="size-11 rounded-full overflow-hidden ring-2 ring-offset-2" style={{ '--tw-ring-color': 'var(--mishri-gold)', '--tw-ring-offset-color': 'var(--mishri-surface)' } as React.CSSProperties}>
                  <ImageWithFallback src={t.avatar} alt={t.name} className="size-full object-cover"/>
                </div>
                <div>
                  <div className="text-[14px] font-medium">{t.name}</div>
                  <div className="text-[12px]" style={{ color: 'var(--mishri-text-muted)' }}>{t.city}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── Retailers ──────────────────────────────────── */
function Retailers() {
  const apps = ['Blinkit', 'BigBasket', 'Zepto', 'JioMart', 'Swiggy Instamart'];
  return (
    <section className="relative overflow-hidden" style={{ background: 'var(--mishri-gold)', color: 'var(--mishri-text-inverse)' }}>
      <div className="absolute inset-0 gold-shimmer pointer-events-none opacity-30"/>
      <div className="max-w-[1480px] mx-auto px-5 lg:px-10 py-8 lg:py-14 flex flex-col lg:flex-row items-center gap-8 justify-between relative">
        <div>
          <p className="font-display italic text-[28px] leading-tight text-balance">Order from your favourite app —</p>
          <p className="text-[13px] tracking-[0.2em] uppercase opacity-80 mt-2">Delivered fresh in under 90 minutes</p>
        </div>
        <div className="flex flex-wrap gap-2.5 justify-center">
          {apps.map(a => (
            <div key={a} className="px-5 h-11 rounded-full flex items-center text-[13px] font-medium tracking-wide"
              style={{ background: 'var(--mishri-bg)', color: 'var(--mishri-text)' }}>{a}</div>
          ))}
        </div>
      </div>
    </section>
  );
}
