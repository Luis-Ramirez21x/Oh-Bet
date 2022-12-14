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
import { useState, createContext, useEffect } from 'react';
import Footer from './components/footer/footer';
import { ThemeProvider } from './util/themeContext/themeProvider'



function App() {





  return (
    <>
    <ThemeProvider>
      <Navv/>
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
       <Footer/>
    </ThemeProvider>
    </>
  );
}

export default App;
