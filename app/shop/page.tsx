import type { Metadata } from 'next';
import { ShopCatalog } from '@/components/shop/ShopCatalog';
import productsData from './products.json';

export const metadata: Metadata = {
  title: 'Buy Retatrutide UK | High-Purity Research Peptides & Vials',
  description: 'Looking to buy retatrutide UK? Explore HPLC-tested (≥98%) research grade retatrutide vials and pens with verified CoA documentation. Fast domestic UK retatrutide dispatch.',
  keywords: [
    'buy retatrutide UK',
    'Retatrutide UK',
    'retatrutide',
    'uk retatrutide',
    'buy retatrutide 20mg',
    'retatrutide price UK',
    'research peptides UK',
  ],
  alternates: {
    canonical: 'https://retaclub.co.uk/shop',
  },
};

export default function ShopPage() {
  return (
    <div className="bg-slate-50 min-h-screen pb-24">
      {/* Global Shipping Banner */}
      <div className="bg-primary-600 text-slate-900 py-3 px-6 text-center text-sm font-bold uppercase tracking-widest flex items-center justify-center gap-2">
        <span className="relative flex h-3 w-3">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-slate-900 opacity-20"></span>
          <span className="relative inline-flex rounded-full h-3 w-3 bg-slate-900"></span>
        </span>
        Based in the UK • Shipping Worldwide • Fast Global Delivery
      </div>
      {/* Header */}
      <div className="bg-slate-900 text-white py-16 px-6 lg:px-8 border-b border-slate-800 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 pointer-events-none" style={{ backgroundImage: 'radial-gradient(#0ea5e9 1px, transparent 1px)', backgroundSize: '40px 40px' }}></div>
        <div className="max-w-7xl mx-auto relative z-10 text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold uppercase tracking-tight mb-4">
            Research <span className="text-primary-400">Shop</span>
          </h1>
          <p className="text-lg text-slate-300 font-medium max-w-2xl mx-auto">
            High-purity synthetic peptides for laboratory research and development. 
            All products undergo rigorous third-party testing.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-12">
        {/* Warning Banner */}
        <div className="bg-amber-50 border border-amber-200 rounded-xl p-6 mb-12 flex items-start gap-4 shadow-sm">
          <div className="bg-amber-100 p-2 rounded-full flex-shrink-0">
            <span className="text-amber-600 font-bold text-xl">!</span>
          </div>
          <div>
            <h3 className="font-bold text-amber-900 uppercase tracking-widest text-xs mb-1">Research Use Only</h3>
            <p className="text-sm font-medium text-amber-800 leading-relaxed">
              Products listed are for laboratory research use only. They are not intended for human consumption, diagnostic, therapeutic, or agricultural purposes.
            </p>
          </div>
        </div>

        {/* Product Catalog with Search & Filters */}
        <ShopCatalog products={productsData} />
      </div>
    </div>
  );
}
