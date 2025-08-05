import { useState } from 'react'
import axios from 'axios'

export const useUploadImage = () => {
  const [uploading, setUploading] = useState(false)

  const upload = async (file: File): Promise<string | null> => {
    const formData = new FormData()
    formData.append('file', file)
    formData.append('upload_preset', import.meta.env.VITE_CLOUDINARY_PRESET)

    try {
      setUploading(true)
      const res = await axios.post(`https://api.cloudinary.com/v1_1/${import.meta.env.VITE_CLOUDINARY_CLOUD}/upload`, formData)
      return res.data.secure_url
    } catch {
      return null
    } finally {
      setUploading(false)
    }
  }

  return { upload, uploading }
}
