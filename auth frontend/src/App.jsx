import React from 'react'
import './App.css'
import {
    BrowserRouter as Router,
    Outlet,
    Route,
    Routes
  } from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import Login from './pages/Login/Login'
import Register from './pages/Register/Register';
import ProtectedRoute from './utils/ProtectedRoute';
import Protected from './pages/Protected/Protected';
import E404 from './pages/404/E404';

const AuthRoute = () => {
    const auth = localStorage.getItem('token')
    return !auth?<Outlet/>:<E404/>
}

function App() {

    return (
        <div className="App">
            <Router>
                <Routes>
                    <Route element={<AuthRoute/>}>
                        <Route path="/" element={<Login/>}/>
                        <Route path="/register" element={<Register/>}/>
                    </Route>

                    <Route element={<ProtectedRoute/>}>
                        <Route path="/protectedpage" element={<Protected/>}/>
                    </Route>

                    <Route path="*" element={<E404/>}/>
                </Routes>
            </Router>
            <ToastContainer/>
        </div>
    )
}

export default App
