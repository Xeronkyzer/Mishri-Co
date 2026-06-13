import { NavLink, Link, useLocation } from 'react-router';
import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, ShoppingBag } from 'lucide-react';
import { Logo } from '../brand/Logo';
import { useCart } from '../../state/cart';

const links = [
  { to: '/', label: 'Home', end: true },
  { to: '/products', label: 'Products' },
  { to: '/story', label: 'About' },
  { to: '/contact', label: 'Contact' },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { count } = useCart();
  const loc = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => { setMobileOpen(false); }, [loc.pathname]);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  return (
    <>
      <motion.header
        initial={false}
        animate={{ height: scrolled ? 60 : 72 }}
        transition={{ type: 'spring', stiffness: 220, damping: 28 }}
        className="fixed inset-x-0 top-0 z-50"
        style={{
          backdropFilter: 'blur(20px) saturate(180%)',
          WebkitBackdropFilter: 'blur(20px) saturate(180%)',
          background: scrolled
            ? 'oklch(0.955 0.012 90 / 0.92)'
            : 'oklch(0.955 0.012 90 / 0.60)',
          borderBottom: scrolled
            ? '1px solid oklch(0.88 0.014 88 / 0.7)'
            : '1px solid transparent',
        }}
      >
        <div className="max-w-[1480px] mx-auto px-4 sm:px-5 lg:px-10 h-full flex items-center justify-between gap-4">
          <Link
            to="/"
            className="flex items-center shrink-0"
            aria-label="Aaharvedik Home"
          >
            <Logo />
          </Link>

          {/* Desktop navigation */}
          <nav className="hidden lg:flex items-center gap-1" aria-label="Primary navigation">
            {links.map(l => (
              <NavLink
                key={l.to}
                to={l.to}
                end={l.end}
                className={({ isActive }) =>
                  `relative px-4 py-2 text-[13px] tracking-[0.04em] uppercase font-medium transition-colors rounded-full ${
                    isActive
                      ? 'text-[var(--mishri-gold)]'
                      : 'text-[var(--mishri-text)] hover:text-[var(--mishri-gold)] hover:bg-[var(--mishri-surface-offset)]'
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    {l.label}
                    {isActive && (
                      <motion.span
                        layoutId="nav-underline"
                        className="absolute left-3 right-3 -bottom-0.5 h-[2px] rounded-full"
                        style={{ background: 'var(--mishri-gold)' }}
                        transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                      />
                    )}
                  </>
                )}
              </NavLink>
            ))}
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-1">
            {/* Cart button — visible on all screens */}
            <Link
              to="/cart"
              aria-label={`Cart, ${count} item${count !== 1 ? 's' : ''}`}
              className="relative size-10 grid place-items-center rounded-full hover:bg-[var(--mishri-surface-offset)] transition-colors"
            >
              <ShoppingBag className="size-[18px]" strokeWidth={1.7} />
              <AnimatePresence>
                {count > 0 && (
                  <motion.span
                    key="badge"
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0, opacity: 0 }}
                    className="absolute top-1 right-1 min-w-[16px] h-[16px] px-1 rounded-full text-[9px] font-bold grid place-items-center"
                    style={{
                      background: 'var(--mishri-gold)',
                      color: 'var(--mishri-text-inverse)',
                    }}
                  >
                    {count > 9 ? '9+' : count}
                  </motion.span>
                )}
              </AnimatePresence>
            </Link>

            {/* Mobile menu button */}
            <button
              aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={mobileOpen}
              onClick={() => setMobileOpen(v => !v)}
              className="lg:hidden size-10 grid place-items-center rounded-full hover:bg-[var(--mishri-surface-offset)] transition-colors"
            >
              <AnimatePresence mode="wait" initial={false}>
                {mobileOpen ? (
                  <motion.span key="x" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.15 }}>
                    <X className="size-[18px]" strokeWidth={1.7} />
                  </motion.span>
                ) : (
                  <motion.span key="menu" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.15 }}>
                    <Menu className="size-[18px]" strokeWidth={1.7} />
                  </motion.span>
                )}
              </AnimatePresence>
            </button>
          </div>
        </div>
      </motion.header>

      {/* Mobile drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setMobileOpen(false)}
              className="fixed inset-0 z-[90] bg-black/50 backdrop-blur-sm lg:hidden"
              aria-hidden="true"
            />

            {/* Slide-up sheet */}
            <motion.aside
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ type: 'spring', stiffness: 260, damping: 30 }}
              className="fixed bottom-0 inset-x-0 z-[100] rounded-t-[28px] lg:hidden safe-bottom"
              style={{
                background: 'var(--mishri-surface)',
                boxShadow: '0 -24px 64px rgba(0,0,0,.18)',
              }}
              role="dialog"
              aria-modal="true"
              aria-label="Navigation menu"
            >
              <div className="px-5 pt-4 pb-2 flex items-center justify-between">
                <Logo />
                <button
                  onClick={() => setMobileOpen(false)}
                  aria-label="Close menu"
                  className="size-9 rounded-full grid place-items-center bg-[var(--mishri-surface-offset)]"
                >
                  <X className="size-4" />
                </button>
              </div>

              <nav className="px-5 pt-2 pb-6 flex flex-col" aria-label="Mobile navigation">
                {links.map(l => (
                  <NavLink
                    key={l.to}
                    to={l.to}
                    end={l.end}
                    onClick={() => setMobileOpen(false)}
                    className={({ isActive }) =>
                      `py-4 border-b flex items-center justify-between transition-colors ${
                        isActive
                          ? 'text-[var(--mishri-gold)] border-[var(--mishri-border)]'
                          : 'border-[var(--mishri-border)] hover:text-[var(--mishri-gold)]'
                      }`
                    }
                  >
                    <span className="font-display text-[22px]">{l.label}</span>
                    <span className="opacity-40 text-lg">→</span>
                  </NavLink>
                ))}
              </nav>

              <p className="px-5 pb-5 text-[11px] uppercase tracking-[0.22em] opacity-40">
                Aaharvedik · Pure Dairy, Naturally
              </p>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
