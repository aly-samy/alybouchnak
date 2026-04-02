export interface ThemeCollection {
  id?: number;
  slug: string;
  title: string;
  subtitle: string;
  description: string;
  coverImage: string;
  artist: string;
  releaseDate: string;
  genre: string;
  ageRange: string;
  mood: string;
  spotifyUrl: string;
  appleMusicUrl: string;
  youtubeUrl: string;
  amazonUrl?: string;
  otherUrl?: string; // Link to push.fm or other streaming platforms
  trackCount: number;
  duration: string;
  upc: string;
  educationalBenefits: {
    title: string;
    description: string;
  }[];
  // Extended content for collection pages
  artistNote?: string;
  curatorNote?: string;
  scienceFramework?: string;
  category: 'Routine & Utility' | 'Mood & Energy' | 'Adventure & Event' | 'Signature Collections';
  trackIds: number[];
  relatedAlbums?: {
    id: number;
    title: string;
    cover: string;
    description: string;
    link: string;
  }[];
  // For Discography compatibility
  type?: string;
  date?: string;
  image?: string;
  link?: string;
  status?: 'available' | 'coming-soon';
  lyrics?: string;
}

export const themeCollections: ThemeCollection[] = [
  {
    "id": 1,
    "slug": "wake-up-and-go",
    "title": "The \"Wake Up & Go\" Collection",
    "subtitle": "The Problem Solvers",
    "description": "Turn the morning struggle into a game with these high-energy tracks designed to get toddlers out of bed and moving.",
    "coverImage": "/images/Aly-default_bg.webp",
    "artist": "Aly Bouchnak",
    "releaseDate": "2026-04-01T00:00:00.000Z",
    "genre": "Children's Utility",
    "ageRange": "2-6 years",
    "mood": "Upbeat",
    "spotifyUrl": "https://open.spotify.com/playlist/7d4eOaB22cE2b3sF8E1d4B",
    "appleMusicUrl": "#",
    "youtubeUrl": "#",
    "otherUrl": "#",
    "trackCount": 2,
    "duration": "5:00",
    "upc": "123456789012",
    "educationalBenefits": [
      {
        "title": "Routine Compliance",
        "description": "Associating waking up with a fun mini-dance party."
      }
    ],
    "curatorNote": "How to survive the 7 AM wake-up.",
    "category": "Routine & Utility",
    "trackIds": [
      2,
      6
    ],
    "status": "available"
  },
  {
    "id": 3,
    "slug": "family-road-trip",
    "title": "The \"Family Road Trip\" Collection",
    "subtitle": "The Memory Makers",
    "description": "Upbeat, non-annoying pop that parents can actually enjoy alongside their kids during long drives.",
    "coverImage": "/images/Aly-default_bg.webp",
    "artist": "Aly Bouchnak",
    "releaseDate": "2026-06-15T00:00:00.000Z",
    "genre": "Family Pop",
    "ageRange": "0-16 years",
    "mood": "Joyful",
    "spotifyUrl": "https://open.spotify.com/playlist/7d4eOaB22cE2b3sF8E1d4B",
    "appleMusicUrl": "#",
    "youtubeUrl": "#",
    "otherUrl": "#",
    "trackCount": 3,
    "duration": "8:00",
    "upc": "123456789014",
    "educationalBenefits": [
      {
        "title": "Family Bonding",
        "description": "Creates shared musical memories for the whole family."
      }
    ],
    "curatorNote": "Download my 'Road Trip Survival' playlist guide.",
    "category": "Adventure & Event",
    "trackIds": [
      8,
      9,
      10
    ],
    "status": "available"
  },
  {
    "id": 2,
    "slug": "bouncy-beats-party",
    "title": "The \"Bouncy Beats\" Party",
    "subtitle": "The Vibe Managers",
    "description": "High-energy tracks for burning off extra energy safely indoors.",
    "coverImage": "/images/Aly-default_bg.webp",
    "artist": "Aly Bouchnak",
    "releaseDate": "2026-05-01T00:00:00.000Z",
    "genre": "Kids Dance",
    "ageRange": "1-6 years",
    "mood": "Energetic",
    "spotifyUrl": "https://open.spotify.com/playlist/7d4eOaB22cE2b3sF8E1d4B",
    "appleMusicUrl": "#",
    "youtubeUrl": "#",
    "otherUrl": "#",
    "trackCount": 2,
    "duration": "5:00",
    "upc": "123456789013",
    "educationalBenefits": [
      {
        "title": "Gross Motor Skills",
        "description": "Encourages jumping and coordinated movements."
      }
    ],
    "curatorNote": "The 2-minute energy burn trick.",
    "category": "Mood & Energy",
    "trackIds": [
      1,
      3
    ],
    "status": "available"
  },
  {
    "id": 4,
    "slug": "musical-uncle-picks",
    "title": "Favorite Musical Uncle Picks",
    "subtitle": "Signature Hits",
    "description": "A curated list of my personal favorites and absolute top-streamed hits.",
    "coverImage": "/images/Aly-default_bg.webp",
    "artist": "Aly Bouchnak",
    "releaseDate": "2026-07-01T00:00:00.000Z",
    "genre": "Curated Variety",
    "ageRange": "2-8 years",
    "mood": "Curated",
    "spotifyUrl": "https://open.spotify.com/playlist/7d4eOaB22cE2b3sF8E1d4B",
    "appleMusicUrl": "#",
    "youtubeUrl": "#",
    "otherUrl": "#",
    "trackCount": 7,
    "duration": "9:00",
    "upc": "123456789015",
    "educationalBenefits": [
      {
        "title": "Musical Variety",
        "description": "Exposes children to diverse genres and tempos."
      }
    ],
    "curatorNote": "The absolute best of the Bloom's House.",
    "category": "Signature Collections",
    "trackIds": [
      5,
      7,
      24,
      20,
      23,
      10,
      1
    ],
    "status": "coming-soon"
  }
];

export function getThemeCollectionBySlug(slug: string): ThemeCollection | undefined {
  return themeCollections.find(collection => collection.slug === slug);
}

export function getAllThemeCollections(): ThemeCollection[] {
  return themeCollections;
}
