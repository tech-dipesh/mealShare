// frontend/src/context/authcontext.tsx
import React, { createContext, useContext, useEffect, useState } from 'react'
import supabase from '../services/supabaseClient'
import { User } from '@supabase/supabase-js'

interface AuthContextProps {
  user: User | null
  loading: boolean
  logout: () => Promise<void>
  login: (email: string, password: string) => Promise<void>
  register: (name: string, email: string, password: string) => Promise<void>
  updateProfile: (data: { name: string; photo: File | null }) => Promise<void>
}

export const AuthContext = createContext<AuthContextProps | undefined>(undefined)

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) throw new Error('useAuth must be used within AuthProvider')
  return context
}

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const getUser = async () => {
      try {
        const { data: { user } } = await supabase.auth.getUser()
        setUser(user)
      } catch (error) {
        console.error('Error getting user:', error)
      } finally {
        setLoading(false)
      }
    }
    getUser()

    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      console.log('Auth state changed:', event, session?.user)
      setUser(session?.user ?? null)
      setLoading(false)
    })

    return () => {
      subscription.unsubscribe()
    }
  }, [])

  const login = async (email: string, password: string) => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({ 
        email: email.trim(), 
        password 
      })
      
      if (error) {
        console.error('Login error:', error)
        throw error
      }
      
      setUser(data.user)
    } catch (error) {
      console.error('Login failed:', error)
      throw error
    }
  }

  const logout = async () => {
    try {
      await supabase.auth.signOut()
      setUser(null)
    } catch (error) {
      console.error('Logout error:', error)
    }
  }

  const register = async (name: string, email: string, password: string) => {
    try {
      // Validate input
      if (!name.trim() || !email.trim() || !password) {
        throw new Error('All fields are required')
      }

      if (password.length < 6) {
        throw new Error('Password must be at least 6 characters')
      }

      const { data, error } = await supabase.auth.signUp({
        email: email.trim(),
        password,
        options: {
          data: {
            full_name: name.trim(),
          },
          // Disable email confirmation for development (enable in production)
          emailRedirectTo: undefined
        },
      })

      if (error) {
        console.error('Registration error:', error)
        throw error
      }

      // For development - if email confirmation is disabled, user will be logged in immediately
      if (data.user && data.session) {
        setUser(data.user)
      }

      return data
    } catch (error) {
      console.error('Registration failed:', error)
      throw error
    }
  }

  const updateProfile = async ({ name, photo }: { name: string; photo: File | null }) => {
    try {
      if (!user) throw new Error('No user logged in')

      const updates: { data: { full_name: string; photo_url?: string } } = {
        data: { full_name: name },
      }

      if (photo) {
        const fileExt = photo.name.split('.').pop()
        const fileName = `${user.id}.${fileExt}`
        
        const { error: uploadError } = await supabase.storage
          .from('avatars')
          .upload(`public/${fileName}`, photo, { upsert: true })

        if (uploadError) throw uploadError

        const { data: { publicUrl } } = supabase.storage
          .from('avatars')
          .getPublicUrl(`public/${fileName}`)
        
        updates.data.photo_url = publicUrl
      }

      const { error } = await supabase.auth.updateUser(updates)
      if (error) throw error

      const { data: { user: updatedUser } } = await supabase.auth.getUser()
      setUser(updatedUser)
    } catch (error) {
      console.error('Profile update failed:', error)
      throw error
    }
  }

  return (
    <AuthContext.Provider value={{ user, loading, logout, login, register, updateProfile }}>
      {children}
    </AuthContext.Provider>
  )
}