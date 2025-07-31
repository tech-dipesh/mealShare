import { useAuth } from '../../hooks/useauth'
import { useState } from 'react'

const Profile = () => {
  const { user, updateProfile } = useAuth()
  const [name, setName] = useState(user?.name || '')
  const [photo, setPhoto] = useState(user?.photo_url || '')
  const [preview, setPreview] = useState('')

  const handleImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setPreview(URL.createObjectURL(file))
      setPhoto(file)
    }
  }

  const handleSave = async () => {
    await updateProfile({ name, photo })
  }

  return (
    <div className="max-w-lg mx-auto p-6 space-y-4">
      <input value={name} onChange={(e) => setName(e.target.value)} className="w-full border p-2 rounded" />
      <input type="file" onChange={handleImage} className="w-full" />
      {preview && <img src={preview} className="h-40 rounded" />}
      <button onClick={handleSave} className="bg-blue-600 text-white px-4 py-2 rounded">Save</button>
    </div>
  )
}

export default Profile
