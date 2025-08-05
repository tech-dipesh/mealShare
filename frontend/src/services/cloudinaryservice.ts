export const uploadToCloudinary = async (file: File): Promise<string | null> => {
  const formData = new FormData()
  formData.append("file", file)
  formData.append("upload_preset", import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET)

  try {
    const response = await fetch(import.meta.env.VITE_CLOUDINARY_UPLOAD_URL, {
      method: "POST",
      body: formData,
    })

    const data = await response.json()
    return data.secure_url || null
  } catch (error) {
    return error.message;
    // return null
  }
}
