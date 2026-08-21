import Link from 'next/link';
import { ArrowRight, Sparkles, Activity, Award, ShieldCheck } from 'lucide-react';
import Image from 'next/image';

export function Hero() {
  return (
    <section className="relative isolate overflow-hidden bg-slate-950 flex items-center px-6 lg:px-16 py-20 lg:py-32 min-h-[640px] lg:min-h-[720px] border-b border-slate-800">
      {/* Background Hero Image Layer - Placed directly behind the content */}
      <div className="absolute inset-0 z-0 flex items-center justify-end pointer-events-none overflow-hidden">
        {/* Ambient Glows */}
        <div className="absolute right-0 top-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-primary-500/10 rounded-full blur-3xl" />
        <div className="absolute right-1/4 top-1/3 w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-3xl" />

        {/* Primary Hero Image Asset - 80% visible */}
        <div className="relative w-full h-full max-w-5xl lg:w-3/5 lg:translate-x-8 opacity-80 transition-opacity duration-700">
          <Image
            src="/20mg-bundle-Photoroom.webp"
            alt="Retatrutide Research Hub 20mg Bundle"
            fill
            className="object-contain object-right lg:object-center drop-shadow-[0_25px_50px_rgba(0,0,0,0.9)]"
            priority
            referrerPolicy="no-referrer"
          />
        </div>

        {/* Gradient Overlays so image stays 80% visible while preserving crisp text contrast on the left */}
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/70 via-45% to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-slate-950/30" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto w-full">
        <div className="max-w-2xl lg:max-w-3xl">
          {/* Tag Badges */}
          <div className="flex flex-wrap items-center gap-2.5 mb-6">
            <span className="bg-primary-500/15 text-primary-400 text-[11px] font-extrabold tracking-[0.2em] uppercase px-3.5 py-1.5 border border-primary-500/30 rounded-full flex items-center gap-1.5 backdrop-blur-md shadow-sm">
              <Sparkles className="w-3.5 h-3.5 text-primary-400" />
              Medical Research Portal
            </span>
            <span className="text-slate-400 text-xs font-semibold uppercase tracking-widest">• Independent Info</span>
          </div>
          
          {/* Main Headline */}
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold text-white leading-[1.02] tracking-tighter mb-6">
            RETATRUTIDE <br />
            RESEARCH <span className="text-primary-400">HUB.</span>
          </h1>
          
          {/* Description */}
          <p className="text-base sm:text-lg text-slate-200 mb-8 leading-relaxed max-w-2xl font-normal drop-shadow-sm">
            Discover independent, evidence-based research on the triple-agonist peptide. Explore clinical trial data, mechanisms of action, and educational resources regarding Retatrutide. Our goal is to provide accurate scientific insights.
          </p>
          
          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 mb-10">
            <Link
              href="/retatrutide-clinical-trials"
              className="bg-primary-500 hover:bg-primary-400 text-slate-950 font-bold px-8 py-4 rounded-xl transition-all flex justify-center items-center shadow-lg shadow-primary-500/25 hover:shadow-primary-500/40 transform hover:-translate-y-0.5"
            >
              Explore Clinical Data
              <ArrowRight className="ml-2 h-5 w-5" aria-hidden="true" />
            </Link>
            <Link
              href="/retatrutide-research"
              className="bg-slate-900/80 hover:bg-slate-800 text-white font-bold px-8 py-4 rounded-xl border border-slate-700/80 backdrop-blur-md transition-all flex justify-center items-center shadow-sm"
            >
              Research Protocols
            </Link>
          </div>

          {/* Key Clinical & Purity Highlights */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-6 border-t border-slate-800/80 max-w-xl">
            <div className="flex items-center gap-3 p-3 bg-slate-900/60 backdrop-blur-md rounded-xl border border-slate-800/60">
              <div className="w-8 h-8 rounded-lg bg-primary-500/10 border border-primary-500/30 flex items-center justify-center flex-shrink-0">
                <Activity className="w-4 h-4 text-primary-400" />
              </div>
              <div>
                <div className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Weight Loss (48w)</div>
                <div className="text-base font-extrabold text-white">-24.2% Mean</div>
              </div>
            </div>

            <div className="flex items-center gap-3 p-3 bg-slate-900/60 backdrop-blur-md rounded-xl border border-slate-800/60">
              <div className="w-8 h-8 rounded-lg bg-green-500/10 border border-green-500/30 flex items-center justify-center flex-shrink-0">
                <Award className="w-4 h-4 text-green-400" />
              </div>
              <div>
                <div className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Clinical Status</div>
                <div className="text-base font-extrabold text-white">Phase III Trials</div>
              </div>
            </div>

            <div className="flex items-center gap-3 p-3 bg-slate-900/60 backdrop-blur-md rounded-xl border border-slate-800/60">
              <div className="w-8 h-8 rounded-lg bg-blue-500/10 border border-blue-500/30 flex items-center justify-center flex-shrink-0">
                <ShieldCheck className="w-4 h-4 text-blue-400" />
              </div>
              <div>
                <div className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Purity Standard</div>
                <div className="text-base font-extrabold text-white">&gt;99% Tested</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
