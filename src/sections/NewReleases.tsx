import { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Play } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface Release {
  id: number;
  title: string;
  date: string;
  description: string;
  image: string;
  link: string;
  status: 'available' | 'presave' | 'coming-soon';
}

const releases: Release[] = [
  {
    id: 1,
    title: 'The Wise Mice',
    date: 'Feb 11, 2026',
    description: 'Master memory and sequencing with this cumulative dance track.',
    image: '/images/the-wise-mice-cover.webp',
    link: 'https://push.fm/fl/the-wise-mice',
    status: 'available',
  },
  {
    id: 2,
    title: 'Boom Teka Boom (EP)',
    date: 'Jan 30, 2026',
    description: 'The ultimate morning wake-up song.',
    image: '/images/boom-teka-cover.webp',
    link: 'https://push.fm/fl/boom-teka-boom',
    status: 'available',
  },
  {
    id: 3,
    title: 'Nanny & Papa',
    date: 'Feb 27, 2026',
    description: 'A heartwarming family anthem celebrating grandparent bonds.',
    image: '/images/nanny-and-papa-cover.webp',
    link: 'https://push.fm/ps/nanny-and-papa',
    status: 'presave',
  },
  {
    id: 4,
    title: 'The Yummy Spoon',
    date: 'Mar 11, 2026',
    description: 'Turn mealtime into playtime with this gentle guide for picky eaters.',
    image: '/images/the-yummy-spoon-cover.webp',
    link: 'https://push.fm/ps/the-yummy-spoon',
    status: 'presave',
  },
  {
    id: 5,
    title: 'The Funny Bunny Jump',
    date: 'Apr 3, 2026',
    description: 'Build active listening and motor skills with this freeze dance game.',
    image: '/images/the-funny-bunny-jump-cover.webp',
    link: 'https://push.fm/ps/the-funny-bunny-jump',
    status: 'presave',
  },
  {
    id: 6,
    title: 'Mary Had a Little Lamb',
    date: 'Feb 27, 2026',
    description: 'A modern, bouncy reimagining of a classic to fuel your dance party.',
    image: '/images/mary-had-a-little-lamb.webp',
    link: '#',
    status: 'coming-soon',
  },
];

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
                    target="_blank"
                    rel="noopener noreferrer"
                    className={getButtonClass(release.status)}
                  >
                    {getButtonText(release.status)}
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default NewReleases;
