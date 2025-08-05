import React, { createContext, useContext, useEffect, useState, ReactNode } from "react"
import { getFoods } from "../services/foodservice"

interface Food {
  id: string
  title: string
  description: string
  image: string
  location: string
  expiry: string
  claimedBy: string | null
  created_at: string
  user_id: string
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
      const data = await getFoods()
      setFoodList(data)
    } catch (error) {
      console.error('Failed to fetch foods:', error)
    }
  }

  const addFood = async (food: Omit<Food, 'id' | 'created_at'>) => {
    // Implementation for adding food
    await fetchFoods() // Refresh after adding
  }

  const claimFood = async (foodId: string) => {
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