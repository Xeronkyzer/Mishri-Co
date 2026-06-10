import { useState } from 'react';
import { motion } from 'motion/react';
import { ChevronDown, MessageCircle, Mail, Phone } from 'lucide-react';
import { Switch } from '../components/ui/switch';

const tabs = ['Account', 'Notifications', 'Privacy', 'Orders', 'Help & Support'] as const;

export function Settings() {
  const [tab, setTab] = useState<(typeof tabs)[number]>('Account');

  return (
    <section className="max-w-5xl mx-auto px-5 lg:px-10 pt-20 lg:pt-32 pb-16 lg:pb-24">
      <div className="flex items-end justify-between mb-2 flex-wrap gap-3">
        <h1 className="font-display" style={{ fontSize: 'var(--text-2xl)' }}>Settings</h1>
        <p className="text-[14px]" style={{ color: 'var(--mishri-text-muted)' }}>Last saved · 25 May, 11:14 AM</p>
      </div>
      <p style={{ color: 'var(--mishri-text-muted)' }}>Tune how Mishri works for you. Everything saves automatically.</p>

      {/* Tabs */}
      <div className="mt-10 sticky top-20 z-30 -mx-5 lg:mx-0 px-5 lg:px-0">
        <div className="flex gap-1 overflow-x-auto scrollbar-hide p-1 rounded-full" style={{ background: 'var(--mishri-surface)', boxShadow: 'var(--shadow-sm)' }}>
          {tabs.map(t => (
            <button key={t} onClick={() => setTab(t)}
              className="relative px-5 h-10 rounded-full whitespace-nowrap text-[13px] font-medium transition-colors"
              style={tab === t ? { color: 'var(--mishri-text-inverse)' } : { color: 'var(--mishri-text-muted)' }}>
              {tab === t && <motion.span layoutId="settings-tab" className="absolute inset-0 rounded-full" style={{ background: 'var(--mishri-text)' }} transition={{ type: 'spring', stiffness: 300, damping: 30 }}/>}
              <span className="relative">{t}</span>
            </button>
          ))}
        </div>
      </div>

      <motion.div key={tab} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="mt-10 space-y-10">
        {tab === 'Account' && <AccountTab/>}
        {tab === 'Notifications' && <NotifsTab/>}
        {tab === 'Privacy' && <PrivacyTab/>}
        {tab === 'Orders' && <OrdersTab/>}
        {tab === 'Help & Support' && <HelpTab/>}
      </motion.div>
    </section>
  );
}

function Section({ title, desc, children }: { title: string; desc?: string; children: React.ReactNode }) {
  return (
    <div className="grid lg:grid-cols-[280px_1fr] gap-4 sm:gap-6 lg:gap-10 pb-8 sm:pb-10 border-b" style={{ borderColor: 'var(--mishri-divider)' }}>
      <div>
        <h2 className="font-display italic text-[22px]">{title}</h2>
        {desc && <p className="mt-2 text-[13.5px]" style={{ color: 'var(--mishri-text-muted)' }}>{desc}</p>}
      </div>
      <div className="space-y-4">{children}</div>
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <div className="text-[11px] tracking-[0.2em] uppercase mb-2" style={{ color: 'var(--mishri-text-muted)' }}>{label}</div>
      {children}
    </label>
  );
}

const inputCls = "w-full h-11 px-4 rounded-xl border bg-transparent text-[15px] outline-none focus:border-[var(--mishri-gold)] transition-colors";
const inputStyle = { borderColor: 'var(--mishri-border)' } as React.CSSProperties;

import { useUser } from '../state/user';

function AccountTab() {
  const { profile, updateProfile } = useUser();
  const initials = profile.name ? profile.name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase() : 'ME';

  return (
    <>
      <Section title="Personal" desc="Used to greet you and personalise recommendations.">
        <div className="flex items-center gap-4">
          <div className="size-16 rounded-full grid place-items-center font-display text-[24px] ring-2"
            style={{ background: 'var(--mishri-surface-offset)', color: 'var(--mishri-gold)', '--tw-ring-color': 'var(--mishri-gold)' } as React.CSSProperties}>{initials}</div>
          <button className="px-4 h-9 rounded-full border text-[12px]" style={{ borderColor: 'var(--mishri-border)' }}>Upload new</button>
        </div>
        <div className="grid sm:grid-cols-2 gap-3 sm:gap-4">
          <Field label="Full name"><input className={inputCls} style={inputStyle} defaultValue={profile.name} onBlur={e => updateProfile({ name: e.target.value })}/></Field>
          <Field label="Phone"><input className={inputCls} style={inputStyle} defaultValue={profile.phone} onBlur={e => updateProfile({ phone: e.target.value })}/></Field>
        </div>
        <Field label="Date of birth"><input type="date" className={inputCls} style={inputStyle} defaultValue="1994-03-12"/></Field>
      </Section>

      <Section title="Email & password" desc="Used to log in. Changing email logs out other devices.">
        <Field label="Email"><input className={inputCls} style={inputStyle} defaultValue={profile.email} onBlur={e => updateProfile({ email: e.target.value })}/></Field>
        <button className="text-[13px] underline underline-offset-4 self-start" style={{ color: 'var(--mishri-gold)' }}>Change password →</button>
      </Section>

      <Section title="Language & region" desc="Localises recipes, festivals and delivery slots.">
        <div className="grid sm:grid-cols-2 gap-3 sm:gap-4">
          <Field label="Language">
            <div className="relative">
              <select className={inputCls + ' appearance-none cursor-pointer pr-10'} style={inputStyle}>
                <option>English</option><option>हिंदी (Hindi)</option><option>भोजपुरी (Bhojpuri)</option><option>मैथिली (Maithili)</option>
              </select>
              <ChevronDown className="size-4 absolute right-3 top-1/2 -translate-y-1/2 opacity-60 pointer-events-none"/>
            </div>
          </Field>
          <Field label="Preferred delivery city">
            <div className="relative">
              <select className={inputCls + ' appearance-none cursor-pointer pr-10'} style={inputStyle} value={profile.city} onChange={e => updateProfile({ city: e.target.value })}>
                <option>Hajipur</option><option>Patna</option><option>Muzaffarpur</option><option>Darbhanga</option><option>Bhagalpur</option>
              </select>
              <ChevronDown className="size-4 absolute right-3 top-1/2 -translate-y-1/2 opacity-60 pointer-events-none"/>
            </div>
          </Field>
        </div>
      </Section>
    </>
  );
}

function NotifsTab() {
  const list = [
    ['Order updates', 'Always on. Required for delivery alerts.', true, true],
    ['Promotional offers', 'Festival discounts and seasonal launches.', true, false],
    ['New product launches', 'Be the first to know about a new flavour.', true, false],
    ['Recipe recommendations', 'Weekly recipes featuring your last order.', false, false],
    ['WhatsApp notifications', 'Order updates over WhatsApp instead of SMS.', true, false],
    ['SMS notifications', 'Fallback if WhatsApp is unreachable.', false, false],
  ] as const;
  return (
    <Section title="Notifications" desc="Choose how we reach you. Order alerts are required — everything else is yours to silence.">
      <div className="divide-y rounded-2xl" style={{ background: 'var(--mishri-surface)' }}>
        {list.map(([label, desc, on, disabled]) => (
          <Row key={label as string} label={label as string} desc={desc as string} defaultOn={on as boolean} disabled={disabled as boolean}/>
        ))}
      </div>
    </Section>
  );
}

function Row({ label, desc, defaultOn, disabled }: { label: string; desc: string; defaultOn: boolean; disabled?: boolean }) {
  const [on, setOn] = useState(defaultOn);
  return (
    <div className="flex items-start gap-3 sm:gap-4 p-4 sm:p-5">
      <div className="flex-1">
        <div className="text-[14.5px] font-medium">{label} {disabled && <span className="ml-2 text-[10px] tracking-[0.18em] uppercase opacity-50">(Locked)</span>}</div>
        <div className="text-[12.5px] mt-1" style={{ color: 'var(--mishri-text-muted)' }}>{desc}</div>
      </div>
      <Switch checked={on} disabled={disabled} onCheckedChange={setOn}/>
    </div>
  );
}

function PrivacyTab() {
  return (
    <>
      <Section title="Data & analytics" desc="Mishri stores only what's needed to deliver your orders.">
        <Row label="Personalised recommendations" desc="Use my past orders to suggest products." defaultOn={true}/>
        <Row label="Share data with partners" desc="Allow Blinkit/Zepto to access your address." defaultOn={false}/>
      </Section>
      <Section title="Account actions">
        <button className="text-[14px] underline underline-offset-4 self-start" style={{ color: 'var(--mishri-text)' }}>Download all my data (JSON)</button>
        <button className="text-[14px] underline underline-offset-4 self-start" style={{ color: 'var(--mishri-rose)' }}>Delete my account permanently →</button>
      </Section>
    </>
  );
}

function OrdersTab() {
  return (
    <Section title="Order preferences" desc="Defaults applied at checkout — overrideable per order.">
      <Field label="Preferred delivery slot">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-3">
          {['Morning 7–9', 'Evening 5–7', 'Anytime'].map((s, i) => (
            <button key={s} className={`h-10 rounded-xl border text-[13px] ${i === 1 ? '' : 'opacity-60'}`}
              style={{ borderColor: i === 1 ? 'var(--mishri-gold)' : 'var(--mishri-border)', color: i === 1 ? 'var(--mishri-gold)' : 'var(--mishri-text)' }}>{s}</button>
          ))}
        </div>
      </Field>
      <Field label="Default payment method">
        <div className="relative">
          <select className={inputCls + ' appearance-none cursor-pointer pr-10'} style={inputStyle}>
            <option>UPI · priya@oksbi</option><option>SBI Card •••• 4421</option><option>Cash on Delivery</option>
          </select>
          <ChevronDown className="size-4 absolute right-3 top-1/2 -translate-y-1/2 opacity-60 pointer-events-none"/>
        </div>
      </Field>
      <Row label="Auto-subscribe to repeat orders" desc="Bilona Ghee every 30 days at 10% off." defaultOn={true}/>
    </Section>
  );
}

function HelpTab() {
  const faqs = [
    ['What does “bilona method” actually mean?', 'Bilona is the traditional wooden churn used to separate butter from set curd. We use it instead of a centrifuge, which means the ghee retains its aromatic compounds and butyric acid intact.'],
    ['How long does the dahi stay fresh?', '7 days from set date, refrigerated below 4°C. We print both the set date and best-before on the lid — no marketing dates.'],
    ['Where do you source your milk?', 'From eighteen small farmers across Vaishali district in Bihar, along the Gandak river. All Sahiwal and native Bachaur cows. No buffalo.'],
    ['Do you deliver outside the listed cities?', 'Not yet. Our cold chain currently extends to Hajipur, Patna, Muzaffarpur, Darbhanga and Bhagalpur. Ranchi and Lucknow are planned for late 2026.'],
    ['Why is your ghee more expensive than store-brand?', '12L of A2 milk produces 1L of bilona ghee. A centrifuge ghee uses 8L of mixed milk for the same. Different product, different price.'],
    ['How do I cancel a subscription?', 'Settings → Orders → toggle off Auto-subscribe. Or message us on WhatsApp and we’ll do it in 30 seconds.'],
  ];
  const [open, setOpen] = useState<number | null>(0);

  return (
    <>
      <Section title="Frequently asked" desc="Six things people ask us before placing their first order.">
        <div className="rounded-2xl overflow-hidden" style={{ background: 'var(--mishri-surface)' }}>
          {faqs.map(([q, a], i) => (
            <div key={q} className="border-b last:border-0" style={{ borderColor: 'var(--mishri-divider)' }}>
              <button onClick={() => setOpen(open === i ? null : i)} className="w-full text-left p-4 sm:p-5 flex items-center justify-between gap-3 sm:gap-4">
                <span className="font-medium text-[15px]">{q}</span>
                <ChevronDown className={`size-4 transition-transform ${open === i ? 'rotate-180' : ''}`}/>
              </button>
              {open === i && (
                <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} className="px-4 sm:px-5 pb-4 sm:pb-5 text-[14px] leading-relaxed" style={{ color: 'var(--mishri-text-muted)' }}>
                  {a}
                </motion.div>
              )}
            </div>
          ))}
        </div>
      </Section>

      <Section title="Reach a human" desc="We answer every message ourselves between 9 AM – 7 PM.">
        <div className="grid sm:grid-cols-3 gap-3">
          {[
            [MessageCircle, 'WhatsApp', '+91 98765 43210'],
            [Phone, 'Call', '+91 6224 260 100'],
            [Mail, 'Email', 'help@mishri.in'],
          ].map(([I, l, v]: any, i) => (
            <a key={i} className="p-5 rounded-2xl flex items-center gap-3 hover:translate-y-[-2px] transition-transform" style={{ background: 'var(--mishri-surface)' }}>
              <div className="size-10 rounded-full grid place-items-center" style={{ background: 'var(--mishri-gold)', color: 'var(--mishri-text-inverse)' }}><I className="size-4"/></div>
              <div>
                <div className="text-[11px] tracking-[0.18em] uppercase opacity-60">{l}</div>
                <div className="text-[14px] font-medium">{v}</div>
              </div>
            </a>
          ))}
        </div>
      </Section>
    </>
  );
}
