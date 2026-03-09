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
  Sun,
  Moon,
  ChevronDown,
  ExternalLink,
  Disc,
  Volume2,
  Heart,
  Link2,
  Music2
} from 'lucide-react';
import Navigation from '../sections/Navigation';
import Footer from '../sections/Footer';
import SEO from '../components/SEO';
import Breadcrumbs from '../components/Breadcrumbs';
import OptimizedImage from '../components/OptimizedImage';
import { getAlbumBySlug } from '../data/albums';
import { tracks as allTracksData } from '../data/tracks';
import type { Album } from '../data/albums';
import { Link } from 'react-router-dom';
import { trackEvent, EventCategories, EventActions } from '../lib/analytics';
import { trackStreamClick, trackContentView } from '../lib/pixel';
import { useEngagementTracking } from '../hooks/useEngagementTracking';

gsap.registerPlugin(ScrollTrigger);

function DynamicAlbumPage() {
  const { slug } = useParams<{ slug: string }>();
  const albumData = getAlbumBySlug(slug || '') as Album;

  const heroRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const [expandedTrack, setExpandedTrack] = useState<number | null>(null);
  const [currentSpotifyUrl, setCurrentSpotifyUrl] = useState<string | null>(null);

  // Helper to check if album is released (has valid streaming URL, not placeholder)
  const isReleased = albumData && albumData.spotifyUrl && !albumData.spotifyUrl.includes('placeholder');
  const hasPreSaveLink = albumData && albumData.otherUrl && !albumData.otherUrl.includes('placeholder');

  // Track engagement metrics
  useEngagementTracking(albumData?.title || 'Album Page');

  useEffect(() => {
    if (!albumData) return;

    // Track content view for retargeting
    trackContentView(albumData.title, "album");

    const ctx = gsap.context(() => {
      gsap.fromTo(heroRef.current,
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'power3.out',
        }
      );

      // Background parallax
      if (bgRef.current) {
        gsap.to(bgRef.current, {
          yPercent: 30,
          ease: 'none',
          scrollTrigger: {
            trigger: heroRef.current,
            start: 'top top',
            end: 'bottom top',
            scrub: true,
          },
        });
      }

      if (contentRef.current) {
        const sections = contentRef.current.querySelectorAll('.content-section');
        gsap.fromTo(sections,
          { y: 40, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.6,
            stagger: 0.15,
            scrollTrigger: {
              trigger: contentRef.current,
              start: 'top 80%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      }
    });

    return () => ctx.revert();
  }, [albumData]);

  if (!albumData) {
    return (
      <div className="relative min-h-screen bg-[#C8F0F7]">
        <Navigation />
        <div className="pt-32 pb-16 text-center">
          <h1 className="font-['Fredoka_One'] text-4xl text-[#101010] mb-4">Album Not Found</h1>
          <p className="text-lg text-[#2A2A2A]">The album you are looking for does not exist.</p>
        </div>
        <Footer />
      </div>
    );
  }

  const MoodIcon = albumData.mood === 'Calm' ? Moon : Sun;

  return (
    <div className="relative min-h-screen bg-[#C8F0F7]">
      <SEO
        title={`${albumData.title} | Aly Bouchnak`}
        description={albumData.description}
        keywords={`${albumData.title}, Aly Bouchnak, ${albumData.genre}, children's music, toddler songs, kids album`}
        ogImage={`https://alybouchnak.com${albumData.coverImage}`}
      />

      <Navigation />

      <main className="relative">
        {/* Blurred Parallax Background for Hero */}
        <div className="absolute top-0 left-0 right-0 h-[850px] lg:h-[700px] z-0 overflow-hidden">
          <div
            ref={bgRef}
            className="absolute inset-[-20%] bg-cover bg-center blur-2xl scale-125 opacity-70"
            style={{ backgroundImage: `url(${albumData.coverImage})` }}
          />
          <div className="absolute inset-0 bg-black/60" />
          <div className="absolute inset-x-0 bottom-0 h-64 bg-gradient-to-t from-[#C8F0F7] to-transparent" />
        </div>

        <div className="relative z-10 pt-20">
          <Breadcrumbs />

          {/* Hero Section */}
          <section ref={heroRef} className="relative px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
            <div className="max-w-6xl mx-auto">
              <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-start">
                {/* Album Cover */}
                <div className="w-full max-w-md mx-auto lg:mx-0 flex-shrink-0">
                  <div className="relative aspect-square rounded-2xl overflow-hidden shadow-2xl transform rotate-2 hover:rotate-0 transition-transform duration-500">
                    <OptimizedImage
                      src={albumData.coverImage}
                      alt={`${albumData.title} album cover`}
                      width={800}
                      height={800}
                      className="w-full h-full object-cover"
                      loading="eager"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                  </div>
                </div>

                {/* Album Info */}
                <div className="flex-1 text-center lg:text-left">
                  <div className="flex flex-wrap justify-center lg:justify-start gap-2 mb-4">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#F7E859] text-[#240046] text-sm font-semibold rounded-full">
                      <MoodIcon className="w-4 h-4" />
                      {albumData.mood}
                    </span>
                    <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white/20 text-white text-sm font-semibold rounded-full">
                      <Disc className="w-4 h-4" />
                      {albumData.trackCount} Tracks
                    </span>
                    <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white/20 text-white text-sm font-semibold rounded-full">
                      <Clock className="w-4 h-4" />
                      {albumData.duration}
                    </span>
                    <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white/20 text-white text-sm font-semibold rounded-full">
                      <Users className="w-4 h-4" />
                      Ages {albumData.ageRange}
                    </span>
                  </div>

                  <h1 className="font-['Fredoka_One'] text-4xl sm:text-5xl lg:text-6xl text-white mb-2">
                    {albumData.title}
                  </h1>
                  <p className="text-lg sm:text-xl text-white/80 mb-6">
                    {albumData.subtitle}
                  </p>

                  {/* Streaming Links - Show Pre-Save/Coming Soon if not released */}
                  {isReleased ? (
                    <>
                      {/* Main Spotify Link + Other Platforms */}
                      <div className="flex flex-col items-center lg:items-start gap-5">
                        {/* Main Spotify Button */}
                        <a
                          href={albumData.spotifyUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={() => {
                            trackEvent(EventCategories.ALBUM_STREAMING, EventActions.SPOTIFY_CLICK, albumData.title);
                            trackStreamClick("Spotify", albumData.title, "album");
                          }}
                          className="inline-flex items-center gap-2 px-8 py-4 bg-[#1DB954] text-white font-bold rounded-full hover:bg-[#1ed760] transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                        >
                          <Play className="w-6 h-6" />
                          Listen on Spotify
                          <ExternalLink className="w-4 h-4" />
                        </a>

                        {/* Other Platforms */}
                        <div className="flex items-center flex-wrap justify-center lg:justify-start gap-3 w-full lg:w-auto mt-2">
                          <span className="text-sm font-semibold text-white/90 mr-2">Also on:</span>

                          {/* Apple Music */}
                          <a
                            href={albumData.appleMusicUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={() => {
                              trackEvent(EventCategories.ALBUM_STREAMING, EventActions.APPLE_MUSIC_CLICK, albumData.title);
                              trackStreamClick("Apple Music", albumData.title, "album");
                            }}
                            className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-all duration-300 overflow-hidden group-hover:w-auto group-hover:px-4"
                            title="Apple Music"
                          >
                            <Music className="w-5 h-5 text-[#FC3C44] flex-shrink-0" />
                            <span className="max-w-0 overflow-hidden group-hover:max-w-[100px] group-hover:ml-2 text-white text-sm whitespace-nowrap transition-all duration-300">Apple Music</span>
                          </a>

                          {/* YouTube */}
                          <a
                            href={albumData.youtubeUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={() => {
                              trackEvent(EventCategories.ALBUM_STREAMING, EventActions.YOUTUBE_CLICK, albumData.title);
                              trackStreamClick("YouTube", albumData.title, "album");
                            }}
                            className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-all duration-300 overflow-hidden group-hover:w-auto group-hover:px-4"
                            title="YouTube Music"
                          >
                            <ExternalLink className="w-5 h-5 text-[#FF0000] flex-shrink-0" />
                            <span className="max-w-0 overflow-hidden group-hover:max-w-[100px] group-hover:ml-2 text-white text-sm whitespace-nowrap transition-all duration-300">YouTube</span>
                          </a>

                          {/* Amazon Music */}
                          {albumData.amazonUrl && (
                            <a
                              href={albumData.amazonUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              onClick={() => {
                                trackEvent(EventCategories.ALBUM_STREAMING, EventActions.AMAZON_CLICK, albumData.title);
                                trackStreamClick("Amazon", albumData.title, "album");
                              }}
                              className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-all duration-300 overflow-hidden group-hover:w-auto group-hover:px-4"
                              title="Amazon Music"
                            >
                              <Disc className="w-5 h-5 text-[#F26B3A] flex-shrink-0" />
                              <span className="max-w-0 overflow-hidden group-hover:max-w-[100px] group-hover:ml-2 text-white text-sm whitespace-nowrap transition-all duration-300">Amazon</span>
                            </a>
                          )}

                          {/* Other Platforms (Push.fm) */}
                          {albumData.otherUrl && (
                            <a
                              href={albumData.otherUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              onClick={() => {
                                trackEvent(EventCategories.ALBUM_STREAMING, EventActions.OTHER_PLATFORM_CLICK, albumData.title);
                                trackStreamClick("Other Platforms", albumData.title, "album");
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
                        href={albumData.otherUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={() => {
                          trackEvent(EventCategories.CONVERSION, EventActions.PRE_SAVE_CLICK, albumData.title);
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
                      <span className="text-sm text-white/60">This album will be available soon</span>
                    </div>
                  )}

                  {/* Social Share Buttons */}
                  <div className="flex items-center gap-3 pt-4 border-t border-white/10">
                    <span className="text-sm text-white/70">Share:</span>
                    <button
                      onClick={() => {
                        trackEvent(EventCategories.CONVERSION, EventActions.SHARE_CLICK, "Twitter");
                        const url = encodeURIComponent(window.location.href);
                        const text = encodeURIComponent(`Check out "${albumData.title}" by Aly Bouchnak!`);
                        window.open(`https://twitter.com/intent/tweet?url=${url}&text=${text}`, '_blank');
                      }}
                      className="w-9 h-9 rounded-full bg-[#1DA1F2]/20 hover:bg-[#1DA1F2] text-[#1DA1F2] hover:text-white flex items-center justify-center transition-all duration-200"
                      title="Share on X/Twitter"
                    >
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" /></svg>
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
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" /></svg>
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
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" /></svg>
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

                  <div className="flex flex-wrap justify-center lg:justify-start gap-4 text-sm text-white/70">
                    <span className="flex items-center gap-1.5">
                      <Music className="w-4 h-4" />
                      {albumData.genre}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <Activity className="w-4 h-4" />
                      Released {albumData.releaseDate}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>

        {/* Global Spotify Player for Album Context */}
        {isReleased && albumData.spotifyUrl && !currentSpotifyUrl && (
          <div className="bg-[#240046] py-8 px-4 hidden md:block">
            <div className="max-w-4xl mx-auto">
              <div className="rounded-xl overflow-hidden shadow-2xl">
                <iframe
                  src={`https://open.spotify.com/embed/album/${albumData.spotifyUrl.split('/').pop()?.split('?')[0]}`}
                  width="100%"
                  height="352"
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
        <div ref={contentRef} className="px-4 sm:px-6 lg:px-8 pb-16">
          <div className="max-w-4xl mx-auto space-y-6">
            {/* Description */}
            <section className="content-section bg-white rounded-2xl p-6 lg:p-8 shadow-lg">
              <h2 className="font-['Fredoka_One'] text-2xl text-[#101010] mb-4 flex items-center gap-2">
                <Volume2 className="w-6 h-6 text-[#9333ea]" />
                About This Album
              </h2>
              <p className="text-[#2A2A2A] text-lg leading-relaxed">
                {albumData.description}
              </p>
            </section>

            {/* Artist Note */}
            {albumData.artistNote && (
              <section className="content-section bg-gradient-to-br from-[#9333ea]/10 to-[#c084fc]/10 rounded-2xl p-6 lg:p-8 border-2 border-[#9333ea]/20">
                <h2 className="font-['Fredoka_One'] text-2xl text-[#240046] mb-4 flex items-center gap-2">
                  <Heart className="w-6 h-6 text-[#9333ea]" />
                  A Note from the Artist
                </h2>
                <div
                  className="prose prose-lg max-w-none text-[#2A2A2A] whitespace-pre-line"
                  dangerouslySetInnerHTML={{ __html: albumData.artistNote }}
                />
              </section>
            )}

            {/* Science Framework */}
            {albumData.scienceFramework && (
              <section className="content-section bg-gradient-to-br from-[#06b6d4]/10 to-[#67e8f9]/10 rounded-2xl p-6 lg:p-8 border-2 border-[#06b6d4]/20">
                <h2 className="font-['Fredoka_One'] text-2xl text-[#083344] mb-4 flex items-center gap-2">
                  <Activity className="w-6 h-6 text-[#0891b2]" />
                  The Science Behind the Music
                </h2>
                <div
                  className="prose prose-lg max-w-none text-[#2A2A2A] whitespace-pre-line"
                  dangerouslySetInnerHTML={{ __html: albumData.scienceFramework }}
                />
              </section>
            )}

            {/* Track List */}
            {albumData.trackIds && albumData.trackIds.length > 0 && (
              <section className="content-section bg-white rounded-2xl p-6 lg:p-8 shadow-lg">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="font-['Fredoka_One'] text-2xl text-[#101010] flex items-center gap-2">
                    <Music className="w-6 h-6 text-[#9333ea]" />
                    Track List
                  </h2>
                  <button
                    onClick={() => setCurrentSpotifyUrl(albumData.spotifyUrl)}
                    className="flex items-center gap-2 text-sm font-bold text-orange-500 hover:text-orange-600 transition"
                  >
                    <Play className="w-4 h-4" /> Play Album
                  </button>
                </div>
                <div className="space-y-3">
                  {albumData.trackIds.map((id, index) => {
                    const track = allTracksData.find(t => t.id === id);
                    if (!track) return null;
                    return (
                      <div
                        key={id}
                        className="border border-gray-100 rounded-xl overflow-hidden transition-all duration-300 hover:shadow-md bg-gray-50/50"
                      >
                        <div className="w-full flex items-center gap-4 p-4 text-left">
                          {/* Play Button */}
                          <button
                            onClick={() => setCurrentSpotifyUrl(track.spotifyUrl || albumData.spotifyUrl)}
                            className="flex-shrink-0 w-10 h-10 bg-[#1DB954]/10 hover:bg-[#1DB954] text-[#1DB954] hover:text-white rounded-full flex items-center justify-center transition-all shadow-sm group"
                            title="Play Track"
                          >
                            <Play className="w-5 h-5 ml-1 transition-transform group-hover:scale-110" />
                          </button>
                          <span className="text-gray-400 font-bold text-sm w-4 text-center">
                            {index + 1}
                          </span>

                          <div className="flex-1 min-w-0">
                            <Link to={`/track/${track.slug}`} className="font-bold text-[#101010] hover:text-[#9333ea] transition-colors truncate block">
                              {track.title}
                            </Link>
                            {track.mood && (
                              <p className="text-sm text-[#9333ea] mt-0.5">{track.mood}</p>
                            )}
                          </div>
                          <span className="text-sm text-gray-500">{track.duration}</span>
                          <button
                            onClick={() => setExpandedTrack(expandedTrack === index ? null : index)}
                            className="p-2 text-gray-400 hover:text-[#9333ea] transition-colors"
                          >
                            <ChevronDown className={`w-5 h-5 transition-transform ${expandedTrack === index ? 'rotate-180' : ''}`} />
                          </button>
                        </div>
                        {expandedTrack === index && track.description && (
                          <div className="px-4 pb-4 pt-0">
                            <p className="text-[#2A2A2A] pl-20">{track.description}</p>
                          </div>
                        )}
                      </div>
                    )
                  })}
                </div>
              </section>
            )}

            {/* Streaming Links */}
            <section className="content-section bg-gradient-to-r from-[#1DB954]/10 via-[#FA5E5E]/10 to-[#FF0000]/10 rounded-2xl p-6 lg:p-8">
              <h2 className="font-['Fredoka_One'] text-2xl text-[#101010] mb-6 text-center">
                Listen Everywhere
              </h2>
              <div className="flex flex-wrap justify-center gap-4">
                <a
                  href={albumData.spotifyUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-[#1DB954] text-white font-bold rounded-full shadow-[0_4px_0_#15863c] transition-all duration-200 hover:translate-y-[2px] hover:shadow-[0_2px_0_#15863c] active:translate-y-[4px] active:shadow-none"
                >
                  <Play className="w-5 h-5" />
                  Spotify
                </a>
                <a
                  href={albumData.appleMusicUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-[#FA5E5E] text-white font-bold rounded-full shadow-[0_4px_0_#dc2626] transition-all duration-200 hover:translate-y-[2px] hover:shadow-[0_2px_0_#dc2626] active:translate-y-[4px] active:shadow-none"
                >
                  <Music className="w-5 h-5" />
                  Apple Music
                </a>
                <a
                  href={albumData.youtubeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-[#FF0000] text-white font-bold rounded-full shadow-[0_4px_0_#b91c1c] transition-all duration-200 hover:translate-y-[2px] hover:shadow-[0_2px_0_#b91c1c] active:translate-y-[4px] active:shadow-none"
                >
                  <ExternalLink className="w-5 h-5" />
                  YouTube Music
                </a>
                {albumData.amazonUrl && (
                  <a
                    href={albumData.amazonUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-6 py-3 bg-[#FF9900] text-white font-bold rounded-full shadow-[0_4px_0_#c2410c] transition-all duration-200 hover:translate-y-[2px] hover:shadow-[0_2px_0_#c2410c] active:translate-y-[4px] active:shadow-none"
                  >
                    <ExternalLink className="w-5 h-5" />
                    Amazon Music
                  </a>
                )}
              </div>
            </section>

            {/* Related Albums */}
            {albumData.relatedAlbums && albumData.relatedAlbums.length > 0 && (
              <section className="content-section">
                <h2 className="font-['Fredoka_One'] text-2xl text-[#101010] mb-6 text-center">
                  You Might Also Enjoy
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {albumData.relatedAlbums.map((related) => (
                    <a
                      key={related.id}
                      href={related.link}
                      className="group block bg-white rounded-2xl overflow-hidden shadow-lg transition-all duration-300 hover:scale-[1.02] hover:shadow-xl"
                    >
                      <div className="aspect-square overflow-hidden">
                        <OptimizedImage
                          src={related.cover}
                          alt={related.title}
                          width={400}
                          height={400}
                          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                          loading="lazy"
                        />
                      </div>
                      <div className="p-4">
                        <h3 className="font-['Fredoka_One'] text-lg text-[#101010] mb-1">
                          {related.title}
                        </h3>
                        <p className="text-sm text-[#2A2A2A]">{related.description}</p>
                      </div>
                    </a>
                  ))}
                </div>
              </section>
            )}
          </div>
        </div>
      </main>

      {/* Sticky Bottom Spotify Player */}
      <div
        className={`fixed bottom-0 left-0 right-0 z-50 bg-[#121212] border-t border-white/10 shadow-[0_-10px_30px_rgba(0,0,0,0.5)] transition-transform duration-500 ease-in-out ${currentSpotifyUrl ? 'translate-y-0' : 'translate-y-full'}`}
      >
        {currentSpotifyUrl && (
          <div className="relative w-full max-w-6xl mx-auto px-2 sm:px-4 py-2 flex items-center gap-2 sm:gap-4">
            <div className="flex-1 h-[80px]">
              <iframe
                src={`https://open.spotify.com/embed/${currentSpotifyUrl.includes('album') ? 'album' : 'track'}/${currentSpotifyUrl.split('/').pop()?.split('?')[0]}`}
                width="100%"
                height="80"
                frameBorder="0"
                allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                loading="lazy"
                className="rounded-lg"
              />
            </div>
            <button
              onClick={() => setCurrentSpotifyUrl(null)}
              className="p-2 sm:px-4 sm:py-2 flex-shrink-0 text-white/50 hover:text-white hover:bg-white/10 font-bold rounded-lg transition"
            >
              Close
            </button>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
}

export default DynamicAlbumPage;
