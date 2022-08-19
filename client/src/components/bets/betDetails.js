import { useEffect } from "react";
import { Card, InputGroup,Button } from "react-bootstrap";
import Form from 'react-bootstrap/Form';
import { useState } from "react";
import axios from "axios";
import BetCardHeader from "./betCardheader";
import Auth from '../../util/auth';
import './bet.css'
import BetCRUD from "./betCRUD";
import DeclareWinner from "./declareWinner";




function BetDetails({betData}){
    let loggedIn = Auth.loggedIn();
    let userId = Auth.getProfile().data._id;
    let {sender, receiver, approved, condition, reward, winner, paidOut } = betData;
    
    
    let canEdit = (userId = sender._id) && approved == false;
    
    
    const [loading, setLoading] = useState(false);
    const [editMode, setEditMode] = useState(false);
    const [formData, setFormData] = useState({terms:condition, prize: reward})

    
    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value });
    };
    

    function getStatus(){
        if(approved === null){
            return "Bet Was Rejected";
        }
        else if(approved && !winner){
            return 'Status: Bet Is Live';
        }else if(!approved){
            return 'Status: Pending Apporval...';
        } else return `Winner: ${winner.username}`
    }

    function handleEditClick(event){
        event.stopPropagation();
        setEditMode(true);
    }

    function handleCancelEdit(event){
        event.stopPropagation();
        setEditMode(false);
    }

    async function editBet(event){
        event.preventDefault();

        try{

            let data = await axios.put('http://localhost:3001/api/bets',{
                ...betData, 
                condition:formData.terms,
                reward:formData.prize,
                
        })
            
            window.location.reload()
        }catch (err) {
          console.error(err);
          
        }
        
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
                <div>
                <h1>Bet Details</h1>
                {canEdit? (
                    <button type="button" className="btn btn-warning" onClick={handleEditClick}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-pencil-square" viewBox="0 0 16 16">
                        <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"></path>
                        <path fillRule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"></path>
                        </svg>
                    </button>
                    ) : null}
                {editMode? (
                    <button onClick={handleCancelEdit} className="btn btn-danger">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-x-square" viewBox="0 0 16 16">
                        <path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z"/>
                        <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>
                        </svg>
                    </button>
                ):null}
                    
                </div>
            
            <BetCardHeader betData={betData}/>
            <div className="details">
                {editMode? (
                    <>
                    <Form onSubmit={editBet}>
                    <div>
                        <h3>Terms</h3>
                        <Form.Group>
                        <Form.Control
                            type='text'
                            placeholder='New Terms...'
                            name='terms'
                            onChange={handleInputChange}
                            value={formData.terms}
                            required
                        />
                        </Form.Group>

                    </div>
                    <div>
                        <h3>Prize</h3>
                        <Form.Group>
                        <Form.Control
                            type='text'
                            placeholder='New Prize...'
                            name='prize'
                            onChange={handleInputChange}
                            value={formData.prize}
                            required
                        />
                        </Form.Group>
                    </div>
                    <div>
                        
                        <Button
                disabled={!(formData.terms && formData.prize)}
                type='submit'
                variant='warning'>
                Submit Revised Offer
                </Button>
                    </div>
                    </Form>
                    </>
                )
                    : (
                        <>
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
                        </>
                    )}
                
                
            </div>
  
            </div>

            {(!betData.approved && betData.sender._id !== userId  && betData.approved != null) ? (<BetCRUD betData={betData} />) : null}
            {((userId === sender._id || userId === receiver._id) && (!winner?._id || !winner)  && approved  )? (<DeclareWinner betData={betData}/>) : null}
        </>
    )
}

export default BetDetails;