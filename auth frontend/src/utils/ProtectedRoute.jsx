import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'

function ProtectedRoute() {

  const auth = localStorage.getItem('token')

  return auth? <Outlet/>:<Navigate to="/"/>
}

export default ProtectedRoute
