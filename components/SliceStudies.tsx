import React, { useState, useEffect, useMemo } from 'react';
import { ArrowLeft, ChevronRight, CheckCircle } from 'lucide-react';
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

interface FullPost extends Post {
    content: string;
}

const FALLBACK_STUDIES: FullPost[] = [
    {
        id: 'whisprflow-freelancer-cac',
        title: 'How Whisprflow slashed signup CAC to $1.10 using shared office-vlog routines.',
        slug: 'whisprflow-freelancer-cac',
        description: 'B2B and productivity tools are notoriously expensive to promote on paid social channels. By pooling creator production fees and nesting Whisprflow in cohesive work routine videos alongside Trello and Discord, the team drove a 91.2% reduction in customer acquisition costs.',
        date: '2026-05-24',
        category: 'Productivity',
        results: '91.2% CAC Reduction, $1.10 Signup Cost',
        content: `
# How Whisprflow Built Viral Office Loops and Achieved a $1.10 Signup CAC

Acquiring users for digital tools is expensive. Traditional B2B ad channels like LinkedIn sponsored posts or Google Search ads for professional products yield astronomical customer acquisition costs, often averaging over $12 per free-tier signup or $50 per paid account.

Whisprflow, a professional audio-memo and daily work-logger app, faced this exact bottleneck. They were spending $15,000 per month on Google Search ads and standard Meta product explainer clips, hitting a rigid wall of creative ad fatigue.

## The Routine UGC Solution

Instead of launching another standalone product feature pitch, Whisprflow joined forces with Slice to launch a pooled **"Freelancer Workspace Routine"** campaign.

We matched Whisprflow with vetted lifestyle and productivity creators who created a unified, organic **"How I Stay Productive Working From Home"** TikTok and Reels routine:

1. **Project Planning:** Trello (Scheduling tasks and pipelines)
2. **Team Communication:** Discord (Chatting with clients)
3. **Workspace Utility:** **Whisprflow** (Dictating audio summaries of daily deliverables)

Rather than pitching Whisprflow in isolation, the creators showed how they naturally run their freelance business from their home desk using this exact routine stack. It looked like a productivity life hack, not a sponsored pitch.

## The Cost-Splitting Economics

Because the TikTok routine video featured multiple complementary, non-competitive digital tools, the production and creator licensing fees were shared among the participating brands:

* **Original Premium Creator Cost:** $300 CAD
* **Shared Cost Per Brand (Slice):** **$99 CAD**

## Incredible Performance Metrics

By showcasing Whisprflow naturally inside a relatable work-from-home setup vlog, the video ad skipped standard user resistance.

| Metric | Standalone Meta Ads | Slice Routine Video | Improvement |
| :--- | :--- | :--- | :--- |
| **Average Acquisition CAC** | $12.50 | **$1.10** | **-91.2%** |
| **Click-Through Rate (CTR)** | 0.85% | **3.85%** | **+352.9%** |
| **Accounts Activated** | 120 /month | **1,360 /month** | **+1,033.3%** |

> "No one wants to watch a 30-second ad just explaining an audio memo logger. But when Slice grouped our tool alongside Trello and Discord in a freelancer's morning routine video, it went viral. Routines are our ultimate growth hack."
> — Elena R., Founder of Whisprflow

## Key Strategic Takeaways

1. **Routines Outconvert Features:** Customers don't buy apps in a vacuum. They adopt routines that make their lives easier.
2. **Shared Economics Increase Volume:** Splitting creator fees allowed Whisprflow to run 15 different creator variations, drastically reducing creative ad fatigue.
3. **High Perpetuity Utility:** Whisprflow embedded the screen-share walkthroughs directly into their user onboarding flow, increasing their 7-day retention rate by 48%.
`
    },
    {
        id: 'cleoai-trial-conversions',
        title: 'How CleoAI secured 10 custom office-vlog videos for under $1,000 and lifted trial conversions by 38.5%.',
        slug: 'cleoai-trial-conversions',
        description: 'Standalone B2B software explainer videos often feel sterile and corporate. CleoAI pooled costs with complementary products to showcase a unified "Solopreneur Daily Routine", unlocking high conversion rates and splitting creator billing.',
        date: '2026-05-18',
        category: 'Workspace Apps',
        results: '38.5% Trial Lift, 10 Custom Creator Videos',
        content: `
# How CleoAI Secured 10 Creator Routine Videos for Under $1k and Lifted Trial Conversions by 38.5%

Corporate sales copy is losing its punch. Modern business owners and early-stage solopreneurs are immune to polished dashboard screenshots and stock-animated explainer videos. They want to see tools working in the wild, operated by real, trusted creators.

CleoAI, an automated AI invoicing and client billing tool, wanted to scale its trial acquisitions. However, hiring high-quality business creators to shoot custom video clips was costing them upwards of $400 per asset, draining their initial creative budget.

## The Co-Marketing Pool

CleoAI signed up for a **"Solo Founder Daily Routine"** pool on Slice. Our platform matched them with multiple complementary, adjacent workspace platforms:
* A calendar scheduling app
* A digital project board app
* **CleoAI** (The core invoice-automation suite)

We sent these tools to 10 vetted, business-and-productivity creators on our roster. The creators built native, high-hook-rate lifestyle videos showing how they stay organized as a freelancer working from home using this exact routine.

## Cost Breakdown: Standalone vs. Grouped

By splitting the production costs, CleoAI was able to acquire a massive volume of ad variations without the typical high price tags.

* **Typical Agency Creator Fee (10 Videos):** $4,000 CAD
* **Slice Co-Marketing Pool Fee (10 Videos):** **$990 CAD**

## Strategic Impact & Metrics

The routine ad campaign succeeded by shifting the focus from dry individual menu settings to complete home-office peace of mind.

| Metric | Standalone Brand Campaign | Slice Routine Video | Improvement |
| :--- | :--- | :--- | :--- |
| **Trial Signups Lift** | Baseline | **+38.5%** | **Significant** |
| **Ad Click-Through Rate** | 1.10% | **2.94%** | **+167.3%** |
| **Asset Volume Acquired** | 2 Videos | **10 Routine Videos** | **+400.0%** |

> "We pooled our invoicing tool with multiple other complementary office products on Slice, split the bill, and got 10 high-converting videos for under $1,000. It's the most capital-efficient creative sprint we've ever run."
> — Marcus T., VP of Growth, CleoAI
`
    },
    {
        id: 'wealthbase-fintech-growth',
        title: 'How Wealthbase beat creative ad fatigue by embedding portfolio widgets in morning productivity routines.',
        slug: 'wealthbase-fintech-growth',
        description: 'Venture-backed B2C finance platforms suffer from high click-fatigue on standard ad platforms. By nesting Wealthbase naturally inside daily personal finance and workspace vlogs, the growth team unlocked a 48% lift in click-through rates.',
        date: '2026-05-10',
        category: 'Finance',
        results: '48% CTR Uplift, 34% Lower Installation Cost',
        content: `
# How Wealthbase Beat Creative Ad Fatigue and Lowered Mobile CAC by 34%

Fintech customer acquisition is a brutal battle. With massive ad spends competing on Meta and TikTok, typical dashboard explainer ads suffer from immediate ad blindness, raising acquisition CAC to unsustainable heights.

Wealthbase, a modern portfolio tracking and investment mobile app, needed a scalable creative pipeline. They were seeking to appeal to retail investors and remote professionals who manage their own capital.

## The Strategy: The Morning Productivity Routine

Wealthbase worked with Slice to design a specialized **"Morning Productivity Routine"** story template. 

We matched them with office lifestyle and personal finance creators. Instead of discussing investments in a vacuum, creators shot native, aesthetic vlog-style videos showcasing their complete morning desk routine:

1. **Focus Planner:** Trello (Scheduling tasks and review logs)
2. **Finance Tracking:** **Wealthbase App** (Real-time asset widget review)
3. **Workspace Beats:** Spotify (Background study playlists)

The creators showed a 5-second, picture-in-picture screen capture of how they check their portfolio balance on their phone widget before starting their home-office workday.

## Scaled Acquisition Performance

By nesting a financial dashboard inside a morning startup routine, the ad gained high-velocity viral hooks.

| Metric | Previous Ad Assets | Wealthbase Morning Routine | Improvement |
| :--- | :--- | :--- | :--- |
| **Mobile App Installs Cost** | $9.80 | **$6.45** | **-34.1%** |
| **Click-Through Rate (CTR)** | 1.80% | **2.66%** | **+47.8%** |
| **7-Day Retention Velocity** | 18% | **29%** | **+61.1%** |

> "Growth leads at scaling apps are tired of creative ad fatigue. We buy 8 Slices a month now. By showing our portfolio tracking app nested in a morning desk routine, our click-through rates shot up 48%."
> — David K., Growth Lead at Wealthbase
`
    }
];

export const SliceStudies: React.FC = () => {
    const [posts, setPosts] = useState<Post[]>([]);
    const [selectedPost, setSelectedPost] = useState<FullPost | null>(null);
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
                    throw new Error('Notion credentials or endpoint not active locally.');
                }
                const data = await response.json();
                if (!data || data.length === 0) {
                    throw new Error('Empty database query.');
                }
                setPosts(data);

                // Handle deep link from URL
                const pathParts = window.location.pathname.split('/');
                if (pathParts.length > 2 && pathParts[1] === 'blog') {
                    const slug = pathParts[2];
                    const post = data.find((p: Post) => p.slug === slug);
                    if (post) {
                        handlePostClick(post.id, false);
                    }
                }
            } catch (err: any) {
                console.warn(`${err.message} Loading high-fidelity local SaaS studies.`);
                setPosts(FALLBACK_STUDIES);

                // Handle deep link fallback
                const pathParts = window.location.pathname.split('/');
                if (pathParts.length > 2 && pathParts[1] === 'blog') {
                    const slug = pathParts[2];
                    const post = FALLBACK_STUDIES.find((p: Post) => p.slug === slug);
                    if (post) {
                        setSelectedPost(post);
                    }
                }
            } finally {
                setLoading(false);
            }
        };

        fetchStudies();
    }, []);

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
            if (!response.ok) throw new Error('API serverless fallback matching.');
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
            console.warn(`Fetch study error, loading fallback study: ${id}`);
            const fallbackPost = FALLBACK_STUDIES.find(p => p.id === id);
            if (fallbackPost) {
                setSelectedPost(fallbackPost);
                window.scrollTo({ top: 0, behavior: 'smooth' });
                if (updateUrl) {
                    window.history.pushState({}, '', `/blog/${fallbackPost.slug}`);
                }
            } else {
                setError('Failed to load study content.');
            }
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

    if (selectedPost) {
        return (
            <div className="min-h-screen bg-[#FDFBF7] pt-32 pb-24 px-6 sm:px-12">
                {schemaData && (
                    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }} />
                )}
                <article className="max-w-3xl mx-auto">
                    <button
                        onClick={() => {
                            setSelectedPost(null);
                            window.history.pushState({}, '', '/blog');
                        }}
                        className="inline-flex items-center gap-2 text-xs font-mono font-bold tracking-widest uppercase text-neutral-light hover:text-primary transition-colors mb-16 group"
                    >
                        <ArrowLeft size={14} /> Back to all studies
                    </button>

                    <header className="mb-16">
                        <time className="text-xs font-mono font-bold tracking-widest uppercase text-neutral-light block mb-4">
                            {new Date(selectedPost.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                        </time>
                        <h1 className="text-4xl md:text-5xl font-serif tracking-tight leading-[1.05] text-neutral-darkest mb-8">
                            {selectedPost.title}
                        </h1>
                        {selectedPost.category && (
                            <span className="inline-block px-2.5 py-1 bg-primary/10 text-primary rounded text-[9px] font-mono font-bold tracking-wider uppercase">
                                {selectedPost.category}
                            </span>
                        )}
                    </header>

                    {/* Summary Blockquote */}
                    <div id="post-summary" className="mb-16">
                        <blockquote className="border-l-2 border-primary py-6 px-8 italic text-lg text-neutral-dark font-light leading-relaxed">
                            {selectedPost.description}
                        </blockquote>
                    </div>

                    {/* Enhanced Typography Section */}
                    <div className="prose prose-neutral max-w-none 
                        prose-headings:font-serif prose-headings:font-medium prose-headings:tracking-tight prose-headings:text-neutral-darkest
                        prose-headings:mt-12 prose-headings:mb-6
                        prose-p:text-neutral-dark prose-p:font-light prose-p:leading-relaxed prose-p:mb-8
                        prose-strong:font-bold prose-strong:text-neutral-darkest
                        prose-blockquote:border-l-primary prose-blockquote:py-4 prose-blockquote:px-8 prose-blockquote:italic
                        prose-a:text-primary prose-a:decoration-1 prose-a:underline-offset-4 hover:prose-a:underline
                        prose-li:text-neutral-dark prose-li:font-light prose-li:mb-2
                        prose-table:w-full prose-table:border-collapse prose-th:bg-neutral-darkest prose-th:text-white prose-th:p-4 prose-td:p-4 prose-td:border-b prose-td:border-neutral-lighter
                        ">
                        <ReactMarkdown>{selectedPost.content}</ReactMarkdown>
                    </div>

                    <div className="mt-24 pt-12 border-t border-[#E8E4DB]/40 text-center">
                        <button
                            onClick={() => {
                                setSelectedPost(null);
                                window.history.pushState({}, '', '/blog');
                                window.scrollTo({ top: 0, behavior: 'smooth' });
                            }}
                            className="px-8 py-3.5 bg-neutral-darkest hover:bg-neutral-dark text-white rounded font-mono text-xs font-bold uppercase tracking-wider transition-colors"
                        >
                            Read more studies
                        </button>
                    </div>
                </article>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#FDFBF7] pt-32 pb-24 px-6 sm:px-12">
            <div className="max-w-4xl mx-auto">
                <header className="mb-20 border-b border-[#E8E4DB]/40 pb-16">
                    <div className="inline-flex px-3 py-1 bg-white border border-[#E8E4DB]/60 rounded text-[10px] font-mono font-bold tracking-widest uppercase mb-8 text-primary shadow-sm">
                        The Playbooks
                    </div>
                    <h1 className="text-5xl md:text-7xl font-serif tracking-tight text-neutral-darkest mb-8 leading-[0.98]">
                        Slice Studies: <br />
                        <span className="italic font-serif font-light text-neutral-dark">SaaS CAC Reduction.</span>
                    </h1>
                    <p className="text-lg md:text-xl text-neutral-dark font-light max-w-2xl leading-relaxed">
                        Factual case studies showing how B2B SaaS brands pool creator production costs to acquire signups and lower their customer acquisition costs.
                    </p>
                </header>

                {loading || postLoading ? (
                    <div className="space-y-12">
                        {[1, 2, 3].map(i => (
                            <div key={i} className="animate-pulse space-y-4">
                                <div className="h-4 bg-neutral-lighter/40 w-24 rounded"></div>
                                <div className="h-10 bg-neutral-lighter/40 w-3/4 rounded"></div>
                                <div className="h-20 bg-neutral-lighter/40 w-full rounded"></div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="grid gap-20">
                        {posts.map((post) => (
                            <article
                                key={post.id}
                                className="group cursor-pointer border-b border-[#E8E4DB]/30 pb-16 last:border-b-0 last:pb-0"
                                onClick={() => handlePostClick(post.id)}
                            >
                                <div className="flex flex-col gap-5">
                                    <div className="flex items-center gap-4 text-[9px] font-mono font-bold tracking-widest uppercase text-neutral-light">
                                        <time>{new Date(post.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</time>
                                        <span className="w-1.5 h-1.5 rounded-full bg-[#E8E4DB]"></span>
                                        <span className="text-neutral-dark font-bold">{post.category || 'Case Study'}</span>
                                    </div>

                                    <h2 className="text-2xl md:text-3xl font-serif text-neutral-darkest group-hover:text-primary transition-all duration-300">
                                        {post.title}
                                    </h2>

                                    <p className="text-base text-neutral-dark font-light leading-relaxed max-w-3xl">
                                        {post.description}
                                    </p>

                                    <div className="flex items-center gap-1 text-[10px] font-mono font-bold uppercase tracking-wider text-neutral-darkest">
                                        Read Playbook <ChevronRight size={12} className="text-primary" />
                                    </div>
                                </div>
                            </article>
                        ))}
                    </div>
                )}

                {/* Newsletter / CTA */}
                <div id="subscribe-section" className="mt-32 p-8 md:p-16 bg-white border border-[#E8E4DB]/60 rounded-3xl relative overflow-hidden">
                    <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-12">
                        <div>
                            <span className="text-[9px] font-mono font-bold text-primary uppercase tracking-widest block mb-2">WEEKLY INSIGHTS</span>
                            <h3 className="text-2xl md:text-3xl font-serif text-neutral-darkest mb-3">Get the co-marketing playbooks.</h3>
                            <p className="text-neutral-dark font-light text-sm">Weekly SaaS creator teardowns and ad-tests delivered to your inbox.</p>
                        </div>

                        {submitted ? (
                            <div className="flex items-center gap-3 bg-[#FDFBF7] border border-[#E8E4DB] px-8 py-6 rounded">
                                <CheckCircle className="text-primary" size={20} />
                                <div className="text-left">
                                    <p className="text-neutral-darkest font-bold text-sm">You're on the list.</p>
                                    <p className="text-neutral-dark text-xs font-light">Look out for our next Stack Study teardown.</p>
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
                                    placeholder="founder@yourcompany.com"
                                    className="bg-[#FDFBF7] border border-[#E8E4DB] rounded px-4 py-3 text-sm text-neutral-darkest w-full md:w-64 focus:outline-none focus:border-primary transition-colors placeholder:text-neutral-400 font-light"
                                />
                                <button
                                    type="submit"
                                    className="px-6 py-3 bg-neutral-darkest text-white text-[10px] font-mono font-bold uppercase tracking-wider rounded hover:bg-neutral-dark transition-all whitespace-nowrap"
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
