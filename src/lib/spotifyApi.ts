/**
 * Spotify Web API Service
 * Fetches play counts, artist info, and other data from Spotify
 * Note: This uses the Client Credentials flow which doesn't require user login
 * but has limited access (no user data, no private playlists)
 */

const SPOTIFY_CLIENT_ID = import.meta.env.VITE_SPOTIFY_CLIENT_ID || '';
const SPOTIFY_CLIENT_SECRET = import.meta.env.VITE_SPOTIFY_CLIENT_SECRET || '';

interface SpotifyToken {
  access_token: string;
  token_type: string;
  expires_in: number;
}

interface SpotifyArtist {
  id: string;
  name: string;
  popularity: number;
  followers: {
    total: number;
  };
  genres: string[];
  images: {
    url: string;
    height: number;
    width: number;
  }[];
  external_urls: {
    spotify: string;
  };
}

interface SpotifyTrack {
  id: string;
  name: string;
  popularity: number;
  duration_ms: number;
  explicit: boolean;
  preview_url: string | null;
  album: {
    id: string;
    name: string;
    images: {
      url: string;
      height: number;
      width: number;
    }[];
  };
  artists: {
    id: string;
    name: string;
  }[];
  external_urls: {
    spotify: string;
  };
}

interface SpotifyAlbum {
  id: string;
  name: string;
  popularity: number;
  total_tracks: number;
  release_date: string;
  images: {
    url: string;
    height: number;
    width: number;
  }[];
  external_urls: {
    spotify: string;
  };
}

// Cache for access token
let cachedToken: string | null = null;
let tokenExpiry: number = 0;

/**
 * Get Spotify access token using Client Credentials flow
 */
async function getAccessToken(): Promise<string> {
  // Return cached token if still valid
  if (cachedToken && Date.now() < tokenExpiry) {
    return cachedToken;
  }

  // Check if credentials are available
  if (!SPOTIFY_CLIENT_ID || !SPOTIFY_CLIENT_SECRET) {
    console.warn('Spotify API credentials not configured');
    throw new Error('Spotify credentials not configured');
  }

  try {
    const response = await fetch('https://accounts.spotify.com/api/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': 'Basic ' + btoa(SPOTIFY_CLIENT_ID + ':' + SPOTIFY_CLIENT_SECRET),
      },
      body: 'grant_type=client_credentials',
    });

    if (!response.ok) {
      throw new Error(`Failed to get token: ${response.status}`);
    }

    const data: SpotifyToken = await response.json();
    cachedToken = data.access_token;
    tokenExpiry = Date.now() + (data.expires_in * 1000) - 60000; // Expire 1 min early
    return cachedToken;
  } catch (error) {
    console.error('Error getting Spotify access token:', error);
    throw error;
  }
}

/**
 * Make authenticated request to Spotify API
 */
async function spotifyRequest<T>(endpoint: string): Promise<T | null> {
  try {
    const token = await getAccessToken();
    const response = await fetch(`https://api.spotify.com/v1${endpoint}`, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      if (response.status === 404) {
        return null; // Item not found
      }
      throw new Error(`Spotify API error: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error(`Error fetching from Spotify API (${endpoint}):`, error);
    return null;
  }
}

/**
 * Get artist information by Spotify ID
 */
export async function getArtist(artistId: string): Promise<SpotifyArtist | null> {
  return spotifyRequest<SpotifyArtist>(`/artists/${artistId}`);
}

/**
 * Get track information by Spotify ID
 */
export async function getTrack(trackId: string): Promise<SpotifyTrack | null> {
  return spotifyRequest<SpotifyTrack>(`/tracks/${trackId}`);
}

/**
 * Get album information by Spotify ID
 */
export async function getAlbum(albumId: string): Promise<SpotifyAlbum | null> {
  return spotifyRequest<SpotifyAlbum>(`/albums/${albumId}`);
}

/**
 * Get artist's top tracks
 */
export async function getArtistTopTracks(artistId: string, market: string = 'US'): Promise<SpotifyTrack[]> {
  const data = await spotifyRequest<{ tracks: SpotifyTrack[] }>(`/artists/${artistId}/top-tracks?market=${market}`);
  return data?.tracks || [];
}

/**
 * Search for tracks, albums, or artists
 */
export async function searchSpotify(
  query: string,
  type: 'track' | 'album' | 'artist' | 'playlist' = 'track',
  limit: number = 10
): Promise<{
  tracks?: { items: SpotifyTrack[] };
  albums?: { items: SpotifyAlbum[] };
  artists?: { items: SpotifyArtist[] };
}> {
  return spotifyRequest(`\/search?q=${encodeURIComponent(query)}&type=${type}&limit=${limit}`) || {};
}

/**
 * Extract Spotify ID from various URL formats
 */
export function extractSpotifyId(url: string): string | null {
  // Handle various Spotify URL formats
  const patterns = [
    /spotify\.com\/(?:track|album|artist)\/([a-zA-Z0-9]+)/,
    /open\.spotify\.com\/(?:track|album|artist)\/([a-zA-Z0-9]+)/,
    /spotify:([a-zA-Z0-9]+)/,
  ];

  for (const pattern of patterns) {
    const match = url.match(pattern);
    if (match) {
      return match[1];
    }
  }

  return null;
}

/**
 * Format play count for display (e.g., 1.2M, 850K)
 * Note: Spotify API doesn't provide exact play counts via Client Credentials
 * This is a placeholder for when you have access to that data
 */
export function formatPlayCount(count: number): string {
  if (count >= 1000000) {
    return (count / 1000000).toFixed(1) + 'M';
  } else if (count >= 1000) {
    return (count / 1000).toFixed(1) + 'K';
  }
  return count.toString();
}

/**
 * Get artist bio from Wikipedia or other sources
 * Since Spotify doesn't provide bios, we'll use a placeholder
 * In production, you might want to integrate with Wikipedia API or MusicBrainz
 */
export async function getArtistBio(artistName: string): Promise<string | null> {
  // This is a placeholder - in production, integrate with Wikipedia or MusicBrainz
  // For now, return null to use the bio from your data files
  return null;
}

// Export types
export type { SpotifyArtist, SpotifyTrack, SpotifyAlbum };
