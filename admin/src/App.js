import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import Login from './layouts/Login';
import Dashboard from './dashboard/Dashboard';
import './output.css';
import { useCookies } from 'react-cookie';



function App() {
  const [cookie, setCookies] = useCookies(["token"]);
  return (
    <div className="">
      
      <BrowserRouter>

        {cookie.token ? (
          <Routes>
            <Route path='*' element={<Dashboard />} />
            <Route path="/admin/*" element={<Dashboard />} />
          </Routes>
        ) : (
          <Routes>
            <Route path='*' element={<Login />} />
            <Route path="/login" element={<Login />} />
          </Routes>
        )}
        
      </BrowserRouter>
    </div>
  );
}

export default App;
