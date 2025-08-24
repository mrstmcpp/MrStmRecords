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
import AllArtistPage from './components/pages/allArtistPage';
import { jwtDecode } from "jwt-decode";
import UserProfilePage from './components/pages/userProfilePage';
import ArtistRegistrationPage from './components/pages/registerForArtistAccount';
import GoogleAuthSuccess from './utils/GoogleAuthSuccess';
import ChatPage from './components/pages/message/chatPage';

function App() {
  const [currSong, setCurrSong] = useState(null);
  const [soundPlayed, setSoundPlayed] = useState(null);
  const [isPaused, setIsPaused] = useState(true);
  const [isPlayerVisible, setIsPlayerVisible] = useState(true);
  const [isSongPlaying, setIsSongPlaying] = useState(false);
  const [cookie, setCookies] = useCookies(["token"]);


  let userId = null;
  if (cookie.token) {
    try {
      const decoded = jwtDecode(cookie.token);
      userId = decoded.id;
    } catch (e) {
      console.error("Invalid JWT", e);
    }
  }

  return (
    <div className=''>
      <BrowserRouter>

        {/* PUBLIC ROUTES */}

        <playerContext.Provider value={{ currSong, setCurrSong, soundPlayed, setSoundPlayed, isPaused, setIsPaused, isPlayerVisible, setIsPlayerVisible, isSongPlaying, setIsSongPlaying }}>


          {cookie.token ? (

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
              <Route path='/artist/:artistId' element={<ArtistPage />} />
              <Route path='/artists' element={<AllArtistPage />} />
              <Route path='/playlist/:playlistId' element={<PlaylistPage />} />
              <Route path='/releases' element={<ReleasesPage />} />
              <Route path='/user/profile' element={<UserProfilePage userId={userId} />} />
              <Route path='/artist/create' element={<ArtistRegistrationPage />} />
              <Route path='/messages' element={<ChatPage />} />
            </Routes>

          ) : (
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
              <Route path='/artist/:artistId' element={<ArtistPage />} />
              <Route path='/artists' element={<AllArtistPage />} />
              <Route path='/playlist/:playlistId' element={<PlaylistPage />} />
              <Route path='/releases' element={<ReleasesPage />} />
              <Route path='/login' element={<LoginComponent />} />
              <Route path='/register' element={<RegisterComponent />} />
              <Route path="/google-auth-success" element={<GoogleAuthSuccess />} />

            </Routes>)}
        </playerContext.Provider>

      </BrowserRouter>
    </div>
  );
}

export default App;
