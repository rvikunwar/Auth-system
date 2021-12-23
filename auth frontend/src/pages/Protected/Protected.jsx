import React from 'react'
import { Button } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify';
import './Protected.css'


function Protected() {

    const navigate = useNavigate() 
    const username = localStorage.getItem('username')

    /**\
     * @description
     * for logging out of system
     */
    const Logout = () => {
        localStorage.clear()
        navigate('/')
        toast.success('You are logged out')
    }
    return (
        <div className='protected'>
            <h1>Hello {username}</h1>
            <p>This is a protected page</p>
            <Button onClick={Logout}>
                Log out
            </Button>
        </div>
    )
}

export default Protected
