import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  ShoppingBag, 
  Trash2, 
  Plus, 
  Minus, 
  ArrowRight, 
  ArrowLeft, 
  MessageCircle, 
  Sparkles, 
  ShieldCheck
} from 'lucide-react';
import { useCart } from '../context/CartContext';
import { formatPrice } from '../utils/formatters';
import { buildWhatsAppCartUrl } from '../utils/whatsapp';

export const CartPage: React.FC = () => {
  const { items, updateQuantity, removeFromCart, clearCart, subtotal } = useCart();
  const navigate = useNavigate();

  const handleWhatsAppOrder = () => {
    const url = buildWhatsAppCartUrl(items);
    window.open(url, '_blank');
  };

  if (items.length === 0) {
    return (
      <div className="pt-28 pb-20 min-h-[80vh] flex items-center justify-center">
        <div className="max-w-md mx-auto px-4 text-center space-y-6">
          <div className="w-20 h-20 rounded-full bg-zinc-900 border border-zinc-800 flex items-center justify-center text-yellow-400 mx-auto shadow-xl">
            <ShoppingBag className="w-10 h-10" />
          </div>
          <div className="space-y-2">
            <h1 className="font-heading text-3xl sm:text-4xl font-black text-white uppercase">
              YOUR CART IS EMPTY
            </h1>
            <p className="text-gray-400 text-sm">
              Looks like you haven't added any dishes yet. Browse our delicious pizzas, burgers, sandwiches, shakes, and more!
            </p>
          </div>
          <Link
            to="/menu"
            className="gold-btn-primary inline-flex items-center gap-2 px-8 py-3.5 rounded-xl text-xs font-bold uppercase tracking-wider"
          >
            <span>Explore Menu</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-28 pb-20 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-zinc-800 pb-6">
          <div>
            <h1 className="font-heading text-4xl sm:text-5xl font-black text-white uppercase">
              YOUR ORDER CART
            </h1>
            <p className="text-gray-400 text-sm mt-1">
              Review your selected items before proceeding to checkout
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Link
              to="/menu"
              className="text-xs font-semibold text-gray-300 hover:text-yellow-400 flex items-center gap-1.5 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Continue Shopping</span>
            </Link>
            <button
              onClick={clearCart}
              className="text-xs font-semibold text-gray-500 hover:text-red-400 flex items-center gap-1 transition-colors ml-4"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>Clear Cart</span>
            </button>
          </div>
        </div>

        {/* Content Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Cart Items List */}
          <div className="lg:col-span-8 space-y-4">
            {items.map((ci) => (
              <div
                key={ci.item.id}
                className="cafe-card p-4 sm:p-5 rounded-2xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
              >
                <div className="flex items-center gap-4 w-full sm:w-auto">
                  <img
                    src={ci.item.image}
                    alt={ci.item.name}
                    onError={(e) => {
                      (e.target as HTMLImageElement).src =
                        'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=600&auto=format&fit=crop&q=80';
                    }}
                    className="w-20 h-20 rounded-xl object-cover bg-zinc-800 flex-shrink-0"
                  />
                  <div className="space-y-1 min-w-0">
                    <span className="text-[10px] text-yellow-400 font-bold uppercase tracking-wider bg-yellow-500/10 px-2 py-0.5 rounded">
                      {ci.item.category}
                    </span>
                    <h3 className="font-bold text-base sm:text-lg text-white truncate">
                      {ci.item.name}
                    </h3>
                    <p className="text-xs text-gray-400">
                      {formatPrice(ci.item.price)} each
                    </p>
                    {ci.specialInstructions && (
                      <p className="text-xs text-amber-300/80 italic">
                        Note: {ci.specialInstructions}
                      </p>
                    )}
                  </div>
                </div>

                {/* Right controls: Qty and Subtotal */}
                <div className="flex items-center justify-between sm:justify-end gap-5 w-full sm:w-auto pt-3 sm:pt-0 border-t sm:border-t-0 border-zinc-800">
                  {/* Quantity */}
                  <div className="flex items-center bg-zinc-900 border border-zinc-700 rounded-xl p-1">
                    <button
                      onClick={() => updateQuantity(ci.item.id, ci.quantity - 1)}
                      className="w-7 h-7 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-white flex items-center justify-center transition-colors"
                      aria-label="Decrease quantity"
                    >
                      <Minus className="w-3.5 h-3.5" />
                    </button>
                    <span className="w-9 text-center text-sm font-bold text-white">
                      {ci.quantity}
                    </span>
                    <button
                      onClick={() => updateQuantity(ci.item.id, ci.quantity + 1)}
                      className="w-7 h-7 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-white flex items-center justify-center transition-colors"
                      aria-label="Increase quantity"
                    >
                      <Plus className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  {/* Subtotal */}
                  <div className="text-right min-w-[80px]">
                    <span className="font-heading text-lg sm:text-xl font-bold text-yellow-400">
                      {formatPrice(ci.item.price * ci.quantity)}
                    </span>
                  </div>

                  {/* Remove */}
                  <button
                    onClick={() => removeFromCart(ci.item.id)}
                    aria-label={`Remove ${ci.item.name}`}
                    className="p-2 text-gray-500 hover:text-red-400 hover:bg-red-500/10 rounded-xl transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Right Column: Order Summary */}
          <div className="lg:col-span-4 space-y-6">
            <div className="cafe-card p-6 rounded-3xl space-y-5 sticky top-28 border border-yellow-500/20 shadow-2xl">
              <h2 className="font-heading text-2xl font-black text-white uppercase tracking-wider border-b border-zinc-800 pb-3">
                ORDER SUMMARY
              </h2>

              <div className="space-y-3 text-sm">
                <div className="flex justify-between text-gray-300">
                  <span>Items Subtotal</span>
                  <span className="font-semibold text-white">{formatPrice(subtotal)}</span>
                </div>
                <div className="flex justify-between text-gray-300">
                  <span>GST & Restaurant Charges</span>
                  <span className="text-green-400 font-medium">₹0 (Free)</span>
                </div>
                <div className="flex justify-between text-gray-300">
                  <span>Packaging & Handling</span>
                  <span className="text-green-400 font-medium">₹0 (Free)</span>
                </div>

                <div className="pt-4 border-t border-zinc-800 flex justify-between items-center text-lg font-bold text-white">
                  <span>Grand Total</span>
                  <span className="font-heading text-3xl text-yellow-400">{formatPrice(subtotal)}</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-3 pt-2">
                <button
                  onClick={() => navigate('/checkout')}
                  className="gold-btn-primary w-full py-4 rounded-2xl text-xs sm:text-sm font-black uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg shadow-yellow-500/25"
                >
                  <span>PROCEED TO CHECKOUT</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <button
                  onClick={handleWhatsAppOrder}
                  className="w-full py-3.5 rounded-2xl bg-green-600 text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 hover:bg-green-500 transition-colors shadow-lg shadow-green-600/20"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>ORDER DIRECT ON WHATSAPP</span>
                </button>
              </div>

              {/* Trust Badge */}
              <div className="pt-3 border-t border-zinc-800/80 flex items-center justify-center gap-2 text-xs text-gray-400">
                <ShieldCheck className="w-4 h-4 text-yellow-400" />
                <span>Direct Café Confirmation • No Extra Markup</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
