import { useState, ReactNode } from 'react';
import { motion } from 'motion/react';
import { ChevronDown, MessageCircle, Mail, Phone } from 'lucide-react';
import { Switch } from '../components/ui/switch';
import { useUser } from '../state/user';

const TABS = ['Account', 'Notifications', 'Privacy', 'Orders', 'Help & Support'] as const;
type Tab = (typeof TABS)[number];

const inputCls =
  'w-full h-11 px-4 rounded-xl border bg-transparent text-[15px] outline-none focus:border-[var(--mishri-gold)] focus:ring-2 focus:ring-[var(--mishri-gold)]/20 transition-all';
const inputStyle = { borderColor: 'var(--mishri-border)' } satisfies React.CSSProperties;

export function Settings() {
  const [tab, setTab] = useState<Tab>('Account');

  return (
    <section className="max-w-5xl mx-auto px-5 lg:px-10 pt-20 lg:pt-32 pb-16 lg:pb-24">
      <div className="flex items-end justify-between mb-2 flex-wrap gap-3">
        <h1 className="font-display" style={{ fontSize: 'clamp(28px, 4vw, 48px)' }}>
          Settings
        </h1>
        <p className="text-[13px]" style={{ color: 'var(--mishri-text-muted)' }}>
          Changes save automatically
        </p>
      </div>
      <p className="text-[14px]" style={{ color: 'var(--mishri-text-muted)' }}>
        Tune how Aaharvedik works for you.
      </p>

      {/* Tabs */}
      <div className="mt-8 lg:mt-10 sticky top-[60px] lg:top-[72px] z-30 -mx-5 lg:mx-0 px-5 lg:px-0 py-2"
        style={{ background: 'var(--mishri-bg)' }}
      >
        <div
          className="flex gap-1 overflow-x-auto scrollbar-hide p-1 rounded-full"
          style={{ background: 'var(--mishri-surface)', boxShadow: 'var(--shadow-sm)' }}
          role="tablist"
          aria-label="Settings sections"
        >
          {TABS.map(t => (
            <button
              key={t}
              onClick={() => setTab(t)}
              role="tab"
              aria-selected={tab === t}
              aria-controls={`panel-${t}`}
              id={`tab-${t}`}
              className="relative px-4 sm:px-5 h-10 rounded-full whitespace-nowrap text-[12px] sm:text-[13px] font-medium transition-colors"
              style={
                tab === t
                  ? { color: 'var(--mishri-text-inverse)' }
                  : { color: 'var(--mishri-text-muted)' }
              }
            >
              {tab === t && (
                <motion.span
                  layoutId="settings-tab"
                  className="absolute inset-0 rounded-full"
                  style={{ background: 'var(--mishri-text)' }}
                  transition={{ type: 'spring', stiffness: 320, damping: 30 }}
                />
              )}
              <span className="relative">{t}</span>
            </button>
          ))}
        </div>
      </div>

      <motion.div
        key={tab}
        id={`panel-${tab}`}
        role="tabpanel"
        aria-labelledby={`tab-${tab}`}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="mt-8 space-y-10"
      >
        {tab === 'Account' && <AccountTab />}
        {tab === 'Notifications' && <NotifsTab />}
        {tab === 'Privacy' && <PrivacyTab />}
        {tab === 'Orders' && <OrdersTab />}
        {tab === 'Help & Support' && <HelpTab />}
      </motion.div>
    </section>
  );
}

function Section({
  title,
  desc,
  children,
}: {
  title: string;
  desc?: string;
  children: ReactNode;
}) {
  return (
    <div
      className="grid lg:grid-cols-[240px_1fr] gap-4 sm:gap-6 lg:gap-10 pb-8 sm:pb-10 border-b"
      style={{ borderColor: 'var(--mishri-divider)' }}
    >
      <div>
        <h2 className="font-display italic text-[20px] sm:text-[22px]">{title}</h2>
        {desc && (
          <p className="mt-2 text-[13px] leading-relaxed" style={{ color: 'var(--mishri-text-muted)' }}>
            {desc}
          </p>
        )}
      </div>
      <div className="space-y-4">{children}</div>
    </div>
  );
}

function Field({ label, children, id }: { label: string; children: ReactNode; id?: string }) {
  return (
    <div>
      <label
        htmlFor={id}
        className="text-[11px] tracking-[0.2em] uppercase block mb-2"
        style={{ color: 'var(--mishri-text-muted)' }}
      >
        {label}
      </label>
      {children}
    </div>
  );
}

function AccountTab() {
  const { profile, updateProfile } = useUser();
  const initials = profile.name
    ? profile.name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase()
    : 'ME';

  return (
    <>
      <Section title="Personal" desc="Used to greet you and personalise recommendations.">
        <div className="flex items-center gap-4">
          <div
            className="size-16 rounded-full grid place-items-center font-display text-[24px]"
            style={{
              background: 'var(--mishri-surface-offset)',
              color: 'var(--mishri-gold)',
              outline: '2px solid var(--mishri-gold)',
              outlineOffset: '2px',
            }}
            aria-label={`Profile initials: ${initials}`}
          >
            {initials}
          </div>
          <button
            className="px-5 h-9 rounded-full border text-[12px] font-medium transition-all hover:bg-[var(--mishri-surface-offset)]"
            style={{ borderColor: 'var(--mishri-border)' }}
          >
            Upload Photo
          </button>
        </div>

        <div className="grid sm:grid-cols-2 gap-3 sm:gap-4">
          <Field label="Full name" id="settings-name">
            <input
              id="settings-name"
              className={inputCls}
              style={inputStyle}
              defaultValue={profile.name}
              onBlur={e => updateProfile({ name: e.target.value })}
              autoComplete="name"
            />
          </Field>
          <Field label="Phone" id="settings-phone">
            <input
              id="settings-phone"
              type="tel"
              className={inputCls}
              style={inputStyle}
              defaultValue={profile.phone}
              onBlur={e => updateProfile({ phone: e.target.value })}
              autoComplete="tel"
            />
          </Field>
        </div>
        <Field label="Date of birth" id="settings-dob">
          <input
            id="settings-dob"
            type="date"
            className={inputCls}
            style={inputStyle}
            defaultValue="1994-03-12"
          />
        </Field>
      </Section>

      <Section
        title="Email & Password"
        desc="Used to log in. Changing email logs out other devices."
      >
        <Field label="Email" id="settings-email">
          <input
            id="settings-email"
            type="email"
            className={inputCls}
            style={inputStyle}
            defaultValue={profile.email}
            onBlur={e => updateProfile({ email: e.target.value })}
            autoComplete="email"
          />
        </Field>
        <button
          className="text-[13px] underline underline-offset-4 hover:opacity-80 transition-opacity"
          style={{ color: 'var(--mishri-gold)' }}
        >
          Change password →
        </button>
      </Section>

      <Section
        title="Language & Region"
        desc="Localises recipes, festivals and delivery slots."
      >
        <div className="grid sm:grid-cols-2 gap-3 sm:gap-4">
          <Field label="Language" id="settings-lang">
            <div className="relative">
              <select id="settings-lang" className={`${inputCls} appearance-none cursor-pointer pr-10`} style={inputStyle}>
                <option>English</option>
                <option>हिंदी (Hindi)</option>
                <option>भोजपुरी (Bhojpuri)</option>
                <option>मैथिली (Maithili)</option>
              </select>
              <ChevronDown className="size-4 absolute right-3 top-1/2 -translate-y-1/2 opacity-50 pointer-events-none" />
            </div>
          </Field>
          <Field label="Delivery City" id="settings-city">
            <div className="relative">
              <select
                id="settings-city"
                className={`${inputCls} appearance-none cursor-pointer pr-10`}
                style={inputStyle}
                value={profile.city}
                onChange={e => updateProfile({ city: e.target.value })}
              >
                <option>Hajipur</option>
                <option>Patna</option>
                <option>Muzaffarpur</option>
                <option>Darbhanga</option>
                <option>Bhagalpur</option>
              </select>
              <ChevronDown className="size-4 absolute right-3 top-1/2 -translate-y-1/2 opacity-50 pointer-events-none" />
            </div>
          </Field>
        </div>
      </Section>
    </>
  );
}

type NotifRow = { label: string; desc: string; defaultOn: boolean; locked: boolean };

const notifList: NotifRow[] = [
  { label: 'Order updates', desc: 'Always on. Required for delivery alerts.', defaultOn: true, locked: true },
  { label: 'Promotional offers', desc: 'Festival discounts and seasonal launches.', defaultOn: true, locked: false },
  { label: 'New product launches', desc: 'Be the first to know about a new flavour.', defaultOn: true, locked: false },
  { label: 'Recipe recommendations', desc: 'Weekly recipes featuring your last order.', defaultOn: false, locked: false },
  { label: 'WhatsApp notifications', desc: 'Order updates over WhatsApp instead of SMS.', defaultOn: true, locked: false },
  { label: 'SMS notifications', desc: 'Fallback if WhatsApp is unreachable.', defaultOn: false, locked: false },
];

function NotifsTab() {
  return (
    <Section
      title="Notifications"
      desc="Choose how we reach you. Order alerts are required — everything else is yours to silence."
    >
      <div
        className="divide-y rounded-2xl overflow-hidden"
        style={{ background: 'var(--mishri-surface)', divideColor: 'var(--mishri-divider)' }}
      >
        {notifList.map(row => (
          <ToggleRow key={row.label} {...row} />
        ))}
      </div>
    </Section>
  );
}

function ToggleRow({ label, desc, defaultOn, locked }: NotifRow) {
  const [on, setOn] = useState(defaultOn);
  const id = `notif-${label.toLowerCase().replace(/\s+/g, '-')}`;
  return (
    <div className="flex items-start gap-3 sm:gap-4 p-4 sm:p-5">
      <div className="flex-1 min-w-0">
        <div className="text-[14px] font-medium">
          {label}{' '}
          {locked && (
            <span className="ml-1.5 text-[10px] tracking-[0.16em] uppercase opacity-45">
              (Locked)
            </span>
          )}
        </div>
        <div
          className="text-[12.5px] mt-1 leading-relaxed"
          style={{ color: 'var(--mishri-text-muted)' }}
        >
          {desc}
        </div>
      </div>
      <Switch
        id={id}
        checked={on}
        disabled={locked}
        onCheckedChange={setOn}
        aria-label={label}
      />
    </div>
  );
}

function PrivacyTab() {
  return (
    <>
      <Section
        title="Data & Analytics"
        desc="Aaharvedik stores only what's needed to deliver your orders."
      >
        <div
          className="divide-y rounded-2xl overflow-hidden"
          style={{ background: 'var(--mishri-surface)' }}
        >
          <ToggleRow
            label="Personalised recommendations"
            desc="Use my past orders to suggest products."
            defaultOn={true}
            locked={false}
          />
          <ToggleRow
            label="Share data with partners"
            desc="Allow partner apps to access your saved address."
            defaultOn={false}
            locked={false}
          />
        </div>
      </Section>

      <Section title="Account Actions">
        <button
          className="text-[14px] underline underline-offset-4 block hover:opacity-70 transition-opacity"
          style={{ color: 'var(--mishri-text)' }}
        >
          Download all my data (JSON)
        </button>
        <button
          className="text-[14px] underline underline-offset-4 block hover:opacity-80 transition-opacity"
          style={{ color: 'var(--mishri-rose)' }}
        >
          Delete my account permanently →
        </button>
      </Section>
    </>
  );
}

function OrdersTab() {
  const [selectedSlot, setSelectedSlot] = useState(1);
  const slots = ['Morning 7–9 AM', 'Evening 5–7 PM', 'Anytime'];

  return (
    <Section
      title="Order Preferences"
      desc="Defaults applied at checkout — overrideable per order."
    >
      <Field label="Preferred delivery slot">
        <div className="grid grid-cols-3 gap-2">
          {slots.map((s, i) => (
            <button
              key={s}
              onClick={() => setSelectedSlot(i)}
              className="h-11 rounded-xl border text-[12px] sm:text-[13px] font-medium transition-all"
              style={{
                borderColor: selectedSlot === i ? 'var(--mishri-gold)' : 'var(--mishri-border)',
                color: selectedSlot === i ? 'var(--mishri-gold)' : 'var(--mishri-text)',
                background: selectedSlot === i ? 'oklch(0.50 0.10 128 / 0.08)' : 'transparent',
              }}
              aria-pressed={selectedSlot === i}
            >
              {s}
            </button>
          ))}
        </div>
      </Field>

      <Field label="Default payment method" id="settings-payment">
        <div className="relative">
          <select id="settings-payment" className={`${inputCls} appearance-none cursor-pointer pr-10`} style={inputStyle}>
            <option>UPI · priya@oksbi</option>
            <option>SBI Card •••• 4421</option>
            <option>Cash on Delivery</option>
          </select>
          <ChevronDown className="size-4 absolute right-3 top-1/2 -translate-y-1/2 opacity-50 pointer-events-none" />
        </div>
      </Field>

      <div
        className="divide-y rounded-2xl overflow-hidden"
        style={{ background: 'var(--mishri-surface)' }}
      >
        <ToggleRow
          label="Auto-subscribe to repeat orders"
          desc="Bilona Ghee every 30 days at 10% off."
          defaultOn={true}
          locked={false}
        />
      </div>
    </Section>
  );
}

const faqs: [string, string][] = [
  ['What does "bilona method" actually mean?', 'Bilona is the traditional wooden churn used to separate butter from set curd. We use it instead of a centrifuge, which means the ghee retains its aromatic compounds and butyric acid intact.'],
  ['How long does the dahi stay fresh?', '7 days from set date, refrigerated below 4°C. We print both the set date and best-before on the lid — no marketing dates.'],
  ['Where do you source your milk?', 'From eighteen small farmers across Vaishali district in Bihar, along the Gandak river. All Sahiwal and native Bachaur cows. No buffalo.'],
  ['Do you deliver outside the listed cities?', 'Not yet. Our cold chain currently extends to Hajipur, Patna, Muzaffarpur, Darbhanga and Bhagalpur. Ranchi and Lucknow are planned for late 2026.'],
  ['Why is your ghee more expensive than store-brand?', '12L of A2 milk produces 1L of bilona ghee. A centrifuge ghee uses 8L of mixed milk for the same yield. Different product, different price.'],
  ['How do I cancel a subscription?', "Settings → Orders → toggle off Auto-subscribe. Or message us on WhatsApp and we'll handle it in 30 seconds."],
];

function HelpTab() {
  const [open, setOpen] = useState<number | null>(0);

  const helpLinks = [
    { Icon: MessageCircle, label: 'WhatsApp', value: '+91 96259 80156', href: 'https://wa.me/919625980156' },
    { Icon: Phone, label: 'Call', value: '+91 96259 80156', href: 'tel:+919625980156' },
    { Icon: Mail, label: 'Email', value: 'dairyscoop.India@gmail.com', href: 'mailto:dairyscoop.India@gmail.com' },
  ];

  return (
    <>
      <Section
        title="Frequently Asked"
        desc="Six things people ask us before placing their first order."
      >
        <div
          className="rounded-2xl overflow-hidden"
          style={{ background: 'var(--mishri-surface)' }}
        >
          {faqs.map(([q, a], i) => (
            <div
              key={i}
              className="border-b last:border-0"
              style={{ borderColor: 'var(--mishri-divider)' }}
            >
              <button
                onClick={() => setOpen(open === i ? null : i)}
                className="w-full text-left p-4 sm:p-5 flex items-start justify-between gap-3 sm:gap-4 hover:bg-[var(--mishri-surface-offset)] transition-colors"
                aria-expanded={open === i}
              >
                <span className="font-medium text-[14px] sm:text-[15px] leading-snug flex-1">
                  {q}
                </span>
                <ChevronDown
                  className={`size-4 shrink-0 mt-0.5 transition-transform duration-200 ${open === i ? 'rotate-180' : ''}`}
                />
              </button>
              {open === i && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="px-4 sm:px-5 pb-4 sm:pb-5 text-[13.5px] leading-relaxed"
                  style={{ color: 'var(--mishri-text-muted)' }}
                >
                  {a}
                </motion.div>
              )}
            </div>
          ))}
        </div>
      </Section>

      <Section
        title="Reach a Human"
        desc="We answer every message ourselves between 9 AM – 7 PM."
      >
        <div className="grid sm:grid-cols-3 gap-3">
          {helpLinks.map(({ Icon, label, value, href }) => (
            <a
              key={label}
              href={href}
              rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
              target={href.startsWith('http') ? '_blank' : undefined}
              className="p-4 sm:p-5 rounded-2xl flex items-center gap-3 hover:-translate-y-0.5 transition-transform"
              style={{ background: 'var(--mishri-surface)' }}
            >
              <div
                className="size-10 rounded-full grid place-items-center shrink-0"
                style={{ background: 'var(--mishri-gold)', color: 'var(--mishri-text-inverse)' }}
                aria-hidden="true"
              >
                <Icon className="size-4" />
              </div>
              <div className="min-w-0">
                <div className="text-[11px] tracking-[0.18em] uppercase opacity-55">{label}</div>
                <div className="text-[13px] font-medium truncate">{value}</div>
              </div>
            </a>
          ))}
        </div>
      </Section>
    </>
  );
}
