import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, AlertCircle } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Retatrutide Dosage & Dosing Protocols | Retatrutide Club',
  description: 'Educational guide on retatrutide dosage, clinical trial dosing protocols, and dose escalation schedules.',
  alternates: {
    canonical: 'https://retaclub.co.uk/retatrutide-dosage',
  }
};

export default function RetatrutideDosagePage() {
  return (
    <article className="pb-24 pt-10 bg-white">
      {/* Header */}
      <header className="bg-slate-50 py-16 mb-12 border-b border-slate-200">
        <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
          <nav className="text-sm font-bold text-slate-500 uppercase tracking-widest mb-6" aria-label="Breadcrumb">
            <ol className="inline-flex items-center space-x-2">
              <li><Link href="/" className="hover:text-slate-900">Home</Link></li>
              <li><span className="text-slate-400">/</span></li>
              <li className="text-slate-900" aria-current="page">Retatrutide Dosage</li>
            </ol>
          </nav>
          <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-6 uppercase tracking-tight">
            Retatrutide Dosage &amp; <span className="text-primary-600">Dosing Information</span>
          </h1>
          <p className="text-xl font-medium text-slate-600">
            Understanding clinical dose escalation, research protocols, and self-administration concepts.
          </p>
        </div>
      </header>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-6 lg:px-8 prose prose-slate prose-lg max-w-none">
        
        <div className="bg-primary-50 border-l-4 border-primary-500 p-6 rounded-r-lg mb-10 not-prose">
          <div className="flex gap-4">
            <AlertCircle className="h-6 w-6 text-primary-600 flex-shrink-0" />
            <div>
              <h3 className="font-bold text-primary-900 mb-1 uppercase tracking-widest text-xs">Medical Disclaimer</h3>
              <p className="text-primary-800 text-sm leading-relaxed font-medium">
                The individualized dosing instructions and self-administration protocols detailed below are provided strictly for educational and research reference. Retatrutide is an investigational compound. You must consult a qualified healthcare professional before beginning any new treatment. 
              </p>
            </div>
          </div>
        </div>

        <h2 className="font-extrabold uppercase tracking-tight text-slate-900">Understanding Retatrutide Dosing</h2>
        <p className="font-medium">
          In clinical settings, retatrutide dosing follows a strict dose-escalation protocol. This approach is designed to mitigate gastrointestinal side effects—such as nausea and vomiting—by allowing the body to acclimate to the triple-agonist mechanism targeting the GLP-1, GIP, and Glucagon receptors.
        </p>

        <h3 className="font-bold uppercase tracking-tight text-slate-900">Clinical Trial Dose Escalation Protocol</h3>
        <p className="font-medium">
          Based on published Phase 2 data, researchers typically begin with a low starting dose and gradually increase it every 4 weeks. A standard research protocol observed in trials includes:
        </p>
        <ul className="font-medium">
          <li><strong>Weeks 1–4 (Initiation):</strong> 2 mg subcutaneously once weekly.</li>
          <li><strong>Weeks 5–8 (Escalation 1):</strong> 4 mg once weekly.</li>
          <li><strong>Weeks 9–12 (Escalation 2):</strong> 6 mg once weekly (optional intermediate step).</li>
          <li><strong>Weeks 13–16 (Escalation 3):</strong> 8 mg once weekly.</li>
          <li><strong>Weeks 17+ (Maintenance):</strong> 8 mg or 12 mg once weekly, depending on individual response and tolerability.</li>
        </ul>

        <h2 className="font-extrabold uppercase tracking-tight text-slate-900">Individualized Dosing Instructions</h2>
        <p className="font-medium">
          To determine an individualized dose, researchers and clinicians evaluate starting weight, metabolic markers, and prior exposure to GLP-1/GIP therapies. Below is an educational framework for understanding how an individual might self-administer a prescribed dose.
        </p>

        <div className="bg-slate-50 border border-slate-200 p-8 rounded-xl my-8 not-prose">
          <h4 className="font-bold text-xl text-slate-900 mb-4 uppercase tracking-tight">Preparation and Administration Steps</h4>
          <ol className="space-y-4 text-slate-700 list-decimal list-inside font-medium">
            <li><strong>Inspect the Vial/Pen:</strong> Ensure the retatrutide solution is clear and colorless. Do not use if particulate matter is visible.</li>
            <li><strong>Gather Supplies:</strong> You will need the retatrutide vial/pen, an alcohol swab, and a proper subcutaneous syringe if not using a pre-filled pen.</li>
            <li><strong>Prepare the Injection Site:</strong> Choose a subcutaneous site (abdomen, thigh, or upper arm). Clean the area with an alcohol swab and let it dry.</li>
            <li><strong>Draw/Dial the Dose:</strong> If using a pen, dial to the prescribed dose (e.g., 2mg). If using a vial, carefully draw the exact volume required for your dose using a sterile syringe.</li>
            <li><strong>Administer:</strong> Pinch the skin, insert the needle at a 90-degree angle (or 45 degrees if very lean), and inject the medication steadily. Hold for 5-10 seconds before withdrawing.</li>
            <li><strong>Dispose:</strong> Place the used needle/syringe in a sharps disposal container.</li>
          </ol>
        </div>

        <h3 className="font-bold uppercase tracking-tight text-slate-900">Dosage vs. Dosing</h3>
        <p className="font-medium">
          While often used interchangeably, &quot;dosage&quot; typically refers to the total amount of medication prescribed over a period (e.g., the regimen), whereas &quot;dosing&quot; refers to the specific amount taken at a single time (e.g., 2mg on Monday). Understanding this distinction is crucial when interpreting clinical trial data and research protocols.
        </p>

        <div className="mt-12 not-prose">
          <Link href="/retatrutide-pen" className="inline-flex items-center justify-center rounded-lg bg-slate-900 px-8 py-4 text-sm font-bold text-white shadow-sm hover:bg-primary-700 transition-all uppercase tracking-wide">
            Learn About the Retatrutide Pen <ArrowRight className="ml-2 h-5 w-5" />
          </Link>
        </div>
      </div>
    </article>
  );
}
