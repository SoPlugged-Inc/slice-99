import React, { useState } from 'react';
import { ArrowUpRight, Play, Layers, BarChart, ExternalLink, ChevronDown, Check, TrendingUp, Link, ArrowLeft, ArrowRight, Package, CheckCheck, MessageSquare } from 'lucide-react';
import { LogoMarquee } from './Shared';

const Logo = () => (
    <div className="text-xl font-black tracking-tighter text-white uppercase select-none">
        SL<span className="text-primary">/</span>CE
    </div>
);

const AccordionItem: React.FC<{ q: string, a: string, isOpen: boolean, onClick: () => void }> = ({ q, a, isOpen, onClick }) => (
    <div className="border-b border-neutral-darkest/10">
        <button
            onClick={onClick}
            className="w-full text-left py-8 flex items-center justify-between focus:outline-none group"
        >
            <h4 className="font-medium text-neutral-darkest tracking-tight text-xl md:text-2xl group-hover:text-primary transition-colors pr-8">
                {q}
            </h4>
            <div className={`w-8 h-8 rounded-full border border-neutral-darkest/20 flex items-center justify-center transition-transform duration-300 shrink-0 ${isOpen ? 'rotate-180 bg-neutral-darkest text-white' : ''}`}>
                <ChevronDown size={16} className={isOpen ? "text-white" : "text-neutral-darkest"} />
            </div>
        </button>
        <div className={`overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? 'max-h-[500px] opacity-100 pb-8' : 'max-h-0 opacity-0 pb-0'}`}>
            <p className="text-neutral-dark text-lg md:text-xl leading-relaxed max-w-3xl">{a}</p>
        </div>
    </div>
);

const testimonials = [
    {
        quote: "We used to pay $3,000/month to an agency just for them to 'manage' creators who never posted. Now we just buy 5 slices a month and our TikTok ads never fatigue. It's a literal UGC faucet.",
        name: "David K.",
        title: "Founder, Mantle Grooming",
        image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=400&fit=crop"
    },
    {
        quote: "I was spending 10 hours a week in DMs begging micro-influencers to accept free product. With Slice99, I just pay the invoice and the videos appear in my Dropbox. Game changing.",
        name: "Elena R.",
        title: "CEO, Form Skincare",
        image: "https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=400&fit=crop"
    },
    {
        quote: "The fact that I own the rights to the video in perpetuity for $99 is insane. One video we got from a Slice last month has driven $12k in tracked revenue. Scaling this heavily.",
        name: "Marcus T.",
        title: "Founder, Base Athletics",
        image: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?q=80&w=400&fit=crop"
    }
];

const creatorPosts = [
    {
        name: "SarahFinds",
        location: "Toronto, Canada",
        avatar: "https://i.pravatar.cc/100?img=32",
        image: "https://images.unsplash.com/photo-1571781926291-c477ebfd024b?q=80&w=600&auto=format&fit=crop",
        views: "12.5k",
        caption: "obsessed with these new goodies..."
    },
    {
        name: "Lamide",
        location: "London, UK",
        avatar: "https://i.pravatar.cc/100?img=44",
        image: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?q=80&w=600&auto=format&fit=crop",
        views: "18.2k",
        caption: "My secret for that morning glow. ✨ #Slice99"
    },
    {
        name: "Marcus.Style",
        location: "New York, USA",
        avatar: "https://i.pravatar.cc/100?img=12",
        image: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?q=80&w=600&auto=format&fit=crop",
        views: "9.4k",
        caption: "Simple, effective, $99. Can't beat it. ☕️"
    }
];

export const BrandLanding: React.FC = () => {
    const [openFaq, setOpenFaq] = useState<number | null>(0);
    const [testimonialIdx, setTestimonialIdx] = useState(0);
    const [postIdx, setPostIdx] = useState(0);

    const nextTestimonial = () => setTestimonialIdx((prev) => (prev + 1) % testimonials.length);
    const prevTestimonial = () => setTestimonialIdx((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));

    const handleHeroClick = (e: React.MouseEvent) => {
        e.preventDefault();
        window.open('https://book.stripe.com/aFafZadjE3050Wh4Bq5Vu00', '_blank');
    };

    return (
        <div className="bg-neutral-lightest selection:bg-neutral-darkest selection:text-white font-sans antialiased">

            {/* HERO SECTION */}
            <div className="pt-32 pb-20 px-6 sm:px-12 max-w-[1400px] mx-auto border-b border-neutral-darkest/10">
                <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
                    {/* Hero Text */}
                    <div className="w-full lg:w-7/12 xl:w-7/12 relative">


                        <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-white border border-neutral-darkest/10 rounded-full text-[10px] font-bold tracking-widest uppercase mb-6 text-primary shadow-sm">
                            <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse"></span>
                            A NEW MODEL FOR UGC
                        </div>

                        <h1 className="text-5xl sm:text-6xl lg:text-[4rem] xl:text-[4.5rem] font-medium text-neutral-darkest tracking-[-0.04em] leading-[1.05] mb-8">
                            The UGC engine <br className="hidden sm:block" />
                            for <span className="text-neutral-darkest italic font-serif">founder-led</span> brands.
                        </h1>

                        <p className="text-xl sm:text-2xl text-neutral-dark max-w-[800px] leading-relaxed mb-10 font-light whitespace-normal">
                            Stop burning budget on agency fees and endless creator DMs. Get usable UGC for $99 per video.
                        </p>

                        <div className="flex justify-start gap-6 font-sans">
                            <button onClick={() => window.open('https://book.stripe.com/aFafZadjE3050Wh4Bq5Vu00', '_blank')} className="group relative px-6 sm:px-8 py-3.5 sm:py-4 bg-neutral-darkest text-white text-base sm:text-lg font-medium rounded-xl hover:-translate-y-1 hover:shadow-[0_20px_40px_rgba(255,69,0,0.3)] transition-all flex items-center justify-center gap-2 overflow-hidden overflow-visible z-10 w-full sm:w-auto hover:bg-brand-orange">
                                Get a Slice
                                <ArrowRight size={18} className="transform group-hover:translate-x-1 transition-transform" />
                            </button>
                        </div>

                        {/* Social Proof / Micro-copy */}
                        <div className="mt-6 flex items-center gap-4 text-sm text-neutral-dark">
                            <div className="flex -space-x-3">
                                <img src="https://i.pravatar.cc/100?img=5" className="w-8 h-8 rounded-full border-2 border-white" alt="Founder" />
                                <img src="https://i.pravatar.cc/100?img=12" className="w-8 h-8 rounded-full border-2 border-white" alt="Founder" />
                                <img src="https://i.pravatar.cc/100?img=44" className="w-8 h-8 rounded-full border-2 border-white" alt="Founder" />
                            </div>
                            <div className="flex flex-col">
                                <span className="font-semibold text-neutral-darkest text-[13px]">"Slice just works. Period."</span>
                                <span className="text-[11px] font-bold tracking-wide uppercase text-neutral-dark/60 mt-0.5">100+ Founders</span>
                            </div>
                        </div>
                    </div>

                    {/* Premium High-Energy Hero Imagery */}
                    <div className="w-full lg:w-5/12 xl:w-5/12 relative h-[500px] sm:h-[650px] hidden lg:block shrink-0 z-10 group">
                        {/* Glowing Context Backplane */}
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-primary/20 blur-[100px] rounded-full pointer-events-none opacity-60"></div>

                        {/* Main Center Image */}
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[340px] h-[480px] bg-neutral-200 rounded-[2rem] overflow-hidden shadow-[0_30px_60px_rgba(255,69,0,0.15)] z-10 border-[6px] border-white transform -rotate-1 hover:rotate-0 hover:scale-[1.02] transition-all duration-700 animate-float-1">
                            {/* Premium Aesthetic Product Placement (Glossier-esque aesthetic) */}
                            <img src="https://images.unsplash.com/photo-1571781926291-c477ebfd024b?q=80&w=800&auto=format&fit=crop" alt="Premium Skincare Display" className="w-full h-full object-cover" />
                            {/* Glass gradient overlay to make things pop */}
                            <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-black/20 to-transparent pointer-events-none"></div>
                        </div>

                        {/* Top Left Squirkle (Unboxing/Colorful Box) */}
                        <div className="absolute top-12 left-[-5%] w-48 h-48 bg-neutral-300 rounded-[2rem] overflow-hidden shadow-2xl z-0 border-[4px] border-white transform -rotate-6 hover:-translate-y-2 transition-transform duration-500 animate-float-2">
                            <img src="https://images.unsplash.com/photo-1596462502278-27bfdc403348?q=80&w=600&auto=format&fit=crop" alt="Aesthetic Creator Lifestyle" className="w-full h-full object-cover" />
                        </div>

                        {/* Bottom Right Squirkle (Dynamic Creator Portrait) */}
                        <div className="absolute bottom-12 right-[-5%] w-56 h-56 bg-neutral-300 rounded-[2.5rem] overflow-hidden shadow-2xl z-0 border-[4px] border-white transform rotate-3 hover:translate-x-2 transition-transform duration-500 animate-float-3">
                            <img src="https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?q=80&w=600&auto=format&fit=crop" alt="Vibrant Creator Portrait" className="w-full h-full object-cover" />
                        </div>

                        {/* Additional Floating Avatars */}
                        <div className="absolute bottom-[25%] -left-10 w-24 h-24 bg-neutral-300 rounded-[1.5rem] overflow-hidden shadow-xl z-30 border-[3px] border-white transform -rotate-12 hover:rotate-0 transition-transform duration-500 animate-float-4">
                            <img src="https://i.pravatar.cc/150?img=11" alt="Creator Face" className="w-full h-full object-cover" />
                        </div>
                        <div className="absolute top-[20%] right-[-10px] w-20 h-20 bg-neutral-300 rounded-[1.2rem] overflow-hidden shadow-lg z-30 border-[3px] border-white transform rotate-12 hover:rotate-0 transition-transform duration-500 animate-float-2" style={{ animationDelay: '1.5s' }}>
                            <img src="https://i.pravatar.cc/150?img=68" alt="Creator Face" className="w-full h-full object-cover" />
                        </div>

                        {/* Floating UI Badge - Glassmorphism Update */}
                        <div className="absolute top-[40%] -right-12 bg-white/80 backdrop-blur-md p-3 pr-5 rounded-xl shadow-[0_20px_50px_rgba(0,0,0,0.1)] z-40 flex items-center gap-3 transform rotate-3 hover:scale-105 transition-all duration-300 border border-white/50 animate-float-1" style={{ animationDelay: '0.7s' }}>
                            <div className="w-6 h-6 bg-brand-orange text-white rounded-full flex items-center justify-center shadow-inner">
                                <Check size={14} strokeWidth={3} />
                            </div>
                            <div>
                                <div className="text-[11px] font-bold text-neutral-darkest uppercase tracking-widest">Slot Secured</div>
                            </div>
                        </div>

                        {/* Floating Performance Tag */}
                        <div className="absolute bottom-[5%] left-10 bg-white/80 backdrop-blur-md px-4 py-2 border border-white/50 rounded-full shadow-[0_20px_50px_rgba(0,0,0,0.1)] z-30 flex items-center gap-2 transform -rotate-3 hover:-translate-x-2 transition-all duration-300 animate-float-3" style={{ animationDelay: '2s' }}>
                            <div className="w-2.5 h-2.5 bg-[#00C853] rounded-full relative">
                                <div className="absolute inset-0 bg-[#00C853] rounded-full animate-ping opacity-75"></div>
                            </div>
                            <span className="text-[11px] font-extrabold text-neutral-darkest uppercase tracking-widest">Converting</span>
                        </div>
                    </div>
                </div>

                {/* Pricing / Value Grid Under Hero */}
                <div className="flex flex-wrap gap-x-8 gap-y-6 pt-10 border-t border-neutral-darkest/10 items-center justify-between w-full max-w-5xl mb-12">
                    <div className="flex flex-col">
                        <span className="text-3xl font-serif text-neutral-darkest">$99</span>
                        <span className="text-xs uppercase tracking-widest text-neutral-light mt-1">Per Slice</span>
                    </div>
                    <div className="w-px h-10 bg-neutral-darkest/10 hidden sm:block"></div>
                    <div className="flex flex-col">
                        <span className="text-lg font-medium text-neutral-darkest">1 Video + 1 Post</span>
                        <span className="text-xs uppercase tracking-widest text-neutral-light mt-1">Included Rights</span>
                    </div>
                    <div className="w-px h-10 bg-neutral-darkest/10 hidden sm:block"></div>
                    <div className="flex flex-col">
                        <span className="text-lg font-medium text-neutral-darkest">Scalable Volume</span>
                        <span className="text-xs uppercase tracking-widest text-neutral-light mt-1">Buy what you need</span>
                    </div>
                    <div className="w-px h-10 bg-neutral-darkest/10 hidden sm:block"></div>
                    <div className="flex flex-col">
                        <span className="text-lg font-medium text-neutral-darkest">Fast Delivery</span>
                        <span className="text-xs uppercase tracking-widest text-neutral-light mt-1">Boxes ship weekly</span>
                    </div>
                </div>

                <div className="pt-8 pb-4 opacity-50 grayscale">
                    <LogoMarquee />
                </div>
            </div>

            {/* THE PROBLEM / SHIFT - Alternating Left/Right layout */}
            <div className="px-6 sm:px-12 py-32 max-w-[1400px] mx-auto border-b border-neutral-darkest/10">
                <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-24">
                    {/* Copy Left */}
                    <div className="w-full lg:w-1/2">
                        <div className="inline-flex px-3 py-1 bg-neutral-darkest text-white rounded text-xs font-bold tracking-widest uppercase mb-6">
                            Why Slice?
                        </div>
                        <h2 className="text-3xl sm:text-4xl md:text-[2.75rem] font-medium tracking-tight text-neutral-darkest leading-tight mb-8">
                            Traditional creator marketing is expensive, inconsistent, and hard to measure.
                        </h2>
                        <p className="text-xl text-neutral-dark leading-relaxed font-light mb-10">
                            Your brand needs a predictable UGC system, not one-off creator deals.
                            <br /><br />
                            <strong className="text-neutral-darkest font-medium">Slice is a fractionalized UGC engine.</strong> We replaced 5-figure agency retainers with a budget-friendly pipeline. You send us your product(s)), we pool them with complimentary brands and match them to vetted creators on our roster.
                        </p>

                        {/* Inline Deliverables Badges */}
                        <div className="flex flex-wrap gap-3">
                            <span className="px-4 py-2 rounded-full border border-neutral-200 bg-white text-sm font-medium text-neutral-dark flex items-center gap-2 shadow-sm">
                                <Check size={16} className="text-primary" /> Raw Video File
                            </span>
                            <span className="px-4 py-2 rounded-full border border-neutral-200 bg-white text-sm font-medium text-neutral-dark flex items-center gap-2 shadow-sm">
                                <Check size={16} className="text-primary" /> Creator Feed Post
                            </span>
                            <span className="px-4 py-2 rounded-full border border-neutral-200 bg-white text-sm font-medium text-neutral-dark flex items-center gap-2 shadow-sm">
                                <Check size={16} className="text-primary" /> Commercial Rights
                            </span>
                        </div>
                    </div>

                    {/* Scrappy Image Right */}
                    <div className="w-full lg:w-1/2 relative">
                        <div className="w-full aspect-square md:aspect-[4/3] bg-neutral-200 rounded-[2rem] overflow-hidden shadow-2xl relative">
                            {/* Replaced with a more authentic behind-the-scenes creator shot */}
                            <img src="https://images.unsplash.com/photo-1556228578-0d85b1a4d571?q=80&w=1200&auto=format&fit=crop" alt="Box of beauty products unpacking" className="w-full h-full object-cover" />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent mix-blend-multiply"></div>
                        </div>

                        {/* Floating List UI overlay */}
                        <div className="absolute -bottom-8 -left-8 md:bottom-8 md:-left-12 bg-white p-6 rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.1)] w-72 z-20 border-2 border-neutral-darkest/5 transform -rotate-2">
                            {[
                                { name: "Sarah K.", role: "Skincare", match: true },
                                { name: "Elena R.", role: "Wellness", match: true },
                                { name: "Mia L.", role: "Beauty", match: true }
                            ].map((creator, i) => (
                                <div key={i} className="flex items-center gap-4 mb-4 last:mb-0">
                                    <div className="w-10 h-10 rounded-full bg-neutral-200 overflow-hidden border border-neutral-light">
                                        <img src={`https://i.pravatar.cc/100?img=${i + 10}`} alt={creator.name} className="w-full h-full object-cover" />
                                    </div>
                                    <div className="flex-1">
                                        <div className="flex justify-between items-center">
                                            <div className="text-sm font-bold text-neutral-darkest">{creator.name}</div>
                                            {i === 0 && <div className="text-[8px] bg-primary text-white px-1.5 py-0.5 rounded-sm font-bold tracking-widest uppercase">Matched</div>}
                                        </div>
                                    </div>
                                    <div className="w-5 h-5 flex items-center justify-center text-primary shrink-0">
                                        <Check size={18} strokeWidth={3} />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* SHOPPABLE LINK-IN-BIO & ROI TRACKING */}
            <div className="bg-neutral-darkest text-white px-6 sm:px-12 py-32 border-b border-neutral-darkest/10">
                <div className="max-w-[1400px] mx-auto flex flex-col-reverse lg:flex-row items-center gap-16 lg:gap-24">
                    {/* Image Left */}
                    <div className="w-full lg:w-1/2 relative">
                        <div className="aspect-[4/3] rounded-2xl overflow-hidden bg-neutral-200">
                            <img src="https://images.unsplash.com/photo-1618077360395-f3068be8e001?q=80&w=1200&auto=format&fit=crop" alt="Shoppable grooming style" className="w-full h-full object-cover opacity-80" />
                        </div>

                        {/* Floating Shoppable/Analytics UI */}
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white text-neutral-darkest p-6 rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.4)] w-80 z-20 border-b-4 border-primary transform -rotate-2">
                            <div className="flex items-center gap-2 mb-4 text-primary font-bold text-xs uppercase tracking-widest">
                                <Link size={14} /> Shop The Haul
                            </div>
                            <div className="flex items-center justify-between py-3 border-b border-neutral-100 last:border-0">
                                <span className="font-medium">Direct Traffic</span>
                                <span className="font-bold text-xl text-green-600">↑ 412</span>
                            </div>
                            <div className="flex items-center justify-between py-3 border-b border-neutral-100 last:border-0">
                                <span className="font-medium">Sales Conversion</span>
                                <span className="font-bold text-xl">3.8%</span>
                            </div>
                        </div>
                    </div>

                    {/* Copy Right */}
                    <div className="w-full lg:w-1/2 lg:pl-12">
                        <div className="inline-flex px-3 py-1 bg-primary text-white rounded text-xs font-bold tracking-widest uppercase mb-6">
                            Measure ROI
                        </div>
                        <h2 className="text-4xl md:text-5xl font-medium tracking-tight leading-tight mb-6">
                            Shoppable Link-in-Bio
                        </h2>
                        <p className="text-xl leading-relaxed font-light text-neutral-300 mb-10">
                            Every slice includes a dedicated "Shop the Haul" landing page. Viewers click straight to your checkout, while we track the exact ROI of your $99 slot. With continuous data aggregation, we're building the largest predictive algorithm for creator marketing.
                        </p>
                    </div>
                </div>
            </div>

            {/* GUARANTEED EYES ON YOUR BRAND */}
            <div className="bg-white px-6 sm:px-12 py-32 border-b border-neutral-darkest/10 relative overflow-hidden">
                <div className="max-w-[1400px] mx-auto flex flex-col lg:flex-row items-center gap-16 lg:gap-24">

                    {/* Copy Left */}
                    <div className="w-full lg:w-1/2">
                        <div className="inline-flex px-3 py-1.5 bg-neutral-100 text-neutral-darkest border border-neutral-200 rounded text-[10px] font-bold tracking-widest uppercase mb-6">
                            Organic Reach
                        </div>
                        <h2 className="text-4xl md:text-6xl font-medium tracking-tight leading-[1.1] text-neutral-darkest mb-8">
                            Guaranteed Eyes <br /> on Your Brand.
                        </h2>
                        <p className="text-xl text-neutral-dark leading-relaxed font-light mb-10 max-w-xl">
                            Creators post your product to their feed, putting your brand in front of thousands of potential shoppers instantly.
                            <br /><br />
                            <strong className="text-neutral-darkest font-medium">It's not just a video; it's a distribution engine for your brand.</strong> Every slice guarantees native placement that builds social proof and drives organic interest before you even spend a dollar on paid ads.
                        </p>

                        <div className="flex items-center gap-8">
                            <div>
                                <div className="text-3xl font-serif text-neutral-darkest italic">12.5k+</div>
                                <div className="text-[10px] uppercase tracking-widest text-neutral-light font-bold mt-1">Avg. Views</div>
                            </div>
                            <div className="w-px h-8 bg-neutral-200"></div>
                            <div>
                                <div className="text-3xl font-serif text-neutral-darkest italic">4.2%</div>
                                <div className="text-[10px] uppercase tracking-widest text-neutral-light font-bold mt-1">Engagement</div>
                            </div>
                        </div>
                    </div>

                    {/* Browser Mockup Visual Right */}
                    <div className="w-full lg:w-1/2 relative group">
                        {/* Glowing Orb */}
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-primary/10 blur-[100px] rounded-full pointer-events-none opacity-60"></div>

                        <div className="bg-white border border-neutral-200 rounded-3xl shadow-[0_32px_64px_rgba(0,0,0,0.08)] overflow-hidden relative z-10">
                            {/* Browser Header */}
                            <div className="bg-neutral-lightest/50 border-b border-neutral-100 px-6 py-4 flex items-center justify-between">
                                <div className="flex gap-2">
                                    <div className="w-3 h-3 rounded-full bg-neutral-200"></div>
                                    <div className="w-3 h-3 rounded-full bg-neutral-200"></div>
                                    <div className="w-3 h-3 rounded-full bg-neutral-200"></div>
                                </div>
                                <div className="text-[10px] font-mono tracking-widest text-neutral-light uppercase">Preview: Distribution</div>
                                <div className="flex gap-2">
                                    <button onClick={() => setPostIdx(prev => (prev === 0 ? creatorPosts.length - 1 : prev - 1))} className="w-6 h-6 rounded-full border border-neutral-200 flex items-center justify-center text-neutral-light hover:text-primary hover:border-primary transition-colors">
                                        <ArrowLeft size={10} />
                                    </button>
                                    <button onClick={() => setPostIdx(prev => (prev + 1) % creatorPosts.length)} className="w-6 h-6 rounded-full border border-neutral-200 flex items-center justify-center text-neutral-light hover:text-primary hover:border-primary transition-colors">
                                        <ArrowRight size={10} />
                                    </button>
                                </div>
                            </div>

                            {/* Content UI Mockup */}
                            <div className="p-12 bg-grid-pattern bg-[size:30px_30px] flex items-center justify-center min-h-[500px]">
                                <div key={postIdx} className="w-72 bg-white rounded-2xl shadow-xl border border-neutral-100 overflow-hidden transform group-hover:scale-[1.02] transition-transform duration-700 animate-float-1">
                                    <div className="p-4 flex items-center gap-3 border-b border-neutral-50">
                                        <div className="w-8 h-8 rounded-full bg-neutral-200 overflow-hidden">
                                            <img src={creatorPosts[postIdx].avatar} alt={creatorPosts[postIdx].name} />
                                        </div>
                                        <div className="flex-1">
                                            <div className="text-[11px] font-bold text-neutral-darkest">{creatorPosts[postIdx].name}</div>
                                            <div className="text-[9px] text-neutral-400">{creatorPosts[postIdx].location}</div>
                                        </div>
                                    </div>
                                    <div className="aspect-[4/5] bg-neutral-100 relative overflow-hidden">
                                        <img src={creatorPosts[postIdx].image} className="w-full h-full object-cover" alt="Product Post" />

                                        {/* Floating Badge */}
                                        <div className="absolute bottom-4 right-4 bg-primary text-white text-[10px] font-bold px-3 py-1.5 rounded-full flex items-center gap-1.5 shadow-lg group-hover:translate-y-[-4px] transition-transform">
                                            <Link size={10} strokeWidth={3} /> Link in Bio
                                        </div>

                                        <div className="absolute bottom-4 left-4 bg-black/60 backdrop-blur-md text-white text-[9px] font-bold px-3 py-1 rounded-sm flex items-center gap-1.5">
                                            <Play size={8} fill="white" /> {creatorPosts[postIdx].views} Views
                                        </div>
                                    </div>
                                    <div className="p-4">
                                        <div className="flex gap-3 mb-2">
                                            <div className="w-4 h-4 rounded-full border border-neutral-200"></div>
                                            <div className="w-4 h-4 rounded-full border border-neutral-200"></div>
                                            <div className="w-4 h-4 rounded-full border border-neutral-200"></div>
                                        </div>
                                        <div className="text-[10px] font-bold text-neutral-darkest">{creatorPosts[postIdx].name} <span className="font-normal text-neutral-500">{creatorPosts[postIdx].caption}</span></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* TOTAL OWNERSHIP / INFRASTRUCTURE RIGHTS */}
            <div className="bg-white px-6 sm:px-12 py-32 border-b border-neutral-darkest/10 relative overflow-hidden">
                <div className="max-w-[1400px] mx-auto flex flex-col lg:flex-row items-center gap-16 lg:gap-24">

                    {/* Visual Left */}
                    <div className="w-full lg:w-1/2 relative">
                        <div className="w-full aspect-square md:aspect-[4/3] bg-neutral-100 rounded-[2.5rem] overflow-hidden shadow-2xl relative group">
                            <img src="https://images.unsplash.com/photo-1556228578-0d85b1a4d571?q=80&w=1200&auto=format&fit=crop" alt="Premium Brand Content" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                            <div className="absolute inset-0 bg-gradient-to-tr from-primary/10 to-transparent"></div>

                            {/* Floating Deployment Tags - More aesthetic than a checklist */}
                            <div className="absolute top-10 left-10 animate-float-1">
                                <div className="bg-white/90 backdrop-blur-md border border-white px-4 py-2 rounded-full shadow-lg flex items-center gap-2">
                                    <div className="w-2 h-2 rounded-full bg-[#00C853]"></div>
                                    <span className="text-[10px] font-bold uppercase tracking-widest text-neutral-darkest">Paid Ads Ready</span>
                                </div>
                            </div>
                            <div className="absolute bottom-1/4 right-10 animate-float-2" style={{ animationDelay: '1s' }}>
                                <div className="bg-white/90 backdrop-blur-md border border-white px-4 py-2 rounded-full shadow-lg flex items-center gap-2">
                                    <div className="w-2 h-2 rounded-full bg-primary"></div>
                                    <span className="text-[10px] font-bold uppercase tracking-widest text-neutral-darkest">100% Ownership</span>
                                </div>
                            </div>
                            <div className="absolute top-1/2 -right-6 animate-float-3 hidden md:flex" style={{ animationDelay: '2s' }}>
                                <div className="bg-neutral-darkest text-white px-4 py-2 rounded-full shadow-2xl flex items-center gap-2">
                                    <span className="text-[10px] font-bold uppercase tracking-widest">In perpetuity</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Copy Right */}
                    <div className="w-full lg:w-1/2 lg:pl-12">
                        <div className="inline-flex px-3 py-1 bg-primary/10 text-primary rounded text-[10px] font-bold tracking-widest uppercase mb-6">
                            The License
                        </div>
                        <h2 className="text-4xl md:text-6xl font-medium tracking-tight leading-[1.05] text-neutral-darkest mb-8">
                            Total Ownership <br />of Assets.
                        </h2>
                        <p className="text-xl text-neutral-dark leading-relaxed font-light mb-10 max-w-xl">
                            We don't believe in licensing fees or temporary usage. When you buy a slice, you own the asset.
                            <br /><br />
                            <strong className="text-neutral-darkest font-medium">Build your asset library.</strong> From Meta ads to out-of-home billboards, your campaign content is ready to be deployed across every channel you own. No renewals, no hidden costs.
                        </p>

                        <div className="flex flex-wrap gap-12">
                            <div className="flex flex-col">
                                <span className="text-2xl font-serif italic text-neutral-darkest">Full Rights</span>
                                <span className="text-[10px] uppercase tracking-widest text-neutral-light mt-1 font-bold">In Perpetuity</span>
                            </div>
                            <div className="flex flex-col">
                                <span className="text-2xl font-serif italic text-neutral-darkest">Raw Files</span>
                                <span className="text-[10px] uppercase tracking-widest text-neutral-light mt-1 font-bold">4K Source Included</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* HOW IT WORKS - Refined Infrastructure Layout */}
            <div id="how-it-works" className="bg-neutral-lightest px-6 sm:px-12 py-32 border-b border-neutral-darkest/10 relative overflow-hidden">
                <div className="max-w-[1400px] mx-auto">
                    <div className="flex flex-col lg:flex-row items-end justify-between mb-20 gap-8">
                        <div className="max-w-2xl">
                            <div className="inline-flex px-3 py-1 bg-neutral-darkest text-white rounded text-[10px] font-bold tracking-widest uppercase mb-6">
                                How it works
                            </div>
                            <h2 className="text-4xl md:text-6xl font-medium tracking-tight leading-[1.05] text-neutral-darkest">
                                A better way to <br /> build your brand.
                            </h2>
                        </div>
                        <p className="text-xl text-neutral-dark font-light max-w-sm lg:mb-2">
                            We replaced 5-figure agency retainers with a predictable, fractionalized engine.
                        </p>
                    </div>

                    <div className="grid lg:grid-cols-3 gap-8">
                        {[
                            {
                                step: "01",
                                title: "Shared Pooling",
                                desc: "We batch your products with non-competing brands, unlocking top-tier creators for a fraction of the cost.",
                                icon: <Layers size={24} className="text-primary" />
                            },
                            {
                                step: "02",
                                title: "Verified Assets",
                                desc: "Vetted creators shoot UGC that looks organic and converts like a high-production ad creative.",
                                icon: <Check size={24} className="text-primary" />
                            },
                            {
                                step: "03",
                                title: "Weekly Delivery",
                                desc: "Get your source files and live links delivered straight to your inbox every single week.",
                                icon: <TrendingUp size={24} className="text-primary" />
                            }
                        ].map((item, i) => (
                            <div key={i} className="bg-white p-10 rounded-[2rem] border border-neutral-darkest/5 shadow-sm hover:shadow-xl transition-all duration-500 group">
                                <div className="w-12 h-12 rounded-2xl bg-neutral-lightest flex items-center justify-center mb-8 group-hover:bg-primary group-hover:text-white transition-colors duration-500">
                                    {item.icon}
                                </div>
                                <div className="text-[10px] font-mono text-neutral-light mb-4 tracking-widest uppercase">Phase {item.step}</div>
                                <h3 className="text-2xl font-bold text-neutral-darkest mb-4">{item.title}</h3>
                                <p className="text-neutral-dark leading-relaxed font-light">{item.desc}</p>
                            </div>
                        ))}
                    </div>

                    {/* Dashboard Preview / System Health */}
                    <div className="mt-20 bg-neutral-darkest rounded-[3rem] p-8 sm:p-16 relative overflow-hidden group">
                        {/* Abstract Background Effect */}
                        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/10 blur-[100px] rounded-full"></div>
                        <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-primary/5 blur-[80px] rounded-full"></div>

                        <div className="relative z-10 flex flex-col lg:flex-row items-center gap-16">
                            <div className="w-full lg:w-1/2">
                                <h4 className="text-xs font-bold uppercase tracking-[0.2em] text-primary mb-6">Live Updates</h4>
                                <h3 className="text-3xl md:text-4xl font-medium text-white mb-8 leading-tight">
                                    Track your content <br /> in real-time.
                                </h3>
                                <div className="space-y-4 mb-10">
                                    {[
                                        { label: "Creators Matched", value: "Verified", status: "success" },
                                        { label: "Content in Production", value: "Active", status: "warning" },
                                        { label: "Weekly Box Status", value: "In Transit", status: "primary" }
                                    ].map((stat, idx) => (
                                        <div key={idx} className="flex items-center justify-between p-4 bg-white/5 border border-white/10 rounded-xl">
                                            <span className="text-sm text-white/60 font-light">{stat.label}</span>
                                            <span className="text-[10px] font-bold uppercase tracking-widest text-primary">{stat.value}</span>
                                        </div>
                                    ))}
                                </div>
                                <button onClick={handleHeroClick} className="px-8 py-4 bg-primary text-white font-bold rounded-xl shadow-2xl hover:scale-105 transition-transform">
                                    Secure your next slice
                                </button>
                            </div>

                            <div className="w-full lg:w-1/2 relative flex justify-center">
                                {/* Sleek Phone Mockup Container */}
                                <div className="relative w-full max-w-[320px] group transition-all duration-700 hover:scale-[1.02]">

                                    {/* High-End Outer Bezel (Metallic Feel) */}
                                    <div className="relative z-20 bg-neutral-900 p-[12px] rounded-[3.2rem] shadow-[0_60px_120px_-20px_rgba(0,0,0,0.6)] border border-white/10 overflow-hidden">

                                        {/* Screen Glass Effect */}
                                        <div className="bg-black rounded-[2.5rem] overflow-hidden relative border border-neutral-800">

                                            {/* WhatsApp UI (Dark Mode for Sleekness) */}
                                            <div className="bg-[#0b141a] h-[580px] flex flex-col relative font-sans">

                                                {/* WhatsApp Header (Native Style) */}
                                                <div className="bg-[#1f2c33] pt-10 pb-4 px-5 flex items-center justify-between relative z-30">
                                                    {/* Dynamic Island */}
                                                    <div className="absolute top-2 left-1/2 -translate-x-1/2 w-[100px] h-6 bg-black rounded-full flex items-center justify-center">
                                                        <div className="w-1 h-1 rounded-full bg-blue-500/20 mr-12"></div>
                                                        <div className="w-2 h-2 rounded-full bg-white/5"></div>
                                                    </div>

                                                    <div className="flex items-center gap-3 mt-1">
                                                        <div className="w-9 h-9 rounded-full bg-white flex items-center justify-center p-1.5 overflow-hidden">
                                                            <div className="text-[10px] font-black tracking-tighter text-neutral-darkest uppercase select-none">
                                                                SL<span className="text-primary">/</span>CE
                                                            </div>
                                                        </div>
                                                        <div>
                                                            <div className="text-sm font-bold text-white leading-none">Slice</div>
                                                            <div className="text-[10px] text-[#00a884] mt-1 font-medium">online</div>
                                                        </div>
                                                    </div>

                                                    <div className="flex gap-4 text-white/60">
                                                        <ArrowLeft size={18} className="rotate-180" />
                                                    </div>
                                                </div>

                                                {/* Chat Area */}
                                                <div className="flex-1 p-5 space-y-6 flex flex-col justify-end relative">
                                                    {/* Date */}
                                                    <div className="flex justify-center mb-4">
                                                        <div className="bg-[#1f2c33] px-3 py-1 rounded-lg text-[10px] font-medium text-white/50">
                                                            TODAY
                                                        </div>
                                                    </div>

                                                    {/* Received Message 1 */}
                                                    <div className="flex flex-col items-start max-w-[90%] relative animate-float-1">
                                                        <div className="bg-[#1f2c33] text-[#e9edef] p-4 rounded-[1.2rem] rounded-tl-none shadow-md relative border border-white/5">
                                                            <p className="text-[13px] leading-[1.6]">
                                                                Warehouse Update: We've <span className="text-[#00a884] font-bold">received your products</span>. Verification complete.
                                                            </p>
                                                            <div className="mt-1.5 flex justify-end">
                                                                <span className="text-[9px] text-white/30 font-bold">10:42 AM</span>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    {/* Received Message 2 */}
                                                    <div className="flex flex-col items-start max-w-[90%] relative animate-float-2" style={{ animationDelay: '0.5s' }}>
                                                        <div className="bg-[#005c4b] text-[#e9edef] p-4 rounded-[1.2rem] rounded-tl-none shadow-lg relative border border-white/5">
                                                            <p className="text-[13px] leading-[1.6]">
                                                                Deployment: Your products are now <span className="font-bold underline decoration-white/20">en route to @olamide</span>. Video coming soon.
                                                            </p>
                                                            <div className="mt-1.5 flex justify-end items-center gap-1">
                                                                <span className="text-[9px] text-white/40 font-bold">11:15 AM</span>
                                                                <CheckCheck size={14} className="text-[#53bdeb]" />
                                                            </div>
                                                        </div>
                                                    </div>

                                                    {/* Typing Indicator */}
                                                    <div className="flex gap-1.5 items-center pl-2 opacity-20 mt-2">
                                                        <div className="w-1.5 h-1.5 rounded-full bg-white animate-bounce"></div>
                                                        <div className="w-1.5 h-1.5 rounded-full bg-white animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                                                        <div className="w-1.5 h-1.5 rounded-full bg-white animate-bounce" style={{ animationDelay: '0.4s' }}></div>
                                                    </div>

                                                    {/* Subtle Background Pattern */}
                                                    <div className="absolute inset-0 pointer-events-none opacity-[0.04] bg-[url('https://www.transparenttextures.com/patterns/graphy-dark.png')]"></div>
                                                </div>
                                            </div>

                                            {/* Screen Shine Overlay */}
                                            <div className="absolute inset-0 bg-gradient-to-tr from-white/5 to-transparent pointer-events-none"></div>
                                        </div>
                                    </div>

                                    {/* Physical Side Buttons (Ultra Sleek) */}
                                    <div className="absolute top-28 -left-0.5 w-1 h-12 bg-neutral-700 rounded-r-lg z-30 shadow-sm"></div>
                                    <div className="absolute top-44 -left-0.5 w-1 h-16 bg-neutral-700 rounded-r-lg z-30 shadow-sm"></div>
                                    <div className="absolute top-36 -right-0.5 w-1 h-20 bg-neutral-700 rounded-l-lg z-30 shadow-sm"></div>

                                    {/* Natural Glow / Shadow behind phone */}
                                    <div className="absolute -inset-10 bg-primary/10 blur-[60px] rounded-full -z-10 opacity-30 animate-pulse"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* SOCIAL PROOF: A Slice of Success */}
            <div className="px-6 sm:px-12 py-32 max-w-[1400px] mx-auto border-b border-neutral-darkest/10 bg-neutral-lightest">
                <div className="flex flex-col lg:flex-row gap-16 lg:gap-24 items-center">

                    {/* Left Side: Clean Social Proof Title */}
                    <div className="w-full lg:w-4/12 flex flex-col justify-start pt-4">
                        <h2 className="text-4xl md:text-5xl lg:text-[3.8rem] leading-[1.1] font-bold tracking-[-0.04em] text-neutral-darkest mb-6">
                            Brands trust <br />
                            <span className="font-serif italic text-primary">Slice99.</span>
                        </h2>
                        <p className="text-xl text-neutral-dark font-light max-w-sm">
                            Founder-led brands are abandoning bloated agency retainers for our fractionalized UGC engine.
                        </p>
                    </div>

                    {/* Right Side: Editorial Testimonial Carousel styled like #paid */}
                    <div className="w-full lg:w-8/12 flex flex-col bg-white rounded-[2rem] p-8 sm:p-12 shadow-[0_20px_50px_rgba(0,0,0,0.05)] border border-neutral-darkest/5 relative min-h-[400px]">
                        {/* Quote Text */}
                        <div className="min-h-[160px] md:min-h-[140px] mb-8 relative">
                            {/* Quote mark aesthetic */}
                            <div className="absolute -top-4 -left-4 text-7xl text-neutral-lightest font-serif leading-none italic z-0 select-none">"</div>
                            <p className="text-2xl md:text-3xl font-medium tracking-tight text-neutral-darkest leading-[1.3] relative z-10">
                                {testimonials[testimonialIdx].quote}
                            </p>
                        </div>

                        {/* Person Info & Controls */}
                        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-8 mt-auto z-10">

                            <div className="flex items-center gap-5">
                                <div className="w-16 h-16 rounded-[1rem] overflow-hidden shadow-lg border border-neutral-darkest/10 shrink-0 transform -rotate-2">
                                    <img src={testimonials[testimonialIdx].image} className="w-full h-full object-cover" alt={testimonials[testimonialIdx].name} />
                                </div>
                                <div className="flex flex-col">
                                    <span className="text-lg font-bold text-neutral-darkest">{testimonials[testimonialIdx].name}</span>
                                    <span className="text-xs font-mono uppercase tracking-widest text-neutral-light">{testimonials[testimonialIdx].title}</span>
                                </div>
                            </div>

                            {/* Controls */}
                            <div className="flex items-center gap-3 shrink-0">
                                <button onClick={prevTestimonial} className="w-12 h-12 rounded-full border border-neutral-darkest/20 flex items-center justify-center hover:bg-neutral-darkest hover:border-neutral-darkest hover:text-white transition-all text-neutral-darkest group">
                                    <ArrowLeft size={20} className="group-hover:-translate-x-0.5 transition-transform" />
                                </button>
                                <button onClick={nextTestimonial} className="w-12 h-12 rounded-full border border-neutral-darkest/20 flex items-center justify-center hover:bg-neutral-darkest hover:border-neutral-darkest hover:text-white transition-all text-neutral-darkest group">
                                    <ArrowRight size={20} className="group-hover:translate-x-0.5 transition-transform" />
                                </button>
                            </div>

                        </div>

                        {/* Slide Indicator */}
                        <div className="absolute top-8 right-8 sm:top-12 sm:right-12 text-[10px] font-mono tracking-widest text-neutral-light">
                            0{testimonialIdx + 1} &mdash; 0{testimonials.length}
                        </div>
                    </div>

                </div>
            </div>

            {/* FAQ - Extremely stark */}
            <div id="faq" className="px-6 sm:px-12 py-32 max-w-[1000px] mx-auto border-b border-neutral-darkest/10">
                <h2 className="text-4xl font-medium tracking-tight text-neutral-darkest mb-16 font-serif italic text-center">
                    FAQs
                </h2>

                <div className="border-t border-neutral-darkest/10">
                    {[
                        {
                            q: "What do I get for $99?",
                            a: "Each 'Slice' costs $99 and guarantees one high-quality video asset, plus one post on the creator's feed. You retain full commercial rights to the video file."
                        },
                        {
                            q: "Can I buy more than one slice?",
                            a: "Yes. You can purchase as many slices as you need depending on your content volume requirements. We ship boxes to creators on a weekly basis, meaning your content scales instantly."
                        },
                        {
                            q: "Does this replace out-of-house agencies?",
                            a: "Absolutely. Our model strips away the account management overhead, focusing solely on asset procurement. You get the deliverables without paying for the meetings."
                        },
                        {
                            q: "Who owns the rights to the content?",
                            a: "You do. Every asset delivered through the Slice system includes full licensing in perpetuity for paid and organic distribution."
                        },
                    ].map((faq, idx) => (
                        <AccordionItem
                            key={idx}
                            q={faq.q}
                            a={faq.a}
                            isOpen={openFaq === idx}
                            onClick={() => setOpenFaq(idx === openFaq ? null : idx)}
                        />
                    ))}
                </div>
            </div>

            {/* FINAL CTA */}
            <div className="bg-neutral-lightest py-32 px-6 sm:px-12 text-center relative overflow-hidden">

                {/* Glowing Orb */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/20 blur-[120px] rounded-full pointer-events-none"></div>

                {/* Floating Aesthetic Elements */}
                <div className="absolute top-[10%] left-[15%] w-32 h-32 bg-neutral-200 rounded-3xl overflow-hidden shadow-2xl transform -rotate-12 animate-float-2 z-0 hidden md:block border-4 border-white opacity-90">
                    <img src="https://images.unsplash.com/photo-1556228578-0d85b1a4d571?q=80&w=400&auto=format&fit=crop" className="w-full h-full object-cover" alt="Skincare" />
                </div>

                <div className="absolute bottom-[20%] right-[10%] xl:right-[15%] w-40 h-40 bg-neutral-200 rounded-full overflow-hidden shadow-2xl transform rotate-6 animate-float-1 z-0 hidden md:block border-4 border-white opacity-90 delay-150">
                    <img src="https://images.unsplash.com/photo-1524504388940-b1c1722653e1?q=80&w=400&auto=format&fit=crop" className="w-full h-full object-cover" alt="Creator" />
                </div>

                <div className="absolute top-[30%] right-[5%] w-24 h-24 bg-neutral-200 rounded-[1.5rem] overflow-hidden shadow-xl transform rotate-12 animate-float-3 z-0 hidden lg:block border-[3px] border-white opacity-80 delay-300">
                    <img src="https://images.unsplash.com/photo-1620916566398-39f1143ab7be?q=80&w=400&auto=format&fit=crop" className="w-full h-full object-cover" alt="Box" />
                </div>

                <div className="max-w-4xl mx-auto relative z-10">
                    <h2 className="text-4xl md:text-6xl md:leading-[1.1] font-medium tracking-tight mb-8 text-neutral-darkest">
                        Stop chasing creators.<br className="hidden sm:block" /> Start shipping content.
                    </h2>

                    <button
                        onClick={handleHeroClick}
                        className="mt-8 px-10 py-5 bg-neutral-darkest text-white text-xl font-medium hover:bg-brand-orange hover:-translate-y-1 transition-all duration-300 flex items-center justify-center gap-3 mx-auto shadow-2xl rounded-2xl group"
                    >
                        Get a Slice
                        <ExternalLink size={20} className="group-hover:translate-x-1 transition-transform" />
                    </button>
                    <div className="mt-8 text-sm text-neutral-dark font-mono tracking-widest uppercase font-bold">
                        $99 Per Slice <span className="opacity-50">/</span> Zero DMs
                    </div>
                </div>
            </div>
        </div>
    );
};