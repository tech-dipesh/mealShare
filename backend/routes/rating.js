// backend/routes/rating.js
import { Router } from 'express'
import { body } from 'express-validator'
import { auth } from '../middleware/auth.js'
import { rateClaim } from '../controllers/ratingcontroller.js'
import { validate } from '../middleware/validation.js'

const router = Router()

router.post(
  '/',
  auth,
  [
    body('claim_id').isUUID(),
    body('rated_id').isUUID(),
    body('rating').isInt({ min: 1, max: 5 })
  ],
  validate,
  rateClaim
)

export default router
