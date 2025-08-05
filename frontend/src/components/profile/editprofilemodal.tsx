import React, { useState } from 'react'

interface EditProfileModalProps {
  isOpen: boolean
  onClose: () => void
  onSave: (name: string, image: File | null) => void
}

const EditProfileModal = ({ isOpen, onClose, onSave }: EditProfileModalProps) => {
  const [name, setName] = useState('')
  const [image, setImage] = useState<File | null>(null)

  const handleSave = () => {
    onSave(name, image)
    onClose()
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-6">
        <h2 className="text-xl font-semibold mb-4">Edit Profile</h2>
        <div className="space-y-4">
          <input
            type="text"
            placeholder="Enter name"
            className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setImage(e.target.files?.[0] || null)}
            className="block w-full text-sm"
          />
          <div className="flex justify-end gap-2">
            <button
              onClick={onClose}
              className="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded"
            >
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default EditProfileModal
