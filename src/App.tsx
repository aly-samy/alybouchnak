import { HashRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Discography from './pages/Discography';
import FAQ from './pages/FAQ';
import Contact from './pages/Contact';
import SingleTrack from './pages/SingleTrack';
import SingleAlbum from './pages/SingleAlbum';
import TheBloomsHouseVolume1 from './pages/TheBloomsHouseVolume1';
import TheBloomsHouseClassicsParty from './pages/TheBloomsHouseClassicsParty';

function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/discography" element={<Discography />} />
        <Route path="/faq" element={<FAQ />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/track/bock-bock-chicken" element={<SingleTrack />} />
        <Route path="/track/the-funny-bunny-jump" element={<TheFunnyBunnyJump />} />
        <Route path="/track/boom-teka-boom" element={<BoomTekaBoom />} />
        <Route path="/track/the-wise-mice" element={<TheWiseMice />} />
        <Route path="/track/nanny-papa" element={<NannyAndPapa />} />
        <Route path="/track/the-yummy-spoon" element={<TheYummySpoon />} />
        <Route path="/album/tuned-for-dreams" element={<SingleAlbum />} />
        <Route path="/album/the-blooms-house-volume-1" element={<TheBloomsHouseVolume1 />} />
        <Route path="/album/the-blooms-house-classics-party" element={<TheBloomsHouseClassicsParty />} />
        <Route path="/album/tuned-for-dreams" element={<SingleAlbum />} />
      </Routes>
    </HashRouter>
  );
}

export default App;
