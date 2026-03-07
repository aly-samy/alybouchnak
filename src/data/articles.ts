export interface Article {
    id: number;
    slug: string; // URL-friendly name
    type: 'NewsArticle' | 'BlogPosting';

    // Core Content
    title: string;
    description: string; // The "Snippet" for Google
    content: string; // Support for Markdown or HTML strings
    category: 'Educational' | 'Music News' | 'Parenting' | 'Activity' | 'News' | 'Press' | 'Resources';

    // Visuals
    coverImage: {
        url: string;
        width: number;
        height: number;
        caption: string;
    };

    // Dates (Crucial for News Aggregators)
    datePublished: string; // ISO 8601 format: 2026-03-04T10:00:00Z
    dateModified: string;

    // Authorship
    author: {
        name: string;
        url: string; // Link to your "About" or "Artist" page
        role: string;
    };

    // SEO & Social
    seo: {
        title: string;
        description: string;
        keywords: string[];
        ogType: 'article';
        readingTime: string;
    };

    // Connections to increase SEO weight
    connections: {
        relatedTracks: number[];  // IDs from your tracks.ts
        relatedAlbums: string[];  // Slugs or IDs of your albums
        youtubeVideoId?: string;  // For a specific featured video
    };

    // Structured Data (The "Secret Sauce" for Google)
    articleSchema: {
        "@context": "https://schema.org";
        "@type": "NewsArticle" | "BlogPosting";
        "headline": string;
        "image": string[];
        "datePublished": string;
        "dateModified": string;
        "author": {
            "@type": "Person";
            "name": string;
            "url": string;
        }[];
        "video"?: {
            "@type": "VideoObject";
            "name": string;
            "description": string;
            "thumbnailUrl": string;
            "contentUrl": string;
            "embedUrl": string;
        };
        "about"?: {
            "@type": "MusicRecording" | "MusicAlbum";
            "name": string;
            "url": string;
        }[];
    };
}

export const articles: Article[] = [
    {
        id: 1,
        slug: 'benefits-of-animal-sounds-for-toddlers',
        type: 'NewsArticle',
        title: 'How Animal Sounds Accelerate Toddler Language Skills',
        description: 'A deep dive into why "Pet-Pop" songs are more than just fun—they are developmental tools.',
        content: '<p>When toddlers mimic animal sounds, they are actually practicing the foundational building blocks of human speech. Songs like <strong>Pet-Pop | The Animal Song</strong> provide a structured, rhythmic way to encourage this vocalization.</p>\n<p>Research shows that the repetitive nature of animal sounds (moo, baa, woof) helps children isolate phonemes, making it easier for them to transition to actual words.</p>\n<p>By engaging with interactive music, children not only develop their vocabulary but also improve their listening skills and auditory processing. So the next time your little one quacks along with the track, know that they are doing some serious brain work!</p>',
        category: 'Educational',
        coverImage: {
            url: 'https://images.unsplash.com/photo-1596464716127-f2a82984de30?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
            width: 1200,
            height: 675,
            caption: 'Children interacting with pet animals'
        },
        datePublished: '2026-03-01T08:00:00Z',
        dateModified: '2026-03-02T14:30:00Z',
        author: {
            name: 'Aly Bouchnak',
            url: 'https://alybouchnak.com/about',
            role: 'Composer & Educator'
        },
        seo: {
            title: 'Benefits of Animal Sounds | Aly Bouchnak Blog',
            description: 'Discover how music helps kids learn animal sounds and improve speech.',
            keywords: ['toddler development', 'educational music', 'animal sounds'],
            ogType: 'article',
            readingTime: '5 min'
        },
        connections: {
            relatedTracks: [19], // Assuming ID 19 is Pet-Pop
            relatedAlbums: ['bouncy-beats'],
            youtubeVideoId: 'dQw4w9WgXcQ' // Dummy ID
        },
        articleSchema: {
            "@context": "https://schema.org",
            "@type": "NewsArticle",
            "headline": "How Animal Sounds Accelerate Toddler Language Skills",
            "image": ["https://images.unsplash.com/photo-1596464716127-f2a82984de30?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"],
            "datePublished": "2026-03-01T08:00:00Z",
            "dateModified": "2026-03-02T14:30:00Z",
            "author": [{
                "@type": "Person",
                "name": "Aly Bouchnak",
                "url": "https://alybouchnak.com/about"
            }],
            "video": {
                "@type": "VideoObject",
                "name": "How Animal Sounds Accelerate Toddler Language Skills",
                "description": "A deep dive into why Pet-Pop songs are more than just fun—they are developmental tools.",
                "thumbnailUrl": "https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg",
                "contentUrl": "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
                "embedUrl": "https://www.youtube.com/embed/dQw4w9WgXcQ"
            },
            "about": [{
                "@type": "MusicRecording",
                "name": "Pet-Pop | The Animal Song",
                "url": "https://alybouchnak.com/track/pet-pop-the-animal-song"
            }]
        }
    },
    {
        id: 2,
        slug: 'the-power-of-brown-noise-for-sleep',
        type: 'BlogPosting',
        title: 'The Science of Sleep: Why Brown Noise Works',
        description: 'Understanding how low-frequency frequencies can help toddlers fall asleep faster and stay asleep longer.',
        content: '<p>Getting a toddler to sleep through the night is often cited as one of the biggest challenges of early parenthood. But what if the solution is built into the frequency of sound itself?</p>\n<p>Enter <strong>Brown Noise</strong>. Unlike White Noise, which contains all frequencies at equal intensity, Brown Noise emphasizes lower frequencies. This creates a deep, rumbling sound similar to a strong waterfall or distant thunder.</p>\n<p>When we designed the <em>Deep Sleep</em> album, we utilized the ISO principle combined with Brown Noise to gently guide children from an active state into deep rest.</p>',
        category: 'Parenting',
        coverImage: {
            url: 'https://images.unsplash.com/photo-1512438257223-950eed158652?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
            width: 1200,
            height: 675,
            caption: 'A sleeping toddler'
        },
        datePublished: '2026-02-15T09:00:00Z',
        dateModified: '2026-02-15T09:00:00Z',
        author: {
            name: 'Aly Bouchnak',
            url: 'https://alybouchnak.com/about',
            role: 'Composer'
        },
        seo: {
            title: 'The Power of Brown Noise | Sleep Science',
            description: 'Learn why Brown Noise helps toddlers sleep better than white noise.',
            keywords: ['brown noise', 'toddler sleep', 'ISO principle', 'deep sleep'],
            ogType: 'article',
            readingTime: '4 min'
        },
        connections: {
            relatedTracks: [12, 13],
            relatedAlbums: ['deep-sleep-album']
        },
        articleSchema: {
            "@context": "https://schema.org",
            "@type": "BlogPosting",
            "headline": "The Science of Sleep: Why Brown Noise Works",
            "image": ["https://images.unsplash.com/photo-1512438257223-950eed158652?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"],
            "datePublished": "2026-02-15T09:00:00Z",
            "dateModified": "2026-02-15T09:00:00Z",
            "author": [{
                "@type": "Person",
                "name": "Aly Bouchnak",
                "url": "https://alybouchnak.com/about"
            }],
            "about": [{
                "@type": "MusicAlbum",
                "name": "Deep Sleep for Toddlers",
                "url": "https://alybouchnak.com/album/deep-sleep-album"
            }]
        }
    },
    {
        id: 3,
        slug: 'behind-the-blooms-house',
        type: 'NewsArticle',
        title: 'Behind the Scenes: Creating The Bloom\'s House Universe',
        description: 'An exclusive look into the character design and musical composition of our latest interactive project.',
        content: '<p>The concept of <em>The Bloom\'s House</em> wasn\'t born overnight. It took months of conceptualizing, character sketching, and musical composition to create a universe that felt both educational and deeply engaging.</p>\n<p>Each character was designed with a specific musical instrument and personality trait in mind. This allows children to form parasocial relationships with the characters, making the musical lessons much more impactful.</p>\n<p>We are incredibly excited to share this universe with you and your family.</p>',
        category: 'Music News',
        coverImage: {
            url: 'https://images.unsplash.com/photo-1511379938547-c1f69419868d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
            width: 1200,
            height: 675,
            caption: 'Music composition setup'
        },
        datePublished: '2026-03-05T11:00:00Z',
        dateModified: '2026-03-06T09:00:00Z',
        author: {
            name: 'Aly Bouchnak',
            url: 'https://alybouchnak.com/about',
            role: 'Creator'
        },
        seo: {
            title: 'Behind The Bloom\'s House | Music News',
            description: 'Discover how we created the interactive universe of The Bloom\'s House.',
            keywords: ['music production', 'character design', 'childrens entertainment'],
            ogType: 'article',
            readingTime: '6 min'
        },
        connections: {
            relatedTracks: [],
            relatedAlbums: ['meet-the-blooms']
        },
        articleSchema: {
            "@context": "https://schema.org",
            "@type": "NewsArticle",
            "headline": "Behind the Scenes: Creating The Bloom's House Universe",
            "image": ["https://images.unsplash.com/photo-1511379938547-c1f69419868d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"],
            "datePublished": "2026-03-05T11:00:00Z",
            "dateModified": "2026-03-06T09:00:00Z",
            "author": [{
                "@type": "Person",
                "name": "Aly Bouchnak",
                "url": "https://alybouchnak.com/about"
            }],
            "about": [{
                "@type": "MusicAlbum",
                "name": "Meet The Blooms",
                "url": "https://alybouchnak.com/album/meet-the-blooms"
            }]
        }
    }
];

export function getArticleBySlug(slug: string): Article | undefined {
    return articles.find(article => article.slug === slug);
}

export function getAllArticles(): Article[] {
    return articles;
}
