import { useState } from 'react'
import { Dialog } from '@headlessui/react'

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

  return (
    <Dialog open={isOpen} onClose={onClose} className="relative z-50">
      <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <Dialog.Panel className="w-full max-w-md p-6 bg-white rounded shadow">
          <Dialog.Title className="text-lg font-medium">Edit Profile</Dialog.Title>
          <div className="mt-4 space-y-4">
            <input
              type="text"
              placeholder="Enter name"
              className="w-full px-4 py-2 border rounded"
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
              <button onClick={onClose} className="px-4 py-2 bg-gray-200 rounded">Cancel</button>
              <button onClick={handleSave} className="px-4 py-2 bg-blue-600 text-white rounded">Save</button>
            </div>
          </div>
        </Dialog.Panel>
      </div>
    </Dialog>
  )
}

export default EditProfileModal
