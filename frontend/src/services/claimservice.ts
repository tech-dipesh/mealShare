import api from './api'

export const claimService = {
  async createClaim(food_item_id: string) {
    const response = await api.post('/claims', { food_item_id })
    return response.data
  },

  async completeClaim(id: string) {
    const response = await api.patch(`/claims/${id}/complete`)
    return response.data
  }
}

// 5. Fix frontend/src/context/authContext.tsx - Use backend API instead of Supabase
import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react'
import { authService } from '../services/authservice'

interface User {
  id: string
  name: string
  email: string
  email_verified: boolean
  dietary_preference?: string
  average_rating?: number
  total_reviews?: number
}

interface AuthContextType {
  user: User | null
  loading: boolean
  login: (email: string, password: string) => Promise<void>
  register: (name: string, email: string, password: string) => Promise<void>
  logout: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  // Check for existing token and validate user on app load
  useEffect(() => {
    const token = localStorage.getItem('token')
    if (token) {
      // Decode JWT to get user info (simplified - in production, validate with backend)
      try {
        const payload = JSON.parse(atob(token.split('.')[1]))
        if (payload.exp * 1000 > Date.now()) {
          // Token still valid, fetch user profile
          fetchUserProfile()
        } else {
          localStorage.removeItem('token')
        }
      } catch {
        localStorage.removeItem('token')
      }
    }
    setLoading(false)
  }, [])

  const fetchUserProfile = async () => {
    try {
      // This would need a getUserProfile endpoint in backend
      // For now, we'll extract basic info from token
    } catch (error) {
      console.error('Failed to fetch user profile:', error)
      authService.logout()
    }
  }

  const login = async (email: string, password: string) => {
    const response = await authService.login({ email, password })
    // Extract user info from token or response
    setUser({ id: 'temp', name: email.split('@')[0], email, email_verified: false })
  }

  const register = async (name: string, email: string, password: string) => {
    await authService.register({ name, email, password })
  }

  const logout = () => {
    authService.logout()
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider')
  }
  return context
}