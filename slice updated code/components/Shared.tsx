import React, { useRef, useState, useEffect } from 'react';

// --- Animation Components ---

export const TypewriterEffect: React.FC<{ text: string; className?: string; pauseDuration?: number; cursorClassName?: string }> = ({ text, className = "", pauseDuration = 2000, cursorClassName = "text-primary" }) => {
  const [displayText, setDisplayText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [loopNum, setLoopNum] = useState(0);
  const [typingSpeed, setTypingSpeed] = useState(150);

  useEffect(() => {
    const handleTyping = () => {
      const fullText = text;
      
      setDisplayText(current => 
        isDeleting 
          ? fullText.substring(0, current.length - 1) 
          : fullText.substring(0, current.length + 1)
      );

      setTypingSpeed(isDeleting ? 50 : 150);

      if (!isDeleting && displayText === fullText) {
        setTimeout(() => setIsDeleting(true), pauseDuration); // Configurable pause
      } else if (isDeleting && displayText === '') {
        setIsDeleting(false);
        setLoopNum(loopNum + 1);
      }
    };

    const timer = setTimeout(handleTyping, typingSpeed);
    return () => clearTimeout(timer);
  }, [displayText, isDeleting, loopNum, typingSpeed, text, pauseDuration]);

  return (
    <span className={`block w-full ${className} whitespace-pre-wrap`}>
      {displayText}
      <span className={`animate-pulse ml-1 inline-block align-middle font-bold ${cursorClassName}`}>_</span>
    </span>
  );
};

export const TextReveal: React.FC<{ text: string; delay?: number; className?: string }> = ({ text, delay = 0, className = "" }) => {
  const words = text.split(" ");
  return (
    <span className={`inline-flex flex-wrap justify-center gap-x-2.5 gap-y-1 ${className}`}>
      {words.map((word, i) => (
        <span key={i} className="text-reveal-wrapper">
          <span 
            className="text-reveal-inner" 
            style={{ animationDelay: `${delay + (i * 0.05)}s` }}
          >
            {word}
          </span>
        </span>
      ))}
    </span>
  );
};

export const ColumnBackground = () => {
  return (
    <div className="absolute inset-0 grid grid-cols-6 sm:grid-cols-12 gap-4 pointer-events-none select-none -z-10 px-4 opacity-30 sm:opacity-20">
      {Array.from({ length: 12 }).map((_, i) => (
        <div 
          key={i} 
          className="h-full bg-neutral-lighter/60 animate-clip-down"
          style={{ animationDelay: `${i * 0.05}s` }}
        />
      ))}
    </div>
  );
};

export const SpotlightCard: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className = "" }) => {
    const divRef = useRef<HTMLDivElement>(null);
  
    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
      if (!divRef.current) return;
      const rect = divRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      divRef.current.style.setProperty('--mouse-x', `${x}px`);
      divRef.current.style.setProperty('--mouse-y', `${y}px`);
    };
  
    return (
      <div 
        ref={divRef}
        onMouseMove={handleMouseMove}
        className={`spotlight-card bg-white rounded-lg border border-neutral-lighter transition-colors ${className}`}
      >
        <div className="relative z-10 h-full">
            {children}
        </div>
      </div>
    );
};

// --- Layout Components ---

export const Section: React.FC<{ className?: string; children: React.ReactNode; id?: string }> = ({ className = "", children, id }) => (
  <section id={id} className={`py-12 sm:py-16 px-4 sm:px-6 relative scroll-mt-28 ${className}`}>
    <div className="max-w-6xl mx-auto relative z-10">
      {children}
    </div>
  </section>
);

export const SectionHeading: React.FC<{ title: string; subtitle?: string }> = ({ title, subtitle }) => (
  <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-14">
    <h2 className="text-2xl sm:text-4xl font-bold tracking-tight text-neutral-darkest mb-3">{title}</h2>
    {subtitle && <p className="text-base sm:text-lg text-neutral-dark">{subtitle}</p>}
  </div>
);

export const LogoMarquee = () => (
    <div className="w-full overflow-hidden mask-linear-fade py-6 opacity-60 grayscale mix-blend-multiply">
        <div className="flex gap-12 w-max animate-marquee hover:paused items-center">
             {[...Array(2)].map((_, i) => (
                 <div key={i} className="flex gap-12 shrink-0">
                     {['Fashion', 'Beauty', 'Home Goods', 'Wellness', 'Tech', 'Food & Bev', 'Pet Care', 'Lifestyle'].map((name, idx) => (
                         <span key={idx} className="text-lg sm:text-xl font-bold text-neutral tracking-tight hover:text-primary transition-colors cursor-default">{name}</span>
                     ))}
                 </div>
             ))}
        </div>
    </div>
);