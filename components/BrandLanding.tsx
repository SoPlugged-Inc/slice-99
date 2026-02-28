import React, { useState, useEffect } from 'react';
import { Package, Smartphone, CheckCircle2, Lightbulb, Play, Loader2, ChevronLeft, ChevronRight, Download, FileVideo, Eye, Heart, Share2, MousePointer2, Megaphone, Link, ChevronDown } from 'lucide-react';
import { LiveDrop } from './LiveDrop';
import { TextReveal, ColumnBackground, SpotlightCard, Section, SectionHeading, LogoMarquee } from './Shared';

const FaqItem: React.FC<{ faq: { q: string, a: string }, idx: number }> = ({ faq, idx }) => {
    const [isOpen, setIsOpen] = useState(false);
    return (
        <div className="bg-white rounded border border-neutral-lighter shadow-sm group hover:border-primary/50 transition-colors overflow-hidden">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-full text-left p-6 flex items-center justify-between focus:outline-none"
            >
                <h4 className="font-bold text-neutral-darkest text-sm uppercase tracking-wide group-hover:text-primary transition-colors flex items-center gap-2 m-0">
                    <span className="text-neutral-lighter group-hover:text-primary/50">0{idx + 1}.</span>
                    {faq.q}
                </h4>
                <ChevronDown size={18} className={`text-neutral-light transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
            </button>
            <div className={`px-6 pb-6 pt-0 overflow-hidden transition-all duration-300 ${isOpen ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0 pb-0'}`}>
                <p className="text-neutral-dark text-sm leading-relaxed pl-6 border-l border-neutral-lighter group-hover:border-primary/20 transition-colors">{faq.a}</p>
            </div>
        </div>
    );
};

export const BrandLanding: React.FC = () => {
    const [isVisible, setIsVisible] = useState(false);
    const [isHeroLoading, setIsHeroLoading] = useState(false);
    const [currentMonthDrop, setCurrentMonthDrop] = useState("");
    const [currentSlide, setCurrentSlide] = useState(0);

    useEffect(() => {
        setIsVisible(true);

        // Calculate dynamic month string
        const date = new Date();
        const monthName = date.toLocaleString('default', { month: 'long' });
        setCurrentMonthDrop(`${monthName} Drop`);
    }, []);

    const handleHeroClick = (e: React.MouseEvent) => {
        e.preventDefault();
        setIsHeroLoading(true);
        setTimeout(() => {
            setIsHeroLoading(false);
            window.open('https://book.stripe.com/aFafZadjE3050Wh4Bq5Vu00', '_blank');
        }, 1000);
    };

    const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % 4);
    const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + 4) % 4);

    const slides = [
        {
            id: 0,
            label: "Final Video",
            title: "TikTok-Ready Content",
            badge: "9:16 Vertical",
            copy: "The creator shoots a high-quality, vertical video featuring all products in the haul.",
            renderVisual: () => (
                <div className="relative w-48 sm:w-56 h-[400px] bg-neutral-darkest rounded-[2rem] shadow-2xl border-4 border-neutral-darkest overflow-hidden shrink-0 transform hover:scale-[1.02] transition-transform duration-500 mx-auto">
                    {/* Status Bar */}
                    <div className="absolute top-0 left-0 right-0 h-6 bg-black z-20 flex justify-between px-4 items-center">
                        <span className="text-[10px] text-white">9:41</span>
                        <div className="flex gap-1">
                            <div className="w-3 h-2 bg-white rounded-sm"></div>
                            <div className="w-1 h-2 bg-white rounded-sm"></div>
                        </div>
                    </div>

                    {/* Video Area */}
                    <div className="absolute inset-0 bg-neutral-800 flex items-center justify-center group cursor-pointer">
                        <video
                            className="absolute inset-0 w-full h-full object-cover"
                            autoPlay
                            loop
                            muted
                            playsInline
                            poster="https://images.unsplash.com/photo-1556905055-8f358a7a47b2?q=80&w=800&auto=format&fit=crop"
                        >
                            <source src="https://videos.pexels.com/video-files/4450209/4450209-hd_720_1280_25fps.mp4" type="video/mp4" />
                        </video>

                        {/* Gradient Overlay */}
                        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/60 z-10"></div>

                        {/* Play Button Overlay */}
                        <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center border border-white/30 z-10 opacity-0 group-hover:opacity-100 transition-opacity">
                            <Play fill="white" className="text-white ml-1" size={20} />
                        </div>

                        {/* UI Overlay */}
                        <div className="absolute bottom-4 left-3 right-12 z-20 text-white">
                            <div className="text-xs font-bold mb-1">@SarahFinds</div>
                            <div className="text-[10px] opacity-90 leading-snug">Unboxing this month's discovery box! So many cool finds inside 📦 ✨ #haul #unboxing</div>
                        </div>

                        {/* Side Actions */}
                        <div className="absolute bottom-4 right-2 z-20 flex flex-col gap-3 items-center">
                            <div className="w-6 h-6 rounded-full bg-white/20 backdrop-blur mb-1 flex items-center justify-center"><span className="block w-3 h-3 rounded-full bg-red-500"></span></div>
                            <div className="w-6 h-6 rounded-full bg-white/20 backdrop-blur"></div>
                            <div className="w-6 h-6 rounded-full bg-white/20 backdrop-blur"></div>
                        </div>
                    </div>
                </div>
            )
        },
        {
            id: 1,
            label: "Distribution",
            title: "Guaranteed Eyes on Your Brand",
            badge: "Creator Posted",
            copy: "The creator posts the video to their feed, putting your brand in front of thousands of potential shoppers.",
            renderVisual: () => (
                <div className="relative w-full max-w-xs mx-auto">
                    {/* Social Post Mockup */}
                    <div className="bg-white rounded-xl shadow-xl border border-neutral-lighter overflow-hidden relative z-10">
                        {/* Post Header */}
                        <div className="p-3 flex items-center gap-3 border-b border-neutral-lightest">
                            <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-yellow-400 to-purple-600 p-[2px]">
                                <div className="w-full h-full rounded-full bg-white border-2 border-white overflow-hidden">
                                    <img src="https://i.pravatar.cc/100?img=5" alt="" className="w-full h-full object-cover" />
                                </div>
                            </div>
                            <div className="flex-1">
                                <div className="text-xs font-bold text-neutral-darkest">SarahFinds</div>
                                <div className="text-[10px] text-neutral-light">Toronto, Canada</div>
                            </div>
                            <div className="text-neutral-light"><Share2 size={14} /></div>
                        </div>

                        {/* Image Placeholder */}
                        <div className="aspect-[4/5] bg-neutral-100 relative group overflow-hidden">
                            <div className="absolute inset-0 bg-neutral-200 animate-pulse"></div>
                            <div className="absolute bottom-3 left-3 bg-black/50 text-white text-[10px] px-2 py-1 rounded backdrop-blur-sm flex items-center gap-1">
                                <Eye size={10} /> 12.5k Views
                            </div>
                        </div>

                        {/* Post Footer */}
                        <div className="p-3">
                            <div className="flex gap-3 mb-2 text-neutral-darkest">
                                <Heart size={18} className="text-red-500 fill-red-500" />
                                <div className="w-4 h-4 rounded-full border-2 border-neutral-darkest"></div>
                                <Share2 size={18} />
                            </div>
                            <div className="text-xs font-bold text-neutral-darkest mb-1">842 likes</div>
                            <div className="text-xs text-neutral-dark"><span className="font-bold text-neutral-darkest">SarahFinds</span> obsessed with these new goodies...</div>
                        </div>
                    </div>

                    {/* Floating Tooltip */}
                    <div className="absolute -right-4 top-1/2 z-20 bg-primary text-white text-xs font-bold px-3 py-1.5 rounded-lg shadow-lg flex items-center gap-2 animate-bounce">
                        <MousePointer2 size={12} /> Link in Bio
                    </div>
                </div>
            )
        },
        {
            id: 2,
            label: "Traffic",
            title: "Shoppable Link-in-Bio",
            badge: "Click Tracking Included",
            copy: 'We build a dedicated "Shop the Haul" landing page for every video. Viewers can click straight to your website to shop.',
            renderVisual: () => (
                <div className="relative w-48 sm:w-56 h-[400px] bg-neutral-darkest rounded-[2rem] shadow-2xl border-4 border-neutral-darkest overflow-hidden shrink-0 mx-auto">
                    {/* Status Bar */}
                    <div className="absolute top-0 left-0 right-0 h-6 bg-black z-20 flex justify-between px-4 items-center">
                        <span className="text-[10px] text-white">9:41</span>
                        <div className="flex gap-1">
                            <div className="w-3 h-2 bg-white rounded-sm"></div>
                            <div className="w-1 h-2 bg-white rounded-sm"></div>
                        </div>
                    </div>

                    {/* Linktree UI */}
                    <div className="absolute inset-0 bg-neutral-100 flex flex-col pt-10 px-4 items-center font-sans">
                        {/* Profile */}
                        <div className="w-16 h-16 rounded-full bg-neutral-300 mb-3 border-2 border-white shadow-sm overflow-hidden">
                            <img src="https://i.pravatar.cc/100?img=5" alt="" className="w-full h-full object-cover" />
                        </div>
                        <div className="text-xs font-bold text-neutral-800 mb-6">@SarahFinds Picks</div>

                        {/* Buttons */}
                        <div className="w-full space-y-3">
                            <div className="w-full py-3 px-4 bg-white rounded-lg shadow-sm border border-neutral-200 text-xs font-medium text-center hover:scale-105 transition-transform cursor-pointer text-neutral-800 flex items-center justify-center gap-2">
                                Shop Brand A <span className="text-[8px] px-1 bg-neutral-100 border rounded text-neutral-500">Skincare</span>
                            </div>
                            <div className="w-full py-3 px-4 bg-white rounded-lg shadow-sm border border-neutral-200 text-xs font-medium text-center hover:scale-105 transition-transform cursor-pointer text-neutral-800 flex items-center justify-center gap-2">
                                Shop Brand B <span className="text-[8px] px-1 bg-neutral-100 border rounded text-neutral-500">Candle</span>
                            </div>
                            <div className="w-full py-3 px-4 bg-white rounded-lg shadow-sm border border-neutral-200 text-xs font-medium text-center hover:scale-105 transition-transform cursor-pointer text-neutral-800 flex items-center justify-center gap-2">
                                Shop Brand C <span className="text-[8px] px-1 bg-neutral-100 border rounded text-neutral-500">Snacks</span>
                            </div>
                        </div>

                        {/* Analytics Overlay (Visual hint of data) */}
                        <div className="absolute bottom-6 bg-black/80 backdrop-blur-md text-white px-3 py-2 rounded-lg flex items-center gap-2 text-[10px] shadow-lg animate-[bounce_2s_infinite]">
                            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                            <span>124 Clicks Today</span>
                        </div>
                    </div>
                </div>
            )
        },
        {
            id: 3,
            label: "Ownership",
            title: "Ad-Ready Assets",
            badge: "100% Usage Rights",
            copy: "You own the raw video file forever. Run it as a Meta Ad, embed it on your website, or use it in email campaigns without extra licensing fees.",
            renderVisual: () => (
                <div className="relative w-full max-w-xs mx-auto flex flex-col gap-4">
                    {/* File Download Card */}
                    <div className="bg-white rounded-lg shadow-lg border border-neutral-lighter p-4 flex items-center gap-4 relative z-10 transform -rotate-2 hover:rotate-0 transition-transform duration-300">
                        <div className="w-12 h-12 rounded bg-primary/10 flex items-center justify-center text-primary">
                            <FileVideo size={24} />
                        </div>
                        <div className="flex-1 min-w-0">
                            <div className="text-sm font-bold text-neutral-darkest truncate">final_haul_video.mp4</div>
                            <div className="text-xs text-neutral-light">48.2 MB • H.264</div>
                        </div>
                        <div className="w-8 h-8 rounded-full bg-neutral-lightest flex items-center justify-center text-neutral-dark cursor-pointer hover:bg-neutral-lighter">
                            <Download size={16} />
                        </div>
                    </div>

                    {/* Ad Preview Card */}
                    <div className="bg-white rounded-lg shadow-lg border border-neutral-lighter p-3 relative z-0 transform rotate-2 hover:rotate-0 transition-transform duration-300 ml-8 opacity-90">
                        <div className="flex items-center gap-2 mb-2">
                            <div className="w-6 h-6 rounded bg-neutral-200"></div>
                            <div className="flex-1">
                                <div className="h-2 w-20 bg-neutral-200 rounded mb-1"></div>
                                <div className="text-[10px] text-neutral-light flex items-center gap-1">
                                    Sponsored <Megaphone size={8} />
                                </div>
                            </div>
                        </div>
                        <div className="h-24 bg-neutral-100 rounded mb-2 flex items-center justify-center text-neutral-300">
                            <div className="w-8 h-8 rounded-full border-2 border-current border-t-transparent animate-spin"></div>
                        </div>
                        <div className="h-8 bg-primary/10 rounded flex items-center justify-center text-xs font-bold text-primary">
                            Shop Now
                        </div>
                    </div>
                </div>
            )
        }
    ];

    return (
        <>
            {/* Hero Section */}
            <div className="relative pt-24 pb-16 sm:pt-32 sm:pb-20 px-4 sm:px-6 overflow-hidden flex flex-col items-center">
                <ColumnBackground />

                <div className="relative z-10 max-w-4xl mx-auto text-center w-full">
                    <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full bg-neutral-darkest text-white border border-neutral-darkest shadow-lg shadow-neutral-darkest/20 text-[10px] sm:text-xs font-bold tracking-wide mb-6 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
                        <span className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-green opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-brand-green"></span>
                        </span>
                        Open for Booking: {currentMonthDrop}
                    </div>

                    <h1 className="text-4xl sm:text-6xl font-extrabold text-neutral-darkest tracking-tight mb-5 leading-[1.05] sm:leading-[1.1]">
                        <TextReveal text="Get your product on TikTok." delay={0.1} className="block mb-1" />
                        <TextReveal text="Guaranteed. For $99." delay={0.4} />
                    </h1>

                    <div className={`transition-all duration-1000 delay-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                        <p className="text-lg sm:text-xl text-neutral-dark mb-8 max-w-2xl mx-auto leading-relaxed">
                            We pool non-competing brands to split the cost of a UGC-style Haul.
                        </p>

                        <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
                            {/* Button with Border Beam */}
                            <div className="relative group rounded-md w-full sm:w-auto">
                                <div className="border-beam rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-500" style={{ '--duration': 4 } as React.CSSProperties}></div>
                                <button
                                    onClick={handleHeroClick}
                                    disabled={isHeroLoading}
                                    className="relative w-full sm:w-auto px-8 py-3.5 bg-primary text-white font-bold tracking-tight rounded-md hover:bg-primary-hover transition-all shadow-xl shadow-primary/20 hover:shadow-primary/40 hover:-translate-y-0.5 active:translate-y-0 text-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 flex items-center justify-center gap-2 disabled:opacity-80 disabled:cursor-not-allowed disabled:transform-none"
                                >
                                    {isHeroLoading ? <Loader2 size={20} className="animate-spin" /> : "Claim Slot ($99)"}
                                </button>
                            </div>

                            <div className="text-sm text-neutral-dark flex items-center gap-2 justify-center">
                                <span className="flex -space-x-2">
                                    {[1, 2, 3].map(i => (
                                        <div key={i} className="w-8 h-8 rounded-full border-2 border-white bg-neutral-lighter overflow-hidden">
                                            <img src={`https://picsum.photos/32/32?random=${i}`} alt="" className="w-full h-full object-cover grayscale" />
                                        </div>
                                    ))}
                                </span>
                                <span className="font-medium text-xs">Trusted by 50+ Canadian Brands</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Live Drop Component Injection */}
                <div id="live-drop" className={`w-full transition-all duration-1000 delay-1000 ${isVisible ? 'opacity-100 translate-y-0 blur-0' : 'opacity-0 translate-y-12 blur-sm'}`}>
                    <LiveDrop />
                </div>

                {/* Trusted By Marquee */}
                <div className="mt-16 w-full max-w-6xl mx-auto">
                    <p className="text-center text-neutral text-[10px] uppercase tracking-[0.2em] mb-4 text-neutral-light font-bold">Powering the next generation of brands</p>
                    <LogoMarquee />
                </div>
            </div>

            {/* How It Works */}
            <Section className="bg-neutral-lightest border-y border-neutral-lighter" id="how-it-works">
                <SectionHeading
                    title="How It Works"
                    subtitle="The easiest way to get authentic UGC for your brand without the headache."
                />
                <div className="grid md:grid-cols-3 gap-6 sm:gap-8 mb-12">
                    {[
                        {
                            step: "01",
                            title: "Book",
                            desc: "Secure your slot for $99. We vet and hire the creator for you—avoiding expensive mistakes and awkward DMs.",
                            icon: <CheckCircle2 className="text-primary" size={24} aria-hidden="true" />
                        },
                        {
                            step: "02",
                            title: "Ship",
                            desc: "Send your product to our consolidation hub in Canada. We pack the haul and ship it to the creator.",
                            icon: <Package className="text-primary" size={24} aria-hidden="true" />
                        },
                        {
                            step: "03",
                            title: "Watch",
                            desc: "Receive your video file and watch the creator post it to their feed within 14 days.",
                            icon: <Smartphone className="text-primary" size={24} aria-hidden="true" />
                        }
                    ].map((item, idx) => (
                        <SpotlightCard key={idx} className="p-6 sm:p-8 h-full bg-white shadow-sm hover:shadow-md relative overflow-hidden group hover:border-primary/30">
                            {/* Corner Accents */}
                            <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-primary/10 group-hover:border-primary/50 transition-colors rounded-tl-lg"></div>
                            <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-primary/10 group-hover:border-primary/50 transition-colors rounded-br-lg"></div>

                            <div className="flex items-center justify-between mb-4">
                                <div className="text-xs text-primary font-bold bg-primary/5 px-2 py-1 rounded border border-primary/20">Step {item.step}</div>
                                <div className="p-2 bg-neutral-lightest rounded border border-neutral-lighter text-primary">{item.icon}</div>
                            </div>

                            <h3 className="text-xl font-bold text-neutral-darkest mb-3 tracking-tight">{item.title}</h3>
                            <p className="text-neutral-dark leading-relaxed text-sm">{item.desc}</p>
                        </SpotlightCard>
                    ))}
                </div>

                {/* Value Prop Carousel (Replaces Static Video Section) */}
                <div className="w-full max-w-5xl mx-auto mt-16">
                    <div className="relative rounded-xl border border-neutral-lighter bg-white overflow-hidden shadow-soft">
                        {/* Header Bar */}
                        <div className="flex items-center justify-between px-4 py-3 bg-neutral-lightest border-b border-neutral-lighter">
                            <div className="flex gap-2">
                                <div className="w-3 h-3 rounded-full bg-neutral-lighter border border-neutral-light/50"></div>
                                <div className="w-3 h-3 rounded-full bg-neutral-lighter border border-neutral-light/50"></div>
                            </div>
                            <div className="text-xs font-medium text-neutral-light tracking-wide">
                                Preview: {slides[currentSlide].label}
                            </div>
                            <div className="w-16"></div>
                        </div>

                        <div className="relative h-[650px] md:h-[500px] flex items-center bg-grid-pattern bg-[length:20px_20px]">
                            {/* Navigation Arrows */}
                            <button
                                onClick={prevSlide}
                                className="absolute left-2 sm:left-4 z-30 p-2 rounded-full bg-white/80 hover:bg-white text-neutral-dark border border-neutral-lighter shadow-sm transition-colors focus:outline-none"
                            >
                                <ChevronLeft size={20} />
                            </button>
                            <button
                                onClick={nextSlide}
                                className="absolute right-2 sm:right-4 z-30 p-2 rounded-full bg-white/80 hover:bg-white text-neutral-dark border border-neutral-lighter shadow-sm transition-colors focus:outline-none"
                            >
                                <ChevronRight size={20} />
                            </button>

                            <div className="w-full h-full flex flex-col md:flex-row items-center justify-center p-6 sm:p-12 gap-8 md:gap-16">

                                {/* Visual Side */}
                                <div className="w-full md:w-1/2 flex items-center justify-center">
                                    <div key={currentSlide} className="animate-[slideUpFade_0.5s_ease-out]">
                                        {slides[currentSlide].renderVisual()}
                                    </div>
                                </div>

                                {/* Text Context Side */}
                                <div className="w-full md:w-1/2 max-w-sm text-center md:text-left">
                                    <div key={currentSlide} className="animate-[slideUpFade_0.5s_ease-out_0.1s]">
                                        <div className="inline-block px-3 py-1 bg-primary/10 border border-primary/20 rounded-full text-primary text-xs font-bold mb-4">
                                            {slides[currentSlide].badge}
                                        </div>
                                        <h3 className="text-2xl font-bold text-neutral-darkest mb-4 tracking-tight">
                                            {slides[currentSlide].title}
                                        </h3>
                                        <p className="text-neutral-dark text-sm leading-relaxed mb-6">
                                            {slides[currentSlide].copy}
                                        </p>

                                        {/* Slide Indicators (Dots) */}
                                        <div className="flex items-center justify-center md:justify-start gap-2">
                                            {slides.map((_, idx) => (
                                                <button
                                                    key={idx}
                                                    onClick={() => setCurrentSlide(idx)}
                                                    className={`w-2 h-2 rounded-full transition-all duration-300 ${idx === currentSlide ? 'bg-primary w-6' : 'bg-neutral-lighter hover:bg-neutral-light'}`}
                                                />
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Section>

            {/* Did You Know Section */}
            <Section className="bg-neutral-white border-b border-neutral-lighter">
                <div className="bg-primary/5 border border-primary/20 rounded-xl p-6 sm:p-8 flex flex-col sm:flex-row items-start gap-6 max-w-4xl mx-auto relative overflow-hidden">
                    {/* Technical decorative line */}
                    <div className="absolute top-0 left-0 w-1 h-full bg-primary/40"></div>

                    <div className="shrink-0 p-3 bg-white rounded border border-primary/20 text-primary shadow-sm">
                        <Lightbulb size={24} aria-hidden="true" />
                    </div>
                    <div>
                        <h3 className="text-sm font-bold text-primary mb-2 uppercase tracking-widest flex items-center gap-2">
                            <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
                            Did You Know?
                        </h3>
                        <p className="text-neutral-darkest font-medium leading-relaxed text-base sm:text-lg">
                            Haul videos with multiple brands actually perform better than single-product reviews. Viewers watch longer to see "what else is in the box." By grouping up, you get more watch time.
                        </p>
                    </div>
                </div>
            </Section>

            {/* Value Prop / Comparison */}
            <Section>
                <div className="max-w-4xl mx-auto bg-white rounded-lg border border-neutral-lighter overflow-hidden shadow-soft hover:shadow-glow transition-shadow duration-500">
                    <div className="grid grid-cols-3 bg-neutral-darkest p-4 text-[10px] sm:text-xs font-bold tracking-widest text-white uppercase border-b border-neutral-darker">
                        <div className="text-neutral-400">Comparison</div>
                        <div className="text-center">Traditional Agency</div>
                        <div className="text-primary text-center">Slice</div>
                    </div>

                    {[
                        { label: "Cost", bad: "$2,000 - $5,000+", good: "$99 Flat Rate" },
                        { label: "Effort", bad: "Cold DMing & Negotiations", good: "Instant Booking" },
                        { label: "Logistics", bad: "Individual Shipping", good: "Consolidated Hub" },
                        { label: "Outcome", bad: "No Guarantee", good: "Guaranteed Post" },
                    ].map((row, idx) => (
                        <div key={idx} className="grid grid-cols-3 p-4 sm:p-5 border-b border-neutral-lighter last:border-0 items-center hover:bg-neutral-lightest/30 transition-colors group">
                            <div className="text-neutral-dark text-xs sm:text-sm font-bold uppercase">{row.label}</div>
                            <div className="text-center text-neutral text-sm sm:text-base flex justify-center items-center gap-2 opacity-60 decoration-dashed">
                                {row.bad}
                            </div>
                            <div className="text-center font-bold text-neutral-darkest text-sm sm:text-base flex justify-center items-center gap-2 py-1.5 rounded text-primary relative">
                                <div className="absolute inset-0 bg-primary/5 scale-x-0 group-hover:scale-x-100 transition-transform origin-center rounded"></div>
                                <CheckCircle2 size={16} className="text-primary hidden sm:block relative z-10" aria-hidden="true" />
                                <span className="relative z-10">{row.good}</span>
                            </div>
                        </div>
                    ))}
                </div>
            </Section>

            {/* FAQ */}
            <Section className="bg-white" id="faq">
                <SectionHeading title="Frequently Asked Questions" subtitle="Everything you need to know about the Slice process." />
                <div className="max-w-3xl mx-auto space-y-4">
                    {[
                        { q: "How is this only $99?", a: "We use a \"Pooling\" model. Instead of one brand paying $1,000+ for a high-tier creator, we pool 3-5 non-competing products into a single curated \"Discovery Box.\" This allows you to split the cost of production while still receiving a premium, professional video asset." },
                        { q: "Who is the creator?", a: "Once a batch is filled, we match the pool with a vetted creator from our network who aligns with your product’s category (e.g., Wellness, Tech, or Lifestyle). All creators are vetted for high engagement, authentic followers, and a proven track record of high-quality content." },
                        { q: "Do I have any creative control?", a: "Yes. While we handle the heavy lifting to keep your costs low, you will provide a \"Product Brief\" during checkout. This allows you to list up to three mandatory \"Must-Haves\" (e.g., \"Show the texture,\" or \"Mention it’s eco-friendly\") that the creator is required to include in their video." },
                        { q: "Do I get the video file?", a: "Absolutely. You receive the high-resolution raw video file with full usage rights. This means you can repost it on your own organic channels or use it as a \"TikTok-first\" creative in your paid ad campaigns." },
                        { q: "What if my product doesn't fit?", a: "We curate themed 'Discovery Boxes' so products fit naturally alongside each other. If your product is exceptionally large (e.g., furniture) or requires specific legal disclosures, please contact us at Email Support before booking your slot." },
                    ].map((faq, idx) => (
                        <FaqItem key={idx} faq={faq} idx={idx} />
                    ))}
                </div>
                <div className="mt-8 text-center bg-neutral-lightest/50 p-4 rounded border border-neutral-lighter inline-block w-full">
                    <p className="text-neutral-dark text-sm">
                        Can't find what you're looking for? <a href="mailto:support@slice99.com" className="text-primary hover:underline font-bold ml-2">Email Support</a>
                    </p>
                </div>
            </Section>
        </>
    );
};