import React, { useEffect, useState } from 'react';
import { useLocation, useParams, Link } from 'react-router-dom';
import { 
  CheckCircle, 
  Clock, 
  MapPin, 
  Phone, 
  MessageCircle, 
  ShoppingBag, 
  Utensils, 
  Share2, 
  Sparkles,
  ArrowRight,
  Printer
} from 'lucide-react';
import { Order } from '../types';
import { orderService } from '../services/api';
import { formatPrice, formatDate } from '../utils/formatters';
import { buildWhatsAppOrderConfirmUrl } from '../utils/whatsapp';
import { CAFE_CONFIG } from '../config/cafeConfig';
import { GoogleReviewQR } from '../components/ui/GoogleReviewQR';
import confetti from 'canvas-confetti';

export const OrderConfirmationPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const location = useLocation();
  const [order, setOrder] = useState<Order | null>(
    (location.state as any)?.order || null
  );
  const [isLoading, setIsLoading] = useState(!order);

  useEffect(() => {
    // Trigger festive confetti
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#eab308', '#facc15', '#ffffff', '#22c55e'],
      });
    } catch {
      // ignore
    }

    if (!order && id) {
      const fetchOrder = async () => {
        try {
          const orders = await orderService.getAll();
          const found = orders.find((o) => o.id === id || o.orderNumber === id);
          if (found) setOrder(found);
        } catch (err) {
          console.error('Error finding order:', err);
        } finally {
          setIsLoading(false);
        }
      };
      fetchOrder();
    }
  }, [id, order]);

  if (isLoading) {
    return (
      <div className="pt-32 pb-20 min-h-[70vh] flex items-center justify-center">
        <div className="text-center space-y-3">
          <div className="w-12 h-12 border-4 border-yellow-400 border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="text-gray-400 text-sm">Loading order details...</p>
        </div>
      </div>
    );
  }

  // Fallback demo order if visited directly with no state
  const currentOrder: Order = order || {
    id: 'ord-demo',
    orderNumber: id || 'CPZ-8924',
    customerName: 'Valued Customer',
    customerPhone: '+91 76665 99406',
    orderType: 'Pickup',
    items: [
      { itemId: 'piz-5', name: 'Cheese Brust Pizza', price: 180, quantity: 1, subtotal: 180 },
      { itemId: 'bev-7', name: 'Cold Coffee', price: 50, quantity: 1, subtotal: 50 },
    ],
    subtotal: 230,
    total: 230,
    status: 'Pending',
    createdAt: new Date().toISOString(),
  };

  const handleWhatsAppSync = () => {
    const url = buildWhatsAppOrderConfirmUrl(currentOrder);
    window.open(url, '_blank');
  };

  const statusSteps = [
    { title: 'Pending', desc: 'Order placed, awaiting café check', active: true },
    { title: 'Confirmed', desc: 'Kitchen accepted', active: currentOrder.status !== 'Pending' },
    { title: 'Preparing', desc: 'Cooking fresh', active: ['Preparing', 'Ready', 'Completed'].includes(currentOrder.status) },
    { title: 'Ready', desc: 'Ready for pickup / serve', active: ['Ready', 'Completed'].includes(currentOrder.status) },
  ];

  return (
    <div className="pt-28 pb-20 min-h-screen">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Success Banner */}
        <div className="cafe-card p-6 sm:p-10 rounded-3xl text-center space-y-4 border-2 border-yellow-500/30 bg-gradient-to-b from-[#181822] to-[#121217] shadow-2xl relative overflow-hidden">
          <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-green-500/10 border-2 border-green-500/30 text-green-400 mx-auto flex items-center justify-center shadow-lg shadow-green-500/20">
            <CheckCircle className="w-10 h-10 sm:w-12 sm:h-12" />
          </div>

          <div className="space-y-1">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-yellow-500/10 text-yellow-400 text-xs font-bold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Order Received</span>
            </div>
            <h1 className="font-heading text-3xl sm:text-5xl font-black text-white uppercase tracking-tight">
              ORDER PLACED SUCCESSFULLY!
            </h1>
            <p className="text-gray-300 text-sm sm:text-base">
              Thank you, <strong className="text-white">{currentOrder.customerName}</strong>! Your order is being processed by Cafe Perfect Zone.
            </p>
          </div>

          {/* Order ID & Estimated Time */}
          <div className="grid grid-cols-2 gap-4 max-w-md mx-auto pt-3">
            <div className="bg-zinc-900/90 border border-zinc-800 rounded-2xl p-3.5 text-center">
              <span className="text-[10px] text-gray-400 uppercase font-bold tracking-widest block">
                ORDER ID
              </span>
              <span className="font-heading text-xl sm:text-2xl font-black text-yellow-400 mt-0.5 block">
                #{currentOrder.orderNumber}
              </span>
            </div>

            <div className="bg-zinc-900/90 border border-zinc-800 rounded-2xl p-3.5 text-center">
              <span className="text-[10px] text-gray-400 uppercase font-bold tracking-widest block">
                ESTIMATED TIME
              </span>
              <span className="font-heading text-xl sm:text-2xl font-black text-green-400 mt-0.5 block">
                10-15 MINS
              </span>
            </div>
          </div>
        </div>

        {/* Live Status Tracker */}
        <div className="cafe-card p-6 sm:p-7 rounded-3xl space-y-4 border border-zinc-800">
          <h2 className="font-heading text-xl font-bold text-white uppercase">
            Order Status: <span className="text-yellow-400">{currentOrder.status}</span>
          </h2>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
            {statusSteps.map((step, idx) => (
              <div
                key={idx}
                className={`p-3.5 rounded-2xl border text-center space-y-1 transition-all ${
                  step.active
                    ? 'bg-yellow-500/10 border-yellow-500/40 text-yellow-400 shadow-sm'
                    : 'bg-zinc-900/50 border-zinc-800/80 text-zinc-600'
                }`}
              >
                <div className="flex items-center justify-center">
                  <span
                    className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                      step.active ? 'bg-yellow-500 text-black' : 'bg-zinc-800 text-zinc-600'
                    }`}
                  >
                    {idx + 1}
                  </span>
                </div>
                <h4 className={`text-xs font-bold ${step.active ? 'text-white' : 'text-zinc-500'}`}>
                  {step.title}
                </h4>
                <p className="text-[10px] text-gray-500">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Order Details & Summary */}
        <div className="cafe-card p-6 sm:p-8 rounded-3xl space-y-6 border border-zinc-800">
          <div className="flex items-center justify-between border-b border-zinc-800 pb-4">
            <h2 className="font-heading text-2xl font-bold text-white uppercase">
              Order Details
            </h2>
            <button
              onClick={() => window.print()}
              className="text-xs text-gray-400 hover:text-yellow-400 flex items-center gap-1.5 transition-colors"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print Receipt</span>
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs sm:text-sm text-gray-300">
            <div>
              <span className="text-gray-500 block text-[11px]">Customer Name:</span>
              <strong className="text-white text-sm">{currentOrder.customerName}</strong>
            </div>
            <div>
              <span className="text-gray-500 block text-[11px]">Mobile Number:</span>
              <strong className="text-white text-sm">{currentOrder.customerPhone}</strong>
            </div>
            <div>
              <span className="text-gray-500 block text-[11px]">Order Type:</span>
              <span className="inline-block px-2.5 py-0.5 rounded-full bg-yellow-500/10 text-yellow-400 text-xs font-bold">
                {currentOrder.orderType} {currentOrder.tableNumber ? `(Table: ${currentOrder.tableNumber})` : ''}
              </span>
            </div>
            <div>
              <span className="text-gray-500 block text-[11px]">Order Time:</span>
              <span className="text-gray-300">{formatDate(currentOrder.createdAt)}</span>
            </div>
          </div>

          {currentOrder.specialInstructions && (
            <div className="p-3 bg-zinc-900/90 rounded-xl text-xs text-amber-300/90">
              <strong>Special Instructions:</strong> {currentOrder.specialInstructions}
            </div>
          )}

          {/* Items Table */}
          <div className="space-y-3 pt-2">
            <h3 className="text-xs font-bold uppercase tracking-wider text-gray-400">
              Ordered Items
            </h3>
            <div className="divide-y divide-zinc-800">
              {currentOrder.items.map((item, idx) => (
                <div key={idx} className="py-2.5 flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-yellow-400">{item.quantity}x</span>
                    <span className="text-white font-medium">{item.name}</span>
                  </div>
                  <span className="font-bold text-white">{formatPrice(item.subtotal)}</span>
                </div>
              ))}
            </div>

            <div className="pt-4 border-t-2 border-zinc-800 flex items-center justify-between text-lg font-bold text-white">
              <span>Total Payable Amount</span>
              <span className="font-heading text-2xl text-yellow-400">
                {formatPrice(currentOrder.total)}
              </span>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center gap-3">
          <button
            onClick={handleWhatsAppSync}
            className="w-full py-4 rounded-2xl bg-green-600 text-white font-bold text-xs sm:text-sm uppercase tracking-wider flex items-center justify-center gap-2 hover:bg-green-500 transition-colors shadow-lg shadow-green-600/25"
          >
            <MessageCircle className="w-5 h-5" />
            <span>SEND / CONFIRM ON WHATSAPP</span>
          </button>

          <Link
            to="/menu"
            className="gold-btn-outline w-full py-4 rounded-2xl text-xs sm:text-sm font-bold uppercase tracking-wider flex items-center justify-center gap-2"
          >
            <Utensils className="w-4 h-4" />
            <span>ORDER MORE FOOD</span>
          </Link>
        </div>

        {/* Google Reviews QR Section */}
        <GoogleReviewQR variant="card" />

        {/* Café Pickup Location Note */}
        <div className="p-4 rounded-2xl bg-zinc-900/60 border border-zinc-800 text-xs text-gray-400 flex items-start gap-3">
          <MapPin className="w-5 h-5 text-yellow-400 flex-shrink-0 mt-0.5" />
          <div>
            <strong className="text-white block">Pick Up & Dine-in Location:</strong>
            <span>{CAFE_CONFIG.address.full}</span>
            <span className="block text-yellow-400/90 mt-0.5">Need help? Call us at {CAFE_CONFIG.phone}</span>
          </div>
        </div>
      </div>
    </div>
  );
};
