import React, { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { foodService, CreateFoodData } from '../../services/foodservice'
import { toast } from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'

interface Category {
  id: string
  name: string
  type: string
  icon_url?: string
}

const CreateFood = () => {
  const { register, handleSubmit, reset, formState: { errors } } = useForm<CreateFoodData>()
  const [categories, setCategories] = useState<Category[]>([])
  const [preview, setPreview] = useState<string>('')
  const [loading, setLoading] = useState(false)
  const [userLocation, setUserLocation] = useState<{lat: number, lng: number} | null>(null)
  const navigate = useNavigate()

  // Get user's current location for default coordinates
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude
          })
        },
        (error) => console.warn('Location access denied:', error)
      )
    }
  }, [])

  // Fetch categories for dropdown
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch('/api/categories')
        const data = await response.json()
        setCategories(data)
      } catch (error) {
        console.error('Failed to fetch categories:', error)
      }
    }
    fetchCategories()
  }, [])

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setPreview(URL.createObjectURL(file))
    }
  }

  const onSubmit = async (data: CreateFoodData & { image: FileList }) => {
    setLoading(true)
    try {
      const submitData: CreateFoodData = {
        ...data,
        latitude: userLocation?.lat || 0, // Use current location or 0
        longitude: userLocation?.lng || 0,
        image: data.image?.[0] // Extract file from FileList
      }

      await foodService.createFood(submitData)
      toast.success('Food item created successfully!')
      reset()
      setPreview('')
      navigate('/food')
    } catch (error) {
      const err=error as {response?: {data?:{message?:string}}}
      toast.error(err.response?.data?.message || 'Failed to create food item')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Share Food</h1>
      
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div>
          <input
            {...register('title', { required: 'Title is required' })}
            placeholder="Food title (e.g., Fresh Vegetables, Cooked Rice)"
            className="w-full border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title.message}</p>}
        </div>

        <div>
          <textarea
            {...register('description')}
            placeholder="Description (optional)"
            rows={3}
            className="w-full border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <select
            {...register('category_id', { required: 'Please select a category' })}
            className="w-full border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Select Category</option>
            {categories.map(category => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
          {errors.category_id && <p className="text-red-500 text-sm mt-1">{errors.category_id.message}</p>}
        </div>

        <div>
          <input
            {...register('address', { required: 'Address is required' })}
            placeholder="Pickup address"
            className="w-full border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.address && <p className="text-red-500 text-sm mt-1">{errors.address.message}</p>}
        </div>

        <div>
          <input
            type="file"
            {...register('image')}
            accept="image/*"
            onChange={handleImageChange}
            className="w-full border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {preview && (
            <div className="mt-2">
              <img src={preview} alt="Preview" className="h-40 w-40 object-cover rounded-lg" />
            </div>
          )}
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 disabled:opacity-50 font-medium"
        >
          {loading ? "Creating..." : "Share Food"}
        </button>
      </form>
    </div>
  )
}

export default CreateFood