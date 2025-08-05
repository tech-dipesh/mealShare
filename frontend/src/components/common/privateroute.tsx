import { Navigate, Outlet } from 'react-router-dom'
import { useAuth } from '../../context/authcontext'
import React from 'react'
const PrivateRoute = () => {
  const { user, loading } = useAuth()
  if (loading) return <div className="text-center mt-10">Loading...</div>
  return user ? <Outlet /> : <Navigate to="/auth" />
}

export default PrivateRoute