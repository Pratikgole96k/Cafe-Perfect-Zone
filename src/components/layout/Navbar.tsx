import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  UtensilsCrossed, 
  ShoppingBag, 
  Menu as MenuIcon, 
  X, 
  Phone, 
  MessageCircle, 
  Sparkles,
  Clock
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { CAFE_CONFIG } from '../../config/cafeConfig';
import { useCart } from '../../context/CartContext';
import { getCafeOpenStatus } from '../../utils/cafeStatus';

export const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [cafeStatus, setCafeStatus] = useState(getCafeOpenStatus());
  const location = useLocation();
  const { totalItems, openCartDrawer } = useCart();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 15);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });

    // Update cafe status every minute
    const interval = setInterval(() => {
      setCafeStatus(getCafeOpenStatus());
    }, 60000);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearInterval(interval);
    };
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Menu', path: '/menu' },
    { name: 'Gallery', path: '/gallery' },
    { name: 'Reviews', path: '/reviews' },
    { name: 'About', path: '/about' },
    { name: 'Contact', path: '/contact' },
  ];

  const isActive = (path: string) => {
    if (path === '/' && location.pathname === '/') return true;
    if (path !== '/' && location.pathname.startsWith(path)) return true;
    return false;
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'glass-nav shadow-2xl shadow-black/80 py-2.5 sm:py-3'
          : 'bg-gradient-to-b from-[#0a0a0c]/90 via-[#0a0a0c]/40 to-transparent py-3.5 sm:py-4'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo / Brand Name */}
          <Link to="/" className="flex items-center gap-2.5 sm:gap-3 group focus:outline-none">
            <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-gradient-to-br from-yellow-400 via-amber-500 to-amber-600 flex items-center justify-center text-black font-black shadow-lg shadow-yellow-500/25 group-hover:scale-105 transition-transform duration-300 flex-shrink-0">
              <UtensilsCrossed className="w-5 h-5 sm:w-6 sm:h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-heading text-2xl sm:text-3xl text-white group-hover:text-yellow-400 transition-colors tracking-wide leading-none">
                  {CAFE_CONFIG.name}
                </span>
                {/* Live Open / Closed Status Pill on desktop */}
                <span
                  className={`hidden md:inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-poppins font-bold border tracking-wider uppercase ${cafeStatus.badgeClass}`}
                  title={`${cafeStatus.timingText} • ${cafeStatus.nextStatusNote}`}
                >
                  <span className={`w-1.5 h-1.5 rounded-full ${cafeStatus.isOpen ? 'bg-emerald-400 animate-ping' : 'bg-amber-400'}`} />
                  <span>{cafeStatus.statusText}</span>
                </span>
              </div>
              <p className="font-poppins text-[10px] sm:text-xs text-yellow-400 font-semibold tracking-wider uppercase truncate max-w-[220px] sm:max-w-none mt-0.5">
                {CAFE_CONFIG.tagline}
              </p>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-1.5">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className={`px-3.5 py-2 rounded-xl text-sm font-medium transition-all duration-200 relative ${
                  isActive(link.path)
                    ? 'text-yellow-400 font-bold bg-yellow-500/10 shadow-sm'
                    : 'text-gray-300 hover:text-white hover:bg-zinc-800/60'
                }`}
              >
                {link.name}
                {isActive(link.path) && (
                  <motion.span
                    layoutId="activeNavIndicator"
                    className="absolute bottom-0 left-3 right-3 h-[2px] bg-gradient-to-r from-yellow-400 to-amber-500 rounded-full shadow-sm shadow-yellow-400"
                    transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                  />
                )}
              </Link>
            ))}
          </nav>

          {/* Desktop Actions */}
          <div className="hidden sm:flex items-center gap-3">
            {/* Cart Button with Count Badge */}
            <motion.button
              type="button"
              onClick={openCartDrawer}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              aria-label="Open Shopping Cart"
              className="relative p-2.5 rounded-xl bg-zinc-900/90 border border-zinc-800 text-gray-200 hover:text-yellow-400 hover:border-yellow-500/40 hover:bg-zinc-800 transition-all duration-200 shadow-md"
            >
              <ShoppingBag className="w-5 h-5" />
              {totalItems > 0 && (
                <span className="absolute -top-1.5 -right-1.5 bg-gradient-to-r from-yellow-400 to-amber-500 text-black font-black text-[11px] w-5 h-5 rounded-full flex items-center justify-center shadow-lg shadow-yellow-500/50 animate-pulse">
                  {totalItems}
                </span>
              )}
            </motion.button>

            {/* Quick Order Now / View Menu Button */}
            <Link
              to="/menu"
              className="gold-btn-primary px-4 py-2 sm:px-5 sm:py-2.5 rounded-xl text-xs sm:text-sm flex items-center gap-2"
            >
              <Sparkles className="w-4 h-4" />
              <span>Order Now</span>
            </Link>
          </div>

          {/* Mobile Right Bar: Status, Cart & Hamburger */}
          <div className="flex items-center gap-2 lg:hidden">
            {/* Mobile Open/Closed Status */}
            <span
              className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[9px] font-bold border uppercase ${cafeStatus.badgeClass}`}
            >
              <span className={`w-1.5 h-1.5 rounded-full ${cafeStatus.isOpen ? 'bg-emerald-400' : 'bg-amber-400'}`} />
              <span>{cafeStatus.isOpen ? 'OPEN' : 'CLOSED'}</span>
            </span>

            <button
              onClick={openCartDrawer}
              aria-label="Open Shopping Cart"
              className="relative p-2 rounded-xl bg-zinc-900 border border-zinc-800 text-gray-200 hover:text-yellow-400"
            >
              <ShoppingBag className="w-5 h-5" />
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 bg-yellow-400 text-black font-black text-[10px] w-4 h-4 rounded-full flex items-center justify-center shadow">
                  {totalItems}
                </span>
              )}
            </button>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle Menu"
              className="p-2 rounded-xl bg-zinc-900 border border-zinc-800 text-gray-200 hover:text-yellow-400 focus:outline-none"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <MenuIcon className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="sm:hidden bg-[#0e0e13]/98 border-b border-yellow-500/20 backdrop-blur-xl px-4 pt-3 pb-6 space-y-3 animate-in slide-in-from-top duration-300">
          <div className="space-y-1">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className={`block px-4 py-2.5 rounded-xl text-base font-medium transition-colors ${
                  isActive(link.path)
                    ? 'text-yellow-400 bg-yellow-500/10 font-bold'
                    : 'text-gray-300 hover:bg-zinc-800/50 hover:text-white'
                }`}
              >
                {link.name}
              </Link>
            ))}
          </div>

          <div className="pt-3 border-t border-zinc-800/80 flex flex-col gap-2">
            <Link
              to="/menu"
              className="gold-btn-primary w-full py-3 rounded-xl text-center text-sm font-bold flex items-center justify-center gap-2"
            >
              <Sparkles className="w-4 h-4" />
              <span>Explore Complete Menu</span>
            </Link>

            <div className="flex items-center justify-between text-xs text-gray-400 pt-2 px-2">
              <a
                href={`tel:${CAFE_CONFIG.phoneRaw}`}
                className="flex items-center gap-1.5 text-yellow-400 hover:underline"
              >
                <Phone className="w-3.5 h-3.5" />
                <span>Call Us</span>
              </a>
              <a
                href={`https://wa.me/${CAFE_CONFIG.whatsappNumber}`}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-1.5 text-green-400 hover:underline"
              >
                <MessageCircle className="w-3.5 h-3.5" />
                <span>WhatsApp Order</span>
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
