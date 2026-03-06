import { Album } from './albums';

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
        "title": "",
        "description": ""
      }
    ],
    "tracks": [
      {
        "title": "Old MacDonald Had a Farm (Farm Party)",
        "duration": "2:00",
        "number": -1,
        "description": "A high-energy party version of \"Old MacDonald Had a Farm\" "
      },
      {
        "title": "Mary Had a Little Lamb (School Party)",
        "duration": "2:00",
        "number": 1,
        "description": "A fresh, upbeat take on the classic nursery rhyme \"Mary Had a Little Lamb\""
      },
      {
        "title": "Boom Teka Boom (Wake Up Song)",
        "duration": "2:00",
        "number": null,
        "description": "A high-energy wake-up song with rhythmic beats to start the day positively. "
      },
      {
        "title": "Pet-Pop | The Animal Song",
        "duration": "2:00",
        "number": null,
        "description": "A lively song about different pets and their sounds."
      }
    ],
    "title": "Bouncy Beats",
    "slug": "Bouncy-Beats-Toddler-Dance-Party",
    "subtitle": "Toddler Dance Party",
    "description": "The definitive 'guilt-free' playlist for Development-Conscious Millennial Parents. ",
    "coverImage": "",
    "ageRange": "2-6 years",
    "mood": "Playful, Party, Energetic ",
    "releaseDate": "2025-10-10",
    "spotifyUrl": "https://open.spotify.com/playlist/0lPuabF1uMFlFJEOMo4PhR",
    "appleMusicUrl": "#",
    "youtubeUrl": "#",
    "amazonUrl": "#",
    "otherUrl": "https://push.fm/fl/bouncy-beats",
    "artistNote": "",
    "scienceFramework": ""
  }
];

export function getPlaylistBySlug(slug: string): Playlist | undefined {
  return playlists.find(playlist => playlist.slug === slug);
}

export function getAllPlaylists(): Playlist[] {
  return playlists;
}
