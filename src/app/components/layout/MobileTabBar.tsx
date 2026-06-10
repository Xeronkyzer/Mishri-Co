import { NavLink } from 'react-router';
import { Home, ShoppingBasket, ShoppingBag, User } from 'lucide-react';
import { useCart } from '../../state/cart';

const items = [
  { to: '/', icon: Home, label: 'Home', end: true },
  { to: '/products', icon: ShoppingBasket, label: 'Shop' },
  { to: '/cart', icon: ShoppingBag, label: 'Cart' },
  { to: '/profile', icon: User, label: 'Profile' },
];

export function MobileTabBar() {
  const { count } = useCart();
  return (
    <nav className="lg:hidden fixed bottom-0 inset-x-0 z-40 border-t" style={{ background: 'oklch(0.98 0.009 82 / 0.92)', backdropFilter: 'blur(20px)', borderColor: 'var(--mishri-border)' }}>
      <div className="grid grid-cols-4 h-14">
        {items.map(({ to, icon: I, label, end }) => (
          <NavLink key={to} to={to} end={end}
            className={({ isActive }) => `flex flex-col items-center justify-center gap-0.5 relative ${isActive ? 'text-[var(--mishri-gold)]' : 'text-[var(--mishri-text-muted)]'}`}>
            {({ isActive }) => (
              <>
                <div className="relative">
                  <I className="size-[20px]" strokeWidth={1.6}/>
                  {label === 'Cart' && count > 0 && (
                    <span className="absolute -top-1 -right-2 min-w-[16px] h-[16px] px-1 rounded-full text-[9px] font-semibold grid place-items-center"
                      style={{ background: 'var(--mishri-gold)', color: 'var(--mishri-text-inverse)' }}>{count}</span>
                  )}
                </div>
                <span className="text-[10px] tracking-wide">{label}</span>
                {isActive && <span className="absolute bottom-1 size-1 rounded-full" style={{ background: 'var(--mishri-gold)' }}/>}
              </>
            )}
          </NavLink>
        ))}
      </div>
    </nav>
  );
}
