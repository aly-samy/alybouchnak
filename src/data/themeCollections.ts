import type { Album } from './albums';

export interface ThemeCollection extends Album {
    category: 'Routine & Utility' | 'Mood & Energy' | 'Adventure & Event' | 'Signature Collections';
    trackIds: number[];
}

export const themeCollections: ThemeCollection[] = [
    {
        id: 1,
        title: "The \"Wake Up & Go\" Collection",
        subtitle: "The Problem Solvers",
        slug: "wake-up-and-go",
        releaseDate: "2026-04-01",
        coverImage: "https://images.unsplash.com/photo-1543326727-cf6c39e8f84c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        artist: "Aly Bouchnak",
        genre: "Children's Utility",
        mood: "Upbeat",
        ageRange: "2-6 years",
        description: "Turn the morning struggle into a game with these high-energy tracks designed to get toddlers out of bed and moving.",
        status: "available",
        spotifyUrl: "https://open.spotify.com/playlist/7d4eOaB22cE2b3sF8E1d4B",
        appleMusicUrl: "#",
        youtubeUrl: "#",
        otherUrl: "#",
        upc: "123456789012",
        trackCount: 2,
        duration: "5:00",
        category: "Routine & Utility",
        trackIds: [2, 6], // Boom Teka Boom, Alphabet Song
        curatorNote: "How to survive the 7 AM wake-up.",
        educationalBenefits: [
            {
                title: "Routine Compliance",
                description: "Associating waking up with a fun mini-dance party."
            }
        ]
    },
    {
        id: 2,
        title: "The \"Bouncy Beats\" Party",
        subtitle: "The Vibe Managers",
        slug: "bouncy-beats-party",
        releaseDate: "2026-05-01",
        coverImage: "https://images.unsplash.com/photo-1533174000220-db9b09fb7be6?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        artist: "Aly Bouchnak",
        genre: "Kids Dance",
        mood: "Energetic",
        ageRange: "1-6 years",
        description: "High-energy tracks for burning off extra energy safely indoors.",
        status: "available",
        spotifyUrl: "https://open.spotify.com/playlist/7d4eOaB22cE2b3sF8E1d4B",
        appleMusicUrl: "#",
        youtubeUrl: "#",
        otherUrl: "#",
        upc: "123456789013",
        trackCount: 2,
        duration: "5:00",
        category: "Mood & Energy",
        trackIds: [1, 3], // Bock Bock Chicken, Funny Bunny Jump
        curatorNote: "The 2-minute energy burn trick.",
        educationalBenefits: [
            {
                title: "Gross Motor Skills",
                description: "Encourages jumping and coordinated movements."
            }
        ]
    },
    {
        id: 3,
        title: "The \"Family Road Trip\" Collection",
        subtitle: "The Memory Makers",
        slug: "family-road-trip",
        releaseDate: "2026-06-15",
        coverImage: "https://images.unsplash.com/photo-1510345479053-f4b6cb2fcc86?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        artist: "Aly Bouchnak",
        genre: "Family Pop",
        mood: "Joyful",
        ageRange: "All Ages",
        description: "Upbeat, non-annoying pop that parents can actually enjoy alongside their kids during long drives.",
        status: "available",
        spotifyUrl: "https://open.spotify.com/playlist/7d4eOaB22cE2b3sF8E1d4B",
        appleMusicUrl: "#",
        youtubeUrl: "#",
        otherUrl: "#",
        upc: "123456789014",
        trackCount: 3,
        duration: "8:00",
        category: "Adventure & Event",
        trackIds: [8, 9, 10], // Duckie Song, Pet-Pop, Zakzooka
        curatorNote: "Download my 'Road Trip Survival' playlist guide.",
        educationalBenefits: [
            {
                title: "Family Bonding",
                description: "Creates shared musical memories for the whole family."
            }
        ]
    },
    {
        id: 4,
        title: "Favorite Musical Uncle Picks",
        subtitle: "Signature Hits",
        slug: "musical-uncle-picks",
        releaseDate: "2026-07-01",
        coverImage: "https://images.unsplash.com/photo-1516280440502-628d052be572?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        artist: "Aly Bouchnak",
        genre: "Curated Variety",
        mood: "Curated",
        ageRange: "2-8 years",
        description: "A curated list of my personal favorites and absolute top-streamed hits.",
        status: "available",
        spotifyUrl: "https://open.spotify.com/playlist/7d4eOaB22cE2b3sF8E1d4B",
        appleMusicUrl: "#",
        youtubeUrl: "#",
        otherUrl: "#",
        upc: "123456789015",
        trackCount: 3,
        duration: "9:00",
        category: "Signature Collections",
        trackIds: [2, 5, 7], // Boom Teka Boom, Yummy Spoon, Nanny & Papa
        curatorNote: "The absolute best of the Bloom's House.",
        educationalBenefits: [
            {
                title: "Musical Variety",
                description: "Exposes children to diverse genres and tempos."
            }
        ]
    }
];

export function getThemeCollectionBySlug(slug: string): ThemeCollection | undefined {
    return themeCollections.find(collection => collection.slug === slug);
}

export function getAllThemeCollections(): ThemeCollection[] {
    return themeCollections;
}
