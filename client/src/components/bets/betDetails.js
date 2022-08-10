import { useEffect } from "react";
import { Card } from "react-bootstrap";
import { useState } from "react";
import axios from "axios";
import BetCardHeader from "./betCardheader";
import Auth from '../../util/auth';
import './bet.css'




function BetDetails({betData}){
    let loggedIn = Auth.loggedIn();
    let {sender, receiver, approved, condition, reward, winner, paidOut } = betData;

    //let [usersData, setUsersData] = useState({sender:null, receiver:null});
    const [loading, setLoading] = useState(false);

    console.log(betData)
    useEffect(() =>{
        //logic for updating bets future 
        
    },[])

    function getStatus(){
        if(approved && !winner){
            return 'Status: Bet Is Live'
        }else if(!approved){
            return 'Status: Pending Apporval...'
        } else return `Winner: ${winner}`
    }


    if(loading){
        return(<h2>Loading...</h2>)
    }

    return(
        <>  
            <div className="betLinks">
            {loggedIn? (
                <>
                
                <a href='/my-bets'><h3>My bets</h3></a>
                <a href='/all-bets'><h3>All Bets</h3></a>
                </>)
            : <a href='/all-bets'><h3>All Bets</h3></a>}
            </div>
            
            <div className="betCard">
            <h1>Bet Details</h1>
            <BetCardHeader betData={betData}/>
            <div className="details">
                <div>
                    <h3>Terms</h3>
                    <p>{condition}</p>
                </div>
                <div>
                    <h3>Prize</h3>
                    <p>{reward}</p>
                </div>
                <div>
                    <h6>{getStatus()}</h6>
                </div>
            </div>
            </div>
        </>
    )
}

export default BetDetails;