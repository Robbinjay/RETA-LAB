import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Sources & References | Retatrutide Club',
  description: 'A compiled list of authoritative clinical trials, journals, and scientific sources used across our website.',
  alternates: {
    canonical: 'https://retaclub.co.uk/sources',
  }
};

export default function SourcesPage() {
  return (
    <article className="pb-24 pt-10 bg-white">
      <header className="bg-slate-50 py-16 mb-12 border-b border-slate-200">
        <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-slate-900 mb-6">
            Sources &amp; References
          </h1>
          <p className="text-xl text-slate-600">
            Authoritative clinical data backing our educational content.
          </p>
        </div>
      </header>

      <div className="max-w-3xl mx-auto px-6 lg:px-8 prose prose-slate prose-lg max-w-none">
        <p>
          Retatrutide Club relies on primary literature and peer-reviewed journals. Below is a selected bibliography of foundational studies informing our content.
        </p>

        <h2>Primary Clinical Trials (Phase 2)</h2>
        <ul className="space-y-4">
          <li>
            <strong>Retatrutide, a GIP, GLP-1 and glucagon receptor agonist, for people with type 2 diabetes: a randomised, double-blind, placebo and active-controlled, parallel-group, phase 2 trial conducted in the USA.</strong><br/>
            <em>The Lancet</em>. Published: June 26, 2023.
          </li>
          <li>
            <strong>Triple-Hormone-Receptor Agonist Retatrutide for Obesity — A Phase 2 Trial.</strong><br/>
            <em>The New England Journal of Medicine (NEJM)</em>. Published: June 26, 2023.
          </li>
        </ul>

        <h2>Pharmacology and Mechanisms</h2>
        <ul className="space-y-4">
          <li>
            <strong>LY3437943, a novel triple GIP, GLP-1, and glucagon receptor agonist in people with type 2 diabetes: a phase 1b, multicentre, double-blind, placebo-controlled, randomised, multiple-ascending dose trial.</strong><br/>
            <em>The Lancet</em>. 2022.
          </li>
          <li>
            <strong>The role of glucagon in energy expenditure and hepatic lipid metabolism.</strong><br/>
            Various systemic reviews detailing the independent effects of GCGR agonism.
          </li>
        </ul>

        <h2>Ongoing Research (Phase 3 TRIUMPH)</h2>
        <p>
          Information regarding the Phase 3 TRIUMPH clinical trial program is sourced directly from clinical registry databases (e.g., ClinicalTrials.gov) under the identifier prefixes for the respective TRIUMPH 1-4 studies.
        </p>
      </div>
    </article>
  );
}
