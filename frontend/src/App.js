import './output.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import LoginComponent from './components/user/Login';
import Homepage from './layouts/Homepage';
import About from './components/misc/About';
import ContactUs from './components/misc/Contact';
import RegisterComponent from './components/user/Register';
import PlayerComponent from './components/player/Player';
function App() {
  return (
    <div className='w-screen h-screen font-poppins'>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Homepage/>} />
          <Route path='/about' element={<About />} />
          <Route path='/contact-us' element={<ContactUs />} />
          <Route path='/login' element={<LoginComponent />} />
          <Route path='/register' element={<RegisterComponent />} />
          <Route path='/player' element={<PlayerComponent />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
