import type { Album } from '../../data/albums';

const ALBUM_INTERFACE = `export interface Album {
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
  // Extended content for album pages
  artistNote?: string;
  scienceFramework?: string;
  trackIds?: number[];
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

const ALBUM_FUNCTIONS = `
export function getAlbumBySlug(slug: string): Album | undefined {
  return albums.find(album => album.slug === slug);
}

export function getAllAlbums(): Album[] {
  return albums;
}
`;

export function generateAlbumsFile(albums: Album[]): string {
  const dataString = JSON.stringify(albums, null, 2);
  return `${ALBUM_INTERFACE}\n\nexport const albums: Album[] = ${dataString};\n${ALBUM_FUNCTIONS}`;
}
