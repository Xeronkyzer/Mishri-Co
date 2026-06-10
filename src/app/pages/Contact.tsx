import { useState } from 'react';
import { motion } from 'motion/react';
import { MapPin, Phone, MessageCircle, Mail, Search, Clock } from 'lucide-react';
import { toast } from 'sonner';
import { SectionLabel } from '../components/ui-bits/SectionLabel';

const stores = [
  { city: 'Hajipur', name: 'Mishri Flagship · Station Road', addr: 'Near Hajipur Junction, Station Rd, Hajipur 844101', hours: '7 AM – 9 PM, every day', distance: '0.8 km', flagship: true },
  { city: 'Hajipur', name: 'Mishri Industrial Area', addr: 'Plot 14, Hajipur Industrial Area, Vaishali 844101', hours: '8 AM – 8 PM', distance: '4.2 km' },
  { city: 'Patna', name: 'Mishri Boring Road', addr: 'Boring Canal Rd, opp Hartali Mor, Patna 800001', hours: '8 AM – 10 PM', distance: '22 km' },
  { city: 'Patna', name: 'Mishri Patliputra', addr: 'Patliputra Colony, near Loyola School, Patna 800013', hours: '8 AM – 10 PM', distance: '26 km' },
  { city: 'Muzaffarpur', name: 'Mishri Mithanpura', addr: 'Mithanpura Main Rd, Muzaffarpur 842002', hours: '8 AM – 9 PM', distance: '58 km' },
  { city: 'Darbhanga', name: 'Mishri Donar Chowk', addr: 'Donar Chowk, near LNMU, Darbhanga 846004', hours: '8 AM – 9 PM', distance: '142 km' },
];

const cities = ['All', 'Hajipur', 'Patna', 'Muzaffarpur', 'Darbhanga', 'Bhagalpur'];

export function Contact() {
  const [city, setCity] = useState('All');
  const [q, setQ] = useState('');

  const filtered = stores.filter(s => (city === 'All' || s.city === city) && (q === '' || (s.name + s.addr).toLowerCase().includes(q.toLowerCase())));

  return (
    <>
      <section className="pt-20 lg:pt-40 pb-10 lg:pb-16">
        <div className="max-w-[1480px] mx-auto px-5 lg:px-10 grid lg:grid-cols-[1.2fr_1fr] gap-8 lg:gap-10 items-end">
          <div>
            <SectionLabel>Find a Mishri</SectionLabel>
            <h1 className="font-display mt-4 text-balance" style={{ fontSize: 'var(--text-3xl)', lineHeight: 0.98 }}>
              Six stores. <span className="italic" style={{ color: 'var(--mishri-gold)' }}>Four cities.</span>
            </h1>
            <p className="mt-5 max-w-md text-[16px] leading-relaxed" style={{ color: 'var(--mishri-text-muted)' }}>
              Walk in to taste before you order. Every Mishri store has a live bilona churn running between 9 AM and noon — bring your kids.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3">
            <ContactPill icon={MessageCircle} label="WhatsApp" value="+91 98765 43210"/>
            <ContactPill icon={Phone} label="Call" value="+91 6224 260 100"/>
          </div>
        </div>
      </section>

      <section className="max-w-[1480px] mx-auto px-5 lg:px-10 pb-24">
        <div className="rounded-[28px] overflow-hidden grid lg:grid-cols-[1fr_1.2fr] min-h-[500px] lg:min-h-[640px]" style={{ background: 'var(--mishri-surface)', boxShadow: 'var(--shadow-md)' }}>
          {/* Store list */}
          <div className="border-b lg:border-b-0 lg:border-r p-5 sm:p-6 lg:p-8 flex flex-col" style={{ borderColor: 'var(--mishri-divider)' }}>
            <div className="relative">
              <Search className="size-4 absolute left-4 top-1/2 -translate-y-1/2 opacity-60"/>
              <input value={q} onChange={e => setQ(e.target.value)} placeholder="Search by area or city…"
                className="w-full h-12 pl-11 pr-4 rounded-full border bg-transparent text-[14px] outline-none focus:border-[var(--mishri-gold)]"
                style={{ borderColor: 'var(--mishri-border)' }}/>
            </div>
            <div className="mt-4 flex gap-1.5 overflow-x-auto scrollbar-hide -mx-1 px-1">
              {cities.map(c => (
                <button key={c} onClick={() => setCity(c)}
                  className="px-4 h-9 rounded-full text-[12px] whitespace-nowrap transition-all"
                  style={city === c ? { background: 'var(--mishri-text)', color: 'var(--mishri-text-inverse)' } : { background: 'var(--mishri-surface-offset)', color: 'var(--mishri-text)' }}>{c}</button>
              ))}
            </div>
            <div className="mt-6 space-y-2 overflow-y-auto flex-1" style={{ maxHeight: 460 }}>
              {filtered.map(s => (
                <button key={s.name} className="w-full text-left p-4 rounded-2xl border hover:border-[var(--mishri-gold)] transition-colors"
                  style={{ borderColor: 'var(--mishri-divider)' }}>
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="font-display italic text-[18px]">{s.name}</h3>
                        {s.flagship && <span className="px-2 py-0.5 text-[9px] tracking-[0.18em] uppercase rounded-full font-medium" style={{ background: 'var(--mishri-gold)', color: 'var(--mishri-text-inverse)' }}>Flagship</span>}
                      </div>
                      <div className="mt-1 text-[13px]" style={{ color: 'var(--mishri-text-muted)' }}>{s.addr}</div>
                      <div className="mt-2 flex items-center gap-4 text-[11.5px]" style={{ color: 'var(--mishri-text-muted)' }}>
                        <span className="flex items-center gap-1"><Clock className="size-3"/> {s.hours}</span>
                      </div>
                    </div>
                    <span className="text-[11px] tracking-[0.16em] uppercase shrink-0" style={{ color: 'var(--mishri-gold)' }}>{s.distance}</span>
                  </div>
                </button>
              ))}
              {filtered.length === 0 && <p className="text-center py-10 text-[14px]" style={{ color: 'var(--mishri-text-muted)' }}>No stores match.</p>}
            </div>
          </div>

          <div className="relative min-h-[280px] sm:min-h-[440px] lg:min-h-0 overflow-hidden" style={{ background: 'oklch(0.94 0.02 80)' }}>
            <svg className="absolute inset-0 w-full h-full" viewBox="0 0 600 600" preserveAspectRatio="xMidYMid slice">
              <defs>
                <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                  <path d="M40 0 L0 0 0 40" fill="none" stroke="oklch(0.85 0.02 75)" strokeWidth="0.5"/>
                </pattern>
              </defs>
              <rect width="600" height="600" fill="url(#grid)"/>
              {/* Roads */}
              <path d="M0 320 Q200 280 320 340 T600 300" stroke="oklch(0.88 0.03 75)" strokeWidth="14" fill="none" strokeLinecap="round"/>
              <path d="M280 0 Q300 200 240 360 T200 600" stroke="oklch(0.88 0.03 75)" strokeWidth="14" fill="none" strokeLinecap="round"/>
              <path d="M50 50 L580 580" stroke="oklch(0.88 0.03 75)" strokeWidth="8" fill="none" opacity="0.6"/>
              {/* River */}
              <path d="M0 480 Q150 420 280 460 T600 440" stroke="oklch(0.78 0.05 220)" strokeWidth="10" fill="none" opacity="0.5"/>
              {/* Park */}
              <circle cx="420" cy="170" r="70" fill="oklch(0.85 0.06 130)" opacity="0.45"/>
              <text x="420" y="174" textAnchor="middle" fontFamily="Cormorant Garamond, serif" fontStyle="italic" fontSize="14" fill="oklch(0.4 0.05 120)">Gandhi Setu</text>
            </svg>

            {/* Pins */}
            {[
              [320, 340, true], [240, 280, false], [430, 460, false], [180, 200, false], [490, 350, false],
            ].map(([x, y, big], i) => (
              <motion.div key={i} initial={{ scale: 0, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ delay: i * 0.1, type: 'spring' }}
                className="absolute -translate-x-1/2 -translate-y-full" style={{ left: `${(x as number)/6}%`, top: `${(y as number)/6}%` }}>
                <div className="relative">
                  {big && <div className="absolute inset-0 rounded-full animate-ping" style={{ background: 'var(--mishri-gold)' }}/>}
                  <div className={`relative ${big ? 'size-7' : 'size-5'} rounded-full grid place-items-center ring-2 ring-white`} style={{ background: 'var(--mishri-gold)' }}>
                    <MapPin className={`${big ? 'size-4' : 'size-3'}`} style={{ color: 'var(--mishri-text-inverse)' }} strokeWidth={2.2}/>
                  </div>
                </div>
              </motion.div>
            ))}

            <div className="absolute bottom-5 left-5 right-5 p-4 rounded-2xl flex items-center gap-3" style={{ background: 'oklch(0.97 0.012 85 / 0.95)', backdropFilter: 'blur(12px)' }}>
              <div className="size-10 rounded-full grid place-items-center shrink-0" style={{ background: 'var(--mishri-gold)', color: 'var(--mishri-text-inverse)' }}>
                <MapPin className="size-4"/>
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-[14px] font-medium">Mishri Flagship · Station Road, Hajipur</div>
                <div className="text-[12px]" style={{ color: 'var(--mishri-text-muted)' }}>Open now · closes 9 PM · 0.8 km from you</div>
              </div>
              <button className="px-4 h-9 rounded-full text-[12px] tracking-[0.14em] uppercase font-medium" style={{ background: 'var(--mishri-text)', color: 'var(--mishri-text-inverse)' }}>Directions</button>
            </div>
          </div>
        </div>
      </section>

      {/* Contact form */}
      <section className="max-w-[1100px] mx-auto px-5 lg:px-10 pb-20 lg:pb-32 grid lg:grid-cols-[1.1fr_1fr] gap-10 lg:gap-20 items-start">
        <div>
          <SectionLabel>Drop us a line</SectionLabel>
          <h2 className="font-display mt-4 text-balance" style={{ fontSize: 'var(--text-2xl)' }}>
            We read <span className="italic" style={{ color: 'var(--mishri-gold)' }}>every</span> message.
          </h2>
          <p className="mt-4 text-[15.5px] leading-relaxed" style={{ color: 'var(--mishri-text-muted)' }}>
            Aryan, our founder, still personally replies to feedback emails on weekends. If your message has “bilona” in the subject line, expect a fast reply.
          </p>
          <div className="mt-8 space-y-4">
            <ContactRow icon={Mail} label="Email" value="help@mishri.in"/>
            <ContactRow icon={MessageCircle} label="WhatsApp" value="+91 98765 43210 · 9am to 7pm"/>
            <ContactRow icon={MapPin} label="HQ" value="Mishri Dairy Pvt Ltd, Station Rd, Hajipur, Vaishali, Bihar 844101"/>
          </div>
        </div>

        <form
          onSubmit={(e) => { e.preventDefault(); toast.success('Got it. We will reply within 24 hours.'); (e.target as HTMLFormElement).reset(); }}
          className="p-5 sm:p-8 rounded-[24px] space-y-4" style={{ background: 'var(--mishri-surface)', boxShadow: 'var(--shadow-md)' }}>
          <div className="grid sm:grid-cols-2 gap-4">
            <FormField label="Name" name="name" required/>
            <FormField label="Email" name="email" type="email" required/>
          </div>
          <FormField label="Subject" name="subject"/>
          <label className="block">
            <span className="text-[11px] tracking-[0.2em] uppercase block mb-2" style={{ color: 'var(--mishri-text-muted)' }}>Message</span>
            <textarea name="message" required rows={5} className="w-full px-4 py-3 rounded-xl border bg-transparent text-[15px] outline-none focus:border-[var(--mishri-gold)] resize-none"
              style={{ borderColor: 'var(--mishri-border)' }}/>
          </label>
          <button type="submit" className="w-full h-12 rounded-full text-[12px] tracking-[0.2em] uppercase font-semibold transition-colors"
            style={{ background: 'var(--mishri-gold)', color: 'var(--mishri-text-inverse)' }}>
            Send message
          </button>
        </form>
      </section>
    </>
  );
}

function ContactPill({ icon: I, label, value }: any) {
  return (
    <a className="w-full sm:w-auto flex items-center gap-3 px-4 py-3 rounded-2xl hover:translate-y-[-2px] transition-transform"
      style={{ background: 'var(--mishri-surface)', boxShadow: 'var(--shadow-sm)' }}>
      <div className="size-9 rounded-full grid place-items-center" style={{ background: 'var(--mishri-gold)', color: 'var(--mishri-text-inverse)' }}><I className="size-4"/></div>
      <div>
        <div className="text-[10px] tracking-[0.18em] uppercase opacity-60">{label}</div>
        <div className="text-[13px] font-medium">{value}</div>
      </div>
    </a>
  );
}

function ContactRow({ icon: I, label, value }: any) {
  return (
    <div className="flex items-start gap-4">
      <div className="size-10 rounded-full grid place-items-center shrink-0" style={{ background: 'var(--mishri-surface-offset)', color: 'var(--mishri-gold)' }}><I className="size-4"/></div>
      <div>
        <div className="text-[11px] tracking-[0.18em] uppercase opacity-60">{label}</div>
        <div className="text-[15px] mt-0.5">{value}</div>
      </div>
    </div>
  );
}

function FormField({ label, name, type = 'text', required }: { label: string; name: string; type?: string; required?: boolean }) {
  return (
    <label className="block">
      <span className="text-[11px] tracking-[0.2em] uppercase block mb-2" style={{ color: 'var(--mishri-text-muted)' }}>{label}</span>
      <input type={type} name={name} required={required} className="w-full h-11 px-4 rounded-xl border bg-transparent text-[15px] outline-none focus:border-[var(--mishri-gold)]"
        style={{ borderColor: 'var(--mishri-border)' }}/>
    </label>
  );
}
