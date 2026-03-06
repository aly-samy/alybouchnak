import type { ThemeCollection } from '../../data/themeCollections';

const THEME_INTERFACE = `export interface ThemeCollection {
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
}`;

const THEME_FUNCTIONS = `
export function getThemeCollectionBySlug(slug: string): ThemeCollection | undefined {
  return themeCollections.find(collection => collection.slug === slug);
}

export function getAllThemeCollections(): ThemeCollection[] {
  return themeCollections;
}
`;

export function generateThemeCollectionsFile(collections: ThemeCollection[]): string {
    const dataString = JSON.stringify(collections, null, 2);
    return `import { Album } from './albums';\n\n${THEME_INTERFACE}\n\nexport const themeCollections: ThemeCollection[] = ${dataString};\n${THEME_FUNCTIONS}`;
}
