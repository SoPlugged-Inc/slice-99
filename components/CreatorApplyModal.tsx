import React, { useState } from 'react';
import { X, Check } from 'lucide-react';

interface CreatorApplyModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export const CreatorApplyModal: React.FC<CreatorApplyModalProps> = ({ isOpen, onClose }) => {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [error, setError] = useState<string | null>(null);

    if (!isOpen) return null;

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsSubmitting(true);
        setError(null);

        const form = e.currentTarget;
        const formData = new FormData(form);

        try {
            const response = await fetch('https://formspree.io/f/xqarpnzb', {
                method: 'POST',
                body: formData,
                headers: {
                    'Accept': 'application/json'
                }
            });

            if (response.ok) {
                setIsSuccess(true);
                form.reset();
            } else {
                setError('Oops! There was a problem submitting your form');
            }
        } catch (err) {
            setError('Oops! There was a problem submitting your form');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="fixed inset-0 z-[100] font-sans" aria-labelledby="modal-title" role="dialog" aria-modal="true">
            {/* Backdrop */}
            <div
                className="fixed inset-0 bg-neutral-darkest/90 backdrop-blur-sm transition-opacity"
                onClick={onClose}
            />

            <div className="fixed inset-0 z-10 overflow-y-auto">
                <div className="flex min-h-full items-center justify-center p-4 text-center sm:p-0">
                    {/* Modal Panel */}
                    <div className="relative transform overflow-hidden rounded-lg bg-neutral-darkest border border-neutral-800 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-2xl">
                        <div className="bg-neutral-darkest px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                            <div className="flex justify-between items-center mb-6 border-b border-neutral-800 pb-4 relative z-[101]">
                                <h3 className="text-xl font-bold text-white uppercase tracking-tight" id="modal-title">
                                    Apply to Roster
                                </h3>
                                <button
                                    onClick={onClose}
                                    className="text-neutral-500 hover:text-white transition-colors"
                                >
                                    <X size={24} />
                                </button>
                            </div>

                            {isSuccess ? (
                                <div className="text-center py-12">
                                    <div className="mb-6 flex justify-center">
                                        <div className="w-16 h-16 bg-neutral-900 rounded-full flex items-center justify-center border border-neutral-800">
                                            <Check className="w-8 h-8 text-brand-green" />
                                        </div>
                                    </div>
                                    <h3 className="text-xl font-bold text-white mb-2 tracking-tight">Application Received</h3>
                                    <p className="text-neutral-400 mb-6 text-sm">We review applications every Friday. We'll be in touch if it's a fit.</p>
                                    <button
                                        onClick={onClose}
                                        className="bg-white text-black px-6 py-2 text-sm font-bold uppercase tracking-wide hover:bg-neutral-200 transition-all rounded-sm"
                                    >
                                        Close
                                    </button>
                                </div>
                            ) : (
                                <form onSubmit={handleSubmit} className="space-y-8">
                                    {error && (
                                        <div className="bg-red-500/10 border border-red-500/20 text-red-500 p-3 rounded-md text-sm text-center">
                                            {error}
                                        </div>
                                    )}

                                    {/* Section 1: The Vitals */}
                                    <div className="space-y-4">
                                        <h4 className="text-sm font-bold text-creator uppercase tracking-wider">01 // The Vitals</h4>
                                        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                                            <div>
                                                <label htmlFor="name" className="block text-xs font-medium text-neutral-400 mb-1">Full Name</label>
                                                <input type="text" name="name" id="name" required placeholder="Jane Doe"
                                                    className="w-full bg-neutral-900 border border-neutral-800 rounded-sm px-3 py-2 text-white focus:outline-none focus:border-creator transition-colors placeholder-neutral-600" />
                                            </div>
                                            <div>
                                                <label htmlFor="email" className="block text-xs font-medium text-neutral-400 mb-1">Email Address</label>
                                                <input type="email" name="email" id="email" required placeholder="jane@example.com"
                                                    className="w-full bg-neutral-900 border border-neutral-800 rounded-sm px-3 py-2 text-white focus:outline-none focus:border-creator transition-colors placeholder-neutral-600" />
                                            </div>
                                        </div>
                                        <div>
                                            <label htmlFor="social" className="block text-xs font-medium text-neutral-400 mb-1">Primary Social Handle (Full Link)</label>
                                            <input type="text" name="social" id="social" placeholder="tiktok.com/@yourname" required
                                                className="w-full bg-neutral-900 border border-neutral-800 rounded-sm px-3 py-2 text-white focus:outline-none focus:border-creator transition-colors placeholder-neutral-600" />
                                        </div>
                                        <div>
                                            <label htmlFor="location" className="block text-xs font-medium text-neutral-400 mb-1">Location (City & Province)</label>
                                            <input type="text" name="location" id="location" required placeholder="Toronto, ON"
                                                className="w-full bg-neutral-900 border border-neutral-800 rounded-sm px-3 py-2 text-white focus:outline-none focus:border-creator transition-colors placeholder-neutral-600" />
                                        </div>
                                    </div>

                                    {/* Section 2: The Vibe */}
                                    <div className="space-y-4">
                                        <h4 className="text-sm font-bold text-creator uppercase tracking-wider">02 // The Vibe</h4>
                                        <p className="text-xs text-neutral-500">Which Haul Categories fit your content style? (Select all that apply)</p>
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                            {['The Aesthetic Home', 'The Wellness Routine', 'The Fit Check', 'The Desk Setup', 'The Pantry'].map((cat) => (
                                                <label key={cat} className="flex items-center space-x-3 p-3 border border-neutral-800 rounded-sm hover:bg-neutral-900 cursor-pointer transition-colors">
                                                    <input type="checkbox" name="categories" value={cat}
                                                        className="form-checkbox h-4 w-4 text-creator bg-neutral-900 border-neutral-700 rounded-sm focus:ring-creator focus:ring-offset-neutral-900" />
                                                    <span className="text-sm text-neutral-300">{cat}</span>
                                                </label>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Section 3: The Capability */}
                                    <div className="space-y-4">
                                        <h4 className="text-sm font-bold text-creator uppercase tracking-wider">03 // The Capability</h4>
                                        <div>
                                            <label htmlFor="video_link" className="block text-xs font-medium text-neutral-400 mb-1">Link to your best 'Haul' or 'Showcase' video</label>
                                            <input type="text" name="video_link" id="video_link" placeholder="tiktok.com/video/..." required
                                                className="w-full bg-neutral-900 border border-neutral-800 rounded-sm px-3 py-2 text-white focus:outline-none focus:border-creator transition-colors placeholder-neutral-600" />
                                            <p className="text-[10px] text-neutral-600 mt-1">Show us a video where you talk about a product. We want to see your lighting and hear your voice.</p>
                                        </div>
                                    </div>

                                    {/* Section 4: The Deal Breakers */}
                                    <div className="space-y-4">
                                        <h4 className="text-sm font-bold text-creator uppercase tracking-wider">04 // The Deal Breakers</h4>

                                        <div className="space-y-2">
                                            <p className="text-sm text-neutral-300 font-medium">The Slice Model pays a flat rate of $200 CAD + 4 Free Products per drop. Do you accept this rate?</p>
                                            <div className="flex gap-4">
                                                <label className="flex items-center space-x-2 cursor-pointer">
                                                    <input type="radio" name="rate_acceptance" value="Yes" required
                                                        className="form-radio h-4 w-4 text-creator bg-neutral-900 border-neutral-700 focus:ring-creator" />
                                                    <span className="text-sm text-neutral-400">Yes, I'm in.</span>
                                                </label>
                                                <label className="flex items-center space-x-2 cursor-pointer">
                                                    <input type="radio" name="rate_acceptance" value="No" required
                                                        className="form-radio h-4 w-4 text-creator bg-neutral-900 border-neutral-700 focus:ring-creator" />
                                                    <span className="text-sm text-neutral-400">No, my rates are higher.</span>
                                                </label>
                                            </div>
                                        </div>

                                        <div className="space-y-2 pt-2">
                                            <p className="text-sm text-neutral-300 font-medium">Brands get usage rights to run the video as ads. Are you cool with that?</p>
                                            <div className="flex gap-4">
                                                <label className="flex items-center space-x-2 cursor-pointer">
                                                    <input type="radio" name="usage_rights" value="Yes" required
                                                        className="form-radio h-4 w-4 text-creator bg-neutral-900 border-neutral-700 focus:ring-creator" />
                                                    <span className="text-sm text-neutral-400">Yes.</span>
                                                </label>
                                                <label className="flex items-center space-x-2 cursor-pointer">
                                                    <input type="radio" name="usage_rights" value="No" required
                                                        className="form-radio h-4 w-4 text-creator bg-neutral-900 border-neutral-700 focus:ring-creator" />
                                                    <span className="text-sm text-neutral-400">No.</span>
                                                </label>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Secret Weapon */}
                                    <div className="space-y-4 pt-2 border-t border-neutral-800">
                                        <div>
                                            <label htmlFor="dream_brand" className="block text-xs font-medium text-neutral-400 mb-1">One brand you really want to work with right now?</label>
                                            <input type="text" name="dream_brand" id="dream_brand" placeholder="e.g. Nike, Glossier, etc."
                                                className="w-full bg-neutral-900 border border-neutral-800 rounded-sm px-3 py-2 text-white focus:outline-none focus:border-creator transition-colors placeholder-neutral-600" />
                                        </div>
                                    </div>

                                    <div className="pt-4">
                                        <button
                                            type="submit"
                                            disabled={isSubmitting}
                                            className="w-full bg-creator text-white font-bold uppercase tracking-wide py-3 rounded-sm hover:bg-creator-hover transition-colors shadow-lg shadow-creator/20 disabled:opacity-50 disabled:cursor-not-allowed"
                                        >
                                            {isSubmitting ? 'Submitting...' : 'Submit Application'}
                                        </button>
                                    </div>
                                </form>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
