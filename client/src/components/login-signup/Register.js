import { useState } from 'react';
import Auth from '../../util/auth';
import { Form, Button, Alert } from 'react-bootstrap';
import axios from 'axios';
import './register.css'
import Logo from '../../images/logo_nowatermark.png'

function Register(){

const [userFormData, setUserFormData] = useState({ name:'',username: '', password: '' });
const [validated] = useState(false);
const [showAlert, setShowAlert] = useState(false);
const [alertMsg, setAlertMsg] = useState('Username already exist!');

const handleInputChange = (event) => {
  const { name, value } = event.target;
  if(name !== 'name'){
    setUserFormData({ ...userFormData, [name]: value.replace(/\s/g, '') });
  }else{
    setUserFormData({ ...userFormData, [name]: value });
  }
  
};

 const handleFormSubmit = async (event) => {
   event.preventDefault();

   // check if form has everything (as per react-bootstrap docs)
   const form = event.currentTarget;
   if (form.checkValidity() === false) {
     event.preventDefault();
     event.stopPropagation();
   }

   try {
    let {data} = await axios.post(process.env.REACT_APP_API_URL + 'users',
        {   
            "name": userFormData.name,
            "username": userFormData.username,
            "password": userFormData.password
        })
 
        
        Auth.login(data.token);
   } catch (err) {
     console.error(err);
     
     setShowAlert(true);
   }

   setUserFormData({
        name:'',
        username: '',
        password: '',
   });
 };




return (
  <>
    <div className='register-container'>
    <img className='logo' src={Logo}></img>

    <div className='form-w-header'>
      <h1>Sign Up</h1>
      {/* This is needed for the validation functionality above */}
      <Form noValidate validated={validated} onSubmit={handleFormSubmit} className='form-sign-up'>
        {/* show alert if server response is bad */}
        <Alert dismissible onClose={() => setShowAlert(false)} show={showAlert} variant='danger'>
          {alertMsg}
        </Alert>

        <Form.Group>
          <Form.Label htmlFor='email'>Name</Form.Label>
          <Form.Control
            type='name'
            placeholder='Your full name here...'
            name='name'
            onChange={handleInputChange}
            value={userFormData.name}
            required
          />
          <Form.Control.Feedback type='invalid'>Name is required!</Form.Control.Feedback>
          
        </Form.Group>

        <Form.Group>
          <Form.Label htmlFor='username'>Username</Form.Label>

          <Form.Control
            type='text'
            placeholder='Your username...'
            name='username'
            onChange={handleInputChange}
            value={userFormData.username}
            required
          />
          <Form.Control.Feedback type='invalid'>Username is required!</Form.Control.Feedback>
        </Form.Group>

        <Form.Group>
          <Form.Label htmlFor='password'>Password...</Form.Label>
          <Form.Control
            type='password'
            placeholder='Your password'
            name='password'
            onChange={handleInputChange}
            value={userFormData.password}
            required
          />
          <Form.Control.Feedback type='invalid'>Password is required!</Form.Control.Feedback>
          <Form.Text>between 4-16 characters, no spaces allowed..</Form.Text>
        </Form.Group>
        <Button
          disabled={!(userFormData.username && userFormData.name && userFormData.password)}
          type='submit'
          variant='dark'>
          Submit
        </Button>
      </Form>
    </div>
    
    <p className='foot-note'>@2022 MIT License V1.0.0</p>
    </div>
  </>
);


}

export default Register;