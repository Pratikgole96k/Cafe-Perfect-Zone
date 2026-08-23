import React, { Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { Toaster } from 'sonner';
import { CartProvider } from './context/CartContext';
import { Layout } from './components/layout/Layout';
import { HomePage } from './pages/HomePage';

// Code-split pages for high performance
const MenuPage = lazy(() => import('./pages/MenuPage').then((m) => ({ default: m.MenuPage })));
const CartPage = lazy(() => import('./pages/CartPage').then((m) => ({ default: m.CartPage })));
const CheckoutPage = lazy(() => import('./pages/CheckoutPage').then((m) => ({ default: m.CheckoutPage })));
const OrderConfirmationPage = lazy(() =>
  import('./pages/OrderConfirmationPage').then((m) => ({ default: m.OrderConfirmationPage }))
);
const GalleryPage = lazy(() => import('./pages/GalleryPage').then((m) => ({ default: m.GalleryPage })));
const ReviewsPage = lazy(() => import('./pages/ReviewsPage').then((m) => ({ default: m.ReviewsPage })));
const AboutPage = lazy(() => import('./pages/AboutPage').then((m) => ({ default: m.AboutPage })));
const ContactPage = lazy(() => import('./pages/ContactPage').then((m) => ({ default: m.ContactPage })));
const NotFoundPage = lazy(() => import('./pages/NotFoundPage').then((m) => ({ default: m.NotFoundPage })));

// Dynamic Route Title & Scroll-To-Top Handler
const RouteHandler: React.FC = () => {
  const { pathname } = useLocation();

  React.useEffect(() => {
    window.scrollTo(0, 0);

    const titleMap: Record<string, string> = {
      '/': 'CAFE PERFECT ZONE | Good Food, Great Mood!',
      '/menu': 'Our Delicious Menu | CAFE PERFECT ZONE',
      '/gallery': 'Photo Gallery | CAFE PERFECT ZONE',
      '/reviews': 'Customer Reviews & Ratings | CAFE PERFECT ZONE',
      '/about': 'About Our Cafe | CAFE PERFECT ZONE',
      '/contact': 'Contact & Location | CAFE PERFECT ZONE',
      '/cart': 'Your Food Cart | CAFE PERFECT ZONE',
      '/checkout': 'Quick Checkout | CAFE PERFECT ZONE',
    };

    document.title = titleMap[pathname] || 'CAFE PERFECT ZONE | Good Food, Great Mood!';
  }, [pathname]);

  return null;
};

// Route loading spinner
const PageFallback: React.FC = () => (
  <div className="min-h-[70vh] flex flex-col items-center justify-center space-y-4">
    <div className="w-12 h-12 rounded-2xl bg-yellow-500/10 border border-yellow-500/30 flex items-center justify-center animate-pulse">
      <div className="w-6 h-6 border-2 border-yellow-400 border-t-transparent rounded-full animate-spin" />
    </div>
    <span className="font-poppins text-xs text-yellow-400/90 font-medium tracking-wider uppercase">
      Loading Cafe Experience...
    </span>
  </div>
);

export const App: React.FC = () => {
  return (
    <BrowserRouter
      future={{
        v7_startTransition: true,
        v7_relativeSplatPath: true,
      }}
    >
      <RouteHandler />
      <CartProvider>
        <Toaster
          position="top-right"
          theme="dark"
          richColors
          toastOptions={{
            style: {
              background: '#181822',
              border: '1px solid #2e2e3a',
              color: '#ffffff',
            },
          }}
        />
        <Suspense fallback={<PageFallback />}>
          <Routes>
            <Route element={<Layout />}>
              <Route path="/" element={<HomePage />} />
              <Route path="/menu" element={<MenuPage />} />
              <Route path="/cart" element={<CartPage />} />
              <Route path="/checkout" element={<CheckoutPage />} />
              <Route path="/order-confirmation/:id" element={<OrderConfirmationPage />} />
              <Route path="/order-confirmation" element={<OrderConfirmationPage />} />
              <Route path="/gallery" element={<GalleryPage />} />
              <Route path="/reviews" element={<ReviewsPage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/contact" element={<ContactPage />} />
              <Route path="*" element={<NotFoundPage />} />
            </Route>
          </Routes>
        </Suspense>
      </CartProvider>
    </BrowserRouter>
  );
};

export default App;
