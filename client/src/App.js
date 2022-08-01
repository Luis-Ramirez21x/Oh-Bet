import { BrowserRouter, Routes, Route} from 'react-router-dom';

import './App.css';
import Home from './pages/home/home'
import Navv from './components/navBar/NavBar';
import Login from './components/login-signup/Login';


function App() {
  return (
    <>
      <Navv/>
      <BrowserRouter>
        <Routes>
            <Route path = '/' element={<Home/>}/>
            <Route path ="/login"  element={<Login/>}/>
          
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
