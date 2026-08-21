'use client';

import React from 'react';
import { CartProvider } from '@/lib/cart-context';
import { CartDrawer } from '@/components/shop/CartDrawer';

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <CartProvider>
      {children}
      <CartDrawer />
    </CartProvider>
  );
}
