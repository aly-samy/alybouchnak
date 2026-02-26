import { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { 
  Play, 
  Music, 
  Clock, 
  Activity, 
  Users, 
  Zap, 
  Sun, 
  ExternalLink,
  Youtube,
  Music2,
  Link2
} from 'lucide-react';
import Navigation from '../sections/Navigation';
import Footer from '../sections/Footer';
import SEO from '../components/SEO';
import Breadcrumbs from '../components/Breadcrumbs';
import { getTrackBySlug } from '../data/tracks';
import type { Track } from '../data/tracks';
import { trackEvent, EventCategories, EventActions } from '../lib/analytics';
import { trackStreamClick, trackContentView } from '../lib/pixel';
import { useEngagementTracking } from '../hooks/useEngagementTracking';

gsap.registerPlugin(ScrollTrigger);

// Spotify icon component
const SpotifyIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z"/>
  </svg>
);

// Apple Music icon component
const AppleMusicIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M23.994 6.124a9.23 9.23 0 00-.24-2.19c-.317-1.31-1.062-2.31-2.18-3.043a5.022 5.022 0 00-1.877-.726 10.496 10.496 0 00-1.564-.15c-.04-.003-.083-.01-.124-.013H5.986c-.152.01-.303.017-.455.026-.747.043-1.49.123-2.206.313-1.52.42-2.62 1.29-3.29 2.767-.363.79-.54 1.63-.564 2.496-.01.143-.017.287-.018.43V17.9c.01.146.017.293.027.44.043.724.123 1.444.31 2.14.42 1.52 1.29 2.62 2.77 3.29.79.363 1.63.54 2.5.564.143.01.287.017.43.018h12.06c.146-.01.293-.017.44-.027.724-.043 1.444-.123 2.14-.31 1.52-.42 2.62-1.29 3.29-2.77.363-.79.54-1.63.564-2.5.01-.143.017-.287.018-.43V6.554c-.01-.146-.017-.293-.027-.44zm-6.24 10.79V8.36c0-.23-.07-.45-.2-.63-.26-.35-.7-.52-1.14-.44l-5.7.98c-.48.08-.81.51-.81 1v8.14c-.88-.53-1.96-.76-3.1-.55-1.78.33-3.05 1.8-3.05 3.6 0 2.05 1.68 3.7 3.74 3.7 1.74 0 3.2-1.2 3.62-2.82.1-.38.15-.78.15-1.19v-6.7l4.26-.73v5.35c-.88-.52-1.95-.75-3.09-.54-1.78.33-3.05 1.8-3.05 3.6 0 2.05 1.68 3.7 3.74 3.7 1.88 0 3.43-1.39 3.69-3.2.04-.28.07-.56.07-.85z"/>
  </svg>
);

function DynamicTrackPage() {
  const { slug } = useParams<{ slug: string }>();
  const trackData = getTrackBySlug(slug || '') as Track;
  
  const heroRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  // Track engagement metrics
  useEngagementTracking(trackData?.title || 'Track Page');

  // Helper to check if track is released (has valid streaming URL, not placeholder)
  const isReleased = trackData && trackData.spotifyUrl && !trackData.spotifyUrl.includes('placeholder');
  const hasPreSaveLink = trackData && trackData.otherUrl && !trackData.otherUrl.includes('placeholder');

  useEffect(() => {
    if (!trackData) return;

    // Track content view for retargeting
    trackContentView(trackData.title, "track");

    // Hero section animation
    gsap.fromTo(heroRef.current, 
      { opacity: 0, y: 50 },
      { opacity: 1, y: 0, duration: 1, ease: 'power3.out' }
    );

    // Content sections animation
    gsap.fromTo(contentRef.current?.children || [], 
      { opacity: 0, y: 30 },
      { 
        opacity: 1, 
        y: 0, 
        duration: 0.8, 
        stagger: 0.2, 
        ease: 'power2.out',
        scrollTrigger: {
          trigger: contentRef.current,
          start: 'top 80%'
        }
      }
    );
  }, [trackData]);

  if (!trackData) {
    return (
      <div className="relative min-h-screen bg-[#C8F0F7]">
        <Navigation />
        <div className="pt-32 pb-16 text-center">
          <h1 className="font-['Fredoka_One'] text-4xl text-[#101010] mb-4">
            Track Not Found
          </h1>
          <p className="text-lg text-[#2A2A2A]">
            The track you're looking for doesn't exist.
          </p>
        </div>
        <Footer />
      </div>
    );
  }

  // Schema.org structured data from track data
  const trackSchema = trackData.trackSchema;

  return (
    <div className="relative min-h-screen bg-[#C8F0F7]">
      <SEO
        title={trackData.seo.title}
        description={trackData.seo.description}
        keywords={trackData.seo.keywords}
        canonical={trackData.seo.canonical}
        ogImage={trackData.seo.ogImage}
        ogType="music.song"
        schemaData={trackSchema}
      />

      {/* Grain overlay */}
      <div className="grain-overlay" />

      <Navigation />
      <Breadcrumbs />

      {/* Hero Section */}
      <div ref={heroRef} className="pt-28 pb-12 lg:pt-32 lg:pb-16">
        <div className="w-full px-4 sm:px-6 lg:px-8 xl:px-12">
          <div className="max-w-6xl mx-auto">
            <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-start">
              {/* Cover Art */}
              <div className="w-full max-w-sm mx-auto lg:mx-0 flex-shrink-0">
                <div className="relative aspect-square rounded-3xl overflow-hidden shadow-2xl">
                  <img
                    src={trackData.coverImage}
                    alt={`${trackData.title} track cover`}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <button 
                      onClick={() => setIsPlaying(!isPlaying)}
                      className="w-20 h-20 bg-white/90 rounded-full flex items-center justify-center hover:scale-110 transition-transform duration-200 shadow-lg"
                    >
                      <Play className="w-8 h-8 text-[#101010] ml-1" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Track Info */}
              <div className="flex-1 text-center lg:text-left">
                <div className="mb-4">
                  <span className="inline-flex items-center gap-2 px-4 py-2 bg-[#F26B3A] text-white text-sm font-semibold rounded-full">
                    <Music2 className="w-4 h-4" />
                    {trackData.genre}
                  </span>
                </div>
                
                <h1 className="font-['Fredoka_One'] text-4xl sm:text-5xl lg:text-6xl text-[#101010] mb-4">
                  {trackData.title}
                </h1>
                
                <p className="text-lg sm:text-xl text-[#2A2A2A] mb-6 font-medium">
                  {trackData.subtitle}
                </p>
                
                <p className="text-base sm:text-lg text-[#2A2A2A]/80 mb-8 max-w-2xl">
                  {trackData.description}
                </p>

                {/* Track Metadata */}
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
                  <div className="text-center p-3 bg-white/60 rounded-2xl">
                    <Clock className="w-5 h-5 text-[#F26B3A] mx-auto mb-1" />
                    <div className="text-xs text-[#2A2A2A]/60">Duration</div>
                    <div className="text-sm font-semibold text-[#101010]">{trackData.duration}</div>
                  </div>
                  <div className="text-center p-3 bg-white/60 rounded-2xl">
                    <Activity className="w-5 h-5 text-[#F26B3A] mx-auto mb-1" />
                    <div className="text-xs text-[#2A2A2A]/60">BPM</div>
                    <div className="text-sm font-semibold text-[#101010]">{trackData.bpm}</div>
                  </div>
                  <div className="text-center p-3 bg-white/60 rounded-2xl">
                    <Users className="w-5 h-5 text-[#F26B3A] mx-auto mb-1" />
                    <div className="text-xs text-[#2A2A2A]/60">Age</div>
                    <div className="text-sm font-semibold text-[#101010]">{trackData.ageRange}</div>
                  </div>
                  <div className="text-center p-3 bg-white/60 rounded-2xl">
                    <Sun className="w-5 h-5 text-[#F26B3A] mx-auto mb-1" />
                    <div className="text-xs text-[#2A2A2A]/60">Mood</div>
                    <div className="text-sm font-semibold text-[#101010]">{trackData.mood}</div>
                  </div>
                  <div className="text-center p-3 bg-white/60 rounded-2xl">
                    <Music className="w-5 h-5 text-[#F26B3A] mx-auto mb-1" />
                    <div className="text-xs text-[#2A2A2A]/60">Album</div>
                    <div className="text-sm font-semibold text-[#101010]">{trackData.album.split(':')[0]}</div>
                  </div>
                  <div className="text-center p-3 bg-white/60 rounded-2xl">
                    <Zap className="w-5 h-5 text-[#F26B3A] mx-auto mb-1" />
                    <div className="text-xs text-[#2A2A2A]/60">Released</div>
                    <div className="text-sm font-semibold text-[#101010]">{new Date(trackData.releaseDate).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}</div>
                  </div>
                </div>

                {/* International Codes */}
                <div className="flex flex-wrap gap-4 justify-center lg:justify-start mb-6">
                  <div className="px-4 py-2 bg-[#F7E859]/40 rounded-lg border border-[#F7E859]">
                    <span className="text-xs text-[#2A2A2A]/60">ISRC</span>
                    <div className="text-sm font-mono font-semibold text-[#101010]">{trackData.isrc}</div>
                  </div>
                  <div className="px-4 py-2 bg-[#C8F0F7]/60 rounded-lg border border-[#C8F0F7]">
                    <span className="text-xs text-[#2A2A2A]/60">UPC</span>
                    <div className="text-sm font-mono font-semibold text-[#101010]">{trackData.upc}</div>
                  </div>
                  <div className="px-4 py-2 bg-[#F26B3A]/10 rounded-lg border border-[#F26B3A]/20">
                    <span className="text-xs text-[#2A2A2A]/60">Routine</span>
                    <div className="text-sm font-semibold text-[#101010]">{trackData.routine}</div>
                  </div>
                </div>

                {/* Streaming Links - Show Pre-Save/Coming Soon if not released */}
                {isReleased ? (
                  <>
                    {/* Main Spotify Link + Other Platforms */}
                    <div className="flex flex-col sm:flex-row items-center gap-4">
                      {/* Main Spotify Button */}
                      <a
                        href={trackData.spotifyUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={() => {
                          trackEvent(EventCategories.STREAMING, EventActions.SPOTIFY_CLICK, trackData.title);
                          trackStreamClick("Spotify", trackData.title, "track");
                        }}
                        className="inline-flex items-center gap-2 px-8 py-4 bg-[#1DB954] text-white font-bold rounded-full hover:bg-[#1ed760] transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                      >
                        <SpotifyIcon className="w-6 h-6" />
                        Listen on Spotify
                        <ExternalLink className="w-4 h-4" />
                      </a>

                      {/* Other Platforms - Hover Expand */}
                      <div className="flex items-center gap-2 group">
                        <span className="text-sm text-white/70 mr-2">Also on:</span>
                        
                        {/* Apple Music */}
                        <a
                          href={trackData.appleMusicUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={() => {
                            trackEvent(EventCategories.STREAMING, EventActions.APPLE_MUSIC_CLICK, trackData.title);
                            trackStreamClick("Apple Music", trackData.title, "track");
                          }}
                          className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-all duration-300 overflow-hidden group-hover:w-auto group-hover:px-4"
                          title="Apple Music"
                        >
                          <AppleMusicIcon className="w-5 h-5 text-white flex-shrink-0" />
                          <span className="max-w-0 overflow-hidden group-hover:max-w-[100px] group-hover:ml-2 text-white text-sm whitespace-nowrap transition-all duration-300">Apple Music</span>
                        </a>

                        {/* YouTube */}
                        <a
                          href={trackData.youtubeUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={() => {
                            trackEvent(EventCategories.STREAMING, EventActions.YOUTUBE_CLICK, trackData.title);
                            trackStreamClick("YouTube", trackData.title, "track");
                          }}
                          className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-all duration-300 overflow-hidden group-hover:w-auto group-hover:px-4"
                          title="YouTube Music"
                        >
                          <Youtube className="w-5 h-5 text-white flex-shrink-0" />
                          <span className="max-w-0 overflow-hidden group-hover:max-w-[100px] group-hover:ml-2 text-white text-sm whitespace-nowrap transition-all duration-300">YouTube</span>
                        </a>

                        {/* Amazon Music */}
                        {trackData.amazonUrl && !trackData.amazonUrl.includes('placeholder') && (
                          <a
                            href={trackData.amazonUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={() => {
                              trackEvent(EventCategories.STREAMING, EventActions.AMAZON_CLICK, trackData.title);
                              trackStreamClick("Amazon", trackData.title, "track");
                            }}
                            className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-all duration-300 overflow-hidden group-hover:w-auto group-hover:px-4"
                            title="Amazon Music"
                          >
                            <Music className="w-5 h-5 text-[#F26B3A] flex-shrink-0" />
                            <span className="max-w-0 overflow-hidden group-hover:max-w-[100px] group-hover:ml-2 text-white text-sm whitespace-nowrap transition-all duration-300">Amazon</span>
                          </a>
                        )}

                        {/* Other Platforms (Push.fm) */}
                        {trackData.otherUrl && !trackData.otherUrl.includes('placeholder') && (
                          <a
                            href={trackData.otherUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={() => {
                              trackEvent(EventCategories.STREAMING, EventActions.OTHER_PLATFORM_CLICK, trackData.title);
                              trackStreamClick("Other Platforms", trackData.title, "track");
                            }}
                            className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-all duration-300 overflow-hidden group-hover:w-auto group-hover:px-4"
                            title="More Platforms"
                          >
                            <Link2 className="w-5 h-5 text-white flex-shrink-0" />
                            <span className="max-w-0 overflow-hidden group-hover:max-w-[100px] group-hover:ml-2 text-white text-sm whitespace-nowrap transition-all duration-300">More</span>
                          </a>
                        )}
                      </div>
                    </div>
                  </>
                ) : hasPreSaveLink ? (
                  /* Pre-Save Button - Link to Push.fm */
                  <div className="flex flex-col items-center gap-3">
                    <a
                      href={trackData.otherUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => {
                        trackEvent(EventCategories.CONVERSION, EventActions.PRE_SAVE_CLICK, trackData.title);
                      }}
                      className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-[#F26B3A] to-[#F7E859] text-white font-bold rounded-full hover:shadow-xl transition-all duration-200 transform hover:-translate-y-1"
                    >
                      <Music2 className="w-6 h-6" />
                      Pre-Save on Spotify
                      <ExternalLink className="w-4 h-4" />
                    </a>
                    <span className="text-sm text-white/60">Be the first to hear it when it drops!</span>
                  </div>
                ) : (
                  /* Coming Soon - Inactive Button */
                  <div className="flex flex-col items-center gap-3">
                    <button
                      disabled
                      className="inline-flex items-center gap-2 px-8 py-4 bg-white/20 text-white/50 font-bold rounded-full cursor-not-allowed"
                    >
                      <Music2 className="w-6 h-6" />
                      Coming Soon
                    </button>
                    <span className="text-sm text-white/60">This track will be available soon</span>
                  </div>
                )}

                {/* Social Share Buttons */}
                <div className="flex items-center gap-3 pt-4 border-t border-white/10">
                  <span className="text-sm text-white/70">Share:</span>
                  <button
                    onClick={() => {
                      trackEvent(EventCategories.CONVERSION, EventActions.SHARE_CLICK, "Twitter");
                      const url = encodeURIComponent(window.location.href);
                      const text = encodeURIComponent(`Check out "${trackData.title}" by Aly Bouchnak!`);
                      window.open(`https://twitter.com/intent/tweet?url=${url}&text=${text}`, '_blank');
                    }}
                    className="w-9 h-9 rounded-full bg-[#1DA1F2]/20 hover:bg-[#1DA1F2] text-[#1DA1F2] hover:text-white flex items-center justify-center transition-all duration-200"
                    title="Share on X/Twitter"
                  >
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
                  </button>
                  <button
                    onClick={() => {
                      trackEvent(EventCategories.CONVERSION, EventActions.SHARE_CLICK, "Facebook");
                      const url = encodeURIComponent(window.location.href);
                      window.open(`https://www.facebook.com/sharer/sharer.php?u=${url}`, '_blank');
                    }}
                    className="w-9 h-9 rounded-full bg-[#4267B2]/20 hover:bg-[#4267B2] text-[#4267B2] hover:text-white flex items-center justify-center transition-all duration-200"
                    title="Share on Facebook"
                  >
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
                  </button>
                  <button
                    onClick={() => {
                      trackEvent(EventCategories.CONVERSION, EventActions.SHARE_CLICK, "LinkedIn");
                      const url = encodeURIComponent(window.location.href);
                      window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${url}`, '_blank');
                    }}
                    className="w-9 h-9 rounded-full bg-[#0077B5]/20 hover:bg-[#0077B5] text-[#0077B5] hover:text-white flex items-center justify-center transition-all duration-200"
                    title="Share on LinkedIn"
                  >
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
                  </button>
                  <button
                    onClick={() => {
                      trackEvent(EventCategories.CONVERSION, EventActions.SHARE_CLICK, "Copy Link");
                      navigator.clipboard.writeText(window.location.href);
                      alert('Link copied to clipboard!');
                    }}
                    className="w-9 h-9 rounded-full bg-white/20 hover:bg-white text-white hover:text-[#101010] flex items-center justify-center transition-all duration-200"
                    title="Copy Link"
                  >
                    <Link2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Spotify Embed Section - Only show if released */}
      {isReleased && (
        <div className="bg-[#101010] py-8 px-4">
          <div className="max-w-4xl mx-auto">
            <div className="rounded-xl overflow-hidden shadow-2xl">
              <iframe
                src={`https://open.spotify.com/embed/track/${trackData.spotifyUrl.split('/').pop()?.split('?')[0]}`}
                width="100%"
                height="152"
                frameBorder="0"
                allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                loading="lazy"
                className="rounded-xl"
              />
            </div>
          </div>
        </div>
      )}

      {/* Content Sections */}
      <div ref={contentRef} className="relative">
        {/* Lyrics Section */}
        <section className="py-16 bg-white/60">
          <div className="w-full px-4 sm:px-6 lg:px-8 xl:px-12">
            <div className="max-w-4xl mx-auto">
              <h2 className="font-['Fredoka_One'] text-3xl sm:text-4xl text-[#101010] mb-8 text-center">
                Lyrics
              </h2>
              <div className="bg-white/80 rounded-3xl p-8 shadow-lg">
                <div className="space-y-4 text-center">
                  {trackData.lyricsPreview.map((line: string, index: number) => (
                    <p key={index} className="text-lg text-[#2A2A2A] leading-relaxed">
                      {line}
                    </p>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* About Section */}
        <section className="py-16 bg-gradient-to-b from-transparent to-[#F7E859]/20">
          <div className="w-full px-4 sm:px-6 lg:px-8 xl:px-12">
            <div className="max-w-4xl mx-auto">
              <h2 className="font-['Fredoka_One'] text-3xl sm:text-4xl text-[#101010] mb-8 text-center">
                About This Song
              </h2>
              <div className="bg-white/80 rounded-3xl p-8 shadow-lg">
                <p className="text-lg text-[#2A2A2A] leading-relaxed">
                  {trackData.description}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Educational Value */}
        <section className="py-16 bg-white/60">
          <div className="w-full px-4 sm:px-6 lg:px-8 xl:px-12">
            <div className="max-w-4xl mx-auto">
              <h2 className="font-['Fredoka_One'] text-3xl sm:text-4xl text-[#101010] mb-8 text-center">
                Educational Benefits
              </h2>
              <div className="grid sm:grid-cols-2 gap-6">
                {trackData.educationalBenefits.map((benefit, index) => (
                  <div key={index} className="bg-white/80 rounded-3xl p-6 shadow-lg">
                    <h3 className="font-semibold text-xl text-[#101010] mb-3">{benefit.title}</h3>
                    <p className="text-[#2A2A2A]">{benefit.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </div>

      <Footer />
    </div>
  );
}

export default DynamicTrackPage;
