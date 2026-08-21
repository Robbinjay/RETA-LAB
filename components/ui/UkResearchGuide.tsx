'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  ShieldAlert,
  CheckCircle2,
  AlertTriangle,
  Scale,
  Building2,
  PoundSterling,
  Microscope,
  FileText,
  Truck,
  Sparkles,
  ChevronRight,
  ExternalLink,
  HelpCircle,
  Layers,
  ArrowRight,
} from 'lucide-react';

interface PricingTier {
  strength: string;
  priceRange: string;
  recommendedFor: string;
  formats: string[];
  popular?: boolean;
}

const PRICING_TIERS: PricingTier[] = [
  {
    strength: '10mg Vial',
    priceRange: '£33 – £55',
    recommendedFor: 'Initial assay calibrations & pilot in vitro studies',
    formats: ['Lyophilised Powder', 'Standard 3ml Vial'],
  },
  {
    strength: '20mg Vial',
    priceRange: '£50 – £90',
    recommendedFor: 'Standard multi-cycle cellular assays & comparative trials',
    formats: ['Lyophilised Powder', 'Multi-dose Research Vial'],
    popular: true,
  },
  {
    strength: '30mg Vial',
    priceRange: '£119 – £130',
    recommendedFor: 'Extended duration protocol batches & longitudinal runs',
    formats: ['Lyophilised Powder', 'High-concentration Vial'],
  },
  {
    strength: '40mg Vial',
    priceRange: 'From ~£154',
    recommendedFor: 'High-throughput laboratory series & institutional testing',
    formats: ['Lyophilised Powder', 'Bulk Research Specimen'],
  },
];

const SUPPLIERS = [
  {
    name: 'Peptides UK 4U',
    strengths: '20mg, 30mg, 40mg vials',
    dispatch: 'Same-day UK dispatch',
    verified: 'HPLC batch verified',
  },
  {
    name: 'Pure Lab UK',
    strengths: '20mg research vials',
    dispatch: 'Tracked UK courier',
    verified: 'Third-party HPLC >99%',
  },
  {
    name: 'RS Bio Labs',
    strengths: 'All 8 formulation strengths',
    dispatch: 'Free UK shipping over threshold',
    verified: 'Full CoA documentation',
  },
  {
    name: 'Revexa & Peak Peptides',
    strengths: 'Standard & high-concentration vials',
    dispatch: 'UK domestic inventory',
    verified: 'Analytical purity certified',
  },
  {
    name: 'Everblue, UK Peptides & R&D Peptides',
    strengths: 'Lyophilised vials & cartridge formats',
    dispatch: 'Express dispatch',
    verified: 'Laboratory research grade only',
  },
];

const BUYER_CRITERIA = [
  {
    id: 'purity',
    icon: CheckCircle2,
    title: 'Purity & Verification',
    summary: 'HPLC ≥98% with Batch-Specific Certificate of Analysis (CoA)',
    description:
      'Reputable UK suppliers provide third-party tested retatrutide with High-Performance Liquid Chromatography (HPLC) purity of 98% or higher. Every batch must have an authenticated Certificate of Analysis confirming molecular identity, purity, and lack of heavy metal or peptide truncations.',
    badge: 'Standard: ≥98% Purity',
  },
  {
    id: 'formats',
    icon: Layers,
    title: 'Strengths & Formats',
    summary: 'Lyophilised Vials (10mg–40mg) & Research Cartridges',
    description:
      'Supplied primarily as a lyophilised (freeze-dried) powder for reconstitution in laboratory reagents like bacteriostatic water. Common vial strengths in the UK include 10mg, 20mg, 30mg, and 40mg. Pre-filled research pens and replacement cartridges are also available from specialized providers.',
    badge: '10mg / 20mg / 30mg / 40mg',
  },
  {
    id: 'dispatch',
    icon: Truck,
    title: 'UK Stock & Rapid Dispatch',
    summary: 'Domestic UK Warehousing to Prevent Customs Delays',
    description:
      'Choosing vendors with direct stock held in the UK guarantees same-day or next-day tracked dispatch. This ensures temperature-stable transit, eliminates import customs seizures or VAT delays, and ensures product integrity.',
    badge: 'Same/Next Day UK Delivery',
  },
  {
    id: 'compliance',
    icon: Scale,
    title: 'Research Use Only (RUO)',
    summary: 'Clear Scientific Lab Disclaimers & Strict Non-Human Use',
    description:
      'All legitimate UK suppliers strictly market retatrutide for in vitro laboratory and scientific testing. Packaging, labeling, and documentation must clearly state "Research Use Only – Not For Human Consumption".',
    badge: 'Strict Laboratory Compliance',
  },
];

const RECEPTOR_TARGETS = [
  {
    target: 'GLP-1 Receptor',
    role: 'Appetite signalling, delayed gastric transit, glucose-dependent insulin secretion',
    comparison: 'Shared with Semaglutide & Tirzepatide',
  },
  {
    target: 'GIP Receptor',
    role: 'Synergistic metabolic regulation, insulinotropic response, improved lipid handling',
    comparison: 'Shared with Tirzepatide (Dual Agonist)',
  },
  {
    target: 'Glucagon (GCGR)',
    role: 'Elevated energy expenditure, increased hepatic lipid oxidation, thermogenesis',
    comparison: 'Exclusive Triple Agonist mechanism in Retatrutide',
  },
];

export function UkResearchGuide() {
  const [activeTab, setActiveTab] = useState<'overview' | 'legal' | 'buyer' | 'pricing' | 'research'>('overview');
  const [selectedCriteria, setSelectedCriteria] = useState<string>('purity');

  return (
    <section className="py-20 lg:py-24 bg-slate-950 text-slate-100 border-t border-slate-800" id="uk-retatrutide-guide">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary-500/10 border border-primary-500/30 text-primary-400 text-xs font-bold uppercase tracking-widest mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            UK Comprehensive Scientific Guide
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight mb-4">
            Retatrutide UK: <span className="text-primary-400">Availability, Legality</span> & Research Use
          </h2>
          <p className="text-base sm:text-lg text-slate-300 leading-relaxed font-normal">
            Retatrutide UK has become one of the most searched terms in the metabolic research space. This evidence-based guide outlines its investigational profile, UK legal status, laboratory sourcing standards, pricing benchmarks, and scientific applications.
          </p>
        </div>

        {/* Interactive Navigation Pills */}
        <div className="flex flex-wrap gap-2 mb-10 pb-4 border-b border-slate-800">
          {[
            { id: 'overview', label: '1. What is Retatrutide?' },
            { id: 'legal', label: '2. UK Legality & MHRA Status' },
            { id: 'buyer', label: '3. Buyer Quality Checklist' },
            { id: 'pricing', label: '4. UK Pricing & Suppliers' },
            { id: 'research', label: '5. Research Pathways' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as typeof activeTab)}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all ${
                activeTab === tab.id
                  ? 'bg-primary-500 text-slate-950 shadow-md shadow-primary-500/20'
                  : 'bg-slate-900 text-slate-400 hover:text-white hover:bg-slate-800 border border-slate-800'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* TAB 1: OVERVIEW */}
        {activeTab === 'overview' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start animate-fadeIn">
            <div className="lg:col-span-7 space-y-6">
              <div className="p-6 sm:p-8 bg-slate-900/80 rounded-2xl border border-slate-800 backdrop-blur-sm">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-primary-500/10 border border-primary-500/30 flex items-center justify-center text-primary-400">
                    <Microscope className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white">Investigational Triple Receptor Agonist</h3>
                    <p className="text-xs text-slate-400">Targeting GLP-1, GIP, and Glucagon Receptors</p>
                  </div>
                </div>
                <p className="text-sm sm:text-base text-slate-300 leading-relaxed mb-4">
                  Retatrutide is an investigational triple receptor agonist that targets <strong>GLP-1, GIP, and glucagon receptors simultaneously</strong>. This triple-action mechanism sets it apart from earlier single and dual agonist metabolic compounds, generating significant scientific interest in obesity and diabetes research.
                </p>
                <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
                  Retatrutide is currently being evaluated in clinical trial programs and has not yet received marketing authorization from the <strong>MHRA (Medicines and Healthcare products Regulatory Agency)</strong> for use as a licensed medicine in the United Kingdom.
                </p>
              </div>

              <div className="p-6 bg-slate-900/60 rounded-2xl border border-slate-800/80 flex items-start gap-4">
                <AlertTriangle className="w-6 h-6 text-amber-400 flex-shrink-0 mt-0.5" />
                <div className="text-sm text-slate-300 leading-relaxed">
                  <strong className="text-amber-300 block mb-1 font-bold">Strict Laboratory Reagent Designation:</strong>
                  As an investigational compound, retatrutide in the UK is supplied strictly as a laboratory research material. It is not approved, intended, or authorized for human consumption or therapeutic administration outside authorized clinical trial settings.
                </div>
              </div>
            </div>

            <div className="lg:col-span-5 space-y-4">
              <div className="bg-gradient-to-br from-slate-900 to-slate-900/90 p-6 rounded-2xl border border-slate-800 shadow-xl">
                <h4 className="text-xs font-extrabold uppercase tracking-widest text-primary-400 mb-4">
                  Quick Facts Snapshot
                </h4>
                <dl className="space-y-3.5 text-xs">
                  <div className="flex justify-between py-2 border-b border-slate-800">
                    <dt className="text-slate-400 font-medium">Compound Classification</dt>
                    <dd className="font-bold text-white text-right">Triple Receptor Agonist</dd>
                  </div>
                  <div className="flex justify-between py-2 border-b border-slate-800">
                    <dt className="text-slate-400 font-medium">UK MHRA Status</dt>
                    <dd className="font-bold text-amber-400 text-right">Investigational (Unapproved)</dd>
                  </div>
                  <div className="flex justify-between py-2 border-b border-slate-800">
                    <dt className="text-slate-400 font-medium">UK Purchase Legality</dt>
                    <dd className="font-bold text-green-400 text-right">Legal for Lab Research</dd>
                  </div>
                  <div className="flex justify-between py-2 border-b border-slate-800">
                    <dt className="text-slate-400 font-medium">Controlled Substance</dt>
                    <dd className="font-bold text-slate-200 text-right">No (Non-Scheduled)</dd>
                  </div>
                  <div className="flex justify-between py-2">
                    <dt className="text-slate-400 font-medium">Authorized Human Pathway</dt>
                    <dd className="font-bold text-primary-400 text-right">NIHR Clinical Trials Only</dd>
                  </div>
                </dl>
              </div>

              <div className="p-5 bg-primary-500/10 border border-primary-500/20 rounded-2xl">
                <div className="text-xs font-bold text-primary-300 uppercase tracking-wider mb-2">
                  Clinical Trial Search
                </div>
                <p className="text-xs text-slate-300 mb-3 leading-relaxed">
                  The only lawful route to receive retatrutide for human use in the UK is via an authorized clinical trial searchable on the official NIHR platform.
                </p>
                <a
                  href="https://bepartofresearch.nihr.ac.uk"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center text-xs font-bold text-primary-400 hover:text-primary-300 gap-1.5"
                >
                  Search NIHR Trials <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: LEGAL & MHRA STATUS */}
        {activeTab === 'legal' && (
          <div className="space-y-8 animate-fadeIn">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              {/* Not a licensed medicine */}
              <div className="p-6 sm:p-7 bg-red-950/20 border border-red-900/40 rounded-2xl">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-red-500/20 border border-red-500/30 flex items-center justify-center text-red-400">
                    <ShieldAlert className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-white">Not a Licensed UK Medicine</h3>
                    <span className="text-xs font-semibold text-red-400 uppercase tracking-wider">No Marketing Authorisation</span>
                  </div>
                </div>
                <ul className="space-y-2.5 text-sm text-slate-300">
                  <li className="flex items-start gap-2">
                    <span className="text-red-400 font-bold">•</span>
                    <span><strong>Cannot be prescribed on the NHS:</strong> No NHS reimbursement or prescription framework exists.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-400 font-bold">•</span>
                    <span><strong>Cannot be prescribed privately:</strong> UK registered doctors cannot issue commercial prescriptions for retatrutide.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-400 font-bold">•</span>
                    <span><strong>Cannot be dispensed:</strong> GPhC registered pharmacies in the UK do not stock or dispense retatrutide.</span>
                  </li>
                </ul>
              </div>

              {/* Legal for Laboratory Research */}
              <div className="p-6 sm:p-7 bg-green-950/20 border border-green-900/40 rounded-2xl">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-green-500/20 border border-green-500/30 flex items-center justify-center text-green-400">
                    <Scale className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-white">Legal for Scientific Research</h3>
                    <span className="text-xs font-semibold text-green-400 uppercase tracking-wider">Research Chemical Status</span>
                  </div>
                </div>
                <ul className="space-y-2.5 text-sm text-slate-300">
                  <li className="flex items-start gap-2">
                    <span className="text-green-400 font-bold">•</span>
                    <span><strong>Not a controlled drug:</strong> It is not listed under the Misuse of Drugs Act 1971.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-400 font-bold">•</span>
                    <span><strong>Legal possession for lab work:</strong> UK researchers and laboratories may legally purchase and possess it for in vitro experiments.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-400 font-bold">•</span>
                    <span><strong>Certificate of Analysis standard:</strong> Legitimate suppliers supply batch-verified CoA documents confirming purity and identity.</span>
                  </li>
                </ul>
              </div>

            </div>

            {/* MHRA Official Position Callout */}
            <div className="p-6 sm:p-8 bg-slate-900 rounded-2xl border border-slate-800">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-amber-500/10 border border-amber-500/30 rounded-xl text-amber-400 flex-shrink-0">
                  <AlertTriangle className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="text-base font-bold text-white mb-2">
                    Official MHRA Regulatory Guidance
                  </h4>
                  <p className="text-sm text-slate-300 leading-relaxed mb-4">
                    The MHRA has stated plainly that any product sold in the UK claiming to contain retatrutide for therapeutic or human use outside of an authorized clinical trial is likely to be unlicensed, illegal, and potentially dangerous. Legitimate UK suppliers sell retatrutide strictly as a research chemical for laboratory investigation.
                  </p>
                  <div className="flex flex-wrap gap-4 text-xs font-bold">
                    <Link
                      href="/retatrutide-safety"
                      className="inline-flex items-center text-primary-400 hover:text-primary-300 gap-1"
                    >
                      Read Full Safety & Regulatory Data <ChevronRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: BUYER CHECKLIST */}
        {activeTab === 'buyer' && (
          <div className="space-y-8 animate-fadeIn">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              
              {/* Left Column: Interactive Selector */}
              <div className="lg:col-span-5 space-y-3">
                <p className="text-xs uppercase font-extrabold tracking-wider text-slate-400 mb-2">
                  Key Verification Standards
                </p>
                {BUYER_CRITERIA.map((criterion) => {
                  const Icon = criterion.icon;
                  const isSelected = selectedCriteria === criterion.id;
                  return (
                    <button
                      key={criterion.id}
                      onClick={() => setSelectedCriteria(criterion.id)}
                      className={`w-full text-left p-4 rounded-xl border transition-all flex items-center justify-between ${
                        isSelected
                          ? 'bg-slate-900 border-primary-500/60 shadow-lg shadow-primary-500/10'
                          : 'bg-slate-900/40 border-slate-800 hover:bg-slate-900 hover:border-slate-700'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div className={`p-2 rounded-lg ${isSelected ? 'bg-primary-500 text-slate-950' : 'bg-slate-800 text-slate-400'}`}>
                          <Icon className="w-4 h-4" />
                        </div>
                        <div>
                          <div className={`text-sm font-bold ${isSelected ? 'text-white' : 'text-slate-300'}`}>
                            {criterion.title}
                          </div>
                          <div className="text-[11px] text-slate-400 font-normal line-clamp-1">
                            {criterion.summary}
                          </div>
                        </div>
                      </div>
                      <ChevronRight className={`w-4 h-4 transition-transform ${isSelected ? 'text-primary-400 translate-x-1' : 'text-slate-600'}`} />
                    </button>
                  );
                })}
              </div>

              {/* Right Column: Detailed Criteria Panel */}
              <div className="lg:col-span-7">
                {(() => {
                  const activeItem = BUYER_CRITERIA.find((c) => c.id === selectedCriteria) || BUYER_CRITERIA[0];
                  const Icon = activeItem.icon;
                  return (
                    <div className="p-6 sm:p-8 bg-slate-900 rounded-2xl border border-slate-800 h-full flex flex-col justify-between shadow-xl">
                      <div>
                        <div className="flex items-center justify-between mb-4">
                          <span className="px-3 py-1 rounded-full bg-primary-500/15 border border-primary-500/30 text-primary-300 text-xs font-bold uppercase tracking-wider">
                            {activeItem.badge}
                          </span>
                          <span className="text-xs text-slate-400 uppercase tracking-widest font-semibold">
                            Laboratory Standard
                          </span>
                        </div>
                        <div className="flex items-center gap-3 mb-4">
                          <div className="p-2.5 rounded-xl bg-primary-500/20 text-primary-400">
                            <Icon className="w-6 h-6" />
                          </div>
                          <h3 className="text-2xl font-bold text-white">{activeItem.title}</h3>
                        </div>
                        <p className="text-sm sm:text-base text-slate-300 leading-relaxed mb-6 font-normal">
                          {activeItem.description}
                        </p>
                      </div>

                      <div className="pt-6 border-t border-slate-800/80 flex flex-wrap items-center justify-between gap-4">
                        <div className="text-xs text-slate-400">
                          Looking for HPLC-verified research peptides?
                        </div>
                        <Link
                          href="/shop"
                          className="bg-primary-500 hover:bg-primary-400 text-slate-950 font-bold px-4 py-2 rounded-xl text-xs uppercase tracking-wider transition-all inline-flex items-center gap-1.5"
                        >
                          Browse Verified Catalog <ArrowRight className="w-3.5 h-3.5" />
                        </Link>
                      </div>
                    </div>
                  );
                })()}
              </div>

            </div>
          </div>
        )}

        {/* TAB 4: PRICING & SUPPLIERS */}
        {activeTab === 'pricing' && (
          <div className="space-y-10 animate-fadeIn">
            
            {/* Pricing Matrix */}
            <div>
              <div className="mb-6 flex flex-col sm:flex-row sm:items-end justify-between gap-2">
                <div>
                  <h3 className="text-xl font-bold text-white">UK Retatrutide Market Pricing Overview</h3>
                  <p className="text-xs text-slate-400">Average UK research peptide market rates by vial strength</p>
                </div>
                <div className="text-xs text-primary-400 font-semibold">
                  *Research Grade Lyophilised Vials
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                {PRICING_TIERS.map((tier) => (
                  <div
                    key={tier.strength}
                    className={`p-6 rounded-2xl border flex flex-col justify-between transition-all ${
                      tier.popular
                        ? 'bg-slate-900 border-primary-500 shadow-xl shadow-primary-500/10 relative'
                        : 'bg-slate-900/60 border-slate-800 hover:border-slate-700'
                    }`}
                  >
                    {tier.popular && (
                      <span className="absolute -top-3 left-6 bg-primary-500 text-slate-950 text-[10px] font-extrabold uppercase tracking-widest px-2.5 py-0.5 rounded-full">
                        Most Researched
                      </span>
                    )}
                    <div>
                      <div className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-1">
                        {tier.strength}
                      </div>
                      <div className="text-2xl sm:text-3xl font-extrabold text-white mb-3">
                        {tier.priceRange}
                      </div>
                      <p className="text-xs text-slate-300 leading-relaxed mb-4">
                        {tier.recommendedFor}
                      </p>
                    </div>
                    <div className="pt-4 border-t border-slate-800/80">
                      <div className="text-[10px] uppercase font-bold text-slate-400 mb-2">Available Formats:</div>
                      <div className="flex flex-wrap gap-1.5">
                        {tier.formats.map((f) => (
                          <span
                            key={f}
                            className="bg-slate-800/80 text-slate-300 text-[10px] font-medium px-2 py-0.5 rounded"
                          >
                            {f}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* UK Suppliers Directory */}
            <div className="p-6 sm:p-8 bg-slate-900 rounded-2xl border border-slate-800">
              <div className="max-w-2xl mb-6">
                <div className="inline-flex items-center gap-1.5 text-xs font-bold text-primary-400 uppercase tracking-widest mb-1">
                  <Building2 className="w-3.5 h-3.5" />
                  Where to Buy Retatrutide UK
                </div>
                <h3 className="text-xl font-bold text-white mb-2">UK Laboratory Supplier Landscape</h3>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-normal">
                  Retatrutide is distributed by UK-based research peptide suppliers specialising in laboratory-grade compounds. Prominent vendors providing domestic dispatch and scientific verification include:
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
                {SUPPLIERS.map((s) => (
                  <div key={s.name} className="p-4 bg-slate-950/60 rounded-xl border border-slate-800/80 flex flex-col justify-between">
                    <div>
                      <div className="font-bold text-white text-sm mb-1">{s.name}</div>
                      <div className="text-xs text-primary-400 font-medium mb-2">{s.strengths}</div>
                    </div>
                    <div className="space-y-1 pt-2 border-t border-slate-800/60 text-[11px] text-slate-400">
                      <div className="flex items-center gap-1.5">
                        <Truck className="w-3 h-3 text-slate-400" />
                        <span>{s.dispatch}</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <CheckCircle2 className="w-3 h-3 text-green-400" />
                        <span>{s.verified}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="p-4 bg-slate-950/80 rounded-xl border border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
                <span className="text-slate-400 text-center sm:text-left">
                  All listed suppliers provide retatrutide exclusively for scientific research, accompanied by non-human use disclaimers.
                </span>
                <Link
                  href="/shop"
                  className="bg-primary-500 hover:bg-primary-400 text-slate-950 font-bold px-4 py-2 rounded-lg uppercase tracking-wider whitespace-nowrap transition-all"
                >
                  Visit Peptide Shop
                </Link>
              </div>
            </div>

          </div>
        )}

        {/* TAB 5: RESEARCH APPLICATIONS */}
        {activeTab === 'research' && (
          <div className="space-y-8 animate-fadeIn">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              
              <div className="lg:col-span-7 space-y-6">
                <div className="p-6 sm:p-8 bg-slate-900 rounded-2xl border border-slate-800">
                  <h3 className="text-xl font-bold text-white mb-4">
                    Metabolic Research & In Vitro Protocols
                  </h3>
                  <p className="text-sm sm:text-base text-slate-300 leading-relaxed mb-4">
                    Retatrutide is studied in research models for its distinct regulation of <strong>glucose metabolism, appetite signalling pathways, and lipid and body composition dynamics</strong>. It is frequently evaluated in comparative literature alongside dual agonists like Tirzepatide.
                  </p>
                  <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
                    Researchers utilize retatrutide in in vitro experiments to understand concurrent activation of all three metabolic receptors. The compound is supplied as a lyophilised powder that must be reconstituted with sterile bacteriostatic solvent in accordance with standard laboratory protocols before assay preparation.
                  </p>
                </div>

                <div className="p-6 bg-slate-900/60 rounded-2xl border border-slate-800">
                  <h4 className="text-sm font-bold text-white mb-3">Reconstitution & Laboratory Handling</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-slate-300">
                    <div className="p-3 bg-slate-950 rounded-xl border border-slate-800/80">
                      <strong className="text-primary-400 block mb-1">Lyophilised State:</strong>
                      Store unopened vials at -20°C for long-term stability or 2°C–8°C for short-term benchtop storage.
                    </div>
                    <div className="p-3 bg-slate-950 rounded-xl border border-slate-800/80">
                      <strong className="text-primary-400 block mb-1">Reconstitution Reagents:</strong>
                      Reconstitute with bacteriostatic water (0.9% benzyl alcohol) avoiding rapid vortexing.
                    </div>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-5 space-y-4">
                <div className="p-6 bg-slate-900 rounded-2xl border border-slate-800">
                  <h4 className="text-xs font-extrabold uppercase tracking-widest text-primary-400 mb-4">
                    Triple-Agonist Receptor Targets
                  </h4>
                  <div className="space-y-3">
                    {RECEPTOR_TARGETS.map((target) => (
                      <div key={target.target} className="p-3.5 bg-slate-950 rounded-xl border border-slate-800/80">
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-sm font-bold text-white">{target.target}</span>
                          <span className="text-[10px] uppercase font-bold text-primary-400 bg-primary-500/10 px-2 py-0.5 rounded">
                            Active
                          </span>
                        </div>
                        <p className="text-xs text-slate-300 leading-snug mb-1.5">{target.role}</p>
                        <span className="text-[10px] text-slate-400 italic block">{target.comparison}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="p-5 bg-gradient-to-br from-primary-950/40 to-slate-900 rounded-2xl border border-primary-500/30">
                  <div className="text-xs font-bold text-primary-300 uppercase tracking-wider mb-1">
                    Calculate Reconstitution Ratios
                  </div>
                  <p className="text-xs text-slate-300 mb-3">
                    Need precise vial volume and milligram calculations for laboratory reconstitutions?
                  </p>
                  <Link
                    href="/retatrutide-dosage"
                    className="inline-flex items-center text-xs font-bold text-white bg-primary-500 hover:bg-primary-400 text-slate-950 px-3.5 py-1.5 rounded-lg transition-all"
                  >
                    Open Dosage & Reconstitution Tool <ChevronRight className="w-3.5 h-3.5 ml-1" />
                  </Link>
                </div>
              </div>

            </div>
          </div>
        )}

        {/* Bottom Educational Summary Callout Box */}
        <div className="mt-12 p-6 sm:p-8 bg-gradient-to-r from-slate-900 via-slate-900 to-slate-950 rounded-2xl border border-slate-800 flex flex-col lg:flex-row items-center justify-between gap-6">
          <div className="space-y-1 max-w-2xl">
            <h4 className="text-base sm:text-lg font-bold text-white">
              Summary & Research Responsibility
            </h4>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-normal">
              Retatrutide UK represents a frontier in metabolic research as an investigational triple agonist. Always verify third-party Certificates of Analysis, adhere strictly to in vitro laboratory protocols, and note that human use remains restricted exclusively to authorized clinical trials.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-3 flex-shrink-0">
            <Link
              href="/retatrutide-clinical-trials"
              className="bg-white/10 hover:bg-white/20 text-white font-bold px-5 py-2.5 rounded-xl border border-white/20 text-xs uppercase tracking-wider transition-all"
            >
              Clinical Trial Studies
            </Link>
            <Link
              href="/shop"
              className="bg-primary-500 hover:bg-primary-400 text-slate-950 font-bold px-5 py-2.5 rounded-xl text-xs uppercase tracking-wider transition-all shadow-md shadow-primary-500/20"
            >
              Explore Shop
            </Link>
          </div>
        </div>

      </div>
    </section>
  );
}
