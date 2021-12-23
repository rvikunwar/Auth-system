import React, { useState } from 'react'
import './register.css'
import { toast } from 'react-toastify';
import { Link, useNavigate } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';
import { AuthAPI } from '../../api/api'


function Register() {

    const defaultData = {
        username: "",
        first_name:"",
        last_name:"",
        password:"",
        password2:"",
        email:""
    }
    const defaultErrorMessage = {
        username: "",
        password:"",
        password2:"",
        email:""
    };
    const [errorMessages, setErrorMessages] = useState({...defaultErrorMessage,}) // for handling error messages
    const [ formData, setFormData ] = useState(defaultData) // for storing details about user
    let navigate = useNavigate();// for redirecting pages

    /**
     * @description for submitting user details 
     * to backend for registering
     */
    const submitHandler = () => {

        AuthAPI.register(formData).then((res)=>{
            console.log(res)
            toast.success('Sign up successfull')
            navigate('/')
        }).catch((err)=>{
            var r = {
                ...defaultErrorMessage,
            };
    
            Object.keys(err.response.data).forEach((k) => {
                r[k] = err.response.data[k][0];
            });

            setErrorMessages({
                ...r,
            });
            console.log(err.response.data)
            toast.error(err.response.data.detail?err.response.data.detail:"Something went wrong, try again")
        })
        
    }

    console.log(errorMessages)
    return (
        <div className='signup'>
            <div className='signup-container'>
                <Form>
                    <Form.Group className="mb-3" controlId="formBasicUsername">
                        <Form.Label>User name</Form.Label>
                        <Form.Control 
                            type="text" 
                            placeholder="Enter username"
                            value={formData.username}
                            isInvalid={errorMessages.username}
                            onChange={(e)=>{
                                errorMessages.username=""
                                setFormData({
                                    ...formData,
                                    "username": e.target.value
                                })
                            }} />
                        {!errorMessages.username?
                            <Form.Text className="text-muted">
                                We'll never share your details with anyone else.
                            </Form.Text>:
                            <Form.Control.Feedback type="invalid">
                                {errorMessages.username}
                            </Form.Control.Feedback>
                        }
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control 
                            type="email" 
                            placeholder="Enter email"
                            value={formData.email}
                            isInvalid={errorMessages.email}
                            onChange={(e)=>{
                                errorMessages.email=""
                                setFormData({
                                    ...formData,
                                    "email": e.target.value
                                })
                            }}  />
                            <Form.Control.Feedback type="invalid">
                                {errorMessages.email}
                            </Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicfirstname">
                        <Form.Label>First name</Form.Label>
                        <Form.Control 
                            type="email"
                            placeholder="First name"
                            value={formData.first_name}
                            onChange={(e)=>{
                                setFormData({
                                    ...formData,
                                    "first_name": e.target.value
                                })
                            }}/>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasiclastname">
                        <Form.Label>Last name</Form.Label>
                        <Form.Control 
                            type="email" 
                            placeholder="Last name"
                            value={formData.last_name}
                            onChange={(e)=>{
                                setFormData({
                                    ...formData,
                                    "last_name": e.target.value
                                })
                            }}/>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control 
                            type="password" 
                            placeholder="Password"
                            value={formData.password}
                            isInvalid={errorMessages.password2}
                            onChange={(e)=>{
                                errorMessages.password=""
                                setFormData({
                                    ...formData,
                                    "password": e.target.value
                                })
                            }}  />
                         <Form.Control.Feedback type="invalid">
                            {errorMessages.password}
                        </Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicPassword2">
                        <Form.Label>Confirm password</Form.Label>
                        <Form.Control 
                            type="password" 
                            placeholder="Confirm password"
                            value={formData.password2}
                            isInvalid={errorMessages.password2}
                            onChange={(e)=>{
                                errorMessages.password2=""
                                setFormData({
                                    ...formData,
                                    "password2": e.target.value
                                })
                            }}  />
                        <Form.Control.Feedback type="invalid">
                            {errorMessages.password2}
                        </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group className="mb-3" >
                        Already have any account!! <Link to="/" style={{textDecoration:"none"}}>Login</Link>
                    </Form.Group>
                    <Button 
                        variant="primary"
                        onClick={submitHandler}>
                        Submit
                    </Button>
                </Form>
            </div>
        </div>
    )
}

export default Register
