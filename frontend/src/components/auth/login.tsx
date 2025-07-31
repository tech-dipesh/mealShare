import { useState } from 'react'
import { supabase } from '../../types/config/supabaseClient'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    const { error } = await supabase.auth.signInWithPassword({ email, password })
    if (error) {
      toast.error('Login failed')
    } else {
      toast.success('Login successful')
      navigate('/food')
    }
  }

  return (
    <form onSubmit={handleLogin} className="flex flex-col gap-4 p-4 max-w-sm mx-auto">
      <h2 className="text-2xl font-semibold text-center">Login</h2>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="border px-4 py-2 rounded"
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="border px-4 py-2 rounded"
      />
      <button type="submit" className="bg-primary text-white py-2 rounded hover:opacity-90">Login</button>
    </form>
  )
}

export default Login
