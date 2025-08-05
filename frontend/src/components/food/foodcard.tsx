import React from 'react'
import { FoodItem } from '../../services/foodService'
import { claimService } from '../../services/claimService'
import { useAuth } from '../../context/authContext'
import { toast } from 'react-hot-toast'

interface Props {
  food: FoodItem
  onUpdate?: () => void // Callback to refresh food list after claim
}

const FoodCard = ({ food, onUpdate }: Props) => {
  const { user } = useAuth()
  const [claiming, setClaiming] = React.useState(false)

  const handleClaim = async () => {
    if (!user) {
      toast.error('Please login to claim food')
      return
    }

    setClaiming(true)
    try {
      await claimService.createClaim(food.id)
      toast.success('Food claimed successfully!')
      onUpdate?.() // Refresh the food list
    } catch (error: any) {
      toast.error(error.response?.data?.error || 'Failed to claim food')
    } finally {
      setClaiming(false)
    }
  }

  // Calculate time remaining until expiry
  const getTimeRemaining = () => {
    const now = new Date()
    const expiry = new Date(food.expires_at)
    const diff = expiry.getTime() - now.getTime()
    
    if (diff <= 0) return 'Expired'
    
    const hours = Math.floor(diff / (1000 * 60 * 60))
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))
    
    if (hours > 0) return `${hours}h ${minutes}m left`
    return `${minutes}m left`
  }

  const isExpired = new Date(food.expires_at) <= new Date()
  const isAvailable = food.status === 'available' && !isExpired
  const isOwnPost = user?.id === food.poster_id

  return (
    <div className="border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
      {food.image_url && (
        <img 
          src={food.image_url} 
          alt={food.title} 
          className="w-full h-48 object-cover"
        />
      )}
      
      <div className="p-4 space-y-3">
        <div className="flex justify-between items-start">
          <h3 className="font-bold text-lg text-gray-800">{food.title}</h3>
          <span className={`px-2 py-1 text-xs rounded-full ${
            isAvailable ? 'bg-green-100 text-green-800' : 
            food.status === 'claimed' ? 'bg-yellow-100 text-yellow-800' :
            'bg-red-100 text-red-800'
          }`}>
            {isExpired ? 'Expired' : food.status}
          </span>
        </div>

        {food.description && (
          <p className="text-gray-600 text-sm">{food.description}</p>
        )}

        <div className="text-sm text-gray-500 space-y-1">
          <p>📍 {food.address}</p>
          <p>⏰ {getTimeRemaining()}</p>
        </div>

        {!isOwnPost && isAvailable && (
          <button
            onClick={handleClaim}
            disabled={claiming}
            className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 disabled:opacity-50 font-medium"
          >
            {claiming ? 'Claiming...' : 'Claim Food'}
          </button>
        )}

        {isOwnPost && (
          <div className="text-sm text-blue-600 font-medium">
            Your post
          </div>
        )}
      </div>
    </div>
  )
}

export default FoodCard
