

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
  // Extended content for playlist pages
  artistNote?: string;
  scienceFramework?: string;
  tracks?: {
    number?: number;
    title: string;
    duration: string;
    description?: string;
    mood?: string;
    slug?: string;
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
    "artist": "Aly Bouchnak",
    "id": 1,
    "status": "available",
    "genre": "Children's Music",
    "educationalBenefits": [
      {
        "title": "Language Acquisition",
        "description": "Repetitive rhythmic patterns aid in phoneme recognition."
      }
    ],
    "tracks": [
      {
        "title": "Old MacDonald Had a Farm (Farm Party)",
        "duration": "2:00",
        "number": 1,
        "description": "A high-energy party version of \"Old MacDonald Had a Farm\" "
      },
      {
        "title": "Mary Had a Little Lamb (School Party)",
        "duration": "2:00",
        "number": 2,
        "description": "A fresh, upbeat take on the classic nursery rhyme \"Mary Had a Little Lamb\""
      },
      {
        "title": "Boom Teka Boom (Wake Up Song)",
        "duration": "2:00",
        "number": 3,
        "description": "A high-energy wake-up song with rhythmic beats to start the day positively. "
      },
      {
        "title": "Pet-Pop | The Animal Song",
        "duration": "2:00",
        "number": 4,
        "description": "A lively song about different pets and their sounds."
      }
    ],
    "title": "Bouncy Beats",
    "slug": "Bouncy-Beats-Toddler-Dance-Party",
    "subtitle": "Toddler Dance Party",
    "description": "The definitive 'guilt-free' playlist for Development-Conscious Millennial Parents.",
    "coverImage": "https://images.unsplash.com/photo-1543329994-3a5c1ab6109e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    "ageRange": "2-6 years",
    "mood": "Playful",
    "releaseDate": "2025-10-10",
    "spotifyUrl": "https://open.spotify.com/playlist/0lPuabF1uMFlFJEOMo4PhR",
    "appleMusicUrl": "https://music.apple.com/us/artist/aly-bouchnak/1684496150",
    "youtubeUrl": "https://youtube.com/playlist",
    "amazonUrl": "#",
    "otherUrl": "https://push.fm/fl/bouncy-beats",
    "artistNote": "I created these songs to get kids moving and practicing language simultaneously.",
    "scienceFramework": "Focuses on gross motor skill development.",
    "trackCount": 4,
    "duration": "8:00",
    "upc": "198765432109"
  },
  {
    "artist": "Aly Bouchnak",
    "id": 2,
    "status": "available",
    "genre": "Ambient / Sleep",
    "educationalBenefits": [
      {
        "title": "Sleep Association",
        "description": "Utilizes the ISO principle and Brown Noise to lower heart rates."
      }
    ],
    "tracks": [
      {
        "title": "Gentle Rainfall over the Bloom's House",
        "duration": "4:30",
        "number": 1,
        "description": "Brown noise masked as a soothing rainstorm."
      },
      {
        "title": "Lullaby for a Tired Toddler",
        "duration": "5:15",
        "number": 2,
        "description": "Slow, descending melodies to induce sleep."
      }
    ],
    "title": "Calm Dreams",
    "slug": "calm-dreams-sleep-playlist",
    "subtitle": "Deep Sleep for Little Ones",
    "description": "A scientifically engineered playlist to help your children fall asleep and stay asleep.",
    "coverImage": "https://images.unsplash.com/photo-1516627145497-ae6968895b74?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    "ageRange": "0-4 years",
    "mood": "Calming",
    "releaseDate": "2026-01-15",
    "spotifyUrl": "https://open.spotify.com/artist/1nRdHdUfxacuQeLWFPXqr8",
    "appleMusicUrl": "#",
    "youtubeUrl": "#",
    "amazonUrl": "#",
    "otherUrl": "#",
    "artistNote": "The frequencies in this playlist were carefully selected to match the resting heart rate of a toddler.",
    "scienceFramework": "ISO Principle and Acoustic Brown Noise theories.",
    "trackCount": 2,
    "duration": "9:45",
    "upc": "198765432110"
  },
  {
    "artist": "Aly Bouchnak",
    "id": 3,
    "status": "available",
    "genre": "Educational Music",
    "educationalBenefits": [
      {
        "title": "Routine Building",
        "description": "Songs designed to make daily transitions (cleanup, brushing teeth) seamless."
      }
    ],
    "tracks": [
      {
        "title": "The Clean Up Countdown",
        "duration": "2:30",
        "number": 1,
        "description": "A fun, fast-paced song to get toys put away."
      },
      {
        "title": "Brusha Brusha",
        "duration": "2:00",
        "number": 2,
        "description": "The exact length needed for proper tooth brushing."
      }
    ],
    "title": "Daily Routines",
    "slug": "daily-routines-learning",
    "subtitle": "Songs for seamless transitions",
    "description": "Replace toddler tantrums with musical transitions.",
    "coverImage": "https://images.unsplash.com/photo-1576405370956-613d5b7a5a3a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    "ageRange": "2-6 years",
    "mood": "Upbeat",
    "releaseDate": "2026-02-20",
    "spotifyUrl": "https://open.spotify.com/artist/1nRdHdUfxacuQeLWFPXqr8",
    "appleMusicUrl": "#",
    "youtubeUrl": "#",
    "amazonUrl": "#",
    "otherUrl": "#",
    "artistNote": "Transitions are tough. Music makes them a game.",
    "scienceFramework": "Behavioral conditioning through positive musical reinforcement.",
    "trackCount": 2,
    "duration": "4:30",
    "upc": "198765432111"
  }
];

export function getPlaylistBySlug(slug: string): Playlist | undefined {
  return playlists.find(playlist => playlist.slug === slug);
}

export function getAllPlaylists(): Playlist[] {
  return playlists;
}
