import './output.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import LoginComponent from './components/user/Login';
import Homepage from './layouts/Homepage';
import About from './components/misc/About';
import ContactUs from './components/misc/Contact';
import RegisterComponent from './components/user/Register';
import { useCookies } from 'react-cookie';
import Admin from './components/admin/Admin';
import GenrePage from './components/pages/genrePage';
import PlaylistPage from './components/pages/playlistPage';
import UploadArea from './components/admin/UploadArea';
import ArtistPage from './components/pages/artistPage';
import playerContext from './contexts/playerContexts';
import ReleasesPage from './components/pages/releasePage';
import { useState } from 'react';
import { FloatingPlayer } from './components/player/floatingPlayer';
import TrackPage from './components/pages/trackPage';


function App() {
  const [currSong, setCurrSong] = useState(null);
  const [soundPlayed, setSoundPlayed] = useState(null);
  const [isPaused, setIsPaused] = useState(true);
  const [isPlayerVisible, setIsPlayerVisible] = useState(true);
  const [isSongPlaying, setIsSongPlaying] = useState(false);
  const [cookie, setCookies] = useCookies(["token"]);


  return (
    <div className=' bg-app-color font-poppins'>
      <BrowserRouter>

        {/* PUBLIC ROUTES */}



        {cookie.token ? (
          <playerContext.Provider value={{ currSong, setCurrSong, soundPlayed, setSoundPlayed, isPaused, setIsPaused, isPlayerVisible,setIsPlayerVisible, isSongPlaying, setIsSongPlaying }}>

            <Routes>
              <Route path='/' element={<Homepage />} />
              <Route path='/about' element={<About />} />
              <Route path='/contact-us' element={<ContactUs />} />
              <Route path='*' element={<Homepage />} />
              <Route path='/admin/*' element={<Admin />} />
              <Route path='/player' element={<FloatingPlayer />} />
              <Route path='/upload' element={<UploadArea />} />
              <Route path='/genre/:genreId' element={<GenrePage />} />
              <Route path='/track/:trackID' element={<TrackPage />} />
              <Route path='/artist/id/:artistId' element={<ArtistPage />} />
              <Route path='/playlist/:playlistId' element={<PlaylistPage />} />
              <Route path='/releases' element={<ReleasesPage />} />
            </Routes>

          </playerContext.Provider>
        ) : (
          <Routes>
            <Route path='/' element={<Homepage />} />
            <Route path='/artist/*' element={<ArtistPage />} />
            <Route path='/playlist/:playlistId' element={<PlaylistPage />} />
            <Route path='/genre/*' element={<GenrePage />} />
            <Route path='/about' element={<About />} />
            <Route path='/contact-us' element={<ContactUs />} />
            <Route path='*' element={<Homepage />} />
            <Route path='/login' element={<LoginComponent />} />
            <Route path='/register' element={<RegisterComponent />} />
          </Routes>)}

      </BrowserRouter>
    </div>
  );
}

export default App;
