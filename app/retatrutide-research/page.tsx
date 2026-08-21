import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Retatrutide Research | Retatrutide Club',
  description: 'Deep dive into the latest research, studies, and mechanisms of action surrounding the triple-agonist Retatrutide.',
  alternates: {
    canonical: 'https://retaclub.co.uk/retatrutide-research',
  }
};

export default function RetatrutideResearchPage() {
  return (
    <article className="pb-24 pt-10 bg-white">
      <header className="bg-slate-50 py-16 mb-12 border-b border-slate-200">
        <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
          <nav className="text-sm font-bold text-slate-500 uppercase tracking-widest mb-6" aria-label="Breadcrumb">
            <ol className="inline-flex items-center space-x-2">
              <li><Link href="/" className="hover:text-slate-900">Home</Link></li>
              <li><span className="text-slate-400">/</span></li>
              <li className="text-slate-900" aria-current="page">Research</li>
            </ol>
          </nav>
          <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-6 uppercase tracking-tight">
            Retatrutide <span className="text-primary-600">Research</span>
          </h1>
          <p className="text-xl font-medium text-slate-600">
            A deep dive into the underlying science and published academic studies.
          </p>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-6 lg:px-8 prose prose-slate prose-lg max-w-none">
        <h2 className="font-extrabold uppercase tracking-tight text-slate-900">Metabolic Research Paradigm Shift</h2>
        <p className="font-medium">
          Retatrutide represents a significant paradigm shift in metabolic research. While dual agonists (like tirzepatide) showed that combining GLP-1 and GIP could yield better results than GLP-1 alone, researchers hypothesized that adding glucagon receptor agonism could further optimize energy metabolism.
        </p>

        <h3 className="font-bold uppercase tracking-tight text-slate-900">The Role of Glucagon in Weight Management</h3>
        <p className="font-medium">
          Historically, glucagon was viewed primarily as a counter-regulatory hormone to insulin—raising blood sugar. However, modern metabolic research has uncovered its role in increasing resting energy expenditure and promoting hepatic lipid oxidation. The challenge in drug design was balancing glucagon&apos;s hyper-glycemic effects with the insulinotropic (blood sugar lowering) effects of GLP-1 and GIP.
        </p>
        
        <h2 className="font-extrabold uppercase tracking-tight text-slate-900">Published Literature</h2>
        <p className="font-medium">
          Significant studies published in top-tier journals (such as the New England Journal of Medicine) have documented the effects of retatrutide in human subjects:
        </p>
        <ul className="font-medium">
          <li><strong>Phase 2 Obesity Trial:</strong> Demonstrated unprecedented mean weight reduction (up to 24% at 48 weeks) at the highest doses.</li>
          <li><strong>NAFLD/NASH Sub-studies:</strong> Showed remarkable clearance of hepatic steatosis (liver fat) in subjects within a short timeframe, strongly driven by the glucagon component.</li>
        </ul>

        <h2 className="font-extrabold uppercase tracking-tight text-slate-900">Future Research Directions</h2>
        <p className="font-medium">
          Ongoing research is focused on determining long-term cardiovascular outcomes, impacts on osteoarthritis due to weight unloading, and the management of obstructive sleep apnea.
        </p>
      </div>
    </article>
  );
}
