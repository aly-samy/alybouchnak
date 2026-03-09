import { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
    Play,
    Music,
    Sun,
    Moon,
    ChevronDown,
    ExternalLink,
    Disc,
    Volume2,
    Heart,
    Music2,
    Star,
    Activity
} from 'lucide-react';
import Navigation from '../sections/Navigation';
import Footer from '../sections/Footer';
import SEO from '../components/SEO';
import Breadcrumbs from '../components/Breadcrumbs';
import OptimizedImage from '../components/OptimizedImage';
import { getPlaylistBySlug } from '../data/playlists';
import { tracks as allTracksData } from '../data/tracks';
import type { Playlist } from '../data/playlists';
import { Link } from 'react-router-dom';
import { trackEvent, EventCategories, EventActions } from '../lib/analytics';
import { trackStreamClick, trackContentView } from '../lib/pixel';
import { useEngagementTracking } from '../hooks/useEngagementTracking';

gsap.registerPlugin(ScrollTrigger);

function DynamicPlaylistPage() {
    const { slug } = useParams<{ slug: string }>();
    const playlistData = getPlaylistBySlug(slug || '') as Playlist;

    const heroRef = useRef<HTMLDivElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);
    const bgRef = useRef<HTMLDivElement>(null);
    const [expandedTrack, setExpandedTrack] = useState<number | null>(null);
    const [currentSpotifyUrl, setCurrentSpotifyUrl] = useState<string | null>(null);

    // Helper to check if playlist is released
    const isReleased = playlistData && playlistData.spotifyUrl && !playlistData.spotifyUrl.includes('placeholder');
    const hasPreSaveLink = playlistData && playlistData.otherUrl && !playlistData.otherUrl.includes('placeholder');

    // Track engagement metrics
    useEngagementTracking(playlistData?.title || 'Playlist Page');

    useEffect(() => {
        if (!playlistData) return;

        // Track content view for retargeting
        trackContentView(playlistData.title, "playlist");

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
    }, [playlistData]);

    if (!playlistData) {
        return (
            <div className="relative min-h-screen bg-[#C8F0F7]">
                <Navigation />
                <div className="pt-32 pb-16 text-center">
                    <h1 className="font-['Fredoka_One'] text-4xl text-[#101010] mb-4">Playlist Not Found</h1>
                    <p className="text-lg text-[#2A2A2A]">The playlist you are looking for does not exist.</p>
                </div>
                <Footer />
            </div>
        );
    }

    const MoodIcon = playlistData.mood === 'Calm' ? Moon : Sun;

    return (
        <div className="relative min-h-screen bg-[#C8F0F7]">
            <SEO
                title={`${playlistData.title} | Aly Bouchnak Playlists`}
                description={playlistData.description}
                keywords={`${playlistData.title}, Aly Bouchnak, ${playlistData.genre}, children's music, toddler playlist, kids music`}
                ogImage={`https://alybouchnak.com${playlistData.coverImage}`}
            />

            <Navigation />

            <main className="relative">
                {/* Blurred Parallax Background for Hero */}
                <div className="absolute top-0 left-0 right-0 h-[850px] lg:h-[700px] z-0 overflow-hidden">
                    <div
                        ref={bgRef}
                        className="absolute inset-[-20%] bg-cover bg-center blur-2xl scale-125 opacity-70"
                        style={{ backgroundImage: `url(${playlistData.coverImage})` }}
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
                                {/* Cover Image */}
                                <div className="w-full max-w-md mx-auto lg:mx-0 flex-shrink-0">
                                    <div className="relative aspect-square rounded-2xl overflow-hidden shadow-2xl transform rotate-2 hover:rotate-0 transition-transform duration-500">
                                        <OptimizedImage
                                            src={playlistData.coverImage}
                                            alt={`${playlistData.title} cover`}
                                            width={800}
                                            height={800}
                                            className="w-full h-full object-cover"
                                            loading="eager"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                                    </div>
                                </div>

                                {/* Info */}
                                <div className="flex-1 text-center lg:text-left">
                                    <div className="flex flex-wrap justify-center lg:justify-start gap-2 mb-4">
                                        <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#F26B3A] text-white text-sm font-semibold rounded-full">
                                            PLAYLIST
                                        </span>
                                        <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#F7E859] text-[#240046] text-sm font-semibold rounded-full">
                                            <MoodIcon className="w-4 h-4" />
                                            {playlistData.mood}
                                        </span>
                                        <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white/20 text-[#101010] text-sm font-semibold rounded-full">
                                            <Disc className="w-4 h-4" />
                                            {playlistData.trackCount} Tracks
                                        </span>
                                    </div>

                                    <h1 className="font-['Fredoka_One'] text-4xl sm:text-5xl lg:text-6xl text-white drop-shadow-md mb-2">
                                        {playlistData.title}
                                    </h1>
                                    <p className="text-lg sm:text-xl text-[#240046] font-medium mb-6">
                                        {playlistData.subtitle}
                                    </p>

                                    {/* Streaming Links */}
                                    {isReleased ? (
                                        <div className="flex flex-col sm:flex-row items-center gap-4">
                                            <a
                                                href={playlistData.spotifyUrl}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                onClick={() => {
                                                    trackEvent(EventCategories.PLAYLIST_STREAMING, EventActions.SPOTIFY_CLICK, playlistData.title);
                                                    trackStreamClick("Spotify", playlistData.title, "playlist");
                                                }}
                                                className="inline-flex items-center gap-2 px-8 py-4 bg-[#1DB954] text-white font-bold rounded-full hover:bg-[#1ed760] transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                                            >
                                                <Play className="w-6 h-6" />
                                                Listen on Spotify
                                                <ExternalLink className="w-4 h-4" />
                                            </a>
                                        </div>
                                    ) : hasPreSaveLink ? (
                                        <div className="flex flex-col items-center gap-3">
                                            <a
                                                href={playlistData.otherUrl}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-[#F26B3A] to-[#F7E859] text-white font-bold rounded-full hover:shadow-xl transition-all duration-200 transform hover:-translate-y-1"
                                            >
                                                <Music2 className="w-6 h-6" />
                                                Follow Playlist
                                                <ExternalLink className="w-4 h-4" />
                                            </a>
                                        </div>
                                    ) : (
                                        <div className="flex flex-col items-center gap-3">
                                            <button
                                                disabled
                                                className="inline-flex items-center gap-2 px-8 py-4 bg-white/20 text-white/50 font-bold rounded-full cursor-not-allowed"
                                            >
                                                <Music2 className="w-6 h-6" />
                                                Coming Soon
                                            </button>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </section>
                </div>

                {/* Content Sections */}
                <div ref={contentRef} className="px-4 sm:px-6 lg:px-8 pb-16">
                    <div className="max-w-4xl mx-auto space-y-6">
                        <section className="content-section bg-white rounded-2xl p-6 lg:p-8 shadow-lg">
                            <h2 className="font-['Fredoka_One'] text-2xl text-[#101010] mb-4 flex items-center gap-2">
                                <Volume2 className="w-6 h-6 text-[#9333ea]" />
                                Curator's Vision
                            </h2>
                            <p className="text-[#2A2A2A] text-lg leading-relaxed">
                                {playlistData.description}
                            </p>
                        </section>

                        {playlistData.artistNote && (
                            <section className="content-section bg-white/60 backdrop-blur-sm rounded-2xl p-6 lg:p-8 border border-white/40">
                                <h2 className="font-['Fredoka_One'] text-2xl text-[#240046] mb-4 flex items-center gap-2">
                                    <Heart className="w-6 h-6 text-[#F26B3A]" />
                                    Why I Created This
                                </h2>
                                <div
                                    className="quill-content text-[#2A2A2A]"
                                    dangerouslySetInnerHTML={{ __html: playlistData.artistNote }}
                                />
                            </section>
                        )}

                        {/* Curator Note */}
                        {playlistData.curatorNote && (
                            <section className="content-section bg-gradient-to-br from-[#1DB954]/10 to-[#1ed760]/10 rounded-2xl p-6 lg:p-8 border-2 border-[#1DB954]/20">
                                <h2 className="font-['Fredoka_One'] text-2xl text-[#101010] mb-4 flex items-center gap-2">
                                    <Star className="w-6 h-6 text-[#1DB954]" />
                                    Curator's Note
                                </h2>
                                <div
                                    className="quill-content text-[#2A2A2A]"
                                    dangerouslySetInnerHTML={{ __html: playlistData.curatorNote }}
                                />
                            </section>
                        )}

                        {/* Science Framework */}
                        {playlistData.scienceFramework && (
                            <section className="content-section bg-gradient-to-br from-[#06b6d4]/10 to-[#67e8f9]/10 rounded-2xl p-6 lg:p-8 border-2 border-[#06b6d4]/20">
                                <h2 className="font-['Fredoka_One'] text-2xl text-[#083344] mb-4 flex items-center gap-2">
                                    <Activity className="w-6 h-6 text-[#0891b2]" />
                                    Scientific Value
                                </h2>
                                <div
                                    className="quill-content text-[#2A2A2A]"
                                    dangerouslySetInnerHTML={{ __html: playlistData.scienceFramework }}
                                />
                            </section>
                        )}

                        {/* Track List */}
                        {playlistData.tracks && playlistData.tracks.length > 0 && (
                            <section className="content-section bg-white rounded-2xl p-6 lg:p-8 shadow-lg">
                                <div className="flex items-center justify-between mb-6">
                                    <h2 className="font-['Fredoka_One'] text-2xl text-[#101010] flex items-center gap-2">
                                        <Music className="w-6 h-6 text-[#F26B3A]" />
                                        Playlist Songs
                                    </h2>
                                    <button
                                        onClick={() => setCurrentSpotifyUrl(playlistData.spotifyUrl)}
                                        className="flex items-center gap-2 text-sm font-bold text-orange-500 hover:text-orange-600 transition"
                                    >
                                        <Play className="w-4 h-4" /> Play Playlist
                                    </button>
                                </div>
                                <div className="space-y-3">
                                    {playlistData.tracks.map((t, index) => {
                                        const isInternal = !!t.trackId;
                                        const track = isInternal ? allTracksData.find(x => x.id === t.trackId) : null;

                                        const title = track ? track.title : t.title;
                                        const duration = track ? track.duration : t.duration;
                                        const description = track ? track.description : t.description;
                                        const mood = track ? track.mood : null;
                                        const playUrl = track ? track.spotifyUrl : t.link;

                                        return (
                                            <div
                                                key={index}
                                                className="border border-gray-100 rounded-xl overflow-hidden transition-all duration-300 hover:shadow-md bg-gray-50/50"
                                            >
                                                <div className="w-full flex items-center gap-4 p-4 text-left">
                                                    {/* Play Button */}
                                                    {(playUrl || playlistData.spotifyUrl) && (
                                                        <button
                                                            onClick={() => setCurrentSpotifyUrl(playUrl || playlistData.spotifyUrl)}
                                                            className="flex-shrink-0 w-10 h-10 bg-[#1DB954]/10 hover:bg-[#1DB954] text-[#1DB954] hover:text-white rounded-full flex items-center justify-center transition-all shadow-sm group"
                                                            title="Play Track"
                                                        >
                                                            <Play className="w-5 h-5 ml-1 transition-transform group-hover:scale-110" />
                                                        </button>
                                                    )}
                                                    <span className="text-gray-400 font-bold text-sm w-4 text-center">
                                                        {index + 1}
                                                    </span>
                                                    <div className="flex-1 min-w-0">
                                                        {isInternal && track ? (
                                                            <Link to={`/track/${track.slug}`} className="font-bold text-[#101010] hover:text-[#F26B3A] transition-colors truncate block">
                                                                {title}
                                                            </Link>
                                                        ) : t.link ? (
                                                            <a href={t.link} target="_blank" rel="noopener noreferrer" className="font-bold text-[#101010] hover:text-[#F26B3A] transition-colors truncate block flex items-center gap-1">
                                                                {title} <ExternalLink className="w-3 h-3" />
                                                            </a>
                                                        ) : (
                                                            <h3 className="font-bold text-[#101010] truncate">{title}</h3>
                                                        )}
                                                        {mood && (
                                                            <p className="text-sm text-[#F26B3A] mt-0.5">{mood}</p>
                                                        )}
                                                    </div>
                                                    <span className="text-sm text-gray-500">{duration}</span>
                                                    <button
                                                        onClick={() => setExpandedTrack(expandedTrack === index ? null : index)}
                                                        className="p-2 text-gray-400 hover:text-[#F26B3A] transition-colors"
                                                    >
                                                        <ChevronDown className={`w-5 h-5 transition-transform ${expandedTrack === index ? 'rotate-180' : ''}`} />
                                                    </button>
                                                </div>
                                                {expandedTrack === index && description && (
                                                    <div className="px-4 pb-4 pt-0">
                                                        <p className="text-[#2A2A2A] pl-20">{description}</p>
                                                    </div>
                                                )}
                                            </div>
                                        )
                                    })}
                                </div>
                            </section>
                        )}
                    </div>
                </div>
            </main>

            <Footer />

            {/* Sticky Bottom Spotify Player */}
            <div
                className={`fixed bottom-0 left-0 right-0 z-50 bg-[#121212] border-t border-white/10 shadow-[0_-10px_30px_rgba(0,0,0,0.5)] transition-transform duration-500 ease-in-out ${currentSpotifyUrl ? 'translate-y-0' : 'translate-y-full'}`}
            >
                {currentSpotifyUrl && (
                    <div className="relative w-full max-w-6xl mx-auto px-2 sm:px-4 py-2 flex items-center gap-2 sm:gap-4">
                        <div className="flex-1 h-[80px]">
                            <iframe
                                src={`https://open.spotify.com/embed/${currentSpotifyUrl.includes('playlist') ? 'playlist' : currentSpotifyUrl.includes('album') ? 'album' : 'track'}/${currentSpotifyUrl.split('/').pop()?.split('?')[0]}`}
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

        </div>
    );
}

export default DynamicPlaylistPage;
