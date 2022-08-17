import {useEffect, useState} from 'react';
import { Form, Button, Alert } from 'react-bootstrap';
import axios from 'axios';

import auth from '../../util/auth';


function CreateBet(){
    let profile = auth.getProfile();
    //state
    const [userFormData, setUserFormData] = useState(
        { sender:'',receiver:'',approved: false,winner:null,condition: '', reward: '',paidOut: false }
        );
    const [allUsers, setUsers] = useState([]);
    const [validated] = useState(false);
    const [loading, setLoading] = useState(true);
    const [showAlert, setShowAlert] = useState(false);

    //logic
    useEffect(() =>{
        axios.get('http://localhost:3001/api/users')
        .then(res => setUsers(res.data))
        .catch(error => console.log(error))
        .finally(() => setLoading(false))
    },[])

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setUserFormData({ ...userFormData, [name]: value });
      };

      const handleFormSubmit = async (event) => {
        event.preventDefault();
     
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
          event.preventDefault();
          event.stopPropagation();
        }

        let receiver ={}
        if(userFormData.receiver !== 'Make Bet Available To Anyone'){
             receiver = allUsers.find(element => element.username === userFormData.receiver)
        }else {
            receiver = {_id:null};
        }
        
        
        try {

            let {data} = await axios.post('http://localhost:3001/api/bets',{
                "sender": profile.data._id,
                "receiver": receiver._id,
                "approved": false,
                "winner": null,
                "condition" : userFormData.condition,
                "reward" : userFormData.reward,
                "paidOut" : false
            })
            
            if(data){
                window.location.assign(`/bet-details/${data._id}`);
            }
            

        } catch (err) {
          console.error(err);
          setShowAlert(true);
        }
     
        setUserFormData({
             receiver:'',
             condition: '',
             reward: '',
        });
      };
    

    if(loading){
        return(<h2>loading</h2>)
    }
    
    return(
        <>
            {/* This is needed for the validation functionality above */}
            <Form noValidate validated={validated} onSubmit={handleFormSubmit}>
            {/* show alert if server response is bad */}
            <Alert dismissible onClose={() => setShowAlert(false)} show={showAlert} variant='danger'>
                Something went wrong with your signup!
            </Alert>

            <Form.Select aria-label="Default select example" 
            name='receiver'
            onChange={handleInputChange}
            value={userFormData.receiver}
            required
            >   <option>Choose a recipient...</option>
                <option key='anyone'>Make Bet Available To Anyone</option>
                {allUsers.map((user) =>{
                    return(
                        <option key={user.username}>{user.username}</option>
                    )
                })}
            </Form.Select>

            <Form.Group>
                <Form.Label htmlFor='condition'>Terms</Form.Label>
                <Form.Control
                type='text'
                placeholder='What are the terms?'
                name='condition'
                onChange={handleInputChange}
                value={userFormData.condition}
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
                value={userFormData.reward}
                required
                />
                <Form.Control.Feedback type='invalid'>Payout is required!</Form.Control.Feedback>
            </Form.Group>


            <Button
                disabled={!(userFormData.receiver && userFormData.condition && userFormData.reward)}
                type='submit'
                variant='success'>
                Place Bet
            </Button>
            </Form>
        </>
    )



}

export default CreateBet;