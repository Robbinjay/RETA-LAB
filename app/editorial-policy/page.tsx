import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Editorial Policy | Retatrutide Club',
  description: 'Our editorial methodology, review process, and commitment to scientific accuracy.',
  alternates: {
    canonical: 'https://retaclub.co.uk/editorial-policy',
  }
};

export default function EditorialPolicyPage() {
  return (
    <article className="pb-24 pt-10 bg-white">
      <header className="bg-slate-50 py-16 mb-12 border-b border-slate-200">
        <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-slate-900 mb-6">
            Editorial Policy
          </h1>
          <p className="text-xl text-slate-600">
            Our commitment to independent, evidence-based research reporting.
          </p>
        </div>
      </header>

      <div className="max-w-3xl mx-auto px-6 lg:px-8 prose prose-slate prose-lg max-w-none">
        <h2>Our Mission</h2>
        <p>
          At Retatrutide Club, our mission is to provide clear, accurate, and accessible educational information regarding the investigational peptide retatrutide. We aim to bridge the gap between complex academic literature and independent research communities.
        </p>

        <h2>Editorial Methodology</h2>
        <ul>
          <li><strong>Evidence-Based:</strong> Every medical and scientific claim must be supported by published, peer-reviewed clinical trial data or official pharmacological documents.</li>
          <li><strong>Distinguishing Fact from Hypothesis:</strong> We clearly differentiate between established Phase 2 clinical evidence and ongoing Phase 3 hypotheses.</li>
          <li><strong>No Medical Advice:</strong> Our content is strictly educational. We do not provide individualized medical advice or encourage the illicit use of unapproved substances.</li>
        </ul>

        <h2>Review Process</h2>
        <p>
          Content is drafted by science writers and reviewed by our editorial board, which includes individuals with backgrounds in pharmacology and clinical research analysis. (Note: Retatrutide Club is an independent educational publisher and is not affiliated with any pharmaceutical manufacturer).
        </p>

        <h2>Corrections Policy</h2>
        <p>
          Science is constantly evolving. If new clinical data contradicts our published information, or if an error is identified, we commit to updating the relevant pages promptly and maintaining a transparent log of significant corrections.
        </p>
      </div>
    </article>
  );
}
