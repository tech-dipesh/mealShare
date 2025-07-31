import { useUser } from "../../hooks/useUser"
import { useContext } from "react"
import { FoodContext } from "../../context/foodProvider"
import FoodCard from "../food/foodcard"

export default function UserPosts() {
  const { user } = useUser()
  const { foods } = useContext(FoodContext)

  const myPosts = foods.filter(f => f.user_id === user?.id)

  return (
    <div className="p-4 grid md:grid-cols-2 lg:grid-cols-3 gap-4">
      {myPosts.map(f => <FoodCard key={f.id} food={f} />)}
    </div>
  )
}
