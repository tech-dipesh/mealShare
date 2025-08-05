import { supabase } from '../config/supabase.js'
import { badRequest, ok, notFound, unauthorized } from '../utils/response.js'
import { uploadImage } from '../services/uploadService.js'

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

export const listFood = async (req, res, next) => {
  try {
    const { lat, lng } = req.query
    let query = supabase
      .from('food_items')
      .select(`
        *,
        categories(name, type),
        users(name)
      `)
      .eq('status', 'available')
      .gt('expires_at', new Date().toISOString())
      
    const { data, error } = await query
    if (error) return badRequest(res, error.message)
    return ok(res, data)
  } catch (err) {
    next(err)
  }
}

export const getFood = async (req, res, next) => {
  try {
    const { id } = req.params
    const { data, error } = await supabase
      .from('food_items')
      .select(`
        *,
        categories(name, type),
        users(name, id)
      `)
      .eq('id', id)
      .single()
      
    if (error) return notFound(res, 'Food item not found')
    return ok(res, data)
  } catch (err) {
    next(err)
  }
}

export const deleteFood = async (req, res, next) => {
  try {
    const { id } = req.params
    const userId = req.user.id
    
    const { data: food, error: fetchError } = await supabase
      .from('food_items')
      .select('poster_id, image_id')
      .eq('id', id)
      .single()
    
    if (fetchError) return notFound(res, 'Food item not found')
    if (food.poster_id !== userId) return unauthorized(res, 'Not authorized')
    
    const { error } = await supabase
      .from('food_items')
      .delete()
      .eq('id', id)
    
    if (error) return badRequest(res, error.message)
    return ok(res, { message: 'Food item deleted' })
  } catch (err) {
    next(err)
  }
}