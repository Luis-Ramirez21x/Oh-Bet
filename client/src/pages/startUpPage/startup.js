import { Button } from 'react-bootstrap';
import Logo from '../../images/logo_nowatermark.png'
import { useNavigate } from "react-router-dom";
import './startUp.css'



function StartUp(){

    let navigate = useNavigate(); 

    function handleSignUp(){
        navigate('/register');
    }

    function handleLogin(){
        navigate('/login');
    }


    return(
        <>
        <div className="logoContainer">
            <img className='logo' src={Logo}></img>
            <div className='btns'>

                <button className="btn-sign-up" onClick={handleSignUp}> Sign Up</button>
                <button className="btn-login" onClick={handleLogin}>Login With Exsisting Account</button>
                
            </div>
            
        </div>
        

        
        </>
    )

}

export default StartUp;