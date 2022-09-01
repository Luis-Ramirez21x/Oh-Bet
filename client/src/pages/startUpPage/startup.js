import { Button } from 'react-bootstrap';
import Logo from '../../images/logo_nowatermark.png'
import './startUp.css'



function StartUp(){


    return(
        <>
        <div className="logoContainer">
            <img className='logo' src={Logo}></img>
            <div className='btns'>
                <div className='sign-up-btn'>
                    Sign up
                </div>
                <div className='login-btn'>
                    Login To Exsisting Account
                </div>
            </div>
            <p className='foot-note'>@2022 MIT License V1.0.0</p>
        </div>
        

        
        </>
    )

}

export default StartUp;