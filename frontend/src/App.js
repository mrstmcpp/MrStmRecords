import './output.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import LoginComponent from './components/user/Login';
import Homepage from './layouts/Homepage';
import About from './components/misc/About';
import ContactUs from './components/misc/Contact';
import RegisterComponent from './components/user/Register';
import PlayerComponent from './components/player/Player';
import { useCookies } from 'react-cookie';
import Admin from './components/admin/Admin';
import GenrePage from './components/pages/genrePage';
import PlaylistPage from './components/pages/playlistPage';
import UploadArea from './components/admin/UploadArea';
import ArtistPage from './components/pages/artistPage';
import FloatingPlayer from './components/player/floatingPlayer';
import ReleasesPage from './components/pages/releasePage';
function App() {
  const [cookie, setCookies] = useCookies(["token"]);


  return (
    <div className=' bg-app-color font-poppins'>
      <BrowserRouter>

        {/* PUBLIC ROUTES */}



        {cookie.token ? (
          <Routes>
            <Route path='/' element={<Homepage />} />
            <Route path='/about' element={<About />} />
            <Route path='/contact-us' element={<ContactUs />} />
            <Route path='*' element={<Homepage />} />
            <Route path='/admin/*' element={<Admin />} />
            <Route path='/player' element={<PlayerComponent />} />
            <Route path='/floatTest' element={<FloatingPlayer/> }/>
            <Route path='/upload' element={<UploadArea/>} />
            <Route path='/genre/:genreId' element={<GenrePage/>} />
            <Route path='/artist/:artistId' element={<ArtistPage/>} />
            <Route path='/playlist/:playlistId' element={<PlaylistPage/>} />
            <Route path='/releases' element={<ReleasesPage/>} />
          </Routes>
        ) : (
          <Routes>
            <Route path='/' element={<Homepage />} />
            <Route path='/artist/*' element={<ArtistPage/>} />
            <Route path='/playlist/:playlistId' element={<PlaylistPage/>} />
            <Route path='/genre/*' element={<GenrePage/>} />
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
