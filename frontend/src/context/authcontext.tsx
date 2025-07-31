import { createContext, useEffect, useState } from "react"
import { supabase } from "../services/api"
import { useNavigate } from "react-router-dom"

export const AuthContext = createContext(null)

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const navigate = useNavigate()

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      if (data.user) setUser(data.user)
    })
    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user || null)
    })
    return () => listener.subscription.unsubscribe()
  }, [])

  const login = async (email, password) => {
    const { error, data } = await supabase.auth.signInWithPassword({ email, password })
    if (!error) navigate("/food")
    return error
  }

  const logout = async () => {
    await supabase.auth.signOut()
    navigate("/")
  }

  const register = async (email, password) => {
    const { error } = await supabase.auth.signUp({ email, password })
    if (!error) {
      const { data } = await supabase.auth.signInWithPassword({ email, password })
      if (data.user) navigate("/food")
    }
    return error
  }

  return (
    <AuthContext.Provider value={{ user, login, logout, register }}>
      {children}
    </AuthContext.Provider>
  )
}
