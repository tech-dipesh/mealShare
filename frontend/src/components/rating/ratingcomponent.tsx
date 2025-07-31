import React, { useState } from 'react'

export default function RatingComponent({ onRate }: { onRate: (rating: number) => void }) {
  const [rating, setRating] = useState(0)

  const handleClick = (r: number) => {
    setRating(r)
    onRate(r)
  }

  return (
    <div className="flex space-x-1">
      {[1, 2, 3, 4, 5].map(i => (
        <span
          key={i}
          onClick={() => handleClick(i)}
          className={`text-2xl cursor-pointer ${i <= rating ? 'text-yellow-400' : 'text-gray-400'}`}
        >★</span>
      ))}
    </div>
  )
}
