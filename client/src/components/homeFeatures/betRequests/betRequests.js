import { useEffect, useState } from "react";
import axios from "axios";
import Auth from "../../../util/auth";
import BetReqDiv from "./betReqDiv";
import './betRequests.css'


function BetRequests({userId}){
    const [activeBets, setBets] = useState([])
    const [loading, setLoading] = useState(true);
    
    

    useEffect(()=>{

        axios.post('http://localhost:3001/api/bets/pendingBets',
        {
            "userId": userId
        })
            .then(res => setBets(res.data))
            .catch(error => console.log(error))
            .finally(() => setLoading(false))


    },[])

    if(loading){
        return(<h6>Loading...</h6>)

    }

    if(activeBets.length === 0){
        return(<h6>No Requests...</h6>)
    }
     
    return(
        <>
            
            {activeBets.map((bet) =>{
                return (
                    <BetReqDiv key={bet._id} betData={bet}/>
                )
            })}

        </>
    )

}

export default BetRequests;