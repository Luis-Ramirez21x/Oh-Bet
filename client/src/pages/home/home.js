import './home.css';
import Quote from '../../components/homeFeatures/quote'
import MyRecord from '../../components/homeFeatures/myRecord/MyRecord';
import ActiveBets from '../../components/homeFeatures/activeBets/ActiveBets';
import BetRequests from '../../components/homeFeatures/betRequests/betRequests'
import { Container, Row} from "react-bootstrap";
import Auth from '../../util/auth';
import SentRequests from '../../components/homeFeatures/sentRequests/sentRequests';
import { useEffect, useState } from 'react';
import axios from 'axios';

function Home(){
    const [unpaidBetCnt, setUnpaidCnt] = useState();
    const [loading, setLoading] = useState(true);

    useEffect(()=>{
        axios.post('http://localhost:3001/api/bets/unpaidBetCount',{
            "userId" : userId
        })
        .then((betCnt) => setUnpaidCnt(betCnt.data))
        .catch(error => console.log(error))
        .finally(() => setLoading(false))
    },[])

    let userId = Auth.getProfile().data._id;

    if(loading) <h3>loading...</h3>
    
    return(
        <>
            <Row>
                <Container className='home-container'>
                    <Quote/>
                    <MyRecord unpaidCnt={unpaidBetCnt} userId={userId}/>
                    
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