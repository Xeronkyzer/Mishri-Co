import { NavLink } from 'react-router';
import { Home, ShoppingBasket, ShoppingBag, User } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useCart } from '../../state/cart';

const items = [
  { to: '/', icon: Home, label: 'Home', end: true },
  { to: '/products', icon: ShoppingBasket, label: 'Shop' },
  { to: '/cart', icon: ShoppingBag, label: 'Cart' },
  { to: '/profile', icon: User, label: 'Profile' },
] as const;

export function MobileTabBar() {
  const { count } = useCart();

  return (
    <nav
      className="lg:hidden fixed bottom-0 inset-x-0 z-40 border-t safe-bottom"
      style={{
        background: 'oklch(0.975 0.008 88 / 0.96)',
        backdropFilter: 'blur(20px) saturate(160%)',
        WebkitBackdropFilter: 'blur(20px) saturate(160%)',
        borderColor: 'var(--mishri-border)',
      }}
      aria-label="Bottom navigation"
    >
      <div className="grid grid-cols-4 h-[60px]">
        {items.map(({ to, icon: Icon, label, end }) => (
          <NavLink
            key={to}
            to={to}
            end={end}
            className={({ isActive }) =>
              `flex flex-col items-center justify-center gap-0.5 relative transition-colors ${
                isActive ? 'text-[var(--mishri-gold)]' : 'text-[var(--mishri-text-muted)]'
              }`
            }
            aria-label={label}
          >
            {({ isActive }) => (
              <>
                <div className="relative">
                  <Icon className="size-[20px]" strokeWidth={isActive ? 2 : 1.6} />
                  {label === 'Cart' && (
                    <AnimatePresence>
                      {count > 0 && (
                        <motion.span
                          key="cart-badge"
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          exit={{ scale: 0 }}
                          className="absolute -top-1.5 -right-2 min-w-[16px] h-[16px] px-1 rounded-full text-[9px] font-bold grid place-items-center"
                          style={{
                            background: 'var(--mishri-gold)',
                            color: 'var(--mishri-text-inverse)',
                          }}
                        >
                          {count > 9 ? '9+' : count}
                        </motion.span>
                      )}
                    </AnimatePresence>
                  )}
                </div>
                <span className="text-[10px] tracking-wide font-medium">{label}</span>
                {isActive && (
                  <motion.span
                    layoutId="tab-dot"
                    className="absolute bottom-1 size-1 rounded-full"
                    style={{ background: 'var(--mishri-gold)' }}
                  />
                )}
              </>
            )}
          </NavLink>
        ))}
      </div>
    </nav>
  );
}
