import { useEffect } from 'react';
import { HashRouter, Routes, Route, useLocation } from 'react-router';
import { AnimatePresence, motion } from 'motion/react';
import { CartProvider } from './state/cart';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { MobileTabBar } from './components/layout/MobileTabBar';
import { Toaster } from './components/ui/sonner';
import { Home } from './pages/Home';
import { Products } from './pages/Products';
import { Cart } from './pages/Cart';
import { Profile } from './pages/Profile';
import { Settings } from './pages/Settings';
import { Story } from './pages/Story';
import { Contact } from './pages/Contact';

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
  }, [pathname]);
  return null;
}

function RoutedShell() {
  const loc = useLocation();
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={loc.pathname}
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      >
        <Routes location={loc}>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Products />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/story" element={<Story />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="*" element={<Home />} />
        </Routes>
      </motion.div>
    </AnimatePresence>
  );
}

import { UserProvider } from './state/user';

export default function App() {
  return (
    <HashRouter>
      <UserProvider>
        <CartProvider>
          <ScrollToTop />
          <div className="min-h-screen relative grain overflow-x-hidden" style={{ background: 'var(--mishri-bg)', color: 'var(--mishri-text)' }}>
            <Navbar />
            <main className="pb-24 lg:pb-0">
              <RoutedShell />
            </main>
            <Footer />
            <MobileTabBar />
            <Toaster position="top-right" />
          </div>
        </CartProvider>
      </UserProvider>
    </HashRouter>
  );
}
