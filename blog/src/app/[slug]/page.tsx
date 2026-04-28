import { getSinglePost, getPublishedPosts } from "@/lib/notion";
import ReactMarkdown from "react-markdown";
import { notFound } from "next/navigation";
import Link from 'next/link';

export const revalidate = 60;

// Next.js static generation params for best AI/SEO
export async function generateStaticParams() {
  const posts = await getPublishedPosts();
  return posts.map((post: any) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const post = await getSinglePost(params.slug);
  if (!post) return { title: 'Post Not Found | Slice' };

  return {
    title: `${post.metadata.title} | Slice Studies`,
    description: post.metadata.description,
  };
}

export default async function BlogPost({ params }: { params: { slug: string } }) {
  const post = await getSinglePost(params.slug);

  if (!post) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-[#FDFBF7] text-[#111111] font-sans antialiased py-24 px-6 sm:px-12">
      <article className="max-w-3xl mx-auto">
        <Link href="/" className="inline-flex items-center gap-2 text-sm font-bold tracking-widest uppercase text-[#7A756C] hover:text-[#FF4500] transition-colors mb-16">
          &larr; Back to Slice Studies
        </Link>

        <header className="mb-16">
          <time className="text-sm font-bold tracking-widest uppercase text-[#A39E93] block mb-4">
            {new Date(post.metadata.date).toLocaleDateString('en-US', {
              month: 'long',
              day: 'numeric',
              year: 'numeric'
            })}
          </time>
          <h1 className="text-4xl md:text-5xl lg:text-[4rem] font-medium tracking-tight leading-[1.05] text-[#111111] mb-8">
            {post.metadata.title}
          </h1>
          <p className="text-xl text-[#7A756C] font-light leading-relaxed">
            {post.metadata.description}
          </p>
        </header>

        <div className="prose prose-lg prose-neutral max-w-none prose-headings:font-medium prose-headings:tracking-tight prose-a:text-[#FF4500] prose-a:decoration-1 prose-a:underline-offset-4 hover:prose-a:underline">
          {/* Ensure raw Markdown is hydrated on the server for pure HTML structure */}
          <ReactMarkdown>{post.markdown as string}</ReactMarkdown>
        </div>
      </article>
      
      {/* Footer / CTA padding */}
      <div className="max-w-3xl mx-auto mt-24 pt-12 border-t border-black/10">
        <div className="bg-[#111111] text-white p-10 sm:p-12 rounded-3xl text-center">
            <h3 className="text-2xl font-medium mb-4">Stop chasing creators.</h3>
            <p className="text-neutral-400 mb-8 max-w-sm mx-auto">
                Get usable UGC for $99 per video.
            </p>
            <a href="https://slice99.com" className="inline-block px-8 py-4 bg-[#FF4500] text-white font-bold rounded-xl hover:bg-[#CC3700] transition-colors shadow-lg">
                Start shipping content
            </a>
        </div>
      </div>
    </main>
  );
}
