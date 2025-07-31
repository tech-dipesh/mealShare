import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../../hooks/useAuth'

const Header = () => {
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = async () => {
    await logout()
    navigate('/')
  }

  return (
    <header className="bg-primary text-white px-6 py-4 flex justify-between items-center">
      <Link to="/" className="text-xl font-bold">MealShare</Link>
      <nav className="flex gap-4">
        {user ? (
          <>
            <Link to="/food">Foods</Link>
            <Link to="/profile">Profile</Link>
            <button onClick={handleLogout}>Logout</button>
          </>
        ) : (
          <>
            <Link to="/auth">Login</Link>
            <Link to="/auth">Register</Link>
          </>
        )}
      </nav>
    </header>
  )
}

export default Header
