import React, { useState, useEffect, useMemo } from 'react';
import { Sparkles, Eye, Image as ImageIcon } from 'lucide-react';
import { GalleryItem } from '../types';
import { galleryService } from '../services/api';
import { LightboxModal } from '../components/ui/LightboxModal';

import { OptimizedImage } from '../components/ui/OptimizedImage';

const CATEGORIES = ['All', 'Pizza', 'Burger', 'Sandwich', 'Fries', 'Shakes', 'Café'] as const;

export const GalleryPage: React.FC = () => {
  const [items, setItems] = useState<GalleryItem[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedItem, setSelectedItem] = useState<GalleryItem | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchGallery = async () => {
      try {
        const data = await galleryService.getAll();
        setItems(data);
      } catch (err) {
        console.error('Error loading gallery:', err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchGallery();
  }, []);

  const filteredItems = useMemo(() => {
    if (selectedCategory === 'All') return items;
    return items.filter((item) => item.category.toLowerCase() === selectedCategory.toLowerCase());
  }, [items, selectedCategory]);

  return (
    <div className="pt-24 pb-20 min-h-screen font-poppins">
      {/* Banner */}
      <div className="bg-radial-glow py-10 border-b border-zinc-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-yellow-500/10 border border-yellow-500/30 text-yellow-400 font-poppins text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Food & Moments Showcase</span>
          </div>

          <h1 className="font-heading text-5xl sm:text-7xl lg:text-8xl text-white uppercase tracking-wide">
            CAFE PHOTO GALLERY
          </h1>

          <p className="font-poppins text-gray-400 text-sm sm:text-base max-w-xl mx-auto">
            Take a visual tour of our sizzling pizzas, juicy burgers, loaded fries, creamy shakes, and the vibrant vibe at Cafe Perfect Zone.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 space-y-8">
        {/* Category Filter Tabs */}
        <div className="flex items-center justify-center flex-wrap gap-2">
          {CATEGORIES.map((cat) => {
            const isSelected = selectedCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-5 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all duration-200 ${
                  isSelected
                    ? 'bg-yellow-500 text-black shadow-lg shadow-yellow-500/20'
                    : 'bg-[#14141a] border border-zinc-800 text-gray-300 hover:text-white hover:border-zinc-700'
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>

        {/* Gallery Grid */}
        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="h-72 bg-zinc-900/60 rounded-3xl animate-pulse" />
            ))}
          </div>
        ) : filteredItems.length === 0 ? (
          <div className="text-center py-16 space-y-3">
            <div className="w-12 h-12 rounded-full bg-zinc-900 flex items-center justify-center text-gray-500 mx-auto">
              <ImageIcon className="w-6 h-6" />
            </div>
            <p className="text-gray-400 text-sm">No photos available in this category yet.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {filteredItems.map((item) => (
              <div
                key={item.id}
                onClick={() => setSelectedItem(item)}
                className="cafe-card group cursor-pointer overflow-hidden rounded-3xl relative h-72 sm:h-80 border border-zinc-800"
              >
                <OptimizedImage
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />

                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent opacity-80 group-hover:opacity-95 transition-opacity pointer-events-none" />

                {/* Category Pill */}
                <span className="absolute top-4 left-4 bg-black/70 backdrop-blur-md border border-zinc-700 text-yellow-400 text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full">
                  {item.category}
                </span>

                {/* Hover Eye Icon */}
                <div className="absolute top-4 right-4 w-9 h-9 rounded-full bg-yellow-500 text-black flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity transform scale-75 group-hover:scale-100 duration-300 shadow-lg">
                  <Eye className="w-4 h-4" />
                </div>

                {/* Caption at bottom */}
                <div className="absolute bottom-4 left-4 right-4 space-y-1">
                  <h3 className="font-heading text-xl text-white font-bold tracking-wide group-hover:text-yellow-400 transition-colors">
                    {item.title}
                  </h3>
                  {item.description && (
                    <p className="text-xs text-gray-300 line-clamp-1">{item.description}</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Lightbox */}
      <LightboxModal
        item={selectedItem}
        onClose={() => setSelectedItem(null)}
      />
    </div>
  );
};
