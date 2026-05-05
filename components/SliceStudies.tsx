import React, { useState, useEffect, useMemo } from 'react';
import { ArrowLeft, ExternalLink, Clock, User, ChevronRight, CheckCircle } from 'lucide-react';
import ReactMarkdown from 'react-markdown';

interface Post {
    id: string;
    title: string;
    slug: string;
    description: string;
    date: string;
    results?: string;
    category?: string;
}

export const SliceStudies: React.FC = () => {
    const [posts, setPosts] = useState<Post[]>([]);
    const [selectedPost, setSelectedPost] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [postLoading, setPostLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [email, setEmail] = useState('');
    const [submitted, setSubmitted] = useState(false);

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

                // Handle initial slug from URL
                const pathParts = window.location.pathname.split('/');
                if (pathParts.length > 2 && pathParts[1] === 'blog') {
                    const slug = pathParts[2];
                    const post = data.find((p: Post) => p.slug === slug);
                    if (post) {
                        handlePostClick(post.id, false); // false to avoid redundant pushState
                    }
                }
            } catch (err: any) {
                console.error(err);
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchStudies();
    }, []);

    // Handle deep link to subscribe
    useEffect(() => {
        if (!loading && window.location.hash === '#subscribe') {
            const el = document.getElementById('subscribe-section');
            if (el) {
                setTimeout(() => {
                    el.scrollIntoView({ behavior: 'smooth' });
                }, 100);
            }
        }
    }, [loading]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!email) return;

        try {
            const response = await fetch('https://formspree.io/f/xnjlezlq', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email })
            });
            if (response.ok) {
                setSubmitted(true);
                setEmail('');
            }
        } catch (err) {
            console.error('Form submission error:', err);
        }
    };

    const handlePostClick = async (id: string, updateUrl = true) => {
        setPostLoading(true);
        try {
            const response = await fetch(`/api/post?id=${id}`);
            if (!response.ok) throw new Error('Failed to load post content');
            const data = await response.json();
            setSelectedPost(data);
            window.scrollTo({ top: 0, behavior: 'smooth' });

            if (updateUrl) {
                const post = posts.find(p => p.id === id);
                if (post) {
                    window.history.pushState({}, '', `/blog/${post.slug}`);
                }
            }
        } catch (err: any) {
            setError(err.message);
        } finally {
            setPostLoading(false);
        }
    };

    const schemaData = useMemo(() => {
        if (!selectedPost) return null;
        
        const baseSchema = {
            "@context": "https://schema.org",
            "@type": "BlogPosting",
            "headline": selectedPost.title,
            "datePublished": selectedPost.date,
            "description": selectedPost.description,
            "author": {
                "@type": "Organization",
                "name": "Slice",
                "url": "https://slice99.com"
            },
            "publisher": {
                "@type": "Organization",
                "name": "Slice",
                "logo": {
                    "@type": "ImageObject",
                    "url": "https://slice99.com/favicon.svg"
                }
            },
            "mainEntityOfPage": {
                "@type": "WebPage",
                "@id": window.location.href
            }
        };

        // Add Speakable and Dataset markup if Results exist
        if (selectedPost.results) {
            return [
                baseSchema,
                {
                    "@context": "https://schema.org",
                    "@type": "SpeakableSpecification",
                    "xpath": [
                        "/html/head/title",
                        "//*[@id='post-summary']"
                    ]
                },
                {
                    "@context": "https://schema.org",
                    "@type": "Dataset",
                    "name": `${selectedPost.title} - Performance Data`,
                    "description": `Factual records of growth outcomes: ${selectedPost.results}`,
                    "creator": {
                        "@type": "Organization",
                        "name": "Slice"
                    },
                    "variableMeasured": "Marketing Performance Outcomes"
                }
            ];
        }

        return baseSchema;
    }, [selectedPost]);

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
                {schemaData && (
                    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }} />
                )}
                <article className="max-w-3xl mx-auto">
                    <button
                        onClick={() => {
                            setSelectedPost(null);
                            window.history.pushState({}, '', '/blog');
                        }}
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
                        {selectedPost.category && (
                            <span className="inline-block px-3 py-1 bg-primary/10 text-primary rounded-full text-[10px] font-bold tracking-widest uppercase">
                                {selectedPost.category}
                            </span>
                        )}
                    </header>

                    {/* Summary Blockquote for LLMs and Quick Readers */}
                    <div id="post-summary" className="mb-12">
                        <blockquote className="border-l-4 border-primary bg-primary/5 py-6 px-8 rounded-r-2xl italic text-xl text-neutral-darkest font-light leading-relaxed">
                            {selectedPost.description}
                        </blockquote>
                    </div>

                    {/* Enhanced Typography Section */}
                    <div className="prose prose-xl prose-neutral max-w-none 
                        prose-headings:font-medium prose-headings:tracking-tight prose-headings:text-neutral-darkest
                        prose-p:text-neutral-dark prose-p:font-light prose-p:leading-[1.7] prose-p:mb-8
                        prose-strong:font-bold prose-strong:text-neutral-darkest
                        prose-blockquote:border-l-primary prose-blockquote:bg-primary/5 prose-blockquote:py-2 prose-blockquote:px-8 prose-blockquote:rounded-r-2xl prose-blockquote:italic
                        prose-img:rounded-[2rem] prose-img:shadow-2xl
                        prose-a:text-primary prose-a:decoration-1 prose-a:underline-offset-4 hover:prose-a:underline
                        prose-li:text-neutral-dark prose-li:font-light
                        ">
                        <ReactMarkdown>{selectedPost.content}</ReactMarkdown>
                    </div>

                    <div className="mt-24 pt-12 border-t border-neutral-darkest/10 text-center">
                        <button
                            onClick={() => {
                                setSelectedPost(null);
                                window.history.pushState({}, '', '/blog');
                                window.scrollTo({ top: 0, behavior: 'smooth' });
                            }}
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

                {/* Newsletter / CTA */}
                <div id="subscribe-section" className="mt-32 p-12 bg-neutral-darkest rounded-[2.5rem] relative overflow-hidden">
                    <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none"></div>
                    <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-12 text-center md:text-left">
                        <div>
                            <h3 className="text-3xl font-medium text-white mb-2">Get the playbook.</h3>
                            <p className="text-neutral-400 font-light">Weekly creator teardowns delivered to your inbox.</p>
                        </div>

                        {submitted ? (
                            <div className="flex items-center gap-3 bg-white/5 border border-primary/20 px-8 py-6 rounded-2xl animate-clip-down">
                                <CheckCircle className="text-primary" size={24} />
                                <div className="text-left">
                                    <p className="text-white font-bold">You're on the list!</p>
                                    <p className="text-neutral-400 text-xs font-light">Check your inbox for the first study.</p>
                                </div>
                            </div>
                        ) : (
                            <form onSubmit={handleSubmit} className="flex w-full md:w-auto gap-3">
                                <input
                                    required
                                    type="email"
                                    name="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="Enter your email"
                                    className="bg-white/5 border border-white/10 rounded-xl px-6 py-4 text-white w-full md:w-64 focus:outline-none focus:border-primary transition-colors"
                                />
                                <button
                                    type="submit"
                                    className="px-8 py-4 bg-primary text-white font-bold rounded-xl hover:bg-primary-hover transition-all whitespace-nowrap shadow-xl"
                                >
                                    Join 300+ Founders
                                </button>
                            </form>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};
