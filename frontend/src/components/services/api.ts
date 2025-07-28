import axios from 'axios'
import toast from 'react-hot-toast'

// const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api'
const API_URL='http://localhost:5000/api'

const api = axios.create({
  baseURL: API_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
})

api.interceptors.request.use(
  (config) => {
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

api.interceptors.response.use(
  (response) => {
    return response
  },
  (error) => {
    if (error.response?.data?.message) {
      toast.error(error.response.data.message)
    } else if (error.message) {
      toast.error(error.message)
    } else {
      toast.error('Something went wrong')
    }
    return Promise.reject(error)
  }
)

export default api