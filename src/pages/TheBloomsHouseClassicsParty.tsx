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

gsap.registerPlugin(ScrollTrigger);

// Album data for The Bloom's House: Classics Party
const albumData = {
  title: "The Bloom's House: Classics Party",
  subtitle: 'Beloved children\'s classics reimagined with modern pop energy',
  description: 'A vibrant collection of classic children\'s songs transformed with contemporary pop production and playful energy. Perfect for family dance parties, classroom activities, and creating joyful memories together.',
  coverImage: '/images/the-blooms-house-classics-party-cover.webp',
  artist: 'Aly Bouchnak',
  releaseDate: '2026-02-14',
  totalTracks: 12,
  totalDuration: '38:20',
  genre: 'Children\'s Pop, Classic Songs, Dance Music',
  ageRange: '2-8 years',
  mood: 'Celebratory',
  routine: 'Party & Play',
  upc: '5063893028992',
  spotifyUrl: 'https://push.fm/fl/the-blooms-house-classics',
  youtubeUrl: 'https://www.youtube.com/@AlyBouchnak',
  appleMusicUrl: 'https://music.apple.com/au/artist/aly-bouchnak/1840274949',
  amazonUrl: 'https://amazon.com/music/player/artists/B0FVYF53CC/aly-bouchnak',
  artistNote: `"The Bloom's House: Classics Party" was born from a special request from parents who wanted the magic of classic children's songs but with modern energy that gets kids moving. I noticed that while traditional classics are beloved, they sometimes lack the production quality and tempo that engages today's children.

This album bridges generations by taking songs that parents and grandparents grew up with and giving them a contemporary makeover while preserving the core elements that make these songs timeless.

Each track was carefully reimagined:
• Modern pop production with clean, bright soundscapes
• Upgraded tempos that match natural movement patterns for children
• Preserved melodies and lyrics that maintain recognition
• Added layers and harmonies that create emotional depth
• Dance-friendly arrangements that encourage physical activity

The goal was to create something that:
1. Parents can share their childhood favorites with their kids
2. Children experience these classics with fresh, exciting energy
3. Teachers have modern arrangements for classroom activities
4. Families can enjoy dance parties with music everyone recognizes

These aren't just covers—they're complete reimaginings that respect the original while creating something new and exciting for today's families.`,
  scienceFramework: `The Educational Science Behind Classics Reimagined

This album applies principles of music education and developmental psychology:

1. Familiarity Principle
Research shows that children learn best when they can connect new information to existing knowledge. By using familiar melodies and structures, these songs create "scaffolding" that helps children:
• Process new musical concepts more easily
• Remember lyrics and patterns through repetition
• Connect with cultural heritage of children's music
• Build confidence through known material

2. Tempo and Movement Science
Each track is tempo-matched to developmental movement patterns:
• 120-135 BPM for natural dance and movement
• Rhythmic patterns that encourage gross motor development
• Clear beats that help with timing and coordination
• Dynamic variations that maintain engagement

3. Cognitive Load Theory
The arrangements balance complexity and accessibility:
• Simple enough for immediate participation
• Complex enough to maintain interest over repeated listening
• Layered production that reveals new details with each listen
• Predictable structures that support memory development

4. Social-Emotional Learning
Group music activities support:
• Social bonding through shared experience
• Emotional regulation through rhythmic movement
• Cultural connection through shared musical heritage
• Cooperative play and turn-taking skills

5. Cross-Generational Appeal
Modern production of classic songs creates:
• Bridge between generations (parents, grandparents, children)
• Shared cultural experience
• Nostalgia with contemporary relevance
• Family tradition building opportunities`,
  tracks: [
    {
      number: 1,
      title: 'Old MacDonald Had a Farm (Farm Party)',
      duration: '2:45',
      description: "High-energy farm animal song with modern pop production and dance-friendly rhythm.",
      mood: 'Energetic',
    },
    {
      number: 2,
      title: 'The Wheels on the Bus (Party Ride)',
      duration: '3:10',
      description: 'Upbeat transportation song with driving rhythm and party energy.',
      mood: 'Exciting',
    },
    {
      number: 3,
      title: 'Five Little Monkeys (Jungle Party)',
      duration: '2:55',
      description: 'Playful counting song with jungle beats and monkey-themed actions.',
      mood: 'Playful',
    },
    {
      number: 4,
      title: 'Twinkle Twinkle Little Star (Dreamy Version)',
      duration: '2:30',
      description: 'Gentle lullaby with modern ambient production and dreamy atmosphere.',
      mood: 'Dreamy',
    },
    {
      number: 5,
      title: 'Row Row Row Your Boat (Gentle Journey)',
      duration: '2:20',
      description: 'Calming boat journey song with soothing harmonies and gentle rhythm.',
      mood: 'Peaceful',
    },
    {
      number: 6,
      title: 'Its Bitsy Spider (Climbing Time)',
      duration: '2:40',
      description: 'Upbeat spider climbing song with energetic rhythm and fun actions.',
      mood: 'Adventurous',
    },
    {
      number: 7,
      title: 'The ABC Song (Pop Learning)',
      duration: '2:15',
      description: 'Modern alphabet learning song with catchy pop melody and rhythm.',
      mood: 'Educational',
    },
    {
      number: 8,
      title: 'Head Shoulders Knees and Toes (Movement Fun)',
      duration: '2:25',
      description: 'Interactive body parts song with movement actions and dance-friendly beat.',
      mood: 'Interactive',
    },
    {
      number: 9,
      title: 'If You\'re Happy and You Know It (Clap Along)',
      duration: '2:50',
      description: 'Joyful clapping song with infectious rhythm and group participation.',
      mood: 'Joyful',
    },
    {
      number: 10,
      title: 'Baby Shark (Dance Party)',
      duration: '2:35',
      description: 'High-energy shark-themed dance song with modern pop production.',
      mood: 'Wild',
    },
    {
      number: 11,
      title: 'The Itsy Bitsy Spider (Rock Version)',
      duration: '3:05',
      description: 'Rock version of the spider song with electric guitars and driving beat.',
      mood: 'Rocking',
    },
    {
      number: 12,
      title: 'Happy Birthday (Celebration Mix)',
      duration: '2:40',
      description: 'Modern birthday celebration song with party energy and group participation.',
      mood: 'Celebratory',
    },
  ],
  relatedAlbums: [
    {
      id: 1,
      title: 'The Bloom\'s House: Volume 1',
      cover: '/images/the-blooms-house-volume-1-cover.webp',
      description: 'Original songs for daily routines',
      link: '#/album/the-blooms-house-volume-1',
    },
    {
      id: 2,
      title: 'Tuned for Dreams',
      cover: '/images/dreams-cover.webp',
      description: 'Sleep album for peaceful nights',
      link: '#/album/tuned-for-dreams',
    },
  ],
};

// Schema.org structured data for album
const albumSchema = {
  '@context': 'https://schema.org',
  '@type': 'MusicAlbum',
  name: "The Bloom's House: Classics Party",
  byArtist: {
    '@type': 'MusicGroup',
    name: 'Aly Bouchnak',
    '@id': 'https://alybouchnak.com/#artist',
  },
  datePublished: '2026-02-14',
  genre: ['Children\'s Pop', 'Classic Songs', 'Dance Music'],
  description: 'A vibrant collection of classic children\'s songs transformed with contemporary pop production and playful energy. Perfect for family dance parties, classroom activities, and creating joyful memories together.',
  image: 'https://alybouchnak.com/images/the-blooms-house-classics-party-cover.webp',
  url: 'https://alybouchnak.com/album/the-blooms-house-classics-party',
  numTracks: 12,
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
    target: 'https://push.fm/fl/the-blooms-house-classics',
  },
  audience: {
    '@type': 'PeopleAudience',
    suggestedMinAge: '2',
    suggestedMaxAge: '8',
    audienceType: 'Children, Parents, Families',
  },
};

const TheBloomsHouseClassicsParty = () => {
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
    <div className="relative min-h-screen bg-[#F7E859]">
      <SEO
        title={`${albumData.title} | Aly Bouchnak — Classic Children's Songs`}
        description={albumData.description}
        keywords="classic children's songs, kids party music, nursery rhymes modern, Aly Bouchnak classics"
        canonical="https://alybouchnak.com/album/the-blooms-house-classics-party"
        ogImage="https://alybouchnak.com/images/the-blooms-house-classics-party-cover.webp"
        ogType="music.album"
        schemaData={albumSchema}
      />

      <Navigation />

      {/* Hero Section */}
      <div ref={heroRef} className="pt-28 pb-12 lg:pt-32 lg:pb-16 bg-gradient-to-b from-[#F7E859] to-[#C8F0F7]">
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
                <div className="w-10 h-10 bg-[#C8F0F7] rounded-full flex items-center justify-center">
                  <Activity className="w-5 h-5 text-[#101010]" />
                </div>
                <h2 className="font-['Fredoka_One'] text-2xl sm:text-3xl text-[#101010]">
                  The Educational Science
                </h2>
              </div>
              <div className="bg-gradient-to-br from-[#F26B3A]/10 to-[#C8F0F7]/10 rounded-3xl p-6 sm:p-8 border border-[#F26B3A]/20">
                <p className="text-[#101010]/90 leading-relaxed whitespace-pre-line">
                  {albumData.scienceFramework}
                </p>
              </div>
            </section>

            {/* Tracklist */}
            <section className="content-section">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-[#F7E859] rounded-full flex items-center justify-center">
                  <Music className="w-5 h-5 text-[#101010]" />
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
              <div className="bg-[#C8F0F7] rounded-3xl p-8 sm:p-12 text-center">
                <Sun className="w-12 h-12 text-[#101010] mx-auto mb-4" />
                <h2 className="font-['Fredoka_One'] text-2xl sm:text-3xl text-[#101010] mb-4">
                  Start Your Family Dance Party
                </h2>
                <p className="text-[#101010]/80 mb-6 max-w-xl mx-auto">
                  Get the whole family moving with these modern takes on classic children's songs that everyone knows and loves.
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

export default TheBloomsHouseClassicsParty;
