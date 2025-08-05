import { useUser } from "../../hooks/useUser"
import React  from "react"
import { useFood } from "../../context/foodProvider"
import {FoodItem} from "../../services/foodservice"
import FoodCard from "../food/foodcard"

export default function UserPosts() {
  const { user } = useUser()
  const { foodList } = useFood()

  const myPosts = foodList.filter(f => f.user_id === user?.id)

  return (
    <div className="p-4 grid md:grid-cols-2 lg:grid-cols-3 gap-4">
      {myPosts.map(f => <FoodCard key={f.id} food={f as FoodItem} />)}
    </div>
  )
}
