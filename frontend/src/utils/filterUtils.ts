import { FoodStatus, FoodItem } from "../types/food"

export const filterFoods = (
  foods: FoodItem[],
  status: FoodStatus
): FoodItem[] => {
  if (status === "All") return foods
  return foods.filter(food => food.status === status)
}
