import { BrowserRouter, Routes, Route} from 'react-router-dom';

import './App.css';
import Home from './pages/home/home'
import Navv from './components/navBar/NavBar';
import Login from './components/login-signup/Login';
import Register from './components/login-signup/Register';
import CreateBet from './pages/createBet/createBet';
import SingleBet from './pages/singleBet/singleBet';


function App() {
  return (
    <>
      <Navv/>
      <BrowserRouter>
        <Routes>
            <Route path = '/' element={<Home/>}/>
            <Route path ='/login'  element={<Login/>}/>
            <Route path ='/register' element={<Register/>} />          
            <Route path='/place-bet' element={<CreateBet/>} />
            <Route path='bet-details/:betId' element={<SingleBet/>} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
