import ReactPixel from "react-facebook-pixel";

const PIXEL_ID = '1414638306797082';

export const initPixel = () => {
  ReactPixel.init(PIXEL_ID);
};

export const trackPixelPageView = () => {
  ReactPixel.pageView();
};

export const trackPixelEvent = (event: string, data?: Record<string, unknown>) => {
  ReactPixel.track(event, data);
};

// Predefined Facebook Pixel events for music website
export const PixelEvents = {
  // Standard events
  VIEW_CONTENT: "ViewContent",
  SEARCH: "Search",
  ADD_TO_CART: "AddToCart",
  PURCHASE: "Purchase",
  LEAD: "Lead",
  COMPLETE_REGISTRATION: "CompleteRegistration",

  // Custom events for music
  STREAM_CLICK: "StreamClick",
  ALBUM_VIEW: "AlbumView",
  TRACK_VIEW: "TrackView",
  SHARE: "Share",
  ENGAGEMENT: "Engagement",
} as const;

// Helper to track content view for retargeting
export const trackContentView = (contentName: string, contentType: "track" | "album" | "page" | "playlist" | "theme-collection" | "article") => {
  trackPixelEvent(PixelEvents.VIEW_CONTENT, {
    content_name: contentName,
    content_type: contentType,
  });
};

// Helper to track streaming clicks as Lead (for conversion optimization)
export const trackStreamClick = (platform: string, contentName: string, contentType: "track" | "album" | "playlist" | "theme-collection") => {
  trackPixelEvent(PixelEvents.LEAD, {
    content_name: contentName,
    content_type: contentType,
    platform: platform,
  });
};

// Helper to track newsletter signup as CompleteRegistration
export const trackNewsletterSignup = (email?: string) => {
  trackPixelEvent(PixelEvents.COMPLETE_REGISTRATION, {
    content_name: "Newsletter Signup",
    ...(email && { email: email }),
  });
};
