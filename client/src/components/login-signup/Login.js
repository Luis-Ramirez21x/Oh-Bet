import { useState } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';
import Auth from '../../util/auth';
import axios from 'axios';
import Logo from '../../images/logo_nowatermark.png'

function Login(){
    
    //state
    const [userFormData, setUserFormData] = useState({ username: '', password: '' });
    const [validated] = useState(false);
    const [showAlert, setShowAlert] = useState(false);

    //form state
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

        let {data} = await axios.post('http://localhost:3001/api/users/login',
        {
            "username": userFormData.username,
            "password": userFormData.password
        })
            
            Auth.login(data.token);
        } catch (err) {
          console.error(err);
          setShowAlert(true);
        }
   
        setUserFormData({
          username: '',
          password: '',
        });
      };



    return (
        <>  <div className='register-container'>
            <img className='logo' src={Logo}></img>

            <div className='form-w-header'>
            <h1>Login</h1>
            <Form className='form-sign-up' noValidate validated={validated} onSubmit={handleFormSubmit}>
                <Alert dismissible onClose={() => setShowAlert(false)} show={showAlert} variant='danger'>
                Something went wrong with your login credentials!
                </Alert>
                <Form.Group>
                <Form.Label htmlFor='username'>Username</Form.Label>
                <Form.Control
                    type='text'
                    placeholder='Custom username...'
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
                    placeholder='Unique password...'
                    name='password'
                    onChange={handleInputChange}
                    value={userFormData.password}
                    required
                />
                <Form.Control.Feedback type='invalid'>Password is required!</Form.Control.Feedback>
                </Form.Group>
                <h5 className='form-note'>Not a member? Register <a href='/register' className='form-link'>here!</a></h5>
                <Button
                className='login-submit'
                disabled={!(userFormData.username && userFormData.password)}
                type='submit'
                variant='dark'>
                Submit
                </Button>
            </Form>
            </div>
            <p className='foot-note'>@2022 MIT License V1.0.0</p>
            </div>
        </>
    )

}

export default Login;