import React, { useState } from 'react';
import { X, Star, Sparkles } from 'lucide-react';
import { reviewService } from '../../services/api';
import { toast } from 'sonner';

interface ReviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: () => void;
}

export const ReviewModal: React.FC<ReviewModalProps> = ({ isOpen, onClose, onSuccess }) => {
  const [customerName, setCustomerName] = useState('');
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');
  const [favoriteItem, setFavoriteItem] = useState('');
  const [hoverRating, setHoverRating] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerName.trim() || !comment.trim()) {
      toast.error('Please enter your name and review message');
      return;
    }

    setIsSubmitting(true);
    try {
      await reviewService.create({
        customerName: customerName.trim(),
        rating,
        comment: comment.trim(),
        favoriteItem: favoriteItem.trim() || undefined,
      });

      toast.success('Thank you for your review!', {
        description: 'Your feedback makes Cafe Perfect Zone better every day.',
      });

      setCustomerName('');
      setComment('');
      setFavoriteItem('');
      setRating(5);
      onClose();
      if (onSuccess) onSuccess();
    } catch {
      toast.error('Failed to submit review. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-md bg-[#14141a] border border-zinc-800 rounded-3xl p-6 sm:p-7 shadow-2xl shadow-black space-y-5">
        {/* Close button */}
        <button
          onClick={onClose}
          aria-label="Close review modal"
          className="absolute top-4 right-4 p-2 text-gray-400 hover:text-white hover:bg-zinc-800 rounded-full transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Title */}
        <div className="text-center space-y-1">
          <div className="w-12 h-12 rounded-2xl bg-yellow-500/10 border border-yellow-500/20 text-yellow-400 mx-auto flex items-center justify-center">
            <Sparkles className="w-6 h-6" />
          </div>
          <h2 className="font-heading text-2xl font-bold text-white tracking-wide">
            Share Your Experience
          </h2>
          <p className="text-xs text-gray-400">
            Tell us about your food and mood at Cafe Perfect Zone!
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Star Rating Picker */}
          <div className="text-center space-y-1.5">
            <label className="block text-xs font-semibold uppercase tracking-wider text-gray-400">
              Your Rating
            </label>
            <div className="flex items-center justify-center gap-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  type="button"
                  key={star}
                  onClick={() => setRating(star)}
                  onMouseEnter={() => setHoverRating(star)}
                  onMouseLeave={() => setHoverRating(0)}
                  className="p-1 text-2xl transition-transform hover:scale-125 focus:outline-none"
                  aria-label={`Rate ${star} stars`}
                >
                  <Star
                    className={`w-7 h-7 transition-colors ${
                      star <= (hoverRating || rating)
                        ? 'text-yellow-400 fill-yellow-400'
                        : 'text-zinc-700'
                    }`}
                  />
                </button>
              ))}
            </div>
            <span className="text-xs text-yellow-400 font-semibold">
              {rating === 5 && 'Outstanding! ★★★★★'}
              {rating === 4 && 'Very Good! ★★★★☆'}
              {rating === 3 && 'Average ★★★☆☆'}
              {rating === 2 && 'Needs Improvement ★★☆☆☆'}
              {rating === 1 && 'Disappointing ★☆☆☆☆'}
            </span>
          </div>

          {/* Customer Name */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-gray-400 mb-1">
              Your Name *
            </label>
            <input
              type="text"
              required
              placeholder="e.g. Rahul Patil"
              value={customerName}
              onChange={(e) => setCustomerName(e.target.value)}
              className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-2.5 text-sm text-white placeholder-gray-500 focus:border-yellow-500 focus:outline-none transition-colors"
            />
          </div>

          {/* Favorite Item */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-gray-400 mb-1">
              Favorite Dish (Optional)
            </label>
            <input
              type="text"
              placeholder="e.g. Cheese Brust Pizza / Cold Coffee"
              value={favoriteItem}
              onChange={(e) => setFavoriteItem(e.target.value)}
              className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-2.5 text-sm text-white placeholder-gray-500 focus:border-yellow-500 focus:outline-none transition-colors"
            />
          </div>

          {/* Comment */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-gray-400 mb-1">
              Your Review *
            </label>
            <textarea
              required
              rows={3}
              placeholder="How was the taste, ambience, and service?"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-2.5 text-sm text-white placeholder-gray-500 focus:border-yellow-500 focus:outline-none transition-colors resize-none"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="gold-btn-primary w-full py-3 rounded-xl text-sm font-bold uppercase tracking-wider transition-all disabled:opacity-50"
          >
            {isSubmitting ? 'Submitting...' : 'Submit Review'}
          </button>
        </form>
      </div>
    </div>
  );
};
