import { useState, useEffect } from "react";
import axios from "axios";
import Accordion from 'react-bootstrap/Accordion';
import './bet.css'

function BetDiv({bet, index}){
    

    return(
    <Accordion >
      <Accordion.Item eventKey={index}>
        <Accordion.Header>
            <div className="betDiv">
                <h5>{bet.reward}</h5>
                <p>{bet.sender.username}</p>
                <p>vs.</p>
                <p>{bet?.receiver?.username ? bet?.receiver?.username : 'TBA'}</p>
            </div>
        </Accordion.Header>
        <Accordion.Body>
            <div>
                <h6>Terms</h6>   
                <p>{bet.condition}</p>
            </div>
            <div>
                <h6>Winner:</h6>
                <p>{bet.winner? bet.winner: 'TBD'}</p>
            </div>
            <div>
                <h6>Paid?</h6>
                <p>{bet.paidOut? 'True' : 'False'}</p>
            </div>
            

        </Accordion.Body>
      </Accordion.Item>

    </Accordion>
    )

}



export default BetDiv;