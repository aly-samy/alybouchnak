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
    MusicKit: MusicKitNamespace;
  }
}

// MusicKit namespace definition
interface MusicKitNamespace {
  configure: (config: { developerToken: string; app: { name: string; build: string } }) => Promise<MusicKitInstance>;
  getInstance: () => MusicKitInstance;
  MusicKitInstance: MusicKitInstance;
}

interface MusicKitInstance {
  authorize: () => Promise<string>;
  isAuthorized: boolean;
  player: {
    play: () => Promise<void>;
    pause: () => Promise<void>;
    stop: () => Promise<void>;
    nowPlayingItem: MusicKitMediaItem | null;
    playbackState: number;
    addEventListener: (event: string, callback: () => void) => void;
    removeEventListener: (event: string, callback: () => void) => void;
  };
  api: {
    music: (path: string, options?: { term?: string; types?: string; limit?: string | number }) => Promise<{
      data: { results?: Record<string, { data: MusicKitMediaItem[] }>; data?: MusicKitMediaItem[] }
    }>;
  };
  setQueue: (options: { items: string[] | MusicKitMediaItem[] }) => Promise<void>;
  play: () => Promise<void>;
}

interface MusicKitMediaItem {
  id: string;
  type: string;
  attributes: {
    name: string;
    artistName: string;
    artwork?: { url: string };
    previews?: { url: string }[];
    url?: string;
  };
}

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
let musicKitInstance: MusicKitInstance | null = null;

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
export async function initializeMusicKit(): Promise<MusicKitInstance | null> {
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
): Promise<MusicKitMediaItem[]> {
  const musicKit = await initializeMusicKit();
  if (!musicKit) {
    return [];
  }

  try {
    const results = await musicKit.api.music('/v1/catalog/us/search', {
      term: query,
      types: types.join(','),
      limit,
    });

    // Flatten results from different types
    const resources: MusicKitMediaItem[] = [];
    const responseData = results.data?.results;
    types.forEach(type => {
      const typeResults = responseData?.[type as keyof typeof responseData]?.data as MusicKitMediaItem[] | undefined;
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
export async function getAppleMusicSong(songId: string): Promise<MusicKitMediaItem | null> {
  const musicKit = await initializeMusicKit();
  if (!musicKit) {
    return null;
  }

  try {
    const result = await musicKit.api.music(`/v1/catalog/us/songs/${songId}`);
    return (result.data?.data as MusicKitMediaItem[] | undefined)?.[0] || null;
  } catch (error) {
    console.error('Error fetching Apple Music song:', error);
    return null;
  }
}

/**
 * Get album by ID
 */
export async function getAppleMusicAlbum(albumId: string): Promise<MusicKitMediaItem | null> {
  const musicKit = await initializeMusicKit();
  if (!musicKit) {
    return null;
  }

  try {
    const result = await musicKit.api.music(`/v1/catalog/us/albums/${albumId}`);
    return (result.data?.data as MusicKitMediaItem[] | undefined)?.[0] || null;
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
      await musicKit.setQueue({ items: [songId] });
      await musicKit.play();
      return true;
    } else {
      // Request authorization
      await musicKit.authorize();
      await musicKit.setQueue({ items: [songId] });
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
      await musicKit.setQueue({ items: [albumId] });
      await musicKit.play();
      return true;
    } else {
      await musicKit.authorize();
      await musicKit.setQueue({ items: [albumId] });
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
export function getPlaybackState(): number | null {
  return musicKitInstance?.player?.playbackState || null;
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

// Re-export types
export type { MusicKitNamespace, MusicKitInstance, MusicKitMediaItem };
