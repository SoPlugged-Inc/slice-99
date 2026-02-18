
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css'; // Import global styles (Tailwind)
import { CreatorStorefront } from './components/CreatorStorefront';
import { MOCK_CREATOR } from './data/creatorData';

// In a real app, we would fetch the creator data based on the URL ID or subdomain
// e.g., const creatorId = window.location.pathname.split('/')[2];
// const data = await fetchCreatorData(creatorId);

const rootElement = document.getElementById('root');
if (!rootElement) {
    throw new Error("Could not find root element to mount to");
}

const root = ReactDOM.createRoot(rootElement);
root.render(
    <React.StrictMode>
        <CreatorStorefront data={MOCK_CREATOR} />
    </React.StrictMode>
);
