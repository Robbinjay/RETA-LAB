'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

export interface CartItem {
  id: number;
  title: string;
  price: string;
  priceNumber: number;
  image: string;
  category: string;
  quantity: number;
  url?: string;
  description?: string;
}

export interface ShippingOption {
  id: 'normal' | 'express' | 'international';
  name: string;
  fee: number;
  estimatedDelivery: string;
  description: string;
}

export const SHIPPING_OPTIONS: ShippingOption[] = [
  {
    id: 'normal',
    name: 'Normal Shipping',
    fee: 15,
    estimatedDelivery: '2–4 Business Days',
    description: 'Tracked UK domestic postal delivery with signature on arrival.',
  },
  {
    id: 'express',
    name: 'Express Shipping',
    fee: 40,
    estimatedDelivery: 'Next Business Day',
    description: 'Priority courier dispatch with next-day morning delivery across the UK.',
  },
  {
    id: 'international',
    name: 'International',
    fee: 25,
    estimatedDelivery: '5–10 Business Days',
    description: 'Tracked international air freight courier for overseas laboratory orders.',
  },
];

export const MINIMUM_ORDER_AMOUNT = 100; // £100 GBP minimum

interface CartContextType {
  items: CartItem[];
  addItem: (item: {
    id: number;
    title: string;
    price: string;
    priceNumber?: number;
    image: string;
    category: string;
    description?: string;
  }, quantity?: number) => void;
  removeItem: (id: number) => void;
  updateQuantity: (id: number, quantity: number) => void;
  clearCart: () => void;
  totalItems: number;
  subtotal: number;
  minOrderAmount: number;
  meetsMinOrder: boolean;
  amountNeededForMin: number;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  openCart: () => void;
  closeCart: () => void;
  selectedShipping: ShippingOption;
  setSelectedShipping: (option: ShippingOption) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const CART_STORAGE_KEY = 'retaclub_cart_items';

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>(() => {
    if (typeof window === 'undefined') return [];
    try {
      const stored = window.localStorage.getItem(CART_STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed)) {
          return parsed;
        }
      }
    } catch (e) {
      console.warn('Failed to parse stored cart:', e);
    }
    return [];
  });
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [selectedShipping, setSelectedShipping] = useState<ShippingOption>(SHIPPING_OPTIONS[0]);

  // Save cart to localStorage whenever items change
  useEffect(() => {
    try {
      window.localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
    } catch (e) {
      console.warn('Failed to save cart to localStorage:', e);
    }
  }, [items]);


  const parsePrice = (priceStr: string, fallback?: number): number => {
    if (typeof fallback === 'number' && fallback > 0) return fallback;
    const numeric = parseFloat(priceStr.replace(/[^0-9.]/g, ''));
    return isNaN(numeric) ? 45 : numeric;
  };

  const addItem = (product: {
    id: number;
    title: string;
    price: string;
    priceNumber?: number;
    image: string;
    category: string;
    description?: string;
  }, quantity: number = 1) => {
    const priceNum = parsePrice(product.price, product.priceNumber);
    const formattedPrice = product.price.startsWith('£') ? product.price : `£${priceNum.toFixed(2)}`;

    setItems((prev) => {
      const existingIndex = prev.findIndex((i) => i.id === product.id);
      if (existingIndex > -1) {
        const updated = [...prev];
        updated[existingIndex] = {
          ...updated[existingIndex],
          quantity: updated[existingIndex].quantity + quantity,
        };
        return updated;
      } else {
        return [
          ...prev,
          {
            id: product.id,
            title: product.title,
            price: formattedPrice,
            priceNumber: priceNum,
            image: product.image,
            category: product.category,
            quantity: Math.max(1, quantity),
            description: product.description,
          },
        ];
      }
    });

    setIsCartOpen(true);
  };

  const removeItem = (id: number) => {
    setItems((prev) => prev.filter((i) => i.id !== id));
  };

  const updateQuantity = (id: number, quantity: number) => {
    if (quantity <= 0) {
      removeItem(id);
      return;
    }
    setItems((prev) =>
      prev.map((i) => (i.id === id ? { ...i, quantity } : i))
    );
  };

  const clearCart = () => {
    setItems([]);
  };

  const totalItems = items.reduce((acc, item) => acc + item.quantity, 0);

  const subtotal = items.reduce((acc, item) => {
    return acc + item.priceNumber * item.quantity;
  }, 0);

  const meetsMinOrder = subtotal >= MINIMUM_ORDER_AMOUNT;
  const amountNeededForMin = Math.max(0, MINIMUM_ORDER_AMOUNT - subtotal);

  return (
    <CartContext.Provider
      value={{
        items,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
        totalItems,
        subtotal,
        minOrderAmount: MINIMUM_ORDER_AMOUNT,
        meetsMinOrder,
        amountNeededForMin,
        isCartOpen,
        setIsCartOpen,
        openCart: () => setIsCartOpen(true),
        closeCart: () => setIsCartOpen(false),
        selectedShipping,
        setSelectedShipping,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}
