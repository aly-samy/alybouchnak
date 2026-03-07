import { useEffect } from 'react';
import SEO from './SEO'; // Assuming SEO component exists

interface GameLoaderProps {
  gamePath: string;
  gameTitle: string;
}

export default function GameLoader({ gamePath, gameTitle }: GameLoaderProps) {
  // Prevent scrolling on the main page while playing the game
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);

  return (
    <>
      <SEO
        title={`${gameTitle} | Bloom's Playtime`}
        description={`Play ${gameTitle}, a fun and educational game for toddlers and preschoolers.`}
      />
      <div className="w-full h-screen fixed inset-0 z-50 bg-[#FDF6EC]">
        {/* Back button overlay */}
        <div className="absolute top-4 left-4 z-[60]">
          <button
            onClick={() => window.history.back()}
            className="bg-white/80 hover:bg-white text-[#F26B3A] p-3 rounded-full shadow-md font-bold text-xl flex items-center justify-center w-12 h-12 transition-all border-2 border-[#F26B3A]"
            aria-label="Go Back"
          >
            ←
          </button>
        </div>

        <iframe
          src={gamePath}
          className="w-full h-full border-0"
          title={gameTitle}
          loading="lazy"
          allow="autoplay" // Important for audio
        />
      </div>
    </>
  );
}
