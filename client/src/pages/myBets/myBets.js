import { useEffect, useState } from "react";
import Auth from "../../util/auth";
import axios from "axios";
import MyBetDiv from "../../components/myBetFeatures/myBetDiv";
import './myBets.css'


function MyBets(){
    const userId = Auth.getProfile().data._id
    let [bets, setBets] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        
        axios.post('http://localhost:3001/api/bets/getBetHistory',{
            "userId" : userId
        })
        .then((betData) => setBets(betData.data))
        .catch(error => console.log(error))
        .finally(() => setLoading(false))

    }, [])

    if(loading){
        return(<h6>loading...</h6>)
    }

    console.log(bets);
    return (
        <>  
            <div className="bet-log-container">
                <h1>Bet Log</h1>
                {bets.map((bet) =>{
                    return <MyBetDiv key={bet._id} betData={bet} userId={userId}/>
                })}      
            </div>
            <div className='footer-offset'>
                        
            </div>
        </>
    )
}

export default MyBets;