'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useCart } from '@/lib/cart-context';
import {
  X,
  Trash2,
  Plus,
  Minus,
  ShoppingCart,
  MessageCircle,
  ArrowRight,
  ShieldCheck,
  AlertCircle,
  Sparkles,
} from 'lucide-react';

export function CartDrawer() {
  const {
    items,
    removeItem,
    updateQuantity,
    clearCart,
    subtotal,
    totalItems,
    minOrderAmount,
    meetsMinOrder,
    amountNeededForMin,
    isCartOpen,
    closeCart,
  } = useCart();

  if (!isCartOpen) return null;

  const progressPercent = Math.min(100, Math.round((subtotal / minOrderAmount) * 100));

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-slate-950/60 backdrop-blur-sm transition-opacity"
        onClick={closeCart}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col">
          
          {/* Header */}
          <div className="px-6 py-4 border-b border-slate-200 flex items-center justify-between bg-slate-50">
            <div className="flex items-center gap-2">
              <ShoppingCart className="w-5 h-5 text-primary-600" />
              <h2 className="text-base font-bold text-slate-900">
                Research Basket ({totalItems})
              </h2>
            </div>
            <button
              onClick={closeCart}
              className="p-2 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-200 transition-colors"
              aria-label="Close Basket"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Minimum Order Indicator Banner */}
          <div className="px-6 py-3 bg-slate-900 text-white">
            <div className="flex items-center justify-between text-xs font-semibold mb-1.5">
              <span>Minimum Order: £{minOrderAmount}.00 GBP</span>
              {meetsMinOrder ? (
                <span className="text-emerald-400 font-bold flex items-center gap-1">
                  <Sparkles className="w-3.5 h-3.5" /> Threshold Met!
                </span>
              ) : (
                <span className="text-amber-300 font-bold">
                  Add £{amountNeededForMin.toFixed(2)} to unlock checkout
                </span>
              )}
            </div>
            <div className="w-full bg-slate-800 rounded-full h-2 overflow-hidden">
              <div
                className={`h-full transition-all duration-300 ${
                  meetsMinOrder ? 'bg-emerald-500' : 'bg-primary-500'
                }`}
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>

          {/* Items List */}
          <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4 divide-y divide-slate-100">
            {items.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center py-12">
                <div className="w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center text-slate-400 mb-4">
                  <ShoppingCart className="w-8 h-8" />
                </div>
                <h3 className="text-base font-bold text-slate-800 mb-1">
                  Your basket is empty
                </h3>
                <p className="text-xs text-slate-500 max-w-xs mb-6 leading-relaxed">
                  Explore our verified catalogue of HPLC-tested research peptides to begin your laboratory order.
                </p>
                <Link
                  href="/shop"
                  onClick={closeCart}
                  className="bg-primary-600 hover:bg-primary-500 text-white text-xs font-bold uppercase tracking-wider px-5 py-2.5 rounded-xl transition-all shadow-sm"
                >
                  Browse Research Shop
                </Link>
              </div>
            ) : (
              items.map((item) => (
                <div key={item.id} className="pt-4 first:pt-0 flex gap-4">
                  {/* Thumbnail */}
                  <div className="relative w-16 h-16 rounded-xl bg-slate-50 border border-slate-200 overflow-hidden flex-shrink-0 flex items-center justify-center p-1">
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      className="object-contain p-1"
                      sizes="64px"
                      referrerPolicy="no-referrer"
                    />
                  </div>

                  {/* Details */}
                  <div className="flex-1 min-w-0 flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-start">
                        <h4 className="text-sm font-bold text-slate-900 truncate pr-2">
                          {item.title}
                        </h4>
                        <button
                          onClick={() => removeItem(item.id)}
                          className="text-slate-400 hover:text-red-500 transition-colors p-1"
                          title="Remove item"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                      <span className="text-xs text-primary-600 font-extrabold">
                        {item.price}
                      </span>
                    </div>

                    {/* Quantity controls */}
                    <div className="flex items-center justify-between mt-2">
                      <div className="inline-flex items-center border border-slate-200 rounded-lg bg-slate-50">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="p-1 text-slate-500 hover:text-slate-900 hover:bg-slate-200 rounded-l-lg transition-colors"
                          aria-label="Decrease quantity"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="px-2 text-xs font-bold text-slate-800 min-w-[24px] text-center">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="p-1 text-slate-500 hover:text-slate-900 hover:bg-slate-200 rounded-r-lg transition-colors"
                          aria-label="Increase quantity"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>
                      <span className="text-xs font-bold text-slate-900">
                        £{(item.priceNumber * item.quantity).toFixed(2)}
                      </span>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer & Checkout Action */}
          {items.length > 0 && (
            <div className="p-6 border-t border-slate-200 bg-slate-50 space-y-4">
              <div className="space-y-1.5 text-xs text-slate-600">
                <div className="flex justify-between">
                  <span>Basket Subtotal</span>
                  <span className="font-bold text-slate-900 text-sm">
                    £{subtotal.toFixed(2)} GBP
                  </span>
                </div>
                <div className="flex justify-between text-slate-500 text-[11px]">
                  <span>Shipping Fee</span>
                  <span>Calculated at checkout (from £15.00)</span>
                </div>
              </div>

              {!meetsMinOrder && (
                <div className="p-3 bg-amber-50 border border-amber-200 rounded-xl flex items-start gap-2 text-xs text-amber-800">
                  <AlertCircle className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" />
                  <span>
                    <strong>Minimum £{minOrderAmount}.00 required.</strong> Add{' '}
                    <strong>£{amountNeededForMin.toFixed(2)}</strong> more of research materials to proceed.
                  </span>
                </div>
              )}

              <div className="space-y-2">
                <Link
                  href={meetsMinOrder ? '/checkout' : '#'}
                  onClick={(e) => {
                    if (!meetsMinOrder) {
                      e.preventDefault();
                    } else {
                      closeCart();
                    }
                  }}
                  className={`w-full py-3 px-4 rounded-xl text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-all ${
                    meetsMinOrder
                      ? 'bg-primary-600 hover:bg-primary-500 text-white shadow-md shadow-primary-600/20'
                      : 'bg-slate-300 text-slate-500 cursor-not-allowed'
                  }`}
                >
                  Proceed to Checkout <ArrowRight className="w-4 h-4" />
                </Link>

                <button
                  onClick={() => {
                    const message = `Hello! I would like to place an order for:\n${items.map(i => `- ${i.title} (Qty: ${i.quantity})`).join('\n')}\n\nTotal: £${subtotal.toFixed(2)} GBP`;
                    window.open(`https://wa.me/447888391589?text=${encodeURIComponent(message)}`, '_blank');
                  }}
                  className="w-full py-3 px-4 rounded-xl border border-emerald-500 text-emerald-600 hover:bg-emerald-50 bg-white text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-all shadow-sm"
                >
                  <MessageCircle className="w-4 h-4" /> Order via WhatsApp
                </button>

                <button
                  onClick={closeCart}
                  className="w-full py-2 text-center text-xs font-bold text-slate-500 hover:text-slate-800 transition-colors"
                >
                  Continue Browsing
                </button>
              </div>

              <div className="pt-2 border-t border-slate-200 flex items-center justify-center gap-2 text-[10px] text-slate-400 uppercase tracking-widest">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                <span>Strictly Research Use Only (RUO)</span>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
