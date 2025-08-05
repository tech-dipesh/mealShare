import React from 'react'
import { Link } from 'react-router-dom'

const NotFoundPage = () => {
  return (
    <div className="flex flex-col justify-center items-center min-h-screen text-center">
      <h1 className="text-6xl font-bold text-brand">404</h1>
      <p className="text-lg text-gray-700 mt-2">Page Not Found</p>
      <Link to="/" className="mt-4 text-brand underline">Go back to Home</Link>
    </div>
  )
}

export default NotFoundPage
