import type { Track } from '../../data/tracks';

/**
 * Converts the Track interface definition to a string.
 * This is kept static since the interface shouldn't change via the admin panel.
 */
const TRACK_INTERFACE = `export interface Track {
  // Internal identifier
  id: number;
  slug: string;

  // Basic track info
  title: string;
  subtitle: string;
  description: string;
  coverImage: string;
  artist: string;
  releaseDate: string;
  duration: string;
  bpm: number;
  genre: string;
  ageRange: string;
  mood: string;
  routine: 'Playtime' | 'Bedtime' | 'Mealtime' | 'Cleanup' | 'Transition' | 'Learning' | 'Celebration' | 'Movement';

  // International codes
  isrc: string; // International Standard Recording Code
  upc: string;  // Universal Product Code (album)

  // Album info
  album: string;
  albumUrl: string;

  // Streaming URLs
  spotifyUrl: string;
  appleMusicUrl: string;
  youtubeUrl: string;
  amazonUrl?: string;
  otherUrl?: string; // Link to push.fm or other streaming platforms

  // Lyrics (preview array for display, full text for SEO/lyrics page)
  lyricsPreview: string[];
  lyricsFull: string;

  // Educational content
  educationalBenefits: {
    title: string;
    description: string;
  }[];

  // Artist insights
  artistNote: string;

  // Related tracks (by id)
  relatedTracks: number[];

  // Complete SEO metadata
  seo: {
    title: string;
    description: string;
    keywords: string;
    canonical: string;
    ogImage: string;
  };

  // Schema.org structured data
  trackSchema: {
    '@context': string;
    '@type': string;
    '@id': string;
    name: string;
    url: string;
    duration: string;
    genre: string;
    byArtist: {
      '@type': string;
      name: string;
    };
    inAlbum: {
      '@type': string;
      name: string;
      '@id': string;
    };
    datePublished: string;
    isrcCode: string;
    description: string;
    image: string;
  };
}`;

const TRACK_FUNCTIONS = `
export function getTrackBySlug(slug: string): Track | undefined {
  return tracks.find(track => track.slug === slug);
}

export function getTrackById(id: number): Track | undefined {
  return tracks.find(track => track.id === id);
}

export function getTracksByAlbum(albumName: string): Track[] {
  return tracks.filter(track => track.album === albumName);
}

export function getAllTracks(): Track[] {
  return tracks;
}

export function getRelatedTracks(trackId: number): Track[] {
  const track = getTrackById(trackId);
  if (!track) return [];
  return track.relatedTracks.map(id => getTrackById(id)).filter((t): t is Track => t !== undefined);
}
`;

export function generateTracksFile(tracks: Track[]): string {
    const dataString = JSON.stringify(tracks, null, 2);
    return `${TRACK_INTERFACE}\n\nexport const tracks: Track[] = ${dataString};\n${TRACK_FUNCTIONS}`;
}
