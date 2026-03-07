import { useEffect, useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Music, ExternalLink } from 'lucide-react';
import OptimizedImage from '../components/OptimizedImage';

gsap.registerPlugin(ScrollTrigger);

const Hero = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const subheadlineRef = useRef<HTMLParagraphElement>(null);
  const pillsRef = useRef<HTMLDivElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);
  const avatarRef = useRef<HTMLImageElement>(null);
  const ctaRef = useRef<HTMLAnchorElement>(null);
  const cloudsRef = useRef<HTMLDivElement>(null);

  // Load animation (auto-play on mount)
  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      // Clouds drop in smoothly instead of fading
      tl.fromTo(cloudsRef.current,
        { y: -30, scale: 1.06 },
        { y: 0, scale: 1, duration: 0.6 },
        0
      );

      // Headline words stagger
      if (headlineRef.current) {
        const words = headlineRef.current.querySelectorAll('.word');
        // Change initial state to slightly visible out of position to trigger paint early
        tl.fromTo(words,
          { y: 40, opacity: 0.2, rotate: -2 },
          { y: 0, opacity: 1, rotate: 0, duration: 0.6, stagger: 0.03 },
          0.2
        );
      }

      // Subheadline
      // Subheadline drops in
      tl.fromTo(subheadlineRef.current,
        { y: 18, opacity: 0.1 },
        { y: 0, opacity: 1, duration: 0.6 },
        0.5
      );

      // Pills
      if (pillsRef.current) {
        const pills = pillsRef.current.querySelectorAll('.age-pill');
        tl.fromTo(pills,
          { x: -60, opacity: 0.1 },
          { x: 0, opacity: 1, duration: 0.5, stagger: 0.08 },
          0.6
        );
      }

      // CTA
      tl.fromTo(ctaRef.current,
        { y: 10, opacity: 0.1 },
        { y: 0, opacity: 1, duration: 0.4 },
        0.8
      );

      // Badge pop in
      tl.fromTo(badgeRef.current,
        { scale: 0.2, rotate: -24, opacity: 0.1 },
        { scale: 1, rotate: -12, opacity: 1, duration: 0.7, ease: 'back.out(1.8)' },
        0.5
      );

      // Avatar slide up
      tl.fromTo(avatarRef.current,
        { y: '18vh', opacity: 0.1 },
        { y: 0, opacity: 1, duration: 0.9 },
        0.3
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Scroll-driven exit animation
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: '+=130%',
          pin: true,
          scrub: 0.6,
          onLeaveBack: () => {
            // Reset all elements to visible when scrolling back to top
            gsap.set([headlineRef.current, subheadlineRef.current, pillsRef.current, ctaRef.current], {
              x: 0, opacity: 1
            });
            gsap.set(badgeRef.current, { x: 0, y: 0, scale: 1, opacity: 1 });
            gsap.set(avatarRef.current, { x: 0, y: 0, scale: 1, opacity: 1 });
          }
        }
      });

      // ENTRANCE (0-30%): Hold at final state (already entered on load)
      // SETTLE (30-70%): Hold composition
      // EXIT (70-100%): Elements exit

      // Headline block exit
      scrollTl.fromTo([headlineRef.current, subheadlineRef.current, pillsRef.current, ctaRef.current],
        { x: 0, opacity: 1 },
        { x: '-28vw', opacity: 0, ease: 'power2.in' },
        0.7
      );

      // Badge exit
      scrollTl.fromTo(badgeRef.current,
        { x: 0, y: 0, scale: 1, opacity: 1 },
        { x: '18vw', y: '-10vh', scale: 0.65, opacity: 0, ease: 'power2.in' },
        0.7
      );

      // Avatar exit
      scrollTl.fromTo(avatarRef.current,
        { x: 0, y: 0, scale: 1, opacity: 1 },
        { x: '10vw', y: '-6vh', scale: 0.92, opacity: 0.2, ease: 'power2.in' },
        0.7
      );

      // Clouds parallax
      scrollTl.fromTo(cloudsRef.current,
        { y: 0 },
        { y: '-6vh', ease: 'none' },
        0
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const headlineWords = 'Modern digital pop for kids & families.'.split(' ');

  return (
    <section
      ref={sectionRef}
      className="relative w-full h-screen bg-[#C8F0F7] overflow-hidden z-10"
    >
      {/* Background clouds */}
      <div ref={cloudsRef} className="absolute inset-0 pointer-events-none">
        <div className="absolute top-[10%] left-[5%] w-[40vw] h-[40vw] bg-white/20 rounded-full blur-3xl" />
        <div className="absolute top-[20%] right-[20%] w-[30vw] h-[30vw] bg-white/15 rounded-full blur-3xl" />
        <div className="absolute bottom-[30%] left-[30%] w-[25vw] h-[25vw] bg-white/10 rounded-full blur-3xl" />
      </div>

      {/* Content container */}
      <div className="relative w-full h-full flex items-center">
        <div className="w-full px-4 sm:px-6 lg:px-8 xl:px-12 pt-20">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
            {/* Left: Text content */}
            <div className="flex-1 max-w-2xl text-center lg:text-left z-10">
              <h1
                ref={headlineRef}
                className="font-['Fredoka_One'] text-4xl sm:text-5xl lg:text-6xl xl:text-7xl text-[#101010] leading-tight mb-6"
              >
                {headlineWords.map((word, i) => (
                  <span key={i} className="word inline-block mr-[0.3em]">
                    {word}
                  </span>
                ))}
              </h1>

              <p
                ref={subheadlineRef}
                className="text-base sm:text-lg lg:text-xl text-[#2A2A2A] leading-relaxed mb-8 max-w-xl mx-auto lg:mx-0"
              >
                Aly Bouchnak is a children's music artist known for upbeat digital pop songs
                for toddlers and families, including tracks like "The Wise Mice" and playlists
                such as "Bouncy Beats: Toddler Dance Party."
              </p>

              <div ref={pillsRef} className="flex flex-wrap justify-center lg:justify-start gap-3 mb-6">
                <span className="age-pill">
                  <Music className="w-4 h-4" />
                  Ages 1-3
                </span>
                <span className="age-pill">
                  <Music className="w-4 h-4" />
                  Ages 4-6
                </span>
                <span className="age-pill">
                  <Music className="w-4 h-4" />
                  Ages 7-8
                </span>
              </div>

              <a
                ref={ctaRef}
                href="https://open.spotify.com/artist/1nRdHdUfxacuQeLWFPXqr8"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-[#101010] font-semibold hover:text-[#F26B3A] transition-colors"
              >
                Listen on Spotify
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>

            {/* Right: Avatar + Badge */}
            <div className="flex-1 relative flex justify-center lg:justify-end items-end">
              {/* Circular badge */}
              <div
                ref={badgeRef}
                className="absolute top-[5%] left-[5%] lg:top-[10%] lg:left-[10%] z-20"
                style={{ transform: 'rotate(-12deg)' }}
              >
                <div className="w-28 h-28 sm:w-36 sm:h-36 lg:w-44 lg:h-44 bg-[#F26B3A] rounded-full flex items-center justify-center shadow-lg animate-pulse-soft">
                  <div className="text-center text-white px-4">
                    <span className="font-['Fredoka_One'] text-lg sm:text-xl lg:text-2xl block">The</span>
                    <span className="font-['Fredoka_One'] text-xl sm:text-2xl lg:text-3xl block">Bloom's</span>
                    <span className="font-['Fredoka_One'] text-lg sm:text-xl lg:text-2xl block">House</span>
                  </div>
                </div>
              </div>

              <OptimizedImage
                ref={avatarRef}
                src="/images/aly-bouchnak-hero.webp"
                alt="Aly Bouchnak"
                width={800}
                height={800}
                fetchPriority="high"
                loading="eager"
                className="relative z-10 w-full max-w-md lg:max-w-lg xl:max-w-xl h-auto object-contain animate-float"
                style={{ marginBottom: '-5vh' }}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
