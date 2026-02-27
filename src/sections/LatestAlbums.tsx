import { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Disc, ExternalLink, Sun, Moon } from 'lucide-react';
import { getAllAlbums } from '../data/albums';

gsap.registerPlugin(ScrollTrigger);

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

// Get latest 3 albums sorted by release date
const latestAlbums = getAllAlbums()
  .sort((a, b) => new Date(b.releaseDate).getTime() - new Date(a.releaseDate).getTime())
  .slice(0, 3);

const NIGHTTIME_MOODS = ['Calming', 'Transitional', 'Gentle', 'Sleep'];

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

const getButtonText = (status: string) => {
  if (status === 'Upcoming') return 'Coming Soon';
  if (status === 'Pre-Saves') return 'Pre-Save Now';
  return 'Listen';
};

export default function LatestAlbums() {
  const sectionRef = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        sectionRef.current,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="section-padding section-green" id="latest-albums">
      <div className="w-full px-4 sm:px-6 lg:px-8 xl:px-12">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <div className="flex items-center gap-3 mb-10">
            <div className="w-12 h-12 bg-[#F26B3A] rounded-full flex items-center justify-center">
              <Disc className="w-6 h-6 text-white" />
            </div>
            <h2 className="font-['Fredoka_One'] text-3xl sm:text-4xl text-[#101010]">
              Latest Albums
            </h2>
          </div>

          {/* Albums Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {latestAlbums.map((album) => {
              const status = getReleaseStatus(album.releaseDate);
              return (
                <article
                  key={album.id}
                  className="bg-white rounded-3xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-300 hover:-translate-y-2"
                >
                  <div className="aspect-square overflow-hidden">
                    <img
                      src={album.image || album.coverImage}
                      alt={album.title}
                      className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                    />
                  </div>
                  <div className="p-6">
                    <div className="flex items-center gap-2 mb-3">
                      <span
                        className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-sm font-semibold rounded-full ${
                          NIGHTTIME_MOODS.includes(album.mood)
                            ? 'bg-[#240046] text-white'
                            : 'bg-[#F26B3A] text-white'
                        }`}
                      >
                        {NIGHTTIME_MOODS.includes(album.mood) ? (
                          <Moon className="w-4 h-4" />
                        ) : (
                          <Sun className="w-4 h-4" />
                        )}
                        {album.mood}
                      </span>
                      <span
                        className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-sm font-semibold rounded-full ${getStatusBadgeClass(
                          status
                        )}`}
                      >
                        {status}
                      </span>
                    </div>
                    <h3 className="font-['Fredoka_One'] text-xl text-[#101010] mb-2">
                      {album.title}
                    </h3>
                    <p className="text-sm text-[#2A2A2A] mb-4">{album.description}</p>
                    <a
                      href={album.link || `#/album/${album.slug}`}
                      className="inline-flex items-center justify-center w-full px-6 py-3 bg-[#F26B3A] text-white font-bold rounded-full shadow-lg hover:shadow-xl transition-all duration-200 hover:-translate-y-1"
                    >
                      {getButtonText(status)}
                      <ExternalLink className="w-4 h-4 ml-2" />
                    </a>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
