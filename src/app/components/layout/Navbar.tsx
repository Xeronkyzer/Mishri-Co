import { NavLink, Link, useLocation } from 'react-router';
import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Search, User, ShoppingBag, Menu, X } from 'lucide-react';
import { Logo } from '../brand/Logo';
import { useCart } from '../../state/cart';

const links = [
  { to: '/', label: 'Home', end: true },
  { to: '/products', label: 'Products' },
  { to: '/story', label: 'Our Story' },
  { to: '/contact', label: 'Find a Store' },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobile, setMobile] = useState(false);
  const { count } = useCart();
  const loc = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => { setMobile(false); }, [loc.pathname]);

  return (
    <>
      <motion.header
        initial={false}
        animate={{ height: scrolled ? 60 : 76 }}
        transition={{ type: 'spring', stiffness: 220, damping: 28 }}
        className="fixed inset-x-0 top-0 z-50"
        style={{
          backdropFilter: 'blur(18px) saturate(180%)',
          WebkitBackdropFilter: 'blur(18px) saturate(180%)',
          background: scrolled ? 'oklch(0.97 0.012 85 / 0.82)' : 'oklch(0.97 0.012 85 / 0.55)',
          borderBottom: scrolled ? '1px solid oklch(0.88 0.016 75 / 0.6)' : '1px solid transparent',
        }}
      >
        <div className="max-w-[1480px] mx-auto px-5 lg:px-10 h-full flex items-center justify-between gap-6">
          <Link to="/" className="flex items-center" style={{ color: 'var(--mishri-text)' }}>
            <Logo />
          </Link>

          <nav className="hidden lg:flex items-center gap-1">
            {links.map(l => (
              <NavLink
                key={l.to} to={l.to} end={l.end}
                className={({ isActive }) =>
                  `relative px-4 py-2 text-[13px] tracking-[0.04em] uppercase transition-colors ${isActive ? 'text-[var(--mishri-gold)]' : 'text-[var(--mishri-text)] hover:text-[var(--mishri-gold)]'}`
                }
              >
                {({ isActive }) => (
                  <>
                    {l.label}
                    {isActive && (
                      <motion.span layoutId="navdot" className="absolute left-3 right-3 -bottom-0.5 h-[2px] rounded-full"
                        style={{ background: 'var(--mishri-gold)' }} />
                    )}
                  </>
                )}
              </NavLink>
            ))}
          </nav>

          <div className="flex items-center gap-1">
            <button aria-label="Search" className="hidden sm:grid size-10 place-items-center rounded-full hover:bg-[var(--mishri-surface-offset)] transition-colors">
              <Search className="size-[18px]" strokeWidth={1.6} />
            </button>
            <Link to="/profile" aria-label="Profile" className="hidden sm:grid size-10 place-items-center rounded-full hover:bg-[var(--mishri-surface-offset)] transition-colors">
              <User className="size-[18px]" strokeWidth={1.6}/>
            </Link>
            <Link to="/cart" aria-label="Cart" className="relative size-10 grid place-items-center rounded-full hover:bg-[var(--mishri-surface-offset)] transition-colors">
              <ShoppingBag className="size-[18px]" strokeWidth={1.6}/>
              <AnimatePresence>
                {count > 0 && (
                  <motion.span
                    key={count}
                    initial={{ scale: 0.5, y: -4, opacity: 0 }} animate={{ scale: 1, y: 0, opacity: 1 }}
                    exit={{ scale: 0.5, opacity: 0 }}
                    transition={{ type: 'spring', stiffness: 320, damping: 18 }}
                    className="absolute -top-0.5 -right-0.5 min-w-[18px] h-[18px] px-1 rounded-full grid place-items-center text-[10px] font-semibold"
                    style={{ background: 'var(--mishri-gold)', color: 'var(--mishri-text-inverse)' }}
                  >
                    {count}
                  </motion.span>
                )}
              </AnimatePresence>
            </Link>
            <button aria-label="Menu" onClick={() => setMobile(true)} className="lg:hidden size-10 grid place-items-center rounded-full hover:bg-[var(--mishri-surface-offset)]">
              <Menu className="size-5" strokeWidth={1.6}/>
            </button>
          </div>
        </div>
      </motion.header>

      <AnimatePresence>
        {mobile && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setMobile(false)}
              className="fixed inset-0 z-[90] bg-black/40 backdrop-blur-sm lg:hidden"/>
            <motion.aside
              initial={{ y: '100%' }} animate={{ y: 0 }} exit={{ y: '100%' }}
              transition={{ type: 'spring', stiffness: 240, damping: 28 }}
              className="fixed bottom-0 inset-x-0 z-[100] rounded-t-[28px] p-6 pb-10 lg:hidden"
              style={{ background: 'var(--mishri-surface)', boxShadow: '0 -20px 60px rgba(0,0,0,.18)' }}>
              <div className="flex items-center justify-between mb-6">
                <Logo />
                <button onClick={() => setMobile(false)} className="size-9 rounded-full grid place-items-center bg-[var(--mishri-surface-offset)]"><X className="size-4"/></button>
              </div>
              <nav className="flex flex-col">
                {[...links, { to: '/profile', label: 'Profile' }, { to: '/cart', label: `Cart (${count})` }, { to: '/settings', label: 'Settings' }].map(l => (
                  <NavLink key={l.to} to={l.to} onClick={() => setMobile(false)}
                    className={({ isActive }) => `py-4 border-b border-[var(--mishri-border)] flex items-center justify-between ${isActive ? 'text-[var(--mishri-gold)]' : ''}`}>
                    <span className="font-display text-[22px]">{l.label}</span>
                    <span className="opacity-40">→</span>
                  </NavLink>
                ))}
              </nav>
              <p className="mt-6 text-[12px] uppercase tracking-[0.2em] opacity-50">Mishri &amp; Co · Estd 2009 · Maharashtra</p>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
