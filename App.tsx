import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { TermsModal } from './components/TermsModal';
import { BrandLanding } from './components/BrandLanding';
import { CreatorLanding } from './components/CreatorLanding';
import { CreatorApplyModal } from './components/CreatorApplyModal';
import { SliceStudies } from './components/SliceStudies';
import { BrandBookModal } from './components/BrandBookModal';



function App() {
  const [currentPage, setCurrentPage] = useState<'brand' | 'creator' | 'blog'>(() => {
    const path = window.location.pathname;
    if (path.startsWith('/creators')) return 'creator';
    if (path.startsWith('/blog')) return 'blog';
    return 'brand';
  });
  const [isTermsOpen, setIsTermsOpen] = useState(false);
  const [isCreatorApplyOpen, setIsCreatorApplyOpen] = useState(false);
  const [isBrandBookOpen, setIsBrandBookOpen] = useState(false);
  const [initialBookPackage, setInitialBookPackage] = useState<'pilot' | 'growth' | 'enterprise'>('pilot');

  const handleBrandBookTrigger = (pkg: 'pilot' | 'growth' | 'enterprise' = 'pilot') => {
    setInitialBookPackage(pkg);
    setIsBrandBookOpen(true);
  };

  const handlePageSwitch = (page: 'brand' | 'creator' | 'blog') => {
    setCurrentPage(page);
    let path = '/';
    if (page === 'creator') path = '/creators';
    if (page === 'blog') path = '/blog';
    window.history.pushState({}, '', path);
    window.scrollTo({ top: 0, behavior: 'instant' });
  };

  return (
    <div className="min-h-screen font-sans bg-[#FDFBF7] text-neutral-darkest bg-fixed">
      <Navbar
        page={currentPage}
        onSwitch={handlePageSwitch}
        onApplyClick={() => setIsCreatorApplyOpen(true)}
      />

      {currentPage === 'brand' && <BrandLanding onSwitch={handlePageSwitch} onBookClick={handleBrandBookTrigger} />}
      {currentPage === 'creator' && <CreatorLanding onApplyClick={() => setIsCreatorApplyOpen(true)} />}
      {currentPage === 'blog' && <SliceStudies />}

      {/* Footer - Shared */}
      <footer className="bg-neutral-darkest text-neutral-light py-12 sm:py-16 px-4 border-t border-neutral-darker relative overflow-hidden">
        {/* Grid Background in Footer */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none"></div>

        {/* Simple accent glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-primary rounded-full blur-[120px] pointer-events-none opacity-5"></div>

        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-center gap-8 relative z-10">
          <div className="flex flex-col items-start">
            {/* Logo Text */}
            <div className="text-2xl font-black tracking-tighter text-white uppercase select-none mb-1">
              SL<span className={currentPage === 'brand' ? 'text-primary' : 'text-creator'}>/</span>CE
            </div>
            <span className="text-xs text-neutral-500 uppercase tracking-widest">Share the creator. Split the cost.</span>
          </div>

          <div className="grid grid-cols-2 sm:flex gap-8 sm:gap-12 text-sm text-neutral-400">
            <div className="flex flex-col gap-3">
              <span className="text-white font-bold uppercase tracking-widest text-[10px]">Contact</span>
              <a
                href="mailto:support@slice99.com"
                className="hover:text-primary transition-colors hover:underline decoration-primary decoration-1 underline-offset-4"
              >
                support@slice99.com
              </a>
            </div>
            <div className="flex flex-col gap-3">
              <span className="text-white font-bold uppercase tracking-widest text-[10px]">Resources</span>
              <button
                onClick={() => handlePageSwitch('blog')}
                className="text-left hover:text-primary transition-colors hover:underline decoration-primary decoration-1 underline-offset-4"
              >
                Slice Studies
              </button>
              <button
                onClick={() => setIsTermsOpen(true)}
                className="text-left hover:text-primary transition-colors hover:underline decoration-primary decoration-1 underline-offset-4"
              >
                Terms of Service
              </button>
            </div>
            <div className="flex flex-col gap-3">
              <span className="text-white font-bold uppercase tracking-widest text-[10px]">Social</span>
              <a
                href="https://www.instagram.com/slice99/"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-primary transition-colors hover:underline decoration-primary decoration-1 underline-offset-4"
              >
                Instagram
              </a>
              <a
                href="https://www.linkedin.com/company/slice99/"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-primary transition-colors hover:underline decoration-primary decoration-1 underline-offset-4"
              >
                LinkedIn
              </a>
            </div>
          </div>
        </div>

        <div className="max-w-6xl mx-auto mt-12 pt-8 border-t border-neutral-800 flex flex-col sm:flex-row justify-between items-center gap-4 relative z-10">
          <div className="text-[10px] text-neutral-600">
            Made in Canada
          </div>
          <div className="text-[10px] text-neutral-600">
            &copy; 2026 Slice Inc.
          </div>
        </div>
      </footer>

      {/* Modals & Floating Elements */}
      <TermsModal isOpen={isTermsOpen} onClose={() => setIsTermsOpen(false)} />
      <CreatorApplyModal isOpen={isCreatorApplyOpen} onClose={() => setIsCreatorApplyOpen(false)} />
      <BrandBookModal isOpen={isBrandBookOpen} onClose={() => setIsBrandBookOpen(false)} initialPackage={initialBookPackage} />
    </div>
  );
}

export default App;