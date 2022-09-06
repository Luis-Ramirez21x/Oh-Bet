import './home.css';
import Quote from '../../components/homeFeatures/quote'
import MyRecord from '../../components/homeFeatures/myRecord/MyRecord';
import ActiveBets from '../../components/homeFeatures/activeBets/ActiveBets';
import BetRequests from '../../components/homeFeatures/betRequests/betRequests'
import { Container, Row} from "react-bootstrap";
import Auth from '../../util/auth';
import SentRequests from '../../components/homeFeatures/sentRequests/sentRequests';


function Home(){
    let userId = Auth.getProfile().data._id;

   
    
    return(
        <>
            <Row>
                <Container className='home-container'>
                    <Quote/>
                    <MyRecord userId={userId}/>
                    
                    <div className='bet-feed-container'>
                        <h1>Bet Feed</h1>
                        <ActiveBets userId={userId}/>
                        <div className='footer-offset'>
                        
                        </div>
                    </div>
                   
                </Container>
                    
              
                
            </Row>
        </>
    )


}

export default Home;