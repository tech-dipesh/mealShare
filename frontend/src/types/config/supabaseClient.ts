import { createClient } from '@supabase/supabase-js';
export type Json = string | number | boolean | null | { [key: string]: Json } | Json[]

export interface Database {
  public: {
    Tables: {
      foods: {
        Row: {
          id: string
          title: string
          description: string
          image: string
          location: string
          expiry: string
          claimed: boolean
          created_at: string
          user_id: string
        }
        Insert: {
          id?: string
          title: string
          description: string
          image: string
          location: string
          expiry: string
          claimed?: boolean
          created_at?: string
          user_id: string
        }
        Update: Partial<Database['public']['Tables']['foods']['Insert']>
        Relationships: []
      }
    }
  }
}


const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY

export const supabase = createClient<Database>(supabaseUrl, supabaseKey)

export default supabase;