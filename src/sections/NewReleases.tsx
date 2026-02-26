import { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Play } from 'lucide-react';
import { getAllTracks } from '../data/tracks';

gsap.registerPlugin(ScrollTrigger);

// Get recent tracks from centralized data
const recentTracks = getAllTracks()
  .sort((a, b) => new Date(b.releaseDate).getTime() - new Date(a.releaseDate).getTime())
  .slice(0, 4);

interface Release {
  id: number;
  title: string;
  date: string;
  description: string;
  image: string;
  link: string;
  status: 'available' | 'presave' | 'coming-soon';
}

// Convert tracks to releases format
const releases: Release[] = recentTracks.map((track, index) => ({
  id: index + 1,
  title: track.title,
  date: new Date(track.releaseDate).toLocaleDateString('en-US', { 
    month: 'short', 
    day: 'numeric', 
    year: 'numeric' 
  }),
  description: track.description,
  image: track.coverImage,
  link: `#/track/${track.slug}`,
  status: 'available' as const
}));


const NewReleases = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // Heading animation
      gsap.fromTo(headingRef.current,
        { y: 28, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          scrollTrigger: {
            trigger: headingRef.current,
            start: 'top 85%',
            toggleActions: 'play none none reverse',
          }
        }
      );

      // Cards animation
      if (gridRef.current) {
        const cards = gridRef.current.querySelectorAll('.release-card');
        gsap.fromTo(cards,
          { y: 60, scale: 0.96, opacity: 0 },
          {
            y: 0,
            scale: 1,
            opacity: 1,
            duration: 0.5,
            stagger: 0.08,
            scrollTrigger: {
              trigger: gridRef.current,
              start: 'top 80%',
              toggleActions: 'play none none reverse',
            }
          }
        );

        // Cover parallax
        cards.forEach((card) => {
          const img = card.querySelector('img');
          if (img) {
            gsap.fromTo(img,
              { y: 0 },
              {
                y: -10,
                scrollTrigger: {
                  trigger: card,
                  start: 'top bottom',
                  end: 'bottom top',
                  scrub: true,
                }
              }
            );
          }
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const getButtonText = (status: Release['status']) => {
    switch (status) {
      case 'available':
        return 'Listen Now';
      case 'presave':
        return 'Pre-Save';
      case 'coming-soon':
        return 'Coming Soon';
    }
  };

  const getButtonClass = (status: Release['status']) => {
    if (status === 'coming-soon') {
      return 'inline-flex items-center justify-center w-full px-6 py-3 bg-gray-300 text-gray-500 font-bold rounded-full cursor-not-allowed';
    }
    return 'btn-primary w-full justify-center';
  };

  return (
    <section
      ref={sectionRef}
      id="music"
      className="relative w-full py-20 lg:py-32 bg-[#C8F0F7] z-40"
    >
      <div className="w-full px-4 sm:px-6 lg:px-8 xl:px-12">
        {/* Heading */}
        <div ref={headingRef} className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="font-['Fredoka_One'] text-3xl sm:text-4xl lg:text-5xl text-[#101010] mb-4">
            New Releases
          </h2>
          <p className="text-base sm:text-lg text-[#2A2A2A]">
            Fresh tracks for playtime, routines, and bedtime.
          </p>
        </div>

        {/* Grid */}
        <div
          ref={gridRef}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 max-w-6xl mx-auto"
        >
          {releases.map((release) => (
            <div
              key={release.id}
              className="release-card card overflow-hidden group"
            >
              {/* Cover image */}
              <div className="relative aspect-square overflow-hidden rounded-2xl mb-4">
                <img
                  src={release.image}
                  alt={release.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="absolute bottom-3 right-3 w-10 h-10 bg-[#F26B3A] rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 shadow-lg">
                  <Play className="w-5 h-5 text-white ml-0.5" />
                </div>
              </div>

              {/* Content */}
              <div className="space-y-2">
                <h3 className="font-['Fredoka_One'] text-lg text-[#101010] line-clamp-1">
                  {release.title}
                </h3>
                <p className="text-sm text-[#F26B3A] font-semibold">
                  {release.status === 'available' ? 'Released' : release.status === 'presave' ? 'Releasing' : 'Coming'}: {release.date}
                </p>
                <p className="text-sm text-[#2A2A2A] line-clamp-2">
                  {release.description}
                </p>

                {/* Button */}
                {release.status === 'coming-soon' ? (
                  <button className={getButtonClass(release.status)} disabled>
                    {getButtonText(release.status)}
                  </button>
                ) : (
                  <a
                    href={release.link}
                    className={getButtonClass(release.status)}
                  >
                    {getButtonText(release.status)}
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Latest Albums Section */}
        <div className="mt-20">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h3 className="font-['Fredoka_One'] text-2xl sm:text-3xl lg:text-4xl text-[#101010] mb-4">
              Latest Albums
            </h3>
            <p className="text-base sm:text-lg text-[#2A2A2A]">
              Complete collections for every moment of your child's day.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {/* Tuned for Dreams */}
            <div className="card overflow-hidden group">
              <div className="relative aspect-square overflow-hidden rounded-2xl mb-4">
                <img
                  src="/images/dreams-cover.webp"
                  alt="Tuned for Dreams album cover"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="absolute bottom-3 right-3 w-10 h-10 bg-[#240046] rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 shadow-lg">
                  <Play className="w-5 h-5 text-white ml-0.5" />
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex items-center gap-2 mb-2">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#240046] text-white text-sm font-semibold rounded-full">
                    Sleep
                  </span>
                  <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white/60 text-[#101010] text-sm font-semibold rounded-full">
                    8 Tracks
                  </span>
                </div>
                <h3 className="font-['Fredoka_One'] text-lg text-[#101010] line-clamp-1">
                  Tuned for Dreams
                </h3>
                <p className="text-sm text-[#F26B3A] font-semibold">
                  Released: Jan 9, 2026
                </p>
                <p className="text-sm text-[#2A2A2A] line-clamp-2">
                  A psychoacoustic sleep album designed on the ISO Principle, moving infants from wakefulness to deep sleep.
                </p>
                <a
                  href="#/album/tuned-for-dreams"
                  className="btn-primary w-full justify-center"
                >
                  Listen Now
                </a>
              </div>
            </div>

            {/* The Bloom's House: Volume 1 */}
            <div className="card overflow-hidden group">
              <div className="relative aspect-square overflow-hidden rounded-2xl mb-4">
                <img
                  src="/images/the-blooms-house-volume-1-cover.webp"
                  alt="The Bloom's House: Volume 1 album cover"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="absolute bottom-3 right-3 w-10 h-10 bg-[#F26B3A] rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 shadow-lg">
                  <Play className="w-5 h-5 text-white ml-0.5" />
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex items-center gap-2 mb-2">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#F26B3A] text-white text-sm font-semibold rounded-full">
                    Playful
                  </span>
                  <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white/60 text-[#101010] text-sm font-semibold rounded-full">
                    10 Tracks
                  </span>
                </div>
                <h3 className="font-['Fredoka_One'] text-lg text-[#101010] line-clamp-1">
                  The Bloom's House: Volume 1
                </h3>
                <p className="text-sm text-[#F26B3A] font-semibold">
                  Released: Dec 25, 2025
                </p>
                <p className="text-sm text-[#2A2A2A] line-clamp-2">
                  A complete collection of fun, engaging songs for toddlers and preschoolers covering daily routines and developmental skills.
                </p>
                <a
                  href="#/album/the-blooms-house-volume-1"
                  className="btn-primary w-full justify-center"
                >
                  Listen Now
                </a>
              </div>
            </div>

            {/* The Bloom's House: Classics Party */}
            <div className="card overflow-hidden group">
              <div className="relative aspect-square overflow-hidden rounded-2xl mb-4">
                <img
                  src="/images/the-blooms-house-classics-party-cover.webp"
                  alt="The Bloom's House: Classics Party album cover"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="absolute bottom-3 right-3 w-10 h-10 bg-[#F7E859] rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 shadow-lg">
                  <Play className="w-5 h-5 text-white ml-0.5" />
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex items-center gap-2 mb-2">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#F7E859] text-[#101010] text-sm font-semibold rounded-full">
                    Celebratory
                  </span>
                  <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white/60 text-[#101010] text-sm font-semibold rounded-full">
                    12 Tracks
                  </span>
                </div>
                <h3 className="font-['Fredoka_One'] text-lg text-[#101010] line-clamp-1">
                  The Bloom's House: Classics Party
                </h3>
                <p className="text-sm text-[#F26B3A] font-semibold">
                  Released: Feb 14, 2026
                </p>
                <p className="text-sm text-[#2A2A2A] line-clamp-2">
                  A vibrant collection of classic children's songs transformed with contemporary pop production and playful energy for family dance parties.
                </p>
                <a
                  href="#/album/the-blooms-house-classics-party"
                  className="btn-primary w-full justify-center"
                >
                  Listen Now
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default NewReleases;
