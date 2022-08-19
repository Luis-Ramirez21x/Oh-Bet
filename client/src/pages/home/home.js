import './home.css';
import Quote from '../../components/homeFeatures/quote'
import MyRecord from '../../components/homeFeatures/MyRecord';
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
                <Container>
                    <Quote/>
                    <MyRecord/>
                    
                </Container>
                <Container>
                    <h2>Bet Requests</h2>
                    <BetRequests userId={userId}/>
                    <h2>Sent Bets</h2>
                    <SentRequests userId={userId}/>
                    <h2>Active Bets</h2>
                    <ActiveBets userId={userId}/>
                </Container>
            </Row>
        </>
    )


}

export default Home;