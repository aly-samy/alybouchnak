import { HashRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Discography from './pages/Discography';
import FAQ from './pages/FAQ';
import SingleTrack from './pages/SingleTrack';
import SingleAlbum from './pages/SingleAlbum';
import TheFunnyBunnyJump from './pages/TheFunnyBunnyJump';
import BoomTekaBoom from './pages/BoomTekaBoom';
import TheWiseMice from './pages/TheWiseMice';
import NannyAndPapa from './pages/NannyAndPapa';
import TheYummySpoon from './pages/TheYummySpoon';

function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/discography" element={<Discography />} />
        <Route path="/faq" element={<FAQ />} />
        <Route path="/track/bock-bock-chicken" element={<SingleTrack />} />
        <Route path="/track/the-funny-bunny-jump" element={<TheFunnyBunnyJump />} />
        <Route path="/track/boom-teka-boom" element={<BoomTekaBoom />} />
        <Route path="/track/the-wise-mice" element={<TheWiseMice />} />
        <Route path="/track/nanny-papa" element={<NannyAndPapa />} />
        <Route path="/track/the-yummy-spoon" element={<TheYummySpoon />} />
        <Route path="/album/tuned-for-dreams" element={<SingleAlbum />} />
      </Routes>
    </HashRouter>
  );
}

export default App;
