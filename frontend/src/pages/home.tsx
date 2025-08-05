import React from 'react'
import { Link } from 'react-router-dom'

const HomePage = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-brand-light text-center">
      <h1 className="text-4xl font-bold text-brand">Welcome to MealShare</h1>
      <p className="mt-4 text-lg text-gray-700">Share or claim food in your community.</p>
      <Link to="/food" className="mt-6 bg-brand text-white px-6 py-2 rounded hover:bg-brand-dark">Get Started</Link>
    </div>
  )
}

export default HomePage
