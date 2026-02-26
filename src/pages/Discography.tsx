import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Sun, Moon, Music, ExternalLink, Disc } from 'lucide-react';
import Navigation from '../sections/Navigation';
import Footer from '../sections/Footer';
import SEO from '../components/SEO';
import Breadcrumbs from '../components/Breadcrumbs';
import { getAllAlbums } from '../data/albums';

gsap.registerPlugin(ScrollTrigger);

// Get albums from centralized data
const allAlbums = getAllAlbums();

// Separate albums by mood
const daytimeReleases = allAlbums.filter(album => album.mood === 'Playful' || album.mood === 'Energetic');
const sleepReleases = allAlbums.filter(album => album.mood === 'Calming' || album.mood === 'Transitional');

// Schema.org for discography page
const discographySchema = {
  '@context': 'https://schema.org',
  '@type': 'CollectionPage',
  '@id': 'https://alybouchnak.com/discography#discography',
  url: 'https://alybouchnak.com/discography',
  name: "Aly Bouchnak Discography | Toddler & Preschool Music",
  description: "Browse complete music catalog of Aly Bouchnak, including high-energy toddler dance songs and calming sleep albums from The Bloom's House.",
  inLanguage: 'en',
  isPartOf: {
    '@type': 'WebSite',
    '@id': 'https://alybouchnak.com/#website'
  },
  about: {
    '@type': 'MusicGroup',
    '@id': 'https://alybouchnak.com/#artist'
  },
  mainEntity: {
    '@type': 'ItemList',
    numberOfItems: [
      ...daytimeReleases.filter(r => r.status === 'available'),
      ...sleepReleases
    ].length,
    itemListOrder: 'https://schema.org/ItemListOrderAscending',
    itemListElement: [
      ...daytimeReleases
        .filter(r => r.status === 'available')
        .map((release, index) => ({
          '@type': 'ListItem',
          position: index + 1,
          item: {
            '@type': 'MusicRecording',
            '@id': `https://alybouchnak.com${release.link}#track`,
            name: release.title,
            url: release.link?.startsWith('http')
              ? release.link
              : `https://alybouchnak.com${release.link}`,
            image: release.image
              ? `https://alybouchnak.com${release.image}` 
              : undefined,
            datePublished: release.date,
            description: release.description,
            byArtist: {
              '@id': 'https://alybouchnak.com/#artist'
            }
          },
        })),

      ...sleepReleases.map((release, index) => ({
        '@type': 'ListItem',
        position:
          daytimeReleases.filter(r => r.status === 'available').length +
          index +
          1,
        item: {
          '@type': 'MusicAlbum',
          '@id': `https://alybouchnak.com${release.link}#album`,
          name: release.title,
          url: release.link?.startsWith('http')
            ? release.link
            : `https://alybouchnak.com${release.link}`,
          image: release.image
            ? `https://alybouchnak.com${release.image}` 
            : undefined,
          datePublished: release.date,
          description: release.description,
          byArtist: {
            '@id': 'https://alybouchnak.com/#artist'
          }
        },
      })),
    ],
  },
};

const Discography = () => {
  const headerRef = useRef<HTMLDivElement>(null);
  const daytimeRef = useRef<HTMLDivElement>(null);
  const sleepRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Header animation
      gsap.fromTo(headerRef.current,
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          scrollTrigger: {
            trigger: headerRef.current,
            start: 'top 85%',
            toggleActions: 'play none none reverse',
          }
        }
      );

      // Daytime releases
      if (daytimeRef.current) {
        const cards = daytimeRef.current.querySelectorAll('.release-card');
        gsap.fromTo(cards,
          { y: 50, opacity: 0, scale: 0.95 },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 0.5,
            stagger: 0.08,
            scrollTrigger: {
              trigger: daytimeRef.current,
              start: 'top 80%',
              toggleActions: 'play none none reverse',
            }
          }
        );
      }

      // Sleep releases
      if (sleepRef.current) {
        const cards = sleepRef.current.querySelectorAll('.release-card');
        gsap.fromTo(cards,
          { y: 50, opacity: 0, scale: 0.95 },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 0.5,
            stagger: 0.08,
            scrollTrigger: {
              trigger: sleepRef.current,
              start: 'top 80%',
              toggleActions: 'play none none reverse',
            }
          }
        );
      }
    });

    return () => ctx.revert();
  }, []);

  const getButtonText = (status: string, type: string) => {
    if (!status || status === 'coming-soon') return 'Coming Soon';
    if (type === 'EP' || type === 'Album') return 'Listen';
    return 'Stream Now';
  };

  return (
    <div className="relative min-h-screen bg-[#C8F0F7]">
      <SEO
        title="Aly Bouchnak Discography | Toddler Dance Songs, Preschool Music & Sleep Albums"
        description="Explore the complete discography of Aly Bouchnak, featuring toddler dance songs, preschool learning tracks, and calming sleep albums from The Bloom’s House universe."
        keywords="Aly Bouchnak discography, toddler dance songs, preschool music, kids learning songs, children's sleep music, The Bloom's House album"
        canonical="https://alybouchnak.com/discography"
        ogImage="https://alybouchnak.com/images/social-preview.png"
        ogType="music.playlist"
        schemaData={discographySchema}
      />

      {/* Grain overlay */}
      <div className="grain-overlay" />
      
      <Navigation />
      <Breadcrumbs />

      {/* Header */}
      <div ref={headerRef} className="pt-32 pb-16 bg-[#F7E859]">
        <div className="w-full px-4 sm:px-6 lg:px-8 xl:px-12 text-center">
          <h1 className="font-['Fredoka_One'] text-4xl sm:text-5xl lg:text-6xl text-[#101010] mb-4">
            Complete Discography
          </h1>
          <p className="text-lg sm:text-xl text-[#2A2A2A] max-w-2xl mx-auto">
            Functional Music for Toddler Routines
          </p>
        </div>
      </div>

      {/* Latest Albums Section */}
      <section className="py-16 lg:py-24 bg-gradient-to-b from-[#F7E859]/20 to-transparent">
        <div className="w-full px-4 sm:px-6 lg:px-8 xl:px-12">
          <div className="max-w-6xl mx-auto">
            <div className="flex items-center gap-3 mb-10">
              <div className="w-12 h-12 bg-[#F26B3A] rounded-full flex items-center justify-center">
                <Disc className="w-6 h-6 text-white" />
              </div>
              <h2 className="font-['Fredoka_One'] text-3xl sm:text-4xl text-[#101010]">
                Latest Albums
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* Tuned for Dreams */}
              <article className="bg-white rounded-3xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
                <div className="aspect-square overflow-hidden">
                  <img
                    src="/images/dreams-cover.webp"
                    alt="Tuned for Dreams album cover"
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                  />
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#240046] text-white text-sm font-semibold rounded-full">
                      <Moon className="w-4 h-4" />
                      Sleep
                    </span>
                    <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white/60 text-[#101010] text-sm font-semibold rounded-full">
                      8 Tracks
                    </span>
                  </div>
                  <h3 className="font-['Fredoka_One'] text-xl text-[#101010] mb-2">
                    Tuned for Dreams
                  </h3>
                  <p className="text-sm text-[#2A2A2A] mb-4">
                    A psychoacoustic sleep album designed on the ISO Principle, moving infants from wakefulness to deep sleep through physiological deceleration.
                  </p>
                  <a
                    href="#/album/tuned-for-dreams"
                    className="inline-flex items-center justify-center w-full px-6 py-3 bg-[#240046] text-white font-bold rounded-full shadow-lg hover:shadow-xl transition-all duration-200 hover:-translate-y-1"
                  >
                    Listen Now
                    <ExternalLink className="w-4 h-4 ml-2" />
                  </a>
                </div>
              </article>

              {/* The Bloom's House: Volume 1 */}
              <article className="bg-white rounded-3xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
                <div className="aspect-square overflow-hidden">
                  <img
                    src="/images/The-Blooms-House-volume-1-Aly-Bouchnak.webp"
                    alt="The Bloom's House: Volume 1 album cover"
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                  />
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#F26B3A] text-white text-sm font-semibold rounded-full">
                      <Sun className="w-4 h-4" />
                      Playful
                    </span>
                    <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white/60 text-[#101010] text-sm font-semibold rounded-full">
                      10 Tracks
                    </span>
                  </div>
                  <h3 className="font-['Fredoka_One'] text-xl text-[#101010] mb-2">
                    The Bloom's House: Volume 1
                  </h3>
                  <p className="text-sm text-[#2A2A2A] mb-4">
                    A complete collection of fun, engaging songs for toddlers and preschoolers covering daily routines and developmental skills.
                  </p>
                  <a
                    href="#/album/the-blooms-house-volume-1"
                    className="inline-flex items-center justify-center w-full px-6 py-3 bg-[#F26B3A] text-white font-bold rounded-full shadow-lg hover:shadow-xl transition-all duration-200 hover:-translate-y-1"
                  >
                    Listen Now
                    <ExternalLink className="w-4 h-4 ml-2" />
                  </a>
                </div>
              </article>

              {/* The Bloom's House: Classics Party */}
              <article className="bg-white rounded-3xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
                <div className="aspect-square overflow-hidden">
                  <img
                    src="/images/The-Blooms-House-Party-Classics-Aly-Bouchnak.webp"
                    alt="The Bloom's House: Classics Party album cover"
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                  />
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#F7E859] text-[#101010] text-sm font-semibold rounded-full">
                      <Sun className="w-4 h-4" />
                      Celebratory
                    </span>
                    <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white/60 text-[#101010] text-sm font-semibold rounded-full">
                      5 Tracks
                    </span>
                  </div>
                  <h3 className="font-['Fredoka_One'] text-xl text-[#101010] mb-2">
                    The Bloom's House: Classics Party
                  </h3>
                  <p className="text-sm text-[#2A2A2A] mb-4">
                    A vibrant collection of classic children's songs transformed with contemporary pop production and playful energy for family dance parties.
                  </p>
                  <a
                    href="#/album/the-blooms-house-classics-party"
                    className="inline-flex items-center justify-center w-full px-6 py-3 bg-[#F7E859] text-[#101010] font-bold rounded-full shadow-lg hover:shadow-xl transition-all duration-200 hover:-translate-y-1"
                  >
                    Listen Now
                    <ExternalLink className="w-4 h-4 ml-2" />
                  </a>
                </div>
              </article>
            </div>
          </div>
        </div>
      </section>

      {/* Daytime Music Section */}
      <section className="py-16 lg:py-24">
        <div className="w-full px-4 sm:px-6 lg:px-8 xl:px-12">
          <div className="max-w-6xl mx-auto">
            <div className="flex items-center gap-3 mb-10">
              <div className="w-12 h-12 bg-[#F7E859] rounded-full flex items-center justify-center">
                <Sun className="w-6 h-6 text-[#101010]" />
              </div>
              <h2 className="font-['Fredoka_One'] text-3xl sm:text-4xl text-[#101010]">
                Bouncy Beats (Daytime)
              </h2>
            </div>

            <div ref={daytimeRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
              {daytimeReleases.map((release) => (
                <article
                  key={release.id}
                  className={`release-card card overflow-hidden ${
                    release.status === 'coming-soon' ? 'border-2 border-dashed border-gray-300' : ''
                  }`}
                >
                  {release.image ? (
                    <div className="relative aspect-square overflow-hidden">
                      <img
                        src={release.image}
                        alt={release.title}
                        className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                      />
                    </div>
                  ) : (
                    <div className="aspect-square bg-gradient-to-br from-[#F7E859]/30 to-[#C8F0F7]/30 flex items-center justify-center">
                      <Music className="w-16 h-16 text-[#2A2A2A]/30" />
                    </div>
                  )}
                  
                  <div className="p-5">
                    <span className="text-xs font-bold uppercase tracking-wider text-[#F26B3A]">
                      {release.type}
                    </span>
                    <h3 className="font-['Fredoka_One'] text-lg text-[#101010] mt-1 mb-1">
                      {release.title}
                    </h3>
                    <p className="text-sm text-[#2A2A2A]/70 mb-3">
                      {release.status === 'coming-soon' ? 'Releasing' : 'Released'}: {release.date}
                    </p>
                    <p className="text-sm text-[#2A2A2A] mb-4 line-clamp-2">
                      {release.description}
                    </p>

                    {/* Track list */}
                    {release.tracks && (
                      <ul className="space-y-1 mb-4 text-sm border-t border-gray-100 pt-3">
                        {release.tracks.map((track, idx) => (
                          <li key={idx} className="flex justify-between text-[#2A2A2A]/70">
                            <span>{track.title}</span>
                            <span>{track.duration}</span>
                          </li>
                        ))}
                      </ul>
                    )}

                    {/* Lyrics */}
                    {release.lyrics && (
                      <details className="mb-4 text-sm">
                        <summary className="font-semibold text-[#101010] cursor-pointer hover:text-[#F26B3A]">
                          View Lyrics
                        </summary>
                        <p className="mt-2 text-[#2A2A2A]/80 whitespace-pre-line text-xs">
                          {release.lyrics}
                        </p>
                      </details>
                    )}

                    {release.status === 'coming-soon' ? (
                      <button className="w-full py-3 px-6 bg-gray-200 text-gray-500 font-bold rounded-full cursor-not-allowed">
                        Coming Soon
                      </button>
                    ) : (
                      <a
                        href={release.link}
                        className="btn-primary w-full justify-center text-sm"
                      >
                        {getButtonText(release.status || '', release.type || '')}
                        <ExternalLink className="w-4 h-4 ml-2" />
                      </a>
                    )}
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Sleep Music Section */}
      <section className="py-16 lg:py-24 bg-[#240046]">
        <div className="w-full px-4 sm:px-6 lg:px-8 xl:px-12">
          <div className="max-w-6xl mx-auto">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-[#F7E859] rounded-full flex items-center justify-center">
                <Moon className="w-6 h-6 text-[#240046]" />
              </div>
              <h2 className="font-['Fredoka_One'] text-3xl sm:text-4xl text-white">
                Tuned for Dreams (Nighttime)
              </h2>
            </div>
            <p className="text-white/70 mb-10 max-w-2xl">
              Scientific lullabies using the <strong>ISO Principle</strong> and <strong>Brown Noise</strong>.
            </p>

            <div ref={sleepRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
              {sleepReleases.map((release) => (
                <article
                  key={release.id}
                  className="release-card bg-[#2a2a2a] rounded-[28px] overflow-hidden shadow-[0_18px_40px_rgba(0,0,0,0.30)]"
                >
                  <div className="relative aspect-square overflow-hidden">
                    <img
                      src={release.image}
                      alt={release.title}
                      className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                    />
                  </div>
                  
                  <div className="p-5">
                    <span className="text-xs font-bold uppercase tracking-wider text-[#F7E859]">
                      {release.type}
                    </span>
                    <h3 className="font-['Fredoka_One'] text-lg text-white mt-1 mb-1">
                      {release.title}
                    </h3>
                    <p className="text-sm text-white/60 mb-3">
                      Released: {release.date}
                    </p>
                    <p className="text-sm text-white/80 mb-4">
                      {release.description}
                    </p>

                    {/* Track list */}
                    {release.tracks && (
                      <ul className="space-y-1 mb-4 text-sm border-t border-white/10 pt-3">
                        {release.tracks.map((track, idx) => (
                          <li key={idx} className="flex justify-between text-white/60">
                            <span>{track.title}</span>
                            <span>{track.duration}</span>
                          </li>
                        ))}
                      </ul>
                    )}

                    <a
                      href={release.link}
                      className="inline-flex items-center justify-center w-full px-6 py-3 bg-[#F7E859] text-[#240046] font-bold rounded-full 
                                 shadow-[0_4px_0_#d4c44a] transition-all duration-200 hover:translate-y-[2px] hover:shadow-[0_2px_0_#d4c44a]
                                 active:translate-y-[4px] active:shadow-none"
                    >
                      Play for Sleep
                      <ExternalLink className="w-4 h-4 ml-2" />
                    </a>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Discography;
