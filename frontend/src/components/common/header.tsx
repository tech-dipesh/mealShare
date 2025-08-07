import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/authcontext'

const Header = () => {
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = async () => {
    await logout()
    navigate('/')
  }

  return (
    <header className="bg-primary text-white px-6 py-4 flex justify-between items-center shadow-md">
      <Link to="/" className="text-xl font-bold hover:text-gray-200 transition-colors">
        MealShare
      </Link>
      <nav className="flex gap-6 items-center">
        {user ? (
          <>
            <Link to="/food" className="hover:text-gray-200 transition-colors">
              Browse Food
            </Link>
            <Link to="/create-food" className="hover:text-gray-200 transition-colors">
              Share Food
            </Link>
            <Link to="/my-posts" className="hover:text-gray-200 transition-colors">
              My Posts
            </Link>
            <Link to="/profile" className="hover:text-gray-200 transition-colors">
              Profile
            </Link>
            <button 
              onClick={handleLogout}
              className="hover:text-gray-200 transition-colors bg-transparent border-none p-0 cursor-pointer font-inherit"
            >
              Logout
            </button>
          </>
        ) : (
          <Link to="/auth" className="bg-white text-primary px-4 py-2 rounded-lg hover:bg-gray-100 transition-colors">
            Login / Register
          </Link>
        )}
      </nav>
    </header>
  )
}

export default Header