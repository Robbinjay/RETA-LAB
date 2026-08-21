import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';

export const metadata: Metadata = {
  title: 'Blog Article | Retatrutide Club',
  description: 'Educational article from the Retatrutide Club blog.',
};

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  // Static mock check
  if (slug !== 'retatrutide-clinical-research' && slug !== 'what-is-a-retatrutide-pen') {
    notFound();
  }

  const title = slug === 'retatrutide-clinical-research' 
    ? 'Interpreting Retatrutide Clinical Research Data' 
    : 'What is a Retatrutide Pen? Device Mechanisms Explained';

  return (
    <article className="bg-white pb-24">
      {/* JSON-LD Article Schema could be dynamically inserted here */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            "headline": title,
            "author": {
              "@type": "Person",
              "name": "Dr. E. Thorne"
            },
            "datePublished": "2023-11-15T08:00:00+08:00",
          })
        }}
      />

      {/* Header */}
      <header className="pt-16 pb-10 max-w-3xl mx-auto px-6 lg:px-8 text-center">
        <nav className="text-sm font-medium text-slate-500 mb-6" aria-label="Breadcrumb">
          <ol className="inline-flex items-center space-x-2">
            <li><Link href="/" className="hover:text-slate-900">Home</Link></li>
            <li><span className="text-slate-400">/</span></li>
            <li><Link href="/blog" className="hover:text-slate-900">Blog</Link></li>
            <li><span className="text-slate-400">/</span></li>
            <li className="text-slate-900" aria-current="page">Article</li>
          </ol>
        </nav>
        <h1 className="text-4xl sm:text-5xl font-serif font-bold text-slate-900 mb-6 leading-tight">
          {title}
        </h1>
        <div className="flex items-center justify-center gap-4 text-sm text-slate-600">
          <span className="font-semibold text-slate-900">By Dr. E. Thorne, Ph.D.</span>
          <span>&bull;</span>
          <time dateTime="2023-11-15">November 15, 2023</time>
        </div>
      </header>

      {/* Featured Image */}
      <div className="max-w-5xl mx-auto px-6 lg:px-8 mb-16">
        <div className="relative w-full h-[400px] md:h-[500px] rounded-2xl overflow-hidden shadow-lg">
          <Image
            src="https://picsum.photos/seed/researchhero/1200/800"
            alt="Scientific illustration"
            fill
            className="object-cover"
            priority
            referrerPolicy="no-referrer"
          />
        </div>
      </div>

      {/* Body */}
      <div className="max-w-3xl mx-auto px-6 lg:px-8 prose prose-slate prose-lg max-w-none">
        <p className="lead text-xl text-slate-600 mb-8">
          Understanding the data behind novel metabolic therapies requires careful analysis of clinical trial endpoints and pharmacological mechanisms.
        </p>
        
        <h2>Evaluating Endpoints</h2>
        <p>
          In typical phase 2 research, researchers look for primary endpoints such as the percentage change in body weight from baseline at week 48. When analyzing literature regarding the retatrutide pen or vial studies, note the dose-dependent nature of the results.
        </p>

        <h3>Statistical Significance</h3>
        <p>
          Data reported in major journals usually includes p-values indicating statistical significance compared to placebo. It is important to distinguish between treatment-emergent adverse events (TEAEs) and actual physiological changes.
        </p>

        <div className="bg-primary-50 p-6 rounded-xl border border-primary-100 my-8 not-prose">
          <h4 className="font-bold text-primary-900 mb-2">Key Takeaways</h4>
          <ul className="space-y-2 text-primary-800 text-sm">
            <li>&bull; Always reference the original published studies.</li>
            <li>&bull; Understand the difference between absolute and relative risk.</li>
            <li>&bull; Observe the titration schedules utilized to mitigate nausea.</li>
          </ul>
        </div>

        <h2>Conclusion</h2>
        <p>
          As the landscape of metabolic research expands, understanding these metrics ensures that discussions around the retatrutide pen, dosage, and administration remain grounded in evidence-based science.
        </p>
      </div>
    </article>
  );
}
