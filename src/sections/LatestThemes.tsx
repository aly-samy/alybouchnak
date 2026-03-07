import { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Layers, ExternalLink } from 'lucide-react';
import { getAllThemeCollections } from '../data/themeCollections';
import OptimizedImage from '../components/OptimizedImage';

gsap.registerPlugin(ScrollTrigger);

const latestThemes = getAllThemeCollections().slice(0, 3);

export default function LatestThemes() {
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
        <section ref={sectionRef} className="section-padding bg-white" id="latest-themes">
            <div className="w-full px-4 sm:px-6 lg:px-8 xl:px-12">
                <div className="max-w-6xl mx-auto">
                    {/* Section Header */}
                    <div className="flex items-center gap-3 mb-10">
                        <div className="w-12 h-12 bg-[#F7E859] rounded-full flex items-center justify-center">
                            <Layers className="w-6 h-6 text-[#101010]" />
                        </div>
                        <h2 className="font-['Fredoka_One'] text-3xl sm:text-4xl text-[#101010]">
                            Latest Themes
                        </h2>
                    </div>

                    {/* Grids */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {latestThemes.map((theme) => (
                            <article
                                key={theme.id}
                                className="bg-white rounded-3xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border border-blue-100"
                            >
                                <div className="aspect-square overflow-hidden">
                                    <OptimizedImage
                                        src={theme.coverImage}
                                        alt={theme.title}
                                        width={600}
                                        height={600}
                                        className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                                        loading="lazy"
                                    />
                                </div>
                                <div className="p-6">
                                    <div className="flex items-center gap-2 mb-3">
                                        <span className="inline-flex items-center gap-1.5 px-3 py-1.5 text-sm font-semibold rounded-full bg-[#101010] text-[#F7E859]">
                                            {theme.category}
                                        </span>
                                        <span className="inline-flex items-center gap-1.5 px-3 py-1.5 text-sm font-semibold rounded-full bg-gray-100 text-gray-600">
                                            {theme.trackCount} Tracks
                                        </span>
                                    </div>
                                    <h3 className="font-['Fredoka_One'] text-xl text-[#101010] mb-2 leading-tight">
                                        {theme.title}
                                    </h3>
                                    <p className="text-sm text-[#2A2A2A] mb-4 line-clamp-2">
                                        {theme.description}
                                    </p>
                                    <a
                                        href={`/theme-collection/${theme.slug}`}
                                        className="inline-flex items-center justify-center w-full px-6 py-3 bg-[#101010] text-white font-bold rounded-full shadow-lg hover:shadow-xl transition-all duration-200 hover:-translate-y-1"
                                    >
                                        View Collection
                                        <ExternalLink className="w-4 h-4 ml-2" />
                                    </a>
                                </div>
                            </article>
                        ))}
                    </div>

                    {/* CTA */}
                    <div className="mt-12 text-center">
                        <a
                            href="/theme-collections"
                            className="inline-flex items-center justify-center px-8 py-4 bg-[#101010] text-white font-bold rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                        >
                            See All Themes
                        </a>
                    </div>
                </div>
            </div>
        </section>
    );
}
