import { useEffect, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
    Calendar,
    User,
    Clock,
    ArrowLeft,
    Share2,
    Tag,
    Music,
    Disc,
    ExternalLink,
    ChevronRight
} from 'lucide-react';
import Navigation from '../sections/Navigation';
import Footer from '../sections/Footer';
import SEO from '../components/SEO';
import OptimizedImage from '../components/OptimizedImage';
import { getArticleBySlug } from '../data/articles';
import type { Article } from '../data/articles';
import { tracks } from '../data/tracks';
import { albums } from '../data/albums';
import { useEngagementTracking } from '../hooks/useEngagementTracking';

gsap.registerPlugin(ScrollTrigger);

function DynamicArticlePage() {
    const { slug } = useParams<{ slug: string }>();
    const article = getArticleBySlug(slug || '') as Article;

    const articleRef = useRef<HTMLDivElement>(null);
    const headerRef = useRef<HTMLDivElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);

    // Track engagement
    useEngagementTracking(article?.title || 'Article Page');

    useEffect(() => {
        if (!article) return;

        window.scrollTo(0, 0);

        const ctx = gsap.context(() => {
            // Header Animation
            gsap.fromTo(headerRef.current,
                { opacity: 0, y: 30 },
                { opacity: 1, y: 0, duration: 1, ease: 'power3.out' }
            );

            // Paragraph Stagger
            const paragraphs = contentRef.current?.querySelectorAll('p, h2, h3, ul, .related-entity');
            if (paragraphs) {
                gsap.fromTo(paragraphs,
                    { opacity: 0, y: 20 },
                    {
                        opacity: 1,
                        y: 0,
                        duration: 0.6,
                        stagger: 0.1,
                        scrollTrigger: {
                            trigger: contentRef.current,
                            start: 'top 85%',
                            toggleActions: 'play none none reverse'
                        }
                    }
                );
            }
        });

        return () => ctx.revert();
    }, [article]);

    if (!article) {
        return (
            <div className="relative min-h-screen bg-slate-50">
                <Navigation />
                <div className="pt-32 pb-16 text-center">
                    <h1 className="font-['Fredoka_One'] text-4xl text-slate-900 mb-4">Article Not Found</h1>
                    <p className="text-lg text-slate-600">The page you are looking for has moved or does not exist.</p>
                    <Link to="/" className="inline-block mt-8 text-[#F26B3A] font-bold hover:underline">Return Home</Link>
                </div>
                <Footer />
            </div>
        );
    }

    // Find related data
    const relatedTracksData = tracks.filter(t => article.connections.relatedTracks.includes(t.id));
    const relatedAlbumsData = albums.filter(a => article.connections.relatedAlbums.includes(a.slug));

    return (
        <div className="relative min-h-screen bg-slate-50">
            <SEO
                title={article.seo.title}
                description={article.seo.description}
                keywords={article.seo.keywords.join(', ')}
                ogImage={article.coverImage.url}
                ogType="article"
            />

            {/* JSON-LD Schema defined directly in component to ensure it's picked up by crawlers */}
            <script type="application/ld+json">
                {JSON.stringify(article.articleSchema)}
            </script>

            <Navigation />

            <main ref={articleRef} className="pt-24 lg:pt-32 pb-16 lg:pb-24">
                {/* Back Button */}
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
                    <Link to="/" className="inline-flex items-center gap-2 text-slate-500 hover:text-[#F26B3A] transition-colors font-medium">
                        <ArrowLeft className="w-4 h-4" />
                        Back to Bloom's House
                    </Link>
                </div>

                {/* Article Header */}
                <header ref={headerRef} className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mb-12 lg:mb-16">
                    <span className="inline-block px-3 py-1 bg-[#C8F0F7] text-[#0891b2] text-xs font-bold rounded-full mb-4 uppercase tracking-wider">
                        {article.category}
                    </span>
                    <h1 className="font-['Fredoka_One'] text-4xl sm:text-5xl lg:text-6xl text-slate-900 mb-6 leading-tight">
                        {article.title}
                    </h1>

                    <div className="flex flex-wrap items-center gap-6 text-slate-500 text-sm border-b border-slate-200 pb-8">
                        <div className="flex items-center gap-2">
                            <User className="w-4 h-4" />
                            <span className="font-bold text-slate-900">{article.author.name}</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <Calendar className="w-4 h-4" />
                            {new Date(article.datePublished).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                        </div>
                        <div className="flex items-center gap-2">
                            <Clock className="w-4 h-4" />
                            {article.seo.readingTime} read
                        </div>
                        <button className="ml-auto p-2 hover:bg-slate-100 rounded-full transition-colors">
                            <Share2 className="w-5 h-5" />
                        </button>
                    </div>
                </header>

                {/* Featured Image */}
                <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 mb-12 lg:mb-16">
                    <figure>
                        <div className="aspect-[21/9] rounded-3xl overflow-hidden shadow-2xl bg-slate-200">
                            <OptimizedImage
                                src={article.coverImage.url}
                                alt={article.coverImage.caption}
                                width={1200}
                                height={600}
                                className="w-full h-full object-cover"
                            />
                        </div>
                        {article.coverImage.caption && (
                            <figcaption className="text-center text-slate-500 text-sm mt-4 italic">
                                {article.coverImage.caption}
                            </figcaption>
                        )}
                    </figure>
                </div>

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-12">
                    {/* Main Content Area */}
                    <div ref={contentRef} className="lg:col-span-8">
                        <div className="prose prose-lg prose-slate max-w-none 
              prose-headings:font-['Fredoka_One'] prose-headings:text-slate-900 
              prose-h2:text-3xl prose-h2:mt-12 prose-h2:mb-6
              prose-p:text-slate-700 prose-p:leading-relaxed prose-p:mb-6
              prose-strong:text-slate-900 prose-strong:font-bold
              prose-ul:list-disc prose-ul:pl-6
              prose-img:rounded-3xl prose-img:shadow-lg">

                            <div dangerouslySetInnerHTML={{ __html: article.content }} />

                            {/* Related YouTube Video */}
                            {article.connections.youtubeVideoId && (
                                <div className="my-12">
                                    <h2 className="text-2xl mb-6">Experience the Visuals</h2>
                                    <div className="aspect-video rounded-3xl overflow-hidden shadow-2xl bg-black">
                                        <iframe
                                            width="100%"
                                            height="100%"
                                            src={`https://www.youtube.com/embed/${article.connections.youtubeVideoId}`}
                                            title="Featured Video"
                                            frameBorder="0"
                                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                            allowFullScreen
                                        ></iframe>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Tags */}
                        <div className="mt-16 pt-8 border-t border-slate-200 flex flex-wrap gap-2">
                            <Tag className="w-5 h-5 text-slate-400 mr-2" />
                            {article.seo.keywords.map(tag => (
                                <span key={tag} className="px-3 py-1 bg-slate-100 text-slate-600 text-sm rounded-full hover:bg-slate-200 cursor-pointer transition-colors">
                                    #{tag}
                                </span>
                            ))}
                        </div>
                    </div>

                    {/* Sidebar / Related Music Hub */}
                    <aside className="lg:col-span-4 space-y-10">
                        {/* Related Tracks */}
                        {relatedTracksData.length > 0 && (
                            <div className="bg-white rounded-[2rem] p-8 shadow-xl border border-slate-100">
                                <h3 className="font-['Fredoka_One'] text-xl text-slate-900 mb-6 flex items-center gap-2">
                                    <Music className="w-6 h-6 text-[#F26B3A]" />
                                    Featured Tracks
                                </h3>
                                <div className="space-y-4">
                                    {relatedTracksData.map(track => (
                                        <Link
                                            key={track.id}
                                            to={`/track/${track.slug}`}
                                            className="related-entity group flex items-center gap-4 p-3 rounded-2xl hover:bg-slate-50 transition-all border border-transparent hover:border-slate-100"
                                        >
                                            <div className="w-16 h-16 rounded-xl overflow-hidden flex-shrink-0 shadow-md">
                                                <OptimizedImage src={track.coverImage} alt={track.title} width={100} height={100} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300" />
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <h4 className="font-bold text-slate-900 text-sm truncate">{track.title}</h4>
                                                <p className="text-xs text-slate-500">{track.genre}</p>
                                            </div>
                                            <ChevronRight className="w-4 h-4 text-slate-300 group-hover:text-[#F26B3A] transition-colors" />
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Related Albums */}
                        {relatedAlbumsData.length > 0 && (
                            <div className="bg-slate-900 text-white rounded-[2rem] p-8 shadow-xl overflow-hidden relative">
                                <div className="absolute top-0 right-0 p-4 opacity-10">
                                    <Disc className="w-32 h-32 rotate-12" />
                                </div>
                                <h3 className="font-['Fredoka_One'] text-xl mb-6 flex items-center gap-2 relative z-10">
                                    <Disc className="w-6 h-6 text-[#F7E859]" />
                                    Full Albums
                                </h3>
                                <div className="space-y-6 relative z-10">
                                    {relatedAlbumsData.map(album => (
                                        <div key={album.slug} className="related-entity">
                                            <div className="aspect-square rounded-2xl overflow-hidden mb-4 shadow-lg group">
                                                <OptimizedImage src={album.coverImage} alt={album.title} width={400} height={400} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                                            </div>
                                            <h4 className="font-bold text-lg mb-1">{album.title}</h4>
                                            <p className="text-white/60 text-sm mb-4 line-clamp-2">{album.subtitle}</p>
                                            <Link
                                                to={`/album/${album.slug}`}
                                                className="inline-flex items-center gap-2 text-[#F7E859] text-sm font-bold hover:gap-3 transition-all underline underline-offset-4"
                                            >
                                                Listen Now
                                                <ExternalLink className="w-4 h-4" />
                                            </Link>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Newsletter Hook / Call to Action */}
                        <div className="bg-[#F26B3A] rounded-[2rem] p-8 text-white shadow-xl shadow-orange-500/20">
                            <h3 className="font-['Fredoka_One'] text-xl mb-4">Stay Connected</h3>
                            <p className="text-sm opacity-90 mb-6">Join the Founder's Club for early access to songs and developmental resources.</p>
                            <button className="w-full py-3 bg-white text-[#F26B3A] font-bold rounded-xl hover:bg-[#F7E859] transition-colors shadow-lg">
                                Join the Club
                            </button>
                        </div>
                    </aside>
                </div>
            </main>

            <Footer />
        </div>
    );
}

export default DynamicArticlePage;
