import axios from "axios";
import { useContext, useEffect,useState } from "react";
import ActiveBetDiv from './activeBetDiv'
import './activeBets.css'
import GenActiveBetDiv from "./genActiveBetDiv";
import {ThemeContext} from '../../../util/themeContext/themeContext'

function ActiveBets({userId}){
    const [activeBets, setBets] = useState({allBets: null, userBets: null})
    const [loading, setLoading] = useState(true);
    const {darkMode} = useContext(ThemeContext);


    useEffect(()=>{
        const fetchData = async () =>{
            const activeBets = await axios.post(process.env.REACT_APP_API_URL + 'bets/activeBetsExcludeUser',{"userId": userId });
            const userBets = await  axios.post(process.env.REACT_APP_API_URL + 'bets/userActiveBets',{"userId": userId })
            
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
    
    return(
        <>
                <h2>My Live Bets</h2>
                {activeBets.userBets.map((bet) =>{
                    return <ActiveBetDiv key={bet._id} betData={bet} userId={userId}/>
                })}
                <h2>All Live Bets</h2>
                <div className="all-bets-container"  id={darkMode ? "dark" : ''}>
                    {activeBets.allBets.map((bet) =>{
                        return <GenActiveBetDiv key={bet._id} betData ={bet} />
                    })}

                    {activeBets.allBets.length === 0? (<p style={{padding:'5px'}}>No other active bets...</p>) : null}

                </div>

        
        </>
    )


}

export default ActiveBets;