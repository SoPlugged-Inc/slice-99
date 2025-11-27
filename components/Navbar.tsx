import React, { useState } from 'react';
import { Loader2, ArrowRight } from 'lucide-react';

interface NavbarProps {
  page: 'brand' | 'creator';
  onSwitch: (page: 'brand' | 'creator') => void;
}

// Placeholder for the actual Dark Logo file provided by the user
// Replace this Data URI with your actual file path, e.g., "/logo-dark.png"
const LOGO_DARK_URL = `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 140 40' fill='none'%3E%3Ctext x='0' y='55%25' dominant-baseline='middle' font-family='Libre Baskerville, serif' font-weight='700' font-size='28' letter-spacing='-1.5' fill='%230F172A'%3Eco-create%3C/text%3E%3C/svg%3E`;

export const Navbar: React.FC<NavbarProps> = ({ page, onSwitch }) => {
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
    setIsLoading(true);
    const url = isCreator ? 'https://typeform.com' : 'https://google.com'; // Placeholder URLs
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
          aria-label="Co-Create Home"
        >
          {/* Logo Image */}
          <img
            src={LOGO_DARK_URL}
            alt="Co-Create"
            className="h-8 w-auto object-contain"
          />

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
              className={`flex items-center gap-1 text-sm font-medium text-neutral-dark transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 rounded-sm px-2 py-1 ${activeLinkClass}`}
            >
              <span className="sm:hidden">Creators</span>
              <span className="hidden sm:inline">Are you a creator?</span>
              <ArrowRight size={14} />
            </button>
          ) : (
            <button
              onClick={() => onSwitch('brand')}
              className={`flex items-center gap-1 text-sm font-medium text-neutral-dark transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 rounded-sm px-2 py-1 ${activeLinkClass}`}
            >
              <ArrowRight size={14} className="rotate-180" />
              <span className="sm:hidden">Brands</span>
              <span className="hidden sm:inline">Back to Brands</span>
            </button>
          )}

          <button
            onClick={handleActionClick}
            disabled={isLoading}
            className={`text-white px-5 py-2 text-sm font-bold tracking-tight rounded-md shadow-lg transition-all active:scale-95 inline-block text-center decoration-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-darkest focus-visible:ring-offset-2 disabled:opacity-80 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center min-w-[140px] ${buttonClass}`}
          >
            {isLoading ? <Loader2 size={16} className="animate-spin" /> : (!isCreator ? "Book Slot" : "Apply to Roster")}
          </button>
        </div>
      </div>
    </nav>
  );
};