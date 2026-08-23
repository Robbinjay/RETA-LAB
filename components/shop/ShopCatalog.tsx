'use client';

import { useState, useMemo } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  ShoppingCart,
  Search,
  Filter,
  ArrowUpDown,
  Plus,
  Check,
  Sparkles,
  ExternalLink,
  ShieldCheck,
  PackageCheck,
} from 'lucide-react';
import { useCart } from '@/lib/cart-context';

interface Product {
  id: number;
  title: string;
  price: string;
  priceNumber?: number;
  url: string;
  image: string;
  category: string;
  description: string;
}

interface ShopCatalogProps {
  products: Product[];
}

const CATEGORIES = ['All', 'Alluvi', 'Retatrutide', 'Tirzepatide', 'Semaglutide', 'Blends', 'Other Peptides'];

export function ShopCatalog({ products }: ShopCatalogProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [sortBy, setSortBy] = useState<'featured' | 'price-asc' | 'price-desc' | 'name'>('featured');
  const [addedId, setAddedId] = useState<number | null>(null);

  const { addItem, openCart, subtotal, meetsMinOrder, minOrderAmount } = useCart();

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

  const filteredProducts = useMemo(() => {
    return products
      .filter((product) => {
        const matchesCategory =
          selectedCategory === 'All' || product.category === selectedCategory;
        const matchesSearch =
          product.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          product.category.toLowerCase().includes(searchTerm.toLowerCase());
        return matchesCategory && matchesSearch;
      })
      .sort((a, b) => {
        const priceA =
          typeof a.priceNumber === 'number'
            ? a.priceNumber
            : parseFloat(a.price.replace(/[^0-9.]/g, '')) || 0;
        const priceB =
          typeof b.priceNumber === 'number'
            ? b.priceNumber
            : parseFloat(b.price.replace(/[^0-9.]/g, '')) || 0;

        if (sortBy === 'price-asc') return priceA - priceB;
        if (sortBy === 'price-desc') return priceB - priceA;
        if (sortBy === 'name') return a.title.localeCompare(b.title);
        return a.id - b.id;
      });
  }, [products, searchTerm, selectedCategory, sortBy]);

  // Quick bundle add
  const addStarterBundle = () => {
    // Bundle: Retatrutide 20mg (£70) + BAC Water 30ml (£15) + KPV 10mg (£45) = £130
    const reta = products.find((p) => p.title.toLowerCase().includes('retatrutide') && p.title.includes('20')) || products[0];
    const bac = products.find((p) => p.title.toLowerCase().includes('bacteriostatic water')) || products[7];
    const kpv = products.find((p) => p.title.toLowerCase().includes('kpv')) || products[1];

    if (reta) addItem(reta, 1);
    if (bac) addItem(bac, 1);
    if (kpv) addItem(kpv, 1);
    openCart();
  };

  return (
    <div className="space-y-8">
      
      {/* Starter Protocol Bundle Banner */}
      <div className="p-6 bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 rounded-2xl border border-slate-700 text-white shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-1.5 text-center md:text-left">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary-500/20 border border-primary-500/40 text-primary-300 text-[11px] font-bold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            Recommended Research Starter Kit
          </div>
          <h3 className="text-xl font-extrabold text-white">
            Complete Triple-Agonist & Reconstitution Bundle
          </h3>
          <p className="text-xs sm:text-sm text-slate-300 max-w-xl leading-relaxed">
            Includes Retatrutide 20mg Vial + Bacteriostatic Water 30ml + KPV 10mg Assay Control (£130.00). Instantly fulfills the £100 minimum laboratory order threshold.
          </p>
        </div>
        <button
          onClick={addStarterBundle}
          className="bg-primary-500 hover:bg-primary-400 text-slate-950 text-xs font-bold uppercase tracking-wider px-6 py-3 rounded-xl transition-all shadow-lg shadow-primary-500/25 flex items-center gap-2 whitespace-nowrap flex-shrink-0"
        >
          <PackageCheck className="w-4 h-4" />
          Add Bundle to Basket (£130.00)
        </button>
      </div>

      {/* Controls: Search, Category Filter, Sort */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-6">
        <div className="flex flex-col md:flex-row gap-4 justify-between items-stretch md:items-center">
          {/* Search Input */}
          <div className="relative flex-1">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search research peptides (e.g. Retatrutide, Tirzepatide, Semaglutide)..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:bg-white transition-all"
            />
          </div>

          {/* Sort Dropdown */}
          <div className="flex items-center gap-2">
            <ArrowUpDown className="w-4 h-4 text-slate-400" />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-xs font-bold text-slate-700 uppercase tracking-wider focus:outline-none focus:ring-2 focus:ring-primary-500"
            >
              <option value="featured">Sort: Default</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="name">Name: A to Z</option>
            </select>
          </div>
        </div>

        {/* Category Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          <Filter className="w-4 h-4 text-slate-400 mr-1 flex-shrink-0" />
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider whitespace-nowrap transition-all ${
                selectedCategory === cat
                  ? 'bg-slate-900 text-white shadow-sm'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200 hover:text-slate-900'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Results Count & Minimum Order Notice */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 px-1">
        <span className="text-xs font-bold uppercase tracking-widest text-slate-500">
          Showing {filteredProducts.length} {filteredProducts.length === 1 ? 'Product' : 'Products'}
        </span>
        <div className="flex items-center gap-2 text-xs text-slate-500 font-medium">
          <ShieldCheck className="w-4 h-4 text-primary-600" />
          <span>Minimum Order Amount: <strong>£100.00 GBP</strong> (RUO Compliance)</span>
        </div>
      </div>

      {/* Product Grid */}
      {filteredProducts.length === 0 ? (
        <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center">
          <p className="text-base font-bold text-slate-700 mb-2">No research products found</p>
          <p className="text-xs text-slate-400 mb-6">Try adjusting your search query or category filter</p>
          <button
            onClick={() => {
              setSearchTerm('');
              setSelectedCategory('All');
            }}
            className="bg-slate-900 text-white text-xs font-bold uppercase tracking-wider px-5 py-2.5 rounded-lg hover:bg-primary-600 transition-colors"
          >
            Clear Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredProducts.map((product) => {
            const isAdded = addedId === product.id;
            return (
              <div
                key={product.id}
                className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden hover:shadow-lg hover:border-primary-400 transition-all flex flex-col group"
              >
                {/* Product Image */}
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
                </div>

                {/* Product Content */}
                <div className="p-5 flex flex-col flex-grow">
                  <div className="flex flex-col gap-1 mb-2">
                    <h3 className="font-bold text-base text-slate-900 leading-snug line-clamp-2">
                      {product.title}
                    </h3>
                    <div className="flex items-baseline gap-2">
                      <span className="font-extrabold text-primary-600 text-xl">
                        {product.price}
                      </span>
                      <span className="text-[10px] uppercase font-bold text-slate-400">
                        GBP
                      </span>
                    </div>
                  </div>

                  <p className="text-xs font-medium text-slate-500 mb-5 flex-grow leading-relaxed line-clamp-2">
                    {product.description}
                  </p>

                  {/* Actions */}
                  <div className="space-y-2 pt-2 border-t border-slate-100">
                    <button
                      onClick={(e) => handleAddToCart(e, product)}
                      className={`w-full py-2.5 px-4 rounded-xl font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all ${
                        isAdded
                          ? 'bg-emerald-600 text-white shadow-md'
                          : 'bg-primary-600 hover:bg-primary-500 text-white shadow-sm hover:shadow'
                      }`}
                    >
                      {isAdded ? (
                        <>
                          <Check className="w-4 h-4" /> Added to Basket!
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
      )}
    </div>
  );
}
