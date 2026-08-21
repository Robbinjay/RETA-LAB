import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Retatrutide Clinical Trials | Retatrutide Club',
  description: 'Detailed overview of Phase 2 and Phase 3 (TRIUMPH) clinical trials for Retatrutide.',
  alternates: {
    canonical: 'https://retaclub.co.uk/retatrutide-clinical-trials',
  }
};

export default function RetatrutideClinicalTrialsPage() {
  return (
    <article className="pb-24 pt-10 bg-white">
      <header className="bg-slate-50 py-16 mb-12 border-b border-slate-200">
        <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
          <nav className="text-sm font-bold text-slate-500 uppercase tracking-widest mb-6" aria-label="Breadcrumb">
            <ol className="inline-flex items-center space-x-2">
              <li><Link href="/" className="hover:text-slate-900">Home</Link></li>
              <li><span className="text-slate-400">/</span></li>
              <li className="text-slate-900" aria-current="page">Clinical Trials</li>
            </ol>
          </nav>
          <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-6 uppercase tracking-tight">
            Retatrutide <span className="text-primary-600">Clinical Trials</span>
          </h1>
          <p className="text-xl font-medium text-slate-600">
            Evaluating the Phase 2 data and the ongoing Phase 3 TRIUMPH program.
          </p>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-6 lg:px-8 prose prose-slate prose-lg max-w-none">
        <h2 className="font-extrabold uppercase tracking-tight text-slate-900">Phase 2 Trial Overview</h2>
        <p className="font-medium">
          The Phase 2 study for retatrutide evaluating its effects on obesity was a landmark trial that demonstrated the power of triple-agonist therapy. The randomized, double-blind, placebo-controlled trial assigned adults with a BMI of 30 or higher (or 27+ with at least one weight-related condition) to receive various doses of retatrutide or a placebo.
        </p>

        <h3 className="font-bold uppercase tracking-tight text-slate-900">Key Phase 2 Findings</h3>
        <ul className="font-medium">
          <li><strong>Weight Reduction:</strong> Participants receiving the highest dose (12 mg weekly) achieved a mean weight reduction of approximately 24.2% at 48 weeks.</li>
          <li><strong>Cardiometabolic Improvements:</strong> Significant improvements were noted in blood pressure, lipid profiles, and glycemic control.</li>
          <li><strong>Hepatic Steatosis:</strong> In a sub-study of patients with non-alcoholic fatty liver disease (NAFLD), retatrutide normalized liver fat in a vast majority of participants within 48 weeks.</li>
        </ul>

        <h2 className="font-extrabold uppercase tracking-tight text-slate-900">The TRIUMPH Phase 3 Program</h2>
        <p className="font-medium">
          Following the success of Phase 2, the clinical program advanced to Phase 3, known collectively as the TRIUMPH studies. These trials are designed to evaluate the safety and efficacy of retatrutide across broader populations and longer durations.
        </p>

        <h3 className="font-bold uppercase tracking-tight text-slate-900">Ongoing Studies</h3>
        <ul className="font-medium">
          <li><strong>TRIUMPH-1:</strong> Evaluating retatrutide in participants with obesity or overweight without type 2 diabetes.</li>
          <li><strong>TRIUMPH-2:</strong> Specifically focusing on participants with both obesity/overweight and type 2 diabetes.</li>
          <li><strong>TRIUMPH-3:</strong> Evaluating the drug in patients with severe obesity and established cardiovascular disease.</li>
          <li><strong>TRIUMPH-4:</strong> Assessing impacts on obstructive sleep apnea and osteoarthritis.</li>
        </ul>

        <h2 className="font-extrabold uppercase tracking-tight text-slate-900">Implications for Future Treatment</h2>
        <p className="font-medium">
          If the Phase 3 TRIUMPH trials confirm the safety and efficacy observed in Phase 2, retatrutide could become the most potent pharmacological intervention for obesity to date, potentially bridging the gap between medical therapy and bariatric surgery.
        </p>
      </div>
    </article>
  );
}
