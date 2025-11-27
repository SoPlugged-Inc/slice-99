import React, { useEffect, useRef } from 'react';
import { X } from 'lucide-react';

interface TermsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const TermsModal: React.FC<TermsModalProps> = ({ isOpen, onClose }) => {
  const modalRef = useRef<HTMLDivElement>(null);

  // Prevent body scroll when modal is open and manage focus
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      // Simple focus trap: Move focus to modal content when opened
      setTimeout(() => {
        modalRef.current?.focus();
      }, 50);
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  // Close on Escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      <div 
        className="absolute inset-0 bg-neutral-darkest/60 backdrop-blur-sm transition-opacity" 
        onClick={onClose}
        aria-hidden="true"
      />
      
      <div 
        ref={modalRef}
        tabIndex={-1}
        className="relative w-full max-w-2xl bg-white rounded-xl shadow-2xl flex flex-col max-h-[90vh] animate-[slideUpFade_0.3s_ease-out] focus:outline-none"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-neutral-lighter">
          <h2 id="modal-title" className="text-xl font-bold text-neutral-darkest tracking-tight">Terms of Service</h2>
          <button 
            onClick={onClose}
            aria-label="Close modal"
            className="p-2 text-neutral-dark hover:text-neutral-darkest hover:bg-neutral-lightest rounded-full transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
          >
            <X size={20} aria-hidden="true" />
          </button>
        </div>

        {/* Content */}
        <div className="overflow-y-auto p-6 space-y-6 text-sm text-neutral-dark leading-relaxed">
          <section>
            <h3 className="font-bold text-neutral-darkest mb-2 text-base">1. Introduction</h3>
            <p>
              By purchasing a slot with Co-Create ("we", "us"), you agree to the following terms. We provide a service that pools resources from multiple brands to commission user-generated content (UGC) from creators.
            </p>
          </section>

          <section>
            <h3 className="font-bold text-neutral-darkest mb-2 text-base">2. Services & Deliverables</h3>
            <p>
              We guarantee that the selected creator will produce and post one (1) video to their social media feed featuring your product alongside other brands. You will receive the raw video file for your own advertising use. While we guarantee the post will be made, we do not guarantee specific engagement numbers (views, likes, comments) or sales conversions.
            </p>
          </section>

          <section>
            <h3 className="font-bold text-neutral-darkest mb-2 text-base">3. Shipping & Products</h3>
            <ul className="list-disc pl-5 space-y-1">
              <li>You are responsible for shipping your product to our consolidation hub in Kitchener, ON, at your own expense.</li>
              <li>Products must be received by the deadline provided in your confirmation email. Late shipments may result in forfeiting your slot without refund.</li>
              <li>Products sent to creators are considered non-returnable gifts. We do not facilitate product returns.</li>
            </ul>
          </section>

          <section>
            <h3 className="font-bold text-neutral-darkest mb-2 text-base">4. Payments & Refunds</h3>
            <p>
              All payments are final. Because we commit funds to creators immediately upon filling a pool, we cannot offer refunds once a slot is purchased. If a scheduled creator becomes unavailable, we reserve the right to substitute with a creator of equal or greater engagement metrics.
            </p>
          </section>

          <section>
            <h3 className="font-bold text-neutral-darkest mb-2 text-base">5. Usage Rights</h3>
            <p>
              You are granted a non-exclusive, perpetual, worldwide license to use the produced video content for digital advertising and social media purposes. The creator retains moral rights and original copyright of the raw footage.
            </p>
          </section>

          <section>
            <h3 className="font-bold text-neutral-darkest mb-2 text-base">6. Liability</h3>
            <p>
              Co-Create is not liable for any lost, damaged, or stolen inventory during shipping. Our maximum liability for any claim related to our services is limited to the amount paid for the slot ($99 CAD).
            </p>
          </section>
          
          <div className="pt-6 text-xs text-neutral text-opacity-80 border-t border-neutral-lighter">
            Last Updated: November 2024
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 bg-neutral-lightest border-t border-neutral-lighter rounded-b-xl flex justify-end">
          <button 
            onClick={onClose}
            className="px-4 py-2 bg-neutral-darkest text-white text-sm font-medium rounded-md hover:bg-neutral-dark transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
          >
            I Understand
          </button>
        </div>
      </div>
    </div>
  );
};