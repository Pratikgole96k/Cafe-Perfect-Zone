import React, { useState } from 'react';
import { Plus, Check, Clock, Flame, Loader2 } from 'lucide-react';
import { motion } from 'framer-motion';
import { MenuItem } from '../../types';
import { formatPrice } from '../../utils/formatters';
import { useCart } from '../../context/CartContext';
import { toast } from 'sonner';
import { OptimizedImage } from './OptimizedImage';

interface FoodCardProps {
  item: MenuItem;
  onOpenDetails: (item: MenuItem) => void;
}

export const FoodCard: React.FC<FoodCardProps> = ({ item, onOpenDetails }) => {
  const { addToCart, items } = useCart();
  const [addState, setAddState] = useState<'idle' | 'adding' | 'added'>('idle');

  const cartItem = items.find((ci) => ci.item.id === item.id);
  const inCartCount = cartItem?.quantity || 0;

  const handleAdd = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!item.isAvailable || addState !== 'idle') return;

    setAddState('adding');
    setTimeout(() => {
      addToCart(item, 1);
      setAddState('added');
      toast.success(`Added ${item.name} to cart!`, {
        description: `Price: ${formatPrice(item.price)}`,
        duration: 2000,
      });

      setTimeout(() => {
        setAddState('idle');
      }, 1200);
    }, 250);
  };

  return (
    <motion.div
      onClick={() => onOpenDetails(item)}
      whileHover={{ y: -5 }}
      transition={{ duration: 0.2 }}
      className="cafe-card group cursor-pointer flex flex-col justify-between overflow-hidden relative transition-all duration-300 hover:border-yellow-500/50 hover:shadow-2xl hover:shadow-yellow-500/10"
    >
      {/* Image container */}
      <div className="relative h-44 sm:h-48 w-full overflow-hidden bg-zinc-900">
        <OptimizedImage
          src={item.image}
          alt={item.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />

        {/* Gradient overlay on image */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#14141a] via-transparent to-black/40 pointer-events-none" />

        {/* Veg Badge & Popular Tag */}
        <div className="absolute top-2.5 left-2.5 flex items-center gap-1.5 z-10">
          {/* Veg Dot */}
          <div className="w-5 h-5 bg-[#0a0a0c]/90 border border-green-500 rounded flex items-center justify-center p-0.5 shadow-md">
            <div className="w-2.5 h-2.5 rounded-full bg-green-500 shadow-sm shadow-green-500" />
          </div>

          {item.isPopular && (
            <span className="bg-gradient-to-r from-amber-500 to-yellow-400 text-black text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full flex items-center gap-1 shadow-md shadow-amber-500/30">
              <Flame className="w-3 h-3 fill-black" />
              Popular
            </span>
          )}
        </div>

        {/* Category Pill */}
        <span className="absolute top-2.5 right-2.5 bg-black/75 backdrop-blur-md border border-zinc-700/60 text-yellow-400 text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full shadow">
          {item.category}
        </span>

        {/* Preparation Time */}
        {item.preparationTime && (
          <span className="absolute bottom-2 left-2.5 text-[11px] text-gray-300 flex items-center gap-1 bg-black/70 backdrop-blur-sm px-2 py-0.5 rounded-md border border-zinc-800/60">
            <Clock className="w-3 h-3 text-yellow-400" />
            {item.preparationTime}
          </span>
        )}

        {/* Sold out overlay */}
        {!item.isAvailable && (
          <div className="absolute inset-0 bg-black/85 backdrop-blur-sm flex items-center justify-center z-20">
            <span className="bg-red-600/95 text-white text-xs font-black uppercase tracking-widest px-3.5 py-1.5 rounded-lg shadow-xl border border-red-500/40">
              SOLD OUT
            </span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-4 sm:p-5 flex flex-col flex-grow justify-between gap-3 font-poppins">
        <div>
          <div className="flex items-start justify-between gap-2">
            <h3 className="font-poppins font-semibold text-base sm:text-lg text-white group-hover:text-yellow-400 transition-colors line-clamp-1">
              {item.name}
            </h3>
            <span className="font-poppins font-bold text-lg sm:text-xl text-yellow-400 whitespace-nowrap">
              {formatPrice(item.price)}
            </span>
          </div>

          <p className="font-poppins text-gray-400 text-xs sm:text-sm mt-1.5 line-clamp-2 leading-relaxed">
            {item.description}
          </p>
        </div>

        {/* Footer info & Add button */}
        <div className="pt-3 border-t border-zinc-800/80 flex items-center justify-between gap-2 mt-auto">
          <div className="text-[11px] text-gray-500 font-medium">
            {inCartCount > 0 ? (
              <span className="text-green-400 font-semibold flex items-center gap-1">
                <Check className="w-3.5 h-3.5" />
                {inCartCount} in cart
              </span>
            ) : (
              <span className="text-zinc-500">Freshly made</span>
            )}
          </div>

          <button
            type="button"
            onClick={handleAdd}
            disabled={!item.isAvailable || addState !== 'idle'}
            aria-label={`Add ${item.name} to cart`}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 transition-all duration-200 shadow-sm ${
              !item.isAvailable
                ? 'bg-zinc-800 text-zinc-500 cursor-not-allowed border border-zinc-700'
                : addState === 'added'
                ? 'bg-green-500 text-black shadow-md shadow-green-500/30'
                : addState === 'adding'
                ? 'bg-yellow-500/80 text-black'
                : inCartCount > 0
                ? 'bg-yellow-500 text-black shadow-md shadow-yellow-500/20 hover:brightness-110'
                : 'gold-btn-outline hover:bg-yellow-500 hover:text-black'
            }`}
          >
            {addState === 'adding' ? (
              <>
                <Loader2 className="w-3.5 h-3.5 animate-spin" />
                <span>Adding...</span>
              </>
            ) : addState === 'added' ? (
              <>
                <Check className="w-3.5 h-3.5 stroke-[3]" />
                <span>Added</span>
              </>
            ) : (
              <>
                <Plus className="w-3.5 h-3.5" />
                <span>{inCartCount > 0 ? 'Add +' : 'Add'}</span>
              </>
            )}
          </button>
        </div>
      </div>
    </motion.div>
  );
};
