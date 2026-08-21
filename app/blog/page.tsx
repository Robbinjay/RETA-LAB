import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';

export const metadata: Metadata = {
  title: 'Blog & Articles | Retatrutide Club',
  description: 'Latest news, educational articles, and research updates regarding Retatrutide.',
  alternates: {
    canonical: 'https://retaclub.co.uk/blog',
  }
};

const BLOG_POSTS = [
  {
    title: 'Interpreting Retatrutide Clinical Research Data',
    slug: 'retatrutide-clinical-research',
    excerpt: 'A comprehensive guide on how to read and understand the Phase 2 trial results for the novel triple-agonist.',
    date: '2023-11-15',
    category: 'Clinical Trials',
    imageUrl: 'https://picsum.photos/seed/research1/800/600',
  },
  {
    title: 'What is a Retatrutide Pen? Device Mechanisms Explained',
    slug: 'what-is-a-retatrutide-pen',
    excerpt: 'Exploring the delivery mechanisms of metabolic peptides and what the future holds for consumer auto-injectors.',
    date: '2023-12-05',
    category: 'Retatrutide Research',
    imageUrl: 'https://picsum.photos/seed/science2/800/600',
  }
];

export default function BlogPage() {
  return (
    <div className="bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h1 className="text-3xl font-serif font-bold tracking-tight text-slate-900 sm:text-4xl">
            From the Blog
          </h1>
          <p className="mt-2 text-lg leading-8 text-slate-600">
            Educational resources, scientific updates, and research analysis.
          </p>
        </div>
        
        <div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-3">
          {BLOG_POSTS.map((post) => (
            <article key={post.slug} className="flex flex-col items-start justify-between bg-slate-50 rounded-2xl overflow-hidden ring-1 ring-slate-200">
              <div className="relative w-full h-48 sm:h-64">
                <Image
                  src={post.imageUrl}
                  alt={post.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 33vw"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="p-6 sm:p-8">
                <div className="flex items-center gap-x-4 text-xs">
                  <time dateTime={post.date} className="text-slate-500">
                    {new Date(post.date).toLocaleDateString('en-GB', { month: 'long', day: 'numeric', year: 'numeric' })}
                  </time>
                  <span className="relative z-10 rounded-full bg-primary-50 px-3 py-1.5 font-medium text-primary-600">
                    {post.category}
                  </span>
                </div>
                <div className="group relative">
                  <h3 className="mt-3 text-lg font-semibold leading-6 text-slate-900 group-hover:text-primary-600">
                    <Link href={`/blog/${post.slug}`}>
                      <span className="absolute inset-0" />
                      {post.title}
                    </Link>
                  </h3>
                  <p className="mt-5 line-clamp-3 text-sm leading-6 text-slate-600">
                    {post.excerpt}
                  </p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}
