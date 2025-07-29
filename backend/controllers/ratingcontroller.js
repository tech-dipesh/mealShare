import { supabase } from '../config/supabase.js'
import { badRequest, ok } from '../utils/response.js'

export const rateClaim = async (req, res, next) => {
  try {
    const { claim_id, rating, review_text } = req.body
    const rater_id = req.user.id
    const { error: re } = await supabase
      .from('ratings')
      .insert({ claim_id, rater_id, rated_id: req.body.rated_id, rating, review_text, created_at: new Date() })
    if (re) return badRequest(res, re.message)
    return ok(res, { message: 'Rated' })
  } catch (err) {
    next(err)
  }
}
