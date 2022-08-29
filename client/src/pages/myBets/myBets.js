import { useEffect, useState } from "react";
import Auth from "../../util/auth";
import axios from "axios";
import MyBetDiv from "../../components/myBetFeatures/myBetDiv";


function MyBets(){
    const userId = Auth.getProfile().data._id
    let [bets, setBets] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        
        axios.post('http://localhost:3001/api/bets/getBetHistory',{
            "userId" : userId
        })
        .then((betData) => setBets(betData.data))
        .catch(error => console.log(error))
        .finally(() => setLoading(false))

    }, [])

    if(loading){
        return(<h6>loading...</h6>)
    }

    console.log(bets);
    return (
        <>
            {bets.map((bet) =>{
                return <MyBetDiv key={bet._id} betData={bet} userId={userId}/>
            })}
        </>
    )
}

export default MyBets;