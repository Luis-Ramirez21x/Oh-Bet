
import { Form, Button, Alert } from 'react-bootstrap';
import axios from "axios";
import { useState } from "react";




function BetCRUD({betData}){
    let [showEditForm, setEditState] = useState(false);
    let [formData, setFormData] =useState({condition:betData.condition, reward:betData.reward})
    const [showAlert, setShowAlert] = useState(false);
    const [validated] = useState(false);
    

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value });
      };


    async function acceptBet(event){
        event.preventDefault();
        
        try{

            let data = await axios.post('http://localhost:3001/api/bets/acceptBet',{
                "_id": betData._id,
	            "sender" : betData.sender._id,
	            "receiver": betData.receiver._id
        })

            window.location.reload();
        }catch(err){
            console.log(err);
        } 
    }

    async function showForm(event){
        event.preventDefault();
        setEditState(true);
       
    }

    const editBet = async (event) =>{
        event.preventDefault();
     
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
          event.preventDefault();
          event.stopPropagation();
        }

        try{

            let data = await axios.put('http://localhost:3001/api/bets',{
                ...betData, 
                condition:formData.condition,
                reward:formData.reward,
                sender: betData.receiver._id, 
                receiver: betData.sender._id 
        })
            
            window.location.reload();
        }catch(err){
            console.log(err);
        }

    }


    async function rejectBet(event){
        event.preventDefault();
        try{

            let data = await axios.put('http://localhost:3001/api/bets',{
                ...betData, 
                approved: null, 
                sender: betData.sender._id, 
                receiver: betData.receiver._id 
        })

            window.location.reload();
        }catch(err){
            console.log(err);
        } 
    }


    return(
        <>
        <div className='betCRUD'>
                <button type="button" className="btn btn-success" onClick={acceptBet}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-check-square" viewBox="0 0 16 16">
                    <path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z"></path>
                    <path d="M10.97 4.97a.75.75 0 0 1 1.071 1.05l-3.992 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425a.235.235 0 0 1 .02-.022z"></path>
                    </svg>
                    {" "}Accept
                </button>
                
                <button type="button" 
                className="btn btn-warning"
                onClick={showForm}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-pencil-square" viewBox="0 0 16 16">
                    <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"></path>
                    <path fillRule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"></path>
                    </svg>
                {" "}Counter Offer
              </button>

              <button type="button" className="btn btn-danger" onClick={rejectBet}>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-x-square" viewBox="0 0 16 16">
                <path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z"></path>
                <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"></path>
                </svg>
                {" "}Deny 
              </button>
            </div>
        {showEditForm? 
            (
                <Form noValidate validated={validated} onSubmit={editBet} className="counter-bet-form">
                <Alert dismissible onClose={() => setShowAlert(false)} show={showAlert} variant='danger'>
                Please fill out all fields
                </Alert>
                    <Form.Group>
                        <Form.Label htmlFor='condition'>Terms</Form.Label>
                        <Form.Control
                        type='text'
                        placeholder='What are the terms?'
                        name='condition'
                        onChange={handleInputChange}
                        value={formData.condition}
                        required
                        />
                        <Form.Control.Feedback type='invalid'>Terms are required!</Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group>
                        <Form.Label htmlFor='reward'>Payout</Form.Label>
                        <Form.Control
                        type='text'
                        placeholder='What does the winner gain?'
                        name='reward'
                        onChange={handleInputChange}
                        value={formData.reward}
                        required
                        />
                        <Form.Control.Feedback type='invalid'>Payout is required!</Form.Control.Feedback>
                    </Form.Group>
                    <Button
                        disabled={!(formData.reward && formData.condition )}
                        type='submit'
                        variant='warning'>
                        Send Counter Offer {" "}
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-send-check" viewBox="0 0 16 16">
                        <path d="M15.964.686a.5.5 0 0 0-.65-.65L.767 5.855a.75.75 0 0 0-.124 1.329l4.995 3.178 1.531 2.406a.5.5 0 0 0 .844-.536L6.637 10.07l7.494-7.494-1.895 4.738a.5.5 0 1 0 .928.372l2.8-7Zm-2.54 1.183L5.93 9.363 1.591 6.602l11.833-4.733Z"/>
                        <path d="M16 12.5a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Zm-1.993-1.679a.5.5 0 0 0-.686.172l-1.17 1.95-.547-.547a.5.5 0 0 0-.708.708l.774.773a.75.75 0 0 0 1.174-.144l1.335-2.226a.5.5 0 0 0-.172-.686Z"/>
                        </svg>
                    </Button>
                </Form>
            ) 
            : null}
        

        </>
    )
}

export default BetCRUD;