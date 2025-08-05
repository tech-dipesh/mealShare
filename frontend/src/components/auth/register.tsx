import React, { useState } from "react"
import { useAuth } from "../../context/authcontext"
import { useNavigate } from "react-router-dom"
import { toast } from "react-hot-toast"

const Register = () => {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const { register } = useAuth()
  const navigate = useNavigate()

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      await register(name, email, password)
      toast.success("Registration successful! Check your email for verification.")
      navigate("/auth") // Stay on auth page to show login
    } catch (error) {
      const err=error as {response?: {data?: {message?: string}}}
      toast.error(err.response?.data?.message || "Registration failed")
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleRegister} className="flex flex-col gap-4">
      <h2 className="text-2xl font-semibold text-center">Register</h2>
      <input
        type="text"
        placeholder="Full Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="border px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        required
      />
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="border px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        required
      />
      <input
        type="password"
        placeholder="Password (min 6 characters)"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="border px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        minLength={6}
        required
      />
      <button
        type="submit"
        disabled={loading}
        className="bg-green-500 text-white py-2 rounded hover:bg-green-600 disabled:opacity-50"
      >
        {loading ? "Creating account..." : "Register"}
      </button>
    </form>
  )
}

export default Register
