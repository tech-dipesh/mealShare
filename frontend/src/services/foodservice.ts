import api from './api'

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
    const params = lat && lng ? { lat, lng } : {}
    const response = await api.get('/food', { params })
    return response.data
  },

  async getFood(id: string) {
    const response = await api.get(`/food/${id}`)
    return response.data
  },

  async createFood(data: CreateFoodData) {
    // Handle multipart form data for image upload
    const formData = new FormData()
    Object.entries(data).forEach(([key, value]) => {
      if (value instanceof File) {
        formData.append(key, value)
      } else {
        formData.append(key, String(value))
      }
    })

    const response = await api.post('/food', formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    })
    return response.data
  },

  async deleteFood(id: string) {
    const response = await api.delete(`/food/${id}`)
    return response.data
  }
}