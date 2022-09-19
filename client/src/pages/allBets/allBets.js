import BetAccordion from "../../components/bets/betAccordion";
import { useState, useEffect, useContext } from "react";
import axios from "axios";
import './allBets.css';
import { Spring } from 'react-spring';
import { ThemeContext } from "../../util/themeContext/themeContext";





function AllBets(){
    const [betsData, setData] = useState({tossUp:null, active:null, completed:null})
    const [loading, setLoading] = useState(true);
    const {darkMode} = useContext(ThemeContext);

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

        <div className="all-user-bets-container" id={darkMode ? "dark" : ''}>
            <div>
            <BetAccordion title={'Toss Up Bets'} bets={betsData.tossUp}/>
            <BetAccordion title={'Active Bets'} bets={betsData.active}/>
            <BetAccordion title={'Completed Bets'} bets={betsData.completed}/>

            </div>
            


        </div>
        </>
       
    )

}
export default AllBets;