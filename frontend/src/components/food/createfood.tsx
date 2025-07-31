import { useForm } from 'react-hook-form'
import React, { useState } from 'react'
import { useFood } from '../../context/foodprovider'
import { uploadImageToCloudinary } from '../../utils/formatdata'
import { toast } from 'react-hot-toast'
import { FoodFormData } from '../../types/food'

const CreateFood = () => {
  const { register, handleSubmit, reset } = useForm<FoodFormData>()
  const { addFood } = useFood()
  const [preview, setPreview] = useState<string>('')

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) setPreview(URL.createObjectURL(file))
  }

  const onSubmit = async (data: FoodFormData) => {
    try {
      let imageUrl = ''
      if (data.image && data.image.length > 0) {
        imageUrl = await uploadImageToCloudinary(data.image[0])
      }

      await addFood({ ...data, image: imageUrl })
      toast.success('Food created')
      reset()
      setPreview('')
    } catch (err) {
      toast.error('Failed to create food')
    }
  }

  return (
    <div className="max-w-xl mx-auto p-6">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <input {...register('title')} placeholder="Title" className="w-full border p-2 rounded" />
        <textarea {...register('description')} placeholder="Description" className="w-full border p-2 rounded" />
        <input {...register('location')} placeholder="Location" className="w-full border p-2 rounded" />
        <input type="datetime-local" {...register('expiry')} className="w-full border p-2 rounded" />
        <input type="file" {...register('image')} accept="image/*" onChange={handleImageChange} className="w-full" />
        {preview && <img src={preview} className="h-40 object-cover rounded" />}
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">Submit</button>
      </form>
    </div>
  )
}

export default CreateFood
