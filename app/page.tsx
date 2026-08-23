import { Hero } from '@/components/ui/Hero';
import { UkResearchGuide } from '@/components/ui/UkResearchGuide';
import { FeaturedProducts } from '@/components/shop/FeaturedProducts';
import Link from 'next/link';
import { ArrowRight, BookOpen, ShieldCheck, Microscope } from 'lucide-react';
import type { Metadata } from 'next';
import productsData from '@/app/shop/products.json';

export const metadata: Metadata = {
  title: 'Retatrutide UK | Buy Retatrutide UK, Clinical Trials & Research Guide',
  description: 'Evidence-based portal for Retatrutide UK. Learn what retatrutide is, legal status, MHRA trial updates, and where to buy retatrutide UK for laboratory research. Full UK retatrutide insights.',
  keywords: [
    'Retatrutide UK',
    'buy retatrutide UK',
    'retatrutide',
    'uk retatrutide',
    'retatrutide peptide UK',
    'buy retatrutide online UK',
    'retatrutide research peptides',
  ],
  alternates: {
    canonical: 'https://retaclub.co.uk',
  },
};

export default function Home() {
  return (
    <>
      <Hero />
      
      {/* Global Shipping Banner */}
      <div className="bg-primary-600 text-slate-900 py-3 px-6 text-center text-sm font-bold uppercase tracking-widest flex items-center justify-center gap-2">
        <span className="relative flex h-3 w-3">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-slate-900 opacity-20"></span>
          <span className="relative inline-flex rounded-full h-3 w-3 bg-slate-900"></span>
        </span>
        Based in the UK • Shipping Worldwide • Fast Global Delivery
      </div>
      
      {/* What is Retatrutide Section */}
      <section className="py-24 bg-white border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="mx-auto max-w-3xl md:text-center">
            <h2 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-slate-900 uppercase">
              What Is <span className="text-primary-600">Retatrutide?</span>
            </h2>
            <p className="mt-6 text-lg leading-8 text-slate-600 font-medium">
              Retatrutide (LY3437943) is an investigational triple-agonist peptide currently undergoing clinical trials. 
              It is designed to target three distinct receptors: GIP, GLP-1, and Glucagon receptors, working synergistically 
              to affect energy metabolism, glucose homeostasis, and weight regulation.
            </p>
          </div>
          
          <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="flex flex-col space-y-2 p-6 bg-slate-50 rounded-xl border border-slate-200 hover:border-primary-500 transition-colors">
                <span className="text-[10px] font-bold text-primary-600 uppercase tracking-widest">Mechanism</span>
                <h3 className="font-bold text-lg text-slate-900 flex items-center gap-2">
                  <Microscope className="h-5 w-5" aria-hidden="true" />
                  Triple-Agonist
                </h3>
                <p className="text-xs text-slate-500 leading-normal flex-auto">
                  Unlike earlier generations that target only GLP-1 or GIP/GLP-1, retatrutide incorporates glucagon receptor activation, which may increase energy expenditure alongside appetite reduction.
                </p>
                <Link href="/retatrutide-research" className="text-[10px] font-bold uppercase text-primary-600 hover:underline mt-2 inline-block">
                  Learn about the mechanism →
                </Link>
              </div>

              <div className="flex flex-col space-y-2 p-6 bg-slate-50 rounded-xl border border-slate-200 hover:border-primary-500 transition-colors">
                <span className="text-[10px] font-bold text-primary-600 uppercase tracking-widest">Research Data</span>
                <h3 className="font-bold text-lg text-slate-900 flex items-center gap-2">
                  <BookOpen className="h-5 w-5" aria-hidden="true" />
                  Clinical Trials
                </h3>
                <p className="text-xs text-slate-500 leading-normal flex-auto">
                  Phase 2 trial results have demonstrated substantial weight reduction and improvements in metabolic markers, paving the way for the ongoing Phase 3 TRIUMPH clinical trial program.
                </p>
                <Link href="/retatrutide-clinical-trials" className="text-[10px] font-bold uppercase text-primary-600 hover:underline mt-2 inline-block">
                  Review trial data →
                </Link>
              </div>

              <div className="flex flex-col space-y-2 p-6 bg-slate-50 rounded-xl border border-slate-200 hover:border-primary-500 transition-colors">
                <span className="text-[10px] font-bold text-primary-600 uppercase tracking-widest">Safety Information</span>
                <h3 className="font-bold text-lg text-slate-900 flex items-center gap-2">
                  <ShieldCheck className="h-5 w-5" aria-hidden="true" />
                  Safety Profile
                </h3>
                <p className="text-xs text-slate-500 leading-normal flex-auto">
                  While promising, retatrutide is still an investigational compound. Safety data is continually being evaluated to understand its adverse event profile, particularly gastrointestinal tolerability.
                </p>
                <Link href="/retatrutide-safety" className="text-[10px] font-bold uppercase text-primary-600 hover:underline mt-2 inline-block">
                  Read safety information →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* UK Comprehensive Guide to Availability, Legality & Research Use */}
      <UkResearchGuide />

      {/* Retatrutide vs Other Research Compounds */}
      <section className="py-24 bg-slate-100 border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="mx-auto max-w-3xl md:text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-slate-900 uppercase">
              Retatrutide vs. <span className="text-primary-600">Other Peptides</span>
            </h2>
            <p className="mt-4 text-lg font-medium text-slate-600">
              Understanding the generational evolution of metabolic peptides.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="flex flex-col space-y-2 bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Single Agonist</span>
              <h3 className="font-bold text-xl text-slate-900">Semaglutide (GLP-1)</h3>
              <p className="text-xs text-slate-500 leading-normal flex-auto mt-2">Targets the GLP-1 receptor primarily to increase insulin secretion and delay gastric emptying, leading to reduced appetite.</p>
            </div>
            <div className="flex flex-col space-y-2 bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
              <span className="text-[10px] font-bold text-primary-600 uppercase tracking-widest">Dual Agonist</span>
              <h3 className="font-bold text-xl text-slate-900">Tirzepatide (GLP-1 / GIP)</h3>
              <p className="text-xs text-slate-500 leading-normal flex-auto mt-2">Targets both GLP-1 and GIP receptors, providing synergistic effects on glucose control and more substantial weight loss than single agonists.</p>
            </div>
            <div className="flex flex-col space-y-2 bg-slate-900 p-6 rounded-xl border border-primary-600 shadow-lg relative">
              <div className="absolute top-0 right-0 bg-primary-600 text-white text-[10px] font-bold px-3 py-1 rounded-bl-lg rounded-tr-xl uppercase tracking-widest">
                Investigational
              </div>
              <span className="text-[10px] font-bold text-primary-400 uppercase tracking-widest">Triple Agonist</span>
              <h3 className="font-bold text-xl text-white">Retatrutide (GLP-1 / GIP / GCGR)</h3>
              <p className="text-xs text-slate-300 leading-normal flex-auto mt-2">Adds Glucagon receptor activation to the GLP-1/GIP combination, potentially increasing resting energy expenditure and demonstrating unprecedented weight reduction in Phase 2 trials.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <FeaturedProducts
        products={productsData
          .filter((p) =>
            [
              'Retatrutide - 5mg',
              'Retatrutide - 10mg',
              'Tirzepatide (GLP-1/GIP) - 10mg',
              'Semaglutide (GLP-1) - 5mg',
              'Retatrutide - 30mg',
              'Tirzepatide (GLP-1/GIP) - 15mg',
              'Tesamorelin + Ipamorelin - 10MG (Blend)',
              'MOTS-C 40mg',
            ].includes(p.title)
          )
          .slice(0, 8)}
      />

      {/* Why Choose Us */}
      <section className="py-24 bg-slate-50 border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="mx-auto max-w-3xl md:text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-slate-900 uppercase">
              Why Choose <span className="text-primary-600">Us?</span>
            </h2>
            <p className="mt-4 text-lg font-medium text-slate-600">
              We are a premier UK-based provider of high-purity research peptides, delivering worldwide.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm text-center">
              <div className="mx-auto h-12 w-12 bg-primary-100 text-primary-600 rounded-full flex items-center justify-center mb-6">
                <ShieldCheck className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">Third-Party Tested</h3>
              <p className="text-sm text-slate-500 leading-relaxed">
                Every batch of our peptides undergoes rigorous HPLC and MS testing by independent laboratories to guarantee &gt;99% purity.
              </p>
            </div>
            
            <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm text-center">
              <div className="mx-auto h-12 w-12 bg-primary-100 text-primary-600 rounded-full flex items-center justify-center mb-6">
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">Global Shipping</h3>
              <p className="text-sm text-slate-500 leading-relaxed">
                Based in the UK, we offer fast, secure, and discreet international shipping to researchers and laboratories worldwide.
              </p>
            </div>
            
            <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm text-center">
              <div className="mx-auto h-12 w-12 bg-primary-100 text-primary-600 rounded-full flex items-center justify-center mb-6">
                <Microscope className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">Research Grade</h3>
              <p className="text-sm text-slate-500 leading-relaxed">
                Our products are strictly for research and laboratory use. We provide the high-quality compounds necessary for precise scientific studies.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Trust & Educational Disclaimer */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="bg-slate-900 rounded-3xl p-8 md:p-16 flex flex-col lg:flex-row gap-12 items-center shadow-2xl relative overflow-hidden">
            <div className="absolute inset-0 opacity-20 pointer-events-none" style={{ backgroundImage: 'radial-gradient(#0ea5e9 1px, transparent 1px)', backgroundSize: '40px 40px' }}></div>
            <div className="lg:w-2/3 relative z-10">
              <span className="text-[10px] font-bold text-primary-400 uppercase tracking-widest mb-2 block">Our Standards</span>
              <h2 className="text-4xl sm:text-5xl font-extrabold text-white uppercase tracking-tight mb-6">Commitment to <span className="text-primary-400">Evidence</span></h2>
              <p className="text-lg font-medium text-slate-300 mb-8 max-w-xl">
                Retatrutide Club adheres to strict editorial standards. Our content is thoroughly researched, citing published clinical trials, peer-reviewed medical journals, and official pharmacological data. We distinguish clearly between established evidence and emerging research.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link href="/editorial-policy" className="bg-primary-500 hover:bg-primary-400 text-slate-950 font-bold px-6 py-3 rounded-lg transition-all flex items-center">
                  Editorial Policy <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
                <Link href="/sources" className="bg-white/10 hover:bg-white/20 text-white font-bold px-6 py-3 rounded-lg border border-white/20 transition-all flex items-center">
                  View Sources <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </div>
            </div>
            <div className="lg:w-1/3 relative z-10 w-full">
              <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-6 shadow-xl">
                <h3 className="text-sm font-bold text-white flex items-center gap-2 mb-4 uppercase tracking-widest">
                  <ShieldCheck className="h-5 w-5 text-primary-400" />
                  Educational Disclaimer
                </h3>
                <p className="text-xs font-medium text-slate-300 leading-relaxed">
                  This website is for informational and educational purposes only. Retatrutide is an unapproved, investigational compound. We do not provide professional medical advice, diagnosis, or treatment recommendations.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

    </>
  );
}
