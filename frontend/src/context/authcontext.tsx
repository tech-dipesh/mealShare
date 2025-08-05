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
      const { data } = await supabase.auth.getUser()
      setUser(data.user)
      setLoading(false)
    }
    getUser()

    const { data: listener } = supabase.auth.onAuthStateChange((_, session) => {
      setUser(session?.user ?? null)
    })

    return () => {
      listener?.subscription.unsubscribe()
    }
  }, [])

  const login = async (email: string, password: string) => {
    const { data, error } = await supabase.auth.signInWithPassword({ email, password })
    if (error) throw error
    setUser(data.user)
  }

  const logout = async () => {
    await supabase.auth.signOut()
    setUser(null)
  }

  const register = async (name: string, email: string, password: string) => {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: name,
        },
      },
    })
    if (error) throw error
    setUser(data.user)
  }

const updateProfile = async ({ name, photo }: { name: string; photo: File | null }) => {
  const updates: { data: { full_name: string; photo_url?: string } } = {
    data: { full_name: name },
  }

  if (photo) {
    const fileExt = photo.name.split('.').pop()
    const fileName = `${user?.id}.${fileExt}`
    await supabase.storage.from('avatars').upload(`public/${fileName}`, photo, { upsert: true })

    const url = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/avatars/public/${fileName}`
    updates.data.photo_url = url
  }

  await supabase.auth.updateUser(updates)
  const { data } = await supabase.auth.getUser()
  setUser(data.user)
}

  return (
    <AuthContext.Provider value={{ user, loading, logout, login, register, updateProfile }}>
      {children}
    </AuthContext.Provider>
  )
}
