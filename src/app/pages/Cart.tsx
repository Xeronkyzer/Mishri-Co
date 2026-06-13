import { motion, AnimatePresence } from 'motion/react';
import { Minus, Plus, X, ShoppingBag, Lock, Truck, ArrowRight, Package } from 'lucide-react';
import { Link } from 'react-router';
import { useState } from 'react';
import { useCart } from '../state/cart';
import { useUser } from '../state/user';
import { products } from '../data/products';

const WHATSAPP_NUMBER = '919625980156'; // DairyScoop business WhatsApp

export function Cart() {
  const { lines, inc, dec, remove, subtotal, resolve, add, clear } = useCart();
  const { profile } = useUser();
  const [coupon, setCoupon] = useState('');
  const [couponApplied, setCouponApplied] = useState(false);

  const delivery = subtotal === 0 ? 0 : subtotal > 999 ? 0 : 49;
  const discount = couponApplied ? Math.round(subtotal * 0.10) : 0;
  const gst = Math.round((subtotal - discount) * 0.05);
  const total = subtotal - discount + gst + delivery;

  const handleApplyCoupon = () => {
    setCouponApplied(coupon.trim().toUpperCase() === 'MISHRI10');
  };

  const handleCheckout = () => {
    let msg = `*New Order — Aaharvedik*\n`;
    msg += `━━━━━━━━━━━━━━\n`;
    msg += `Name: ${profile.name || 'Not provided'}\n`;
    msg += `Phone: ${profile.phone || 'Not provided'}\n`;
    if (profile.addressLine1) {
      msg += `Address: ${profile.addressLine1}`;
      if (profile.addressLine2) msg += `, ${profile.addressLine2}`;
      msg += `, ${profile.city || 'Patna'}`;
      if (profile.pincode) msg += ` — ${profile.pincode}`;
      msg += `\n`;
    }
    msg += `━━━━━━━━━━━━━━\n`;
    lines.forEach(l => {
      const r = resolve(l);
      if (r) {
        msg += `• ${l.qty}× ${r.product.name} (${l.variantLabel}) — ₹${(r.price ?? 0) * l.qty}\n`;
      }
    });
    msg += `━━━━━━━━━━━━━━\n`;
    msg += `Subtotal: ₹${subtotal}\n`;
    if (couponApplied) msg += `Discount (MISHRI10): –₹${discount}\n`;
    msg += `Delivery: ${delivery === 0 ? 'FREE' : `₹${delivery}`}\n`;
    msg += `GST (5%): ₹${gst}\n`;
    msg += `*Total: ₹${total}*`;

    const encoded = encodeURIComponent(msg);
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encoded}`, '_blank', 'noopener,noreferrer');
    clear();
  };

  const recommended = products
    .filter(p => !lines.find(l => l.productId === p.id))
    .slice(0, 3);

  if (lines.length === 0) return <EmptyCart />;

  return (
    <div className="max-w-[1480px] mx-auto px-5 lg:px-10 pt-20 lg:pt-32 pb-16 lg:pb-24">
      {/* Page header */}
      <div className="flex items-baseline gap-3 mb-8 lg:mb-10">
        <h1 className="font-display" style={{ fontSize: 'clamp(30px, 4vw, 50px)' }}>
          Your Cart
        </h1>
        <span className="text-[15px]" style={{ color: 'var(--mishri-text-muted)' }}>
          ({lines.length} {lines.length === 1 ? 'item' : 'items'})
        </span>
      </div>

      <div className="grid lg:grid-cols-[1.6fr_1fr] gap-8 lg:gap-12 xl:gap-16 items-start">
        {/* Cart lines */}
        <div>
          <div className="divide-y" style={{ borderColor: 'var(--mishri-divider)' }}>
            <AnimatePresence initial={false}>
              {lines.map(l => {
                const r = resolve(l);
                if (!r) return null;
                const { product, price } = r;
                return (
                  <motion.div
                    key={l.id}
                    layout
                    initial={{ opacity: 0, x: -16 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 40, scale: 0.96 }}
                    transition={{ duration: 0.25 }}
                    className="flex gap-4 sm:gap-6 py-5 items-center"
                  >
                    {/* Product image placeholder */}
                    <div
                      className="size-16 sm:size-20 lg:size-24 rounded-xl shrink-0 grid place-items-center"
                      style={{ background: 'var(--mishri-surface-offset)' }}
                      aria-hidden="true"
                    >
                      <Package className="size-7 opacity-30" strokeWidth={1.4} />
                    </div>

                    {/* Details */}
                    <div className="flex-1 min-w-0">
                      <div
                        className="text-[10px] tracking-[0.2em] uppercase font-medium"
                        style={{ color: 'var(--mishri-text-muted)' }}
                      >
                        {product.categoryLabel}
                      </div>
                      <h3 className="font-body text-[15px] sm:text-[16px] font-semibold mt-0.5 truncate">
                        {product.name}
                      </h3>
                      <div className="text-[13px] mt-0.5" style={{ color: 'var(--mishri-text-muted)' }}>
                        {l.variantLabel}
                      </div>
                      <button
                        onClick={() => remove(l.id)}
                        className="mt-2 text-[12px] hover:underline underline-offset-2 transition-all"
                        style={{ color: 'var(--mishri-rose)' }}
                        aria-label={`Remove ${product.name} from cart`}
                      >
                        Remove
                      </button>
                    </div>

                    {/* Qty + price */}
                    <div className="flex items-center gap-3 lg:gap-5 shrink-0">
                      <div
                        className="flex items-center rounded-full border"
                        style={{ borderColor: 'var(--mishri-border)' }}
                        role="group"
                        aria-label={`Quantity for ${product.name}`}
                      >
                        <button
                          onClick={() => dec(l.id)}
                          aria-label="Decrease quantity"
                          className="size-9 grid place-items-center hover:text-[var(--mishri-gold)] transition-colors"
                        >
                          <Minus className="size-3.5" />
                        </button>
                        <motion.span
                          key={l.qty}
                          initial={{ scale: 0.75, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          className="w-7 text-center text-[14px] font-semibold"
                          aria-live="polite"
                        >
                          {l.qty}
                        </motion.span>
                        <button
                          onClick={() => inc(l.id)}
                          aria-label="Increase quantity"
                          className="size-9 grid place-items-center hover:text-[var(--mishri-gold)] transition-colors"
                        >
                          <Plus className="size-3.5" />
                        </button>
                      </div>
                      <div className="font-body font-bold text-[16px] sm:text-[17px] w-16 sm:w-20 text-right tabular-nums">
                        ₹{(price ?? 0) * l.qty}
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>

          <Link
            to="/products"
            className="mt-6 inline-flex items-center gap-1.5 text-[12px] tracking-[0.18em] uppercase font-medium hover:gap-2.5 transition-all"
            style={{ color: 'var(--mishri-gold)' }}
          >
            ← Continue Shopping
          </Link>

          {/* Recommendations */}
          {recommended.length > 0 && (
            <div className="mt-12 lg:mt-14 pt-10 border-t" style={{ borderColor: 'var(--mishri-divider)' }}>
              <h3 className="font-display italic text-[22px] mb-5">You might also like —</h3>
              <div className="grid sm:grid-cols-3 gap-3 sm:gap-4">
                {recommended.map(p => (
                  <div
                    key={p.id}
                    className="rounded-2xl p-4 flex items-center gap-3"
                    style={{ background: 'var(--mishri-surface)' }}
                  >
                    <div
                      className="size-12 rounded-xl shrink-0 grid place-items-center"
                      style={{ background: 'var(--mishri-surface-offset)' }}
                      aria-hidden="true"
                    >
                      <Package className="size-5 opacity-30" strokeWidth={1.4} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-[13px] font-semibold leading-tight truncate">{p.name}</div>
                      <div className="text-[12px] mt-0.5" style={{ color: 'var(--mishri-text-muted)' }}>
                        {p.variants[0].label}
                      </div>
                    </div>
                    <button
                      onClick={() => add(p.id, p.variants[0].label)}
                      className="size-8 rounded-full grid place-items-center shrink-0 transition-all hover:opacity-90 active:scale-95"
                      style={{ background: 'var(--mishri-gold)', color: 'var(--mishri-text-inverse)' }}
                      aria-label={`Add ${p.name} to cart`}
                    >
                      <Plus className="size-3.5" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Order summary */}
        <aside
          className="lg:sticky lg:top-24 rounded-[24px] p-5 sm:p-7"
          style={{ background: 'var(--mishri-surface)', boxShadow: 'var(--shadow-md)' }}
          aria-label="Order summary"
        >
          <h2 className="font-display italic text-[22px] mb-5">Order Summary</h2>

          <dl className="space-y-3 text-[14px]">
            <SummaryRow label="Subtotal" value={`₹${subtotal}`} />
            {couponApplied && (
              <SummaryRow label="Coupon (MISHRI10)" value={`–₹${discount}`} accent />
            )}
            <SummaryRow
              label="Delivery"
              value={delivery === 0 ? 'FREE' : `₹${delivery}`}
              accent={delivery === 0}
            />
            <SummaryRow label="GST (5%)" value={`₹${gst}`} />
          </dl>

          <div className="my-5 h-px" style={{ background: 'var(--mishri-divider)' }} aria-hidden="true" />

          <div className="flex items-end justify-between mb-6">
            <span className="font-display italic text-[17px]">Total</span>
            <span
              className="font-display text-[32px] sm:text-[36px] leading-none tabular-nums"
              style={{ color: 'var(--mishri-text)' }}
            >
              ₹{total}
            </span>
          </div>

          {/* Coupon */}
          <div className="flex gap-2 mb-4">
            <input
              value={coupon}
              onChange={e => setCoupon(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && handleApplyCoupon()}
              placeholder="Coupon code"
              aria-label="Coupon code"
              className="flex-1 h-11 px-4 rounded-full border bg-transparent text-[14px] outline-none focus:border-[var(--mishri-gold)] transition-colors uppercase tracking-wider"
              style={{ borderColor: 'var(--mishri-border)' }}
            />
            <button
              onClick={handleApplyCoupon}
              className="px-5 h-11 rounded-full text-[12px] tracking-[0.16em] uppercase font-semibold transition-all hover:opacity-90 active:scale-95"
              style={{ background: 'var(--mishri-surface-offset)', color: 'var(--mishri-text)' }}
            >
              Apply
            </button>
          </div>

          {couponApplied ? (
            <p className="text-[12px] mb-5 font-medium" style={{ color: 'var(--mishri-success)' }}>
              ✓ 10% discount applied
            </p>
          ) : (
            <p className="text-[12px] mb-5 opacity-50">
              Try <span className="font-mono tracking-wider">MISHRI10</span> for 10% off
            </p>
          )}

          <button
            onClick={handleCheckout}
            className="w-full h-13 py-3.5 rounded-full text-[13px] tracking-[0.16em] uppercase font-bold flex items-center justify-center gap-2 transition-all hover:opacity-95 active:scale-[0.98] hover:gap-3"
            style={{ background: 'var(--mishri-gold)', color: 'var(--mishri-text-inverse)' }}
            aria-label="Checkout via WhatsApp"
          >
            Order via WhatsApp <ArrowRight className="size-4" />
          </button>

          <div className="mt-5 space-y-2">
            <div
              className="flex items-center gap-2 text-[12px]"
              style={{ color: 'var(--mishri-text-muted)' }}
            >
              <Lock className="size-3.5 shrink-0" />
              <span>100% Secure · Pay after confirmation</span>
            </div>
            <div
              className="flex items-center gap-2 text-[12px]"
              style={{ color: 'var(--mishri-text-muted)' }}
            >
              <Truck className="size-3.5 shrink-0" />
              <span>Free delivery on orders above ₹999</span>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}

function SummaryRow({
  label,
  value,
  accent,
}: {
  label: string;
  value: string;
  accent?: boolean;
}) {
  return (
    <div className="flex items-baseline justify-between">
      <dt style={{ color: 'var(--mishri-text-muted)' }}>{label}</dt>
      <dd
        className="font-medium tabular-nums"
        style={{ color: accent ? 'var(--mishri-gold)' : 'var(--mishri-text)' }}
      >
        {value}
      </dd>
    </div>
  );
}

function EmptyCart() {
  return (
    <section className="max-w-2xl mx-auto px-5 pt-28 sm:pt-40 pb-20 sm:pb-32 text-center">
      <motion.div
        initial={{ rotate: 0 }}
        animate={{ rotate: [0, -8, 0] }}
        transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
        className="inline-flex"
        aria-hidden="true"
      >
        <div
          className="size-28 rounded-full grid place-items-center"
          style={{ background: 'var(--mishri-surface-offset)' }}
        >
          <ShoppingBag
            className="size-12"
            strokeWidth={1.4}
            style={{ color: 'var(--mishri-gold)' }}
          />
        </div>
      </motion.div>

      <h1
        className="font-display italic mt-8"
        style={{ fontSize: 'clamp(26px, 4vw, 40px)' }}
      >
        Your cart is empty
      </h1>
      <p className="mt-3 text-[15px]" style={{ color: 'var(--mishri-text-muted)' }}>
        Nothing here yet — maybe a jar of bilona ghee to start?
      </p>
      <Link
        to="/products"
        className="mt-8 inline-flex items-center gap-2 px-8 h-12 rounded-full text-[13px] tracking-[0.12em] uppercase font-semibold transition-all hover:gap-3 hover:opacity-90 active:scale-[0.97]"
        style={{ background: 'var(--mishri-gold)', color: 'var(--mishri-text-inverse)' }}
      >
        Shop the Range <ArrowRight className="size-4" />
      </Link>
    </section>
  );
}
