import OptimizedImage from '../components/OptimizedImage';
import { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Music, Sun, Utensils, Zap, PlayCircle, ExternalLink } from 'lucide-react';
import Navigation from '../sections/Navigation';
import Footer from '../sections/Footer';
import SEO from '../components/SEO';

gsap.registerPlugin(ScrollTrigger);

export default function About() {
    const containerRef = useRef<HTMLDivElement>(null);

    useLayoutEffect(() => {
        const ctx = gsap.context(() => {
            // Fade up elements with .fade-up class
            gsap.fromTo('.fade-up',
                { y: 30, opacity: 0 },
                {
                    y: 0,
                    opacity: 1,
                    duration: 0.8,
                    stagger: 0.15,
                    ease: 'power3.out',
                    scrollTrigger: {
                        trigger: containerRef.current,
                        start: 'top 80%',
                    }
                }
            );
        }, containerRef);

        return () => ctx.revert();
    }, []);

    const schemaData = {
        "@context": "https://schema.org",
        "@graph": [
            {
                "@type": "MusicGroup",
                "@id": "https://alybouchnak.com/#artist",
                "name": "Uncle Aly",
                "alternateName": ["Aly Bouchnak", "The Bloom's House"],
                "url": "https://alybouchnak.com/about",
                "image": ["https://alybouchnak.com/images/Aly-bouchnak-profile.webp"],
                "description": "Uncle Aly (Aly Bouchnak) is a children’s music producer creating modern nursery rhymes and movement-based digital pop for toddlers and preschoolers. His music blends playful energy with structured rhythm to support family dance time, routines, and early learning.",
                "genre": ["Children's Music", "Digital Pop"],
                "track": [
                    {
                        "@type": "MusicRecording",
                        "name": "Boom Teka Boom",
                        "url": "https://alybouchnak.com/track/boom-teka-boom"
                    },
                    {
                        "@type": "MusicRecording",
                        "name": "The Yummy Tummy Song",
                        "url": "https://alybouchnak.com/track/the-yummy-spoon"
                    }
                ]
            },
            {
                "@type": "Organization",
                "@id": "https://alybouchnak.com/#organization",
                "name": "The Bloom's House",
                "url": "https://alybouchnak.com",
                "description": "An independent music label and creative studio focused on high-quality, developmental-conscious children's media featuring a signature 3D felt/plushie visual identity.",
                "logo": "https://alybouchnak.com/images/logo.png"
            },
            {
                "@type": "Person",
                "@id": "https://alybouchnak.com/#person",
                "name": "Aly Bouchnak",
                "url": "https://alybouchnak.com",
                "image": "https://alybouchnak.com/images/Aly-bouchnak-profile.webp",
                "description": "Children's music artist specializing in Digital Pop and Functional Sleep Music. Creator of 'The Bloom's House'.",
                "disambiguatingDescription": "Aly Bouchnak is a contemporary children's music artist and songwriter active from 2025.",
                "birthPlace": {
                    "@type": "Place",
                    "name": "Cairo, Egypt"
                },
                "sameAs": [
                    "https://open.spotify.com/artist/1nRdHdUfxacuQeLWFPXqr8",
                    "https://music.apple.com/us/artist/aly-bouchnak/1840274949",
                    "https://amazon.com/music/player/artists/B0FVYF53CC/aly-bouchnak",
                    "https://www.youtube.com/@AlyBouchnak",
                    "https://www.instagram.com/alybouchnak/",
                    "https://www.facebook.com/alybouchnak/",
                    "https://musicbrainz.org/artist/aaec4457-1558-4400-a316-72e14f698922",
                    "https://genius.com/artists/Aly-bouchnak",
                    "https://www.musixmatch.com/artist/Aly-Bouchnak",
                    "https://x.com/aly_bouchnak",
                    "https://www.tiktok.com/@alybouchnak"
                ],
                "alternateName": ["Uncle Aly", "Ali Boshnak", "Ali Boschnak", "Aly Boshnak"]
            },
            {
                "@type": "WebSite",
                "@id": "https://alybouchnak.com/#website",
                "name": "Aly Bouchnak",
                "alternateName": ["Aly Bouchnak Music", "The Bloom's House"],
                "url": "https://alybouchnak.com/",
                "potentialAction": {
                    "@type": "ListenAction",
                    "target": "https://open.spotify.com/artist/1nRdHdUfxacuQeLWFPXqr8"
                }
            },
            {
                "@type": "AboutPage",
                "@id": "https://alybouchnak.com/about",
                "name": "About Uncle Aly & The Bloom's House",
                "description": "Meet Uncle Aly. The Bloom's House offers balanced stimulation & a guilt-free Cocomelon alternative.",
                "url": "https://alybouchnak.com/about",
                "mainEntity": {
                    "@id": "https://alybouchnak.com/#organization"
                }
            }
        ]
    };

    return (
        <>
            <SEO
                title="Aly Bouchnak (Uncle Aly) & The Bloom's House | Modern Kids Music"
                description="Meet Uncle Aly. The Bloom's House offers balanced stimulation & a guilt-free Cocomelon alternative. Gentle parenting music & toddler routine hacks."
                keywords="Uncle Aly, Aly Bouchnak, The Bloom's House, balanced stimulation, Cocomelon alternative, gentle parenting music, SEL songs, toddler routine hacks"
                canonical="https://alybouchnak.com/about"
                ogImage="https://alybouchnak.com/images/Aly-bouchnak-profile.webp"
                ogType="website"
                schemaData={schemaData}
            />

            <div className="relative min-h-screen bg-[#C8F0F7] overflow-hidden" ref={containerRef}>
                <div className="grain-overlay" />
                <Navigation />

                {/* Hero Section */}
                <section className="pt-32 pb-16 lg:pt-40 lg:pb-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
                    <div className="flex flex-col lg:flex-row gap-12 items-center">

                        <div className="w-full lg:w-1/2 fade-up">
                            <div className="relative rounded-3xl overflow-hidden aspect-[4/5] shadow-2xl border-4 border-white/20 transform rotate-1">
                                <OptimizedImage src="/images/Aly-bouchnak-profile.webp" alt="Aly Bouchnak (Uncle Aly)" width={600} height={800} sizes="(max-width: 1024px) 100vw, 50vw" className="w-full h-full object-cover" />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                                <div className="absolute bottom-6 left-6 right-6">
                                    <span className="inline-block bg-[#F9E104] text-[#101010] py-1.5 px-3 rounded-full text-sm font-black mb-2 uppercase tracking-wide">
                                        The Face Behind The Music
                                    </span>
                                    <h1 className="font-['Fredoka_One'] text-4xl text-white drop-shadow-md">
                                        Aly Bouchnak
                                    </h1>
                                </div>
                            </div>
                        </div>

                        <div className="w-full lg:w-1/2 space-y-8">
                            {/* Section 1: Welcome */}
                            <div className="fade-up bg-white/60 backdrop-blur-sm p-8 rounded-3xl border border-white/40 shadow-xl">
                                <h2 className="font-['Fredoka_One'] text-3xl text-[#101010] mb-4 flex items-center gap-3">
                                    <span className="bg-[#F26B3A] text-white w-10 h-10 rounded-full flex items-center justify-center text-xl">👋</span>
                                    Welcome to The Bloom's House
                                </h2>
                                <div className="space-y-4 text-lg text-[#2A2A2A] leading-relaxed">
                                    <p>
                                        Hello friends! I'm Aly Bouchnak, but you can call me <strong>"Uncle Aly."</strong>
                                    </p>
                                    <p>
                                        I created The Bloom's House with a singular mission: providing <strong>"Balanced Stimulation"</strong> for toddlers and preschoolers. We offer a modern, guilt-free <em>"Cocomelon-alternative"</em> for families to dance to. Our upbeat, 110-125 BPM digital pop is engineered to be delightfully happy and catchy without ever overstimulating your kids' developing minds.
                                    </p>
                                </div>
                            </div>

                            {/* Section 2: Utility Focus */}
                            <div className="fade-up bg-[#F7E859]/30 backdrop-blur-sm p-8 rounded-3xl border border-[#F7E859]/50 shadow-xl">
                                <h2 className="font-['Fredoka_One'] text-2xl text-[#101010] mb-6 flex items-center gap-3">
                                    <Music className="w-8 h-8 text-[#F26B3A]" />
                                    Music That Helps You Parent
                                </h2>
                                <p className="text-[#2A2A2A] text-lg mb-6 leading-relaxed">
                                    Parenting is hard work. That's why I write <strong>"Utility Tracks"</strong> designed specifically as gentle parenting hacks to guide your children through daily transitions and routines smoothly.
                                </p>

                                <ul className="space-y-4">
                                    <li className="flex gap-4 items-start bg-white/50 p-4 rounded-xl">
                                        <div className="bg-[#5CE1E6] p-2 rounded-lg shrink-0 mt-1">
                                            <Sun className="w-5 h-5 text-white" />
                                        </div>
                                        <div>
                                            <strong className="text-[#101010] block text-lg mb-1">Morning Energy</strong>
                                            <span className="text-[#2A2A2A]">Wake up and shake off the sleepiness with <em>Boom Teka Boom</em>.</span>
                                        </div>
                                    </li>

                                    <li className="flex gap-4 items-start bg-white/50 p-4 rounded-xl">
                                        <div className="bg-[#F26B3A] p-2 rounded-lg shrink-0 mt-1">
                                            <Utensils className="w-5 h-5 text-white" />
                                        </div>
                                        <div>
                                            <strong className="text-[#101010] block text-lg mb-1">Mealtime Helpers</strong>
                                            <span className="text-[#2A2A2A]">Make eating fun and less of a struggle with <em>The Yummy Tummy Song</em>.</span>
                                        </div>
                                    </li>

                                    <li className="flex gap-4 items-start bg-white/50 p-4 rounded-xl">
                                        <div className="bg-[#F9E104] p-2 rounded-lg shrink-0 mt-1">
                                            <Zap className="w-5 h-5 text-[#101010]" />
                                        </div>
                                        <div>
                                            <strong className="text-[#101010] block text-lg mb-1">Playtime Anthems</strong>
                                            <span className="text-[#2A2A2A]">Burn off energy and build gross motor skills with <em>Pet-Pop</em> and the viral hit <em>Bock Bock Bock Chicken</em>.</span>
                                        </div>
                                    </li>
                                </ul>
                            </div>

                        </div>
                    </div>
                </section>

                {/* Section 3: About The Label */}
                <section className="py-12 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto fade-up">
                    <div className="bg-[#101010] text-[#F9FAFB] p-8 sm:p-12 rounded-3xl shadow-2xl relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-64 h-64 bg-[#F26B3A]/20 blur-[100px] rounded-full pointer-events-none" />
                        <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#5CE1E6]/20 blur-[100px] rounded-full pointer-events-none" />

                        <h2 className="font-['Fredoka_One'] text-3xl text-white mb-6 relative z-10">
                            About The Bloom's House Studio
                        </h2>
                        <p className="text-lg leading-relaxed text-slate-300 relative z-10">
                            The Bloom's House is an independent music label and high-quality production studio dedicated to crafting safe, developmental-conscious media for the next generation. We are distinguished by our signature 3D felt-and-plushie visual identity, which provides a warm, tactile aesthetic that feels like a comforting hug. Behind the scenes, our deliberate, calming pacing and pristine pop production ensure that every song and video is a premium experience that respects a child's cognitive development while remaining genuinely enjoyable for adults.
                        </p>
                    </div>
                </section>

                {/* Section 4: Call to Action */}
                <section className="pt-8 pb-24 px-4 sm:px-6 lg:px-8 max-w-3xl mx-auto text-center fade-up mt-8">
                    <div className="bg-gradient-to-br from-[#F26B3A] to-[#E9521E] p-10 sm:p-14 rounded-[3rem] shadow-2xl text-white relative overflow-hidden group">
                        <div className="absolute inset-0 bg-[#F9E104] opacity-0 group-hover:opacity-10 transition-opacity duration-500" />

                        <h2 className="font-['Fredoka_One'] text-3xl sm:text-4xl mb-6 shadow-sm">
                            Ready to start the Dance Party?
                        </h2>
                        <p className="text-lg sm:text-xl text-white/90 mb-10 max-w-xl mx-auto leading-relaxed">
                            Join thousands of families turning tantrums into togetherness. Stream our official "Bouncy Beats for Little Feet" playlist and make every daily routine a joy.
                        </p>

                        <a
                            href="https://open.spotify.com/artist/1nRdHdUfxacuQeLWFPXqr8"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-3 bg-[#101010] text-white px-8 py-5 rounded-full font-black text-lg sm:text-xl hover:bg-[#F9E104] hover:text-[#101010] transition-all transform hover:scale-105 hover:-rotate-1 shadow-xl active:scale-95"
                        >
                            <PlayCircle className="w-6 h-6" />
                            Listen to Bouncy Beats
                            <ExternalLink className="w-5 h-5 ml-2" />
                        </a>
                    </div>
                </section>

                <Footer />
            </div>
        </>
    );
}
