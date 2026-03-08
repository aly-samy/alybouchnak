import fs from 'fs';
import { albums } from './src/data/albums.ts';
import { tracks } from './src/data/tracks.ts';
import { playlists } from './src/data/playlists.ts';

function findTrackBy(slug, title) {
    if (!slug && !title) return null;
    let match = tracks.find(t => t.slug === slug);
    if (!match) match = tracks.find(t => t.title.toLowerCase() === title?.toLowerCase());
    if (!match && title) {
        match = tracks.find(t => title.toLowerCase().includes(t.title.toLowerCase().split(' ')[0]));
    }
    return match ? match.id : null;
}

const albumsInterface = `export interface Album {
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
  otherUrl?: string;
  trackCount: number;
  duration: string;
  upc: string;
  educationalBenefits: { title: string; description: string; }[];
  artistNote?: string;
  curatorNote?: string;
  scienceFramework?: string;
  trackIds?: number[];
  relatedAlbums?: { id: number; title: string; cover: string; description: string; link: string; }[];
  id?: number;
  type?: string;
  date?: string;
  image?: string;
  link?: string;
  status?: 'available' | 'coming-soon';
  lyrics?: string;
  albumSchema?: any;
}`;

const albumsCode = albums.map(a => {
    let tIds = [];
    if (a.tracks) {
        for (const t of a.tracks as any) {
            const id = findTrackBy(t.slug, t.title);
            if (id) tIds.push(id);
            else console.log("Missing Album track:", t.title, t.slug);
        }
    }
    const newA = { ...a, trackIds: tIds } as any;
    delete newA.tracks;
    return newA;
});

const albumsFile = albumsInterface + "\n\nexport const albums: Album[] = " + JSON.stringify(albumsCode, null, 2) + `;\n
export function getAlbumBySlug(slug: string): Album | undefined { return albums.find(album => album.slug === slug); }
export function getAllAlbums(): Album[] { return albums; }
`;

fs.writeFileSync('./src/data/albums.ts', albumsFile);

const playlistsInterface = `export interface Playlist {
  id?: number;
  slug: string;
  title: string;
  subtitle: string;
  description: string;
  coverImage: string;
  artist: string;
  status: 'available' | 'coming-soon';
  genre: string;
  ageRange: string;
  mood: string;
  curatorNote?: string;
  spotifyUrl: string;
  youtubeUrl: string;
  trackCount: number;
  duration: string;
  educationalBenefits: { title: string; description: string; }[];
  tracks?: { trackId?: number; title?: string; duration?: string; description?: string; link?: string; }[];
  type?: string;
  date?: string;
  image?: string;
  link?: string;
}`;

const playlistsCode = playlists.map(p => {
    let tIds = [];
    if (p.tracks) {
        for (const t of p.tracks as any) {
            const id = findTrackBy(t.slug, t.title);
            if (id) tIds.push({ trackId: id });
            else {
                console.log("Playlists: missing track (may be external)", t.title, t.slug);
                tIds.push({ title: t.title, duration: t.duration, description: t.description, link: t.link || "" });
            }
        }
    }
    const newP = { ...p, tracks: tIds };
    return newP;
});

const playlistsFile = playlistsInterface + "\n\nexport const playlists: Playlist[] = " + JSON.stringify(playlistsCode, null, 2) + `;\n
export function getPlaylistBySlug(slug: string): Playlist | undefined { return playlists.find(playlist => playlist.slug === slug); }
export function getAllPlaylists(): Playlist[] { return playlists; }
`;

fs.writeFileSync('./src/data/playlists.ts', playlistsFile);
console.log("Migration Complete.");
