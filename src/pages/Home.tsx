import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Navigation from '../sections/Navigation';
import Hero from '../sections/Hero';
import About from '../sections/About';
import MoodSupport from '../sections/MoodSupport';
import NewReleases from '../sections/NewReleases';
import Playlist from '../sections/Playlist';
import Testimonials from '../sections/Testimonials';
import Support from '../sections/Support';
import Newsletter from '../sections/Newsletter';
import Footer from '../sections/Footer';
import SEO from '../components/SEO';

gsap.registerPlugin(ScrollTrigger);

// Schema.org structured data for the homepage
const homeSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'Aly Bouchnak',
  alternateName: ['Aly Bouchnak Music', "The Bloom's House"],
  url: 'https://alybouchnak.com',
  potentialAction: {
    '@type': 'ListenAction',
    target: 'https://open.spotify.com/artist/1nRdHdUfxacuQeLWFPXqr8',
  },
};

// MusicGroup schema
const artistSchema = {
  '@context': 'https://schema.org',
  '@type': 'MusicGroup',
  '@id': 'https://alybouchnak.com/#artist',
  name: 'Aly Bouchnak',
  image: [
    'https://alybouchnak.com/images/aly-bouchnak-hero.webp',
  ],
  brand: {
    '@type': 'Brand',
    name: "The Bloom's House",
  },
  identifier: {
    '@type': 'PropertyValue',
    propertyID: 'ISNI',
    value: '0000000529569919',
  },
  url: 'https://alybouchnak.com',
  description: "Aly Bouchnak creates fun, engaging digital pop music for children and families. Our songs are designed to be both entertaining for kids and enjoyable for parents, making family time more musical and fun!",
  genre: ["Children's Music", 'Digital Pop', 'Family Music', 'Kids Pop', 'Educational Music'],
  sameAs: [
    'https://open.spotify.com/artist/1nRdHdUfxacuQeLWFPXqr8',
    'https://music.apple.com/au/artist/aly-bouchnak/1840274949',
    'https://amazon.com/music/player/artists/B0FVYF53CC/aly-bouchnak',
    'https://www.youtube.com/@AlyBouchnak',
    'https://www.instagram.com/alybouchnak/',
    'https://www.facebook.com/alybouchnak/',
    'https://musicbrainz.org/artist/aaec4457-1558-4400-a316-72e14f698922',
    'https://genius.com/artists/Aly-bouchnak',
    'https://www.musixmatch.com/artist/Aly-Bouchnak',
    'https://x.com/aly_bouchnak',
    'https://www.tiktok.com/@alybouchnak',
  ],
  keywords: "children's music, kids songs, family music, toddler songs, educational music, digital pop for kids",
  foundingDate: '2025',
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
        title="Aly Bouchnak | Modern Kids' Pop & Family Music | Official Site"
        description="Aly Bouchnak is a children's music artist creating modern digital pop songs for toddlers and families. Known for hits like 'Pet-Pop' and the 'Bouncy Beats for Little Feet' playlist."
        keywords="children's music, kids songs, educational music, toddler songs, family music, digital pop for kids"
        canonical="https://alybouchnak.com"
        ogImage="https://alybouchnak.com/images/social-preview.png"
        ogType="website"
        schemaData={{ ...homeSchema, ...artistSchema }}
      />

      {/* Grain overlay */}
      <div className="grain-overlay" />
      
      {/* Navigation */}
      <Navigation />
      
      {/* Main content */}
      <main className="relative">
        <Hero />
        <About />
        <MoodSupport />
        <NewReleases />
        <Playlist />
        <Testimonials />
        <Support />
        <Newsletter />
        <Footer />
      </main>
    </div>
  );
}

export default Home;
