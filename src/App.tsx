import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { Suspense, lazy } from 'react';

import Home from './pages/Home';
const Discography = lazy(() => import('./pages/Discography'));
const FAQ = lazy(() => import('./pages/FAQ'));
const Contact = lazy(() => import('./pages/Contact'));
const MeetTheBlooms = lazy(() => import('./pages/MeetTheBlooms'));
const DynamicTrackPage = lazy(() => import('./pages/DynamicTrackPage'));
const DynamicAlbumPage = lazy(() => import('./pages/DynamicAlbumPage'));
const Playlists = lazy(() => import('./pages/Playlists'));
const ThemeCollections = lazy(() => import('./pages/ThemeCollections'));
const Articles = lazy(() => import('./pages/Articles'));
const DynamicPlaylistPage = lazy(() => import('./pages/DynamicPlaylistPage'));
const DynamicThemeCollectionPage = lazy(() => import('./pages/DynamicThemeCollectionPage'));
const DynamicArticlePage = lazy(() => import('./pages/DynamicArticlePage'));
const PrivacyPolicy = lazy(() => import('./pages/PrivacyPolicy'));
const TermsOfService = lazy(() => import('./pages/TermsOfService'));
const SafetyPolicy = lazy(() => import('./pages/SafetyPolicy'));
const AdminApp = lazy(() => import('./admin/AdminApp'));
import { initGA, trackPageView } from './lib/analytics';
import { initPixel, trackPixelPageView } from './lib/pixel';
import ScrollToTop from './components/ScrollToTop';

function AnalyticsWrapper({ children }: { children: React.ReactNode }) {
  const location = useLocation();

  useEffect(() => {
    // Initialize analytics on app load
    initGA();
    initPixel();
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
            {/* Dynamic Track Routes - All tracks rendered from centralized data */}
            <Route path="/track/:slug" element={<DynamicTrackPage />} />
            {/* Dynamic Content Routes */}
            <Route path="/playlists" element={<Playlists />} />
            <Route path="/theme-collections" element={<ThemeCollections />} />
            <Route path="/articles" element={<Articles />} />
            <Route path="/album/:slug" element={<DynamicAlbumPage />} />
            <Route path="/playlist/:slug" element={<DynamicPlaylistPage />} />
            <Route path="/theme-collection/:slug" element={<DynamicThemeCollectionPage />} />
            <Route path="/article/:slug" element={<DynamicArticlePage />} />

            {/* Legal Pages */}
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            <Route path="/terms-of-service" element={<TermsOfService />} />
            <Route path="/safety-policy" element={<SafetyPolicy />} />
            {/* Admin Dashboard - protected by password */}
            <Route path="/admin/*" element={<AdminApp />} />
          </Routes>
        </Suspense>
      </AnalyticsWrapper>
    </BrowserRouter>
  );
}

export default App;
