import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { 
  User, 
  Phone, 
  MapPin, 
  Utensils, 
  CheckCircle2, 
  ArrowLeft, 
  MessageCircle, 
  Sparkles, 
  ShoppingBag, 
  ShieldCheck
} from 'lucide-react';
import { useCart } from '../context/CartContext';
import { orderService } from '../services/api';
import { formatPrice, generateOrderNumber } from '../utils/formatters';
import { buildWhatsAppCartUrl } from '../utils/whatsapp';
import { OrderType } from '../types';
import { toast } from 'sonner';

export const CheckoutPage: React.FC = () => {
  const { items, subtotal, clearCart } = useCart();
  const navigate = useNavigate();

  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [orderType, setOrderType] = useState<OrderType>('Pickup');
  const [tableNumber, setTableNumber] = useState('');
  const [specialInstructions, setSpecialInstructions] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (items.length === 0) {
    return (
      <div className="pt-28 pb-20 min-h-[70vh] flex items-center justify-center">
        <div className="text-center space-y-4 max-w-sm px-4">
          <div className="w-16 h-16 rounded-full bg-zinc-900 flex items-center justify-center text-yellow-400 mx-auto">
            <ShoppingBag className="w-8 h-8" />
          </div>
          <h2 className="font-heading text-2xl font-bold text-white">Your cart is empty</h2>
          <p className="text-sm text-gray-400">Please add items to your cart before proceeding to checkout.</p>
          <Link to="/menu" className="gold-btn-primary inline-block px-6 py-3 rounded-xl text-xs font-bold">
            Explore Menu
          </Link>
        </div>
      </div>
    );
  }

  const validate = (): boolean => {
    if (!customerName.trim()) {
      toast.error('Please enter your full name');
      return false;
    }
    const cleanPhone = customerPhone.replace(/\D/g, '');
    if (cleanPhone.length < 10) {
      toast.error('Please enter a valid 10-digit mobile number');
      return false;
    }
    if (orderType === 'Dine-in' && !tableNumber.trim()) {
      toast.error('Please specify your Table Number for Dine-in');
      return false;
    }
    return true;
  };

  const handlePlaceOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    try {
      const orderNumber = generateOrderNumber();
      const orderPayload = {
        orderNumber,
        customerName: customerName.trim(),
        customerPhone: customerPhone.trim(),
        orderType,
        tableNumber: orderType === 'Dine-in' ? tableNumber.trim() : undefined,
        specialInstructions: specialInstructions.trim() || undefined,
        items: items.map((ci) => ({
          itemId: ci.item.id,
          name: ci.item.name,
          price: ci.item.price,
          quantity: ci.quantity,
          subtotal: ci.item.price * ci.quantity,
          image: ci.item.image,
        })),
        subtotal,
        total: subtotal,
        status: 'Pending' as const,
      };

      const createdOrder = await orderService.create(orderPayload);
      clearCart();
      toast.success('Order Placed Successfully!', {
        description: `Order #${createdOrder.orderNumber}`,
      });
      navigate(`/order-confirmation/${createdOrder.id || createdOrder.orderNumber}`, {
        state: { order: createdOrder },
      });
    } catch {
      toast.error('Failed to place order. Please try again or order on WhatsApp.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleWhatsAppCheckout = () => {
    if (!validate()) return;
    const url = buildWhatsAppCartUrl(items, {
      name: customerName.trim(),
      phone: customerPhone.trim(),
      orderType,
      tableNumber: orderType === 'Dine-in' ? tableNumber.trim() : undefined,
      specialInstructions: specialInstructions.trim() || undefined,
    });
    window.open(url, '_blank');
  };

  return (
    <div className="pt-28 pb-20 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Header */}
        <div className="flex items-center gap-3 border-b border-zinc-800 pb-5">
          <Link
            to="/cart"
            className="p-2 rounded-xl bg-zinc-900 border border-zinc-800 text-gray-300 hover:text-yellow-400 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <div>
            <h1 className="font-heading text-3xl sm:text-4xl font-black text-white uppercase">
              CHECKOUT & ORDER
            </h1>
            <p className="text-gray-400 text-xs sm:text-sm">
              Provide your details to confirm pickup or dine-in order
            </p>
          </div>
        </div>

        {/* Content */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Customer Details Form */}
          <div className="lg:col-span-7 space-y-6">
            <form onSubmit={handlePlaceOrder} className="cafe-card p-6 sm:p-8 rounded-3xl space-y-6 border border-zinc-800">
              <h2 className="font-heading text-2xl font-bold text-white uppercase flex items-center gap-2">
                <User className="w-5 h-5 text-yellow-400" />
                <span>Customer Information</span>
              </h2>

              {/* Order Type Toggle */}
              <div className="space-y-2">
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-300">
                  Order Type *
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setOrderType('Pickup')}
                    className={`py-3.5 px-4 rounded-xl border text-sm font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-all ${
                      orderType === 'Pickup'
                        ? 'bg-yellow-500 text-black border-yellow-500 shadow-md shadow-yellow-500/20'
                        : 'bg-zinc-900 text-gray-300 border-zinc-800 hover:border-zinc-700'
                    }`}
                  >
                    <ShoppingBag className="w-4 h-4" />
                    <span>Self Pickup</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setOrderType('Dine-in')}
                    className={`py-3.5 px-4 rounded-xl border text-sm font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-all ${
                      orderType === 'Dine-in'
                        ? 'bg-yellow-500 text-black border-yellow-500 shadow-md shadow-yellow-500/20'
                        : 'bg-zinc-900 text-gray-300 border-zinc-800 hover:border-zinc-700'
                    }`}
                  >
                    <Utensils className="w-4 h-4" />
                    <span>Dine-in</span>
                  </button>
                </div>
              </div>

              {/* Customer Name */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-300 mb-1.5">
                  Full Name *
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-gray-500 absolute left-4 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    required
                    placeholder="Enter your name"
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    className="w-full bg-zinc-900/90 border border-zinc-800 rounded-xl pl-11 pr-4 py-3 text-sm text-white placeholder-gray-500 focus:border-yellow-500 focus:outline-none transition-colors"
                  />
                </div>
              </div>

              {/* Phone Number */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-300 mb-1.5">
                  Mobile Number *
                </label>
                <div className="relative">
                  <Phone className="w-4 h-4 text-gray-500 absolute left-4 top-1/2 -translate-y-1/2" />
                  <input
                    type="tel"
                    required
                    placeholder="e.g. 7666599406"
                    maxLength={10}
                    value={customerPhone}
                    onChange={(e) => setCustomerPhone(e.target.value)}
                    className="w-full bg-zinc-900/90 border border-zinc-800 rounded-xl pl-11 pr-4 py-3 text-sm text-white placeholder-gray-500 focus:border-yellow-500 focus:outline-none transition-colors"
                  />
                </div>
                <span className="text-[11px] text-gray-500 mt-1 block">
                  Used for order updates and WhatsApp confirmation
                </span>
              </div>

              {/* Table Number if Dine-in */}
              {orderType === 'Dine-in' && (
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-gray-300 mb-1.5">
                    Table Number / Seating Area *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Table 4, Corner Table"
                    value={tableNumber}
                    onChange={(e) => setTableNumber(e.target.value)}
                    className="w-full bg-zinc-900/90 border border-zinc-800 rounded-xl px-4 py-3 text-sm text-white placeholder-gray-500 focus:border-yellow-500 focus:outline-none transition-colors"
                  />
                </div>
              )}

              {/* Special Instructions */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-300 mb-1.5">
                  Special Notes / Cooking Instructions (Optional)
                </label>
                <textarea
                  rows={2}
                  placeholder="e.g. Less spicy, extra tissues, ready by 7:30 PM..."
                  value={specialInstructions}
                  onChange={(e) => setSpecialInstructions(e.target.value)}
                  className="w-full bg-zinc-900/90 border border-zinc-800 rounded-xl px-4 py-3 text-sm text-white placeholder-gray-500 focus:border-yellow-500 focus:outline-none transition-colors resize-none"
                />
              </div>

              {/* Action Buttons */}
              <div className="pt-4 border-t border-zinc-800 space-y-3">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="gold-btn-primary w-full py-4 rounded-2xl text-sm font-black uppercase tracking-wider flex items-center justify-center gap-2 shadow-xl shadow-yellow-500/20 disabled:opacity-50"
                >
                  <CheckCircle2 className="w-5 h-5" />
                  <span>{isSubmitting ? 'Placing Order...' : `PLACE ORDER • ${formatPrice(subtotal)}`}</span>
                </button>

                <button
                  type="button"
                  onClick={handleWhatsAppCheckout}
                  className="w-full py-3.5 rounded-2xl bg-green-600 text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 hover:bg-green-500 transition-colors shadow-lg shadow-green-600/20"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>ORDER VIA WHATSAPP WITH DETAILS</span>
                </button>
              </div>
            </form>
          </div>

          {/* Right Column: Mini Order Summary */}
          <div className="lg:col-span-5 space-y-6">
            <div className="cafe-card p-6 rounded-3xl space-y-5 border border-zinc-800 sticky top-28">
              <h3 className="font-heading text-xl font-bold text-white uppercase border-b border-zinc-800 pb-3">
                Items In Order ({items.length})
              </h3>

              <div className="space-y-3 max-h-72 overflow-y-auto pr-1">
                {items.map((ci) => (
                  <div
                    key={ci.item.id}
                    className="flex items-center justify-between gap-3 text-sm py-1.5 border-b border-zinc-800/50 last:border-0"
                  >
                    <div className="flex items-center gap-2.5 min-w-0">
                      <span className="w-6 h-6 rounded-lg bg-zinc-800 text-yellow-400 text-xs font-bold flex items-center justify-center flex-shrink-0">
                        {ci.quantity}x
                      </span>
                      <div className="min-w-0">
                        <p className="font-semibold text-white truncate text-xs sm:text-sm">
                          {ci.item.name}
                        </p>
                        {ci.specialInstructions && (
                          <p className="text-[10px] text-gray-500 italic truncate">
                            {ci.specialInstructions}
                          </p>
                        )}
                      </div>
                    </div>
                    <span className="font-bold text-yellow-400 text-xs sm:text-sm whitespace-nowrap">
                      {formatPrice(ci.item.price * ci.quantity)}
                    </span>
                  </div>
                ))}
              </div>

              {/* Price Details */}
              <div className="pt-3 border-t border-zinc-800 space-y-2 text-xs text-gray-300">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-semibold text-white">{formatPrice(subtotal)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Taxes & Charges</span>
                  <span className="text-green-400 font-medium">₹0 (Free)</span>
                </div>
                <div className="flex justify-between text-base font-bold text-white pt-2 border-t border-zinc-800">
                  <span>Total Amount</span>
                  <span className="font-heading text-2xl text-yellow-400">{formatPrice(subtotal)}</span>
                </div>
              </div>

              {/* Trust Badge */}
              <div className="bg-zinc-900/90 rounded-xl p-3 text-[11px] text-gray-400 space-y-1">
                <div className="flex items-center gap-1.5 text-yellow-400 font-semibold">
                  <ShieldCheck className="w-4 h-4" />
                  <span>Payment at Counter</span>
                </div>
                <p>Pay comfortably via UPI (GPay/PhonePe/Paytm) or Cash when you pick up or dine in.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
