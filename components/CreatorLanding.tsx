import React, { useState, useEffect } from 'react';
import { Package, Video, DollarSign, CheckCircle2, ArrowRight, Loader2, Zap, Users, Info, Bell, Wallet, MapPin, Calendar, Ticket } from 'lucide-react';
import { TextReveal, TypewriterEffect, ColumnBackground, SpotlightCard, Section, SectionHeading, LogoMarquee } from './Shared';

const PhonePayoutVisual = () => {
    const [notifications, setNotifications] = useState([
        { id: 1, time: 'Now', amount: 200.00, brand: 'Slice Payout' },
        { id: 2, time: '2m ago', amount: 200.00, brand: 'Slice Payout' },
        { id: 3, time: '1h ago', amount: 200.00, brand: 'Slice Payout' },
    ]);
    const [balance, setBalance] = useState(600.00);

    useEffect(() => {
        const brands = ['Slice Payout', 'Slice Payout', 'Bonus Payment'];

        const interval = setInterval(() => {
            const newId = Date.now();
            const randomBrand = brands[Math.floor(Math.random() * brands.length)];

            setBalance(prev => {
                if (prev >= 1200) return 600.00; // Cap at a realistic weekly total and reset loop
                return prev + 200.00;
            });

            setNotifications(prev => [
                { id: newId, time: 'Just now', amount: 200.00, brand: randomBrand },
                ...prev.slice(0, 4)
            ]);

        }, 3000); // Slower, more deliberate pace

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="relative mx-auto border-gray-900 bg-gray-900 border-[8px] rounded-[2.5rem] h-[500px] w-[280px] shadow-2xl flex flex-col items-center justify-start overflow-hidden transform hover:scale-[1.02] transition-transform duration-500">
            {/* Dynamic Island / Notch */}
            <div className="absolute top-0 w-full flex justify-center z-20 pt-2">
                <div className="h-6 w-24 bg-black rounded-full transition-all duration-300 hover:w-32 hover:h-8 shadow-sm"></div>
            </div>

            {/* Screen Content */}
            <div className="w-full h-full bg-neutral-50 overflow-hidden relative font-sans pt-12 flex flex-col">
                {/* Status Bar elements */}
                <div className="absolute top-3 left-6 text-[10px] font-bold text-black">9:41</div>
                <div className="absolute top-3 right-6 flex gap-1">
                    <div className="w-4 h-2.5 bg-black rounded-[2px]"></div>
                </div>

                {/* Wallet Header */}
                <div className="px-5 mb-6 z-10 relative">
                    <div className="text-xs text-neutral-500 font-medium mb-1">Total Balance</div>
                    {/* Animated Balance Text */}
                    <div key={balance} className="text-3xl font-bold text-neutral-darkest tracking-tight animate-[scaleIn_0.2s_ease-out]">
                        ${balance.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </div>
                    <div className="flex gap-2 mt-4">
                        <div className="flex-1 bg-neutral-900 text-white text-[10px] font-bold py-2.5 rounded-lg text-center cursor-pointer active:scale-95 transition-transform shadow-md hover:bg-black">Withdraw</div>
                        <div className="flex-1 bg-white border border-neutral-200 text-neutral-900 text-[10px] font-bold py-2.5 rounded-lg text-center cursor-pointer active:scale-95 transition-transform shadow-sm hover:bg-neutral-50">Details</div>
                    </div>
                </div>

                {/* Notifications Feed */}
                <div className="flex-1 bg-neutral-100/50 px-4 py-2 space-y-3 overflow-hidden relative border-t border-neutral-200/50">
                    <div className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider mb-2 flex items-center justify-between mt-2">
                        <span>Live Activity</span>
                        <span className="flex h-2 w-2 relative">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                        </span>
                    </div>

                    {/* Notification Items */}
                    {notifications.map((notif, index) => (
                        <div
                            key={notif.id}
                            className="bg-white p-3 rounded-xl shadow-sm border border-neutral-200 flex items-center gap-3 animate-notification-slide transition-all"
                        >
                            <div className="w-8 h-8 rounded-full bg-creator/10 flex items-center justify-center text-creator shrink-0 border border-creator/20">
                                <DollarSign size={14} />
                            </div>
                            <div className="flex-1 min-w-0">
                                <div className="text-xs font-bold text-neutral-darkest">{notif.brand}</div>
                                <div className="text-xs text-neutral-500">Payment Received</div>
                            </div>
                            <div className="text-right shrink-0">
                                <div className="text-xs font-bold text-creator">+${notif.amount.toFixed(2)}</div>
                                <div className="text-[9px] text-neutral-400">{notif.time}</div>
                            </div>
                        </div>
                    ))}

                    {/* Fade overlay at bottom */}
                    <div className="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-neutral-100/50 to-transparent pointer-events-none"></div>
                </div>

                {/* Bottom Bar */}
                <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-1/3 h-1 bg-neutral-300 rounded-full"></div>
            </div>
        </div>
    );
};

const EventVisual = () => {
    return (
        <div className="relative mx-auto border-gray-900 bg-gray-900 border-[8px] rounded-[3rem] h-[500px] w-[280px] shadow-2xl flex flex-col items-center justify-start overflow-hidden transform hover:scale-[1.02] transition-all duration-500 group/phone">
            {/* Dynamic Island */}
            <div className="absolute top-0 w-full flex justify-center z-20 pt-2">
                <div className="h-6 w-24 bg-black rounded-full shadow-sm group-hover/phone:w-28 transition-all"></div>
            </div>

            {/* Screen Content */}
            <div className="w-full h-full bg-[#0a0a0a] overflow-hidden relative font-sans flex flex-col">
                {/* Background Pattern */}
                <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-primary/40 via-transparent to-transparent"></div>
                
                {/* Header */}
                <div className="pt-12 px-6 pb-6 relative z-10">
                    <div className="text-[10px] font-bold text-primary uppercase tracking-[0.2em] mb-1">Upcoming Invites</div>
                    <h3 className="text-2xl font-bold text-white tracking-tight">Your Roster Access</h3>
                </div>

                {/* Invite Cards */}
                <div className="flex-1 px-4 space-y-4 relative z-10 overflow-hidden">
                    {[
                        { title: "Summer PR Suite", city: "Toronto, ON", date: "July 12", color: "from-primary/30" },
                        { title: "Brand Launch VIP", city: "New York, NY", date: "Aug 05", color: "from-neutral-dark/20" },
                        { title: "Creator Summit", city: "Los Angeles, CA", date: "Sept 20", color: "from-primary/10" }
                    ].map((event, i) => (
                        <div key={i} className={`bg-white/5 border border-white/10 p-4 rounded-2xl backdrop-blur-sm bg-gradient-to-br ${event.color} to-transparent transform transition-all duration-500 hover:scale-[1.02]`}>
                            <div className="flex justify-between items-start mb-4">
                                <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-white">
                                    <Ticket size={14} />
                                </div>
                                <div className="text-[10px] font-bold text-white/40 uppercase">{event.date}</div>
                            </div>
                            <div className="text-sm font-bold text-white mb-1">{event.title}</div>
                            <div className="flex items-center gap-1 text-[10px] text-white/60">
                                <MapPin size={10} />
                                <span>{event.city}</span>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Bottom Blur */}
                <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#0a0a0a] to-transparent z-20"></div>
                <div className="absolute bottom-8 left-0 right-0 flex justify-center z-30">
                    <div className="bg-primary text-white text-[10px] font-bold px-6 py-2 rounded-full shadow-lg shadow-primary/20">Claim Invitation</div>
                </div>
            </div>
        </div>
    );
};

interface CreatorLandingProps {
    onApplyClick?: () => void;
}

export const CreatorLanding: React.FC<CreatorLandingProps> = ({ onApplyClick }) => {
    const [isVisible, setIsVisible] = useState(false);
    const [isHeroLoading, setIsHeroLoading] = useState(false);

    useEffect(() => {
        setIsVisible(true);
    }, []);

    const handleApplyClick = (e: React.MouseEvent) => {
        e.preventDefault();
        if (onApplyClick) {
            onApplyClick();
        }
    };

    return (
        <>
            {/* Hero Section */}
            <div className="relative pt-10 pb-10 sm:pt-20 sm:pb-16 px-4 sm:px-6 overflow-hidden flex flex-col items-center min-h-auto">
                <ColumnBackground />

                {/* Massive accent glow */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1200px] h-[600px] bg-primary/10 rounded-full blur-[140px] pointer-events-none opacity-40"></div>

                <div className="max-w-[1400px] mx-auto px-6 py-12 lg:py-24 grid lg:grid-cols-2 gap-16 items-center">

                    {/* Copy Side */}
                    <div className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'}`}>
                        <div className="inline-flex items-center gap-2 px-3 py-1 bg-neutral-darkest text-white rounded-full text-[10px] font-bold tracking-widest uppercase mb-8 shadow-xl shadow-neutral-darkest/20">
                            <Users size={12} className="text-primary" />
                            Fall Roster Now Open
                        </div>

                        <h1 className="text-6xl md:text-8xl font-medium tracking-[-0.05em] leading-[0.95] text-neutral-darkest mb-10">
                            Turn your <br /> lifestyle into <br />
                            <span className="font-serif italic text-primary">revenue.</span>
                        </h1>

                        <div className="flex flex-col gap-6 mb-12">
                            <p className="text-2xl text-neutral-dark font-light leading-relaxed max-w-xl">
                                "Finally, a brand that pays me within 48 hours for doing what I already love."
                            </p>
                            <div className="flex items-center gap-3">
                                <div className="w-8 h-8 rounded-full border border-neutral-200 overflow-hidden">
                                    <img src="https://i.pravatar.cc/100?img=32" alt="Olamide" className="w-full h-full object-cover" />
                                </div>
                                <div className="text-xs font-bold uppercase tracking-widest text-neutral-darkest">Olamide</div>
                            </div>
                        </div>

                        <div className="flex flex-col sm:flex-row items-center gap-6">
                            <button
                                onClick={handleApplyClick}
                                className="w-full sm:w-auto px-10 py-5 bg-neutral-darkest text-white font-bold tracking-tight rounded-2xl hover:bg-primary transition-all shadow-[0_20px_40px_rgba(0,0,0,0.1)] hover:shadow-[0_20px_40px_rgba(255,69,0,0.3)] hover:-translate-y-1 active:translate-y-0 text-center flex items-center justify-center gap-2 group"
                            >
                                Join the Roster
                                <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                            </button>
                            <div className="flex flex-col">
                                <span className="text-sm font-bold text-neutral-darkest">$200 CAD + Products</span>
                                <span className="text-[10px] text-neutral-500 uppercase tracking-widest">Base Rate per video</span>
                            </div>
                        </div>
                    </div>

                    {/* Visual Side */}
                    <div className={`relative transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
                        {/* 3D-ish Payment Pills */}
                        <div className="relative aspect-square w-full max-w-xl mx-auto flex items-center justify-center">
                            {/* Glowing Core */}
                            <div className="absolute inset-0 bg-primary/20 blur-[100px] rounded-full animate-pulse"></div>

                            <div className="relative z-10 w-full h-full flex items-center justify-center">
                                <PhonePayoutVisual />

                                {/* Floating Revenue Pills */}
                                <div className="absolute -top-4 -right-8 bg-white border border-neutral-100 p-4 rounded-2xl shadow-2xl animate-float-1 hidden sm:block">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-full bg-green-500/10 flex items-center justify-center text-green-500">
                                            <DollarSign size={20} />
                                        </div>
                                        <div>
                                            <div className="text-xl font-bold text-neutral-darkest">+$200.00</div>
                                            <div className="text-[10px] uppercase tracking-widest text-neutral-light font-bold">Payout Sent</div>
                                        </div>
                                    </div>
                                </div>

                                <div className="absolute top-1/2 -left-12 -translate-y-1/2 bg-white border border-neutral-100 p-4 rounded-2xl shadow-2xl animate-float-2 hidden sm:block">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                                            <Package size={20} />
                                        </div>
                                        <div>
                                            <div className="text-xl font-bold text-neutral-darkest">Box #042</div>
                                            <div className="text-[10px] uppercase tracking-widest text-neutral-light font-bold">Shipped</div>
                                        </div>
                                    </div>
                                </div>

                                <div className="absolute -bottom-8 -right-4 bg-neutral-darkest text-white p-4 rounded-2xl shadow-2xl animate-float-3 hidden sm:block">
                                    <div className="flex items-center gap-4">
                                        <div className="flex -space-x-2">
                                            {[1, 2, 3].map(i => (
                                                <div key={i} className="w-6 h-6 rounded-full border-2 border-neutral-darkest bg-neutral-800 overflow-hidden">
                                                    <img src={`https://i.pravatar.cc/100?img=${30 + i}`} alt="Avatar" />
                                                </div>
                                            ))}
                                        </div>
                                        <div className="text-[10px] font-bold uppercase tracking-widest">34 Brands Hiring</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Brand Bar */}
            <div className="relative z-10 bg-neutral-white border-y border-neutral-lighter py-10 overflow-hidden">
                <div className="max-w-[1400px] mx-auto px-6">
                    <div className="flex flex-col md:flex-row items-center justify-between gap-8">
                        <div className="text-xs font-bold uppercase tracking-widest text-neutral-light shrink-0">
                            Brands hiring on Slice
                        </div>
                        <LogoMarquee />
                    </div>
                </div>
            </div>

            {/* THE CREATOR ROUTINE */}
            <Section className="bg-white py-32" id="how-it-works">
                <div className="max-w-[1400px] mx-auto px-6">
                    <div className="grid lg:grid-cols-2 gap-24 items-center mb-32">
                        <div>
                            <div className="inline-flex px-3 py-1 bg-primary/10 text-primary rounded text-[10px] font-bold tracking-widest uppercase mb-6">
                                The Routine
                            </div>
                            <h2 className="text-5xl md:text-7xl font-medium tracking-tight leading-[0.95] text-neutral-darkest mb-8">
                                High-end brands. <br />
                                <span className="font-serif italic text-primary">Simple steps.</span>
                            </h2>
                            <p className="text-xl text-neutral-dark font-light leading-relaxed max-w-xl mb-10">
                                We've removed the worst parts of being a creator—the chasing, the endless DMs, and the 60-day payment terms. You focus on the content; we handle the rest.
                            </p>
                            <div className="flex flex-col sm:flex-row items-center gap-8">
                                <button
                                    onClick={handleApplyClick}
                                    className="px-8 py-4 bg-neutral-darkest text-white font-bold rounded-xl hover:bg-primary transition-all shadow-xl flex items-center justify-center gap-2 group w-full sm:w-auto"
                                >
                                    Join the Roster
                                    <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                                </button>
                                <div className="text-sm font-bold tracking-widest uppercase text-neutral-darkest border-b-2 border-primary/30 pb-1 flex items-center gap-2">
                                    <Zap size={14} className="text-primary" />
                                    <span>Fast approval process</span>
                                </div>
                            </div>
                        </div>
                        <div className="grid grid-cols-1 gap-4">
                            {[
                                {
                                    step: "01",
                                    title: "Curated Boxes",
                                    desc: "Receive a selection of premium products from vetted brands delivered to your door in a single, consolidated box.",
                                    icon: <Package size={24} />
                                },
                                {
                                    step: "02",
                                    title: "Natural Content",
                                    desc: "Shoot high-performing content in your own voice. No complex scripts—just you sharing products you actually like.",
                                    icon: <Video size={24} />
                                },
                                {
                                    step: "03",
                                    title: "Fast Payouts",
                                    desc: "Get paid a flat $200 CAD the moment your content is posted. No chasing invoices. No waiting for weeks.",
                                    icon: <DollarSign size={24} />
                                }
                            ].map((item, i) => (
                                <div key={i} className="group p-8 rounded-2xl border border-neutral-100 bg-neutral-lightest/50 hover:bg-white hover:shadow-2xl hover:shadow-primary/5 transition-all duration-500 flex items-start gap-8">
                                    <div className="text-xs font-mono text-neutral-light mt-1">{item.step}</div>
                                    <div>
                                        <h3 className="text-2xl font-bold text-neutral-darkest mb-3 tracking-tight">{item.title}</h3>
                                        <p className="text-lg text-neutral-dark font-light leading-relaxed max-w-md">{item.desc}</p>
                                    </div>
                                    <div className="ml-auto w-12 h-12 rounded-full bg-white border border-neutral-100 flex items-center justify-center text-primary group-hover:scale-110 transition-transform shadow-sm">
                                        {item.icon}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* THE EARNINGS DASHBOARD - Lighter, more lifestyle */}
                    <div className="bg-neutral-lightest rounded-[3rem] p-8 sm:p-20 relative overflow-hidden border border-neutral-200 group">
                        {/* Soft Glow effect */}
                        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 blur-[120px] rounded-full pointer-events-none"></div>

                        <div className="relative z-10 grid lg:grid-cols-12 gap-16 items-center">
                            <div className="lg:col-span-7">
                                <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-primary mb-8">Creator Earnings</h3>
                                <h2 className="text-4xl md:text-6xl font-medium text-neutral-darkest mb-8 tracking-tight leading-[1.1]">
                                    The easiest $200 <br />
                                    <span className="text-neutral-dark font-serif italic">you'll make </span> <br />
                                    all week.
                                </h2>
                                <p className="text-xl text-neutral-dark font-light leading-relaxed max-w-xl mb-12">
                                    Once your content is uploaded, we trigger your payout. $200.00 CAD per video, delivered straight to your bank account or Stripe wallet within 48 hours.
                                </p>
                                <div className="mb-12 flex flex-col sm:flex-row items-center gap-8">
                                    <button
                                        onClick={handleApplyClick}
                                        className="px-8 py-4 bg-neutral-darkest text-white font-bold rounded-xl hover:bg-primary transition-all shadow-xl flex items-center justify-center gap-2 group w-full sm:w-auto"
                                    >
                                        Start earning today
                                        <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                                    </button>
                                    <span className="text-neutral-500 text-sm italic font-light">No payout minimums. No waiting.</span>
                                </div>

                                <div className="grid grid-cols-2 gap-8 sm:gap-12">
                                    <div className="border-l-2 border-primary pl-6">
                                        <div className="text-3xl font-bold text-neutral-darkest mb-1">48 Hours</div>
                                        <div className="text-xs font-bold uppercase tracking-widest text-neutral-light">Fastest Payouts</div>
                                    </div>
                                    <div className="border-l-2 border-primary pl-6">
                                        <div className="text-3xl font-bold text-neutral-darkest mb-1">$200.00</div>
                                        <div className="text-xs font-bold uppercase tracking-widest text-neutral-light">Flat Rate</div>
                                    </div>
                                </div>
                            </div>

                            <div className="lg:col-span-5">
                                <div className="bg-white border border-neutral-200 rounded-3xl p-8 shadow-xl shadow-neutral-darkest/5">
                                    <div className="flex items-center justify-between mb-8">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                                                <Wallet size={20} />
                                            </div>
                                            <div className="text-sm font-bold text-neutral-darkest uppercase tracking-widest">Recent Activity</div>
                                        </div>
                                    </div>

                                    <div className="space-y-6">
                                        {[1, 2, 3].map(i => (
                                            <div key={i} className="flex items-center justify-between py-4 border-b border-neutral-100 last:border-0 group/row">
                                                <div className="flex items-center gap-4">
                                                    <div className="w-10 h-10 rounded-lg bg-neutral-lightest border border-neutral-200 overflow-hidden flex items-center justify-center group-hover/row:scale-110 transition-transform">
                                                        <CheckCircle2 size={18} className="text-[#00C853]" />
                                                    </div>
                                                    <div>
                                                        <div className="text-sm font-bold text-neutral-darkest">Content Verified</div>
                                                        <div className="text-[10px] text-neutral-light uppercase tracking-widest">Payout Ready</div>
                                                    </div>
                                                </div>
                                                <div className="text-right">
                                                    <div className="text-sm font-bold text-primary">+$200.00</div>
                                                    <div className="text-[10px] text-neutral-light uppercase tracking-widest">Just Now</div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Section>

            {/* PR & EVENTS */}
            <Section className="bg-white py-32" id="events">
                <div className="max-w-[1400px] mx-auto px-6">
                    <div className="bg-neutral-darkest rounded-[3rem] p-8 sm:p-20 relative overflow-hidden group">
                        {/* Dramatic Glow */}
                        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-primary/10 blur-[140px] rounded-full pointer-events-none"></div>

                        <div className="relative z-10 grid lg:grid-cols-12 gap-16 items-center">
                            <div className="lg:col-span-5 order-2 lg:order-1">
                                <div className="relative">
                                    <EventVisual />
                                    {/* Floating Badges */}
                                    <div className="absolute -top-6 -left-6 bg-white p-4 rounded-2xl shadow-2xl rotate-[-6deg] hidden sm:block animate-float-1">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                                                <Users size={20} />
                                            </div>
                                            <div>
                                                <div className="text-lg font-bold text-neutral-darkest">VIP Only</div>
                                                <div className="text-[10px] uppercase tracking-widest text-neutral-light font-bold">Event Access</div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="absolute -bottom-6 -right-6 bg-primary text-white p-4 rounded-2xl shadow-2xl rotate-[6deg] hidden sm:block animate-float-3">
                                        <div className="text-lg font-bold">100+</div>
                                        <div className="text-[10px] uppercase tracking-widest opacity-80 font-bold">Annual PR Events</div>
                                    </div>
                                </div>
                            </div>

                            <div className="lg:col-span-7 order-1 lg:order-2">
                                <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-primary mb-8">Exclusive Networking</h3>
                                <h2 className="text-4xl md:text-6xl font-medium text-white mb-8 tracking-tight leading-[1.1]">
                                    The coolest events <br />
                                    <span className="text-neutral-400 font-serif italic">you'll be invited to</span> <br />
                                    all year.
                                </h2>
                                <p className="text-xl text-neutral-300 font-light leading-relaxed max-w-xl mb-12">
                                    Our roster doesn't just get paid—they get access. From private brand dinners in Toronto to exclusive PR moments in NYC and LA, we make sure you're at the center of the industry's most talked-about events.
                                </p>
                                
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 mb-12">
                                    <div className="flex items-start gap-4">
                                        <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-primary shrink-0">
                                            <MapPin size={20} />
                                        </div>
                                        <div>
                                            <div className="text-white font-bold mb-1">Cross-Border PR</div>
                                            <div className="text-sm text-neutral-400">Exclusive invites to moments across Canada and the US.</div>
                                        </div>
                                    </div>
                                    <div className="flex items-start gap-4">
                                        <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-primary shrink-0">
                                            <Users size={20} />
                                        </div>
                                        <div>
                                            <div className="text-white font-bold mb-1">Curated Circles</div>
                                            <div className="text-sm text-neutral-400">Network with founders, VCs, and top-tier creators.</div>
                                        </div>
                                    </div>
                                </div>

                                <div className="flex flex-col sm:flex-row items-center gap-8">
                                    <button
                                        onClick={handleApplyClick}
                                        className="px-8 py-4 bg-primary text-white font-bold rounded-xl hover:bg-white hover:text-neutral-darkest transition-all shadow-xl flex items-center justify-center gap-2 group w-full sm:w-auto"
                                    >
                                        Apply for access
                                        <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                                    </button>
                                    <span className="text-neutral-400 text-sm italic font-light">Reserved for active roster members.</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Section>

            {/* COMPARISON - The Creator OS */}
            <Section className="py-32 bg-neutral-lightest">
                <div className="max-w-[1200px] mx-auto px-6">
                    <div className="text-center mb-20">
                        <h2 className="text-4xl md:text-6xl font-medium tracking-tight text-neutral-darkest mb-6">Compare the routine.</h2>
                        <p className="text-xl text-neutral-dark font-light">The math is simple. The experience is better.</p>
                    </div>

                    <div className="bg-white rounded-[2.5rem] border border-neutral-200 overflow-hidden shadow-[0_32px_64px_rgba(0,0,0,0.05)]">
                        <div className="grid grid-cols-2 md:grid-cols-3 bg-neutral-darkest p-8 text-xs font-bold tracking-widest text-white uppercase">
                            <div className="text-white/40">Efficiency Metrics</div>
                            <div className="hidden md:block text-center">Typical Agency</div>
                            <div className="text-primary text-right md:text-center">The Slice Way</div>
                        </div>

                        {[
                            { label: "Payment Terms", bad: "Net-30 or Net-60", good: "Instant (48 Hours)" },
                            { label: "Predictability", bad: "One-off Giftings", good: "Reliable Income" },
                            { label: "Logistics", bad: "10 Tracking Codes", good: "One Dedicated Link" },
                            { label: "Negotiation", bad: "Endless Emails", good: "Upfront Guarantee" },
                            { label: "Communication", bad: "Slack / Email Overload", good: "Automated Notifications" }
                        ].map((row, idx) => (
                            <div key={idx} className="grid grid-cols-2 md:grid-cols-3 p-8 border-b border-neutral-100 last:border-0 hover:bg-neutral-50 transition-colors">
                                <div className="text-sm font-bold text-neutral-darkest">{row.label}</div>
                                <div className="hidden md:block text-center text-sm text-neutral-dark font-light">{row.bad}</div>
                                <div className="text-right md:text-center text-sm font-bold text-neutral-darkest">
                                    <span className="inline-flex items-center gap-2 bg-primary/5 px-4 py-2 rounded-full text-primary">
                                        <CheckCircle2 size={14} />
                                        {row.good}
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="mt-20 flex flex-col items-center gap-6">
                        <button
                            onClick={handleApplyClick}
                            className="px-12 py-6 bg-neutral-darkest text-white text-xl font-bold rounded-2xl hover:bg-primary transition-all shadow-2xl flex items-center justify-center gap-3 group"
                        >
                            Join the Roster
                            <ArrowRight size={24} className="group-hover:translate-x-1 transition-transform" />
                        </button>
                        <a href="#faq" onClick={(e) => { e.preventDefault(); document.getElementById('faq')?.scrollIntoView({ behavior: 'smooth' }); }} className="text-sm font-bold tracking-widest uppercase text-neutral-darkest border-b border-neutral-darkest/20 hover:border-primary transition-all">View all creator benefits</a>
                    </div>
                </div>
            </Section>

            {/* FINAL CTA */}
            <div className="bg-white py-32 px-6 text-center relative overflow-hidden">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/10 blur-[140px] rounded-full pointer-events-none"></div>

                <div className="max-w-4xl mx-auto relative z-10">
                    <h2 className="text-5xl md:text-7xl font-medium tracking-tight text-neutral-darkest mb-10 leading-[0.95]">
                        Ready to join <br />
                        <span className="font-serif italic text-primary">the roster?</span>
                    </h2>

                    <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
                        <button
                            onClick={handleApplyClick}
                            className="w-full sm:w-auto px-12 py-6 bg-neutral-darkest text-white text-xl font-bold rounded-2xl hover:bg-primary transition-all shadow-2xl hover:-translate-y-1"
                        >
                            Apply Now
                        </button>
                    </div>
                    <div className="mt-10 text-[10px] font-bold uppercase tracking-[0.2em] text-neutral-light">
                        Vetting takes ~24 hours <span className="mx-2 opacity-30">|</span> 100% Free to Join
                    </div>
                </div>
            </div>

            {/* FAQ */}
            <Section className="bg-white" id="faq">
                <SectionHeading title="Creator FAQ" />
                <div className="max-w-3xl mx-auto space-y-4">
                    {[
                        { q: "Is there a cost to join?", a: "No. You never pay us. We operate as an agency where we charge the brands and pay you for your content creation services." },
                        { q: "Do I have to post to my feed?", a: "Yes. That is the core value for the brands. We look for creators who are proud to share their finds with their audience." },
                        { q: "What kind of products?", a: "We work with small Canadian businesses. Typical categories include Home Goods, Wellness, Tech Accessories, and Snacks/Beverages." },
                        { q: "How do I get paid?", a: "We pay via E-transfer (for Canadian creators) or PayPal. Payments are processed within 48 hours of us verifying your upload." },
                        { q: "Can I opt out of a box?", a: "Yes. If you're busy one month, you can skip a box. You only get paid for the boxes you accept." },
                    ].map((faq, idx) => (
                        <div key={idx} className="p-6 bg-white rounded border border-neutral-lighter hover:border-creator/50 transition-colors shadow-sm group">
                            <h4 className="font-bold text-neutral-darkest mb-3 text-sm uppercase tracking-wide group-hover:text-creator transition-colors flex items-center gap-2">
                                <span className="text-neutral-lighter group-hover:text-creator/50">0{idx + 1}.</span>
                                {faq.q}
                            </h4>
                            <p className="text-neutral-dark text-sm leading-relaxed pl-6 border-l border-neutral-lighter group-hover:border-creator/20 transition-colors">{faq.a}</p>
                        </div>
                    ))}
                </div>

                <div className="mt-20 flex flex-col items-center">
                    <h3 className="text-2xl font-bold text-neutral-darkest mb-4">Have more questions?</h3>
                    <p className="text-neutral-dark mb-10 font-light text-center max-w-md">We're looking for authentic voices to join our Creator roster. Ready to turn your lifestyle into revenue?</p>
                    <div className="flex flex-col sm:flex-row items-center gap-8">
                        <button
                            onClick={handleApplyClick}
                            className="px-10 py-5 bg-neutral-darkest text-white text-lg font-bold rounded-xl hover:bg-primary transition-all shadow-xl flex items-center justify-center gap-2 group w-full sm:w-auto"
                        >
                            Apply to the Roster
                            <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                        </button>
                        <a href="mailto:support@slice99.com" className="text-sm font-bold tracking-widest uppercase text-neutral-darkest border-b-2 border-primary/30 hover:border-primary pb-1 transition-all flex items-center gap-2 group">
                            Contact Support
                            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                        </a>
                    </div>
                </div>
            </Section>
        </>
    );
};