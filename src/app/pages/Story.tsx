import { motion } from 'motion/react';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';
import { SectionLabel } from '../components/ui-bits/SectionLabel';

const milestones = [
  { year: 'Jan 2026', title: 'A return home', body: 'Aryan Kumar leaves a product role in Bengaluru and returns to Hajipur with one stubborn idea: real dahi, set the way nani did it.' },
  { year: 'Feb 2026', title: 'First six farmers', body: 'Mishri partners with six Sahiwal-keeping families in Vaishali district. The first matkas of dahi are set in a rented kitchen behind Hajipur railway station.' },
  { year: 'Mar 2026', title: 'Bilona begins', body: 'A wooden bilona is commissioned from a carpenter in Lalganj. The first 30 jars of ghee are gifted to neighbours for honest feedback.' },
  { year: 'Apr 2026', title: 'The cold chain', body: 'Our first refrigerated tempo starts daily runs from village collection points. Farm-to-facility time drops to under four hours.' },
  { year: 'May 2026', title: 'Patna opens', body: 'We start same-day delivery across Patna and Hajipur. Eighteen farmers now supply us. 1,200 households have ordered at least once.' },
  { year: 'Jun 2026', title: 'Kulfi season', body: 'Our nani sits with us for two weekends to perfect the kesar pista recipe. The first batch sells out in 11 hours.' },
];

export function Story() {
  return (
    <>
      {/* Editorial hero */}
      <section className="relative pt-20 lg:pt-40 pb-12 lg:pb-20 overflow-hidden">
        <div className="absolute right-0 top-20 size-[500px] rounded-full opacity-[0.07] jali-bg anim-spin-slow"/>
        <div className="max-w-[1200px] mx-auto px-5 lg:px-10 grid lg:grid-cols-[1fr_1fr] gap-8 lg:gap-16 items-center">
          <div>
            <SectionLabel>Our Story</SectionLabel>
            <h1 className="font-display mt-5 text-balance" style={{ fontSize: 'var(--text-3xl)', lineHeight: 0.98 }}>
              We didn't start a dairy <br/><span className="italic" style={{ color: 'var(--mishri-gold)' }}>brand.</span>
              <br/>We restarted a craft.
            </h1>
            <p className="mt-6 font-hindi text-[20px]" style={{ color: 'var(--mishri-gold)' }}>शुद्धता से कोई समझौता नहीं।</p>
            <p className="mt-5 max-w-md text-[16px] leading-[1.85]" style={{ color: 'var(--mishri-text-muted)' }}>
              Six months ago, you couldn't find real bilona ghee in a Hajipur supermarket. Everything was centrifuged. Everything tasted the same. We thought somebody should fix that. Then we realised nobody else would.
            </p>
          </div>
          <div className="relative">
            <div className="absolute -inset-6 rounded-[32px] opacity-30 blur-2xl" style={{ background: 'var(--mishri-gold)' }}/>
            <div className="relative aspect-[4/5] rounded-[24px] overflow-hidden">
              <ImageWithFallback src="https://images.unsplash.com/photo-1609252509027-3928a66302fd?w=1200&q=85" alt="Anant Joshi with a desi cow" className="w-full h-full object-cover"/>
              <div className="absolute inset-x-0 bottom-0 p-5" style={{ background: 'linear-gradient(to top, rgba(30,21,16,0.85), transparent)' }}>
                <div className="text-[10px] tracking-[0.24em] uppercase opacity-80" style={{ color: 'var(--mishri-text-inverse)' }}>Founder</div>
                <div className="font-display italic text-[22px]" style={{ color: 'var(--mishri-text-inverse)' }}>Aryan Kumar, Hajipur</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pull quote */}
      <section className="py-16 lg:py-20 relative" style={{ background: 'var(--mishri-surface-deep)', color: 'var(--mishri-text-inverse)' }}>
        <div className="max-w-3xl mx-auto px-5 lg:px-10 text-center">
          <span className="text-[80px] font-display leading-none block" style={{ color: 'var(--mishri-gold)' }}>"</span>
          <p className="font-display italic text-[24px] sm:text-[28px] lg:text-[36px] leading-snug -mt-6 text-balance">
            We don't make ghee that competes on shelf. We make ghee that competes with your nani's memory.
          </p>
          <p className="mt-6 text-[12px] tracking-[0.24em] uppercase opacity-60">— Aryan Kumar, founder's note, March 2026</p>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-16 lg:py-28">
        <div className="max-w-5xl mx-auto px-5 lg:px-10">
          <SectionLabel>Timeline</SectionLabel>
          <h2 className="font-display mt-4 mb-10 lg:mb-16" style={{ fontSize: 'var(--text-2xl)' }}>Six months, six chapters.</h2>

          <div className="relative">
            <div className="absolute left-[48px] sm:left-[88px] lg:left-[136px] top-0 bottom-0 w-px" style={{ background: 'var(--mishri-border)' }}/>
            <div className="space-y-8 lg:space-y-12">
              {milestones.map((m, i) => (
                <motion.div key={m.year} initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.06 }}
                  className="grid grid-cols-[40px_1fr] sm:grid-cols-[80px_1fr] lg:grid-cols-[128px_1fr] gap-4 sm:gap-6 lg:gap-10 items-start relative">
                  <div className="font-display text-[24px] sm:text-[36px] lg:text-[44px] leading-none" style={{ color: 'var(--mishri-gold)' }}>{m.year}</div>
                  <div className="relative">
                    <span className="absolute -left-[20px] sm:-left-[33px] lg:-left-[33px] top-2 sm:top-3 size-2.5 sm:size-3 rounded-full ring-2 sm:ring-4" style={{ background: 'var(--mishri-gold)', '--tw-ring-color': 'var(--mishri-bg)' } as React.CSSProperties}/>
                    <h3 className="font-display italic text-[24px]">{m.title}</h3>
                    <p className="mt-2 text-[15.5px] leading-relaxed max-w-xl" style={{ color: 'var(--mishri-text-muted)' }}>{m.body}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Three pillars */}
      <section className="py-16 lg:py-24" style={{ background: 'var(--mishri-surface-offset)' }}>
        <div className="max-w-[1280px] mx-auto px-5 lg:px-10">
          <div className="text-center max-w-xl mx-auto">
            <SectionLabel>What we promise</SectionLabel>
            <h2 className="font-display mt-4" style={{ fontSize: 'var(--text-2xl)' }}>Three pillars. <span className="italic" style={{ color: 'var(--mishri-gold)' }}>No exceptions.</span></h2>
          </div>
          <div className="mt-10 lg:mt-14 grid md:grid-cols-3 gap-px" style={{ background: 'var(--mishri-border)' }}>
            {[
              ['01', 'Sourcing', 'Only A2 Sahiwal & native Bachaur cows. Free-grazing along the Gandak. No milk powder ever. Farmers paid 22% above mandi rate.'],
              ['02', 'Process', 'Bilona ghee, not centrifuge. Matka-set dahi, not vat. Coal-reduced kulfi, not vanilla base.'],
              ['03', 'Cold chain', 'Farm to your fridge in under 18 hours, never above 4°C. Tracked by sensor on every crate.'],
            ].map(([n, t, d]) => (
              <div key={n} className="p-8 lg:p-10" style={{ background: 'var(--mishri-bg)' }}>
                <div className="font-display text-[56px] leading-none" style={{ color: 'var(--mishri-gold)' }}>{n}</div>
                <h3 className="font-display italic text-[24px] mt-4">{t}</h3>
                <p className="mt-3 text-[14.5px] leading-relaxed" style={{ color: 'var(--mishri-text-muted)' }}>{d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Farmers image strip */}
      <section className="relative">
        <div className="grid grid-cols-3 gap-1">
          {[
            'https://images.unsplash.com/photo-1767880408267-e9f64de1fe7a?w=1000&q=80',
            'https://images.unsplash.com/photo-1608876537010-ac56d8731614?w=1000&q=80',
            'https://images.unsplash.com/photo-1762884489391-bb410e8905d1?w=1000&q=80',
          ].map((u, i) => (
            <div key={i} className="aspect-[4/5] overflow-hidden">
              <ImageWithFallback src={u} alt="Mishri farmer" className="w-full h-full object-cover hover:scale-105 transition-transform duration-1000"/>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
