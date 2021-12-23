import React, { useState } from 'react'
import { Form, Button } from 'react-bootstrap';
import { AuthAPI } from '../../api/api'
import './Login.css'
import { toast } from 'react-toastify';
import { Link, useNavigate } from 'react-router-dom';


function Login() {

    const defaultLoginData = {
        'username':"",
        'password':""
    }

    const [ formData, setFormData ] = useState(defaultLoginData) // for storing username and password
    let navigate = useNavigate();// for redirecting pages

    /**
     * @description for submitting password and username 
     * to backend for getting jwt token
     */
    const loginHandler = () => {
        if(formData.username === "" || formData.password === ""){
            toast.error("Plz, fill the form")
        } else {
            AuthAPI.login(formData).then((res)=>{
                localStorage.setItem('token', res.token)
                localStorage.setItem('username', formData.username)
                localStorage.setItem('refresh', res.refresh)
                toast.success('Login successfull')
                navigate('/protectedpage')
            }).catch((err)=>{
                console.log(err.response.data)
                toast.error(err.response.data?err.response.data.detail:"Something went wrong, try again")
            })
        }
    }

    return (
        <div className='login'>
            <div className='login-container'>
                <form>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control 
                            type="text" 
                            placeholder="Enter username"
                            value={formData.username}
                            onChange={e => {
                                setFormData({
                                    ...formData,
                                    'username': e.target.value
                                })
                            }} />
                        <Form.Text className="text-muted">
                            We'll never share your details with anyone else.
                        </Form.Text>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control 
                            type="password" 
                            placeholder="Password"
                            value={formData.password}
                            onChange={e => {
                                setFormData({
                                    ...formData,
                                    'password': e.target.value
                                })
                            }} />
                    </Form.Group>
                    <Form.Group className="mb-3" >
                        Don't have any account!! <Link to="/register" style={{textDecoration:"none"}}>Sign Up</Link>
                    </Form.Group>
                    <Button 
                        variant="primary"
                        onClick={loginHandler}>
                        Submit
                    </Button>
                </form>
            </div>
        </div>
    )
}

export default Login
