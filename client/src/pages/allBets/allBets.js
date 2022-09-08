import BetAccordion from "../../components/bets/betAccordion";
import { useState, useEffect } from "react";
import axios from "axios";
import './allBets.css';
import { Spring } from 'react-spring';





function AllBets(){
    const [betsData, setData] = useState({tossUp:null, active:null, completed:null})
    const [loading, setLoading] = useState(true);

    useEffect(()=>{
        const fetchData = async () =>{
            const tossUpRes = await axios.get('http://localhost:3001/api/bets/tossUpBets')
            const activeRes = await axios.get('http://localhost:3001/api/bets/activeBets');
            const completedRes = await axios.get('http://localhost:3001/api/bets/completedBets')
            setData({tossUp: tossUpRes.data, active: activeRes.data, completed: completedRes.data});
            setLoading(false);
        }
        
        fetchData();    

    },[])

    if(loading){
        return(<h2>Loading...</h2>)
    }

        
    return(
        <>  
            <BetAccordion title={'Toss Up Bets'} bets={betsData.tossUp}/>
            <BetAccordion title={'Active Bets'} bets={betsData.active}/>
            <BetAccordion title={'Completed Bets'} bets={betsData.completed}/>



            
        </>
       
    )

}
export default AllBets;