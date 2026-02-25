import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { 
  Play, 
  Music, 
  Clock, 
  Activity, 
  Users, 
  Moon,
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

// Album data for Tuned for Dreams
const albumData = {
  title: 'Tuned for Dreams',
  subtitle: 'A psychoacoustic sleep album for peaceful nights',
  description: 'A complete sleep solution designed on the ISO Principle, moving infants from wakefulness to deep sleep through physiological deceleration and respiratory entrainment.',
  coverImage: '/images/dreams-cover.webp',
  artist: 'Aly Bouchnak',
  releaseDate: '2026-01-09',
  totalTracks: 8,
  totalDuration: '25:24',
  genre: 'Lullabies, Sleep Music, Ambient, Functional Music',
  ageRange: '1-8 years',
  mood: 'Calm',
  routine: 'Bedtime',
  upc: '5063893028990',
  spotifyUrl: 'https://push.fm/fl/toned4dreams',
  youtubeUrl: 'https://www.youtube.com/@AlyBouchnak',
  appleMusicUrl: 'https://music.apple.com/au/artist/aly-bouchnak/1840274949',
  amazonUrl: 'https://amazon.com/music/player/artists/B0FVYF53CC/aly-bouchnak',
  artistNote: `I created "Tuned for Dreams" after countless conversations with exhausted parents who were struggling with bedtime routines. The "sleep battle" is real—and I wanted to create something that actually works with a child's physiology, not against it.

This album is built on the ISO Principle: a gradual progression from higher energy to lower energy. Each track is scientifically designed to lower heart rate, reduce cortisol, and guide children into deep, restorative sleep.

The tracks progress through:
• Validation and safety signaling (The Safe Container)
• Vestibular calming through rhythm (The Pendulum)
• Auditory masking of startle reflexes (The Sacred Shush)
• Visual gating and womb simulation (The Dimming Light)
• Cognitive offloading (The Ancient Tongue)
• Social safety cues (The Protective Shadow)
• Prenatal state simulation (The Liquid Room)
• Deep sleep induction (The Infinite Loop)

Parents report that using this album as part of a consistent bedtime routine has transformed their evenings. The key is consistency—using the same sequence nightly helps build the neural association between these sounds and sleep.`,
  scienceFramework: `The Science of Sleep: How "Tuned for Dreams" Works

1. The ISO Principle (Iso Principle in Music Therapy)
The ISO Principle states that music can be used to match and then gradually modify a person's emotional or physiological state. This album starts at 70 BPM (matching an elevated but calm heart rate) and gradually descends to 55 BPM (deep rest). This physiological entrainment helps the body follow the music into sleep.

2. Brown Noise & Psychoacoustic Masking
Unlike white noise (which can be harsh), Brown Noise has more energy at lower frequencies—similar to the sounds heard in the womb. This creates a "sound blanket" that masks sudden environmental noises that might trigger the startle reflex in sleeping children.

3. Binaural Beats & Brainwave Entrainment
Subtle frequency differences between left and right channels create binaural beats that encourage brainwave patterns associated with deep sleep (delta waves, 0.5-4 Hz). This is completely safe and non-invasive.

4. Harmonic Stability & Predictability
The album uses consistent harmonic centers and predictable chord progressions. This reduces cognitive load—the brain doesn't need to "work" to process the music, allowing it to relax fully.

5. The Cumulative Effect
Each track builds on the previous one. The album is designed to be listened to in sequence, creating a 25-minute journey from wakefulness to deep sleep. The full album is more effective than individual tracks.`,
  tracks: [
    {
      number: 1,
      title: 'The Safe Container',
      duration: '2:44',
      description: "Validation track at 70 BPM using 'Motherese' timbres to signal safety and lower cortisol.",
      mood: 'Reassuring',
    },
    {
      number: 2,
      title: 'The Pendulum',
      duration: '2:50',
      description: 'Uses 6/8 meter and 68 BPM to mimic the vestibular stimulation of rocking or swaying.',
      mood: 'Gentle motion',
    },
    {
      number: 3,
      title: 'The Sacred Shush',
      duration: '2:45',
      description: 'Features rhythmic white noise and sibilant sounds for psychoacoustic masking of startle reflexes.',
      mood: 'Protective',
    },
    {
      number: 4,
      title: 'The Dimming Light',
      duration: '2:42',
      description: 'A visual gating track at 62 BPM where high frequencies are rolled off to simulate the womb environment.',
      mood: 'Fading',
    },
    {
      number: 5,
      title: 'The Ancient Tongue',
      duration: '3:52',
      description: 'Uses nonsense syllables and cognitive offloading to disengage the brain\'s language centers.',
      mood: 'Transcendent',
    },
    {
      number: 6,
      title: 'The Protective Shadow',
      duration: '2:45',
      description: 'A social safety cue using low-register humming and a drone bass for harmonic stability.',
      mood: 'Grounding',
    },
    {
      number: 7,
      title: 'The Liquid Room',
      duration: '3:53',
      description: 'Simulates the prenatal state using Brown Noise dominance to mimic the amniotic sac.',
      mood: 'Prenatal',
    },
    {
      number: 8,
      title: 'The Infinite Loop',
      duration: '3:32',
      description: 'Uses predictive processing loops and free time (Rubato) to induce deep non-REM sleep stasis.',
      mood: 'Timeless',
    },
  ],
  relatedAlbums: [
    {
      id: 1,
      title: 'Boom Teka Boom',
      cover: '/images/boom-teka-cover.webp',
      description: 'Morning wake-up EP',
      link: '#/album/boom-teka-boom',
    },
    {
      id: 2,
      title: 'The Wise Mice',
      cover: '/images/the-wise-mice-cover.webp',
      description: 'Memory & sequencing',
      link: '#/album/the-wise-mice',
    },
    {
      id: 3,
      title: 'Nanny & Papa',
      cover: '/images/nanny-and-papa-cover.webp',
      description: 'Family bonding songs',
      link: '#/album/nanny-and-papa',
    },
  ],
};

// Schema.org structured data for the album
const albumSchema = {
  '@context': 'https://schema.org',
  '@type': 'MusicAlbum',
  name: 'Tuned for Dreams',
  byArtist: {
    '@type': 'MusicGroup',
    name: 'Aly Bouchnak',
    '@id': 'https://alybouchnak.com/#artist',
  },
  datePublished: '2026-01-09',
  genre: ['Lullabies', 'Sleep Music', 'Ambient', 'Functional Music'],
  description: 'A psychoacoustic sleep album designed on the ISO Principle, moving infants from wakefulness to deep sleep through physiological deceleration and respiratory entrainment.',
  image: 'https://alybouchnak.com/images/dreams-cover.webp',
  url: 'https://alybouchnak.com/album/tuned-for-dreams',
  numTracks: 8,
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
    target: 'https://push.fm/fl/toned4dreams',
  },
  audience: {
    '@type': 'PeopleAudience',
    suggestedMinAge: '1',
    suggestedMaxAge: '8',
    audienceType: 'Children, Parents, Families',
  },
};

const SingleAlbum = () => {
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
    <div className="relative min-h-screen bg-[#240046]">
      <SEO
        title={`${albumData.title} | Aly Bouchnak — Sleep Album for Kids`}
        description={albumData.description}
        keywords="sleep music for kids, lullabies for toddlers, bedtime music, Brown Noise for sleep, Aly Bouchnak sleep album"
        canonical="https://alybouchnak.com/album/tuned-for-dreams"
        ogImage="https://alybouchnak.com/images/dreams-cover.webp"
        ogType="music.album"
        schemaData={albumSchema}
      />

      <Navigation />

      {/* Hero Section */}
      <div ref={heroRef} className="pt-28 pb-12 lg:pt-32 lg:pb-16 bg-gradient-to-b from-[#240046] to-[#1a0b2e]">
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
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                </div>
              </div>

              {/* Album Info */}
              <div className="flex-1 text-center lg:text-left">
                {/* Badges */}
                <div className="flex flex-wrap justify-center lg:justify-start gap-2 mb-4">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#F7E859] text-[#240046] text-sm font-semibold rounded-full">
                    <Moon className="w-4 h-4" />
                    {albumData.mood}
                  </span>
                  <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white/20 text-white text-sm font-semibold rounded-full">
                    <Disc className="w-4 h-4" />
                    {albumData.totalTracks} Tracks
                  </span>
                  <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white/20 text-white text-sm font-semibold rounded-full">
                    <Clock className="w-4 h-4" />
                    {albumData.totalDuration}
                  </span>
                  <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white/20 text-white text-sm font-semibold rounded-full">
                    <Users className="w-4 h-4" />
                    Ages {albumData.ageRange}
                  </span>
                </div>

                <h1 className="font-['Fredoka_One'] text-4xl sm:text-5xl lg:text-6xl text-white mb-2">
                  {albumData.title}
                </h1>
                <p className="text-lg sm:text-xl text-white/80 mb-6">
                  {albumData.subtitle}
                </p>

                {/* Primary CTAs */}
                <div className="flex flex-wrap justify-center lg:justify-start gap-3 mb-8">
                  <a
                    href={albumData.spotifyUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-6 py-3 bg-[#1DB954] text-white font-bold rounded-full shadow-[0_4px_0_#15863c] transition-all duration-200 hover:translate-y-[2px] hover:shadow-[0_2px_0_#15863c] active:translate-y-[4px] active:shadow-none"
                  >
                    <Play className="w-5 h-5" />
                    Play Album on Spotify
                  </a>
                  <a
                    href={albumData.youtubeUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-6 py-3 bg-white text-[#240046] font-bold rounded-full shadow-[0_4px_0_#ddd] transition-all duration-200 hover:translate-y-[2px] hover:shadow-[0_2px_0_#ddd] active:translate-y-[4px] active:shadow-none"
                  >
                    <Volume2 className="w-5 h-5" />
                    Watch on YouTube
                  </a>
                </div>

                {/* Metadata Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 text-left">
                  <div className="bg-white/10 backdrop-blur-sm rounded-xl p-3">
                    <p className="text-xs text-white/60 uppercase tracking-wider">Artist</p>
                    <p className="font-semibold text-white">{albumData.artist}</p>
                  </div>
                  <div className="bg-white/10 backdrop-blur-sm rounded-xl p-3">
                    <p className="text-xs text-white/60 uppercase tracking-wider">Released</p>
                    <p className="font-semibold text-white">{albumData.releaseDate}</p>
                  </div>
                  <div className="bg-white/10 backdrop-blur-sm rounded-xl p-3">
                    <p className="text-xs text-white/60 uppercase tracking-wider">Genre</p>
                    <p className="font-semibold text-white text-sm">{albumData.genre}</p>
                  </div>
                  <div className="bg-white/10 backdrop-blur-sm rounded-xl p-3">
                    <p className="text-xs text-white/60 uppercase tracking-wider">UPC</p>
                    <p className="font-semibold text-white text-sm">{albumData.upc}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Embedded Player */}
      <section className="py-8 lg:py-12 bg-[#1a0b2e]">
        <div className="w-full px-4 sm:px-6 lg:px-8 xl:px-12">
          <div className="max-w-4xl mx-auto">
            <h2 className="font-['Fredoka_One'] text-2xl text-white mb-6 text-center">
              Preview the Album
            </h2>
            <div className="rounded-2xl overflow-hidden shadow-xl">
              <iframe
                src="https://open.spotify.com/embed/album/3MWhQxXFD4F0WDlqhp9a4m?utm_source=generator"
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
      <div ref={contentRef} className="py-12 lg:py-20 bg-gradient-to-b from-[#1a0b2e] to-[#240046]">
        <div className="w-full px-4 sm:px-6 lg:px-8 xl:px-12">
          <div className="max-w-4xl mx-auto space-y-12 lg:space-y-16">
            {/* Album Overview */}
            <section className="content-section">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-[#F7E859] rounded-full flex items-center justify-center">
                  <Heart className="w-5 h-5 text-[#240046]" />
                </div>
                <h2 className="font-['Fredoka_One'] text-2xl sm:text-3xl text-white">
                  Why This Album Exists
                </h2>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-6 sm:p-8">
                <p className="text-white/90 leading-relaxed whitespace-pre-line">
                  {albumData.artistNote}
                </p>
              </div>
            </section>

            {/* Science Framework */}
            <section className="content-section">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-[#C8F0F7] rounded-full flex items-center justify-center">
                  <Activity className="w-5 h-5 text-[#240046]" />
                </div>
                <h2 className="font-['Fredoka_One'] text-2xl sm:text-3xl text-white">
                  The Science Behind the Sleep
                </h2>
              </div>
              <div className="bg-gradient-to-br from-[#F7E859]/20 to-[#C8F0F7]/20 rounded-3xl p-6 sm:p-8 border border-white/10">
                <p className="text-white/90 leading-relaxed whitespace-pre-line">
                  {albumData.scienceFramework}
                </p>
              </div>
            </section>

            {/* Tracklist */}
            <section className="content-section">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                  <Music className="w-5 h-5 text-white" />
                </div>
                <h2 className="font-['Fredoka_One'] text-2xl sm:text-3xl text-white">
                  Tracklist
                </h2>
              </div>
              <div className="space-y-3">
                {albumData.tracks.map((track) => (
                  <div
                    key={track.number}
                    className="bg-white/10 backdrop-blur-sm rounded-2xl overflow-hidden"
                  >
                    <button
                      onClick={() => setExpandedTrack(expandedTrack === track.number ? null : track.number)}
                      className="w-full flex items-center gap-4 p-4 hover:bg-white/5 transition-colors"
                    >
                      <span className="w-8 h-8 bg-[#F7E859] rounded-full flex items-center justify-center text-[#240046] font-bold text-sm flex-shrink-0">
                        {track.number}
                      </span>
                      <div className="flex-1 text-left">
                        <h3 className="font-['Fredoka_One'] text-white">{track.title}</h3>
                        <p className="text-sm text-white/60">{track.mood}</p>
                      </div>
                      <span className="text-white/60 text-sm">{track.duration}</span>
                      <ChevronDown
                        className={`w-5 h-5 text-white/60 transition-transform duration-300 ${
                          expandedTrack === track.number ? 'rotate-180' : ''
                        }`}
                      />
                    </button>
                    {expandedTrack === track.number && (
                      <div className="px-4 pb-4 pl-16">
                        <p className="text-white/80 text-sm">{track.description}</p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </section>

            {/* Streaming Platforms */}
            <section className="content-section">
              <h2 className="font-['Fredoka_One'] text-2xl sm:text-3xl text-white mb-6 text-center">
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
                        ? 'bg-[#F7E859] text-[#240046] shadow-lg hover:shadow-xl hover:-translate-y-1'
                        : 'bg-white/10 text-white hover:bg-white/20 hover:-translate-y-1'
                    }`}
                  >
                    <span className="font-semibold text-sm text-center">{platform.name}</span>
                  </a>
                ))}
              </div>
            </section>

            {/* Related Albums */}
            <section className="content-section">
              <h2 className="font-['Fredoka_One'] text-2xl sm:text-3xl text-white mb-6">
                More From Aly Bouchnak
              </h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {albumData.relatedAlbums.map((album) => (
                  <a
                    key={album.id}
                    href={album.link}
                    className="group bg-white/10 rounded-2xl overflow-hidden hover:bg-white/20 transition-all duration-300 hover:-translate-y-1"
                  >
                    <div className="aspect-square overflow-hidden">
                      <img
                        src={album.cover}
                        alt={album.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                    </div>
                    <div className="p-4">
                      <h3 className="font-['Fredoka_One'] text-sm text-white mb-1">
                        {album.title}
                      </h3>
                      <p className="text-xs text-white/60">{album.description}</p>
                    </div>
                  </a>
                ))}
              </div>
            </section>

            {/* Parent Guidance CTA */}
            <section className="content-section">
              <div className="bg-[#F7E859] rounded-3xl p-8 sm:p-12 text-center">
                <Moon className="w-12 h-12 text-[#240046] mx-auto mb-4" />
                <h2 className="font-['Fredoka_One'] text-2xl sm:text-3xl text-[#240046] mb-4">
                  Create the Perfect Bedtime Routine
                </h2>
                <p className="text-[#240046]/80 mb-6 max-w-xl mx-auto">
                  Learn how to use "Tuned for Dreams" as part of a consistent bedtime routine that helps your little one drift off peacefully every night.
                </p>
                <a
                  href="/#/discography"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-[#240046] text-white font-bold rounded-full shadow-lg hover:shadow-xl transition-all duration-200 hover:-translate-y-1"
                >
                  Explore All Sleep Music
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

export default SingleAlbum;
