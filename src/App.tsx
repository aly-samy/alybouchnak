import { HashRouter, Routes, Route, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import Home from './pages/Home';
import Discography from './pages/Discography';
import FAQ from './pages/FAQ';
import Contact from './pages/Contact';
import DynamicTrackPage from './pages/DynamicTrackPage';
import DynamicAlbumPage from './pages/DynamicAlbumPage';
import { initGA, trackPageView } from './lib/analytics';
import { initPixel, trackPixelPageView } from './lib/pixel';

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
    <HashRouter>
      <AnalyticsWrapper>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/discography" element={<Discography />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="/contact" element={<Contact />} />
          {/* Dynamic Track Routes - All tracks rendered from centralized data */}
          <Route path="/track/:slug" element={<DynamicTrackPage />} />
          {/* Dynamic Album Routes - All albums rendered from centralized data */}
          <Route path="/album/:slug" element={<DynamicAlbumPage />} />
        </Routes>
      </AnalyticsWrapper>
    </HashRouter>
  );
}

export default App;
