import React, { useState } from 'react'
import Login from './login'
import Register from './register'

const AuthForm = () => {
  const [isLogin, setIsLogin] = useState(true)

  return (
    <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
      <div className="flex mb-6">
        <button
          onClick={() => setIsLogin(true)}
          className={`flex-1 py-2 px-4 text-center ${isLogin ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
        >
          Login
        </button>
        <button
          onClick={() => setIsLogin(false)}
          className={`flex-1 py-2 px-4 text-center ${!isLogin ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
        >
          Register
        </button>
      </div>
      {isLogin ? <Login /> : <Register />}
    </div>
  )
}

export default AuthForm