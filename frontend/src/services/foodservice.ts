// frontend/src/services/foodservice.ts
import supabase from './supabaseClient'

export interface FoodItem {
  id: string
  title: string
  description: string
  category_id: string
  poster_id: string
  address: string
  latitude: number
  longitude: number
  image_url?: string
  image_id?: string
  status: 'available' | 'claimed' | 'completed'
  expires_at: string
  created_at: string
}

export interface CreateFoodData {
  title: string
  description: string
  category_id: string
  address: string
  latitude: number
  longitude: number
  image?: File
}

export const foodService = {
  async getFoods(lat?: number, lng?: number) {
    try {
      let query = supabase
        .from('food_items')
        .select('*')
        .order('created_at', { ascending: false })

      // If location provided, you could add proximity filtering here
      // For now, just return all food items
      
      const { data, error } = await query

      if (error) {
        console.error('Supabase error:', error)
        throw error
      }

      return data || []
    } catch (error) {
      console.error('Failed to fetch foods:', error)
      throw error
    }
  },

  async createFood(data: CreateFoodData) {
    try {
      // Upload image to Supabase storage if provided
      let image_url = null
      
      if (data.image) {
        const fileExt = data.image.name.split('.').pop()
        const fileName = `${Date.now()}-${Math.random()}.${fileExt}`
        const filePath = `food-images/${fileName}`

        const { error: uploadError } = await supabase.storage
          .from('food-images')
          .upload(filePath, data.image)

        if (uploadError) {
          throw uploadError
        }

        // Get public URL
        const { data: { publicUrl } } = supabase.storage
          .from('food-images')
          .getPublicUrl(filePath)
        
        image_url = publicUrl
      }

      // Get current user
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) throw new Error('User not authenticated')

      // Create food item record
      const foodData = {
        title: data.title,
        description: data.description,
        category_id: data.category_id,
        poster_id: user.id,
        address: data.address,
        latitude: data.latitude,
        longitude: data.longitude,
        image_url,
        status: 'available' as const,
        expires_at: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(), // 24 hours from now
      }

      const { data: result, error } = await supabase
        .from('food_items')
        .insert([foodData])
        .select()
        .single()

      if (error) throw error

      return result
    } catch (error) {
      console.error('Failed to create food:', error)
      throw error
    }
  },

  async deleteFood(id: string) {
    try {
      const { error } = await supabase
        .from('food_items')
        .delete()
        .eq('id', id)

      if (error) throw error

      return { success: true }
    } catch (error) {
      console.error('Failed to delete food:', error)
      throw error
    }
  }
}