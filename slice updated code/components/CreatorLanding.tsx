import React, { useState, useEffect } from 'react';
import { Package, Video, DollarSign, CheckCircle2, ArrowRight, Loader2, Zap, Users, Info, Bell, Wallet } from 'lucide-react';
import { TextReveal, TypewriterEffect, ColumnBackground, SpotlightCard, Section, SectionHeading, LogoMarquee } from './Shared';

const PhonePayoutVisual = () => {
  const [notifications, setNotifications] = useState([
    { id: 1, time: 'Now', amount: 150.00, brand: 'Slice Payout' },
    { id: 2, time: '2m ago', amount: 150.00, brand: 'Slice Payout' },
    { id: 3, time: '1h ago', amount: 150.00, brand: 'Slice Payout' },
  ]);
  const [balance, setBalance] = useState(450.00);

  useEffect(() => {
    const brands = ['Slice Payout', 'Slice Payout', 'Bonus Payment'];
    
    const interval = setInterval(() => {
      const newId = Date.now();
      const randomBrand = brands[Math.floor(Math.random() * brands.length)];
      
      // Add new notification to the top
      setNotifications(prev => [
        { id: newId, time: 'Just now', amount: 150.00, brand: randomBrand },
        ...prev.slice(0, 5) // Keep only the latest 6 to prevent DOM bloat
      ]);
      
      // Increment balance visually with logic to reset for "Seasons" if it gets too high
      setBalance(prev => {
        if (prev >= 10000) return 150.00; // Reset loop
        return prev + 150.00;
      });

    }, 1500); // Faster loop for better visual engagement

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

export const CreatorLanding: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isHeroLoading, setIsHeroLoading] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const handleApplyClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsHeroLoading(true);
    setTimeout(() => {
      setIsHeroLoading(false);
      window.open('https://typeform.com', '_blank');
    }, 1000);
  };

  return (
    <>
      {/* Hero Section */}
      <div className="relative pt-10 pb-10 sm:pt-20 sm:pb-16 px-4 sm:px-6 overflow-hidden flex flex-col items-center min-h-auto">
        <ColumnBackground />
        
        <div className="relative z-10 max-w-4xl mx-auto text-center w-full">
          <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full bg-neutral-darkest text-white border border-neutral-darkest shadow-lg shadow-neutral-darkest/20 text-[10px] sm:text-xs font-bold tracking-wide mb-5 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
            <Users size={12} className="text-creator" />
            Currently onboarding: Micro & Nano Creators (1k - 50k)
          </div>
          
          <div className="w-full mb-8 flex items-center justify-center">
            <h1 className="text-4xl sm:text-6xl font-extrabold text-neutral-darkest tracking-tight leading-[1.1] text-center mx-auto max-w-3xl flex flex-col items-center">
                <TypewriterEffect text={`Make more money\nwith UGC`} pauseDuration={5000} className="text-center" cursorClassName="text-creator" />
            </h1>
          </div>
          
          <div className={`transition-all duration-1000 delay-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
                <div className="relative group rounded-md w-full sm:w-auto flex flex-col items-center">
                    <div className="relative w-full sm:w-auto">
                        <div className="border-beam rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-500" style={{ '--duration': 4 } as React.CSSProperties}></div>
                        <button 
                          onClick={handleApplyClick}
                          disabled={isHeroLoading}
                          className="relative w-full sm:w-auto px-8 py-3.5 bg-creator text-white font-bold tracking-tight rounded-md hover:bg-creator-hover transition-all shadow-xl shadow-creator/20 hover:shadow-creator/40 hover:-translate-y-0.5 active:translate-y-0 text-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-creator focus-visible:ring-offset-2 flex items-center justify-center gap-2 disabled:opacity-80 disabled:cursor-not-allowed"
                        >
                          {isHeroLoading ? <Loader2 size={20} className="animate-spin" /> : "Join Slice"}
                        </button>
                    </div>
                    {/* Clean Micro-copy */}
                    <p className="mt-3 text-xs text-neutral-500 font-medium tracking-wide">
                        Receive a monthly box. Film one video. Get paid.
                    </p>
                </div>
            </div>
          </div>
        </div>

        {/* Browser Window with Phone Visual */}
        <div className={`w-full max-w-4xl mt-10 sm:mt-12 transition-all duration-1000 delay-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
            <div className="bg-white border border-neutral-lighter rounded-xl shadow-2xl shadow-neutral-darkest/5 overflow-hidden font-sans relative">
                {/* Window Header */}
                <div className="bg-neutral-lightest/50 border-b border-neutral-lighter px-4 py-3 flex gap-2">
                    <div className="w-3 h-3 rounded-full bg-red-400/20 border border-red-400/50"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-400/20 border border-yellow-400/50"></div>
                    <div className="w-3 h-3 rounded-full bg-green-400/20 border border-green-400/50"></div>
                </div>
                
                {/* Content Area */}
                <div className="p-8 sm:p-12 bg-grid-pattern bg-[size:20px_20px] flex items-center justify-center relative">
                     {/* Glow effect behind phone */}
                     <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-creator/20 blur-[100px] rounded-full pointer-events-none"></div>
                     <PhonePayoutVisual />
                </div>
            </div>
            <div className="text-center mt-6 text-xs text-neutral-light font-medium uppercase tracking-widest">
                No invoices. Just payments.
            </div>
        </div>

        {/* Marquee */}
        <div className="mt-10 sm:mt-16 w-full max-w-6xl mx-auto">
             <LogoMarquee />
        </div>
      </div>

      {/* How It Works */}
      <Section className="bg-neutral-lightest border-y border-neutral-lighter py-10 sm:py-16" id="how-it-works">
        <SectionHeading 
            title="Why Creators Love Slice" 
            subtitle="Predictable income. Zero negotiation."
        />
        <div className="grid md:grid-cols-3 gap-6 sm:gap-8 mb-4">
            {[
                { 
                    step: "01", 
                    title: "Receive", 
                    desc: "Get a consolidated box of cool products (yours to keep) delivered to your door every month.",
                    icon: <Package className="text-creator" size={24} aria-hidden="true" />
                },
                { 
                    step: "02", 
                    title: "Film", 
                    desc: "Shoot a single 60-second unboxing haul featuring the products. No complex scripts. Just authentic reactions.",
                    icon: <Video className="text-creator" size={24} aria-hidden="true" />
                },
                { 
                    step: "03", 
                    title: "Earn", 
                    desc: "Get paid a flat rate within 48 hours of upload. No chasing invoices. No net-60 terms.",
                    icon: <DollarSign className="text-creator" size={24} aria-hidden="true" />
                }
            ].map((item, idx) => (
                <SpotlightCard key={idx} className="p-6 sm:p-8 h-full bg-white shadow-sm hover:shadow-md relative overflow-hidden group hover:border-creator/30">
                    <div className="flex items-center justify-between mb-4">
                        <div className="text-xs text-creator font-bold bg-creator/5 px-2 py-1 rounded border border-creator/20">Step {item.step}</div>
                        <div className="p-2 bg-neutral-lightest rounded border border-neutral-lighter text-creator">{item.icon}</div>
                    </div>
                    <h3 className="text-xl font-bold text-neutral-darkest mb-3 tracking-tight">{item.title}</h3>
                    <p className="text-neutral-dark leading-relaxed text-sm">{item.desc}</p>
                </SpotlightCard>
            ))}
        </div>
      </Section>

      {/* Comparison Table */}
      <Section className="py-10 sm:py-16">
        {/* Section Heading Removed */}
        <div className="max-w-4xl mx-auto bg-white rounded-lg border border-neutral-lighter overflow-hidden shadow-soft hover:shadow-glow transition-shadow duration-500">
            <div className="grid grid-cols-3 bg-neutral-darkest p-4 text-[10px] sm:text-xs font-bold tracking-widest text-white uppercase border-b border-neutral-darker">
                <div className="text-neutral-400">Comparison</div>
                <div className="text-center">Brand Deals</div>
                <div className="text-creator text-center">Slice</div>
            </div>
            
            {[
                { label: "Consistency", bad: "Sporadic / One-off", good: "Monthly Cadence" },
                { label: "Payment", bad: "Net-30 or Net-60", good: "48 Hours" },
                { label: "Compensation", bad: "Often 'Gifted Only'", good: "Cash + Product" },
                { label: "Admin Work", bad: "Endless DMs & Contracts", good: "Zero Admin" },
            ].map((row, idx) => (
                <div key={idx} className="grid grid-cols-3 p-4 sm:p-5 border-b border-neutral-lighter last:border-0 items-center hover:bg-neutral-lightest/30 transition-colors group">
                    <div className="text-neutral-dark text-xs sm:text-sm font-bold uppercase">{row.label}</div>
                    <div className="text-center text-neutral text-sm sm:text-base flex justify-center items-center gap-2 opacity-60 decoration-dashed">
                        {row.bad}
                    </div>
                    <div className="text-center font-bold text-neutral-darkest text-sm sm:text-base flex justify-center items-center gap-2 py-1.5 rounded text-creator relative">
                         <div className="absolute inset-0 bg-creator/5 scale-x-0 group-hover:scale-x-100 transition-transform origin-center rounded"></div>
                         <CheckCircle2 size={16} className="text-creator hidden sm:block relative z-10" aria-hidden="true" />
                        <span className="relative z-10">{row.good}</span>
                    </div>
                </div>
            ))}
        </div>
      </Section>

      {/* FAQ */}
      <Section className="bg-white" id="faq">
         <SectionHeading title="Creator FAQ" />
         <div className="max-w-3xl mx-auto space-y-4">
            {[
                { q: "Is there a cost to join?", a: "No. You never pay us. We operate as an agency where we charge the brands and pay you for your content creation services." },
                { q: "Do I have to post to my feed?", a: "Yes. That is the core value for the brands. We look for creators who are proud to share their finds with their audience." },
                { q: "What kind of products?", a: "We work with small Canadian businesses. Typical categories include Home Goods, Wellness, Tech Accessories, and Snacks/Beverages." },
                { q: "How do I get paid?", a: "We pay via E-transfer (for Canadian creators) or PayPal. Payments are processed within 48 hours of us verifying your upload." },
                { q: "Can I opt out of a box?", a: "Yes. If you're busy one month, you can pause your subscription. You only get paid for the boxes you accept." },
            ].map((faq, idx) => (
                <div key={idx} className="p-6 bg-white rounded border border-neutral-lighter hover:border-creator/50 transition-colors shadow-sm group">
                    <h4 className="font-bold text-neutral-darkest mb-3 text-sm uppercase tracking-wide group-hover:text-creator transition-colors flex items-center gap-2">
                        <span className="text-neutral-lighter group-hover:text-creator/50">0{idx+1}.</span>
                        {faq.q}
                    </h4>
                    <p className="text-neutral-dark text-sm leading-relaxed pl-6 border-l border-neutral-lighter group-hover:border-creator/20 transition-colors">{faq.a}</p>
                </div>
            ))}
         </div>
      </Section>
    </>
  );
};