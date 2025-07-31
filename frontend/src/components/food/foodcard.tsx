import { FoodItem } from '../../types/food'
import { useFood } from '../../context/foodprovider'
import { useAuth } from '../../hooks/useauth'
import React from 'react'

interface Props {
  food: FoodItem
}

const FoodCard = ({ food }: Props) => {
  const { user } = useAuth()
  const { claimFood } = useFood()

  return (
    <div className="border p-4 rounded shadow-sm space-y-2">
      <img src={food.image} alt={food.title} className="w-full h-48 object-cover rounded" />
      <h2 className="font-bold text-lg">{food.title}</h2>
      <p>{food.description}</p>
      <p className="text-sm text-gray-500">{food.location}</p>
      <p className="text-sm">Status: {food.claimedBy ? 'Claimed' : 'Available'}</p>
      {!food.claimedBy && (
        <button
          onClick={() => claimFood(food.id)}
          className="bg-green-600 text-white px-4 py-1 rounded"
        >
          Claim
        </button>
      )}
      {food.claimedBy === user?.id && <p className="text-green-700 font-semibold">You claimed this</p>}
    </div>
  )
}

export default FoodCard
