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
import PaidOut from "./paidOut";





function BetDetails({betData}){
    let loggedIn = Auth.loggedIn();
    let userId = Auth.getProfile().data._id;
    let {sender, receiver, approved, condition, reward, winner, paidOut } = betData;
    
    
    let canEdit = (userId === sender._id) && approved == false;
    
    
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
 
            
            <div className="betCard">
                
                <h1>Bet Details</h1>
                {canEdit? (
                    <button type="button" className="btn btn-warning" onClick={handleEditClick}>
                        <p>Edit
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-pencil-square" viewBox="0 0 16 16">
                        <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"></path>
                        <path fillRule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"></path>
                        </svg>
                        </p>
                    </button>
                    ) : null}
                {editMode? (
                    <button onClick={handleCancelEdit} className="btn btn-danger">
                        <p>Cancel
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-x-square" viewBox="0 0 16 16">
                        <path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z"/>
                        <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>
                        </svg>
                        </p>
                    </button>
                ):null}
                    
                
            
            <BetCardHeader betData={betData}/>
            
                {editMode? (
                    <>
                    <Form onSubmit={editBet} className='edit-form-container'>
                    <div>
                        <h3 className="pinkify">Terms</h3>
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
                        <h3 className="pinkify">Prize</h3>
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
                <p>Submit revised offer</p>
                </Button>
                    </div>
                    </Form>
                    </>
                )
                    : (
                        <>
                        <div>
                            <h3 className="pinkify">Terms</h3>
                            <p>"{condition}"</p>

                        </div>
                        <div>
                            <h3 className="pinkify">Prize</h3>
                            <p>{reward}</p>
                        </div>
                        <div>
                            <h6 style={{textDecoration:'underline'}}>{getStatus()}</h6>
                        </div>
                        </>
                    )}
                
                
            

                {paidOut?
                (<svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" className="bi bi-cash-coin" viewBox="0 0 16 16">
                <path fillRule="evenodd" d="M11 15a4 4 0 1 0 0-8 4 4 0 0 0 0 8zm5-4a5 5 0 1 1-10 0 5 5 0 0 1 10 0z"/>
                <path d="M9.438 11.944c.047.596.518 1.06 1.363 1.116v.44h.375v-.443c.875-.061 1.386-.529 1.386-1.207 0-.618-.39-.936-1.09-1.1l-.296-.07v-1.2c.376.043.614.248.671.532h.658c-.047-.575-.54-1.024-1.329-1.073V8.5h-.375v.45c-.747.073-1.255.522-1.255 1.158 0 .562.378.92 1.007 1.066l.248.061v1.272c-.384-.058-.639-.27-.696-.563h-.668zm1.36-1.354c-.369-.085-.569-.26-.569-.522 0-.294.216-.514.572-.578v1.1h-.003zm.432.746c.449.104.655.272.655.569 0 .339-.257.571-.709.614v-1.195l.054.012z"/>
                <path d="M1 0a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h4.083c.058-.344.145-.678.258-1H3a2 2 0 0 0-2-2V3a2 2 0 0 0 2-2h10a2 2 0 0 0 2 2v3.528c.38.34.717.728 1 1.154V1a1 1 0 0 0-1-1H1z"/>
                <path d="M9.998 5.083 10 5a2 2 0 1 0-3.132 1.65 5.982 5.982 0 0 1 3.13-1.567z"/>
                </svg>) 
                : null}           
            </div>
                    
            <div className="crud-btns-container">
            {(!betData.approved && betData.sender._id !== userId  && betData.approved != null) ? (<BetCRUD betData={betData} />) : null}
            {((userId === sender._id || userId === receiver._id) && (!winner?._id || !winner)  && approved  )? (<DeclareWinner betData={betData}/>) : null}
            {betData?.winner?._id === userId && !paidOut? (<PaidOut betData={betData}/>): null}
            </div>
        </>
    )
}

export default BetDetails;