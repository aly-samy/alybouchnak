import { useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
    Play,
    Sparkles,
    Sun,
    Moon,
    BookOpen,
    Activity,
    Users,
    Heart
} from 'lucide-react';
import Navigation from '../sections/Navigation';
import Footer from '../sections/Footer';
import SEO from '../components/SEO';
import Breadcrumbs from '../components/Breadcrumbs';
import OptimizedImage from '../components/OptimizedImage';
import { getThemeCollectionBySlug } from '../data/themeCollections';
import type { ThemeCollection } from '../data/themeCollections';
import { tracks as allTracks } from '../data/tracks';
import { trackContentView } from '../lib/pixel';
import { useEngagementTracking } from '../hooks/useEngagementTracking';

gsap.registerPlugin(ScrollTrigger);

function DynamicThemeCollectionPage() {
    const { slug } = useParams<{ slug: string }>();
    const collectionData = getThemeCollectionBySlug(slug || '') as ThemeCollection;

    // Resolve tracks from IDs
    const collectionTracks = collectionData?.trackIds
        ? collectionData.trackIds.map(id => allTracks.find(t => t.id === id)).filter(Boolean) as typeof allTracks
        : [];

    const heroRef = useRef<HTMLDivElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);
    const bgRef = useRef<HTMLDivElement>(null);

    // Track engagement metrics
    useEngagementTracking(collectionData?.title || 'Theme Collection Page');

    useEffect(() => {
        if (!collectionData) return;

        // Track content view for retargeting
        trackContentView(collectionData.title, "theme-collection");

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
    }, [collectionData]);

    if (!collectionData) {
        return (
            <div className="relative min-h-screen bg-[#C8F0F7]">
                <Navigation />
                <div className="pt-32 pb-16 text-center">
                    <h1 className="font-['Fredoka_One'] text-4xl text-[#101010] mb-4">Collection Not Found</h1>
                    <p className="text-lg text-[#2A2A2A]">The theme collection you are looking for does not exist.</p>
                </div>
                <Footer />
            </div>
        );
    }

    const MoodIcon = collectionData.mood === 'Calm' ? Moon : Sun;

    return (
        <div className="relative min-h-screen bg-[#F7E859]">
            <SEO
                title={`${collectionData.title} | Themed Musical Journeys | Aly Bouchnak`}
                description={collectionData.description}
                keywords={`${collectionData.title}, themed music, kids collection, Aly Bouchnak, children's development`}
                ogImage={`https://alybouchnak.com${collectionData.coverImage}`}
            />

            <Navigation />

            <main className="relative">
                {/* Blurred Parallax Background for Hero */}
                <div className="absolute top-0 left-0 right-0 h-[850px] lg:h-[700px] z-0 overflow-hidden">
                    <div
                        ref={bgRef}
                        className="absolute inset-[-20%] bg-cover bg-center blur-2xl scale-125 opacity-70"
                        style={{ backgroundImage: `url(${collectionData.coverImage})` }}
                    />
                    <div className="absolute inset-0 bg-black/60" />
                    <div className="absolute inset-x-0 bottom-0 h-64 bg-gradient-to-t from-[#F7E859] to-transparent" />
                </div>

                <div className="relative z-10 pt-20">
                    <Breadcrumbs />

                    {/* Hero Section */}
                    <section ref={heroRef} className="relative px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
                        <div className="max-w-6xl mx-auto">
                            <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-center lg:items-start">
                                {/* Collection Cover */}
                                <div className="w-full max-w-md flex-shrink-0">
                                    <div className="relative aspect-square rounded-[2rem] overflow-hidden shadow-2xl skew-y-1 hover:skew-y-0 transition-transform duration-500 border-8 border-white">
                                        <OptimizedImage
                                            src={collectionData.coverImage}
                                            alt={`${collectionData.title} collection`}
                                            width={800}
                                            height={800}
                                            className="w-full h-full object-cover"
                                            loading="eager"
                                        />
                                    </div>
                                </div>

                                {/* Collection Info */}
                                <div className="flex-1 text-center lg:text-left">
                                    <div className="flex flex-wrap justify-center lg:justify-start gap-2 mb-4">
                                        <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#F26B3A] text-white text-sm font-semibold rounded-full shadow-sm">
                                            <Sparkles className="w-4 h-4" />
                                            THEME COLLECTION
                                        </span>
                                        <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white text-[#240046] text-sm font-semibold rounded-full shadow-sm">
                                            <MoodIcon className="w-4 h-4" />
                                            {collectionData.mood}
                                        </span>
                                        <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#C8F0F7] text-[#101010] text-sm font-semibold rounded-full shadow-sm">
                                            {collectionData.trackCount} Items
                                        </span>
                                    </div>

                                    <h1 className="font-['Fredoka_One'] text-4xl sm:text-5xl lg:text-7xl text-[#101010] mb-4">
                                        {collectionData.title}
                                    </h1>
                                    <p className="text-xl sm:text-2xl text-[#2A2A2A]/80 mb-8 max-w-2xl">
                                        {collectionData.subtitle}
                                    </p>

                                    <div className="flex flex-wrap justify-center lg:justify-start gap-4">
                                        <a
                                            href={collectionData.spotifyUrl}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="inline-flex items-center gap-2 px-8 py-4 bg-[#101010] text-white font-bold rounded-2xl hover:bg-[#2A2A2A] transition-all duration-200 shadow-xl"
                                        >
                                            <Play className="w-6 h-6" />
                                            Explore Theme
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                </div>

                {/* Content Breakdown */}
                <section ref={contentRef} className="px-4 sm:px-6 lg:px-8 pb-20">
                    <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {/* Main Content */}
                        <div className="lg:col-span-2 space-y-8">
                            <section className="content-section bg-white rounded-3xl p-8 lg:p-12 shadow-xl border border-gray-100">
                                <h2 className="font-['Fredoka_One'] text-3xl text-[#101010] mb-6 flex items-center gap-3">
                                    <BookOpen className="w-8 h-8 text-[#F26B3A]" />
                                    Musical Narrative
                                </h2>
                                <div
                                    className="prose prose-xl max-w-none text-[#2A2A2A] leading-relaxed"
                                    dangerouslySetInnerHTML={{ __html: collectionData.description }}
                                />
                            </section>

                            {collectionData.scienceFramework && (
                                <section className="content-section bg-[#C8F0F7] rounded-3xl p-8 lg:p-12 shadow-inner border border-[#C8F0F7]/50">
                                    <h2 className="font-['Fredoka_One'] text-3xl text-[#083344] mb-6 flex items-center gap-3">
                                        <Activity className="w-8 h-8 text-[#F26B3A]" />
                                        Developmental Value
                                    </h2>
                                    <div
                                        className="prose prose-lg max-w-none text-[#2A2A2A] whitespace-pre-line"
                                        dangerouslySetInnerHTML={{ __html: collectionData.scienceFramework }}
                                    />
                                </section>
                            )}

                            {/* Items in this collection */}
                            {collectionTracks.length > 0 && (
                                <section className="content-section bg-white rounded-3xl p-8 lg:p-10 shadow-xl border border-gray-100">
                                    <h2 className="font-['Fredoka_One'] text-2xl text-[#101010] mb-8">Included in this Journey</h2>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                        {collectionTracks.map((track, index) => (
                                            <div key={track.id} className="flex items-center gap-4 p-4 bg-gray-50 rounded-2xl border border-gray-100 hover:border-[#F26B3A]/30 transition-colors">
                                                <div className="w-12 h-12 bg-[#F26B3A] text-white rounded-xl flex items-center justify-center font-bold text-lg shadow-sm">
                                                    {index + 1}
                                                </div>
                                                <div className="flex-1 min-w-0">
                                                    <h4 className="font-bold text-[#101010] text-lg truncate">{track.title}</h4>
                                                    <p className="text-sm text-gray-500 italic truncate">{track.genre}</p>
                                                </div>
                                                <div className="text-sm font-bold text-[#2A2A2A]/50 pr-2">
                                                    {track.duration}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </section>
                            )}
                        </div>

                        {/* Sidebar / Stats */}
                        <div className="space-y-8">
                            <section className="content-section bg-[#F26B3A] text-white rounded-3xl p-8 shadow-xl">
                                <h3 className="font-['Fredoka_One'] text-xl mb-6 flex items-center gap-2">
                                    <Users className="w-6 h-6" />
                                    Perfect For
                                </h3>
                                <div className="space-y-4">
                                    <div className="pb-4 border-b border-white/20">
                                        <p className="text-sm opacity-70 uppercase tracking-widest font-bold mb-1">Ages</p>
                                        <p className="text-lg font-bold">{collectionData.ageRange}</p>
                                    </div>
                                    <div className="pb-4 border-b border-white/20">
                                        <p className="text-sm opacity-70 uppercase tracking-widest font-bold mb-1">Mood</p>
                                        <p className="text-lg font-bold">{collectionData.mood}</p>
                                    </div>
                                    <div className="pb-4 border-b border-white/20">
                                        <p className="text-sm opacity-70 uppercase tracking-widest font-bold mb-1">Time</p>
                                        <p className="text-lg font-bold">{collectionData.releaseDate}</p>
                                    </div>
                                </div>
                            </section>

                            {collectionData.artistNote && (
                                <div className="content-section bg-white p-8 rounded-3xl shadow-lg border border-gray-100 rotate-1">
                                    <Heart className="w-10 h-10 text-[#F26B3A] mb-4" />
                                    <div
                                        className="text-[#2A2A2A] italic leading-relaxed line-clamp-6"
                                        dangerouslySetInnerHTML={{ __html: collectionData.artistNote }}
                                    />
                                </div>
                            )}
                        </div>
                    </div>
                </section>
            </main>

            <Footer />
        </div>
    );
}

export default DynamicThemeCollectionPage;
