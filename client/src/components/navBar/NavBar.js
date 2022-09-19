import './NavBar.css'
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Offcanvas from 'react-bootstrap/Offcanvas';
import Auth from '../../util/auth';
import Logo from '../../images/logo_nowatermark.png'
import { useContext, useState } from 'react';

import BootstrapSwitchButton from 'bootstrap-switch-button-react'
import { ThemeContext } from '../../util/themeContext/themeContext';


function Navv(){
    const token = Auth.loggedIn()
    
   
    const {darkMode, toggleDarkMode} = useContext(ThemeContext);
  
    return (
        <>
        {[false].map((expand) => (
        <Navbar key={expand} variant='dark' expand={expand}>
          <Container fluid>
          <a href={token? '/home': '/login'}>
            <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" className="bi bi-house-door-fill" viewBox="0 0 16 16">
            <path d="M6.5 14.5v-3.505c0-.245.25-.495.5-.495h2c.25 0 .5.25.5.5v3.5a.5.5 0 0 0 .5.5h4a.5.5 0 0 0 .5-.5v-7a.5.5 0 0 0-.146-.354L13 5.793V2.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1.293L8.354 1.146a.5.5 0 0 0-.708 0l-6 6A.5.5 0 0 0 1.5 7.5v7a.5.5 0 0 0 .5.5h4a.5.5 0 0 0 .5-.5z"/>
            </svg>
            </a>


            <Navbar.Brand><img className='nav-logo' src={Logo}></img></Navbar.Brand>
            
            
            <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-${expand}`} />
            <Navbar.Offcanvas
              id={`offcanvasNavbar-expand-${expand}`}
              aria-labelledby={`offcanvasNavbarLabel-expand-${expand}`}
              placement="end"
            >
              <Offcanvas.Header closeButton>
                <Offcanvas.Title id={`offcanvasNavbarLabel-expand-${expand}`}>
                  Oh Bet
                </Offcanvas.Title>
              </Offcanvas.Header>
              <Offcanvas.Body>
                <Nav className="justify-content-end flex-grow-1 pe-3">
                  <Nav.Link href="#action1" className='coming-in-v2'>My Profile</Nav.Link>
                  <Nav.Link href="#action2" className=''>Dark Mode {' '}
                    <BootstrapSwitchButton checked={darkMode} onstyle="dark" offstyle="light" size="sm" onChange={toggleDarkMode}/>
                  </Nav.Link>
                  {token? (<Nav.Link href="#action3" onClick={Auth.logout} className='live'>Logout</Nav.Link>) : (<Nav.Link href='/login'>Login</Nav.Link>) }
                  <Nav.Link href="#action4" className='coming-in-v2'>About</Nav.Link>
                </Nav>

              </Offcanvas.Body>
            </Navbar.Offcanvas>
          </Container>
        </Navbar>
         ))}
        </>
    )

}

export default Navv;