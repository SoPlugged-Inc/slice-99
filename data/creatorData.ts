
export interface Product {
    id: string;
    brandName: string;
    productName: string;
    price: string;
    productUrl: string;
    image?: string;
    status: 'active' | 'archived';
    campaignId: string;
    description?: string;
}

export interface CreatorProfile {
    id: string;
    name: string;
    handle: string;
    avatar?: string;
    bio?: string;
    socials: {
        tiktok?: string;
        instagram?: string;
        youtube?: string;
    };
    products: Product[];
    theme: 'dark' | 'light';
}

export const MOCK_CREATOR: CreatorProfile = {
    id: "creator_001",
    name: "Ada",
    handle: "@adathexplora",
    avatar: "/ada_profile.png",
    bio: "Shop the products featured in my latest video. I’ve partnered with Slice99 to make it easy for you to find and support these brands directly.",
    socials: {
        tiktok: "https://tiktok.com/@adathexplora",
        instagram: "https://www.instagram.com/adathexplora",
    },
    theme: 'light',
    products: [
        {
            id: "prod_001",
            brandName: "Eyira",
            productName: "The Jollof Base (Standard)",
            price: "$26.00",
            productUrl: "https://www.eyira.shop/product/standard",
            status: 'active',
            campaignId: "camp_004",
            description: "The secret to perfect smoked Jollof rice."
        },
        {
            id: "prod_002",
            brandName: "Oil & Well",
            productName: "Body Oil Discovery Set",
            price: "$50.00",
            productUrl: "https://oilandwell.com/products/body-oil-discovery-set",
            status: 'active',
            campaignId: "camp_004",
            description: "Luxurious body oils for glowing skin."
        },
        {
            id: "prod_003",
            brandName: "Mills Kitchen",
            productName: "Authentic Naija Suya Spice",
            price: "$8.99",
            productUrl: "https://millskitchen.ca/products/authentic-naija-suya-spice",
            status: 'active',
            campaignId: "camp_004",
            description: "Authentic spicy kick."
        },
        // Archive items - Commented out to test conditional rendering
        /*
        {
            id: "prod_004_arch",
            brandName: "Aesop",
            productName: "Resurrection Hand Wash",
            price: "$43.00",
            productUrl: "https://www.aesop.com/us/p/body-hand/hand/resurrection-aromatique-hand-wash",
            image: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?q=80&w=600&auto=format&fit=crop",
            status: 'archived',
            campaignId: "camp_001",
        },
        {
            id: "prod_005_arch",
            brandName: "Stanley",
            productName: "Quencher H2.0",
            price: "$45.00",
            productUrl: "https://www.stanley1913.com/",
            image: "https://images.unsplash.com/photo-1610824352934-c10d87b700cc?q=80&w=600&auto=format&fit=crop",
            status: 'archived',
            campaignId: "camp_001",
        },
        {
            id: "prod_006_arch",
            brandName: "Baggu",
            productName: "Standard Reusable Bag",
            price: "$14.00",
            productUrl: "https://www.baggu.com/",
            image: "https://images.unsplash.com/photo-1590735234226-f40441951f22?q=80&w=600&auto=format&fit=crop",
            status: 'archived',
            campaignId: "camp_002",
        },
        */
    ]
};
