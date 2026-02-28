import React, { useState } from 'react';
import { Loader2, ArrowRight } from 'lucide-react';

interface NavbarProps {
  page: 'brand' | 'creator';
  onSwitch: (page: 'brand' | 'creator') => void;
  onApplyClick?: () => void;
}



export const Navbar: React.FC<NavbarProps> = ({ page, onSwitch, onApplyClick }) => {
  const [isLoading, setIsLoading] = useState(false);
  const isCreator = page === 'creator';

  const scrollToTop = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      const headerOffset = 80; // Height of navbar + buffer
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.scrollY - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  const handleActionClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (isCreator && onApplyClick) {
      onApplyClick();
      return;
    }

    setIsLoading(true);
    const url = 'https://book.stripe.com/aFafZadjE3050Wh4Bq5Vu00'; // Brand specific URL
    setTimeout(() => {
      setIsLoading(false);
      window.open(url, '_blank');
    }, 1000);
  };

  // Theme classes
  const activeLinkClass = isCreator
    ? "hover:text-creator focus-visible:ring-creator"
    : "hover:text-primary focus-visible:ring-primary";

  const buttonClass = isCreator
    ? "bg-creator hover:bg-creator-hover shadow-creator/20 hover:shadow-creator/30 focus-visible:ring-creator"
    : "bg-primary hover:bg-primary-hover shadow-primary/20 hover:shadow-primary/30 focus-visible:ring-primary";

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-neutral-white/90 backdrop-blur-md border-b border-neutral-lighter supports-[backdrop-filter]:bg-neutral-white/60">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        <a
          href="#"
          onClick={scrollToTop}
          className={`flex items-center gap-2 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 rounded-sm ${isCreator ? 'focus-visible:ring-creator' : 'focus-visible:ring-primary'}`}
          aria-label="Slice Home"
        >
          {/* Logo Text */}
          <div className="text-2xl font-black tracking-tighter text-neutral-darkest uppercase select-none">
            SL<span className={isCreator ? 'text-creator' : 'text-primary'}>/</span>CE
          </div>

          {isCreator && <span className="text-[10px] font-bold uppercase tracking-widest bg-neutral-lightest text-neutral-dark px-2 py-0.5 rounded ml-1 border border-neutral-lighter">Creator</span>}
        </a>

        {/* Navigation Links */}
        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-neutral-dark">
          {!isCreator ? (
            <>
              <a
                href="#how-it-works"
                onClick={(e) => scrollToSection(e, 'how-it-works')}
                className={`transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 rounded-sm px-1 ${activeLinkClass}`}
              >
                How it Works
              </a>
              <a
                href="#faq"
                onClick={(e) => scrollToSection(e, 'faq')}
                className={`transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 rounded-sm px-1 ${activeLinkClass}`}
              >
                FAQ
              </a>
            </>
          ) : (
            <button
              onClick={() => onSwitch('brand')}
              className={`transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 rounded-sm px-1 ${activeLinkClass}`}
            >
              For Brands
            </button>
          )}
        </div>

        <div className="flex items-center gap-4">
          {!isCreator ? (
            <button
              onClick={() => onSwitch('creator')}
              className={`hidden sm:flex items-center gap-1 text-sm font-medium text-neutral-dark transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 rounded-sm px-2 py-1 ${activeLinkClass}`}
            >
              Are you a creator? <ArrowRight size={14} />
            </button>
          ) : (
            <button
              onClick={() => onSwitch('brand')}
              className={`hidden sm:flex items-center gap-1 text-sm font-medium text-neutral-dark transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 rounded-sm px-2 py-1 ${activeLinkClass}`}
            >
              <ArrowRight size={14} className="rotate-180" /> Back to Brands
            </button>
          )}

          <button
            onClick={handleActionClick}
            disabled={isLoading}
            className={`text-white px-5 py-2 text-sm font-bold tracking-tight rounded-md shadow-lg transition-all active:scale-95 inline-block text-center decoration-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-darkest focus-visible:ring-offset-2 disabled:opacity-80 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center min-w-[140px] ${buttonClass}`}
          >
            {isLoading ? <Loader2 size={16} className="animate-spin" /> : (!isCreator ? "Book Slot" : "Join Slice")}
          </button>
        </div>
      </div>
    </nav>
  );
};