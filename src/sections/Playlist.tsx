import { useRef, useLayoutEffect, useState } from 'react';
import { PlayCircle } from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Music, ExternalLink } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const Playlist = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const embedRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLAnchorElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // Content animation
      gsap.fromTo(contentRef.current,
        { y: 22, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          scrollTrigger: {
            trigger: contentRef.current,
            start: 'top 85%',
            toggleActions: 'play none none reverse',
          }
        }
      );

      // Embed animation
      gsap.fromTo(embedRef.current,
        { scale: 0.92, opacity: 0, y: 30 },
        {
          scale: 1,
          opacity: 1,
          y: 0,
          duration: 0.6,
          scrollTrigger: {
            trigger: embedRef.current,
            start: 'top 85%',
            toggleActions: 'play none none reverse',
          }
        }
      );

      // CTA animation
      gsap.fromTo(ctaRef.current,
        { scale: 0.85, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          duration: 0.5,
          ease: 'back.out(1.6)',
          scrollTrigger: {
            trigger: ctaRef.current,
            start: 'top 90%',
            toggleActions: 'play none none reverse',
          }
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="playlist"
      className="relative w-full py-20 lg:py-32 bg-[#C8F0F7] z-50"
    >
      <div className="w-full px-4 sm:px-6 lg:px-8 xl:px-12">
        <div className="max-w-3xl mx-auto">
          {/* Content */}
          <div ref={contentRef} className="text-center mb-10">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#F26B3A]/10 rounded-full mb-6">
              <Music className="w-5 h-5 text-[#F26B3A]" />
              <span className="text-sm font-semibold text-[#F26B3A]">Spotify Playlist</span>
            </div>
            
            <h2 className="font-['Fredoka_One'] text-3xl sm:text-4xl lg:text-5xl text-[#101010] mb-4">
              Bouncy Beats: Toddler Dance Party
            </h2>
            <p className="text-base sm:text-lg text-[#2A2A2A]">
              The ultimate "guilt-free" playlist for <strong>balanced stimulation</strong>. 
              Featuring "The Wise Mice" and "Bock Bock Chicken."
            </p>
          </div>

          {/* Spotify Embed */}
          <div
            ref={embedRef}
            className="relative rounded-2xl overflow-hidden shadow-2xl mb-8 bg-[#282828] h-[352px] flex flex-col items-center justify-center group cursor-pointer transition-all duration-300"
            onClick={() => setIsLoaded(true)}
          >
            {!isLoaded ? (
                <>
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors duration-300" />
                  <div className="z-10 flex flex-col items-center space-y-4">
                    <div className="w-20 h-20 bg-[#1DB954] text-white rounded-full flex items-center justify-center shadow-lg transform transition-transform duration-300 group-hover:scale-110 group-hover:bg-[#1ED760]">
                      <PlayCircle className="w-10 h-10 ml-1" />
                    </div>
                    <span className="font-['Nunito'] text-white font-bold text-lg tracking-wide drop-shadow-md">
                      Load Spotify Playlist
                    </span>
                  </div>
                  <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-white/70 text-sm">
                    <span className="flex items-center gap-1"><svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 5.4 12 12-5.4S18.6 0 12 0zm0 18.16c0 3.54 2.29 6.53 5.47 7.59.8-3.31-4.03-7.59-7.59-4.03-3.31-7.59-5.47-5.47-7.59-5.47v5.05c0-5.17 4.29-8.46 8.59-11.05l3.41 3.76c3.26-2.77 5.11-5.42 6.89-8.85l-3.67-3.41c-1.78-1.72-3.64-3.58-4.72-5.49-4.03-1.91-5.5-3.7-5.5-5.5V13c0-3.03 2.46-5.5 5.5-5.5s5.5 2.47 5.5 5.5v3.15c0 2.58-2.11 4.66-4.72 5.11l3.66 3.41c1.8 1.67 3.71 3.43 4.72 5.5 4.03 1.91 5.5 3.7 5.5 5.5v-3.15c0-2.58 2.11-4.66 4.72-5.11l-3.66-3.41c-1.8-1.67-3.71-3.43-4.72-5.5-4.03-1.91-5.5-3.7-5.5-5.5z"/></svg> Spotify</span>
                  </div>
                </>
              ) : (
                <iframe
                  src="https://open.spotify.com/embed/playlist/0lPuabF1uMFlFJEOMo4PhR?utm_source=generator&autoplay=1"
                  width="100%"
                  height="352"
                  frameBorder="0"
                  allowFullScreen
                  allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                  className="rounded-2xl w-full h-full"
                  title="Bouncy Beats: Toddler Dance Party"
                />
              )}
          </div>

          {/* CTA */}
          <div className="text-center">
            <a
              ref={ctaRef}
              href="https://open.spotify.com/playlist/0lPuabF1uMFlFJEOMo4PhR?si=TnSCl-itQ-KcWMUDiglORA&pi=PUnwGYffQ0mZj"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-spotify inline-flex items-center gap-2"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z"/>
              </svg>
              Follow the Playlist
              <ExternalLink className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Playlist;
