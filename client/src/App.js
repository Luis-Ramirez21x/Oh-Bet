import { BrowserRouter, Routes, Route} from 'react-router-dom';

import './App.css';
import Home from './pages/home/home'
import Navv from './components/navBar/NavBar';


function App() {
  return (
    <>
      <Navv/>
      <BrowserRouter>
        <Routes>
            <Route path = '/' element={<Home/>}/>
          
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
