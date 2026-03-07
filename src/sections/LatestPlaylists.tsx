import { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Music, ExternalLink } from 'lucide-react';
import { getAllPlaylists } from '../data/playlists';
import OptimizedImage from '../components/OptimizedImage';

gsap.registerPlugin(ScrollTrigger);

const latestPlaylists = getAllPlaylists().slice(0, 3);

export default function LatestPlaylists() {
    const sectionRef = useRef<HTMLElement>(null);

    useLayoutEffect(() => {
        const ctx = gsap.context(() => {
            gsap.fromTo(
                sectionRef.current,
                { opacity: 0, y: 50 },
                {
                    opacity: 1,
                    y: 0,
                    duration: 0.6,
                    ease: 'power2.out',
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: 'top 80%',
                        toggleActions: 'play none none reverse',
                    },
                }
            );
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section ref={sectionRef} className="section-padding bg-[#C8F0F7]" id="latest-playlists">
            <div className="w-full px-4 sm:px-6 lg:px-8 xl:px-12">
                <div className="max-w-6xl mx-auto">
                    {/* Section Header */}
                    <div className="flex items-center gap-3 mb-10">
                        <div className="w-12 h-12 bg-[#F26B3A] rounded-full flex items-center justify-center">
                            <Music className="w-6 h-6 text-white" />
                        </div>
                        <h2 className="font-['Fredoka_One'] text-3xl sm:text-4xl text-[#101010]">
                            Latest Playlists
                        </h2>
                    </div>

                    {/* Grids */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {latestPlaylists.map((playlist) => (
                            <article
                                key={playlist.id}
                                className="bg-white rounded-3xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-300 hover:-translate-y-2"
                            >
                                <div className="aspect-square overflow-hidden">
                                    <OptimizedImage
                                        src={playlist.coverImage}
                                        alt={playlist.title}
                                        width={600}
                                        height={600}
                                        className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                                        loading="lazy"
                                    />
                                </div>
                                <div className="p-6">
                                    <div className="flex items-center gap-2 mb-3">
                                        <span className="inline-flex items-center gap-1.5 px-3 py-1.5 text-sm font-semibold rounded-full bg-[#1da0b6] text-white">
                                            {playlist.mood}
                                        </span>
                                        <span className="inline-flex items-center gap-1.5 px-3 py-1.5 text-sm font-semibold rounded-full bg-gray-100 text-gray-600">
                                            {playlist.trackCount} Tracks
                                        </span>
                                    </div>
                                    <h3 className="font-['Fredoka_One'] text-xl text-[#101010] mb-2">
                                        {playlist.title}
                                    </h3>
                                    <p className="text-sm text-[#2A2A2A] mb-4 line-clamp-2">
                                        {playlist.description}
                                    </p>
                                    <a
                                        href={`/playlist/${playlist.slug}`}
                                        className="inline-flex items-center justify-center w-full px-6 py-3 bg-[#F26B3A] text-white font-bold rounded-full shadow-lg hover:shadow-xl transition-all duration-200 hover:-translate-y-1"
                                    >
                                        Listen to Playlist
                                        <ExternalLink className="w-4 h-4 ml-2" />
                                    </a>
                                </div>
                            </article>
                        ))}
                    </div>

                    {/* CTA */}
                    <div className="mt-12 text-center">
                        <a
                            href="/playlists"
                            className="inline-flex items-center justify-center px-8 py-4 bg-[#F26B3A] text-white font-bold rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                        >
                            See All Playlists
                        </a>
                    </div>
                </div>
            </div>
        </section>
    );
}
