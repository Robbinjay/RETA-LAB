import Link from 'next/link';

const FOOTER_COLUMNS = [
  {
    title: 'Research & Trials',
    links: [
      { href: '/retatrutide', label: 'Mechanism of Action' },
      { href: '/retatrutide-clinical-trials', label: 'Phase III Trial Data' },
      { href: '/retatrutide-research', label: 'Research Protocols' },
      { href: '/retatrutide-safety', label: 'Safety & Tolerability' },
    ],
  },
  {
    title: 'Portal & Shop',
    links: [
      { href: '/shop', label: 'Peptide Shop' },
      { href: '/retatrutide-dosage', label: 'Dosage Calculator' },
      { href: '/blog', label: 'Research Blog' },
      { href: '/retatrutide-faq', label: 'Frequently Asked Questions' },
    ],
  },
  {
    title: 'Trust & Standards',
    links: [
      { href: '/sources', label: 'Scientific Sources' },
      { href: '/editorial-policy', label: 'Editorial Standards' },
      { href: '/about', label: 'About Retatrutide Club' },
      { href: 'https://wa.me/447888391589', label: 'WhatsApp Support' },
      { href: '/contact', label: 'Contact Support' },
    ],
  },
  {
    title: 'Legal & Policies',
    links: [
      { href: '/privacy-policy', label: 'Privacy Policy' },
      { href: '/terms-of-use', label: 'Terms of Use' },
      { href: '/cookie-policy', label: 'Cookie Policy' },
      { href: '/shipping-policy', label: 'Shipping Policy' },
    ],
  },
];

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-slate-950 text-slate-300 border-t border-slate-800 pt-16 pb-10" aria-labelledby="footer-heading">
      <h2 id="footer-heading" className="sr-only">
        Footer
      </h2>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Brand Banner */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between pb-12 mb-12 border-b border-slate-800/80 gap-6">
          <div className="space-y-2 max-w-xl">
            <div className="flex items-center space-x-2.5">
              <div className="w-8 h-8 bg-primary-600 rounded-lg flex items-center justify-center shadow-sm">
                <span className="text-white font-bold text-lg">R</span>
              </div>
              <Link href="/" className="text-xl font-extrabold tracking-tight text-white">
                Retatrutide <span className="text-primary-500">Club</span>
              </Link>
            </div>
            <p className="text-sm text-slate-400 leading-relaxed">
              Independent, evidence-based portal providing peer-reviewed clinical research and education on next-generation peptide science.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Link
              href="/shop"
              className="bg-primary-500 hover:bg-primary-400 text-slate-950 px-5 py-2.5 rounded-full text-xs font-extrabold tracking-wide uppercase transition-all shadow-sm"
            >
              Browse Shop
            </Link>
            <Link
              href="/contact"
              className="bg-slate-900 hover:bg-slate-800 border border-slate-700 text-white px-5 py-2.5 rounded-full text-xs font-bold tracking-wide uppercase transition-all"
            >
              Contact Us
            </Link>
          </div>
        </div>

        {/* 4 Equal-Level Link Columns */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 lg:gap-10 pb-12 border-b border-slate-800/80">
          {FOOTER_COLUMNS.map((column) => (
            <div key={column.title} className="flex flex-col h-full">
              <h3 className="text-xs font-bold uppercase tracking-wider text-white mb-5 pb-2 border-b border-slate-800/50">
                {column.title}
              </h3>
              <ul role="list" className="space-y-3.5 flex-1">
                {column.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-slate-400 hover:text-primary-400 transition-colors inline-block leading-snug"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Medical Disclaimer */}
        <div className="pt-8 pb-6">
          <div className="bg-slate-900/60 border border-slate-800/80 rounded-xl p-4 sm:p-5">
            <p className="text-xs text-slate-400 leading-relaxed">
              <strong className="text-slate-300">Medical Disclaimer:</strong> The information provided on this website is for educational and scientific research purposes only. It is not intended as medical advice, diagnosis, or treatment. Always consult a qualified medical professional before making any health decisions.
            </p>
          </div>
        </div>
        
        {/* Bottom Bar */}
        <div className="pt-4 flex flex-col md:flex-row justify-between items-center text-xs text-slate-500 gap-3">
          <p>
            &copy; {currentYear} Retatrutide Club. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <Link href="/email-diagnostics" className="hover:text-slate-400 transition-colors">
              Zoho SMTP Status
            </Link>
            <span>•</span>
            <p>
              Committed to independent, evidence-based research reporting.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
