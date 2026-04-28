import React, { useState, useEffect } from 'react';
import { ArrowLeft, ExternalLink, Clock, User, ChevronRight } from 'lucide-react';

interface Post {
    id: string;
    title: string;
    slug: string;
    description: string;
    date: string;
}

export const SliceStudies: React.FC = () => {
    const [posts, setPosts] = useState<Post[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    useEffect(() => {
        const fetchStudies = async () => {
            try {
                const response = await fetch('/api/studies');
                if (!response.ok) throw new Error('Failed to fetch');
                const data = await response.json();
                setPosts(data);
            } catch (err) {
                console.error(err);
                setError(true);
            } finally {
                setLoading(false);
            }
        };

        fetchStudies();
    }, []);

    if (error) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center text-center p-6">
                <h2 className="text-2xl font-bold mb-4">Unable to load studies.</h2>
                <p className="text-neutral-dark mb-8">Please check your Notion connection or try again later.</p>
                <button 
                    onClick={() => window.location.reload()}
                    className="px-6 py-3 bg-primary text-white rounded-xl font-bold"
                >
                    Retry Connection
                </button>
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
                        Real-world case studies, creator teardowns, and the exact strategies used to scale founder-led brands through fractionalized UGC.
                    </p>
                </header>

                {loading ? (
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
                            <article key={post.id} className="group cursor-pointer">
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
