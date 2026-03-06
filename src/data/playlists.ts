import type { Album } from './albums';

export interface Playlist extends Album {
    // Playlists share the same structure as Albums for now
}

export const playlists: Playlist[] = [];

export function getPlaylistBySlug(slug: string): Playlist | undefined {
    return playlists.find(playlist => playlist.slug === slug);
}

export function getAllPlaylists(): Playlist[] {
    return playlists;
}
