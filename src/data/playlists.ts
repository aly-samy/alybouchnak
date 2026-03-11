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
    "id": 1,
    "slug": "Bouncy-Beats-Toddler-Dance-Party",
    "title": "Bouncy Beats",
    "subtitle": "Toddler Dance Party",
    "description": "The definitive 'guilt-free' playlist for Development-Conscious Millennial Parents.",
    "coverImage": "https://images.unsplash.com/photo-1543329994-3a5c1ab6109e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    "artist": "Aly Bouchnak",
    "releaseDate": "2025-10-10T00:00:00.000Z",
    "genre": "Children's Music",
    "ageRange": "2-6 years",
    "mood": "Playful",
    "spotifyUrl": "https://open.spotify.com/playlist/0lPuabF1uMFlFJEOMo4PhR",
    "appleMusicUrl": "https://music.apple.com/us/artist/aly-bouchnak/1684496150",
    "youtubeUrl": "https://youtube.com/playlist",
    "amazonUrl": "#",
    "otherUrl": "https://push.fm/fl/bouncy-beats",
    "trackCount": 4,
    "duration": "8:00",
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
        "trackId": 4
      },
      {
        "trackId": 23
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
    "id": 2,
    "slug": "calm-dreams-sleep-playlist",
    "title": "Calm Dreams",
    "subtitle": "Deep Sleep for Little Ones",
    "description": "A scientifically engineered playlist to help your children fall asleep and stay asleep.",
    "coverImage": "https://images.unsplash.com/photo-1516627145497-ae6968895b74?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    "artist": "Aly Bouchnak",
    "releaseDate": "2026-01-15T00:00:00.000Z",
    "genre": "Ambient / Sleep",
    "ageRange": "0-4 years",
    "mood": "Calming",
    "spotifyUrl": "https://open.spotify.com/artist/1nRdHdUfxacuQeLWFPXqr8",
    "appleMusicUrl": "#",
    "youtubeUrl": "#",
    "amazonUrl": "#",
    "otherUrl": "#",
    "trackCount": 2,
    "duration": "9:45",
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
        "trackId": 22
      },
      {
        "link": "",
        "title": "Lullaby for a Tired Toddler",
        "duration": "5:15",
        "description": "Slow, descending melodies to induce sleep."
      }
    ],
    "status": "available"
  },
  {
    "id": 3,
    "slug": "daily-routines-learning",
    "title": "Daily Routines",
    "subtitle": "Songs for seamless transitions",
    "description": "Replace toddler tantrums with musical transitions.",
    "coverImage": "https://images.unsplash.com/photo-1576405370956-613d5b7a5a3a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    "artist": "Aly Bouchnak",
    "releaseDate": "2026-02-20T00:00:00.000Z",
    "genre": "Educational Music",
    "ageRange": "2-6 years",
    "mood": "Upbeat",
    "spotifyUrl": "https://open.spotify.com/artist/1nRdHdUfxacuQeLWFPXqr8",
    "appleMusicUrl": "#",
    "youtubeUrl": "#",
    "amazonUrl": "#",
    "otherUrl": "#",
    "trackCount": 2,
    "duration": "4:30",
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
        "link": "",
        "title": "Brusha Brusha",
        "duration": "2:00",
        "description": "The exact length needed for proper tooth brushing."
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
