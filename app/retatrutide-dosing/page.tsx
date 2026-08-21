import type { Metadata } from 'next';
import Link from 'next/link';
import { DosageCalculator } from '@/components/ui/DosageCalculator';

export const metadata: Metadata = {
  title: 'Retatrutide Dosing & Calculator | Retatrutide Club',
  description: 'Learn how to calculate and administer retatrutide dosing for research protocols.',
  alternates: {
    canonical: 'https://retaclub.co.uk/retatrutide-dosing',
  }
};

export default function RetatrutideDosingPage() {
  return (
    <article className="pb-24 pt-10 bg-white">
      <header className="bg-slate-50 py-16 mb-12 border-b border-slate-200">
        <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
          <nav className="text-sm font-medium text-slate-500 mb-6" aria-label="Breadcrumb">
            <ol className="inline-flex items-center space-x-2">
              <li><Link href="/" className="hover:text-slate-900">Home</Link></li>
              <li><span className="text-slate-400">/</span></li>
              <li className="text-slate-900" aria-current="page">Retatrutide Dosing</li>
            </ol>
          </nav>
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-slate-900 mb-6">
            Retatrutide Dosing &amp; Self-Administration
          </h1>
          <p className="text-xl text-slate-600">
            Dosing guidelines, clinical protocols, and administration calculators.
          </p>
        </div>
      </header>

      <div className="max-w-5xl mx-auto px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-12">
        <div className="lg:col-span-7 prose prose-slate prose-lg max-w-none">
          <h2>Dosage vs. Dosing: Understanding the Terminology</h2>
          <p>
            When discussing metabolic peptides, precise terminology is vital. <strong>Dosage</strong> generally refers to the overarching medical regimen or total prescribed amount over a specific period. <strong>Dosing</strong> refers to the act of administering a specific amount at a specific time.
          </p>
          <p>
            For example, the dosage protocol for retatrutide involves a 4-week escalation schedule. The specific dosing action is administering 2mg on a given day.
          </p>

          <h3>Clinical Research Protocols</h3>
          <p>
            Current clinical trials emphasize the necessity of stepping up the dose. This minimizes adverse gastrointestinal effects. Attempting to start at a high dose (e.g., 8mg) without the escalation phase is contraindicated.
          </p>
          
          <h3>Self-Administration Guide</h3>
          <p>
            For subjects participating in research, administration follows standard subcutaneous injection protocols:
          </p>
          <ul>
            <li>Wash hands thoroughly.</li>
            <li>Reconstitute the lyophilized peptide with bacteriostatic water if using vials.</li>
            <li>Clean the injection site (abdomen or thigh) with an alcohol swab.</li>
            <li>Using an insulin syringe, draw the exact volume required for your dose.</li>
            <li>Inject subcutaneously at a 45 to 90-degree angle.</li>
            <li>Dispose of the syringe in a sharps container.</li>
          </ul>
        </div>
        
        <div className="lg:col-span-5">
          <div className="sticky top-24">
            <DosageCalculator />
          </div>
        </div>
      </div>
    </article>
  );
}
