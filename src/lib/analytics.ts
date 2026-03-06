import ReactGA from "react-ga4";

const GA_MEASUREMENT_ID = "G-LTK469WNN3";

export const initGA = () => {
  ReactGA.initialize(GA_MEASUREMENT_ID);
};

export const trackPageView = (path: string) => {
  ReactGA.send({ hitType: "pageview", page: path });
};

export const trackEvent = (category: string, action: string, label?: string, value?: number) => {
  ReactGA.event({
    category,
    action,
    label,
    value,
  });
};

// Predefined event categories for music website
export const EventCategories = {
  STREAMING: "Streaming",
  ALBUM_STREAMING: "Album Streaming",
  PLAYLIST_STREAMING: "Playlist Streaming",
  ENGAGEMENT: "Engagement",
  NAVIGATION: "Navigation",
  CONVERSION: "Conversion",
  SCROLL: "Scroll",
  TIME: "Time",
} as const;

// Predefined event actions
export const EventActions = {
  // Streaming actions
  SPOTIFY_CLICK: "Spotify Click",
  APPLE_MUSIC_CLICK: "Apple Music Click",
  YOUTUBE_CLICK: "YouTube Click",
  AMAZON_CLICK: "Amazon Click",
  OTHER_PLATFORM_CLICK: "Other Platform Click",

  // Engagement actions
  PLAY_EMBEDDED: "Play Embedded",
  SCROLL_25: "25% Scroll",
  SCROLL_50: "50% Scroll",
  SCROLL_75: "75% Scroll",
  SCROLL_90: "90% Scroll",
  TIME_30S: "30s on Page",
  TIME_60S: "60s on Page",
  TIME_120S: "2min on Page",

  // Conversion actions
  NEWSLETTER_SIGNUP: "Newsletter Signup",
  SHARE_CLICK: "Share Click",
  PRE_SAVE_CLICK: "Pre-Save Click",
} as const;
