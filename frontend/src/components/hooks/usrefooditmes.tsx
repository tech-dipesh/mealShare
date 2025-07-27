import { useState, useEffect, useCallback } from 'react'
import { foodService } from '../services/foodservice'
import { FoodItem, FoodFilters, CreateFoodRequest } from '../types/food'
import { STORAGE_KEYS } from '../utils/constant'
import toast from 'react-hot-toast'

export const useFoodItems = () => {
  const [foods, setFoods] = useState<FoodItem[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [pagination, setPagination] = useState({
    current: 1,
    pages: 1,
    total: 0
  })

  const getUserPosts = (): string[] => {
    const stored = localStorage.getItem(STORAGE_KEYS.USER_POSTS)
    return stored ? JSON.parse(stored) : []
  }

  const addUserPost = (postId: string) => {
    const userPosts = getUserPosts()
    const updated = [...userPosts, postId]
    localStorage.setItem(STORAGE_KEYS.USER_POSTS, JSON.stringify(updated))
  }

  const removeUserPost = (postId: string) => {
    const userPosts = getUserPosts()
    const updated = userPosts.filter(id => id !== postId)
    localStorage.setItem(STORAGE_KEYS.USER_POSTS, JSON.stringify(updated))
  }

  const fetchFoods = useCallback(async (filters: FoodFilters = {}) => {
    try {
      setLoading(true)
      setError(null)
      const response = await foodService.getAllFood(filters)
      setFoods(response.foods)
      setPagination(response.pagination)
    } catch (err) {
      setError('Failed to fetch food items')
      console.error('Error fetching foods:', err)
    } finally {
      setLoading(false)
    }
  }, [])

  const createFood = async (foodData: CreateFoodRequest): Promise<boolean> => {
    try {
      const newFood = await foodService.createFood(foodData)
      addUserPost(newFood._id)
      await fetchFoods()
      toast.success('Food item posted successfully!')
      return true
    } catch (err) {
      console.error('Error creating food:', err)
      return false
    }
  }

  const updateFoodStatus = async (foodId: string, status: 'available' | 'claimed'): Promise<boolean> => {
    try {
      await foodService.updateFoodStatus(foodId, status)
      await fetchFoods()
      toast.success(`Food marked as ${status}`)
      return true
    } catch (err) {
      console.error('Error updating food status:', err)
      return false
    }
  }

  const deleteFood = async (foodId: string): Promise<boolean> => {
    try {
      await foodService.deleteFood(foodId)
      removeUserPost(foodId)
      await fetchFoods()
      toast.success('Food item deleted successfully!')
      return true
    } catch (err) {
      console.error('Error deleting food:', err)
      return false
    }
  }

  const isUserPost = (foodId: string): boolean => {
    const userPosts = getUserPosts()
    return userPosts.includes(foodId)
  }

  useEffect(() => {
    fetchFoods()
  }, [fetchFoods])

  return {
    foods,
    loading,
    error,
    pagination,
    fetchFoods,
    createFood,
    updateFoodStatus,
    deleteFood,
    isUserPost,
    getUserPosts
  }
}