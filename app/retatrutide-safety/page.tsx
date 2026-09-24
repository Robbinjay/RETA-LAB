import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Retatrutide Safety Profile & Side Effects Guide | Retatrutide Club',
  description: 'Detailed educational safety information on Retatrutide. Explore clinical side effects, cardiovascular impact, and tolerability data for UK retatrutide research.',
  keywords: [
    'retatrutide safety',
    'retatrutide side effects',
    'retatrutide nausea',
    'retatrutide UK safety',
    'buy retatrutide peptides',
  ],
  alternates: {
    canonical: 'https://retaclub.co.uk/retatrutide-safety',
  }
};

export default function RetatrutideSafetyPage() {
  return (
    <article className="pb-24 pt-10 bg-white">
      <header className="bg-slate-50 py-16 mb-12 border-b border-slate-200">
        <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
          <nav className="text-sm font-medium text-slate-500 mb-6" aria-label="Breadcrumb">
            <ol className="inline-flex items-center space-x-2">
              <li><Link href="/" className="hover:text-slate-900">Home</Link></li>
              <li><span className="text-slate-400">/</span></li>
              <li className="text-slate-900" aria-current="page">Safety</li>
            </ol>
          </nav>
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-slate-900 mb-6">
            Retatrutide Safety Profile
          </h1>
          <p className="text-xl text-slate-600">
            Evaluating tolerability, side effects, and risk factors in clinical studies.
          </p>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-6 lg:px-8 prose prose-slate prose-lg max-w-none">
        <div className="bg-slate-100 p-6 rounded-lg mb-8 not-prose border border-slate-200">
          <p className="text-slate-700 text-sm font-semibold">
            Note: Retatrutide is an investigational drug. The safety information provided here is based on published Phase 2 clinical trial data and is subject to change as Phase 3 TRIUMPH trial data becomes available.
          </p>
        </div>

        <h2>Gastrointestinal Tolerability</h2>
        <p>
          Similar to other incretin-based therapies (such as GLP-1 and dual GLP-1/GIP agonists), the most frequently reported adverse events associated with retatrutide are gastrointestinal in nature.
        </p>
        <ul>
          <li><strong>Nausea:</strong> The most common side effect, typically occurring during the dose escalation phase.</li>
          <li><strong>Vomiting and Diarrhea:</strong> Reported frequently, particularly at higher doses.</li>
          <li><strong>Constipation:</strong> A secondary common gastrointestinal complaint.</li>
        </ul>
        <p>
          Researchers have noted that these side effects are generally mild to moderate in severity and transient, decreasing over time as the body acclimates to the medication. Employing a strict, gradual dose escalation protocol is critical to mitigating these effects.
        </p>

        <h2>Cardiovascular Safety</h2>
        <p>
          Because retatrutide includes a glucagon receptor agonist—which can theoretically increase heart rate—cardiovascular safety is closely monitored. In Phase 2 trials, transient dose-dependent increases in heart rate were observed. However, these increases generally diminished over time, and no severe cardiovascular events were directly attributed to the drug during the 48-week trial period. Phase 3 trials are actively evaluating long-term cardiovascular outcomes.
        </p>

        <h2>Other Potential Risks</h2>
        <p>
          As with all therapies in this class, there are theoretical risks that require long-term evaluation:
        </p>
        <ul>
          <li><strong>Pancreatitis:</strong> A known risk for GLP-1 receptor agonists.</li>
          <li><strong>Gallbladder Disease:</strong> Rapid weight loss inherently increases the risk of cholelithiasis (gallstones).</li>
          <li><strong>Thyroid C-Cell Tumors:</strong> A standard warning for GLP-1 medications based on rodent studies, though the relevance to humans is still under investigation.</li>
        </ul>

        <h2>Conclusion</h2>
        <p>
          The safety profile of retatrutide currently appears consistent with the incretin class of metabolic medications. However, because it is unapproved, individuals utilizing it in independent research must exercise extreme caution and adhere strictly to established clinical dose escalation guidelines.
        </p>
      </div>
    </article>
  );
}
