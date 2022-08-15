import axios from "axios";
import { useEffect,useState } from "react";
import ActiveBetDiv from './activeBetDiv'


function ActiveBets({userId}){
    const [activeBets, setBets] = useState([])
    const [loading, setLoading] = useState(true);


    useEffect(()=>{

        axios.post('http://localhost:3001/api/bets/userActiveBets',
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
        return(<h6>No Active Bets</h6>)
    }

    return(
        <>
                
                {activeBets.map((bet) =>{
                    return <ActiveBetDiv key={bet._id} betData={bet} userId={userId}/>
                })}
        
        </>
    )


}

export default ActiveBets;