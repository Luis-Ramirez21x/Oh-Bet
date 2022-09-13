import './MyRecord.css'
import Auth from '../../../util/auth';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Badge } from 'react-bootstrap';
import DoughtNutChart from './doughnutChart';
import BetRequests from '../betRequests/betRequests';
import SentRequests from '../sentRequests/sentRequests';

function MyRecord({userId}){
    let loggedIn = Auth.loggedIn();
    let user = Auth.getProfile().data;
    let [data , setData]= useState({});
    const [loading, setLoading] = useState(true);
    
    
    useEffect(() =>{

        axios.post('http://localhost:3001/api/bets/getRecord',{
            "userId" : userId
        })
        .then( res => setData(res.data))
        .catch(error => console.log(error))
        .finally(() => setLoading(false))

    },[])

    if(loading){
        return(<p>Getting record...</p>)
    }

   
    return(
        <>
        
            <div className="myhub-container">
                <div className='stats-container'>
                <h1>My Hub</h1>
                <p><strong>Rank</strong> <b>#{data.rank}</b></p>
                <p>
                    <i><strong>Wins:</strong></i> {" "} <b>{data.record.win}</b> {" "} <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-caret-up-fill up" viewBox="0 0 16 16">
                    <path d="m7.247 4.86-4.796 5.481c-.566.647-.106 1.659.753 1.659h9.592a1 1 0 0 0 .753-1.659l-4.796-5.48a1 1 0 0 0-1.506 0z"/>
                    </svg>
                </p>
                <p>
                    <i><strong>Losses:</strong></i> <b>{data.record.loss} {" "} <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-caret-down-fill down" viewBox="0 0 16 16">
                    <path d="M7.247 11.14 2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z"/>
                    </svg></b>
                </p>
                <p><i><strong>Live Bets:</strong></i> <b>{data.record.live}</b></p>
                </div>
                
                <div>
                    <DoughtNutChart recordData={data.record}/>
                </div>
            
            </div>
            <div className='notif-primary'>
                <h2>Bets</h2>
                    
                    <BetRequests userId={userId}/>
                    
                    <SentRequests userId={userId}/>
            </div>

            <hr/>
        </>

    )

}
export default MyRecord;

