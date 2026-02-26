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
import Breadcrumbs from '../components/Breadcrumbs';

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

// Track data for The Yummy Spoon
const trackData = {
  title: 'The Yummy Spoon',
  subtitle: 'Mealtime routine and healthy eating habits (Ages 2–5)',
  description: 'Make mealtime fun and establish healthy eating habits with this cheerful track about the joy of food and family dining. Perfect for picky eaters and routine building.',
  coverImage: '/images/the-yummy-spoon-cover.webp',
  artist: 'Aly Bouchnak',
  releaseDate: '2026-03-10',
  duration: '2:20',
  bpm: 105,
  genre: "Children's Pop, Mealtime Music",
  ageRange: '2-5 years',
  mood: 'Playful',
  routine: 'Mealtime',
  isrc: 'GXF972564749',
  album: 'The Yummy Spoon (EP)',
  spotifyUrl: 'https://push.fm/fl/the-yummy-spoon',
  youtubeUrl: 'https://www.youtube.com/@AlyBouchnak',
  appleMusicUrl: 'https://music.apple.com/au/artist/aly-bouchnak/1840274949',
  amazonUrl: 'https://amazon.com/music/player/artists/B0FVYF53CC/aly-bouchnak',
  deezerUrl: '#',
  lyrics: `The yummy spoon goes scoop scoop scoop
The yummy spoon goes scoop scoop scoop
Scoop up your food and eat it all up
The yummy spoon goes scoop scoop scoop

The yummy spoon goes dip dip dip
The yummy spoon goes dip dip dip
Dip in your veggies colorful and bright
The yummy spoon goes dip dip dip

The yummy spoon goes stir stir stir
The yummy spoon goes stir stir stir
Stir up your soup so warm and nice
The yummy spoon goes stir stir stir

The yummy spoon goes taste taste taste
The yummy spoon goes taste taste taste
Taste all the flavors oh so good
The yummy spoon goes taste taste taste

The yummy spoon goes clean clean clean
The yummy spoon goes clean clean clean
Clean up your plate and say hooray
The yummy spoon goes clean clean clean!`,
  artistNote: `I wrote "The Yummy Spoon" after countless mealtime struggles with my own children. As parents, we all know the challenge of getting little ones to eat well and enjoy mealtime. I wanted to create something that would transform the daily battle over food into a joyful, shared experience.

This song addresses the universal parenting challenge of establishing healthy eating habits and positive mealtime routines. The repetitive "scoop, dip, stir, taste" actions mirror the actual movements children make while eating, helping them develop motor skills and coordination alongside healthy habits.

Parents tell me they use this song during:
• Breakfast, lunch, and dinner to create positive mealtime associations
• When introducing new foods to reduce anxiety
• During cooking activities to involve children in food preparation
• For picky eaters to make trying new foods feel like a game

The "yummy spoon" character was intentionally designed to be neutral and friendly—spoons are familiar, non-threatening objects that children interact with daily. By personifying the spoon, we give children a friendly guide through the eating process, making them feel more in control and willing to try new things.`,
  scienceInsight: `The Science Behind Mealtime Learning

"The Yummy Spoon" is designed around developmental psychology and nutritional science principles:

1. Food Neophobia Reduction
The song directly addresses food neophobia (fear of new foods) through what psychologists call "repeated exposure through play." The playful, non-threatening approach reduces anxiety around unfamiliar foods by associating them with positive musical experiences. Research shows it can take 8-15 exposures to a new food before acceptance, and music accelerates this process.

2. Motor Skill Development
The "scoop, dip, stir, taste" actions support fine motor development and hand-eye coordination. The 105 BPM tempo matches the natural rhythm of eating movements for young children, helping synchronize motor actions with the music. This rhythmic entrainment improves motor planning and execution.

3. Social Learning Around Food
The song models positive social behaviors around eating—sharing, trying new things, and cleaning up. This supports what nutritionists call "positive food parenting," where children learn healthy attitudes toward food through observation and shared experiences rather than pressure or coercion.

4. Sensory Integration
The song helps children process multiple sensory inputs simultaneously (taste, texture, smell, sound) through what occupational therapists call "sensory integration." The predictable musical structure provides a framework for organizing these sensory experiences, making them less overwhelming for sensitive children.

Habit Formation Through Repetition
The repetitive chorus structure leverages what behavioral psychologists know about habit formation—repetition in positive contexts strengthens neural pathways. Each time children sing about scooping, dipping, and tasting, they reinforce positive associations with eating behaviors, making healthy habits more automatic over time.`,
  relatedTracks: [
    {
      id: 1,
      title: 'Bock Bock Chicken',
      cover: '/images/bock-bock-chicken-cover.webp',
      description: 'Animal movement fun',
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
      title: 'Nanny & Papa',
      cover: '/images/nanny-papa-cover.webp',
      description: 'Family connection',
      link: '#/track/nanny-papa',
    },
    {
      id: 4,
      title: 'Pet-Pop',
      cover: '/images/the-wise-mice-cover.webp',
      description: 'Animal sound identification',
      link: '#/track/pet-pop',
    },
  ],
};

// Schema.org structured data for the track
const trackSchema = {
  '@context': 'https://schema.org',
  '@type': 'MusicRecording',
  name: 'The Yummy Spoon',
  byArtist: {
    '@type': 'MusicGroup',
    name: 'Aly Bouchnak',
    '@id': 'https://alybouchnak.com/#artist',
  },
  duration: 'PT2M20S',
  isrcCode: 'GXF972564749',
  datePublished: '2026-03-10',
  genre: ["Children's Pop", 'Mealtime Music', 'Habit Building'],
  description: 'Make mealtime fun and establish healthy eating habits with this cheerful track about the joy of food and family dining. Perfect for picky eaters and routine building.',
  image: 'https://alybouchnak.com/images/the-yummy-spoon-cover.webp',
  url: 'https://alybouchnak.com/track/the-yummy-spoon',
  inAlbum: {
    '@type': 'MusicAlbum',
    name: 'The Yummy Spoon',
    '@id': 'https://alybouchnak.com/album/the-yummy-spoon',
  },
  potentialAction: {
    '@type': 'ListenAction',
    target: 'https://push.fm/fl/the-yummy-spoon',
  },
  audience: {
    '@type': 'PeopleAudience',
    suggestedMinAge: '2',
    suggestedMaxAge: '5',
    audienceType: 'Children, Parents, Families',
  },
};

const TheYummySpoon = () => {
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
        keywords="The Yummy Spoon, mealtime songs for kids, eating habits music for toddlers, picky eater songs, Aly Bouchnak"
        canonical="https://alybouchnak.com/track/the-yummy-spoon"
        ogImage="https://alybouchnak.com/images/the-yummy-spoon-cover.webp"
        ogType="music.song"
        schemaData={trackSchema}
      />

      {/* Grain overlay */}
      <div className="grain-overlay" />

      <Navigation />
      <Breadcrumbs />

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
                  Explore More Routine Building Songs
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

export default TheYummySpoon;
