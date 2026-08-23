import React, { useState, useEffect, useMemo } from 'react';
import { 
  Search, 
  Sparkles, 
  SlidersHorizontal, 
  Utensils, 
  AlertCircle,
  Coffee,
  CheckCircle2,
  Flame,
  X
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { MenuItem, MenuCategory } from '../types';
import { menuService } from '../services/api';
import { FoodCard } from '../components/ui/FoodCard';
import { FoodDetailModal } from '../components/ui/FoodDetailModal';

const CATEGORIES: ('ALL' | MenuCategory)[] = [
  'ALL',
  'BEVERAGES',
  'MAGGI',
  'FRIES',
  'SANDWICHES',
  'BURGERS',
  'PIZZAS',
  'SHAKES / SNACKS',
  'NEW ADDITIONS',
];

export const MenuPage: React.FC = () => {
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<'ALL' | MenuCategory>('ALL');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'featured' | 'price-low' | 'price-high' | 'name'>('featured');
  const [selectedFood, setSelectedFood] = useState<MenuItem | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchMenu = async () => {
      try {
        const items = await menuService.getAll();
        setMenuItems(items);
      } catch (err) {
        console.error('Error fetching menu items:', err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchMenu();
  }, []);

  const filteredItems = useMemo(() => {
    return menuItems
      .filter((item) => {
        // Category filter
        const matchesCategory =
          selectedCategory === 'ALL' || item.category === selectedCategory;

        // Search query
        const query = searchQuery.toLowerCase().trim();
        const matchesSearch =
          !query ||
          item.name.toLowerCase().includes(query) ||
          item.description.toLowerCase().includes(query) ||
          item.category.toLowerCase().includes(query) ||
          item.tags?.some((t) => t.toLowerCase().includes(query));

        return matchesCategory && matchesSearch;
      })
      .sort((a, b) => {
        if (sortBy === 'price-low') return a.price - b.price;
        if (sortBy === 'price-high') return b.price - a.price;
        if (sortBy === 'name') return a.name.localeCompare(b.name);
        // default featured
        if (a.isPopular && !b.isPopular) return -1;
        if (!a.isPopular && b.isPopular) return 1;
        return 0;
      });
  }, [menuItems, selectedCategory, searchQuery, sortBy]);

  // Category counts
  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = { ALL: menuItems.length };
    menuItems.forEach((item) => {
      counts[item.category] = (counts[item.category] || 0) + 1;
    });
    return counts;
  }, [menuItems]);

  return (
    <div className="pt-24 pb-20 min-h-screen font-poppins">
      {/* Header Banner */}
      <div className="py-12 border-b border-zinc-800/80 bg-gradient-to-b from-[#121218] to-[#0a0a0c]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-3">
          <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-yellow-500/10 border border-yellow-500/30 text-yellow-400 font-poppins text-xs font-bold uppercase tracking-wider shadow-sm">
            <Sparkles className="w-3.5 h-3.5 fill-yellow-400" />
            <span>100% Pure Veg • Authentic Café Menu</span>
          </div>

          <h1 className="font-heading text-5xl sm:text-7xl lg:text-8xl text-white uppercase tracking-wide">
            OUR COMPLETE MENU
          </h1>

          <p className="font-poppins text-gray-400 text-sm sm:text-base max-w-xl mx-auto">
            Discover all 44 delicious items crafted freshly with premium ingredients, secret spices, and love.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 space-y-8">
        {/* Controls: Search, Sort, Filters */}
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
          {/* Search bar */}
          <div className="relative flex-1 max-w-md">
            <Search className="w-5 h-5 text-gray-400 absolute left-4 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search pizzas, burgers, shakes, maggi..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-[#14141a] border border-zinc-800 rounded-2xl pl-11 pr-10 py-3.5 text-sm text-white placeholder-gray-500 focus:border-yellow-500 focus:outline-none transition-all shadow-inner"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                aria-label="Clear search"
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white p-1"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Sort dropdown */}
          <div className="flex items-center gap-3 self-end md:self-auto">
            <div className="flex items-center gap-2 bg-[#14141a] border border-zinc-800 rounded-2xl px-4 py-3 text-xs text-gray-300 shadow-md">
              <SlidersHorizontal className="w-4 h-4 text-yellow-400" />
              <span className="font-semibold text-gray-400">Sort By:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="bg-transparent text-white font-medium focus:outline-none cursor-pointer"
              >
                <option value="featured" className="bg-zinc-900 text-white">Popular Picks</option>
                <option value="price-low" className="bg-zinc-900 text-white">Price: Low to High</option>
                <option value="price-high" className="bg-zinc-900 text-white">Price: High to Low</option>
                <option value="name" className="bg-zinc-900 text-white">Name: A to Z</option>
              </select>
            </div>
          </div>
        </div>

        {/* Category Filter Tabs */}
        <div className="overflow-x-auto no-scrollbar pb-2">
          <div className="flex items-center gap-2.5 min-w-max">
            {CATEGORIES.map((cat) => {
              const isSelected = selectedCategory === cat;
              const count = categoryCounts[cat] || 0;
              return (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-4 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all duration-200 flex items-center gap-2 ${
                    isSelected
                      ? 'bg-yellow-500 text-black shadow-lg shadow-yellow-500/25 scale-105'
                      : 'bg-[#14141a] border border-zinc-800 text-gray-300 hover:text-white hover:border-zinc-700'
                  }`}
                >
                  <span>{cat}</span>
                  <span
                    className={`text-[10px] px-1.5 py-0.5 rounded-full font-extrabold ${
                      isSelected ? 'bg-black text-yellow-400' : 'bg-zinc-800 text-gray-400'
                    }`}
                  >
                    {count}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Active Filters / Result Summary */}
        <div className="flex items-center justify-between text-xs text-gray-400 px-1">
          <span>
            Showing <strong className="text-white">{filteredItems.length}</strong> items in{' '}
            <strong className="text-yellow-400">{selectedCategory}</strong>
          </span>
          {searchQuery && (
            <span>
              Matching "<strong className="text-white">{searchQuery}</strong>"
            </span>
          )}
        </div>

        {/* Menu Grid */}
        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
              <div key={i} className="h-80 bg-zinc-900/60 rounded-2xl animate-pulse" />
            ))}
          </div>
        ) : filteredItems.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-16 space-y-4 cafe-card p-10 max-w-md mx-auto"
          >
            <div className="w-16 h-16 rounded-2xl bg-yellow-500/10 border border-yellow-500/20 flex items-center justify-center text-yellow-400 mx-auto">
              <Utensils className="w-8 h-8" />
            </div>
            <h3 className="font-heading text-2xl font-bold text-white uppercase">No Delicious Matches</h3>
            <p className="text-xs sm:text-sm text-gray-400 leading-relaxed">
              We couldn't find any dishes matching "{searchQuery}". Try searching for Pizza, Burger, Maggi, or Shake.
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('ALL');
              }}
              className="gold-btn-primary px-6 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider shadow-lg"
            >
              Reset Filters
            </button>
          </motion.div>
        ) : (
          <AnimatePresence mode="popLayout">
            <motion.div
              layout
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
            >
              {filteredItems.map((item) => (
                <motion.div
                  key={item.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.25 }}
                >
                  <FoodCard
                    item={item}
                    onOpenDetails={(food) => setSelectedFood(food)}
                  />
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>
        )}
      </div>

      {/* Food Detail Modal */}
      <FoodDetailModal
        item={selectedFood}
        onClose={() => setSelectedFood(null)}
      />
    </div>
  );
};
