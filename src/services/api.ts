import { MenuItem, Order, Review, GalleryItem } from '../types';
import { SEED_MENU_ITEMS } from '../data/seedMenu';
import { SEED_GALLERY_ITEMS } from '../data/seedGallery';
import { SEED_REVIEWS } from '../data/seedReviews';

// Helper for local storage persistence
const getStoredData = <T>(key: string, defaultData: T): T => {
  try {
    const saved = localStorage.getItem(`cpz_${key}`);
    return saved ? JSON.parse(saved) : defaultData;
  } catch {
    return defaultData;
  }
};

const setStoredData = <T>(key: string, data: T): void => {
  try {
    localStorage.setItem(`cpz_${key}`, JSON.stringify(data));
  } catch (err) {
    console.error('Failed to save to local storage', err);
  }
};

// ==================== MENU SERVICE ====================
export const menuService = {
  async getAll(): Promise<MenuItem[]> {
    const seedMap = new Map(SEED_MENU_ITEMS.map((i) => [i.id, i]));
    const syncWithSeed = (items: MenuItem[]) =>
      items.map((item) => {
        const seed = seedMap.get(item.id);
        return seed ? { ...item, image: seed.image } : item;
      });

    const stored = getStoredData('menu', SEED_MENU_ITEMS);
    return syncWithSeed(stored);
  },

  async getById(id: string): Promise<MenuItem | null> {
    const items = await this.getAll();
    return items.find((i) => i.id === id) || null;
  },

  async create(item: Omit<MenuItem, 'id'>, _token?: string): Promise<MenuItem> {
    const newItem: MenuItem = {
      ...item,
      id: `menu-${Date.now()}`,
    };
    const current = getStoredData('menu', SEED_MENU_ITEMS);
    const updated = [newItem, ...current];
    setStoredData('menu', updated);
    return newItem;
  },

  async update(id: string, updates: Partial<MenuItem>, _token?: string): Promise<MenuItem> {
    const current = getStoredData('menu', SEED_MENU_ITEMS);
    let updatedItem: MenuItem = current.find((i) => i.id === id)!;
    const next = current.map((i) => {
      if (i.id === id) {
        updatedItem = { ...i, ...updates };
        return updatedItem;
      }
      return i;
    });
    setStoredData('menu', next);
    return updatedItem;
  },

  async delete(id: string, _token?: string): Promise<boolean> {
    const current = getStoredData('menu', SEED_MENU_ITEMS);
    setStoredData('menu', current.filter((i) => i.id !== id));
    return true;
  },
};

// ==================== ORDER SERVICE ====================
export const orderService = {
  async getAll(_token?: string): Promise<Order[]> {
    return getStoredData<Order[]>('orders', []);
  },

  async create(orderData: Omit<Order, 'id' | 'createdAt'>): Promise<Order> {
    const newOrder: Order = {
      ...orderData,
      id: `ord-${Date.now()}`,
      createdAt: new Date().toISOString(),
    };
    const current = getStoredData<Order[]>('orders', []);
    setStoredData('orders', [newOrder, ...current]);
    return newOrder;
  },

  async updateStatus(id: string, status: Order['status'], _token?: string): Promise<Order> {
    const current = getStoredData<Order[]>('orders', []);
    let updatedOrder: Order | null = null;
    const next = current.map((o) => {
      if (o.id === id) {
        updatedOrder = { ...o, status };
        return updatedOrder;
      }
      return o;
    });
    setStoredData('orders', next);
    return updatedOrder!;
  },
};

// ==================== REVIEW SERVICE ====================
export const reviewService = {
  async getApproved(): Promise<Review[]> {
    const all = getStoredData('reviews', SEED_REVIEWS);
    return all.filter((r) => r.isApproved);
  },

  async getAll(_token?: string): Promise<Review[]> {
    return getStoredData('reviews', SEED_REVIEWS);
  },

  async create(reviewData: Omit<Review, 'id' | 'date' | 'isApproved'>): Promise<Review> {
    const newReview: Review = {
      ...reviewData,
      id: `rev-${Date.now()}`,
      date: new Date().toISOString().split('T')[0],
      isApproved: true,
    };
    const current = getStoredData('reviews', SEED_REVIEWS);
    setStoredData('reviews', [newReview, ...current]);
    return newReview;
  },

  async toggleApproval(id: string, isApproved: boolean, _token?: string): Promise<boolean> {
    const current = getStoredData('reviews', SEED_REVIEWS);
    setStoredData(
      'reviews',
      current.map((r) => (r.id === id ? { ...r, isApproved } : r))
    );
    return true;
  },

  async delete(id: string, _token?: string): Promise<boolean> {
    const current = getStoredData('reviews', SEED_REVIEWS);
    setStoredData('reviews', current.filter((r) => r.id !== id));
    return true;
  },
};

// ==================== GALLERY SERVICE ====================
export const galleryService = {
  async getAll(): Promise<GalleryItem[]> {
    return getStoredData('gallery', SEED_GALLERY_ITEMS);
  },

  async create(item: Omit<GalleryItem, 'id'>, _token?: string): Promise<GalleryItem> {
    const newItem: GalleryItem = { ...item, id: `gal-${Date.now()}` };
    const current = getStoredData('gallery', SEED_GALLERY_ITEMS);
    setStoredData('gallery', [newItem, ...current]);
    return newItem;
  },

  async delete(id: string, _token?: string): Promise<boolean> {
    const current = getStoredData('gallery', SEED_GALLERY_ITEMS);
    setStoredData('gallery', current.filter((i) => i.id !== id));
    return true;
  },
};
