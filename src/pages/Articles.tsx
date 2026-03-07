import { useState, useMemo } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ChevronRight, Filter, Clock, CalendarDays } from 'lucide-react';
import Navigation from '../sections/Navigation';
import Footer from '../sections/Footer';
import SEO from '../components/SEO';
import Breadcrumbs from '../components/Breadcrumbs';
import { getAllArticles } from '../data/articles';

gsap.registerPlugin(ScrollTrigger);

const Articles = () => {
    const articles = getAllArticles();
    const [categoryFilter, setCategoryFilter] = useState<string>('all');

    // Sort articles by post date
    const sortedArticles = [...articles].sort((a, b) => new Date(b.datePublished).getTime() - new Date(a.datePublished).getTime());

    // Get unique categories
    const categories = [...new Set(articles.map(a => a.category))].sort();

    const filteredArticles = useMemo(() => {
        let filtered = sortedArticles;
        if (categoryFilter !== 'all') {
            filtered = filtered.filter(a => a.category === categoryFilter);
        }
        return filtered;
    }, [sortedArticles, categoryFilter]);

    // Separate featured article (latest) from the rest for layout purposes
    const featuredArticle = categoryFilter === 'all' && filteredArticles.length > 0 ? filteredArticles[0] : null;
    const gridArticles = featuredArticle ? filteredArticles.slice(1) : filteredArticles;

    const schemaData = {
        '@context': 'https://schema.org',
        '@type': 'Blog',
        name: 'News & Articles | Aly Bouchnak',
        description: 'Read the latest updates, parental resources, and music news.',
        url: 'https://alybouchnak.com/articles'
    };

    return (
        <div className="relative min-h-screen bg-slate-50">
            <SEO
                title="News & Articles | Aly Bouchnak"
                description="Read the latest updates, parental resources, and music news."
                keywords="toddler development articles, educational music blog, Aly Bouchnak news"
                canonical="https://alybouchnak.com/articles"
                ogType="website"
                schemaData={schemaData}
            />

            <Navigation />
            <Breadcrumbs />

            {/* Header */}
            <div className="pt-32 pb-16 bg-white border-b border-gray-100">
                <div className="w-full px-4 sm:px-6 lg:px-8 xl:px-12 text-center">
                    <h1 className="font-['Fredoka_One'] text-4xl sm:text-5xl lg:text-5xl text-slate-900 mb-4">
                        News & Articles
                    </h1>
                    <p className="text-lg sm:text-xl text-slate-500 max-w-2xl mx-auto">
                        Deep dives into the science of sound, parenting tips, and release notes.
                    </p>
                </div>
            </div>

            <section className="py-12 lg:py-16">
                <div className="w-full px-4 sm:px-6 lg:px-8 xl:px-12 max-w-7xl mx-auto">
                    {/* Filters */}
                    <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-12">
                        <div className="flex items-center gap-2">
                            <Filter className="w-5 h-5 text-slate-400" />
                            <span className="font-semibold text-slate-700">Filter by Category</span>
                        </div>
                        <div className="flex flex-wrap gap-2">
                            <button
                                onClick={() => setCategoryFilter('all')}
                                className={`px-4 py-2 rounded-full text-sm font-bold transition-all ${categoryFilter === 'all' ? 'bg-slate-900 text-white shadow-md' : 'bg-white text-slate-600 border border-slate-200 hover:border-slate-300'}`}
                            >
                                All
                            </button>
                            {categories.map(cat => (
                                <button
                                    key={cat}
                                    onClick={() => setCategoryFilter(cat)}
                                    className={`px-4 py-2 rounded-full text-sm font-bold transition-all ${categoryFilter === cat ? 'bg-orange-500 text-white shadow-md' : 'bg-white text-slate-600 border border-slate-200 hover:border-slate-300'}`}
                                >
                                    {cat}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Featured Article */}
                    {featuredArticle && (
                        <a
                            href={`/article/${featuredArticle.slug}`}
                            className="group block mb-12 bg-white rounded-[2rem] overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-slate-100 relative"
                        >
                            <div className="absolute top-6 left-6 z-20 px-4 py-1.5 bg-white/90 backdrop-blur-sm rounded-full text-xs font-black uppercase tracking-wider text-orange-500 shadow-sm">
                                Latest Post
                            </div>
                            <div className="grid grid-cols-1 lg:grid-cols-2">
                                <div className="aspect-video lg:aspect-auto h-full overflow-hidden">
                                    <img
                                        src={featuredArticle.coverImage.url}
                                        alt={featuredArticle.title}
                                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                    />
                                </div>
                                <div className="p-8 lg:p-12 flex flex-col justify-center">
                                    <div className="flex items-center gap-4 text-xs font-bold text-slate-400 mb-4 uppercase tracking-wider">
                                        <span className="text-orange-500 bg-orange-50 px-3 py-1 rounded-full">{featuredArticle.category}</span>
                                        <span className="flex items-center gap-1.5"><CalendarDays className="w-4 h-4" /> {new Date(featuredArticle.datePublished).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                                        <span className="flex items-center gap-1.5"><Clock className="w-4 h-4" /> {featuredArticle.seo.readingTime}</span>
                                    </div>
                                    <h2 className="text-3xl lg:text-4xl font-black text-slate-900 mb-4 group-hover:text-orange-500 transition-colors leading-tight">
                                        {featuredArticle.title}
                                    </h2>
                                    <p className="text-slate-500 text-lg mb-8 leading-relaxed">
                                        {featuredArticle.description}
                                    </p>
                                    <div className="flex items-center gap-2 text-slate-900 font-bold group-hover:gap-4 transition-all">
                                        Read Article <ChevronRight className="w-5 h-5 text-orange-500" />
                                    </div>
                                </div>
                            </div>
                        </a>
                    )}

                    {/* Standard Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {gridArticles.map(article => (
                            <a
                                href={`/article/${article.slug}`}
                                key={article.id}
                                className="group flex flex-col bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-slate-100"
                            >
                                <div className="relative aspect-video overflow-hidden">
                                    <img
                                        src={article.coverImage.url}
                                        alt={article.title}
                                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                    />
                                </div>
                                <div className="p-6 flex-1 flex flex-col">
                                    <div className="flex items-center gap-4 text-xs font-bold text-slate-400 mb-3 uppercase tracking-wider">
                                        <span className="text-orange-500">{article.category}</span>
                                        <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {article.seo.readingTime}</span>
                                    </div>
                                    <h3 className="text-xl font-black text-slate-900 mb-3 group-hover:text-orange-500 transition-colors leading-tight">
                                        {article.title}
                                    </h3>
                                    <p className="text-slate-500 text-sm mb-6 flex-1 line-clamp-3">
                                        {article.description}
                                    </p>
                                    <div className="flex items-center gap-2 text-slate-900 font-bold text-sm group-hover:gap-3 transition-all mt-auto pt-4 border-t border-slate-100">
                                        Read Full Report <ChevronRight className="w-4 h-4 text-orange-500" />
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

export default Articles;
