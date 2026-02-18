
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css'; // Import global styles (Tailwind)
import { CreatorStorefront } from './components/CreatorStorefront';
import { CreatorProfile, MOCK_CREATOR } from './data/creatorData';

const rootElement = document.getElementById('root');
if (!rootElement) {
    throw new Error("Could not find root element to mount to");
}

const root = ReactDOM.createRoot(rootElement);

// Loader Component
const Loading = () => (
    <div className="flex h-screen w-full items-center justify-center bg-stone-50 text-zinc-400">
        <div className="animate-pulse flex flex-col items-center gap-2">
            <div className="w-8 h-8 rounded-full border-2 border-zinc-300 border-t-zinc-600 animate-spin"></div>
            <span className="text-xs font-mono uppercase tracking-widest">Loading Storefront...</span>
        </div>
    </div>
);

// Error Component
const ErrorState = ({ message }: { message: string }) => (
    <div className="flex h-screen w-full items-center justify-center bg-stone-50 text-zinc-500 p-4 text-center">
        <div>
            <h1 className="text-xl font-bold mb-2">Oops!</h1>
            <p className="max-w-xs mx-auto">{message}</p>
            <a href="/" className="mt-4 inline-block text-sm font-bold text-orange-600 hover:underline">Return Home</a>
        </div>
    </div>
);

const App = () => {
    const [data, setData] = React.useState<CreatorProfile | null>(null);
    const [loading, setLoading] = React.useState(true);
    const [error, setError] = React.useState<string | null>(null);

    React.useEffect(() => {
        const fetchCreator = async () => {
            try {
                // 1. Get Slug from URL
                // Support both /ada/ and /ada (no trailing slash)
                // Also support query params for testing: ?creator=ada
                const pathParts = window.location.pathname.split('/').filter(Boolean);
                const querySlug = new URLSearchParams(window.location.search).get('creator');

                // If we are at root or /creators/storefront.html, use query param or default (or fail)
                // If we are at /ada/, the slug is the first part dealing with base hrefs
                // Since this runs on client side, let's assume the folder structure: domain.com/SLUG/index.html
                // So the slug is often the last directory.

                // However, for local dev (localhost:3000/creators/storefront.html), the logic is different.
                // Let's implement a robust finder:
                // If query param 'creator' exists, use it.
                // Else take the part after the last slash of the directory, or the first part of the path.

                let slug = querySlug;

                if (!slug) {
                    if (pathParts.length > 0) {
                        // Strategy: The slug is likely the last folder name before index.html (if present) or just the last folder.
                        // For /ada/ -> parts=['ada'] -> slug='ada'
                        // For /ada/index.html -> parts=['ada', 'index.html'] -> filtered above? 'index.html' is a part.
                        const cleanParts = pathParts.filter(p => !p.endsWith('.html'));
                        if (cleanParts.length > 0) {
                            slug = cleanParts[cleanParts.length - 1];
                        }
                    }
                }

                // Fallback for development/testing if no slug found
                if (!slug && import.meta.env.DEV) {
                    console.log("No slug found, using 'ada' for dev testing");
                    slug = 'ada';
                }

                if (!slug) {
                    throw new Error("Creator not found (No slug detected)");
                }

                console.log(`Fetching data for creator: ${slug}`);

                // 2. Fetch JSON from Root
                const response = await fetch('/creators.json');
                if (!response.ok) {
                    throw new Error(`Failed to load creator data (Status: ${response.status})`);
                }

                const creators: CreatorProfile[] = await response.json();

                // 3. Find Creator by Slug (Case insensitive)
                const creator = creators.find(
                    c => c.id.toLowerCase() === slug?.toLowerCase() ||
                        c.handle.toLowerCase().includes(slug?.toLowerCase() || '')
                );

                if (!creator) {
                    throw new Error(`Creator "${slug}" not found in our directory.`);
                }

                setData(creator);
            } catch (err: any) {
                console.error(err);
                setError(err.message || 'An unknown error occurred');
                // Optional: Fallback to mock data in dev if fetch fails? 
                // setData(MOCK_CREATOR); 
            } finally {
                setLoading(false);
            }
        };

        fetchCreator();
    }, []);

    if (loading) return <Loading />;
    if (error) return <ErrorState message={error} />;
    if (!data) return <ErrorState message="No data available" />;

    return <CreatorStorefront data={data} />;
};

root.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>
);
