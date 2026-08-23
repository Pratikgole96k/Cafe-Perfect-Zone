import React from 'react';
import { Link } from 'react-router-dom';
import { UtensilsCrossed, ArrowLeft } from 'lucide-react';
import { CAFE_CONFIG } from '../config/cafeConfig';

export const NotFoundPage: React.FC = () => {
  return (
    <div className="pt-32 pb-20 min-h-[80vh] flex items-center justify-center text-center px-4">
      <div className="max-w-md mx-auto space-y-6">
        <div className="w-20 h-20 rounded-3xl bg-yellow-500/10 border border-yellow-500/30 text-yellow-400 flex items-center justify-center mx-auto">
          <UtensilsCrossed className="w-10 h-10" />
        </div>
        <div className="space-y-2">
          <h1 className="font-heading text-6xl sm:text-7xl font-black text-white">404</h1>
          <h2 className="font-heading text-2xl font-bold text-yellow-400 uppercase">
            PAGE NOT FOUND
          </h2>
          <p className="text-gray-400 text-sm">
            The page you are looking for might have been removed or does not exist. Let's get you back to our delicious menu!
          </p>
        </div>
        <Link
          to="/"
          className="gold-btn-primary inline-flex items-center gap-2 px-7 py-3.5 rounded-xl text-xs font-bold uppercase tracking-wider"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Home</span>
        </Link>
      </div>
    </div>
  );
};
