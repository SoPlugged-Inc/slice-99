
import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { TermsModal } from './components/TermsModal';

import { BrandLanding } from './components/BrandLanding';
import { CreatorLanding } from './components/CreatorLanding';

// Placeholder for the actual Light Logo file provided by the user
// Replace this Data URI with your actual file path, e.g., "/logo-light.png"
const LOGO_LIGHT_URL = `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 140 40' fill='none'%3E%3Ctext x='0' y='55%25' dominant-baseline='middle' font-family='Libre Baskerville, serif' font-weight='700' font-size='28' letter-spacing='-1.5' fill='%23FFFFFF'%3Eco-create%3C/text%3E%3C/svg%3E`;

function App() {
  const [currentPage, setCurrentPage] = useState<'brand' | 'creator'>('brand');
  const [isTermsOpen, setIsTermsOpen] = useState(false);

  return (
    <div className="min-h-screen font-sans bg-neutral-white text-neutral-darkest bg-grid-pattern bg-fixed">
      <Navbar page={currentPage} onSwitch={setCurrentPage} />

      {currentPage === 'brand' ? <BrandLanding /> : <CreatorLanding />}

      {/* Footer - Shared */}
      <footer className="bg-neutral-darkest text-neutral-light py-12 sm:py-16 px-4 border-t border-neutral-darker relative overflow-hidden">
        {/* Grid Background in Footer */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none"></div>

        {/* Simple accent glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-primary rounded-full blur-[120px] pointer-events-none opacity-5"></div>

        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-center gap-8 relative z-10">
          <div className="flex flex-col items-start">
            {/* Logo Image */}
            <img
              src={LOGO_LIGHT_URL}
              alt="Co-Create"
              className="h-8 w-auto object-contain mb-1"
            />
            <span className="text-xs text-neutral-500 uppercase tracking-widest">Share the creator. Split the cost.</span>
          </div>

          <div className="grid grid-cols-2 sm:flex gap-8 sm:gap-12 text-sm text-neutral-400">
            <div className="flex flex-col gap-3">
              <span className="text-white font-bold uppercase tracking-widest text-[10px]">Social</span>
              <a
                href="https://www.instagram.com/joincocreate/"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-primary transition-colors hover:underline decoration-primary decoration-1 underline-offset-4"
              >
                Instagram
              </a>
            </div>
            <div className="flex flex-col gap-3">
              <span className="text-white font-bold uppercase tracking-widest text-[10px]">Contact</span>
              <a
                href="mailto:hello@joincocreate.ca"
                className="hover:text-primary transition-colors hover:underline decoration-primary decoration-1 underline-offset-4"
              >
                hello@joincocreate.ca
              </a>
            </div>
            <div className="flex flex-col gap-3">
              <span className="text-white font-bold uppercase tracking-widest text-[10px]">Legal</span>
              <button
                onClick={() => setIsTermsOpen(true)}
                className="text-left hover:text-primary transition-colors hover:underline decoration-primary decoration-1 underline-offset-4"
              >
                Terms of Service
              </button>
            </div>
          </div>
        </div>

        <div className="max-w-6xl mx-auto mt-12 pt-8 border-t border-neutral-800 flex flex-col sm:flex-row justify-between items-center gap-4 relative z-10">
          <div className="text-[10px] text-neutral-600">
            Made in Canada
          </div>
          <div className="text-[10px] text-neutral-600">
            &copy; 2025 Co-Create Inc.
          </div>
        </div>
      </footer>

      {/* Modals & Floating Elements */}
      <TermsModal isOpen={isTermsOpen} onClose={() => setIsTermsOpen(false)} />

    </div>
  );
}

export default App;
