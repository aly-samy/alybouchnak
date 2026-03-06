export interface Article {
    id: number;
    slug: string; // URL-friendly name
    type: 'NewsArticle' | 'BlogPosting';

    // Core Content
    title: string;
    description: string; // The "Snippet" for Google
    content: string; // Support for Markdown or HTML strings
    category: 'News' | 'Resources' | 'Press' | 'Educational' | 'Music News' | 'Parenting' | 'Activity';

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

export const articles: Article[] = [];

export function getArticleBySlug(slug: string): Article | undefined {
    return articles.find(article => article.slug === slug);
}

export function getAllArticles(): Article[] {
    return articles;
}
