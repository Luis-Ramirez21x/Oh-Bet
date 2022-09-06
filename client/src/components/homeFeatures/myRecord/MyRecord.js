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
                <p><i><strong>Wins:</strong></i> <b>{data.record.win}</b></p>
                <p><i><strong>Losses:</strong></i> <b>{data.record.loss}</b></p>
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

