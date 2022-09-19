import './home.css';
import Quote from '../../components/homeFeatures/quote'
import MyRecord from '../../components/homeFeatures/myRecord/MyRecord';
import ActiveBets from '../../components/homeFeatures/activeBets/ActiveBets';
import BetRequests from '../../components/homeFeatures/betRequests/betRequests'
import { Container, Row} from "react-bootstrap";
import Auth from '../../util/auth';
import SentRequests from '../../components/homeFeatures/sentRequests/sentRequests';
import { useContext } from 'react';
import { ThemeContext } from '../../util/themeContext/themeContext'


function Home(){
    let userId = Auth.getProfile().data._id;

    const {darkMode} = useContext(ThemeContext);
   
    
    return(
        <>
            <Row>
                <Container className='home-container' id={darkMode ? "dark" : ''} >
                    <Quote/>
                    <MyRecord userId={userId}/>
                    
                    <div className='bet-feed-container'>
                        <h1>Bet Feed</h1>
                        <ActiveBets userId={userId}/>
                    </div>   
                    
                    <div className='footer-offset' id={darkMode ? "dark" : ''}> </div>
                   
                </Container>
                    
              
                
            </Row>
        </>
    )


}

export default Home;