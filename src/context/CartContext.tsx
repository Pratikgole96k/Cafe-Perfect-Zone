import React, { createContext, useContext, useState, useEffect, useMemo, useCallback } from 'react';
import { CartItem, MenuItem } from '../types';
import { toast } from 'sonner';

interface CartContextType {
  items: CartItem[];
  addToCart: (item: MenuItem, quantity?: number, specialInstructions?: string) => void;
  removeFromCart: (itemId: string) => void;
  updateQuantity: (itemId: string, quantity: number) => void;
  clearCart: () => void;
  totalItems: number;
  subtotal: number;
  isCartDrawerOpen: boolean;
  setIsCartDrawerOpen: (open: boolean) => void;
  openCartDrawer: () => void;
  closeCartDrawer: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const CART_STORAGE_KEY = 'cpz_cart_items_v1';

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem(CART_STORAGE_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [isCartDrawerOpen, setIsCartDrawerOpen] = useState(false);

  useEffect(() => {
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
    } catch (err) {
      console.error('Error persisting cart:', err);
    }
  }, [items]);

  const addToCart = useCallback((item: MenuItem, quantity = 1, specialInstructions?: string) => {
    if (!item.isAvailable) {
      toast.error(`${item.name} is currently SOLD OUT`);
      return;
    }

    setItems((prev) => {
      const existingIndex = prev.findIndex((ci) => ci.item.id === item.id);
      if (existingIndex > -1) {
        const updated = [...prev];
        const newQty = updated[existingIndex].quantity + quantity;
        updated[existingIndex] = {
          ...updated[existingIndex],
          quantity: newQty,
          specialInstructions: specialInstructions || updated[existingIndex].specialInstructions,
        };
        return updated;
      }
      return [...prev, { item, quantity, specialInstructions }];
    });

    toast.success(`Added ${quantity}x ${item.name} to cart!`, {
      description: `₹${item.price * quantity}`,
      action: {
        label: 'View Cart',
        onClick: () => setIsCartDrawerOpen(true),
      },
    });
  }, []);

  const removeFromCart = useCallback((itemId: string) => {
    setItems((prev) => {
      const item = prev.find((ci) => ci.item.id === itemId);
      if (item) {
        toast.info(`Removed ${item.item.name} from cart`);
      }
      return prev.filter((ci) => ci.item.id !== itemId);
    });
  }, []);

  const updateQuantity = useCallback((itemId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(itemId);
      return;
    }
    setItems((prev) =>
      prev.map((ci) => (ci.item.id === itemId ? { ...ci, quantity } : ci))
    );
  }, [removeFromCart]);

  const clearCart = useCallback(() => {
    setItems([]);
  }, []);

  const openCartDrawer = useCallback(() => setIsCartDrawerOpen(true), []);
  const closeCartDrawer = useCallback(() => setIsCartDrawerOpen(false), []);

  const totalItems = useMemo(() => items.reduce((sum, ci) => sum + ci.quantity, 0), [items]);
  const subtotal = useMemo(() => items.reduce((sum, ci) => sum + ci.item.price * ci.quantity, 0), [items]);

  const value = useMemo(
    () => ({
      items,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
      totalItems,
      subtotal,
      isCartDrawerOpen,
      setIsCartDrawerOpen,
      openCartDrawer,
      closeCartDrawer,
    }),
    [
      items,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
      totalItems,
      subtotal,
      isCartDrawerOpen,
      openCartDrawer,
      closeCartDrawer,
    ]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export const useCart = (): CartContextType => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
