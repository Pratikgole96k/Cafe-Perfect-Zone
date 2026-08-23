import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  Sparkles, 
  ArrowRight, 
  MapPin, 
  Clock, 
  Utensils, 
  Coffee, 
  Pizza, 
  Zap, 
  Star, 
  ChevronRight, 
  MessageCircle,
  Phone,
  Flame,
  CheckCircle2,
  ChevronLeft,
  Award,
  Heart
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { CAFE_CONFIG } from '../config/cafeConfig';
import { MenuItem, Review } from '../types';
import { menuService, reviewService } from '../services/api';
import { FoodCard } from '../components/ui/FoodCard';
import { FoodDetailModal } from '../components/ui/FoodDetailModal';
import { ReviewModal } from '../components/ui/ReviewModal';
import { GoogleReviewQR } from '../components/ui/GoogleReviewQR';

import { OptimizedImage } from '../components/ui/OptimizedImage';

// Statistics counter component with smooth animation
const StatCounter: React.FC<{ value: number; suffix: string; label: string; icon: React.ReactNode }> = ({
  value,
  suffix,
  label,
  icon,
}) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const duration = 1200;
    const increment = value / (duration / 16);
    const timer = setInterval(() => {
      start += increment;
      if (start >= value) {
        setCount(value);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);
    return () => clearInterval(timer);
  }, [value]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="p-5 sm:p-6 rounded-2xl bg-[#14141a]/80 border border-zinc-800 flex items-center gap-4 hover:border-yellow-500/40 transition-colors shadow-lg shadow-black/40 font-poppins"
    >
      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-yellow-400/20 to-amber-500/10 border border-yellow-500/30 flex items-center justify-center text-yellow-400 flex-shrink-0">
        {icon}
      </div>
      <div>
        <div className="font-heading text-3xl sm:text-4xl text-white flex items-baseline tracking-wide">
          <span>{count}</span>
          <span className="text-yellow-400 text-2xl sm:text-3xl font-heading">{suffix}</span>
        </div>
        <p className="font-poppins text-xs sm:text-sm text-gray-400 font-medium tracking-wide mt-0.5">{label}</p>
      </div>
    </motion.div>
  );
};

export const HomePage: React.FC = () => {
  const [popularItems, setPopularItems] = useState<MenuItem[]>([]);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [activeReviewIndex, setActiveReviewIndex] = useState(0);
  const [isReviewAutoPlay, setIsReviewAutoPlay] = useState(true);
  const [selectedFood, setSelectedFood] = useState<MenuItem | null>(null);
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        const [allMenu, approvedReviews] = await Promise.all([
          menuService.getAll(),
          reviewService.getApproved(),
        ]);
        const popular = allMenu.filter((i) => i.isPopular).slice(0, 8);
        setPopularItems(popular.length ? popular : allMenu.slice(0, 8));
        setReviews(approvedReviews);
      } catch (err) {
        console.error('Error loading home data:', err);
      } finally {
        setIsLoading(false);
      }
    };
    loadData();
  }, []);

  // Optimized review auto-slide with tab visibility check
  useEffect(() => {
    if (!isReviewAutoPlay || reviews.length <= 1) return;
    const timer = setInterval(() => {
      if (document.visibilityState === 'visible') {
        setActiveReviewIndex((prev) => (prev + 1) % reviews.length);
      }
    }, 4500);
    return () => clearInterval(timer);
  }, [isReviewAutoPlay, reviews.length]);

  return (
    <div className="min-h-screen font-poppins">
      {/* ==================== 1. HIGH-IMPACT CINEMATIC HERO ==================== */}
      <section className="relative min-h-[92vh] flex items-center justify-center pt-24 sm:pt-28 pb-16 overflow-hidden">
        {/* Background ambient lighting */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] sm:w-[650px] h-[350px] sm:h-[650px] bg-yellow-500/10 rounded-full blur-[100px] pointer-events-none" />
        <div className="absolute bottom-10 right-10 w-72 h-72 bg-amber-600/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            {/* Left text column */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, ease: 'easeOut' }}
              className="lg:col-span-7 space-y-6 text-center lg:text-left"
            >
              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-yellow-500/10 border border-yellow-500/30 text-yellow-400 font-poppins text-xs sm:text-sm font-semibold tracking-wider uppercase shadow-sm">
                <Sparkles className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                <span>Chandwad's Favorite Food Destination</span>
              </div>

              {/* Main Headline */}
              <div className="space-y-2">
                <div className="flex items-center justify-center lg:justify-start gap-2">
                  <span className="font-heading text-2xl sm:text-3xl lg:text-4xl text-yellow-400 uppercase tracking-widest">
                    {CAFE_CONFIG.name}
                  </span>
                </div>
                <h1 className="font-heading text-5xl sm:text-6xl md:text-7xl lg:text-8xl text-white uppercase leading-[0.95] tracking-wide">
                  <span className="block">GOOD FOOD.</span>
                  <span className="gold-gradient-text block">GREAT MOOD!</span>
                </h1>
              </div>

              {/* Subtitle */}
              <p className="font-poppins text-gray-300 text-base sm:text-lg max-w-2xl mx-auto lg:mx-0 leading-relaxed font-normal">
                {CAFE_CONFIG.subtitle} Hand-crafted cheesy pizzas, juicy burgers, golden grilled sandwiches, crispy fries, thick decadent shakes, and freshly brewed coffees made with love!
              </p>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3.5 pt-2 font-poppins">
                <Link
                  to="/menu"
                  className="gold-btn-primary px-7 sm:px-8 py-3.5 sm:py-4 rounded-2xl text-xs sm:text-sm font-bold flex items-center gap-2.5 shadow-xl shadow-yellow-500/25 uppercase tracking-wider"
                >
                  <Utensils className="w-4 h-4" />
                  <span>VIEW FULL MENU</span>
                </Link>

                <Link
                  to="/menu"
                  className="gold-btn-outline px-7 sm:px-8 py-3.5 sm:py-4 rounded-2xl text-xs sm:text-sm font-bold flex items-center gap-2 uppercase tracking-wider"
                >
                  <Zap className="w-4 h-4 text-yellow-400" />
                  <span>ORDER NOW</span>
                </Link>

                <a
                  href={CAFE_CONFIG.maps.directionsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-5 py-3.5 sm:py-4 rounded-2xl bg-zinc-900 border border-zinc-800 text-gray-300 hover:text-yellow-400 hover:border-zinc-700 text-xs sm:text-sm font-bold uppercase tracking-wider flex items-center gap-2 transition-all shadow-md"
                >
                  <MapPin className="w-4 h-4 text-yellow-400" />
                  <span>GET DIRECTIONS</span>
                </a>
              </div>

              {/* Quick Info bar */}
              <div className="pt-4 flex flex-wrap items-center justify-center lg:justify-start gap-5 sm:gap-6 text-xs text-gray-400 border-t border-zinc-800/80 font-poppins">
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-yellow-400" />
                  <span>Open: {CAFE_CONFIG.hours.timing}</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-yellow-400" />
                  <span>College Road, Chandwad</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-green-400" />
                  <span className="text-gray-300 font-medium">100% Pure Veg</span>
                </div>
              </div>
            </motion.div>

            {/* Right food visual showcase */}
            <motion.div
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, delay: 0.15, ease: 'easeOut' }}
              className="lg:col-span-5 relative"
            >
              <div className="relative mx-auto max-w-md lg:max-w-none">
                <div className="relative rounded-3xl overflow-hidden border border-yellow-500/30 shadow-2xl shadow-yellow-500/15 group h-80 sm:h-[440px] bg-[#121218] flex items-start justify-center">
                  <img
                    src="/images/birthday-offer-2.jpg"
                    alt="Birthday Offer at Cafe Perfect Zone"
                    className="w-full h-full object-contain object-top pt-2 sm:pt-4 transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent pointer-events-none" />

                  <div className="absolute bottom-4 left-4 right-4 p-4 rounded-2xl bg-[#0a0a0c]/85 backdrop-blur-md border border-zinc-700/80 flex items-center justify-between font-poppins">
                    <div>
                      <span className="font-poppins text-[10px] text-yellow-400 font-bold uppercase tracking-widest">
                        BIRTHDAY SPECIAL
                      </span>
                      <h4 className="font-heading text-2xl text-white tracking-wide">
                        Birthday Offer • ₹250 / Hour
                      </h4>
                      <p className="font-poppins text-xs text-gray-300 mt-0.5">Make your special day more special!</p>
                    </div>
                    <a
                      href={`https://wa.me/${CAFE_CONFIG.whatsappNumber}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2.5 rounded-xl bg-yellow-500 text-black hover:bg-yellow-400 transition-colors shadow-md"
                      aria-label="Book Birthday Offer"
                    >
                      <ChevronRight className="w-5 h-5" />
                    </a>
                  </div>
                </div>

                {/* Floating mini badge 1: Rating */}
                <div className="absolute -top-4 -left-4 bg-[#121218]/95 backdrop-blur-md border border-yellow-500/40 rounded-2xl p-3 shadow-xl hidden sm:flex items-center gap-3 animate-float-slow font-poppins">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-yellow-400 to-amber-500 text-black font-black flex items-center justify-center text-sm shadow-md font-poppins">
                    ★ 5.0
                  </div>
                  <div>
                    <p className="text-xs font-bold text-white font-poppins">Top Rated Spot</p>
                    <p className="text-[10px] text-gray-400 font-poppins">100+ Happy Foodies</p>
                  </div>
                </div>

                {/* Floating mini badge 2: Fast Preparation */}
                <div className="absolute -bottom-4 -right-4 bg-[#121218]/95 backdrop-blur-md border border-green-500/40 rounded-2xl p-3 shadow-xl hidden sm:flex items-center gap-3 font-poppins">
                  <div className="w-10 h-10 rounded-xl bg-green-500/20 text-green-400 flex items-center justify-center font-bold">
                    <Zap className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-white font-poppins">Fast Preparation</p>
                    <p className="text-[10px] text-green-400 font-medium font-poppins">Ready in 10-15 mins</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ==================== 2. ANIMATED STATISTICS COUNTER ==================== */}
      <section className="py-10 bg-[#0d0d12] border-y border-zinc-800/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            <StatCounter
              value={44}
              suffix="+"
              label="Authentic Menu Items"
              icon={<Utensils className="w-6 h-6" />}
            />
            <StatCounter
              value={100}
              suffix="%"
              label="Pure Vegetarian"
              icon={<CheckCircle2 className="w-6 h-6" />}
            />
            <StatCounter
              value={5}
              suffix="★"
              label="Customer Experience"
              icon={<Star className="w-6 h-6 fill-yellow-400" />}
            />
            <StatCounter
              value={7}
              suffix=" Days"
              label="Open (10 AM - 10:30 PM)"
              icon={<Clock className="w-6 h-6" />}
            />
          </div>
        </div>
      </section>

      {/* ==================== 3. POPULAR PICKS (FEATURED MENU) ==================== */}
      <section className="py-16 sm:py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-yellow-500/10 text-yellow-400 font-poppins text-xs font-bold uppercase tracking-wider mb-2">
              <Flame className="w-3.5 h-3.5 fill-yellow-400" />
              Customer Favorites
            </div>
            <h2 className="font-heading text-4xl sm:text-5xl lg:text-6xl text-white uppercase tracking-wide">
              POPULAR PICKS
            </h2>
            <p className="font-poppins text-gray-400 text-sm sm:text-base mt-1">
              Top trending treats loved by our daily café regulars
            </p>
          </div>

          <Link
            to="/menu"
            className="gold-btn-outline px-5 py-2.5 rounded-xl text-xs font-bold flex items-center gap-2 self-start md:self-auto font-poppins uppercase tracking-wider"
          >
            <span>Explore All 44 Items</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Grid of Food Cards */}
        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
              <div key={i} className="h-80 bg-zinc-900/60 rounded-2xl animate-pulse" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {popularItems.map((item) => (
              <FoodCard
                key={item.id}
                item={item}
                onOpenDetails={(i) => setSelectedFood(i)}
              />
            ))}
          </div>
        )}
      </section>

      {/* ==================== 4. SPECIAL SPOTLIGHT BANNER ==================== */}
      <section className="py-14 bg-gradient-to-r from-zinc-950 via-[#161622] to-zinc-950 border-y border-yellow-500/20 relative overflow-hidden font-poppins">
        <div className="absolute inset-0 bg-yellow-500/[0.03] pointer-events-none" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7 space-y-4">
              <span className="font-poppins text-xs text-yellow-400 font-bold uppercase tracking-widest bg-yellow-500/10 px-3 py-1 rounded-md border border-yellow-500/20">
                CHEF'S SIGNATURE SPECIALS
              </span>
              <h2 className="font-heading text-3xl sm:text-5xl lg:text-6xl text-white uppercase leading-tight tracking-wide">
                CRAVING SOMETHING DELICIOUS? FRESHLY PREPARED. PERFECTLY SERVED.
              </h2>
              <p className="font-poppins text-gray-300 text-sm sm:text-base leading-relaxed">
                Crunchy, cheesy, and spiced to perfection! Indulge in our famous Chess Roll, Masala Maggi, and chilled Mint Mojito or Cold Coffee with Ice Cream.
              </p>
              <div className="flex flex-wrap items-center gap-3 pt-2 font-poppins">
                <Link
                  to="/menu"
                  className="gold-btn-primary px-6 py-3.5 rounded-xl text-xs font-bold tracking-wider uppercase"
                >
                  Order Signature Items
                </Link>
                <a
                  href={`https://wa.me/${CAFE_CONFIG.whatsappNumber}?text=Hi%20Cafe%20Perfect%20Zone,%20I%20want%20to%20order%20Chess%20Roll%20and%20Mojito!`}
                  target="_blank"
                  rel="noreferrer"
                  className="px-5 py-3.5 rounded-xl bg-green-600 text-white font-bold text-xs uppercase tracking-wider flex items-center gap-2 hover:bg-green-500 transition-colors shadow-lg shadow-green-600/25"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Order on WhatsApp</span>
                </a>
              </div>
            </div>

            <div className="lg:col-span-5 grid grid-cols-2 gap-4">
              <div className="relative rounded-2xl overflow-hidden h-48 sm:h-56 border border-zinc-700/80 group">
                <OptimizedImage
                  src="https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?w=600&auto=format&fit=crop&q=80"
                  alt="Delicious Chess Roll at Cafe Perfect Zone"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent flex items-end p-3.5 pointer-events-none">
                  <div>
                    <span className="font-poppins text-[10px] text-yellow-400 font-bold uppercase">Must Try</span>
                    <h4 className="font-poppins text-lg font-bold text-white">
                      Chess Roll • ₹70
                    </h4>
                  </div>
                </div>
              </div>

              <div className="relative rounded-2xl overflow-hidden h-48 sm:h-56 border border-zinc-700/80 group">
                <OptimizedImage
                  src="https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?w=600&auto=format&fit=crop&q=80"
                  alt="Refreshing Mint Mojito at Cafe Perfect Zone"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent flex items-end p-3.5 pointer-events-none">
                  <div>
                    <span className="font-poppins text-[10px] text-yellow-400 font-bold uppercase">Refreshing</span>
                    <h4 className="font-poppins text-lg font-bold text-white">
                      Mojito • ₹60
                    </h4>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ==================== 5. CUSTOMER REVIEWS (CAROUSEL & QR) ==================== */}
      <section className="py-16 sm:py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 font-poppins">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-yellow-500/10 text-yellow-400 font-poppins text-xs font-bold uppercase tracking-wider mb-2">
              <Star className="w-3.5 h-3.5 fill-yellow-400" />
              Community Love
            </div>
            <h2 className="font-heading text-4xl sm:text-5xl lg:text-6xl text-white uppercase tracking-wide">
              WHAT OUR CUSTOMERS SAY
            </h2>
            <p className="font-poppins text-gray-400 text-sm sm:text-base mt-1">
              Real 5-star experiences from food lovers at Cafe Perfect Zone
            </p>
          </div>

          <div className="flex items-center gap-3 font-poppins">
            <button
              onClick={() => setIsReviewModalOpen(true)}
              className="gold-btn-primary px-5 py-2.5 rounded-xl text-xs font-bold flex items-center gap-2 shadow-lg uppercase tracking-wider"
            >
              <Sparkles className="w-4 h-4" />
              <span>GIVE A REVIEW</span>
            </button>
            <Link
              to="/reviews"
              className="gold-btn-outline px-4 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider"
            >
              View All
            </Link>
          </div>
        </div>

        {/* Reviews Carousel on Desktop and Grid on Mobile */}
        <div
          onMouseEnter={() => setIsReviewAutoPlay(false)}
          onMouseLeave={() => setIsReviewAutoPlay(true)}
          className="relative"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {reviews.slice(0, 4).map((rev) => (
              <motion.div
                key={rev.id}
                whileHover={{ y: -4 }}
                className="cafe-card p-5 sm:p-6 rounded-2xl flex flex-col justify-between space-y-4 border border-zinc-800 hover:border-yellow-500/40 transition-colors shadow-lg font-poppins"
              >
                <div className="space-y-2.5">
                  {/* Star rating */}
                  <div className="flex items-center gap-1 text-yellow-400">
                    {[...Array(rev.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-yellow-400" />
                    ))}
                  </div>

                  <p className="font-poppins text-gray-300 text-sm italic leading-relaxed">
                    "{rev.comment}"
                  </p>
                </div>

                <div className="pt-3 border-t border-zinc-800/80 flex items-center justify-between font-poppins">
                  <div>
                    <h4 className="font-poppins font-semibold text-sm text-white">{rev.customerName}</h4>
                    {rev.favoriteItem && (
                      <span className="font-poppins text-[11px] text-yellow-400 font-medium">
                        Favorite: {rev.favoriteItem}
                      </span>
                    )}
                  </div>
                  <span className="font-poppins text-[10px] text-gray-500">{rev.date}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Google Reviews Scannable QR Code */}
        <div className="mt-14">
          <GoogleReviewQR />
        </div>
      </section>

      {/* ==================== 6. LOCATION & GOOGLE MAPS ==================== */}
      <section className="py-16 bg-[#0c0c11] border-t border-zinc-800/90 font-poppins">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Info */}
            <div className="lg:col-span-5 space-y-6">
              <div>
                <span className="font-poppins text-xs text-yellow-400 font-bold uppercase tracking-widest bg-yellow-500/10 px-3 py-1 rounded-md border border-yellow-500/20">
                  FIND OUR CAFE
                </span>
                <h2 className="font-heading text-4xl sm:text-5xl lg:text-6xl text-white uppercase tracking-wide mt-2">
                  VISIT US TODAY
                </h2>
                <p className="font-poppins text-gray-400 text-sm mt-2">
                  Drop in with your friends and family for an unforgettable café experience!
                </p>
              </div>

              <div className="space-y-3.5 text-sm text-gray-300 font-poppins">
                <div className="flex items-start gap-3 p-4 rounded-2xl bg-zinc-900/80 border border-zinc-800">
                  <MapPin className="w-5 h-5 text-yellow-400 mt-0.5 flex-shrink-0" />
                  <div>
                    <h4 className="font-poppins font-semibold text-white">Cafe Address</h4>
                    <p className="font-poppins text-gray-400 text-xs mt-0.5">{CAFE_CONFIG.address.full}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-4 rounded-2xl bg-zinc-900/80 border border-zinc-800">
                  <Clock className="w-5 h-5 text-yellow-400 mt-0.5 flex-shrink-0" />
                  <div>
                    <h4 className="font-poppins font-semibold text-white">Opening Hours</h4>
                    <p className="font-poppins text-gray-400 text-xs mt-0.5">{CAFE_CONFIG.hours.timing}</p>
                    <p className="font-poppins text-[11px] text-yellow-400/90 mt-0.5 font-medium">{CAFE_CONFIG.hours.days}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-4 rounded-2xl bg-zinc-900/80 border border-zinc-800">
                  <Phone className="w-5 h-5 text-yellow-400 mt-0.5 flex-shrink-0" />
                  <div>
                    <h4 className="font-poppins font-semibold text-white">Contact & WhatsApp</h4>
                    <p className="font-poppins text-gray-400 text-xs mt-0.5">{CAFE_CONFIG.phone}</p>
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap gap-3 pt-2 font-poppins">
                <a
                  href={CAFE_CONFIG.maps.directionsUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="gold-btn-primary px-5 py-3 rounded-xl text-xs font-bold uppercase tracking-wider flex items-center gap-2 shadow-lg"
                >
                  <MapPin className="w-4 h-4" />
                  <span>GET DIRECTIONS</span>
                </a>
                <a
                  href={`tel:${CAFE_CONFIG.phoneRaw}`}
                  className="gold-btn-outline px-5 py-3 rounded-xl text-xs font-bold uppercase tracking-wider flex items-center gap-2"
                >
                  <Phone className="w-4 h-4" />
                  <span>CALL NOW</span>
                </a>
                <a
                  href={`https://wa.me/${CAFE_CONFIG.whatsappNumber}`}
                  target="_blank"
                  rel="noreferrer"
                  className="px-5 py-3 rounded-xl bg-green-600/20 text-green-400 border border-green-500/30 hover:bg-green-600 hover:text-white transition-all text-xs font-bold uppercase tracking-wider flex items-center gap-2 shadow-md"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>WHATSAPP</span>
                </a>
              </div>
            </div>

            {/* Google Map Iframe */}
            <div className="lg:col-span-7 h-80 sm:h-96 rounded-3xl overflow-hidden border border-zinc-800 shadow-2xl relative">
              <iframe
                title="Cafe Perfect Zone Location Map"
                src={CAFE_CONFIG.maps.embedUrl}
                width="100%"
                height="100%"
                style={{ border: 0, filter: 'grayscale(20%) invert(90%) hue-rotate(180deg)' }}
                allowFullScreen={false}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Modals */}
      <FoodDetailModal
        item={selectedFood}
        onClose={() => setSelectedFood(null)}
      />

      <ReviewModal
        isOpen={isReviewModalOpen}
        onClose={() => setIsReviewModalOpen(false)}
        onSuccess={async () => {
          const revs = await reviewService.getApproved();
          setReviews(revs);
        }}
      />
    </div>
  );
};
