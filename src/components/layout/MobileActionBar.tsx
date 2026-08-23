import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { UtensilsCrossed, ShoppingBag, MessageCircle, Home, Phone } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { CAFE_CONFIG } from '../../config/cafeConfig';

export const MobileActionBar: React.FC = () => {
  const location = useLocation();
  const { totalItems, openCartDrawer } = useCart();

  return (
    <div className="sm:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#0e0e14]/95 backdrop-blur-lg border-t border-zinc-800/90 px-3 py-2">
      <div className="grid grid-cols-5 gap-1 items-center text-center">
        {/* Home */}
        <Link
          to="/"
          className={`flex flex-col items-center justify-center py-1 text-[11px] transition-colors ${
            location.pathname === '/' ? 'text-yellow-400 font-bold' : 'text-gray-400 hover:text-gray-200'
          }`}
        >
          <Home className="w-5 h-5 mb-0.5" />
          <span>Home</span>
        </Link>

        {/* Menu */}
        <Link
          to="/menu"
          className={`flex flex-col items-center justify-center py-1 text-[11px] transition-colors ${
            location.pathname === '/menu' ? 'text-yellow-400 font-bold' : 'text-gray-400 hover:text-gray-200'
          }`}
        >
          <UtensilsCrossed className="w-5 h-5 mb-0.5" />
          <span>Menu</span>
        </Link>

        {/* Floating Cart Button */}
        <button
          onClick={openCartDrawer}
          className="flex flex-col items-center justify-center -mt-5 relative group"
          aria-label="View Cart"
        >
          <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-amber-500 to-yellow-400 text-black flex items-center justify-center shadow-lg shadow-yellow-500/40 transform active:scale-95 transition-transform">
            <ShoppingBag className="w-6 h-6" />
            {totalItems > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-600 text-white font-black text-[10px] w-5 h-5 rounded-full flex items-center justify-center border-2 border-[#0e0e14]">
                {totalItems}
              </span>
            )}
          </div>
          <span className="text-[11px] font-semibold text-yellow-400 mt-0.5">Cart</span>
        </button>

        {/* Call */}
        <a
          href={`tel:${CAFE_CONFIG.phoneRaw}`}
          className="flex flex-col items-center justify-center py-1 text-[11px] text-gray-400 hover:text-yellow-400 transition-colors"
        >
          <Phone className="w-5 h-5 mb-0.5" />
          <span>Call</span>
        </a>

        {/* WhatsApp Order */}
        <a
          href={`https://wa.me/${CAFE_CONFIG.whatsappNumber}`}
          target="_blank"
          rel="noreferrer"
          className="flex flex-col items-center justify-center py-1 text-[11px] text-green-400 font-medium hover:text-green-300 transition-colors"
        >
          <MessageCircle className="w-5 h-5 mb-0.5" />
          <span>WhatsApp</span>
        </a>
      </div>
    </div>
  );
};
