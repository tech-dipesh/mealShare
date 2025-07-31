import { createContext, useEffect, useState } from "react"
import { getFoods } from "../services/foodservice"

export const FoodContext = createContext(null)

export const FoodProvider = ({ children }) => {
  const [foods, setFoods] = useState([])

  const fetchFoods = async () => {
    const data = await getFoods()
    setFoods(data)
  }

  useEffect(() => {
    fetchFoods()
  }, [])

  const refresh = () => fetchFoods()

  return (
    <FoodContext.Provider value={{ foods, refresh }}>
      {children}
    </FoodContext.Provider>
  )
}
