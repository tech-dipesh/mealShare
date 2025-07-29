import { supabase } from '../config/supabase.js'
import { badRequest, notFound, ok } from '../utils/response.js'
import { hashPassword } from '../utils/passWordutils.js'

export const getProfile = async (req, res, next) => {
  try {
    const id = req.params.id || req.user.id
    const { data, error } = await supabase
      .from('users')
      .select('id, email, name, dietary_preference, average_rating, total_reviews')
      .eq('id', id)
      .single()
    if (error) return notFound(res, 'User not found')
    return ok(res, data)
  } catch (err) {
    next(err)
  }
}

export const updateProfile = async (req, res, next) => {
  try {
    const updates = { name: req.body.name, dietary_preference: req.body.dietary_preference }
    if (req.body.password) updates.password = await hashPassword(req.body.password)
    const { error } = await supabase.from('users').update(updates).eq('id', req.user.id)
    if (error) return badRequest(res, error.message)
    return ok(res, { message: 'Profile updated' })
  } catch (err) {
    next(err)
  }
}
