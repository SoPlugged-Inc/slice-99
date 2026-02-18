
import React, { useState, useEffect } from 'react';
import { Share2, ArrowRight, Package, Instagram, ExternalLink, Link as LinkIcon, AlertCircle } from 'lucide-react';
import { CreatorProfile, Product } from '../data/creatorData';

interface CreatorStorefrontProps {
    data: CreatorProfile;
}

// Optimized Link Preview Image Component
const ProductImage: React.FC<{
    src?: string;
    productUrl?: string;
    alt: string;
    className?: string;
    loadEager?: boolean;
}> = ({ src, productUrl, alt, className, loadEager }) => {
    const [imgSrc, setImgSrc] = useState<string>('');
    const [error, setError] = useState(false);

    useEffect(() => {
        // Priority 1: Use direct image source if provided
        if (src) {
            setImgSrc(src);
            return;
        }

        // Priority 2: Use Link Preview API (Microlink) to scrape og:image
        if (productUrl) {
            // We use &embed=image.urlKey to get the direct image URL from the metadata
            // The 'image.url' path in the JSON response corresponds to the high-quality og:image
            const microlinkUrl = `https://api.microlink.io/?url=${encodeURIComponent(productUrl)}&embed=image.url`;
            setImgSrc(microlinkUrl);
        } else {
            setError(true);
        }
    }, [src, productUrl]);

    if (error || !imgSrc) {
        return (
            <div className={`flex flex-col items-center justify-center bg-zinc-100 text-zinc-300 ${className}`}>
                {/* Slice Logo Placeholder */}
                <div className="font-black text-xs tracking-tighter uppercase select-none opacity-50">
                    SL<span className="text-orange-400">/</span>CE
                </div>
            </div>
        );
    }

    return (
        <img
            src={imgSrc}
            alt={alt}
            className={className}
            onError={() => setError(true)}
            loading={loadEager ? "eager" : "lazy"}
        />
    );
};


// Helper to get initials from name
const getInitials = (name: string) => {
    // Basic fallback if name is empty
    if (!name) return 'SC';
    return name
        .split(' ')
        .map(n => n[0])
        .join('')
        .substring(0, 2)
        .toUpperCase();
};

export const CreatorStorefront: React.FC<CreatorStorefrontProps> = ({ data }) => {
    const [isArchiveOpen, setIsArchiveOpen] = useState(false);
    const [activeProducts, setActiveProducts] = useState<Product[]>([]);
    const [archivedProducts, setArchivedProducts] = useState<Product[]>([]);
    const [copyFeedback, setCopyFeedback] = useState(false);

    // Profile State for Automation
    const [profileData, setProfileData] = useState<{
        name: string;
        avatar?: string;
        bio?: string;
    }>({
        name: data.name,
        avatar: data.avatar,
        bio: data.bio
    });

    useEffect(() => {
        // If we have an Instagram URL and missing avatar/bio, try to fetch meta
        // Or if we just want to enforce automation. The prompt implies "The Input: I will provide an instagram_url".
        // We trigger this if instagram URL is present.
        if (data.socials.instagram) {
            const fetchProfile = async () => {
                try {
                    const url = `https://api.microlink.io/?url=${encodeURIComponent(data.socials.instagram!)}`;
                    const res = await fetch(url);
                    const json = await res.json();

                    if (json.status === 'success') {
                        const { data: meta } = json;

                        // 1. Extract Name (Title)
                        let name = meta.title || data.name;
                        if (name.includes('(')) {
                            name = name.split('(')[0].trim();
                        }

                        // 2. Extract Bio
                        const bio = meta.description || data.bio;

                        // VALIDATION: Check for generic Instagram login/home metadata
                        const isGenericInstagram =
                            name === 'Instagram' ||
                            name.startsWith('Login') ||
                            bio?.includes('Welcome back to Instagram') ||
                            bio?.includes('Create an account');

                        if (isGenericInstagram) {
                            console.warn("Detected generic Instagram metadata, triggering fallback.");
                            return; // Exit to keep defaults (Initials + Generic Bio)
                        }

                        // 3. Extract Avatar
                        const avatar = meta.image?.url || data.avatar;

                        setProfileData(prev => ({
                            ...prev,
                            name: name || prev.name,
                            avatar: avatar || prev.avatar,
                            bio: bio || prev.bio
                        }));
                    }
                } catch (e) {
                    console.error("Failed to fetch profile metadata", e);
                    // Keep existing defaults (fallback happens in render if avatar is undefined)
                }
            };

            fetchProfile();
        }
    }, [data.socials.instagram]);

    useEffect(() => {
        setActiveProducts(data.products.filter(p => p.status === 'active'));
        setArchivedProducts(data.products.filter(p => p.status === 'archived'));
    }, [data]);

    const toggleArchive = () => setIsArchiveOpen(!isArchiveOpen);

    const handleShare = async () => {
        if (navigator.share) {
            try {
                await navigator.share({
                    title: `${data.name}'s Storefront | Slice99`,
                    text: `Check out ${data.name}'s latest viral finds!`,
                    url: window.location.href,
                });
            } catch (err) {
                console.error('Error sharing:', err);
            }
        } else {
            handleCopyLink();
        }
    };

    const handleCopyLink = () => {
        // Construct clean URL: slice99.com/[name]
        const cleanUrl = `https://slice99.com/${profileData.name.toLowerCase()}`;
        navigator.clipboard.writeText(cleanUrl).then(() => {
            setCopyFeedback(true);
            setTimeout(() => setCopyFeedback(false), 2000);
        });
    };

    const isDarkMode = data.theme === 'dark';
    const bgColor = isDarkMode ? 'bg-zinc-900' : 'bg-stone-50';
    const textColor = isDarkMode ? 'text-white' : 'text-zinc-900';
    const cardBg = isDarkMode ? 'bg-white/5 border-white/10' : 'bg-white/60 border-white/40 shadow-sm';

    return (
        <div className={`min-h-screen ${bgColor} ${textColor} font-sans selection:bg-orange-600 selection:text-white`}>

            {/* 1. Top Sticky Nav (Glassmorphism) */}
            <nav className="fixed top-0 left-0 right-0 z-50 px-4 h-16 flex items-center justify-between backdrop-blur-md bg-white/10 border-b border-white/10 supports-[backdrop-filter]:bg-white/5 transition-all">
                <div className="flex items-center gap-2">
                    {/* Slice99 Logo */}
                    <a href="https://slice99.com/" className={`text-xl font-black tracking-tighter uppercase select-none ${isDarkMode ? 'text-white' : 'text-zinc-900'}`}>
                        SL<span className="text-orange-600">/</span>CE
                    </a>
                </div>

                <div className="flex items-center gap-2">
                    {/* Copy Link Button */}
                    <button
                        onClick={handleCopyLink}
                        className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider transition-colors ${copyFeedback
                            ? 'bg-green-500 text-white'
                            : isDarkMode ? 'bg-white/10 hover:bg-white/20 text-white' : 'bg-black/5 hover:bg-black/10 text-zinc-900'
                            }`}
                    >
                        {copyFeedback ? (
                            <span>Copied!</span>
                        ) : (
                            <>
                                <LinkIcon className="w-3.5 h-3.5" />
                                <span className="hidden sm:inline">Copy Link</span>
                            </>
                        )}
                    </button>

                    {/* Existing Share Button */}
                    <button
                        onClick={handleShare}
                        className={`p-2 rounded-full ${isDarkMode ? 'hover:bg-white/10' : 'hover:bg-black/5'} transition-colors`}
                        aria-label="Share"
                    >
                        <Share2 className="w-5 h-5" />
                    </button>
                </div>
            </nav>

            <main className="max-w-[480px] mx-auto pt-20 px-4">

                {/* 2. Hero Profile */}
                <header className="flex flex-col items-center text-center mb-16 animate-fade-in-up">
                    <div className="relative mb-4">
                        <div className="w-24 h-24 rounded-full p-1 bg-gradient-to-tr from-orange-500 to-pink-500 flex items-center justify-center">
                            {profileData.avatar ? (
                                <img
                                    src={profileData.avatar}
                                    alt={profileData.name}
                                    className="w-full h-full rounded-full object-cover border-2 border-white"
                                    onError={(e) => {
                                        // Fallback on error to initials
                                        e.currentTarget.style.display = 'none';
                                        setProfileData(prev => ({ ...prev, avatar: undefined }));
                                    }}
                                />
                            ) : (
                                <div className="w-full h-full rounded-full bg-zinc-800 border-2 border-white flex items-center justify-center">
                                    <span className="text-2xl font-bold text-white tracking-widest">
                                        {getInitials(profileData.name)}
                                    </span>
                                </div>
                            )}
                        </div>
                        {/* Featured Creator Badge */}
                        <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 bg-black text-white text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider whitespace-nowrap border border-white/20 shadow-lg">
                            Featured Creator
                        </div>
                    </div>

                    <h1 className="text-2xl font-bold tracking-tight mb-1 flex items-center gap-1">
                        {profileData.name}
                        {/* Verified/Check icon could go here */}
                    </h1>
                    <a href={data.socials.tiktok} target="_blank" rel="noopener noreferrer" className="text-sm text-zinc-500 font-medium mb-3 hover:text-orange-600 transition-colors">
                        {data.handle}
                    </a>
                    <p className="text-sm text-zinc-600 max-w-xs leading-relaxed px-4">
                        Shop the products featured in my latest video. I’ve partnered with <a href="https://slice99.com/" target="_blank" rel="noopener noreferrer" className="font-bold text-zinc-800 hover:text-orange-600 transition-colors">Slice99</a> to make it easy for you to find and support these brands directly.
                    </p>

                    {/* Social Sticky */}
                    <div className="flex gap-4 mt-4">
                        {data.socials.instagram && (
                            <a href={data.socials.instagram} target="_blank" rel="noopener noreferrer" className="text-zinc-400 hover:text-orange-600 transition-colors">
                                <Instagram className="w-5 h-5" />
                            </a>
                        )}
                        {/* Add other socials if needed */}
                    </div>
                </header>

                {/* 3. The "Live Box" (Active Campaign) */}
                <section className="mb-10">

                    <div className={`grid gap-4 ${activeProducts.length === 1 ? 'grid-cols-1' : 'grid-cols-2'}`}>
                        {activeProducts.map((product, index) => (
                            <article
                                key={product.id}
                                className={`group relative overflow-hidden rounded-2xl ${cardBg} backdrop-blur-sm border transition-all hover:shadow-md hover:scale-[1.02] active:scale-[0.98] duration-300 ${activeProducts.length === 3 && index === 2 ? 'col-span-2 justify-self-center w-[calc(50%-0.5rem)]' : ''
                                    }`}
                            >
                                {/* Image */}
                                <div className="aspect-[4/5] bg-zinc-100 overflow-hidden relative">
                                    <ProductImage
                                        src={product.image}
                                        productUrl={product.productUrl}
                                        alt={product.productName}
                                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                        loadEager={true}
                                    />

                                    {/* Gradient Overlay for text readability */}
                                    <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/60 to-transparent"></div>

                                    {/* Price Tag - High Blur Glassmorphism */}
                                    {product.price && (
                                        <div className="absolute top-3 right-3 bg-white/30 backdrop-blur-xl border border-white/20 text-zinc-900 text-xs font-bold px-2 py-1 rounded-sm shadow-sm pointer-events-none">
                                            {product.price}
                                        </div>
                                    )}
                                </div>

                                {/* Content */}
                                <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                                    <div className="mb-3">
                                        <p className="text-[10px] font-bold uppercase tracking-wider opacity-80 mb-1">{product.brandName}</p>
                                        <h3 className="text-base font-bold leading-tight shadow-black drop-shadow-md">{product.productName}</h3>
                                    </div>

                                    {/* Action Button */}
                                    <a
                                        href={product.productUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex items-center justify-center w-full bg-orange-600 hover:bg-orange-700 hover:scale-105 active:scale-95 active:opacity-90 text-white font-bold text-sm py-3 px-4 rounded-xl transition-all duration-200 shadow-lg shadow-orange-900/20"
                                        style={{ minHeight: '48px' }} // Touch target size
                                    >
                                        Shop Now
                                    </a>
                                </div>
                            </article>
                        ))}
                    </div>
                </section>

                {/* 4. The "Archive" Drawer - Conditionally Rendered */}
                {archivedProducts.length > 0 && (
                    <section className="border-t border-zinc-200/50 pt-6">
                        <button
                            onClick={toggleArchive}
                            className="w-full flex items-center justify-between group py-2"
                        >
                            <div className="flex items-center gap-2">
                                <Package className="w-5 h-5 text-zinc-400" />
                                <h2 className="text-lg font-bold text-zinc-500 group-hover:text-zinc-800 transition-colors">Past Favorites</h2>
                            </div>
                            <ArrowRight className={`w-5 h-5 text-zinc-400 transition-transform duration-300 ${isArchiveOpen ? 'rotate-90' : ''}`} />
                        </button>

                        {/* Collapsible Content */}
                        <div
                            className={`grid transition-all duration-500 ease-in-out overflow-hidden ${isArchiveOpen ? 'grid-rows-[1fr] opacity-100 mt-6' : 'grid-rows-[0fr] opacity-0 mt-0'}`}
                        >
                            <div className="min-h-0">
                                <div className="grid grid-cols-3 gap-3">
                                    {archivedProducts.map((product) => (
                                        <a
                                            key={product.id}
                                            href={product.productUrl}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="block group relative aspect-square bg-zinc-100 rounded-lg overflow-hidden border border-zinc-200/50"
                                        >
                                            {/* Use Helper for Image Fallback */}
                                            <ProductImage
                                                src={product.image}
                                                productUrl={product.productUrl}
                                                alt={product.productName}
                                                className="w-full h-full object-cover transition-opacity hover:opacity-90"
                                            />

                                            <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity">
                                                <ExternalLink className="w-5 h-5 text-white" />
                                            </div>
                                        </a>
                                    ))}
                                </div>
                                <p className="text-center text-xs text-zinc-400 mt-6 flex items-center justify-center gap-2">
                                    Archive loaded from Slice99 Vault
                                </p>
                            </div>
                        </div>
                    </section>
                )}

            </main>

            {/* Footer - Updated */}
            <footer className="py-8 mt-6 flex flex-col items-center justify-center border-t border-zinc-100 bg-white/50 backdrop-blur-sm">
                <span className="text-[10px] font-mono tracking-widest uppercase text-gray-400">
                    Powered by <a href="https://slice99.com" className="hover:text-zinc-600 hover:underline hover:decoration-zinc-400 hover:underline-offset-2 transition-colors">Slice99</a>
                </span>
            </footer>

        </div>
    );
};
