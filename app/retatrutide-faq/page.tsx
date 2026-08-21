import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Retatrutide FAQ | Retatrutide Club',
  description: 'Frequently asked questions regarding retatrutide research, clinical trials, and pharmacology.',
  alternates: {
    canonical: 'https://retaclub.co.uk/retatrutide-faq',
  }
};

const FAQS = [
  {
    question: "What makes Retatrutide different from Semaglutide or Tirzepatide?",
    answer: "Semaglutide is a single agonist (GLP-1), Tirzepatide is a dual agonist (GLP-1 and GIP), and Retatrutide is a triple agonist targeting GLP-1, GIP, and Glucagon receptors. The addition of the glucagon receptor theoretically increases resting energy expenditure."
  },
  {
    question: "Is Retatrutide FDA approved?",
    answer: "No. Retatrutide is currently an investigational drug undergoing Phase 3 clinical trials. It has not been approved for human consumption by the FDA or any other regulatory body."
  },
  {
    question: "How much weight loss was observed in Phase 2 trials?",
    answer: "In Phase 2 clinical trials, participants on the highest dose (12 mg) experienced a mean weight reduction of approximately 24.2% over 48 weeks."
  },
  {
    question: "What is the standard dosing protocol?",
    answer: "Clinical protocols utilize a 4-week step-up escalation to mitigate side effects. A common research protocol starts at 2mg weekly for 4 weeks, escalating to 4mg for 4 weeks, and continuing to step up based on tolerability."
  },
  {
    question: "What are the most common side effects?",
    answer: "The most commonly reported adverse events in clinical trials were gastrointestinal, including nausea, diarrhea, vomiting, and constipation. These effects were generally dose-dependent and transient."
  }
];

export default function RetatrutideFAQPage() {
  return (
    <article className="pb-24 pt-10 bg-white">
      {/* FAQ Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": FAQS.map(faq => ({
              "@type": "Question",
              "name": faq.question,
              "acceptedAnswer": {
                "@type": "Answer",
                "text": faq.answer
              }
            }))
          })
        }}
      />

      <header className="bg-slate-50 py-16 mb-12 border-b border-slate-200">
        <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
          <nav className="text-sm font-medium text-slate-500 mb-6" aria-label="Breadcrumb">
            <ol className="inline-flex items-center space-x-2">
              <li><Link href="/" className="hover:text-slate-900">Home</Link></li>
              <li><span className="text-slate-400">/</span></li>
              <li className="text-slate-900" aria-current="page">FAQ</li>
            </ol>
          </nav>
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-slate-900 mb-6">
            Frequently Asked Questions
          </h1>
          <p className="text-xl text-slate-600">
            Answers to common questions about the triple-agonist peptide.
          </p>
        </div>
      </header>

      <div className="max-w-3xl mx-auto px-6 lg:px-8">
        <dl className="space-y-8 divide-y divide-slate-200">
          {FAQS.map((faq, index) => (
            <div key={index} className="pt-8 lg:grid lg:grid-cols-12 lg:gap-8">
              <dt className="text-base font-semibold leading-7 text-slate-900 lg:col-span-5">
                {faq.question}
              </dt>
              <dd className="mt-4 lg:col-span-7 lg:mt-0">
                <p className="text-base leading-7 text-slate-600">{faq.answer}</p>
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </article>
  );
}
