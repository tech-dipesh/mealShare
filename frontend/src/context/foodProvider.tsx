import React, { createContext, useContext, useEffect, useState, ReactNode } from "react"
import { foodService } from "../services/foodservice"

interface Food {
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



interface FoodContextType {
  foodList: Food[]
  addFood: (food: Omit<Food, 'id' | 'created_at'>) => Promise<void>
  claimFood: (foodId: string) => Promise<void>
  refresh: () => Promise<void>
}

const FoodContext = createContext<FoodContextType | undefined>(undefined)

export const FoodProvider = ({ children }: { children: ReactNode }) => {
  const [foodList, setFoodList] = useState<Food[]>([])

  const fetchFoods = async () => {
    try {
      const data = await foodService.getFoods()
      setFoodList(data)
    } catch (error) {
      console.error('Failed to fetch foods:', error)
    }
  }

  // const addFood = async (_food: Omit<Food, 'id' | 'created_at'>) => {
  const addFood=async()=>{
    // Implementation for adding food
    await fetchFoods() // Refresh after adding
  }

  // const claimFood = async (_foodId: string) => {
  const claimFood=async()=>{
    // Implementation for claiming food
    await fetchFoods() // Refresh after claiming
  }

  useEffect(() => {
    fetchFoods()
  }, [])

  const value: FoodContextType = {
    foodList,
    addFood,
    claimFood,
    refresh: fetchFoods
  }

  return (
    <FoodContext.Provider value={value}>
      {children}
    </FoodContext.Provider>
  )
}

export const useFood = () => {
  const context = useContext(FoodContext)
  if (!context) {
    throw new Error('useFood must be used within FoodProvider')
  }
  return context
}