import { useState } from 'react'
import { claimFood } from '../../services/foodservice'

export default function FoodCard({ food, onClaim }: { food: any, onClaim: (id: string) => void }) {
  const [loading, setLoading] = useState(false)

  const handleClaim = async () => {
    setLoading(true)
    await claimFood(food.id)
    setLoading(false)
    onClaim(food.id)
  }

  return (
    <div className="border rounded-lg p-4 shadow-md bg-white">
      <img src={food.image} alt={food.title} className="w-full h-40 object-cover rounded mb-2" />
      <h3 className="text-lg font-bold">{food.title}</h3>
      <p>{food.description}</p>
      <p className="text-sm text-gray-500">Location: {food.location}</p>
      <p className="text-sm text-gray-500">Expires: {new Date(food.expiry).toLocaleString()}</p>
      {food.claimed ? (
        <span className="text-green-600 font-semibold">Claimed</span>
      ) : (
        <button onClick={handleClaim} disabled={loading} className="mt-2 bg-brand text-white px-4 py-1 rounded">
          {loading ? 'Claiming...' : 'Claim'}
        </button>
      )}
    </div>
  )
}
