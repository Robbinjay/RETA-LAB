import type { Metadata } from 'next';
export const metadata: Metadata = { title: 'About Us | Retatrutide Club', alternates: { canonical: 'https://retaclub.co.uk/about' } };
export default function AboutPage() { return <article className="py-24 max-w-3xl mx-auto px-6 prose"><h1>About Retatrutide Club</h1><p>We are a dedicated group of independent researchers and medical writers.</p></article>; }
