import { useState, useMemo } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Play, Filter } from 'lucide-react';
import Navigation from '../sections/Navigation';
import Footer from '../sections/Footer';
import SEO from '../components/SEO';
import Breadcrumbs from '../components/Breadcrumbs';
import { getAllPlaylists } from '../data/playlists';

gsap.registerPlugin(ScrollTrigger);

const Playlists = () => {
    const playlists = getAllPlaylists();
    const [moodFilter, setMoodFilter] = useState<string>('all');

    // Get unique moods
    const moods = [...new Set(playlists.map(p => p.mood))].sort();

    const filteredPlaylists = useMemo(() => {
        let filtered = playlists;
        if (moodFilter !== 'all') {
            filtered = filtered.filter(p => p.mood === moodFilter);
        }
        return filtered;
    }, [playlists, moodFilter]);

    const schemaData = {
        '@context': 'https://schema.org',
        '@type': 'CollectionPage',
        name: 'Curated Playlists | Aly Bouchnak',
        description: 'Explore curated music playlists for your kids.',
        url: 'https://alybouchnak.com/playlists'
    };

    return (
        <div className="relative min-h-screen bg-[#C8F0F7]">
            <SEO
                title="Curated Playlists | Aly Bouchnak"
                description="Explore curated music playlists designed for early childhood development."
                keywords="toddler playlists, educational music playlists"
                canonical="https://alybouchnak.com/playlists"
                ogType="website"
                schemaData={schemaData}
            />

            <div className="grain-overlay" />
            <Navigation />
            <Breadcrumbs />

            {/* Header */}
            <div className="pt-32 pb-16 bg-gradient-to-b from-[#F26B3A]/20 to-transparent">
                <div className="w-full px-4 sm:px-6 lg:px-8 xl:px-12 text-center">
                    <h1 className="font-['Fredoka_One'] text-4xl sm:text-5xl lg:text-5xl text-[#101010] mb-4">
                        Curated Playlists
                    </h1>
                    <p className="text-lg sm:text-xl text-[#2A2A2A] max-w-2xl mx-auto">
                        Songs grouped perfectly for every moment of your toddler's day.
                    </p>
                </div>
            </div>

            <section className="py-12 lg:py-16">
                <div className="w-full px-4 sm:px-6 lg:px-8 xl:px-12 max-w-7xl mx-auto">
                    {/* Filters */}
                    <div className="bg-white rounded-2xl p-4 mb-8 shadow-lg max-w-xs mx-auto md:mx-0">
                        <div className="flex items-center gap-2 mb-4">
                            <Filter className="w-5 h-5 text-[#F26B3A]" />
                            <span className="font-semibold text-[#101010]">Filter Playlists</span>
                        </div>
                        <select
                            value={moodFilter}
                            onChange={(e) => setMoodFilter(e.target.value)}
                            className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:border-[#F26B3A] focus:outline-none text-sm"
                        >
                            <option value="all">All Moods</option>
                            {moods.map(mood => (
                                <option key={mood} value={mood}>{mood}</option>
                            ))}
                        </select>
                    </div>

                    {/* Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {filteredPlaylists.map(playlist => (
                            <a
                                href={`/playlist/${playlist.slug}`}
                                key={playlist.id}
                                className="group block bg-white rounded-3xl p-4 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border border-black/5"
                            >
                                <div className="relative aspect-square rounded-2xl overflow-hidden mb-6">
                                    <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors z-10" />
                                    <img
                                        src={playlist.coverImage}
                                        alt={playlist.title}
                                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                    />
                                    <div className="absolute inset-0 flex items-center justify-center z-20 opacity-0 group-hover:opacity-100 transition-opacity">
                                        <div className="w-16 h-16 bg-[#F26B3A] text-white rounded-full flex items-center justify-center shadow-2xl scale-75 group-hover:scale-100 transition-all duration-300">
                                            <Play className="w-8 h-8 ml-1" />
                                        </div>
                                    </div>
                                    <div className="absolute top-4 right-4 z-20 px-3 py-1 bg-white/90 backdrop-blur-sm rounded-full text-xs font-bold text-[#F26B3A] shadow-md">
                                        {playlist.trackCount} Tracks
                                    </div>
                                </div>
                                <div className="px-2">
                                    <h3 className="font-['Fredoka_One'] text-2xl text-[#101010] mb-2 group-hover:text-[#F26B3A] transition-colors">
                                        {playlist.title}
                                    </h3>
                                    <p className="text-[#2A2A2A]/70 text-sm mb-4 line-clamp-2">
                                        {playlist.description}
                                    </p>
                                    <div className="flex items-center gap-2">
                                        <span className="px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-xs font-semibold">
                                            {playlist.mood}
                                        </span>
                                        <span className="px-3 py-1 bg-[#F7E859]/30 text-yellow-800 rounded-full text-xs font-semibold">
                                            {playlist.ageRange}
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

export default Playlists;
