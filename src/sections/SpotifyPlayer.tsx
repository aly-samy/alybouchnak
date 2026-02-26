import { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const SpotifyPlayer = () => {
  const playerRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(playerRef.current,
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: playerRef.current,
            start: 'top 85%',
            toggleActions: 'play none none reverse',
          }
        }
      );
    });

    return () => ctx.revert();
  }, []);

  return (
    <section ref={playerRef} className="py-12 lg:py-16 bg-gradient-to-b from-[#F7E859]/10 to-transparent">
      <div className="w-full px-4 sm:px-6 lg:px-8 xl:px-12">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-3xl shadow-2xl p-8 lg:p-12">
            {/* Header */}
            <div className="text-center mb-8">
              <h2 className="font-['Fredoka_One'] text-2xl sm:text-3xl lg:text-4xl text-[#101010] mb-4">
                Listen Now
              </h2>
              <p className="text-base sm:text-lg text-[#2A2A2A] max-w-2xl mx-auto">
                Stream my latest music directly on Spotify - no login required!
              </p>
            </div>

            {/* Spotify Embed */}
            <div className="relative w-full rounded-2xl overflow-hidden shadow-inner">
              <iframe
                src="https://open.spotify.com/embed/artist/1nRdHdUfxacuQeLWFPXqr8?utm_source=embed&theme=white&view=coverlist"
                width="100%"
                height="380"
                frameBorder="0"
                allow="encrypted-media; clipboard-write; fullscreen; picture-in-picture"
                loading="lazy"
                className="rounded-2xl"
                style={{ minHeight: '380px' }}
                title="Aly Bouchnak on Spotify"
              />
            </div>

            {/* CTA Buttons */}
            <div className="mt-8 text-center">
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <a
                  href="https://open.spotify.com/artist/1nRdHdUfxacuQeLWFPXqr8"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-8 py-4 bg-[#1DB954] text-white font-bold rounded-full shadow-lg hover:shadow-xl transition-all duration-200 hover:-translate-y-1 hover:bg-[#1ED760]"
                >
                  <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 5.4 12 12-5.4S18.6 0 12 0zm0 18.16c0 3.54 2.29 6.53 5.47 7.59.8-3.31-4.03-7.59-7.59-4.03-3.31-7.59-5.47-5.47-7.59-5.47v5.05c0-5.17 4.29-8.46 8.59-11.05l3.41 3.76c3.26-2.77 5.11-5.42 6.89-8.85l-3.67-3.41c-1.78-1.72-3.64-3.58-4.72-5.49-4.03-1.91-5.5-3.7-5.5-5.5V13c0-3.03 2.46-5.5 5.5-5.5s5.5 2.47 5.5 5.5v3.15c0 2.58-2.11 4.66-4.72 5.11l3.66 3.41c1.8 1.67 3.71 3.43 4.72 5.5 4.03 1.91 5.5 3.7 5.5 5.5v-3.15c0-2.58 2.11-4.66 4.72-5.11l-3.66-3.41c-1.8-1.67-3.71-3.43-4.72-5.5-4.03-1.91-5.5-3.7-5.5-5.5z"/>
                  </svg>
                  Open in Spotify
                </a>
                <a
                  href="https://music.apple.com/au/artist/aly-bouchnak/1840274949"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-8 py-4 bg-[#FA243C] text-white font-bold rounded-full shadow-lg hover:shadow-xl transition-all duration-200 hover:-translate-y-1 hover:bg-[#E91D3E]"
                >
                  <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15h-1.5v-6h1.5v6zm0-9h-1.5V2h1.5v6zm-7.5 0h-1.5v15h1.5V8z"/>
                  </svg>
                  Apple Music
                </a>
              </div>
            </div>

            {/* Additional Info */}
            <div className="mt-8 text-center">
              <p className="text-sm text-[#2A2A2A]">
                Available on all major streaming platforms including YouTube Music, Amazon Music, and more
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SpotifyPlayer;
