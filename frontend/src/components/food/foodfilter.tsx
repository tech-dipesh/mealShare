import React, { useState } from 'react'

interface FoodFilterProps {
  onChange: (value: string) => void
}

const FoodFilter = ({ onChange }: FoodFilterProps) => {
  const [filter, setFilter] = useState('All')

  const handleChange = (value: string) => {
    setFilter(value)
    onChange(value)
  }

  return (
    <div className="flex justify-end mb-4">
      <select
        value={filter}
        onChange={(e) => handleChange(e.target.value)}
        className="px-4 py-2 border rounded text-sm"
      >
        <option value="All">All</option>
        <option value="Available">Available</option>
        <option value="Claimed">Claimed</option>
      </select>
    </div>
  )
}

export default FoodFilter
