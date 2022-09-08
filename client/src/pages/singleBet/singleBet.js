import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Container, Row } from "react-bootstrap";
import BetDetails from "../../components/bets/betDetails";
import './singleBet.css'


function SingleBet(){

    const { betId } = useParams();
    const [betData, setBetData] = useState({});
    const [loading, setLoading] = useState(true);

    useEffect(() =>{

        axios.post('http://localhost:3001/api/bets/singleBet',{
            "betId" : betId
        })
        .then( res => setBetData(res.data))
        .catch(error => console.log(error))
        .finally(() => setLoading(false))

    },[])
    
    if(loading){
        return(<h2>Loading...</h2>)
    }

    
    return(
        <>
            <div className="betDets-container">
                <BetDetails betData={betData}/>
            </div>
                    
                
        </>
        )
}

export default SingleBet;