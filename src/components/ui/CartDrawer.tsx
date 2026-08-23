import React from 'react';
import { useNavigate } from 'react-router-dom';
import { X, Plus, Minus, Trash2, ShoppingBag, ArrowRight, MessageCircle, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '../../context/CartContext';
import { formatPrice } from '../../utils/formatters';
import { buildWhatsAppCartUrl } from '../../utils/whatsapp';

export const CartDrawer: React.FC = () => {
  const {
    items,
    isCartDrawerOpen,
    closeCartDrawer,
    updateQuantity,
    removeFromCart,
    subtotal,
    clearCart,
  } = useCart();
  const navigate = useNavigate();

  const handleCheckout = () => {
    closeCartDrawer();
    navigate('/checkout');
  };

  const handleWhatsAppOrder = () => {
    const url = buildWhatsAppCartUrl(items);
    window.open(url, '_blank');
  };

  return (
    <AnimatePresence>
      {isCartDrawerOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeCartDrawer}
            className="absolute inset-0 bg-black/80 backdrop-blur-md"
          />

          <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 28, stiffness: 300 }}
              className="w-screen max-w-md bg-[#121217] border-l border-zinc-800 text-white shadow-2xl flex flex-col justify-between font-poppins"
            >
              {/* Header */}
              <div className="p-5 border-b border-zinc-800 flex items-center justify-between bg-[#0e0e13]">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-xl bg-yellow-500/20 text-yellow-400 flex items-center justify-center shadow-inner">
                    <ShoppingBag className="w-4 h-4" />
                  </div>
                  <h2 className="font-heading text-2xl text-white tracking-wide uppercase">
                    Your Order Cart ({items.length})
                  </h2>
                </div>

                <button
                  onClick={closeCartDrawer}
                  aria-label="Close cart"
                  className="p-2 rounded-xl text-gray-400 hover:text-white hover:bg-zinc-800 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Cart Items List */}
              <div className="flex-1 overflow-y-auto p-5 space-y-3.5">
                {items.length === 0 ? (
                  <div className="h-full flex flex-col items-center justify-center text-center p-6 space-y-4">
                    <div className="w-16 h-16 rounded-2xl bg-zinc-900 border border-zinc-800 flex items-center justify-center text-yellow-400/80 shadow-inner">
                      <ShoppingBag className="w-8 h-8" />
                    </div>
                    <div>
                      <h3 className="font-bold text-lg text-gray-200">Your cart is waiting</h3>
                      <p className="text-xs sm:text-sm text-gray-500 mt-1 max-w-xs leading-relaxed">
                        Explore our menu of cheesy pizzas, burgers, shakes, and maggi to add items!
                      </p>
                    </div>
                    <button
                      onClick={() => {
                        closeCartDrawer();
                        navigate('/menu');
                      }}
                      className="gold-btn-primary px-6 py-3 rounded-xl text-xs font-bold uppercase tracking-wider shadow-lg"
                    >
                      Explore Full Menu
                    </button>
                  </div>
                ) : (
                  <AnimatePresence mode="popLayout">
                    {items.map((ci) => (
                      <motion.div
                        key={ci.item.id}
                        layout
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9, x: 20 }}
                        className="bg-zinc-900/90 border border-zinc-800 rounded-2xl p-3.5 flex gap-3 items-center justify-between shadow-md"
                      >
                        {/* Thumbnail */}
                        <img
                          src={ci.item.image}
                          alt={ci.item.name}
                          onError={(e) => {
                            (e.target as HTMLImageElement).src =
                              'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=600&auto=format&fit=crop&q=80';
                          }}
                          className="w-16 h-16 rounded-xl object-cover flex-shrink-0 bg-zinc-800"
                        />

                        {/* Details */}
                        <div className="flex-1 min-w-0">
                          <h4 className="font-bold text-sm text-white truncate">{ci.item.name}</h4>
                          <p className="text-xs text-yellow-400 font-semibold mt-0.5">
                            {formatPrice(ci.item.price)} each
                          </p>
                          {ci.specialInstructions && (
                            <p className="text-[10px] text-gray-400 italic truncate mt-0.5">
                              Note: {ci.specialInstructions}
                            </p>
                          )}

                          {/* Quantity Controls */}
                          <div className="flex items-center gap-2 mt-2">
                            <div className="flex items-center bg-zinc-800 border border-zinc-700 rounded-lg p-0.5">
                              <button
                                onClick={() => updateQuantity(ci.item.id, ci.quantity - 1)}
                                className="w-6 h-6 rounded flex items-center justify-center hover:bg-zinc-700 text-gray-300 active:scale-90 transition-transform"
                                aria-label="Decrease quantity"
                              >
                                <Minus className="w-3 h-3" />
                              </button>
                              <span className="w-7 text-center text-xs font-bold text-white">
                                {ci.quantity}
                              </span>
                              <button
                                onClick={() => updateQuantity(ci.item.id, ci.quantity + 1)}
                                className="w-6 h-6 rounded flex items-center justify-center hover:bg-zinc-700 text-gray-300 active:scale-90 transition-transform"
                                aria-label="Increase quantity"
                              >
                                <Plus className="w-3 h-3" />
                              </button>
                            </div>

                            <span className="text-xs font-bold text-gray-200">
                              = {formatPrice(ci.item.price * ci.quantity)}
                            </span>
                          </div>
                        </div>

                        {/* Remove Button */}
                        <button
                          onClick={() => removeFromCart(ci.item.id)}
                          aria-label={`Remove ${ci.item.name}`}
                          className="p-2 text-gray-500 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                )}
              </div>

              {/* Footer & Totals */}
              {items.length > 0 && (
                <div className="p-5 border-t border-zinc-800 bg-[#0e0e13] space-y-4">
                  <div className="space-y-1.5 text-sm">
                    <div className="flex justify-between text-gray-400">
                      <span>Subtotal</span>
                      <span className="font-semibold text-white">{formatPrice(subtotal)}</span>
                    </div>
                    <div className="flex justify-between text-gray-400 text-xs">
                      <span>Taxes & Packaging</span>
                      <span className="text-green-400 font-medium">₹0 (Free)</span>
                    </div>
                    <div className="flex justify-between text-base font-bold text-white pt-2 border-t border-zinc-800">
                      <span>Grand Total</span>
                      <span className="font-heading text-xl text-yellow-400">{formatPrice(subtotal)}</span>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="space-y-2 pt-1">
                    <button
                      onClick={handleCheckout}
                      className="gold-btn-primary w-full py-3.5 rounded-xl text-sm font-bold uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg"
                    >
                      <span>Proceed to Checkout</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>

                    <button
                      onClick={handleWhatsAppOrder}
                      className="w-full py-3 rounded-xl bg-green-600/20 text-green-400 border border-green-500/40 hover:bg-green-600 hover:text-white transition-all text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 shadow-md"
                    >
                      <MessageCircle className="w-4 h-4" />
                      <span>Direct Order on WhatsApp</span>
                    </button>

                    <button
                      onClick={clearCart}
                      className="w-full text-center text-xs text-gray-500 hover:text-red-400 transition-colors pt-1"
                    >
                      Clear Cart
                    </button>
                  </div>
                </div>
              )}
            </motion.div>
          </div>
        </div>
      )}
    </AnimatePresence>
  );
};
