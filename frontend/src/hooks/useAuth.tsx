import { useContext } from "react"
import { AuthContext } from "../context/authcontext"
import {User} from "@supabase/supabase-js";
export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) throw new Error("useAuth must be used within AuthProvider")
  return context
}


export type customUser = User & {
  user_metadata: {
    full_name: string
    photo_url: string
  }
}