import { supabase } from '../config/supabase.js'
import { badRequest, notFound, ok } from '../utils/response.js'

export const createClaim = async (req, res, next) => {
  try {
    const { food_item_id } = req.body
    const claimer_id = req.user.id
    const { data: food, error: fe } = await supabase
      .from('food_items')
      .select('id, status, poster_id')
      .eq('id', food_item_id)
      .single()
    if (fe) return badRequest(res, fe.message)
    if (food.status !== 'available') return badRequest(res, 'Already claimed')
    const { error: ce } = await supabase
      .from('claims')
      .insert({ food_item_id, claimer_id, poster_id: food.poster_id, status: 'claimed', claimed_at: new Date() })
    if (ce) return badRequest(res, ce.message)
    await supabase.from('food_items').update({ status: 'claimed' }).eq('id', food_item_id)
    return ok(res, { message: 'Claim created' })
  } catch (err) {
    next(err)
  }
}

export const completeClaim = async (req, res, next) => {
  try {
    const { id } = req.params
    const claimer_id = req.user.id
    const { data: claim, error: ce } = await supabase
      .from('claims')
      .select('status')
      .eq('id', id)
      .eq('claimer_id', claimer_id)
      .single()
    if (ce) return notFound(res, 'Claim not found')
    if (claim.status !== 'claimed') return badRequest(res, 'Cannot complete')
    const completed_at = new Date()
    await supabase
      .from('claims')
      .update({ status: 'completed', completed_at })
      .eq('id', id)
    await supabase
      .from('food_items')
      .update({ status: 'completed' })
      .eq('id', claim.food_item_id)
    return ok(res, { message: 'Claim marked completed' })
  } catch (err) {
    next(err)
  }
}
