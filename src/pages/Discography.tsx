import { useEffect, useRef, useState, useMemo } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Sun, Moon, Music, ExternalLink, Disc, ChevronLeft, ChevronRight, Filter } from 'lucide-react';
import Navigation from '../sections/Navigation';
import Footer from '../sections/Footer';
import SEO from '../components/SEO';
import Breadcrumbs from '../components/Breadcrumbs';
import { getAllAlbums } from '../data/albums';
import { getAllTracks } from '../data/tracks';

gsap.registerPlugin(ScrollTrigger);

// Get all data
const allAlbums = getAllAlbums();
const allTracks = getAllTracks();

// Define daytime and nighttime moods
const DAYTIME_MOODS = ['Playful', 'Energetic', 'Upbeat', 'Celebratory'];
const NIGHTTIME_MOODS = ['Calming', 'Transitional', 'Gentle', 'Sleep'];

// Combine and categorize releases (tracks + albums)
interface CombinedRelease {
  id: number;
  title: string;
  type: 'Album' | 'EP' | 'Single';
  status: 'Upcoming' | 'Pre-Saves' | 'Released';
  releaseDate: string;
  date: string;
  image?: string;
  coverImage?: string;
  link?: string;
  description: string;
  genre: string;
  mood: string;
  routine?: string;
  isTrack: boolean;
}

// Helper to determine release status based on date
function getReleaseStatus(releaseDate: string): 'Upcoming' | 'Pre-Saves' | 'Released' {
  const today = new Date();
  const release = new Date(releaseDate);
  const diffTime = release.getTime() - today.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  
  if (diffDays > 14) return 'Upcoming';
  if (diffDays > 0) return 'Pre-Saves';
  return 'Released';
}

// Helper to determine type
function getReleaseType(item: typeof allAlbums[0] | typeof allTracks[0], isTrack: boolean): 'Album' | 'EP' | 'Single' {
  if (isTrack) return 'Single';
  const trackCount = (item as typeof allAlbums[0]).trackCount;
  if (trackCount >= 8) return 'Album';
  if (trackCount >= 4) return 'EP';
  return 'Single';
}

// Create combined releases array
function createCombinedReleases(): CombinedRelease[] {
  const albumsAsReleases: CombinedRelease[] = allAlbums.map(album => ({
    ...album,
    id: album.id || Math.random(),
    type: getReleaseType(album, false),
    status: getReleaseStatus(album.releaseDate),
    date: album.date || album.releaseDate,
    isTrack: false,
    image: album.image || album.coverImage,
    link: album.link || `#/album/${album.slug}`,
    genre: album.genre,
    mood: album.mood,
  }));

  const tracksAsReleases: CombinedRelease[] = allTracks.map(track => ({
    ...track,
    id: track.id,
    type: getReleaseType(track, true),
    status: getReleaseStatus(track.releaseDate),
    date: track.releaseDate,
    isTrack: true,
    image: track.coverImage,
    link: track.albumUrl || `#/track/${track.slug}`,
    genre: track.genre,
    mood: track.mood,
  }));

  return [...albumsAsReleases, ...tracksAsReleases];
}

const allReleases = createCombinedReleases();

// Sort by release date (newest first)
const sortByDate = (a: CombinedRelease, b: CombinedRelease) => 
  new Date(b.releaseDate).getTime() - new Date(a.releaseDate).getTime();

// Get unique values for filters
const getUniqueYears = (releases: CombinedRelease[]) => {
  const years = releases.map(r => new Date(r.releaseDate).getFullYear());
  return [...new Set(years)].sort((a, b) => b - a);
};

const getUniqueGenres = (releases: CombinedRelease[]) => {
  const genres = releases.flatMap(r => r.genre.split(', ').map(g => g.trim()));
  return [...new Set(genres)].sort();
};

const getUniqueMoods = (releases: CombinedRelease[]) => {
  return [...new Set(releases.map(r => r.mood))].sort();
};

const getUniqueRoutines = (releases: CombinedRelease[]) => {
  const routines = releases.map(r => r.routine).filter((r): r is string => !!r);
  return [...new Set(routines)].sort();
};

const filteredDaytimeReleases = allReleases.filter(r => DAYTIME_MOODS.includes(r.mood) && r.status === 'Released');
const filteredSleepReleases = allReleases.filter(r => NIGHTTIME_MOODS.includes(r.mood));

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
    numberOfItems: filteredDaytimeReleases.length + filteredSleepReleases.length,
    itemListOrder: 'https://schema.org/ItemListOrderAscending',
    itemListElement: [
      ...filteredDaytimeReleases
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

      ...filteredSleepReleases.map((release, index) => ({
        '@type': 'ListItem',
        position: filteredDaytimeReleases.length + index + 1,
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
  
  // Filter states for daytime section
  const [daytimeYearFilter, setDaytimeYearFilter] = useState<string>('all');
  const [daytimeGenreFilter, setDaytimeGenreFilter] = useState<string>('all');
  const [daytimeMoodFilter, setDaytimeMoodFilter] = useState<string>('all');
  const [daytimeRoutineFilter, setDaytimeRoutineFilter] = useState<string>('all');
  const [daytimeCurrentPage, setDaytimeCurrentPage] = useState(1);
  
  // Pagination state for sleep section
  const [sleepCurrentPage, setSleepCurrentPage] = useState(1);
  const ITEMS_PER_PAGE = 12;

  // Filter and sort daytime releases
  const filteredDaytimeReleases = useMemo(() => {
    let releases = allReleases.filter(r => DAYTIME_MOODS.includes(r.mood));
    
    if (daytimeYearFilter !== 'all') {
      releases = releases.filter(r => new Date(r.releaseDate).getFullYear().toString() === daytimeYearFilter);
    }
    if (daytimeGenreFilter !== 'all') {
      releases = releases.filter(r => r.genre.toLowerCase().includes(daytimeGenreFilter.toLowerCase()));
    }
    if (daytimeMoodFilter !== 'all') {
      releases = releases.filter(r => r.mood === daytimeMoodFilter);
    }
    if (daytimeRoutineFilter !== 'all') {
      releases = releases.filter(r => r.routine === daytimeRoutineFilter);
    }
    
    return releases.sort(sortByDate);
  }, [daytimeYearFilter, daytimeGenreFilter, daytimeMoodFilter, daytimeRoutineFilter]);

  // Paginate daytime releases
  const paginatedDaytimeReleases = useMemo(() => {
    const startIndex = (daytimeCurrentPage - 1) * ITEMS_PER_PAGE;
    return filteredDaytimeReleases.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  }, [filteredDaytimeReleases, daytimeCurrentPage]);

  const daytimeTotalPages = Math.ceil(filteredDaytimeReleases.length / ITEMS_PER_PAGE);

  // Filter and sort sleep releases
  const filteredSleepReleases = useMemo(() => {
    return allReleases
      .filter(r => NIGHTTIME_MOODS.includes(r.mood))
      .sort(sortByDate);
  }, []);

  // Paginate sleep releases
  const paginatedSleepReleases = useMemo(() => {
    const startIndex = (sleepCurrentPage - 1) * ITEMS_PER_PAGE;
    return filteredSleepReleases.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  }, [filteredSleepReleases, sleepCurrentPage]);

  const sleepTotalPages = Math.ceil(filteredSleepReleases.length / ITEMS_PER_PAGE);

  // Get filter options
  const daytimeReleasesForFilters = allReleases.filter(r => DAYTIME_MOODS.includes(r.mood));
  const years = getUniqueYears(daytimeReleasesForFilters);
  const genres = getUniqueGenres(daytimeReleasesForFilters);
  const moods = getUniqueMoods(daytimeReleasesForFilters);
  const routines = getUniqueRoutines(daytimeReleasesForFilters);

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
  }, [paginatedDaytimeReleases, paginatedSleepReleases]);

  const getButtonText = (status: string, type: string) => {
    if (status === 'Upcoming') return 'Coming Soon';
    if (status === 'Pre-Saves') return 'Pre-Save Now';
    if (type === 'EP' || type === 'Album') return 'Listen';
    return 'Stream Now';
  };

  const getStatusBadgeClass = (status: string) => {
    switch (status) {
      case 'Upcoming':
        return 'bg-gray-100 text-gray-600';
      case 'Pre-Saves':
        return 'bg-orange-100 text-orange-600';
      case 'Released':
        return 'bg-green-100 text-green-600';
      default:
        return 'bg-gray-100 text-gray-600';
    }
  };

  // Get latest 3 albums for the Latest Albums section
  const latestAlbums = useMemo(() => {
    return allReleases
      .filter(r => !r.isTrack)
      .sort(sortByDate)
      .slice(0, 3);
  }, []);

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
              {latestAlbums.map((album) => (
                <article key={album.id} className="bg-white rounded-3xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
                  <div className="aspect-square overflow-hidden">
                    <img
                      src={album.image}
                      alt={album.title}
                      className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                    />
                  </div>
                  <div className="p-6">
                    <div className="flex items-center gap-2 mb-3">
                      <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-sm font-semibold rounded-full ${
                        NIGHTTIME_MOODS.includes(album.mood) ? 'bg-[#240046] text-white' : 'bg-[#F26B3A] text-white'
                      }`}>
                        {NIGHTTIME_MOODS.includes(album.mood) ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />}
                        {album.mood}
                      </span>
                      <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-sm font-semibold rounded-full ${getStatusBadgeClass(album.status)}`}>
                        {album.status}
                      </span>
                    </div>
                    <h3 className="font-['Fredoka_One'] text-xl text-[#101010] mb-2">
                      {album.title}
                    </h3>
                    <p className="text-sm text-[#2A2A2A] mb-4">
                      {album.description}
                    </p>
                    <a
                      href={album.link}
                      className="inline-flex items-center justify-center w-full px-6 py-3 bg-[#F26B3A] text-white font-bold rounded-full shadow-lg hover:shadow-xl transition-all duration-200 hover:-translate-y-1"
                    >
                      {getButtonText(album.status, album.type)}
                      <ExternalLink className="w-4 h-4 ml-2" />
                    </a>
                  </div>
                </article>
              ))}
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

            {/* Filters */}
            <div className="bg-white rounded-2xl p-4 mb-8 shadow-lg">
              <div className="flex items-center gap-2 mb-4">
                <Filter className="w-5 h-5 text-[#F26B3A]" />
                <span className="font-semibold text-[#101010]">Filter Releases</span>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <select
                  value={daytimeYearFilter}
                  onChange={(e) => { setDaytimeYearFilter(e.target.value); setDaytimeCurrentPage(1); }}
                  className="px-4 py-2 rounded-lg border border-gray-200 focus:border-[#F26B3A] focus:outline-none text-sm"
                >
                  <option value="all">All Years</option>
                  {years.map(year => (
                    <option key={year} value={year.toString()}>{year}</option>
                  ))}
                </select>
                <select
                  value={daytimeGenreFilter}
                  onChange={(e) => { setDaytimeGenreFilter(e.target.value); setDaytimeCurrentPage(1); }}
                  className="px-4 py-2 rounded-lg border border-gray-200 focus:border-[#F26B3A] focus:outline-none text-sm"
                >
                  <option value="all">All Genres</option>
                  {genres.map(genre => (
                    <option key={genre} value={genre}>{genre}</option>
                  ))}
                </select>
                <select
                  value={daytimeMoodFilter}
                  onChange={(e) => { setDaytimeMoodFilter(e.target.value); setDaytimeCurrentPage(1); }}
                  className="px-4 py-2 rounded-lg border border-gray-200 focus:border-[#F26B3A] focus:outline-none text-sm"
                >
                  <option value="all">All Moods</option>
                  {moods.map(mood => (
                    <option key={mood} value={mood}>{mood}</option>
                  ))}
                </select>
                <select
                  value={daytimeRoutineFilter}
                  onChange={(e) => { setDaytimeRoutineFilter(e.target.value); setDaytimeCurrentPage(1); }}
                  className="px-4 py-2 rounded-lg border border-gray-200 focus:border-[#F26B3A] focus:outline-none text-sm"
                >
                  <option value="all">All Routines</option>
                  {routines.map(routine => (
                    <option key={routine} value={routine}>{routine}</option>
                  ))}
                </select>
              </div>
            </div>

            <div ref={daytimeRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
              {paginatedDaytimeReleases.map((release) => (
                <article
                  key={release.id}
                  className={`release-card card overflow-hidden ${
                    release.status === 'Upcoming' ? 'border-2 border-dashed border-gray-300' : ''
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
                      {release.status === 'Upcoming' ? 'Releasing' : 'Released'}: {release.date}
                    </p>
                    <p className="text-sm text-[#2A2A2A] mb-4 line-clamp-2">
                      {release.description}
                    </p>

                    {release.status === 'Upcoming' ? (
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
            {/* Pagination for Daytime */}
            {daytimeTotalPages > 1 && (
              <div className="flex items-center justify-center gap-4 mt-10">
                <button
                  onClick={() => setDaytimeCurrentPage(prev => Math.max(1, prev - 1))}
                  disabled={daytimeCurrentPage === 1}
                  className="p-2 rounded-full bg-white shadow-md disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100 transition-colors"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <span className="text-sm font-medium text-[#101010]">
                  Page {daytimeCurrentPage} of {daytimeTotalPages}
                </span>
                <button
                  onClick={() => setDaytimeCurrentPage(prev => Math.min(daytimeTotalPages, prev + 1))}
                  disabled={daytimeCurrentPage === daytimeTotalPages}
                  className="p-2 rounded-full bg-white shadow-md disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100 transition-colors"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            )}
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
              {paginatedSleepReleases.map((release) => (
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

            {/* Pagination for Sleep */}
            {sleepTotalPages > 1 && (
              <div className="flex items-center justify-center gap-4 mt-10">
                <button
                  onClick={() => setSleepCurrentPage(prev => Math.max(1, prev - 1))}
                  disabled={sleepCurrentPage === 1}
                  className="p-2 rounded-full bg-white/10 text-white shadow-md disabled:opacity-50 disabled:cursor-not-allowed hover:bg-white/20 transition-colors"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <span className="text-sm font-medium text-white">
                  Page {sleepCurrentPage} of {sleepTotalPages}
                </span>
                <button
                  onClick={() => setSleepCurrentPage(prev => Math.min(sleepTotalPages, prev + 1))}
                  disabled={sleepCurrentPage === sleepTotalPages}
                  className="p-2 rounded-full bg-white/10 text-white shadow-md disabled:opacity-50 disabled:cursor-not-allowed hover:bg-white/20 transition-colors"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            )}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Discography;
