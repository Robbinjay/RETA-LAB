import type { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://retaclub.co.uk';
  const lastModified = new Date();

  const staticPages = [
    '',
    '/retatrutide',
    '/retatrutide-research',
    '/retatrutide-clinical-trials',
    '/retatrutide-safety',
    '/retatrutide-faq',
    '/retatrutide-pen',
    '/retatrutide-dosage',
    '/retatrutide-dosing',
    '/shop',
    '/research',
    '/blog',
    '/faq',
    '/about',
    '/contact',
    '/editorial-policy',
    '/sources',
    '/privacy-policy',
    '/terms-of-use',
    '/cookie-policy',
    '/shipping-policy',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified,
    changeFrequency: 'weekly' as const,
    priority: route === '' ? 1.0 : 0.8,
  }));

  // In a real application, you would fetch blog slugs from a CMS or database.
  const blogPages = [
    '/blog/retatrutide-clinical-research',
    '/blog/what-is-a-retatrutide-pen',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified,
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }));

  return [...staticPages, ...blogPages];
}
