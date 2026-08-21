import type { Metadata } from 'next';
import { redirect } from 'next/navigation';
export const metadata: Metadata = { title: 'FAQ | Retatrutide Club', alternates: { canonical: 'https://retaclub.co.uk/faq' } };
export default function GeneralFAQPage() { redirect('/retatrutide-faq'); }
