import { supabase } from '../config/supabase.js'
import { badRequest, notFound, ok } from '../utils/response.js'
import { calculateDistance } from '../services/geoService.js'
import { uploadImage } from '../services/uploadService.js'

export const createFood = async (req, res, next) => {
  try {
    const { title, description, category_id, address, latitude, longitude } = req.body
    const imageFile = req.file
    const { url, public_id } = imageFile ? await uploadImage(imageFile) : {}
    const expires_at = new Date(Date.now() + 5 * 60 * 60 * 1000)
    const { error } = await supabase
      .from('food_items')
      .insert({ title, description, category_id, poster_id: req.user.id, address, latitude, longitude, image_url: url, image_id: public_id, status: 'available', expires_at })
    if (error) return badRequest(res, error.message)
    return ok(res, { message: 'Food posted' })
  } catch (err) {
    next(err)
  }
}

export const listFood = async (req, res, next) => {
  try {
    const { lat, lng } = req.query
    const { data, error } = await supabase.from('food_items').select('*').eq('status', 'available')
    if (error) return badRequest(res, error.message)
    if (lat && lng) {
      const filtered = data.filter(item => calculateDistance(lat, lng, item.latitude, item.longitude) <= 5)
      return ok(res, filtered)
    }
    return ok(res, data)
  } catch (err) {
    next(err)
  }
}

export const getFood = async (req, res, next) => {
  try {
    const { id } = req.params
    const { data, error } = await supabase.from('food_items').select('*').eq('id', id).single()
    if (error) return notFound(res, 'Food not found')
    return ok(res, data)
  } catch (err) {
    next(err)
  }
}

export const deleteFood = async (req, res, next) => {
  try {
    const { id } = req.params
    const { error } = await supabase.from('food_items').delete().eq('id', id).eq('poster_id', req.user.id)
    if (error) return badRequest(res, error.message)
    return ok(res, { message: 'Deleted' })
  } catch (err) {
    next(err)
  }
}
