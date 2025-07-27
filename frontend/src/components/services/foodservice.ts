import api from './api'
import { FoodItem, CreateFoodRequest, FoodFilters, FoodResponse, FoodStats } from '../types/food'

export const foodService = {
  getAllFood: async (filters: FoodFilters = {}): Promise<FoodResponse> => {
    const params = new URLSearchParams()
    
    if (filters.search) params.append('search', filters.search)
    if (filters.status) params.append('status', filters.status)
    if (filters.sortBy) params.append('sortBy', filters.sortBy)
    if (filters.page) params.append('page', filters.page.toString())
    if (filters.limit) params.append('limit', filters.limit.toString())
    
    const response = await api.get(`/food?${params.toString()}`)
    return response.data.data
  },

  getFoodById: async (id: string): Promise<FoodItem> => {
    const response = await api.get(`/food/${id}`)
    return response.data.data
  },

  createFood: async (foodData: CreateFoodRequest): Promise<FoodItem> => {
    const response = await api.post('/food', foodData)
    return response.data.data
  },

  updateFoodStatus: async (id: string, status: 'available' | 'claimed'): Promise<FoodItem> => {
    const response = await api.patch(`/food/${id}/status`, { status })
    return response.data.data
  },

  deleteFood: async (id: string): Promise<void> => {
    await api.delete(`/food/${id}`)
  },

  getFoodStats: async (): Promise<FoodStats> => {
    const response = await api.get('/food/stats')
    return response.data.data
  }
}