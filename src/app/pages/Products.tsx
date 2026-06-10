import { useState, useMemo } from 'react';
import { motion } from 'motion/react';
import { Plus, Heart, ChevronDown } from 'lucide-react';
import { toast } from 'sonner';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';
import { PageHeader } from '../components/ui-bits/PageHeader';
import { products, Product } from '../data/products';
import { useCart } from '../state/cart';

const categories = [
  { key: 'all', label: 'All', count: products.length },
  { key: 'ghee', label: 'Ghee Range', count: products.filter(p => p.category === 'ghee').length },
  { key: 'dahi', label: 'Dahi Range', count: products.filter(p => p.category === 'dahi').length },
  { key: 'icecream', label: 'Ice Cream', count: products.filter(p => p.category === 'icecream').length },
] as const;

const sortOptions = ['Popular', 'Price: Low → High', 'Price: High → Low', 'New Arrivals'];

export function Products() {
  const [cat, setCat] = useState<string>('all');
  const [sort, setSort] = useState(sortOptions[0]);

  const list = useMemo(() => {
    let l = products.filter(p => cat === 'all' || p.category === cat);
    if (sort === 'Price: Low → High') l = [...l].sort((a, b) => a.variants[0].price - b.variants[0].price);
    if (sort === 'Price: High → Low') l = [...l].sort((a, b) => b.variants[0].price - a.variants[0].price);
    return l;
  }, [cat, sort]);

  return (
    <>
      <PageHeader
        eyebrow="The full range"
        title="Everything we make,"
        italicWord="made the slow way."
        subtitle="Six products. Three categories. Every single one set, churned, or reduced in our facility outside Pune — no white-label, no contract manufacturing."
      />

      <section className="max-w-[1480px] mx-auto px-5 lg:px-10 grid lg:grid-cols-[260px_1fr] gap-8 lg:gap-14 pb-16 lg:pb-24">
        {/* Sidebar */}
        <aside className="lg:sticky lg:top-28 self-start space-y-8">
          <div>
            <h3 className="text-[11px] tracking-[0.24em] uppercase mb-4" style={{ color: 'var(--mishri-text-muted)' }}>Category</h3>
            <ul className="flex lg:flex-col gap-1 overflow-x-auto scrollbar-hide -mx-5 lg:mx-0 px-5 lg:px-0">
              {categories.map(c => {
                const active = cat === c.key;
                return (
                  <li key={c.key}>
                    <button
                      onClick={() => setCat(c.key)}
                      className={`w-full whitespace-nowrap text-left lg:flex lg:items-center lg:justify-between px-4 py-3 rounded-xl transition-all ${active ? '' : 'hover:bg-[var(--mishri-surface)]'}`}
                      style={active ? { background: 'var(--mishri-text)', color: 'var(--mishri-text-inverse)' } : { color: 'var(--mishri-text)' }}>
                      <span className="text-[14px] font-medium">{c.label}</span>
                      <span className="lg:inline-block ml-2 text-[11px] opacity-60">{c.count}</span>
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>

          <div className="hidden lg:block">
            <h3 className="text-[11px] tracking-[0.24em] uppercase mb-4" style={{ color: 'var(--mishri-text-muted)' }}>Pack Type</h3>
            <div className="space-y-2.5">
              {['Single jar', 'Multi-pack', 'Family pack', 'Gift hamper'].map(f => (
                <label key={f} className="flex items-center gap-2.5 text-[14px] cursor-pointer">
                  <input type="checkbox" className="size-4 rounded accent-[var(--mishri-gold)]" defaultChecked={f === 'Single jar'}/>
                  <span>{f}</span>
                </label>
              ))}
            </div>
          </div>

          <div className="hidden lg:block p-5 rounded-2xl" style={{ background: 'var(--mishri-surface-deep)', color: 'var(--mishri-text-inverse)' }}>
            <p className="font-display italic text-[20px] leading-snug">"Order before 11am, get it the same evening in Pune."</p>
            <div className="mt-3 text-[11px] tracking-[0.18em] uppercase opacity-60">Same-day delivery</div>
          </div>
        </aside>

        <div>
          <div className="flex items-center justify-between mb-6 gap-3">
            <p className="text-[14px]" style={{ color: 'var(--mishri-text-muted)' }}>
              <span style={{ color: 'var(--mishri-text)' }}>{list.length}</span> products
            </p>
            <div className="relative">
              <select value={sort} onChange={e => setSort(e.target.value)}
                className="appearance-none pl-4 pr-9 h-10 rounded-full border text-[13px] bg-transparent cursor-pointer"
                style={{ borderColor: 'var(--mishri-border)' }}>
                {sortOptions.map(o => <option key={o}>{o}</option>)}
              </select>
              <ChevronDown className="size-4 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none opacity-60"/>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
            {list.map((p, i) => <ProductCard key={p.id} p={p} index={i} />)}
          </div>
        </div>
      </section>
    </>
  );
}

function ProductCard({ p, index }: { p: Product; index: number }) {
  const [variant, setVariant] = useState(p.variants[1]?.label ?? p.variants[0].label);
  const v = p.variants.find(x => x.label === variant) ?? p.variants[0];
  const { add } = useCart();

  const tagBg = p.category === 'ghee' ? 'var(--mishri-gold)' : p.category === 'icecream' ? 'var(--mishri-rose)' : 'oklch(0.65 0.07 145)';

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
      transition={{ duration: 0.5, delay: (index % 6) * 0.06 }}
      whileHover={{ y: -6 }}
      className="group rounded-[20px] overflow-hidden flex flex-col transition-shadow"
      style={{ background: 'var(--mishri-surface)', boxShadow: 'var(--shadow-sm)' }}
    >
      <div className="relative aspect-[5/4] w-full shrink-0 overflow-hidden">
        <ImageWithFallback src={p.image} alt={p.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.06]"/>
        <div className="absolute inset-0 pointer-events-none" style={{ background: 'linear-gradient(to top, rgba(30,21,16,0.25), transparent 50%)' }}/>
        <div className="absolute top-3 left-3 sm:top-4 sm:left-4 flex gap-1.5">
          <span className="px-2.5 py-1 rounded-full text-[10px] tracking-[0.18em] uppercase font-medium"
            style={{ background: tagBg, color: 'var(--mishri-text-inverse)' }}>{p.tag}</span>
          {p.badge && <span className="px-2.5 py-1 rounded-full text-[10px] tracking-[0.18em] uppercase font-medium"
            style={{ background: 'var(--mishri-surface)', color: 'var(--mishri-text)' }}>{p.badge}</span>}
        </div>
        <button className="absolute top-3 right-3 sm:top-4 sm:right-4 size-9 rounded-full grid place-items-center backdrop-blur-md"
          style={{ background: 'oklch(0.97 0.012 85 / 0.8)' }} aria-label="Save">
          <Heart className="size-4" strokeWidth={1.6}/>
        </button>
        <div className="absolute inset-x-0 bottom-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 py-3 text-center text-[11px] tracking-[0.2em] uppercase font-medium backdrop-blur-md"
          style={{ background: 'oklch(0.18 0.025 40 / 0.75)', color: 'var(--mishri-text-inverse)' }}>
          Quick View →
        </div>
      </div>

      <div className="p-4 sm:p-5 flex flex-col gap-2 sm:gap-3 flex-1">
        <div>
          <h3 className="font-body text-[17px] font-semibold leading-tight" style={{ color: 'var(--mishri-text)' }}>{p.name}</h3>
          <p className="font-display italic text-[14px] mt-0.5" style={{ color: 'var(--mishri-text-muted)' }}>"{p.tagline}"</p>
        </div>

        <div className="flex gap-1.5 flex-wrap">
          {p.variants.map(o => (
            <button key={o.label} onClick={() => setVariant(o.label)}
              className="px-3 py-1.5 rounded-full text-[12px] font-medium transition-all border"
              style={{
                background: variant === o.label ? 'var(--mishri-text)' : 'transparent',
                color: variant === o.label ? 'var(--mishri-text-inverse)' : 'var(--mishri-text-muted)',
                borderColor: variant === o.label ? 'var(--mishri-text)' : 'var(--mishri-border)',
              }}>
              {o.label}
            </button>
          ))}
        </div>

        <div className="flex items-end justify-between mt-auto">
          <div>
            <div className="font-body text-[22px] font-bold leading-none" style={{ color: 'var(--mishri-text)' }}>₹{v.price}</div>
            {v.was && <div className="text-[12px] line-through mt-1" style={{ color: 'var(--mishri-text-muted)' }}>₹{v.was}</div>}
          </div>
          <div className="text-[11px] flex items-center gap-1" style={{ color: 'var(--mishri-text-muted)' }}>
            <span style={{ color: 'var(--mishri-gold)' }}>★</span> {p.rating} <span className="opacity-60">({p.reviews})</span>
          </div>
        </div>

        <button onClick={() => { add(p.id, v.label); toast.success(`${p.name} added to cart`, { description: `${v.label} · ₹${v.price}` }); }}
          className="mt-2 h-11 rounded-full flex items-center justify-center gap-2 text-[12px] tracking-[0.18em] uppercase font-semibold transition-colors"
          style={{ background: 'var(--mishri-gold)', color: 'var(--mishri-text-inverse)' }}>
          <Plus className="size-3.5"/> Add to Cart
        </button>
      </div>
    </motion.div>
  );
}
