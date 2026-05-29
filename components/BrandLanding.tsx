import React, { useState } from 'react';
import { 
    ArrowRight, 
    ChevronDown, 
    Check, 
    TrendingUp
} from 'lucide-react';
import { LogoMarquee } from './Shared';

const AccordionItem: React.FC<{ q: string, a: string, isOpen: boolean, onClick: () => void }> = ({ q, a, isOpen, onClick }) => (
    <div className="border-b border-neutral-lighter/50">
        <button
            onClick={onClick}
            className="w-full text-left py-6 md:py-8 flex items-center justify-between focus:outline-none group"
        >
            <h4 className="font-sans font-bold text-neutral-darkest tracking-tight text-lg md:text-xl group-hover:text-primary transition-colors pr-8">
                {q}
            </h4>
            <div className={`w-8 h-8 rounded-full border border-neutral-lighter flex items-center justify-center transition-transform duration-300 shrink-0 ${isOpen ? 'rotate-180 bg-neutral-darkest text-white border-neutral-darkest' : ''}`}>
                <ChevronDown size={14} className={isOpen ? "text-white" : "text-neutral-dark"} />
            </div>
        </button>
        <div className={`overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? 'max-h-[500px] opacity-100 pb-8' : 'max-h-0 opacity-0 pb-0'}`}>
            <p className="text-neutral-dark text-base leading-relaxed max-w-3xl font-light">{a}</p>
        </div>
    </div>
);

const testimonials = [
    {
        quote: "No one wants to watch a 30-second ad just explaining our productivity client. But when our tool was grouped alongside Trello and Discord in a freelancer's morning routine video on TikTok, it felt like a genuine recommendation. Our signup CAC dropped from $12.00 to $1.10. Splitting the bill made it a no-brainer.",
        name: "Elena R.",
        title: "Founder, DevFlow API",
        image: "https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=400&fit=crop"
    },
    {
        quote: "Standalone product demos felt like dry commercials. Real life hacks feel like trusted recommendations. We pooled our invoicing tool with multiple complementary office products on Slice, split the production cost, and got high-quality videos for under $100.",
        name: "Marcus T.",
        title: "VP of Growth, CleoAI",
        image: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?q=80&w=400&fit=crop"
    }
];

const CACCalculator = () => {
    const [adSpend, setAdSpend] = useState(15000);
    const [currentCAC, setCurrentCAC] = useState(90);

    const currentConversions = Math.round(adSpend / currentCAC);
    // Conservatively project a 35% reduction in CAC with high-converting, authentic co-created UGC setup vlogs
    const targetCAC = Math.max(1, Math.round(currentCAC * 0.65)); 
    const sliceConversions = Math.round(adSpend / targetCAC);
    const additionalConversions = sliceConversions - currentConversions;
    
    // Monthly acquisition spend savings to get the same conversion volume
    const monthlySavings = Math.round(adSpend - (currentConversions * targetCAC));
    
    // Creative production savings: Standard dedicated UGC production is ~$1,500 vs. $99 Slice split-fee
    const creativeSavings = 1401;
    
    // Projected ROI of the $99 Slice experiment based on immediate production savings + monthly campaign efficiency
    const projectedROI = Math.round(((monthlySavings + creativeSavings) / 99) * 100);

    return (
        <div className="bg-white border border-[#E8E4DB]/60 rounded-2xl p-8 md:p-12 max-w-5xl mx-auto shadow-sm">
            <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-center">
                
                {/* Left Side: Inputs */}
                <div className="lg:col-span-7">
                    <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#FDFBF7] border border-[#E8E4DB]/50 rounded text-[9px] font-mono font-bold tracking-wider uppercase mb-6 text-primary">
                        <TrendingUp size={11} />
                        UGC ROI Sandbox
                    </div>
                    <h3 className="text-3xl md:text-4xl font-serif text-neutral-darkest mb-4">
                        Calculate your UGC ROI.
                    </h3>
                    <p className="text-neutral-dark text-sm leading-relaxed font-light mb-8 max-w-xl">
                        Dedicated B2C product ads are expensive because you pay 100% of the production bill alone. Enter your paid spend and blended CAC to see the ROI potential when you co-create setup vlogs, slash creative fees, and drop acquisition costs.
                    </p>

                    {/* Slider 1: Ad Spend */}
                    <div className="mb-6">
                        <div className="flex justify-between items-center mb-2">
                            <span className="text-xs font-mono font-bold uppercase tracking-wider text-neutral-dark">Monthly Paid Spend</span>
                            <span className="text-lg font-bold font-mono text-neutral-darkest">${adSpend.toLocaleString()}</span>
                        </div>
                        <input 
                            type="range" 
                            min="2000" 
                            max="100000" 
                            step="1000" 
                            value={adSpend}
                            onChange={(e) => setAdSpend(Number(e.target.value))}
                            className="w-full accent-primary bg-neutral-lightest h-1 rounded-lg cursor-pointer border border-[#E8E4DB]/40"
                        />
                        <div className="flex justify-between text-[9px] text-neutral-light font-mono mt-1">
                            <span>$2,000</span>
                            <span>$50,000</span>
                            <span>$100,000</span>
                        </div>
                    </div>

                    {/* Slider 2: Blended CAC */}
                    <div>
                        <div className="flex justify-between items-center mb-2">
                            <span className="text-xs font-mono font-bold uppercase tracking-wider text-neutral-dark">Current Blended CAC</span>
                            <span className="text-lg font-bold font-mono text-neutral-darkest">${currentCAC}</span>
                        </div>
                        <input 
                            type="range" 
                            min="10" 
                            max="300" 
                            step="5" 
                            value={currentCAC}
                            onChange={(e) => setCurrentCAC(Number(e.target.value))}
                            className="w-full accent-primary bg-neutral-lightest h-1 rounded-lg cursor-pointer border border-[#E8E4DB]/40"
                        />
                        <div className="flex justify-between text-[9px] text-neutral-light font-mono mt-1">
                            <span>$10</span>
                            <span>$150</span>
                            <span>$300</span>
                        </div>
                    </div>
                </div>

                {/* Right Side: Projections Output */}
                <div className="lg:col-span-5 bg-[#FDFBF7] border border-[#E8E4DB]/60 rounded-xl p-6 md:p-8">
                    <h4 className="text-[10px] font-mono uppercase tracking-widest text-neutral-dark font-bold mb-6">PROJECTED CAMPAIGN ROI</h4>
                    
                    <div className="grid grid-cols-2 gap-4 mb-6">
                        <div className="p-3.5 bg-white border border-[#E8E4DB]/30 rounded">
                            <div className="text-neutral-light text-[8px] font-mono font-bold uppercase tracking-wider mb-1">Current Blended CAC</div>
                            <div className="text-lg font-bold font-mono text-neutral-dark">${currentCAC}</div>
                        </div>
                        <div className="p-3.5 bg-white border border-primary/20 rounded">
                            <div className="text-primary text-[8px] font-mono font-bold uppercase tracking-wider mb-1">Projected UGC CAC</div>
                            <div className="text-lg font-bold font-mono text-neutral-darkest">${targetCAC}*</div>
                        </div>
                    </div>

                    <div className="space-y-3 mb-6 text-xs md:text-sm">
                        <div className="flex justify-between py-2 border-b border-[#E8E4DB]/20">
                            <span className="text-neutral-dark font-light">Current Monthly Signups</span>
                            <span className="font-bold font-mono text-neutral-darkest">{currentConversions}</span>
                        </div>
                        <div className="flex justify-between py-2 border-b border-[#E8E4DB]/20">
                            <span className="text-neutral-dark font-light">Projected UGC Signups</span>
                            <span className="font-bold font-mono text-primary">{sliceConversions}</span>
                        </div>
                        <div className="flex justify-between py-2 border-b border-[#E8E4DB]/20">
                            <span className="text-neutral-dark font-light">Customer Volume Uplift</span>
                            <span className="font-bold font-mono text-[#00C853]">+{additionalConversions} (+{Math.round((additionalConversions / currentConversions) * 100)}%)</span>
                        </div>
                        <div className="flex justify-between py-2 border-b border-[#E8E4DB]/20">
                            <span className="text-neutral-dark font-light">Creative Billing Saved</span>
                            <span className="font-bold font-mono text-[#00C853]">${creativeSavings.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between py-2 border-b border-[#E8E4DB]/20">
                            <span className="text-neutral-dark font-light">Monthly Budget Saved</span>
                            <span className="font-bold font-mono text-[#00C853]">${monthlySavings.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between py-2">
                            <span className="text-neutral-dark font-semibold">UGC Experiment ROI</span>
                            <span className="font-bold font-mono text-primary text-base">{projectedROI.toLocaleString()} %</span>
                        </div>
                    </div>

                    <div className="text-[9px] text-neutral-light leading-relaxed font-light font-mono">
                        *Projected outcomes conservatively model a 35% CAC drop from authentic UGC routine integration. Production savings reflect sharing a $1,500 dedicated creative fee.
                    </div>
                </div>
            </div>
        </div>
    );
};

export const BrandLanding: React.FC<{ onSwitch?: (page: 'brand' | 'creator' | 'blog') => void, onBookClick?: (pkg: 'pilot' | 'growth' | 'enterprise') => void }> = ({ onSwitch, onBookClick }) => {
    const [openFaq, setOpenFaq] = useState<number | null>(0);
    const [testimonialIdx, setTestimonialIdx] = useState(0);

    const nextTestimonial = () => setTestimonialIdx((prev) => (prev + 1) % testimonials.length);
    const prevTestimonial = () => setTestimonialIdx((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));

    const handleHeroClick = (e: React.MouseEvent) => {
        e.preventDefault();
        if (onBookClick) {
            onBookClick('pilot');
        } else {
            window.open('https://book.stripe.com/aFafZadjE3050Wh4Bq5Vu00', '_blank');
        }
    };

    return (
        <div className="bg-[#FDFBF7] text-neutral-darkest selection:bg-neutral-darkest selection:text-white font-sans antialiased min-h-screen">

            {/* HERO SECTION */}
            <div className="relative flex flex-col justify-center min-h-[calc(100vh-80px)] pt-20 pb-20 px-6 max-w-7xl mx-auto">
                <div className="text-center max-w-4xl mx-auto">

                    <h1 className="text-4xl sm:text-5xl md:text-7xl font-serif tracking-tight text-neutral-darkest leading-[1.05] mb-8 max-w-4xl mx-auto">
                        Reduce your CAC <br />
                        <span className="italic font-serif font-light text-neutral-dark">to as low as $1.</span>
                    </h1>

                    <p className="text-base md:text-xl text-neutral-dark max-w-2xl mx-auto leading-relaxed mb-10 font-light">
                        Group your B2C tool with multiple complementary apps in a single daily routine video. Share the creator, split the cost and grow your users.
                    </p>

                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4 max-w-md mx-auto">
                        <button 
                            onClick={handleHeroClick} 
                            className="w-full sm:w-auto px-8 py-3.5 bg-neutral-darkest text-white text-xs font-mono font-bold uppercase tracking-wider rounded hover:bg-neutral-dark transition-colors flex items-center justify-center gap-2"
                        >
                            Get Started
                            <ArrowRight size={14} />
                        </button>
                        <a 
                            href="#cac-calculator" 
                            onClick={(e) => {
                                e.preventDefault();
                                document.getElementById('cac-calculator')?.scrollIntoView({ behavior: 'smooth' });
                            }}
                            className="w-full sm:w-auto px-8 py-3.5 bg-white border border-[#E8E4DB] text-neutral-darkest text-xs font-mono font-bold uppercase tracking-wider rounded hover:bg-[#FDFBF7] transition-colors text-center"
                        >
                            Calculate Savings
                        </a>
                    </div>
                </div>

                {/* Scroll Down Indicator */}
                <div className="absolute bottom-8 left-1/2 -translate-x-1/2 hidden md:flex flex-col items-center gap-2 text-neutral-light text-[9px] font-mono font-bold tracking-widest uppercase opacity-60">
                    <span>Explore the workflow</span>
                    <div className="w-[1px] h-10 bg-neutral-light/35 animate-bounce"></div>
                </div>
            </div>

            {/* THE VISUAL EXAMPLE (STACK BLUEPRINT) */}
            <div className="py-24 md:py-32 border-t border-[#E8E4DB]/40 border-b border-[#E8E4DB]/40 bg-[#FAF6EE]/50">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="text-center max-w-3xl mx-auto mb-16">
                        <span className="text-[9px] font-mono font-bold tracking-widest text-primary uppercase block mb-3">ILLUSTRATIVE EXAMPLE ROUTINE</span>
                        <h2 className="text-3xl md:text-4xl font-serif text-neutral-darkest leading-tight mb-4">One video. Multiple digital products.</h2>
                        <p className="text-neutral-dark text-xs md:text-sm leading-relaxed font-light max-w-xl mx-auto">
                            Instead of paying a creator for a standalone ad, we group complementary apps into organic workspace vlogs. Creators show how they work in the wild—weaving your product alongside other complimentary tools in a UGC-style video.
                        </p>
                    </div>

                    {/* Unified Video Console Wrapper */}
                    <div className="bg-white border border-[#E8E4DB]/70 rounded-2xl p-6 md:p-10 max-w-5xl mx-auto relative shadow-[0_6px_30px_rgba(232,228,219,0.25)]">
                        {/* Video console top bar */}
                        <div className="flex items-center justify-between pb-6 mb-8 border-b border-[#E8E4DB]/40">
                            <div className="flex items-center gap-2">
                                <span className="w-2.5 h-2.5 rounded-full bg-primary animate-pulse"></span>
                                <span className="text-[10px] font-mono uppercase tracking-widest text-neutral-dark font-bold">UGC Routine Vlog Storyboard</span>
                            </div>
                            <span className="text-[9px] font-mono uppercase tracking-wider text-neutral-light">Single video asset split</span>
                        </div>

                        <div className="grid md:grid-cols-3 gap-8 items-stretch">
                            
                            {/* Box 1: Tool A */}
                            <div className="bg-[#FDFBF7] border border-[#E8E4DB]/60 rounded-xl p-8 flex flex-col justify-between shadow-sm">
                                <div>
                                    <span className="text-[9px] font-mono tracking-wider text-neutral-light uppercase block mb-4">01 / USER INTERFACE DESIGN</span>
                                    <h3 className="text-lg font-bold text-neutral-darkest mb-2">Figma</h3>
                                    <p className="text-neutral-dark text-sm leading-relaxed font-light">
                                        A TikTok creator shows how they prototype landing page drafts and export design assets in Figma.
                                    </p>
                                </div>
                                <div className="pt-6 mt-8 border-t border-[#E8E4DB]/30 flex justify-between items-center text-[10px] font-mono text-neutral-light">
                                    <span>ILLUSTRATIVE MATCH</span>
                                    <span>$99 Split Cost</span>
                                </div>
                            </div>

                            {/* Box 2: Tool B */}
                            <div className="bg-[#FDFBF7] border border-[#E8E4DB]/60 rounded-xl p-8 flex flex-col justify-between shadow-sm">
                                <div>
                                    <span className="text-[9px] font-mono tracking-wider text-neutral-light uppercase block mb-4">02 / VIDEO COLLABORATION</span>
                                    <h3 className="text-lg font-bold text-neutral-darkest mb-2">Loom</h3>
                                    <p className="text-neutral-dark text-sm leading-relaxed font-light">
                                        The creator records a 1-minute video message in Loom to align their team on the product specs.
                                    </p>
                                </div>
                                <div className="pt-6 mt-8 border-t border-[#E8E4DB]/30 flex justify-between items-center text-[10px] font-mono text-neutral-light">
                                    <span>ILLUSTRATIVE MATCH</span>
                                    <span>$99 Split Cost</span>
                                </div>
                            </div>

                            {/* Box 3: Highlighted SaaS App */}
                            <div className="bg-[#FDFBF7] border-2 border-primary rounded-xl p-8 flex flex-col justify-between shadow-sm relative">
                                <span className="absolute -top-3 right-6 bg-primary text-white text-[8px] font-mono font-bold tracking-wider px-2.5 py-0.5 rounded uppercase">
                                    Your slot
                                </span>
                                <div>
                                    <span className="text-[9px] font-mono tracking-wider text-primary uppercase block mb-4">03 / PRODUCTIVITY UTILITY</span>
                                    <h3 className="text-lg font-bold text-neutral-darkest mb-2">Your Product</h3>
                                    <p className="text-neutral-dark text-sm leading-relaxed font-light">
                                        Your product is featured as the key workspace tool that brings figma drafts and team assets together naturally.
                                    </p>
                                </div>
                                <div className="pt-6 mt-8 border-t border-primary/20 flex justify-between items-center text-[10px] font-mono">
                                    <span className="text-primary font-bold">NATURAL INTEGRATION</span>
                                    <span className="text-neutral-darkest font-bold">$99 Total Cost</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* MARQUEE */}
            <div className="py-12 border-b border-[#E8E4DB]/40 opacity-40">
                <LogoMarquee />
            </div>

            {/* THE PROBLEM & POSITIONING */}
            <div className="py-24 md:py-32 px-6 max-w-7xl mx-auto">
                <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
                    <div>
                        <div className="inline-flex px-3 py-1 bg-neutral-darkest text-white rounded text-[9px] font-mono font-bold tracking-wider uppercase mb-6">
                            THE POSITIONING
                        </div>
                        <h2 className="text-3xl md:text-4xl font-serif text-neutral-darkest tracking-tight leading-tight mb-6">
                            People ignore ad pitches. They copy daily routines.
                        </h2>
                        <p className="text-neutral-dark text-base leading-relaxed font-light mb-8">
                            Traditional B2C ads are increasingly expensive, fatiguing, and difficult to scale. Dedicated creator videos often feel like forced sales pitches, resulting in high viewer drop-off and soaring acquisition costs.
                            <br /><br />
                            <strong>Slice solves this.</strong> We place your product naturally inside relatable TikTok or Instagram vlogs (like a "How I stay productive working from home" video) alongside other digital products (like design editors or team communication apps) for illustrative routines. Best of all, because multiple brands share the creator invoice, you split the cost.
                        </p>

                        <div className="space-y-3 font-mono text-xs text-neutral-darkest font-bold">
                            <div className="flex items-center gap-2">
                                <Check size={14} className="text-primary" /> Curated, Non-Competing Brand Cohorts
                            </div>
                            <div className="flex items-center gap-2">
                                <Check size={14} className="text-primary" /> Relatable Daily Workspace Routines
                            </div>
                            <div className="flex items-center gap-2">
                                <Check size={14} className="text-primary" /> Full Commercial Advertising Rights Included
                            </div>
                        </div>
                    </div>

                    <div className="bg-white border border-[#E8E4DB]/60 rounded-2xl p-8 md:p-12 flex flex-col justify-center shadow-sm">
                        <h3 className="text-xl md:text-2xl font-serif text-neutral-darkest mb-8">How it works</h3>
                        
                        <div className="space-y-8 relative">
                            {/* Step 1 */}
                            <div className="flex gap-4">
                                <div className="w-6 h-6 rounded-full bg-[#FDFBF7] border border-[#E8E4DB] flex items-center justify-center font-mono text-[9px] text-neutral-dark font-bold shrink-0 mt-0.5">
                                    01
                                </div>
                                <div>
                                    <h4 className="font-bold text-sm text-neutral-darkest">Register your digital product</h4>
                                    <p className="text-xs text-neutral-dark font-light mt-1">Submit your tool's key features, use cases, and ideal target audience.</p>
                                </div>
                            </div>

                            {/* Step 2 */}
                            <div className="flex gap-4">
                                <div className="w-6 h-6 rounded-full bg-[#FDFBF7] border border-[#E8E4DB] flex items-center justify-center font-mono text-[9px] text-neutral-dark font-bold shrink-0 mt-0.5">
                                    02
                                </div>
                                <div>
                                    <h4 className="font-bold text-sm text-neutral-darkest">We match you into a routine group</h4>
                                    <p className="text-xs text-neutral-dark font-light mt-1">We pool your tool with multiple complementary, non-competitive workspace products for illustrative routines.</p>
                                </div>
                            </div>

                            {/* Step 3 */}
                            <div className="flex gap-4">
                                <div className="w-6 h-6 rounded-full bg-[#FDFBF7] border border-[#E8E4DB] flex items-center justify-center font-mono text-[9px] text-neutral-dark font-bold shrink-0 mt-0.5">
                                    03
                                </div>
                                <div>
                                    <h4 className="font-bold text-sm text-neutral-darkest">Creator records the daily vlog</h4>
                                    <p className="text-xs text-neutral-dark font-light mt-1">A vetted creator films a relatable daily routine video (like a "how I stay organized as a designer" vlog) featuring multiple complementary tools.</p>
                                </div>
                            </div>

                            {/* Step 4 */}
                            <div className="flex gap-4">
                                <div className="w-6 h-6 rounded-full bg-neutral-darkest text-white flex items-center justify-center font-mono text-[9px] font-bold shrink-0 mt-0.5">
                                    04
                                </div>
                                <div>
                                    <h4 className="font-bold text-sm text-neutral-darkest">Receive your video assets</h4>
                                    <p className="text-xs text-neutral-dark font-light mt-1">Get clean, raw 4K video files for just $99. Complete commercial licensing included.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* CALCULATOR SANDBOX */}
            <div id="cac-calculator" className="py-24 md:py-32 border-t border-[#E8E4DB]/40 bg-[#FDFBF7]">
                <CACCalculator />
            </div>

            {/* SIMPLE FLAT PRICING */}
            <div id="pricing" className="py-24 md:py-32 border-t border-[#E8E4DB]/40 bg-white">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="text-center max-w-2xl mx-auto mb-16">
                        <span className="text-[9px] font-mono font-bold tracking-widest text-neutral-light uppercase block mb-3">PRICING</span>
                        <h2 className="text-3xl font-serif text-neutral-darkest mb-4">Simple split-cost plans.</h2>
                        <p className="text-neutral-dark text-base font-light">
                            No hidden service fees. Select the plan that matches your budget.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto items-stretch">
                        
                        {/* Package 1 */}
                        <div className="bg-white border border-[#E8E4DB]/60 rounded-xl p-8 flex flex-col justify-between shadow-sm">
                            <div>
                                <span className="text-[9px] font-mono font-bold tracking-wider text-neutral-light uppercase mb-2 block">PILOT RUN</span>
                                <h3 className="text-xl font-bold text-neutral-darkest mb-4">The Single Slice</h3>
                                <div className="flex items-baseline gap-1 mb-6">
                                    <span className="text-4xl font-bold font-mono text-neutral-darkest">$99</span>
                                    <span className="text-[9px] font-mono text-neutral-light uppercase font-bold">/ flat rate</span>
                                </div>
                                <p className="text-xs text-neutral-dark leading-relaxed font-light mb-6">
                                    Perfect for testing routine co-marketing loops and reviewing retail user video ad response metrics.
                                </p>
                                <ul className="space-y-3 mb-8 text-xs text-neutral-dark font-light">
                                    <li className="flex items-start gap-2">
                                        <Check size={14} className="text-primary shrink-0 mt-0.5" />
                                        Your product featured inside 1 UGC routine video
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <Check size={14} className="text-primary shrink-0 mt-0.5" />
                                        Grouped with multiple adjacent digital products
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <Check size={14} className="text-primary shrink-0 mt-0.5" />
                                        Full raw 4K video assets & lifestyle clips
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <Check size={14} className="text-primary shrink-0 mt-0.5" />
                                        Perpetual commercial ads license
                                    </li>
                                </ul>
                            </div>
                            <button onClick={() => onBookClick ? onBookClick('pilot') : window.open('https://book.stripe.com/aFafZadjE3050Wh4Bq5Vu00', '_blank')} className="w-full py-3 bg-neutral-darkest hover:bg-neutral-dark text-white font-mono text-[10px] font-bold uppercase tracking-wider rounded transition-colors flex items-center justify-center gap-1.5">
                                Book Single Slot <ArrowRight size={12} />
                            </button>
                        </div>

                        {/* Package 2 */}
                        <div className="bg-white border-2 border-primary rounded-xl p-8 flex flex-col justify-between shadow-sm relative">
                            <span className="absolute -top-3 right-6 bg-primary text-white text-[8px] font-mono font-bold tracking-widest uppercase px-2.5 py-0.5 rounded">
                                POPULAR
                            </span>
                            <div>
                                <span className="text-[9px] font-mono font-bold tracking-wider text-primary uppercase mb-2 block">GROWTH PACKAGE</span>
                                <h3 className="text-xl font-bold text-neutral-darkest mb-4">Multi-Stack Pack</h3>
                                <div className="flex items-baseline gap-1 mb-6">
                                    <span className="text-4xl font-bold font-mono text-neutral-darkest">$279</span>
                                    <span className="text-[9px] font-mono text-neutral-light uppercase font-bold">/ flat rate</span>
                                </div>
                                <p className="text-xs text-neutral-dark leading-relaxed font-light mb-6">
                                    Our most popular selection. Run multiple hooks and narratives across several unique creator workspace profiles.
                                </p>
                                <ul className="space-y-3 mb-8 text-xs text-neutral-dark font-light">
                                    <li className="flex items-start gap-2">
                                        <Check size={14} className="text-primary shrink-0 mt-0.5" />
                                        <strong>Your product featured in 3 UGC routine videos</strong>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <Check size={14} className="text-primary shrink-0 mt-0.5" />
                                        Features 3 distinct roster productivity/lifestyle creators
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <Check size={14} className="text-primary shrink-0 mt-0.5" />
                                        Multiple routine variations and hooks
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <Check size={14} className="text-primary shrink-0 mt-0.5" />
                                        Full commercial distribution rights
                                    </li>
                                </ul>
                            </div>
                            <button onClick={() => onBookClick ? onBookClick('growth') : window.open('https://book.stripe.com/aFafZadjE3050Wh4Bq5Vu00', '_blank')} className="w-full py-3 bg-neutral-darkest hover:bg-neutral-dark text-white font-mono text-[10px] font-bold uppercase tracking-wider rounded transition-colors flex items-center justify-center gap-1.5">
                                Book Growth Bundle <ArrowRight size={12} />
                            </button>
                        </div>

                        {/* Package 3 */}
                        <div className="bg-white border border-[#E8E4DB]/60 rounded-xl p-8 flex flex-col justify-between shadow-sm">
                            <div>
                                <span className="text-[9px] font-mono font-bold tracking-wider text-neutral-light uppercase mb-2 block">SCALE PACK</span>
                                <h3 className="text-xl font-bold text-neutral-darkest mb-4">Enterprise Bundle</h3>
                                <div className="flex items-baseline gap-1 mb-6">
                                    <span className="text-4xl font-bold font-mono text-neutral-darkest">$799</span>
                                    <span className="text-[9px] font-mono text-neutral-light uppercase font-bold">/ flat rate</span>
                                </div>
                                <p className="text-xs text-neutral-dark leading-relaxed font-light mb-6">
                                    For active digital startups looking for a constant monthly pipeline of organic co-promotion routine assets.
                                </p>
                                <ul className="space-y-3 mb-8 text-xs text-neutral-dark font-light">
                                    <li className="flex items-start gap-2">
                                        <Check size={14} className="text-primary shrink-0 mt-0.5" />
                                        Your product featured in 10 unique routine videos
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <Check size={14} className="text-primary shrink-0 mt-0.5" />
                                        Features 10 distinct roster lifestyle/office creators
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <Check size={14} className="text-primary shrink-0 mt-0.5" />
                                        Ongoing pipeline optimization support
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <Check size={14} className="text-primary shrink-0 mt-0.5" />
                                        Dedicated accounts slack channel
                                    </li>
                                </ul>
                            </div>
                            <button onClick={() => onBookClick ? onBookClick('enterprise') : window.open('https://book.stripe.com/aFafZadjE3050Wh4Bq5Vu00', '_blank')} className="w-full py-3 bg-neutral-darkest hover:bg-neutral-dark text-white font-mono text-[10px] font-bold uppercase tracking-wider rounded transition-colors flex items-center justify-center gap-1.5">
                                Book Enterprise Slot <ArrowRight size={12} />
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* TESTIMONIALS */}
            <div className="py-24 bg-[#FDFBF7] border-t border-[#E8E4DB]/40 border-b border-[#E8E4DB]/40">
                <div className="max-w-3xl mx-auto px-6 text-center">
                    <span className="text-[9px] font-mono font-bold tracking-widest text-neutral-light uppercase block mb-8">FOUNDER STORIES</span>
                    
                    <div className="min-h-[180px] flex items-center justify-center mb-8">
                        <p className="text-xl md:text-2xl font-serif text-neutral-darkest leading-relaxed italic max-w-2xl">
                            "{testimonials[testimonialIdx].quote}"
                        </p>
                    </div>

                    <div className="flex flex-col items-center">
                        <img 
                            src={testimonials[testimonialIdx].image} 
                            alt={testimonials[testimonialIdx].name} 
                            className="w-10 h-10 rounded-full object-cover mb-3 border border-[#E8E4DB]" 
                        />
                        <h4 className="text-xs font-bold text-neutral-darkest">{testimonials[testimonialIdx].name}</h4>
                        <p className="text-[10px] text-neutral-dark font-light mt-0.5">{testimonials[testimonialIdx].title}</p>
                    </div>

                    <div className="flex justify-center gap-3 mt-6">
                        <button 
                            onClick={prevTestimonial}
                            className="w-7 h-7 rounded-full border border-[#E8E4DB] flex items-center justify-center hover:bg-white text-neutral-darkest transition-colors font-mono text-xs"
                        >
                            &larr;
                        </button>
                        <button 
                            onClick={nextTestimonial}
                            className="w-7 h-7 rounded-full border border-[#E8E4DB] flex items-center justify-center hover:bg-white text-neutral-darkest transition-colors font-mono text-xs"
                        >
                            &rarr;
                        </button>
                    </div>
                </div>
            </div>

            {/* FAQ SECTION */}
            <div id="faq" className="py-24 max-w-3xl mx-auto px-6 bg-white">
                <div className="text-center mb-16">
                    <span className="text-[9px] font-mono font-bold tracking-widest text-primary uppercase block mb-3">FAQ</span>
                    <h2 className="text-3xl font-serif text-neutral-darkest">Frequently Asked Questions</h2>
                </div>

                <div className="space-y-2">
                    <AccordionItem 
                        q="What does a 'split-cost routine' mean?" 
                        a="Paying a creator to film a video dedicated 100% to your tool is expensive, and it immediately feels like an ad. Instead, we match you with multiple complementary, non-competitive tools. The creator demonstrates how these platforms connect together inside their real-world daily routine (like a 'how I stay productive as a freelancer' vlog). Since the production invoice is shared among multiple brands, you pay just $99." 
                        isOpen={openFaq === 0} 
                        onClick={() => setOpenFaq(openFaq === 0 ? null : 0)} 
                    />
                    <AccordionItem 
                        q="Will I be grouped next to my direct competitors?" 
                        a="Never. We guarantee that zero competing products will ever be co-featured in your video. We carefully select cohorts to ensure all products are fully complementary (for example: Design editor + Video recorder + Your productivity app)." 
                        isOpen={openFaq === 1} 
                        onClick={() => setOpenFaq(openFaq === 1 ? null : 1)} 
                    />
                    <AccordionItem 
                        q="Do you write strict scripts for the creators?" 
                        a="No, and that is why our videos convert so well. We match your product with vetted creators relevant to your exact target audience. Instead of reading a dry, forced script, the creators come up with authentic, creative ways to weave your product naturally into a story or daily workflow narrative that genuinely resonates with their viewers." 
                        isOpen={openFaq === 2} 
                        onClick={() => setOpenFaq(openFaq === 2 ? null : 2)} 
                    />
                    <AccordionItem 
                        q="Do I own the rights to the delivered UGC video assets?" 
                        a="Yes. Every package includes full, perpetual commercial licensing. You receive the finalized 4K video file along with voiceover lines and screen-record clips to use directly inside your meta ads, landing page, or socials." 
                        isOpen={openFaq === 3} 
                        onClick={() => setOpenFaq(openFaq === 3 ? null : 3)} 
                    />
                </div>
            </div>

        </div>
    );
};