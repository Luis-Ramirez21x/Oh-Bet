import {useEffect, useState} from 'react';
import { Form, Button, Alert } from 'react-bootstrap';
import axios from 'axios';
import './createBet.css'
import auth from '../../util/auth';


function CreateBet(){
    let profile = auth.getProfile();
    let userId = profile.data._id;
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
        axios.post('http://localhost:3001/api/users/getUsersExcludeCurrent',{'userId': userId})
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
            <div className='bet-page-content'>
                <h1>Set Bet Terms {" "}
                <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25"  className="bi bi-pen-fill" viewBox="0 0 16 16">
                <path d="m13.498.795.149-.149a1.207 1.207 0 1 1 1.707 1.708l-.149.148a1.5 1.5 0 0 1-.059 2.059L4.854 14.854a.5.5 0 0 1-.233.131l-4 1a.5.5 0 0 1-.606-.606l1-4a.5.5 0 0 1 .131-.232l9.642-9.642a.5.5 0 0 0-.642.056L6.854 4.854a.5.5 0 1 1-.708-.708L9.44.854A1.5 1.5 0 0 1 11.5.796a1.5 1.5 0 0 1 1.998-.001z"/>
                </svg></h1>
                <div className='bet-page-container'>
                    {/* This is needed for the validation functionality above */}
                    <Form noValidate validated={validated} onSubmit={handleFormSubmit}>
                    {/* show alert if server response is bad */}
                    <Alert dismissible onClose={() => setShowAlert(false)} show={showAlert} variant='danger'>
                        Something went wrong with your signup!
                    </Alert>
                    <Form.Label htmlFor='condition'>Name Bet Taker</Form.Label>
                    <Form.Select aria-label="Default select example" 
                    name='receiver'
                    onChange={handleInputChange}
                    value={userFormData.receiver}
                    required
                    >   <option>Choose a recipient...</option>
                        {/*<option key='anyone'>Make Bet Available To Anyone</option>*/}
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
                        placeholder='What are the bet terms?'
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
                        placeholder='What is at stake?'
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
                        variant='dark'>
                        Place Bet
                    </Button>
                    </Form>
                    <p>If you or somone you know has a gambling problem and wants help... call 1-800-GAMBLER</p>
                </div>
            </div>
        </>
    )



}

export default CreateBet;