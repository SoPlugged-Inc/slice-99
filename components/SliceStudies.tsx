import React, { useState, useEffect } from 'react';
import { ArrowLeft, ExternalLink, Clock, User, ChevronRight } from 'lucide-react';

interface Post {
    id: string;
    title: string;
    slug: string;
    description: string;
    date: string;
}

import ReactMarkdown from 'react-markdown';

export const SliceStudies: React.FC = () => {
    const [posts, setPosts] = useState<Post[]>([]);
    const [selectedPost, setSelectedPost] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [postLoading, setPostLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchStudies = async () => {
            try {
                const response = await fetch('/api/studies');
                if (!response.ok) {
                    const errorData = await response.json();
                    throw new Error(errorData.details || errorData.message || 'Failed to fetch');
                }
                const data = await response.json();
                setPosts(data);
            } catch (err: any) {
                console.error(err);
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchStudies();
    }, []);

    const handlePostClick = async (id: string) => {
        setPostLoading(true);
        try {
            const response = await fetch(`/api/post?id=${id}`);
            if (!response.ok) throw new Error('Failed to load post content');
            const data = await response.json();
            setSelectedPost(data);
            window.scrollTo({ top: 0, behavior: 'smooth' });
        } catch (err: any) {
            setError(err.message);
        } finally {
            setPostLoading(false);
        }
    };

    if (error) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center text-center p-12 pt-40">
                <div className="w-16 h-16 bg-red-50 text-red-500 rounded-full flex items-center justify-center mb-6 mx-auto">
                   <Clock size={32} />
                </div>
                <h2 className="text-3xl font-medium mb-4 tracking-tight">Unable to sync studies.</h2>
                <p className="text-neutral-dark mb-8 max-w-md mx-auto font-light leading-relaxed">
                    Error: <span className="font-mono text-sm bg-neutral-100 px-2 py-1 rounded">{error}</span>
                </p>
                <button 
                    onClick={() => window.location.reload()}
                    className="px-8 py-4 bg-neutral-darkest text-white rounded-2xl font-bold hover:bg-primary transition-all shadow-xl"
                >
                    Retry Connection
                </button>
            </div>
        );
    }

    if (selectedPost) {
        return (
            <div className="min-h-screen bg-neutral-white pt-32 pb-24 px-6 sm:px-12">
                <article className="max-w-3xl mx-auto">
                    <button 
                        onClick={() => setSelectedPost(null)}
                        className="inline-flex items-center gap-2 text-sm font-bold tracking-widest uppercase text-neutral-light hover:text-primary transition-colors mb-16 group"
                    >
                        <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" /> Back to all studies
                    </button>
                    
                    <header className="mb-16">
                        <time className="text-sm font-bold tracking-widest uppercase text-neutral-light block mb-4">
                            {new Date(selectedPost.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                        </time>
                        <h1 className="text-4xl md:text-6xl font-medium tracking-tight leading-[1.05] text-neutral-darkest mb-8">
                            {selectedPost.title}
                        </h1>
                    </header>

                    <div className="prose prose-lg prose-neutral max-w-none prose-headings:font-medium prose-headings:tracking-tight prose-a:text-primary prose-a:decoration-1 prose-a:underline-offset-4 hover:prose-a:underline prose-p:text-neutral-dark prose-p:font-light prose-p:leading-relaxed">
                        <ReactMarkdown>{selectedPost.content}</ReactMarkdown>
                    </div>

                    <div className="mt-24 pt-12 border-t border-neutral-darkest/10 text-center">
                        <button 
                            onClick={() => setSelectedPost(null)}
                            className="px-8 py-4 bg-neutral-darkest text-white rounded-xl font-bold hover:bg-primary transition-all shadow-lg"
                        >
                            Read more studies
                        </button>
                    </div>
                </article>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-neutral-white pt-32 pb-24 px-6 sm:px-12">
            <div className="max-w-4xl mx-auto">
                <header className="mb-20 border-b border-neutral-darkest/10 pb-16">
                    <div className="inline-flex px-3 py-1 bg-primary/10 text-primary rounded text-[10px] font-bold tracking-widest uppercase mb-8">
                        The Archives
                    </div>
                    <h1 className="text-5xl md:text-7xl font-medium tracking-tight text-neutral-darkest mb-8 leading-[0.95]">
                        Slice Studies: <br />
                        <span className="font-serif italic text-primary">Creator Growth.</span>
                    </h1>
                    <p className="text-xl text-neutral-dark font-light max-w-2xl leading-relaxed">
                        Real-world case studies, algorithm hacks, and the exact strategies used to scale founder-led brands through content marketing.
                    </p>
                </header>

                {loading || postLoading ? (
                    <div className="space-y-12">
                        {[1, 2, 3].map(i => (
                            <div key={i} className="animate-pulse space-y-4">
                                <div className="h-4 bg-neutral-100 w-24 rounded"></div>
                                <div className="h-10 bg-neutral-100 w-3/4 rounded"></div>
                                <div className="h-20 bg-neutral-100 w-full rounded"></div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="grid gap-16 md:gap-24">
                        {posts.map((post) => (
                            <article 
                                key={post.id} 
                                className="group cursor-pointer"
                                onClick={() => handlePostClick(post.id)}
                            >
                                <div className="flex flex-col gap-6">
                                    <div className="flex items-center gap-4 text-[10px] font-bold tracking-widest uppercase text-neutral-light">
                                        <time>{new Date(post.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</time>
                                        <span className="w-1 h-1 rounded-full bg-neutral-lighter"></span>
                                        <span className="text-neutral-dark">5 min read</span>
                                    </div>
                                    
                                    <h2 className="text-3xl md:text-4xl font-medium tracking-tight text-neutral-darkest group-hover:text-primary transition-all duration-300">
                                        {post.title}
                                    </h2>
                                    
                                    <p className="text-lg text-neutral-dark font-light leading-relaxed max-w-3xl">
                                        {post.description}
                                    </p>

                                    <div className="flex items-center gap-2 text-sm font-bold text-neutral-darkest group-hover:gap-4 transition-all">
                                        Read Study <ChevronRight size={16} className="text-primary" />
                                    </div>
                                </div>
                            </article>
                        ))}
                    </div>
                )}
                {/* Newsletter / CTA ... */}

                {/* Newsletter / CTA */}
                <div className="mt-32 p-12 bg-neutral-darkest rounded-[2.5rem] relative overflow-hidden">
                    <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none"></div>
                    <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-12 text-center md:text-left">
                        <div>
                            <h3 className="text-3xl font-medium text-white mb-2">Get the playbook.</h3>
                            <p className="text-neutral-400 font-light">Weekly creator teardowns delivered to your inbox.</p>
                        </div>
                        <div className="flex w-full md:w-auto gap-3">
                            <input 
                                type="email" 
                                placeholder="Enter your email" 
                                className="bg-white/5 border border-white/10 rounded-xl px-6 py-4 text-white w-full md:w-64 focus:outline-none focus:border-primary transition-colors"
                            />
                            <button className="px-8 py-4 bg-primary text-white font-bold rounded-xl hover:bg-primary-hover transition-all whitespace-nowrap shadow-xl">
                                Join 2k+ Founders
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
