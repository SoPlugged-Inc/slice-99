import React, { useState, useEffect } from 'react';
import { X, ArrowRight, Check } from 'lucide-react';

interface BrandBookModalProps {
    isOpen: boolean;
    onClose: () => void;
    initialPackage?: 'pilot' | 'growth' | 'enterprise';
}

export const BrandBookModal: React.FC<BrandBookModalProps> = ({ isOpen, onClose, initialPackage = 'pilot' }) => {
    const [step, setStep] = useState<1 | 2 | 3>(1);
    const [selectedPackage, setSelectedPackage] = useState<'pilot' | 'growth' | 'enterprise'>(initialPackage);
    const [isSubmitting, setIsSubmitting] = useState(false);
    
    // Onboarding Form States
    const [productName, setProductName] = useState('');
    const [productUrl, setProductUrl] = useState('');
    const [acquisitionGoal, setAcquisitionGoal] = useState('Lowering video ad CAC on paid socials');
    const [customGoal, setCustomGoal] = useState('');
    const [routineNiche, setRoutineNiche] = useState('WFH Freelance & Productivity Vlog');
    const [adjacentTools, setAdjacentTools] = useState('');

    // Sync initial package when opened
    useEffect(() => {
        if (isOpen) {
            setSelectedPackage(initialPackage);
            setStep(1);
        }
    }, [isOpen, initialPackage]);

    if (!isOpen) return null;

    // Package details mapping
    const packageInfo = {
        pilot: {
            name: 'Pilot Run (Single Slice)',
            price: '$99',
            stripeLink: 'https://book.stripe.com/aFafZadjE3050Wh4Bq5Vu00',
            desc: '1 UGC routine video matched next to complementary workflow tools. Low-risk test.'
        },
        growth: {
            name: 'Growth Bundle (Multi-Stack Pack)',
            price: '$279',
            stripeLink: 'https://book.stripe.com/aFafZadjE3050Wh4Bq5Vu00',
            desc: '3 routine videos with 3 distinct creators. Perfect for testing narrative angles.'
        },
        enterprise: {
            name: 'Enterprise Bundle (Scale Pack)',
            price: '$799',
            stripeLink: 'https://book.stripe.com/aFafZadjE3050Wh4Bq5Vu00',
            desc: '10 unique routine videos with ongoing creative pipeline support and a dedicated Slack channel.'
        }
    };

    const handleNext = () => {
        if (step < 3) setStep((prev) => (prev + 1) as any);
    };

    const handleBack = () => {
        if (step > 1) setStep((prev) => (prev - 1) as any);
    };

    const handleSubmitAndCheckout = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        const finalGoal = acquisitionGoal.startsWith('Other') ? customGoal : acquisitionGoal;
        const payload = {
            productName,
            productUrl,
            acquisitionGoal: finalGoal,
            routineNiche,
            adjacentTools: adjacentTools || 'Not specified (open-ended)',
            selectedPackage: packageInfo[selectedPackage].name,
            totalPrice: packageInfo[selectedPackage].price
        };

        try {
            // Push matching details to our webhook server to register the product before redirecting
            await fetch('https://formspree.io/f/xnjlezlq', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });
        } catch (err) {
            console.error('Onboarding registry fallback log:', err);
        } finally {
            setIsSubmitting(false);
            // Redirect to target Stripe checkout link
            window.open(packageInfo[selectedPackage].stripeLink, '_blank');
            onClose();
        }
    };

    return (
        <div className="fixed inset-0 z-[100] font-sans text-neutral-darkest animate-fade-in" aria-labelledby="modal-title" role="dialog" aria-modal="true">
            {/* Backdrop */}
            <div
                className="fixed inset-0 bg-neutral-darkest/40 backdrop-blur-sm transition-opacity"
                onClick={onClose}
            />

            <div className="fixed inset-0 z-10 overflow-y-auto">
                <div className="flex min-h-full items-center justify-center p-4 text-center sm:p-0">
                    
                    {/* Modal Panel */}
                    <div className="relative transform overflow-hidden rounded-2xl bg-[#FDFBF7] border border-[#E8E4DB] text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-2xl">
                        
                        {/* Header */}
                        <div className="bg-[#FDFBF7] px-6 pt-6 pb-4 border-b border-[#E8E4DB]/40 flex justify-between items-center">
                            <div>
                                <h3 className="text-lg font-serif text-neutral-darkest" id="modal-title">
                                    Launch a UGC Experiment
                                </h3>
                                <p className="text-[10px] font-mono text-neutral-light uppercase tracking-wider mt-0.5">
                                    Set up your product profile and target workflow
                                </p>
                            </div>
                            <button
                                onClick={onClose}
                                className="w-8 h-8 rounded-full border border-[#E8E4DB]/50 flex items-center justify-center text-neutral-dark hover:text-neutral-darkest hover:border-[#E8E4DB] transition-all focus:outline-none"
                            >
                                <X size={16} />
                            </button>
                        </div>

                        {/* Progress Stepper */}
                        <div className="px-6 py-4 bg-[#FAF6EE]/50 border-b border-[#E8E4DB]/20 grid grid-cols-3 text-center text-[10px] font-mono font-bold tracking-wider text-neutral-light">
                            <div className={`pb-2 border-b-2 transition-colors ${step >= 1 ? 'border-primary text-neutral-darkest' : 'border-transparent'}`}>
                                01 / GOALS & PROFILE
                            </div>
                            <div className={`pb-2 border-b-2 transition-colors ${step >= 2 ? 'border-primary text-neutral-darkest' : 'border-transparent'}`}>
                                02 / ROUTINE MATCHING
                            </div>
                            <div className={`pb-2 border-b-2 transition-colors ${step >= 3 ? 'border-primary text-neutral-darkest' : 'border-transparent'}`}>
                                03 / EXPERIMENT SUMMARY
                            </div>
                        </div>

                        {/* Modal Body / Steps */}
                        <div className="px-6 py-6 max-h-[60vh] overflow-y-auto">
                            
                            {/* STEP 1: Product Registration & Goals */}
                            {step === 1 && (
                                <div className="space-y-5">
                                    <div className="border-b border-[#E8E4DB]/30 pb-3">
                                        <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-primary">01 // Profile & Growth Goal</h4>
                                        <p className="text-xs text-neutral-dark font-light mt-1">Describe your tool and what you want to achieve with this experiment.</p>
                                    </div>

                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                        <div>
                                            <label htmlFor="prod_name" className="block text-[10px] font-mono font-bold uppercase tracking-wider text-neutral-dark mb-1.5">Product Name</label>
                                            <input 
                                                type="text" 
                                                id="prod_name" 
                                                required 
                                                value={productName}
                                                onChange={(e) => setProductName(e.target.value)}
                                                placeholder="e.g. Whisprflow"
                                                className="w-full bg-white border border-[#E8E4DB] rounded px-3.5 py-2.5 text-xs text-neutral-darkest focus:outline-none focus:border-primary transition-colors placeholder-[#B8B2A5]" 
                                            />
                                        </div>
                                        <div>
                                            <label htmlFor="prod_url" className="block text-[10px] font-mono font-bold uppercase tracking-wider text-neutral-dark mb-1.5">Product URL</label>
                                            <input 
                                                type="url" 
                                                id="prod_url" 
                                                required 
                                                value={productUrl}
                                                onChange={(e) => setProductUrl(e.target.value)}
                                                placeholder="e.g. https://whisprflow.com"
                                                className="w-full bg-white border border-[#E8E4DB] rounded px-3.5 py-2.5 text-xs text-neutral-darkest focus:outline-none focus:border-primary transition-colors placeholder-[#B8B2A5]" 
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        <label htmlFor="acq_goal" className="block text-[10px] font-mono font-bold uppercase tracking-wider text-neutral-dark mb-1.5">What is your primary acquisition bottleneck right now?</label>
                                        <select
                                            id="acq_goal"
                                            value={acquisitionGoal}
                                            onChange={(e) => setAcquisitionGoal(e.target.value)}
                                            className="w-full bg-white border border-[#E8E4DB] rounded px-3.5 py-2.5 text-xs text-neutral-darkest focus:outline-none focus:border-primary transition-colors"
                                        >
                                            <option value="Lowering video ad CAC on paid socials">Lowering video ad CAC on paid socials</option>
                                            <option value="Testing routine-based UGC loops as a new channel">Testing routine-based UGC loops as a new channel</option>
                                            <option value="Acquiring early developer / solopreneur users">Acquiring early developer / solopreneur users</option>
                                            <option value="Generating multiple ad hooks to beat creative fatigue">Generating multiple ad hooks to beat creative fatigue</option>
                                            <option value="Other / Just experimenting with new growth loops">Other (Specify growth goal below)</option>
                                        </select>
                                    </div>

                                    {acquisitionGoal.startsWith('Other') && (
                                        <div className="animate-fade-in">
                                            <label htmlFor="custom_goal" className="block text-[10px] font-mono font-bold uppercase tracking-wider text-neutral-light mb-1.5">Explain your specific growth bottleneck</label>
                                            <input 
                                                type="text" 
                                                id="custom_goal"
                                                value={customGoal}
                                                onChange={(e) => setCustomGoal(e.target.value)}
                                                placeholder="e.g. Testing creative hooks to lift trial-to-paid conversion..."
                                                className="w-full bg-white border border-[#E8E4DB] rounded px-3.5 py-2.5 text-xs text-neutral-darkest focus:outline-none focus:border-primary transition-colors placeholder-[#B8B2A5]" 
                                            />
                                        </div>
                                    )}
                                </div>
                            )}

                            {/* STEP 2: Cohort & Routine Preferences */}
                            {step === 2 && (
                                <div className="space-y-5">
                                    <div className="border-b border-[#E8E4DB]/30 pb-3">
                                        <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-primary">02 // Creator Setup & Vibe</h4>
                                        <p className="text-xs text-neutral-dark font-light mt-1">Choose your target routine context or let the creator design a custom workflow narrative.</p>
                                    </div>

                                    <div>
                                        <label htmlFor="routine_vibe" className="block text-[10px] font-mono font-bold uppercase tracking-wider text-neutral-dark mb-1.5">Target Routine Vibe</label>
                                        <select
                                            id="routine_vibe"
                                            value={routineNiche}
                                            onChange={(e) => setRoutineNiche(e.target.value)}
                                            className="w-full bg-white border border-[#E8E4DB] rounded px-3.5 py-2.5 text-xs text-neutral-darkest focus:outline-none focus:border-primary transition-colors"
                                        >
                                            <option value="WFH Freelance & Productivity Vlog">WFH Freelance & Productivity Vlog (Aesthetic lifestyle)</option>
                                            <option value="Solo Founder Workspace & Agency Desk">Solo Founder Workspace & Agency Desk (High agency output)</option>
                                            <option value="Technical Developer / Engineer Setup">Technical Developer / Engineer Setup (Clean terminal workflow)</option>
                                            <option value="Creative Designer & Design Studio Flow">Creative Designer & Design Studio Flow (Highly visual design setup)</option>
                                            <option value="Open-ended / Let the creator pitch a custom workspace narrative">Open-ended / Let matched creators pitch a custom workspace narrative</option>
                                        </select>
                                    </div>

                                    <div>
                                        <label htmlFor="adjacent_tools" className="block text-[10px] font-mono font-bold uppercase tracking-wider text-neutral-dark mb-1.5">
                                            What adjacent tools do your users typically run alongside yours?
                                        </label>
                                        <input
                                            type="text"
                                            id="adjacent_tools"
                                            value={adjacentTools}
                                            onChange={(e) => setAdjacentTools(e.target.value)}
                                            placeholder="e.g. Figma, Loom, Trello, Discord, Spotify..."
                                            className="w-full bg-white border border-[#E8E4DB] rounded px-3.5 py-2.5 text-xs text-neutral-darkest focus:outline-none focus:border-primary transition-colors placeholder-[#B8B2A5]"
                                        />
                                    </div>
                                </div>
                            )}

                            {/* STEP 3: Summary & Pricing checkout */}
                            {step === 3 && (
                                <form onSubmit={handleSubmitAndCheckout} className="space-y-6">
                                    <div className="border-b border-[#E8E4DB]/30 pb-3">
                                        <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-primary">03 // Review Profile</h4>
                                        <p className="text-xs text-neutral-dark font-light mt-1">Double-check your setup details. Proceeding redirects to secure Stripe checkout.</p>
                                    </div>

                                    {/* Onboarding Summary Ledger */}
                                    <div className="bg-[#FAF6EE]/50 border border-[#E8E4DB]/60 rounded-xl p-5 space-y-4">
                                        <div className="grid grid-cols-2 gap-4 text-xs py-1 border-b border-[#E8E4DB]/20">
                                            <div>
                                                <span className="text-[9px] font-mono text-neutral-light uppercase block">B2C Product</span>
                                                <span className="font-bold text-neutral-darkest mt-0.5 block">{productName || 'Not specified'}</span>
                                            </div>
                                            <div>
                                                <span className="text-[9px] font-mono text-neutral-light uppercase block">Website</span>
                                                <span className="font-bold text-neutral-darkest mt-0.5 block truncate">{productUrl || 'Not specified'}</span>
                                            </div>
                                        </div>

                                        <div className="text-xs py-1 border-b border-[#E8E4DB]/20">
                                            <span className="text-[9px] font-mono text-neutral-light uppercase block">Primary Goal</span>
                                            <span className="font-bold text-neutral-darkest mt-0.5 block truncate">
                                                {acquisitionGoal.startsWith('Other') ? customGoal : acquisitionGoal}
                                            </span>
                                        </div>

                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs py-1 border-b border-[#E8E4DB]/20">
                                            <div>
                                                <span className="text-[9px] font-mono text-neutral-light uppercase block">Creator Vibe</span>
                                                <span className="font-bold text-neutral-darkest mt-0.5 block truncate">{routineNiche.split(' (')[0]}</span>
                                            </div>
                                            <div>
                                                <span className="text-[9px] font-mono text-neutral-light uppercase block">Adjacent Tools</span>
                                                <span className="font-bold text-neutral-darkest mt-0.5 block truncate">{adjacentTools || 'Open-ended matches'}</span>
                                            </div>
                                        </div>

                                        {/* Package Switch Grid */}
                                        <div className="pt-2">
                                            <span className="block text-[9px] font-mono text-neutral-light uppercase mb-2">Selected Growth Experiment Tier</span>
                                            <div className="grid grid-cols-3 gap-2">
                                                {(['pilot', 'growth', 'enterprise'] as const).map((pkg) => (
                                                    <button
                                                        key={pkg}
                                                        type="button"
                                                        onClick={() => setSelectedPackage(pkg)}
                                                        className={`p-3 border rounded text-center transition-all flex flex-col items-center justify-center ${selectedPackage === pkg ? 'border-primary bg-white ring-1 ring-primary' : 'border-[#E8E4DB] bg-white hover:border-neutral-dark'}`}
                                                    >
                                                        <span className="text-[9px] font-mono font-bold uppercase tracking-wider text-neutral-darkest">{pkg}</span>
                                                        <span className="text-xs font-bold font-mono text-primary mt-0.5">{packageInfo[pkg].price}</span>
                                                    </button>
                                                ))}
                                            </div>
                                        </div>
                                    </div>

                                    {/* Selected Package details */}
                                    <div className="p-4 bg-white border border-[#E8E4DB]/60 rounded-xl flex items-center justify-between text-xs shadow-sm">
                                        <div>
                                            <div className="font-bold text-neutral-darkest">{packageInfo[selectedPackage].name}</div>
                                            <div className="text-[10px] text-neutral-dark font-light leading-relaxed mt-0.5 max-w-[320px]">
                                                {packageInfo[selectedPackage].desc}
                                            </div>
                                        </div>
                                        <div className="text-right">
                                            <div className="text-2xl font-bold font-mono text-neutral-darkest">{packageInfo[selectedPackage].price}</div>
                                            <span className="text-[9px] font-mono text-neutral-light uppercase">split total</span>
                                        </div>
                                    </div>

                                    <div className="pt-2">
                                        <button
                                            type="submit"
                                            disabled={isSubmitting || !productName || !productUrl}
                                            className="w-full bg-neutral-darkest text-white font-mono text-xs font-bold uppercase tracking-wider py-4 rounded hover:bg-neutral-dark transition-colors flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                                        >
                                            {isSubmitting ? 'Registering...' : 'Register Product & Launch Experiment'}
                                            <ArrowRight size={14} />
                                        </button>
                                        <p className="text-center text-[9px] text-neutral-light font-mono leading-relaxed mt-2.5">
                                            Proceeding will redirect you to secure Stripe checkout.
                                        </p>
                                    </div>
                                </form>
                            )}
                        </div>

                        {/* Navigation Footer */}
                        {step < 3 && (
                            <div className="bg-[#FAF6EE]/50 px-6 py-4 border-t border-[#E8E4DB]/40 flex justify-between items-center">
                                <button
                                    type="button"
                                    onClick={handleBack}
                                    disabled={step === 1}
                                    className="px-4 py-2 border border-[#E8E4DB] text-neutral-dark text-xs font-mono uppercase tracking-wider rounded bg-white hover:bg-[#FDFBF7] transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                                >
                                    Back
                                </button>
                                <button
                                    type="button"
                                    onClick={handleNext}
                                    disabled={step === 1 ? (!productName || !productUrl) : false}
                                    className="px-6 py-2 bg-neutral-darkest text-white text-xs font-mono font-bold uppercase tracking-wider rounded hover:bg-neutral-dark transition-colors flex items-center gap-1.5 disabled:opacity-40 disabled:cursor-not-allowed"
                                >
                                    Next <ArrowRight size={12} />
                                </button>
                            </div>
                        )}

                    </div>
                </div>
            </div>
        </div>
    );
};
