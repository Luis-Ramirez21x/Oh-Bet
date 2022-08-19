import { useEffect, useState } from "react";
import axios from "axios";
import Auth from "../../../util/auth";
import BetReqDiv from "./betReqDiv";
import './betRequests.css'


function BetRequests({userId}){
    const [bets, setBets] = useState({activeBets:[], rejectedBets:[]})
    const [loading, setLoading] = useState(true);
    
    

    useEffect(()=>{

        const getBetData = async () =>{
            const activeBets = await axios.post('http://localhost:3001/api/bets/pendingBets',
            {
                "userId": userId
            })

            const rejectedBets = await axios.post('http://localhost:3001/api/bets/rejectedBets',
            {
                "userId": userId
            })
            
            setBets({activeBets:activeBets.data, rejectedBets:rejectedBets.data});
           
        }

        getBetData();
        setLoading(false);

    },[])

    if(loading){
        return(<h6>Loading...</h6>)

    }

    if(bets.activeBets.length === 0 && bets.rejectedBets.length === 0){
        return(<h6>No Requests...</h6>)
    }
     
    return(
        <>
            {bets.activeBets.map((bet) =>{
                return (
                    <BetReqDiv key={bet._id} betData={bet}/>
                )
            })}
            
            {bets.rejectedBets.map((bet) =>{
                return (
                    <BetReqDiv key={bet._id} betData={bet}/>
                )
            })}

        </>
    )

}

export default BetRequests;