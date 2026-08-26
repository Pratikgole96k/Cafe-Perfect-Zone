import React, { useState } from 'react';
import { X, Plus, Minus, Clock, ShoppingBag, MessageCircle, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { MenuItem } from '../../types';
import { formatPrice } from '../../utils/formatters';
import { useCart } from '../../context/CartContext';
import { CAFE_CONFIG } from '../../config/cafeConfig';
import { toast } from 'sonner';
import { OptimizedImage } from './OptimizedImage';

interface FoodDetailModalProps {
  item: MenuItem | null;
  onClose: () => void;
}

export const FoodDetailModal: React.FC<FoodDetailModalProps> = ({ item, onClose }) => {
  const [quantity, setQuantity] = useState(1);
  const [instructions, setInstructions] = useState('');
  const { addToCart } = useCart();

  if (!item) return null;

  const handleAddToCart = () => {
    if (!item.isAvailable) return;
    addToCart(item, quantity, instructions.trim() || undefined);
    toast.success(`Added ${quantity}x ${item.name} to cart!`, {
      description: `Total: ${formatPrice(item.price * quantity)}`,
      duration: 2500,
    });
    onClose();
  };

  const handleDirectWhatsApp = () => {
    const itemTotal = item.price * quantity;
    let message = `Hello *${CAFE_CONFIG.name}*,\n\nI want to order *${item.name}*:\nQuantity: *${quantity}*\nPrice: *₹${itemTotal}*`;
    if (instructions.trim()) {
      message += `\nSpecial Note: ${instructions.trim()}`;
    }
    message += `\n\nPlease confirm my order.`;
    window.open(`https://wa.me/${CAFE_CONFIG.whatsappNumber}?text=${encodeURIComponent(message)}`, '_blank');
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
        {/* Overlay dismiss */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose} 
          className="absolute inset-0" 
        />

        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          className="relative w-full max-w-lg bg-[#14141a] border border-zinc-700/80 rounded-3xl overflow-hidden shadow-2xl shadow-black z-10 max-h-[92vh] overflow-y-auto"
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            aria-label="Close modal"
            className="absolute top-4 right-4 z-20 w-9 h-9 rounded-full bg-black/70 backdrop-blur-md border border-zinc-700 text-gray-300 hover:text-white hover:bg-black flex items-center justify-center transition-colors shadow-lg"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Food Image */}
          <div className="relative h-60 sm:h-64 w-full overflow-hidden bg-zinc-900">
            <OptimizedImage
              src={item.image}
              alt={item.name}
              containerClassName="w-full h-full"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#14141a] via-transparent to-black/30" />

            {/* Top badges */}
            <div className="absolute top-4 left-4 flex items-center gap-2">
              <span className="bg-black/80 backdrop-blur-md border border-yellow-500/40 text-yellow-400 text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full shadow">
                {item.category}
              </span>
              <div className="w-6 h-6 bg-black/80 border border-green-500 rounded flex items-center justify-center shadow">
                <div className="w-3 h-3 rounded-full bg-green-500" />
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="p-6 sm:p-7 space-y-5 font-poppins">
            <div>
              <div className="flex items-start justify-between gap-4">
                <h2 className="font-heading text-3xl sm:text-4xl text-white tracking-wide">
                  {item.name}
                </h2>
                <span className="font-poppins font-bold text-2xl sm:text-3xl text-yellow-400 whitespace-nowrap">
                  {formatPrice(item.price)}
                </span>
              </div>

              <p className="font-poppins text-gray-300 text-sm sm:text-base mt-2 leading-relaxed">
                {item.description}
              </p>
            </div>

            {/* Meta Info */}
            <div className="flex flex-wrap items-center gap-2.5 pt-1">
              {item.preparationTime && (
                <span className="text-xs text-gray-400 flex items-center gap-1.5 bg-zinc-900/90 border border-zinc-800 px-3 py-1 rounded-xl">
                  <Clock className="w-3.5 h-3.5 text-yellow-400" />
                  Prep time: {item.preparationTime}
                </span>
              )}
              {item.tags?.map((tag) => (
                <span
                  key={tag}
                  className="text-xs text-yellow-400/90 bg-yellow-500/10 border border-yellow-500/20 px-3 py-1 rounded-xl font-medium"
                >
                  #{tag}
                </span>
              ))}
            </div>

            {/* Special Instructions */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-gray-400 mb-1.5">
                Special Instructions (Optional)
              </label>
              <input
                type="text"
                placeholder="e.g. Extra spicy, less cheese, no onions..."
                value={instructions}
                onChange={(e) => setInstructions(e.target.value)}
                className="w-full bg-zinc-900/90 border border-zinc-800 rounded-xl px-4 py-2.5 text-sm text-white placeholder-gray-500 focus:border-yellow-500 focus:outline-none transition-colors"
              />
            </div>

            {/* Quantity & Action Controls */}
            <div className="pt-3 border-t border-zinc-800/80 flex flex-col sm:flex-row items-center gap-3">
              {/* Quantity Selector */}
              <div className="flex items-center justify-between w-full sm:w-auto bg-zinc-900 border border-zinc-800 rounded-xl p-1.5 shadow-inner">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  aria-label="Decrease quantity"
                  className="w-9 h-9 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-white flex items-center justify-center transition-colors active:scale-95"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className="px-4 font-bold text-white text-base">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  aria-label="Increase quantity"
                  className="w-9 h-9 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-white flex items-center justify-center transition-colors active:scale-95"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>

              {/* Add to Cart Button */}
              <button
                onClick={handleAddToCart}
                disabled={!item.isAvailable}
                className={`flex-grow w-full py-3.5 px-5 rounded-xl font-bold uppercase tracking-wider text-sm flex items-center justify-center gap-2 transition-all shadow-lg ${
                  item.isAvailable
                    ? 'gold-btn-primary'
                    : 'bg-zinc-800 text-zinc-500 cursor-not-allowed border border-zinc-700'
                }`}
              >
                <ShoppingBag className="w-4 h-4" />
                <span>
                  {item.isAvailable
                    ? `Add to Cart • ${formatPrice(item.price * quantity)}`
                    : 'Sold Out'}
                </span>
              </button>

              {/* Direct WhatsApp Quick Order */}
              <button
                onClick={handleDirectWhatsApp}
                title="Order this item directly on WhatsApp"
                aria-label="Order on WhatsApp"
                className="w-full sm:w-auto py-3.5 px-4 rounded-xl bg-green-600/20 text-green-400 border border-green-500/30 hover:bg-green-600 hover:text-white transition-all flex items-center justify-center gap-1.5 text-xs font-bold shadow-md"
              >
                <MessageCircle className="w-4 h-4" />
                <span className="sm:hidden">WhatsApp Order</span>
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
