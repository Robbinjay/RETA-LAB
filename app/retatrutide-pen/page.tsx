import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Retatrutide Pen Guide | Retatrutide Club',
  description: 'Understand what a retatrutide pen is, how it differs from vials, and important safety information regarding online claims.',
  alternates: {
    canonical: 'https://retaclub.co.uk/retatrutide-pen',
  }
};

export default function RetatrutidePenPage() {
  return (
    <article className="pb-24 pt-10 bg-white">
      <header className="bg-slate-50 py-16 mb-12 border-b border-slate-200">
        <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
          <nav className="text-sm font-bold text-slate-500 uppercase tracking-widest mb-6" aria-label="Breadcrumb">
            <ol className="inline-flex items-center space-x-2">
              <li><Link href="/" className="hover:text-slate-900">Home</Link></li>
              <li><span className="text-slate-400">/</span></li>
              <li className="text-slate-900" aria-current="page">Retatrutide Pen</li>
            </ol>
          </nav>
          <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-6 uppercase tracking-tight">
            The Retatrutide <span className="text-primary-600">Pen</span>
          </h1>
          <p className="text-xl font-medium text-slate-600">
            Educational information on delivery methods, terminology, and verification.
          </p>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-6 lg:px-8 prose prose-slate prose-lg max-w-none">
        <h2 className="font-extrabold uppercase tracking-tight text-slate-900">What is a Retatrutide Pen?</h2>
        <p className="font-medium">
          In online discussions and clinical contexts, the term &quot;retatrutide pen&quot; refers to a pre-filled, multi-dose or single-dose auto-injector device containing the retatrutide peptide in a liquid solution. These devices are modeled after existing GLP-1 pens (like those used for Semaglutide or Tirzepatide) designed for ease of self-administration.
        </p>

        <h3 className="font-bold uppercase tracking-tight text-slate-900">Pens vs. Vials in Research</h3>
        <p className="font-medium">
          While pharmaceutical companies develop proprietary pen devices for final consumer market approval, independent researchers often utilize lyophilized (freeze-dried) powder in sterile glass vials. 
        </p>
        <ul className="font-medium">
          <li><strong>Pens:</strong> Pre-mixed, precise dialing mechanisms, convenient, typically utilized in formal Phase 3 clinical trials and commercial distribution.</li>
          <li><strong>Vials:</strong> Require reconstitution with bacteriostatic water, necessitate manual drawing with insulin syringes, widely used in early-phase research and independent studies.</li>
        </ul>

        <div className="bg-slate-50 border border-slate-200 p-8 rounded-xl my-8 not-prose">
          <h3 className="text-xl font-bold text-slate-900 mb-4 uppercase tracking-tight">Verifying Claims &amp; Products</h3>
          <p className="text-slate-700 mb-4 font-medium">
            Because retatrutide remains an unapproved investigational drug, any product marketed directly to consumers as a &quot;retatrutide pen&quot; requires intense scrutiny.
          </p>
          <ul className="space-y-3 text-slate-700 font-medium">
            <li className="flex items-start">
              <span className="text-primary-600 font-bold mr-2">•</span>
              Verify third-party testing (COAs) for purity and quantity.
            </li>
            <li className="flex items-start">
              <span className="text-primary-600 font-bold mr-2">•</span>
              Understand that unauthorized compounding pharmacies may lack proper regulatory oversight.
            </li>
            <li className="flex items-start">
              <span className="text-primary-600 font-bold mr-2">•</span>
              Always consult clinical guidelines and healthcare professionals before sourcing peptides.
            </li>
          </ul>
        </div>

        <h2 className="font-extrabold uppercase tracking-tight text-slate-900">How to Obtain and Prepare</h2>
        <p className="font-medium">
          As the site provides educational information and supplies research materials, obtaining retatrutide currently involves sourcing from dedicated peptide synthesis laboratories or authorized clinical trials. 
          When preparing the compound from a vial, it involves maintaining a sterile environment, utilizing the correct volume of bacteriostatic water for reconstitution, and ensuring the lyophilized powder dissolves completely without aggressive shaking.
        </p>

        <h2 className="font-extrabold uppercase tracking-tight text-slate-900">Administration</h2>
        <p className="font-medium">
          Subcutaneous administration is the standard route. Using a pen device involves attaching a fresh pen needle, dialing to the prescribed dose, and injecting into the subcutaneous fat layer (typically the abdomen or thigh). Hold the button for several seconds to ensure the full dose is delivered. 
        </p>
      </div>
    </article>
  );
}
