import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Navbar } from './Navbar';
import { Footer } from './Footer';
import { MobileActionBar } from './MobileActionBar';
import { CartDrawer } from '../ui/CartDrawer';
import { BackToTop } from '../ui/BackToTop';
import { BrandedLoader } from '../ui/BrandedLoader';

export const Layout: React.FC = () => {
  const location = useLocation();

  // Scroll to top on route change
  React.useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex flex-col bg-[#0a0a0c] text-gray-100 selection:bg-yellow-500 selection:text-black relative">
      <BrandedLoader />
      
      <Navbar />

      <AnimatePresence mode="wait">
        <motion.main
          key={location.pathname}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.28, ease: 'easeOut' }}
          className="flex-grow"
        >
          <Outlet />
        </motion.main>
      </AnimatePresence>

      <Footer />
      <MobileActionBar />
      <CartDrawer />
      <BackToTop />
    </div>
  );
};
