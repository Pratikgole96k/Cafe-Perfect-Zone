import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { UtensilsCrossed, Sparkles } from 'lucide-react';
import { CAFE_CONFIG } from '../../config/cafeConfig';

export const BrandedLoader: React.FC = () => {
  const [show, setShow] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShow(false);
    }, 650);

    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.4, ease: 'easeInOut' } }}
          className="fixed inset-0 z-50 bg-[#0a0a0c] flex flex-col items-center justify-center pointer-events-none"
        >
          <motion.div
            initial={{ scale: 0.85, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 1.08, opacity: 0 }}
            transition={{ duration: 0.35, ease: 'easeOut' }}
            className="flex flex-col items-center space-y-4 text-center px-4"
          >
            {/* Logo Glow Aura */}
            <div className="relative">
              <div className="absolute inset-0 bg-yellow-500/30 rounded-2xl blur-xl animate-pulse" />
              <div className="relative w-16 h-16 rounded-2xl bg-gradient-to-br from-yellow-400 via-amber-500 to-amber-600 flex items-center justify-center text-black shadow-2xl shadow-yellow-500/40">
                <UtensilsCrossed className="w-8 h-8 stroke-[2.5]" />
              </div>
            </div>

            <div className="space-y-1">
              <h1 className="font-heading text-3xl sm:text-4xl font-black text-white tracking-widest uppercase">
                {CAFE_CONFIG.name}
              </h1>
              <p className="text-xs text-yellow-400 font-semibold tracking-widest uppercase flex items-center justify-center gap-1.5">
                <Sparkles className="w-3 h-3 fill-yellow-400" />
                <span>{CAFE_CONFIG.tagline}</span>
                <Sparkles className="w-3 h-3 fill-yellow-400" />
              </p>
            </div>

            {/* Subtle loading bar */}
            <div className="w-36 h-1 bg-zinc-800 rounded-full overflow-hidden mt-2">
              <motion.div
                initial={{ x: '-100%' }}
                animate={{ x: '100%' }}
                transition={{ duration: 0.6, repeat: Infinity, ease: 'easeInOut' }}
                className="w-full h-full bg-gradient-to-r from-transparent via-yellow-400 to-transparent"
              />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
