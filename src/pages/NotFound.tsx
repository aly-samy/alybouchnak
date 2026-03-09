import React from 'react';
import { Link } from 'react-router-dom';
import { Home, LayoutGrid } from 'lucide-react';
import SEO from '../components/SEO';

const NotFound: React.FC = () => {
    return (
        <div className="relative min-h-screen w-full flex items-center justify-center overflow-hidden bg-[#C8F0F7] font-['Outfit']">
            <SEO
                title="Page Not Found | The Bloom's House"
                description="Oops! It looks like you're lost. Let's get you back to the fun."
            />

            {/* Background Image Container */}
            <div className="absolute inset-0 w-full h-full z-0">
                <img
                    src="/images/max-404.webp"
                    alt="Max Bloom looking at a map"
                    className="w-full h-full object-cover sm:object-center"
                    style={{ objectPosition: 'center 30%' }}
                />
                {/* Subtle gradient overlay to ensure text readability if needed */}
                <div className="absolute inset-0 bg-gradient-to-b from-[#C8F0F7]/40 via-transparent to-[#101010]/20 pointer-events-none" />
            </div>

            {/* Content Container */}
            <div className="relative z-10 w-full max-w-4xl mx-auto px-4 flex flex-col items-center justify-between min-h-screen py-12 md:py-20">

                {/* Header Text */}
                <div className="text-center bg-[#FFF8F0]/90 backdrop-blur-sm px-6 py-4 md:px-10 md:py-6 rounded-3xl shadow-xl border-4 border-[#FFAE34]/20 animate-bounce-soft mt-safe">
                    <h1 className="font-['Fredoka_One'] text-3xl md:text-5xl text-[#F26B3A] mb-2 leading-tight drop-shadow-sm">
                        Even the Bloom family<br className="hidden md:block" /> gets lost sometimes.
                    </h1>
                    <p className="text-lg md:text-2xl text-[#2D2D2D] font-medium">
                        Let's get you back to the music.
                    </p>
                </div>

                {/* Spacer to push buttons down */}
                <div className="flex-grow flex items-center justify-center pointer-events-none">
                    {/* Visual spacer to frame Max in the center */}
                    <div className="h-64 sm:h-96 w-full max-w-lg aspect-square"></div>
                </div>

                {/* Navigation Buttons Stack */}
                <div className="flex flex-col gap-4 w-full max-w-xs sm:max-w-md pb-safe">
                    {/* Top Button: Home */}
                    <Link
                        to="/"
                        className="group flex items-center justify-center gap-3 w-full bg-[#82D082] hover:bg-[#6BBF6B] text-white py-4 px-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 active:scale-95 border-b-4 border-[#6BBF6B] hover:border-[#52A352]"
                    >
                        <Home className="w-6 h-6 sm:w-8 sm:h-8 group-hover:rotate-12 transition-transform" />
                        <span className="font-['Fredoka_One'] text-xl sm:text-2xl tracking-wide">Back to the Fun</span>
                    </Link>

                    {/* Middle Button: Spotify */}
                    <a
                        href="https://open.spotify.com/artist/0hA7Q91V2WqX764KkXFfBB"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group flex items-center justify-center gap-3 w-full bg-[#1DB954] hover:bg-[#1AA34A] text-white py-4 px-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 active:scale-95 border-b-4 border-[#1AA34A] hover:border-[#16893E]"
                    >
                        {/* Spotify Icon SVG */}
                        <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 sm:w-8 sm:h-8 group-hover:scale-110 transition-transform">
                            <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.84.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.6.18-1.2.72-1.38 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z" />
                        </svg>
                        <span className="font-['Fredoka_One'] text-xl sm:text-2xl tracking-wide">Listen on Spotify</span>
                    </a>

                    {/* Bottom Button: Collections */}
                    <Link
                        to="/theme-collections"
                        className="group flex items-center justify-center gap-3 w-full bg-[#7CD5EB] hover:bg-[#5EC7E2] text-white py-4 px-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 active:scale-95 border-b-4 border-[#5EC7E2] hover:border-[#4BADC8]"
                    >
                        <LayoutGrid className="w-6 h-6 sm:w-8 sm:h-8 group-hover:-rotate-12 transition-transform drop-shadow-sm" />
                        <span className="font-['Fredoka_One'] text-xl sm:text-2xl tracking-wide">Pick a Collection</span>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default NotFound;
