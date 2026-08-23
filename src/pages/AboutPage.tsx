import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Sparkles, 
  UtensilsCrossed, 
  CheckCircle2, 
  Heart, 
  ShieldCheck, 
  Coffee, 
  Users, 
  Flame,
  ArrowRight,
  MapPin
} from 'lucide-react';
import { InstagramIcon } from '../components/ui/Icons';
import { CAFE_CONFIG } from '../config/cafeConfig';

import { OptimizedImage } from '../components/ui/OptimizedImage';

export const AboutPage: React.FC = () => {
  return (
    <div className="pt-24 pb-20 min-h-screen font-poppins">
      {/* Banner */}
      <div className="bg-radial-glow py-12 border-b border-zinc-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-yellow-500/10 border border-yellow-500/30 text-yellow-400 font-poppins text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Our Story & Philosophy</span>
          </div>

          <h1 className="font-heading text-5xl sm:text-7xl lg:text-8xl text-white uppercase tracking-wide">
            ABOUT {CAFE_CONFIG.name}
          </h1>

          <p className="font-poppins text-gray-300 text-base sm:text-lg max-w-2xl mx-auto font-medium">
            "{CAFE_CONFIG.tagline}" — Bringing people together over bubbling pizzas, sizzling grilled sandwiches, thick shakes, and warm conversations.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 space-y-16">
        {/* Story Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-6 space-y-5">
            <span className="font-poppins text-xs text-yellow-400 font-bold uppercase tracking-widest bg-yellow-500/10 px-3 py-1 rounded-md">
              THE PERFECT HANGOUT
            </span>
            <h2 className="font-heading text-4xl sm:text-5xl lg:text-6xl text-white uppercase leading-tight tracking-wide">
              A PLACE WHERE EVERY BITE SPARKS JOY
            </h2>
            <p className="font-poppins text-gray-300 text-sm sm:text-base leading-relaxed">
              Located at <strong>{CAFE_CONFIG.address.full}</strong>, Cafe Perfect Zone was established with a singular vision: to serve mouth-watering, premium-quality fast food and refreshing beverages at student-friendly and family-accessible prices.
            </p>
            <p className="font-poppins text-gray-400 text-sm sm:text-base leading-relaxed">
              Whether you are rushing in for a morning cup of ₹10 chai with buttery Bun Masca, hanging out after college with our famous Cheese Brust Pizza and Oreo Shake, or grabbing a quick Masala Maggi between breaks, we make sure your mood is always great!
            </p>

            <div className="pt-2 flex items-center gap-4 font-poppins">
              <Link to="/menu" className="gold-btn-primary px-6 py-3.5 rounded-xl text-xs font-bold uppercase tracking-wider flex items-center gap-2">
                <span>View Full Menu</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link to="/contact" className="gold-btn-outline px-6 py-3.5 rounded-xl text-xs font-bold uppercase tracking-wider">
                Find Our Cafe
              </Link>
            </div>
          </div>

          <div className="lg:col-span-6 relative">
            <div className="relative rounded-3xl overflow-hidden border border-yellow-500/30 shadow-2xl">
              <OptimizedImage
                src="https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=900&auto=format&fit=crop&q=80"
                alt="Cafe Perfect Zone Ambience"
                className="w-full h-80 sm:h-96 object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end p-6 pointer-events-none">
                <div>
                  <h4 className="font-heading text-2xl font-bold text-white uppercase">
                    Cozy & Youthful Vibe
                  </h4>
                  <p className="text-xs text-yellow-400 font-semibold mt-0.5">
                    College Road, Renuka Complex, Chandwad
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 4 Core Pillars */}
        <div className="space-y-6">
          <div className="text-center space-y-2">
            <h2 className="font-heading text-3xl sm:text-4xl font-black text-white uppercase">
              WHY FOODIES LOVE US
            </h2>
            <p className="text-gray-400 text-sm max-w-lg mx-auto">
              We focus on consistency, taste, and hospitality in every order.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                title: '100% Pure Veg',
                desc: 'Dedicated vegetarian kitchen with pure, authentic and strictly tested ingredients.',
                icon: CheckCircle2,
                color: 'text-green-400',
              },
              {
                title: 'Pocket Friendly',
                desc: 'Premium taste starting from just ₹10 for Hot Chai and ₹30 for Maggi.',
                icon: Heart,
                color: 'text-yellow-400',
              },
              {
                title: 'Made Fresh To Order',
                desc: 'No pre-cooked shortcuts. Pizzas, burgers, and sandwiches are prepared hot and fresh.',
                icon: Flame,
                color: 'text-amber-400',
              },
              {
                title: 'Youth Hangout Hub',
                desc: 'Vibrant ambiance, chill music, and quick WhatsApp ordering for effortless pickups.',
                icon: Users,
                color: 'text-blue-400',
              },
            ].map((pillar, idx) => {
              const Icon = pillar.icon;
              return (
                <div
                  key={idx}
                  className="cafe-card p-6 rounded-3xl space-y-4 border border-zinc-800 text-center flex flex-col items-center"
                >
                  <div className={`w-14 h-14 rounded-2xl bg-zinc-900 border border-zinc-800 flex items-center justify-center ${pillar.color} shadow-lg`}>
                    <Icon className="w-7 h-7" />
                  </div>
                  <div>
                    <h3 className="font-heading text-2xl font-bold text-white uppercase">
                      {pillar.title}
                    </h3>
                    <p className="text-xs text-gray-400 mt-2 leading-relaxed">
                      {pillar.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Instagram Follow Section */}
        <div className="cafe-card p-8 sm:p-12 rounded-3xl border border-pink-500/20 bg-gradient-to-r from-[#18101a] via-[#14141c] to-[#18101a] text-center space-y-5 shadow-2xl">
          <div className="w-14 h-14 rounded-2xl bg-pink-500/10 border border-pink-500/30 text-pink-400 mx-auto flex items-center justify-center shadow-lg">
            <InstagramIcon className="w-7 h-7" />
          </div>
          <div className="space-y-1 max-w-lg mx-auto">
            <h3 className="font-heading text-3xl sm:text-4xl font-black text-white uppercase">
              FOLLOW OUR DELICIOUS JOURNEY
            </h3>
            <p className="text-gray-300 text-sm">
              Tag us in your food stories and stay updated with new additions, offers, and behind-the-scenes fun on Instagram.
            </p>
          </div>
          <a
            href={CAFE_CONFIG.social.instagramUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-2xl bg-gradient-to-r from-pink-500 via-rose-500 to-amber-500 text-white font-bold text-xs uppercase tracking-wider shadow-lg shadow-pink-500/25 hover:brightness-110 transition-all"
          >
            <InstagramIcon className="w-4 h-4" />
            <span>FOLLOW {CAFE_CONFIG.social.instagramHandle}</span>
          </a>
        </div>
      </div>
    </div>
  );
};
