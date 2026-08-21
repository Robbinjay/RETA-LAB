'use client';

import Link from 'next/link';
import { Menu, X, ShoppingCart } from 'lucide-react';
import { useState } from 'react';
import { useCart } from '@/lib/cart-context';

const NAV_LINKS = [
  { href: '/', label: 'Home' },
  { href: '/retatrutide', label: 'Retatrutide' },
  { href: '/retatrutide-research', label: 'Research' },
  { href: '/retatrutide-clinical-trials', label: 'Clinical Trials' },
  { href: '/shop', label: 'Shop' },
  { href: '/retatrutide-faq', label: 'FAQ' },
];

export function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const { totalItems, openCart } = useCart();

  return (
    <header className="sticky top-0 z-50 w-full bg-white border-b border-slate-200 shadow-sm px-4 sm:px-6 lg:px-8 py-3.5 flex items-center justify-between">
      {/* Logo */}
      <div className="flex items-center space-x-2">
        <div className="w-8 h-8 bg-primary-600 rounded-lg flex items-center justify-center shadow-sm">
          <span className="text-white font-bold text-lg">R</span>
        </div>
        <Link href="/" className="text-xl font-extrabold tracking-tight text-slate-900">
          Retatrutide <span className="text-primary-600">Club</span>
        </Link>
      </div>

      {/* Desktop Navigation - Essential Links Only */}
      <nav className="hidden lg:flex items-center space-x-7 text-sm font-semibold text-slate-700" aria-label="Desktop Navigation">
        {NAV_LINKS.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className="hover:text-primary-600 transition-colors"
          >
            {link.label}
          </Link>
        ))}
      </nav>

      {/* Desktop CTA / Mobile Menu */}
      <div className="flex items-center space-x-3 sm:space-x-4">
        {/* Cart Trigger Button */}
        <button
          onClick={openCart}
          className="relative p-2.5 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-800 transition-colors flex items-center justify-center"
          aria-label="View shopping basket"
        >
          <ShoppingCart className="w-5 h-5" />
          {totalItems > 0 && (
            <span className="absolute -top-1 -right-1 w-5 h-5 bg-primary-600 text-white text-[11px] font-extrabold rounded-full flex items-center justify-center shadow-sm">
              {totalItems}
            </span>
          )}
        </button>

        <div className="hidden sm:flex items-center space-x-3">
          <Link
            href="/contact"
            className="text-sm font-semibold text-slate-700 hover:text-primary-600 px-2.5 py-2 transition-colors"
          >
            Contact
          </Link>
          <Link
            href="/shop"
            className="bg-slate-900 text-white px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider hover:bg-primary-600 transition-all shadow-sm"
          >
            Shop Peptides
          </Link>
        </div>
        
        {/* Mobile menu button */}
        <div className="flex items-center lg:hidden">
          <button
            type="button"
            className="inline-flex items-center justify-center p-2 rounded-md text-slate-500 hover:text-slate-700 hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary-600"
            aria-expanded={isOpen}
            onClick={() => setIsOpen(!isOpen)}
          >
            <span className="sr-only">{isOpen ? 'Close menu' : 'Open menu'}</span>
            {isOpen ? (
              <X className="block h-6 w-6" aria-hidden="true" />
            ) : (
              <Menu className="block h-6 w-6" aria-hidden="true" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="absolute top-[100%] left-0 w-full border-t border-slate-200 bg-white shadow-lg lg:hidden">
          <nav className="px-4 pt-3 pb-5 space-y-1" aria-label="Mobile Navigation">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="block px-3 py-2.5 rounded-lg text-base font-semibold text-slate-700 hover:text-primary-600 hover:bg-slate-50"
                onClick={() => setIsOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <div className="mt-4 pt-4 border-t border-slate-100 flex flex-col gap-2">
              <button
                onClick={() => {
                  setIsOpen(false);
                  openCart();
                }}
                className="w-full flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-bold text-slate-800 bg-slate-100 hover:bg-slate-200 rounded-lg"
              >
                <ShoppingCart className="w-4 h-4 text-primary-600" />
                View Basket ({totalItems})
              </button>
              <Link
                href="/shop"
                className="block w-full text-center px-4 py-2.5 rounded-full text-sm font-bold text-white bg-slate-900 hover:bg-primary-600 transition-colors shadow-sm"
                onClick={() => setIsOpen(false)}
              >
                Browse Shop
              </Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}

