import React, { useState } from 'react'
import { useFood } from '../../context/foodProvider'
import FoodCard from './foodcard'

const FoodList = () => {
  const { foodList } = useFood()
  const [filter, setFilter] = useState<'All' | 'Claimed' | 'Available'>('All')

  const filtered = foodList.filter(food =>
    filter === 'All' ? true :
    filter === 'Claimed' ? food.claimedBy !== null :
    food.claimedBy === null
  )

  return (
    <div className="p-6 space-y-4">
      <div className="flex gap-4 mb-4">
        {['All', 'Available', 'Claimed'].map(f => (
          <button
            key={f}
            onClick={() => setFilter(f as any)}
            className={`px-3 py-1 border rounded ${filter === f ? 'bg-blue-600 text-white' : ''}`}
          >
            {f}
          </button>
        ))}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filtered.map(food => <FoodCard key={food.id} food={food} />)}
      </div>
    </div>
  )
}

export default FoodList
