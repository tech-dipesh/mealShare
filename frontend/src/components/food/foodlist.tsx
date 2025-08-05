import React, { useState, useEffect } from 'react'
import { foodService, FoodItem } from '../../services/foodservice'
import FoodCard from './foodcard'
import { toast } from 'react-hot-toast'

const FoodList = () => {
  const [foods, setFoods] = useState<FoodItem[]>([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState<'all' | 'available' | 'claimed'>('all')
  const filterOptions: { key: 'all' | 'available' | 'claimed'; label: string }[] = [
  { key: 'all', label: 'All' },
  { key: 'available', label: 'Available' },
  { key: 'claimed', label: 'Claimed' }
]


  const fetchFoods = async () => {
    try {
      setLoading(true)
      const data = await foodService.getFoods()
      setFoods(data)
    } catch (error) {
      toast.error('Failed to fetch foods')
      console.error('Fetch foods error:', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchFoods()
  }, [])

  // Filter foods based on selected filter
  const filteredFoods = foods.filter(food => {
    if (filter === 'all') return true
    if (filter === 'available') return food.status === 'available' && new Date(food.expires_at) > new Date()
    if (filter === 'claimed') return food.status === 'claimed'
    return true
  })

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    )
  }


  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Available Food</h1>
        
        {/* Filter buttons */}
        <div className="flex gap-2">
       {filterOptions.map(({ key, label }) => (
  <button
    key={key}
    onClick={() => setFilter(key)}
    className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
      filter === key
        ? 'bg-blue-600 text-white'
        : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
    }`}
  >
    {label}
  </button>
    ))}
        </div>
      </div>

      {filteredFoods.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">No food items found</p>
          <p className="text-gray-400 text-sm mt-2">
            {filter === 'available' ? 'No available food items right now' : 'Try changing the filter'}
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredFoods.map(food => (
            <FoodCard 
              key={food.id} 
              food={food} 
              onUpdate={fetchFoods} // Refresh list when food is claimed
            />
          ))}
        </div>
      )}
    </div>
  )
}

export default FoodList