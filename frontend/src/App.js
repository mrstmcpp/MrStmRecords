import './output.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import LoginComponent from './components/user/Login';
import Homepage from './layouts/Homepage';
import About from './components/misc/About';
import ContactUs from './components/misc/Contact';
import RegisterComponent from './components/user/Register';
import PlayerComponent from './components/player/Player';
import { useCookies } from 'react-cookie';

function App() {
  const [cookie, setCookies] = useCookies(["token"]);


  return (
    <div className='w-1/3 h-1/3 bg-app-color font-poppins'>
      <BrowserRouter>

        {/* PUBLIC ROUTES */}

        <Routes>
          <Route path='/' element={<Homepage />} />
          <Route path='/about' element={<About />} />
          <Route path='/contact-us' element={<ContactUs />} />
        </Routes>


        {cookie.token ? (
          <Routes>

            <Route path='/player' element={<PlayerComponent />} />
          </Routes>
        ) : (
          <Routes>
            <Route path='/login' element={<LoginComponent />} />
            <Route path='/register' element={<RegisterComponent />} />
          </Routes>)}

      </BrowserRouter>
    </div>
  );
}

export default App;
