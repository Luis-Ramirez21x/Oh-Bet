import { BrowserRouter, Routes, Route} from 'react-router-dom';

import './App.css';
import Home from './pages/home/home'
import Navv from './components/navBar/NavBar';
import Login from './components/login-signup/Login';
import Register from './components/login-signup/Register';
import CreateBet from './pages/createBet/createBet';
import SingleBet from './pages/singleBet/singleBet';
import AllBets from './pages/allBets/allBets';
import MyBets from './pages/myBets/myBets'
import LeaderBoard from './pages/leaderBoard/leaderBoard';
import StartUp from './pages/startUpPage/startup';
import { useState } from 'react';
import Footer from './components/footer/footer';


function App() {
  let [showNav, setNav] = useState(true);

  return (
    <>
      {showNav ? <Navv/>: null}
      
      <BrowserRouter>
        <Routes>
            <Route path = '/home' element={<Home/>}/>
            <Route path ='/login'  element={<Login/>}/>
            <Route path ='/register' element={<Register/>} />          
            <Route path='/place-bet' element={<CreateBet/>} />
            <Route path='/bet-details/:betId' element={<SingleBet/>} />
            <Route path='/' element={<StartUp/>} />
            <Route path ='/my-bets' element={<MyBets/>} />
            <Route path='/leader-boards' element={<LeaderBoard/>} />
            <Route path='/all-bets' element={<AllBets/>} />
        </Routes>
      </BrowserRouter>

      {showNav ? <Footer/>: null}
    </>
  );
}

export default App;
