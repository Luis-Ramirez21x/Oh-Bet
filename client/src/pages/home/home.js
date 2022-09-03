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
                    
                    <h1>Your Bet Feed</h1>
                    
                    <h2>Active Bets</h2>
                    <ActiveBets userId={userId}/>
                </Container>
                    
              
                
            </Row>
        </>
    )


}

export default Home;