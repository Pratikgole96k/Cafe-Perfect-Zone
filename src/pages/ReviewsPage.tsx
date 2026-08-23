import React, { useState, useEffect } from 'react';
import { Star, Sparkles, MessageSquarePlus, MessageCircle, Heart } from 'lucide-react';
import { Review } from '../types';
import { reviewService } from '../services/api';
import { ReviewModal } from '../components/ui/ReviewModal';
import { GoogleReviewQR } from '../components/ui/GoogleReviewQR';
import { CAFE_CONFIG } from '../config/cafeConfig';

export const ReviewsPage: React.FC = () => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const fetchReviews = async () => {
    try {
      const data = await reviewService.getApproved();
      setReviews(data);
    } catch (err) {
      console.error('Error fetching reviews:', err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchReviews();
  }, []);

  const averageRating = reviews.length
    ? (reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length).toFixed(1)
    : '5.0';

  return (
    <div className="pt-24 pb-20 min-h-screen font-poppins">
      {/* Banner */}
      <div className="bg-radial-glow py-10 border-b border-zinc-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-yellow-500/10 border border-yellow-500/30 text-yellow-400 font-poppins text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Customer Testimonials</span>
          </div>

          <h1 className="font-heading text-5xl sm:text-7xl lg:text-8xl text-white uppercase tracking-wide">
            WHAT OUR CUSTOMERS SAY
          </h1>

          <p className="font-poppins text-gray-400 text-sm sm:text-base max-w-xl mx-auto">
            Read honest feedback and sweet stories from guests who love hanging out and snacking at Cafe Perfect Zone.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 space-y-10">
        {/* Rating Summary Card */}
        <div className="cafe-card p-6 sm:p-8 rounded-3xl border border-yellow-500/20 bg-gradient-to-r from-[#14141d] via-[#1a1a24] to-[#14141d] flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
          <div className="flex flex-col sm:flex-row items-center gap-6 text-center sm:text-left">
            <div className="w-24 h-24 rounded-3xl bg-yellow-500 text-black flex flex-col items-center justify-center font-black shadow-lg shadow-yellow-500/25">
              <span className="font-heading text-4xl leading-none">{averageRating}</span>
              <span className="text-[11px] uppercase tracking-widest font-bold mt-1">OUT OF 5</span>
            </div>

            <div className="space-y-1.5">
              <div className="flex items-center justify-center sm:justify-start gap-1 text-yellow-400">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star key={star} className="w-5 h-5 fill-yellow-400" />
                ))}
              </div>
              <h3 className="font-heading text-2xl font-bold text-white uppercase">
                100% HAPPY & SATISFIED FOODIES
              </h3>
              <p className="text-xs text-gray-400">
                Based on {reviews.length} authentic community reviews for Cafe Perfect Zone
              </p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3 w-full md:w-auto">
            <button
              onClick={() => setIsModalOpen(true)}
              className="gold-btn-primary w-full sm:w-auto px-7 py-3.5 rounded-2xl text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2"
            >
              <MessageSquarePlus className="w-4 h-4" />
              <span>GIVE A REVIEW</span>
            </button>

            <a
              href={`https://wa.me/${CAFE_CONFIG.whatsappNumber}?text=Hi%20Cafe%20Perfect%20Zone,%20I%20wanted%20to%20give%20feedback%20on%20my%20recent%20visit!`}
              target="_blank"
              rel="noreferrer"
              className="w-full sm:w-auto px-5 py-3.5 rounded-2xl bg-zinc-900 border border-zinc-800 text-gray-300 hover:text-green-400 hover:border-green-500/30 text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-colors"
            >
              <MessageCircle className="w-4 h-4" />
              <span>WhatsApp Feedback</span>
            </a>
          </div>
        </div>

        {/* Google Reviews Scannable QR Code Card */}
        <GoogleReviewQR />

        {/* Reviews Grid */}
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="h-64 bg-zinc-900/60 rounded-3xl animate-pulse" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {reviews.map((rev) => (
              <div
                key={rev.id}
                className="cafe-card p-6 sm:p-7 rounded-3xl flex flex-col justify-between space-y-4 border border-zinc-800"
              >
                <div className="space-y-3">
                  {/* Star Rating */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1 text-yellow-400">
                      {[...Array(rev.rating)].map((_, idx) => (
                        <Star key={idx} className="w-4 h-4 fill-yellow-400" />
                      ))}
                    </div>
                    <span className="text-[11px] text-gray-500">{rev.date}</span>
                  </div>

                  <p className="text-gray-200 text-sm sm:text-base leading-relaxed italic">
                    "{rev.comment}"
                  </p>
                </div>

                <div className="pt-4 border-t border-zinc-800/80 flex items-center justify-between">
                  <div>
                    <h4 className="font-bold text-sm text-white">{rev.customerName}</h4>
                    {rev.favoriteItem && (
                      <span className="text-xs text-yellow-400/90 font-medium block mt-0.5">
                        Favorite: {rev.favoriteItem}
                      </span>
                    )}
                  </div>
                  <div className="w-8 h-8 rounded-full bg-yellow-500/10 text-yellow-400 flex items-center justify-center">
                    <Heart className="w-4 h-4 fill-yellow-400/20" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Review Submission Modal */}
      <ReviewModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSuccess={fetchReviews}
      />
    </div>
  );
};
