import React, { useEffect } from 'react';
import { X, ZoomIn } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { GalleryItem } from '../../types';
import { OptimizedImage } from './OptimizedImage';

interface LightboxModalProps {
  item: GalleryItem | null;
  onClose: () => void;
}

export const LightboxModal: React.FC<LightboxModalProps> = ({ item, onClose }) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!item) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md">
        {/* Backdrop click */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0"
        />

        <motion.div
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.92 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          className="relative max-w-4xl w-full bg-[#121217] border border-zinc-800 rounded-3xl overflow-hidden shadow-2xl z-10"
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            aria-label="Close image"
            className="absolute top-4 right-4 z-20 p-2.5 rounded-full bg-black/70 border border-zinc-700 text-white hover:bg-black transition-colors shadow-lg"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Large Image */}
          <div className="relative max-h-[75vh] w-full flex items-center justify-center bg-black">
            <OptimizedImage
              src={item.image}
              alt={item.title}
              priority={true}
              className="max-h-[75vh] w-full object-contain"
            />
          </div>

          {/* Caption */}
          <div className="p-5 bg-[#0e0e13] border-t border-zinc-800 flex items-center justify-between">
            <div>
              <span className="text-xs text-yellow-400 font-bold uppercase tracking-wider">
                {item.category}
              </span>
              <h3 className="font-heading text-xl text-white font-bold">{item.title}</h3>
              {item.description && (
                <p className="text-xs text-gray-400 mt-0.5">{item.description}</p>
              )}
            </div>

            <div className="text-zinc-600">
              <ZoomIn className="w-5 h-5" />
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
