import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { Suspense, lazy } from 'react';

import Home from './pages/Home';
const Discography = lazy(() => import('./pages/Discography'));
const FAQ = lazy(() => import('./pages/FAQ'));
const Contact = lazy(() => import('./pages/Contact'));
const About = lazy(() => import('./pages/About'));
const EPK = lazy(() => import('./pages/EPK'));
const MeetTheBlooms = lazy(() => import('./pages/MeetTheBlooms'));
const DynamicTrackPage = lazy(() => import('./pages/DynamicTrackPage'));
const DynamicAlbumPage = lazy(() => import('./pages/DynamicAlbumPage'));
const Playlists = lazy(() => import('./pages/Playlists'));
const ThemeCollections = lazy(() => import('./pages/ThemeCollections'));
const Articles = lazy(() => import('./pages/Articles'));
const Press = lazy(() => import('./pages/Press'));
const Resources = lazy(() => import('./pages/Resources'));
const DynamicPlaylistPage = lazy(() => import('./pages/DynamicPlaylistPage'));
const DynamicThemeCollectionPage = lazy(() => import('./pages/DynamicThemeCollectionPage'));
const DynamicArticlePage = lazy(() => import('./pages/DynamicArticlePage'));
const PrivacyPolicy = lazy(() => import('./pages/PrivacyPolicy'));
const TermsOfService = lazy(() => import('./pages/TermsOfService'));
const SafetyPolicy = lazy(() => import('./pages/SafetyPolicy'));
const ManageSubscription = lazy(() => import('./pages/ManageSubscription'));
const NotFound = lazy(() => import('./pages/NotFound'));
const AdminApp = lazy(() => import('./admin/AdminApp'));
import { initGA, trackPageView } from './lib/analytics';
import { initPixel, trackPixelPageView } from './lib/pixel';
import ScrollToTop from './components/ScrollToTop';

function AnalyticsWrapper({ children }: { children: React.ReactNode }) {
  const location = useLocation();

  useEffect(() => {
    // Initialize analytics on app load
    initGA();

    // Facebook Pixel Optimization: Load ONLY on first user interaction
    // This avoids blocking the main thread during initial page load/parse
    const loadPixel = () => {
      initPixel();
      // Remove listeners once loaded
      window.removeEventListener('scroll', loadPixel);
      window.removeEventListener('mousemove', loadPixel);
      window.removeEventListener('touchstart', loadPixel);
      window.removeEventListener('keydown', loadPixel);
    };

    window.addEventListener('scroll', loadPixel, { passive: true });
    window.addEventListener('mousemove', loadPixel, { passive: true });
    window.addEventListener('touchstart', loadPixel, { passive: true });
    window.addEventListener('keydown', loadPixel, { passive: true });

    return () => {
      window.removeEventListener('scroll', loadPixel);
      window.removeEventListener('mousemove', loadPixel);
      window.removeEventListener('touchstart', loadPixel);
      window.removeEventListener('keydown', loadPixel);
    };
  }, []);

  useEffect(() => {
    // Track page views on route changes (SPA hash routing support)
    const fullPath = location.pathname + location.hash;
    trackPageView(fullPath);
    trackPixelPageView();
  }, [location]);

  return <>{children}</>;
}

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <AnalyticsWrapper>
        <Suspense fallback={<div className="min-h-screen flex items-center justify-center bg-[#C8F0F7]"><div className="w-12 h-12 border-4 border-[#F26B3A] border-t-transparent rounded-full animate-spin"></div></div>}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/discography" element={<Discography />} />
            <Route path="/faq" element={<FAQ />} />
            <Route path="/meet-the-blooms" element={<MeetTheBlooms />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/about" element={<About />} />
            <Route path="/epk" element={<EPK />} />
            {/* Dynamic Track Routes - All tracks rendered from centralized data */}
            <Route path="/track/:slug" element={<DynamicTrackPage />} />
            {/* Dynamic Content Routes */}
            <Route path="/playlists" element={<Playlists />} />
            <Route path="/theme-collections" element={<ThemeCollections />} />
            <Route path="/articles" element={<Articles />} />
            <Route path="/press" element={<Press />} />
            <Route path="/resources" element={<Resources />} />
            <Route path="/album/:slug" element={<DynamicAlbumPage />} />
            <Route path="/playlist/:slug" element={<DynamicPlaylistPage />} />
            <Route path="/theme-collection/:slug" element={<DynamicThemeCollectionPage />} />
            <Route path="/article/:slug" element={<DynamicArticlePage />} />

            {/* Legal Pages */}
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            <Route path="/terms-of-service" element={<TermsOfService />} />
            <Route path="/safety-policy" element={<SafetyPolicy />} />
            <Route path="/manage-subscription" element={<ManageSubscription />} />
            {/* Admin Dashboard - protected by password */}
            <Route path="/admin/*" element={<AdminApp />} />

            {/* 404 Catch-All Route */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </AnalyticsWrapper>
    </BrowserRouter>
  );
}

export default App;
