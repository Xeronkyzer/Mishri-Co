import { useState } from 'react';
import { motion } from 'motion/react';
import { Package, Heart, MapPin, CreditCard, Gift, ArrowRight, Copy, Share2 } from 'lucide-react';
import { products } from '../data/products';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';

const orders = [
  { id: 'BR20260518', date: '18 May 2026', status: 'Delivered', total: 1344, items: ['p2', 'p1', 'p3'] },
  { id: 'BR20260502', date: '02 May 2026', status: 'Delivered', total: 820, items: ['p2', 'p4'] },
  { id: 'BR20260525', date: 'Today, 25 May', status: 'Out for Delivery', total: 1180, items: ['p2', 'p6'] },
  { id: 'BR20260410', date: '10 Apr 2026', status: 'Delivered', total: 460, items: ['p5'] },
];

const addresses = [
  { type: 'Home', name: 'Priya Sinha', line: 'Flat 3B, Ganga Apartments, Station Road, Hajipur', pin: '844101', phone: '+91 98XXX 43210', default: true },
  { type: 'Work', name: 'Priya Sinha', line: 'Patliputra Industrial Area, Phase II, Patna', pin: '800013', phone: '+91 98XXX 43210' },
];

import { useUser } from '../state/user';

const tabs = [
  { key: 'orders', label: 'My Orders', icon: Package, count: orders.length },
  { key: 'saved', label: 'Saved Items', icon: Heart, count: 4 },
  { key: 'addresses', label: 'Addresses', icon: MapPin, count: 2 },
  { key: 'payments', label: 'Payment Methods', icon: CreditCard, count: 2 },
  { key: 'rewards', label: 'Rewards & Referrals', icon: Gift },
] as const;

export function Profile() {
  const [tab, setTab] = useState<(typeof tabs)[number]['key']>('orders');
  const { profile } = useUser();
  const initials = profile.name ? profile.name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase() : 'ME';

  return (
    <section className="max-w-[1480px] mx-auto px-5 lg:px-10 pt-20 lg:pt-32 pb-16 lg:pb-24">
      <div className="grid lg:grid-cols-[280px_1fr] gap-8 lg:gap-14">
        <aside className="self-start lg:sticky lg:top-28 space-y-6">
          <div className="p-6 rounded-[20px]" style={{ background: 'var(--mishri-surface)', boxShadow: 'var(--shadow-sm)' }}>
            <div className="size-16 rounded-full grid place-items-center font-display text-[26px] mb-4 ring-2"
              style={{ background: 'var(--mishri-surface-offset)', color: 'var(--mishri-gold)', '--tw-ring-color': 'var(--mishri-gold)' } as React.CSSProperties}>
              {initials}
            </div>
            <div className="font-body text-[17px] font-semibold">{profile.name || 'Mishri Member'}</div>
            <div className="text-[13px] mt-0.5" style={{ color: 'var(--mishri-text-muted)' }}>{profile.email || 'Welcome back'}</div>
            <div className="mt-4 inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] tracking-[0.18em] uppercase font-medium"
              style={{ background: 'var(--mishri-gold)', color: 'var(--mishri-text-inverse)' }}>
              ✦ Gold Member
            </div>
            <div className="text-[11px] mt-3 opacity-60">Joined February 2026 · 6 orders</div>
          </div>

          <nav className="flex lg:flex-col gap-1 overflow-x-auto scrollbar-hide -mx-5 px-5 lg:mx-0 lg:px-0 pb-1 lg:pb-0">
            {tabs.map(t => {
              const active = tab === t.key;
              return (
                <button key={t.key} onClick={() => setTab(t.key)}
                  className="w-full flex items-center gap-2 lg:gap-3 px-4 py-3 rounded-xl transition-colors relative whitespace-nowrap"
                  style={active ? { background: 'var(--mishri-surface-offset)', color: 'var(--mishri-text)' } : { color: 'var(--mishri-text-muted)' }}>
                  {active && (
                    <>
                      <span className="hidden lg:block absolute left-0 top-2 bottom-2 w-1 rounded-r-full" style={{ background: 'var(--mishri-gold)' }}/>
                      <span className="lg:hidden absolute bottom-0 left-4 right-4 h-[3px] rounded-t-full" style={{ background: 'var(--mishri-gold)' }}/>
                    </>
                  )}
                  <t.icon className="size-[18px]" strokeWidth={1.6}/>
                  <span className="text-[14px] flex-1 text-left">{t.label}</span>
                  {t.count !== undefined && <span className="text-[11px] opacity-60 ml-1 lg:ml-0">{t.count}</span>}
                </button>
              );
            })}
          </nav>
        </aside>

        <div>
          <motion.div key={tab} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35 }}>
            {tab === 'orders' && <OrdersTab/>}
            {tab === 'saved' && <SavedTab/>}
            {tab === 'addresses' && <AddressesTab/>}
            {tab === 'payments' && <PaymentsTab/>}
            {tab === 'rewards' && <RewardsTab/>}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function OrdersTab() {
  const statusColor = (s: string) => s === 'Delivered' ? 'var(--mishri-success)' : s === 'Out for Delivery' ? 'var(--mishri-gold)' : 'var(--mishri-text-muted)';
  return (
    <div>
      <h2 className="font-display" style={{ fontSize: 'var(--text-xl)' }}>Your orders</h2>
      <p className="mt-1 text-[14px]" style={{ color: 'var(--mishri-text-muted)' }}>Every jar that found its way home.</p>

      <div className="mt-8 space-y-4">
        {orders.map(o => {
          const items = o.items.map(id => products.find(p => p.id === id)!);
          return (
            <div key={o.id} className="rounded-2xl p-4 sm:p-5 lg:p-6" style={{ background: 'var(--mishri-surface)' }}>
              <div className="flex items-start justify-between flex-wrap gap-3 mb-4">
                <div>
                  <div className="text-[11px] tracking-[0.18em] uppercase" style={{ color: 'var(--mishri-text-muted)' }}>Order #{o.id}</div>
                  <div className="text-[14px] mt-1">{o.date}</div>
                </div>
                <span className="px-3 py-1 rounded-full text-[11px] tracking-[0.18em] uppercase font-medium"
                  style={{ background: 'oklch(0.97 0.012 85 / 0.6)', color: statusColor(o.status), border: `1px solid ${statusColor(o.status)}` }}>{o.status}</span>
              </div>
              <div className="flex items-center gap-3 flex-wrap">
                <div className="flex -space-x-3">
                  {items.map(p => (
                    <div key={p.id} className="size-14 rounded-xl ring-2 overflow-hidden" style={{ '--tw-ring-color': 'var(--mishri-surface)' } as React.CSSProperties}>
                      <ImageWithFallback src={p.image} alt={p.name} className="size-full object-cover"/>
                    </div>
                  ))}
                </div>
                <div className="text-[13px]" style={{ color: 'var(--mishri-text-muted)' }}>
                  {items.map(i => i.name).join(' · ')}
                </div>
              </div>
              <div className="mt-5 pt-4 border-t flex items-center justify-between" style={{ borderColor: 'var(--mishri-divider)' }}>
                <div className="font-body font-bold text-[18px]">₹{o.total}</div>
                <div className="flex gap-2">
                  <button className="px-4 h-9 rounded-full text-[12px] border" style={{ borderColor: 'var(--mishri-border)' }}>Track</button>
                  <button className="px-4 h-9 rounded-full text-[12px] font-medium" style={{ background: 'var(--mishri-text)', color: 'var(--mishri-text-inverse)' }}>Reorder</button>
                </div>
              </div>
            </div>
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
      <h2 className="font-display" style={{ fontSize: 'var(--text-xl)' }}>Saved for later</h2>
      <div className="mt-8 grid sm:grid-cols-2 gap-4">
        {saved.map(p => (
          <div key={p.id} className="rounded-2xl overflow-hidden flex" style={{ background: 'var(--mishri-surface)' }}>
            <div className="w-32 shrink-0">
              <ImageWithFallback src={p.image} alt={p.name} className="size-full object-cover"/>
            </div>
            <div className="p-4 flex-1 flex flex-col">
              <div className="text-[10px] tracking-[0.18em] uppercase opacity-60">{p.categoryLabel}</div>
              <h3 className="text-[15px] font-semibold mt-1">{p.name}</h3>
              <p className="font-display italic text-[13px] mt-0.5" style={{ color: 'var(--mishri-text-muted)' }}>"{p.tagline}"</p>
              <div className="mt-auto flex items-center justify-between pt-3">
                <span className="font-bold text-[16px]">₹{p.variants[0].price}</span>
                <button className="px-3 h-8 rounded-full text-[11px] tracking-[0.16em] uppercase" style={{ background: 'var(--mishri-gold)', color: 'var(--mishri-text-inverse)' }}>Add</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function AddressesTab() {
  const { profile } = useUser();
  const addressList = [
    { type: 'Home', name: profile.name || 'Priya Sinha', line: `${profile.addressLine1 || 'Flat 3B, Ganga Apartments, Station Road'}${profile.addressLine2 ? ', ' + profile.addressLine2 : ''}, ${profile.city || 'Hajipur'}`, pin: profile.pincode || '844101', phone: profile.phone || '+91 98XXX 43210', default: true },
    { type: 'Work', name: profile.name || 'Priya Sinha', line: 'Patliputra Industrial Area, Phase II, Patna', pin: '800013', phone: profile.phone || '+91 98XXX 43210' },
  ];

  return (
    <div>
      <div className="flex items-center justify-between">
        <h2 className="font-display" style={{ fontSize: 'var(--text-xl)' }}>Delivery addresses</h2>
        <button className="px-4 h-10 rounded-full text-[12px] tracking-[0.16em] uppercase font-medium border" style={{ borderColor: 'var(--mishri-text)' }}>+ Add address</button>
      </div>
      <div className="mt-8 grid md:grid-cols-2 gap-3 sm:gap-4">
        {addressList.map(a => (
          <div key={a.type} className="p-6 rounded-2xl relative" style={{ background: 'var(--mishri-surface)' }}>
            {a.default && <span className="absolute top-4 right-4 px-2.5 py-0.5 rounded-full text-[10px] tracking-[0.18em] uppercase" style={{ background: 'var(--mishri-gold)', color: 'var(--mishri-text-inverse)' }}>Default</span>}
            <div className="text-[11px] tracking-[0.2em] uppercase" style={{ color: 'var(--mishri-gold)' }}>{a.type}</div>
            <div className="mt-2 font-semibold text-[16px]">{a.name}</div>
            <div className="mt-2 text-[14px] leading-relaxed" style={{ color: 'var(--mishri-text-muted)' }}>{a.line}<br/>PIN — {a.pin}<br/>{a.phone}</div>
            <div className="mt-5 flex gap-3 text-[12px]">
              <button className="hover:text-[var(--mishri-gold)]">Edit</button>
              <span className="opacity-30">·</span>
              <button className="hover:text-[var(--mishri-rose)]">Delete</button>
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
      <h2 className="font-display" style={{ fontSize: 'var(--text-xl)' }}>Saved payment methods</h2>
      <div className="mt-8 space-y-3">
        {cards.map((c, i) => (
          <div key={i} className="p-5 rounded-2xl flex items-center justify-between" style={{ background: 'var(--mishri-surface)' }}>
            <div className="flex items-center gap-4">
              <div className="w-14 h-9 rounded-md grid place-items-center text-[11px] font-bold" style={{ background: 'var(--mishri-text)', color: 'var(--mishri-text-inverse)' }}>
                {c.brand.split(' ')[0]}
              </div>
              <div>
                <div className="text-[15px] font-medium">{c.last ? `•••• ${c.last}` : c.id}</div>
                <div className="text-[12px]" style={{ color: 'var(--mishri-text-muted)' }}>{c.exp ?? 'UPI ID'}</div>
              </div>
            </div>
            <button className="text-[12px] opacity-60 hover:opacity-100">Remove</button>
          </div>
        ))}
      </div>
    </div>
  );
}

function RewardsTab() {
  const points = 340;
  return (
    <div>
      <div className="rounded-[28px] p-6 sm:p-8 lg:p-10 relative overflow-hidden" style={{ background: 'var(--mishri-surface-deep)', color: 'var(--mishri-text-inverse)' }}>
        <div className="absolute -right-10 -top-10 size-60 rounded-full opacity-30 anim-spin-slow jali-bg"/>
        <div className="relative">
          <div className="text-[11px] tracking-[0.24em] uppercase opacity-60">Reward balance</div>
          <div className="font-display mt-2" style={{ fontSize: 'clamp(70px, 12vw, 120px)', color: 'var(--mishri-gold)', lineHeight: 0.9 }}>{points}</div>
          <div className="text-[14px] opacity-80">points · ≈ <span style={{ color: 'var(--mishri-gold)' }}>₹{Math.round(points/10)}</span> off your next order</div>
          <div className="mt-8 max-w-md">
            <div className="flex items-center justify-between text-[12px] opacity-80 mb-2">
              <span>GOLD</span>
              <span>PLATINUM · 160 points to go</span>
            </div>
            <div className="h-2 rounded-full" style={{ background: 'oklch(0.30 0.02 50)' }}>
              <div className="h-full rounded-full" style={{ width: '68%', background: 'linear-gradient(90deg, var(--mishri-gold), oklch(0.75 0.15 80))' }}/>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-8 grid md:grid-cols-2 gap-4">
        <div className="p-6 rounded-2xl" style={{ background: 'var(--mishri-surface)' }}>
          <h3 className="font-display italic text-[20px]">Refer a friend</h3>
          <p className="mt-1 text-[13.5px]" style={{ color: 'var(--mishri-text-muted)' }}>You both get ₹150 off when they place their first order.</p>
          <div className="mt-5 p-3 rounded-xl flex items-center gap-3 border-dashed border-2" style={{ borderColor: 'var(--mishri-gold)' }}>
            <span className="font-mono text-[15px] flex-1 tracking-wider">PRIYA-MISHRI-340</span>
            <button className="size-9 rounded-full grid place-items-center" style={{ background: 'var(--mishri-gold)', color: 'var(--mishri-text-inverse)' }}>
              <Copy className="size-4"/>
            </button>
          </div>
          <button className="mt-4 inline-flex items-center gap-2 text-[13px]" style={{ color: 'var(--mishri-gold)' }}>
            <Share2 className="size-3.5"/> Share on WhatsApp
          </button>
        </div>

        <div className="p-6 rounded-2xl" style={{ background: 'var(--mishri-surface)' }}>
          <h3 className="font-display italic text-[20px]">Recent activity</h3>
          <ul className="mt-4 space-y-3 text-[13.5px]">
            {[
              ['Order #BR20260518', '+82', '18 May'],
              ['Bonus — wrote a review', '+50', '05 May'],
              ['Order #BR20260502', '+50', '02 May'],
              ['Redeemed for ₹15 off', '−150', '21 Apr'],
            ].map(([l, p, d]) => (
              <li key={l} className="flex items-center justify-between pb-2 border-b last:border-0" style={{ borderColor: 'var(--mishri-divider)' }}>
                <div>
                  <div className="font-medium">{l}</div>
                  <div className="text-[11px] opacity-60">{d}</div>
                </div>
                <div className="font-mono text-[14px]" style={{ color: (p as string).startsWith('+') ? 'var(--mishri-success)' : 'var(--mishri-rose)' }}>{p}</div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
