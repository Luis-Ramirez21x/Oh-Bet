import { BrowserRouter, Routes, Route} from 'react-router-dom';

import './App.css';
import Home from './pages/home/home'
import Navv from './components/navBar/NavBar';
import Login from './components/login-signup/Login';
import Register from './components/login-signup/Register';


function App() {
  return (
    <>
      <Navv/>
      <BrowserRouter>
        <Routes>
            <Route path = '/' element={<Home/>}/>
            <Route path ="/login"  element={<Login/>}/>
            <Route path ='/register' element={<Register/>} />          
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
