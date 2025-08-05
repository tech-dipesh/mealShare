export const createFood = async (req, res, next) => {
  try {
    const { title, description, category_id, address, latitude, longitude, expires_at } = req.body
    const imageFile = req.file
    const { url, public_id } = imageFile ? await uploadImage(imageFile) : {}
    
    // Use provided expires_at or default to 24 hours
    const expirationDate = expires_at ? new Date(expires_at) : new Date(Date.now() + 24 * 60 * 60 * 1000)
    
    const { error } = await supabase
      .from('food_items')
      .insert({ 
        title, 
        description, 
        category_id, 
        poster_id: req.user.id, 
        address, 
        latitude, 
        longitude, 
        image_url: url, 
        image_id: public_id, 
        status: 'available', 
        expires_at: expirationDate 
      })
      
    if (error) return badRequest(res, error.message)
    return ok(res, { message: 'Food posted' })
  } catch (err) {
    next(err)
  }
}
