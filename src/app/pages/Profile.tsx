import { useState, useCallback } from 'react';
import { motion } from 'motion/react';
import { Package, Heart, MapPin, CreditCard, Gift, ArrowRight, Copy, Share2 } from 'lucide-react';
import { products } from '../data/products';
import { useUser } from '../state/user';

const orders = [
  { id: 'BR20260518', date: '18 May 2026', status: 'Delivered', total: 1344, items: ['p2', 'p1', 'p3'] },
  { id: 'BR20260502', date: '02 May 2026', status: 'Delivered', total: 820, items: ['p2', 'p4'] },
  { id: 'BR20260525', date: 'Today, 25 May', status: 'Out for Delivery', total: 1180, items: ['p1', 'p3'] },
  { id: 'BR20260410', date: '10 Apr 2026', status: 'Delivered', total: 460, items: ['p1'] },
] as const;

type TabKey = 'orders' | 'saved' | 'addresses' | 'payments' | 'rewards';

const tabs: { key: TabKey; label: string; icon: React.ElementType; count?: number }[] = [
  { key: 'orders', label: 'My Orders', icon: Package, count: orders.length },
  { key: 'saved', label: 'Saved Items', icon: Heart, count: 4 },
  { key: 'addresses', label: 'Addresses', icon: MapPin, count: 2 },
  { key: 'payments', label: 'Payment Methods', icon: CreditCard, count: 2 },
  { key: 'rewards', label: 'Rewards & Referrals', icon: Gift },
];

export function Profile() {
  const [tab, setTab] = useState<TabKey>('orders');
  const { profile } = useUser();

  const initials = profile.name
    ? profile.name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase()
    : 'ME';

  return (
    <section className="max-w-[1480px] mx-auto px-5 lg:px-10 pt-20 lg:pt-32 pb-16 lg:pb-24">
      <div className="grid lg:grid-cols-[260px_1fr] gap-6 lg:gap-12 xl:gap-16">
        {/* Sidebar */}
        <aside className="self-start lg:sticky lg:top-24 space-y-4">
          {/* Profile card */}
          <div
            className="p-5 sm:p-6 rounded-[20px]"
            style={{ background: 'var(--mishri-surface)', boxShadow: 'var(--shadow-sm)' }}
          >
            <div
              className="size-14 sm:size-16 rounded-full grid place-items-center font-display text-[22px] sm:text-[26px] mb-3 ring-2"
              style={{
                background: 'var(--mishri-surface-offset)',
                color: 'var(--mishri-gold)',
                ringColor: 'var(--mishri-gold)',
                outline: '2px solid var(--mishri-gold)',
                outlineOffset: '2px',
              }}
              aria-label={`Profile initials: ${initials}`}
            >
              {initials}
            </div>
            <div className="font-body text-[16px] sm:text-[17px] font-semibold">
              {profile.name || 'Mishri Member'}
            </div>
            <div
              className="text-[13px] mt-0.5 truncate"
              style={{ color: 'var(--mishri-text-muted)' }}
            >
              {profile.email || 'Welcome back'}
            </div>
            <div
              className="mt-4 inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] tracking-[0.18em] uppercase font-semibold"
              style={{ background: 'var(--mishri-gold)', color: 'var(--mishri-text-inverse)' }}
            >
              ✦ Gold Member
            </div>
            <div className="text-[11px] mt-2 opacity-50">Joined February 2026 · 6 orders</div>
          </div>

          {/* Tab nav */}
          <nav
            className="flex lg:flex-col gap-1 overflow-x-auto scrollbar-hide -mx-5 px-5 lg:mx-0 lg:px-0 pb-1 lg:pb-0"
            aria-label="Profile sections"
          >
            {tabs.map(t => {
              const active = tab === t.key;
              return (
                <button
                  key={t.key}
                  onClick={() => setTab(t.key)}
                  aria-current={active ? 'page' : undefined}
                  className="flex items-center gap-2 lg:gap-3 px-4 py-3 rounded-xl transition-colors relative whitespace-nowrap min-w-max lg:min-w-0 lg:w-full text-left"
                  style={
                    active
                      ? { background: 'var(--mishri-surface-offset)', color: 'var(--mishri-text)' }
                      : { color: 'var(--mishri-text-muted)' }
                  }
                >
                  {active && (
                    <>
                      <span
                        className="hidden lg:block absolute left-0 top-2 bottom-2 w-1 rounded-r-full"
                        style={{ background: 'var(--mishri-gold)' }}
                        aria-hidden="true"
                      />
                      <span
                        className="lg:hidden absolute bottom-0 left-4 right-4 h-[3px] rounded-t-full"
                        style={{ background: 'var(--mishri-gold)' }}
                        aria-hidden="true"
                      />
                    </>
                  )}
                  <t.icon className="size-[18px] shrink-0" strokeWidth={1.6} />
                  <span className="text-[14px] flex-1">{t.label}</span>
                  {t.count !== undefined && (
                    <span className="text-[11px] opacity-50">{t.count}</span>
                  )}
                </button>
              );
            })}
          </nav>
        </aside>

        {/* Content */}
        <div>
          <motion.div
            key={tab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            {tab === 'orders' && <OrdersTab />}
            {tab === 'saved' && <SavedTab />}
            {tab === 'addresses' && <AddressesTab />}
            {tab === 'payments' && <PaymentsTab />}
            {tab === 'rewards' && <RewardsTab />}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function statusColor(s: string): string {
  if (s === 'Delivered') return 'var(--mishri-success)';
  if (s === 'Out for Delivery') return 'var(--mishri-gold)';
  return 'var(--mishri-text-muted)';
}

function OrdersTab() {
  return (
    <div>
      <h2 className="font-display" style={{ fontSize: 'clamp(24px, 3vw, 36px)' }}>
        Your Orders
      </h2>
      <p className="mt-1 text-[14px]" style={{ color: 'var(--mishri-text-muted)' }}>
        Every jar that found its way home.
      </p>

      <div className="mt-6 space-y-4">
        {orders.map(o => {
          const items = o.items
            .map(id => products.find(p => p.id === id))
            .filter(Boolean) as typeof products;
          return (
            <article
              key={o.id}
              className="rounded-2xl p-4 sm:p-5 lg:p-6"
              style={{ background: 'var(--mishri-surface)' }}
            >
              <div className="flex items-start justify-between flex-wrap gap-3 mb-4">
                <div>
                  <div
                    className="text-[11px] tracking-[0.18em] uppercase font-medium"
                    style={{ color: 'var(--mishri-text-muted)' }}
                  >
                    Order #{o.id}
                  </div>
                  <div className="text-[14px] mt-0.5">{o.date}</div>
                </div>
                <span
                  className="px-3 py-1 rounded-full text-[11px] tracking-[0.14em] uppercase font-semibold border"
                  style={{
                    color: statusColor(o.status),
                    borderColor: statusColor(o.status),
                    background: `${statusColor(o.status)}12`,
                  }}
                >
                  {o.status}
                </span>
              </div>

              <div className="text-[13px] mb-4" style={{ color: 'var(--mishri-text-muted)' }}>
                {items.map(p => p.name).join(' · ')}
              </div>

              <div className="pt-4 border-t flex items-center justify-between gap-3 flex-wrap" style={{ borderColor: 'var(--mishri-divider)' }}>
                <div className="font-body font-bold text-[18px] tabular-nums">₹{o.total}</div>
                <div className="flex gap-2">
                  <button
                    className="px-4 h-9 rounded-full text-[12px] font-medium border transition-colors hover:border-[var(--mishri-text)]"
                    style={{ borderColor: 'var(--mishri-border)' }}
                  >
                    Track
                  </button>
                  <button
                    className="px-4 h-9 rounded-full text-[12px] font-semibold transition-all hover:opacity-90 active:scale-95"
                    style={{ background: 'var(--mishri-text)', color: 'var(--mishri-text-inverse)' }}
                  >
                    Reorder
                  </button>
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </div>
  );
}

function SavedTab() {
  const saved = products.slice(0, 4);
  return (
    <div>
      <h2 className="font-display" style={{ fontSize: 'clamp(24px, 3vw, 36px)' }}>
        Saved for Later
      </h2>
      <div className="mt-6 grid sm:grid-cols-2 gap-4">
        {saved.map(p => (
          <article
            key={p.id}
            className="rounded-2xl overflow-hidden flex"
            style={{ background: 'var(--mishri-surface)' }}
          >
            <div
              className="w-28 sm:w-32 shrink-0 grid place-items-center"
              style={{ background: 'var(--mishri-surface-offset)' }}
              aria-hidden="true"
            >
              <Package className="size-8 opacity-20" strokeWidth={1.4} />
            </div>
            <div className="p-4 flex-1 flex flex-col min-w-0">
              <div className="text-[10px] tracking-[0.18em] uppercase opacity-60">{p.categoryLabel}</div>
              <h3 className="text-[15px] font-semibold mt-1 truncate">{p.name}</h3>
              <p
                className="font-display italic text-[12px] sm:text-[13px] mt-0.5 line-clamp-2"
                style={{ color: 'var(--mishri-text-muted)' }}
              >
                "{p.tagline}"
              </p>
              <div className="mt-auto flex items-center justify-between pt-3">
                <span className="font-bold text-[15px] tabular-nums">
                  {p.variants[0].price ? `₹${p.variants[0].price}` : 'Coming soon'}
                </span>
                <button
                  className="px-3 h-8 rounded-full text-[11px] tracking-[0.14em] uppercase font-semibold transition-all hover:opacity-90 active:scale-95"
                  style={{ background: 'var(--mishri-gold)', color: 'var(--mishri-text-inverse)' }}
                >
                  Add
                </button>
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}

function AddressesTab() {
  const { profile } = useUser();

  const addressList = [
    {
      type: 'Home',
      name: profile.name || 'Priya Sinha',
      line: `${profile.addressLine1 || 'Flat 3B, Ganga Apartments, Station Road'}${profile.addressLine2 ? ', ' + profile.addressLine2 : ''}, ${profile.city || 'Hajipur'}`,
      pin: profile.pincode || '844101',
      phone: profile.phone || '+91 98XXX 43210',
      default: true,
    },
    {
      type: 'Work',
      name: profile.name || 'Priya Sinha',
      line: 'Patliputra Industrial Area, Phase II, Patna',
      pin: '800013',
      phone: profile.phone || '+91 98XXX 43210',
      default: false,
    },
  ];

  return (
    <div>
      <div className="flex items-center justify-between gap-4 flex-wrap">
        <h2 className="font-display" style={{ fontSize: 'clamp(24px, 3vw, 36px)' }}>
          Delivery Addresses
        </h2>
        <button
          className="px-5 h-10 rounded-full text-[12px] tracking-[0.14em] uppercase font-semibold border transition-all hover:bg-[var(--mishri-surface-offset)] active:scale-95"
          style={{ borderColor: 'var(--mishri-text)' }}
        >
          + Add Address
        </button>
      </div>

      <div className="mt-6 grid md:grid-cols-2 gap-4">
        {addressList.map(a => (
          <div
            key={a.type}
            className="p-5 sm:p-6 rounded-2xl relative"
            style={{ background: 'var(--mishri-surface)' }}
          >
            {a.default && (
              <span
                className="absolute top-4 right-4 px-2.5 py-0.5 rounded-full text-[10px] tracking-[0.18em] uppercase font-semibold"
                style={{ background: 'var(--mishri-gold)', color: 'var(--mishri-text-inverse)' }}
              >
                Default
              </span>
            )}
            <div
              className="text-[11px] tracking-[0.2em] uppercase font-semibold"
              style={{ color: 'var(--mishri-gold)' }}
            >
              {a.type}
            </div>
            <div className="mt-2 font-semibold text-[16px]">{a.name}</div>
            <div
              className="mt-2 text-[13.5px] leading-relaxed"
              style={{ color: 'var(--mishri-text-muted)' }}
            >
              {a.line}
              <br />PIN — {a.pin}
              <br />{a.phone}
            </div>
            <div className="mt-5 flex gap-4 text-[12px] font-medium">
              <button className="hover:text-[var(--mishri-gold)] transition-colors">Edit</button>
              <span className="opacity-30" aria-hidden="true">·</span>
              <button className="hover:text-[var(--mishri-rose)] transition-colors">Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function PaymentsTab() {
  const cards = [
    { brand: 'SBI Bank', last: '4421', exp: '04/28' },
    { brand: 'UPI', id: 'priya@oksbi' },
  ];

  return (
    <div>
      <h2 className="font-display" style={{ fontSize: 'clamp(24px, 3vw, 36px)' }}>
        Payment Methods
      </h2>
      <div className="mt-6 space-y-3">
        {cards.map((c, i) => (
          <div
            key={i}
            className="p-5 rounded-2xl flex items-center justify-between gap-4"
            style={{ background: 'var(--mishri-surface)' }}
          >
            <div className="flex items-center gap-4">
              <div
                className="w-14 h-9 rounded-md grid place-items-center text-[11px] font-bold"
                style={{ background: 'var(--mishri-text)', color: 'var(--mishri-text-inverse)' }}
                aria-hidden="true"
              >
                {c.brand.split(' ')[0]}
              </div>
              <div>
                <div className="text-[15px] font-medium">
                  {'last' in c ? `•••• ${c.last}` : c.id}
                </div>
                <div className="text-[12px]" style={{ color: 'var(--mishri-text-muted)' }}>
                  {'exp' in c ? `Expires ${c.exp}` : 'UPI ID'}
                </div>
              </div>
            </div>
            <button
              className="text-[12px] font-medium opacity-50 hover:opacity-100 hover:text-[var(--mishri-rose)] transition-all"
              aria-label={`Remove ${'last' in c ? `card ending ${c.last}` : c.id}`}
            >
              Remove
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

function RewardsTab() {
  const points = 340;
  const referralCode = 'PRIYA-MISHRI-340';

  const copyCode = useCallback(() => {
    navigator.clipboard.writeText(referralCode).catch(() => {
      // Clipboard API may fail on some browsers
    });
  }, [referralCode]);

  const recentActivity: [string, string, string][] = [
    ['Order #BR20260518', '+82', '18 May'],
    ['Bonus — wrote a review', '+50', '05 May'],
    ['Order #BR20260502', '+50', '02 May'],
    ['Redeemed for ₹15 off', '−150', '21 Apr'],
  ];

  return (
    <div>
      {/* Balance card */}
      <div
        className="rounded-[24px] p-6 sm:p-8 lg:p-10 relative overflow-hidden"
        style={{ background: 'var(--mishri-surface-deep)', color: 'var(--mishri-text-inverse)' }}
      >
        <div
          className="absolute -right-10 -top-10 size-60 rounded-full opacity-20 anim-spin-slow jali-bg pointer-events-none"
          aria-hidden="true"
        />
        <div className="relative">
          <div className="text-[11px] tracking-[0.24em] uppercase opacity-60">Reward balance</div>
          <div
            className="font-display mt-2 tabular-nums"
            style={{ fontSize: 'clamp(64px, 10vw, 120px)', color: 'var(--mishri-gold)', lineHeight: 0.9 }}
            aria-label={`${points} reward points`}
          >
            {points}
          </div>
          <div className="text-[14px] opacity-80 mt-2">
            points · ≈{' '}
            <span style={{ color: 'var(--mishri-gold)' }}>₹{Math.round(points / 10)}</span>
            {' '}off your next order
          </div>

          <div className="mt-8 max-w-xs sm:max-w-md" aria-label="Tier progress">
            <div className="flex items-center justify-between text-[12px] opacity-70 mb-2">
              <span>GOLD</span>
              <span>PLATINUM · {500 - points} points to go</span>
            </div>
            <div
              className="h-2 rounded-full"
              style={{ background: 'oklch(0.30 0.02 50)' }}
              role="progressbar"
              aria-valuenow={points}
              aria-valuemin={0}
              aria-valuemax={500}
            >
              <div
                className="h-full rounded-full"
                style={{
                  width: `${(points / 500) * 100}%`,
                  background: 'linear-gradient(90deg, var(--mishri-gold), oklch(0.75 0.15 80))',
                }}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="mt-6 grid sm:grid-cols-2 gap-4">
        {/* Referral */}
        <div
          className="p-5 sm:p-6 rounded-2xl"
          style={{ background: 'var(--mishri-surface)' }}
        >
          <h3 className="font-display italic text-[20px]">Refer a Friend</h3>
          <p className="mt-1 text-[13.5px]" style={{ color: 'var(--mishri-text-muted)' }}>
            You both get ₹150 off when they place their first order.
          </p>
          <div
            className="mt-5 p-3 rounded-xl flex items-center gap-3 border-dashed border-2"
            style={{ borderColor: 'var(--mishri-gold)' }}
          >
            <span className="font-mono text-[14px] flex-1 tracking-wider" aria-label={`Referral code: ${referralCode}`}>
              {referralCode}
            </span>
            <button
              onClick={copyCode}
              className="size-9 rounded-full grid place-items-center transition-all hover:opacity-80 active:scale-95"
              style={{ background: 'var(--mishri-gold)', color: 'var(--mishri-text-inverse)' }}
              aria-label="Copy referral code"
            >
              <Copy className="size-4" />
            </button>
          </div>
          <button
            className="mt-4 inline-flex items-center gap-2 text-[13px] font-medium hover:gap-3 transition-all"
            style={{ color: 'var(--mishri-gold)' }}
          >
            <Share2 className="size-3.5" />
            Share on WhatsApp
          </button>
        </div>

        {/* Recent activity */}
        <div
          className="p-5 sm:p-6 rounded-2xl"
          style={{ background: 'var(--mishri-surface)' }}
        >
          <h3 className="font-display italic text-[20px]">Recent Activity</h3>
          <ul className="mt-4 space-y-3 text-[13.5px]" aria-label="Reward activity">
            {recentActivity.map(([label, pts, date]) => (
              <li
                key={label}
                className="flex items-center justify-between pb-2.5 border-b last:border-0"
                style={{ borderColor: 'var(--mishri-divider)' }}
              >
                <div>
                  <div className="font-medium leading-tight">{label}</div>
                  <div className="text-[11px] opacity-55 mt-0.5">{date}</div>
                </div>
                <div
                  className="font-mono text-[14px] font-semibold tabular-nums"
                  style={{
                    color: pts.startsWith('+')
                      ? 'var(--mishri-success)'
                      : 'var(--mishri-rose)',
                  }}
                  aria-label={`${pts} points`}
                >
                  {pts}
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
