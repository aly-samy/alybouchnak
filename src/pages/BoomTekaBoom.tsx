import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { 
  Play, 
  Music, 
  Clock, 
  Activity, 
  Users, 
  Zap, 
  Sun, 
  ChevronDown,
  ExternalLink,
  Youtube,
  Music2
} from 'lucide-react';
import Navigation from '../sections/Navigation';
import Footer from '../sections/Footer';
import SEO from '../components/SEO';

gsap.registerPlugin(ScrollTrigger);

// Spotify icon component
const SpotifyIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z"/>
  </svg>
);

// Apple Music icon component
const AppleMusicIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M23.994 6.124a9.23 9.23 0 00-.24-2.19c-.317-1.31-1.062-2.31-2.18-3.043a5.022 5.022 0 00-1.877-.726 10.496 10.496 0 00-1.564-.15c-.04-.003-.083-.01-.124-.013H5.986c-.152.01-.303.017-.455.026-.747.043-1.49.123-2.206.313-1.52.42-2.62 1.29-3.29 2.767-.363.79-.54 1.63-.564 2.496-.01.143-.017.287-.018.43V17.9c.01.146.017.293.027.44.043.724.123 1.444.31 2.14.42 1.52 1.29 2.62 2.77 3.29.79.363 1.63.54 2.5.564.143.01.287.017.43.018h12.06c.146-.01.293-.017.44-.027.724-.043 1.444-.123 2.14-.31 1.52-.42 2.62-1.29 3.29-2.77.363-.79.54-1.63.564-2.5.01-.143.017-.287.018-.43V6.554c-.01-.146-.017-.293-.027-.44zm-6.24 10.79V8.36c0-.23-.07-.45-.2-.63-.26-.35-.7-.52-1.14-.44l-5.7.98c-.48.08-.81.51-.81 1v8.14c-.88-.53-1.96-.76-3.1-.55-1.78.33-3.05 1.8-3.05 3.6 0 2.05 1.68 3.7 3.74 3.7 1.74 0 3.2-1.2 3.62-2.82.1-.38.15-.78.15-1.19v-6.7l4.26-.73v5.35c-.88-.52-1.95-.75-3.09-.54-1.78.33-3.05 1.8-3.05 3.6 0 2.05 1.68 3.7 3.74 3.7 1.88 0 3.43-1.39 3.69-3.2.04-.28.07-.56.07-.85z"/>
  </svg>
);

// Track data for Boom Teka Boom
const trackData = {
  title: 'Boom Teka Boom',
  subtitle: 'High-energy wake-up songs to start the day (Ages 2–6)',
  description: 'An energetic morning anthem designed to help children wake up happy and ready for the day. Perfect for establishing positive morning routines and transitioning from sleep to active play.',
  coverImage: '/images/boom-teka-cover.webp',
  artist: 'Aly Bouchnak',
  releaseDate: '2026-01-30',
  duration: '2:30',
  bpm: 132,
  genre: "Children's Pop, Morning Music",
  ageRange: '2-6 years',
  mood: 'Energetic',
  routine: 'Morning',
  isrc: 'GXF972564746',
  album: 'Boom Teka Boom (EP)',
  spotifyUrl: 'https://push.fm/fl/boom-teka-boom',
  youtubeUrl: 'https://www.youtube.com/@AlyBouchnak',
  appleMusicUrl: 'https://music.apple.com/au/artist/aly-bouchnak/1840274949',
  amazonUrl: 'https://amazon.com/music/player/artists/B0FVYF53CC/aly-bouchnak',
  deezerUrl: '#',
  lyrics: `Boom teka boom boom boom!
Wake up wake up it's morning time
Boom teka boom boom boom!
Stretch your arms and feel so fine

Boom teka boom boom boom!
Clap your hands and stomp your feet
Boom teka boom boom boom!
The day is sweet, the day is neat

Boom teka boom boom boom!
Brush your teeth and wash your face
Boom teka boom boom boom!
Get ready for this happy place

Boom teka boom boom boom!
Eat your breakfast yum yum yum
Boom teka boom boom boom!
Morning time is so much fun!`,
  artistNote: `I created "Boom Teka Boom" after struggling with my own morning routine as a parent. Mornings can be chaotic and stressful, but I noticed that music had the power to transform the entire atmosphere of our home. I wanted something that would make waking up exciting rather than a battle.

This song addresses a universal parenting challenge: getting children to transition from sleep to activity without meltdowns. The "boom teka boom" rhythm is intentionally catchy and easy for even toddlers to mimic, giving them something to focus on as they wake up.

Parents tell me they use this song during:
• Morning wake-up routines instead of traditional alarms
• Transitioning from crib/bed to getting dressed
• Breakfast time to create a positive atmosphere
• Getting ready for daycare or preschool

The repetitive "boom" sound was inspired by how children naturally make percussive noises when they're excited. It's a sound that says "energy is coming!" without being overwhelming for sleepy brains.`,
  scienceInsight: `The Science Behind Morning Energy

"Boom Teka Boom" is designed around circadian rhythm and developmental psychology principles:

1. Circadian Rhythm Support
The 132 BPM tempo matches the natural heart rate increase that occurs during morning wake-up. This tempo helps synchronize children's internal clocks with external cues, supporting healthy circadian rhythm development. The steady beat provides a predictable structure that helps the nervous system transition from rest to activity.

2. Auditory Processing Development
The "boom teka boom" pattern uses percussive sounds that are easily processed by developing brains. The rhythm creates what neuroscientists call "auditory entrainment"—where brainwaves naturally synchronize with external rhythms. This helps children achieve alertness more gently than sudden noises or traditional alarms.

3. Motor Planning & Sequencing
The song's structure guides children through a sequence of morning actions (stretching, clapping, brushing teeth, eating). This helps develop executive function skills like planning and sequencing. The musical cues make it easier for children to remember and follow multi-step routines.

4. Emotional Regulation
Morning transitions can be emotionally challenging for young children. The upbeat, predictable rhythm helps regulate the limbic system, reducing morning anxiety and resistance. The song creates positive associations with waking up, which can improve overall mood and cooperation.

Energy Activation
The gradual build-up of energy in the song mirrors the natural process of waking up. It starts gently and builds to full energy, allowing children's nervous systems to adjust gradually rather than being shocked awake.`,
  relatedTracks: [
    {
      id: 1,
      title: 'Bock Bock Chicken',
      cover: '/images/bock-bock-chicken-cover.webp',
      description: 'High-energy movement fun',
      link: '#/track/bock-bock-chicken',
    },
    {
      id: 2,
      title: 'The Funny Bunny Jump',
      cover: '/images/the-funny-bunny-jump-cover.webp',
      description: 'Freeze dance game',
      link: '#/track/the-funny-bunny-jump',
    },
    {
      id: 3,
      title: 'Pet-Pop',
      cover: '/images/the-wise-mice-cover.webp',
      description: 'Animal sound identification',
      link: '#/track/pet-pop',
    },
    {
      id: 4,
      title: 'The Wise Mice',
      cover: '/images/the-wise-mice-cover.webp',
      description: 'Memory and sequencing',
      link: '#/track/the-wise-mice',
    },
  ],
};

// Schema.org structured data for the track
const trackSchema = {
  '@context': 'https://schema.org',
  '@type': 'MusicRecording',
  name: 'Boom Teka Boom',
  byArtist: {
    '@type': 'MusicGroup',
    name: 'Aly Bouchnak',
    '@id': 'https://alybouchnak.com/#artist',
  },
  duration: 'PT2M30S',
  isrcCode: 'GXF972564746',
  datePublished: '2026-01-30',
  genre: ["Children's Pop", 'Morning Music', 'Wake-up Songs'],
  description: 'An energetic morning anthem designed to help children wake up happy and ready for the day. Perfect for establishing positive morning routines and transitioning from sleep to active play.',
  image: 'https://alybouchnak.com/images/boom-teka-cover.webp',
  url: 'https://alybouchnak.com/track/boom-teka-boom',
  inAlbum: {
    '@type': 'MusicAlbum',
    name: 'Boom Teka Boom',
    '@id': 'https://alybouchnak.com/album/boom-teka-boom',
  },
  potentialAction: {
    '@type': 'ListenAction',
    target: 'https://push.fm/fl/boom-teka-boom',
  },
  audience: {
    '@type': 'PeopleAudience',
    suggestedMinAge: '2',
    suggestedMaxAge: '6',
    audienceType: 'Children, Parents, Families',
  },
};

const BoomTekaBoom = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [showLyrics, setShowLyrics] = useState(false);

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
    { name: 'Spotify', Icon: SpotifyIcon, url: trackData.spotifyUrl, primary: true },
    { name: 'YouTube Music', Icon: Youtube, url: trackData.youtubeUrl, primary: true },
    { name: 'Apple Music', Icon: AppleMusicIcon, url: trackData.appleMusicUrl, primary: true },
    { name: 'Amazon Music', Icon: Music2, url: trackData.amazonUrl, primary: false },
  ];

  return (
    <div className="relative min-h-screen bg-[#C8F0F7]">
      <SEO
        title={`${trackData.title} | Aly Bouchnak — Children's Music`}
        description={trackData.description}
        keywords="Boom Teka Boom, morning songs for kids, wake up songs for children, toddler routine music, Aly Bouchnak"
        canonical="https://alybouchnak.com/track/boom-teka-boom"
        ogImage="https://alybouchnak.com/images/boom-teka-cover.webp"
        ogType="music.song"
        schemaData={trackSchema}
      />

      {/* Grain overlay */}
      <div className="grain-overlay" />

      <Navigation />

      {/* Hero Section */}
      <div ref={heroRef} className="pt-28 pb-12 lg:pt-32 lg:pb-16">
        <div className="w-full px-4 sm:px-6 lg:px-8 xl:px-12">
          <div className="max-w-6xl mx-auto">
            <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-start">
              {/* Cover Art */}
              <div className="w-full max-w-sm mx-auto lg:mx-0 flex-shrink-0">
                <div className="relative aspect-square rounded-3xl overflow-hidden shadow-2xl">
                  <img
                    src={trackData.coverImage}
                    alt={`${trackData.title} cover art`}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                </div>
              </div>

              {/* Track Info */}
              <div className="flex-1 text-center lg:text-left">
                {/* Badges */}
                <div className="flex flex-wrap justify-center lg:justify-start gap-2 mb-4">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#F26B3A] text-white text-sm font-semibold rounded-full">
                    <Zap className="w-4 h-4" />
                    {trackData.mood}
                  </span>
                  <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#F7E859] text-[#101010] text-sm font-semibold rounded-full">
                    <Sun className="w-4 h-4" />
                    {trackData.routine}
                  </span>
                  <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white text-[#101010] text-sm font-semibold rounded-full">
                    <Users className="w-4 h-4" />
                    Ages {trackData.ageRange}
                  </span>
                </div>

                <h1 className="font-['Fredoka_One'] text-4xl sm:text-5xl lg:text-6xl text-[#101010] mb-2">
                  {trackData.title}
                </h1>
                <p className="text-lg sm:text-xl text-[#2A2A2A] mb-6">
                  {trackData.subtitle}
                </p>

                {/* Primary CTAs */}
                <div className="flex flex-wrap justify-center lg:justify-start gap-3 mb-8">
                  <a
                    href={trackData.spotifyUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-spotify inline-flex items-center gap-2"
                  >
                    <Play className="w-5 h-5" />
                    Listen on Spotify
                  </a>
                  <a
                    href={trackData.youtubeUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-6 py-3 bg-[#FF0000] text-white font-bold rounded-full shadow-[0_4px_0_#cc0000] transition-all duration-200 hover:translate-y-[2px] hover:shadow-[0_2px_0_#cc0000] active:translate-y-[4px] active:shadow-none"
                  >
                    <Youtube className="w-5 h-5" />
                    Watch on YouTube
                  </a>
                  <a
                    href={trackData.appleMusicUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-6 py-3 bg-[#FA243C] text-white font-bold rounded-full shadow-[0_4px_0_#c71d2f] transition-all duration-200 hover:translate-y-[2px] hover:shadow-[0_2px_0_#c71d2f] active:translate-y-[4px] active:shadow-none"
                  >
                    <Music className="w-5 h-5" />
                    Apple Music
                  </a>
                </div>

                {/* Metadata Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 text-left">
                  <div className="bg-white/60 backdrop-blur-sm rounded-xl p-3">
                    <p className="text-xs text-[#2A2A2A]/60 uppercase tracking-wider">Artist</p>
                    <p className="font-semibold text-[#101010]">{trackData.artist}</p>
                  </div>
                  <div className="bg-white/60 backdrop-blur-sm rounded-xl p-3">
                    <p className="text-xs text-[#2A2A2A]/60 uppercase tracking-wider">Released</p>
                    <p className="font-semibold text-[#101010]">{trackData.releaseDate}</p>
                  </div>
                  <div className="bg-white/60 backdrop-blur-sm rounded-xl p-3">
                    <p className="text-xs text-[#2A2A2A]/60 uppercase tracking-wider">Duration</p>
                    <p className="font-semibold text-[#101010] flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5" />
                      {trackData.duration}
                    </p>
                  </div>
                  <div className="bg-white/60 backdrop-blur-sm rounded-xl p-3">
                    <p className="text-xs text-[#2A2A2A]/60 uppercase tracking-wider">BPM</p>
                    <p className="font-semibold text-[#101010] flex items-center gap-1">
                      <Activity className="w-3.5 h-3.5" />
                      {trackData.bpm}
                    </p>
                  </div>
                  <div className="bg-white/60 backdrop-blur-sm rounded-xl p-3">
                    <p className="text-xs text-[#2A2A2A]/60 uppercase tracking-wider">Genre</p>
                    <p className="font-semibold text-[#101010]">{trackData.genre}</p>
                  </div>
                  <div className="bg-white/60 backdrop-blur-sm rounded-xl p-3">
                    <p className="text-xs text-[#2A2A2A]/60 uppercase tracking-wider">ISRC</p>
                    <p className="font-semibold text-[#101010] text-sm">{trackData.isrc}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Embedded Players */}
      <section className="py-8 lg:py-12 bg-white/50 backdrop-blur-sm">
        <div className="w-full px-4 sm:px-6 lg:px-8 xl:px-12">
          <div className="max-w-4xl mx-auto">
            <h2 className="font-['Fredoka_One'] text-2xl text-[#101010] mb-6 text-center">
              Listen Now
            </h2>
            <div className="rounded-2xl overflow-hidden shadow-xl">
              <iframe
                src="https://open.spotify.com/embed/track/your-track-id?utm_source=generator"
                width="100%"
                height="352"
                frameBorder="0"
                allowFullScreen
                allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                loading="lazy"
                className="rounded-2xl"
                title={`${trackData.title} on Spotify`}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div ref={contentRef} className="py-12 lg:py-20">
        <div className="w-full px-4 sm:px-6 lg:px-8 xl:px-12">
          <div className="max-w-4xl mx-auto space-y-12 lg:space-y-16">
            {/* Artist Note */}
            <section className="content-section">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-[#F26B3A] rounded-full flex items-center justify-center">
                  <Music className="w-5 h-5 text-white" />
                </div>
                <h2 className="font-['Fredoka_One'] text-2xl sm:text-3xl text-[#101010]">
                  Why This Track Exists
                </h2>
              </div>
              <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-lg">
                <p className="text-[#2A2A2A] leading-relaxed whitespace-pre-line">
                  {trackData.artistNote}
                </p>
              </div>
            </section>

            {/* Science & Development */}
            <section className="content-section">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-[#F7E859] rounded-full flex items-center justify-center">
                  <Activity className="w-5 h-5 text-[#101010]" />
                </div>
                <h2 className="font-['Fredoka_One'] text-2xl sm:text-3xl text-[#101010]">
                  Science & Developmental Insight
                </h2>
              </div>
              <div className="bg-gradient-to-br from-[#240046] to-[#1a0b2e] rounded-3xl p-6 sm:p-8 text-white">
                <p className="leading-relaxed whitespace-pre-line text-white/90">
                  {trackData.scienceInsight}
                </p>
              </div>
            </section>

            {/* Lyrics */}
            <section className="content-section">
              <button
                onClick={() => setShowLyrics(!showLyrics)}
                className="w-full flex items-center justify-between bg-white rounded-2xl p-5 shadow-lg hover:shadow-xl transition-shadow"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-[#C8F0F7] rounded-full flex items-center justify-center">
                    <Music2 className="w-5 h-5 text-[#101010]" />
                  </div>
                  <h2 className="font-['Fredoka_One'] text-xl sm:text-2xl text-[#101010]">
                    Lyrics
                  </h2>
                </div>
                <ChevronDown
                  className={`w-6 h-6 text-[#F26B3A] transition-transform duration-300 ${
                    showLyrics ? 'rotate-180' : ''
                  }`}
                />
              </button>
              
              {showLyrics && (
                <div className="mt-4 bg-white/80 backdrop-blur-sm rounded-2xl p-6 sm:p-8">
                  <pre className="text-[#2A2A2A] font-nunito whitespace-pre-wrap leading-relaxed">
                    {trackData.lyrics}
                  </pre>
                </div>
              )}
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
                    <platform.Icon className="w-8 h-8" />
                    <span className="font-semibold text-sm">{platform.name}</span>
                  </a>
                ))}
              </div>
            </section>

            {/* Related Tracks */}
            <section className="content-section">
              <h2 className="font-['Fredoka_One'] text-2xl sm:text-3xl text-[#101010] mb-6">
                More Songs You'll Love
              </h2>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {trackData.relatedTracks.map((track) => (
                  <a
                    key={track.id}
                    href={track.link}
                    className="group bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                  >
                    <div className="aspect-square overflow-hidden">
                      <img
                        src={track.cover}
                        alt={track.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                    </div>
                    <div className="p-4">
                      <h3 className="font-['Fredoka_One'] text-sm text-[#101010] mb-1">
                        {track.title}
                      </h3>
                      <p className="text-xs text-[#2A2A2A]/70">{track.description}</p>
                    </div>
                  </a>
                ))}
              </div>
            </section>

            {/* Parent CTA */}
            <section className="content-section">
              <div className="bg-[#F7E859] rounded-3xl p-8 sm:p-12 text-center">
                <h2 className="font-['Fredoka_One'] text-2xl sm:text-3xl text-[#101010] mb-4">
                  Explore More Morning Routine Songs
                </h2>
                <p className="text-[#2A2A2A] mb-6 max-w-xl mx-auto">
                  Discover our full collection of tracks designed to make daily routines fun, positive, and stress-free for the whole family.
                </p>
                <a
                  href="/#/discography"
                  className="btn-primary inline-flex items-center gap-2"
                >
                  View Full Discography
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

export default BoomTekaBoom;
