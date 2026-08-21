'use client';

import { useState } from 'react';
import { Calculator, ArrowRight, Info } from 'lucide-react';

export function DosageCalculator() {
  const [weight, setWeight] = useState<string>('');
  const [phase, setPhase] = useState<string>('initiation');
  const [result, setResult] = useState<{ dose: string; volume: string; instruction: string } | null>(null);

  const calculateDose = (e: React.FormEvent) => {
    e.preventDefault();
    
    // This is an educational/demonstration calculation
    let recommendedDose = '2.0';
    let instructionText = 'Administer once weekly. This is the standard starting dose to allow the body to acclimate.';
    
    if (phase === 'escalation1') {
      recommendedDose = '4.0';
      instructionText = 'Administer once weekly. Standard escalation after 4 weeks of the 2mg dose.';
    } else if (phase === 'escalation2') {
      recommendedDose = '8.0';
      instructionText = 'Administer once weekly. Advanced escalation step for continued research efficacy.';
    } else if (phase === 'maintenance') {
      recommendedDose = '12.0';
      instructionText = 'Administer once weekly. Maximum evaluated maintenance dose in current clinical trials.';
    }

    // Assuming a standard reconstitution of 10mg per 1ml (100 units) for calculation demo
    const volumeInUnits = (parseFloat(recommendedDose) / 10) * 100;

    setResult({
      dose: `${recommendedDose} mg`,
      volume: `${volumeInUnits} units (0.${volumeInUnits} mL)`,
      instruction: instructionText,
    });
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
      <div className="bg-slate-900 p-6 md:p-8 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-20 pointer-events-none" style={{ backgroundImage: 'radial-gradient(#0ea5e9 1px, transparent 1px)', backgroundSize: '20px 20px' }}></div>
        <div className="relative z-10">
          <span className="text-[10px] font-bold text-primary-400 uppercase tracking-widest mb-2 block">Interactive Tool</span>
          <h3 className="text-3xl font-extrabold flex items-center gap-3 uppercase tracking-tight">
            <Calculator className="h-8 w-8 text-primary-400" />
            Dosage Calculator
          </h3>
          <p className="mt-2 text-slate-300 text-sm font-medium">
            Calculate individualized dose volumes and convert research quantities into administration protocols.
          </p>
        </div>
      </div>
      
      <div className="p-6 md:p-8">
        <form onSubmit={calculateDose} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="weight" className="block text-xs font-bold text-slate-900 uppercase tracking-widest mb-2">
                Subject Weight (kg)
              </label>
              <input
                type="number"
                id="weight"
                value={weight}
                onChange={(e) => setWeight(e.target.value)}
                placeholder="e.g. 85"
                className="w-full px-4 py-3 rounded-md border border-slate-300 focus:ring-2 focus:ring-primary-600 focus:border-primary-600 text-slate-900 font-medium bg-slate-50"
                required
              />
            </div>
            
            <div>
              <label htmlFor="phase" className="block text-xs font-bold text-slate-900 uppercase tracking-widest mb-2">
                Protocol Phase
              </label>
              <select
                id="phase"
                value={phase}
                onChange={(e) => setPhase(e.target.value)}
                className="w-full px-4 py-3 rounded-md border border-slate-300 focus:ring-2 focus:ring-primary-600 focus:border-primary-600 text-slate-900 font-medium bg-slate-50"
              >
                <option value="initiation">Initiation (Weeks 1-4)</option>
                <option value="escalation1">Escalation 1 (Weeks 5-8)</option>
                <option value="escalation2">Escalation 2 (Weeks 9-16)</option>
                <option value="maintenance">Maintenance (Weeks 17+)</option>
              </select>
            </div>
          </div>

          <div className="bg-primary-50 p-4 rounded-lg border border-primary-100 flex gap-3 text-sm text-primary-800 font-medium">
            <Info className="h-5 w-5 text-primary-600 flex-shrink-0" />
            <p>
              Assumes standard research preparation of 10mg retatrutide reconstituted with 1mL bacteriostatic water.
            </p>
          </div>

          <button
            type="submit"
            className="w-full inline-flex justify-center items-center rounded-lg bg-slate-900 px-6 py-4 text-base font-bold text-white shadow-sm hover:bg-primary-700 transition-colors uppercase tracking-wide"
          >
            Calculate Administration Dose
            <ArrowRight className="ml-2 h-5 w-5" />
          </button>
        </form>

        {result && (
          <div className="mt-8 p-6 bg-slate-50 border border-slate-200 rounded-xl animate-in fade-in slide-in-from-bottom-4 duration-500">
            <h4 className="text-[10px] font-bold text-primary-600 uppercase tracking-widest mb-4 border-b border-slate-200 pb-2">
              Recommended Protocol
            </h4>
            
            <dl className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <dt className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-1">Target Dose</dt>
                <dd className="text-4xl font-extrabold text-slate-900">{result.dose}</dd>
              </div>
              <div>
                <dt className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-1">Syringe Draw Volume</dt>
                <dd className="text-4xl font-extrabold text-slate-900">{result.volume}</dd>
              </div>
            </dl>

            <div>
              <h5 className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">Instructions</h5>
              <p className="text-slate-700 bg-white p-4 rounded-lg border border-slate-200 text-sm font-medium leading-relaxed">
                {result.instruction} Please verify all calculations before proceeding with administration.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
