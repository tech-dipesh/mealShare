import React from "react"
import { useAuth } from "./useAuth"

export const useUser = () => {
  const { user } = useAuth()
  if (!user) return { user: null }
  const { email, user_metadata } = user
  return {
    user: {
      id: user.id,
      name: user_metadata?.full_name || email.split("@")[0],
      email,
      avatar_url: user.user_metadata?.avatar_url || "/default-avatar.png"
    }
  }
}
