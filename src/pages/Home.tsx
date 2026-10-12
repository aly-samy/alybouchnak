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

import { artistSchema } from '../data/artist';

function Home() {
  const mainRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    let snapTrigger: ReturnType<typeof ScrollTrigger.create> | undefined;
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

      snapTrigger = ScrollTrigger.create({
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
      snapTrigger?.kill();
    };
  }, []);

  return (
    <div ref={mainRef} className="relative">
      <SEO
        title="Aly Bouchnak | Modern Kids Pop, Nursery Rhymes & Family Dance Music"
        description="Aly Bouchnak creates modern nursery rhymes and kids pop songs for toddlers and preschoolers. Stream movement-based family dance music from The Bloom’s House."
        keywords="toddler music, preschool songs, nursery rhymes remix, kids dance songs, movement songs for toddlers, family dance music, educational kids music"
        canonical="https://alybouchnak.com/"
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
