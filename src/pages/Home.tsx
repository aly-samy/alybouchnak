import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Navigation from '../sections/Navigation';
import Hero from '../sections/Hero';
import SpotifyPlayer from '../sections/SpotifyPlayer';
import { lazy, Suspense } from 'react';

const About = lazy(() => import('../sections/About'));
const MoodSupport = lazy(() => import('../sections/MoodSupport'));
const NewReleases = lazy(() => import('../sections/NewReleases'));
const LatestPlaylists = lazy(() => import('../sections/LatestPlaylists'));
const LatestThemes = lazy(() => import('../sections/LatestThemes'));
const Playlist = lazy(() => import('../sections/Playlist'));
const Testimonials = lazy(() => import('../sections/Testimonials'));
const Support = lazy(() => import('../sections/Support'));
const Newsletter = lazy(() => import('../sections/Newsletter'));
const Footer = lazy(() => import('../sections/Footer'));
import SEO from '../components/SEO';

gsap.registerPlugin(ScrollTrigger);

// MusicGroup schema
const artistSchema = {
  '@context': 'https://schema.org',
  '@type': 'MusicGroup',
  '@id': 'https://alybouchnak.com/#artist',
  name: 'Aly Bouchnak',
  url: 'https://alybouchnak.com',
  image: [
    'https://alybouchnak.com/images/Aly-bouchnak-profile.webp'
  ],

  description:
    "Aly Bouchnak is a children’s music producer creating modern nursery rhymes and movement-based digital pop for toddlers and preschoolers. His music blends playful energy with structured rhythm to support family dance time, routines, and early learning.",

  genre: [
    "Children's Music",
    "Kids Pop",
    "Nursery Rhymes",
    "Educational Music",
    "Digital Pop"
  ],

  areaServed: {
    '@type': 'AdministrativeArea',
    name: 'Worldwide'
  },

  foundingDate: '2025',

  brand: {
    '@type': 'Brand',
    name: "The Bloom's House"
  },

  founder: {
    '@type': 'Person',
    name: 'Aly Bouchnak'
  },

  identifier: [
    {
      '@type': 'PropertyValue',
      propertyID: 'ISNI',
      value: '0000000529569919'
    },
    {
      '@type': 'PropertyValue',
      propertyID: 'IPI',
      value: '1337888402'
    },
    {
      '@type': 'PropertyValue',
      propertyID: 'IPI',
      value: '1337888304'
    }
  ],

  sameAs: [
    'https://open.spotify.com/artist/1nRdHdUfxacuQeLWFPXqr8',
    'https://music.apple.com/us/artist/aly-bouchnak/1840274949',
    'https://amazon.com/music/player/artists/B0FVYF53CC/aly-bouchnak',
    'https://www.youtube.com/@AlyBouchnak',
    'https://www.instagram.com/alybouchnak/',
    'https://www.facebook.com/alybouchnak/',
    'https://musicbrainz.org/artist/aaec4457-1558-4400-a316-72e14f698922',
    'https://genius.com/artists/Aly-bouchnak',
    'https://www.musixmatch.com/artist/Aly-Bouchnak',
    'https://x.com/aly_bouchnak',
    'https://www.tiktok.com/@alybouchnak'
  ],

  keywords:
    "toddler music, preschool songs, nursery rhymes remix, kids dance songs, movement songs for toddlers, educational kids music, family friendly music",

  // Enhanced entity recognition
  knowsAbout: [
    "Children's Music Education",
    "Music Production",
    "Digital Pop Production",
    "Early Childhood Development",
    "Toddler Entertainment",
    "Family-Friendly Content"
  ],

  foundingLocation: {
    '@type': 'Place',
    name: 'Cairo, Egypt'
  },

  mainEntityOfPage: {
    '@type': 'WebPage',
    '@id': 'https://alybouchnak.com/#website'
  }
};

function Home() {
  const mainRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Global snap for pinned sections
    const setupGlobalSnap = () => {
      const pinned = ScrollTrigger.getAll()
        .filter(st => st.vars.pin)
        .sort((a, b) => a.start - b.start);

      const maxScroll = ScrollTrigger.maxScroll(window);
      if (!maxScroll || pinned.length === 0) return;

      const pinnedRanges = pinned.map(st => ({
        start: st.start / maxScroll,
        end: (st.end ?? st.start) / maxScroll,
        center: (st.start + ((st.end ?? st.start) - st.start) * 0.35) / maxScroll,
      }));

      ScrollTrigger.create({
        snap: {
          snapTo: (value: number) => {
            const inPinned = pinnedRanges.some(r => value >= r.start - 0.02 && value <= r.end + 0.02);
            if (!inPinned) return value;

            const target = pinnedRanges.reduce((closest, r) =>
              Math.abs(r.center - value) < Math.abs(closest - value) ? r.center : closest,
              pinnedRanges[0]?.center ?? 0
            );
            return target;
          },
          duration: { min: 0.15, max: 0.35 },
          delay: 0,
          ease: "power2.out"
        }
      });
    };

    // Delay to allow all ScrollTriggers to initialize
    const timer = setTimeout(setupGlobalSnap, 500);

    return () => {
      clearTimeout(timer);
      ScrollTrigger.getAll().forEach(st => st.kill());
    };
  }, []);

  return (
    <div ref={mainRef} className="relative">
      <SEO
        title="Aly Bouchnak | Modern Kids Pop, Nursery Rhymes & Family Dance Music"
        description="Aly Bouchnak creates modern nursery rhymes and kids pop songs for toddlers and preschoolers. Stream movement-based family dance music from The Bloom’s House."
        keywords="toddler music, preschool songs, nursery rhymes remix, kids dance songs, movement songs for toddlers, family dance music, educational kids music"
        canonical="https://alybouchnak.com"
        ogImage="https://alybouchnak.com/images/Aly-bouchnak-profile.webp"
        ogType="website"
        schemaData={artistSchema}
      />

      {/* Grain overlay */}
      <div className="grain-overlay" />

      {/* Navigation */}
      <Navigation />

      {/* Main content */}
      <main className="relative">
        <Hero />
        <SpotifyPlayer />
        <Suspense fallback={null}>
          <About />
          <MoodSupport />
          <NewReleases />
          <LatestPlaylists />
          <LatestThemes />
          <Playlist />
          <Testimonials />
          <Support />
          <Newsletter />
          <Footer />
        </Suspense>
      </main>
    </div>
  );
}

export default Home;
