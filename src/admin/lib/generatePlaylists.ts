import type { Playlist } from '../../data/playlists';

const PLAYLIST_INTERFACE = `export interface Playlist {
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
  youtubeUrl: string;
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
}`;

const PLAYLIST_FUNCTIONS = `
export function getPlaylistBySlug(slug: string): Playlist | undefined {
  return playlists.find(playlist => playlist.slug === slug);
}

export function getAllPlaylists(): Playlist[] {
  return playlists;
}
`;

export function generatePlaylistsFile(playlists: Playlist[]): string {
  const dataString = JSON.stringify(playlists, null, 2);
  // Add import if needed, but here we define the interface in the file to match albums.ts pattern
  return `import { Album } from './albums';\n\n${PLAYLIST_INTERFACE}\n\nexport const playlists: Playlist[] = ${dataString};\n${PLAYLIST_FUNCTIONS}`;
}
