import './output.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import LoginComponent from './components/user/Login';
import Homepage from './layouts/Homepage';
import About from './components/misc/About';
import Contact from './components/misc/Contact';
import RegisterComponent from './components/user/Register';
function App() {
  return (
    <div className='w-screen h-screen'>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Homepage/>} />
          <Route path='/about' element={<About />} />
          <Route path='/contact-us' element={<Contact />} />
          <Route path='/login' element={<LoginComponent />} />
          <Route path='/register' element={<RegisterComponent />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
