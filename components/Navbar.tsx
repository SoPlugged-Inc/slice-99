import React from 'react';
import { ArrowRight } from 'lucide-react';

interface NavbarProps {
  page: 'brand' | 'creator' | 'blog';
  onSwitch: (page: 'brand' | 'creator' | 'blog') => void;
  onApplyClick?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ page, onSwitch, onApplyClick }) => {
  const isCreator = page === 'creator';
  const isBlog = page === 'blog';
  const isBrand = page === 'brand';

  const scrollToTop = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    if (!isBrand) {
      onSwitch('brand');
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      const headerOffset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.scrollY - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  const handlePrimaryAction = (e: React.MouseEvent) => {
    e.preventDefault();
    if (isCreator) {
      if (onApplyClick) onApplyClick();
    } else {
      if (isBlog) {
        onSwitch('brand');
        setTimeout(() => {
          const element = document.getElementById('pricing');
          if (element) {
            const headerOffset = 80;
            const elementPosition = element.getBoundingClientRect().top;
            window.scrollTo({ top: elementPosition + window.scrollY - headerOffset, behavior: 'smooth' });
          }
        }, 150);
      } else {
        const element = document.getElementById('pricing');
        if (element) {
          const headerOffset = 80;
          const elementPosition = element.getBoundingClientRect().top;
          window.scrollTo({ top: elementPosition + window.scrollY - headerOffset, behavior: 'smooth' });
        }
      }
    }
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-[#FDFBF7]/90 backdrop-blur-md border-b border-[#E8E4DB]/50 transition-all duration-300 shadow-none">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        
        {/* Logo area */}
        <a
          href="#"
          onClick={scrollToTop}
          className="flex items-center gap-2 group focus-visible:outline-none"
          aria-label="Slice Home"
        >
          <div className="text-xl font-black tracking-tight text-neutral-darkest uppercase select-none flex items-center gap-0.5">
            SL<span className="text-primary font-serif">/</span>CE
          </div>
        </a>

        {/* Dynamic Contextual Navigation Links */}
        <div className="hidden md:flex items-center gap-8 text-[11px] font-mono font-bold uppercase tracking-wider text-neutral-dark">
          {isBrand && (
            <>
              <a
                href="#cac-calculator"
                onClick={(e) => scrollToSection(e, 'cac-calculator')}
                className="transition-colors hover:text-neutral-darkest animate-none"
              >
                Calculator
              </a>
              <a
                href="#pricing"
                onClick={(e) => scrollToSection(e, 'pricing')}
                className="transition-colors hover:text-neutral-darkest animate-none"
              >
                Pricing
              </a>
              <a
                href="#faq"
                onClick={(e) => scrollToSection(e, 'faq')}
                className="transition-colors hover:text-neutral-darkest animate-none"
              >
                FAQ
              </a>
              <button
                onClick={() => onSwitch('blog')}
                className="transition-colors hover:text-neutral-darkest font-mono font-bold uppercase tracking-wider animate-none"
              >
                Case Studies
              </button>
            </>
          )}

          {isCreator && (
            <>
              <a
                href="#how-it-works"
                onClick={(e) => scrollToSection(e, 'how-it-works')}
                className="transition-colors hover:text-neutral-darkest animate-none"
              >
                The Routine
              </a>
              <a
                href="#earnings"
                onClick={(e) => scrollToSection(e, 'earnings')}
                className="transition-colors hover:text-[#111111] animate-none"
              >
                Earnings
              </a>
              <a
                href="#exclusive-access"
                onClick={(e) => scrollToSection(e, 'exclusive-access')}
                className="transition-colors hover:text-[#111111] animate-none"
              >
                VIP Events
              </a>
              <a
                href="#faq"
                onClick={(e) => scrollToSection(e, 'faq')}
                className="transition-colors hover:text-[#111111] animate-none"
              >
                FAQ
              </a>
            </>
          )}
        </div>

        {/* Action buttons */}
        <div className="flex items-center gap-6">
          {/* Secondary Action: Page Toggle */}
          {isCreator ? (
            <button
              onClick={() => onSwitch('brand')}
              className="text-[11px] font-mono font-bold uppercase tracking-wider text-neutral-dark hover:text-[#111111] transition-colors flex items-center gap-1.5"
            >
              B2C Brands
              <ArrowRight size={12} className="text-neutral-light" />
            </button>
          ) : (
            <button
              onClick={() => onSwitch('creator')}
              className="text-[11px] font-mono font-bold uppercase tracking-wider text-neutral-dark hover:text-[#111111] transition-colors flex items-center gap-1.5"
            >
              For Creators
              <ArrowRight size={12} className="text-neutral-light" />
            </button>
          )}

          {/* Primary Action Button */}
          <button
            onClick={handlePrimaryAction}
            className="bg-neutral-darkest hover:bg-neutral-dark text-white px-5 py-2 text-[10px] font-mono font-bold uppercase tracking-widest rounded transition-colors active:scale-[0.98] text-center"
          >
            {isCreator ? "Apply to Roster" : "Get Started"}
          </button>
        </div>
      </div>
    </nav>
  );
};