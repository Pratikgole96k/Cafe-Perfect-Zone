export type MenuCategory =
  | 'BEVERAGES'
  | 'MAGGI'
  | 'FRIES'
  | 'SANDWICHES'
  | 'BURGERS'
  | 'PIZZAS'
  | 'SHAKES / SNACKS'
  | 'NEW ADDITIONS';

export interface MenuItem {
  id: string;
  name: string;
  category: MenuCategory;
  price: number;
  description: string;
  image: string;
  isAvailable: boolean;
  isPopular?: boolean;
  isVeg: boolean;
  preparationTime?: string;
  tags?: string[];
  createdAt?: string;
  updatedAt?: string;
}

export interface CartItem {
  item: MenuItem;
  quantity: number;
  specialInstructions?: string;
}

export type OrderType = 'Pickup' | 'Dine-in';

export type OrderStatus =
  | 'Pending'
  | 'Confirmed'
  | 'Preparing'
  | 'Ready'
  | 'Completed'
  | 'Cancelled';

export interface OrderItemPayload {
  itemId: string;
  name: string;
  price: number;
  quantity: number;
  subtotal: number;
  image?: string;
}

export interface Order {
  id: string;
  orderNumber: string; // e.g. CPZ-4829
  customerName: string;
  customerPhone: string;
  orderType: OrderType;
  tableNumber?: string;
  specialInstructions?: string;
  items: OrderItemPayload[];
  subtotal: number;
  total: number;
  status: OrderStatus;
  createdAt: string;
  updatedAt?: string;
}

export interface Review {
  id: string;
  customerName: string;
  rating: number; // 1 to 5
  comment: string;
  isApproved: boolean;
  date: string;
  avatarUrl?: string;
  favoriteItem?: string;
}

export interface GalleryItem {
  id: string;
  title: string;
  category: 'All' | 'Pizza' | 'Burger' | 'Sandwich' | 'Fries' | 'Shakes' | 'Café';
  image: string;
  description?: string;
}
