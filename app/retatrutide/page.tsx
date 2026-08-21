import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'What is Retatrutide? | Retatrutide UK Scientific Guide',
  description: 'Learn everything about retatrutide and Retatrutide UK. Comprehensive scientific breakdown of triple receptor agonism (GLP-1, GIP, Glucagon) and UK retatrutide research findings.',
  keywords: [
    'Retatrutide UK',
    'retatrutide',
    'uk retatrutide',
    'buy retatrutide UK',
    'what is retatrutide',
    'retatrutide mechanism of action',
  ],
  alternates: {
    canonical: 'https://retaclub.co.uk/retatrutide',
  },
};

export default function RetatrutidePage() {
  return (
    <article className="pb-24 pt-10 bg-white">
      <header className="bg-slate-50 py-16 mb-12 border-b border-slate-200">
        <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
          <nav className="text-sm font-bold text-slate-500 uppercase tracking-widest mb-6" aria-label="Breadcrumb">
            <ol className="inline-flex items-center space-x-2">
              <li><Link href="/" className="hover:text-slate-900">Home</Link></li>
              <li><span className="text-slate-400">/</span></li>
              <li className="text-slate-900" aria-current="page">Retatrutide</li>
            </ol>
          </nav>
          <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-6 uppercase tracking-tight">
            What is <span className="text-primary-600">Retatrutide?</span>
          </h1>
          <p className="text-xl font-medium text-slate-600">
            The complete guide to the triple-agonist peptide revolutionizing metabolic research.
          </p>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-6 lg:px-8 prose prose-slate prose-lg max-w-none">
        <h2 className="font-extrabold uppercase tracking-tight text-slate-900">Introduction</h2>
        <p className="font-medium">
          Retatrutide (LY3437943) is a novel, investigational peptide that acts as an agonist at three distinct receptors: the glucose-dependent insulinotropic polypeptide (GIP) receptor, the glucagon-like peptide-1 (GLP-1) receptor, and the glucagon (GCG) receptor. Because of this three-pronged approach, it is often referred to as a &quot;triple G&quot; or &quot;tri-agonist.&quot;
        </p>

        <h2 className="font-extrabold uppercase tracking-tight text-slate-900">Mechanism of Action</h2>
        <p className="font-medium">
          To understand why retatrutide is generating significant interest in the scientific community, it is essential to look at how each of its target receptors functions:
        </p>
        <ul className="font-medium">
          <li><strong>GLP-1:</strong> Slows gastric emptying and signals satiety to the brain, reducing caloric intake.</li>
          <li><strong>GIP:</strong> Enhances the insulin response to meals and improves fat tissue metabolic efficiency.</li>
          <li><strong>Glucagon:</strong> Increases energy expenditure (basal metabolic rate) and promotes lipid mobilization (fat burning) in the liver.</li>
        </ul>
        <p className="font-medium">
          By combining these three actions into a single molecule, retatrutide addresses obesity and metabolic dysfunction from multiple angles, leading to synergistic effects that outpace earlier generations of single or dual agonists.
        </p>

        <h2 className="font-extrabold uppercase tracking-tight text-slate-900">Current Development Status</h2>
        <p className="font-medium">
          Retatrutide is currently in Phase 3 clinical trials (the TRIUMPH program) evaluating its efficacy and safety for obesity management, obstructive sleep apnea, and knee osteoarthritis. It has not yet been approved by the FDA, EMA, or MHRA for consumer use.
        </p>

        <h2 className="font-extrabold uppercase tracking-tight text-slate-900">Further Reading</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 not-prose mt-8">
          <Link href="/retatrutide-research" className="block p-6 bg-slate-50 border border-slate-200 rounded-xl hover:border-primary-500 transition-colors">
            <h3 className="font-bold text-slate-900 mb-2 uppercase tracking-tight">Research Data</h3>
            <p className="text-sm text-slate-600 font-medium">Explore the underlying science and published studies.</p>
          </Link>
          <Link href="/retatrutide-clinical-trials" className="block p-6 bg-slate-50 border border-slate-200 rounded-xl hover:border-primary-500 transition-colors">
            <h3 className="font-bold text-slate-900 mb-2 uppercase tracking-tight">Clinical Trials</h3>
            <p className="text-sm text-slate-600 font-medium">Review Phase 2 results and ongoing Phase 3 programs.</p>
          </Link>
          <Link href="/retatrutide-safety" className="block p-6 bg-slate-50 border border-slate-200 rounded-xl hover:border-primary-500 transition-colors">
            <h3 className="font-bold text-slate-900 mb-2 uppercase tracking-tight">Safety Profile</h3>
            <p className="text-sm text-slate-600 font-medium">Understand the known side effects and tolerability.</p>
          </Link>
          <Link href="/retatrutide-faq" className="block p-6 bg-slate-50 border border-slate-200 rounded-xl hover:border-primary-500 transition-colors">
            <h3 className="font-bold text-slate-900 mb-2 uppercase tracking-tight">Frequently Asked Questions</h3>
            <p className="text-sm text-slate-600 font-medium">Answers to common questions regarding retatrutide.</p>
          </Link>
        </div>
      </div>
    </article>
  );
}
