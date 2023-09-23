import type { Metadata } from 'next';
import Link from 'next/link';
import { allBlogs } from 'contentlayer/generated';
import ViewCounter from './view-counter';
import { getViewsCount } from 'lib/metrics';

export const metadata: Metadata = {
  title: 'Blog',
  description: 'Read my thoughts on software development, design, and more.',
};

export default function BlogPage() {
  const [allViews, setAllViews] = React.useState<number | null>(null);

  React.useEffect(() => {
    const fetchViewsCount = async () => {
      const views = await getViewsCount();
      setAllViews(views);
    };

    fetchViewsCount();
  }, []);

  return (
    <section>
      <h1 className="font-bold text-2xl mb-8 tracking-tighter">read my blog</h1>
      {allBlogs
        .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime())
        .map((post) => (
          <Link key={post.slug} href={`/blog/${post.slug}`}>
            <a className="flex flex-col space-y-1 mb-4">
              <div className="w-full flex flex-col">
                <p className="text-neutral-900 dark:text-neutral-100 tracking-tight">
                  {post.title}
                </p>
                <ViewCounter
                  allViews={allViews}
                  slug={post.slug}
                  trackView={false}
                />
              </div>
            </a>
          </Link>
        ))}
    </section>
  );
}