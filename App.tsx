import React, { useState, useMemo, useCallback, useEffect } from 'react';
import { Header } from './components/Header';
import { ProductList } from './components/ProductList';
import { CartPanel } from './components/CartPanel';
import { CheckoutModal } from './components/CheckoutModal';
import { SuccessModal } from './components/SuccessModal';
import { IntroAnimation } from './components/IntroAnimation';
import { MarketIndexModal } from './components/MarketIndexModal';
import { ShippingTracker } from './components/ShippingTracker';
import { AdModal } from './components/AdModal';
import { PRODUCTS } from './constants';
import type { Product, CartItem } from './types';

const App: React.FC = () => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isSuccessOpen, setIsSuccessOpen] = useState(false);
  const [isMarketIndexOpen, setIsMarketIndexOpen] = useState(false);
  const [isTrackingOpen, setIsTrackingOpen] = useState(false);
  const [showIntro, setShowIntro] = useState(true);
  const [adModal, setAdModal] = useState<{isOpen: boolean; product: Product | null}>({isOpen: false, product: null});

  useEffect(() => {
    const introTimer = setTimeout(() => {
      setShowIntro(false);
    }, 2000);

    const adTimer = setTimeout(() => {
      const saleProducts = PRODUCTS.filter(p => p.originalPrice);
      const regularProducts = PRODUCTS.filter(p => !p.originalPrice);
      
      let productToShow: Product | undefined;
      // 70% chance to show a sale ad if available
      if (saleProducts.length > 0 && Math.random() < 0.7) {
          productToShow = saleProducts[Math.floor(Math.random() * saleProducts.length)];
      } else {
          productToShow = regularProducts[Math.floor(Math.random() * regularProducts.length)];
      }

      if (productToShow) {
          setAdModal({ isOpen: true, product: productToShow });
      }
    }, 10000); // Show ad after 10 seconds

    return () => {
      clearTimeout(introTimer);
      clearTimeout(adTimer);
    };
  }, []);

  const cartSummary = useMemo(() => {
    const itemCount = cart.reduce((sum, item) => sum + item.quantity, 0);
    const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
    return { itemCount, total };
  }, [cart]);

  const handleAddToCart = useCallback((product: Product) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(item => item.name === product.name);
      if (existingItem) {
        return prevCart.map(item =>
          item.name === product.name
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prevCart, { ...product, quantity: 1 }];
    });
  }, []);

  const handleRemoveFromCart = useCallback((productName: string) => {
    setCart(prevCart => prevCart.filter(item => item.name !== productName));
  }, []);

  const handleOpenCheckout = () => {
    if (cart.length > 0) {
      setIsCheckoutOpen(true);
    }
  };

  const handleConfirmCheckout = () => {
    setIsCheckoutOpen(false);
    setIsSuccessOpen(true);
    setCart([]);
  };

  const handleCloseSuccess = () => {
    setIsSuccessOpen(false);
    setIsCartOpen(false);
  };

  const handleTrackOrder = () => {
    setIsSuccessOpen(false);
    setIsCartOpen(false);
    setIsTrackingOpen(true);
  };

  if (showIntro) {
    return <IntroAnimation />;
  }

  return (
    <div className="font-sans text-white min-h-screen p-5 md:p-8 animate-fadeIn" style={{fontFamily: "'Poppins', sans-serif"}}>
      <div className="max-w-7xl mx-auto">
        <Header 
          cartCount={cartSummary.itemCount} 
          cartTotal={cartSummary.total} 
          onCartClick={() => setIsCartOpen(true)}
          onMarketIndexClick={() => setIsMarketIndexOpen(true)}
        />
        <main>
          <ProductList products={PRODUCTS} onAddToCart={handleAddToCart} />
        </main>
      </div>

      <CartPanel
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cart}
        onRemoveItem={handleRemoveFromCart}
        onCheckout={handleOpenCheckout}
        total={cartSummary.total}
      />

      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        onConfirm={handleConfirmCheckout}
      />

      <SuccessModal 
        isOpen={isSuccessOpen} 
        onClose={handleCloseSuccess}
        onTrackOrder={handleTrackOrder}
      />

      <MarketIndexModal
        isOpen={isMarketIndexOpen}
        onClose={() => setIsMarketIndexOpen(false)}
      />

      <ShippingTracker
        isOpen={isTrackingOpen}
        onClose={() => setIsTrackingOpen(false)}
      />

      <AdModal
        isOpen={adModal.isOpen}
        product={adModal.product}
        onClose={() => setAdModal({isOpen: false, product: null})}
        onAddToCart={handleAddToCart}
      />
    </div>
  );
};

export default App;