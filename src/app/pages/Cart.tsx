import { motion, AnimatePresence } from 'motion/react';
import { Minus, Plus, X, ShoppingBag, Lock, Truck, ArrowRight } from 'lucide-react';
import { Link } from 'react-router';
import { useState } from 'react';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';
import { useCart } from '../state/cart';
import { useUser } from '../state/user';
import { products } from '../data/products';

export function Cart() {
  const { lines, inc, dec, remove, subtotal, resolve, add, clear } = useCart();
  const { profile } = useUser();
  const [coupon, setCoupon] = useState('');
  const [applied, setApplied] = useState(false);

  const delivery = subtotal === 0 ? 0 : subtotal > 999 ? 0 : 40;
  const discount = applied ? Math.round(subtotal * 0.1) : 0;
  const gst = Math.round((subtotal - discount) * 0.05);
  const total = subtotal - discount + gst + delivery;

  const handleCheckout = () => {
    let text = `*New Order (MISHRI&co)*\n`;
    text += `Name: ${profile.name || 'Not provided'}\n`;
    text += `Phone: ${profile.phone || 'Not provided'}\n`;
    text += `Address: ${profile.addressLine1 || ''} ${profile.addressLine2 || ''}, ${profile.city || 'Patna'}, ${profile.pincode || ''}\n`;
    text += `\n*Order Details:*\n`;
    lines.forEach(l => {
      const r = resolve(l);
      if (r) {
        text += `- ${l.qty}x ${r.product.name} (${l.variantLabel}) = ₹${r.price * l.qty}\n`;
      }
    });
    text += `\nSubtotal: ₹${subtotal}`;
    if (applied) text += `\nDiscount: -₹${discount}`;
    text += `\nDelivery: ${delivery === 0 ? 'FREE' : `₹${delivery}`}`;
    text += `\nGST: ₹${gst}`;
    text += `\n*Total: ₹${total}*`;

    const encoded = encodeURIComponent(text);
    // Replace with the actual business number
    window.open(`https://wa.me/919876543210?text=${encoded}`, '_blank');
    clear();
  };

  const recommended = products.filter(p => !lines.find(l => l.productId === p.id)).slice(0, 3);

  if (lines.length === 0) return <EmptyCart/>;

  return (
    <>
      <section className="max-w-[1480px] mx-auto px-5 lg:px-10 pt-20 lg:pt-32 pb-16 lg:pb-24">
        <div className="flex items-end gap-4 mb-10">
          <h1 className="font-display" style={{ fontSize: 'var(--text-2xl)' }}>Your Cart</h1>
          <span className="pb-1.5 text-[15px]" style={{ color: 'var(--mishri-text-muted)' }}>({lines.length} {lines.length === 1 ? 'item' : 'items'})</span>
        </div>

        <div className="grid lg:grid-cols-[1.6fr_1fr] gap-8 lg:gap-14">
          <div>
            <div className="space-y-1">
              <AnimatePresence>
                {lines.map(l => {
                  const r = resolve(l);
                  if (!r) return null;
                  const { product, price } = r;
                  return (
                    <motion.div key={l.id}
                      layout
                      initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 40, scale: 0.95 }}
                      className="flex gap-3 sm:gap-4 lg:gap-6 py-4 sm:py-5 border-b items-center"
                      style={{ borderColor: 'var(--mishri-divider)' }}>
                      <div className="size-16 sm:size-20 lg:size-24 rounded-xl overflow-hidden shrink-0">
                        <ImageWithFallback src={product.image} alt={product.name} className="w-full h-full object-cover"/>
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="text-[10px] tracking-[0.2em] uppercase" style={{ color: 'var(--mishri-text-muted)' }}>{product.categoryLabel}</div>
                        <h3 className="font-body text-[16px] font-semibold mt-0.5 truncate">{product.name}</h3>
                        <div className="text-[13px] mt-1" style={{ color: 'var(--mishri-text-muted)' }}>{l.variantLabel}</div>
                        <button onClick={() => remove(l.id)} className="mt-2 text-[12px] hover:underline" style={{ color: 'var(--mishri-rose)' }}>Remove</button>
                      </div>
                      <div className="flex items-center gap-3 lg:gap-6">
                        <div className="flex items-center rounded-full border h-9" style={{ borderColor: 'var(--mishri-border)' }}>
                          <button onClick={() => dec(l.id)} className="size-9 grid place-items-center hover:text-[var(--mishri-gold)]"><Minus className="size-3.5"/></button>
                          <motion.span key={l.qty} initial={{ scale: 0.7, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="w-7 text-center text-[14px] font-medium">{l.qty}</motion.span>
                          <button onClick={() => inc(l.id)} className="size-9 grid place-items-center hover:text-[var(--mishri-gold)]"><Plus className="size-3.5"/></button>
                        </div>
                        <div className="font-body font-bold text-[17px] w-20 text-right">₹{price * l.qty}</div>
                      </div>
                    </motion.div>
                  );
                })}
              </AnimatePresence>
            </div>

            <Link to="/products" className="mt-8 inline-flex items-center gap-2 text-[13px] tracking-[0.16em] uppercase" style={{ color: 'var(--mishri-gold)' }}>
              ← Continue shopping
            </Link>

            {recommended.length > 0 && (
              <div className="mt-14 pt-10 border-t" style={{ borderColor: 'var(--mishri-divider)' }}>
                <h3 className="font-display italic text-[24px] mb-5">People also love —</h3>
                <div className="grid sm:grid-cols-3 gap-4">
                  {recommended.map(p => (
                    <div key={p.id} className="rounded-2xl overflow-hidden flex" style={{ background: 'var(--mishri-surface)' }}>
                      <div className="w-24 shrink-0">
                        <ImageWithFallback src={p.image} alt={p.name} className="w-full h-full object-cover"/>
                      </div>
                      <div className="flex-1 p-3 flex flex-col">
                        <div className="text-[13px] font-medium leading-tight line-clamp-2">{p.name}</div>
                        <div className="mt-auto flex items-center justify-between gap-2 pt-2">
                          <span className="text-[14px] font-bold">₹{p.variants[0].price}</span>
                          <button onClick={() => add(p.id, p.variants[0].label)}
                            className="size-7 rounded-full grid place-items-center" style={{ background: 'var(--mishri-gold)', color: 'var(--mishri-text-inverse)' }}>
                            <Plus className="size-3.5"/>
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Sticky summary */}
          <aside className="self-start lg:sticky lg:top-28 rounded-[24px] p-5 sm:p-7"
            style={{ background: 'var(--mishri-surface)', boxShadow: 'var(--shadow-md)' }}>
            <h3 className="font-display italic text-[22px] mb-5">Order summary</h3>
            <dl className="space-y-3 text-[14.5px]">
              <Row label="Subtotal" value={`₹${subtotal}`} />
              {applied && <Row label="Coupon (MISHRI10)" value={`–₹${discount}`} accent />}
              <Row label="Delivery" value={delivery === 0 ? 'FREE' : `₹${delivery}`} accent={delivery === 0}/>
              <Row label="GST (5%)" value={`₹${gst}`} />
            </dl>
            <div className="my-5 h-px" style={{ background: 'var(--mishri-divider)' }}/>
            <div className="flex items-end justify-between mb-6">
              <span className="font-display italic text-[18px]">Total</span>
              <span className="font-display text-[34px] leading-none" style={{ color: 'var(--mishri-text)' }}>₹{total}</span>
            </div>

            <div className="flex gap-2 mb-5">
              <input value={coupon} onChange={e => setCoupon(e.target.value)} placeholder="Coupon code"
                className="flex-1 h-11 px-4 rounded-full border bg-transparent text-[14px] outline-none focus:border-[var(--mishri-gold)]"
                style={{ borderColor: 'var(--mishri-border)' }}/>
              <button onClick={() => { setApplied(coupon.toUpperCase() === 'MISHRI10'); }}
                className="px-5 h-11 rounded-full text-[12px] tracking-[0.16em] uppercase font-medium"
                style={{ background: 'var(--mishri-surface-offset)', color: 'var(--mishri-text)' }}>Apply</button>
            </div>
            {applied && <p className="text-[12px] mb-4" style={{ color: 'var(--mishri-success)' }}>✓ Coupon applied — 10% off</p>}
            {!applied && <p className="text-[12px] mb-4 opacity-60">Try <span className="font-mono">MISHRI10</span></p>}

            <button onClick={handleCheckout} className="w-full h-13 py-3.5 rounded-full text-[13px] tracking-[0.2em] uppercase font-semibold flex items-center justify-center gap-2 transition-all hover:gap-3"
              style={{ background: 'var(--mishri-gold)', color: 'var(--mishri-text-inverse)' }}>
              Order via WhatsApp <ArrowRight className="size-4"/>
            </button>

            <div className="mt-5 flex items-center gap-2 text-[12px]" style={{ color: 'var(--mishri-text-muted)' }}>
              <Lock className="size-3.5"/> 100% Secure · Pay after confirmation
            </div>
            <div className="mt-2 flex items-center gap-2 text-[12px]" style={{ color: 'var(--mishri-text-muted)' }}>
              <Truck className="size-3.5"/> Free returns within 24h of delivery
            </div>
          </aside>
        </div>
      </section>
    </>
  );
}

function Row({ label, value, accent }: { label: string; value: string; accent?: boolean }) {
  return (
    <div className="flex items-baseline justify-between">
      <dt style={{ color: 'var(--mishri-text-muted)' }}>{label}</dt>
      <dd className="font-medium" style={{ color: accent ? 'var(--mishri-gold)' : 'var(--mishri-text)' }}>{value}</dd>
    </div>
  );
}

function EmptyCart() {
  return (
    <section className="max-w-3xl mx-auto px-5 pt-24 sm:pt-40 pb-20 sm:pb-32 text-center">
      <motion.div initial={{ rotate: 0 }} animate={{ rotate: [0, -8, 0] }} transition={{ duration: 2.2, repeat: Infinity }} className="inline-flex">
        <div className="size-28 rounded-full grid place-items-center" style={{ background: 'var(--mishri-surface-offset)' }}>
          <ShoppingBag className="size-12" strokeWidth={1.4} style={{ color: 'var(--mishri-gold)' }}/>
        </div>
      </motion.div>
      <h1 className="font-display italic mt-8" style={{ fontSize: 'var(--text-2xl)' }}>Your cart is empty</h1>
      <p className="mt-3" style={{ color: 'var(--mishri-text-muted)' }}>Nothing here yet — maybe a jar of bilona ghee to start?</p>
      <Link to="/products" className="mt-7 inline-flex items-center gap-2 px-7 h-12 rounded-full text-[13px] tracking-[0.16em] uppercase"
        style={{ background: 'var(--mishri-gold)', color: 'var(--mishri-text-inverse)' }}>
        Shop the range <ArrowRight className="size-4"/>
      </Link>
    </section>
  );
}
