import { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Sun, Moon, Music } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const MoodSupport = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const introRef = useRef<HTMLDivElement>(null);
  const card1Ref = useRef<HTMLDivElement>(null);
  const card2Ref = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 100%',
          end: 'bottom 75%',
          scrub: 0.4,
        }
      });

      // Intro text
      scrollTl.fromTo(introRef.current,
        { y: 24, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.25 },
        0
      );

      // Left card (Day)
      scrollTl.fromTo(card1Ref.current,
        { x: '-12vw', opacity: 0, rotate: -1.5 },
        { x: 0, opacity: 1, rotate: 0, duration: 0.3 },
        0.1
      );

      // Right card (Night)
      scrollTl.fromTo(card2Ref.current,
        { x: '12vw', opacity: 0, rotate: 1.5 },
        { x: 0, opacity: 1, rotate: 0, duration: 0.3 },
        0.1
      );

      // Card content stagger
      [card1Ref, card2Ref].forEach((cardRef, index) => {
        if (cardRef.current) {
          const items = cardRef.current.querySelectorAll('.card-item');
          scrollTl.fromTo(items,
            { y: 16, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.15, stagger: 0.04 },
            0.2 + index * 0.05
          );
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const daySongs = [
    { action: 'Wake Up', song: 'Boom Teka Boom' },
    { action: 'Eat', song: 'The Yummy Spoon' },
    { action: 'Play', song: 'The Funny Bunny Jump' },
    { action: 'Memory', song: 'The Wise Mice' },
  ];

  const nightSongs = [
    { action: 'Calm Down', song: 'The Cooling Wind' },
    { action: 'Deep Sleep', song: 'Tuned for Dreams' },
  ];

  return (
    <section
      ref={sectionRef}
      className="relative w-full py-20 lg:py-32 bg-[#C8F0F7] z-30"
    >
      <div className="w-full px-4 sm:px-6 lg:px-8 xl:px-12">
        {/* Intro text */}
        <div ref={introRef} className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="font-['Fredoka_One'] text-3xl sm:text-4xl lg:text-5xl text-[#101010] mb-6">
            Support for Every Mood
          </h2>
          <p className="text-base sm:text-lg text-[#2A2A2A] leading-relaxed">
            Parenting is a 24-hour job. We created a musical ecosystem that moves with your child's energy,
            from the morning wake-up call to the final goodnight.
          </p>
        </div>

        {/* Cards */}
        <div className="grid md:grid-cols-2 gap-6 lg:gap-8 max-w-5xl mx-auto">
          {/* Day Card */}
          <div
            ref={card1Ref}
            className="card bg-gradient-to-br from-[#F7E859] to-[#f5e047] border-2 border-[#F7E859]/50"
          >
            <div className="card-item flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-md">
                <Sun className="w-6 h-6 text-[#F26B3A]" />
              </div>
              <h3 className="font-['Fredoka_One'] text-xl sm:text-2xl text-[#101010]">
                Sun Up: Bouncy Beats
              </h3>
            </div>

            <p className="card-item text-[#2A2A2A] mb-4">
              <strong>The Goal:</strong> Healthy stimulation, gross motor skills, and happy mornings.
            </p>

            <p className="card-item text-sm text-[#2A2A2A]/80 mb-6">
              When you need to get the "wiggles" out or turn a grumpy morning into a dance party,
              we use <strong>Digital Pop</strong> beats (120–130 BPM).
            </p>

            <ul className="card-item space-y-3 mb-8">
              {daySongs.map((item, index) => (
                <li key={index} className="flex items-center gap-3">
                  <Music className="w-4 h-4 text-[#F26B3A] flex-shrink-0" />
                  <span className="text-sm">
                    <strong>{item.action}:</strong> <em>{item.song}</em>
                  </span>
                </li>
              ))}
            </ul>

            <a
              href="https://open.spotify.com/playlist/0lPuabF1uMFlFJEOMo4PhR"
              target="_blank"
              rel="noopener noreferrer"
              className="card-item btn-primary w-full justify-center"
            >
              Play Active Music
            </a>
          </div>

          {/* Night Card */}
          <div
            ref={card2Ref}
            className="card bg-gradient-to-br from-[#240046] to-[#1a0b2e] border-2 border-[#240046]/50 text-white"
          >
            <div className="card-item flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center shadow-md">
                <Moon className="w-6 h-6 text-[#F7E859]" />
              </div>
              <h3 className="font-['Fredoka_One'] text-xl sm:text-2xl text-white">
                Sun Down: Dream Tones
              </h3>
            </div>

            <p className="card-item text-white/90 mb-4">
              <strong>The Goal:</strong> Regulation, calm down, and deep sleep.
            </p>

            <p className="card-item text-sm text-white/70 mb-6">
              We use the <strong>ISO Principle</strong> to gradually lower your child's heart rate.
              Our lullabies utilize Brown Noise and descending melodies to signal safety.
            </p>

            <ul className="card-item space-y-3 mb-8">
              {nightSongs.map((item, index) => (
                <li key={index} className="flex items-center gap-3">
                  <Music className="w-4 h-4 text-[#F7E859] flex-shrink-0" />
                  <span className="text-sm text-white/90">
                    <strong>{item.action}:</strong> <em>{item.song}</em>
                  </span>
                </li>
              ))}
            </ul>

            <a
              href="https://open.spotify.com/playlist/7h5qLPt2auQBVH6jXpkhpa"
              target="_blank"
              rel="noopener noreferrer"
              className="card-item inline-flex items-center justify-center w-full px-8 py-4 bg-white/10 text-white font-bold rounded-full 
                         shadow-[0_4px_0_rgba(0,0,0,0.3)] transition-all duration-200 hover:translate-y-[2px] hover:shadow-[0_2px_0_rgba(0,0,0,0.3)]
                         active:translate-y-[4px] active:shadow-none backdrop-blur-sm"
            >
              Play Sleep Music
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MoodSupport;
