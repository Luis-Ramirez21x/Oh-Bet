import './home.css';
import Quote from '../../components/homeFeatures/quote'
import MyRecord from '../../components/homeFeatures/MyRecord';
import ActiveBets from '../../components/homeFeatures/ActiveBets';
import BetRequests from '../../components/homeFeatures/betRequests/betRequests'
import { Container, Row} from "react-bootstrap";

function Home(){

    return(
        <>
            <Row>
                <Container>
                    <Quote/>
                    <MyRecord/>
                    
                </Container>
                <Container>
                    <BetRequests/>
                    <ActiveBets/>
                </Container>
            </Row>
        </>
    )


}

export default Home;