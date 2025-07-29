import { Router } from 'express'
import { body, param } from 'express-validator'
import { auth } from '../middleware/auth.js'
import { createClaim, completeClaim } from '../controllers/claimcontroller.js'
import { validate } from '../middleware/validation.js'

const router = Router()

router.post('/', auth, [ body('food_item_id').isUUID() ], validate, createClaim)
router.patch('/:id/complete', auth, [ param('id').isUUID() ], validate, completeClaim)

export default router
