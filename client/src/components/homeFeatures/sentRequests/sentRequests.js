import axios from "axios";
import { useEffect,useState } from "react";
import SentReqDiv from "./sentReqDiv";

function SentRequests({userId}){
    let [sentReq, setReq] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(()=>{

        axios.post(process.env.REACT_APP_API_URL + 'bets/sentRequests',
        {
            "userId": userId
        })
            .then(res => setReq(res.data))
            .catch(error => console.log(error))
            .finally(() => setLoading(false))


    },[])

    if(loading){
        return(<h6>Loading...</h6>)
    }

    if(sentReq.length === 0){
        return(<h6>No Active Bets...</h6>)
    }
    
    return(
        <>
        {sentReq.map((bet) =>{
            return(<SentReqDiv key={bet._id} betData={bet}/>)
        })}
        </>
    )

}

export default SentRequests;