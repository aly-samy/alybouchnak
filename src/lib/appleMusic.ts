/**
 * Apple MusicKit JS Integration
 * Provides Apple Music playback and data fetching capabilities
 * 
 * Note: MusicKit requires:
 * 1. Apple Developer account
 * 2. MusicKit JS library loaded from Apple's CDN
 * 3. Developer token generated on your server
 * 
 * For production, the developer token should be generated server-side
 * and fetched via API. The token below is a placeholder.
 */

// Apple MusicKit types
declare global {
  interface Window {
    MusicKit: typeof MusicKit;
  }
}

// MusicKit Configuration
const MUSICKIT_CONFIG = {
  // This should be your actual Apple Developer Token
  // Generate this server-side in production!
  developerToken: import.meta.env.VITE_APPLE_MUSIC_DEVELOPER_TOKEN || '',
  app: {
    name: 'Aly Bouchnak',
    build: '1.0.0',
  },
};

// MusicKit instance
let musicKitInstance: MusicKit.MusicKitInstance | null = null;

/**
 * Load MusicKit JS from Apple's CDN
 */
export function loadMusicKitScript(): Promise<void> {
  return new Promise((resolve, reject) => {
    // Check if already loaded
    if (window.MusicKit) {
      resolve();
      return;
    }

    // Check if script is already being loaded
    const existingScript = document.getElementById('musickit-js');
    if (existingScript) {
      existingScript.addEventListener('load', () => resolve());
      existingScript.addEventListener('error', () => reject(new Error('Failed to load MusicKit')));
      return;
    }

    // Create and load script
    const script = document.createElement('script');
    script.id = 'musickit-js';
    script.src = 'https://js-cdn.music.apple.com/musickit/v3/musickit.js';
    script.async = true;
    script.onload = () => resolve();
    script.onerror = () => reject(new Error('Failed to load MusicKit JS'));
    document.head.appendChild(script);
  });
}

/**
 * Initialize MusicKit instance
 */
export async function initializeMusicKit(): Promise<MusicKit.MusicKitInstance | null> {
  if (musicKitInstance) {
    return musicKitInstance;
  }

  // Check if developer token is configured
  if (!MUSICKIT_CONFIG.developerToken) {
    console.warn('Apple Music developer token not configured');
    return null;
  }

  try {
    await loadMusicKitScript();

    if (!window.MusicKit) {
      throw new Error('MusicKit not available');
    }

    musicKitInstance = await window.MusicKit.configure({
      developerToken: MUSICKIT_CONFIG.developerToken,
      app: MUSICKIT_CONFIG.app,
    });

    return musicKitInstance;
  } catch (error) {
    console.error('Error initializing MusicKit:', error);
    return null;
  }
}

/**
 * Search for songs on Apple Music
 */
export async function searchAppleMusic(
  query: string,
  types: ('songs' | 'albums' | 'artists')[] = ['songs'],
  limit: number = 10
): Promise<MusicKit.Resource[]> {
  const musicKit = await initializeMusicKit();
  if (!musicKit) {
    return [];
  }

  try {
    const results = await musicKit.api.music('/v1/catalog/us/search', {
      term: query,
      types: types.join(','),
      limit: limit.toString(),
    });

    // Flatten results from different types
    const resources: MusicKit.Resource[] = [];
    types.forEach(type => {
      const typeResults = results.data?.results?.[type]?.data;
      if (typeResults) {
        resources.push(...typeResults);
      }
    });

    return resources;
  } catch (error) {
    console.error('Error searching Apple Music:', error);
    return [];
  }
}

/**
 * Get song by ID
 */
export async function getAppleMusicSong(songId: string): Promise<MusicKit.Resource | null> {
  const musicKit = await initializeMusicKit();
  if (!musicKit) {
    return null;
  }

  try {
    const result = await musicKit.api.music(`/v1/catalog/us/songs/${songId}`);
    return result.data?.data?.[0] || null;
  } catch (error) {
    console.error('Error fetching Apple Music song:', error);
    return null;
  }
}

/**
 * Get album by ID
 */
export async function getAppleMusicAlbum(albumId: string): Promise<MusicKit.Resource | null> {
  const musicKit = await initializeMusicKit();
  if (!musicKit) {
    return null;
  }

  try {
    const result = await musicKit.api.music(`/v1/catalog/us/albums/${albumId}`);
    return result.data?.data?.[0] || null;
  } catch (error) {
    console.error('Error fetching Apple Music album:', error);
    return null;
  }
}

/**
 * Play a song by ID
 * Note: This requires user authorization
 */
export async function playAppleMusicSong(songId: string): Promise<boolean> {
  const musicKit = await initializeMusicKit();
  if (!musicKit) {
    return false;
  }

  try {
    // Check if user is authorized
    if (musicKit.isAuthorized) {
      await musicKit.setQueue({ song: songId });
      await musicKit.play();
      return true;
    } else {
      // Request authorization
      await musicKit.authorize();
      await musicKit.setQueue({ song: songId });
      await musicKit.play();
      return true;
    }
  } catch (error) {
    console.error('Error playing Apple Music song:', error);
    return false;
  }
}

/**
 * Play an album by ID
 */
export async function playAppleMusicAlbum(albumId: string): Promise<boolean> {
  const musicKit = await initializeMusicKit();
  if (!musicKit) {
    return false;
  }

  try {
    if (musicKit.isAuthorized) {
      await musicKit.setQueue({ album: albumId });
      await musicKit.play();
      return true;
    } else {
      await musicKit.authorize();
      await musicKit.setQueue({ album: albumId });
      await musicKit.play();
      return true;
    }
  } catch (error) {
    console.error('Error playing Apple Music album:', error);
    return false;
  }
}

/**
 * Get playback state
 */
export function getPlaybackState(): MusicKit.PlaybackStates | null {
  return musicKitInstance?.playbackState || null;
}

/**
 * Check if MusicKit is available
 */
export function isMusicKitAvailable(): boolean {
  return !!window.MusicKit && !!MUSICKIT_CONFIG.developerToken;
}

/**
 * Extract Apple Music ID from URL
 */
export function extractAppleMusicId(url: string): string | null {
  // Handle various Apple Music URL formats
  const patterns = [
    /music\.apple\.com\/.+?\/(?:song|album)\/[^/]+\/(\d+)/,
    /itunes\.apple\.com\/.+?\/(?:song|album)\/[^/]+\/(\d+)/,
  ];

  for (const pattern of patterns) {
    const match = url.match(pattern);
    if (match) {
      return match[1];
    }
  }

  return null;
}

// Re-export MusicKit types
export type { MusicKit };
