import axios from "axios";
import { useEffect,useState } from "react";
import ActiveBetDiv from './activeBetDiv'
import './activeBets.css'
import GenActiveBetDiv from "./genActiveBetDiv";


function ActiveBets({userId}){
    const [activeBets, setBets] = useState({allBets: null, userBets: null})
    const [loading, setLoading] = useState(true);


    useEffect(()=>{
        const fetchData = async () =>{
            const activeBets = await axios.post('http://localhost:3001/api/bets/activeBetsExcludeUser',{"userId": userId });
            const userBets = await  axios.post('http://localhost:3001/api/bets/userActiveBets',{"userId": userId })
            
            setBets({allBets: activeBets.data, userBets:userBets.data});
            setLoading(false);
        }
       
        fetchData();  

    },[])



    if(loading){
        return(<h6>Loading...</h6>)
    }

    if(activeBets.length === 0){
        return(
        <><h2>My Live Bets</h2><h6>No Live Bets...</h6></>)
    }
    console.log(activeBets)
    return(
        <>
                <h2>My Live Bets</h2>
                {activeBets.userBets.map((bet) =>{
                    return <ActiveBetDiv key={bet._id} betData={bet} userId={userId}/>
                })}
                <h2>All Live Bets</h2>
                <div className="all-bets-container">
                    {activeBets.allBets.map((bet) =>{
                        return <GenActiveBetDiv key={bet._id} betData ={bet} />
                    })}
                </div>

        
        </>
    )


}

export default ActiveBets;