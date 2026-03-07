import type { Album } from './albums';

export interface ThemeCollection extends Album {
    // Theme Collections share the same structure as Albums for now
}

export const themeCollections: ThemeCollection[] = [
    {
        id: 1,
        title: "Animal Adventures",
        subtitle: "",
        slug: "animal-adventures-theme",
        releaseDate: "2026-03-01",
        coverImage: "https://images.unsplash.com/photo-1546182990-dffeafbe841d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        artist: "Aly Bouchnak",
        genre: "Children's Educational",
        mood: "Playful",
        ageRange: "1-5 years",
        description: "A joyful musical journey through the farm, the jungle, and the pet store, focusing on animal sounds and movements.",
        status: "available",
        spotifyUrl: "https://open.spotify.com/artist/1nRdHdUfxacuQeLWFPXqr8",
        appleMusicUrl: "#",
        youtubeUrl: "#",
        otherUrl: "#",
        upc: "123456789012",
        trackCount: 3,
        duration: "7:00",
        curatorNote: "Perfect for a trip to the zoo or learning about pets at home.",
        educationalBenefits: [
            {
                title: "Vocabulary Expansion",
                description: "Associating animals with their corresponding sounds."
            }
        ],
        albumSchema: {
            "@context": "https://schema.org",
            "@type": "MusicAlbum",
            "name": "Animal Adventures",
            "image": "https://images.unsplash.com/photo-1546182990-dffeafbe841d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
            "description": "A joyful musical journey through the farm.",
            "byArtist": {
                "@type": "Person",
                "name": "Aly Bouchnak"
            }
        }
    },
    {
        id: 2,
        title: "Space Explorers",
        subtitle: "",
        slug: "space-explorers-theme",
        releaseDate: "2026-04-01",
        coverImage: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        artist: "Aly Bouchnak",
        genre: "Electronic Lullaby",
        mood: "Calming",
        ageRange: "3-8 years",
        description: "Atmospheric, synth-driven instrumentals designed to inspire curiosity about the stars.",
        status: "available",
        spotifyUrl: "https://open.spotify.com/artist/1nRdHdUfxacuQeLWFPXqr8",
        appleMusicUrl: "#",
        youtubeUrl: "#",
        otherUrl: "#",
        upc: "123456789013",
        trackCount: 4,
        duration: "12:00",
        curatorNote: "Put this on while building a spaceship out of cardboard boxes.",
        educationalBenefits: [
            {
                title: "Imaginative Play",
                description: "Open-ended soundscapes encourage creative storytelling."
            }
        ],
        albumSchema: {
            "@context": "https://schema.org",
            "@type": "MusicAlbum",
            "name": "Space Explorers",
            "image": "https://images.unsplash.com/photo-1451187580459-43490279c0fa?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
            "description": "Atmospheric, synth-driven instrumentals.",
            "byArtist": {
                "@type": "Person",
                "name": "Aly Bouchnak"
            }
        }
    },
    {
        id: 3,
        title: "Mindful Moments",
        subtitle: "",
        slug: "mindful-moments-theme",
        releaseDate: "2026-05-15",
        coverImage: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        artist: "Aly Bouchnak",
        genre: "Acoustic",
        mood: "Gentle",
        ageRange: "4-10 years",
        description: "Acoustic instruments and guided breathing exercises to help children regulate their emotions.",
        status: "coming-soon",
        spotifyUrl: "#",
        appleMusicUrl: "#",
        youtubeUrl: "#",
        otherUrl: "#",
        upc: "123456789014",
        trackCount: 3,
        duration: "10:00",
        curatorNote: "Ideal for the 'witching hour' before dinner.",
        educationalBenefits: [
            {
                title: "Emotional Regulation",
                description: "Teaches deep breathing and self-soothing techniques."
            }
        ],
        albumSchema: {
            "@context": "https://schema.org",
            "@type": "MusicAlbum",
            "name": "Mindful Moments",
            "image": "https://images.unsplash.com/photo-1506126613408-eca07ce68773?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
            "description": "Acoustic instruments and guided breathing exercises.",
            "byArtist": {
                "@type": "Person",
                "name": "Aly Bouchnak"
            }
        }
    }
];

export function getThemeCollectionBySlug(slug: string): ThemeCollection | undefined {
    return themeCollections.find(collection => collection.slug === slug);
}

export function getAllThemeCollections(): ThemeCollection[] {
    return themeCollections;
}
