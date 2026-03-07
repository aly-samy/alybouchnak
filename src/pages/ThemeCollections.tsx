import { useState, useMemo } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Filter, Disc } from 'lucide-react';
import Navigation from '../sections/Navigation';
import Footer from '../sections/Footer';
import SEO from '../components/SEO';
import Breadcrumbs from '../components/Breadcrumbs';
import { getAllThemeCollections } from '../data/themeCollections';

gsap.registerPlugin(ScrollTrigger);

const ThemeCollections = () => {
    const collections = getAllThemeCollections();
    const [moodFilter, setMoodFilter] = useState<string>('all');

    // Get unique moods
    const moods = [...new Set(collections.map(c => c.mood))].sort();

    const filteredCollections = useMemo(() => {
        let filtered = collections;
        if (moodFilter !== 'all') {
            filtered = filtered.filter(c => c.mood === moodFilter);
        }
        return filtered;
    }, [collections, moodFilter]);

    const schemaData = {
        '@context': 'https://schema.org',
        '@type': 'CollectionPage',
        name: 'Themed Musical Journeys | Aly Bouchnak',
        description: 'Explore our themed musical collections taking kids on imaginative journeys.',
        url: 'https://alybouchnak.com/theme-collections'
    };

    return (
        <div className="relative min-h-screen bg-[#C8F0F7]">
            <SEO
                title="Themed Musical Journeys | Aly Bouchnak"
                description="Explore our themed musical collections taking kids on imaginative journeys."
                keywords="toddler music themes, educational music journeys"
                canonical="https://alybouchnak.com/theme-collections"
                ogType="website"
                schemaData={schemaData}
            />

            <div className="grain-overlay" />
            <Navigation />
            <Breadcrumbs />

            {/* Header */}
            <div className="pt-32 pb-16 bg-gradient-to-b from-[#4CAF50]/20 to-transparent">
                <div className="w-full px-4 sm:px-6 lg:px-8 xl:px-12 text-center">
                    <h1 className="font-['Fredoka_One'] text-4xl sm:text-5xl lg:text-5xl text-[#101010] mb-4">
                        Themed Journeys
                    </h1>
                    <p className="text-lg sm:text-xl text-[#2A2A2A] max-w-2xl mx-auto">
                        Interactive collections built around single, captivating ideas to spark imagination.
                    </p>
                </div>
            </div>

            <section className="py-12 lg:py-16">
                <div className="w-full px-4 sm:px-6 lg:px-8 xl:px-12 max-w-7xl mx-auto">
                    {/* Filters */}
                    <div className="bg-white rounded-2xl p-4 mb-8 shadow-lg max-w-xs mx-auto md:mx-0">
                        <div className="flex items-center gap-2 mb-4">
                            <Filter className="w-5 h-5 text-[#4CAF50]" />
                            <span className="font-semibold text-[#101010]">Filter by Mood</span>
                        </div>
                        <select
                            value={moodFilter}
                            onChange={(e) => setMoodFilter(e.target.value)}
                            className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:border-[#4CAF50] focus:outline-none text-sm"
                        >
                            <option value="all">All Moods</option>
                            {moods.map(mood => (
                                <option key={mood} value={mood}>{mood}</option>
                            ))}
                        </select>
                    </div>

                    {/* Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {filteredCollections.map(collection => (
                            <a
                                href={`/theme-collection/${collection.slug}`}
                                key={collection.id}
                                className="group block bg-white rounded-[28px] overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border border-black/5"
                            >
                                <div className="relative aspect-video overflow-hidden">
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10" />
                                    <img
                                        src={collection.coverImage}
                                        alt={collection.title}
                                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                    />
                                    <div className="absolute bottom-4 left-4 z-20 flex items-center gap-2">
                                        <div className="w-8 h-8 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                                            <Disc className="w-4 h-4 text-white" />
                                        </div>
                                        <span className="text-white font-bold tracking-wider text-xs uppercase drop-shadow-md">
                                            {collection.status === 'available' ? 'Explore Journey' : 'Coming Soon'}
                                        </span>
                                    </div>
                                </div>
                                <div className="p-6">
                                    <h3 className="font-['Fredoka_One'] text-2xl text-[#101010] mb-2 group-hover:text-[#4CAF50] transition-colors">
                                        {collection.title}
                                    </h3>
                                    <p className="text-[#2A2A2A]/70 text-sm mb-4 line-clamp-3">
                                        {collection.description}
                                    </p>
                                    <div className="flex items-center gap-2 pt-4 border-t border-gray-100">
                                        <span className="px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-xs font-semibold">
                                            {collection.genre}
                                        </span>
                                        <span className="px-3 py-1 bg-[#4CAF50]/10 text-[#4CAF50] rounded-full text-xs font-bold">
                                            {collection.ageRange}
                                        </span>
                                    </div>
                                </div>
                            </a>
                        ))}
                    </div>
                </div>
            </section>
            <Footer />
        </div>
    );
};

export default ThemeCollections;
