export interface Playlist {
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
  appleMusicUrl?: string;
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
  // Extended content for playlist pages
  curatorNote?: string;
  artistNote?: string;
  scienceFramework?: string;
  tracks?: {
    trackId?: number;
    title?: string;
    duration?: string;
    description?: string;
    link?: string;
  }[];
  relatedAlbums?: {
    id: number;
    title: string;
    cover: string;
    description: string;
    link: string;
  }[];
  // For Discography compatibility
  id?: number;
  type?: string;
  date?: string;
  image?: string;
  link?: string;
  status?: 'available' | 'coming-soon';
  lyrics?: string;
}

export const playlists: Playlist[] = [
  {
    "id": 2,
    "slug": "Dream-Tones",
    "title": "Dream Tones",
    "subtitle": "Lullabies & Music for Babies Sleep",
    "description": "A scientifically engineered playlist to help your children fall asleep and stay asleep.",
    "coverImage": "/images/Dream_Tones-Aly_Bouchnak.webp",
    "artist": "Aly Bouchnak",
    "releaseDate": "2026-01-15T00:00:00.000Z",
    "genre": "Children's Music",
    "ageRange": "1-6 years",
    "mood": "Calming",
    "spotifyUrl": "https://open.spotify.com/artist/1nRdHdUfxacuQeLWFPXqr8",
    "appleMusicUrl": "#",
    "youtubeUrl": "#",
    "amazonUrl": "#",
    "otherUrl": "#",
    "trackCount": 8,
    "duration": "25:02",
    "upc": "198765432110",
    "educationalBenefits": [
      {
        "title": "Sleep Association",
        "description": "Utilizes the ISO principle and Brown Noise to lower heart rates."
      }
    ],
    "artistNote": "The frequencies in this playlist were carefully selected to match the resting heart rate of a toddler.",
    "scienceFramework": "ISO Principle and Acoustic Brown Noise theories.",
    "tracks": [
      {
        "trackId": 12
      },
      {
        "trackId": 13
      },
      {
        "trackId": 14
      },
      {
        "trackId": 19
      },
      {
        "trackId": 15
      },
      {
        "trackId": 17
      },
      {
        "trackId": 18
      },
      {
        "trackId": 16
      }
    ],
    "status": "available"
  },
  {
    "id": 1,
    "slug": "Bouncy-Beats-Toddler-Dance-Party",
    "title": "Bouncy Beats",
    "subtitle": "Toddler Dance Party",
    "description": "The definitive 'guilt-free' playlist for Development-Conscious Millennial Parents.",
    "coverImage": "/images/Bouncy-Beats-playlist.webp",
    "artist": "Aly Bouchnak",
    "releaseDate": "2025-10-10T00:00:00.000Z",
    "genre": "Children's Music",
    "ageRange": "2-6 years",
    "mood": "Playful",
    "spotifyUrl": "https://open.spotify.com/playlist/0lPuabF1uMFlFJEOMo4PhR",
    "appleMusicUrl": "#",
    "youtubeUrl": "https://youtube.com/playlist?list=PL5v2lAOKURyACHKsvDZOfTy0Yj-T4uWwi&si=tcMguPxxvViO1Im1",
    "amazonUrl": "#",
    "otherUrl": "https://push.fm/fl/bouncy-beats",
    "trackCount": 4,
    "duration": "59:00",
    "upc": "198765432109",
    "educationalBenefits": [
      {
        "title": "Language Acquisition",
        "description": "Repetitive rhythmic patterns aid in phoneme recognition."
      }
    ],
    "artistNote": "I created these songs to get kids moving and practicing language simultaneously.",
    "scienceFramework": "Focuses on gross motor skill development.",
    "tracks": [
      {
        "trackId": 6
      },
      {
        "trackId": 4
      },
      {
        "trackId": 23
      },
      {
        "trackId": 8
      },
      {
        "trackId": 5
      },
      {
        "trackId": 3
      },
      {
        "trackId": 2
      }
    ],
    "status": "available"
  },
  {
    "id": 3,
    "slug": "blooms-classics",
    "title": "Bloom's Classics",
    "subtitle": "Songs for seamless transitions",
    "description": "Replace toddler tantrums with musical transitions.",
    "coverImage": "/images/Blooms_Classics-Aly_Bouchnak.webp",
    "artist": "Aly Bouchnak",
    "releaseDate": "2026-02-20T00:00:00.000Z",
    "genre": "Nursery Rhymes",
    "ageRange": "2-6 years",
    "mood": "Upbeat",
    "spotifyUrl": "https://open.spotify.com/playlist/0hL9pbmGCZRDmpVFVOlq14",
    "appleMusicUrl": "#",
    "youtubeUrl": "#",
    "amazonUrl": "#",
    "otherUrl": "#",
    "trackCount": 34,
    "duration": "59:30",
    "upc": "198765432111",
    "educationalBenefits": [
      {
        "title": "Routine Building",
        "description": "Songs designed to make daily transitions (cleanup, brushing teeth) seamless."
      }
    ],
    "artistNote": "Transitions are tough. Music makes them a game.",
    "scienceFramework": "Behavioral conditioning through positive musical reinforcement.",
    "tracks": [
      {
        "trackId": 22
      },
      {
        "trackId": 4
      },
      {
        "trackId": 23
      },
      {
        "link": "https://open.spotify.com/track/29ZGfBoJE8ACSyCDepnU4W",
        "title": "If You're Happy and You Know It",
        "duration": "2:00",
        "description": "Artist: Bounce Patrol, The Wiggles.   Writing & Arrangement: Traditional Traditional (Lyricist • Composer),  Shannon Jones (Lyricist • Composer),  Nicholas de Zilwa (Lyricist • Composer)"
      },
      {
        "link": "https://open.spotify.com/track/0HJgMXXDgygdoLLqLlkzSI",
        "title": "Head Shoulders Knees & Toes (Speeding Up)",
        "duration": "1:51",
        "description": "Artist: Super Simple Songs.  Writing & Arrangement: Devon Charles Thagard (Arranger),  Troy McDonald (Arranger)"
      }
    ],
    "status": "available"
  }
];

export function getPlaylistBySlug(slug: string): Playlist | undefined {
  return playlists.find(playlist => playlist.slug === slug);
}

export function getAllPlaylists(): Playlist[] {
  return playlists;
}
