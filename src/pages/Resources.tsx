import { useMemo } from 'react';
import { ChevronRight, Clock, CalendarDays } from 'lucide-react';
import Navigation from '../sections/Navigation';
import Footer from '../sections/Footer';
import SEO from '../components/SEO';
import Breadcrumbs from '../components/Breadcrumbs';
import OptimizedImage from '../components/OptimizedImage';
import { getAllArticles } from '../data/articles';
import { formatDate } from '../lib/formatDate';

const Resources = () => {
    const articles = getAllArticles();

    const resourceArticles = useMemo(() => {
        return articles
            .filter(a => a.category === 'Resources')
            .sort((a, b) => new Date(b.datePublished).getTime() - new Date(a.datePublished).getTime());
    }, [articles]);

    const featuredArticle = resourceArticles.length > 0 ? resourceArticles[0] : null;
    const gridArticles = featuredArticle ? resourceArticles.slice(1) : resourceArticles;

    const schemaData = {
        '@context': 'https://schema.org',
        '@type': 'CollectionPage',
        name: 'Resources | Aly Bouchnak',
        description: 'Educational resources, parenting guides, and developmental audio design insights from Aly Bouchnak.',
        url: 'https://alybouchnak.com/resources'
    };

    return (
        <div className="relative min-h-screen bg-slate-50">
            <SEO
                title="Resources | Aly Bouchnak"
                description="Educational resources, parenting guides, and developmental audio design insights from Aly Bouchnak."
                keywords="parenting resources, child development music, educational audio, Aly Bouchnak resources"
                canonical="https://alybouchnak.com/resources"
                ogType="website"
                schemaData={schemaData}
            />

            <Navigation />
            <Breadcrumbs />

            {/* Header */}
            <div className="pt-32 pb-16 bg-white border-b border-gray-100">
                <div className="w-full px-4 sm:px-6 lg:px-8 xl:px-12 text-center">
                    <h1 className="font-['Fredoka_One'] text-4xl sm:text-5xl lg:text-5xl text-slate-900 mb-4">
                        Resources
                    </h1>
                    <p className="text-lg sm:text-xl text-slate-500 max-w-2xl mx-auto">
                        Educational guides, developmental insights, and parenting resources powered by music science.
                    </p>
                </div>
            </div>

            <section className="py-12 lg:py-16">
                <div className="w-full px-4 sm:px-6 lg:px-8 xl:px-12 max-w-7xl mx-auto">
                    {resourceArticles.length === 0 && (
                        <p className="text-center text-slate-500 py-20 text-lg">No resources available yet. Stay tuned!</p>
                    )}

                    {/* Featured Article */}
                    {featuredArticle && (
                        <a
                            href={`/article/${featuredArticle.slug}`}
                            className="group block mb-12 bg-white rounded-[2rem] overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-slate-100 relative"
                        >
                            <div className="absolute top-6 left-6 z-20 px-4 py-1.5 bg-white/90 backdrop-blur-sm rounded-full text-xs font-black uppercase tracking-wider text-orange-500 shadow-sm">
                                Featured
                            </div>
                            <div className="grid grid-cols-1 lg:grid-cols-2">
                                <div className="aspect-video lg:aspect-auto h-full overflow-hidden">
                                    <OptimizedImage
                                        src={featuredArticle.coverImage.url}
                                        alt={featuredArticle.title}
                                        width={800}
                                        height={600}
                                        sizes="(max-width: 1024px) 100vw, 50vw"
                                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                    />
                                </div>
                                <div className="p-8 lg:p-12 flex flex-col justify-center">
                                    <div className="flex items-center gap-4 text-xs font-bold text-slate-400 mb-4 uppercase tracking-wider">
                                        <span className="text-orange-500 bg-orange-50 px-3 py-1 rounded-full">{featuredArticle.category}</span>
                                        <span className="flex items-center gap-1.5"><CalendarDays className="w-4 h-4" /> {formatDate(featuredArticle.datePublished)}</span>
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
                                    <OptimizedImage
                                        src={article.coverImage.url}
                                        alt={article.title}
                                        width={400}
                                        height={300}
                                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                    />
                                </div>
                                <div className="p-6 flex-1 flex flex-col">
                                    <div className="flex items-center gap-4 text-xs font-bold text-slate-400 mb-3 uppercase tracking-wider">
                                        <span className="flex items-center gap-1.5"><CalendarDays className="w-3 h-3" /> {formatDate(article.datePublished)}</span>
                                        <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {article.seo.readingTime}</span>
                                    </div>
                                    <h3 className="text-xl font-black text-slate-900 mb-3 group-hover:text-orange-500 transition-colors leading-tight">
                                        {article.title}
                                    </h3>
                                    <p className="text-slate-500 text-sm mb-6 flex-1 line-clamp-3">
                                        {article.description}
                                    </p>
                                    <div className="flex items-center gap-2 text-slate-900 font-bold text-sm group-hover:gap-3 transition-all mt-auto pt-4 border-t border-slate-100">
                                        Read Full Article <ChevronRight className="w-4 h-4 text-orange-500" />
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

export default Resources;
