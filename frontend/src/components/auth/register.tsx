import { useState } from 'react'
import { supabase } from '../../types/config/supabaseClient'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

const Register = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault()
    const { error } = await supabase.auth.signUp({ email, password })
    if (error) {
      toast.error('Signup failed')
    } else {
      toast.success('Account created')
      navigate('/food')
    }
  }

  return (
    <form onSubmit={handleSignup} className="flex flex-col gap-4 p-4 max-w-sm mx-auto">
      <h2 className="text-2xl font-semibold text-center">Register</h2>
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
      <button type="submit" className="bg-primary text-white py-2 rounded hover:opacity-90">Register</button>
    </form>
  )
}

export default Register
