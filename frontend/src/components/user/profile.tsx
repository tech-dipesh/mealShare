import { useUser } from "../../hooks/useUser"

export default function Profile() {
  const { user } = useUser()

  if (!user) return null

  return (
    <div className="p-6">
      <img src={user.avatar_url} alt="Profile" className="w-24 h-24 rounded-full mb-4" />
      <h2 className="text-2xl font-bold">{user.name}</h2>
      <p className="text-gray-600">{user.email}</p>
    </div>
  )
}
