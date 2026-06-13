import { useEffect } from 'react';
import { HashRouter, Routes, Route, useLocation } from 'react-router';
import { AnimatePresence, motion } from 'motion/react';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { Toaster } from './components/ui/sonner';
import { Home } from './pages/Home';
import { Products } from './pages/Products';
import { Story } from './pages/Story';
import { Contact } from './pages/Contact';

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' as ScrollBehavior });
  }, [pathname]);
  return null;
}

function RoutedShell() {
  const loc = useLocation();
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={loc.pathname}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -8 }}
        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
      >
        <Routes location={loc}>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Products />} />
          <Route path="/story" element={<Story />} />
          <Route path="/contact" element={<Contact />} />
          {/* Catch-all → Home */}
          <Route path="*" element={<Home />} />
        </Routes>
      </motion.div>
    </AnimatePresence>
  );
}

export default function App() {
  return (
    <HashRouter>
      <ScrollToTop />
      <div
        className="min-h-screen relative grain overflow-x-hidden"
        style={{ background: 'var(--mishri-bg)', color: 'var(--mishri-text)' }}
      >
        <Navbar />
        <main>
          <RoutedShell />
        </main>
        <Footer />
        <Toaster
          position="top-center"
          toastOptions={{
            style: {
              background: 'var(--mishri-surface)',
              color: 'var(--mishri-text)',
              border: '1px solid var(--mishri-border)',
              borderRadius: '16px',
              fontFamily: 'var(--font-body)',
            },
          }}
        />
      </div>
    </HashRouter>
  );
}
