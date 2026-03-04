import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const Navigation = () => {
  const navRef = useRef<HTMLElement>(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const isHome = location.pathname === '/';

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (navRef.current) {
      gsap.fromTo(navRef.current,
        { y: -20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.5, delay: 0.3, ease: 'power2.out' }
      );
    }
  }, []);

  const handleNavClick = () => {
    setIsMobileMenuOpen(false);
  };

  // Helper to determine if a link is active
  const isActive = (path: string) => {
    if (path.startsWith('/#')) {
      return isHome && location.hash === path.substring(1);
    }
    return location.pathname === path;
  };

  return (
    <nav
      ref={navRef}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled || !isHome
          ? 'bg-white/90 backdrop-blur-md shadow-lg'
          : 'bg-transparent'
        }`}
    >
      <div className="w-full px-4 sm:px-6 lg:px-8 xl:px-12">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <Link
            to="/"
            className={`font-['Fredoka_One'] text-xl lg:text-2xl transition-colors ${isScrolled || !isHome ? 'text-[#101010]' : 'text-[#101010]'
              }`}
            onClick={handleNavClick}
          >
            Aly Bouchnak
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6 lg:gap-8">
            <Link
              to="/discography"
              className={`text-sm font-semibold transition-colors hover:text-[#F26B3A] ${isActive('/discography') ? 'text-[#F26B3A]' : 'text-[#101010]'
                }`}
            >
              Discography
            </Link>
            <Link
              to="/meet-the-blooms"
              className={`text-sm font-semibold transition-colors hover:text-[#F26B3A] ${isActive('/meet-the-blooms') ? 'text-[#F26B3A]' : 'text-[#101010]'
                }`}
            >
              Meet The Blooms
            </Link>
            <Link
              to="/faq"
              className={`text-sm font-semibold transition-colors hover:text-[#F26B3A] ${isActive('/faq') ? 'text-[#F26B3A]' : 'text-[#101010]'
                }`}
            >
              FAQ
            </Link>
            <a
              href="/#music"
              onClick={handleNavClick}
              className="text-sm font-semibold text-[#101010] transition-colors hover:text-[#F26B3A]"
            >
              Music
            </a>
            <a
              href="/#about"
              onClick={handleNavClick}
              className="text-sm font-semibold text-[#101010] transition-colors hover:text-[#F26B3A]"
            >
              About
            </a>
            <a
              href="/#playlist"
              onClick={handleNavClick}
              className="text-sm font-semibold text-[#101010] transition-colors hover:text-[#F26B3A]"
            >
              Playlist
            </a>
            <a
              href="/#contact"
              onClick={handleNavClick}
              className="text-sm font-semibold text-[#101010] transition-colors hover:text-[#F26B3A]"
            >
              Contact
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? (
              <X className="w-6 h-6 text-[#101010]" />
            ) : (
              <Menu className="w-6 h-6 text-[#101010]" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden absolute top-full left-0 right-0 bg-white/95 backdrop-blur-md shadow-lg transition-all duration-300 ${isMobileMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
          }`}
      >
        <div className="px-4 py-4 space-y-2">
          <Link
            to="/discography"
            onClick={handleNavClick}
            className={`block py-3 px-4 font-semibold rounded-lg hover:bg-[#C8F0F7] transition-colors ${isActive('/discography') ? 'text-[#F26B3A] bg-[#C8F0F7]' : 'text-[#101010]'
              }`}
          >
            Discography
          </Link>
          <Link
            to="/meet-the-blooms"
            onClick={handleNavClick}
            className={`block py-3 px-4 font-semibold rounded-lg hover:bg-[#C8F0F7] transition-colors ${isActive('/meet-the-blooms') ? 'text-[#F26B3A] bg-[#C8F0F7]' : 'text-[#101010]'
              }`}
          >
            Meet The Blooms
          </Link>
          <Link
            to="/faq"
            onClick={handleNavClick}
            className={`block py-3 px-4 font-semibold rounded-lg hover:bg-[#C8F0F7] transition-colors ${isActive('/faq') ? 'text-[#F26B3A] bg-[#C8F0F7]' : 'text-[#101010]'
              }`}
          >
            FAQ
          </Link>
          <a
            href="/#music"
            onClick={handleNavClick}
            className="block py-3 px-4 font-semibold text-[#101010] rounded-lg hover:bg-[#C8F0F7] transition-colors"
          >
            Music
          </a>
          <a
            href="/#about"
            onClick={handleNavClick}
            className="block py-3 px-4 font-semibold text-[#101010] rounded-lg hover:bg-[#C8F0F7] transition-colors"
          >
            About
          </a>
          <a
            href="/#playlist"
            onClick={handleNavClick}
            className="block py-3 px-4 font-semibold text-[#101010] rounded-lg hover:bg-[#C8F0F7] transition-colors"
          >
            Playlist
          </a>
          <a
            href="/#contact"
            onClick={handleNavClick}
            className="block py-3 px-4 font-semibold text-[#101010] rounded-lg hover:bg-[#C8F0F7] transition-colors"
          >
            Contact
          </a>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
