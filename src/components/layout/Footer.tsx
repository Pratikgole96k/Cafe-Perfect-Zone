import React from 'react';
import { Link } from 'react-router-dom';
import { 
  UtensilsCrossed, 
  MapPin, 
  Phone, 
  Clock, 
  MessageCircle, 
  Heart, 
  ExternalLink
} from 'lucide-react';
import { InstagramIcon } from '../ui/Icons';
import { CAFE_CONFIG } from '../../config/cafeConfig';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-[#08080a] border-t border-zinc-800 text-gray-400 text-sm relative overflow-hidden">
      {/* Decorative subtle gold top line */}
      <div className="h-[2px] w-full bg-gradient-to-r from-transparent via-yellow-500/50 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Column 1: Brand Info */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-yellow-400 to-amber-600 flex items-center justify-center text-black font-black shadow-md shadow-yellow-500/20">
                <UtensilsCrossed className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-heading text-2xl sm:text-3xl text-white tracking-wide leading-none">
                  {CAFE_CONFIG.name}
                </h3>
                <p className="font-poppins text-xs text-yellow-400 font-semibold tracking-wider uppercase mt-0.5">
                  {CAFE_CONFIG.tagline}
                </p>
              </div>
            </div>

            <p className="text-gray-400 text-sm leading-relaxed">
              {CAFE_CONFIG.subtitle} Your favorite neighborhood hub for authentic pizzas, juicy burgers, crispy sandwiches, fries, shakes, and steaming tea.
            </p>

            <div className="flex items-center gap-3 pt-2">
              <a
                href={CAFE_CONFIG.social.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="w-9 h-9 rounded-lg bg-zinc-900 border border-zinc-800 flex items-center justify-center text-gray-300 hover:text-pink-400 hover:border-pink-500/40 hover:bg-zinc-800 transition-all duration-200"
              >
                <InstagramIcon className="w-4 h-4" />
              </a>
              <a
                href={`https://wa.me/${CAFE_CONFIG.whatsappNumber}`}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="WhatsApp"
                className="w-9 h-9 rounded-lg bg-zinc-900 border border-zinc-800 flex items-center justify-center text-gray-300 hover:text-green-400 hover:border-green-500/40 hover:bg-zinc-800 transition-all duration-200"
              >
                <MessageCircle className="w-4 h-4" />
              </a>
              <a
                href={`tel:${CAFE_CONFIG.phoneRaw}`}
                aria-label="Phone"
                className="w-9 h-9 rounded-lg bg-zinc-900 border border-zinc-800 flex items-center justify-center text-gray-300 hover:text-yellow-400 hover:border-yellow-500/40 hover:bg-zinc-800 transition-all duration-200"
              >
                <Phone className="w-4 h-4" />
              </a>
              <a
                href={CAFE_CONFIG.maps.directionsUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Directions"
                className="w-9 h-9 rounded-lg bg-zinc-900 border border-zinc-800 flex items-center justify-center text-gray-300 hover:text-yellow-400 hover:border-yellow-500/40 hover:bg-zinc-800 transition-all duration-200"
              >
                <MapPin className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div className="space-y-4">
            <h4 className="text-white font-semibold text-base uppercase tracking-wider border-l-2 border-yellow-400 pl-3">
              Quick Links
            </h4>
            <ul className="space-y-2.5">
              {[
                { name: 'Home', path: '/' },
                { name: 'Full Menu', path: '/menu' },
                { name: 'Photo Gallery', path: '/gallery' },
                { name: 'Customer Reviews', path: '/reviews' },
                { name: 'About Our Cafe', path: '/about' },
                { name: 'Contact & Directions', path: '/contact' },
              ].map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.path}
                    className="hover:text-yellow-400 transition-colors flex items-center gap-1.5 text-sm"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-zinc-700 hover:bg-yellow-400" />
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Top Categories */}
          <div className="space-y-4">
            <h4 className="text-white font-semibold text-base uppercase tracking-wider border-l-2 border-yellow-400 pl-3">
              Popular Categories
            </h4>
            <ul className="space-y-2.5">
              {[
                'PIZZAS (Veg, Margherita, Cheese Brust)',
                'BURGERS (Aloo Tikki, Tandoor)',
                'SANDWICHES (Veg Grilled Cheese, Paneer)',
                'SHAKES (Oreo, Kit-Kat, Mango)',
                'BEVERAGES (Chai, Hot & Chilled Coffee)',
                'NEW ADDITIONS (Chess Roll, Mojito)',
              ].map((cat, idx) => (
                <li key={idx}>
                  <Link
                    to="/menu"
                    className="hover:text-yellow-400 transition-colors text-sm flex items-center gap-1.5"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-yellow-500/50" />
                    {cat}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Visit & Timings */}
          <div className="space-y-4">
            <h4 className="text-white font-semibold text-base uppercase tracking-wider border-l-2 border-yellow-400 pl-3">
              Visit & Contact
            </h4>
            <div className="space-y-3 text-sm">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-yellow-400 mt-1 flex-shrink-0" />
                <span>{CAFE_CONFIG.address.full}</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-yellow-400 flex-shrink-0" />
                <a href={`tel:${CAFE_CONFIG.phoneRaw}`} className="hover:text-yellow-400">
                  {CAFE_CONFIG.phone}
                </a>
              </div>
              <div className="flex items-center gap-2.5">
                <MessageCircle className="w-4 h-4 text-green-400 flex-shrink-0" />
                <a
                  href={`https://wa.me/${CAFE_CONFIG.whatsappNumber}`}
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-green-400"
                >
                  WhatsApp: {CAFE_CONFIG.whatsappDisplay}
                </a>
              </div>
              <div className="flex items-start gap-2.5">
                <Clock className="w-4 h-4 text-yellow-400 mt-1 flex-shrink-0" />
                <div>
                  <p className="text-white font-medium">{CAFE_CONFIG.hours.timing}</p>
                  <p className="text-xs text-gray-500">{CAFE_CONFIG.hours.days}</p>
                </div>
              </div>
            </div>

            <div className="pt-2">
              <a
                href={CAFE_CONFIG.maps.directionsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="gold-btn-outline w-full py-2 px-3 rounded-lg text-xs flex items-center justify-center gap-1.5"
              >
                <span>Get Google Maps Directions</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 mt-10 border-t border-zinc-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-gray-500">
          <p>© 2026 {CAFE_CONFIG.name}. All Rights Reserved.</p>
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1">
              Made with <Heart className="w-3.5 h-3.5 text-red-500 fill-red-500" /> for food lovers
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};
