import { useState } from 'react'
import { uploadImageToCloudinary } from '../../services/api'
import { createFoodPost } from '../../services/foodservice'
import { useNavigate } from 'react-router-dom'

export default function CreateFood() {
  const [formData, setFormData] = useState({ title: '', description: '', image: '', location: '', expiry: '' })
  const [file, setFile] = useState<File | null>(null)
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleImageUpload = async () => {
    if (!file) return
    setLoading(true)
    const url = await uploadImageToCloudinary(file)
    setFormData(prev => ({ ...prev, image: url }))
    setLoading(false)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!formData.image && file) await handleImageUpload()
    await createFoodPost(formData)
    navigate('/food')
  }

  return (
    <div className="max-w-xl mx-auto mt-10 bg-white p-6 shadow-md rounded">
      <h2 className="text-xl font-semibold mb-4 text-center text-brand">Create Food Post</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input name="title" placeholder="Title" onChange={handleChange} className="w-full border p-2 rounded" required />
        <textarea name="description" placeholder="Description" onChange={handleChange} className="w-full border p-2 rounded" required />
        <input type="file" onChange={(e) => e.target.files && setFile(e.target.files[0])} className="w-full" />
        <input name="location" placeholder="Location" onChange={handleChange} className="w-full border p-2 rounded" required />
        <input type="datetime-local" name="expiry" onChange={handleChange} className="w-full border p-2 rounded" required />
        <button disabled={loading} className="bg-brand text-white px-4 py-2 rounded w-full">{loading ? 'Uploading...' : 'Post'}</button>
      </form>
    </div>
  )
}
