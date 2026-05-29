import React, { useState } from 'react';
import { 
    ArrowRight, 
    ChevronDown, 
    Check, 
    DollarSign, 
    Layers, 
    Video 
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

const CityCard = ({ city, type, image }: { city: string; type: string; image: string }) => (
    <div className="group relative overflow-hidden rounded-[20px] aspect-[4/5] bg-neutral-900 shadow-sm cursor-pointer">
        <img 
            src={image} 
            alt={city} 
            className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105" 
        />
        {/* Dark gradient overlay at the bottom for readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-85 transition-opacity duration-300 group-hover:opacity-95" />
        
        {/* Overlaid text at the bottom left */}
        <div className="absolute bottom-0 left-0 p-6 md:p-8 flex flex-col justify-end z-10">
            <h3 className="text-2xl font-bold tracking-tight text-white mb-1 leading-tight">{city}</h3>
            <span className="text-xs font-mono text-neutral-300 tracking-wide font-light">{type}</span>
        </div>
    </div>
);

interface CreatorLandingProps {
    onApplyClick?: () => void;
}

export const CreatorLanding: React.FC<CreatorLandingProps> = ({ onApplyClick }) => {
    const [openFaq, setOpenFaq] = useState<number | null>(0);

    const handleApplyClick = (e: React.MouseEvent) => {
        e.preventDefault();
        if (onApplyClick) {
            onApplyClick();
        }
    };

    return (
        <div className="bg-[#FDFBF7] text-neutral-darkest selection:bg-[#111111] selection:text-white font-sans antialiased min-h-screen">
            
            {/* HERO SECTION */}
            <div className="flex flex-col justify-center min-h-[calc(100vh-80px)] pt-20 pb-20 px-6 max-w-7xl mx-auto">
                <div className="grid lg:grid-cols-12 gap-16 lg:gap-24 items-center">
                    
                    {/* Copy Side */}
                    <div className="lg:col-span-7">
                        <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-white border border-[#E8E4DB]/60 rounded text-[9px] font-mono font-bold tracking-widest uppercase mb-8 text-primary shadow-sm">
                            <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse"></span>
                            Creator Roster Open
                        </div>

                        <h1 className="text-4xl sm:text-5xl md:text-7xl font-serif tracking-tight text-neutral-darkest leading-[1.05] mb-8">
                            The easiest $200 <br />
                            <span className="italic font-serif font-light text-neutral-dark">you'll make all week.</span>
                        </h1>

                        <p className="text-base md:text-lg text-neutral-dark max-w-xl leading-relaxed mb-10 font-light">
                            No brand negotiations. No waiting 60 days to get paid. Just record your home office setup or daily routine showing the digital tools we match you with, and get paid flat rates directly via Stripe in 48 hours.
                        </p>

                        <div className="flex flex-col sm:flex-row items-center gap-6">
                            <button
                                onClick={handleApplyClick}
                                className="w-full sm:w-auto px-8 py-3.5 bg-neutral-darkest hover:bg-neutral-dark text-white text-xs font-mono font-bold uppercase tracking-wider rounded transition-colors flex items-center justify-center gap-2"
                            >
                                Join the Roster
                                <ArrowRight size={14} />
                            </button>
                            <div className="flex flex-col text-center sm:text-left">
                                <span className="text-sm font-bold font-mono text-neutral-darkest">$200 CAD Payout</span>
                                <span className="text-[9px] text-neutral-light uppercase font-mono tracking-widest font-bold">Paid within 48 hours via Stripe</span>
                            </div>
                        </div>
                    </div>

                    {/* Stripe wallet flat feed */}
                    <div className="lg:col-span-5 flex justify-center">
                        <div className="w-full max-w-sm bg-white border border-[#E8E4DB]/60 rounded-2xl p-6 md:p-8 shadow-sm">
                            <div className="flex items-center justify-between pb-6 border-b border-[#E8E4DB]/20 mb-6">
                                <div>
                                    <span className="text-[9px] font-mono uppercase tracking-widest text-neutral-light">Stripe Wallet</span>
                                    <div className="text-2xl font-bold font-mono text-neutral-darkest mt-1">$600.00</div>
                                </div>
                                <span className="text-[8px] font-mono uppercase tracking-wider text-[#00C853] bg-[#00C853]/10 px-2 py-0.5 rounded">
                                    Verified Payouts
                                </span>
                            </div>

                            <div className="space-y-5">
                                {[
                                    { brand: 'Freelancer office routine vlog', status: 'Approved', amount: 200.00 },
                                    { brand: 'Remote daily workspace vlog', status: 'Approved', amount: 200.00 },
                                    { brand: 'Productivity setup vlog', status: 'Approved', amount: 200.00 }
                                ].map((item, idx) => (
                                    <div key={idx} className="flex justify-between items-start text-xs">
                                        <div>
                                            <div className="font-bold text-neutral-darkest truncate max-w-[180px]">{item.brand}</div>
                                            <div className="text-[8px] font-mono text-neutral-light uppercase tracking-wider mt-0.5">Payout Cleared</div>
                                        </div>
                                        <div className="text-right">
                                            <div className="font-bold font-mono text-primary">+${item.amount.toFixed(2)}</div>
                                            <span className="text-[8px] text-[#00C853] font-bold">Stripe 48h</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* BRAND LOGOS */}
            <div className="py-12 border-t border-b border-[#E8E4DB]/40 bg-[#FDFBF7]">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="flex flex-col md:flex-row items-center justify-between gap-8">
                        <div className="text-[9px] font-mono font-bold uppercase tracking-widest text-neutral-light shrink-0">
                            CREATORS TRUST SLICE
                        </div>
                        <div className="flex-1 overflow-hidden opacity-40">
                            <LogoMarquee />
                        </div>
                    </div>
                </div>
            </div>

            {/* THE CREATOR ROUTINE */}
            <div id="how-it-works" className="py-24 md:py-32 max-w-7xl mx-auto px-6">
                <div className="grid lg:grid-cols-12 gap-16 lg:gap-24 items-center">
                    <div className="lg:col-span-5">
                        <div className="inline-flex px-3 py-1 bg-neutral-darkest text-white rounded text-[9px] font-mono font-bold tracking-wider uppercase mb-6">
                            THE ROUTINE
                        </div>
                        <h2 className="text-3xl md:text-4xl font-serif text-neutral-darkest leading-tight mb-6">
                            Zero DMs. <br />
                            <span className="italic font-serif font-light text-neutral-dark">Just share your routine.</span>
                        </h2>
                        <p className="text-neutral-dark text-base leading-relaxed font-light mb-8">
                            We've stripped out the most frustrating parts of brand sponsorships. No endless negotiation emails, no strict scripts that limit your natural workspace styling, and no invoices that take 60 days to clear. You show how you stay organized and work; we set up your product access and verify your Stripe cash drop.
                        </p>
                        <button
                            onClick={handleApplyClick}
                            className="px-6 py-3 bg-neutral-darkest hover:bg-neutral-dark text-white font-mono text-xs font-bold uppercase tracking-wider rounded transition-colors flex items-center gap-2"
                        >
                            Apply to Roster <ArrowRight size={12} />
                        </button>
                    </div>

                    <div className="lg:col-span-7 grid md:grid-cols-3 gap-6 items-stretch">
                        {[
                            {
                                step: "01",
                                title: "Tool Accounts & Access",
                                desc: "Get full workspace access and premium product accounts completely free of charge to film your routines.",
                                icon: <Layers size={14} className="text-primary" />
                            },
                            {
                                step: "02",
                                title: "Film Your Routine",
                                desc: "Record authentic, relatable lifestyle vlogs showing how you stay productive or organize your freelancing workflow.",
                                icon: <Video size={14} className="text-primary" />
                            },
                            {
                                step: "03",
                                title: "48h Stripe Payout",
                                desc: "Receive your flat $200 CAD payout directly in your Stripe dashboard within 48 hours of verification.",
                                icon: <DollarSign size={14} className="text-primary" />
                            }
                        ].map((item, idx) => (
                            <div key={idx} className="bg-white border border-[#E8E4DB]/60 rounded-xl p-8 flex flex-col justify-between shadow-sm">
                                <div>
                                    <div className="flex justify-between items-center mb-6">
                                        <span className="text-[10px] font-mono font-bold text-neutral-light">{item.step}</span>
                                        {item.icon}
                                    </div>
                                    <h3 className="font-bold text-sm text-neutral-darkest mb-3">{item.title}</h3>
                                    <p className="text-neutral-dark text-xs font-light leading-relaxed">{item.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* COMPARISON SPEC */}
            <div id="comparison" className="py-24 md:py-32 bg-white border-t border-[#E8E4DB]/40">
                <div className="max-w-4xl mx-auto px-6">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl font-serif text-neutral-darkest mb-4">Compare the workflow</h2>
                        <p className="text-neutral-dark text-sm font-light">Skip the outbound pitching. Build products in clear cohorts.</p>
                    </div>

                    <div className="border border-[#E8E4DB]/60 rounded-xl overflow-hidden shadow-sm">
                        <div className="grid grid-cols-2 md:grid-cols-3 bg-neutral-darkest p-6 text-[8px] font-mono font-bold tracking-widest text-white uppercase">
                            <div className="text-white/40">FEATURES</div>
                            <div className="hidden md:block text-center text-white/40">TYPICAL SPONSORSHIP</div>
                            <div className="text-right md:text-center text-primary">THE SLICE ROSTER</div>
                        </div>

                        {[
                            { label: "Content Focus", bad: "Strict, unnatural ad script", good: "Relatable office/work routines" },
                            { label: "Onboarding Flow", bad: "Weeks of back-and-forth emails", good: "Fast tool setup & access" },
                            { label: "Product Setup", bad: "Waiting for physical shipments", good: "Immediate account access" },
                            { label: "Payment Wait", bad: "Net-60 or Net-90 invoice cycles", good: "Direct Stripe payout in 48h" },
                            { label: "Pricing Structure", bad: "Constant negotiation disputes", good: "Guaranteed $200 CAD base rate" }
                        ].map((row, idx) => (
                            <div key={idx} className="grid grid-cols-2 md:grid-cols-3 p-6 border-b border-[#E8E4DB]/30 last:border-0 hover:bg-[#FDFBF7]/30 transition-colors">
                                <div className="text-xs font-bold text-neutral-darkest">{row.label}</div>
                                <div className="hidden md:block text-center text-xs text-neutral-light font-light">{row.bad}</div>
                                <div className="text-right md:text-center text-xs font-bold text-neutral-darkest">
                                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded bg-[#00C853]/5 text-[#00C853] font-mono text-[9px] uppercase">
                                        <Check size={10} strokeWidth={3} />
                                        {row.good}
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* PRIVATE NETWORKING / EVENTS */}
            <div id="exclusive-access" className="py-24 md:py-32 border-t border-[#E8E4DB]/40 bg-[#FDFBF7]">
                <div className="max-w-7xl mx-auto px-6">
                    {/* Two-column Header */}
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-end mb-16 md:mb-20">
                        {/* Left Column */}
                        <div className="lg:col-span-8 space-y-4">
                            <span className="text-[9px] font-mono font-bold tracking-widest text-[#FF4500] uppercase block">
                                ROSTER EXCLUSIVE
                            </span>
                            <h2 className="text-5xl sm:text-6xl md:text-7xl font-serif text-neutral-darkest tracking-tight leading-[0.95]">
                                Beyond <br />
                                <span className="italic text-[#FF4500] font-serif font-light">the box.</span>
                            </h2>
                            <p className="text-neutral-dark text-base md:text-lg font-light leading-relaxed max-w-2xl pt-2">
                                Creators on our roster get more than just products—they get access. From intimate brand dinners in Toronto to exclusive PR trips and VIP summits across North America.
                            </p>
                        </div>

                        {/* Right Column */}
                        <div className="lg:col-span-4 flex flex-col justify-end lg:items-end lg:text-right pb-2">
                            <div className="inline-flex items-center gap-2 text-sm font-mono font-bold tracking-wider text-neutral-darkest mb-1.5 uppercase">
                                <span className="text-[#FF4500]">⚡</span> 20+ Annual Events
                            </div>
                            <p className="text-xs text-neutral-dark italic font-light font-sans">
                                Reserved for Slice Creators.
                            </p>
                        </div>
                    </div>

                    {/* 4-Card Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        <CityCard
                            city="Toronto"
                            type="Loft Launch"
                            image="https://images.unsplash.com/photo-1524758631624-e2822e304c36?q=80&w=600&auto=format&fit=crop"
                        />
                        <CityCard
                            city="New York"
                            type="Brand Dinner"
                            image="https://images.unsplash.com/photo-1543007630-9710e4a00a20?q=80&w=600&auto=format&fit=crop"
                        />
                        <CityCard
                            city="Los Angeles"
                            type="Creator Summit"
                            image="https://images.unsplash.com/photo-1506157786151-b8491531f063?q=80&w=600&auto=format&fit=crop"
                        />
                        <CityCard
                            city="Vancouver"
                            type="Pop-up"
                            image="https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=600&auto=format&fit=crop"
                        />
                    </div>
                </div>
            </div>

            {/* VETTING AND FAQ */}
            <div id="faq" className="py-24 max-w-3xl mx-auto px-6 bg-white border-t border-[#E8E4DB]/40">
                <div className="text-center mb-16">
                    <span className="text-[9px] font-mono font-bold tracking-widest text-[#FF4500] uppercase block mb-3">ROSTER FAQ</span>
                    <h2 className="text-3xl font-serif text-neutral-darkest">Creator FAQ</h2>
                </div>

                <div className="space-y-2">
                    <AccordionItem 
                        q="How much do I get paid, and how quickly?" 
                        a="We pay a flat, guaranteed rate of $200 CAD per routine video. Payouts are deposited directly into your Stripe account within 48 hours of video submission and verification—no invoices, no negotiation, and no Net-60 waiting periods." 
                        isOpen={openFaq === 0} 
                        onClick={() => setOpenFaq(openFaq === 0 ? null : 0)} 
                    />
                    <AccordionItem 
                        q="Do I need to show my face or speak on camera?" 
                        a="No! We welcome both creators who do voiceovers/talking videos, and workspace accounts who film highly aesthetic, hands-only desk ASMR setups with music overlays. As long as your desk aesthetics are clean and the setup is professional, you belong on the roster." 
                        isOpen={openFaq === 1} 
                        onClick={() => setOpenFaq(openFaq === 1 ? null : 1)} 
                    />
                    <AccordionItem 
                        q="Who owns the content rights? Can I post it organically?" 
                        a="You retain organic rights and are free to post the content to your own organic social media feeds! Slice and the featured brands receive a perpetual commercial ad license to run the co-created asset as paid UGC advertisements, letting you earn stable creative fees while growing your own profile." 
                        isOpen={openFaq === 2} 
                        onClick={() => setOpenFaq(openFaq === 2 ? null : 2)} 
                    />
                    <AccordionItem 
                        q="Do I need a massive social media following to join?" 
                        a="Not at all. We value high-quality workspace styling, great lighting, and relatable routine presentations over follower metrics. Whether you have 500 followers or 50,000, if you can record beautiful desk setup content, you are welcome here." 
                        isOpen={openFaq === 3} 
                        onClick={() => setOpenFaq(openFaq === 3 ? null : 3)} 
                    />
                    <AccordionItem 
                        q="Am I required to showcase direct competitors side-by-side?" 
                        a="Absolutely not. We guarantee that your videos will never group competing products. Routines are co-created with non-competing, complementary tools (for example: Task planner + Design software + Browser utility) to keep the vlog feeling authentic." 
                        isOpen={openFaq === 4} 
                        onClick={() => setOpenFaq(openFaq === 4 ? null : 4)} 
                    />
                </div>
            </div>

        </div>
    );
};