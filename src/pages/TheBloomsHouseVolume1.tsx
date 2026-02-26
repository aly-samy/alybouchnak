import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { 
  Play, 
  Music, 
  Clock, 
  Activity, 
  Users, 
  Sun,
  ChevronDown,
  ExternalLink,
  Disc,
  Volume2,
  Heart
} from 'lucide-react';
import Navigation from '../sections/Navigation';
import Footer from '../sections/Footer';
import SEO from '../components/SEO';
import Breadcrumbs from '../components/Breadcrumbs';

gsap.registerPlugin(ScrollTrigger);

// Album data for The Bloom's House: Volume 1
const albumData = {
  title: "The Bloom's House: Volume 1",
  subtitle: 'A complete collection of fun, engaging songs for toddlers and preschoolers',
  description: 'A comprehensive album featuring 10 tracks designed to support daily routines, developmental skills, and family bonding through music. From wake-up songs to mealtime fun, each track serves a specific purpose in your child\'s day.',
  coverImage: '/images/the-blooms-house-volume-1-cover.webp',
  artist: 'Aly Bouchnak',
  releaseDate: '2025-12-25',
  totalTracks: 10,
  totalDuration: '32:45',
  genre: 'Children\'s Pop, Educational Music, Family Music',
  ageRange: '2-6 years',
  mood: 'Playful',
  routine: 'Daily Activities',
  upc: '5063893028991',
  spotifyUrl: 'https://push.fm/fl/the-blooms-house-vol1',
  youtubeUrl: 'https://www.youtube.com/@AlyBouchnak',
  appleMusicUrl: 'https://music.apple.com/au/artist/aly-bouchnak/1840274949',
  amazonUrl: 'https://amazon.com/music/player/artists/B0FVYF53CC/aly-bouchnak',
  artistNote: `"The Bloom's House: Volume 1" represents my vision for what children's music should be—functional, fun, and developmentally supportive. Each track was carefully crafted to address specific needs in a child's daily routine, from morning energy to mealtime cooperation, from cognitive development to family bonding.

I noticed that many children's songs were either purely entertainment or overly educational, missing the sweet spot where learning happens naturally through play. This album bridges that gap.

The tracks progress through a typical day:
• Morning energy (Boom Teka Boom)
• Active play (Bock Bock Chicken, The Funny Bunny Jump)
• Cognitive development (The Wise Mice)
• Mealtime support (The Yummy Spoon)
• Learning fundamentals (The Alphabet Song)
• Family connection (Nanny & Papa)
• Animal exploration (The Duckie Song, Pet-Pop)
• Imagination (Zakzooka The Bear)

Parents tell me this album has become their "go-to" for different moments throughout the day—whether they need to wake up a sleepy toddler, encourage a picky eater, or create a fun dance party. The variety ensures there's a perfect song for every situation.`,
  scienceFramework: `The Developmental Science Behind Volume 1

This album is built on principles of developmental psychology and music therapy:

1. Routine-Based Learning
Each track is tied to a specific daily routine, leveraging what child development experts call "scaffolded learning." By associating music with daily activities, children develop stronger neural pathways for routine compliance and skill development.

2. Multi-Sensory Engagement
The tracks incorporate various musical elements that engage different senses:
• Rhythmic patterns for motor development
• Melodic contours for emotional regulation  
• Timbral variety for auditory discrimination
• Dynamic changes for attentional control

3. Age-Appropriate Complexity
All songs use musical complexity matched to 2-6 year developmental stage:
• Simple, repetitive structures for memory
• Clear diction for language development
• Appropriate tempo ranges (90-135 BPM) for natural movement
• Predictable forms for cognitive security

4. Functional Music Theory
Based on research showing that music is most effective when it serves a purpose:
• Transition songs reduce resistance to routine changes
• Movement songs support gross motor development
• Educational songs enhance learning retention
• Emotional songs support social-emotional development

5. Family-Centered Design
Many tracks include elements that encourage family participation:
• Call-and-response formats
• Simple choreography for group activities
• Relatable family scenarios
• Inclusive language for diverse family structures`,
  tracks: [
    {
      number: 1,
      title: 'Bock Bock Chicken',
      duration: '2:10',
      description: "High-energy movement song with animal sounds and actions for gross motor skill development.",
      mood: 'Energetic',
    },
    {
      number: 2,
      title: 'Boom Teka Boom (Wake Up Song)',
      duration: '2:35',
      description: 'Morning wake-up anthem with rhythmic energy to start the day positively.',
      mood: 'Upbeat',
    },
    {
      number: 3,
      title: 'The Funny Bunny Jump (Freeze Dance)',
      duration: '2:45',
      description: 'Interactive freeze dance game that builds listening skills and motor control.',
      mood: 'Playful',
    },
    {
      number: 4,
      title: 'The Wise Mice (Memory Game)',
      duration: '3:20',
      description: 'Cumulative memory song that enhances sequencing and cognitive skills.',
      mood: 'Clever',
    },
    {
      number: 5,
      title: 'The Yummy Spoon (Open Wide)',
      duration: '2:20',
      description: 'Mealtime encouragement song that makes eating fun and reduces picky eating.',
      mood: 'Gentle',
    },
    {
      number: 6,
      title: 'The Alphabet Song',
      duration: '2:55',
      description: 'Educational alphabet learning song with catchy melody and rhythm.',
      mood: 'Educational',
    },
    {
      number: 7,
      title: 'Nanny & Papa (Funny Bunny Family)',
      duration: '3:15',
      description: 'Heartwarming family celebration song about grandparent relationships.',
      mood: 'Loving',
    },
    {
      number: 8,
      title: 'The Duckie Song',
      duration: '2:30',
      description: 'Fun animal sound song featuring duck calls and water-themed actions.',
      mood: 'Quirky',
    },
    {
      number: 9,
      title: 'Pet-Pop | The Animal Song',
      duration: '2:50',
      description: 'Interactive animal identification song with various pet sounds and movements.',
      mood: 'Adventurous',
    },
    {
      number: 10,
      title: 'Zakzooka The Bear',
      duration: '3:25',
      description: 'Imaginative adventure song featuring a friendly bear character and nature exploration.',
      mood: 'Imaginative',
    },
  ],
  relatedAlbums: [
    {
      id: 1,
      title: 'Tuned for Dreams',
      cover: '/images/dreams-cover.webp',
      description: 'Sleep album for peaceful nights',
      link: '#/album/tuned-for-dreams',
    },
    {
      id: 2,
      title: 'The Bloom\'s House: Classics Party',
      cover: '/images/the-blooms-house-classics-party-cover.webp',
      description: 'Classic children\'s songs with modern twist',
      link: '#/album/the-blooms-house-classics-party',
    },
  ],
};

// Schema.org structured data for album
const albumSchema = {
  '@context': 'https://schema.org',
  '@type': 'MusicAlbum',
  name: "The Bloom's House: Volume 1",
  byArtist: {
    '@type': 'MusicGroup',
    name: 'Aly Bouchnak',
    '@id': 'https://alybouchnak.com/#artist',
  },
  datePublished: '2025-12-25',
  genre: ['Children\'s Pop', 'Educational Music', 'Family Music'],
  description: 'A comprehensive album featuring 10 tracks designed to support daily routines, developmental skills, and family bonding through music. From wake-up songs to mealtime fun, each track serves a specific purpose in your child\'s day.',
  image: 'https://alybouchnak.com/images/the-blooms-house-volume-1-cover.webp',
  url: 'https://alybouchnak.com/album/the-blooms-house-volume-1',
  numTracks: 10,
  track: {
    '@type': 'ItemList',
    itemListElement: albumData.tracks.map((track, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      item: {
        '@type': 'MusicRecording',
        name: track.title,
        duration: `PT${track.duration.replace(':', 'M')}S`,
        position: track.number,
      },
    })),
  },
  potentialAction: {
    '@type': 'ListenAction',
    target: 'https://push.fm/fl/the-blooms-house-vol1',
  },
  audience: {
    '@type': 'PeopleAudience',
    suggestedMinAge: '2',
    suggestedMaxAge: '6',
    audienceType: 'Children, Parents, Families',
  },
};

const TheBloomsHouseVolume1 = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [expandedTrack, setExpandedTrack] = useState<number | null>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Hero animation
      gsap.fromTo(heroRef.current,
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'power3.out',
        }
      );

      // Content sections stagger
      if (contentRef.current) {
        const sections = contentRef.current.querySelectorAll('.content-section');
        gsap.fromTo(sections,
          { y: 40, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.6,
            stagger: 0.15,
            scrollTrigger: {
              trigger: contentRef.current,
              start: 'top 80%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      }
    });

    return () => ctx.revert();
  }, []);

  const streamingPlatforms = [
    { name: 'Spotify', url: albumData.spotifyUrl, primary: true },
    { name: 'Apple Music', url: albumData.appleMusicUrl, primary: true },
    { name: 'YouTube', url: albumData.youtubeUrl, primary: true },
    { name: 'Amazon Music', url: albumData.amazonUrl, primary: false },
  ];

  return (
    <div className="relative min-h-screen bg-[#C8F0F7]">
      <SEO
        title={`${albumData.title} | Aly Bouchnak — Children's Music Album`}
        description={albumData.description}
        keywords="children's music album, toddler songs, preschool music, Aly Bouchnak, kids music collection"
        canonical="https://alybouchnak.com/album/the-blooms-house-volume-1"
        ogImage="https://alybouchnak.com/images/the-blooms-house-volume-1-cover.webp"
        ogType="music.album"
        schemaData={albumSchema}
      />

      <Navigation />
      <Breadcrumbs />

      {/* Hero Section */}
      <div ref={heroRef} className="pt-28 pb-12 lg:pt-32 lg:pb-16 bg-gradient-to-b from-[#C8F0F7] to-[#F7E859]">
        <div className="w-full px-4 sm:px-6 lg:px-8 xl:px-12">
          <div className="max-w-6xl mx-auto">
            <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-start">
              {/* Cover Art */}
              <div className="w-full max-w-sm mx-auto lg:mx-0 flex-shrink-0">
                <div className="relative aspect-square rounded-3xl overflow-hidden shadow-2xl">
                  <img
                    src={albumData.coverImage}
                    alt={`${albumData.title} album cover`}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                </div>
              </div>

              {/* Album Info */}
              <div className="flex-1 text-center lg:text-left">
                {/* Badges */}
                <div className="flex flex-wrap justify-center lg:justify-start gap-2 mb-4">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#F26B3A] text-white text-sm font-semibold rounded-full">
                    <Sun className="w-4 h-4" />
                    {albumData.mood}
                  </span>
                  <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white text-[#101010] text-sm font-semibold rounded-full">
                    <Disc className="w-4 h-4" />
                    {albumData.totalTracks} Tracks
                  </span>
                  <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white text-[#101010] text-sm font-semibold rounded-full">
                    <Clock className="w-4 h-4" />
                    {albumData.totalDuration}
                  </span>
                  <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white text-[#101010] text-sm font-semibold rounded-full">
                    <Users className="w-4 h-4" />
                    Ages {albumData.ageRange}
                  </span>
                </div>

                <h1 className="font-['Fredoka_One'] text-4xl sm:text-5xl lg:text-6xl text-[#101010] mb-2">
                  {albumData.title}
                </h1>
                <p className="text-lg sm:text-xl text-[#2A2A2A] mb-6">
                  {albumData.subtitle}
                </p>

                {/* Primary CTAs */}
                <div className="flex flex-wrap justify-center lg:justify-start gap-3 mb-8">
                  <a
                    href={albumData.spotifyUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-spotify inline-flex items-center gap-2"
                  >
                    <Play className="w-5 h-5" />
                    Play Album on Spotify
                  </a>
                  <a
                    href={albumData.youtubeUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-6 py-3 bg-[#FF0000] text-white font-bold rounded-full shadow-[0_4px_0_#cc0000] transition-all duration-200 hover:translate-y-[2px] hover:shadow-[0_2px_0_#cc0000] active:translate-y-[4px] active:shadow-none"
                  >
                    <Volume2 className="w-5 h-5" />
                    Watch on YouTube
                  </a>
                </div>

                {/* Metadata Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 text-left">
                  <div className="bg-white/60 backdrop-blur-sm rounded-xl p-3">
                    <p className="text-xs text-[#2A2A2A]/60 uppercase tracking-wider">Artist</p>
                    <p className="font-semibold text-[#101010]">{albumData.artist}</p>
                  </div>
                  <div className="bg-white/60 backdrop-blur-sm rounded-xl p-3">
                    <p className="text-xs text-[#2A2A2A]/60 uppercase tracking-wider">Released</p>
                    <p className="font-semibold text-[#101010]">{albumData.releaseDate}</p>
                  </div>
                  <div className="bg-white/60 backdrop-blur-sm rounded-xl p-3">
                    <p className="text-xs text-[#2A2A2A]/60 uppercase tracking-wider">Genre</p>
                    <p className="font-semibold text-[#101010] text-sm">{albumData.genre}</p>
                  </div>
                  <div className="bg-white/60 backdrop-blur-sm rounded-xl p-3">
                    <p className="text-xs text-[#2A2A2A]/60 uppercase tracking-wider">UPC</p>
                    <p className="font-semibold text-[#101010] text-sm">{albumData.upc}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Embedded Player */}
      <section className="py-8 lg:py-12 bg-white/50 backdrop-blur-sm">
        <div className="w-full px-4 sm:px-6 lg:px-8 xl:px-12">
          <div className="max-w-4xl mx-auto">
            <h2 className="font-['Fredoka_One'] text-2xl text-[#101010] mb-6 text-center">
              Preview Album
            </h2>
            <div className="rounded-2xl overflow-hidden shadow-xl">
              <iframe
                src="https://open.spotify.com/embed/album/your-album-id?utm_source=generator"
                width="100%"
                height="380"
                frameBorder="0"
                allowFullScreen
                allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                loading="lazy"
                className="rounded-2xl"
                title={`${albumData.title} on Spotify`}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div ref={contentRef} className="py-12 lg:py-20">
        <div className="w-full px-4 sm:px-6 lg:px-8 xl:px-12">
          <div className="max-w-4xl mx-auto space-y-12 lg:space-y-16">
            {/* Album Overview */}
            <section className="content-section">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-[#F26B3A] rounded-full flex items-center justify-center">
                  <Heart className="w-5 h-5 text-white" />
                </div>
                <h2 className="font-['Fredoka_One'] text-2xl sm:text-3xl text-[#101010]">
                  Why This Album Exists
                </h2>
              </div>
              <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-lg">
                <p className="text-[#2A2A2A] leading-relaxed whitespace-pre-line">
                  {albumData.artistNote}
                </p>
              </div>
            </section>

            {/* Science Framework */}
            <section className="content-section">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-[#F7E859] rounded-full flex items-center justify-center">
                  <Activity className="w-5 h-5 text-[#101010]" />
                </div>
                <h2 className="font-['Fredoka_One'] text-2xl sm:text-3xl text-[#101010]">
                  The Developmental Science
                </h2>
              </div>
              <div className="bg-gradient-to-br from-[#F26B3A]/10 to-[#F7E859]/10 rounded-3xl p-6 sm:p-8 border border-[#F26B3A]/20">
                <p className="text-[#101010]/90 leading-relaxed whitespace-pre-line">
                  {albumData.scienceFramework}
                </p>
              </div>
            </section>

            {/* Tracklist */}
            <section className="content-section">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-[#C8F0F7] rounded-full flex items-center justify-center">
                  <Music className="w-5 h-5 text-white" />
                </div>
                <h2 className="font-['Fredoka_One'] text-2xl sm:text-3xl text-[#101010]">
                  Complete Tracklist
                </h2>
              </div>
              <div className="space-y-3">
                {albumData.tracks.map((track) => (
                  <div
                    key={track.number}
                    className="bg-white/60 backdrop-blur-sm rounded-2xl overflow-hidden"
                  >
                    <button
                      onClick={() => setExpandedTrack(expandedTrack === track.number ? null : track.number)}
                      className="w-full flex items-center gap-4 p-4 hover:bg-white/80 transition-colors"
                    >
                      <span className="w-8 h-8 bg-[#F26B3A] rounded-full flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
                        {track.number}
                      </span>
                      <div className="flex-1 text-left">
                        <h3 className="font-['Fredoka_One'] text-[#101010]">{track.title}</h3>
                        <p className="text-sm text-[#2A2A2A]/60">{track.mood}</p>
                      </div>
                      <span className="text-[#2A2A2A]/60 text-sm">{track.duration}</span>
                      <ChevronDown
                        className={`w-5 h-5 text-[#F26B3A] transition-transform duration-300 ${
                          expandedTrack === track.number ? 'rotate-180' : ''
                        }`}
                      />
                    </button>
                    {expandedTrack === track.number && (
                      <div className="px-4 pb-4 pl-16">
                        <p className="text-[#2A2A2A]/80 text-sm">{track.description}</p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </section>

            {/* Streaming Platforms */}
            <section className="content-section">
              <h2 className="font-['Fredoka_One'] text-2xl sm:text-3xl text-[#101010] mb-6 text-center">
                Stream & Download
              </h2>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {streamingPlatforms.map((platform) => (
                  <a
                    key={platform.name}
                    href={platform.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`flex flex-col items-center gap-3 p-5 rounded-2xl transition-all duration-200 ${
                      platform.primary
                        ? 'bg-[#F26B3A] text-white shadow-lg hover:shadow-xl hover:-translate-y-1'
                        : 'bg-white text-[#101010] shadow-md hover:shadow-lg hover:-translate-y-1'
                    }`}
                  >
                    <span className="font-semibold text-sm text-center">{platform.name}</span>
                  </a>
                ))}
              </div>
            </section>

            {/* Related Albums */}
            <section className="content-section">
              <h2 className="font-['Fredoka_One'] text-2xl sm:text-3xl text-[#101010] mb-6">
                More Albums You'll Love
              </h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {albumData.relatedAlbums.map((album) => (
                  <a
                    key={album.id}
                    href={album.link}
                    className="group bg-white/60 rounded-2xl overflow-hidden hover:bg-white/80 transition-all duration-300 hover:-translate-y-1"
                  >
                    <div className="aspect-square overflow-hidden">
                      <img
                        src={album.cover}
                        alt={album.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                    </div>
                    <div className="p-4">
                      <h3 className="font-['Fredoka_One'] text-sm text-[#101010] mb-1">
                        {album.title}
                      </h3>
                      <p className="text-xs text-[#2A2A2A]/60">{album.description}</p>
                    </div>
                  </a>
                ))}
              </div>
            </section>

            {/* Parent CTA */}
            <section className="content-section">
              <div className="bg-[#F7E859] rounded-3xl p-8 sm:p-12 text-center">
                <Sun className="w-12 h-12 text-[#101010] mx-auto mb-4" />
                <h2 className="font-['Fredoka_One'] text-2xl sm:text-3xl text-[#101010] mb-4">
                  Complete Your Daily Music Collection
                </h2>
                <p className="text-[#101010]/80 mb-6 max-w-xl mx-auto">
                  Discover how "The Bloom's House: Volume 1" can transform your daily routines and create joyful moments throughout your child's day.
                </p>
                <a
                  href="/#/discography"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-[#101010] text-white font-bold rounded-full shadow-lg hover:shadow-xl transition-all duration-200 hover:-translate-y-1"
                >
                  Explore All Albums
                  <ExternalLink className="w-4 h-4" />
                </a>
              </div>
            </section>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default TheBloomsHouseVolume1;
