import { getPublishedPosts } from "@/lib/notion";
import Link from 'next/link';

export const revalidate = 60; // ISR: Revalidate every 60 seconds

export default async function BlogIndex() {
  const posts = await getPublishedPosts();

  return (
    <main className="min-h-screen bg-[#FDFBF7] text-[#111111] font-sans antialiased py-24 px-6 sm:px-12">
      <div className="max-w-4xl mx-auto">
        <header className="mb-16 border-b border-black/10 pb-12">
          <Link href="/" className="inline-block text-xl font-black tracking-tighter uppercase mb-6 hover:text-[#FF4500] transition-colors">
            SL<span className="text-[#FF4500]">/</span>CE
          </Link>
          <h1 className="text-5xl md:text-6xl font-medium tracking-tight mt-4">
            Slice Studies: <br className="hidden sm:block" /> Creator Growth.
          </h1>
          <p className="mt-6 text-xl text-[#7A756C] font-light max-w-2xl">
            Real-world case studies, creator teardowns, and the exact strategies used to scale founder-led brands through fractionalized UGC.
          </p>
        </header>

        <div className="grid gap-12">
          {posts.length === 0 ? (
            <div className="text-[#7A756C] italic">No posts found. Connect your Notion database to see content here.</div>
          ) : (
            posts.map((post: any) => (
              <article key={post.id} className="group">
                <Link href={`/${post.slug}`} className="block">
                  <div className="flex flex-col gap-3">
                    <time className="text-sm font-bold tracking-widest uppercase text-[#A39E93]">
                      {new Date(post.date).toLocaleDateString('en-US', {
                        month: 'long',
                        day: 'numeric',
                        year: 'numeric'
                      })}
                    </time>
                    <h2 className="text-2xl md:text-3xl font-medium tracking-tight group-hover:text-[#FF4500] transition-colors duration-300">
                      {post.title}
                    </h2>
                    <p className="text-lg text-[#7A756C] font-light leading-relaxed">
                      {post.description}
                    </p>
                  </div>
                </Link>
              </article>
            ))
          )}
        </div>
      </div>
    </main>
  );
}
