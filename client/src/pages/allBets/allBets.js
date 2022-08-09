import BetDiv from "../../components/bets/betDiv";
import { useState, useEffect } from "react";
import axios from "axios";





function AllBets(){
    const [allBets, setAllBets] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(()=>{

        axios.get('http://localhost:3001/api/bets')
            .then(bets => setAllBets(bets.data))
            .catch(err => console.log(err))
            .finally(setLoading(false));

    },[])

    if(loading){
        return(<h2>Loading...</h2>)
    }

    
    return(
        <>
            <div className="allBets">
                <h1>All bets</h1>
                {allBets.map(((bet, index)=> {

                    return <BetDiv key={bet._id} index={index} bet={bet}/>
                }))}
            </div>
            
        </>
       
    )

}
export default AllBets;