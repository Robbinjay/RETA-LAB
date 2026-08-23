'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ShoppingCart, Check, ArrowRight, Sparkles, ShieldCheck } from 'lucide-react';
import { useCart } from '@/lib/cart-context';

interface Product {
  id: number;
  title: string;
  price: string;
  priceNumber?: number;
  url?: string;
  image: string;
  category: string;
  description: string;
}

interface FeaturedProductsProps {
  products: Product[];
}

export function FeaturedProducts({ products }: FeaturedProductsProps) {
  const { addItem, openCart } = useCart();
  const [addedId, setAddedId] = useState<number | null>(null);

  const handleAddToCart = (e: React.MouseEvent, product: Product) => {
    e.preventDefault();
    e.stopPropagation();
    addItem(product, 1);
    setAddedId(product.id);
    openCart();
    setTimeout(() => {
      setAddedId(null);
    }, 1500);
  };

  return (
    <section className="py-24 bg-white border-y border-slate-200">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary-50 text-primary-600 text-xs font-bold uppercase tracking-wider mb-3">
              <Sparkles className="w-3.5 h-3.5" />
              Direct Laboratory Dispatch
            </div>
            <h2 className="text-4xl font-extrabold tracking-tight text-slate-900 uppercase">
              Featured <span className="text-primary-600">Peptides</span>
            </h2>
            <p className="mt-4 text-lg font-medium text-slate-600">
              Explore high-purity synthetic peptides with verified CoA documentation. Add items to your basket to proceed to our secure UK checkout.
            </p>
          </div>
          <Link
            href="/shop"
            className="inline-flex items-center justify-center bg-slate-900 hover:bg-primary-600 text-white font-bold py-3 px-6 rounded-lg transition-colors uppercase tracking-wide text-sm whitespace-nowrap shadow-sm"
          >
            Shop All Products <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((product) => {
            const isAdded = addedId === product.id;
            return (
              <div
                key={product.id}
                onClick={(e) => handleAddToCart(e, product)}
                className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden hover:shadow-xl hover:border-primary-400 transition-all group flex flex-col cursor-pointer"
              >
                <div className="relative h-52 bg-slate-50 overflow-hidden flex items-center justify-center p-4">
                  <Image
                    src={product.image}
                    alt={product.title}
                    fill
                    className="object-contain group-hover:scale-105 transition-transform duration-500 p-2"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute top-3 left-3 z-10">
                    <span className="bg-slate-900/80 backdrop-blur-md text-white text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-widest">
                      {product.category}
                    </span>
                  </div>
                  <div className="absolute top-3 right-3 z-10">
                    <span className="bg-emerald-500/90 text-white text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider flex items-center gap-1 shadow-sm">
                      <ShieldCheck className="w-3 h-3" />
                      &gt;99% HPLC
                    </span>
                  </div>
                </div>

                <div className="p-5 flex flex-col flex-grow justify-between">
                  <div>
                    <div className="flex flex-col gap-1.5 mb-3">
                      <h3 className="font-bold text-base text-slate-900 leading-snug line-clamp-2 group-hover:text-primary-600 transition-colors">
                        {product.title}
                      </h3>
                      <div className="flex items-baseline gap-1">
                        <span className="font-extrabold text-primary-600 text-xl">
                          {product.price}
                        </span>
                        <span className="text-[10px] uppercase font-bold text-slate-400">
                          GBP
                        </span>
                      </div>
                    </div>
                    <p className="text-xs font-medium text-slate-500 mb-5 leading-relaxed line-clamp-2">
                      {product.description}
                    </p>
                  </div>

                  <div className="space-y-2 pt-2 border-t border-slate-100">
                    <button
                      type="button"
                      onClick={(e) => handleAddToCart(e, product)}
                      className={`w-full py-2.5 px-4 rounded-xl font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all ${
                        isAdded
                          ? 'bg-emerald-600 text-white shadow-md'
                          : 'bg-slate-900 group-hover:bg-primary-600 text-white shadow-sm'
                      }`}
                    >
                      {isAdded ? (
                        <>
                          <Check className="w-4 h-4" /> Added to Basket
                        </>
                      ) : (
                        <>
                          <ShoppingCart className="w-4 h-4" /> Add to Basket
                        </>
                      )}
                    </button>
                    <Link
                      href="/checkout"
                      onClick={(e) => {
                        e.stopPropagation();
                        addItem(product, 1);
                      }}
                      className="w-full py-1.5 px-3 rounded-lg text-slate-500 hover:text-slate-900 hover:bg-slate-100 text-[11px] font-semibold text-center flex items-center justify-center gap-1 transition-colors"
                    >
                      <span>Direct Checkout →</span>
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
