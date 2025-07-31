import { useEffect, useState } from 'react'
import { getFoodPosts } from '../../services/foodservice'
import FoodCard from './foodcard'

export default function FoodList() {
  const [foods, setFoods] = useState([])
  const [filter, setFilter] = useState('all')

  useEffect(() => {
    fetchFoods()
  }, [])

  const fetchFoods = async () => {
    const data = await getFoodPosts()
    setFoods(data)
  }

  const handleClaim = (id: string) => {
    setFoods(prev => prev.map(f => f.id === id ? { ...f, claimed: true } : f))
  }

  const filtered = foods.filter(f => {
    if (filter === 'all') return true
    if (filter === 'claimed') return f.claimed
    return !f.claimed
  })

  return (
    <div className="p-4">
      <div className="mb-4 flex gap-2">
        <button onClick={() => setFilter('all')} className="bg-brand text-white px-4 py-1 rounded">All</button>
        <button onClick={() => setFilter('claimed')} className="bg-gray-300 px-4 py-1 rounded">Claimed</button>
        <button onClick={() => setFilter('available')} className="bg-gray-300 px-4 py-1 rounded">Available</button>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map(food => (
          <FoodCard key={food.id} food={food} onClaim={handleClaim} />
        ))}
      </div>
    </div>
  )
}
