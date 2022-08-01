import { useState } from 'react';
import Auth from '../../util/auth';
import { Form, Button, Alert } from 'react-bootstrap';
import axios from 'axios';

function Register(){

const [userFormData, setUserFormData] = useState({ name:'',username: '', password: '' });
const [validated] = useState(false);
const [showAlert, setShowAlert] = useState(false);

const handleInputChange = (event) => {
  const { name, value } = event.target;
  setUserFormData({ ...userFormData, [name]: value });
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
    let {data} = await axios.post('http://localhost:3001/api/users',
        {   
            "name": userFormData.name,
            "username": userFormData.username,
            "password": userFormData.password
        })
 
        console.log(data);
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
    {/* This is needed for the validation functionality above */}
    <Form noValidate validated={validated} onSubmit={handleFormSubmit}>
      {/* show alert if server response is bad */}
      <Alert dismissible onClose={() => setShowAlert(false)} show={showAlert} variant='danger'>
        Something went wrong with your signup!
      </Alert>

      <Form.Group>
        <Form.Label htmlFor='email'>Name</Form.Label>
        <Form.Control
          type='name'
          placeholder='Your name here...'
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
          placeholder='Your username'
          name='username'
          onChange={handleInputChange}
          value={userFormData.username}
          required
        />
        <Form.Control.Feedback type='invalid'>Username is required!</Form.Control.Feedback>
      </Form.Group>

      <Form.Group>
        <Form.Label htmlFor='password'>Password</Form.Label>
        <Form.Control
          type='password'
          placeholder='Your password'
          name='password'
          onChange={handleInputChange}
          value={userFormData.password}
          required
        />
        <Form.Control.Feedback type='invalid'>Password is required!</Form.Control.Feedback>
      </Form.Group>
      <Button
        disabled={!(userFormData.username && userFormData.name && userFormData.password)}
        type='submit'
        variant='success'>
        Submit
      </Button>
    </Form>
  </>
);


}

export default Register;