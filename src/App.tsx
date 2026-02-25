import { HashRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Discography from './pages/Discography';
import FAQ from './pages/FAQ';
import SingleTrack from './pages/SingleTrack';
import SingleAlbum from './pages/SingleAlbum';

function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/discography" element={<Discography />} />
        <Route path="/faq" element={<FAQ />} />
        <Route path="/track/bock-bock-chicken" element={<SingleTrack />} />
        <Route path="/album/tuned-for-dreams" element={<SingleAlbum />} />
      </Routes>
    </HashRouter>
  );
}

export default App;
